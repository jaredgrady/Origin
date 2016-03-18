'use strict';
/********************
 * Cards
 * Origin's Card System: Credit to Naten, nineage, fender, and everyone who added cards/
 * All cards should be retrieved here http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/
 * Cards are organized alphabetically and use a point system
 * publicids are dex numbers and any unique identifiers (if they're not a Pokemon, do a shorthand version of the card name)
 * Dex Number, (for multiple pokemon: DEX[lowercase letter, a, b, c, d])
********************/
const uuid = require('uuid');
const cards = require('../card-data.js');
let rankLadder = require('../rank-ladder');

const colors = {
	Mythic: '#D82A2A',
	Legendary: '#E8AB03',
	Epic: '#73DF14',
	Rare: '#2DD1B6',
	Uncommon: '#2D3ED1',
	Common: '#000',
};

const shop = [
	['XY-Base', 'Get three cards from the first pack released in the Pokemon XY set.', 10],
	['XY-Flashfire', 'Get three cards from the Flashfire pack released in the Pokemon XY set.', 10],
	['XY-Furious Fists', 'Get three cards from the Furious Fists pack released in the Pokemon XY set.', 10],
	['XY-Phantom Forces', 'Get three cards from the Phantom Forces pack released in the Pokemon XY set.', 10],
	['XY-Primal Clash', 'Get three cards from the Primal Clash pack released in the Pokemon XY set.', 10],
	['XY-Roaring Skies', 'Get three cards from the Roaring Skies pack released in the Pokemon XY set.', 10],
];
let packShop = ['XY-Base', 'XY-Flashfire', 'XY-Furious Fists', 'XY-Phantom Forces', 'XY-Primal Clash', 'XY-Roaring Skies', 'Double Crisis', 'Water', 'Fire', 'Fighting', 'Fairy', 'Dragon', 'Colorless', 'Psychic', 'Lightning', 'Darkness', 'Grass', 'OU-Pack', 'UU-Pack', 'Uber-Pack', 'PU-Pack', 'NU-Pack', 'RU-Pack', 'LC-Pack', 'BL-Pack', 'BL2-Pack', 'BL3-Pack', 'Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6', 'Metal', 'Trainer', 'Supporter', 'Item', 'Stadium', 'EX-Pack', 'Legendary', 'Full', 'Event'];
const tourCardRarity = ['No Card', 'Common', 'Uncommon', 'Rare', 'Epic', 'Epic', 'Legendary', 'Legendary', 'Mythic'];
const cardRarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
let cleanShop = [];
let cleanCard = [];
let rareCache = []; //Used to cache cards for tours
let cardCache = []; //Used to cache cards in packs
let userPacks = {}; //Used to store users unopened packs

function cachePacks() {
	for (let i = 0; i < packShop.length; i++) {
		cardCache.push([]);
		for (let key in cards) {
			if (cards.hasOwnProperty(key)) {
				let obj = cards[key];
				if (obj.hasOwnProperty('collection') && obj.collection.indexOf(packShop[i]) > -1) cardCache[i].push(key);
			}
		}
	}
	for (let i = 0; i < packShop.length; i++) {
		cleanShop.push(toId(packShop[i]));
	}
}

function cacheRarity() {
	for (let i = 0; i < cardRarity.length; i++) {
		rareCache.push([]);
		for (let key in cards) {
			if (cards.hasOwnProperty(key)) {
				let obj = cards[key];
				if (obj.hasOwnProperty('rarity') && obj.rarity.indexOf(cardRarity[i]) > -1) rareCache[i].push(key);
			}
		}
	}
	for (let i = 0; i < cardRarity.length; i++) {
		cleanCard.push(toId(cardRarity[i]));
	}
}

global.tourCard = function (tourSize, userid) {
	if (tourSize > 32) tourSize = 32;
	let tourRarity = tourCardRarity[Math.floor(tourSize / 4)];
	let cacheValue = rareCache[cleanCard.indexOf(toId(tourRarity))];
	let card = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
	if (tourRarity === 'No Card') return;
	addCard(userid, card);
	return [cards[card].rarity, cards[card].title, cards[card].name];
};

function addCard(name, card) {
	let newCard = {};
	newCard.id = uuid.v1();
	newCard.title = cards[card].title;
	newCard.card = cards[card].card;
	newCard.name = cards[card].name;
	newCard.rarity = cards[card].rarity;
	newCard.points = cards[card].points;

	let userid = toId(name);
	Db('cards').set(userid, Db('cards').get(userid, []).concat([newCard]));
	Db('points').set(userid, Db('points').get(userid, 0) + newCard.points);
}

function getShopDisplay(shop) {
	let display = "<table width='100%' border='1' style='border-collapse: collapse; color: #444; box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);' cellpadding='5'>" +
		"<tr><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Command</th><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Description</th><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Cost</th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" + "<td class='card-td'><button name='send' value='/buypack " + shop[start][0] + "' style='border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;'><b>" + shop[start][0] + "</b></button></td>" +
			"<td class='card-td'>" + shop[start][1] + "</td>" +
			"<td class='card-td'>" + shop[start][2] + "</td>" +
			"</tr>";
		start++;
	}
	display += "</table><center>To buy a pack from the shop, use /buypack <em>pack</em>.</center>";
	return display;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

cachePacks();
cacheRarity();

exports.commands = {
	packs: 'pack',
	pack: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) target = user.name;
		target = toId(target);
		if (!userPacks[target] || userPacks[target].length === 0) {
			return this.sendReply((target === user.userid ? 'You have' : target + ' has') + ' no packs.');
		}
		this.sendReply('|raw|<u><b>List of packs:</b></u>');
		for (let i = 0; i < userPacks[target].length; i++) {
			this.sendReply(toTitleCase(userPacks[i]));
		}
	},

	buypacks: 'buypack',
	buypack: function (target, room, user) {
		if (!target) return this.sendReply('/buypack - Buys a pack from the pack shop. Alias: /buypacks');
		let self = this;
		let packId = toId(target);
		let amount = Db('money').get(user.userid, 0);
		if (cleanShop.indexOf(packId) < 0) return self.sendReply('This is not a valid pack. Use /packshop to see all packs.');
		let shopIndex = cleanShop.indexOf(toId(target));
		if (packId !== 'xybase' && packId !== 'xyfuriousfists' && packId !== 'xyflashfire' && packId !== 'xyphantomforces' && packId !== 'xyroaringskies' && packId !== 'xyprimalclash') return self.sendReply('This pack is not currently in circulation.  Please use /packshop to see the current packs.');
		let cost = shop[shopIndex][2];
		if (cost > amount) return self.sendReply('You need ' + (cost - amount) + ' more bucks to buy this card.');
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		let pack = toId(target);
		self.sendReply('|raw|You have bought ' + target + ' pack for ' + cost +
			' bucks. Use <button name="send" value="/openpack ' +
			pack + '"><b>/openpack ' + pack + '</b></button> to open your pack.');
		self.sendReply('You have until the server restarts to open your pack.');
		if (!userPacks[user.userid]) userPacks[user.userid] = [];
		userPacks[user.userid].push(pack);
		if (room.id !== 'lobby') room.addRaw(user.name + ' has bought <b>' + target + ' pack </b> from the shop.');
		room.update();
	},

	packshop: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReply('|raw|' + getShopDisplay(shop));
	},

	open: 'openpack',
	openpacks: 'openpack',
	openpack: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) {
			this.sendReply('/openpack [pack] - Open a Pokemon Card Pack. Alias: /open, /openpacks');
			return this.parse('/packs');
		}
		if (cleanShop.indexOf(toId(target)) < 0) return this.sendReply('This pack does not exist.');
		if (!userPacks[user.userid] || userPacks[user.userid].length === 0) return this.sendReply('You have no packs.');
		if (userPacks[user.userid].indexOf(toId(target)) < 0) return this.sendReply('You do not have this pack.');
		let newPack;
		for (let i = 0; i < 3; i++) {
			newPack = toId(target);
			let cacheValue = cardCache[cleanShop.indexOf(toId(target))];
			let card = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
			addCard(user.userid, card);
			let cardName = cards[card].name;
			let packName = packShop[cleanShop.indexOf(toId(target))];
			this.sendReplyBox(user.name + ' got <font color="' + colors[cards[card].rarity] + '">' + cards[card].rarity + '</font>' +
			'<button name="send" value="/card ' + card  + '"><b>' + cardName + '</b></button> from a' +
			'<button name="send" value="/buypack ' + packName + '">' + packName + ' Pack</button>.');
		}
		let usrIndex = userPacks[user.userid].indexOf(newPack);
		userPacks[user.userid].splice(usrIndex, 1);
	},

	givepacks: 'givepack',
	givepack: function (target, room, user) {
		if (!user.can('declare')) return this.errorReply('/givepack - Access denied.');
		if (!target) return this.sendReply('/givepack [user], [pack] - Give a user a pack. Alias: /givepacks');
		let parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply('/givepack [user], [pack] - Give a user a pack. Alias: /givepacks');
		let pack = toId(parts[1]);
		let userid = toId(this.targetUsername);
		if (cleanShop.indexOf(pack) < 0) return this.sendReply('This pack does not exist.');
		if (!this.targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
		if (!userPacks[userid]) userPacks[userid] = [];
		userPacks[userid].push(pack);
		this.sendReply(this.targetUsername + ' was given ' + pack + ' pack. This user now has ' + userPacks[userid].length + ' pack(s).');
		Users.get(this.targetUsername).connections[0].sendTo(room.id,
			'|raw|' + user.name + ' has given you ' + pack + ' pack. You have until the server restarts to open your pack.' +
			'Use <button name="send" value="/openpack ' + pack + '"><b>/openpack ' + pack + '</b></button> to open your pack.');
	},

	takepacks: 'takepack',
	takepack: function (target, room, user) {
		if (!user.can('takepack')) return this.errorReply('/takepack - Access denied.');
		if (!target) return this.sendReply('/takepack [user], [pack] - Take a pack from a user. Alias: /takepacks');
		let parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply('/takepack [user], [pack] - Take a pack from a user. Alias: /takepacks');
		let pack = toId(parts[1]);
		let userid = toId(this.targetUsername);
		let packIndex = userPacks[userid].indexOf(pack);
		if (packShop.indexOf(pack) < 0) return this.sendReply('This pack does not exist.');
		if (!this.targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
		if (!userPacks[userid]) userPacks[userid] = [];
		if (packIndex < 0) return this.sendReply('This user does not have this pack.');
		userPacks[userid].splice(packIndex, 1);
		this.sendReply(this.targetUsername + ' lost ' + pack + ' pack. This user now has ' + userPacks[userid].length + ' pack(s).');
		Users.get(this.targetUsername).send('|raw|' + user.name + ' has taken ' + pack + ' pack from you. You now have ' +  userPacks[userid].length + ' pack(s).');
	},

	showcards: 'showcase',
	showcard: 'showcase',
	showcase: function (target, room, user) {
		if (!this.canBroadcast()) return;

		let page = 1;
		let userid = user.userid;
		const parts = target.split(',');
		if (parts.length === 2) {
			userid = toId(parts[0]);
			page = isNaN(parts[1]) ? 1 : Number(parts[1]);
		} else if (parts.length === 1 && toId(parts[0])) {
			userid = toId(parts[0]);
		}

		const cards = Db('cards').get(userid, []);
		const points = Db('points').get(userid, 0);

		if (!cards.length) return this.sendReplyBox(userid + " has no cards.");

		const cardsMapping = cards.map(function (card) {
			return '<button name="send" value="/card ' + card.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + card.card + '" width="50" title="' + card.name + '"></button>';
		});

		const start = (page - 1) * 10;
		const end = page * 10;
		const bottom = '<br><br>' + userid + ' has ' + points + ' points.<br><br><b>Showing cards: ' + start + ' through ' + end + ' of ' + cards.length + '</b>';
		const display = cardsMapping.slice(start, end);

		if (!display.length) return this.sendReplyBox("Too many pages.");

		this.sendReplyBox(display.join('') + bottom);
	},

	card: function (target, room, user) {
		if (!target) return this.sendReply('/card [name] - Shows information about a card.');
		if (!this.canBroadcast()) return;
		let cardName = toId(target);
		if (!cards.hasOwnProperty(cardName)) return this.sendReply(target + ': card not found.');
		let card = cards[cardName];
		let html = '<div class="card-div card-td" style="box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);"><img src="' + card.card + '" height="220" title="' + card.name + '" align="right">' +
			'<span class="card-name" style="border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9);  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset, 0px 0px 2px rgba(0, 0, 0, 0.2);">' + card.title + '</span>' +
			'<br /><br /><h1><font color="' + colors[card.rarity] + '">' + card.rarity + '</font></h1>' +
			'<br /><br /><font color="#AAA"><i>Points:</i></font> ' + card.points +
			'<br /><br /><font color="#AAA"><i>Found in Packs:</i></font>' + card.collection.join(', ') +
			'<br clear="all">';
		this.sendReply('|raw|' + html);
	},

	cardladder: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let keys = Object.keys(Db('points').object()).map(function (name) {
			return {name: name, points: Db('points').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Card ladder is empty.");
		keys.sort(function (a, b) { return b.points - a.points; });
		this.sendReplyBox(rankLadder('Card Ladder', 'Points', keys.slice(0, 100), 'points'));
	},

	psgo: 'cardshelp',
	origincg: 'cardshelp',
	cardshelp: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReplyBox('<center><b><u>Origin Trading Card Game:</u></b></center><br>' +
			'<b>/buypack</b> - Buys a pack from the pack shop.<br>' +
			'<b>/packshop</b> - Shows the shop for buying packs.<br>' +
			'<b>/openpack</b> - Opens a pack that has been purchased from the shop.<br>' +
			'<b>/showcase</b> - Shows a display of all cards that you have. Specify a page number to see more cards.<br>' +
			'<b>/card</b> - Shows data and information on any specifc card.<br>' +
			'<b>/cardladder</b> - Shows the leaderboard of the users with the most card points.<br>'
		);
	},

	// searching cards
	cs: "cardsearch",
	cardsearch: "searchcard",
	searchcard: function (target, room, user) {
		// consts
		const letters = "abcdefghijklmnopqrstuvwuyz".split("");
		const categories = {
			Rarity: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'], // rarities
			Packs: ['XY-Base', 'XY-Flashfire', 'XY-Furious Fists', 'XY-Phantom Forces', 'XY-Primal Clash', 'XY-Roaring Skies', 'Double Crisis'],
			Types: ['Water', 'Fire', 'Fighting', 'Fairy', 'Dragon', 'Colorless', 'Psychic', 'Lightning', 'Darkness', 'Grass', 'Metal'],
			Tiers: ['OU-Pack', 'UU-Pack', 'Uber-Pack', 'PU-Pack', 'NU-Pack', 'RU-Pack', 'LC-Pack', 'BL-Pack', 'BL2-Pack', 'BL3-Pack'],
			Generation: ['Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6'],
			Miscellaneous: ['Trainer', 'Supporter', 'Item', 'Stadium', 'EX-Pack', 'Legendary', 'Full', 'Event'],
		};

		const scrollable = "<div style=\"max-height: 300px; overflow-y: scroll\">"; // code for scrollable html
		const divEnd = "</div>";

		const definePopup = "|wide||html|<center><b>CardSearch</b></center><br />";
		const generalMenu = "<center>" +
			'<button name="send" value="/searchcard letter" style=\"background-color:aliceblue;height:30\">Alphabetical</button>&nbsp;&nbsp;' + // alphabetical
			'<button name="send" value="/searchcard category" style=\"background-color:aliceblue;height:30\">Categories</button>&nbsp;&nbsp;' + // category
			'</center><br />';
		if (!target) {
			return user.popup(definePopup + generalMenu);
		}
		// quick fix for when target ends with a comma
		target = target.replace(/\,[\s]+$/i, "");
		let parts = target.split(",");

		let actionCommand = parts.shift();

		let cardDisplay;

		switch (toId(actionCommand)) {
		case "letter":
			let letter = toId(parts[0]);

			const letterMenu = '<center>' + letters.map(l => {
				return '<button name="send" value="/searchcard letter, ' + l + '" ' + (letter === l ? "style=\"background-color:lightblue;height:30px;width:35\"" : "style=\"background-color:aliceblue;height:30px;width:35\"") + ">" + l.toUpperCase() + "</button>";
			}).join("&nbsp;") + "</center><br />";

			if (!letter || letters.indexOf(letter) === -1) {
				// invalid letter to search for, or none given
				// only show menu
				return user.popup(definePopup + generalMenu + letterMenu);
			}
			// sort cards by letter
			let letterMons = {};
			for (let m in cards) {
				if (!letterMons[m.charAt(0)]) letterMons[m.charAt(0)] = {};
				letterMons[m.charAt(0)][m] = 1;
			}
			// make graphics for the letter
			cardDisplay = Object.keys(letterMons[letter]).sort().map(m => {
				let card = cards[m];
				return '<button name="send" value="/searchcard card, ' + card.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + card.card + '" width="100" title="' + card.name + '"></button>';
			}).join("&nbsp;");
			// send the popup
			user.lastCardSearch = target;
			user.popup(definePopup + generalMenu + letterMenu + scrollable + cardDisplay + divEnd);
			break;
		case "category":
			// clean all the parts first
			parts = parts.map(p => {
				return toId(p);
			});

			// create category menu
			let categoryMenu = "";
			for (let c in categories) {
				categoryMenu += '<b>' + c  + ' -</b> ' + categories[c].map(k => {
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

					let style = (parts.indexOf(m) > -1  ? "style=\"background-color:lightblue;height:23\"" : "style=\"background-color:aliceblue;height:23\""); // button style checking if currently searching

					return '<button name="send" value="/searchcard category, ' + newParams.join(", ") + '" ' + style + '>' + k + '</button>';
				}).join("&nbsp;") + "<br />";
			}
			if (!parts.length) {
				return user.popup(definePopup + generalMenu + categoryMenu);
			}
			// now clone the cards and delete the ones who dont match the categories
			let paramCards = Object.assign({}, cards);

			// filter out the unneeded ones; ignore rarity
			for (let i = 0; i < parts.length; i++) {
				let param = parts[i];
				// ignore rarity
				if (/rarity$/i.test(param)) continue;
				for (let c in paramCards) {
					let cardParams = paramCards[c].collection.join("~").toLowerCase().replace(/[^a-z0-9\~]/g, "").split("~");
					if (cardParams.indexOf(param) === -1) delete paramCards[c]; // remove the card from the currently searched ones.
				}
			}

			// seperate check for rarity
			let rarityCheck = parts.some(a => {
				return /rarity$/i.test(a);
			});
			if (rarityCheck) {
				for (let c in paramCards) {
					let cardRare = toId(paramCards[c].rarity);
					for (let i = 0; i < parts.length; i++) {
						if (/rarity$/i.test(parts[i])) {
							// check if rarity is the card's rarity
							if (parts[i].replace(/rarity$/i, "") !== cardRare) {
								// remove if not matched
								delete paramCards[c];
							}
						}
					}
				}
			}

			// no cards left
			if (!Object.keys(paramCards).length) {
				return user.popup(definePopup + generalMenu + categoryMenu + '<br /><center><font color="red"><b>Nothing matches your search</b></font></center>');
			}
			user.lastCardSearch = target;
			// build the display
			cardDisplay = Object.keys(paramCards).sort().map(m => {
				let card = paramCards[m];
				return '<button name="send" value="/searchcard card, ' + card.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + card.card + '" width="100" title="' + card.name + '"></button>';
			}).join("&nbsp;");
			user.popup(definePopup + generalMenu + categoryMenu + scrollable + cardDisplay + divEnd);
			break;
		case "card":
			let backButton = '<button name="send" value="/cardsearch ' + user.lastCardSearch + '" style="background-color:aliceblue;height:30px;width:35">&lt;&nbsp;Back</button><br /><br />';
			if (!parts[0] || !(toId(parts[0]) in cards)) {
				user.popup(definePopup + backButton + '<center><font color="red"><b>Invalid Card</b></font></center>');
			}

			// build the display screen for the card
			let card = cards[toId(parts[0])];
			// the image
			let cardImage = '<img src="' + card.card + '" height=250>';
			// the name of the card
			let cardName = "<b>Name:</b> " + card.name + "<br />";
			// the id of the card
			let cardId =  "<font color=\"gray\">(" + card.title + ")</font><br />";
			// rarity display
			let cardRarityPoints = '<b>Rarity: </b><font color="' + colors[card.rarity] + '">' + card.rarity + '</font> (' + card.points +  ')<br />';
			// collections
			let cardCollection = '<b>Packs: </b>' + card.collection.join(", ") + "<br />";
			// get users that have the card
			let allCardUsers = Db('cards').object();
			let cardHolders = [];
			for (let u in allCardUsers) {
				let userData = allCardUsers[u];
				for (let i = 0; i < userData.length; i++) {
					let tC = userData[i];
					if (tC && tC.title === card.title) cardHolders.push("&nbsp;&nbsp;- " + u);
				}
			}

			// build the display!
			cardDisplay = "<center><table><tr>" +
				"<td>" + cardImage + "</td>" + // Card on the left
				"<td>" + // details now
				cardName + cardId + cardRarityPoints + cardCollection +
				"<b>Users with this card:</b><br />" + // card holders
				"<div style=\"max-height: 130px; overflow-y: scroll\">" + // scrollable
				cardHolders.join(", ") + "<br />" +
				"</td></tr></table></center>"; // close the table

			user.popup(definePopup + backButton + cardDisplay);
			break;
		case "error":
		default:
			user.popup(definePopup + generalMenu + '<br /><center><font color="red"><b>Invalid Command action for CardSearch</b></font></center>');
			break;
		}
	},
};
