// uat.js or User Agent Tracking, is to deal with user
// agents in an attempt to log a user's computer details to catch evading users.
// studies show that 1 in every 1500 computers have a unique UserAgent.
// By managing this data, it is possible to identify evading users.

// in Erica07's memory.
"use strict";

// Time (in hours) the server tracks locked useragents
// set to true to disable cleaning.
// the higher the userbase, the lower this number is
// faulty issues are only more probable when user count is above 1.5k users.
let LOCKED_USER_AGENT_TRACKING_TIME = 0;

// Time (in hours) past the lock where the server WILL auto shadow ban the evading user.
// set to true if you to always auto shadowban
let MAX_AUTO_SHADOWBAN_TIME = 0.5;

let lockedUserAgents = {};

function cleanUserAgents() {
	if (LOCKED_USER_AGENT_TRACKING_TIME === true) return;
	let now = Date.now();
	for (let ua in lockedUserAgents) {
		if (now - lockedUserAgents[ua].time >= 3600000 * LOCKED_USER_AGENT_TRACKING_TIME) {
			// delete it
			delete lockedUserAgents[ua];
		}
	}
}

let disable = function () {
	LOCKED_USER_AGENT_TRACKING_TIME = 0;
};

let lockUserAgent = function (user) {
	lockedUserAgents[user.useragent] = {
		time: Date.now(),
		userid: user.userid,
	};
};

let unlockUserAgent = function (userid) {
	for (let ua in lockedUserAgents) {
		if (lockedUserAgents[ua].userid === userid) {
			// delete it, no longer locked
			delete lockedUserAgents[ua];
		}
	}
};

let checkEvade = function (user) {
	cleanUserAgents();
	// no need to keep on spamming up staff room
	if (user.caughtEvading || user.locked) return false;
	let agent = user.useragent;

	if (agent in lockedUserAgents) {
		// get the time of lock
		let time = lockedUserAgents[agent].time;
		if (MAX_AUTO_SHADOWBAN_TIME === true || Date.now() - time <= MAX_AUTO_SHADOWBAN_TIME * 3600000) {
			Users.ShadowBan.addUser(user);
			Monitor.log("[SecretEvaderMonitor] " + user.name + " was automatically shadowbanned - evading alt of " + lockedUserAgents[agent].userid + ".");
			// update the times
			lockUserAgent(user);
		} else {
			// just warn staff room
			Monitor.log("[SecretEvaderMonitor] " + user.name + " suspected of being evading alt of " + lockedUserAgents[agent].userid + ".");
		}
		// mark user as caught
		user.caughtEvading = true;
	}
};

module.exports = {
	lock: lockUserAgent,
	unlock: unlockUserAgent,
	check: checkEvade,
	lockedUserAgents: lockedUserAgents,
	disable: disable,
};
