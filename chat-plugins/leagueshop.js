'use strict';
/********************
 * Leagueshops
 * This file handles room and league shops
********************/
const fs = require('fs');

exports.commands = {
	artshop: 'leagueshop',
	roomshop: 'leagueshop',
	leagueshop: function (target, room, user) {
		if (!room.founder) return this.sendReply("/leagueshop - league shops require a room founder.");
		if (!room.hasShop) return this.sendReply("/leagueshop - this room does not have a leagueshop enabled.");
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
			if (!this.runBroadcast()) return;
			if (room.shopList.length < 1) return this.sendReplyBox('<center><b><u>This shop has no items!</u></b></center>');
			let thInline = "box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5) inset, -1px -1px 1px rgba(0, 0, 0, 0.5) inset;";
			let tdInline = "box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5) inset;";
			let output = '<center><h2><u>' + Tools.escapeHTML(room.title) + '\'s Shop</u></h2></center><table style="background: #F6F6F6; width: 100%; border-collapse: collapse;"><tr><th class="ls-th" style="' + thInline + '">Item</th><th class="ls-th" style="' + thInline + '">Description</th><th class="ls-th" style="' + thInline + '">Price</th></tr>';
			for (let u in room.shopList) {
				if (!room.shop[room.shopList[u]] || !room.shop[room.shopList[u]].name || !room.shop[room.shopList[u]].description || !room.shop[room.shopList[u]].price) continue;
				output += '<tr><td class="ls-td" style="' + tdInline + '"><button style="border-radius: 4px; box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5) inset;" name="send" value="/leagueshop buy ' + Tools.escapeHTML(room.shopList[u]) + '" ><b>' + Tools.escapeHTML(room.shop[room.shopList[u]].name) +
				'</b></button></td><td class="ls-td" style="' + tdInline + '">' + Tools.escapeHTML(room.shop[room.shopList[u]].description.toString()) + '</td><td class="ls-td" style="' + tdInline + '">' + room.shop[room.shopList[u]].price + '</td></tr>';
			}
			output += '</table><br />';
			this.sendReplyBox(output);
			break;
		case 'add':
			if (!user.can('roommod', null, room)) return this.errorReply("/leagueshop - Access denied.");
			if (params.length < 3) return this.sendReply("/leagueshop add [item name], [description], [price]");
			if (!room.shopList) room.shopList = [];
			let name = params.shift();
			let description = params.shift();
			let price = Number(params.shift());
			if (isNaN(price)) return this.sendReply("/leagueshop add [item name], [description], [price]");
			room.shop[toId(name)] = {};
			room.shop[toId(name)].name = name;
			room.shop[toId(name)].description = description;
			room.shop[toId(name)].price = price;
			room.shopList.push(toId(name));
			room.chatRoomData.shop = room.shop;
			room.chatRoomData.shopList = room.shopList;
			Rooms.global.writeChatRoomData();
			this.sendReply("Added '" + name + "' to the league shop for " + price + " " + ((price === 1) ? " buck." : " bucks") + ".");
			break;
		case 'remove':
		case 'rem':
		case 'del':
		case 'delete':
			if (!user.can('roommod', null, room)) return this.errorReply("/leagueshop - Access denied.");
			if (params.length < 1) return this.sendReply("/leagueshop delete [item name]");
			item = params.shift();
			if (!room.shop[toId(item)]) return this.sendReply("/leagueshop - Item '" + item + "' not found.");
			delete room.shop[toId(item)];
			let index = room.shopList.indexOf(toId(item));
			if (index > -1) {
				room.shopList.splice(index, 1);
			}
			this.sendReply("Removed '" + item + "' from the league shop.");
			break;
		case 'buy':
			if (params.length < 1) return this.sendReply("/leagueshop buy [item name]");
			item = params.shift();
			if (!room.shop[toId(item)]) return this.sendReply("/leagueshop - Item '" + item + "' not found.");
			let money = Db('money').get(user, 0);
			if (money < room.shop[toId(item)].price) return this.errorReply("You don\'t have enough bucks to purchase a '" + item + "'. You need " + ((money - room.shop[toId(item)].price) *  -1) + " more bucks.");
			let buck = 'buck';
			if (room.shop[toId(item)].price > 1) buck = 'bucks';
			if (!room.shopBank) room.shopBank = room.founder;
			this.parse('/forcetransfer ' + room.shopBank + ',' + room.shop[toId(item)].price);
			fs.appendFile('logs/leagueshop_' + room.id + '.txt', '[' + new Date().toJSON() + '] ' + user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + buck + '.\n');
			room.add(user.name + ' has purchased a ' + room.shop[toId(item)].name + ' for ' + room.shop[toId(item)].price + ' ' + ((price === 1) ? " buck." : " bucks."));
			Rooms.global.addTask(room, "Shop Purchase - " + room.shop[toId(item)].name, user.name);
			break;
		case 'help':
			if (!this.runBroadcast()) return;
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
			if (user.userid !== room.founder && !user.can('seniorstaff')) return this.errorReply("/leagueshop - Access denied.");
			if (params.length < 1) return this.sendReply("/leagueshop bank [username]");
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
			if (!user.can('roommod', null, room)) return this.errorReply("/leagueshop - Access denied.");
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
		if (!user.can('declare', null, room)) return this.errorReply("/bankadd - Access denied.");
		if (!target) return this.parse('/help bankadd');
		if (!room.shopBank) return this.sendReply("Please /setbank before using this command.");
		if (!room.bankwhitelist) {
			room.bankwhitelist = [];
			room.chatRoomData.bankwhitelist = room.bankwhitelist;
		}
		if (room.bankwhitelist[toId(target)]) return this.sendReply("This user is already whitelisted.");
		room.chatRoomData.bankwhitelist.push(toId(target));
		Rooms.global.writeChatRoomData();
		this.sendReply("Added '" + target + "' to the whitelist for the room bank");
	},

	bankdelete: function (target, room, user) {
		if (!user.can('declare', null, room)) return this.errorReply("bankdelete - Access denied.");
		if (!target) return this.parse('/help bankdelete');
		if (!room.bankwhitelist[toId(target)]) return this.sendReply("User is not whitelisted");
		delete room.chatRoomData.bankwhitelist(toId(target));
		Rooms.global.writeChatRoomData();
		this.sendReply("Removed '" + target + "' from the whitelist for the room bank");
	},

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
};
