'use strict';
/**********************
 * Badges by Nii Sama *
 **********************/

let color = require('../config/color');

module.exports.badgeIcons = {
	"rpsmaster":"http://i.imgur.com/xpRhWgI.png",
	"staff":"http://i.imgur.com/EqwEcfD.gif",
	"Nolife Master":"http://i.imgur.com/pKxK9pv.pngx",
	"Collector":"http://i.imgur.com/a26Qbmi.png",
	"Ace":"http://i.imgur.com/uujwykI.png",
	"Annoying":"http://i.imgur.com/GdnPYJi.png",
	"Mono Pro":"http://i.imgur.com/R0VISSU.png",
	"Champ":"http://i.imgur.com/ttGM1SR.png",
	"LUCKY MOFO":"http://i.imgur.com/KH8m6Rg.png",
	"High Roller":"http://i.imgur.com/1AulGHm.png",
	"Achievement Unlocked!":"http://i.imgur.com/YRgMD4s.png",
	"Persistent!":"http://i.imgur.com/C6gknys.png",
	"Active Poster!":"http://i.imgur.com/GuGCyrY.png",
	"Float Badge":"http://i.imgur.com/1vdYBhD.png",
	"Commie Badge":"http://i.imgur.com/5jzkxd3.gif",
	"Cannon Badge":"http://i.imgur.com/QPofWrT.png",
	"Pixel Badge":"http://i.imgur.com/ymSJ1MQ.png",
	"Neo Badge":"http://i.imgur.com/Zs9VGbg.png",
	"Century Badge":"http://i.imgur.com/dPR2mBM.png",
	"Neski Badge":"http://i.imgur.com/ZBRW9CZ.png",
	"Arken Badge":"http://i.imgur.com/KvELNsF.png",
	"Alpha Badge":"http://i.imgur.com/JfflYtk.png",
	"Gryphon Badge":"http://i.imgur.com/crtS5z2.png",
	"fender Badge":"http://i.imgur.com/s16lNTS.gif",
	"Lucario Badge":"http://i.imgur.com/yfSYq1w.gif",
	"weeb":"http://i.imgur.com/XJmjJDE.png",
	"Meme Lord":"http://i.imgur.com/4nLKC4V.png",
	"Cute Fox":"http://i.imgur.com/xgN76US.png",
	"vip":"http://i.imgur.com/7heNNTP.png",
	"Donor of the month":"http://i.imgur.com/EHx2ozm.gif",
	"Neptune badge":"http://i.imgur.com/d1iHXxr.png",
};

let badgeDescriptions = {
	"rpsmaster":"info",
	"staff":"info",
	"Nolife Master":"info",
	"Collector":"info",
	"Ace":"info",
	"Annoying":"info",
	"Mono Pro":"info",
	"Champ":"info",
	"LUCKY MOFO":"info",
	"High Roller":"info",
	"Achievement Unlocked!":"info",
	"Persistent!":"info",
	"Active Poster!":"info",
	"Float Badge":"info",
	"Commie Badge":"info",
	"Cannon Badge":"info",
	"Pixel Badge":"info",
	"Neo Badge":"info",
	"Century Badge":"info",
	"Neski Badge":"info",
	"Arken Badge":"info",
	"Alpha Badge":"info",
	"Gryphon Badge":"info",
	"fender Badge":"info",
	"Lucario Badge":"info",
	"weeb":"info",
	"Meme Lord":"info",
	"Cute Fox":"info",
	"vip":"info",
	"Donor of the month":"info",
	"Neptune badge":"info",
};

function badgeImg(link, name) {
	return '<img src="' + link + '" height="16" width="16" alt="' + name + '" title="' + name + '" >';
}

exports.commands = {
	badge: 'badges',
	badges: function (target, room, user) {
		let parts = target.split(',');
		let cmd = parts[0].trim().toLowerCase();
		let userid, targetUser;
		let badges;
		let badge;
		let output = '<table> <tr>';
		let badgeIcons = module.exports.badgeIcons;
		let keys;
		let listkeys;
		switch (cmd) {
		case 'set':
			if (!this.can('ban')) return false;
			if (parts.length !== 3) return this.errorReply('Correct command: `/badges set, user, badgeName`');
			userid = toId(parts[1].trim());
			targetUser = Users.getExact(userid);
			if (!userid) return this.errorReply("You didn't specify a user.");
			if (!Users.get(targetUser)) return this.errorReply('The target user is not online.');
			if (targetUser.length >= 19) return this.errorReply("Usernames are required to be less than 19 characters long.");
			if (targetUser.length < 3) return this.errorReply("Usernames are required to be greater than 2 characters long.");
			badges = Db('badgesDB').get(userid);
			badge = parts[2].trim();

			if (!badgeIcons[badge]) return this.sendReply('This badge does not exist, please check /badges list');
			badges.push(badge);
			let uniqueBadges = [];
			uniqueBadges = badges.filter(function (elem, pos) {
				return badges.indexOf(elem) === pos;
			});
			Db('badgesDB').set(toId(userid), uniqueBadges);
			Users.get(userid).popup('|modal||html|<font color="red"><strong>ATTENTION!</strong></font><br /> You have received a badge from <b><font color="' + color(user.userid) + '">' + Tools.escapeHTML(user.name) + '</font></b>: <img src="' + badgeIcons[badge] + '" width="16" height="16">');
			this.logModCommand(user.name + " gave " + targetUser + " a badge.");
			this.sendReply("Badge set.");
			break;
		case 'list':
			if (!this.canBroadcast()) return;
			keys = Object.keys(badgeIcons);
			listkeys = Object.keys(badgeDescriptions);
			output = '<table> <tr>';
			for (let i = 0; i < keys.length; i++) {
				output += '<td>' + badgeImg(badgeIcons[keys[i]], keys[i]) + '</td> <td>' + keys[i] + '</td> <td>' + badgeDescriptions[listkeys[i]] + '</td>';
				if (i % 2 === 1) output +=  '</tr> <tr>';
			}
			output += '</tr> <table>';
			this.sendReplyBox(output);
			break;
		case 'info':
			if (!this.canBroadcast()) return;
			badge = parts[1].trim();
			listkeys = Object.keys(badgeDescriptions);
			if (!badgeDescriptions[badge]) return this.errorReply('This badge does not exist, please check /badges list');
			this.sendReply(badgeDescriptions[badge]);
			break;
		case 'take':
			if (!this.can('ban')) return false;
			if (parts.length !== 3) return this.errorReply('Correct command: `/badges take, user, badgeName`');
			userid = toId(parts[1].trim());
			targetUser = Users.getExact(userid);
			if (!userid) return this.errorReply("You didn't specify a user.");
			if (!Users.get(targetUser)) return this.errorReply('The target user is not online.');
			if (targetUser.length >= 19) return this.errorReply("Usernames are required to be less than 19 characters long.");
			if (targetUser.length < 3) return this.errorReply("Usernames are required to be greater than 2 characters long.");
			badges = Db('badgesDB').get(userid);
			badge = parts[2].trim();
			if (!badgeIcons[badge]) return this.errorReply('This badge does not exist, please check /badges list');
			let index = badges.indexOf(badge);
			if (index !== -1) {
				badges.splice(index, 1);
			}
			Db('badgesDB').set(toId(userid), badges);
			this.logModCommand(user.name + " took a badge from " + targetUser + ".");
			this.sendReply("Badge taken.");
			break;
		default:
			return this.sendReply("Invalid command. Valid commands are `/badges list`, `/badges info, badgeName`, `/badges set, user, badgeName` and `/badges take, user, badgeName`.");
		}
	},
	badgeshelp: ["Valid commands are `/badges list`, `/badges set, user, badgeName` and `/badges take, user, badgeName`."],
};
