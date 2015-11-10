'use strict';

var color = require('../config/color');

var warlicexclaim = '!';

exports.parseEmoticons = parseEmoticons;

var emotes = {
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'FacePalm': 'http://i.imgur.com/lv3GmpM.png',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'feelsackbr': 'http://i.imgur.com/BzZJedC.jpg?1',
	'feelsbebop': 'http://i.imgur.com/TDwC3wL.png',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsfdra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsgay': 'http://i.imgur.com/zQAacwu.png?1',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png?1',
	'feelshigh': 'http://i.imgur.com/s9I2bxp.jpg?1',
	'feelshlwn': 'http://i.imgur.com/OHMDVNJ.jpg',
	'feelsho': 'http://i.imgur.com/J4oUHm2.png?1',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png?1',
	'feelsjpn': 'http://i.imgur.com/Zz2WrQf.jpg',
	'feelsky': 'http://i.imgur.com/BtATPId.png?1',
	'feelslot': 'http://i.imgur.com/tl88F7i.png?1',
	'feelslu': 'http://i.imgur.com/REEBSOT.png?1',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsns': 'http://i.imgur.com/jYRFUYW.jpg?1',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelsPika': 'http://i.imgur.com/eoTrTkn.png?1',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelspoli': 'http://i.imgur.com/FnzhrWa.jpg?1',
	'feelsPoli': 'http://i.imgur.com/sbKhXZE.jpg?1',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelsseis': 'http://i.imgur.com/gGGYxrE.png?1',
	'feelsslo': 'http://i.imgur.com/iQuToJf.jpg?1',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'fukya': 'http://i.imgur.com/ampqCZi.gif',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'Kappa': 'http://i.imgur.com/ZxRU4z3.png?1',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'MingLee': 'https://static-cdn.jtvnw.net/emoticons/v1/68856/2.0',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'trumpW': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/2.0',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'yesface': 'http://i.imgur.com/k9YCF6K.png',
	'youdontsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg'
};

var emotesKeys = Object.keys(emotes);
var patterns = [];
var metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

for (var i in emotes) {
	if (emotes.hasOwnProperty(i)) {
		patterns.push('(' + i.replace(metachars, '\\$&') + ')');
	}
}
var patternRegex = new RegExp(patterns.join('|'), 'g');

/**
 * Parse emoticons in message.
 *
 * @param {String} message
 * @param {Object} room
 * @param {Object} user
 * @param {Boolean} pm - returns a string if it is in private messages
 * @returns {Boolean|String}
 */
function parseEmoticons(message, room, user, pm) {
	if (room.WarlicMode && !pm) {
		room.add('|c|' + user.getIdentity().charAt(0) + user.name + '|Salutations good sir or madam' + warlicexclaim);
		warlicexclaim = warlicexclaim + '!';
		return true;
	}
	if (typeof message !== 'string' || (!pm && room.disableEmoticons) && !~developers.indexOf(user.userid)) return false;

	var match = false;
	var len = emotesKeys.length;


	while (len--) {
		if (message && message.indexOf(emotesKeys[len]) >= 0) {
			match = true;
			break;
		}
	}

	if (!match) return false;
		
	//shadowbanroom message
	let sbanmsg = message;

	// escape HTML
	message = Tools.escapeHTML(message);

	// add emotes
	message = message.replace(patternRegex, function (match) {
		var emote = emotes[match];
		return typeof emote === 'string' ? '<img src="' + emote + '" title="' + match + '" height="50" width="50" />' : match;
	});

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

	var group = user.getIdentity().charAt(0);
	if (room.auth) group = room.auth[user.userid] || group;

	var style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";

	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + color(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";
	if (pm) return message;
	if (Users.ShadowBan.checkBanned(user)) {
		user.sendTo(room, '|html|' + message);
		Users.ShadowBan.addMessage(user, "To " + room, sbanmsg);
	}
	if (!Users.ShadowBan.checkBanned(user)) room.addRaw(message);
	return true;
}

/**
 * Create a two column table listing emoticons.
 *
 * @return {String} emotes table
 */
function create_table() {
	var emotes_name = Object.keys(emotes);
	var emotes_list = [];
	var emotes_group_list = [];
	var len = emotes_name.length;

	for (var i = 0; i < len; i++) {
		emotes_list.push("<td>" +
			"<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' />" +
			emotes_name[i] + "</td>");
	}

	var emotes_list_right = emotes_list.splice(len / 2, len / 2);

	for (var i = 0; i < len / 2; i++) {
		var emote1 = emotes_list[i],
			emote2 = emotes_list_right[i];
		if (emote2) {
			emotes_group_list.push("<tr>" + emote1 + emote2 + "</tr>");
		} else {
			emotes_group_list.push("<tr>" + emote1 + "</tr>");
		}
	}
	return "<div class='infobox'><center><b><u>List of Emoticons</u></b></center>" + "<div class='infobox-limited'><table border='1' cellspacing='0' cellpadding='5' width='100%'>" + "<tbody>" + emotes_group_list.join("") + "</tbody>" + "</table></div></div>";
}

var emotes_table = create_table();

exports.commands = {
	blockemote: 'blockemoticons',
	blockemotes: 'blockemoticons',
	blockemoticon: 'blockemoticons',
	blockemoticons: function (target, room, user) {
		if (user.blockEmoticons === (target || true)) return this.sendReply("You are already blocking emoticons in private messages! To unblock, use /unblockemoticons");
		user.blockEmoticons = true;
		return this.sendReply("You are now blocking emoticons in private messages.");
	},
	blockemoticonshelp: ["/blockemoticons - Blocks emoticons in private messages. Unblock them with /unblockemoticons."],

	unblockemote: 'unblockemoticons',
	unblockemotes: 'unblockemoticons',
	unblockemoticon: 'unblockemoticons',
	unblockemoticons: function (target, room, user) {
		if (!user.blockEmoticons) return this.sendReply("You are not blocking emoticons in private messages! To block, use /blockemoticons");
		user.blockEmoticons = false;
		return this.sendReply("You are no longer blocking emoticons in private messages.");
	},
	unblockemoticonshelp: ["/unblockemoticons - Unblocks emoticons in private messages. Block them with /blockemoticons."],

	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return this.errorReply("Access denied.");
		room.disableEmoticons = !room.disableEmoticons;
		this.sendReply("Disallowing emoticons is set to " + room.disableEmoticons + " in this room.");
		if (room.disableEmoticons) {
			this.add("|raw|<div class=\"broadcast-red\" style=\"border-radius: 5px;\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\" style=\"border-radius: 5px;\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],
	
	togglewarlic: function (target, room, user) {
		if (user.userid !== 'nineage' || user.userid !== 'fender') return this.errorReply("Access denied.");
		room.WarlicMode = !room.WarlicMode;
		this.sendReply("Warlic Mode is set to " + room.WarlicMode + " in this room.");
		if (room.WarlicMode) {
			this.add("|raw|<div class=\"broadcast-red\" style=\"border-radius: 5px;\"><b>Warlic Mode is now on!</b></div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\" style=\"border-radius: 5px;\"><b>Warlic Mode is now off!</b></div>");
		}
	},

	rande: 'randemote',
	randemote: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var rng = Math.floor(Math.random() * emotesKeys.length);
		var randomEmote = emotesKeys[rng];
		this.sendReplyBox("<img src='" + emotes[randomEmote] + "' title='" + randomEmote + "' height='50' width='50' />");
	},
	randemotehelp: ["/randemote - Get a random emote."]
};
