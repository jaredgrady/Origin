exports.commands = {
    devdeclare: 'ddeclare',
    ddeclare: function (target, room, user) {
		if (!target) return this.parse('/help globaldeclare');
		if (!~developers.indexOf(user.userid)) return this.errorReply("/devdeclare - Access denied.");

		for (var id in Rooms.rooms) {
			if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-black"><large><i>' + 'Developer declare from: ' + user.userid + '</i></large><br /><b>' + target + '</b></div>');
		}
		this.logModCommand(user.name + " dev declared " + target);
	}  
};
