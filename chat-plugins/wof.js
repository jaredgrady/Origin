'use strict';
const color = require('../config/color');
let enable = true;

const spins = {
	'golem': 0,
	'primeape': 0,
	'marowak': 0,
	'electrode': 0,
	'seaking': 0,
	'moltres': 0,
	'rattata': 0,
	'zubat': 0,
	'dratini': 0,
	'haunter': 0,
	'poliwhirl': 0,
	'victreebel': 0,
	'flareon': 0,
	'onix': 0,
	'rhydon': 0,
	'pikachu': 1,
	'mew': 1,
	'bulbasaur': 2,
	'charmander': 3,
	'magikarp': 3,
	'slowbro': 10,
	'squirtle': 30,
};

const wheelTrozei = {
	'golem': 'http://cdn.bulbagarden.net/upload/1/13/Spr_3f_076.png',
	'primeape': 'http://img.pokemondb.net/sprites/yellow/normal/primeape-color.png',
	'marowak': 'http://pldh.net/media/pokemon/gen3/frlg/105.png',
	'electrode': 'http://pldh.net/media/pokemon/gen3/emerald/101.png',
	'seaking': 'http://cdn.bulbagarden.net/upload/3/3c/Spr_3r_119.png',
	'moltres': 'http://img.pokemondb.net/sprites/yellow/normal/moltres-color.png',
	'rattata': 'http://img.pokemondb.net/sprites/silver/normal/rattata.png',
	'zubat': 'http://pldh.net/media/pokemon/gen3/frlg/041.png',
	'dratini': 'http://pldh.net/media/pokemon/gen3/frlg/147.png',
	'haunter': 'http://cdn.bulbagarden.net/upload/b/bd/Spr_1y_093.png',
	'poliwhirl': 'http://pldh.net/media/pokemon/gen2/silver/061.png',
	'victreebel': 'http://orig08.deviantart.net/1cee/f/2010/297/6/f/071___victreebel_by_sprite3g-d31ew0z.png',
	'flareon': 'http://pldh.net/media/pokemon/gen3/frlg/136.png',
	'onix': 'http://img.pokemondb.net/sprites/emerald/normal/onix.png',
	'rhydon': 'http://www.poke-amph.com/frlg/sprites/large/112.png',
	'pikachu': 'http://pldh.net/media/pokemon/gen3/frlg/025.png',
	'mew': 'http://img.pokemondb.net/sprites/emerald/normal/mew.png',
	'bulbasaur': 'http://pldh.net/media/pokemon/gen3/rusa/001.png',
	'charmander': 'http://img.pokemondb.net/sprites/emerald/normal/charmander.png',
	'magikarp': 'http://img.pokemondb.net/sprites/emerald/normal/magikarp.png',
	'slowbro': 'http://www.serebii.net/Shiny/RuSa/256.gif',
	'squirtle': 'http://pldh.net/media/pokemon/gen3/frlg/007.png',
};

const availableSpins = Object.keys(spins);

function spin() {
	return availableSpins[Math.floor(Math.random() * availableSpins.length)];
}

function rng() {
	return Math.floor(Math.random() * 22);
}

function display(result, user, wheel) {
	let display = '<div style="background-image:&quot;http://audition.playpark.net/images/uploads/static/WOF_PromoBanner-WOF.png&quot;); background-size: 100% 100%" border="0" width="100%"><font size = 3, color = "white"><center><b>You have started a a game of...</font><br />' +
	'<br />' +
	'<center><marquee><img style="padding: 3px; border: 1px inset gold; border-radius: 5px; box-shadow: inset 1px 1px 5px white;" src="' + wheelTrozei[wheel] + '"></center></marquee>' +
	'<font style="color: black;"><br /></div>';
	if (!result) {
		display += 'Too bad, you lost <b><font color="' + color(user) + '">' + user + '</font></b>. Better luck next time!</font>';
	}
	if (result) {
		display += '<div style="padding: 5px; width: 520px; border: 7px solid #FF99FF; background: #FFCCFF; color: #000000; border-radius: 3px; margin: 3px"><center><b><font color="' + color(user) + '">' + user + '</font></b> you have won ' +
		spins[wheel] + ' bucks!!</font></center></div>';
	}
	return display + '</div>';
}

exports.commands = {
	wheel: {
		start: 'spin',
		spin: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply("Wheel of Fortune can only be played in the Casino.");
			if (!this.canTalk()) return this.errorReply("/wheel spin - Access denied.");
			if (!enable) return this.errorReply("Wheel of fortune is temporarily disabled.");
			let amount = Db('money').get(user.userid, 0);
			if (amount < 3) return this.errorReply('You don\'t have enough bucks to play this game. You need ' + (3 - amount) + currencyName(amount) + ' more.');

			const result = spin();
			const chancePercentage = rng();
			const chancesGenerated = 22 + availableSpins.indexOf(result) * 1;

			if (chancePercentage <= chancesGenerated) {
				Db('money').set(user.userid, (Db('money').get(user.userid) + spins[result]) - 3);
				return this.sendReplyBox(display(true, user.name, result));
			}
			return this.sendReplyBox(display(false, user.name, spin()));
		},
		toggle: function (target, room, user) {
			if (!this.can('declare')) return;
			if (enable) {
				enable = false;
				this.sendReply("Wheel of Fortune has been disabled.");
			} else {
				enable = true;
				this.sendReply("Wheel of Fortune has been enabled.");
			}
		},
		'': 'help',
		help: function (target, room, user) {
			if (!this.runBroadcast()) return;
			return this.parse('/help wheel');
		},
	},
	wheelhelp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div class="infobox" style="background: rgba(190, 190, 190, 0.4); border-radius: 2px;"><div style="background: url(\'http://i.imgur.com/1zANlWq.gif\') left center no-repeat;"><div style="background: url(\'http://i.imgur.com/1zANlWq.gif\') right center no-repeat;"><center><h2 style="color: #444;">Wheel of Fortune<br><font size="2">Prizes<br>Pikachu and Mew = 1 buck<br>Bulbasaur = 2 bucks | Charmander and Magikarp = 3 bucks<br>Slowbro = 10 bucks<br></font><font size="4">Squirtle wins the jackpot of 30 bucks!</font></h2></center><center><button name="send" value="/wheel spin" style="border: 1px solid #dcdcdc; -moz-box-shadow:inset 0px 1px 0px 0px #fff; -webkit-box-shadow:inset 0px 1px 0px 0px #fff; box-shadow:inset 0px 1px 0px 0px #fff; background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f9f9f9), color-stop(1, #e9e9e9)); background:-moz-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-webkit-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-o-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:-ms-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%); background:linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%); filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#f9f9f9", endColorstr="#e9e9e9",GradientType=0); background-color:#f9f9f9; -moz-border-radius:6px; -webkit-border-radius:6px; border-radius:6px; display:inline-block; cursor:pointer; color:#666; font-family:Arial; font-size:15px; font-weight:bold; padding:6px 24px; text-decoration:none; text-shadow:0px 1px 0px #fff;">Click to Spin.</button></center><br></div></div></div>');
	},
};
