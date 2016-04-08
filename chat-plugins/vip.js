'use strict';
/********************
 * VIP
 * Origin's vip system
********************/
let fs = require('fs');

function loadVips() {
	try {
		Users.vips = JSON.parse(fs.readFileSync('config/vips.json', 'utf8'));
	} catch (e) {
		Users.vips = {};
	}
}
if (!Users.vips) loadVips();

function saveVips() {
	fs.writeFileSync('config/vips.json', JSON.stringify(Users.vips));
}

exports.commands = {
	givevip: function (target, room, user) {
		if (!this.can('givevip')) return false;
		if (!target) return this.sendReply("/givevip [user]");
		if (Users.vips[toId(target)]) return this.sendReply(target + " already has vip.");
		let targetUser = Users(target);

		if (!targetUser) return this.sendReply("User '" + target + "' not found.");
		if (!targetUser.connected) return this.sendReply(targetUser.name + " is not online.");
		if (!targetUser.registered) return this.sendReply(targetUser.name + " is not registered.");

		Users.vips[targetUser.userid] = 1;
		targetUser.popup("You have received VIP from " + user.name);
		this.privateModCommand("(" + user.name + " has given VIP status to " + targetUser.name + ")");
		saveVips();
	},

	takevip: function (target, room, user) {
		if (!this.can('givevip')) return false;
		if (!target) return this.sendReply("/takevip [user]");
		if (!Users.vips[toId(target)]) return this.sendReply("User '" + target + "' does not have VIP.");

		delete Users.vips[toId(target)];
		saveVips();
		this.privateModCommand("(" + user.name + " has removed VIP status from " + target + ")");
	},

	vip: 'viphelp',
	viphelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("<div style=\"background-color:white;border:1px solid black;border-radius:5px;text-align:center;font-weight:bold\"><br>Origin relies on donations to stay afloat, but we'd hate to take without giving anything in return. For a donation of 10 USD, we're proud to endow a \"VIP\" status on our benefactors. With this, our generous users can set their own avatars, titles, symbols, and change their message color! On top of this, we also include additional perks for different amounts of donations, which you can check out on a button below. However, users should only donate because they want to help the server, not because they want these perks.<br><br><a href=https://docs.google.com/document/d/1B-g2ESwArLDoXcjH516awPnqlxjYPyOxzgut4-Zw7JE/edit?pref=2&pli=1><button style=\"border-radius:5px;border:1px solid black;padding:5px;color:black;background:#CD9FC4;font-weight:bold\">VIP perks</button></a><button style=\"border-radius:5px;border:1px solid black;padding:5px;color:black;background:#CD9FC4;font-weight:bold\" name=\"send\" value=\"/vipcommands\">VIP commands</button><a href=https://www.paypal.com/us/cgi-bin/webscr?cmd=_flow&SESSION=OuouAM7Gv0Rk_-a-…&dispatch=5885d80a13c0db1f8e263663d3faee8d64ad11bbf4d2a5a1a0d303a50933f9b2><button style=\"border-radius:5px;border:1px solid black;padding:5px;color:black;background:#CD9FC4;font-weight:bold\">Donate!</button></a><br></div>");
	},
};
