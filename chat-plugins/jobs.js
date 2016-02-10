// Code by Guard FieryNnight

"use strict";

function genJobTable() {
	let display = "<table border='1' cellspacing='0' cellpadding='5' width='100%'>" +
					"<tbody><tr><th>Employer</th><th>Description</th><th>Reward</th><th>Completed</th></tr>";
	for (let id in Db("jobs").object()) {
		display += "<tr>" +
						"<td align='center'><button name='send' value='/profile " + Db("jobs").get([id, "owner"]) + "'><b>" + Db("jobs").get([id, "owner"]) + "</b></button>" + "</td>" +
						"<td align='center'>" + Db("jobs").get([id, "description"]) + "</td>" +
						"<td align='center'>" + Db("jobs").get([id, "reward"]) + "</td>" +
						"<td align='center'><button name='send' value='/jobs delete " + id + "'>" + "Completed" + "</td>" +
					"</tr>";
	}
	return display;
}

let commands = {
	add: function (target, room, user) {
		// Driver and up only
		if (!this.can('lock')) return this.errorReply('Only staff members can add jobs.');
		let args = target.split(",");

		// Generate Job ID
		let id = Math.floor(Math.random() * 16777215).toString(16);
		while (Db('jobs').get(id)) {
			id = Math.floor(Math.random() * 16777215).toString(16);
		}

		// Do some checks
		if (args[0].length > 200) return this.errorReply('Description must be 200 characters or less.');
		if (!Math.round(args[1]) === args[1]) return this.errorReply('Reward must be an integer.');

		// Create job in database
		Db("jobs").set(id, {
			'description':args[0],
			'reward': +args[1],
			'owner': user.userid,
		});

		// Send reply back to user
		this.sendReply("Successfully added job " + id);
	},
	delete: function (target) {
		// Do some checks
		if (!this.can('lock')) return this.errorReply('Only staff members to delete jobs.');
		if (!Db("jobs").get(target)) return this.errorReply('Job not found');

		// Delete job and send reply back to user
		Db("jobs").delete(target);
		this.sendReply("Job " + target + " deleted.");
	},
	list: function (target) {
		if (!this.canBroadcast()) return false;
		this.sendReplyBox(genJobTable());
	},
};
exports.commands = {
	jobs: commands,
};