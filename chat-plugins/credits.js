'use strict';

let fs = require('fs');
let color = require('../config/color');
let path = require('path');
let rankLadder = require('../rank-ladder');

global.currencyName = function (amount) {
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
		if (!this.can('roomban')) return false;
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
		if (!this.can('roomban')) return false;
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
		if (!this.can('roomban')) return false;
		Db('credits').set(toId(target), 0);
		this.sendReply(target + " now has " + 0 + currencyName(0) + ".");
		logCredits(user.name + " reset the credits of " + target + ".");
	},
	resetcreditshelp: ["/resetcredits [user] - Reset user's credits to zero."],

	transfercredits: 'transfercredits',
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
		if (!this.can('roomban')) return;
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
,
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
	economystatshelp: ["/credits - Gives information about the state of the economy."],

	cleancredits: function (target, room, user) {
		if (room.id !== 'marketplace') return this.errorReply("Credits can only be cleaned in the Marketplace");
		if (!this.can('roomban')) return false;
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
	cleaneconomyhelp: ["/cleancredits - Cleans economy databases by removing users with less than one credit."],
};
