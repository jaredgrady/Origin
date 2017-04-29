/**
 * Crash logger
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Logs crashes, sends an e-mail notification if you've set up
 * config.js to do that.
 *
 * @license MIT license
 */

'use strict';

const fs = require('fs');

const CRASH_EMAIL_THROTTLE = 5 * 60 * 1000; // 5 minutes

const logPath = require('path').resolve(__dirname, 'logs/errors.txt');
let lastCrashLog = 0;
let transport;

exports = module.exports = function (err, description, data) {
	const datenow = Date.now();

	let stack = (err.stack || err);
	if (data) {
		stack += '\n\nAdditional information:\n';
		for (let k in data) {
			stack += "  " + k + " = " + data[k] + "\n";
		}
	}

	console.error("\nCRASH: " + stack + "\n");
	let out = require('fs').createWriteStream(logPath, {'flags': 'a'});
	out.on("open", fd => {
		out.write("\n" + stack + "\n");
		out.end();
	}).on("error", err => {
		console.error("\nSUBCRASH: " + err.stack + "\n");
	});

	let crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(-1).join('\n').toString();
	let findAdditional = null;
	let findError = null;
	let additional;
	let error;
	let crashRepeat = false;
	for (let i = -1; findAdditional === null; i--) { // find additional information of crash
		crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(i).join('\n').toString();
		if (crashes.indexOf("Additional information") === 0) findAdditional = true;
		if (i <= -7) findAdditional = false;
		additional = crashes.split('\n').splice(i); // prevent it from printing on multiple lines
	}
	for (let k = 0; k < additional.length; k++) {
		additional[k] = " " + additional[k]; // add a space for readability
	}
	for (let j = -1; findError === null; j--) { // find the type of crash
		crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(j).join('\n').toString();
		if (crashes.indexOf("Error") === 0 || crashes.indexOf("TypeError") === 0 || crashes.indexOf("ReferenceError") === 0 || crashes.indexOf("SyntaxError") === 0) findError = true;
		if (j <= -22) findError = false;
		error = (fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(j))[0];
	}
	if (Db('recentcrash').get('recentCrash') === error && findError === true) crashRepeat = true;
	Db('recentcrash').set('recentCrash', error);
	if (crashRepeat === false) {
		Rooms.rooms.staff.add('|c|~Crash Alert|**Pokemon Showdown has crashed, more information (if any) is below.**');
		if (findError === true) Rooms.rooms.staff.add('|c|~Crash Alert|' + error); // add type of crash if any
		if (findAdditional === true) Rooms.rooms.staff.add('|c|~Crash Alert|' + additional); // add additonal information if any
	} else {
		Rooms.rooms.staff.add('|c|~Crash Alert|**Pokemon Showdown has crashed, it is the same crash as the one previous to this crash.**');
	}
	Rooms.rooms.staff.update();

	if (Config.crashguardemail && ((datenow - lastCrashLog) > CRASH_EMAIL_THROTTLE)) {
		lastCrashLog = datenow;
		try {
			if (!transport) transport = require('nodemailer').createTransport(Config.crashguardemail.options);
		} catch (e) {
			console.error("Could not start nodemailer - try `npm install` if you want to use it");
		}
		if (transport) {
			transport.sendMail({
				from: Config.crashguardemail.from,
				to: Config.crashguardemail.to,
				subject: Config.crashguardemail.subject,
				text: description + " crashed " + (exports.hadException ? "again " : "") + "with this stack trace:\n" + stack,
			}, err => {
				if (err) console.error("Error sending email: " + err);
			});
		}
	}

	exports.hadException = true;
	if (process.uptime() < 60 * 60) {
		// lock down the server
		return 'lockdown';
	}
};
