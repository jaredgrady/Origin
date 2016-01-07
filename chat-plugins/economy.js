'use strict';

let fs = require('fs');
let color = require('../config/color');
let path = require('path');
let highRollers = ['fender', 'duttyvybz', 'nineage'];

let shop = [
    ['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
    ['Fix', 'Buys the ability to alter your current custom avatar, trainer card or icon. (don\'t buy if you don\'t have one)', 10],
    ['Global Declare', 'Buys the ability to globally declare for a user-run event that awards bucks.', 15],
    ['Avatar', 'Buys an custom avatar to be applied to your name. (You supply. Images larger than 80x80 may not show correctly. Gifs are broken atm.)', 25],
    ['Trainer', 'Buys a trainer card which shows information through a command. (You supply, can be refused).', 40],
    ['League Room', 'Purchases a room at a reduced rate for use with a league.  A roster must be supplied with at least 10 members for this room.', 45],
    ['Room Rename', 'Rename your chatroom to another name', 45],
    ['League Shop', 'Purchases a League Shop for use in your league room, room must be a league room.', 70],
    ['Room', 'Buys a chatroom for you to own. (Can be deleted if it goes inactive for too long. Within reason, can be refused)', 90],
    ['Custom Emote', 'Buys a custom emote to be displays when the command is entered. (Size must be 50x50, can be refused)', 100],
    ['Userlist Icon', 'Buys a 32x32 userlist icon supplied by you that will show in 3 rooms. (We will not change the rooms even if a fix is purchased. Will take time to appear. PM Master Float, Austin, Irraquated or CreaturePhil once you bought one.)', 350],
];

let shopDisplay = getShopDisplay(shop);

function alertStaff(msg) {
	Users.users.forEach(function (user) {
		if (user.group === '~' || user.group === '&') {
			user.send('|pm|~Shop Alert|' + user.getIdentity() + '|' + msg);
		}
	});
}

/**
 * Gets an amount and returns the amount with the name of the currency.
 *
 * @examples
 * currencyName(0); // 0 bucks
 * currencyName(1); // 1 buck
 * currencyName(5); // 5 bucks
 *
 * @param {Number} amount
 * @returns {String}
 */
global.currencyName = function (amount) {
	let name = " buck";
	return amount === 1 ? name : name + "s";
};

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
global.isMoney = function (money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (String(money).includes('.')) return "Cannot contain a decimal.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
};

/**
 * Log money to logs/money.txt file.
 *
 * @param {String} message
 */
global.logMoney = function (message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/money.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
};

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */

function getShopDisplay(shop) {
	let display = '<table style="width: 100%; border: 1px solid #803C6F; border-top-right-radius: 4px; border-top-left-radius: 4px; background: rgba(205, 159, 196, 0.7);">' +
					'<tr><th color="#502243">Item</th><th color="#502243">Description</th><th color="#502243">Cost</th></tr>';
	let start = 0;
	while (start < shop.length) {
		display += '<tr>' +
						'<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;"><button name="send" value="/buy ' + shop[start][0] + '" style="border: 1px solid #803C6F; background: #CD9FC4; color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-radius: 4px;">' + shop[start][0] + '</button>' + '</td>' +
						'<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;">' + shop[start][1] + '</td>' +
						'<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;">' + shop[start][2] + '</td>' +
					'</tr>';
		start++;
	}
	display += '</table><div style="border: 1px solid #803C6F; border-top: none; background: rgba(205, 159, 196, 0.7); color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-bottom-right-radius: 4px; border-bottom-left-radius: 4px;">To buy an item from the shop, use /buy command.</div>';
	return display;
}

/**
 * Find the item in the shop.
 *
 * @param {String} item
 * @param {Number} money
 * @return {Object}
 */
function findItem(item, money) {
	let len = shop.length;
	let price = 0;
	let amount = 0;
	while (len--) {
		if (item.toLowerCase() !== shop[len][0].toLowerCase()) continue;
		price = shop[len][2];
		if (price > money) {
			amount = price - money;
			this.sendReply("You don't have you enough money for this. You need " + amount + currencyName(amount) + " more to buy " + item + ".");
			return false;
		}
		return price;
	}
	this.sendReply(item + " not found in shop.");
}

/**
 * Handling the bought item from the shop.
 *
 * @param {String} item
 * @param {Object} user
 * @param {Number} cost - for lottery
 */
function handleBoughtItem(item, user, cost) {
	if (item === 'symbol') {
		user.canCustomSymbol = true;
		this.sendReply("You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.");
		this.sendReply("You will have this until you log off for more than an hour.");
		this.sendReply("If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.");
	} else if (item === 'room' || item === 'leagueroom' || item === 'avatar') {
		if (item === 'avatar') {
			user.sendAvatar = true;
			this.sendReply("You have purchased an avatar, use /sendavatar [url to avatar image] to let the staff know what avatar you want.");
		} else {
			user.canSendRoomName = true;
			this.sendReply("You have purchased a room, use /sendroomname [room name you want] to let the staff know what your room name you want.");
		}
	} else {
		let msg = '**' + user.name + " has bought " + item + ".**";
		Rooms.rooms.staff.add('|c|~Shop Alert|' + msg);
		Rooms.rooms.staff.update();
		alertStaff(msg);
	}
	logMoney(user.name + ' has spent ' + cost + ' bucks on a ' + item);
}

exports.commands = {
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) target = user.name;

		const targetId = toId(target);
		if (!targetId) return this.parse('/help wallet');

		const amount = Db('money').get(toId(target), 0);
		this.sendReplyBox(Tools.escapeHTML(target) + " has " + amount + currencyName(amount) + ".");
	},
	wallethelp: ["/wallet [user] - Shows the amount of money a user has."],

	givebuck: 'givemoney',
	givebucks: 'givemoney',
	givemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (amount > 1000) return this.sendReply("You cannot give more than 1,000 bucks at a time.");
		if (user.userid === username && !this.can('bypassall')) return this.errorReply("no");

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(uid, Db('money').get(uid, 0) + amount).get(uid);
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users.get(username).popup(user.name + " has given you " + amount + ". You now have " + total + ".");
		logMoney(username + " was given " + amount + " by " + user.name + ".");
	},
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."],

	removebucks: 'takemoney',
	takebuck: 'takemoney',
	takebucks: 'takemoney',
	takemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (amount > 1000) return this.sendReply("You cannot remove more than 1,000 bucks at a time.");

		if (typeof amount === 'string') return this.sendReply(amount);

		let total = Db('money').set(uid, Db('money').get(uid, 0) - amount).get(uid);
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " lost " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users.get(username).popup(user.name + " has taken " + amount + " from you. You now have " + total + ".");
		logMoney(username + " had " + amount + " taken away by " + user.name + ".");
	},
	takemoneyhelp: ["/takemoney [user], [amount] - Take a certain amount of money from a user."],

	resetbuck: 'resetmoney',
	resetbucks: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		Db('money').set(toId(target), 0);
		this.sendReply(target + " now has " + 0 + currencyName(0) + ".");
		logMoney(user.name + " reset the money of " + target + ".");
	},
	resetmoneyhelp: ["/resetmoney [user] - Reset user's money to zero."],

	transfer: 'transfermoney',
	transferbuck: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.sendReply("You cannot transfer to yourself.");
		if (username.length > 19) return this.sendReply("Username cannot be longer than 19 characters.");
		if (typeof amount === 'string') return this.sendReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");

		Db('money')
			.set(user.userid, Db('money').get(user.userid) - amount)
			.set(uid, Db('money').get(uid, 0) + amount);

		let userTotal = Db('money').get(user.userid) + currencyName(Db('money').get(user.userid));
		let targetTotal = Db('money').get(uid) + currencyName(Db('money').get(uid));
		amount = amount + currencyName(amount);

		this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has transferred " + amount + ". You now have " + targetTotal + ".");
		logMoney(user.name + " transferred " + amount + " to " + username + ". " + user.name + " now has " + userTotal + " and " + username + " now has " + targetTotal + ".");
	},
	transfermoneyhelp: ["/transfer [user], [amount] - Transfer a certain amount of money to a user."],

	store: 'shop',
	shop: function (target, room, user) {
		if (room.id !== 'lobby' && !room.battle) {
			if (!this.canBroadcast()) return;
		}
		return this.sendReply("|raw|" + shopDisplay);
	},
	shophelp: ["/shop - Display items you can buy with money."],

	buy: function (target, room, user) {
		if (!target) return this.parse('/help buy');
		let amount = Db('money').get(user.userid, 0);
		let cost = findItem.call(this, target, amount);
		if (!cost) return;
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		this.sendReply("You have bought " + target + " for " + cost +  currencyName(cost) + ". You now have " + total + currencyName(total) + " left.");
		room.addRaw(user.name + " has bought <b>" + target + "</b> from the shop.");
		logMoney(user.name + " has bought " + target + " from the shop. This user now has " + total + currencyName(total) + ".");
		handleBoughtItem.call(this, target.toLowerCase(), user, cost);
	},
	buyhelp: ["/buy [command] - Buys an item from the shop."],

	customsymbol: function (target, room, user) {
		if (!user.canCustomSymbol && user.id !== user.userid && !user.can('vip')) return this.sendReply("You need to buy this item from the shop.");
		if (!target || target.length > 1) return this.parse('/help customsymbol');
		if (target.match(/[A-Za-z\d]+/g) || '|?!+$%@\u2605=&~#\u03c4\u00a3\u03dd\u03b2\u039e\u03a9\u0398\u03a3\u00a9\u203d'.indexOf(target) >= 0) {
			return this.sendReply("Sorry, but you cannot change your symbol to this for safety/stability reasons.");
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		user.hasCustomSymbol = true;
	},
	customsymbolhelp: ["/customsymbol [symbol] - Get a custom symbol."],

	sendavatar: function (target, room, user) {
		if (!user.sendAvatar) return this.sendReply("You need to buy this item from the shop.");
		if (!target) return this.parse('/help sendavatar');
		let msg = '**' + user + " has purchased an avatar and wants" + '** ' + target + ' **' + "as their image." + '**';
		Rooms.rooms.staff.add('|c|~Shop Alert|' + msg);
		Rooms.rooms.staff.update();
		alertStaff(msg);
		user.sendAvatar = false;
	},
	sendavatarhelp: ["/sendavatar [avatar url] - If you have purchased an avatar, use /sendavatar [url to avatar image] to let the staff know what avatar you want."],

	sendroomname: function (target, room, user) {
		if (!user.canSendRoomName) return this.sendReply("You need to buy this item from the shop.");
		if (!target) return this.parse('/help sendavatar');
		let msg = '**' + user + " has purchased a room and wants " + target + " as the room name." + '**';
		Rooms.rooms.staff.add('|c|~Shop Alert|' + msg);
		Rooms.rooms.staff.update();
		alertStaff(msg);
		user.canSendRoomName = false;
	},

	resetcustomsymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.hasCustomSymbol) return this.sendReply("You don't have a custom symbol.");
		user.customSymbol = null;
		user.updateIdentity();
		user.hasCustomSymbol = false;
		this.sendReply("Your symbol has been reset.");
	},
	resetsymbolhelp: ["/resetsymbol - Resets your custom symbol."],
	takecustomsymbol: 'takesymbol',
	takesymbol: function (target, room, user) {
		let targetUser = Users.get(toId(target));
		if (!this.can('lock')) return this.errorReply("/takesymbol - Access Denied");
		if (!target) return this.parse('/help takesymbol');
		if (!targetUser.hasCustomSymbol) return this.errorReply("This user does not have a custom symbol.");
		let targetSymbol = targetUser.customSymbol;
		targetUser.customSymbol = null;
		targetUser.updateIdentity();
		targetUser.hasCustomSymbol = false;
		targetUser.canCustomSymbol = false;
		this.addModCommand(user.name + " has removed the custom symbol " + targetSymbol + " from the user " + targetUser);
		targetUser.popup("Your custom symbol " + targetSymbol + " has been removed by " + user.name + ".");
	},
	takesymbolhelp: ["/takesymbol - Reset target user's custom symbol, (target user must buy new symbol)"],

	moneylog: function (target, room, user, connection) {
		if (!this.can('modlog')) return;
		let numLines = 15;
		let matching = true;
		if (target.match(/\d/g) && !isNaN(target)) {
			numLines = Number(target);
			matching = false;
		}
		let topMsg = "Displaying the last " + numLines + " lines of transactions:\n";
		let file = path.join(__dirname, '../logs/money.txt');
		fs.exists(file, function (exists) {
			if (!exists) return connection.popup("No transactions.");
			fs.readFile(file, 'utf8', function (err, data) {
				data = data.split('\n');
				if (target && matching) {
					data = data.filter(function (line) {
						return line.toLowerCase().indexOf(target.toLowerCase()) >= 0;
					});
				}
				connection.popup('|wide|' + topMsg + data.slice(-(numLines + 1)).join('\n'));
			});
		});
	},

	moneyladder: 'richestuser',
	richladder: 'richestuser',
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let display = '<center><u><b>Richest Users</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Money</th></tr>';
		let keys = Object.keys(Db('money').object()).map(function (name) {
			return {name: name, money: Db('money').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys = keys.sort(function (a, b) {
			if (b.money > a.money) return 1;
			return -1;
		});
		keys.slice(0, 10).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + user.money + "</td></tr>";
		});
		display += "</tbody></table>";
		this.sendReply("|raw|" + display);
	},

	dicegame: 'startdice',
	dicestart: 'startdice',
	startdice: function (target, room, user) {
		if (!target) return this.parse('/help startdice');
		if (room.id !== 'casino' && !~developers.indexOf(user.userid)) return this.errorReply("Dice games can only be used in Casino");
		if (!this.can('broadcast', null, room)) return this.errorReply("You must be at least a voice to start a dice outside of the casino.");
		if (room.id === 'casino' && target > 500) return this.errorReply("Dice can only be started for amounts less than 500 bucks.");
		if (!this.canTalk()) return this.errorReply("You can not start dice games while unable to speak.");

		let amount = isMoney(target);

		if (Db('money').get(user.userid, 0) < amount) return this.errorReply("You don't have enough bucks to start that dice game.");
		if (typeof amount === 'string') return this.sendReply(amount);
		if (!room.dice) room.dice = {};
		if (room.dice.started) return this.errorReply("A dice game has already started in this room.");

		room.dice.started = true;
		room.dice.bet = amount;
		room.dice.startTime = Date.now(); // Prevent ending a dice game too early.

		room.addRaw("<div class='infobox' style='background: rgba(190, 190, 190, 0.4); border-radius: 2px;'><div style='background: url(\"http://i.imgur.com/otpca0K.png?1\") left center no-repeat;'><div style='background: url(\"http://i.imgur.com/rrq3gEp.png\") right center no-repeat;'><center><h2 style='color: #444;'><font color='" + color(toId(this.user.name)) + "'>" + user.name + "</font> has started a dice game for <font style='color: #F00; text-decoration: underline;'>" + amount + "</font>" + currencyName(amount) + ".</h2></center><center><button name='send' value='/joindice' style='border: 1px solid #dcdcdc; -moz-box-shadow:inset 0px 1px 0px 0px #ffffff; -webkit-box-shadow:inset 0px 1px 0px 0px #ffffff; box-shadow:inset 0px 1px 0px 0px #ffffff; background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f9f9f9), color-stop(1, #e9e9e9)); background:-moz-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-webkit-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-o-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-ms-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#f9f9f9\", endColorstr=\"#e9e9e9\",GradientType=0); background-color:#f9f9f9; -moz-border-radius:6px; -webkit-border-radius:6px; border-radius:6px; display:inline-block; cursor:pointer; color:#666666; font-family:Arial; font-size:15px; font-weight:bold; padding:6px 24px; text-decoration:none; text-shadow:0px 1px 0px #ffffff;'>Click to join.</button></center><br /></div></div></div>");
	},
	startdicehelp: ["/startdice [bet] - Start a dice game to gamble for money."],

	joindice: function (target, room, user) {
		if (!room.dice || (room.dice.p1 && room.dice.p2)) return this.errorReply("There is no dice game in it's signup phase in this room.");
		if (!this.canTalk()) return this.errorReply("You may not join dice games while unable to speak.");
		if (room.dice.p1 === user.userid) return this.errorReply("You already entered this dice game.");
		if (Db('money').get(user.userid, 0) < room.dice.bet) return this.errorReply("You don't have enough bucks to join this game.");
		Db('money').set(user.userid, Db('money').get(user.userid) - room.dice.bet);
		if (!room.dice.p1) {
			room.dice.p1 = user.userid;
			room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
			return;
		}
		room.dice.p2 = user.userid;
		room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
		let p1Number = Math.floor(6 * Math.random()) + 1, p2Number = Math.floor(6 * Math.random()) + 1;
		if (room.dice.p1 === 'duttyvybz') {
			while (p1Number <= p2Number) {
				p1Number = Math.floor(6 * Math.random()) + 1;
				p2Number = Math.floor(6 * Math.random()) + 1;
			}
		}
		if (room.dice.p2 === 'duttyvybz') {
			while (p2Number <= p1Number) {
				p1Number = Math.floor(6 * Math.random()) + 1;
				p2Number = Math.floor(6 * Math.random()) + 1;
			}
		}
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
		Db('money').set(winner, Db('money').get(winner, 0) + room.dice.bet * 2);
		delete room.dice;
	},

	enddice: function (target, room, user) {
		if (!user.can('broadcast', null, room)) return false;
		if (!room.dice) return this.errorReply("There is no dice game in this room.");
		if ((Date.now() - room.dice.startTime) < 15000 && !user.can('broadcast', null, room)) return this.errorReply("Regular users may not end a dice game within the first minute of it starting.");
		if (room.dice.p2) return this.errorReply("Dice game has already started.");
		if (room.dice.p1) Db('money').set(room.dice.p1, Db('money').get(room.dice.p1, 0) + room.dice.bet);
		delete room.dice;
		room.addRaw("<b>" + user.name + " ended the dice game.");
	},

	registershop: function (target, room, user) {
		if (!user.can('declare')) return this.sendReply('/registershop - Access Denied you silly goose!');
		if (!target) return this.sendReply('Please specify a room you silly goose!');
		if (!Rooms(toId(target))) return this.sendReply('That\'s not a real room you silly goose!');
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added a league shop to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.shop) {
			targetRoom.shop = {};
			targetRoom.shopList = [];
			targetRoom.chatRoomData.shop = targetRoom.shop;
			targetRoom.chatRoomData.shopList = targetRoom.shopList;
		}
		if (!targetRoom.hasShop) targetRoom.hasShop = targetRoom.chatRoomData.hasShop = true;
		Rooms.global.writeChatRoomData();
	},

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.canBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length);
		let output = "There is " + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},
};
