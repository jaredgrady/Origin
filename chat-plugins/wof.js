

'use strict';

const color = require('../config/color');

const spins = {
	'golem': 0,
	'onix': 0,
	'rhydon': 1,
	'pikachu': 1,
	'mew': 2,
	'bulbasaur': 3,
	'charmander': 5,
	'slowbro': 6,
	'squirtle': 10,
};

const wheelTrozei = {

	'golem': 'http://cdn.bulbagarden.net/upload/1/13/Spr_3f_076.png',
	'onix': 'http://img.pokemondb.net/sprites/emerald/normal/onix.png',
	'rhydon': 'http://www.poke-amph.com/frlg/sprites/large/112.png',
	'pikachu': 'http://pldh.net/media/pokemon/gen3/frlg/025.png',
	'mew': 'http://img.pokemondb.net/sprites/emerald/normal/mew.png',
	'bulbasaur': 'http://pldh.net/media/pokemon/gen3/rusa/001.png',
	'charmander': 'http://img.pokemondb.net/sprites/emerald/normal/charmander.png',
	'slowbro': 'http://www.serebii.net/Shiny/RuSa/256.gif',
	'squirtle': 'http://pldh.net/media/pokemon/gen3/frlg/007.png',
};

const availableSpins = Object.keys(spins);

function spin() {
	return availableSpins[Math.floor(Math.random() * availableSpins.length)];
}

function rng() {
	return Math.floor(Math.random() * 9);
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
		 'spin': function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Wheel of Fortune can only be played in the "Casino".');
			if (!this.canTalk()) return this.errorReply('/wheel spin - Access Denied.');

			const amount = Db('money').get(user.userid, 0);
			if (amount < 3) return this.errorReply('You don\'t have enough bucks to play this game. You need ' + (3 - amount) + currencyName(amount) + ' more.');

			const result = spin();
			const chancePercentage = rng();
			const chancesGenerated = 9 + availableSpins.indexOf(result) * 1;

			if (chancePercentage <= chancesGenerated) {
				Db('money').set(user.userid, (amount + spins[result]));
				return this.sendReplyBox(display(true, user.name, result));
			}
			Db('money').set(user.userid, (amount - 3));
			return this.sendReplyBox(display(false, user.name, spin()));
		},
		 '': function (target, room, user) {
			if (!this.canBroadcast()) return;
			return this.sendReplyBox('<div style="background-image:&quot;http://vignette1.wikia.nocookie.net/gameshows/images/6/61/Wheel_of_Fortune_Puzzle_Board_6.png/revision/latest?cb=20130127193907&quot;); background-size: 100% 100%" border="0" width="100%"><center><font size = 5, color = "purple"><center><b>Wheel of Fortune! </font></center><br>' +
	'<center><font size = 2, color = "white"><center><b>You spin the wheel and you will receive the amount of<br> bucks that Pokemon is worth.</b></font></center> <br>' +
    '<center><font size = 2, color = "white"><i>Here are the spin Prizes!</i></center><br>' +
    '<center><font size = 2, color = "white">Golem:  0 bucks<span style="display:inline-block; width: 20px,;"></span>Onix:  0 bucks<span style="display:inline-block; width: 20px,;"></span>Rhydon:  1 bucks</center><br>' +
    '<center><font size = 2, color = "white">Pikachu: 1 bucks<span style="display:inline-block; width: 20px,;"></span>Mew: 2 bucks<span style="display:inline-block; width: 20px,;"></span>Bulbasaur: 3 bucks</center><br>' +
    '<center><font size = 2, color = "white">Charmander: 5 bucks<span style="display:inline-block; width: 20px,;"></span>Slowbro: 6 bucks</center><br>' +
    '<center><font size = 2, color = "white"><b><i>Squirtle: 10 bucks</i></b></center></font><br>' +
    '<center><font size = 4, color = "white"><b>Spin the <button name = "send", value = "/wheel spin"><font color = "red"><b>WHEEL!</b></font></button> 3 bucks per a spin!</b></font></center></div>');
		},

		wofhelp:['|html| <div style="background-image:&quot;http://vignette1.wikia.nocookie.net/gameshows/images/6/61/Wheel_of_Fortune_Puzzle_Board_6.png/revision/latest?cb=20130127193907&quot;); background-size: 100% 100%" border="0" width="100%"><center><font size = 5, color = "purple"><center><b>Wheel of Fortune! </font></center><br>' +
    '<center><font size = 2, color = "white"><center><b>You spin the wheel and you will receive the amount of<br> bucks that Pokemon is worth.</b></font></center> <br>' +
    '<center><font size = 2, color = "white"><i>Here are the spin Prizes!</i></center><br>' +
    '<center><font size = 2, color = "white">Golem:  0 bucks<span style="display:inline-block; width: 20px,;"></span>Onix:  0 bucks<span style="display:inline-block; width: 20px,;"></span>Rhydon:  1 bucks</center><br>' +
    '<center><font size = 2, color = "white">Pikachu: 1 bucks<span style="display:inline-block; width: 20px,;"></span>Mew: 2 bucks<span style="display:inline-block; width: 20px,;"></span>Bulbasaur: 3 bucks</center><br>' +
    '<center><font size = 2, color = "white">Charmander: 5 bucks<span style="display:inline-block; width: 20px,;"></span>Slowbro: 6 bucks</center><br>' +
    '<center><font size = 2, color = "white"><b><i>Squirtle: 10 bucks</i></b></center></font><br>' +
    '<center><font size = 4, color = "white"><b>Spin the<button name = "send", value = "/wheel spin"><font color = "red"><b>WHEEL!</b></font></button>  3 bucks per a spin!</b></font></center></div>'],
	},

};
