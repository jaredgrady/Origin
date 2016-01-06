// friends list
function getFriendList(user) {
	let list = Db('friends')[user.userid];
	let display = '<table style="width: 100%; border: 1px solid #803C6F; border-top-right-radius: 4px; border-top-left-radius: 4px; background: rgba(205, 159, 196, 0.7);"><tr>';
	let start = 0;
	if (!list) return "You have no friends. :(";
	if (list.length === 0) return "You have no friends :(";
	while (start < list.length) {
                if ((start + 1) % 5) {
                     display += '</tr><tr><td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;"><button name="parseCommand" value="/user ' + list[start] + '" style="border: 1px solid #803C6F; background: #c4c4c4; color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-radius: 4px;">' + list[start] + '</button></td>'; 
		     start++;
                }
		if (!Users.get(list[start])) {
			display += '<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;"><button name="parseCommand" value="/user ' + list[start] + '" style="border: 1px solid #803C6F; background: #c4c4c4; color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-radius: 4px;">' + list[start] + '</button></td>'; 
			start++; 
		} else {
			display += '<td style="background: rgba(255, 255, 255, 0.5); border: 1px solid #803C6F; padding: 5px; border-radius: 4px; text-align: center;"><button name="parseCommand" value="/user ' + list[start] + '" style="border: 1px solid #803C6F; background: #CD9FC4; color: #502243; text-shadow: 0px 0px 2px #FCE8F1; padding: 5px; border-radius: 4px;">' + list[start] + '</button></td>'; 
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
		let display = getFriendList(user);
		this.sendReplyBox(display);
	},
	friendslisthelp: ["/friendslist or /friends - Show's your friend list. Add users with /addfriend."],

	addfriend: function (target, room, user) {
		if (!target) return this.parse('/help addfriend');
		
		let userid = user.userid;
		let targetUser = toId(target);

		if (userid === targetUser) return this.errorReply("You cannot add yourself as a friend.");
		if (!userid || !targetUser) return this.errorReply("User '" + targetUser + "' is not online.");
		if (Db('friends').get(userid, []).length === 20) return this.sendReply("You cannot have more then 20 friends. Remove some if you wish to add more.");
		if (Db('friends').get(userid, []).indexOf(targetUser) > -1) return this.sendReply("This user is already your friend.");
		Db('friends').set(userid, Db('friends').get(userid, []).concat([targetUser]));
		this.sendReply(targetUser + " has been added to your friends list.");
	},
	addfriendhelp: ["/addfriend [user] - Adds a friend to your friend list."],

	removefriend: function (target, room, user) {
		if (!target) return this.parse('/help removefriend');
	
		let userid = user.userid;
		let targetUser = toId(target);	
		
		if (Db('friends').get(userid, []).indexOf(targetUser) > -1) {
			let friends = Db('friends').get(userid);
			friends.splice(friends.indexOf(targetUser), 1);
			Db('friends').set(userid, friends);
			return this.sendReply("You have succesfully removed " + targetUser + " from your friendlist.");
		} else {
			return this.sendReply("This user is not on your friends list.");
		}
	},
	removefriendhelp: ["/removefriend [user] - Removes a friend to your friend list."]
};
