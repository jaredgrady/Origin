exports.commands = {
    
    rf: 'roomfounder',
    roomfounder: function (target, room, user) {
        if (!room.chatRoomData) {
            return this.sendReply("/roomfounder - This room isn't designed for per-room moderation to be added.");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
        if (!this.can('declare')) return false;
        if (room.isPersonal) return this.sendReply("You can't do this in personal rooms.");
        if (!room.auth) room.auth = room.chatRoomData.auth = {};
        if (!room.leagueauth) room.leagueauth = room.chatRoomData.leagueauth = {};
        var name = targetUser.name;
        room.auth[targetUser.userid] = '#';
        room.founder = targetUser.userid;
        this.addModCommand(name + ' was appointed to Room Founder by ' + user.name + '.');
        room.onUpdateIdentity(targetUser);
        room.chatRoomData.founder = room.founder;
        Rooms.global.writeChatRoomData();
    },
    
    roomdefounder: 'deroomfounder',
    deroomfounder: function (target, room, user) {
        if (!room.auth) {
            return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        var name = this.targetUsername;
        var userid = toId(name);
        if (room.isPersonal) return this.sendReply("You can't do this in personal rooms.");
        if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

        if (room.auth[userid] !== '#') return this.sendReply("User '" + name + "' is not a room founder.");
        if (!this.can('declare')) return false;

        delete room.auth[userid];
        delete room.founder;
        this.sendReply("(" + name + " is no longer Room Founder.)");
        if (targetUser) targetUser.updateIdentity();
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
    },

    roomowner: function (target, room, user) {
        if (!room.chatRoomData) {
            return this.sendReply("/roomowner - This room isn't designed for per-room moderation to be added");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;

        if (!targetUser) return this.sendReply("User '" + this.targetUsername + "' is not online.");
        if (!targetUser.registered) return this.sendReply("User '" + name + "' is not registered.");

        if (!room.founder) return this.sendReply('The room needs a room founder before it can have a room owner.');
        if (room.founder !== user.userid && !this.can('makeroom')) return this.sendReply('/roomowner - Access denied.');

        if (!room.auth) room.auth = room.chatRoomData.auth = {};

        var name = targetUser.name;

        room.auth[targetUser.userid] = '#';
        this.addModCommand("" + name + " was appointed Room Owner by " + user.name + ".");
        room.onUpdateIdentity(targetUser);
        Rooms.global.writeChatRoomData();
    }, 

    deroomowner: function (target, room, user) {
        if (!room.auth) {
            return this.sendReply("/roomdeowner - This room isn't designed for per-room moderation");
        }
        target = this.splitTarget(target, true);
        var targetUser = this.targetUser;
        var name = this.targetUsername;
        var userid = toId(name);
        if (!userid || userid === '') return this.sendReply("User '" + name + "' does not exist.");

        if (room.auth[userid] !== '#') return this.sendReply("User '"+name+"' is not a room owner.");
        if (!room.founder || user.userid !== room.founder && !this.can('makeroom', null, room)) return false;

        delete room.auth[userid];
        this.sendReply("(" + name + " is no longer Room Owner.)");
        if (targetUser) targetUser.updateIdentity();
        if (room.chatRoomData) {
            Rooms.global.writeChatRoomData();
        }
    },

    roomhelp: function (target, room, user) {
        if (room.id === 'lobby' || room.battle) return this.sendReply("This command is too spammy for lobby/battles.");
        if (!this.canBroadcast()) return;
        this.sendReplyBox(
            "Room drivers (%) can use:<br />" +
            "- /warn OR /k <em>username</em>: warn a user and show the Pokemon Showdown rules<br />" +
            "- /mute OR /m <em>username</em>: 7 minute mute<br />" +
            "- /hourmute OR /hm <em>username</em>: 60 minute mute<br />" +
            "- /unmute <em>username</em>: unmute<br />" +
            "- /announce OR /wall <em>message</em>: make an announcement<br />" +
            "- /modlog <em>username</em>: search the moderator log of the room<br />" +
            "- /modnote <em>note</em>: adds a moderator note that can be read through modlog<br />" +
            "<br />" +
            "Room moderators (@) can also use:<br />" +
            "- /roomban OR /rb <em>username</em>: bans user from the room<br />" +
            "- /roomunban <em>username</em>: unbans user from the room<br />" +
            "- /roomvoice <em>username</em>: appoint a room voice<br />" +
            "- /roomdevoice <em>username</em>: remove a room voice<br />" +
            "- /modchat <em>[off/autoconfirmed/+]</em>: set modchat level<br />" +
            "<br />" +
            "Room owners (#) can also use:<br />" +
            "- /roomintro <em>intro</em>: sets the room introduction that will be displayed for all users joining the room<br />" +
            "- /rules <em>rules link</em>: set the room rules link seen when using /rules<br />" +
            "- /roommod, /roomdriver <em>username</em>: appoint a room moderator/driver<br />" +
            "- /roomdemod, /roomdedriver <em>username</em>: remove a room moderator/driver<br />" +
            "- /modchat <em>[%/@/#]</em>: set modchat level<br />" +
            "- /declare <em>message</em>: make a large blue declaration to the room<br />" +
            "- !htmlbox <em>HTML code</em>: broadcasts a box of HTML code to the room<br />" +
            "- !showimage <em>[url], [width], [height]</em>: shows an image to the room<br />" +
            "<br />" +
            "Room founders (#) can also use<br />" +
            "- /roomowner <em>username</em> - Appoints username as a room owner<br />" +
            "<br />" +
            "More detailed help can be found in the <a href=\"https://www.smogon.com/sim/roomauth_guide\">roomauth guide</a><br />" +
            "</div>"
        );
    }
};