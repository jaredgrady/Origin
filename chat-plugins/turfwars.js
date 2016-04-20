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
		icon: 'http://i.imgur.com/qmsDFHx.png',
		name: 'Galactic',
		godfather: 'Selena',
	},
	plasma: {
		icon: 'http://i.imgur.com/czbcEE4.gif',
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
	let visuals = '<div class="' + info.name + '" style="width: 40%; margin: auto; text-align: center; box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8) inset; border-radius: 8px;">' +
		'<div style="width: 100%; background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: -o-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: -moz-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); margin: auto; padding-top: 5px;"><img src="' + info.icon + '" width="16" height="16" /></div>' +
		'<font style="font-size: 14pt; color: #000;">' + info.name + '</font>' +
		'<div style="width: 100%; background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: -o-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: -moz-linear-gradient(left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); margin: auto; padding: 4px 0px;">Godfather: <span>' + info.godfather + '</span></div>' +
		'</div>';
	return visuals;
}

exports.commands = {
	turf: 'gang',
	gang: {
		info: function (target, room, user) {
			if (!this.runBroadcast()) return;
			if (!target) return this.errorReply("You must specify a gang.");
			let gang = toId(target);
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			let display = gangDisplay(gang);
			this.sendReply("|raw|" + display);
		},
		join: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let gang = toId(target);
			if (user.gang !== '') return this.errorReply("You are already in a gang");
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			Db('gangs').set(user.userid, gang);
			user.gang = gang;
			this.sendReply("You have joined the gang: " + gang);
		},
		confirmleave: "leave",
		leave: function (target, room, user, connection, cmd) {
			if (!user.gang) return this.errorReply("You are not currently in a gang!");
			if (isCapo(user.userid)) return this.errorReply("You cannot leave a gang if you have a gang rank of godfather or capo");
			if (!target || user.gang !== toId(target)) return this.errorReply("Please specify what gang you are leaving to confirm your choice.");
			if (Db('money').get(user.userid, 0) < 10) return this.errorReply("You need 10 bucks to leave a gang feelsjig... otherwise the godfathers will hunt you down feelsnv...");
			if (!/^(turf|gang)?\s?confirmleave/i.test(cmd)) return this.errorReply("You will require a fee of 10 bucks to leave a gang.  To confirm your choice, do /turf confirmleave [gang name]");
			Db('money').set(user.userid, Db('money').get(user.userid, 0) - 10);
			Db('gangs').delete(user.userid);
			Db('gangranks').delete(user.userid);
			user.gang = "";
			user.gangrank = "";
			this.sendReply("You have left the gang " + toId(target) + ".");
		},
		add: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = Users(toId(target));
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isGodfather(user) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("/gang add - Access denied.");
			if (targetUser.gang !== '') return this.errorReply("User is already a member of a rival gang.");
			Db('gangs').set(targetUser, user.gang);
			targetUser.gang = user.gang;
			this.sendReply(targetUser + " has been added to the gang: " + user.gang);
			targetUser.popup("You have been added to the gang: " + user.gang + " by " + user + ".");
		},
		remove: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("/gang remove - Access denied.");
			if (targetUser.gang !== user.gang && !this.can('makechatroom')) return this.errorReply("User is not a member of your gang.");
			Db('gangs').set(targetUser, '');
			targetUser.gang = '';
			this.sendReply(targetUser + " has been removed from the gang: " + user.gang);
			targetUser.popup("You have been removed from the gang: " + user.gang + " by " + user + ".");
		},
		promote: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("/gang promote - Access denied.");
			if (targetUser.gang !== user.gang && !this.can('makechatroom')) return this.errorReply("User is not a member of your gang.");
			Db('gangranks').set(targetUser, 'capo');
			user.gangrank = 'capo';
			this.sendReply(targetUser + " has been promoted to capo in the gang: " + user.gang);
			targetUser.popup("You have been promoted to capo in the gang: " + user.gang + " by " + user + ".");
		},
		demote: function (target, room, user) {
			if (!target) return this.errorReply("You must specify a user.");
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply("User not found.");
			if (!isGodfather(user) || user.gang === '' && !this.can('makechatroom')) return this.errorReply("/gang demote - Access denied.");
			if (targetUser.gang !== user.gang && !this.can('makechatroom')) return this.errorReply("User is not a member of your gang.");
			Db('gangranks').set(targetUser, '');
			user.gangrank = '';
			this.sendReply(targetUser + " has been demoted in the gang: " + user.gang);
			targetUser.popup("You have been demoted in the gang: " + user.gang + " by " + user + ".");
		},
		godfather: function (target, room, user) {
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a user and a gang");
			let gang = parts[1];
			if (!Users(toId(parts[0]))) return this.errorReply("User not found.");
			if (!gangs[gang]) return this.errorReply("This gang does not exist.");
			let targetUser = Users(toId(parts[0]));
			if (!this.can('makechatroom')) return this.errorReply("/gang godfather - Access denied.");
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
			if (!this.can('makechatroom')) return this.errorReply("/gang givepoints - Access denied.");
			let gang = toId(parts[0]);
			let amount = isMoney(parts[1]);
			if (!gangs[gang]) return this.errorReply("Gang not found.");
			Db('gangladder').set(gang, Db('gangladder').get(gang, 0) + amount).get(gang);
			this.sendReply(gang + " has been awarded " + amount + " points.");
			room.addRaw("<h4>" + gang + "has been awarded " + amount + " points.</h4>");
		},
		takepoints: function (target, room, user) {
			let parts = target.split(',');
			if (parts.length < 2) return this.errorReply("You must specify a gang and amount");
			if (!this.can('makechatroom')) return this.errorReply("/gang takepoints - Access denied.");
			let gang = toId(parts[0]);
			let amount = isMoney(parts[1]);
			if (!gangs[gang]) return this.errorReply("Gang not found.");
			Db('gangladder').set(gang, Db('gangladder').get(gang, 0) - amount).get(gang);
			this.sendReply(gang + " has been deducted of " + amount + " points.");
			room.addRaw("<h4>" + gang + "has been deducted of " + amount + " points.</h4>");
		},
		members: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			if ((target && !gangs.hasOwnProperty(toId(target))) || (!target && !gangs.hasOwnProperty(room.id))) return this.errorReply("You must specify a gang.");
			let targetGang = target ? toId(target) : room.id;
			let gangData = Db('gangs').object();
			let gangRanks = Db('gangranks').object();
			let members = {
				godfather: [],
				capo: [],
				grunt: [],
			};
			// sort the members
			Object.keys(gangData).filter(u => gangData[u] === targetGang).forEach(u => members[gangRanks[u] || "grunt"].push(u));
			// build the list
			let display = Object.keys(members).map(u => "<b>" + u.charAt(0).toUpperCase() + u.slice(1) + ": </b><br />" + members[u].sort().map(i => Users.get(i) && Users.get(i).connected ? "<b>" + i + "</b>" : i).join(", ")).join("<br /><br />");
			this.sendReplyBox("<div style=\"max-height: 250px; overflow-y: scroll\">" + display + "</div>");
		},
	},
};

module.exports.gangs = gangs;
