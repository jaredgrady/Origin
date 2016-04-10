'use strict';
/**********************
 * Badges by a weeb for weebs *
 **********************/

let color = require('../config/color');

module.exports.badgeIcons = {
	'rpsmaster':'http://i.imgur.com/xpRhWgI.png',
	'staff':'http://i.imgur.com/EqwEcfD.gif',
	'Nolife Master':'http://i.imgur.com/pKxK9pv.pngx',
	'Collector':'http://i.imgur.com/a26Qbmi.png',
	'Ace':'http://i.imgur.com/uujwykI.png',
	'Annoying':'http://i.imgur.com/GdnPYJi.png',
	'Mono Pro':'http://i.imgur.com/R0VISSU.png',
	'Champ':'http://i.imgur.com/ttGM1SR.png',
	'LUCKY MOFO':'http://i.imgur.com/KH8m6Rg.png',
	'High Roller':'http://i.imgur.com/1AulGHm.png',
	'Achievement Unlocked!':'http://i.imgur.com/YRgMD4s.png',
	'Persistent!':'http://i.imgur.com/C6gknys.png',
	'Active Poster!':'http://i.imgur.com/GuGCyrY.png',
	'Float Badge':'http://i.imgur.com/1vdYBhD.png',
	'Commie Badge':'http://i.imgur.com/5jzkxd3.gif',
	'Cannon Badge':'http://i.imgur.com/QPofWrT.png',
	'Pixel Badge':'http://i.imgur.com/ymSJ1MQ.png',
	'Neo Badge':'http://i.imgur.com/Zs9VGbg.png',
	'Century Badge':'http://i.imgur.com/dPR2mBM.png',
	'Neski Badge':'http://i.imgur.com/ZBRW9CZ.png',
	'Arken Badge':'http://i.imgur.com/KvELNsF.png',
	'Alpha Badge':'http://i.imgur.com/JfflYtk.png',
	'Gryphon Badge':'http://i.imgur.com/tUOYNCj.png',
	'fender Badge':'http://i.imgur.com/s16lNTS.gif',
	'Lucario Badge':'http://i.imgur.com/yfSYq1w.gif',
	'weeb':'http://i.imgur.com/5FzJ4Tt.png',
	'Meme Lord':'http://i.imgur.com/4nLKC4V.png',
	'Cute Fox':'http://i.imgur.com/xgN76US.png',
	'vip':'http://i.imgur.com/7heNNTP.png',
	'Donor of the month':'http://i.imgur.com/EHx2ozm.gif',
	'Neptune badge':'http://i.imgur.com/d1iHXxr.png',
	'Steel Badge':'http://i.imgur.com/hlAeXU9.png',
	'Jokester':'http://imgur.com/ndhm2wf.png',
	'Big Brother Badge':'http://i.imgur.com/qcOQDhT.png',
	'Good User':'http://i.imgur.com/XXWuh8V.png',
	'NTG Badge':'http://i.imgur.com/7vBjDyV.png',
	'Tesla Badge':'http://i.imgur.com/T9k98kI.gif',
};

let badgeDescriptions = {
	'rpsmaster':'Reach 1500 on the RPS ladder.',
	'staff':'Be a global staff member.',
	'Nolife Master':'Accumulate an ontime of 300 hours.',
	'Collector':'Earn 750 card points.',
	'Ace':'Win at least 2 different Origin events.',
	'Annoying':'Hidden Achievement.',
	'Mono Pro':'Win in all 3 formats of Monotype Series.',
	'Champ':'Be a league\'s champion.',
	'LUCKY MOFO':'Win the lottery.',
	'High Roller':'Spend 500 bucks or more on Origin\'s shop.',
	'Achievement Unlocked!':'Earn 3,000 points on Safety Shark\'s leaderboard.',
	'Persistent!':'1000 wins on the dice ladder.',
	'Active Poster!':'Have 120 posts on the forums and a reputation of at least 40.',
	'Float Badge':'Defeat Master Float in Anything Goes.',
	'Commie Badge':'Defeat Gnarly Commie in OU, best of 3.',
	'Cannon Badge':'Defeat Volco in UU.',
	'Pixel Badge':'Defeat Selena in NU.',
	'Neo Badge':'Defeat Neo Soul in Random Battle, best of 3.',
	'Century Badge':'Defeat Paul Century in ZU.',
	'Neski Badge':'Defeat SaNeski in Monotype (Turbo), best of 3.',
	'Arken Badge':'Defeat ArkenCiel in Monotype or Monotype (Turbo) twice in a row.',
	'Alpha Badge':'Defeat Alpha Ninja in an OM other than Monotype, best of 3.',
	'Gryphon Badge':'Defeat Gryphon in Uno, best of 3, 1v1',
	'fender Badge':'Defeat fender in LC.',
	'Lucario Badge':'Defeat AuraStormLucario in VGC13, VGC15, or VGC16, best of 3.',
	'weeb':'10 posts in Anime subforum.',
	'Meme Lord':'Hidden Achievement.',
	'Cute Fox':'Hidden Achievement.',
	'vip':'Donate for VIP status.',
	'Donor of the month':'Donate the most for the month.',
	'Neptune badge':'Help create/run 5 successful events.',
	'Steel Badge':'Defeat Sundar in Anything Goes, best of 3.',
	'Jokester':'Tell Chevy a joke that makes him laugh via PM, Only 1 joke per day.',
	'Big Brother Badge':'Send Nii Sama a gif or vine that makes him laugh.',
	'Good User':'Hidden Achievement',
	'NTG Badge':'Defeat NTG best of 5 in the tiers: 1v1, Mono, Randbat, UU, Hackmons Cup.',
	'Tesla Badge':'Get 5 parahaxes in a row in an official tournament match and win.',
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
		switch (cmd) {
		case 'set':
			if (!this.can('lock')) return false;
			if (parts.length !== 3) return this.errorReply("Correct command: `/badges set, user, badgeName`");
			userid = toId(parts[1].trim());
			targetUser = Users.getExact(userid);
			badges = Db('badgesDB').get(userid);
			badge = parts[2].trim();
			if (!badgeIcons[badge]) return this.sendReply("This badge does not exist, please check /badges list");
			if (!Db('badgesDB').has(userid)) badges = [];
			badges = badges.filter(b => b !== badge);
			badges.push(badge);
			Db('badgesDB').set(toId(userid), badges);
			if (Users.get(targetUser)) Users.get(userid).popup('|modal||html|<font color="red"><strong>ATTENTION!</strong></font><br /> You have received a badge from <b><font color="' + color(user.userid) + '">' + Tools.escapeHTML(user.name) + '</font></b>: <img src="' + badgeIcons[badge] + '" width="16" height="16">');
			this.logModCommand(user.name + " gave the badge '" + badge + "' badge to " + userid + ".");
			this.sendReply("Badge set.");
			break;
		case 'list':
			if (!this.runBroadcast()) return;
			badges = Object.keys(badgeIcons);
			output = '<table> <tr>';
			for (let i = 0; i < badges.length; i++) {
				output += '<td>' + badgeImg(badgeIcons[badges[i]], badges[i]) + '</td> <td>' + badges[i] + '</td> <td>' + badgeDescriptions[badges[i]] + '</td>';
				if (i % 2 === 1) output += '</tr> <tr>';
			}
			output += '</tr> <table>';
			this.sendReplyBox(output);
			break;
		case 'info':
			if (!this.runBroadcast()) return;
			if (!parts[1]) return this.errorReply("Invalid command. Valid commands are `/badges list`, `/badges info, badgeName`, `/badges set, user, badgeName` and `/badges take, user, badgeName`.");
			badge = parts[1].trim();
			if (!badgeDescriptions[badge]) return this.errorReply("This badge does not exist, please check /badges list");
			this.sendReply(badge + ": " + badgeDescriptions[badge]);
			break;
		case 'take':
			if (!this.can('lock')) return false;
			if (parts.length !== 3) return this.errorReply("Correct command: `/badges take, user, badgeName`");
			userid = toId(parts[1].trim());
			targetUser = Users.getExact(userid);
			if (!Db('badgesDB').has(userid)) return this.errorReply("This user doesn't have any badges.");
			badges = Db('badgesDB').get(userid);
			badge = parts[2].trim();
			if (!badgeIcons[badge]) return this.errorReply("This badge does not exist, please check /badges list");
			badges = badges.filter(b => b !== badge);
			Db('badgesDB').set(toId(userid), badges);
			this.logModCommand(user.name + " took the badge '" + badge + "' badge from " + userid + ".");
			this.sendReply("Badge taken.");
			break;
		case 'deleteall':
			if (!(~developers.indexOf(user.userid) || user.userid === 'niisama')) return this.errorReply("/badges deleteall - Access denied.");
			if (parts.length !== 2) return this.errorReply("Correct command: `/badges deleteall, badgeName`");
			badge = parts[1].trim();
			if (!badgeIcons[badge]) return this.errorReply("This badge does not exist, please check /badges list");
			let badgeObject = Db('badgesDB').object();
			let users = Object.keys(badgeObject);
			users.forEach(u => Db('badgesDB').set(u, (badgeObject[u].filter(b => b !== badge))));
			break;
		default:
			return this.errorReply("Invalid command. Valid commands are `/badges list`, `/badges info, badgeName`, `/badges set, user, badgeName` and `/badges take, user, badgeName`.");
		}
	},
	badgeshelp: ["Valid commands are `/badges list`, `/badges info, badgeName`, `/badges set, user, badgeName` and `/badges take, user, badgeName`."],
};
