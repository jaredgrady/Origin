'use strict';
/******************************************************
 * Blackjack chat-plugin cretaed by CreaturePhil and  *
 * Prepared for Origin by fender and AuraStormLucario *
 ******************************************************/
const color = require('../config/color');

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

/**
 * Card Constructor
 *
 * @param {Number|String} rank
 * @param {String} suit
 */
function Card(rank, suit) {
	this.rank = rank;
	this.suit = suit;
}

/**
 * Get all the ranks!
 *
 * @static
 * @return {Array[Number|String]}
 */
Card.Ranks = function () {
	return [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
};

/**
 * Get suits.
 *
 * @static
 * @return {Array[String]}
 */
Card.Suits = function () {
	return ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
};

/**
 * Get the value of a card.
 *
 * @param {Object} card
 * @return {Number}
 */
Card.getValue = function (card) {
	if (typeof card.rank === 'number') {
		return card.rank;
	} else if (card.rank === 'A') {
		return 1;
	} else {
		return 10;
	}
};

/**
 * Get string representation of a card.
 *
 * @return {String}
 */
Card.prototype.toString = function () {
	return this.rank + ' ' + this.suit;
};

/**
 * Deck Constructor
 */
function Deck() {
	this.cards = [];
	Card.Suits().forEach(function (suit) {
		Card.Ranks().forEach(function (rank) {
			this.cards.push(new Card(rank, suit));
		}.bind(this));
	}.bind(this));
}

/**
 * Draw a random card from the deck.
 *
 * @return {Card}
 */
Deck.prototype.drawCard = function () {
	let randomNumber = Math.floor(Math.random() * this.cards.length);
	return this.cards.splice(randomNumber, 1)[0];
};

/**
 * Get string representation of a deck.
 *
 * @return {String}
 */
Deck.prototype.toString = function () {
	return this.cards.join(", ");
};

let BJView = {
	busted: function (player) {
		this.addRaw("<b>" + player.name + " has <i>busted</i>!");
	},

	create: function (creator, pot) {
		let output = "<div class='infobox'><center><h2><b>Blackjack Game</b></h2>";
		output += "<span style='padding:20px'><b>Created by:</b> " + creator + "</span>";
		output += "<span style='padding:20px'>Pot: <span style='color:red'>" + pot + "</span></span>";
		output += "<br /><button name='send' value='/bj join' style='margin: 5px'>Join</button>";
		output += "</center></div>";
		this.addRaw(output);
	},

	end: function (winner) {
		let output = "<b>The blackjack game has ended. The winner is <font color='#24678d'>";
		output += winner.name + "</font> with " + winner.hand.join(", ") + " in hand!</b>";
		this.addRaw(output);
	},

	hit: function (player, card, hand) {
		this.addRaw("<b>" + player + " got " + card + ". Now " + player + " has " + hand + " in hand.</b>");
	},

	join: function (player) {
		this.addRaw("<b>" + player + " joined the blackjack game.</b>");
	},

	noWinner: function () {
		this.addRaw("<b>The blackjack game has ended. There is no winner.");
	},

	start: function (players, getPlayer) {
		let output = "<div class='infobox'><center><b>The blackjack game has started!</b><br />";
		output += "<b>There are " + players.length + " players.</b><br />";
		players.forEach(function (player) {
			output += "<b><font color='" + color(player) + "'>" + player + ": </font></b> " + getPlayer[player].hand.join(", ") + "<br />";
		});
		output += "</center></div>";
		this.addRaw(output);
	},

	turn: function (player) {
		this.addRaw("<b>It is " + player + "'s turn.</b>");
	},
};

/**
 * Blackjack Constructor
 *
 * @param {Number} number
 * @param {Object} room
 * @param {String} creator - the user who created the Blackjack game
 */
function Blackjack(pot, room, creator) {
	// Create a new deck.
	this.deck = new Deck();

	// The entry ante.
	this.pot = pot;

	// Money to be won.
	this.payout = 0;

	// Boolean to check if a blackjack game has started or not.
	this.started = false;

	// All players containing their name, hand, and hand total.
	this.players = {};

	// The order of player's turn.
	this.turns = [];

	// The current turn of a blackjack game.
	this.currentTurn = '';

	// The room in which the blackjack game is played in.
	this.room = room;

	// Display that a new blackjack game has been created.
	BJView.create.call(this.room, creator, pot);
}

/**
 * Start a blackjack game.
 */
Blackjack.prototype.startGame = function () {
	this.started = true;
	this.turns = Object.keys(this.players);

	this.turns.forEach(function (player) {
		this.hit(player, true);
		this.hit(player, true);
	}.bind(this));

	BJView.start.call(this.room, this.turns, this.players);

	this.nextTurn();
};

/**
 * Changes the current turn.
 * Ends the game if the all players have finished their turns.
 */
Blackjack.prototype.nextTurn = function () {
	this.currentTurn = this.turns.shift();
	if (!this.currentTurn) {
		let winner = this.chooseWinner();
		this.endGame(winner);
	} else {
		BJView.turn.call(this.room, this.currentTurn);
	}
};

/**
 * Choose the winner of the blackjack game.
 *
 * @return {Object} winner;
 */
Blackjack.prototype.chooseWinner = function () {
	let winner = Object.keys(this.players).reduce(function (acc, cur) {
		let accP = this.players[acc];
		let curP = this.players[cur];
		if (!curP) return accP;
		if (!accP) return curP;
		return accP.total > curP.total ? accP : curP;
	}.bind(this));

	if (typeof winner === 'string') {
		winner = this.players[winner];
	}

	return winner;
};

/**
 * End the blackjack game.
 *
 * @param {Object} winner
 */
Blackjack.prototype.endGame = function (winner) {
	BJView.end.call(this.room, winner);
	let winnings = Db("money").get(toId(winner), 0) + this.room.bj.payout;
	Db("money").set(toId(winner), winnings);
	this.room.bj = null;
};

/**
 * Checks if a player is in the blackjack game.
 *
 * @param {String} player
 * @return {Boolean}
 */
Blackjack.prototype.isPlayerInGame = function (player) {
	return this.players.hasOwnProperty(player) === true;
};

/**
 * Checks if it a player's turn.
 *
 * @param {String} player
 * @return {Boolean}
 */
Blackjack.prototype.isPlayerTurn = function (player) {
	return this.currentTurn === player;
};

/**
 * Add a player to the blackjack game.
 *
 * @param {String} player
 */
Blackjack.prototype.addPlayer = function (player) {
	this.players[player] = {name: player, hand: [], total: 0};
	this.payout += this.room.bj.pot;
	BJView.join.call(this.room, player);
};

/**
 * Add a card to your hand.
 *
 * @param {String} player
 * @param {Boolean} silence - Don't display to the room
 */
Blackjack.prototype.hit = function (player, silence) {
	let card = this.deck.drawCard();
	this.players[player].hand.push(card);
	this.players[player].total += Card.getValue(card);

	if (silence) return;

	BJView.hit.call(this.room, player, card.toString(), this.players[player].hand.join(', '));
};

/**
 * Check to see if a player won or bust.
 *
 * @param {String} player
 */
Blackjack.prototype.hasPlayerWinOrBust = function (player) {
	let total = this.players[player].total;
	if (total === 21) {
		this.endGame(this.players[player]);
	} else if (total > 21) {
		BJView.busted.call(this.room, this.players[player]);
		delete this.players[player];

		// Special case when all players are busted.
		if (Object.keys(this.turns).length === 0) {
			this.room.bj = null;
			return BJView.noWinner.call(this.room);
		}

		this.nextTurn();
	}
};

exports.commands = {
	bj: 'blackjack',
	blackjack: {
		new: 'create',
		create: function (target, room, user) {
			if (!this.can('broadcast', null, room)) return false;
			if (!room.bjEnabled) return this.errorReply('Blackjack is currently disabled.');
			if (room.bj) return this.sendReply("A blackjack game has already been created in this room.");

			let amount = isMoney(target);
			if (typeof amount === 'string') return this.sendReply(amount);

			room.bj = new Blackjack(amount, room, user.name);
		},

		join: function (target, room, user) {
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			if (room.bj.started) return this.sendReply("A blackjack game has already started in this room.");
			if (room.bj.isPlayerInGame(user.userid)) return this.sendReply("You are already in this blackjack game.");
			if (Db("money").get(user.userid, 0) < room.bj.pot) return this.errorReply('You do not have enough bucks to play');
			room.bj.addPlayer(user.userid);
			let ante = Db("money").get(user.userid, 0) - room.bj.pot;
			Db("money").set(user.userid, ante);
		},

		start: function (target, room, user) {
			if (!this.can('broadcast', null, room)) return false;
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			if (room.bj.started) return this.sendReply("A blackjack game has already started in this room.");
			if (Object.keys(room.bj.players).length < 2) return this.sendReply("|raw|<b>There aren't enough users.</b>");

			room.bj.startGame();
		},

		hit: function (target, room, user) {
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			if (!room.bj.started) return this.sendReply("A blackjack game has not started.");
			if (!room.bj.isPlayerInGame(user.userid)) return this.sendReply("You are not in this blackjack game.");
			if (!room.bj.isPlayerTurn(user.userid)) return this.sendReply("It is not your turn.");

			room.bj.hit(user.userid);
			room.bj.hasPlayerWinOrBust(user.userid);
		},

		stand: function (target, room, user) {
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			if (!room.bj.started) return this.sendReply("A blackjack game has not started.");
			if (!room.bj.isPlayerInGame(user.userid)) return this.sendReply("You are not in this blackjack game.");
			if (!room.bj.isPlayerTurn(user.userid)) return this.sendReply("It is not your turn.");

			room.bj.nextTurn();
		},

		hand: function (target, room, user) {
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			if (!room.bj.started) return this.sendReply("A blackjack game has not started.");
			if (!room.bj.isPlayerInGame(user.userid)) return this.sendReply("You are not in this blackjack game.");
			if (!room.bj.isPlayerInGame(user.userid)) return this.sendReply("You are not in this blackjack game.");

			this.sendReply("Your hand: " + room.bj.players[user.userid].hand.join(', '));
		},

		deck: function (target, room, user) {
			if (!this.can('declare', null, room)) return false;
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			if (room.bj.isPlayerInGame(user.userid)) return this.sendReply("You can't not view the deck if you are in the game.");

			this.sendReply("Current blackjack game deck: " + room.bj.deck.toString());
		},

		stop: 'end',
		end: function (target, room, user) {
			if (!user.can('broadcast', null, room)) return false;
			if (!room.bj) return this.sendReply("A blackjack game has not been created.");
			let moneyBack = Object.keys(room.bj.players);
			let curMoney;
			for (let u = 0; u <= moneyBack.length; u++) {
				curMoney = Db("money").get(toId(u), 0) + room.bj.pot;
				Db("money").get(toId(u), curMoney);
			}
			room.bj = null;
			room.addRaw("<b>" + user.name + " ended the blackjack game.</b>");
		},

		enable: function (target, room, user, cmd) {
			if (room.id !== 'casino') return this.errorReply('Can only be used in casino.');
			if (!user.can('makechatroom')) return this.errorReply('/blackjack enable - Access Denied.');
			room.bjEnabled = true;
			this.sendReply("Blackjack has been enabled.");
		},

		disable: function (target, room, user, cmd) {
			if (room.id !== 'casino') return this.errorReply('Can only be used in casino.');
			if (!user.can('makechatroom')) return this.errorReply('/blackjack disable - Access Denied.');
			room.bjEnabled = false;
			this.sendReply("Blackjack has been disabled.");
		},

		help: function (target, room, user) {
			this.parse('/help blackjack');
		},
	},
	bjhelp: 'blackjackhelp',
	blackjackhelp: ["- /blackjack new - ",
		"- /blackjack join - ",
		"- /blackjack start - ",
		"- /blackjack hit - ",
		"- /blackjack stand - ",
		"- /blackjack hand - ",
		"- /blackjack deck - ",
		"- /blackjack end - ",
		"- /blackjack enable - Enable the playing of blackjack. Requires: ~",
		"- /blackjack disable - Disable the playing of blackjack. Requires: ~"],
};
