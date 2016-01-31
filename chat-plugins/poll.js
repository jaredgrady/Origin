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
		if (room.battle) return false;
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
		pollOptions += '<div style="padding: 3px; background: rgba(235, 235, 235, 0.5);"><br /><center>';
		while (start < Poll[room.id].optionList.length) {
			pollOptions += '<button name="send" value="/vote ' + Tools.escapeHTML(Poll[room.id].optionList[start]) + '" style="border-radius: 3px; box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.08);" class="pollButton">' + Tools.escapeHTML(Poll[room.id].optionList[start]) + '</button>&nbsp;';	
			start++;
		}
		pollOptions += '</center><br /></div>';
		Poll[room.id].display = '<div style="background: #333; border-bottom: 1px solid #000; box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.2) inset; padding: 3px;"><center><font size="5" color="white">' + Tools.escapeHTML(Poll[room.id].question) + '</font><font size="1" color="#CCC" style="font-style: italic;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Poll started by ' + user.name + '</font></center></div>' + pollOptions;
		room.add('|raw|<div style="width: 100%; border: 1px solid #000;">' + Poll[room.id].display + '</div>');
	},

	pollhelp: ["/poll [question], [option 1], [option 2]... - Create a poll where users can vote on an option."],
	endpoll: function (target, room, user) {
		if (!this.can('broadcast', null, room)) return false;
		if (!Poll[room.id]) Poll.reset(room.id);
		if (!Poll[room.id].question) return this.sendReply("There is no poll to end in this room.");

		var votes = Object.keys(Poll[room.id].options).length;

		if (votes === 0) {
			Poll.reset(room.id);
			return this.add('|raw|<h3>The poll was canceled because of lack of voters.</h3>');
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

		var results = '<div style="padding: 3px; background: rgba(235, 235, 235, 0.5);"><br />';
		var len = data.length;
		var topOption = data[len - 1][0];
		while (len--) {
			if (data[len][1] > 0) {
				results += '<table><tr><td style="width: 200px; overflow: hidden;">&nbsp;&nbsp;&nbsp;&bull; ' + data[len][0] + ' - ' + data[len][1] + '</td><td><div style="width: 220px; height: 20px; border-radius: 3px; border: 1px solid #AAA; background: #F8F8F8;"><div style="width: ' + Math.floor(data[len][1] / votes * 100) + '%; height: 20px; background: #337AB7;"><center><font color="#06233C" size="1" style="overflow: hidden;">' + Math.floor(data[len][1] / votes * 100) + '%</font></center></div></div></td></tr></table>';
			}
		}
		results += '<br /></div>';
		room.add('|raw|<div style="width: 100%; border: 1px solid #000;"><div style="background: #333; border-bottom: 1px solid #000; box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.2) inset; padding: 3px;"><center><font size="5" color="white">Results to "' + Poll[room.id].question + '"</font><font size="1" color="#CCC" style="font-style: italic;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Poll ended by ' + user.name + '</font></center></div>' + results + '</strong></div>');
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
		this.sendReply('|raw|<div style="width: 100%; border: 1px solid #000;"> ' + Poll[room.id].display + '</div>');
	},

	formatpoll: 'tierpoll',
	tpoll: 'tierpoll',
	tierspoll: 'tierpoll',
	tierpoll: function (target, room, user) {
		if (room.battle) return false;
		if (!this.can('broadcast', null, room)) return false;
		this.parse('/poll Tier for the next tournament?, Random Battle, Anything Goes, Ubers, OverUsed, OverUsed Turbo, OverUsed (No Mega), Underused, RarelyUsed, NeverUsed, PU, FU, LC, Random Doubles Battle, VGC 2016, Battle Spot Doubles, Random Triples Battle, Battle Factory, Challenge Cup 1v1, Balanced Hackmons, 1v1, Monotype, Monotype (Turbo), Monotype Random Battle, Inverse Battle, Almost Any Ability, STABmons, Hackmons Cup, [Seasonal], Gen 4 LC, Battle Factory, Doubles OU, CAP, Gen 5 OU, Gen 5 LC');
	},
	randomspoll: 'randompoll',
	randompoll: function (target, room, user) {
		if (room.battle) return false;
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
		if (room.battle) return false;
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
	},
	rpoll: 'roompoll',
	roompoll: function(target, room, user) {
		if (!target) {
			if (!this.can('broadcast', null, room) || room.battle) return false;
			if (!room.RPoll) return this.parse('/help roompoll');
			return this.parse('/poll ' + room.RPoll);
		}
		var parts = target.split(" ");
		var action = toId(parts[0] || " ");
		var details = parts.slice(1).join(" ");
		if (action == "help") return this.parse('/help roompoll');
		if (action == "change" || action == "set") {
			if (!this.can('declare', null, room) || room.battle) return false;
			if (!toId(details || " ")) return this.parse("/help roompoll")
			if (details.split(",").length < 3) {
				return this.errorReply("You did not include enough arguments for the poll.")
			}
			room.RPoll = details.replace(/^\/poll/i, "");
			if (room.chatRoomData) {
				room.chatRoomData.RPoll = room.RPoll;
				Rooms.global.writeChatRoomData();
			}
			return this.sendReply("The roompoll has been set.")
		}
		if (action === 'view') {
			if (!this.can('declare', null, room)) return false;
			if (!room.RPoll) return this.errorReply("No roompoll has been set yet.");
			return this.sendReply('The roompoll is: /poll ' + room.RPoll);
		}
		else return this.errorReply('This is not a valid roompoll command, do "/roompoll help" for more information');
	},
	roompollhelp: ["- /roompoll - creates a new roompoll. (Start poll with '/roompoll', display poll with '!pr', end poll with '/endpoll'). Requires: + $ % @ # & ~",
		"- /roompoll set/change [details] - sets the roompoll. Requires: # & ~",
		"- /roompoll view - displays the command for the current roompoll. Requires: # & ~"],
};
