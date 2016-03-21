'use strict';
/********************
 * Money Commmands
 * This file handles everything that uses the money system indirectly, including leagueshops and all non-dice games.
********************/
const fs = require('fs');
let color = require('../config/color');

let faces = {
	"sv": {
		name: "7",
		img: "http://cdn.bulbagarden.net/upload/f/f0/Celadon_Game_Corner_7_FRLG.png",
		payout: 500,
	},
	"ro": {
		name: "R",
		img: "http://cdn.bulbagarden.net/upload/5/5e/Celadon_Game_Corner_R_FRLG.png",
		payout: 250,
	},
	"pi": {
		name: "Pikachu",
		img: "http://cdn.bulbagarden.net/upload/1/16/Celadon_Game_Corner_Pikachu_FRLG.png",
		payout: 100,
	},
	"pd": {
		name: "Psyduck",
		img: "http://cdn.bulbagarden.net/upload/5/5b/Celadon_Game_Corner_Psyduck_FRLG.png",
		payout: 75,
	},
	"mg": {
		name: "Magnemite",
		img: "http://cdn.bulbagarden.net/upload/a/a2/Celadon_Game_Corner_Magnemite_FRLG.png",
		payout: 40,
	},
	"sh": {
		name: "Shellder",
		img: "http://cdn.bulbagarden.net/upload/e/e8/Celadon_Game_Corner_Shellder_FRLG.png",
		payout: 20,
	},
	"ch": {
		name: "Cherry",
		img: "http://cdn.bulbagarden.net/upload/2/2f/Celadon_Game_Corner_Cherry_FRLG.png",
		payout: 10,
	},
};

let faceMatch = function (hexValue) {
	let id = "0123456789abcdef".indexOf(hexValue);
	return ["ch", "ch", "ch", "ch", "sh", "sh", "sh", "mg", "mg", "pd", "pd", "pi", "pi", "ro", "ro", "sv"][id];
};

function slotsRolling(user, randNum) {
	return '|uhtml|' + user + randNum + '|' + '<center><div style="display: inline-block; background: #949698; border: 1px solid #000; border-radius: 2px; padding: 5px;"><table style="background: #3C3C3C; margin-right: auto; margin-left: auto; border: 1px solid #000; border-radius: 2px;" cellspacing="8"><tr><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="http://i.imgur.com/iwkVDUN.gif" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="http://i.imgur.com/SubPUKp.gif" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="http://i.imgur.com/JiIK7RI.gif" height="24" width="32"></td></tr></table></div><img src="http://i.imgur.com/Ry0uzS7.png?3"></center>';
}

function slotMachine(user, randNum, roll1, roll2, roll3) {
	return '|uhtmlchange|' + user + randNum + '|' + '<center><div style="display: inline-block; background: #949698; border: 1px solid #000; border-radius: 2px; padding: 5px;"><table style="background: #3C3C3C; margin-right: auto; margin-left: auto; border: 1px solid #000; border-radius: 2px;" cellspacing="8"><tr><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll1 + '" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll2 + '" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll3 + '" height="24" width="32"></td></tr></table></div><img src="http://i.imgur.com/Ry0uzS7.png?3"></center>';
}

function parseRoll(array) {
	let details = {};
	for (let i = 0; i < array.length; i++) {
		let tId = array[i];
		if (!details[tId]) details[tId] = 0;
		details[tId]++;
	}
	for (let id in details) {
		if (details[id] === 2) {
			return {
				match: "2",
				"id": id,
			};
		} else if (details[id] === 3) {
			return {
				match: "3",
				"id": id,
			};
		}
	}
	return {
		match: "1",
		id: null,
	};
}

let diceOne = function (dice) {
	dice = Math.floor(Math.random() * 6) + 1;
	return dice;
};

let diceTwo = function (dice) {
	dice = Math.floor(Math.random() * 6) + 1;
	return dice;
};

let rng = function (n) {
	n = Math.floor(Math.random() * 100);
	return n;
};

function isEven(n) {
	return n % 2 === 0;
}

function isOdd(n) {
	return Math.abs(n % 2) === 1;
}

exports.commands = {
	artshop: 'leagueshop',
	roomshop: 'leagueshop',
	leagueshop: function (target, room, user) {
		if (!room.founder) return this.sendReply('/leagueshop - league shops require a room founder.');
		if (!room.hasShop) return this.sendReply('/leagueshop - this room does not have a leagueshop enabled.');
		if (!room.shopList) room.shopList = [];
		if (!target) target = '';
		let self = this;
		let item;
		let cmdParts = target.split(' ');
		let cmd = cmdParts.shift().trim().toLowerCase();
		let params = cmdParts.join(' ').split(',').map(function (param) { return param.trim(); });

		switch (cmd) {
		case 'list':
		case 'view':
		default:
			if (!this.canBroadcast()) return;
			if (room.shopList.length < 1) return this.sendReplyBox('<center><b><u>This shop has no items!</u></b></center>');
			let output = '<center><h2><u>' + Tools.escapeHTML(room.title) + '\'s Shop</u></h2><table cellpadding="6" border="1"><table cellpadding="6" border="1"><tr><td align="center"><h3><u>Item</u></h3></td><td align="center"><h3><u>Description</u></h3></td><td align="center"><h3><u>Price</u></h3></td></tr>';
			for (let u in room.shopList) {
				if (!room.shop[room.shopList[u]] || !room.shop[room.shopList[u]].name || !room.shop[room.shopList[u]].description || !room.shop[room.shopList[u]].price) continue;
				output += '<tr><td align="center"><button name="send" value="/leagueshop buy ' + Tools.escapeHTML(room.shopList[u]) + '" ><b>' + Tools.escapeHTML(room.shop[room.shopList[u]].name) +
				'</b></button></td><td align="center">' + Tools.escapeHTML(room.shop[room.shopList[u]].description.toString()) + '</td><td align="center">' + room.shop[room.shopList[u]].price + '</td></tr>';
			}
			output += '</table></center><br />';
			this.sendReplyBox(output);
			break;
		case 'add':
			if (!user.can('roommod', null, room)) return this.sendReply('/leagueshop - Access denied.');
			if (params.length < 3) return this.sendReply('Usage: /leagueshop add [item name], [description], [price]');
			if (!room.shopList) room.shopList = [];
			let name = params.shift();
			let description = params.shift();
			let price = Number(params.shift());
			if (isNaN(price)) return this.sendReply('Usage: /leagueshop add [item name], [description], [price]');
			room.shop[toId(name)] = {};
			room.shop[toId(name)].name = name;
			room.shop[toId(name)].description = description;
			room.shop[toId(name)].price = price;
			room.shopList.push(toId(name));
			room.chatRoomData.shop = room.shop;
			room.chatRoomData.shopList = room.shopList;
			Rooms.global.writeChatRoomData();
			this.sendReply('Added "' + name + '" to the league shop for ' + price + ' ' + ((price === 1) ? " buck." : " bucks") + '.');
			break;
		case 'remove':
		case 'rem':
		case 'del':
		case 'delete':
			if (!user.can('roommod', null, room)) return this.sendReply('/leagueshop - Access denied.');
			if (params.length < 1) return this.sendReply('Usage: /leagueshop delete [item name]');
			item = params.shift();
			if (!room.shop[toId(item)]) return this.sendReply('/leagueshop - Item "' + item + '" not found.');
			delete room.shop[toId(item)];
			let index = room.shopList.indexOf(toId(item));
			if (index > -1) {
				room.shopList.splice(index, 1);
			}
			this.sendReply('Removed "' + item + '" from the league shop.');
			break;
		case 'buy':
			if (params.length < 1) return this.sendReply('Usage: /leagueshop buy [item name]');
			item = params.shift();
			if (!room.shop[toId(item)]) return this.sendReply('/leagueshop - Item "' + item + '" not found.');
			let money = Db('money').get(user, 0);
			if (money < room.shop[toId(item)].price) return this.sendReply('You don\'t have enough bucks to purchase a ' + item + '. You need ' + ((money - room.shop[toId(item)].price) *  -1) + ' more bucks.');
			let buck = 'buck';
			if (room.shop[toId(item)].price > 1) buck = 'bucks';
			if (!room.shopBank) room.shopBank = room.founder;
			this.parse('/forcetransfer ' + room.shopBank + ',' + room.shop[toId(item)].price);
			fs.appendFile('logs/leagueshop_' + room.id + '.txt', '[' + new Date().toJSON() + '] ' + user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + buck + '.\n');
			room.add(user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + ((price === 1) ? " buck." : " bucks.") + '.');
			Rooms.global.addTask(room, "Shop Purchase - " + room.shop[toId(item)].name, user.name);
			break;
		case 'help':
			if (!this.canBroadcast()) return;
			this.sendReplyBox('The following is a list of league shop commands: <br />' +
				'/leagueshop view/list - Shows a complete list of shop items.`<br />' +
				'/leagueshop add [item name], [description], [price] - Adds an item to the shop.<br />' +
				'/leagueshop delete/remove [item name] - Removes an item from the shop.<br />' +
				'/leagueshop buy [item name] - Purchases an item from the shop.<br />' +
				'/leagueshop viewlog [number of lines OR word to search for] - Views the last 15 lines in the shop log.<br />' +
				'/leagueshop bank [username] - Sets the room bank to [username]. The room bank receives all funds from purchases in the shop.<br />' +
				'/withdraw - Allows roomowners and whitelisted users to withdraw from their leaguebank.<br />' +
				'/deposit - Deposits bucks into the league bank.<br />' +
				'/bankadd - Whitelists additional users to use /withdraw.<br />' +
				'/bankdelete - Removes users from the bank whitelist.'
			);
			break;
		case 'setbank':
		case 'bank':
			if (user.userid !== room.founder && !user.can('seniorstaff')) return this.sendReply('/leagueshop - Access denied.');
			if (params.length < 1) return this.sendReply('Usage: /leagueshop bank [username]');
			let bank = params.shift();
			room.shopBank = toId(bank);
			room.chatRoomData.shopBank = room.shopBank;
			if (!room.bankwhitelist) {
				room.bankwhitelist = [];
				room.chatRoomData.bankwhitelist = room.bankwhitelist;
			}
			Rooms.global.writeChatRoomData();
			room.add('|raw|<div class="broadcast-green"><b>' + user.name + ' has just registered a bank ' + room.shopBank + ' for this room.  Use /bankadd [username] to add (/bankdelete to remove) new users to access the bank through /withdraw.  Roomowners can /withdraw by default.</b></div>');
			room.update();
			break;
		case 'log':
		case 'viewlog':
			if (!user.can('roommod', null, room)) return this.sendReply('/leagueshop - Access denied.');
			target = params.shift();
			let lines = 0;
			if (!target.match('[^0-9]')) {
				lines = parseInt(target || 15, 10);
				if (lines > 100) lines = 100;
			}
			let filename = 'logs/leagueshop_' + room.id + '.txt';
			let command = 'tail -' + lines + ' ' + filename;
			let grepLimit = 100;
			if (!lines || lines < 0) { // searching for a word instead
				if (target.match(/^["'].+["']$/)) target = target.substring(1, target.length - 1);
				command = "awk '{print NR,$0}' " + filename + " | sort -nr | cut -d' ' -f2- | grep -m" + grepLimit + " -i '" + target.replace(/\\/g, '\\\\\\\\').replace(/["'`]/g, '\'\\$&\'').replace(/[\{\}\[\]\(\)\$\^\.\?\+\-\*]/g, '[$&]') + "'";
			}
			require('child_process').exec(command, function (error, stdout, stderr) {
				if (error && stderr) {
					user.popup('/leagueshop viewlog erred - the shop log does not support Windows');
					console.log('/leagueshop viewlog error: ' + error);
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

	bankadd: function (target, room, user) {
		if (!user.can('declare', null, room)) return this.sendReply('/bankadd - Access denied.');
		if (!target) return this.parse('/help bankadd');
		if (!room.shopBank) return this.sendReply('Please /setbank before using this command.');
		if (!room.bankwhitelist) {
			room.bankwhitelist = [];
			room.chatRoomData.bankwhitelist = room.bankwhitelist;
		}
		if (room.bankwhitelist[toId(target)]) return this.sendReply('This user is already whitelisted.');
		room.chatRoomData.bankwhitelist.push(toId(target));
		Rooms.global.writeChatRoomData();
		this.sendReply('Added "' + target + '" to the whitelist for the room bank"');
	},

	bankdelete: function (target, room, user) {
		if (!user.can('declare', null, room)) return this.sendReply('bankdelete - Access denied.');
		if (!target) return this.parse('/help bankdelete');
		if (!room.bankwhitelist[toId(target)]) return this.sendReply('User is not whitelisted');
		delete room.chatRoomData.bankwhitelist(toId(target));
		Rooms.global.writeChatRoomData();
		this.sendReply('Removed "' + target + '" from the whitelist for the room bank"');
	},

	bet: function (target, room, user) {
		let firstDice = diceOne();
		let secondDice = diceTwo();
		let totalDice = firstDice + secondDice;
		let house = rng();

		let choice = target.toUpperCase();

		let amount = Db('money').get(user.userid, 0);
		if (room.id !== 'casino' && !~developers.indexOf(this.userid)) return this.errorReply('betting games can only be used in Casino');

		if (amount < 2) return this.errorReply("You don't have enough bucks for the bet.");

		if (!target) return this.parse('/help bet');

		switch (choice) {
		case 'ODD':
			Db('money').set(user.userid, amount - 2).get(user.userid);
			if (isOdd(totalDice) && house < 87) {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font>\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">' + totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
				Db('money').set(user.userid, amount + 2).get(user.userid);
			} else {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font><center><h2 style="color: #444">You lose... better luck next time!</h2></center></div></div></div>');
			}
			break;
		case 'EVEN':
			Db('money').set(user.userid, amount - 2).get(user.userid);
			if (isEven(totalDice) && house < 87) {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font>\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">' + totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
				Db('money').set(user.userid, amount + 2).get(user.userid);
			} else {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font><center><h2 style="color: #444">You lose... better luck next time!</h2></center></div></div></div>');
			}
			break;
		case '7': case 'SEVEN':
			Db('money').set(user.userid, amount - 2).get(user.userid);
			if (totalDice === 7 && house < 70) {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font>\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">' + totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
				Db('money').set(user.userid, amount + 14).get(user.userid);
			} else {
				this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><font style="color: #666; font-style: italic;">' + user.name + ' betted on "' + choice + '".</font><center><h2 style="color: #444"><font color="' + color(toId(this.user.name)) + '">' + user.name + '</font><center><h2 style="color: #444">You lose... better luck next time!</h2></center></div></div></div>');
			}
			break;
		default:
			this.errorReply("Not a valid bet.");
		}
	},
	bethelp: ["/bet [type] - rolls two dices and adds the two to make a final number. Choose between odd, even or seven. If you guess correctly you win bucks (betting for seven and winning awards more bucks)."],

	slots: {
		start: 'roll',
		roll: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Slots must be played in The Casino.');
			if (room.slotsEnabled === false) return this.errorReply('Slots is currently disabled.');
			if (user.isRolling) return this.errorReply('Wait till your previous roll finishes to roll again');
			if (!room.slotsAnte) room.slotsAnte = 3;
			if (typeof room.slotsAnte === "string") room.slotsAnte = parseInt(room.slotsAnte);
			if (isNaN(room.slotsAnte)) room.slotsAnte = 3;
			if (room.slotsAnte > Db('money').get(user.userid, 0)) return this.sendReply("You do not have enough bucks to play slots.");
			Db('money').set(user.userid, Db('money').get(user.userid, 0) - room.slotsAnte);
			user.isRolling = true;

			//lets get a randomNumber from 0 - 4095
			let randRollTotal = ~~(Math.random() * 4096);
			let rollId = randRollTotal.toString(16);
			rollId = "000".slice(rollId.length) + rollId;
			let rollFaces = [];
			let rolls = [];
			rollId.split("").forEach(function (f) {
				rollFaces.push(faceMatch(f));
				rolls.push(faces[faceMatch(f)].img);
			}); //returns a character for each;
			//now that you have your three faces;
			//get the images for each;


			let randNum = Math.floor(Math.random() * 1000);
			let display = slotMachine(user, randNum, rolls[0], rolls[1], rolls[2]);
			let rollView = slotsRolling(user, randNum);
			user.sendTo(room, rollView);

			//get details on roll
			let rollDetails = parseRoll(rollFaces);

			setTimeout(function () {
				let win, winnings;
				user.sendTo(room, display);
				//odds for 2 in a row; fuck cherries they're too popular xD
				if (rollDetails.match === 2 && rollDetails.id !== "ch") {
					win = false;
					winnings = room.slotsAnte;
					Db('money').set(user.userid, Db('money').get(user.userid, 0) + winnings);
					user.isRolling = false;
					return user.sendTo(room, "You hit 2 " + faces[rollDetails.id].name + "'s and got your ante back.");
				}

				if (rollDetails.match === 3) {
					win = true;
					winnings = faces[rollDetails.id].payout + room.slotsAnte;
					if (rollDetails.id === "sv") {
						user.sendTo(room, "You've hit the jackpot!");
						room.addRaw('<h3> ' + user + ' has hit a Jackpot on the slots!</h3>');
					} else {
						user.sendTo(room, "You've won " + (winnings - room.slotsAnte) + " Bucks!");
					}
				} else {
					user.isRolling = false;
					return user.sendTo(room, "Better luck next time!");
				}
				if (win) {
					user.isRolling = false;
					Db('money').set(user.userid, Db('money').get(user.userid, 0) + winnings);
					logMoney(user + " won " + winnings + " from the slots.");
				}
			}, 3000);
		},

		enable: function (target, room, user, cmd) {
			if (room.id !== 'casino') return this.errorReply('Can only be used in casino.');
			if (!user.can('makechatroom')) return this.errorReply('/slots enable - Access Denied.');
			room.slotsEnabled = true;
			this.sendReply("Slots has been enabled.");
		},

		disable: function (target, room, user, cmd) {
			if (room.id !== 'casino') return this.errorReply('Can only be used in casino.');
			if (!user.can('makechatroom')) return this.errorReply('/slots disable - Access Denied.');
			room.slotsEnabled = false;
			if (room.chatRoomData) Rooms.global.writeChatRoomData();
			this.sendReply("Slots has been disabled.");
		},

		ante: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Can only be used in casino.');
			if (!user.can('hotpatch')) return this.errorReply('/slots ante - Access Denied.');
			if (!target) return this.parse('/help slotsante');
			target = parseInt(target);
			if (isNaN(target)) return this.errorReply('Must be a number, silly.');
			room.slotsAnte = target;
			if (room.chatRoomData) {
				room.chatRoomData.slotsAnte = room.slotsAnte;
				Rooms.global.writeChatRoomData();
			}
			this.sendReply("The ante for playing slots has been set to " + room.slotsAnte + ".");
		},
	},
	slotsantehelp: ["/slots ante [number] - Sets the ante for playing slots. Requires: ~"],
	slotsdisablehelp: ["/slots disable - Disable the playing of slots. Requires: ~"],
	slotsenablehelp: ["/slots enable - Enable the playing of slots. Requires: ~"],
	slotsrollhelp: ["/slots roll - Plays a game of dice after paying the ante. Must be played in casino."],
	slotshelp: ["commands for /slots are:",
		"/slots enable - Enable the playing of slots. Requires: ~",
		"/slots disable - Disable the playing of slots. Requires: ~",
		"/slots ante - Sets the ante for playing slots. Requires: ~",
		"/slots roll - Pay the ante and play a game of slots.",
	],
};
