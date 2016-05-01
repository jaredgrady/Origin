'use strict';

const uuid = require('uuid');
const dualcards = require('./yugi-data.js');
let color = require('../config/color');
let rankLadder = require('../rank-ladder');

const colors = {
	GhostRare: '#D82A2A',
	UltimateRare: '#D82A2A',
	ShatterfoilRare: '#D82A2A',
	SecretRare: '#E8AB03',
	UltraRare: '#73DF14',
	SuperRare: '#2DD1B6',
	Rare: '#2D3ED1',
	Common: '#000',
};

const ygoshop = [
	['Starter Deck: Yugi', 'Get three dualcards from Yugis Starter Deck.', 10],
	['Starter Deck: Joey', 'Get three dualcards from Joeys Starter Deck.', 10],
	['Starter Deck: Kaiba', 'Get three dualcards from Kaibas Starter Deck.', 10],
	['Starter Deck: Pegasus', 'Get three dualcards from Pegasus Starter Deck.', 10],
	['Dark Legion', 'Get three dualcards from the the Dark Legions Structure Deck.', 20],
	['Emperor of Darkness', 'Get three dualcards from the Emperor of Darkness Structure Deck.', 20],
	['Master of Pendulum', 'Get three dualcards from the Master of Pendulum Structure Deck.', 20],
	['Absolute Powerforce', 'Get three dualcards from the Absolute Powerful Deck.', 25],
];
let ygoShop = ['Starter Deck: Yugi', 'Starter Deck: Joey', 'Starter Deck: Kaiba', 'Starter Deck: Pegasus', 'Dark Legion', 'Emperor of Darkness', 'Master of Pendulum', 'Absolute Powerforce'];
const dualcardRarity = ['Common', 'Rare', 'SuperRare', 'UltraRare', 'SecretRare', 'ShatterfoilRare', 'UltimateRare, GhostRare'];
let rareCache = [];
let cleanShop = [];
let cleanDualcard = [];
let dualcardCache = []; //Used to cache dualcards in packs
let userYgos = {}; //Used to store users unopened packs

function cacheYgo() {
	for (let i = 0; i < ygoShop.length; i++) {
		dualcardCache.push([]);
		for (let key in dualcards) {
			if (dualcards.hasOwnProperty(key)) {
				let obj = dualcards[key];
				if (obj.hasOwnProperty('collection') && obj.collection.indexOf(ygoShop[i]) > -1) dualcardCache[i].push(key);
			}
		}
	}
	for (let i = 0; i < ygoShop.length; i++) {
		cleanShop.push(toId(ygoShop[i]));
	}
}

function cacheRarity() {
	for (let i = 0; i < dualcardRarity.length; i++) {
		rareCache.push([]);
		for (let key in dualcards) {
			if (dualcards.hasOwnProperty(key)) {
				let obj = dualcards[key];
				if (obj.hasOwnProperty('rarity') && obj.rarity.indexOf(dualcardRarity[i]) > -1) rareCache[i].push(key);
			}
		}
	}
	for (let i = 0; i < dualcardRarity.length; i++) {
		cleanDualcard.push(toId(dualcardRarity[i]));
	}
}

function addDualcard(name, dualcard) {
	let newDualcard = {};
	newDualcard.id = uuid.v1();
	newDualcard.title = dualcards[dualcard].title;
	newDualcard.card = dualcards[dualcard].card;
	newDualcard.name = dualcards[dualcard].name;
	newDualcard.rarity = dualcards[dualcard].rarity;
	newDualcard.points = dualcards[dualcard].points;

	let userid = toId(name);
	Db('dualcards').set(userid, Db('dualcards').get(userid, []).concat([newDualcard]));
	Db('lifepoints').set(userid, Db('lifepoints').get(userid, 0) + newDualcard.points);
}

function removeDualcard(dualcardTitle, userid) {
	let userDualcards = Db('dualcards').get(userid, []);
	let idx = -1;
	// search for index of the card
	for (let i = 0; i < userDualcards.length; i++) {
		let dualcard = userDualcards[i];
		if (dualcard.title === dualcardTitle) {
			idx = i;
			break;
		}
	}
	if (idx === -1) return false;
	// remove it
	userDualcards.splice(idx, 1);
	// set it in db
	Db('dualcards').set(userid, userDualcards);
	return true;
}

function getPointTotal(userid) {
	let totalDualcards = Db('dualcards').get(userid, []);
	let total = 0;
	for (let i = 0; i < totalDualcards.length; i++) {
		total += totalDualcards[i].points;
	}
	return total;
}

function getShopDisplay(shop) {
	let display = "<table width='100%' border='1' style='border-collapse: collapse; color: #444; box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);' cellpadding='5'>" +
		"<tr><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Command</th><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Description</th><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Cost</th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" + "<td class='card-td'><button name='send' value='/buybooster " + shop[start][0] + "' style='border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;'><b>" + shop[start][0] + "</b></button></td>" +
			"<td class='card-td'>" + shop[start][1] + "</td>" +
			"<td class='card-td'>" + shop[start][2] + "</td>" +
			"</tr>";
		start++;
	}
	display += "</table><center>To buy a pack from the shop, use /buybooster <em>pack</em>.</center>";
	return display;
}

function toTitleCase(str) {
	return str.replace(/(\w\S*)/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

cacheYgo();
cacheRarity();

exports.commands = {
	boosters: 'booster',
	booster: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) target = user.name;
		target = toId(target);
		if (!userYgos[target] || userYgos[target].length === 0) return this.sendReply((target === user.userid ? 'You have' : target + ' has') + ' no packs.');
		this.sendReply('|raw|<u><b>List of packs:</b></u>');
		for (let i = 0; i < userYgos[target].length; i++) {
			this.sendReply('|raw| <button name="send" value="/openbooster ' + userYgos[target][i] + '"> Press to open <b>' + toTitleCase(userYgos[target][i]) + '</b> pack</button>');
		}
	},

	buyboosters: 'buybooster',
	buybooster: function (target, room, user) {
		if (!target) return this.sendReply("/buybooster - Buys a pack from the pack shop. Alias: /buyboosters");
		let self = this;
		let ygoId = toId(target);
		let amount = Db('money').get(user.userid, 0);
		if (cleanShop.indexOf(ygoId) < 0) return self.sendReply("This is not a valid pack. Use /ygoshop to see all packs.");
		let shopIndex = cleanShop.indexOf(toId(target));
		let cost = ygoshop[shopIndex][2];
		if (cost > amount) return self.sendReply("You need " + (cost - amount) + " more money to buy this pack.");
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		let ygo = toId(target);
		self.sendReply('|raw|You have bought ' + target + ' pack for ' + cost +
			' money. Use <button name="send" value="/openbooster ' +
			ygo + '"><b>/openbooster ' + ygo + '</b></button> to open your pack.');
		self.sendReply("You have until the server restarts to open your pack.");
		if (!userYgos[user.userid]) userYgos[user.userid] = [];
		userYgos[user.userid].push(ygo);
		if (room.id !== 'lobby' && room.id !== 'casino') room.addRaw(user.name + ' has bought <b>' + target + ' pack </b> from the shop.');
		room.update();
	},

	ygoshop: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReply('|raw|' + getShopDisplay(ygoshop));
	},

	openboosters: 'openbooster',
	openbooster: function (target, room, user) {
		if (!this.runBroadcast()) return;
		if (!target) {
			this.sendReply("/openbooster [pack] - Open a YuGiOh Dualcard Pack. Alias: /openboosters");
			return this.parse('/boosters');
		}
		if (cleanShop.indexOf(toId(target)) < 0) return this.sendReply("This pack does not exist.");
		if (!userYgos[user.userid] || userYgos[user.userid].length === 0) return this.sendReply("You have no packs.");
		if (userYgos[user.userid].indexOf(toId(target)) < 0) return this.sendReply("You do not have this pack.");
		let newYgo;
		for (let i = 0; i < 3; i++) {
			newYgo = toId(target);
			let cacheValue = dualcardCache[cleanShop.indexOf(toId(target))];
			let dualcard = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
			addDualcard(user.userid, dualcard);
			let dualcardName = dualcards[dualcard].name;
			let ygoName = ygoShop[cleanShop.indexOf(toId(target))];
			this.sendReplyBox(user.name + ' got <font color="' + colors[dualcards[dualcard].rarity] + '">' + dualcards[dualcard].rarity + '</font>' +
			'<button name="send" value="/dualcard ' + dualcard + '"><b>' + dualcardName + '</b></button> from a' +
			'<button name="send" value="/buybooster ' + ygoName + '">' + ygoName + ' Pack</button>.');
		}
		let usrIndex = userYgos[user.userid].indexOf(newYgo);
		userYgos[user.userid].splice(usrIndex, 1);
	},

	giveboosters: 'givebooster',
	givebooster: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/givebooster - Access denied.");
		if (!target) return this.sendReply("/givebooster [user], [pack] - Give a user a pack.");
		let parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply("/givebooster [user], [pack] - Give a user a pack.");
		let ygo = toId(parts[1]);
		let userid = toId(this.targetUsername);
		if (cleanShop.indexOf(ygo) < 0) return this.sendReply("This pack does not exist.");
		if (!this.targetUser) return this.sendReply("User '" + this.targetUsername + "' not found.");
		if (!userYgos[userid]) userYgos[userid] = [];
		userYgos[userid].push(ygo);
		this.sendReply(this.targetUsername + " was given " + ygo + " pack. This user now has " + userYgos[userid].length + " pack(s).");
		Users.get(this.targetUsername).connections[0].sendTo(room.id,
			'|raw|' + user.name + ' has given you ' + ygo + ' pack. You have until the server restarts to open your pack.' +
			'Use <button name="send" value="/openbooster ' + ygo + '"><b>/openbooster ' + ygo + '</b></button> to open your pack.');
	},

	takeboosters: 'takebooster',
	takebooster: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply("/takebooster - Access denied.");
		if (!target) return this.sendReply("/takebooster [user], [pack] - Take a pack from a user.");
		let parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply("/takebooster [user], [pack] - Take a pack from a user.");
		let ygo = toId(parts[1]);
		let userid = toId(this.targetUsername);
		let ygoIndex = userYgos[userid].indexOf(ygo);
		if (ygoShop.indexOf(ygo) < 0) return this.sendReply("This pack does not exist.");
		if (!this.targetUser) return this.sendReply("User '" + this.targetUsername + "' not found.");
		if (!userYgos[userid]) userYgos[userid] = [];
		if (ygoIndex < 0) return this.sendReply("This user does not have this pack.");
		userYgos[userid].splice(ygoIndex, 1);
		this.sendReply(this.targetUsername + " lost " + ygo + " pack. This user now has " + userYgos[userid].length + " pack(s).");
		Users.get(this.targetUsername).send('|raw|' + user.name + ' has taken ' + ygo + ' pack from you. You now have ' + userYgos[userid].length + ' pack(s).');
	},

	deck: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let userid = user.userid;
		if (target) userid = toId(target);
		const dualcards = Db('dualcards').get(userid, []);
		if (!dualcards.length) return this.sendReplyBox(userid + " has no dualcards.");
		const dualcardsMapping = dualcards.map(function (dualcard) {
			return '<button name="send" value="/dualcard ' + dualcard.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + dualcard.card + '" width="80" title="' + dualcard.name + '"></button>';
		});
		this.sendReplyBox('<div style="max-height: 300px; overflow-y: scroll;">' + dualcardsMapping.join('') + '</div><br><center><b><font color="' + color(userid) + '">' + userid + '</font> has ' + dualcards.length + ' dualcards and ' + getPointTotal(userid) + ' lifepoints.</b></center>');
	},

	dualcard: function (target, room, user) {
		if (!target) return this.sendReply("/dualcard [name] - Shows information about a dualcard.");
		if (!this.runBroadcast()) return;
		let dualcardName = toId(target);
		if (!dualcards.hasOwnProperty(dualcardName)) return this.sendReply(target + ": dualcard not found.");
		let dualcard = dualcards[dualcardName];
		let html = '<div class="card-div card-td" style="box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);"><img src="' + dualcard.card + '" height="220" title="' + dualcard.name + '" align="right">' +
			'<span class="card-name" style="border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9);  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset, 0px 0px 2px rgba(0, 0, 0, 0.2);">' + dualcard.title + '</span>' +
			'<br /><br /><h1><font color="' + colors[dualcard.rarity] + '">' + dualcard.rarity + '</font></h1>' +
			'<br /><br /><font color="#AAA"><i>Points:</i></font> ' + dualcard.points +
			'<br /><br /><font color="#AAA"><i>Found in Boosters:</i></font>' + dualcard.collection.join(', ') +
			'<br clear="all">';
		this.sendReply('|raw|' + html);
	},

	dualcardladder: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db('lifepoints').object()).map(function (name) {
			return {name: name, lifepoints: getPointTotal(name)};
		});
		if (!keys.length) return this.sendReplyBox("Dualcard ladder is empty.");
		keys.sort(function (a, b) { return b.lifepoints - a.lifepoints; });
		this.sendReplyBox(rankLadder('Dualcard Ladder', 'lifepoints', keys.slice(0, 100), 'lifepoints'));
	},

	dus: 'dualsearch',
	dualsearch: function (target, room, user) {
		const letters = "abcdefghijklmnopqrstuvwxyz".split("");
		const categories = {
			Rarity: ['Common', 'Rare', 'SuperRare', 'UltraRare', 'SecretRare', 'ShatterfoilRare', 'UltimateRare, GhostRare'], // rarities
			Boosters: ['Starter Deck: Yugi', 'Starter Deck: Joey', 'Starter Deck: Kaiba', 'Starter Deck: Pegasus', 'Dark Legion', 'Emperor of Darkness', 'Master of Pendulum', 'Absolute Powerforce'],
		};

		const scrollable = "<div style=\"max-height: 300px; overflow-y: scroll\">"; // code for scrollable html
		const divEnd = "</div>";
		const definePopup = "|wide||html|<center><b>dualcardSearch</b></center><br />";
		const generalMenu = "<center>" +
			'<button name="send" value="/searchdualcard letter" style=\"background-color:aliceblue;height:30px\">Alphabetical</button>&nbsp;&nbsp;' + // alphabetical
			'<button name="send" value="/searchdualcard category" style=\"background-color:aliceblue;height:30px\">Categories</button>&nbsp;&nbsp;' + // category
			'</center><br />';
		if (!target) {
			return user.popup(definePopup + generalMenu);
		}
		// quick fix for when target ends with a comma
		target = target.replace(/\,[\s]+$/i, "");
		let parts = target.split(",");
		let actionCommand = parts.shift();
		let dualcardDisplay;
		switch (toId(actionCommand)) {
		case 'letter':
			let letter = toId(parts[0]);

			const letterMenu = '<center>' + letters.map(l => {
				return '<button name="send" value="/searchdualcard letter, ' + l + '" ' + (letter === l ? "style=\"background-color:lightblue;height:30px;width:35px\"" : "style=\"background-color:aliceblue;height:30px;width:35px\"") + ">" + l.toUpperCase() + "</button>";
			}).join("&nbsp;") + "</center><br />";

			if (!letter || letters.indexOf(letter) === -1) {
				// invalid letter to search for, or none given
				// only show menu
				return user.popup(definePopup + generalMenu + letterMenu);
			}
			// sort dualcards by letter
			let letterMons = {};
			for (let m in dualcards) {
				if (!letterMons[m.charAt(0)]) letterMons[m.charAt(0)] = {};
				letterMons[m.charAt(0)][m] = 1;
			}

			if (!letterMons[letter]) return user.popup(definePopup + generalMenu + letterMenu);
			// make graphics for the letter
			dualcardDisplay = Object.keys(letterMons[letter]).sort().map(m => {
				let dualcard = dualcards[m];
				return '<button name="send" value="/searchdualcard dualcard, ' + dualcard.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + dualcard.card + '" width="100" title="' + dualcard.name + '"></button>';
			}).join("&nbsp;");
			// send the popup
			user.lastDualcardSearch = target;
			user.popup(definePopup + generalMenu + letterMenu + scrollable + dualcardDisplay + divEnd);
			break;
		case 'category':
			// clean all the parts first
			parts = parts.map(p => {
				return toId(p);
			});

			// create category menu
			let categoryMenu = "";
			for (let c in categories) {
				categoryMenu += '<b>' + c + ' -</b> ' + categories[c].map(k => {
					let m = toId(k);
					// add a special search condition for rarity
					if (c === "Rarity") m += "rarity";

					// new params for the search
					// clone parts
					let newParams = parts.slice(0);
					if (parts.indexOf(m) > -1) {
						// remove it
						newParams.splice(newParams.indexOf(m), 1);
					} else {
						newParams.push(m);
					}

					let style = (parts.indexOf(m) > -1 ? "style=\"background-color:lightblue;height:23\"" : "style=\"background-color:aliceblue;height:23\""); // button style checking if currently searching

					return '<button name="send" value="/searchdualcard category, ' + newParams.join(", ") + '" ' + style + '>' + k + '</button>';
				}).join("&nbsp;") + "<br />";
			}
			if (!parts.length) {
				return user.popup(definePopup + generalMenu + categoryMenu);
			}
			// now clone the dualcards and delete the ones who dont match the categories
			let paramDualcards = Object.assign({}, dualcards);

			// filter out the unneeded ones; ignore rarity
			for (let i = 0; i < parts.length; i++) {
				let param = parts[i];
				// ignore rarity
				if (/rarity$/i.test(param)) continue;
				for (let c in paramDualcards) {
					let dualcardParams = paramDualcards[c].collection.join("~").toLowerCase().replace(/[^a-z0-9\~]/g, "").split("~");
					if (dualcardParams.indexOf(param) === -1) delete paramDualcards[c]; // remove the card from the currently searched ones.
				}
			}

			// seperate check for rarity
			let rarityCheck = parts.some(a => {
				return /rarity$/i.test(a);
			});
			if (rarityCheck) {
				for (let c in paramDualcards) {
					let dualcardRare = toId(paramDualcards[c].rarity);
					for (let i = 0; i < parts.length; i++) {
						if (/rarity$/i.test(parts[i])) {
							// check if rarity is the card's rarity
							if (parts[i].replace(/rarity$/i, "") !== dualcardRare) {
								// remove if not matched
								delete paramDualcards[c];
							}
						}
					}
				}
			}

			// no cards left
			if (!Object.keys(paramDualcards).length) {
				return user.popup(definePopup + generalMenu + categoryMenu + '<br /><center><font color="red"><b>Nothing matches your search</b></font></center>');
			}
			user.lastDualcardSearch = target;
			// build the display
			dualcardDisplay = Object.keys(paramDualcards).sort().map(m => {
				let dualcard = paramDualcards[m];
				return '<button name="send" value="/searchdualcard dualcard, ' + dualcard.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + dualcard.card + '" width="100" title="' + dualcard.name + '"></button>';
			}).join("&nbsp;");
			user.popup(definePopup + generalMenu + categoryMenu + scrollable + dualcardDisplay + divEnd);
			break;
		case 'dualcard':
			let backButton = '<button name="send" value="/dualcardsearch ' + user.lastDualcardSearch + '" style="background-color:aliceblue;height:30px;width:35">&lt;&nbsp;Back</button><br /><br />';
			if (!parts[0] || !(toId(parts[0]) in dualcards)) {
				return user.popup(definePopup + backButton + '<center><font color="red"><b>Invalid dualcard</b></font></center>');
			}

			// build the display screen for the card
			let dualcard = dualcards[toId(parts[0])];
			// the image
			let dualcardImage = '<img src="' + dualcard.card + '" height=250>';
			// the name of the dualcard
			let dualcardName = "<b>Name:</b> " + dualcard.name + "<br />";
			// the id of the dualcard
			let dualcardId = "<font color=\"gray\">(" + dualcard.title + ")</font><br />";
			// rarity display
			let dualcardRarityLifepoints = '<b>Rarity: </b><font color="' + colors[dualcard.rarity] + '">' + dualcard.rarity + '</font> (' + dualcard.points + ')<br />';
			// collections
			let dualcardCollection = '<b>Packs: </b>' + dualcard.collection.join(", ") + "<br />";
			// get users that have the dualcard
			let allDualcardUsers = Db('dualcards').object();
			let dualcardHolders = [];
			// dont allow duplicates
			for (let u in allDualcardUsers) {
				let userData = allDualcardUsers[u];
				for (let i = 0; i < userData.length; i++) {
					let tC = userData[i];
					if (tC && tC.title === dualcard.title) {
						if (!dualcardHolders[u]) dualcardHolders[u] = 0;
						dualcardHolders[u]++;
					}
				}
			}
			// show duplicates as (x#)
			dualcardHolders = Object.keys(dualcardHolders).sort().map(u => {
				return "&nbsp;- " + u + (dualcardHolders[u] > 1 ? " (x" + dualcardHolders[u] + ")" : "");
			});

			// build the display!
			dualcardDisplay = "<center><table><tr>" +
				"<td>" + dualcardImage + "</td>" + // Card on the left
				"<td>" + // details now
				dualcardName + dualcardId + dualcardRarityLifepoints + dualcardCollection +
				"<b>Users with this dualcard:</b><br />" + // dualcard holders
				"<div style=\"max-height: 130px; overflow-y: scroll\">" + // scrollable
				dualcardHolders.join("<br />") + "<br />" +
				"</td></tr></table></center>"; // close the table

			user.popup(definePopup + backButton + dualcardDisplay);
			break;
		case 'error':
		default:
			user.popup(definePopup + generalMenu + '<br /><center><font color="red"><b>Invalid Command action for dualcardSearch</b></font></center>');
			break;
		}
	},

	tradedualcard: function (target, room, user) {
		if (!target) return this.errorReply("/tradedualcard [dualcard ID], [user], [targetDualcard ID]");
		let parts = target.split(",").map(p => toId(p));
		if (parts.length !== 3) return this.errorReply("/tradedualcard [your dualcard's ID], [targetUser], [targetdualcard ID]");
		let match;

		// check for user's dualcard
		let forTrade = parts[0];
		match = false;
		let userDualcards = Db('dualcards').get(user.userid, []);
		for (let i = 0; i < userDualcards.length; i++) {
			if (userDualcards[i].title === forTrade) {
				match = true;
				break;
			}
		}
		if (!match) return this.errorReply("You don't have that dualcard!");

		// check for target's card
		let targetUser = parts[1];
		let targetTrade = parts[2];

		let targetDualcards = Db('dualcards').get(targetUser, []);
		match = false;
		for (let i = 0; i < targetDualcards.length; i++) {
			if (targetDualcards[i].title === targetTrade) {
				match = true;
				break;
			}
		}

		if (!match) return this.errorReply(targetUser + " does not have that card!");

		// initiate trade
		let tradeId = uuid.v1();
		let newTrade = {
			from: user.userid,
			to: targetUser,
			fromExchange: forTrade,
			toExchange: targetTrade,
			id: tradeId,
		};

		Db('dualcardtrades').set(tradeId, newTrade);

		// send messages
		this.sendReply("Your trade has been taken submitted.");
		if (Users.get(targetUser)) Users.get(targetUser).send("|pm|~OriginCardTradeClient|" + targetUser + "|/html <div class=\"broadcast-green\">" + Tools.escapeHTML(user.name) + " has initiated a trade with you.  Click <button name=\"send\" value=\"/trades last\">here</button> or use <b>/trades</b> to view your pending trade requests.</div>");
		user.send("|pm|~OriginCardTradeClient|" + user.userid + "|/html <div class=\"broadcast-green\">Your trade with " + Tools.escapeHTML(targetUser) + " has been initiated.  Click <button name=\"send\" value=\"/trades last\">here</button> or use <b>/trades</b> to view your pending trade requests.</div>");
	},

	viewdualcardtrades: function (target, room, user) {
		// popup variables
		const popup = "|html|<center><b><font color=\"blue\">Trade Manager</font></b></center><br />";

		// get the user's trades
		let allTrades = Db('dualcardtrades').object();
		let userTrades = [];
		for (let id in allTrades) {
			let trade = allTrades[id];
			if (trade.from === user.userid || trade.to === user.userid) {
				// push this into the user's trade data
				userTrades.push(trade);
			}
		}

		// if no pending trades
		if (!userTrades.length) return user.popup(popup + "<center>You have no pending trades.</center>");

		// build trade manager screen
		// decide which trade to display
		if (target === "last") {
			target = userTrades.length - 1;
		} else {
			// when there is no target (initial use of command)
			if (!target) target = 0;
			target = parseInt(target);
			if (isNaN(target)) target = 0;
			if (target < 0) target = 0;
			if (target >= userTrades.length) target = userTrades.length - 1;
		}

		// show trade details
		let displayTrade = userTrades[target];
		const acceptReject = '<center>' + (displayTrade.from === user.userid ? "" : '<button name="send" value="/tradeaction accept, ' + displayTrade.id + '" style=\"background-color:green;height:30px\"><b>Accept</b></button>') + // accept button
			'&nbsp;&nbsp;' + // spacing
			'<button name="send" value="/tradeaction ' + (displayTrade.from === user.userid ? "cancel" : "reject") + ', ' + displayTrade.id + '" style=\"background-color:red;height:30px\"><b>' + (displayTrade.from === user.userid ? "Cancel" : "Reject") + '</b></button></center>' + // reject button
			'<br /><br />'; // new line

		// build the user's card first
		let dualcard = dualcards[(displayTrade.from === user.userid ? displayTrade.fromExchange : displayTrade.toExchange)];
		// the image
		let dualcardImage = '<img src="' + dualcard.card + '" height=250>';
		// rarity display
		let dualcardRarityLifepoints = '(<font color="' + colors[dualcard.rarity] + '">' + dualcard.rarity + '</font> - ' + dualcard.points + ')<br />';
		let userSideDisplay = '<center>' + user.userid + '<br />' + dualcardImage + "<br />" + dualcardRarityLifepoints + '</center>';

		// now build the target's side
		dualcard = dualcards[(displayTrade.from !== user.userid ? displayTrade.fromExchange : displayTrade.toExchange)];
		// the image
		dualcardImage = '<img src="' + dualcard.card + '" height=250>';
		// rarity display
		dualcardRarityLifepoints = '(<font color="' + colors[dualcard.rarity] + '">' + dualcard.rarity + '</font> - ' + dualcard.points + ')<br />';
		let targetSideDisplay = "<center>" + (displayTrade.from !== user.userid ? displayTrade.from : displayTrade.to) + '<br />' + dualcardImage + "<br />" + dualcardRarityLifepoints + "</center>";

		// now build the entire popup
		let tradeScreen = popup + // base popup
			'<center><table><tr><td>' + // table element
			userSideDisplay +
			'</td><td>' + // next column
			targetSideDisplay +
			'</td></tr></table></center><br />' + // close table and add new line
			acceptReject;

		// build the navigation bar
		// build max and min
		let navigationButtons;
		if (userTrades.length === 1) {
			navigationButtons = '<center><button style="background-color:deepskyblue;height:30px;width:30px">1</button></center>';
		} else {
			// build min and mas
			let min = '<button style="background-color:lightblue;height:30px;width:30px" name="send" value="/viewdualcardtrades 0">1</button>&nbsp;&nbsp;&nbsp;';
			let max = '&nbsp;&nbsp;&nbsp;<button style="background-color:lightblue;height:30px;width:30px" name="send" value="/viewdualcardtrades last">' + (userTrades.length) + '</button>';
			// lazy replace for colour
			if (target === 0) min = min.replace("background-color:lightblue;height:30px", "background-color:deepskyblue;height:30px");
			if (target === userTrades.length - 1) max = max.replace("background-color:lightblue;height:30px", "background-color:deepskyblue;height:30px");

			let middle = "";
			// build range
			let range = Object.keys(userTrades).slice(1, userTrades.length - 1); // remove min and max and turn it into a array of numbers
			if (range.length !== 0) { // only build middle buttons is there is none
				if (range.length > 5) {
					// find the current one and get 2 above and below
					let displayRange = [target - 2, target - 1, target, target + 1, target + 2].filter(i => {
						return i > 0 && i <= range.length;
					});
					// build middle buttons
					middle = (displayRange[0] !== 1 ? "... " : "") + displayRange.map(n => {
						n = parseInt(n);
						let style = n === target ? "background-color:deepskyblue;height:30px;width:30px" : "background-color:aliceblue;height:30px;width:30px";
						return '<button style="' + style + '" name="send" value="/viewdualcardtrades ' + n + '">' + (n + 1) + '</button>';
					}).join("&nbsp;") + (displayRange[displayRange.length - 1] !== range.length ? " ..." : "");
				} else {
					// just map the range
					middle = range.map(n => {
						n = parseInt(n);
						let style = n === target ? "background-color:deepskyblue;height:30px;width:30px" : "background-color:aliceblue;height:30px;width:30px";
						return '<button style="' + style + '" name="send" value="/viewdualcardtrades ' + n + '">' + (n + 1) + '</button>';
					}).join("&nbsp;");
				}
			}
			// add the stuff to navigation buttons
			navigationButtons = "<center>" + min + middle + max + "</center>";
		}
		// add the navigation buttons to the popup
		user.lastTradeCommand = "/viewdualcardtrades " + target;
		tradeScreen += navigationButtons;
		user.popup(tradeScreen);
	},

	tradeaction: function (target, room, user) {
		if (!target) return false; // due to the complexity of the command, this should only be used through the viewtrades screen
		let parts = target.split(",").map(p => p.trim());
		let action = toId(parts.shift());
		const backButton = '<button name="send" value="' + (user.lastTradeCommand || '/viewdualcardtrades') + '" style="background-color:aliceblue;height:30px">< Back</button><br /><br />';
		const tradeError = "|html|" + backButton + '<center><font color="red"><b>ERROR: Invalid Trade / You cannot accept your own trade request!</b></font><center>';
		let trade;
		switch (action) {
		case 'confirmaccept':
		case 'accept':
			if (!parts[0]) return false;
			if (action === "accept") {
				// make the user confirm the decision
				// build a back button
				return user.popup("|html|" + backButton + // back button
				'<center><button name="send" value="/tradeaction confirmaccept, ' + parts[0] + '" style="background-color:red;height:65px;width:150px"><b>Confirm Trade</b></button></center>');
			}
			// finalize trade
			// get the trade
			trade = Db('dualcardtrades').get(parts[0], null);
			if (!trade) return user.popup(tradeError);

			// check if the trade involves the user
			let accepter, otherTarget;
			if (trade.to === user.userid) {
				accepter = "to";
				otherTarget = "from";
			} else {
				// user has no say in this trade
				return user.popup(tradeError);
			}

			let match;
			// now double check that both users still have those dualcards
			// check user first
			match = false;
			let userDualcards = Db('dualcards').get(user.userid, []);
			for (let i = 0; i < userDualcards.length; i++) {
				if (userDualcards[i].title === trade[accepter + "Exchange"]) {
					match = true;
					break;
				}
			}

			if (!match) return this.parse('/tradeaction forcecancel, ' + trade.id);

			// check target
			match = false;
			let targetDualcards = Db('dualcards').get(trade[otherTarget], []);
			for (let i = 0; i < targetDualcards.length; i++) {
				if (targetDualcards[i].title === trade[otherTarget + "Exchange"]) {
					match = true;
					break;
				}
			}
			if (!match) return this.parse('/tradeaction forcecancel, ' + trade.id);

			// now go ahead with the trade!
			// for "from" first
			addDualcard(trade.from, trade.toExchange);
			removeDualcard(trade.fromExchange, trade.from);

			// apply the actions to "to"
			addDualcard(trade.to, trade.fromExchange);
			removeDualcard(trade.toExchange, trade.to);

			// update points
			Db('lifepoints').set(trade.to, getPointTotal(trade.to));
			Db('lifepoints').set(trade.from, getPointTotal(trade.from));

			// remove the trade
			Db('dualcardtrades').delete(parts[0]);

			// on trade success
			// send popups to both user and target saying the trade with user was a success
			// and a button to view the card they just received
			let targetUsers = [Users.get(trade.to), Users.get(trade.from)];
			if (targetUsers[0]) {
				targetUsers[0].popup("|html|" + backButton + "<center>Your trade with " + trade.from + " has gone through." +
				"<br /><button name=\"send\" value=\"/cs card, " + trade.fromExchange + "\">View Traded Card</button></center>"); // show card
			}
			if (targetUsers[1]) {
				targetUsers[1].popup("|html|<center>Your trade with " + trade.to + " has gone through." +
				"<br /><button name=\"send\" value=\"/cs card, " + trade.toExchange + "\">View Traded Card</button></center>");
			}

			// log trades and delete the data from list of trades.
			let now = Date.now().toString();
			Db('completedTrades').set(now, trade);
			break;
		case 'forcecancel':
		case 'cancel':
		case 'reject':
			if (!parts[0]) return false;
			// check for trade
			trade = Db('dualcardtrades').get(parts[0], null);

			if (!trade) return user.popup(tradeError);

			// additional consts
			const popupText = {
				forcecancel: "The trade has automatically been cancelled as one of the participants does not have that card anymore.",
				cancel: "You have cancelled the trade",
			};

			// check if user is involved
			if (trade.from === user.userid || trade.to === user.userid) {
				// check that the action is correct
				if (trade.from === user.userid && action === "reject") action = "cancel";
				if (trade.to === user.userid && action !== "reject" && action !== "forcecancel") action = "reject";
			} else {
				return user.popup(tradeError);
			}

			// remove the trade
			Db('dualcardtrades').delete(parts[0]);

			// letting the users involved know
			let targetUser;
			if (action === "reject") {
				targetUser = Users.get(trade.from);
				if (targetUser) targetUser.popup("Your trade request with " + user.userid + " was rejected");
				user.popup("|html|" + backButton + "You have rejected " + trade.from + "'s trade request.");
			} else {
				user.popup("|html|" + backButton + popupText[action]);
			}
			break;
		}
	},

	confirmtransferdualcard: 'transferdualcard',
	transferdualcard: function (target, room, user, connection, cmd) {
		if (!target) return this.errorReply("/transferdualcard [user], [dualcard ID]");
		if (toId(target) === user) return this.errorReply("You cannot transfer dualcards to yourself.");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the dualcard being transfered.
		let targetUser = parts.shift();
		let dualcard = parts[0];
		if (!targetUser || !dualcard) return this.errorReply("/transferdualcard [user], [dualcard ID]");

		if (cmd === "transferdualcard") {
			return user.popup('|html|<center><button name="send" value="/confirmtransferdualcard ' + target + '" style="background-color:red;height:65px;width:150px"><b><font color="white" size=3>Confirm Transfer to ' + targetUser + '</font></b></button>');
		}
		// check if dualcard can been removed
		let canTransfer = removeDualcard(dualcard, user.userid);
		if (!canTransfer) return user.popup("Invalid card.");
		// complete transfer
		addDualcard(targetUser, dualcard);

		Db('lifepoints').set(targetUser, getPointTotal(targetUser));
		Db('lifepoints').set(user.userid, getPointTotal(user.userid));

		// build transfer profile
		let newTransfer = {
			from: user.userid,
			to: targetUser,
			transfer: dualcard,
		};
		// log it
		let now = Date.now().toString();
		Db('completedTrades').set(now, newTransfer);
		user.popup("You have successfully transfered " + dualcard + " to " + targetUser + ".");
	},

	confirmtransferalldualcards: 'transferalldualcards',
	transferalldualcards: function (target, room, user, connection, cmd) {
		if (!target) return this.errorReply("/transferalldualcards [user]");
		if (toId(target) === user) return this.errorReply("You cannot transfer dualcards to yourself.");
		let targetUser = toId(target);
		if (!targetUser) return this.errorReply("/transferalldualcards [user]");
		let userDualcards = Db('dualcards').get(user.userid, []);
		let targetDualcards = Db('dualcards').get(targetUser, []);

		if (!userDualcards.length) return this.errorReply("You don't have any cards.");

		// confirmation
		if (cmd === "transferalldualcards") {
			return user.popup('|html|<center><button name="send" value="/confirmtransferalldualcards ' + target + '" style="background-color:red;height:65px;width:150px"><b><font color="white" size=3>Confirm Transfer to ' + targetUser + '</font></b></button>');
		}

		// now the real work
		Db('dualcards').set(targetUser, targetDualcards.concat(userDualcards));
		Db('dualcards').set(user.userid, []);

		Db('Lifepoints').set(targetUser, getPointTotal(targetUser));
		Db('Lifepoints').set(user.userid, getPointTotal(user.userid));

		user.popup("You have transfered all your dualcards to " + targetUser + ".");

		let newTransfer = {
			from: user.userid,
			to: targetUser,
			transfer: "all",
		};

		let now = Date.now().toString();
		Db('completedTrades').set(now, newTransfer);
	},

	ygotcg: 'dualcardshelp',
	dualcardshelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReplyBox("<center><b><u>YuGiOh Trading Card Game:</u></b></center><br>" +
			"<b>/buybooster</b> - Buys a booster from the ygo shop.<br>" +
			"<b>/ygoshop</b> - Shows the shop for buying boosters.<br>" +
			"<b>/openboosterk</b> - Opens a booster that has been purchased from the shop.<br>" +
			"<b>/boosters</b> - Shows a display of all your unopened boosters.<br>" +
			"<b>/deck</b> - Shows a display of all dualcards that you have.<br>" +
			"<b>/dualcard</b> - Shows data and information on any specifc dualcard.<br>" +
			"<b>/dualcardladder</b> - Shows the leaderboard of the users with the most dualcard Lifepoints.<br>" +
			"<b>/dualcardsearch</b> - Opens a window allowing you to search through all the dualcards.<br>" +
			"<b>/tradedualcard</b> - /swap [user\'s dualcard], [targetUser], [targetUser\'s dualcard] - starts a new trade request.<br>" +
			"<b>/viewdualcardtrades</b> - View your current pending trade requests.<br>" +
			"<b>/transferdualcard</b> - /transferdualcard [targetUser], [dualcard] - transfers a dualcard to the target user.<br>" +
			"<b>/transferalldualcards</b> - /transferalldualcards [user] - transfers all of your dualcards to the target user.<br>"
		);
	},

	givedualcard: 'spawndualcard',
	spawndualcard: function (target, room, user, connection, cmd) {
		if (!this.can('declare')) return false;
		if (!target) return this.errorReply("/givedualcard [user], [dualcard ID]");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the dualcard being given.
		let targetUser = parts.shift();
		let dualcard = parts[0].trim();
		if (!targetUser || !dualcard) return this.errorReply("/givedualcard [user], [dualcard ID]");
		if (!dualcards.hasOwnProperty(dualcard)) return this.sendReply(target + ": dualcard not found.");
		//Give the dualcard to the user.
		dualcard = dualcards[dualcard];
		addDualcard(targetUser, dualcard.title);
		user.popup("You have successfully given " + dualcard.name + " to " + targetUser + ".");
		this.logModCommand(user.name + "gave the dualcard '" + dualcard.name + "' to " + targetUser + ".");
	},

	takedualcard: function (target, room, user, connection, cmd) {
		if (!this.can('declare')) return false;
		if (!target) return this.errorReply("/takedualcard [user], [dualcard ID]");
		let parts = target.split(",").map(p => toId(p));
		// find targetUser and the dualcard being taken.
		let targetUser = parts.shift();
		let dualcard = parts[0].trim();
		if (!targetUser || !dualcard) return this.errorReply("/takedualcard [user], [dualcard ID]");
		if (!dualcards.hasOwnProperty(dualcard)) return this.sendReply(target + ": dualcard not found.");
		//Take the dualcard from the user.
		dualcard = dualcards[dualcard];
		removeDualcard(dualcard.title, targetUser);
		user.popup("You have successfully taken " + dualcard.name + " from " + targetUser + ".");
		this.logModCommand(user.name + " took the dualcard '" + dualcard.name + "' from " + targetUser + ".");
	},
};
