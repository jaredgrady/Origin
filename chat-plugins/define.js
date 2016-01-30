'use strict';

const request = require('request');

const urbandefine = require('../urbandefine');

exports.commands = {
	def: 'define',
	define: function (target, room, user) {
		if (!target) return this.parse('/help define');
		target = toId(target);

		if (target > 50) return this.errorReply("Word can not be longer than 50 characters.");
		if (room.id !== 'lobby' || !room.battle) {
			if (!this.canBroadcast()) return;
		}
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");

		let options = {
			url: 'http://api.wordnik.com:80/v4/word.json/' + target + '/definitions?limit=3&sourceDictionaries=all' +
			'&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
		};

		let self = this;

		function callback(error, response, body) {
			if (!error && response.statusCode === 200) {
				let page = JSON.parse(body);
				let output = "<font color=#24678d><b>Definitions for " + target + ":</b></font><br />";
				if (!page[0]) {
					self.sendReplyBox("No results for <b>\"" + target + "\"</b>.");
					return room.update();
				} else {
					let count = 1;
					for (let u in page) {
						if (count > 3) break;
						output += "(<b>" + count + "</b>) " + Tools.escapeHTML(page[u]['text']) + "<br />";
						count++;
					}
					self.sendReplyBox(output);
					return room.update();
				}
			}
		}
		request(options, callback);
	},
	definehelp: ["/define [word] - Shows the definition of a word."],

	u: 'ud',
	urbandefine: 'ud',
	ud: function (target, room, user, connection, cmd) {
		if (!this.canBroadcast()) return;
		if (!target) return this.parse('/help ud');
		if (target.length > 50) return this.errorReply("Phrase cannot be longer than 50 characters.");
		if (!this.canTalk()) return this.errorReply("You cannot do this while unable to speak.");

		const targetId = toId(target);

		if (Db('udcache').get(targetId)) {
			return this.sendReplyBox("<b>" + Tools.escapeHTML(target) + ":</b> " + Db('udcache').get(targetId));
		}

		const self = this;

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
};
