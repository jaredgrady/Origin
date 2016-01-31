'use strict';

const request = require('request');

const def = require('../define');
const define = def.define;
const urbandefine = def.urbandefine;

exports.commands = {
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
};
