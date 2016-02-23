'use strict';
/********************
 * Sentence Game by fender
********************/
function endDisplay(arr) {
	let result = arr.join(' ');
	let display = '<center><h4>The Sentence has been finished!</h4></center><h5>' + result + '.</h5>';
	return display;
}

exports.commands = {

	sentence: function (target, room, user) {
		if (!this.can('lock', null, room)) return this.errorReply('/sentence - Access denied');
		if (room.sentence) return this.errorReply('There is already a sentence game in this room.');
		if (!target) return this.errorReply('You must specify a sentence length.');
		let length = Number(target);
		if (isNaN(length)) return this.errorReply('The length must be a number.');
		if (length > 16) return this.errorReply('The sentence cannot be this long.');
		room.sentence = {};
		room.sentence.size = length;
		room.sentence.result = [];
		room.sentence.lastWord = '';
		room.addRaw('<center><h3>A Sentence Game has been started! The sentence will be ' + target + ' words long.</h3></center>');
	},

	addword: function (target, room, user) {
		if (!room.sentence) return this.errorReply('There is not a sentence game in this room.');
		if (!target) return this.errorReply('You must specify a sentence length.');
		if (target.length > 16) this.errorReply('You may not use a word longer then 16 characters');
		if (target.indexOf(' ') > -1) this.errorReply('Your word should not include spaces');
		if (room.sentence.lastWord === user.userid) return this.errorReply('You just gave the previous word. Give someone else a turn.');
		room.sentence.result.push(target);

		if (room.sentence.result.length === room.sentence.size) {
			console.log('game ended');
			let end = endDisplay(room.sentence.result);
			room.addRaw(end);
			delete room.sentence;
			return;
		} else {
			console.log('did not end');
			console.log(room.sentence.size);
			console.log(room.sentence.result.length);
			room.sentence.lastWord = user.userid;
			room.addRaw('<h4>' + user + ' has added the word "' + target + '" to the sentence.</h4>');
		}
	},

	endsentence: function (target, room, user) {
		if (!this.can('lock', null, room)) return this.errorReply('/endsentence - Access denied');
		if (!room.sentence) return this.errorReply('There is not a sentence game in this room.');
		delete room.sentence;
		room.addRaw('<center><h3>The Sentence Game was ended early by ' + user + '.</h3></center>');
	},
};
