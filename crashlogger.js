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
	let indexi;
	let indexj;
	for (let i = -1; findAdditional === null; i--) {
		crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(i).join('\n').toString();
		if (crashes.indexOf("Additional information") === 0) findAdditional = true;
		if (i <= -6) findAdditional = false;
		indexi = i;
	}
	let additional = crashes.split('\n').splice(indexi); // prevent it from printing on multiple lines
	for (let j = -1; findError === null; j--) {
		crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(j).join('\n').toString();
		if (crashes.indexOf("Error") === 0 || crashes.indexOf("TypeError") === 0 || crashes.indexOf("ReferenceError") === 0 || crashes.indexOf("SyntaxError") === 0) findError = true;
		if (j <= -22) findError = false;
		indexj = j;
	}
	let error = (fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(indexj))[0];
	Rooms.rooms.staff.add('|c|~Crash Alert|Pokemon Showdown has crashed, Additional information is below.');
	if (findError === true) Rooms.rooms.staff.add('|c|~Crash Alert|' + error);
	if (findAdditional === true) Rooms.rooms.staff.add('|c|~Crash Alert|' + additional);
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
