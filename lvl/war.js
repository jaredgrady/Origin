/*********************************************************
 * Functions
 *********************************************************/
 
var wars = {};
exports.wars = wars;
var tourTiers = {};
tourTiers['multitier'] = "Multi-Tier";
for (var i in Tools.data.Formats) {
	if (Tools.data.Formats[i].effectType == 'Format' && Tools.data.Formats[i].challengeShow) {
		tourTiers[toId(i)] = Tools.data.Formats[i].name;
	}
}
exports.tourTiers = tourTiers;

exports.getTours = function () {
	if (!wars)
		return 'There is no LvL happening.';
	var tourList = '';
	for (var w in wars) {
		if (wars[w].tourRound === 0) {
			tourList += '<a class="ilink" href="/' + w + '"> format of LvL ' + wars[w].format + ' between  ' + wars[w].teamA + ' y ' + wars[w].teamB + ' in the room ' + w + '</a> <br />';
		} else {
			tourList += '<a class="ilink" href="/' + w + '"> format of LvL ' + wars[w].format + ' between  ' + wars[w].teamA + ' y ' + wars[w].teamB + ' in the room ' + w + ' (started)</a> <br />';
		}
	}
	if (!tourList || tourList === '')
		return 'There is no LvL happening.';
	return tourList;
};

exports.findTourFromMatchup = function (p1, p2, format, battleLink) {
	p1 = toId(p1);
	p2 = toId(p2);
	for (var i in wars) {
		if (wars[i].tourRound === 0) continue;
		if (toId(wars[i].format) !== toId(format) && toId(wars[i].format) !== 'multitier') continue;
		for (var j in wars[i].matchups) {
			if (wars[i].matchups[j].result === 1 && battleLink !== wars[i].matchups[j].battleLink) continue;
			if (wars[i].matchups[j].result > 1) continue;
			if (toId(wars[i].matchups[j].from) === p1 && toId(wars[i].matchups[j].to) === p2) return {tourId: i, matchupId: j};
			if (toId(wars[i].matchups[j].from) === p2 && toId(wars[i].matchups[j].to) === p1) return {tourId: i, matchupId: j};
		}
	}
	return false;
};

exports.findMatchup = function (room, user) {
	var roomId = toId(room);
	var userId = toId(user);
	if (!wars[roomId]) return false;
	for (var i in wars[roomId].matchups) {
		if (userId === toId(wars[roomId].matchups[i].from) || userId === toId(wars[roomId].matchups[i].to)) {
			return i;
		}
	}
	return false;
};

exports.findClan = function (clan) {
	var clanId = toId(clan);
	if (!wars) return false;
	for (var i in wars) {
		if (toId(wars[i].teamA) === clanId || toId(wars[i].teamB) === clanId) return i;
	}
	return false;
};

exports.getTourData = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return false;
	var data = {
		teamA: wars[roomId].teamA,
		teamB: wars[roomId].teamB,
		authA: wars[roomId].authA,
		authB: wars[roomId].authB,
		matchups: wars[roomId].matchups,
		byes: wars[roomId].byes,
		teamWithByes: wars[roomId].teamWithByes,
		teamAMembers: wars[roomId].teamAMembers,
		teamBMembers: wars[roomId].teamBMembers,
		format: wars[roomId].format,
		size: wars[roomId].size,
		type: wars[roomId].type,
		tourRound: wars[roomId].tourRound,
	};
	return data;
};

exports.getFreePlaces = function (room) {
	var roomId = toId(room);
	if (!wars[roomId])
		return 0;
	var membersA = wars[roomId].size;
	var membersB = wars[roomId].size;
	var registeredA = Object.keys(wars[roomId].teamAMembers);
	var registeredB = Object.keys(wars[roomId].teamBMembers);
	if (registeredA) {
		membersA = wars[roomId].size - registeredA.length;
	}
	if (registeredB) {
		membersB = wars[roomId].size - registeredB.length;
	}
	return membersA + membersB;
};

exports.getAvailableMembers = function (avaliableMembers) {
	if (!avaliableMembers) return false;
	return Object.keys(avaliableMembers);
};

exports.newTeamTour = function (room, type, format, size, teamA, teamB, authA, authB) {
	var roomId = toId(room);
	wars[roomId] = {
		teamA: teamA,
		teamB: teamB,
		authA: authA,
		authB: authB,
		matchups: {},
		byes: {},
		teamWithByes: false,
		teamAMembers: {},
		teamBMembers: {},
		format: format,
		size: parseInt(size),
		type: toId(type),
		tourRound: 0,
	};
	return true;
};

exports.joinable = function(room, user) {
	var roomId = toId(room);
	var userId = toId(user);
	var playersA = wars[roomId].teamAMembers;
	var playersB = wars[roomId].teamBMembers;
	if (wars[roomId].teamAMembers[userId] || wars[roomId].teamBMembers[userId]) return false;
	if (!Config.tourAllowAlts){
		for (var i in playersA) {
			for (var j in Users.get(userId).prevNames) {
				if (toId(i) == toId(j)) return false;
			}
		}
		for (var i in playersB) {
			for (var j in Users.get(userId).prevNames) {
				if (toId(i) == toId(j)) return false;
			}
		}
	}
	return true;
};

exports.joinTeamTour = function (room, user, team) {
	var roomId = toId(room);
	var userId = toId(user);
	if (!wars[roomId]) return 'There is no LvL in this room.';
	if (wars[roomId].tourRound !== 0) return 'The LvL has already started. You cannot join.';
	if (wars[roomId].type === 'lineups') return 'Format should be standard.';
	if (!exports.joinable(room, user)) return 'User is already enrolled in this LvL. To play for another team you must leave first.';
	var registeredA = Object.keys(wars[roomId].teamAMembers);
	var registeredB = Object.keys(wars[roomId].teamBMembers);
	if (toId(team) === toId(wars[roomId].teamA) && registeredA.length < wars[roomId].size) {
		wars[roomId].teamAMembers[userId] = 1;
		return false;
	}
	if (toId(team) === toId(wars[roomId].teamB) && registeredB.length < wars[roomId].size) {
		wars[roomId].teamBMembers[userId] = 1;
		return false;
	}
	return 'No space on the team left in this LvL.';
};

exports.regParticipants = function (room, user, source) {
	var roomId = toId(room);
	var userId = toId(user);
	var params = source.split(',');
	if (!wars[roomId]) return 'There is no LvL in this room.';
	if (wars[roomId].tourRound !== 0) return 'The LvL has already begun.';
	if (wars[roomId].type !== 'lineups') return 'Format should be standard.';
	var lineup = {};
	var oldLineup = {};
	if (params.length < (wars[roomId].size + 1)) return 'You must set the whole lineup for this LvL.';
	var targetUser;
	var targetClan;
	if (toId(user) === toId(wars[roomId].authA)) {
		oldLineup = wars[roomId].teamBMembers;
		targetClan = toId(wars[roomId].teamA);
	}
	if (toId(user) === toId(wars[roomId].authB)) {
		oldLineup = wars[roomId].teamAMembers;
		targetClan = toId(wars[roomId].teamB);
	}
	for (var n = 0; n < wars[roomId].size; ++n) {
		targetUser = Users.get(params[n + 1]);
		if (!targetUser || !targetUser.connected) return toId(params[n + 1]) + ' does not exist or is unavailable. All users should be present.';
		if (oldLineup[toId(targetUser.name)] || lineup[toId(targetUser.name)]) return toId(params[n + 1]) + ' was on another team.';
		//if (!War.isInClan(targetUser.name, targetClan)) return toId(params[n + 1]) + ' does not belong to your league.';
		lineup[toId(targetUser.name)] = 1;
	}
	if (userId === toId(wars[roomId].authA)) wars[roomId].teamAMembers = lineup;
	if (userId === toId(wars[roomId].authB)) wars[roomId].teamBMembers = lineup;
	return false;
};

exports.isInClan = function (user, clan) {
	if (!Clans.getProfile(toId(clan))) return false;
	clanRoom = Rooms.get(Clans.clans[toId(clan)].sala);
	if (!clanRoom || !clanRoom.leagueauth || !clanRoom.leagueauth[toId(user)]) return false;
	return true;
};

exports.sizeTeamTour = function (room, size) {
	var roomId = toId(room);
	size = parseInt(size);
	if (size < 3) return 'The size of this LvL is invalid.';
	if (!wars[roomId]) return 'There is no LvL in this room.';
	if (wars[roomId].tourRound !== 0) return 'The Lvl has already started. It cannot be resized';
	var registeredA = Object.keys(wars[roomId].teamAMembers);
	var registeredB = Object.keys(wars[roomId].teamBMembers);
	if (registeredA.length <= size && registeredB.length <= size) {
		wars[roomId].size = size;
		return false;
	}
	return 'There are too many users to resize the LvL.';
};

exports.setAuth = function (room, authA, authB) {
	var roomId = toId(room);
	if (!wars[roomId]) return 'There is no LvL in this room.';
	if (wars[roomId].type !== 'lineups') return 'Format should be standard.';
	wars[roomId].authA = authA;
	wars[roomId].authB = authB;  
	return false;
};

exports.leaveTeamTour = function (room, user) {
	var roomId = toId(room);
	var userId = toId(user);
	if (!wars[roomId]) return 'There is no LvL in this room.';
	if (!wars[roomId].teamAMembers[userId] && !wars[roomId].teamBMembers[userId]) return 'You are not registered for this.';
	if (wars[roomId].tourRound !== 0) {
		if (!exports.dqTeamTour(room, user, 'cmd')) return 'Already been disqualified or passed to the next round.';
		Rooms.rooms[roomId].addRaw('<b>' + user + '</b> has been auto-disqualified from the war.');
		if (exports.isRoundEnded(roomId)) {
			exports.autoEnd(roomId);
		}
		return 'You have left the war.';
	} else {
		if (wars[roomId].type === 'lineups') return 'The teams must be registered by the leaders of the league.';
		if (wars[roomId].teamAMembers[userId]) delete wars[roomId].teamAMembers[userId];
		if (wars[roomId].teamBMembers[userId]) delete wars[roomId].teamBMembers[userId];
	}
	return false;
};

exports.startTeamTour = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return false;
	if (wars[roomId].type === 'lineups') {
		var teamAMembers = exports.getAvailableMembers(wars[roomId].teamAMembers);
		var teamBMembers = exports.getAvailableMembers(wars[roomId].teamBMembers);
	} else {
		var teamAMembers = exports.getAvailableMembers(wars[roomId].teamAMembers).randomize();
		var teamBMembers = exports.getAvailableMembers(wars[roomId].teamBMembers).randomize();
	}
	var memberCount = Math.min(teamAMembers.length, teamBMembers.length);
	var matchups = {};
	for (var m = 0; m < memberCount; ++m) {
		matchups[toId(teamAMembers[m])] = {from: teamAMembers[m], to: teamBMembers[m], battleLink: '', result: 0};
	}
	wars[roomId].matchups = matchups;
	wars[roomId].tourRound = 1;
	return true;
};

exports.newRound = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return false;
	var avaliableMembersA = [];
	var avaliableMembersB = [];
	for (var m in wars[roomId].matchups) {
		if (wars[roomId].matchups[m].result === 2) {
			avaliableMembersA.push(toId(wars[roomId].matchups[m].from));
		} else if (wars[roomId].matchups[m].result === 3) {
			avaliableMembersB.push(toId(wars[roomId].matchups[m].to));
		}
	}
	for (var s in wars[roomId].byes) {
		if (toId(wars[roomId].teamWithByes) === toId(wars[roomId].teamA)) {
			avaliableMembersA.push(toId(s));
		} else {
			avaliableMembersB.push(toId(s));
		}
	}
	if (avaliableMembersA) avaliableMembersA = avaliableMembersA.randomize();
	if (avaliableMembersB) avaliableMembersB = avaliableMembersB.randomize();
	var memberCount = Math.min(avaliableMembersA.length, avaliableMembersB.length);
	var totalMemberCount = Math.max(avaliableMembersA.length, avaliableMembersB.length);
	var matchups = {};
	for (var m = 0; m < memberCount; ++m) {
		matchups[toId(avaliableMembersA[m])] = {from: avaliableMembersA[m], to: avaliableMembersB[m], battleLink: '', result: 0};
	}
	var byes = {};
	if (avaliableMembersA.length > avaliableMembersB.length) {
		wars[roomId].teamWithByes = wars[roomId].teamA;
	} else if (avaliableMembersA.length < avaliableMembersB.length) {
		wars[roomId].teamWithByes = wars[roomId].teamB;
	} else {
		wars[roomId].teamWithByes = false;
	}
	for (var m = memberCount; m < totalMemberCount; ++m) {
		if (avaliableMembersA.length > avaliableMembersB.length) byes[toId(avaliableMembersA[m])] = 1;
		if (avaliableMembersA.length < avaliableMembersB.length) byes[toId(avaliableMembersB[m])] = 1;
	}
	wars[roomId].matchups = matchups;
	wars[roomId].byes = byes;
	++wars[roomId].tourRound;
	Rooms.rooms[roomId].addRaw(exports.viewTourStatus(roomId));
	
};

exports.autoEnd = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return false;
	var scoreA = 0;
	var scoreB = 0;
	var nMatchups = 0;
	var nByes = 0;
	for (var b in wars[roomId].matchups) {
		++nMatchups;
		if (wars[roomId].matchups[b].result === 2) {
			++scoreA;
		} else if (wars[roomId].matchups[b].result === 3) {
			++scoreB;
		}
	}
	if (wars[roomId].type === 'total') {
		for (var f in wars[roomId].byes) {
			++nByes;
		}
		if (scoreA === 0 || scoreB === 0) {
			if (scoreA === 0) {
				if (toId(wars[roomId].teamWithByes) === toId(wars[roomId].teamA)) {
					exports.newRound(roomId);
					return;
				} 
				scoreB = wars[roomId].size;
				scoreA = wars[roomId].size - nMatchups - nByes;
			} else if (scoreB === 0) {
				if (toId(wars[roomId].teamWithByes) === toId(wars[roomId].teamB)) {
					exports.newRound(roomId);
					return;
				}
				scoreA = wars[roomId].size;
				scoreB = wars[roomId].size - nMatchups - nByes;
			}
		} else {
			exports.newRound(roomId);
			return;
		}
	}
	if (scoreA === scoreB && wars[roomId].type === 'lineups') {
		var matchups = {};
		matchups[toId(wars[roomId].authA)] = {from: wars[roomId].authA, to: wars[roomId].authB, battleLink: '', result: 0};
		wars[roomId].matchups = matchups;
		wars[roomId].teamAMembers = {};
		wars[roomId].teamAMembers[toId(wars[roomId].authA)] = 1;
		wars[roomId].teamBMembers = {};
		wars[roomId].teamBMembers[toId(wars[roomId].authB)] = 1;
		++wars[roomId].tourRound;
		Rooms.rooms[roomId].addRaw(exports.viewTourStatus(roomId));
		return;
	}
	//raw of end
	var htmlEndTour = '';
	if (scoreA > scoreB) {
		htmlEndTour = '<br><hr /><h2><font color="green"><center>Congrats <font color="black">' + Clans.clans[toId(wars[roomId].teamA)].compname + '</font>!</center></font></h2><h2><font color="green"><center>You won the LvL in the format ' + wars[roomId].format + ' against <font color="black">' + Clans.clans[toId(wars[roomId].teamB)].compname + "</font>!</center></font></h2><hr />";
	} else if (scoreA < scoreB) {
		htmlEndTour = '<br><hr /><h2><font color="green"><center>Congrats <font color="black">' + Clans.clans[toId(wars[roomId].teamB)].compname + '</font>!</center></font></h2><h2><font color="green"><center>You won the LvL in the format' + wars[roomId].format + ' against <font color="black">' + Clans.clans[toId(wars[roomId].teamA)].compname + "</font>!</center></font></h2><hr />";
	} else if (scoreA === scoreB) {
		htmlEndTour = '<br><hr /><h2><font color="green"><center>The Lvl in the format ' + wars[roomId].format + ' between <font color="black">' + wars[roomId].teamA + '</font> and <font color="black">' + wars[roomId].teamB + '</font> has ended in a draw!</center></font></h2><hr />';
	}
	Rooms.rooms[roomId].addRaw(exports.viewTourStatus(roomId)+ htmlEndTour);
	var addpoints = Clans.setWarResult(wars[roomId].teamA, wars[roomId].teamB, scoreA, scoreB);
	Clans.logWarData(wars[roomId].teamA, wars[roomId].teamB, scoreA, scoreB, wars[roomId].type, wars[roomId].format, addpoints['A'], wars[roomId].tourRound);
	Clans.logWarData(wars[roomId].teamB, wars[roomId].teamA, scoreB, scoreA, wars[roomId].type, wars[roomId].format, addpoints['B'], wars[roomId].tourRound);
	exports.endTeamTour(roomId);
};

exports.isRoundEnded = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return false;

	for (var m in wars[roomId].matchups)
		if (wars[roomId].matchups[m].result < 2)
			return false;
	return true;
};

exports.setActiveMatchup = function (room, matchup, battlelink) {
	var roomId = toId(room);
	var matchupId = toId(matchup);
	if (!wars[roomId] || !wars[roomId].matchups[matchupId]) return false;
	wars[roomId].matchups[matchupId].result = 1;
	wars[roomId].matchups[matchupId].battleLink = battlelink;
	return true;
};

exports.dqTeamTour = function (room, user, forced) {
	var roomId = toId(room);
	var userId = toId(user);
	if (!wars[roomId]) return false;
	for (var i in wars[roomId].matchups) {
		if (userId === toId(wars[roomId].matchups[i].from) || userId === toId(wars[roomId].matchups[i].to)) {
			if (wars[roomId].matchups[i].result < 2) {
				if (userId === toId(wars[roomId].matchups[i].from)) wars[roomId].matchups[i].result = 3; 
				if (userId === toId(wars[roomId].matchups[i].to)) wars[roomId].matchups[i].result = 2;
				if (forced !== 'cmd' && exports.isRoundEnded(roomId)) {
					exports.autoEnd(roomId);
				}
				return true;
			}
		}
	}
	return false;
};

exports.invalidate = function (room, matchup) {
	var roomId = toId(room);
	var matchupId = toId(matchup);
	if (!wars[roomId] || !wars[roomId].matchups[matchupId]) return false;
	wars[roomId].matchups[matchupId].result = 0;
	wars[roomId].matchups[matchupId].battleLink = '';
	return true;
};

exports.replaceParticipant = function (room, p1, p2) {
	var roomId = toId(room);
	if (!wars[roomId]) return 'There is no LvL in this room.';
	if (!wars[roomId].tourRound === 0) return 'The LvL has not begun.';
	var matchupId = exports.findMatchup(room, p1);
	if (!matchupId) return 'The user is not involved in this LvL.';
	if (wars[roomId].matchups[matchupId].result > 0) return 'Cannot replace a user in a battle that has already begun.';
	if (wars[roomId].teamAMembers[p1]) {
		delete wars[roomId].teamAMembers[p1];
		wars[roomId].teamAMembers[p2] = 1;
	}
	if (wars[roomId].teamBMembers[p1]) {
		delete wars[roomId].teamBMembers[p1];
		wars[roomId].teamBMembers[p2] = 1;
	}
	if (toId(wars[roomId].matchups[matchupId].from) === toId(p1)) wars[roomId].matchups[matchupId].from = p2;
	else if (toId(wars[roomId].matchups[matchupId].to) === toId(p1)) wars[roomId].matchups[matchupId].to = p2;
	return false;
};

exports.endTeamTour = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return false;
	delete wars[roomId];
	return true;
};

exports.viewTourStatus = function (room) {
	var roomId = toId(room);
	if (!wars[roomId]) return 'There is no LvL in this room.';
	var rawStatus = '';
	if (wars[roomId].tourRound === 0) {
		switch (wars[roomId].type) {
			case 'standard':
				rawStatus = '<hr /><h2><font color="green"> Sign up for the LvL in format ' + wars[roomId].format + ' against ' + wars[roomId].teamA + " and " + wars[roomId].teamB +  '.</font></h2><b>to join the LvL: <button name="send" value="/war join">/war join</button></b><br /><b><font color="blueviolet">League members:</font></b> ' + wars[roomId].size + '<br /><font color="blue"><b>FORMAT:</b></font> ' + wars[roomId].format + '<hr /><br /><font color="red"><b>Remember to keep your name throughout the duration of the LvL.</b></font>';
				break;
			case 'total':
				rawStatus = '<hr /><h2><font color="green"> Sign up for the LvL in the format ' + wars[roomId].format + ' against ' + wars[roomId].teamA + " and " + wars[roomId].teamB +  '.</font></h2><b>to join the LvL: <button name="send" value="/war join">/war join</button></b><br /><b><font color="blueviolet">League members:</font></b> ' + wars[roomId].size + '<br /><font color="blue"><b>FORMAT:</b></font> ' + wars[roomId].format + '<hr /><br /><font color="red"><b>Remember to keep your name throughout the duration of the LvL.</b></font>';
				break;
			case 'lineups':
				rawStatus = '<hr /><h2><font color="green"> LvL in the format ' + wars[roomId].format + ' against ' + wars[roomId].teamA + " and " + wars[roomId].teamB +  '.</font></h2><b><font color="orange">League Leaders: </font>' + wars[roomId].authA + ' and ' + wars[roomId].authB + '</font></b> <br /><b><font color="blueviolet">League members:</font></b> ' + wars[roomId].size + '<br /><font color="blue"><b>FORMAT</b></font> ' + wars[roomId].format + '<hr /><br /><b><font color="red">Remember to keep your name throughout the duration of the LvL.</font> <br />The leader must use /war reg, [member1], [member2]... to register the users.</b>';
		}
		return rawStatus;
	} else {
		//round
		var htmlSource = '<hr /><h3><center><font color=green><big>The LvL between ' + Clans.clans[toId(wars[roomId].teamA)].compname + " and " + Clans.clans[toId(wars[roomId].teamB)].compname + '</big></font></center></h3><center><b>FORMAT:</b> ' + wars[roomId].format + "</center><hr /><center><small><font color=red>Red</font> = disqualified, <font color=green>Green</font> = step to the next round, <a class='ilink'><b>URL</b></a> = fighting</small></center><br />";
		if (wars[roomId].type === 'total') htmlSource = '<hr /><h3><center><font color=green><big>The LvL between ' + wars[roomId].teamA + " and " + wars[roomId].teamB + ' (Total)</big></font></center></h3><center><b>FORMAT:</b> ' + wars[roomId].format + "</center><hr /><center><small><font color=red>Red</font> = disqualified, <font color=green>Green</font> = step to the next round, <a class='ilink'><b>URL</b></a> = fighting</small></center><br />";
		for (var t in wars[roomId].byes) {
			var userFreeBye = Users.getExact(t);
			if (!userFreeBye) {userFreeBye = t;} else {userFreeBye = userFreeBye.name;}
			htmlSource += '<center><small><font color=green>' + userFreeBye + ' has passed to the next round.</font></small></center>';
		}
		var matchupsTable = '<br /><table  align="center" border="0" cellpadding="0" cellspacing="0"><tr><td align="right"><img width="100" height="100" src="' + encodeURI(Clans.getProfile(wars[roomId].teamA).logo) + '" />&nbsp;&nbsp;&nbsp;&nbsp;</td><td align="center"><table  align="center" border="0" cellpadding="0" cellspacing="0">';
		for (var i in wars[roomId].matchups) {
			var userk = Users.getExact(wars[roomId].matchups[i].from);
			if (!userk) {userk = wars[roomId].matchups[i].from;} else {userk = userk.name;}
			var userf = Users.getExact(wars[roomId].matchups[i].to);
			if (!userf) {userf = wars[roomId].matchups[i].to;} else {userf = userf.name;}
			switch (wars[roomId].matchups[i].result) {
				case 0:
					matchupsTable += '<tr><td  align="right"><big>' + userk + '</big></td><td>&nbsp;vs&nbsp;</td><td><big align="left">' + userf + "</big></td></tr>";
					break;
				case 1:
					matchupsTable += '<tr><td  align="right"><a href="/' + wars[roomId].matchups[i].battleLink +'" room ="' + wars[roomId].matchups[i].battleLink + '" class="ilink"><b><big>' + userk + '</big></b></a></td><td>&nbsp;<a href="/' +  wars[roomId].matchups[i].battleLink + '" room ="' + wars[roomId].matchups[i].battleLink + '" class="ilink">vs</a>&nbsp;</td><td><a href="/' + wars[roomId].matchups[i].battleLink + '" room ="' + wars[roomId].matchups[i].battleLink + '" class="ilink"><b><big align="left">' + userf + "</big></b></a></td></tr>";
					break;
				case 2:
					matchupsTable += '<tr><td  align="right"><font color="green"><b><big>' + userk + '</big></b></font></td><td>&nbsp;vs&nbsp;</td><td><font color="red"><b><big align="left">' + userf + "</big></b></font></td></tr>";
					break;
				case 3:
					matchupsTable += '<tr><td  align="right"><font color="red"><b><big>' + userk + '</big></b></font></td><td>&nbsp;vs&nbsp;</td><td><font color="green"><b><big align="left">' + userf + "</big></b></font></td></tr>";
					break;
			}
		}
		matchupsTable += '</table></td><td>&nbsp;&nbsp;&nbsp;&nbsp;<img width="100" height="100" src="' + encodeURI(Clans.getProfile(wars[roomId].teamB).logo) + '" /></td></tr></table><hr />';
		htmlSource += matchupsTable;
		return htmlSource;
	}
	
};


/*********************************************************
 * Commands
 *********************************************************/
var cmds = { 
	guerra: 'lvl',
	war: 'lvl',
	lvl: function(target, room, user, connection) {
		var roomId = room.id;
		var params;
		if (!target) {
			params = ['round'];
		} else {
			params = target.split(',');
		}
		switch (toId(params[0])) {
			case 'buscar':
			case 'search':
				if (!this.canBroadcast()) return false;
				this.sendReplyBox(War.getTours());
				break;
			case 'help':
				if (!this.canBroadcast()) return false;
				this.sendReplyBox(
					'<font size = 2>lvl between leagues</font><br />' +
                                        'The League vs. League system allows leagues to compete and try to top the LvL ladder. LvLs are run in the LvL room.<br />' +
                                        'The commands start with /lvl and end with the following:<br />' +
                                        '<ul><li>/lvl new, [standard/total/ffa], [tier], [size], [league1], [league2], [captainA], [captainB] - Create a lvl.</li>' +
                                        '<li>/lvl end - Ends a lvl.</li>' +
                                        '<li>/lvl join - Joins a free-for-all lvl.</li>' +
                                        '<li>/lvl leave - Leaves a free-for-all lvl.</li>' +
                                        '<li>/lvl - Shows the current LvL in the room.</li>' +
                                        '<li>/lvl dq, [user] - The command to dq users.</li>' +
                                        '<li>/lvl replace, [user1], [user2] - Command to replace users.</li>' +
                                        '<li>/lvl invalidate, [battler] - Command to invalidate battles.</li>' +
                                        '<li>/lvl size, [Players per team] - Establish the size of a free-for-all lvl.</li>' +
                                        '<li>/lvl auth, [Captain1], [Captain2] - Change team captains</li>' +
                                        '<li>/lvl reg, [P1], [P2]... - Command for captains to set lineups.</li>' +
                                        '<li>/lvl start - Start the lvl after lineups are registered.</li>' +
										'<li>To see basic league commands, use /leaguehelp. All code written by Ecuacion, adapted by the Origin Coding Staff.</li>' +
                                        '</ul>');
				break;
			case 'nuevo':
			case 'new':
			case 'create':
				if (params.length < 6) return this.sendReply("Usage: /war new, [ffa/total/standard], [tier], [size], [leagueA], [leagueB]");
				if (params[1] !== 'standard' && !this.can('hotpatch')) return false;
				if (!this.can('ban', null, room)) return false;
				if ((room.id !== 'lvl' || room.id !== 'leaguevsleague' || room.id !== 'lvl2') && !this.can('declare')) return this.sendReply("This command is only available in official rooms");
				if (War.getTourData(roomId)) return this.sendReply("There is an LvL already going on in this room.");
				var size = parseInt(params[3]);
				if (size < 3) return this.sendReply("The minimum size is 3.");
				var format = War.tourTiers[toId(params[2])];
				if (!format) return this.sendReply("That format isn't valid.");
				if (!Clans.getProfile(params[4]) || !Clans.getProfile(params[5])) return this.sendReply("A specified league does not exist");
				if (War.findClan(params[4]) || War.findClan(params[5])) return this.sendReply("A specified league is at war.");
				params[4] = Clans.getClanName(params[4]);
				params[5] = Clans.getClanName(params[5]);
				switch (toId(params[1])) {
					case 'ffa':
						War.newTeamTour(room.id, 'standard', format, size, Tools.escapeHTML(params[4]), Tools.escapeHTML(params[5]));
						this.logModCommand(user.name + " has started a Free-For-All LvL between " + toId(params[4]) + " and " + toId(params[5]) + " in the " + format + " format.");
						Rooms.rooms[room.id].addRaw('<hr /><h2><font color="green">' + user.name + ' has started a Free-For-All LvL in the ' + format + ' format between ' + Tools.escapeHTML(Clans.clans[toId(params[4])].compname) + " and " + Tools.escapeHTML(Clans.clans[toId(params[5])].compname) +  '.</font></h2><b>To join the LvL: <button name="send" value="/war join">/lvl join</button></b><br /><b><font color="blueviolet">Size:</font></b> ' + size + '<br /><font color="blue"><b>Tier:</b></font> ' + format + '<hr /><br /><font color="red"><b>Remember not to change your name for the duration of the LvL.</b></font>');
						break;
					case 'total':
						War.newTeamTour(room.id, 'total', format, size, Tools.escapeHTML(params[4]), Tools.escapeHTML(params[5]));
						this.logModCommand(user.name + " has started a total LvL between " + toId(params[4]) + " and " + toId(params[5]) + " in the " + format + " format.");
						Rooms.rooms[room.id].addRaw('<hr /><h2><font color="green">' + user.name + ' has started a total LvL in the ' + format + ' format between ' + Tools.escapeHTML(Clans.clans[toId(params[4])].compname) + " and " + Tools.escapeHTML(Clans.clans[toId(params[5])].compname) +  '.</font></h2><b>To join the LvL: <button name="send" value="/war join">/lvl join</button></b><br /><b><font color="blueviolet">Size:</font></b> ' + size + '<br /><font color="blue"><b>Tier:</b></font> ' + format + '<hr /><br /><font color="red"><b>Remember not to change your name for the duration of the LvL.</b></font>');
						break;
					case 'standard':
						if (params.length < 8) return this.sendReply("Usage: /war new, standard, [tier], [size], [leagueA], [leagueB], [captainA], [captainB]");
						var targetClan;
						var userCapA = Users.getExact(params[6]);
						if (!userCapA) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not online.");				
						//if (!War.isInClan(params[6], params[4])) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not part of the target league.");
						var userCapB = Users.getExact(params[7]);
						if (!userCapB) return this.sendReply("The user " + Tools.escapeHTML(params[7]) + " is not online.");
						//if (!War.isInClan(params[7], params[5])) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not part of the target league.");
						War.newTeamTour(room.id, 'lineups', format, size, Tools.escapeHTML(params[4]), Tools.escapeHTML(params[5]), userCapA.name, userCapB.name);
						this.logModCommand(user.name + " has started a Standard LvL between " + toId(params[4]) + " and " + toId(params[5]) + " in the " + format + " format.");
						Rooms.rooms[room.id].addRaw('<hr /><h2><font color="green">' + user.name + ' has started a Standard LvL in the ' + format + ' format between ' + Tools.escapeHTML(Clans.clans[toId(params[4])].compname) + " and " + Tools.escapeHTML(Clans.clans[toId(params[5])].compname) +  '.</font></h2><font color="orange">Team Captains: </font>' + userCapA.name + ' and ' + userCapB.name + '</font></b> <br /><b><font color="blueviolet">Size:</font></b> ' + size + '<br /><font color="blue"><b>Tier:</b></font> ' + format + '<hr /><br /><font color="red"><b>Remember not to change your name for the duration of the LvL.</b></font>');
						break;
					default:
						return this.sendReply("The LvL must be one of the following styles: ffa, total, standard.");
				}
				break;
			case 'end':
			case 'fin':
			case 'delete':
				if (!this.can('ban', null, room)) return false;
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				this.logModCommand(user.name + " has forcibly ended the LvL between " + toId(tourData.teamA) + " and " + toId(tourData.teamB) + ".");
				Rooms.rooms[room.id].addRaw('<hr /><center><h2><font color="green">' + user.name + ' forcibly ended the LvL between ' + tourData.teamA + " and " + tourData.teamB + '.</h2></font></center><hr />');
				War.endTeamTour(roomId);
				break;
			case 'j':
			case 'unirse':
			case 'join':
				var err = War.joinTeamTour(roomId, user.name, Clans.findClanFromMember(user.name));
				if (err) return this.sendReply(err);
				var tourData = War.getTourData(roomId);
				var freePlaces =  War.getFreePlaces(roomId); 
				if (freePlaces > 0) {
					Rooms.rooms[room.id].addRaw('<b>' + user.name + '</b> has joined the LvL. There are ' + freePlaces + ' spots remaining.');
				} else {
					Rooms.rooms[room.id].addRaw('<b>' + user.name + '</b> has joined the LvL. The LvL will now start!');
					War.startTeamTour(roomId);
					Rooms.rooms[room.id].addRaw(War.viewTourStatus(roomId));
				}
				break;
			case 'l':
			case 'salir':
			case 'leave':
				var err = War.leaveTeamTour(roomId, user.name);
				if (err) return this.sendReply(err);
				var freePlaces =  War.getFreePlaces(roomId);
				Rooms.rooms[room.id].addRaw('<b>' + user.name + '</b> has left the LvL. There are ' + freePlaces + ' spots remaining.');
				break;
			case 'auth':
				if (!this.can('ban', null, room)) return false;
				if (params.length < 3) return this.sendReply("Usage: /war auth, [Capitan1], [Capitan2]");
				var targetClan;
				var tourData = War.getTourData(roomId);
				var userCapA = Users.getExact(params[1]);
				if (!userCapA) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not online.");				
			//	if (!War.isInClan(params[1], tourData.teamA)) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not part of the target league.");
				var userCapB = Users.getExact(params[2]);
				if (!userCapB) return this.sendReply("The user " + Tools.escapeHTML(params[7]) + " is not online.");
			//	if (!War.isInClan(params[2], tourData.teamB)) return this.sendReply("The user " + Tools.escapeHTML(params[7]) + " is not part of the target league.");
				var err = War.setAuth(roomId, params[1], params[2]);
				if (err) return this.sendReply(err);
				this.privateModCommand('(' + user.name + ' has changed the captains for the current war.)');
				break;
			case 'lineup':
			case 'alineacion':
			case 'registrar':
			case 'reg':
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				if (toId(user.name) !== toId(tourData.authA) && toId(user.name) !== toId(tourData.authB)) return this.sendReply("You are not the team captain!");
				var err = War.regParticipants(roomId, user.name, target);
				if (err) return this.sendReply(err);
				if (toId(user.name) === toId(tourData.authA)) Rooms.rooms[room.id].addRaw(user.name + ' has entered the lineup for ' + tourData.teamA + '.');
				if (toId(user.name) === toId(tourData.authB)) Rooms.rooms[room.id].addRaw(user.name + ' has entered the lineup for ' + tourData.teamB + '.');
				break;
			case 'empezar':
			case 'begin':
			case 'start':
				if (!this.can('ban', null, room)) return false;
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				if (tourData.tourRound !== 0) return this.sendReply("The LvL has already started.");

				var freePlaces =  War.getFreePlaces(roomId);
				if (freePlaces > 0) return this.sendReply("One or both teams has not registered a lineup or has open spots.");
				War.startTeamTour(roomId);
				Rooms.rooms[room.id].addRaw(War.viewTourStatus(roomId));
				break;
			case 'size':
				if (!this.can('ban', null, room)) return false;
				if (params.length < 2) return this.sendReply("Usage: /war size, [size]");
				var err = War.sizeTeamTour(roomId, params[1]);
				if (err) return this.sendReply(err);
				var freePlaces =  War.getFreePlaces(roomId);
				if (freePlaces > 0) {
					Rooms.rooms[room.id].addRaw('<b>' + user.name + '</b> has changed the LvL size to ' + parseInt(params[1]) + '. There are ' + freePlaces + ' places left.');
				} else {
					Rooms.rooms[room.id].addRaw('<b>' + user.name + '</b> has changed the LvL size to ' + parseInt(params[1]) + '. The LvL begins now!');
					War.startTeamTour(roomId);
					Rooms.rooms[room.id].addRaw(War.viewTourStatus(roomId));
				}
				break;
			case 'disqualify':
			case 'dq':
				if (!this.can('ban', null, room)) return false;
				if (params.length < 2) return this.sendReply("Usage: /war dq, [user]");
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				//var inClanA = War.isInClan(params[1], tourData.teamA);
			//	var inClanB = War.isInClan(params[1], tourData.teamB);
				var inClanA = tourData.teamAMembers.hasOwnProperty(toId(params[1]));
				var inClanB = tourData.teamBMembers.hasOwnProperty(toId(params[1]));
				if (!inClanA && !inClanB) return this.sendReply("This user is not in the current LvL.");
				var canReplace = false;
				if ((Clans.authMember(tourData.teamA, user.name) > 0 && inClanA) || (Clans.authMember(tourData.teamB, user.name) > 0 && inClanB)) canReplace = true;
				if (!canReplace && !this.can('ban', null, room)) return false;
				if (!War.dqTeamTour(roomId, params[1], 'cmd')) return this.sendReply("The user could not be disqualified.");
				var userk = Users.getExact(params[1]);
				if (userk) userk = userk.name; else userk = toId(params[1]);
				this.addModCommand(userk + ' was dq\'ed from the LvL by ' + user.name + '.');
				if (War.isRoundEnded(roomId)) {
					War.autoEnd(roomId);
				}
				break;
			case 'replace':
				if (params.length < 3) return this.sendReply("Usage: /war replace, [userA], [userB]");
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				var inClanA = tourData.teamAMembers.hasOwnProperty(toId(params[1]));
				var inClanB = tourData.teamBMembers.hasOwnProperty(toId(params[1]));
				if (!inClanA && !inClanB) return this.sendReply("This user is not in the current LvL.");
				var canReplace = false;
				if ((Clans.authMember(tourData.teamA, user.name) > 0 && inClanA) || (Clans.authMember(tourData.teamB, user.name) > 0 && inClanB)) canReplace = true;
				if (!canReplace && !this.can('ban', null, room)) return false;
				//if ((inClanA && War.isInClan(params[2], tourData.teamA)) || (inClanB && War.isInClan(params[2], tourData.teamA))) var clanReplace = true;
				if ((inClanA) || (inClanB)) var clanReplace = true;
				if (!clanReplace) return this.sendReply("The target user is not in the target league.");
				var usera = Users.getExact(params[1]);
				if (usera) usera = usera.name; else usera = toId(params[1]);
				var userb = Users.getExact(params[2]);
				if (userb) {
					userb = userb.name;
				} else {
					return this.sendReply("The target user is not currently online.");
				}
				var err = War.replaceParticipant(roomId, params[1], params[2]);
				if (err) return this.sendReply(err);
				this.addModCommand(user.name + ': ' + usera + ' is replaced by ' + userb + ' in the LvL.');
				break;
			case 'invalidate':
				if (!this.can('ban', null, room)) return false;
				if (params.length < 2) return this.sendReply("Usage: /war invalidate, [user]");
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no active LvL in this room.");
				var matchupId = War.findMatchup(roomId, params[1]);
				if (!War.invalidate(roomId, matchupId)) return this.sendReply("The match could not be invalidated. Could it still be running?");
				this.addModCommand('The battle between ' + tourData.matchups[matchupId].from + ' and ' + tourData.matchups[matchupId].to + ' was invalidated by ' + user.name + '.');
				break;
			case 'hotpatch':
				if (!this.can('hotpatch')) return false;
				CommandParser.uncacheTree('./war.js');
				War = require('./war.js');
				return this.sendReply('Wars hotpatched.');
			case 'ronda':
			case 'round':
				if (!this.canBroadcast()) return false;
				return this.sendReply('|raw|' + War.viewTourStatus(roomId));
			default:
				this.sendReply('The command was not recognized. Try using /lvl help if you are confused.');
		}
	},
}; 

//for (var i in cmds) CommandParser.commands[i] = cmds[i];

/*********************************************************
 * Events
 *********************************************************/
 
if (!Rooms.global.___startBattle) Rooms.global.___startBattle = Rooms.global.startBattle;
Rooms.global.startBattle = function(p1, p2, format, rated, p1team, p2team) {
	var newRoom = this.___startBattle(p1, p2, format, rated, p1team, p2team);
	if (!newRoom) return;
	var formaturlid = format.toLowerCase().replace(/[^a-z0-9]+/g, '');
	//tour
	var matchup = War.findTourFromMatchup(p1.name, p2.name, format, newRoom.id);
	if (matchup) {
		newRoom.war = 1;
		War.setActiveMatchup(matchup.tourId, matchup.matchupId, newRoom.id);
		Rooms.rooms[matchup.tourId].addRaw("<a href=\"/" + newRoom.id + "\" class=\"ilink\"><b>The battle between " + p1.name + " and " + p2.name + " has started.</b></a>");
		Rooms.rooms[matchup.tourId].update();
	}
	//end tour

	return newRoom;
};

if (!Rooms.BattleRoom.prototype.___win) Rooms.BattleRoom.prototype.___win = Rooms.BattleRoom.prototype.win;
Rooms.BattleRoom.prototype.win = function(winner) {
	//tour
	if (this.war) {
		var matchup = War.findTourFromMatchup(this.p1.name, this.p2.name, this.format, this.id);
		if (matchup) {
			var losser = false;
			if (toId(this.p1.name) === toId(winner)) losser = this.p2.name;
			if (toId(this.p2.name) === toId(winner)) losser = this.p1.name;
			
			if (!losser) {
				//tie
				Rooms.rooms[matchup.tourId].addRaw('The battle between <b>' + this.p1.name + '</b> and ' + this.p2.name + '</b> has ended in a tie. Start another battle.');
				War.invalidate(matchup.tourId, matchup.matchupId);
			} else {
				Rooms.rooms[matchup.tourId].addRaw('<b>' + winner + '</b> has won the battle against ' + losser + '.</b>');
				War.dqTeamTour(matchup.tourId, losser);
				Rooms.rooms[matchup.tourId].update();
			}
		}
	}
	//end tour
	this.___win(winner);
};

