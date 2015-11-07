exports.commands = {
	/*********************************************************
	 * Clan commands
	 *********************************************************/

	leaguehelp: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		if (target && target === '~') {
			this.sendReplyBox();
		}
		this.sendReplyBox(
			"<big><b>Basic Commands:</big></b><br /><br />" +
			"/leagues - Shows a list of leagues.<br /> " +
			"/league <i>(league)</i> - Shows the profile of a league.<br />" +
			"/leagueladder - Shows leagues ranked by LVL ELO.<br />" +
			"/leagueauth <i>(league)</i> - Shows the members of a league.<br />" +
			"/lvllog <i>(league)</i> - Shows the last 10 LvL's of a league.<br />" +
			"/leaveleague - Demotes yourself from LvL auth.<br />" + 
			"/leagueauthhelp - Displays the help command for setting league auth.<br /><br />" + 

			"<big><b>LvL-Auth Commands:</b></big><br /><br />" +
			"/lvlauth <i>(member)</i> - Sets user as lvl auth, giving them access to these commands, and some LvL commands. Requires owner.<br />" +
			"/delvlauth <i>(member)</i> - Demotes a member of a league from lvl auth. <br />" +
			"/leaguemotto <i>(motto)</i> - Sets the motto of a league.<br />" +
			"/leaguelogo <i>(logo)</i> - Sets the league logo.<br />" +
			"/leagueclose -  Prevents all users except league members and global staff from joining a league room. <font color = \"red\">Currently disabled.</font><br />" +
			"/leagueopen - Reopens a league room to the public after using /leagueclose. <br /><br />" +
			"<i>Use /leaguehelp ~ for admin-only commands.</i><br /><br />" +
			"<b><u>League vs. League code by Ecuacion, adapted for use on Origin by the Origin coding staff.</b></u>"
		);
	},

	createleague: function (target) {
		if (!this.can('clans')) return false;
		if (target.length < 2)
			this.sendReply("El nombre del clan es demasiado corto");
		else if (!Clans.createClan(target))
			this.sendReply("No se pudo crear el clan. Es posible que ya exista otro con el mismo nombre.");
		else
			this.sendReply("Clan: " + target + " creado con éxito.");

	},

	deleteleague: function (target) {
		if (!this.can('clans')) return false;
		if (!Clans.deleteClan(target))
			this.sendReply("No se pudo eliminar el clan. Es posble que no exista o que se encuentre en war.");
		else
			this.sendReply("Clan: " + target + " eliminado con éxito.");
	},

	getleagues: 'leagues',
	clanes: 'leagues',
	leagues: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		var clansTableTitle = "Origin Leagues:";
		if (toId(target) === 'rank' || toId(target) === 'puntos' || toId(target) === 'prestigio' || toId(target) === 'puntuacion') {
			target = "rank";
			clansTableTitle = "List of leagues by ELO:";
		}
		var clansTable = '<center><big><big><strong>' + clansTableTitle + '</strong></big></big><center><br /><table class="clanstable" width="100%" border="1" cellspacing="0" cellpadding="3" target="_blank"><tr><td><center><strong>ID</strong></center></td><td><center><strong>League</strong></center></td><td><center><strong>Room</strong></center></td><td><center><strong>LvLs</strong></center></td><td><center><strong>ELO</strong></center></td></tr>';
		var clansList = Clans.getClansList(toId(target));
		var auxRating = {};
		var nMembers = 0;
		var membersClan = {};
		var auxGxe = 0;
		for (var m in clansList) {
			auxRating = Clans.getElementalData(m);
			membersClan = Clans.getMembers(m);
			if (!membersClan) {
				nMembers = 0;
			} else {
				nMembers = membersClan.length;
			}
			clansTable += '<tr><td><center>' + Tools.escapeHTML(Clans.getClanName(m)) + '</center></td><td><center>' +Tools.escapeHTML(auxRating.compname) + '</center></td><td><center>' + '<button name="send" value="/join ' + Tools.escapeHTML(auxRating.sala) + '" target="_blank">' + Tools.escapeHTML(auxRating.sala) + '</button>' + '</center></td><td><center><button name="send" value="/lvllog ' + Tools.escapeHTML(Clans.getClanName(m)) + '" target="_blank">' + (auxRating.wins + auxRating.losses + auxRating.draws) + '</button></center></td><td><center>' + auxRating.rating + '</center></td></tr>';
		}
		clansTable += '</table>';
		this.sendReply("|raw| " + clansTable);
	},
	
	league: 'getleague',
	getleague: function (target, room, user) {
		var autoClan = false;
		var memberClanProfile = false;
		var clanMember = "";
		if (!target) autoClan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getProfile(target);
		if (!clan) {
			clanMember = target;
			target = Clans.findClanFromMember(target);
			memberClanProfile = true;
			if (target)
				clan = Clans.getProfile(target);
		}
		if (!clan && autoClan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getProfile(target);
			memberClanProfile = true;
			clanMember = user.name;
		}
		if (!clan) {
			this.sendReply("The specified league does not exist.");
			return;
		}
		var salaClanSource = "";
		if (clan.sala === "none") {
			salaClanSource = 'None yet!';
		} else {
			salaClanSource = '<button name="send" value="/join ' + Tools.escapeHTML(clan.sala) + '" target="_blank">' + Tools.escapeHTML(clan.sala) + '</button>';
		}
		var clanTitle = "";
		clanTitle = clan.compname;
		var medalsClan = '';
		if (clan.medals) {
			for (var u in clan.medals) {
				medalsClan += '<img id="' + u + '" src="' + encodeURI(clan.medals[u].logo) + '" width="32" title="' + Tools.escapeHTML(clan.medals[u].desc) + '" />&nbsp;&nbsp;';
			}
		}
		this.sendReplyBox(
			'<div class="fichaclan">' +
			'<h4><center><p> <br />' + Tools.escapeHTML(clanTitle) + '</center></h4><hr width="90%" />' +
			'<table width="90%" border="0" align="center"><tr><td width="180" rowspan="2"><div align="center"><img src="' + encodeURI(clan.logo) +
			'" width="160" height="160" /></div></td><td height="64" align="left" valign="middle"><span class="lemaclan">'+ Tools.escapeHTML(clan.lema) +
			'</span></td> </tr>  <tr>    <td align="left" valign="middle"><strong>League Room</strong>: ' + salaClanSource +
			' <p style="font-style: normal;font-size: 16px;"><strong>ELO</strong>:&nbsp;' + clan.rating +
			' (' + clan.wins + ' Wins, ' + clan.losses + ' Losses, ' + clan.draws + ' Ties)<br />' +
			' </p> <p style="font-style: normal;font-size: 16px;">&nbsp;' + medalsClan +
			'</p></td>  </tr></table></div>'
		);
	},

	setleaguemotto: function (target) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /setlemaclan clan, lema");

		if (!Clans.setLema(params[0], params[1]))
			this.sendReply("El clan no existe o el lema es mayor de 80 caracteres.");
		else {
			this.sendReply("El nuevo lema del clan " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setleaguelogo: function (target) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /setlogoclan clan, logo");

		if (!Clans.setLogo(params[0], params[1]))
			this.sendReply("El clan no existe o el link del logo es mayor de 120 caracteres.");
		else {
			this.sendReply("El nuevo logo del clan " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setleaguename: function (target) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /settitleclan clan, titulo");

		if (!Clans.setCompname(params[0], params[1]))
			this.sendReply("El clan no existe o el título es mayor de 80 caracteres.");
		else {
			this.sendReply("El nuevo titulo del clan " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setleaguerank: function (target) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /setrankclan clan, valor");

		if (!Clans.setRanking(params[0], params[1]))
			this.sendReply("El clan no existe o el valor no es válido.");
		else {
			this.sendReply("El nuevo rank para el clan " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setleaguegxe: function (target) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length !== 4) return this.sendReply("Usage: /setgxeclan clan, wins, losses, ties");

		if (!Clans.setGxe(params[0], params[1], params[2], params[3]))
			this.sendReply("El clan no existe o el valor no es válido.");
		else {
			this.sendReply("El nuevo GXE para el clan " + params[0] + " ha sido establecido con éxito.");
		}
	},

	setleagueroom: function (target) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /setsalaclan clan, sala");

		if (!Clans.setSala(params[0], params[1]))
			this.sendReply("El clan no existe o el nombre de la sala es mayor de 80 caracteres.");
		else {
			this.sendReply("La nueva sala del clan " + params[0] + " ha sido establecida con éxito.");
		}
	},
	
	giveleaguemedal: function (target) {
		if (!this.can('hotpatch')) return false;
		var params = target.split(',');
		if (!params || params.length !== 4) return this.sendReply("Usage: /giveclanmedal clan, medallaId, imagen, desc");

		if (!Clans.addMedal(params[0], params[1], params[2], params[3]))
			this.sendReply("El clan no existe o alguno de los datos no es correcto");
		else {
			this.sendReply("Has entegado una medalla al clan " + params[0]);
		}
	},
	
	removeleaguemedal: function (target) {
		if (!this.can('hotpatch')) return false;
		var params = target.split(',');
		if (!params || params.length !== 2) return this.sendReply("Usage: /removeclanmedal clan, medallaId");

		if (!Clans.deleteMedal(params[0], params[1]))
			this.sendReply("El clan no existe o no podeía dicha medalla");
		else {
			this.sendReply("Has quitado una medalla al clan " + params[0]);
		}
	},

	leaguemotto: function (target, room, user) {
		var permisionClan = false;
		if (!target) return this.sendReply("Please specify a motto");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue > 1) permisionClan = true;
			if (!permisionClan) return false;
		} else {
			return false;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			if (!Clans.setLema(clanUser, target))
				this.sendReply("Your motto must be under 80 characters.");
			else {
				this.addModCommand("(A new motto was set by " + user.name + ")");
			}
		} else {
			this.sendReply("This command can only be used in your league room.");
		}
	},

	leaguelogo: function (target, room, user) {
		var permisionClan = false;
		if (!target) return this.sendReply("Please specify a logo");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue > 1) permisionClan = true;
			if (!permisionClan) return false;
		} else {
			return false;
		}
		var claninfo = Clans.getElementalData (clanUser);
		if (room && room.id === toId(claninfo.sala)) {
			if (!Clans.setLogo(clanUser, target))
				this.sendReply("El logo es mayor de 120 caracteres.");
			else {
				this.addModCommand("(A new league logo was set by " + user.name + ")");
			}
		} else {
			this.sendReply("This command can only be used in your league room.");
		}
	},

	addclanmember: function (target) { //PLEASE DO NOT USE THIS COMMAND
		if (!this.can('hotpatch')) return false;
		var params = target.split(',');
		if (params.length !== 2) return this.sendReply("Usage: /addclanmember clan, member");

		var user = Users.getExact(params[1]);
		if (!user || !user.connected) return this.sendReply("User: " + params[1] + " is not online.");

		if (!Clans.addMember(params[0], params[1]))
			this.sendReply("Could not add the user to the clan. Does the clan exist or is the user already in another clan?");
		else {
			this.sendReply("User: " + user.name + " successfully added to the clan.");
			Rooms.rooms.lobby.add('|raw|<div class="clans-user-join">' + Tools.escapeHTML(user.name) + " se ha unido al clan: " + Tools.escapeHTML(Clans.getClanName(params[0])) + '</div>');
		}
	},

	setleagueowner: function (target, room, user) {
		if (!this.can('declare')) return false;
		var params = target.split(',');
		if (!params || params.length < 2) return this.sendReply("Usage: /setleagueowner league,owner");

		var userk = Users.getExact(params[1]);
		if (!userk || !userk.connected) return this.sendReply("User: " + params[1] + " isn't online.");

		if (!Clans.addMember(params[0], params[1]) || !Clans.addLeader(params[1])) {
			this.sendReply("Something failed: the league or user does not exist, or the user is in another league.");
		} else {
			var clanUser = Clans.findClanFromMember(params[1]);
			this.sendReply("User: " + userk.name + " was set to owner of " + clanUser + ".");
		}
	},

	lvlauth: function (target, room, user) {
		var permisionClan = false;
		var params = target;
		if (!params) return this.sendReply("Usage: /lvlauth user.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && (Clans.authMember(toId(clanUser), toId(user)) === 3)) permisionClan = true;
		if (!permisionClan && !this.can('declare')) return;
		var userk = Users.getExact(toId(params));
		if (!userk || !userk.connected) return this.sendReply("User: " + params + " is not online.");
		var addedClan = Clans.addMember(clanUser, params);
		if (!addedClan) return this.sendReply("This user is already in another league.");
		if (!Clans.addOficial(params))
			this.sendReply("There was an error: this user does not exist, or is already LvL auth");
		else {
			this.sendReply("User: " + userk.name + " is now LvL auth.");
			userk.popup(user.name + " has added you to the LvL auth of " + clanUser + ".\nUse /leaguehelp for more information.");
		}
	},

	delvlauth: function (target, room, user) {
		var permisionClan = false;
		var params = target.split(',');
		if (!params) {
				return this.sendReply("Usage: /delvlauth member");
		}
		var clanUser = Clans.findClanFromMember(user.name);
		var clanTarget = Clans.findClanFromMember(params[0]);
		if (clanUser) {
			var clanUserid = toId(clanUser);
			var userb = toId(params[0]);
			var iduserwrit = toId(user.name);
			var perminsionValue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionValue >= 2 && clanTarget === clanUser) permisionClan = true;
		}
		if (!permisionClan && !this.can('declare')) return;
		var currentWar = War.findClan(clanTarget);
		if (currentWar) {
			var currentWarParticipants = War.getTourData(currentWar);
			if (currentWarParticipants.teamAMembers[toId(params[0])] || currentWarParticipants.teamBMembers[toId(params[0])]) return this.sendReply("You can't remove an LvL auth member while in a LvL.");
		}
		var userk = Users.getExact(params[0]);
		if (!clanTarget) {
			return this.sendReply("This user is not part of any clans.");
		} else {
			var clanId = toId(clanTarget);
			var userId = toId(params[0]);
			if ((Clans.authMember(clanId, userId) > 2 && !this.can('declare')) || (Clans.authMember(clanId, userId) === 2 && perminsionValue < 3 && !this.can('declare'))) return false;
		}
		if (!Clans.removeMember(clanTarget, params[0])) {
			this.sendReply("The user could not be demoted from LvL auth");
		} else {
			if (!userk || !userk.connected) {
				this.addModCommand("(" + params[0] + " was demoted from LvL auth in " + clanTarget + " by " + user.name + ")");
			} else {
				this.addModCommand("(" + userk.name + " was demoted from LvL auth in " + clanTarget + " by " + user.name + ")");
			}
		}
	},

	 leaveleague: function (target, room, user) {
		var clanUser = Clans.findClanFromMember(user.name);
		if (!clanUser) {
			return this.sendReply("You are not LvL auth in any league.");
		}
		var currentWar = War.findClan(clanUser);
		if (currentWar) {
			var currentWarParticipants = War.getTourData(currentWar);
			if (currentWarParticipants.teamAMembers[toId(user.name)] || currentWarParticipants.teamBMembers[toId(user.name)]) return this.sendReply("No puedes salir del clan si estabas participando en una war.");
		}
		if (!Clans.removeMember(clanUser, user.name)) {
			 this.sendReply("Internal Error has occurred: please report this to an Admin.");
		} else {
			this.sendReply("You have left the league " + clanUser);
		}
	},


	//new war system
	resetclanranking: function (target, room, user) {
		if (user.userid !== 'nineage') return false;
		if (room.id !== 'staff') return this.sendReply("Este comando solo puede ser usado en la sala Staff");
		Clans.resetClansRank();
		this.addModCommand(user.name + " ha reiniciado el ranking de clanes.");
	},
	
	resetwarlog: function (target, room, user) {
		if (!user.userid === 'nineage') return false;
		if (room.id !== 'staff') return this.sendReply("Este comando solo puede ser usado en la sala Staff");
		Clans.resetWarLog();
		this.addModCommand(user.name + " ha borrado todos los warlogs.");
	},
	
	pendinglvls: 'wars',
	lvls: function (target, room, user) {
		this.parse("/war search");
	},

	viewlvl: 'vl',
	lvlstatus: 'vl',
	vl: function (target, room, user) {
		if(!this.canBroadcast()) return;
		this.parse("/war round");
	},
	
	endlvl: function (target, room, user) {
		this.parse("/war end");
	},
	
	leagueladder: function (target, room, user) {
		this.parse("/leagues rank");
	},
	
	lvllog: function (target, room, user) {
		var autoclan = false;
		if (!target) autoclan = true;
		if (!this.canBroadcast()) return false;
		var clan = Clans.getRating(target);
		if (!clan) {
			target = Clans.findClanFromMember(target);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan && autoclan) {
			target = Clans.findClanFromMember(user.name);
			if (target)
				clan = Clans.getRating(target);
		}
		if (!clan) {
			this.sendReply("The specified league does not exist.");
			return;
		}
		var f = new Date();
		var dateWar = f.getDate() + '-' + f.getMonth() + ' ' + f.getHours() + 'h';
		this.sendReply(
			"|raw| <center><big><big><b>Latest LvLs of: " + Tools.escapeHTML(Clans.getClanName(target)) + "</b></big></big> <br /><br />" + Clans.getWarLogTable(target) + '<br /> Current server time: ' + dateWar + '</center>'
		);
	},
	
//Will be added at some point
/*	cerrarsalaclan: 'closeclanroom',
	closeclanroom: function (target, room, user) {
		var permisionClan = false;
		var clanRoom = Clans.findClanFromRoom(room.id);
		if (!clanRoom) return this.sendReply("Esta no es una sala de Clan.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && toId(clanRoom) === toId(clanUser)) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue >= 2) permisionClan = true;
			
		} 
		if (!permisionClan && !this.can('clans')) return false;
		if (!Clans.closeRoom(room.id, clanRoom))
			this.sendReply("Error al intentar cerrar la sala. Es posible que ya esté cerrada.");
		else {
			this.addModCommand("Esta sala ha sido cerrada a quienes no sean miembros de " + clanRoom + " por " + user.name);
		}
	},
	
	abrirsalaclan: 'openclanroom',
	openclanroom: function (target, room, user) {
		var permisionClan = false;
		var clanRoom = Clans.findClanFromRoom(room.id);
		if (!clanRoom) return this.sendReply("Esta no es una sala de Clan.");
		var clanUser = Clans.findClanFromMember(user.name);
		if (clanUser && toId(clanRoom) === toId(clanUser)) {
			var clanUserid = toId(clanUser);
			var iduserwrit = toId(user.name);
			var perminsionvalue = Clans.authMember(clanUserid, iduserwrit);
			if (perminsionvalue >= 2) permisionClan = true;
			
		} 
		if (!permisionClan && !this.can('clans')) return false;
		if (!Clans.openRoom(room.id, clanRoom))
			this.sendReply("Error al intentar abrir la sala. Es posible que ya esté abierta.");
		else {
			this.addModCommand("Esta sala ha sido abierta a todos los usuarios por " + user.name);
		}
	},*/

//Heehee	
	kickall: function (target, room, user, connection) {
		if (!this.can('hotpatch')) return false;
		var targetUser;
		for (var f in room.users) {
			targetUser = Users.getExact(room.users[f]);
			if (!targetUser) {
				delete room.users[f];
			} else {
				targetUser.leaveRoom(room.id);
			}
		}
		room.userCount = 0;
		this.addModCommand("" + user.name + " has kicked all users from room " + room.id + '.');
		setTimeout(function () {user.joinRoom(room.id);}, 2000);
	},
	lvlreg: 'lvlregister',
	lvlregister: function (target, room, user) {
		if (!this.can('hotpatch', null, room)) return false;
		var roomId = room.id;
		var parts;
		parts = target.split(',');
		if (parts.length < 6) return this.sendReply("Usage: /lvlregister [leagueid], [leaguename], [leagueowner]");
		if (parts[0].length > 3) return this.sendReply("leagueid cannot exceed 3 letters");
		if (!Clans.createClan(parts[0])) this.sendReply("This league name or id is already in use.");
		this.parse('/createleague', toId(parts[0]));
		this.parse('/setleagueroom', toId(parts[0]), roomid);
		this.parse('/setleagueowner', toId(parts[0]), parts[2]);
		this.parse('/setleaguename', toId(parts[0]), parts[1]);
		this.sendReply("The league" + parts[1] + " has been created with the id." + parts[0] + "and the owner" + parts[2]);
	}
};


