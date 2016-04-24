'use strict';
/********************
 * Emoticons
 * This file handles basic features of the emoticons system. Some emoticons parsing is done in command-parser.js
********************/
let color = require('../config/color');

exports.parseEmoticons = parseEmoticons;

let emotes = {
	'(ditto)': 'https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/2x',
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'Cate': 'http://i.imgur.com/728AQQN.jpg',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'FacePalm': 'http://i.imgur.com/lv3GmpM.png',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'feelsackbr': 'http://i.imgur.com/BzZJedC.jpg?1',
	'feelsamy': 'http://i.imgur.com/Aw8KAmi.gif',
	'feelsapple': 'http://i.imgur.com/h42wGYF.gif',
	'feelsarken': 'http://imgur.com/YCCDZWq.png',
	'feelsasl': 'http://i.imgur.com/ZQbYp9l.gif',
	'feelsbadHD': 'https://cdn.betterttv.net/emote/55b6e2e03293ee267743902b/2x',
	'feelsbald': 'http://i.imgur.com/Gv2BFxs.png',
	'feelsbebop': 'http://i.imgur.com/TDwC3wL.png',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbirb': 'http://i.imgur.com/o4KxmWe.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsbt': 'http://i.imgur.com/rghiV9b.png',
	'feelschar': 'http://orig04.deviantart.net/9abc/f/2013/118/8/e/charizard_lick_icon_by_spritegirl999-d63d7sf.gif',
	'feelschime': 'http://i.imgur.com/uIIBChH.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg?1',
	'feelscop': 'http://i.imgur.com/eNaFHvR.png?1',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'feelscute': 'https://cdn.betterttv.net/emote/55aeba450d87fd2766bee7cd/2x',
	'feelscx': 'http://i.imgur.com/zRSUw2n.gif',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsdell': 'http://i.imgur.com/1CgwuDz.jpg',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsevil': 'http://i.imgur.com/zOemc0n.png',
	'feelsfdra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsfloat': 'http://i.imgur.com/XKP1Kpf.gif',
	'feelsfro': 'http://i.imgur.com/ijJakJT.png',
	'feelsgay': 'http://i.imgur.com/zQAacwu.png?1',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgm': 'https://cdn.betterttv.net/emote/5638163f55dee26813aebbf1/2x',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png?1',
	'feelshigh': 'http://i.imgur.com/s9I2bxp.jpg?1',
	'feelshlwn': 'http://i.imgur.com/OHMDVNJ.jpg',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsho': 'http://i.imgur.com/J4oUHm2.png?1',
	'feelsilum': 'http://i.imgur.com/CnyGTTD.png',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png?1',
	'feelsjpn': 'http://i.imgur.com/Zz2WrQf.jpg',
	'feelskawaii': 'http://i.imgur.com/kLnDaYD.png',
	'feelsky': 'http://i.imgur.com/BtATPId.png?1',
	'feelslag': 'https://cdn.betterttv.net/emote/56758c29bf317838643c7e97/2x',
	'feelsllama': 'http://i.imgur.com/oSLSk2I.gif',
	'feelslelouch': 'http://i.imgur.com/qZrV75o.png',
	'feelslot': 'http://i.imgur.com/tl88F7i.png?1',
	'feelslu': 'http://i.imgur.com/REEBSOT.png?1',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsmerry': 'https://cdn.betterttv.net/emote/5658e10f18d1dbe358624e35/2x',
	'feelsmixtape': 'http://i.imgur.com/7lncwng.png',
	'feelsmmyea': 'https://cdn.betterttv.net/emote/562bf1bec6035e430db80824/2x',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsns': 'http://i.imgur.com/jYRFUYW.jpg?1',
	'feelsohwait': 'https://cdn.betterttv.net/emote/55ab96ce9406e5482db53424/2x',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelsorange': 'http://i.imgur.com/3fxXP16.jpg',
	'feelspanda': 'http://i.imgur.com/qi7fue9.png',
	'feelspix': 'http://cbc.pokecommunity.com/config/emoticons/pix.png',
	'feelspuke': 'http://i.imgur.com/nQbRspU.png?1',
	'feelspaul': 'http://imgur.com/KuDZMJR.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelsPika': 'http://i.imgur.com/eoTrTkn.png?1',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelspoli': 'http://i.imgur.com/FnzhrWa.jpg?1',
	'feelsPoli': 'http://i.imgur.com/sbKhXZE.jpg?1',
	'feelssad': 'https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/2x',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'feelsreally': 'https://cdn.betterttv.net/emote/55b0fa13f54d6ecb7927ec54/2x',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssakis': 'http://i.imgur.com/yThm3fM.png?1',
	'feelssammich': 'http://i.imgur.com/sVgkUF1.png?1',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelsseis': 'http://i.imgur.com/gGGYxrE.png?1',
	'feelsshi': 'http://i.imgur.com/VzlGZ1M.jpg',
	'feelsslo': 'http://i.imgur.com/iQuToJf.jpg?1',
	'feelssnail': 'http://i.imgur.com/wf2ajCR.jpg',
	'feelssnake': 'http://i.imgur.com/xoJnDUD.png',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'feelsdrg': 'http://i.imgur.com/UZzWcA3.png',
	'feelsvolc': 'http://i.imgur.com/QXlKzZd.png?1',
	'feelsvpn': 'http://i.imgur.com/ODTZISl.gif',
	'feelsweird': 'https://cdn.betterttv.net/emote/5603731ce5fc5eff1de93229/2x',
	'feelswin': 'http://i.imgur.com/rbs9pZG.png?1',
	'feelsya': 'https://cdn.betterttv.net/emote/5678a310bf317838643c8188/2x',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'gachiGASM': 'https://cdn.betterttv.net/emote/55999813f0db38ef6c7c663e/2x',
	'gudone': 'http://i.imgur.com/USkp1b9.png',
	'gudsht': 'http://i.imgur.com/R9SO76u.png?1',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'hoSway': 'https://cdn.betterttv.net/emote/56396c857e538de14bd747a5/2x',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'Kappa': 'http://i.imgur.com/ZxRU4z3.png?1',
	'kappapride': 'http://i.imgur.com/GMs8OxU.jpg',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'Lennyf': 'http://i.imgur.com/FhOwY2P.png',
	'llamacool': 'http://i.imgur.com/X1x3728.gif',
	'llamanoodle': 'http://i.imgur.com/SUZkz5p.gif',
	'llamarawr': 'http://i.imgur.com/KWAQbPu.gif',
	'llamatea': 'http://i.imgur.com/nJnakEU.gif',
	'llamayawn': 'http://i.imgur.com/SVj8kBt.gif',
	'lelefp': 'http://i.imgur.com/pWlEKa3.jpg',
	'lelelol': 'http://i.imgur.com/R2g0RHT.gif',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'MingLee': 'https://static-cdn.jtvnw.net/emoticons/v1/68856/2.0',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'PeoplesChamp': 'http://i.imgur.com/QMiMBKe.png',
	'PogChamp': 'https://static-cdn.jtvnw.net/emoticons/v1/88/1.0',
	'RareChar': 'https://cdn.betterttv.net/emote/562b9101a6646e202bcc5447/2x',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'feelssht': 'http://i.imgur.com/s9owArF.png?1',
	'stevo': 'http://imgur.com/Gid6Zjy.png',
	'thumbsup': 'http://i.imgur.com/eWcFLLn.jpg',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'trumpW': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/2.0',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'xoxo': 'http://orig00.deviantart.net/b49d/f/2014/220/5/3/ichigo_not_impressed_icon_by_magical_icon-d7u92zg.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'yesface': 'http://i.imgur.com/k9YCF6K.png',
	'youdontsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
};

let emotesKeys = Object.keys(emotes);
let patterns = [];
let metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

for (let i in emotes) {
	if (emotes.hasOwnProperty(i)) {
		patterns.push('(' + i.replace(metachars, '\\$&') + ')');
	}
}
let patternRegex = new RegExp(patterns.join('|'), 'g');

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
	let originalMessage = message;
	if (room.WarlicMode && !pm) {
		room.add('|c|' + user.getIdentity().charAt(0) + user.name + '|' + parseWarlic(message));
		return true;
	}
	if (room.battle || room.isPersonal) {
		if ((typeof message !== 'string' || room.disableEmoticons) && !~developers.indexOf(user.userid) && !user.can('upperstaff')) return false;
	} else {
		if ((typeof message !== 'string' || (!pm && room.chatRoomData.disableEmoticons)) && !~developers.indexOf(user.userid) && !user.can('upperstaff')) return false;
	}

	let match = false;
	let len = emotesKeys.length;

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
		let emote = emotes[match];
		return typeof emote === 'string' ? '<img src="' + emote + '" title="' + match + '" height="50" width="50" />' : match;
	});

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

	let group = user.getIdentity().charAt(0);
	if (room.auth) group = room.auth[user.userid] || group;
	if (pm) group = user.group;
	if (user.hiding) group = ' ';

	let style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";

	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + color(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";
	if (pm) return message;
	if (Users.ShadowBan.checkBanned(user)) {
		user.sendTo(room, '|html|' + message);
		Users.ShadowBan.addMessage(user, "To " + room, sbanmsg);
		return true;
	}
	for (let u in room.users) {
		let targetUser = Users.get(u);
		// in case the user is offline
		if (!targetUser || !targetUser.connected) continue;
		// if user is ignoring emotes
		if (targetUser.blockEmoticons) {
			targetUser.sendTo(room, "|c|" + group + user.name + "|" + originalMessage);
		} else {
			if (room.battle) {
				// battles do not support uhtml (yet)
				targetUser.sendTo(room, "|raw|" + message);
			} else {
				targetUser.sendTo(room, "|uhtml|emoticon-" + user.userid + "|" + message);
			}
		}
	}
	// add to room.log
	room.log.push("|c|" + group + user.name + "|" + originalMessage);
	room.lastUpdate = room.log.length;
	return true;
}

/**
 * Create a four column table listing emoticons.
 *
 * @return {String} emotes table
 */
function create_table() {
	let emotes_name = Object.keys(emotes);
	let emotes_list = [];
	let emotes_group_list = [];
	let len = emotes_name.length;

	for (let i = 0; i < len; i++) {
		emotes_list.push("<td class='card-button' style='padding: 5px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5) inset; border-radius: 5px;'>" + "<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' style='vertical-align: middle;  padding-right: 5px;' />" + emotes_name[i] + "</td>");
	}

	for (let i = 0; i < len; i += 4) {
		let emoteOutput = [emotes_list[i], emotes_list[i + 1], emotes_list[i + 2], emotes_list[i + 3]];
		if (i < len) emotes_group_list.push("<tr>" + emoteOutput.join('') + "</tr>");
	}
	return "<div class='infobox'><center><font style='font-weight: bold; text-decoration: underline; color: #555;'>List of Emoticons</font></center>" +
		"<div style='max-height: 300px; overflow-y: scroll; padding: 5px 0px;'><table style='background: rgba(245, 245, 245, 0.4); border: 1px solid #BBB;' width='100%'>" +
		emotes_group_list.join("") +
		"</table></div></div>";
}

let emotes_table = create_table();

exports.commands = {
	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return this.errorReply("/toggleemoticons - Access denied.");
		if (room.battle || room.isPersonal) {
			room.disableEmoticons = !room.disableEmoticons;
			if (room.disableEmoticons) {
				this.add("|raw|<div class=\"broadcast-red\" style=\"border-radius: 5px;\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
			} else {
				this.add("|raw|<div class=\"broadcast-blue\" style=\"border-radius: 5px;\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
			}
		} else {
			if (!room.chatRoomData.disableEmoticons) {
				room.chatRoomData.disableEmoticons = true;
				Rooms.global.writeChatRoomData();
				this.add("|raw|<div class=\"broadcast-red\" style=\"border-radius: 5px;\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
				this.privateModCommand("(" + user.name + " has disabled emoticons in this room.)");
			} else {
				delete room.chatRoomData.disableEmoticons;
				Rooms.global.writeChatRoomData();
				this.add("|raw|<div class=\"broadcast-blue\" style=\"border-radius: 5px;\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
				this.privateModCommand("(" + user.name + " has enabled emoticons in this room.)");
			}
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],

	rande: 'randemote',
	randemote: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let rng = Math.floor(Math.random() * emotesKeys.length);
		let randomEmote = emotesKeys[rng];
		this.sendReplyBox("<img src='" + emotes[randomEmote] + "' title='" + randomEmote + "' height='50' width='50' />");
	},
	randemotehelp: ["/randemote - Get a random emote."],

	// emoticon blocking for both PMs and chatrooms.
	blockemote: 'ignoreemotes',
	blockemotes: 'ignoreemotes',
	blockemoticon: 'ignoreemotes',
	blockemoticons: 'ignoreemotes',
	ignoremotes: 'ignoreemotes',
	ignoreemotes: function (target, room, user) {
		user.blockEmoticons = true;
		Db('ignoremotes').set(user.userid, true);
		this.sendReply("You are now ignoring emotes.");
	},

	unblockemote: 'unignoreemotes',
	unblockemotes: 'unignoreemotes',
	unblockemoticon: 'unignoreemotes',
	unblockemoticons: 'unignoreemotes',
	unignoremotes: 'unignoreemotes',
	unignoreemotes: function (target, room, user) {
		Db('ignoremotes').delete(user.userid);
		user.blockEmoticons = false;
		this.sendReply("You are no longer ignoring emotes.");
	},
};
