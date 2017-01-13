'use strict';

let toggleGambling = true;

let color = require('../config/color');

function currencyName(amount) {
	let name = " credit";
	return amount === 1 ? name : name + "s";
}

function isCredits(credits) {
	let numCredits = Number(credits);
	if (isNaN(credits)) return "Must be a number.";
	if (String(credits).includes('.')) return "Cannot contain a decimal.";
	if (numCredits < 1) return "Cannot be less than one credit.";
	return numCredits;
}

exports.commands = {
	creditgame: 'startgamble',
	gamblestart: 'startgamble',
	startgamble: function (target, room, user) {
		if (!target) return this.parse('/help startgamble');
		if (room.id !== 'marketplace' && !room.isMarketplace) return this.errorReply("Dice games for credits can't be used outside of the Marketplace.");
		if (room.id === 'marketplace' && target > 100) return this.errorReply("Dice can only be started for amounts 100 credits or less.");
		if (!this.canTalk()) return this.errorReply("You cannot start dice games while unable to speak.");

		let amount = isCredits(target);

		if (Db('credits').get(user.userid, 0) < amount) return this.errorReply("You don't have enough credits to start that dice game.");
		if (typeof amount === 'string') return this.sendReply(amount);
		if (!room.dice) room.dice = {};
		if (room.dice.started) return this.errorReply("A dice game has already started in this room.");

		room.dice.started = true;
		room.dice.bet = amount;
		room.dice.startTime = Date.now();

		room.addRaw("<div class='infobox' style='background: rgba(190, 190, 190, 0.4); border-radius: 2px;'><div style='background: url(\"http://i.imgur.com/otpca0K.png?1\") left center no-repeat;'><div style='background: url(\"http://i.imgur.com/rrq3gEp.png\") right center no-repeat;'><center><h2 style='color: #444;'><font color='" + color(toId(this.user.name)) + "'>" + user.name + "</font> has started a dice game for <font style='color: #F00; text-decoration: underline;'>" + amount + "</font>" + currencyName(amount) + ".</h2></center><center><button name='send' value='/joindice' style='border: 1px solid #dcdcdc; -moz-box-shadow:inset 0px 1px 0px 0px #fff; -webkit-box-shadow:inset 0px 1px 0px 0px #fff; box-shadow:inset 0px 1px 0px 0px #fff; background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f9f9f9), color-stop(1, #e9e9e9)); background:-moz-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-webkit-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-o-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-ms-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#f9f9f9\", endColorstr=\"#e9e9e9\",GradientType=0); background-color:#f9f9f9; -moz-border-radius:6px; -webkit-border-radius:6px; border-radius:6px; display:inline-block; cursor:pointer; color:#666; font-family:Arial; font-size:15px; font-weight:bold; padding:6px 24px; text-decoration:none; text-shadow:0px 1px 0px #fff;'>Click to join.</button></center><br /></div></div></div>");
		this.parse('/joindice');
	},
	startgamblehelp: ["/creditgame [bet] - Start a dice game to gamble for credits."],

	joingamble: function (target, room, user) {
		if (!room.dice || (room.dice.p1 && room.dice.p2)) return this.errorReply("There is no dice game in it's signup phase in this room.");
		if (!this.canTalk()) return this.errorReply("You may not join dice games while unable to speak.");
		if (room.dice.p1 === user.userid) return this.errorReply("You already entered this dice game.");
		if (Db('credits').get(user.userid, 0) < room.dice.bet) return this.errorReply("You don't have enough credits to join this game.");
		Db('credits').set(user.userid, Db('credits').get(user.userid) - room.dice.bet);
		if (!room.dice.p1) {
			room.dice.p1 = user.userid;
			room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
			return;
		}
		room.dice.p2 = user.userid;
		room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
		let p1Number = Math.floor(6 * Math.random()) + 1, p2Number = Math.floor(6 * Math.random()) + 1;

		let output = "<div class='infobox'>Game has two players, starting now.<br>Rolling the dice.<br>" + room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
		while (p1Number === p2Number) {
			output += "Tie... rolling again.<br>";
			p1Number = Math.floor(6 * Math.random()) + 1;
			p2Number = Math.floor(6 * Math.random()) + 1;
			output += room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
		}
		let winner = room.dice[p1Number > p2Number ? 'p1' : 'p2'];
		output += "<font color=#24678d><b>" + winner + "</b></font> has won <font color=#24678d><b>" + room.dice.bet + "</b></font>" + currencyName(room.dice.bet) + ".<br>Better luck next time " + room.dice[p1Number < p2Number ? 'p1' : 'p2'] + "!</div>";
		room.addRaw(output);
		Db('credits').set(winner, Db('credits').get(winner, 0) + room.dice.bet * 2);
		delete room.dice;
	},
	joingamblehelp: ["/joingamble - Joins a dice game."],

	endgamble: function (target, room, user) {
		if (!room.dice) return this.errorReply("There is no dice game in this room.");
		if ((Date.now() - room.dice.startTime) < 15000 && !user.can('broadcast', null, room)) return this.errorReply("Regular users may not end a dice game within the first minute of it starting.");
		if (room.dice.p2) return this.errorReply("Dice game has already started.");
		if (room.dice.p1) Db('credits').set(room.dice.p1, Db('credits').get(room.dice.p1, 0) + room.dice.bet);
		delete room.dice;
		room.addRaw("<b>" + user.name + " ended the dice game.");
	},
	endgamblehelp: ["/endgamble - Ends a dice game."],

	togglegambling: function (target, room, user) {
		if (room.id !== 'marketplace' && !room.isMarketplace) return this.errorReply("Can only toggle gambling in the Marketplace.");
		if (!this.can('declare', null, room)) return false;
		if (!target) return this.sendReply("Either toggle it on or off.");
		if (target === 'on') {
			if (toggleGambling === true) {
				return this.sendReply("We are already rolling");
			} else {
				toggleGambling = true;
				return this.sendReply("We are now rolling!");
			}
		}
		if (target === 'off') {
			if (toggleGambling === false) {
				return this.sendReply("We are not rolling right now.");
			} else {
				toggleGambling = false;
				return this.sendReply("We are not rolling anymore.");
			}
		}
	},
	togglegamblinghelp: ["/togglegambling - Enables or disables credit gambling. Requires & or #"],
};
