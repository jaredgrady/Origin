// jscs:disable
/* jshint ignore:start */

module.exports = hashColor;

function MD5(e) {
	function t(e, t) {
		var n, r, i, s, o;
		i = e & 2147483648;
		s = t & 2147483648;
		n = e & 1073741824;
		r = t & 1073741824;
		o = (e & 1073741823) + (t & 1073741823);
		return n & r ? o ^ 2147483648 ^ i ^ s : n | r ? o & 1073741824 ? o ^ 3221225472 ^ i ^ s : o ^ 1073741824 ^ i ^ s : o ^ i ^ s;
	}

	function n(e, n, r, i, s, o, u) {
		e = t(e, t(t(n & r | ~n & i, s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function r(e, n, r, i, s, o, u) {
		e = t(e, t(t(n & i | r & ~i, s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function i(e, n, r, i, s, o, u) {
		e = t(e, t(t(n ^ r ^ i, s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function s(e, n, r, i, s, o, u) {
		e = t(e, t(t(r ^ (n | ~i), s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function o(e) {
		var t = "",
			n = "",
			r;
		for (r = 0; r <= 3; r++) n = e >>> r * 8 & 255, n = "0" + n.toString(16), t += n.substr(n.length - 2, 2);
		return t
	}
	var u = [],
		a, f, l, c, h, p, d, v, e = function(e) {
			for (var e = e.replace(/\r\n/g, "\n"), t = "", n = 0; n < e.length; n++) {
				var r = e.charCodeAt(n);
				r < 128 ? t += String.fromCharCode(r) : (r > 127 && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(r & 63 | 128));
			}
			return t;
		}(e),
		u = function(e) {
			var t, n = e.length;
			t = n + 8;
			for (var r = ((t - t % 64) / 64 + 1) * 16, i = Array(r - 1), s = 0, o = 0; o < n;) t = (o - o % 4) / 4, s = o % 4 * 8, i[t] |= e.charCodeAt(o) << s, o++;
			i[(o - o % 4) / 4] |= 128 << o % 4 * 8;
			i[r - 2] = n << 3;
			i[r - 1] = n >>> 29;
			return i;
		}(e);
	h = 1732584193;
	p = 4023233417;
	d = 2562383102;
	v = 271733878;
	for (e = 0; e < u.length; e += 16) a = h, f = p, l = d, c = v, h = n(h, p, d, v, u[e + 0], 7, 3614090360), v = n(v, h, p, d, u[e + 1], 12, 3905402710), d = n(d, v, h, p, u[e + 2], 17, 606105819), p = n(p, d, v, h, u[e + 3], 22, 3250441966), h = n(h, p, d, v, u[e + 4], 7, 4118548399), v = n(v, h, p, d, u[e + 5], 12, 1200080426), d = n(d, v, h, p, u[e + 6], 17, 2821735955), p = n(p, d, v, h, u[e + 7], 22, 4249261313), h = n(h, p, d, v, u[e + 8], 7, 1770035416), v = n(v, h, p, d, u[e + 9], 12, 2336552879), d = n(d, v, h, p, u[e + 10], 17, 4294925233), p = n(p, d, v, h, u[e + 11], 22, 2304563134), h = n(h, p, d, v, u[e + 12], 7, 1804603682), v = n(v, h, p, d, u[e + 13], 12, 4254626195), d = n(d, v, h, p, u[e + 14], 17, 2792965006), p = n(p, d, v, h, u[e + 15], 22, 1236535329), h = r(h, p, d, v, u[e + 1], 5, 4129170786), v = r(v, h, p, d, u[e + 6], 9, 3225465664), d = r(d, v, h, p, u[e + 11], 14, 643717713), p = r(p, d, v, h, u[e + 0], 20, 3921069994), h = r(h, p, d, v, u[e + 5], 5, 3593408605), v = r(v, h, p, d, u[e + 10], 9, 38016083), d = r(d, v, h, p, u[e + 15], 14, 3634488961), p = r(p, d, v, h, u[e + 4], 20, 3889429448), h = r(h, p, d, v, u[e + 9], 5, 568446438), v = r(v, h, p, d, u[e + 14], 9, 3275163606), d = r(d, v, h, p, u[e + 3], 14, 4107603335), p = r(p, d, v, h, u[e + 8], 20, 1163531501), h = r(h, p, d, v, u[e + 13], 5, 2850285829), v = r(v, h, p, d, u[e + 2], 9, 4243563512), d = r(d, v, h, p, u[e + 7], 14, 1735328473), p = r(p, d, v, h, u[e + 12], 20, 2368359562), h = i(h, p, d, v, u[e + 5], 4, 4294588738), v = i(v, h, p, d, u[e + 8], 11, 2272392833), d = i(d, v, h, p, u[e + 11], 16, 1839030562), p = i(p, d, v, h, u[e + 14], 23, 4259657740), h = i(h, p, d, v, u[e + 1], 4, 2763975236), v = i(v, h, p, d, u[e + 4], 11, 1272893353), d = i(d, v, h, p, u[e + 7], 16, 4139469664), p = i(p, d, v, h, u[e + 10], 23, 3200236656), h = i(h, p, d, v, u[e + 13], 4, 681279174), v = i(v, h, p, d, u[e + 0], 11, 3936430074), d = i(d, v, h, p, u[e + 3], 16, 3572445317), p = i(p, d, v, h, u[e + 6], 23, 76029189), h = i(h, p, d, v, u[e + 9], 4, 3654602809), v = i(v, h, p, d, u[e + 12], 11, 3873151461), d = i(d, v, h, p, u[e + 15], 16, 530742520), p = i(p, d, v, h, u[e + 2], 23, 3299628645), h = s(h, p, d, v, u[e + 0], 6, 4096336452), v = s(v, h, p, d, u[e + 7], 10, 1126891415), d = s(d, v, h, p, u[e + 14], 15, 2878612391), p = s(p, d, v, h, u[e + 5], 21, 4237533241), h = s(h, p, d, v, u[e + 12], 6, 1700485571), v = s(v, h, p, d, u[e + 3], 10, 2399980690), d = s(d, v, h, p, u[e + 10], 15, 4293915773), p = s(p, d, v, h, u[e + 1], 21, 2240044497), h = s(h, p, d, v, u[e + 8], 6, 1873313359), v = s(v, h, p, d, u[e + 15], 10, 4264355552), d = s(d, v, h, p, u[e + 6], 15, 2734768916), p = s(p, d, v, h, u[e + 13], 21, 1309151649), h = s(h, p, d, v, u[e + 4], 6, 4149444226), v = s(v, h, p, d, u[e + 11], 10, 3174756917), d = s(d, v, h, p, u[e + 2], 15, 718787259), p = s(p, d, v, h, u[e + 9], 21, 3951481745), h = t(h, a), p = t(p, f), d = t(d, l), v = t(v, c);
	return (o(h) + o(p) + o(d) + o(v)).toLowerCase();
}

function hslToRgb(e, t, n) {
	var r, i, s, o, u, a;
	if (!isFinite(e)) e = 0;
	if (!isFinite(t)) t = 0;
	if (!isFinite(n)) n = 0;
	e /= 60;
	if (e < 0) e = 6 - -e % 6;
	e %= 6;
	t = Math.max(0, Math.min(1, t / 100));
	n = Math.max(0, Math.min(1, n / 100));
	u = (1 - Math.abs(2 * n - 1)) * t;
	a = u * (1 - Math.abs(e % 2 - 1));
	if (e < 1) {
		r = u;
		i = a;
		s = 0;
	} else if (e < 2) {
		r = a;
		i = u;
		s = 0;
	} else if (e < 3) {
		r = 0;
		i = u;
		s = a;
	} else if (e < 4) {
		r = 0;
		i = a;
		s = u;
	} else if (e < 5) {
		r = a;
		i = 0;
		s = u;
	} else {
		r = u;
		i = 0;
		s = a;
	}
	o = n - u / 2;
	r = Math.round((r + o) * 255);
	i = Math.round((i + o) * 255);
	s = Math.round((s + o) * 255);
	return {
		r: r,
		g: i,
		b: s
	};
}

function rgbToHex(e, t, n) {
	return toHex(e) + toHex(t) + toHex(n);
}

function toHex(e) {
	if (e == null) return "00";
	e = parseInt(e);
	if (e == 0 || isNaN(e)) return "00";
	e = Math.max(0, e);
	e = Math.min(e, 255);
	e = Math.round(e);
	return "0123456789ABCDEF".charAt((e - e % 16) / 16) + "0123456789ABCDEF".charAt(e % 16);
}

var colorCache = {};

function hashColor(e) {
	if (colorCache[e]) return colorCache[e];
	var t = MD5(e);
	var n = parseInt(t.substr(4, 4), 16) % 360;
	var r = parseInt(t.substr(0, 4), 16) % 50 + 50;
	var i = parseInt(t.substr(8, 4), 16) % 20 + 25;
	var s = hslToRgb(n, r, i);
	switch (toId(e)) {
		case 'panpawn':
			return colorCache[e] = '#DA9D01';
			break;
		case 'austin':
			return colorCache[e] = '#0250C5';
			break;
		default:
			colorCache[e] = "#" + rgbToHex(s.r, s.g, s.b);
			return colorCache[e];
	}
}
function unescapeHTML(str) {
		str = (str?''+str:'');
		return str.replace(/&quot;/g, '"').replace(/&gt;/g, '>').
			replace(/&lt;/g, '<').replace(/&amp;/g, '&');
}
var colors = [{name: 'red', value: 'red'}, {name: 'blue', value: 'blue'}, {name: 'green', value: 'green'}, {name: 'orange', value: 'orange'}, {name: 'yellow', value: '#D4DF01'}, {name:'pink', value: '#f556ff'}]

colors.forEach(function (color) {
  var r = new RegExp("\b"+color.name+"?\[([^\]<]+)\]", "ig")
  message = message.replace(r, '<font color="'+color.value+'">$1</font>')
})

function parseMessage(message) {
	message = message.replace(/\`\`([^< ](?:[^<`]*?[^< ])?)\`\`/g,'<code>$1</code>'); // ``text``
	message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<s>$1</s>'); // ~~text~~
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // __text__
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>'); // **text**
	message = message.replace(/\bred?\[([^\]<]+)\]/ig,'<font color="red">$1</font>'); // red[text]
	message = message.replace(/\bblue?\[([^\]<]+)\]/ig,'<font color="blue">$1</font>'); // blue[text]
	message = message.replace(/\bgreen?\[([^\]<]+)\]/ig,'<font color="green">$1</font>'); // green[text]
	message = message.replace(/\borange?\[([^\]<]+)\]/ig,'<font color="orange">$1</font>'); // orange[text]
	message = message.replace(/\bpink?\[([^\]<]+)\]/ig,'<font color="#f556ff">$1</font>'); // pink[text]
	message = message.replace(/\byellow?\[([^\]<]+)\]/ig,'<font color="#D4DF01">$1</font>'); // yellow[text]
	message = message.replace(/\broom?\[([^\]<]+)\]/ig, function(p0, p1) {
		return '<button class="astext" name="joinRoom" value="' + toId(p1) + '"><font color="blue"><u>' + p1 + '</u></font></button>';
	}); // room[text]
	message = message.replace(/\brainbow?\[([^\]<]+)\]/ig, function(p0, p1) {
		return rainbowText(p1);
	}); // rainbow[text]
	message = message.replace(/\bfelicolors?\[([^\]<]+)\]/ig, function(p0, p1) {
		return feliColors(p1);
	}); // felicolors[text]


	var spoilerIndex = message.toLowerCase().indexOf('spoiler:');
	if (spoilerIndex < 0) spoilerIndex = message.toLowerCase().indexOf('spoilers:');
	if (spoilerIndex >= 0) {
		var offset = spoilerIndex+8;
		if (message.charAt(offset) === ':') offset++;
		if (message.charAt(offset) === ' ') offset++;
		message = message.substr(0, offset)+'<span class="spoiler">'+message.substr(offset)+'</span>';
	}

	// google [blah]
	// google[blah]
	//   Google search for 'blah'
	message = message.replace(/\bgoogle ?\[([^\]<]+)\]/ig, function(p0, p1) {
		p1 = Tools.escapeHTML(encodeURIComponent(unescapeHTML(p1)));
		return '<a href="http://www.google.com/search?ie=UTF-8&q=' + p1 +
			'" target="_blank">' + p0 + '</a>';
	});
	// gl [blah]
	// gl[blah]
	//   Google search for 'blah' and visit the first result ("I'm feeling lucky")
	message = message.replace(/\bgl ?\[([^\]<]+)\]/ig, function(p0, p1) {
		p1 = Tools.escapeHTML(encodeURIComponent(unescapeHTML(p1)));
		return '<a href="http://www.google.com/search?ie=UTF-8&btnI&q=' + p1 +
			'" target="_blank">' + p0 + '</a>';
	});
	// wiki [blah]
	//   Search Wikipedia for 'blah' (and visit the article for 'blah' if it exists)
	message = message.replace(/\bwiki ?\[([^\]<]+)\]/ig, function(p0, p1) {
		p1 = Tools.escapeHTML(encodeURIComponent(unescapeHTML(p1)));
		return '<a href="http://en.wikipedia.org/w/index.php?title=Special:Search&search=' +
			p1 + '" target="_blank">' + p0 + '</a>';
	});
	// [[blah]]
	//   Short form of gl[blah]
	message = message.replace(/\[\[([^< ](?:[^<`]*?[^< ])?)\]\]/ig, function(p0, p1) {
		var q = Tools.escapeHTML(encodeURIComponent(unescapeHTML(p1)));
		return '<a href="http://www.google.com/search?ie=UTF-8&btnI&q=' + q +
			'" target="_blank">' + p1 +'</a>';
	});

	message = parseLink(message);
	return message;
}

	customcolor: 'changecolor',
	customcolour: 'changecolor',
	changecolour: 'changecolor',
	changecolor: function(target, room, user) {
		if (!this.can('changecolor') && !user.vip && user.userid !== 'jd') return this.sendReply('/changecolor - Access denied.');
		if (!target) return this.sendReply('Usage: /changecolor [name/off]');
		target = toId(target);
		if (target == 'off') {
			delete user.chat;
			delete user.processChatQueue;
			return this.sendReply('Your custom colour has been removed.');
		}
		target = hashColor(target);
		THROTTLE_DELAY = 600;
		THROTTLE_BUFFER_LIMIT = 6;
		user.chat = function (message, room, connection) {
		 	var now = new Date().getTime();
			this.lastActive = now;

		 	if (message.substr(0,16) === '/cmd userdetails') {
				// certain commands are exempt from the queue
				Monitor.activeIp = connection.ip;
				room.chat(this, message, connection);
				Monitor.activeIp = null;
				return false; // but end the loop here
			}

			if (this.chatQueueTimeout) {
				if (!this.chatQueue) this.chatQueue = []; // this should never happen
				if (this.chatQueue.length >= THROTTLE_BUFFER_LIMIT-1) {
					connection.sendTo(room, '|uhtml|' +
						"<strong class=\"message-throttle-notice\">Your message was not sent because you've been typing too quickly.</strong>"
						);
					return false;
				} else {
					this.chatQueue.push([message, room, connection]);
				}
			} else if (now < this.lastChatMessage + THROTTLE_DELAY) {
				this.chatQueue = [[message, room, connection]];
				this.chatQueueTimeout = setTimeout(
					this.processChatQueue.bind(this), THROTTLE_DELAY);
			} else {
				this.lastChatMessage = now;
				this.lastChatText = message;
				Monitor.activeIp = connection.ip;
				if (message.substr(0,1) == '/' || message.substr(0,2) == '>>' || message.substr(0,1) == '!') {
					room.chat(this, message, connection);
				} else {
					message = CommandParser.parse(message, room, connection.user, connection);
					if (message) {
						message = Tools.escapeHTML(message);
						message = parseMessage(message);

						if (Users.ShadowBan.checkBanned(user)) {
							Users.ShadowBan.addMessage(user, "To " + this.id, message);
							connection.sendTo(this, '<font color=#4249F8>'+connection.user.getIdentity(room).substr(0,1)+'</font>'+'<button class="astext" name="parseCommand" value="/user '+connection.user.name+'">' +
								'<b><font color="'+target+'">'+Tools.escapeHTML(connection.user.name)+':</font></b></button> ' + message);
						} else {
							room.addRaw('<font color=#4249F8>'+connection.user.getIdentity(room).substr(0,1)+'</font>'+'<button class="astext" name="parseCommand" value="/user '+connection.user.name+'">' +
								'<b><font color="'+target+'">'+Tools.escapeHTML(connection.user.name)+':</font></b></button> ' + message);
							room.update();
						}
					}
				}
				Monitor.activeIp = null;
			}
		};

		user.processChatQueue = function () {
			if (!this.chatQueue) return; // this should never happen
			var toChat = this.chatQueue.shift();
			Monitor.activeIp = toChat[2].ip;
			var message = toChat[0];
			var room = toChat[1];
			var connection = toChat[2];
			if (message.substr(0,1) == '/' || message.substr(0,2) == '>>' || message.substr(0,1) == '!') {
					room.chat(this, message, connection);
			} else {
				message = CommandParser.parse(message, room, connection.user, connection);
				if (message) {
					message = Tools.escapeHTML(message);
					message = parseMessage(message);
					room.addRaw('<font color=#4249F8>'+connection.user.getIdentity(room).substr(0,1)+'</font>'+'<button class="astext" name="parseCommand" value="/user '+connection.user.name+'">' +
						'<b><font color="'+target+'">'+Tools.escapeHTML(connection.user.name)+':</font></b></button> ' + message);
					room.update();
				}
			}
			Monitor.activeIp = null;

			if (this.chatQueue && this.chatQueue.length) {
				this.chatQueueTimeout = setTimeout(
					this.processChatQueue.bind(this), THROTTLE_DELAY);
			} else {
				this.chatQueue = null;
				this.chatQueueTimeout = null;
			}
		};
		return this.sendReply('|uhtml|Your colour has been set to <font color='+target+'>'+target+'.</font>');
	}
