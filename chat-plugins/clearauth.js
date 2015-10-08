exports.commands = {
	clearroomauth: function (target, room, user, cmd) {
		if (!this.can('hotpatch')) return false;
		if (!room.auth) return this.errorReply("Room does not have roomauth.");
		var parts = target.split(',');
		var cmd = parts[0].trim().toLowerCase();
		if (!target) {
			this.errorReply("You must specify a roomauth group you want to clear.");
			return;
		}
	switch (target) {
		case 'voice':
			var count = 0;
			for (var userid in room.auth) {
			if (room.auth[userid] === '+') {
				delete room.auth[userid];
				count++;
			}
		}
			if (!count) {
				return this.sendReply("(This room has zero roomvoices)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " roomvoices have been cleared by " + user.name + ".");
			break;
			
		case 'driver':
			var count = 0;
			for (var userid in room.auth) {
			if (room.auth[userid] === '%') {
				delete room.auth[userid];
				count++;
				}
			}
			if (!count) {
				return this.sendReply("(This room has zero drivers)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " drivers have been cleared by " + user.name + ".");
			break;

		case 'mod':
			break;
			var count = 0;
			for (var userid in room.auth) {
				if (room.auth[userid] === '@') {
					delete room.auth[userid];
					count++;
			}
		}
			if (!count) {
				return this.sendReply("(This room has zero mods)");
			}
			if (room.chatRoomData) {
				Rooms.global.writeChatRoomData();
		}
			this.addModCommand("All " + count + " mods have been cleared by " + user.name + ".");
		    break;
	
			case 'roomowner':
			var count = 0;
			for (var userid in room.auth) {
				if (room.auth[userid] === '#') {
					delete room.auth[userid];
					count++;
			}
		}
		if (!count) {
			return this.sendReply("(This room has zero roomowners)");
		}
		if (room.chatRoomData) {
			Rooms.global.writeChatRoomData();
			}
			this.addModCommand("All " + count + " roomowners have been cleared by " + user.name + ".");
		    break; 
		
		default:
			return this.sendReply("The group specified does not exist.");
		}
	}
};
