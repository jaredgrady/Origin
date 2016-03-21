const roomId = "cinnabarisland";
const targetRoom = Rooms.get(roomId);
let targetUsers = ["paulcentury"];

const onMessage = function (user, room, message) {
	if (targetRoom && targetUsers.indexOf(user.userid) > -1) targetRoom.add("|c|" + user.userid + "|__(to " + room.id + ")__ " + message);
};

module.exports = {
	onMessage: onMessage,
	targetUsers: targetUsers,
};
	
