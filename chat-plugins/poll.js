var request = require('request');
var Poll = {
	reset: function (roomId) {
		Poll[roomId] = {
			question: undefined,
			optionList: [],
			options: {},
			display: '',
			topOption: ''
		};
	},

	splint: function (target) {
		var parts = target.split(',');
		var len = parts.length;
		while (len--) {
			parts[len] = parts[len].trim();
		}
		return parts;
	}
};

for (var id in Rooms.rooms) {
	if (Rooms.rooms[id].type === 'chat' && !Poll[id]) {
		Poll[id] = {};
		Poll.reset(id);
	}
}

exports.commands = {
	poll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!Poll[room.id]) Poll.reset(room.id);
		if (Poll[room.id].question) return this.sendReply("There is currently a poll going on already.");
		if (!this.canTalk()) return;

		var options = Poll.splint(target);
		if (options.length < 3) return this.parse('/help poll');

		var question = options.shift();

		options = options.join(',').toLowerCase().split(',');

		Poll[room.id].question = question;
		Poll[room.id].optionList = options;

		var pollOptions = '';
		var start = 0;
		while (start < Poll[room.id].optionList.length) {
			pollOptions += '<button name="send" value="/vote ' + Tools.escapeHTML(Poll[room.id].optionList[start]) + '">' + Tools.escapeHTML(Poll[room.id].optionList[start]) + '</button>&nbsp;';
			start++;
		}
		Poll[room.id].display = '<h2>' + Tools.escapeHTML(Poll[room.id].question) + '&nbsp;&nbsp;<font size="1" color="#AAAAAA">/vote OPTION</font><br><font size="1" color="#AAAAAA">Poll started by <em>' + user.name + '</em></font><br><hr>&nbsp;&nbsp;&nbsp;&nbsp;' + pollOptions;
		room.add('|raw|<div class="infobox">' + Poll[room.id].display + '</div>');
	},

	pollhelp: ["/poll [question], [option 1], [option 2]... - Create a poll where users can vote on an option."],
	endpoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply("There is no poll to end in this room.");

		var votes = Object.keys(Poll[room.id].options).length;

		if (votes === 0) {
			Poll.reset(room.id);
			return room.add('|raw|<h3>The poll was canceled because of lack of voters.</h3>');
		}

		var options = {};

		for (var l in Poll[room.id].optionList) {
			options[Poll[room.id].optionList[l]] = 0;
		}

		for (var o in Poll[room.id].options) {
			options[Poll[room.id].options[o]]++;
		}

		var data = [];
		for (var i in options) {
			data.push([i, options[i]]);
		}
		data.sort(function (a, b) {
			return a[1] - b[1];
		});

		var results = '';
		var len = data.length;
		var topOption = data[len - 1][0];
		while (len--) {
			if (data[len][1] > 0) {
				results += '&bull; ' + data[len][0] + ' - ' + Math.floor(data[len][1] / votes * 100) + '% (' + data[len][1] + ')<br>';
			}
		}
		room.add('|raw|<div class="infobox"><h2>Results to "' + Poll[room.id].question + '"</h2><font size="1" color="#AAAAAA"><strong>Poll ended by <em>' + user.name + '</em></font><br><hr>' + results + '</strong></div>');
		Poll.reset(room.id);
		Poll[room.id].topOption = topOption;
	},

	easytour: 'etour',
	elimtour: 'etour',
	etour: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + target + ', elimination');
	},

	roundrobintour: 'rtour',
	cancertour: 'rtour',
	rtour: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + target + ', roundrobin');
	},
	randomtour: 'randtour',
	randtour: function (target, room, user) {
		var rand = ['ou', 'pu', 'randombattle', 'ubers', 'uu', 'ru', 'pu', '1v1', 'hackmonscup', 'monotype', 'challengecup1v1', 'ubers', 'lc'][Math.floor(Math.random() * 13)];
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + rand + ', elimination');
	},

	pr: 'pollremind',
	pollremind: function (target, room, user) {
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply("There is no poll currently going on in this room.");
		if (!this.canBroadcast()) return;
		this.sendReplyBox(Poll[room.id].display);
	},

	formatpoll: 'tierpoll',
	tpoll: 'tierpoll',
	tierspoll: 'tierpoll',
	tierpoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		this.parse('/poll Tier for the next tournament?, Random Battles, Double Random Battles, Triple Random Battles, Gen [5] Random Battles, Gen [5] Double Random Battles, Gen [5] Random Triple Battles, Gen [4] Random Battles, Gen [4] Double Random Battles, Gen [4] Triple Random Battles, Gen [3] Random Battles, Gen [3] Double Random Battles, Gen [3] Triple Random Battles, Gen [2] Random Battles, Gen [1] Random Battles, Challenge Cup 1v1, 1v1, Hackmons Cup, Battle Factory, Seasonal, Monotype Random Battle, Ubers, OU, UU, RU, NU, PU, LC, AG, Doubles OU, No Status, MonsJustMons, Tier Shift, Monotype');
	},
	rpoll: 'randompoll',
	randomspoll: 'randompoll',
	randompoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		this.parse('/poll Tier for the next tournament?, Random Battles, Double Random Battles, Triple Random Battles, Gen [5] Random Battles, Gen [5] Double Random Battles, Gen [4] Random Battles, Gen [4] Double Random Battles, Gen [4] Triple Random Battles, Gen [3] Random Battles, Gen [3] Double Random Battles, Gen [3] Triple Random Battles, Gen [2] Random Battles, Gen [1] Random Battles, Challenge Cup 1v1, 1v1, Hackmons Cup, Battle Factory, Seasonal, Monotype Random Battle');
	},
	randomtour: 'randtour',
	randtour: function (target, room, user) {
		var rand = ['ou', 'pu', 'randombattle', 'ubers', 'uu', 'ru', 'pu', '1v1', 'hackmonscup', 'monotype', 'challengecup1v1', 'ubers', 'lc'][Math.floor(Math.random() * 13)];
		if (!this.can('broadcast', null, room)) return;
		this.parse('/tour new ' + rand + ', elimination');
	},
	fpoll: 'formatpoll',
	formatspoll: 'formatpoll',
	formatpoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		this.parse('/poll Tier for the next tournament?,' + Object.values(Tools.data.Formats).filter(function (f) { return f.effectType === 'Format' && f.tournamentShow; }).map('name').join(", "));
	},

	vote: function (target, room, user) {
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply("There is no poll currently going on in this room.");
		if (!target) return this.parse('/help vote');
		if (Poll[room.id].optionList.indexOf(target.toLowerCase()) === -1) return this.sendReply("'" + target + "' is not an option for the current poll.");

		var ips = JSON.stringify(user.ips);
		Poll[room.id].options[ips] = target.toLowerCase();

		return this.sendReply("You are now voting for " + target + ".");
	},
	votehelp: ["/vote [option] - Vote for an option in the poll."],

	votes: function (target, room, user) {
		if (!this.canBroadcast()) return;
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply("There is no poll currently going on in this room.");
		this.sendReply("NUMBER OF VOTES: " + Object.keys(Poll[room.id].options).length);
	}
};
