'use strict';

const fs = require('fs');

exports.commands = {
	creditshop: function (target, room, user) {
		if (!room.founder) return this.sendReply("/creditshop - credit shops require a room founder.");
		if (!room.founder) return this.sendReply("/creditshop - this room does not have a creditshop enabled.");
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
				output += '<tr><td class="ls-td" style="' + tdInline + '"><button style="border-radius: 4px; box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5) inset;" name="send" value="/creditshop buy ' + Tools.escapeHTML(room.shopList[u]) + '" ><b>' + Tools.escapeHTML(room.shop[room.shopList[u]].name) +
				'</b></button></td><td class="ls-td" style="' + tdInline + '">' + Tools.escapeHTML(room.shop[room.shopList[u]].description.toString()) + '</td><td class="ls-td" style="' + tdInline + '">' + room.shop[room.shopList[u]].price + '</td></tr>';
			}
			output += '</table><br />';
			this.sendReplyBox(output);
			break;
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
			if (index > -1) {
				room.shopList.splice(index, 1);
			}
			this.sendReply("Removed '" + item + "' from the credit shop.");
			break;
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
