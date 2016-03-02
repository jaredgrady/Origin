'use strict';
/********************
 * User Commands
 * This is where miscellaneous commands that any user can use go
********************/
const color = require('../config/color');
const def = require('../define');
const define = def.define;
const urbandefine = def.urbandefine;
const Pokedex = require("../data/pokedex.js").BattlePokedex;
const Float = require('float-ui');
let Float_PS = {};
let messages = [
	"has vanished into nothingness!",
	"used Explosion!",
	"fell into the void.",
	"went into a cave without a repel!",
	"has left the building.",
	"was forced to give StevoDuhHero's mom an oil massage!",
	"was hit by Magikarp's Revenge!",
	"ate a bomb!",
	"is blasting off again!",
	"(Quit: oh god how did this get here i am not good with computer)",
	"was unfortunate and didn't get a cool message.",
	"{{user}}'s mama accidently kicked {{user}} from the server!",
];

try {
	Float_PS = require('float-ps');
} catch (e) {
	console.error(e);
}

Float.extendElements(Float_PS);

function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}

function bold(text) {
	return '<b>' + text + '</b>';
}

let bubbleLetterMap = new Map([
	['a', '\u24D0'], ['b', '\u24D1'], ['c', '\u24D2'], ['d', '\u24D3'], ['e', '\u24D4'], ['f', '\u24D5'], ['g', '\u24D6'], ['h', '\u24D7'], ['i', '\u24D8'], ['j', '\u24D9'], ['k', '\u24DA'], ['l', '\u24DB'], ['m', '\u24DC'],
	['n', '\u24DD'], ['o', '\u24DE'], ['p', '\u24DF'], ['q', '\u24E0'], ['r', '\u24E1'], ['s', '\u24E2'], ['t', '\u24E3'], ['u', '\u24E4'], ['v', '\u24E5'], ['w', '\u24E6'], ['x', '\u24E7'], ['y', '\u24E8'], ['z', '\u24E9'],
	['A', '\u24B6'], ['B', '\u24B7'], ['C', '\u24B8'], ['D', '\u24B9'], ['E', '\u24BA'], ['F', '\u24BB'], ['G', '\u24BC'], ['H', '\u24BD'], ['I', '\u24BE'], ['J', '\u24BF'], ['K', '\u24C0'], ['L', '\u24C1'], ['M', '\u24C2'],
	['N', '\u24C3'], ['O', '\u24C4'], ['P', '\u24C5'], ['Q', '\u24C6'], ['R', '\u24C7'], ['S', '\u24C8'], ['T', '\u24C9'], ['U', '\u24CA'], ['V', '\u24CB'], ['W', '\u24CC'], ['X', '\u24CD'], ['Y', '\u24CE'], ['Z', '\u24CF'],
	['1', '\u2460'], ['2', '\u2461'], ['3', '\u2462'], ['4', '\u2463'], ['5', '\u2464'], ['6', '\u2465'], ['7', '\u2466'], ['8', '\u2467'], ['9', '\u2468'], ['0', '\u24EA'],
]);

let asciiMap = new Map([
	['\u24D0', 'a'], ['\u24D1', 'b'], ['\u24D2', 'c'], ['\u24D3', 'd'], ['\u24D4', 'e'], ['\u24D5', 'f'], ['\u24D6', 'g'], ['\u24D7', 'h'], ['\u24D8', 'i'], ['\u24D9', 'j'], ['\u24DA', 'k'], ['\u24DB', 'l'], ['\u24DC', 'm'],
	['\u24DD', 'n'], ['\u24DE', 'o'], ['\u24DF', 'p'], ['\u24E0', 'q'], ['\u24E1', 'r'], ['\u24E2', 's'], ['\u24E3', 't'], ['\u24E4', 'u'], ['\u24E5', 'v'], ['\u24E6', 'w'], ['\u24E7', 'x'], ['\u24E8', 'y'], ['\u24E9', 'z'],
	['\u24B6', 'A'], ['\u24B7', 'B'], ['\u24B8', 'C'], ['\u24B9', 'D'], ['\u24BA', 'E'], ['\u24BB', 'F'], ['\u24BC', 'G'], ['\u24BD', 'H'], ['\u24BE', 'I'], ['\u24BF', 'J'], ['\u24C0', 'K'], ['\u24C1', 'L'], ['\u24C2', 'M'],
	['\u24C3', 'N'], ['\u24C4', 'O'], ['\u24C5', 'P'], ['\u24C6', 'Q'], ['\u24C7', 'R'], ['\u24C8', 'S'], ['\u24C9', 'T'], ['\u24CA', 'U'], ['\u24CB', 'V'], ['\u24CC', 'W'], ['\u24CD', 'X'], ['\u24CE', 'Y'], ['\u24CF', 'Z'],
	['\u2460', '1'], ['\u2461', '2'], ['\u2462', '3'], ['\u2463', '4'], ['\u2464', '5'], ['\u2465', '6'], ['\u2466', '7'], ['\u2467', '8'], ['\u2468', '9'], ['\u24EA', '0'],
]);

function parseStatus(text, encoding) {
	if (encoding) {
		text = text.split('').map(function (char) {
			return bubbleLetterMap.get(char);
		}).join('');
	} else {
		text = text.split('').map(function (char) {
			return asciiMap.get(char);
		}).join('');
	}
	return text;
}

let roomIntro = function (i) {
	return '<div style="background: url(\'http://i.imgur.com/eTWlzCR.jpg?2\') center top; background-size: cover; width: 100%; text-align: center; border: 1px solid #11484F; border-bottom: none; border-top-right-radius: 8px; border-top-left-radius: 8px;"><div style="background: rgba(17, 72, 79, 0.6); box-shadow: inset 0px 1px 1px rgba(255, 255, 255, 0.8); padding: 10px 0px; border-top-right-radius: 8px; border-top-left-radius: 8px;"><img src="//i.imgur.com/knvNVoQ.png?1" width="250" height="75"></div></div><div style="text-align: center; border: 1px solid #803C6F; border-right-color: #CD9FC4; border-left-color: #CD9FC4; background: #CD9FC4; background: -moz-linear-gradient(#CD9FC4, #A57D9D); background: -webkit-linear-gradient(#CD9FC4, #A57D9D); background: -o-linear-gradient(#CD9FC4, #A57D9D); background: linear-gradient(#CD9FC4, #A57D9D); box-shadow: 1px 0px 0px #803C6F, -1px 0px 0px #803C6F, inset 0px -1px 1px rgba(0, 0, 0, 0.4), inset 0px 1px 1px rgba(255, 255, 255, 0.8); width: 100%; height: 35px;"><a href="https://docs.google.com/document/d/1B-g2ESwArLDoXcjH516awPnqlxjYPyOxzgut4-Zw7JE/edit?pref=2&pli=1"><button class="intro-tabbarbtn" style="box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2), -1px 0px 2px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5);">VIP Info</button></a><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=originvip%40gmail%2ecom&lc=US&item_name=Origin%20Donations&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted"><button class="intro-tabbarbtn important" style="box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2), -1px 0px 2px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5);">Donate</button></a><a href="http://originps.boards.net/"><button class="intro-tabbarbtn important" style="box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2), -1px 0px 2px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.5);">Forums</button></a><a href="http://originps.boards.net/thread/9/rules"><button class="intro-tabbarbtn" style="box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.2), -1px 0px 2px rgba(0, 0, 0, 0.2), inset 0px 1px 1px rgba(255, 255, 255, 0.5);">Rules</button></a></div><div class="important" style="text-align: center; box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.4); background: #FFE0A7; border: 1px solid #803C6F; border-top: none; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; padding: 7px 0px; width: 100%; color: #58294C;"><marquee><u>Announcements</u>: ' + i + '</marquee></div>';
};

exports.commands = {
	stafflist: 'authority',
	auth: 'authority',
	authlist: 'authority',
	authority: function (target, room, user, connection) {
		let rankLists = {};
		let ranks = Object.keys(Config.groups);
		for (let u in Users.usergroups) {
			let rank = Users.usergroups[u].charAt(0);
			// In case the usergroups.csv file is not proper, we check for the server ranks.
			if (ranks.indexOf(rank) > -1) {
				let name = Users.usergroups[u].substr(1);
				if (!rankLists[rank]) rankLists[rank] = [];
				if (name) rankLists[rank].push(((Users.getExact(name) && Users.getExact(name).connected) ? '**' + name + '**' : name));
			}
		}

		let buffer = [];
		Object.keys(rankLists).sort(function (a, b) {
			return (Config.groups[b] || {rank: 0}).rank - (Config.groups[a] || {rank: 0}).rank;
		}).forEach(function (r) {
			buffer.push((Config.groups[r] ? r + Config.groups[r].name + "s (" + rankLists[r].length + ")" : r) + ":\n" + rankLists[r].sort().join(", "));
		});

		if (!buffer.length) buffer = "This server has no auth.";
		connection.popup(buffer.join("\n\n"));
	},

	//Lots of these
	afk: 'away',
	busy: 'away',
	work: 'away',
	eating: 'away',
	working: 'away',
	sleep: 'away',
	sleeping: 'away',
	gaming: 'away',
	fap: 'away',
	fapping: 'away',
	nerd: 'away',
	nerding: 'away',
	mimis: 'away',
	away: function (target, room, user, connection, cmd) {
		if (!user.isAway && user.name.length > 19) return this.sendReply("Your username is too long for any kind of use of this command.");

		target = target ? target.replace(/[^a-zA-Z0-9]/g, '') : 'AWAY';
		if (cmd !== 'away') target = cmd;
		let newName = user.name;
		let status = parseStatus(target, true);
		let statusLen = status.length;
		if (statusLen > 14) return this.sendReply("Your away status should be short and to-the-point, not a dissertation on why you are away.");

		if (user.isAway) {
			let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
			if (statusIdx > -1) newName = newName.substr(0, statusIdx);
			if (user.name.substr(-statusLen) === status) return this.sendReply("Your away status is already set to \"" + target + "\".");
		}

		newName += ' - ' + status;
		if (newName.length > 18) return this.sendReply("\"" + target + "\" is too long to use as your away status.");

		// forcerename any possible impersonators
		let targetUser = Users.getExact(user.userid + target);
		if (targetUser && targetUser !== user && targetUser.name === user.name + ' - ' + target) {
			targetUser.resetName();
			targetUser.send("|nametaken||Your name conflicts with " + user.name + (user.name.substr(-1) === "s" ? "'" : "'s") + " new away status.");
		}

		if (user.can('lock', null, room)) {
			this.add("|raw|-- <font color='" + color(user.userid) + "'><strong>" + Tools.escapeHTML(user.name) + "</strong></font> is now " + target.toLowerCase() + ".");
			this.parse("/hide");
		}
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = true;
	},
	awayhelp: ['/away [message] - Sets a users away status.'],

	back: function (target, room, user) {
		if (!user.isAway) return this.sendReply("You are not set as away.");
		user.isAway = false;

		let newName = user.name;
		let statusIdx = newName.search(/\s\-\s[\u24B6-\u24E9\u2460-\u2468\u24EA]+$/);
		if (statusIdx < 0) {
			user.isAway = false;
			if (user.can('lock', null, room)) this.add("|raw|-- <font color='" + color(user.userid) + "'><strong>" + Tools.escapeHTML(user.name) + "</strong></font> is no longer away.");
			return false;
		}

		let status = parseStatus(newName.substr(statusIdx + 3), false);
		newName = newName.substr(0, statusIdx);
		user.forceRename(newName, user.registered);
		user.updateIdentity();
		user.isAway = false;
		if (user.can('lock', null, room)) {
			this.add("|raw|-- <font color='" + color(user.userid) + "'><strong>" + Tools.escapeHTML(newName) + "</strong></font> is no longer " + status.toLowerCase() + ".");
			this.parse("/show");
		}
	},
	backhelp: ['/back - Sets a users away status back to normal.'],

	chatcolour: 'chatcolor',
	chatcolor: function (target, room, user) {
		let targets = target.split(',');
		if (targets.length < 2) return this.parse('/help chatcolor');
		if (!this.can('vip') || !this.canBroadcast()) return;
		if (!this.canTalk()) return this.errorReply("You may not use this command while unable to speak.");
		this.add('|raw|' +  bold(font(color(toId(user)), user.name) + ': <font color="' + targets[0].toLowerCase().replace(/[^#a-z0-9]+/g, '') + '">' + Tools.escapeHTML(targets.slice(1).join(",")) + '</font>'));
	},
	chatcolorhelp: ['/chatcolor OR /chatcolour [colour], [message] - Outputs a message in a custom colour. Requires VIP.'],

	def: 'define',
	define: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) return this.parse('/help define');
		if (target.length > 50) return this.errorReply("Phrase cannot be longer than 50 characters.");
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");

		const targetId = toId(target);
		const self = this;

		if (Db('defcache').get(targetId)) {
			return this.sendReplyBox("<b>" + Tools.escapeHTML(target) + ":</b> " + Db('defcache').get(targetId));
		}

		define(targetId).fork(
			function error(err) {
				console.error(err);
			},
			function success(maybe) {
				if (!maybe.value) {
					self.sendReplyBox("No results for <b>\"" + Tools.escapeHTML(target) + "\"</b>.");
					room.update();
				}
				maybe.map(function (definition) {
					const sanitizeDef = definition.slice(0, 400).replace(/\r\n/g, '<br />').replace(/\n/g, ' ');
					const trimDef = definition.length > 400 ? sanitizeDef + '...' : sanitizeDef;
					const output = "<b>" + Tools.escapeHTML(target) + ":</b> " + trimDef;
					Db('defcache').set(targetId, trimDef);
					self.sendReplyBox(output);
					room.update();
				});
			}
		);
	},
	definehelp: ["/define [word] - Shows the definition of a word."],

	fdeclare: 'floatdeclare',
	floatdeclare: function (target, room, user) {
		this.parse('/declare ' + Float.renderElement(target));
	},

	fgdeclare: 'floatgdeclare',
	floatgdeclare: function (target, room, user) {
		this.parse('/gdeclare ' + Float.renderElement(target));
	},

	froomintro: 'floatroomintro',
	floatroomintro: function (target, room, user) {
		this.parse('/roomintro ' + Float.renderElement(target));
	},

	fpmall: 'floatpmall',
	floatpmall: function (target, room, user) {
		this.parse('/pmall /html ' + Float.renderElement(target));
	},

	fhtmlbox: 'floathtmlbox',
	floathtmlbox: function (target, room, user) {
		if (!this.canBroadcast()) return;
		room.update();
		this.parse('/htmlbox ' + Float.renderElement(target));
	},

	u: 'ud',
	urbandefine: 'ud',
	ud: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) return this.parse('/help ud');
		if (target.length > 50) return this.errorReply("Phrase cannot be longer than 50 characters.");
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");

		const targetId = toId(target);
		const self = this;

		if (Db('udcache').get(targetId)) {
			return this.sendReplyBox("<b>" + Tools.escapeHTML(target) + ":</b> " + Db('udcache').get(targetId));
		}

		urbandefine(targetId).fork(
			function error(err) {
				console.error(err);
			},
			function success(maybe) {
				if (!maybe.value) {
					self.sendReplyBox("No results for <b>\"" + Tools.escapeHTML(target) + "\"</b>.");
					room.update();
				}
				maybe.map(function (definition) {
					const sanitizeDef = definition.slice(0, 400).replace(/\r\n/g, '<br />').replace(/\n/g, ' ');
					const trimDef = definition.length > 400 ? sanitizeDef + '...' : sanitizeDef;
					const output = "<b>" + Tools.escapeHTML(target) + ":</b> " + trimDef;
					Db('udcache').set(targetId, trimDef);
					self.sendReplyBox(output);
					room.update();
				});
			}
		);
	},
	udhelp: ["/urbandefine [phrase] - Shows the urban definition of the phrase. If you don't put in a phrase, it will show you a random phrase from urbandefine."],

	helixfossil: 'm8b',
	helix: 'm8b',
	magic8ball: 'm8b',
	m8b: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let random = Math.floor(20 * Math.random()) + 1;
		let results = '';
		if (random === 1) {
			results = 'Signs point to yes.';
		}
		if (random === 2) {
			results = 'Yes.';
		}
		if (random === 3) {
			results = 'Reply hazy, try again.';
		}
		if (random === 4) {
			results = 'Without a doubt.';
		}
		if (random === 5) {
			results = 'My sources say no.';
		}
		if (random === 6) {
			results = 'As I see it, yes.';
		}
		if (random === 7) {
			results = 'You may rely on it.';
		}
		if (random === 8) {
			results = 'Concentrate and ask again.';
		}
		if (random === 9) {
			results = 'Outlook not so good.';
		}
		if (random === 10) {
			results = 'It is decidedly so.';
		}
		if (random === 11) {
			results = 'Better not tell you now.';
		}
		if (random === 12) {
			results = 'Very doubtful.';
		}
		if (random === 13) {
			results = 'Yes - definitely.';
		}
		if (random === 14) {
			results = 'It is certain.';
		}
		if (random === 15) {
			results = 'Cannot predict now.';
		}
		if (random === 16) {
			results = 'Most likely.';
		}
		if (random === 17) {
			results = 'Ask again later.';
		}
		if (random === 18) {
			results = 'My reply is no.';
		}
		if (random === 19) {
			results = 'Outlook good.';
		}
		if (random === 20) {
			results = 'Don\'t count on it.';
		}
		return this.sendReplyBox('' + results + '');
	},

	d: 'poof',
	cpoof: 'poof',
	poof: function (target, room, user) {
		if (Config.poofOff) return this.sendReply("Poof is currently disabled.");
		if (target && !this.can('broadcast')) return false;
		if (room.id !== 'lobby') return false;
		let message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf('{{user}}') < 0) message = '{{user}} ' + message;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		let colour = '#' + [1, 1, 1].map(function () {
			let part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? '0' : '') + part.toString(16);
		}).join('');

		room.addRaw("<strong><font color=\"" + colour + "\">~~ " + Tools.escapeHTML(message) + " ~~</font></strong>");
		user.disconnectAll();
	},
	poofhelp: ["/poof - Disconnects the user and leaves a message in the room."],

	randp: function (target, room, user) {
		if (!this.canBroadcast()) return;
		let shinyPoke = "";
		let x;
		if (/shiny/i.test(target)) shinyPoke = "-shiny";
		if (/kanto/i.test(target) || /gen 1/i.test(target)) {
			x = Math.floor(Math.random() * (174 - 1));
		} else if (/johto/i.test(target) || /gen 2/i.test(target)) {
			x = Math.floor(Math.random() * (281 - 173)) + 172;
		} else if (/hoenn/i.test(target) || /gen 3/i.test(target)) {
			x = Math.floor(Math.random() * (444 - 280)) + 279;
		} else if (/sinnoh/i.test(target) || /gen 4/i.test(target)) {
			x = Math.floor(Math.random() * (584 - 443)) + 442;
		} else if (/kalos/i.test(target) || /gen 5/i.test(target)) {
			x = Math.floor(Math.random() * (755 - 583)) + 582;
		} else if (/unova/i.test(target) || /gen 6/i.test(target)) {
			x = Math.floor(Math.random() * (834 - 752)) + 751;
		}
		x = x || Math.floor(Math.random() * (856 - 1));
		let tarPoke = Object.keys(Pokedex)[x];
		let pokeData = Pokedex[tarPoke];
		let pokeId = pokeData.species.toLowerCase();
		pokeId = pokeId.replace(/^basculinbluestriped$/i, "basculin-bluestriped").replace(/^pichuspikyeared$/i, "pichu-spikyeared").replace(/^floetteeternalflower$/i, "floette-eternalflower");
		if (pokeId === "pikachu-cosplay") pokeId = ["pikachu-belle", "pikachu-phd", "pikachu-libre", "pikachu-popstar", "pikachu-rockstar"][~~(Math.random() * 6)];
		let spriteLocation = "http://play.pokemonshowdown.com/sprites/bw" + shinyPoke + "/" + pokeId + ".png";
		let missingnoSprites = ["http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png", "http://cdn.bulbagarden.net/upload/0/03/Missingno_Y.png", "http://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png", "http://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png", "http://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png"];
		if (pokeId === "missingno") spriteLocation = missingnoSprites[~~(Math.random() * 5)];
		function getTypeFormatting(types) {
			let text = [];
			for (let i = 0; i < types.length; i++) {
				text.push("<img src=\"http://play.pokemonshowdown.com/sprites/types/" + types[i] + ".png\" width=\"32\" height=\"14\">");
			}
			return text.join(" / ");
		}
		this.sendReplyBox("<table><tr><td><img src=\"" + spriteLocation + "\" height=\"96\" width=\"96\"></td><td><b>Name: </b>" + pokeData.species + "<br/><b>Type(s): </b>" + getTypeFormatting(pokeData.types) + "<br/><b>" + (Object.values(pokeData.abilities).length > 1 ? "Abilities" : "Ability") + ": </b>" + Object.values(pokeData.abilities).join(" / ") + "<br/><b>Stats: </b>" + Object.values(pokeData.baseStats).join(" / ") + "<br/><b>Colour: </b><font color=\"" + pokeData.color + "\">" + pokeData.color + "</font><br/><b>Egg Group(s): </b>" + pokeData.eggGroups.join(", ") + "</td></tr></table>");
	},

	sb: 'showdownboilerplate',
	showdownboilerplate: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply("|raw|This server uses <a href='https://github.com/CreaturePhil/Showdown-Boilerplate'>Showdown-Boilerplate</a>.");
	},
	showdownboilerplatehelp: ["/showdownboilerplate - Links to the Showdown-Boilerplate repository on Github."],

	tell: function (target, room, user, connection) {
		if (!target) return this.parse('/help tell');
		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!target) {
			this.sendReply("You forgot the comma.");
			return this.parse('/help tell');
		}

		if (targetUser && targetUser.connected) {
			return this.parse('/pm ' + this.targetUsername + ', ' + target);
		}

		if (user.locked) return this.popupReply("You may not send offline messages when locked.");
		if (target.length > 255) return this.popupReply("Your message is too long to be sent as an offline message (>255 characters).");

		if (Config.tellrank === 'autoconfirmed' && !user.autoconfirmed) {
			return this.popupReply("You must be autoconfirmed to send an offline message.");
		} else if (!Config.tellrank || Config.groupsranking.indexOf(user.group) < Config.groupsranking.indexOf(Config.tellrank)) {
			return this.popupReply("You cannot send an offline message because offline messaging is " +
				(!Config.tellrank ? "disabled" : "only available to users of rank " + Config.tellrank + " and above") + ".");
		}

		let userid = toId(this.targetUsername);
		if (userid.length > 18) return this.popupReply("\"" + this.targetUsername + "\" is not a legal username.");

		let sendSuccess = Tells.addTell(user, userid, target);
		if (!sendSuccess) {
			if (sendSuccess === false) {
				return this.popupReply("User " + this.targetUsername + " has too many offline messages queued.");
			} else {
				return this.popupReply("You have too many outgoing offline messages queued. Please wait until some have been received or have expired.");
			}
		}
		return connection.send('|pm|' + user.getIdentity() + '|' +
			(targetUser ? targetUser.getIdentity() : ' ' + this.targetUsername) +
			"|/text This user is currently offline. Your message will be delivered when they are next online.");
	},
	tellhelp: ["/tell [username], [message] - Send a message to an offline user that will be received when they log in."],

	roomhelp: function (target, room, user) {
		if (room.id === 'lobby' || room.battle) return this.sendReply("This command is too spammy for lobby/battles.");
		if (!this.canBroadcast()) return;
		this.sendReplyBox(
			"Room drivers (%) can use:<br />" +
			"- /warn OR /k <em>username</em>: warn a user and show the Pokemon Showdown rules<br />" +
			"- /mute OR /m <em>username</em>: 7 minute mute<br />" +
			"- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
			"- /unmute <em>username</em>: unmute<br />" +
			"- /announce OR /wall <em>message</em>: make an announcement<br />" +
			"- /modlog <em>username</em>: search the moderator log of the room<br />" +
			"- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
			"<br />" +
			"Room moderators (@) can also use:<br />" +
			"- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
			"- /roomunban <em>username</em>: unbans user from the room<br />" +
			"- /roomvoice <em>username</em>: appoint a room voice<br />" +
			"- /roomdevoice <em>username</em>: remove a room voice<br />" +
			"- /modchat <em>[off/autoconfirmed/+]</em>: set modchat level<br />" +
			"<br />" +
			"Room owners (#) can also use:<br />" +
			"- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
			"- /rules <em>rules link</em>: set the room rules link seen when using /rules<br />" +
			"- /roommod, /roomdriver <em>username</em>: appoint a room moderator/driver<br />" +
            "- /roomdemod, /roomdedriver <em>username</em>: remove a room moderator/driver<br />" +
            "- /modchat <em>[%/@/#]</em>: set modchat level<br />" +
            "- /declare <em>message</em>: make a large blue declaration to the room<br />" +
            "- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
            "- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
            "<br />" +
            "Room founders (#) can also use<br />" +
            "- /roomowner <em>username</em> - Appoints username as a room owner<br />" +
            "<br />" +
            "More detailed help can be found in the <a href=\"https://www.smogon.com/sim/roomauth_guide\">roomauth guide</a><br />" +
            "</div>"
		);
	},

	cmds: 'serverhelp',
	originhelp: 'serverhelp',
	serverhelp: function (target, room, user, connection) {
		if (!this.canBroadcast()) return;
		if (user.isStaff) {
			connection.sendTo(room.id, '|raw|<div class="infobox"><center><b><u>List of <i>staff</i> commands:</u></b></center><br /><b>/clearall</b> - Clear all messages in the room.<br /><b>/endpoll</b> - End the poll in the room.<br /><b>/givemoney</b> <i>name</i>, <i>amount</i> - Give a user a certain amount of money.<br /><b>/hide</b> - Hide your staff symbol.<br /><b>/pmall</b> <i>message</i> - Private message all users in the server.<br /><b>/pmstaff</b> <i>message</i> - Private message all staff.<br /><b>/poll</b> <i>question</i>, <i>option 1</i>, <i>option 2</i>... - Create a poll where users can vote on an option.<br /><b>/reload</b> - Reload commands.<br /><b>/reloadfile</b> <i>file directory</i> - Reload a certain file.<br /><b>/resetmoney</b> <i>name</i> - Reset the user\'s money to 0.<br /><b>/rmall</b> <i>message</i> - Private message all users in the room.<br /><b>/show</b> - Show your staff symbol.<br /><b>/strawpoll</b> <i>question</i>, <i>option 1</i>, <i>option 2</i>... - Create a strawpoll, declares the link to all rooms and pm all users in the server.<br /><b>/toggleemoticons</b> - Toggle emoticons on or off.<br /><b>/takemoney</b> <i>user</i>, <i>amount</i> - Take a certain amount of money from a user.<br /><b>/trainercard</b> <i>help</i> - Makes adding trainer cards EZ.<br /></div>');
		}
		if (!target || target === '1') {
			return this.sendReplyBox(
				"<center><b><u>List of commands (1/3):</u></b></center><br />" +
				"<b>/away</b> - Set yourself away.<br />" +
				"<b>/back</b> - Set yourself back from away.<br />" +
				"<b>/buy</b> <i>command</i> - Buys an item from the shop.<br />" +
				"<b>/customsymbol</b> <i>symbol</i> - Get a custom symbol.<br />" +
				"<b>/define</b> <i>word</i> - Shows the definition of a word.<br />" +
				"<b>/emotes</b> - Get a list of emoticons.<br />" +
				"<br />Use /cmds <i>number (1-3)</i> to see more commands."
			);
		}
		if (target === '2') {
			return this.sendReplyBox(
				"<center><b><u>List of commands (2/3):</u></b></center><br />" +
				"<b>/hangman</b> help - Help on hangman specific commands.<br />" +
				"<b>/poof</b> - Disconnects the user and leaves a message in the room.<br />" +
				"<b>/profile</b> - Shows information regarding user\'s name, group, money, and when they were last seen.<br />" +
				"<b>/regdate</b> <i>user</i> - Gets registration date of the user.<br />" +
				"<br />Use /cmds <i>number (1-3)</i> to see more commands."
			);
		}
		if (target === '3') {
			return this.sendReplyBox(
				"<center><b><u>List of commands (3/3):</u></b></center><br />" +
				"<b>/resetsymbol</b> - Reset custom symbol if you have one.<br />" +
				"<b>/richestusers</b> - Show the richest users.<br />" +
				"<b>/seen</b> <i>username</i> - Shows when the user last connected on the server.<br />" +
				"<b>/sell</b> <i>id</i> - Sells a card in the marketplace. Hover over your card to get the id.<br />" +
				"<b>/shop</b> - Displays the server\'s main shop.<br />" +
				"<b>/stafflist</b> - Shows the staff.<br />" +
				"<b>/tell</b> <i>username</i>, <i>message</i> - Send a message to an offline user that will be received when they log in.<br />" +
				"<b>/transfer</b> <i>user</i>, <i>amount</i> - Transfer a certain amount of money to a user.<br />" +
				"<b>/urbandefine</b> <i>word</i> - Shows the urban definition of the word.<br />" +
				"<b>/wallet</b> <i>user</i> - Displays how much money a user has. Parameter is optional.<br />" +
				"<br />Use /cmds <i>number (1-3)</i> to see more commands."
			);
		}
	},

	clobbyannounce: 'changeannounce',
	cannounce: 'changeannounce',
	changeannounce: function (target, room, user) {
		if (room.id !== "lobby") return false;
		if (!target) return false;
		if (!this.can('declare', null, room)) return false;

		this.parse("/roomintro " + roomIntro(target));
	},
};
