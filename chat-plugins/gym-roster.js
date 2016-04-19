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
		this.normal = ['open', 'open'];
		this.fire = ['open', 'open'];
		this.water = ['open', 'open'];
		this.grass = ['open', 'open'];
		this.electric = ['open', 'open'];
		this.fighting = ['open', 'open'];
		this.flying = ['open', 'open'];
		this.poison = ['open', 'open'];
		this.ground = ['open', 'open'];
		this.rock = ['open', 'open'];
		this.bug = ['open', 'open'];
		this.psychic = ['open', 'open'];
		this.ghost = ['open', 'open'];
		this.steel = ['open', 'open'];
		this.dark = ['open', 'open'];
		this.ice = ['open', 'open'];
		this.dragon = ['open', 'open'];
		this.fairy = ['open', 'open'];
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
	let output = '<center><h4><u>' + room.title + ' Gym Leaders</u></h4></center><table><tr>';
	let double = '';
	let onlineA = "#e71414";
	let onlineB = "#e71414";
	for (let i = 0; i < data.length; i++) {
		if (Users(room.gymleaders[data[i]][0])) onlineA = "#2ECC40";
		if (Users(room.gymleaders[data[i]][1])) onlineB = "#2ECC40";
		if (room.gymleaders[data[i]][1] !== 'open') double = " - " + font(onlineB, room.gymleaders[data[i]][1]);
		output += '<td>' + typeTag(typeImg[data[i]], data[i]) + '</td> <td>' + font(onlineA, room.gymleaders[data[i]][0]) + double + '</td>';
		if (i % 2 === 1) output += '</tr> <tr>';
		double = '';
		onlineA = "#e71414";
		onlineB = "#e71414";
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
			let position = 0;
			if (parts.length < 2) return this.errorReply("You must specify a type and user.");
			let type = toId(parts[0]);
			let gymLeader = toId(parts[1]);
			if (!room.gymleaders[type]) return this.errorReply("Type: " + type + " not found. Did you spell it correctly?");
			if (room.gymleaders[type][0] !== 'open' && room.gymleaders[type][1] !== 'open') return this.errorReply("These gym leader positions are already filled. Use /gym replace to remove them and add a new leader.");
			if (room.gymleaders[type][0] !== 'open') position = 1;
			room.gymleaders[type][position] = gymLeader;
			room.chatRoomData.gymleaders[type][position] = gymLeader;
			Rooms.global.writeChatRoomData();
			room.add(gymLeader + " has been appointed as the " + type + " gym leader for this league by " + user + ".");
		},
		remove: function (target, room, user) {
			if (!this.can('declare', null, room)) return false;
			let parts = target.split(',');
			let type = toId(parts[0]);
			let position = 0;
			if (parts.length < 2) return this.errorReply("You must specify a type and user.");
			let gymLeader = toId(parts[1]);
			if (!room.gymleaders) return this.errorReply("This room has no gym leaders set.");
			if (!room.gymleaders[type]) return this.errorReply("Type: " + type + " not found. Did you spell it correctly?");
			if (room.gymleaders[type][0] === 'open' && room.gymleaders[type][1] === 'open') return this.errorReply("All gym leader positions for this type are already open.");
			if (room.gymleaders[type][0] !== gymLeader) position = 1;
			room.gymleaders[type][position] = 'open';
			room.chatRoomData.gymleaders[type][position] = 'open';
			Rooms.global.writeChatRoomData();
			this.addModCommand("(" + gymLeader + " has been removed from the position of" + type + " gym leader by " + user + ".)");
		},
		replace: function (target, room, user) {
			if (!this.can('declare', null, room)) return false;
			if (!room.gymleaders) return this.errorReply("This room has no gym leaders set.");
			let parts = target.split(',');
			if (parts.length < 3) return this.errorReply("You must specify a type and user.");
			let type = toId(parts[0]);
			let gymLeader = toId(parts[1]);
			let newLeader = toId(parts[2]);
			let position = 0;
			if (!room.gymleaders[type]) return this.errorReply("Type: " + type + " not found. Did you spell it correctly?");
			if (room.gymleaders[type][0] === 'open' && room.gymleaders[type][1] === 'open') return this.errorReply("All gym leader positions for this type are already open.");
			if (room.gymleaders[type][0] !== gymLeader) position = 1;
			room.gymleaders[type][position] = newLeader;
			room.chatRoomData.gymleaders[type][position] = newLeader;
			Rooms.global.writeChatRoomData();
			room.add(newLeader + " has been appointed as the " + type + " gym leader for this league by " + user + ".");
		},
	},
};
