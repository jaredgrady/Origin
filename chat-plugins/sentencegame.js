'use strict';

/************************************************
 * Sentence Game by fender and AuraStormLucario *
 ************************************************/
const badEndings = ['the', 'and', 'a', 'an', 'or'];

function cleanWord(word) {
	let reg = /[^a-zA-Z0-9 :]/g;
	let clean = Tools.escapeHTML(word);
	if (reg.test(word)) {
		return false;
	} else {
		return clean;
	}
}

function endDisplay(arr) {
	let result = arr.join(' ');
	let display = '<font size="4" style="font-weight:bold;text-align:center">The Sentence has been finished!</font><br /><font size="4" style="font-weight:bold">' + result + '</font>.';
	return display;
}

exports.commands = {

	newsentence: 'sentence',
	sentence: function (target, room, user) {
		if (!this.can('lock', null, room)) return this.errorReply('/sentence - Access denied');
		if (room.sentence) return this.errorReply('There is already a sentence game in this room.');
		if (!target) return this.errorReply('You must specify a sentence length.');

		let length = Math.floor(Number(target));
		if (isNaN(length)) return this.errorReply('The length must be a number.');
		if (length > 16 || length < 2) return this.errorReply('The sentence cannot be this long.');

		room.sentence = {};
		room.sentence.size = length;
		room.sentence.result = [];
		room.sentence.lastUser = '';
		room.addRaw('<font size="4" style="font-weight:bold;text-align:center">A Sentence Game has been started! The sentence will be ' + target + ' words long.</font><br />');
	},

	aw: 'addword',
	addword: function (target, room, user) {
		if (!room.sentence) return this.errorReply('There is not a sentence game in this room.');
		if (!target) return this.errorReply('You must specify a sentence length.');
		if (target.length > 16) return this.errorReply('You may not use a word longer then 16 characters.');
		if (target.indexOf(' ') > -1) return this.errorReply('Your word should not include spaces.');
		if (room.sentence.lastUser === user.userid) return this.errorReply('You just gave the previous word. Give someone else a turn!');

		let word = cleanWord(target);
		if (word === false) return this.errorReply('The word must contain only alpha characters.');
		if (room.sentence.result.length === room.sentence.size - 1 && badEndings.indexOf(word) > -1) return this.errorReply('Nobody wants the sentence to end with "' + word + '".');
		room.sentence.result.push(word);

		if (room.sentence.result.length === room.sentence.size) {
			let end = endDisplay(room.sentence.result);
			room.addRaw(end);
			delete room.sentence;
			return;
		} else {
			room.sentence.lastUser = user.userid;
			room.addRaw('<font size="3" style="font-weight:bold">' + user + ' has added the word "' + word + '" to the sentence.</font><br>');
		}
	},

	endsentence: function (target, room, user) {
		if (!this.can('lock', null, room)) return this.errorReply('/endsentence - Access denied');
		if (!room.sentence) return this.errorReply('There is not a sentence game in this room.');
		delete room.sentence;
		room.addRaw('<font size="3" style="font-weight:bold">The Sentence Game was ended by ' + user + '.</font><br>');
	},

	sentencehelp: ["- /sentence [length] - ",
	"- /addword [word] - ",
	"- /endsentence - "],
};
