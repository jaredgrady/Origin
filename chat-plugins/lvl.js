exports.commands = { 
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
					'<li>Please note that you need a <i>global staff member</i> in order to run a scripted LvL. Please do not contact admins to do this.</li>' +
					'<li>To see basic league commands, use /leaguehelp. All code written by Ecuacion, adapted by the Origin Coding Staff.</li>' +
                                        '</ul>');
				break;
			case 'nuevo':
			case 'new':
			case 'create':
				if (params.length < 6) return this.sendReply("Usage: /war new, [ffa/total/standard], [tier], [size], [leagueA], [leagueB]");
				if (params[1] !== 'standard' && !this.can('hotpatch')) return false;
				if (!this.can('lock')) return false;
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
						if (!War.isInClan(params[6], params[4])) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not part of the target league.");
						var userCapB = Users.getExact(params[7]);
						if (!userCapB) return this.sendReply("The user " + Tools.escapeHTML(params[7]) + " is not online.");
						if (!War.isInClan(params[7], params[5])) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not part of the target league.");
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
				if (!this.can('lock')) return false;
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
				if (!this.can('lock')) return false;
				if (params.length < 3) return this.sendReply("Usage: /war auth, [Capitan1], [Capitan2]");
				var targetClan;
				var tourData = War.getTourData(roomId);
				var userCapA = Users.getExact(params[1]);
				if (!userCapA) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not online.");				
				if (!War.isInClan(params[1], tourData.teamA)) return this.sendReply("The user " + Tools.escapeHTML(params[6]) + " is not part of the target league.");
				var userCapB = Users.getExact(params[2]);
				if (!userCapB) return this.sendReply("The user " + Tools.escapeHTML(params[7]) + " is not online.");
				if (!War.isInClan(params[2], tourData.teamB)) return this.sendReply("The user " + Tools.escapeHTML(params[7]) + " is not part of the target league.");
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
				if (!this.can('lock')) return false;
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				if (tourData.tourRound !== 0) return this.sendReply("The LvL has already started.");

				var freePlaces =  War.getFreePlaces(roomId);
				if (freePlaces > 0) return this.sendReply("One or both teams has not registered a lineup or has open spots.");
				War.startTeamTour(roomId);
				Rooms.rooms[room.id].addRaw(War.viewTourStatus(roomId));
				break;
			case 'size':
				if (!this.can('lock')) return false;
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
				if (!this.can('lock')) return false;
				if (params.length < 2) return this.sendReply("Usage: /war dq, [user]");
				var tourData = War.getTourData(roomId);
				if (!tourData) return this.sendReply("There is no LvL in this room.");
				var inClanA = War.isInClan(params[1], tourData.teamA);
				var inClanB = War.isInClan(params[1], tourData.teamB);
				if (!inClanA && !inClanB) return this.sendReply("This user is not in the current LvL.");
				var canReplace = false;
				if ((Clans.authMember(tourData.teamA, user.name) > 0 && inClanA) || (Clans.authMember(tourData.teamB, user.name) > 0 && inClanB)) canReplace = true;
				if (!canReplace && !this.can('lock')) return false;
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
				if (!canReplace && !this.can('lock')) return false;
				if ((inClanA && War.isInClan(params[2], tourData.teamA)) || (inClanB && War.isInClan(params[2], tourData.teamA))) var clanReplace = true;
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
				if (!this.can('lock')) return false;
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

