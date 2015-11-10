//Friends List 
function getFriendList(user) {
	var list = Db('friends')[user.userid];
	var display = '<table style="width: 100%; border: 1px solid #803C6F; border-top-right-radius: 4px; border-top-left-radius: 4px; background: rgba(205, 159, 196, 0.7);"><tr>';
	var start = 0;
	if (!list) return "You have no friends. :(";
	while (start < list.length) {
		if (!Users.get(list[start])) {
			display += '<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;"><button name="parseCommand" value="/user ' + list[start] + '" style="border: 1px solid #803C6F; background: #CD9FC4; color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-radius: 4px;">' + list[start] + '</button></td>'; 
			start++; 
		} else {
			display += '<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;"><button name="parseCommand" value="/user ' + list[start] + '" style="border: 1px solid #803C6F; background: #c4c4c4; color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-radius: 4px;">' + list[start] + '</button></td>'; 
			start++; 
		}
	}
	display += '</tr></table>';
	return display;
};

exports.commands = {

	friendslist: 'friends',
	friends: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var display = getFriendList(user);
		this.sendReplyBox(display);
	},

	addfriend: function (target, room, user) {
		if (!target) return this.parse('/help addfriend');
		
		var userid = user.userid;
		var targetUser = toId(target);	
		
		if (userid === targetUser) return this.errorReply("You cannot add yourself as a friend.");
		if (!userid || !targetUser) return this.errorReply("User '" + targetUser + "' is not online.");
		if (!Db('friends')[userid]) {
			Db('friends')[userid] = []; 
			Db.save();
		}
		if (Db('friends')[userid].indexOf(targetUser) > -1) return this.sendReply("This user is already your friend.");
			Db('friends')[userid].push(targetUser);
			Db.save();
			this.sendReply(targetUser + " has been added to your friends list.");
	},
	addfriendhelp: ["/addfriend [user] - Adds a friend to your friend list."],


	removefriend: function (target, room, user) {
		if (!target) return this.parse('/help removefriend');
	
		var userid = user.userid;
		var targetUser = toId(target);	
		
		if (Db('friends')[userid].indexOf(targetUser) > -1) {
			Db('friends')[userid].splice(targetUser);
			Db.save();
			this.sendReply(targetUser + " has been removed from your friends list.");
		} else {
		return this.sendReply("This user is not on your friends list.");
		}
	},
	removefriendhelp: ["/removefriend [user] - Removes a friend to your friend list."]
};