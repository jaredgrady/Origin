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
	},
	magma: {
		icon: 'http://i.imgur.com/reKEhUA.png',
		name: 'Magma',
	},
	aqua: {
		icon: 'http://i.imgur.com/n9sKSKj.png',
		name: 'Aqua',
	},
	galactic: {
		icon: 'http://i.imgur.com/gixvv00.jpg',
		name: 'Galactic',
	},
	plasma: {
		icon: 'http://i.imgur.com/zzhoJX2.gif',
		name: 'Plasma',
	},
	flare: {
		icon: 'http://i.imgur.com/X6g6fbc.png',
		name: 'Flare',
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

exports.commands = {

	turf: 'gang',
	gang: {
		add: function (target, room, user) {
			let targetUser = Users(toId(target));
			if (!Users(targetUser)) return this.errorReply('User not found.');
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply('Access denied.');
			if (targetUser.gang !== '') return this.errorReply('User is already a member of a rival gang.');
			Db("gangs").set(targetUser, user.gang);
			targetUser.gang = user.gang;
			this.sendReply(targetUser + ' has been added to the gang: ' + user.gang);
			targetUser.popup('You have been added to the gang: ' + user.gang + ' by ' + user + '.');
		},
		remove: function (target, room, user) {
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply('User not found.');
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply('Access denied.');
			if (targetUser.gang !== user.gang) return this.errorReply('User is not a member of your gang.');
			Db("gangs").set(targetUser, '');
			targetUser.gang = '';
			this.sendReply(targetUser + ' has been removed from the gang: ' + user.gang);
			targetUser.popup('You have been removed from the gang: ' + user.gang + ' by ' + user + '.');
		},
		promote: function (target, room, user) {
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply('User not found.');
			if (!isCapo(user.userid) || user.gang === '' && !this.can('makechatroom')) return this.errorReply('Access denied.');
			if (targetUser.gang !== user.gang) return this.errorReply('User is not a member of your gang.');
			Db("gangranks").set(targetUser, 'capo');
			user.gangrank = 'capo';
			this.sendReply(targetUser + ' has been promoted to capo in the gang: ' + user.gang);
			targetUser.popup('You have been promoted to capo in the gang: ' + user.gang + ' by ' + user + '.');
		},
		demote: function (target, room, user) {
			let targetUser = toId(target);
			if (!Users(targetUser)) return this.errorReply('User not found.');
			if (!isGodfather(user) || user.gang === '' && !this.can('makechatroom')) return this.errorReply('Access denied.');
			if (targetUser.gang !== user.gang) return this.errorReply('User is not a member of your gang.');
			Db("gangranks").set(targetUser, '');
			user.gangrank = '';
			this.sendReply(targetUser + ' has been demoted in the gang: ' + user.gang);
			targetUser.popup('You have been demoted in the gang: ' + user.gang + ' by ' + user + '.');
		},
		godfather: function (target, room, user) {
			let parts = target.split(',');
			if (!Users(toId(parts[0]))) return this.errorReply('User not found.');
			let targetUser = Users(toId(parts[0]));
			if (!this.can('makechatroom')) return this.errorReply('Access denied.');
			if (targetUser.gang !== '') return this.errorReply('User is in a gang already.');
			Db("gangranks").set(targetUser, 'godfather');
			Db("gangs").set(targetUser, parts[1]);
			user.gangrank = 'godfather';
			user.gang = parts[1];
			this.sendReply(targetUser + ' has been promoted to godfather of the gang: ' + parts[1]);
			targetUser.popup('You have been promoted to godfather of the gang: ' + parts[1] + ' by ' + user + '.');
		},
		ladder: function (target, room, user) {
			if (!this.runBroadcast()) return;
			let keys = Object.keys(Db('gangladder').object()).map(function (name) {
				return {name: name, gangladder: Db('gangladder').get(name)};
			});
			if (!keys.length) return this.sendReplyBox("Turf ladder is empty.");
			keys.sort(function (a, b) { return b.gangladder - a.gangladder; });
			this.sendReplyBox(rankLadder('Turf Wars', 'Points', keys.slice(0, 100), 'gangladder'));
		},
		givepoints: function (target, room, user) {
			let parts = target.split(',');
			if (!this.can('makechatroom')) return false;
			let curgang = toId(parts[0]);
			let amount = isMoney(parts[1]);
			if (!gangs[curgang]) return this.errorReply('Gang not found.');
			Db('gangladder').set(curgang, Db('gangladder').get(curgang, 0) + amount).get(curgang);
			this.sendReply(curgang + ' has been awarded ' + amount + ' points.');
			room.addRaw('<h4>' + curgang + 'has been awarded ' + amount + ' points.</h4>');
		},
	},
};
