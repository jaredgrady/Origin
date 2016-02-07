'use strict';
/********************
 * Customavatar
 * This file handles the automatic customavatar system. Code by jd.
********************/
const crypto = require('crypto');
const fs = require('fs');
const color = require('../config/color');
const path = require('path');

function reloadCustomAvatars() {
	let newCustomAvatars = {};
	try {
		fs.readdirSync('./config/avatars').forEach(function (file) {
			let ext = path.extname(file);
			if (ext !== '.png' && ext !== '.gif') return;

			let user = toId(path.basename(file, ext));
			newCustomAvatars[user] = file;
			delete Config.customavatars[user];
		});
	} catch (e) {
		console.error(e);
	}

	// Make sure the manually entered avatars exist
	for (let a in Config.customavatars) {
		if (typeof Config.customavatars[a] === 'number') {
			newCustomAvatars[a] = Config.customavatars[a];
		} else {
			fs.exists('./config/avatars/' + Config.customavatars[a], function (user, file, isExists) {
				if (isExists) Config.customavatars[user] = file;
			}.bind(null, a, Config.customavatars[a]));
		}
	}

	Config.customavatars = newCustomAvatars;
}
reloadCustomAvatars();

if (Config.watchConfig) {
	fs.watchFile('../config/config.js', function (curr, prev) {
		if (curr.mtime <= prev.mtime) return;
		reloadCustomAvatars();
	});
}

const script = function () {
	/*
	FILENAME=`mktemp`
	function cleanup {
		rm -f $FILENAME
	}
	trap cleanup EXIT

	set -xe

	timeout 10 wget "$1" -nv -O $FILENAME

	FRAMES=`identify $FILENAME | wc -l`
	if [ $FRAMES -gt 1 ]; then
		EXT=".gif"
	else
		EXT=".png"
	fi

	timeout 10 convert $FILENAME -layers TrimBounds -coalesce -adaptive-resize 80x80\> -background transparent -gravity center -extent 80x80 "$2$EXT"
	*/
}.toString().match(/[^]*\/\*([^]*)\*\//)[1];

let pendingAdds = {};

exports.commands = {
	customavatars: 'customavatar',
	customavatar: function (target, room, user) {
		let parts = target.split(',');
		let cmd = parts[0].trim().toLowerCase();
		let hash;

		if (cmd in {'':1, show:1, view:1, display:1}) {
			let message = "";
			for (let a in Config.customavatars)
				message += "<strong>" + Tools.escapeHTML(a) + ":</strong> " + Tools.escapeHTML(Config.customavatars[a]) + "<br />";
			return this.sendReplyBox(message);
		}
		let userid, targetUser, avatar;
		switch (cmd) {
		case 'set':
			userid = toId(parts[1]);
			targetUser = Users.getExact(userid);
			avatar = parts.slice(2).join(',').trim();
			if (!this.can('lock') && !this.can('vip')) return false;
			if (toId(targetUser) !== toId(user) && !this.can('lock')) return this.sendReply("You must be staff to set other people their custom avatar.");

			if (!userid) return this.sendReply("You didn't specify a user.");
			if (Config.customavatars[userid]) return this.sendReply(userid + " already has a custom avatar.");

			hash = crypto.createHash('sha512').update(userid + '\u0000' + avatar).digest('hex').slice(0, 8);
			pendingAdds[hash] = {userid: userid, avatar: avatar};
			parts[1] = hash;

			if (!targetUser) {
				this.sendReply("Warning: " + userid + " is not online.");
				this.sendReply("If you want to continue, use: /customavatar forceset, " + hash);
				return;
			}
			Users.get(userid).popup('|modal||html|<font color="red"><strong>ATTENTION!</strong></font><br /> You have received a custom avatar from <b><font color="' + color(user.userid) + '">' + Tools.escapeHTML(user.name) + '</font></b>: <img src="' + avatar + '" width="80" height="80">');

		/* falls through */
		case 'forceset':
			if (user.avatarCooldown && !this.can('lock')) {
				let milliseconds = (Date.now() - user.avatarCooldown);
				let seconds = ((milliseconds / 1000) % 60);
				let remainingTime = Math.round(seconds - (5 * 60));
				if (((Date.now() - user.avatarCooldown) <= 5 * 60 * 1000)) return this.sendReply("You must wait " + (remainingTime - remainingTime * 2) + " seconds before setting another avatar.");
			}
			user.avatarCooldown = Date.now();

			hash = parts[1].trim();
			if (!pendingAdds[hash]) return this.sendReply("Invalid hash.");

			userid = pendingAdds[hash].userid;
			avatar = pendingAdds[hash].avatar;
			delete pendingAdds[hash];

			require('child_process').execFile('bash', ['-c', script, '-', avatar, './config/avatars/' + userid], function (e, out, err) {
				if (e) {
					this.sendReply(userid + "'s custom avatar failed to be set. Script output:");
					(out + err).split('\n').forEach(this.sendReply.bind(this));
					return;
				}

				reloadCustomAvatars();

				let targetUser = Users.getExact(userid);
				if (targetUser) targetUser.avatar = Config.customavatars[userid];

				let msg = '**' + user.name + " has set a custom avatar for " + targetUser + '**';
				Rooms.rooms.staff.add('|c|~Shop Alert|' + msg);
				this.sendReply(userid + "'s custom avatar has been set.");
				room.update();
			}.bind(this));
			break;

		case 'delete':
			userid = toId(parts[1]);
			if (!this.can('lock') && !this.can('vip')) return false;
			if (!Config.customavatars[userid]) return this.sendReply(userid + " does not have a custom avatar.");

			if (Config.customavatars[userid].toString().split('.').slice(0, -1).join('.') !== userid) {
				return this.sendReply(userid + "'s custom avatar (" + Config.customavatars[userid] + ") cannot be removed with this script.");
			}

			targetUser = Users.getExact(userid);
			if (targetUser) targetUser.avatar = 1;

			fs.unlink('./config/avatars/' + Config.customavatars[userid], function (e) {
				if (e) return this.sendReply(userid + "'s custom avatar (" + Config.customavatars[userid] + ") could not be removed: " + e.toString());

				delete Config.customavatars[userid];
				this.sendReply(userid + "'s custom avatar removed successfully");
			}.bind(this));
			break;

		case 'change':
			userid = toId(parts[1]);
			targetUser = Users.getExact(userid);
			avatar = parts.slice(2).join(',').trim();
			if (!this.can('lock') && !this.can('vip')) return false;
			if (!Config.customavatars[userid]) return this.sendReply(userid + " does not have a custom avatar.");
			this.parse('/customavatar delete, ' + targetUser);
			this.parse('/customavatar set, ' + targetUser + ', ' + avatar);
			break;

		case 'reload':
			if (!this.can('hotpatch')) return false;
			reloadCustomAvatars();
			Rooms.get('staff').add(Tools.escapeHTML(user.name) + " has reloaded all custom avatars.");
			for (let u in Users.users) {
				if (Config.customavatars[u]) Users.users[u].avatar = Config.customavatars[u];
			}
			this.sendReply("You have reloaded all custom avatars on the server.");
			break;

		default:
			return this.sendReply("Invalid command. Valid commands are `/customavatar set, user, avatar` and `/customavatar delete, user`.");
		}
	},
};
