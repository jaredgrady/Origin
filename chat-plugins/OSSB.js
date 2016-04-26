'use strict';
let fs = require('fs');
let monData;
try {
	monData = fs.readFileSync("data/OSSB-data.txt").toString().split("\n\n");
} catch (e) {
	console.error(e);
}

function getMonData(target) {
	let returnData = null;
	monData.forEach(function (data) {
		if (toId(data.split("\n")[0].split(" - ")[0] || " ") === target) {
			returnData = data.split("\n").map(function (line) {
				return Tools.escapeHTML(line);
			}).join("<br />");
		}
	});
	return returnData;
}

exports.commands = {
	ssb: 'ossb',
	ossb: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		if (!target || target === 'help') return this.parse('/help ossb');
		if (target === 'credits') return this.parse('/ossbcredits');
		let targetData = getMonData(toId(target));
		if (!targetData) return this.errorReply("The staffmon '" + toId(target) + "' could not be found.");
		return this.sendReplyBox(targetData);
	},

	ssbhelp: 'ossbhelp',
	ossbhelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("/ossb [staff member\'s name] - displays data for a staffmon\'s movepool, custom move, and custom ability.");
	},

	ssbcredits: 'ossbcredits',
	ossbcredits: function (target, room, user) {
		if (!this.runBroadcast()) return false;
		this.sendReplyBox(
			"<center><b>Origin Super Staff Bros Credits:</b></center>" +
			"<b>%Emg E4 Volco</b> - Concepts, Programming, Organization, Testing, Hosting a test server.<br />" +
			"<b>@AuraStormLucario</b> - Concepts, Programming, Organization, Testing, OSSB Doubles.<br />" +
			"<b>~sparkychild</b> - Programming, Organization, Testing, Pokemon Descriptions.<br />" +
			"<b>@hayleysworld, Omega Chime</b> - Pokemon Descriptions, Testing.<br />" +
			"<b>@PaulCentury, %Selena, %Starfox:3</b> - Testing.<br />" +
			"<b>Other Origin Staff Members</b> - Participation and support in helping to complete OSSB."
		);
	},
};
