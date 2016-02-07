//PSCG
/*Cards are organized alphabetically and use a point system
Common 1 Point
Uncommon 3 Points
Rare 6 points
Epic 10 points
Legendary 15 points
Mythic 20 points
Make a discretionary call on what rarity they should be (Mythics are exclusively very unique legendary cards)

If a card name repeats, attach a number to the end of it to make sure that it actually can be pulled with packs.

publicids are dex numbers and any unique identifiers (if they're not a Pokemon, do a shorthand version of the card name)
EX - EX
Primal - Pr
Mega - M
Ancient Trait (Delta) - D
If multiple unique identifiers are there, stack them.

Deltas are bumped up 1 level of rarity from their normal form.
Full images are bumped up 1 level of rarity from their normal form
EX cards are Epic
EX Megas are Legendary
Etc

Collections are different identifiers of the CARD, please include the card's typing, anything included in it, the pack it came from, and anything special about it in the game
Possible identifiers include
Gen#
Card Type [Fighting, Colorless, etc]
Tier
Pack Name [XY-Roaring Skies]
Legendary
Event
Pseudo [For pseudo legendaries]
Starter [For starter Pokemon]
Full [For Pokemon with full background]

All cards should be retrieved here http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/
*/
'use strict';

var uuid = require('uuid');
var cards = require('../card-data.js');

var colors = {
	Mythic: '#D82A2A',
	Legendary: '#E8AB03',
	Epic: '#73DF14',
	Rare: '#2DD1B6',
	Uncommon: '#2D3ED1',
	Common: '#000',
};

var shop = [ //Actual shop display
	['XY-Base', 'Get three cards from the first pack released in the Pokemon XY set.', 10],
	['XY-Flashfire', 'Get three cards from the Flashfire pack released in the Pokemon XY set.', 10],
	['XY-Furious Fists', 'Get three cards from the Furious Fists pack released in the Pokemon XY set.', 10],
	['XY-Phantom Forces', 'Get three cards from the Phantom Forces pack released in the Pokemon XY set.', 10],
	['XY-Primal Clash', 'Get three cards from the Primal Clash pack released in the Pokemon XY set.', 10],
	['XY-Roaring Skies', 'Get three cards from the Roaring Skies pack released in the Pokemon XY set.', 10],
	//['UU-Pack', 'Get three cards from the UU tier.', 10]
];
//Shop used in cardCache to reduce RAM usage of card caching
var packShop = ['XY-Base', 'XY-Flashfire', 'XY-Furious Fists', 'XY-Phantom Forces', 'XY-Primal Clash', 'XY-Roaring Skies', 'Double Crisis', 'Water', 'Fire', 'Fighting', 'Fairy', 'Dragon', 'Colorless', 'Psychic', 'Lightning', 'Darkness', 'Grass', 'OU-Pack', 'UU-Pack', 'Uber-Pack', 'PU-Pack', 'NU-Pack', 'RU-Pack', 'LC-Pack', 'BL-Pack', 'BL2-Pack', 'BL3-Pack', 'Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6', 'Metal', 'Trainer', 'Supporter', 'Item', 'Stadium', 'EX-Pack', 'Legendary', 'Full', 'Event'];
var tourCardRarity = ['No Card', 'Common', 'Uncommon', 'Rare', 'Epic', 'Epic', 'Legendary', 'Legendary', 'Mythic'];
var cardRarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
//System Command: you should prolly never put anything in here
var cleanShop = [];
var cleanCard = [];

var rareCache = []; //Used to cache cards for tours
var cardCache = []; //Used to cache cards in packs
var userPacks = {}; //Used to store users unopened packs

function cachePacks() {
	for (var i = 0; i < packShop.length; i++) {
		cardCache.push(new Array());
		for (var key in cards) {
			if (cards.hasOwnProperty(key)) {
				var obj = cards[key];
				if (obj.hasOwnProperty('collection') && obj.collection.indexOf(packShop[i]) > -1) cardCache[i].push(key);
			}
		}
	}
	for (i = 0; i < packShop.length; i++) {
		cleanShop.push(toId(packShop[i]));
	}
}

function cacheRarity() {
	for (var i = 0; i < cardRarity.length; i++) {
		rareCache.push(new Array());
		for (var key in cards) {
			if (cards.hasOwnProperty(key)) {
				var obj = cards[key];
				if (obj.hasOwnProperty('rarity') && obj.rarity.indexOf(cardRarity[i]) > -1) rareCache[i].push(key);
			}
		}
	}
	for (i = 0; i < cardRarity.length; i++) {
		cleanCard.push(toId(cardRarity[i]));
	}
}

global.tourCard = function(tourSize, userid) {
	if (tourSize > 32) tourSize = 32;
	var tourRarity = tourCardRarity[Math.floor(tourSize / 4)];
	var cacheValue = rareCache[cleanCard.indexOf(toId(tourRarity))];
	var card = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
	if (tourRarity === 'No Card') return;
	addCard(userid, card);
	return [cards[card].rarity, cards[card].title, cards[card].name];
};

function addCard(name, card) {
	var newCard = {};
	newCard.id = uuid.v1();
	newCard.title = cards[card].title;
	newCard.card = cards[card].card;
	newCard.name = cards[card].name;
	newCard.rarity = cards[card].rarity;
	newCard.points = cards[card].points;

	var userid = toId(name);
	Db('cards').set(userid, Db('cards').get(userid, []).concat([newCard]));
	Db('points').set(userid, Db('points').get(userid, 0) + newCard.points);
}

function getShopDisplay (shop) {
	var display = "<table width='100%' border='1' style='border-collapse: collapse; color: #444; box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);' cellpadding='5'>" +
		"<tr><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Command</th><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Description</th><th class='card-th' style='background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9); box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset;'>Cost</th></tr>";
	var start = 0;
	while (start < shop.length) {
		display += "<tr>" +"<td class='card-td'><button name='send' value='/buypack " + shop[start][0] + "' style='border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;'><b>" + shop[start][0] + "</b></button></td>" +
			"<td class='card-td'>" + shop[start][1] + "</td>" +
			"<td class='card-td'>" + shop[start][2] + "</td>" +
			"</tr>";
		start++;
	}
	display += "</table><center>To buy a pack from the shop, use /buypack <em>pack</em>.</center>";
	return display;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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
		for (i = 0; i < userPacks[target].length; i++) {
			this.sendReply(toTitleCase(userPacks[i]));
		}
	},

	buypacks: 'buypack',
	buypack: function (target, room, user) {
		if (!target) return this.sendReply('/buypack - Buys a pack from the pack shop. Alias: /buypacks');
		var self = this;
		var packId = toId(target);
		var amount = Db('money').get(user.userid, 0);
		if (cleanShop.indexOf(packId) < 0) return self.sendReply('This is not a valid pack. Use /packshop to see all packs.');
		var shopIndex = cleanShop.indexOf(toId(target));
		if (packId !== 'xybase' && packId !== 'xyfuriousfists' && packId !== 'xyflashfire' && packId !== 'xyphantomforces' && packId !== 'xyroaringskies' && packId !== 'xyprimalclash') return self.sendReply('This pack is not currently in circulation.  Please use /packshop to see the current packs.');
		var cost = shop[shopIndex][2];
		if (cost > amount) return self.sendReply('You need ' + (cost - amount) + ' more bucks to buy this card.');
		var total = Db('money').set(user.userid, amount - cost).get(user.userid);
		var pack = toId(target);
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
		for (var i = 0; i < 3; i++) {
			var pack = toId(target);
			var cacheValue = cardCache[cleanShop.indexOf(toId(target))];
			var card = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
			addCard(user.userid, card);
			var cardName = cards[card].name;
			var packName = packShop[cleanShop.indexOf(toId(target))];
			this.sendReplyBox(user.name + ' got <font color="' + colors[cards[card].rarity] + '">' + cards[card].rarity + '</font>\
			<button name="send" value="/card ' + card  + '"><b>' + cardName + '</b></button> from a \
			<button name="send" value="/buypack ' + packName + '">' + packName + ' Pack</button>.');
		}
		var usrIndex = userPacks[user.userid].indexOf(pack);
		userPacks[user.userid].splice(usrIndex, 1);
	},

	givepacks: 'givepack',
	givepack: function (target, room, user) {
		if (!user.can('declare')) return this.sendReply('/givepack - Access denied.');
		if (!target) return this.sendReply('/givepack [user], [pack] - Give a user a pack. Alias: /givepacks');
		var parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply('/givepack [user], [pack] - Give a user a pack. Alias: /givepacks');
		var pack = toId(parts[1]);
		var userid = toId(this.targetUsername);
		if (cleanShop.indexOf(pack) < 0) return this.sendReply('This pack does not exist.');
		if (!this.targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
		if (!userPacks[userid]) userPacks[userid] = [];
		userPacks[userid].push(pack);
		this.sendReply(this.targetUsername + ' was given ' + pack + ' pack. This user now has ' + userPacks[userid].length + ' pack(s).');
		Users.get(this.targetUsername).connections[0].sendTo(room.id,
			'|raw|' + user.name + ' has given you ' + pack + ' pack. You have until the server restarts to open your pack. \
			Use <button name="send" value="/openpack ' + pack + '"><b>/openpack ' + pack + '</b></button> to open your pack.');
	},

	takepacks: 'takepack',
	takepack: function (target, room, user) {
		if (!user.can('takepack')) return this.sendReply('/takepack - Access denied.');
		if (!target) return this.sendReply('/takepack [user], [pack] - Take a pack from a user. Alias: /takepacks');
		var parts = target.split(',');
		this.splitTarget(parts[0]);
		if (!parts[1]) return this.sendReply('/takepack [user], [pack] - Take a pack from a user. Alias: /takepacks');
		var pack = toId(parts[1]);
		var packIndex = userPacks[userid].indexOf(pack);
		var userid = toId(this.targetUsername);
		if (packsKeys.indexOf(pack) < 0) return this.sendReply('This pack does not exist.');
		if (!this.targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
		if (!userPacks[userid]) userPacks[userid] = [];
		if (packIndex < 0) return this.sendReply('This user does not have this pack.');
		userPacks[userid].splice(packIndex, 1);
		this.sendReply(this.targetUsername + ' lost ' + pack + ' pack. This user now has ' + users[userid].length + ' pack(s).');
		Users.get(this.targetUsername).send('|raw|' + user.name + ' has taken ' + pack + ' pack from you. You now have ' +  users[userid].length + ' pack(s).');
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
			return '<button name="send" value="/card ' + card.title + '" style="border-radius: 12px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2) inset;" class="card-button"><img src="' + card.card + '" width="50" title="' + card.name +'"></button>';
		});

		const start = (page-1)*10;
		const end = page*10;
		const bottom = '<br><br>' + userid + ' has ' + points + ' points.<br><br><b>Showing cards: ' + start + ' through ' + end + ' of ' + cards.length + '</b>';
		const display = cardsMapping.slice(start, end);

		if (!display.length) return this.sendReplyBox("Too many pages.");

		this.sendReplyBox(display.join('') + bottom);
	},

	card: function(target, room, user) {
		if (!target) return this.sendReply('/card [name] - Shows information about a card.');
		if (!this.canBroadcast()) return;
		var cardName = toId(target);
		if (!cards.hasOwnProperty(cardName)) return this.sendReply(target + ': card not found.');
		var card = cards[cardName];
		var html = '<div class="card-div card-td" style="box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2);"><img src="' + card.card + '" height="220" title="' + card.name + '" align="right">' +
			'<span class="card-name" style="border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; background-image: -moz-linear-gradient(center top , #EBF3FC, #DCE9F9);  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.8) inset, 0px 0px 2px rgba(0, 0, 0, 0.2);">' + card.title + '</span>' +
			'<br /><br /><h1><font color="' + colors[card.rarity] + '">' + card.rarity + '</font></h1>' +
			'<br /><br /><font color="#AAA"><i>Points:</i></font> ' + card.points +
			'<br /><br /><font color="#AAA"><i>Found in Packs:</i></font>' + card.collection.join(', ') +
			'<br clear="all">';
		this.sendReply('|raw|' + html);
	},

	cardladder: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var display = '<center><u><b>Card Ladder</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Points</th></tr>';
		var keys = Object.keys(Db('points').object()).map(function (name) {
			return {name: name, points: Db('points').get(name)};
		});
		if (!keys.length) return this.sendReplyBox("Card ladder is empty.");
		keys = keys.sort(function (a, b) {
			if (b.points > a.points) return 1;
			return -1;
		});
		keys.slice(0, 10).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + user.points + "</td></tr>";
		});
		if (this.broadcasting && Number(target) > 10) target = null;
		if (!isNaN(target)) {
			if (Number(target) > 100) target = 100;
			keys.slice(10, target).forEach(function (user, index) {
				display += "<tr><td>" + (index + 11) + "</td><td>" + user.name + "</td><td>" + user.points + "</td></tr>";
			});
		}
		display += "</tbody></table>";
		this.sendReply("|raw|" + display);
	},

	psgo: 'cardshelp',
	origincg: 'cardshelp',
	cardshelp: function (target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReplyBox('\
			<center><b><u>Origin Trading Card Game:</u></b></center><br>\
			<b>/buypack</b> - Buys a pack from the pack shop.<br>\
			<b>/packshop</b> - Shows the shop for buying packs.<br>\
			<b>/openpack</b> - Opens a pack that has been purchased from the shop.<br>\
			<b>/showcase</b> - Shows a display of all cards that you have. Specify a page number to see more cards.<br>\
			<b>/card</b> - Shows data and information on any specifc card.<br>\
			<b>/cardladder</b> - Shows the leaderboard of the users with the most card points.<br>\
		');
	},
};
