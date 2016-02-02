'use strict';
const color = require('../config/color');
const colors = require('colors');

function font(color, text) {
	return '<font color="' + color + '">' + text + '</font>';
}

function bold(text) {
	return '<b>' + text + '</b>';
}

exports.commands = {
	chatcolour: 'chatcolor',
	chatcolor: function (target, room, user) {
		let targets = target.split(',');
		if (targets.length < 2) return this.sendReply("/chatcolor OR /chatcolour [colour], [message] - Outputs a message in a custom colour. Requires VIP.");
		if (!this.can('vip') || !this.canBroadcast()) return;
		if (!this.canTalk()) return this.errorReply("You may not use this command while unable to speak.");
		this.add('|raw|' +  bold(font(color(toId(user)), user.name) + ': <font color="' + targets[0].toLowerCase().replace(/[^#a-z0-9]+/g, '') + '">' + Tools.escapeHTML(targets.slice(1).join(",")) + '</font>'));
	},
	/*cc: 'customcolor', 'customcolour',
	customcolour: function (target, room, user) {
		if (!this.can('vip') || !this.canDeclare()) return false;
                if target=user.name
	}*/
};
