exports.commands = {
    devdeclare: 'ddeclare',
    ddeclare: function (target, room, user) {
		if (!target) return this.parse('/help globaldeclare');
		if (!~developers.indexOf(user.userid)) return this.errorReply("Access denied.");

		for (var id in Rooms.rooms) {
			if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><small><u>' + 'Developer declare from: ' + user.userid + '</small></u><b>' + target + '</b></div>');
		}
		this.logModCommand(user.name + " dev declared " + target);
	}  
};
