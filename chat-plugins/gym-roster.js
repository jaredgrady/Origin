'use strict';
/********************
 * Gym Roster
 * This file handles gym leader info
********************/
const typeImg = {
	'fire': 'http://i.imgur.com/yu29NVo.png',
	'water': 'http://i.imgur.com/nVlPHRf.png',
	'grass': 'http://i.imgur.com/nLeC2Zf.png',
	'normal': 'http://i.imgur.com/V3uMU0p.png',
	'fighting': 'http://i.imgur.com/p7jVd86.png',
	'flying': 'http://i.imgur.com/DnlEWFo.png',
	'electric': 'http://i.imgur.com/Ck57l72.png',
	'psychic': 'http://i.imgur.com/iabGU27.png',
	'ice': 'http://i.imgur.com/IvWOxNP.png',
	'poison': 'http://i.imgur.com/BWXWJcn.png',
	'ground': 'http://i.imgur.com/MF488fV.png',
	'rock': 'http://i.imgur.com/QBKxfMN.png',
	'dragon': 'http://i.imgur.com/KHNW9Uh.png',
	'dark': 'http://i.imgur.com/j2oN3AN.png',
	'fairy': 'http://i.imgur.com/Ze90HHG.png',
	'bug': 'http://i.imgur.com/AmpKmBV.png',
	'ghost': 'http://i.imgur.com/Qg7fJr4.png',
	'steel': 'http://i.imgur.com/P0rW7lc.png'
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

function typeTag(link, name) {
	return '<img src="' + link + '" height="105" width="100" alt="' + name + '" title="' + name + '" style="border-radius: 5px; box-shadow: 0px 0px 2px #000;" />';
}

function gymDisplay(room) {
	let data = Object.keys(room.gymleaders);
	let output = '<center><h4><u>' + room.title + ' Gym Leaders</u></h4></center><div style="width: 100%; max-height: 450px; overflow-y: scroll;"><table style="border-collapse: collapse; margin: auto;"><tr>';
	let double = '';
	let onlineA = "rgba(231, 20, 20, 0.8)";
	let onlineB = "rgba(231, 20, 20, 0.8)";
	for (let i = 0; i < data.length; i++) {
		if (Users(room.gymleaders[data[i]][0])) onlineA = "rgba(46, 204, 64, 0.8)";
		if (Users(room.gymleaders[data[i]][1])) onlineB = "rgba(46, 204, 64, 0.8)";
		if (room.gymleaders[data[i]][1] !== 'open') double = " - <span style='background: " + onlineB + ";'>" + room.gymleaders[data[i]][1] + "</span>";
		output += '<td style="text-align: center; padding: 5px; background: #EEE; border: 1px solid #2D416F; box-shadow: 1px 1px rgba(255, 255, 255, 0.7) inset, -1px -1px rgba(170, 183, 191, 0.8) inset;">' + typeTag(typeImg[data[i]], data[i]) + '<br /><div style="color: #FFF; text-shadow: 1px 1px 4px #222; text-align: center; padding: 3px 2px; background: #999; border: 1px solid #000; box-shadow: 1px 1px rgba(255, 255, 255, 0.5) inset, -1px -1px rgba(0, 0, 0, 0.2) inset;"><span style="background: ' + onlineA + ';">' + room.gymleaders[data[i]][0] + '</span>' + double + '</div></td>';
		if (i % 3 === 1) output += '</tr><tr>';
		double = '';
		onlineA = "rgba(231, 20, 20, 0.8)";
		onlineB = "rgba(231, 20, 20, 0.8)";
	}
	output += '</tr><table></div>';
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
			this.sendReply("|raw|" + display);
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
		delete: 'remove',
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
		help: function (target, room, user) {
			if (!this.runBroadcast()) return;
			this.sendReplyBox('The following is a list of gym roster commands: <br />' +
				'/gym leaders/list - Shows a complete list of gym leaders in a league.<br />' +
				'/gym add [type], [user] - Appoints a user as a gym leader for a type.<br />' +
				'/gym delete/remove [type], [user] - Removes a user as a gym leader from a type.<br />' +
				'/gym replace [type], [old user], [new user]- Replaces a gym leader of a type with a new gym leader.'
			);
		},
	},
};
