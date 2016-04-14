'use strict';
/********************
 * Money System
 * (Formerly economy.js)
 * This file handles the money system and some of its key commands, including dice games and the shop
********************/
let fs = require('fs');
let color = require('../config/color');
let path = require('path');
let rankLadder = require('../rank-ladder');
let highRollers = ['fender', 'madschemin', 'tyedolla'];
let toggleRolling = false;

let shop = [
    ['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
    ['Fix', 'Buys the ability to alter your current custom avatar, trainer card, title or icon. (don\'t buy if you don\'t have one)', 10],
    ['Title', 'Buys an custom title that will appear next to your name in profile. (You select the text and color of your title. Can be refused within reason.)', 10],
    ['Global Declare', 'Buys the ability to globally declare for a user-run event that awards bucks.', 15],
    ['Avatar', 'Buys an custom avatar to be applied to your name. (You supply. Images larger than 80x80 may not show correctly, can be refused.)', 25],
    ['Extra Rooms for Icon', 'Allows your icon to appear in an extra room, PM Master Float or AuraStormLucario with the extra room you want (Will take time to appear).', 30],
    ['Trainer', 'Buys a trainer card which shows information through a command. (You supply, can be refused).', 40],
    ['League Room', 'Purchases a room at a reduced rate for use with a league.  A roster must be supplied with at least 10 members for this room.', 45],
    ['Room Rename', 'Rename your chatroom to another name', 45],
    ['League Shop', 'Purchases a League Shop for use in your league room, room must be a league room.', 70],
    ['Room', 'Buys a chatroom for you to own. (Can be deleted if it goes inactive for too long. Within reason, can be refused. You are responsible for your room, if you get in trouble your room may be deleted.)', 90],
    ['Custom Emote', 'Buys a custom emote to be displays when the command is entered. (Size must be 50x50, can be refused)', 100],
    ['Userlist Icon', 'Purchases a userlist icon of your choice, PM Master Float or AuraStormLucario with the icon and rooms you want it in (Size must be 32x32, 3 rooms maximum, will take time to appear).', 350],
    ['Room Icon', 'Purchases an icon of your choice for the top of the userlist in your chatroom. (Must be approved by room founder of room)', 400],
    ['Custom PM-box Theme', 'Buys a customizable PM theme for people to see when they PM you. PM Master Float to get it customized. Example with Neo\'s: <a href="http:\/\/i.imgur.com/ToSmCbs.png">Custom PM-box</a>', 500],
];

let shopDisplay = getShopDisplay(shop);

function alertStaff(msg) {
	Users.users.forEach(function (user) {
		if (user.isStaff) {
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
	let display = '<center><b><font color="red" size="4">Read the description of the item you want to buy if you haven\'t already.</font></b></center></center><div style="box-shadow: 4px 4px 4px #000 inset, -4px -4px 4px #000 inset, 5px 3px 8px rgba(0, 0, 0, 0.6); max-height: 310px; overflow-y: scroll;"><table style="width: 100%; border-collapse: collapse;"><table style="width: 100%; border-collapse: collapse;"><tr><th colspan="3" class="table-header" style="background: -moz-linear-gradient(right, #09263A, #03121C); background: -webkit-linear-gradient(left, #09263A, #03121C); background: -o-linear-gradient(right, #09263A, #03121C); background: linear-gradient(right, #09263A, #03121C); padding: 8px 20px 16px 8px; box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset; text-shadow: 1px 1px #0A2D43, 2px 2px #0A2D43, 3px 3px #0A2D43, 4px 4px #0A2D43, 5px 5px #0A2D43, 6px 6px #0A2D43, 7px 7px #0A2D43, 8px 8px #0A2D43, 9px 9px #0A2D43, 10px 10px #0A2D43;"><h2>Origins Shop</h2></th></tr>' +
		'<tr><th class="table-header" style="background: -moz-linear-gradient(#173C54, #061C2A); background: -webkit-linear-gradient(#173C54, #061C2A); background: -o-linear-gradient(#173C54, #061C2A); background: linear-gradient(#173C54, #061C2A); box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset;">Item</th><th class="table-header" style="background: -moz-linear-gradient(#173C54, #061C2A); background: -webkit-linear-gradient(#173C54, #061C2A); background: -o-linear-gradient(#173C54, #061C2A); background: linear-gradient(#173C54, #061C2A); box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset;">Description</th><th class="table-header" style="background: -moz-linear-gradient(#173C54, #061C2A); background: -webkit-linear-gradient(#173C54, #061C2A); background: -o-linear-gradient(#173C54, #061C2A); background: linear-gradient(#173C54, #061C2A); box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset;">Cost</th></tr>';
	let start = 0;
	while (start < shop.length) {
		display += '<tr><td class="table-option"><button class="table-btn" name="send" value="/buy ' + shop[start][0] + '">' + shop[start][0] + '</button></td>' +
			'<td class="table-option">' + shop[start][1] + '</td>' +
			'<td class="table-option">' + shop[start][2] + '</td></tr>';
		start++;
	}
	display += '</table></div>';
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
			this.sendReply("|raw|<div class='brodcast-green'>You have purchased an avatar, use /sendavatar [url to avatar image] to let the staff know what avatar you want.</div>");
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
	balance: 'wallet',
	bal: 'wallet',
	atm: 'wallet',
	purse: 'wallet',
	wallet: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;

		const targetId = toId(target);
		if (!targetId) return this.parse('/help wallet');

		const amount = Db('money').get(targetId, 0);
		this.sendReplyBox('<b><font color="' + color(targetId) + '">' + Tools.escapeHTML(target) + '</font></b> has ' + amount + currencyName(amount) + '.');
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
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");

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
		if (amount > Db('money').get(uid)) return this.sendReply("The user's total money is less than " + amount + ".");
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");

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

	forcetransfer: 'transfermoney',
	transfer: 'transfermoney',
	transferbuck: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user, connection, cmd) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.sendReply("You cannot transfer to yourself.");
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
		if (typeof amount === 'string') return this.sendReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");
		if (!Users.get(username) && cmd !== 'forcetransfer') return this.errorReply("The target user could not be found");
		if (Users.get(username)) {
			if (!Users.get(username).registered && cmd !== 'forcetransfer') {
				return this.errorReply("WARNING: The user you are trying to transfer to is unregistered. If you want to transfer anyway use /forcetransfer [user], [amount]");
			}
		}
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
			if (!this.runBroadcast()) return;
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
	sendroomnamehelp: ["/sendroomname [name] - If you have purchased a room, use /sendroomname [name] to let staff know what you want your room to be called."],

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
		if (!this.can('lock')) return this.errorReply("/takesymbol - Access denied");
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
		let numLines = 14;
		let matching = true;
		if (target && /\,/i.test(target)) {
			let parts = target.split(",");
			if (!isNaN(parts[parts.length - 1])) {
				numLines = Number(parts[parts.length - 1]) - 1;
				target = parts.slice(0, parts.length - 1).join(",");
			}
		} else if (target.match(/\d/g) && !isNaN(target)) {
			numLines = Number(target) - 1;
			matching = false;
		}
		let topMsg = "Displaying the last " + (numLines + 1) + " lines of transactions:\n";
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
	moneyloghelp: ["/moneylog - Displays a log of all transactions in the economy."],

	baltop: 'richestuser',
	moneyladder: 'richestuser',
	richladder: 'richestuser',
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db('money').object()).map(function (name) {
			return {name: name, money: Db('money').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Money ladder is empty.");
		keys.sort(function (a, b) { return b.money - a.money; });
		this.sendReplyBox(rankLadder('Richest Users', 'Money', keys.slice(0, 100), 'money'));
	},
	richestuserhelp: ["/moneyladder or /richestuser - Displays users ranked by the amount of Origin Bucks they possess."],

	registershop: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/registershop - Access denied");
		if (!target) return this.errorReply("Please specifiy a room. Use /help registershop for more information.");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
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
	registershophelp: ["/registershop [room] - Adds a league shop to a room. Requires & ~"],

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length);
		let output = "There is " + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},
	economystatshelp: ["/economystats - Gives information about the state of the economy."],

	togglerolling: function (target, room, user) {
		if (!this.can('bypassall') && !~highRollers.indexOf(user.userid)) return false;
		if (!target) return this.sendReply("Either toggle it on or off.");
		if (target === 'on') {
			if (toggleRolling === true) {
				return this.sendReply("We are already rolling");
			} else {
				toggleRolling = true;
				return this.sendReply("We are now rolling!");
			}
		}
		if (target === 'off') {
			if (toggleRolling === false) {
				return this.sendReply("We are not rolling right now.");
			} else {
				toggleRolling = false;
				return this.sendReply("We are not rolling anymore.");
			}
		}
	},
	togglerollinghelp: ["/togglerolling - Enables or disables dice globally. Requires ~"],

	cleaneconomy: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		let moneyObject = Db('money').object();
		Object.keys(moneyObject)
			.filter(function (name) {
				return Db('money').get(name) < 1;
			})
			.forEach(function (name) {
				delete moneyObject[name];
			});
		Db.save();
		this.sendReply("All users who has less than 1 buck are now removed from the database.");
	},
	cleaneconomyhelp: ["/cleaneconomy - Cleans economy databases by removing users with less than one buck. Requires ~"],
};
