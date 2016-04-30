'use strict';

const fs = require('fs');
let color = require('../config/color');
let path = require('path');
let rankLadder = require('../rank-ladder');

let creditShop = [
    ['Rose Ticket', 'Can be exchanged for 5 bucks ', 15],
    ['Red Ticket', 'Can be exchanged for one PSGO pack ', 20],
    ['Cyan Ticket', 'Can be exchanged for 15 bucks ', 30],
    ['Blue Ticket', 'Can be exchanged for 2 PSGO packs ', 35],
    ['Orange Ticket', 'Can be exchanged for a recolored avatar and 10 bucks ', 50],
    ['Violet Ticket', 'Can be exchanged for a recolored avatar, 1 PSGO pack and 20 bucks', 75],
    ['Yellow Ticket', 'Can be exchanged for 5 PSGO packs', 80],
    ['White Ticket', 'Can be exchanged for 50 bucks', 90],
    ['Green Ticket', 'Can be exchanged for a recolored avatar, 30 bucks and 2 PSGO packs', 100],
    ['Black Ticket', 'Can be exchanged for 100 bucks', 175],
    ['Silver Ticket', 'Can be exchanged for 1 PSGO pack and 20 bucks', 55],
    ['Crystal Ticket', 'Can be exchanged for 2 cards from the Marketpace ATM showcase', 100],
    ['Gold Ticket', 'Can be exchanged for 2 PSGO packs and 50 bucks', 120],
    ['Ruby Ticket', 'Can be exchanged for 5 PSGO packs, 50 bucks and an avatar recolor', 200],
    ['Sapphire Ticket', 'Can be exchanged for 7 PSGO packs and 100 bucks', 280],
    ['Emerald Ticket', 'Can be exchanged for 5 PSGO packs, 100 bucks and Marketplace Partner (Can be taken away if neccesary)', 325],
    ['Rainbow Ticket', 'Can be exchanged for 10 PSGO packs and 100 bucks', 515],
];


let creditShopDisplay = getShopDisplay(creditShop);

function getShopDisplay(creditShop) {
	let display = '<center><b><font color="red" size="4">Read the description of the ticket you want to buy if you haven\'t already.<br>When you buy your ticekt, PM a & or # to claim your reward.</font></b></center></center><div style="box-shadow: 4px 4px 4px #000 inset, -4px -4px 4px #000 inset, 5px 3px 8px rgba(0, 0, 0, 0.6); max-height: 310px; overflow-y: scroll;"><table style="width: 100%; border-collapse: collapse;"><table style="width: 100%; border-collapse: collapse;"><tr><th colspan="3" class="table-header" style="background: -moz-linear-gradient(right, #09263A, #03121C); background: -webkit-linear-gradient(left, #09263A, #03121C); background: -o-linear-gradient(right, #09263A, #03121C); background: linear-gradient(right, #09263A, #03121C); padding: 8px 20px 16px 8px; box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset; text-shadow: 1px 1px #0A2D43, 2px 2px #0A2D43, 3px 3px #0A2D43, 4px 4px #0A2D43, 5px 5px #0A2D43, 6px 6px #0A2D43, 7px 7px #0A2D43, 8px 8px #0A2D43, 9px 9px #0A2D43, 10px 10px #0A2D43;"><h2>Marketplace Credit Shop</h2></th></tr>' +
		'<tr><th class="table-header" style="background: -moz-linear-gradient(#173C54, #061C2A); background: -webkit-linear-gradient(#173C54, #061C2A); background: -o-linear-gradient(#173C54, #061C2A); background: linear-gradient(#173C54, #061C2A); box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset;">Item</th><th class="table-header" style="background: -moz-linear-gradient(#173C54, #061C2A); background: -webkit-linear-gradient(#173C54, #061C2A); background: -o-linear-gradient(#173C54, #061C2A); background: linear-gradient(#173C54, #061C2A); box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset;">Description</th><th class="table-header" style="background: -moz-linear-gradient(#173C54, #061C2A); background: -webkit-linear-gradient(#173C54, #061C2A); background: -o-linear-gradient(#173C54, #061C2A); background: linear-gradient(#173C54, #061C2A); box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8) inset;">Cost</th></tr>';
	let start = 0;
	while (start < creditShop.length) {
		display += '<tr><td class="table-option"><button class="table-btn" name="send" value="/buy ' + creditShop[start][0] + '">' + creditShop[start][0] + '</button></td>' +
			'<td class="table-option">' + creditShop[start][1] + '</td>' +
			'<td class="table-option">' + creditShop[start][2] + '</td></tr>';
		start++;
	}
	display += '</table></div>';
	return display;
}

global.creditsName = function (amount) {
	let name = " credit";
	return amount === 1 ? name : name + "s";
};

global.isCredits = function (credits) {
	let numCredits = Number(credits);
	if (isNaN(credits)) return "Must be a number.";
	if (String(credits).includes('.')) return "Cannot contain a decimal.";
	if (numCredits < 1) return "Cannot be less than one credit.";
	return numCredits;
};

global.logCredits = function (message) {
	if (!message) return;
	let file = path.join(__dirname, '../logs/credits.txt');
	let date = "[" + new Date().toUTCString() + "] ";
	let msg = message + "\n";
	fs.appendFile(file, date + msg);
};

exports.commands = {
	catm: 'creditatm',
	creditatm: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;

		const targetId = toId(target);
		if (!targetId) return this.parse('/help creditatm');

		const amount = Db('credits').get(targetId, 0);
		this.sendReplyBox('<b><font color="' + color(targetId) + '">' + Tools.escapeHTML(target) + '</font></b> has ' + amount + currencyName(amount) + '.');
	},
	creditatmhelp: ["/creditatm [user] - Shows the amount of credits a user has."],

	givecredits: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credits can only be given out in the Marketplace");
		if (!this.can('declare', null, room)) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givecredits');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isCredits(parts[1]);

		if (amount > 1000) return this.sendReply("You cannot give more than 1,000 credits at a time.");
		if (user.userid === username && !this.can('bypassall')) return this.errorReply("no");
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('credits').set(uid, Db('credits').get(uid, 0) + amount).get(uid);
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users.get(username).popup(user.name + " has given you " + amount + ". You now have " + total + ".");
		logCredits(username + " was given " + amount + " by " + user.name + ".");
	},
	givecreditshelp: ["/givecredits [user], [amount] - Give a user a certain amount of credits."],

	takecredits: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credits can only be taken in the Marketplace");
		if (!this.can('declare', null, room)) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takecredits');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isCredits(parts[1]);

		if (amount > 1000) return this.sendReply("You cannot remove more than 1,000 credits at a time.");
		if (amount > Db('credits').get(uid)) return this.sendReply("The user's total credits is less than " + amount + ".");
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");

		if (typeof amount === 'string') return this.sendReply(amount);

		let total = Db('credits').set(uid, Db('credits').get(uid, 0) - amount).get(uid);
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " lost " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users.get(username).popup(user.name + " has taken " + amount + " from you. You now have " + total + ".");
		logCredtis(username + " had " + amount + " taken away by " + user.name + ".");
	},
	takecreditshelp: ["/takecredits [user], [amount] - Take a certain amount of credits from a user."],

	resetcredits: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credits can only be reset in the Marketplace");
		if (!this.can('declare', null, room)) return false;
		Db('credits').set(toId(target), 0);
		this.sendReply(target + " now has " + 0 + currencyName(0) + ".");
		logCredits(user.name + " reset the credits of " + target + ".");
	},
	resetcreditshelp: ["/resetcredits [user] - Reset user's credits to zero."],

	transfercredits: function (target, room, user, connection, cmd) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfercredits');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isCredits(parts[1]);

		if (toId(username) === user.userid) return this.sendReply("You cannot transfer to yourself.");
		if (username.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
		if (typeof amount === 'string') return this.sendReply(amount);
		if (amount > Db('credits').get(user.userid, 0)) return this.errorReply("You cannot transfer more credits than what you have.");
		if (!Users.get(username) && cmd !== 'transfercredits') return this.errorReply("The target user could not be found");
		Db('credits')
			.set(user.userid, Db('credits').get(user.userid) - amount)
			.set(uid, Db('credits').get(uid, 0) + amount);

		let userTotal = Db('credits').get(user.userid) + currencyName(Db('credits').get(user.userid));
		let targetTotal = Db('credits').get(uid) + currencyName(Db('credits').get(uid));
		amount = amount + currencyName(amount);

		this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has transferred " + amount + ". You now have " + targetTotal + ".");
		logCredits(user.name + " transferred " + amount + " to " + username + ". " + user.name + " now has " + userTotal + " and " + username + " now has " + targetTotal + ".");
	},
	transfercreditshelp: ["/transfercredits [user], [amount] - Transfer a certain amount of credits to a user."],

	creditslog: function (target, room, user, connection) {
		if (room.id !== 'marketplace') return this.errorReply("Credit log can only be used in the Marketplace");
		if (!this.can('declare', null, room)) return;
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
		let file = path.join(__dirname, '../logs/credits.txt');
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
	creditsloghelp: ["/creditslog - Displays a log of all transactions in the economy."],

	creditladder: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Creditladder can only be viewed in the Marketplace");
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db('credits').object()).map(function (name) {
			return {name: name, credits: Db('credits').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("credits ladder is empty.");
		keys.sort(function (a, b) { return b.credits - a.credits; });
		this.sendReplyBox(rankLadder('Credit Ladder', 'credits', keys.slice(0, 100), 'credits'));
	},
	creditladderhelp: ["/creditladder - Displays users ranked by the amount of Origin credits they possess."],
/*
	registercreditshop: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credit Shops can only be registered in the Marketplace");
		if (!user.can('roomban')) return this.errorReply("/registercreditshop - Access denied");
		if (!target) return this.errorReply("Please specifiy a room. Use /help registercreditshop for more information.");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added a credit shop to this room.</b></div>');
		targetRoom.update();
		if (!targetRoom.creditshop) {
			targetRoom.creditshop = {};
			targetRoom.creditshopList = [];
			targetRoom.chatRoomData.creditshop = targetRoom.creditshop;
			targetRoom.chatRoomData.creditshopList = targetRoom.creditshopList;
		}
		if (!targetRoom.hascreditshop) targetRoom.hascreditshop = targetRoom.chatRoomData.hascreditshop = true;
		Rooms.global.writeChatRoomData();
	},
	registercreditshophelp: ["/registercreditshop [room] - Adds a credit shop to a room."],
*/
	credits: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credit stats can only be viewed in the Marketplace");
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('credits').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('credits').get(cur);
		}, 0);
		let average = Math.floor(total / users.length);
		let output = "There is " + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},
	creditsstatshelp: ["/credits - Gives information about the state of the economy."],

	cleancredits: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credits can only be cleaned in the Marketplace");
		if (!this.can('declare', null, room)) return false;
		let creditsObject = Db('credits').object();
		Object.keys(creditsObject)
			.filter(function (name) {
				return Db('credits').get(name) < 1;
			})
			.forEach(function (name) {
				delete creditsObject[name];
			});
		Db.save();
		this.sendReply("All users who has less than 1 credit are now removed from the database.");
	},
	cleancreditshelp: ["/cleancredits - Cleans credit database by removing users with less than one credit."],

	bank: function (target, room, user) {
		if (!this.can('roommod', null, room)) return this.errorReply("/bank - Access denied.");
		if (1 === 0/* code to check if room has league shop */) return this.errorReply("This room does not have a leagueshop")
		let parts = target.split(',');
		if (!parts[0] || !parts[1]) return this.parse('/help bank');
		let cmd = toId(parts[0]);
		let details = toId(parts[1]);
		let bank = Db('banks').get(room.id);
		let amount = isMoney(details);
		switch (cmd) {
		case 'set':
			Db('banks').set(room.id, details);
			// log transaction
			break;
		case 'deposit':
			if (!bank) return this.errorReply("This room does not have a bank, please set one with `/bank set, bankName`.")
			if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot deposit more money than what you have.");
			Db('money').set(user.userid, Db('money').get(user.userid) - amount);
			Db('money').set(bank, Db('money').get(bank) + amount);
			// log transaction
			break;
		case 'withdraw':
			if (!bank) return this.errorReply("This room does not have a bank, please set one with `/bank set, bankName`.")
			if (amount > Db('money').get(bank, 0)) return this.errorReply("You cannot withdraw more money than the bank has.");
			Db('money').set(user.userid, Db('money').get(user.userid) + amount);
			Db('money').set(bank, Db('money').get(bank) - amount);
			// log transaction
			break;
		default:
			return this.errorReply("Invalid command. Valid commands are `/bank set, bankName`, `/bank withdraw, amount`, and `/bank deposit, amount`.");
		}
	},
	bankhelp: ["Valid commands are `/bank set, bankName`, `/bank withdraw, amount`, and `/bank deposit, amount`."],
/***********************************/
	credit: 'creditshop',
	creditshop: function (target, room, user) {
		if (!room.founder) return this.sendReply("/creditshop - credit shops require a room founder.");
		if (!room.founder) return this.sendReply("/creditshop - this room does not have a creditshop enabled.");
		if (!room.shopList) room.shopList = [];
		if (!target) target = '';
		let self = this; // do we need this, its not used anywhere...
		let item;
		let cmdParts = target.split(' ');
		let cmd = cmdParts.shift().trim().toLowerCase();
		let params = cmdParts.join(' ').split(',').map(function (param) { return param.trim(); });
		switch (cmd) {
		case 'list':
		case 'view':
		default:
			if (!this.runBroadcast()) return;
			if (room.shopList.length < 1) return this.sendReplyBox('<center><b><u>This shop has no items!</u></b></center>');
			let thInline = "box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5) inset, -1px -1px 1px rgba(0, 0, 0, 0.5) inset;";
			let tdInline = "box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5) inset;";
			let output = '<center><h2><u>' + Tools.escapeHTML(room.title) + '\'s Shop</u></h2></center><table style="background: #F6F6F6; width: 100%; border-collapse: collapse;"><tr><th class="ls-th" style="' + thInline + '">Item</th><th class="ls-th" style="' + thInline + '">Description</th><th class="ls-th" style="' + thInline + '">Price</th></tr>';
			for (let u in room.shopList) {
				if (!room.shop[room.shopList[u]] || !room.shop[room.shopList[u]].name || !room.shop[room.shopList[u]].description || !room.shop[room.shopList[u]].price) continue;
				output += '<tr><td class="ls-td" style="' + tdInline + '"><button style="border-radius: 4px; box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5) inset;" name="send" value="/creditshop buy ' + Tools.escapeHTML(room.shopList[u]) + '" ><b>' + Tools.escapeHTML(room.shop[room.shopList[u]].name) +
				'</b></button></td><td class="ls-td" style="' + tdInline + '">' + Tools.escapeHTML(room.shop[room.shopList[u]].description.toString()) + '</td><td class="ls-td" style="' + tdInline + '">' + room.shop[room.shopList[u]].price + '</td></tr>';
			}
			output += '</table><br />';
			this.sendReplyBox(output);
			break;
		/*
		case 'add':
			if (!user.can('roommod', null, room)) return this.errorReply("/creditshop - Access denied.");
			if (params.length < 3) return this.sendReply("/creditshop add [item name], [description], [price]");
			if (!room.shopList) room.shopList = [];
			let name = params.shift();
			let description = params.shift();
			let price = Number(params.shift());
			if (isNaN(price)) return this.sendReply("/creditshop add [item name], [description], [price]");
			room.shop[toId(name)] = {};
			room.shop[toId(name)].name = name;
			room.shop[toId(name)].description = description;
			room.shop[toId(name)].price = price;
			room.shopList.push(toId(name));
			room.chatRoomData.shop = room.shop;
			room.chatRoomData.shopList = room.shopList;
			Rooms.global.writeChatRoomData();
			this.sendReply("Added '" + name + "' to the credit shop for " + price + " " + ((price === 1) ? " credit." : " credits") + ".");
			break;
		case 'remove':
		case 'rem':
		case 'del':
		case 'delete':
			if (!user.can('roommod', null, room)) return this.errorReply("/creditshop - Access denied.");
			if (params.length < 1) return this.sendReply("/creditshop delete [item name]");
			item = params.shift();
			if (!room.shop[toId(item)]) return this.sendReply("/creditshop - Item '" + item + "' not found.");
			delete room.shop[toId(item)];
			let index = room.shopList.indexOf(toId(item));
			if (index > -1) room.shopList.splice(index, 1)
			this.sendReply("Removed '" + item + "' from the credit shop.");
			break;
		*/
		case 'buy':
			if (params.length < 1) return this.sendReply("/creditshop buy [item name]");
			item = params.shift();
			if (!room.shop[toId(item)]) return this.sendReply("/creditshop - Item '" + item + "' not found.");
			let credits = Db('credits').get(user, 0);
			if (credits < room.shop[toId(item)].price) return this.errorReply("You don\'t have enough credits to purchase a '" + item + "'. You need " + ((credits - room.shop[toId(item)].price) *  -1) + " more credits.");
			let credit = 'credit';
			if (room.shop[toId(item)].price > 1) credit = 'credits';
			if (!room.shopowner) room.shopowner = room.founder;
			this.parse('/forcetransfer ' + room.shopowner + ',' + room.shop[toId(item)].price);
			fs.appendFile('logs/creditshop_' + room.id + '.txt', '[' + new Date().toJSON() + '] ' + user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + credit + '.\n');
			room.add(user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + ((price === 1) ? " credit." : " credits."));
			Rooms.global.addTask(room, "Shop Purchase - " + room.shop[toId(item)].name, user.name);
			break;
		case 'help':
			if (!this.runBroadcast()) return;
			this.sendReplyBox('The following is a list of credit shop commands: <br />' +
				'/creditshop view/list - Shows a complete list of shop items.`<br />' +
				'/creditshop add [item name], [description], [price] - Adds an item to the shop.<br />' +
				'/creditshop delete/remove [item name] - Removes an item from the shop.<br />' +
				'/creditshop buy [item name] - Purchases an item from the shop.<br />' +
				'/creditshop viewlog [number of lines OR word to search for] - Views the last 15 lines in the shop log.<br />' +
				'/creditshop owner [username] - Sets the room owner to [username]. The room owner receives all funds from purchases in the shop.<br />' +
				'/withdraw - Allows roomowners and whitelisted users to withdraw from their creditowner.<br />' +
				'/deposit - Deposits credits into the credit owner.<br />' +
				'/owneradd - Whitelists additional users to use /withdraw.<br />' +
				'/ownerdelete - Removes users from the owner whitelist.'
			);
			break;
		case 'setowner':
		case 'owner':
			if (user.userid !== room.founder && !user.can('seniorstaff')) return this.errorReply("/creditshop - Access denied.");
			if (params.length < 1) return this.sendReply("/creditshop owner [username]");
			let owner = params.shift();
			room.shopowner = toId(owner);
			room.chatRoomData.shopowner = room.shopowner;
			if (!room.ownerwhitelist) {
				room.ownerwhitelist = [];
				room.chatRoomData.ownerwhitelist = room.ownerwhitelist;
			}
			Rooms.global.writeChatRoomData();
			room.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just registered a owner ' + room.shopowner + ' for this room.  Use /owneradd [username] to add (/ownerdelete to remove) new users to access the owner through /withdraw.  Roomowners can /withdraw by default.</b></div>');
			room.update();
			break;
		case 'log':
		case 'viewlog':
			if (!user.can('roommod', null, room)) return this.errorReply("/creditshop - Access denied.");
			target = params.shift();
			let lines = 0;
			if (!target.match('[^0-9]')) {
				lines = parseInt(target || 15, 10);
				if (lines > 100) lines = 100;
			}
			let filename = 'logs/creditshop_' + room.id + '.txt';
			let command = 'tail -' + lines + ' ' + filename;
			let grepLimit = 100;
			if (!lines || lines < 0) { // searching for a word instead
				if (target.match(/^["'].+["']$/)) target = target.substring(1, target.length - 1);
				command = "awk '{print NR,$0}' " + filename + " | sort -nr | cut -d' ' -f2- | grep -m" + grepLimit + " -i '" + target.replace(/\\/g, '\\\\\\\\').replace(/["'`]/g, '\'\\$&\'').replace(/[\{\}\[\]\(\)\$\^\.\?\+\-\*]/g, '[$&]') + "'";
			}
			require('child_process').exec(command, function (error, stdout, stderr) {
				if (error && stderr) {
					user.popup('/creditshop viewlog erred - the shop log does not support Windows');
					console.log('/creditshop viewlog error: ' + error);
					return false;
				}
				if (lines) {
					if (!stdout) {
						user.popup('The log is empty.');
					} else {
						user.popup('Displaying the last ' + lines + ' lines of shop purchases:\n\n' + stdout);
					}
				} else {
					if (!stdout) {
						user.popup('No purchases containing "' + target + '" were found.');
					} else {
						user.popup('Displaying the last ' + grepLimit + ' logged purchases containing "' + target + '":\n\n' + stdout);
					}
				}
			});
			break;
		}
	},

	owneradd: function (target, room, user) {
		if (!user.can('declare', null, room)) return this.errorReply("/owneradd - Access denied.");
		if (!target) return this.parse('/help owneradd');
		if (!room.shopowner) return this.sendReply("Please /setowner before using this command.");
		if (!room.ownerwhitelist) {
			room.ownerwhitelist = [];
			room.chatRoomData.ownerwhitelist = room.ownerwhitelist;
		}
		if (room.ownerwhitelist[toId(target)]) return this.sendReply("This user is already whitelisted.");
		room.chatRoomData.ownerwhitelist.push(toId(target));
		Rooms.global.writeChatRoomData();
		this.sendReply("Added '" + target + "' to the whitelist for the room owner");
	},

	ownerdelete: function (target, room, user) {
		if (!user.can('declare', null, room)) return this.errorReply("ownerdelete - Access denied.");
		if (!target) return this.parse('/help ownerdelete');
		if (!room.ownerwhitelist[toId(target)]) return this.sendReply("User is not whitelisted");
		delete room.chatRoomData.ownerwhitelist(toId(target));
		Rooms.global.writeChatRoomData();
		this.sendReply("Removed '" + target + "' from the whitelist for the room owner");
	},

	registercreditshop: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/registercreditshop - Access denied");
		if (!target) return this.errorReply("Please specifiy a room. Use /help registercreditshopshop for more information.");
		if (!Rooms(toId(target))) return this.errorReply("The specified room does not exist");
		let targetRoom = Rooms(toId(target));
		targetRoom.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just added a credit shop to this room.</b></div>');
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
	registercreditshophelp: ["/registercreditshop [room] - Adds a credit shop to a room. Requires & ~"],
};
