'use strict';
/********************
 * Mod Commands
 * This file contains all custom commands used to moderate the server.
********************/
const MAX_REASON_LENGTH = 300;
const fs = require("fs");
let permaUsers;

try {
	permaUsers = JSON.parse(fs.readFileSync("config/perma.json"));
} catch (e) {
	permaUsers = {};
	console.log("Unable to load config/perma.txt; creating empty object.");
}
Users.parsePerma = function (userid, targetUser) {
	if (!userid) return;
	if (userid in permaUsers) {
		try {
			targetUser[permaUsers[userid]](false, userid);
		} catch (e) {
			console.log("ERROR: unable to apply perma to " + userid);
		}
	}
};

function clearRoom(room) {
	let len = (room.log && room.log.length) || 0;
	let users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		if (!Users.get(u)) continue;
		Users.get(u).leaveRoom(room, Users.get(u).connections[0]);
	}
	len = users.length;
	setTimeout(function () {
		while (len--) {
			if (Users.get(users[len])) {
				Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
			}
		}
	}, 1000);
}

exports.commands = {
	clearroomauth: function (target, room, user, cmd) {
		if (!this.can('declare') && room.founder !== user.userid) return this.errorReply("Access Denied");
		if (!room.auth) return this.errorReply("Room does not have roomauth.");
		let parts = target.split(',');
		let count;
		cmd = parts[0].trim().toLowerCase();
		if (!target) {
			this.errorReply("You must specify a roomauth group you want to clear.");
			return;
		}
		switch (target) {

		case 'voice':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '+') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero roomvoices)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " roomvoices have been cleared by " + user.name + ".");
			break;
		case 'roomplayer':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '\u2605') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero roomplayers)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " roomplayers have been cleared by " + user.name + ".");
			break;
		case 'driver':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '%') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero drivers)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " drivers have been cleared by " + user.name + ".");
			break;

		case 'mod':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '@') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero mods)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " mods have been cleared by " + user.name + ".");
			break;

		case 'roomleader':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '&') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero room leaders)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " room leaders have been cleared by " + user.name + ".");
			break;

		case 'roomowner':
			count = 0;
			for (let userid in room.auth) {
				if (room.auth[userid] === '#') {
					delete room.auth[userid];
					count++;
					if (userid in room.users) room.users[userid].updateIdentity(room.id);
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero roomowners)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " roomowners have been cleared by " + user.name + ".");
			break;

		case 'all':
			if (!room.auth) return this.errorReply("This room has no auth.");
			delete room.auth;
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All roomauth has been cleared by " + user.name + ".");
			break;

		default:
			return this.sendReply("The group specified does not exist.");
		}
	},

	clearall: function (target, room, user) {
		if (!this.can('declare') && !~developers.indexOf(user.userid)) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);
	},

	declaregreen: 'declarered',
	declarered: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk() && !user.can('bypassall')) return this.sendReply('You cannot do this while unable to talk.');

		room.addRaw('<div class="broadcast-' + cmd.substr(7) + '"><b>' + target + '</b></div>');
		room.update();
		this.logModCommand(user.name + ' declared ' + target);
	},

	cgdeclare: 'customgdeclare',
	customgdeclare: function (target, room, user) {
		let parts = target.split(',');
		if (!target) return this.parse('/help customgdeclare');
		if (!parts[4]) return this.parse('/help customgdeclare');
		if (!this.can('gdeclare')) return false;

		for (let id in Rooms.rooms) {
			if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue" style="border-radius: 5px;"><b>We are hosting a <font color="#57194A"><b>' + parts[0] + '</b></font> in <button name="send" value="/join ' + parts[1] + '" style="border-radius: 3px; margin: 3px; padding: 2px 5px; font-weight: bold; font-style: italic; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35); color: #57194A; text-shadow: none;">' + parts[1] + '</button> !<br />The tier is <font style="color: #57194A; font-weight: bold;"><b>' + parts[2] + '</b></font>! Join up and have fun!<br /><br />The prize for the winner is <font style="color: #57194A; font-weight: bold;"><b>' + parts[3] + '</b></font> bucks, while the runner-up will get <font style="color: #57194A; font-weight: bold;"><b>' + parts[4] + '</b></font> bucks!<br /><small><i>~' + user.name + '</i></small></b></div>');
		}
		this.logModCommand(user.name + " globally custom declared " + target);
	},
	customgdeclarehelp: ["/customgdeclare [event name], [room], [tier], [buck reward], [runner-up buck reward] - Preset gdeclare which anonymously announces a message to every room on the server. Requires: &, ~"],

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('gdeclare')) return false;

		for (let u in Users.users) {
			Users.users[u].popup("All rooms are being clear.");
		}

		for (let r in Rooms.rooms) {
			clearRoom(Rooms.rooms[r]);
		}
	},

	fj: 'forcejoin',
	forcejoin: function (target, room, user) {
		if (!user.can('lock')) return false;
		if (!target) return this.parse('/help forcejoin');
		let parts = target.split(',');
		if (!parts[0] || !parts[1]) return this.parse('/help forcejoin');
		let userid = toId(parts[0]);
		let roomid = toId(parts[1]);
		if (!Users.get(userid)) return this.sendReply('User not found.');
		if (!Rooms.get(roomid)) return this.sendReply('Room not found.');
		Users.get(userid).joinRoom(roomid);
	},
	forcejoinhelp: ['/forcejoin [target], [room] - Forces a user to join a room'],

	k: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (!this.canTalk()) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!(targetUser in room.users)) {
			return this.sendReply("User " + this.targetUsername + " is not in the room " + room.id + ".");
		}

		if (!this.can('mute', targetUser, room) || targetUser.can("rangeban") && !user.can("rangeban")) return false;

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ".");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

	kickall: function (target, room, user) {
		if (!this.can('declare')) return this.sendReply('/kickall - Access denied.');
		if (room.id === 'lobby') return this.sendReply('This command can not be used in Lobby.');
		for (let i in room.users) {
			if (room.users[i] !== user.userid) {
				room.users[i].leaveRoom(room.id);
			}
		}
		this.privateModCommand('(' + Tools.escapeHTML(user.name) + 'kicked everyone from the room.');
	},

	sd: 'declaremod',
	staffdeclare: 'declaremod',
	modmsg: 'declaremod',
	moddeclare: 'declaremod',
	declaremod: function (target, room, user, connection) {
		if (!target) return this.parse('/help declaremod');
		if (!this.canTalk()) return this.sendReply("You cannot do this while unable to talk.");
		if (!this.can('receiveauthmessages', null, room)) return false;
		return this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');
	},
	declaremodhelp: ["/declaremod [note] - Adds a staff readable declare. Requires: % @ # & ~"],

	glogs: 'globallogs',
	globallogs: function (target, room, user) {
		return this.parse('/modlog all, ' + target);
	},

	hideauth: 'hide',
	hide: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = true;
		user.updateIdentity();
		this.sendReply("You have hidden your staff symbol.");
	},
	unhide: "show",
	showauth: 'show',
	show: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = false;
		user.updateIdentity();
		this.sendReply("You have revealed your staff symbol.");
	},

	roomlist: function (target, room, user) {
		if (!this.can('declare')) return;

		let rooms = Object.keys(Rooms.rooms),
			len = rooms.length,
			official = ['<b><font color="#1a5e00" size="2">Official chat rooms</font></b><br />'],
			nonOfficial = ['<hr><b><font color="#000b5e" size="2">Chat rooms</font></b><br />'],
			privateRoom = ['<hr><b><font color="#5e0019" size="2">Private chat rooms</font></b><br />'];

		while (len--) {
			let _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
			if (_room.type === 'chat') {
				if (_room.isOfficial) {
					official.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
					continue;
				}
				if (_room.isPrivate) {
					privateRoom.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
					continue;
				}
				nonOfficial.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
			}
		}

		this.sendReplyBox(official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' '));
	},

	masspm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = ' Server PM [Do not reply]';

		Users.users.forEach(function (user) {
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallhelp: ["/pmall [message] - PM all users in the server."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = ' Staff PM [Do not reply]';

		Users.users.forEach(function (user) {
			if (!user.isStaff) return;
			let message = '|pm|' + pmName + '|' + user.getIdentity() + '|' + target;
			user.send(message);
		});
	},
	pmallstaffhelp: ["/pmallstaff [message] - Sends a PM to every staff member online."],

	pmroom: 'rmall',
	roompm: 'rmall',
	rmall: function (target, room, user) {
		if (!this.can('declare', null, room)) return this.sendReply('/rmall - Access denied.');
		if (room.id === 'lobby') return this.sendReply('This command can not be used in Lobby.');
		if (!target) return this.sendReply('/rmall [message] - Sends a pm to all users in the room.');
		target = target.replace(/<(?:.|\n)*?>/gm, '');

		let pmName = '~Room PM (' + Tools.escapeHTML(room.title) + ') [Do not reply]';

		for (let i in room.users) {
			let message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '| ' + target;
			room.users[i].send(message);
		}
		this.privateModCommand('(' + Tools.escapeHTML(user.name) + ' mass PMd: ' + target + ')');
	},

	plock: "permalock",
	permalock: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help permalock");
		let userid = toId(target);
		let targetUser = Users(target);
		if (userid in permaUsers) return this.errorReply("User " + userid + " is already perma" + permaUsers[userid] + (permaUsers[userid] === "ban" ? "ned" : "ed") + ".");
		if (targetUser && targetUser.confirmed) {
			let from = targetUser.deconfirm();
			Monitor.log("[CrisisMonitor] " + targetUser.name + " was permalocked by " + user.name + " and demoted from " + from.join(", ") + ".");
		}
		permaUsers[userid] = "lock";
		try {
			Users.get(userid).lock(false, userid);
		} catch (e) {}
		this.addModCommand(userid + " was permalocked by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},

	unplock: "unpermalock",
	unpermalock: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help unpermalock");
		let userid = toId(target);
		if (!(userid in permaUsers) || permaUsers[userid] !== "lock") return this.errorReply(userid + " is not permalocked!");
		try {
			Users.unlock(userid);
		} catch (e) {}
		delete permaUsers[userid];
		this.addModCommand(userid + " was unpermalocked by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},

	pban: "permaban",
	permaban: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help permaban");
		let userid = toId(target);
		let targetUser = Users(target);
		if (userid in permaUsers && permaUsers[userid] === "ban") return this.errorReply("User " + userid + " is already permabanned.");
		if (targetUser && targetUser.confirmed) {
			let from = targetUser.deconfirm();
			Monitor.log("[CrisisMonitor] " + targetUser.name + " was perma banned by " + user.name + " and demoted from " + from.join(", ") + ".");
		}
		permaUsers[userid] = "ban";
		try {
			Users.get(userid).ban(false, userid);
		} catch (e) {}
		this.addModCommand(userid + " was permabanned by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},

	unpban: "unpermaban",
	unpermaban: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help unpermaban");
		let userid = toId(target);
		if (!(userid in permaUsers) || permaUsers[userid] !== "ban") return this.errorReply(userid + " is not permabanned!");
		try {
			Users.unban(userid);
		} catch (e) {}
		delete permaUsers[userid];
		this.addModCommand(userid + " was unpermabanned by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},

	plist: "permalist",
	permalist: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		let buffer = ["<b>Perma'd users:</b>", ""];
		Object.keys(permaUsers).sort().forEach(function (u) {
			buffer.push("<b>" + u + "</b> - " + permaUsers[u]);
		});
		if (buffer.length === 2) buffer.push("There are currently no perma'd users!");
		this.sendReplyBox(buffer.join("<br>"));
	},
	permalockhelp: ["/permalock [user] - permanantly locks the user."],
	permabanhelp: ["/permaban [user] - permanently bans the user."],
	unpermabanhelp: ["/unpermaban [user] - lifts a permaban."],
	unpermalockhelp: ["/unpermalock [user] - lifts a permalock."],

	roombanlist: function (target, room, user, connection) {
		if (!this.can('ban', null, room)) return false;
		return this.sendReplyBox("<b>List of Roombanned Users:</b><br />" + Object.keys(room.bannedUsers).join("<br />"));
	},

	reauth: "repromote",
	repromote: function (target, room, user) {
		if (!this.can("hotpatch")) return false;
		if (!target) return this.errorReply("/repromote targetuser, demote message. Do not use this if you don\'t know what you are doing");
		let parts = target.replace(/\, /g, ",").split(',');
		let targetUser = toId(parts.shift());
		parts.forEach(function (r) {
			let tarRoom = Rooms.get(toId(r));
			if (tarRoom) {
				tarRoom.auth[targetUser] = r.charAt(0);
			}
		});
		Rooms.global.writeChatRoomData();
		Users(targetUser).updateIdentity();
		this.sendReply("Succesfully repromoted " + targetUser + ".");
	},

	rf: 'roomfounder',
	roomfounder: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomfounder - This room isn't designed for per-room moderation to be added.");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
		if (!this.can('declare')) return false;
		if (room.isPersonal) return this.sendReply("You can't do this in personal rooms.");
		if (!room.auth) room.auth = room.chatRoomData.auth = {};
		if (!room.leagueauth) room.leagueauth = room.chatRoomData.leagueauth = {};
		let name = targetUser.name;
		room.auth[targetUser.userid] = '#';
		room.founder = targetUser.userid;
		this.addModCommand(name + ' was appointed to Room Founder by ' + user.name + '.');
		room.onUpdateIdentity(targetUser);
		room.chatRoomData.founder = room.founder;
		Rooms.global.writeChatRoomData();
	},

	roomdefounder: 'deroomfounder',
	deroomfounder: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);
		if (room.isPersonal) return this.sendReply("You can't do this in personal rooms.");
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");
		if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room founder.");
		if (!this.can('declare')) return false;
		delete room.auth[userid];
		delete room.founder;
		this.sendReply(name + ' was demoted from Room Founder by ' + user.name + '.');
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
		}
	},

	roomowner: function (target, room, user) {
		if (!room.chatRoomData) {
			return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
		let name = targetUser.name;
		if (!targetUser.registered) return this.sendReply("User '" + name + "' is not registered.");
		if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
		if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');
		if (!room.auth) room.auth = room.chatRoomData.auth = {};

		room.auth[targetUser.userid] = '#';
		this.addModCommand("" + name + " was appointed Room Owner by " + user.name + ".");
		room.onUpdateIdentity(targetUser);
		Rooms.global.writeChatRoomData();
	},

	deroomowner: function (target, room, user) {
		if (!room.auth) {
			return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
		}
		target = this.splitTarget(target, true);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);
		if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

		if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room owner.");
		if (!room.founder || user.userid !== room.founder && !this.can('makeroom', null, room)) return false;

		delete room.auth[userid];
		this.sendReply("(" + name + " is no longer Room Owner.)");
		if (targetUser) targetUser.updateIdentity();
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
		}
	},

	forceshart: 'shart',
	shart: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help shart');

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser) return this.errorReply("User '" + this.targetUsername + "' does not exist.");
		if (target.length > MAX_REASON_LENGTH) {
			return this.errorReply("The reason is too long. It cannot exceed " + MAX_REASON_LENGTH + " characters.");
		}
		if (!this.can('ban', targetUser)) return false;

		if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
			let problem = " but was already banned";
			return this.privateModCommand("(" + targetUser.name + " would be banned by " + user.name + problem + ".)");
		}

		if (targetUser.confirmed) {
			if (cmd === 'forceshart') {
				let from = targetUser.deconfirm();
				Monitor.log("[CrisisMonitor] " + targetUser.name + " was banned by " + user.name + " and demoted from " + from.join(", ") + ".");
			} else {
				return this.sendReply("" + targetUser.name + " is a confirmed user. If you are sure you would like to ban them use /forceban.");
			}
		} else if (cmd === 'forceshart') {
			return this.errorReply("Use /ban; " + targetUser.name + " is not a confirmed user.");
		}

		// Destroy personal rooms of the banned user.
		for (let i in targetUser.roomCount) {
			if (i === 'global') continue;
			let targetRoom = Rooms.get(i);
			if (targetRoom.isPersonal && targetRoom.auth[targetUser.userid] && targetRoom.auth[targetUser.userid] === '#') {
				targetRoom.destroy();
			}
		}

		targetUser.popup("|modal|" + user.name + " has sharted on you.");

		this.addModCommand("" + targetUser.name + " was sharted on by " + user.name + "." + (target ? " (" + target + ")" : ""), " (" + targetUser.latestIp + ")");
		let alts = targetUser.getAlts();
		let acAccount = (targetUser.autoconfirmed !== targetUser.userid && targetUser.autoconfirmed);
		if (alts.length) {
			let guests = 0;
			alts = alts.filter(function (alt) {
				if (alt.substr(0, 6) !== 'Guest ') return true;
				guests++;
				return false;
			});
			this.privateModCommand("(" + targetUser.name + "'s " + (acAccount ? " ac account: " + acAccount + ", " : "") + "banned alts: " + alts.join(", ") + (guests ? " [" + guests + " guests]" : "") + ")");
			for (let i = 0; i < alts.length; ++i) {
				this.add('|unlink|' + toId(alts[i]));
			}
		} else if (acAccount) {
			this.privateModCommand("(" + targetUser.name + "'s ac account: " + acAccount + ")");
		}

		let userid = this.getLastIdOf(targetUser);
		this.add('|unlink|hide|' + userid);
		if (userid !== toId(this.inputUsername)) this.add('|unlink|hide|' + toId(this.inputUsername));
		targetUser.ban(false, userid);
		this.globalModlog("BAN", targetUser, " by " + user.name + (target ? ": " + target : ""));
		return true;
	},
	sharthelp: ["/shart [username], [reason] - Kick user from all rooms and ban user's IP address with reason. Requires: @ & ~"],

	unlink: function (target, room, user) {
		if (!target || !this.can('mute')) return this.parse('/help unlink');
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to talk.");

		let targetUser = Users.get(target);

		this.add('|unlink|' + this.getLastIdOf(targetUser));
		this.addModCommand(targetUser.name + "'s links were unlinked by " + user.name);
		targetUser.popup(user.name + " has unlinked all your previous messages.");
	},
	unlinkhelp: ["/unlink [username] - Attempts to unlink every link sent by [username]. Requires: % @ & ~"],
	ad: 'advertise',
	advertise: function (target, room, user) {
		if (!user.can('lock')) return false;
		let parts = target.split(',');
		if (parts.length < 2) return this.errorReply("Invalid command. `/ad room, message`.");
		let innerTarget = Tools.escapeHTML(parts[0]);
		let message = Tools.escapeHTML(parts.slice(1).join(","));
		let targetRoom = Rooms.search(innerTarget);
		if (!targetRoom || targetRoom === Rooms.global) return this.errorReply('The room "' + innerTarget + '" does not exist.');
		room.addRaw('<div class="infobox"><a href="/' + targetRoom.id + '" class="ilink"><font color="#04B404"> Advertisement <strong>' + targetRoom.id + '</strong>:</font> ' + message + '</a>  -' + toId(user) + '</div>');
	},
};
