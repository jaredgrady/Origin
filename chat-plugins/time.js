'use strict';

let moment = require('moment');
let request = require('request');

function convertTime(time) {
	time = time / 1000;
	let seconds = time % 60;
	time /= 60;
	let minutes = time % 60;
	time /= 60;
	let hours = time;
	return {
		s: Math.floor(seconds),
		m: Math.floor(minutes),
		h: Math.floor(hours),
	};
}

function displayTime(t) {
	return t.h + (t.h === 1 ? " hour " : " hours ") + t.m + (t.m === 1 ? " minute " : " minutes ") + t.s + (t.s === 1 ? " second" : " seconds");
}

exports.commands = {
	regdate: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target || !toId(target)) return this.parse('/help regdate');
		let username = toId(target);
		request('http://pokemonshowdown.com/users/' + username, function (error, response, body) {
			if (error && response.statusCode !== 200) {
				this.sendReplyBox(Tools.escapeHTML(target) + " is not registered.");
				return room.update();
			}
			let regdate = body.split('<small>')[1].split('</small>')[0].replace(/(<em>|<\/em>)/g, '');
			if (regdate === '(Unregistered)') {
				this.sendReplyBox(Tools.escapeHTML(target) + " is not registered.");
			} else {
				this.sendReplyBox(Tools.escapeHTML(target) + " was registered on " + regdate.slice(7) + ".");
			}
			room.update();
		}.bind(this));
	},
	regdatehelp: ["/regdate - Please specify a valid username."],

	seen: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(targetUser.name + " is <b>currently online</b>.");
		//if (targetUser.userid === 'username') return false;
		target = Tools.escapeHTML(target);
		let seen = Db('seen').get(toId(target));
		if (!seen) return this.sendReplyBox(target + " has never been online on this server.");
		this.sendReplyBox(target + " was last seen <b>" + moment(seen).fromNow() + "</b>.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

	nolife: 'ontime',
	userontime: 'ontime',
	ontime: function (target, room, user) {
		if (!this.canBroadcast()) return;

		const userid = target ? toId(target) : user.userid;
		const currentOntime = Ontime[userid] ? Date.now() - Ontime[userid] : 0;
		const totalOntime = Db('ontime').get(userid, 0) + currentOntime;

		if (!totalOntime) return this.sendReplyBox(userid + " has never been online on this server.");

		const isConnected = Users.get(userid) && Users.get(userid).connected;

		// happens when a user opens 2 tabs and closes one of them, removing them from the Ontime object
		if (isConnected && !Ontime[userid]) {
			Ontime[userid] = Date.now();
		}

		if (isConnected) {
			this.sendReplyBox(
				userid + "'s total ontime is <b>" + displayTime(convertTime(totalOntime)) + "</b>." + " Current ontime: <b>" + displayTime(convertTime((currentOntime))) + "</b>"
			);
		} else {
			this.sendReplyBox(userid + "'s total ontime is <b>" + displayTime(convertTime(totalOntime)) + "</b>.");
		}
	},
	ontimehelp: ["/ontime - Shows how long in total the user has been on the server."],

	nolifeladder: 'ontimeladder',
	mostonline: 'ontimeladder',
	ontimeladder: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let display = '<div style="max-height: 310px; overflow-y: scroll"><center><u><b>Ontime Ladder</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Total Time</th></tr>';
		let keys = Object.keys(Db('ontime').object()).map(function (name) {
			let currentOntime = 0;
			if (Ontime[name]) currentOntime = Date.now() - Ontime[name];
			const totalOntime = Db('ontime').get(name, 0) + currentOntime;
			return {name: name, time: totalOntime};
		});
		if (!keys.length) return this.sendReplyBox("Ontime ladder is empty.");
		keys.sort(function (a, b) { return b.time - a.time; });
		keys.slice(0, 100).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + displayTime(convertTime(user.time)) + "</td></tr>";
		});
		display += "</tbody></table></div>";
		this.sendReply("|raw|" + display);
	},

	ontimestaff: 'staffontime',
	staffontime: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!this.can('receiveauthmessages', null, room)) return false;
		let display = '<div style="max-height: 310px; overflow-y: scroll"><center><u><b>Staff Ontime</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Total Time</th></tr>';
		const ranks = Object.keys(Config.groups);
		let keys = Object.keys(Db('ontime').object())
			.filter(function (name) {
				const u = Users.usergroups[name];
				if (!target) return u;
				if (toId(target) === 'upper') return u && u.charAt(0) !== '+';
				return u && u.charAt(0) === target;
			})
			.map(function (name) {
				let currentOntime = 0;
				if (Ontime[name]) currentOntime = Date.now() - Ontime[name];
				const totalOntime = Db('ontime').get(name, 0) + currentOntime;
				return {name: name, time: totalOntime};
			});
		if (!keys.length) return this.sendReplyBox("Ontime ladder is empty.");
		keys.sort(function (a, b) { return b.time - a.time; });
		keys.slice(0, 100).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + displayTime(convertTime(user.time)) + "</td></tr>";
		});
		display += "</tbody></table></div>";
		this.sendReply("|raw|" + display);
	},
};
