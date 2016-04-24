'use strict';
/********************
 * Shadow Ban
 * This file runs the sban system. Don't mess with it.
********************/
const ROOM_NAME = "Shadow Ban Room";

let room = Rooms.get(toId(ROOM_NAME));
if (!room) {
	Rooms.global.addChatRoom(ROOM_NAME);
	room = Rooms.get(toId(ROOM_NAME));

	room.isHidden = true;
	room.modjoin = "%";
	room.staffAutojoin = true;
	room.addedUsers = {};

	if (room.chatRoomData) {
		room.chatRoomData.isHidden = true;
		room.chatRoomData.modjoin = "%";
		room.chatRoomData.staffAutojoin = true;
		room.chatRoomData.addedUsers = room.addedUsers;

		Rooms.global.writeChatRoomData();
	}
}
if (Object.keys(room.addedUsers).length > 0) {
	setImmediate(function () {
		room.add("|raw|Loaded user list: <button name=\"send\" value=\"/sbanlist\">View</button>");
		room.update();
	});
}
exports.room = room;

function getAllAlts(user) {
	let targets = {};
	if (typeof user === 'string') {
		targets[toId(user)] = 1;
	} else {
		user.getAlts().concat(user.name).forEach(function (altName) {
			let alt = Users.get(altName);
			if (!alt.named) return;

			targets[toId(alt)] = 1;
			Object.keys(alt.prevNames).forEach(function (name) {
				targets[toId(name)] = 1;
			});
		});
	}
	return targets;
}

function intersectAndExclude(a, b) {
	let intersection = [];
	let exclusionA = [];
	let exclusionB = [];

	let ai = 0;
	let bi = 0;
	while (ai < a.length && bi < b.length) {
		let difference = a[ai].localeCompare(b[bi]);
		if (difference < 0) {
			exclusionA.push(a[ai]);
			++ai;
		} else if (difference > 0) {
			exclusionB.push(b[bi]);
			++bi;
		} else {
			intersection.push(a[ai]);
			++ai;
			++bi;
		}
	}

	Array.prototype.push.apply(exclusionA, a.slice(ai));
	Array.prototype.push.apply(exclusionB, b.slice(bi));
	return {intersection: intersection, exclusionA: exclusionA, exclusionB: exclusionB};
}

let checkBannedCache = {};
let checkBanned = exports.checkBanned = function (user) {
	let userId = toId(user);
	if (userId in checkBannedCache) return checkBannedCache[userId];
	//console.log("Shadow ban cache miss:", userId);

	let targets = Object.keys(getAllAlts(user)).sort();
	let bannedUsers = Object.keys(room.addedUsers).sort();

	let matches = intersectAndExclude(targets, bannedUsers);
	let isBanned = matches.intersection.length !== 0;
	for (let t = 0; t < targets.length; ++t) {
		if (isBanned) room.addedUsers[targets[t]] = 1;
		checkBannedCache[targets[t]] = isBanned;
	}
	if (!isBanned) return false;

	if (matches.exclusionA.length > 0) {
		Rooms.global.writeChatRoomData();
		room.add("||Alts of " + matches.intersection[0] + " automatically added: " + matches.exclusionA.join(", "));
	}

	return true;
};

let addUser = exports.addUser = function (user) {
	let targets = getAllAlts(user);
	for (let u in targets) {
		if (room.addedUsers[u]) {
			delete targets[u];
		} else {
			room.addedUsers[u] = 1;
		}
		checkBannedCache[u] = true;
	}
	targets = Object.keys(targets).sort();

	if (targets.length > 0) {
		Rooms.global.writeChatRoomData();
		room.add("||Added users: " + targets.join(", "));
		room.update();
	}

	return targets;
};
let removeUser = exports.removeUser = function (user) {
	let targets = getAllAlts(user);
	for (let u in targets) {
		if (!room.addedUsers[u]) {
			delete targets[u];
		} else {
			delete room.addedUsers[u];
		}
		checkBannedCache[u] = false;
	}
	targets = Object.keys(targets).sort();

	if (targets.length > 0) {
		Rooms.global.writeChatRoomData();
		room.add("||Removed users: " + targets.join(", "));
		room.update();
	}

	return targets;
};

let addMessage = exports.addMessage = function (user, tag, message) {
	room.add('|c|' + user.getIdentity() + '|__(' + tag + ')__ ' + message);
	room.update();
};

exports.commands = {
	spam: 'shadowban',
	sban: 'shadowban',
	shadowban: function (target, room, user, connection, cmd) {
		if (["~", "&"].indexOf(user.group) === -1) return this.errorReply("The command '/" + cmd + "' was unrecognized. To send a message starting with '/" + cmd + "', type '//" + cmd + "'.");
		if (!target) return this.sendReply("/shadowban OR /sban [username], [secondary command], [reason] - Sends all the user's messages to the shadow ban room.");

		let params = this.splitTarget(target).split(',');
		let action = params[0].trim().toLowerCase();
		let reason = params.slice(1).join(',').trim();
		if (!(action in CommandParser.commands)) {
			action = 'mute';
			reason = params.join(',').trim();
		}

		if (!this.targetUser) return this.sendReply("User '" + this.targetUsername + "' not found.");

		let targets = addUser(this.targetUser);
		if (targets.length === 0) {
			return this.sendReply('||' + this.targetUsername + " is already shadow banned or isn't named.");
		}
		this.globalModlog("SBAN", this.targetUser, " by " + user.name);
		if (room.id !== "staff") user.sendTo(room, "(" +  this.targetUser.name + " was shadowbanned by " + user.name + ")");
		Rooms.get("staff").add("(" +  this.targetUser.name + " was shadowbanned by " + user.name + ")");
		//return this.parse('/' + action + ' ' + toId(this.targetUser) + ',' + reason);
	},

	unspam: 'unshadowban',
	unsban: 'unshadowban',
	unshadowban: function (target, room, user, connection, cmd) {
		if (["~", "&"].indexOf(user.group) === -1) return this.errorReply("The command '/" + cmd + "' was unrecognized. To send a message starting with '/" + cmd + "', type '//" + cmd + "'.");
		if (!target) return this.sendReply("/unshadowban OR /unsban [username] - Undoes /shadowban (except the secondary command).");
		this.splitTarget(target);

		let targets = removeUser(this.targetUser || this.targetUsername);
		if (targets.length === 0) {
			return this.sendReply('||' + this.targetUsername + " is not shadow banned.");
		}
		this.globalModlog("UNSBAN", this.targetUser, " by " + user.name);
		if (room.id !== "staff") user.sendTo(room, "(" +  this.targetUser.name + " was unshadowbanned by " + user.name + ")");
		Rooms.get("staff").add("(" +  this.targetUser.name + " was unshadowbanned by " + user.name + ")");
	},

	sbanlist: function (target, room, user, connection, cmd) {
		if (!user.can('lock')) return this.errorReply("The command '/" + cmd + "' was unrecognized. To send a message starting with '/" + cmd + "', type '//" + cmd + "'.");
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");
		let sbanList = {};

		// get target to lower case if there is one
		if (target) target = toId(target);

		// sort users by letter
		for (let u in Rooms.rooms.shadowbanroom.chatRoomData.addedUsers) {
			if (!sbanList[u.charAt(0)]) sbanList[u.charAt(0)] = {};
			sbanList[u.charAt(0)][u] = 1;
		}

		// create the buttons
		let buttons = "<center>" + Object.keys(sbanList).sort().map(l => {
			let colour = target === l ? "style=\"background-color:lightblue;height:30px;width:35px\"" : "style=\"background-color:aliceblue;height:30px;width:35px\"";
			return "<button name=\"send\" value=\"/sbanlist " + l + "\"" + colour + ">" + l.toUpperCase() + "</button>";
		}).join("&nbsp;");
		// add the no filter button
		buttons += "<br />" + // new line
			"<button name=\"send\" value=\"/sbanlist\" " + // command
			(target && sbanList.hasOwnProperty(target) ? "style=\"background-color:aliceblue;height:30px;width:90px\"" : "style=\"background-color:lightblue;height:30px;width:90px\"") +
			">All</button></center>";

		// create the full popup
		if (!target || target.length !== 1 || !sbanList.hasOwnProperty(target)) {
			let fullPopup = Object.keys(sbanList).sort().map(l => {
				return "<b>" + l.toUpperCase() + " -</b><br />" +
				Object.keys(sbanList[l]).sort().map(u => {
					let targetUser = Users.getExact(u);
					// bold online users
					return (targetUser && targetUser.connected ? "<b>" + u + "</b>" : u);
				}).join(", ") + "<br /><br />"; // contents for each letter
			}).join("");

			user.popup("|html|List of shadowbanned users:" +
				buttons + // buttons for searching
				"<div style=\"max-height: 300px; overflow-y: scroll\">" + // scrollable popup
				fullPopup + // the contents
				"</div>");
		} else {
			// create popup for only one letter
			let details = Object.keys(sbanList[target]).sort().map(u => {
				let targetUser = Users.getExact(u);
				// bold online users
				return (targetUser && targetUser.connected ? "<b>" + u + "</b>" : u);
			}).join(", ");
			user.popup("|html|List of shadowbanned users:" +
				buttons + // buttons for searching
				"<div style=\"max-height: 300px; overflow-y: scroll\">" + // scrollable popup
				"<b>" + target.toUpperCase() + " - </b><br />" +
				details + // the contents
				"</div>");
		}
	},
};

Users.ShadowBan = exports;
