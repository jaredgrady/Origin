/*'use strict';
let color = require('../config/color');

function display(user, bet) {
	return '';
}

function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

exports.commands = {
	shell: {
		hide: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Shell Game can only be played in the Casino.');
			if (!this.canTalk()) return this.errorReply("You can not start Shell Games while unable to speak.");
			if (!target || target.indexOf(',') < 0) return this.parse('/help shells');

			let parts = target.split(',');
			let shell = toId(parts[0]);
			let bet = isMoney(parts[1]);
			let output = display(user, bet);
			switch (shell) {
			case 'red':
			case 'blue':
				if (Db('money').get(user.userid, 0) < bet) return this.errorReply("You do not have enough bucks to place this bet.");
				if (bet > 100) return this.errorReply("The betting limit is 100.");
				if (typeof bet === 'string') return this.errorReply('Bet was a string, report this to an admin');

				if (!room.shellgame) room.shellgame = {};
				if (room.shellgame.active) return this.errorReply('There is already a Shell Game active.');

				room.shellgame.host = user.userid;
				room.shellgame.active = true;
				room.shellgame.bet = bet;
				room.shellgame.shell = shell;
				room.shellgame.startTime = Date.now();
				Db('money').set(user.userid, Db('money').get(user.userid) - room.shellgame.bet);
				room.addRaw(output);
				this.sendReply('The ball is hidden under the ' + shell + ' shell.');
				break;
			default:
				return this.errorReply(shell + ' is not a shell. Options are red and blue.');
			}
		},
		guess: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Shell Game can only be played in the Casino.');
			if (!this.canTalk()) return this.errorReply('You can not play Shell Games while unable to speak.');
			if (!room.shellgame.active) return this.errorReply('There is no Shell Game currently active.');
			if (room.shellgame.host === user.userid) return this.errorReply("You hid the ball.");
			if (Db('money').get(user.userid, 0) < room.shellgame.bet) return this.errorReply("You do not have enough bucks to guess.");
			let guess = target.toLowerCase();
			let shell = room.shellgame.shell;
			switch (guess) {
			case 'red':
			case 'blue':
				if (guess === shell) {
					Db('money').set(user.userid, Db('money').get(user.userid) + room.shellgame.bet);
					room.addRaw(user + ' has correctly chosen the ' + shell + ' Shell and has won the game!');
				} else {
					Db('money').set(user.userid, Db('money').get(user.userid) - room.shellgame.bet);
					Db('money').set(room.shellgame.host, Db('money').get(room.shellgame.host) + (room.shellgame.bet * 2));
					room.addRaw(user + ' chose the ' + guess + ' shell incorrectly and lost their money!');
				}
				delete room.shellgame;
				break;
			default:
				return this.errorReply(shell + ' is not a shell. Options are red and blue.');
			}
		},
		end: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('shell Game can only be played in the Casino.');
			if (room.shellgame.host !== user.userid && !this.can('ban', null, room)) return this.errorReply('You cannot end this shell Game.');
			if ((Date.now() - room.shellgame.startTime) < 15000 && !user.can('broadcast', null, room)) return this.errorReply("Regular users may not end a Shell game within the first minute of it starting.");
			delete room.shellgame;
			room.addRaw('<h3>The Shell Game was ended early by ' + user + '.');
		},
	},
};   */