var watchlist = Rooms.get('watchlist');
if (!watchlist) {
	Rooms.global.addChatRoom('Watchlist');
	watchlist = Rooms.get('watchlist');
	watchlist.isPrivate = true;
	watchlist.staffRoom = true;
	if (watchlist.chatRoomData) {
		watchlist.chatRoomData.isPrivate = true;
		watchlist.chatRoomData.staffRoom = true;
		watchlist.addedUsers = watchlist.chatRoomData.addedUsers = {};
		Rooms.global.writeChatRoomData();
	} else {
		watchlist.addedUsers = {};
	}
}
if (Object.size(watchlist.addedUsers) > 0)
	watchlist.add("||Loaded user list: " + Object.keys(watchlist.addedUsers).sort().join(", "));
exports.room = watchlist;

function getAllAlts(user) {
	var targets = {};
	if (typeof user === 'string')
		targets[toId(user)] = 1;
	else
		user.getAlts().concat(user.name).forEach(function (alt) {
			targets[toId(alt)] = 1;
			Object.keys(Users.get(alt).prevNames).forEach(function (name) {
				targets[toId(name)] = 1;
			});
		});
	return targets;
}

exports.addUser = function (user) {
	var targets = getAllAlts(user);
	for (var u in targets)
		if (watchlist.addedUsers[u])
			delete targets[u];
		else
			watchlist.addedUsers[u] = 1;
	Rooms.global.writeChatRoomData();

	targets = Object.keys(targets).sort();
	if (targets.length > 0)
		watchlist.add("||Added users: " + targets.join(", "));
	return targets;
};

exports.removeUser = function (user) {
	var targets = getAllAlts(user);
	for (var u in targets)
		if (!watchlist.addedUsers[u])
			delete targets[u];
		else
			delete watchlist.addedUsers[u];
	Rooms.global.writeChatRoomData();

	targets = Object.keys(targets).sort();
	if (targets.length > 0)
		watchlist.add("||Removed users: " + targets.join(", "));
	return targets;
};

exports.isWatchlisted = function (user) {
	var targets = getAllAlts(user);
	if (Object.keys(targets).intersect(Object.keys(watchlist.addedUsers)).length === 0)
		return false;

	var addedUsers = {};
	Array.prototype.exclude.apply(Object.keys(targets), Object.keys(watchlist.addedUsers)).forEach(function (user) {
		if (watchlist.addedUsers[user])
			return;
		watchlist.addedUsers[user] = addedUsers[user] = 1;
	});

	if (Object.size(addedUsers) > 0) {
		Rooms.global.writeChatRoomData();
		watchlist.add("||Alts automatically added: " + Object.keys(addedUsers).sort().join(", "));
	}

	return true;
};
