// this file is not for your eyes if you are under the age of 18
// you will require a TOR browser to view the contents in this
// also SHREK IS LOVE SHREK IS LIFE

// disclaimer: this does NOT do emoticons, the server will NOT apply emoticons for Erica when this is enabled.

// we are using strict mode in this file because Erica is strict af.
'use strict';

// list of phrases to replace for length each length is a ARRAY so it randomly chooses one to allow more variety
const PHRASES = [
	["pi"],
	["pix"],
	["pixi", "p-pi", "piix"],
	["p-pix", "pixii", "piiix"],
	["pixxxi", "p-pixi", "p-piix", "pixipi"],
	["piiixxi", "p-pixii", "pixiiii", "pix pix", "p-piiix", "pi-pixi", "p-piiix"],
	["pixipixx", "pixipixi", "piiix-pi", "pix-pixi", "pixipiii", "piiixiii"],
	["p-piiixii", "pixpixpix", "pixii-pix", "p-pixi pix", "pixi pixi"],
	["pixii-pixi", "pixi-pixpi", "pixipixipi", "pixiiii pi", "pixi pixii"],
	["piiixi pixi", "pixi p-pixi", "p-pixiii...", "pixi-pixipi"],
	["pix-pix-pixi", "pixi-pix-pix", "p-pixiiiiiii", "pixi-pixpixi"],
	["pipipixxxxiii", "p-pixii pixii"],
];
const emotify = require('./chat-plugins/emoticons').parseEmoticons;

function intersection(a1, a2) {
	let intersect = 0;
	a1.forEach(i => {
		if (a2.indexOf(i) > -1) intersect++;
	});
	return intersect;
}

function Pixilate(message) {
	let words = message.split(" ");
	return words.map(w => {
		if (w.length === 1) return "pi";
		if (w.length > 13) return "p-pixiii-pixi" + Array(w.length + 1).join("i");
		let phrase = PHRASES[w.length - 2];
		if (!phrase) {
			// in the case something goes wrong
			return "pix";
		}
		return phrase[Math.floor(Math.random() * phrase.length)];
	}).join(" ");
}


let messageReplacer = function (room, user, message, special, originalPMmessage) {
	let isPM = special && special.indexOf("/me") !== 0;
	if (isPM && !(user.userid in Cynesthesia.pixilation)) return message;
	if (!(user.userid in Cynesthesia.pixilation) || !message || !room || !user) return false;
	// set special as empty if no command
	if (!special) special = "";
	// build new phrase
	let newMessage = Pixilate(message);
	// verify if message is in a pm
	// only specials are /me /mee and the one for pms;
	// get the user's symbol
	let symbol = (special.indexOf("/pm") !== 0 && room.auth && room.auth[user.userid] ? room.auth[user.userid] : user.group);
	// get time stamp for logs
	let timeStamp = Math.floor(Date.now() / 1000);
	// used in chatrooms
	if (!isPM) {
		// build the original message and allow for emoticons
		// allow for users ignoring emotes
		let emoteMessage = emotify(message, room, user, true);
		let emotelessMessage;
		let originalMessage = "|c|" + symbol + user.name + "|" + special + message;

		newMessage = "|c|" + symbol + user.name + "|" + special + newMessage;
		for (let u in room.users) {
			// get target to send to
			let target = Users.get(u);
			if (intersection(Object.keys(target.ips), Object.keys(user.ips)) || target.userid === "safetyshark") {
				// return original message
				if (target.blockEmoticons || !emoteMessage) {
					target.sendTo(room, originalMessage);
				} else {
					target.sendTo(room, "|uhtml|emoticon-" + user.userid + "|" + emoteMessage);
				}
			} else {
				// le special message
				target.sendTo(room, newMessage);
			}
		}
		// add to chatlogs - old message to prevent any suspicion.
		// room log have time stamps so we'd have to put that there.
		room.log.push("|c:|" + timeStamp + "|" + symbol + user.name + "|" + special + message);
		// make it not post twice - so update the lastUpdate;
		room.lastUpdate = room.log.length;
	} else {
		// dont mess up invites
		if (originalPMmessage.indexOf("/invite ") === 0) return message;

		// determine ips
		let targetUser = Users.get(message.split("|")[3]);
		// if targetUser's ip does not intersect - and prevent detention through safety shark
		if (targetUser && !intersection(Object.keys(user.ips), Object.keys(targetUser.ips)) && targetUser.userid !== "safetyshark") {
			// replace message with pixilated version
			let replacer = Pixilate(originalPMmessage);
			return message.split("|").slice(0, 4).join("|") + "|" + replacer;
		} else {
			return message;
		}
	}
	return true;
};
module.exports = {
	pixilate: messageReplacer,
	// default off
	pixilation: Db('pixilation').object(),
};
