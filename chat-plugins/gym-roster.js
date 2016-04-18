'use strict';
/********************
 * Gym Roster
 * This file handles gym leader info
********************/
const typeImg = {
	'normal': 'http://i.imgur.com/jFxjGND.gif',
	'fire': 'http://i.imgur.com/oDZxmZw.gif',
	'water': 'http://i.imgur.com/N3xHy1i.gif',
	'grass': 'http://i.imgur.com/kewQFI5.gif',
	'electric': 'http://i.imgur.com/DV8aj4g.gif',
	'fighting': 'http://i.imgur.com/bvEuKx4.gif',
	'flying': 'http://i.imgur.com/uwudbeN.gif',
	'poison': 'http://i.imgur.com/qO6tmtB.gif',
	'ground': 'http://i.imgur.com/oEBnyyX.gif',
	'rock': 'http://i.imgur.com/nrUlNwC.gif',
	'bug': 'http://i.imgur.com/jb0SxKp.gif',
	'psychic': 'http://i.imgur.com/B42tHZt.gif',
	'ghost': 'http://i.imgur.com/iKH40xG.gif',
	'steel': 'http://i.imgur.com/yGCQD5n.gif',
	'dark': 'http://i.imgur.com/lzNKxBP.gif',
	'ice': 'http://i.imgur.com/7BEzV1q.gif',
	'dragon': 'http://i.imgur.com/kWHK1UD.gif',
	'fairy': 'http://i.imgur.com/ucVDU4a.gif',
};

class Gymleaders {
	constructor() {
		this.normal = 'open';
		this.fire = 'open';
		this.water = 'open';
		this.grass = 'open';
		this.electric = 'open';
		this.fighting = 'open';
		this.flying = 'open';
		this.poison = 'open';
		this.ground = 'open';
		this.rock = 'open';
		this.bug = 'open';
		this.psychic = 'open';
		this.ghost = 'open';
		this.steel = 'open';
		this.dark = 'open';
		this.ice = 'open';
		this.dragon = 'open';
		this.fairy = 'open';
	}
}

function bold(text) {
	return '<b>' + text + '</b>';
}

function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}

function typeTag(link, name) {
	return '<img src="' + link + '" height="14" width="32" alt="' + name + '" title="' + name + '" >';
}

function gymDisplay(room) {
	let data = Object.keys(room.gymleaders);
	let output = '<table> <tr>';
	for (let i = 0; i < data.length; i++) {
		output += '<td>' + typeTag(typeImg[data[i]], data[i]) + '</td> <td>' + room.gymleaders[data[i]] + '</td>';
		if (!Users(room.gymleaders[data[i]])) {
			output += '<td><font color="#e71414">Offline</font></td>';
		} else {
			output += '<td><font color="#2ECC40">Online</font></td>';
		}
		if (i % 2 === 1) output += '</tr> <tr>';
	}
	output += '</tr> <table>';
	return output;
}

exports.commands = {
	gyms: 'gym',
	gym: {
		list: 'leaders',
		leaders: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!room.gymleaders) return this.errorReply("This room has no gym leaders set.");
			let display = gymDisplay(room);
			this.sendReplyBox(display);
		},
		add: function (target, room, user) {
			if (!this.can('declare', null, room)) return false;
			if (!room.chatRoomData.gymleaders) room.gymleaders = room.chatRoomData.gymleaders = new Gymleaders();
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a type and user.");
			let type = toId(parts[0]);
			let gymLeader = toId(parts[1]);
			if (!room.gymleaders[type]) return this.errorReply("Type: " + type + " not found. Did you spell it correctly?");
			if (room.gymleaders[type] !== 'open') return this.errorReply("This gym leader position is already filled. Use /gym replace to remove them and add a new leader.");
			room.gymleaders[type] = gymLeader;
			room.chatRoomData.gymleaders[type] = gymLeader;
			Rooms.global.writeChatRoomData();
			room.add(gymLeader + " has been appointed as the " + type + " gym leader for this league by " + user + ".");
		},
		remove: function (target, room, user) {
			if (!this.can('declare', null, room)) return false;
			let type = toId(target);
			if (!room.gymleaders) return this.errorReply("This room has no gym leaders set.");
			if (!room.gymleaders[type]) return this.errorReply("Type: " + type + " not found. Did you spell it correctly?");
			if (room.gymleaders[type] === 'open') return this.errorReply("This gym leader position is already open.");
			room.gymleaders[type] = 'open';
			room.chatRoomData.gymleaders[type] = 'open';
			Rooms.global.writeChatRoomData();
			this.sendReply(target + " has been removed from the position of" + type + " gym leader.");
			this.addModCommand(target + " has been removed from the position of" + type + " gym leader by " + user + ".");
		},
		replace: function (target, room, user) {
			if (!this.can('declare', null, room)) return false;
			if (!room.gymleaders) return this.errorReply("This room has no gym leaders set.");
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a type and user.");
			let type = toId(parts[0]);
			let gymLeader = toId(parts[1]);
			if (!room.gymleaders[type]) return this.errorReply("Type: " + type + " not found. Did you spell it correctly?");
			if (room.gymleaders[type] === 'open') return this.errorReply("This gym leader position is currently open. Use /gym add to set a new leader.");
			room.gymleaders[type] = gymLeader;
			room.chatRoomData.gymleaders[type] = gymLeader;
			Rooms.global.writeChatRoomData();
			room.add(target + " has been appointed as the " + type + " gym leader for this league by " + user + ".");
		},
	},
};
