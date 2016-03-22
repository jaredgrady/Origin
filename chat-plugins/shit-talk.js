/*****************************************
 * Shit Talk *
 * A random insult generator for the chat *
******************************************/
'use strict';

const insultsA = [
	'the dude who got shit on by Pawniard on ladder and changed his Timburr to Spritzee',
	'guess you couldve gone all the way after critting me 4 times in our dpp ou playoffs game but hey not quite there yet in terms of skill',
	'bet you played more mons than me in the last 2 weeks alone good job "not caring"',
	'if i cared about mons half as much as you do id jerk off to the unbelievable thought of you winning once in your life',
	'i hate it when dumbass bitches like you make retarded moves and choke the whole fucking game away that way',
	'i swear to fucking god how can a single player be this lucky after getting played all the fucking way',
	'no person using a team that shit and standard and fucking horrible in ORAS should ever be gaining any of my respect whatsoever because its disgusting and a waste of time',
	'arent you the guy whose friend got fucking trashbagged by me in what 12 minutes? while he cheered for him',
	'something is very wrong with your head to begin with, seeing how you cant handle a timer consisting of 300 seconds in a game designed for children and actually start to hyperventilate'];
const insultsB = [
	'Maybe you should shut the fuck up instead of calling out other people', 'Get real', 'Why are you still posting',
	'You almost ruined our season by just existing', 'You are a mere slave', 'I am here to show Smogon how fucking awful you are at everything',
	'You\'re useless for everything everywhere on Smogon', 'I wish the people i played werent actually worthless',
	'Die in a ditch and dont ever mention my name again', 'This felt like the special olympics of ORAS'];
const insultsC = [
	'nut-hugger', 'dumbass baboon', 'glorified heap of trash', 'filth', 'stinky italian', 'worthless protoplasm',
	'random grinch', 'useless sack of shit', 'no one on a site that means nothing', 'literal trash'];

exports.commands = {
	insult: function (target, room, user) {
		if (!this.canTalk()) return false;
		if (!target) return this.errorReply('Must specify a target user.');
		let parts = [insultsA[Math.floor(Math.random() * insultsA.length)], insultsB[Math.floor(Math.random() * insultsB.length)], insultsC[Math.floor(Math.random() * insultsC.length)]];
		let group = user.getIdentity().charAt(0);
		if (room.auth) group = room.auth[user.userid] || group;
		let message = '|c|' + group + user.name + '|Oh, its ' + target + ', ' + parts[0] + '. ' + parts[1] + ' you ' + parts[2] + '.';
		if (Users.ShadowBan.checkBanned(user)) {
			user.sendTo(room, message);
			Users.ShadowBan.addMessage(user, 'To' + room, message);
		} else {
			room.add(message);
		}
	},
};
