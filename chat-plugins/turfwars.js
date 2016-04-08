'use strict';

/**********************
 * Turf Wars
 * by fender
 **********************/
const rankLadder = require('../rank-ladder');
const gangs = {
	rocket: {
		icon: 'http://i.imgur.com/eaTAxKU.gif',
		name: 'Rocket',
		godfather: 'Lt. Tesla',
	},
	magma: {
		icon: 'http://i.imgur.com/reKEhUA.png',
		name: 'Magma',
		godfather: 'ArkenCiel',
	},
	aqua: {
		icon: 'http://i.imgur.com/n9sKSKj.png',
		name: 'Aqua',
		godfather: 'Hayleysworld',
	},
	galactic: {
		icon: 'http://i.imgur.com/gixvv00.jpg',
		name: 'Galactic',
		godfather: 'Selena',
	},
	plasma: {
		icon: 'http://i.imgur.com/zzhoJX2.gif',
		name: 'Plasma',
		godfather: 'Mighty Sciz',
	},
	flare: {
		icon: 'http://i.imgur.com/X6g6fbc.png',
		name: 'Flare',
		godfather: 'AuraStormLucario',
	},
};

function isCapo(user) {
	if (user.gangrank !== 'capo' || user.gangrank !== 'godfather') return false;
	return true;
}

function isGodfather(user, gang) {
	if (user.gangrank !== 'godfather') return false;
	return true;
}

function gangDisplay(gang) {
	let info = gangs[gang];
	let visuals = '<div class="card-div card-td" style="box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);"><img src="' + info.icon + '" height="50" width="50" align="right">' +
		'<br /><br /><h1>' + info.name + '</font></h1>' +
		'<br /><br /><font color="#AAA"><i>Godfather: </i></font>' + info.godfather +
		'<br clear="all">';
	return visuals;
}

exports.commands = {

	turf: 'gang',
	gang: {
		info: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!target) return this.errorReply("Must specify a gang.");
			let gang = toId(target);
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			let display = gangDisplay(gang);
			this.sendReplyBox(display);
		},
		join: function (target, room, user) {
			if (!target) return this.errorReply("Must specify a user.");
			let gang = toId(target);
			if (user.gang !== '') return this.errorReply("You are already in a gang");
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			Db('gangs').set(user.userid, gang);
			user.gang = gang;
			this.sendReply("You have joined the gang: " + gang);
		},
		add: function (target, room, user) {
			if (!target) return this.errorReply("Must specify a user.");
			let targetUser = Users(toId(target));
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isGodfather(user) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("Access denied.");
			if (targetUser.gang !== '') return this.errorReply("User is already a member of a rival gang.");
			Db('gangs').set(targetUser, user.gang);
			targetUser.gang = user.gang;
			this.sendReply(targetUser + " has been added to the gang: " + user.gang);
			targetUser.popup("You have been added to the gang: " + user.gang + " by " + user + ".");
		},
		remove: function (target, room, user) {
			if (!target) return this.errorReply("Must specify a user.");
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("Access denied.");
			if (targetUser.gang !== user.gang && !this.can('makechatroom')) return this.errorReply("User is not a member of your gang.");
			Db('gangs').set(targetUser, '');
			targetUser.gang = '';
			this.sendReply(targetUser + " has been removed from the gang: " + user.gang);
			targetUser.popup("You have been removed from the gang: " + user.gang + " by " + user + ".");
		},
		promote: function (target, room, user) {
			if (!target) return this.errorReply("Must specify a user.");
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("Access denied.");
			if (targetUser.gang !== user.gang && !this.can('makechatroom')) return this.errorReply("User is not a member of your gang.");
			Db('gangranks').set(targetUser, 'capo');
			user.gangrank = 'capo';
			this.sendReply(targetUser + " has been promoted to capo in the gang: " + user.gang);
			targetUser.popup("You have been promoted to capo in the gang: " + user.gang + " by " + user + ".");
		},
		demote: function (target, room, user) {
			if (!target) return this.errorReply("Must specify a user.");
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isGodfather(user) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("Access denied.");
			if (targetUser.gang !== user.gang && !this.can('makechatroom')) return this.errorReply("User is not a member of your gang.");
			Db('gangranks').set(targetUser, '');
			user.gangrank = '';
			this.sendReply(targetUser + " has been demoted in the gang: " + user.gang);
			targetUser.popup("You have been demoted in the gang: " + user.gang + " by " + user + ".");
		},
		godfather: function (target, room, user) {
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a gang and amount");
			let gang = parts[1];
			if (!Users(toId(parts[0]))) return this.errorReply("User not found.");
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			let targetUser = Users(toId(parts[0]));
			if (!this.can('makechatroom')) return this.errorReply("Access denied.");
			Db('gangranks').set(targetUser, 'godfather');
			Db('gangs').set(targetUser, gang);
			user.gangrank = 'godfather';
			user.gang = gang;
			this.sendReply(targetUser + " has been promoted to godfather of the gang: " + gang);
			targetUser.popup("You have been promoted to godfather of the gang: " + gang + " by " + user + ".");
		},
		ladder: function (target, room, user) {
			if (!this.runBroadcast()) return;
			let keys = Object.keys(Db('gangladder').object()).map(function (name) {
				return {name: name, gangladder: Db('gangladder').get(name)};
			});
			if (!keys.length) return this.sendReplyBox("Turf ladder is empty.");
			keys.sort(function (a, b) { return b.gangladder - a.gangladder; });
			this.sendReplyBox(rankLadder('Turf Wars', 'Points', keys.slice(0, 100), 'gangladder', 'Gang'));
		},
		givepoints: function (target, room, user) {
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a gang and amount");
			if (!this.can('makechatroom')) return false;
			let gang = toId(parts[0]);
			let amount = isMoney(parts[1]);
			if (!gangs[gang]) return this.errorReply("Gang not found.");
			Db('gangladder').set(gang, Db('gangladder').get(gang, 0) + amount).get(gang);
			this.sendReply(gang + " has been awarded " + amount + " points.");
			room.addRaw("<h4>" + gang + "has been awarded " + amount + " points.</h4>");
		},
		members: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			if ((target && !gangs.hasOwnProperty(toId(target))) || (!target && !gangs.hasOwnProperty(room.id))) return this.errorReply("You have to specify a gang.");
			let targetGang = target ? toId(target) : room.id;
			let gangData = Db("gangs").object();
			let gangRanks = Db("gangranks").object();
			let members = {
				godfather: [],
				capo: [],
				grunt: [],
			};
			// sort the members
			Object.keys(gangData).filter(u => gangData[u] === targetGang).forEach(u => members[gangRanks[u] || "grunt"].push(u));
			// build the list
			members.map(u => "<b>" + u.charAt(0).toUpperCase() + u.slice(1) + ": </b><br />" + members[u].sort().map(i => Users.get(i) && Users.get(i).connected ? "<b>" + i + "</b>" : i).join(", ")).join("<br /><br />");
			this.sendReplyBox("<div style=\"max-height: 250px; overflow-y: scroll\">" + members + "</div>");
		},
	},
};

module.exports.gangs = gangs;
