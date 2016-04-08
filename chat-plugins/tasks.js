// this is a tasklist for individual rooms.  Users can add tasks
// remove tasks, self assign tasks, add notes/details to each tasks

// list of methods for tasks which will be global

'use strict';

const uuid = require('uuid');
let color = require('../config/color');

const TaskMethods = {
	view: function (room, user, message, topId) {
		let display = "<center><font style='color: #11484F; text-shadow: 0px 0px 2px #96BFB8; font-weight: bold;'>Task List - " + room.title + "</font></center><br />" +
			"<div style='max-height: 450px; overflow-y: scroll;'>" + // scrollable
			"<center><table style='border: 1px solid #803C6F; border-collapse: collapse;'><tr><th style='box-shadow: 1px 1px rgba(0, 0, 0, 0.2) inset;' class='tasks-th'>Task</th>" + // title for of the columns
			"<th style='box-shadow: 0px 1px rgba(0, 0, 0, 0.2) inset;' class='tasks-th'>By</th>" +
			"<th style='box-shadow: 0px 1px rgba(0, 0, 0, 0.2) inset;' class='tasks-th'>Assignee</th>" +
			"<th style='box-shadow: 0px 1px rgba(0, 0, 0, 0.2) inset;' class='tasks-th'>Details</th>" +
			"<th style='box-shadow: 0px 1px rgba(0, 0, 0, 0.2) inset;' class='tasks-th'>Date</th>" +
			"<th style='box-shadow: -1px 1px rgba(0, 0, 0, 0.2) inset;' class='tasks-th'>Actions</th><tr>"; // finish defining the table
		// get the details
		let taskList = Db('tasks').get(room.id, {});

		// sorting for special display method
		let taskKeys = Object.keys(taskList).reverse();
		if (topId) {
			if (taskKeys.indexOf(topId) > -1) {
				// remove and put at the top.
				taskKeys.splice(taskKeys.indexOf(topId), 1);
				taskKeys.unshift(topId);
			}
		}

		for (let t in taskKeys) {
			let task = taskList[taskKeys[t]];
			if (!task) continue;

			// task action buttons
			const selfAssignTask = '<button name="send" value="/task selfassign ' + room.id + ', ' + task.id + '" id="selfassign-button">Self Assign</button><br />';
			const deleteTask = '<button name="send" value="/task delete ' + room.id + ', '  + task.id + '" id="delete-button">Delete</font></button><br />';
			const completeTask = '<button name="send" value="/task complete ' + room.id + ', '  + task.id + '" id="close-button">Close</font></button><br />';
			const reopenTask = '<button name="send" value="/task reopen ' + room.id + ', '  + task.id + '" id="reopen-button">Reopen</font></button><br />';

			display += "<tr>" +
				"<td style='box-shadow: 1px 0px rgba(0, 0, 0, 0.2) inset;' class='tasks-td'><center>" + Tools.escapeHTML(task.name) + '<br /><font color="gray">(ID: ' + task.id + ')</font></center></td>' + // task id
				"<td class='tasks-td'><center><b><font color='" + Tools.escapeHTML(color(task.by)) + "'>" + Tools.escapeHTML(task.by) + "</font></b></center></td>" +
				"<td class='tasks-td'><center><b><font color='" + Tools.escapeHTML(color(task.assignee)) + "'>" + Tools.escapeHTML(Tools.escapeHTML(task.assignee) || "None") + "</font></b></center></td>" +
				"<td class='tasks-td' width='30%'>- " + task.details.map(l => Tools.escapeHTML(l)).join("<br />- ") + "</td>" +
				"<td class='tasks-td'><center>" + task.status + (task.status !== "Closed" ? "<br /><font color='gray'>(Pending)</font>" : "") + "</center></td>" + // simple details
				"<td style='box-shadow: -1px 0px rgba(0, 0, 0, 0.2) inset;' class='tasks-td'>" + (task.status !== "Closed" && (!task.assignee || toId(task.assignee) !== user.userid) ? selfAssignTask : "") + (task.status !== "Closed" ? completeTask : reopenTask) + deleteTask + // determine which buttons
				"</td><tr>"; // finish the row
		}
		// finish the table
		display += "</table></center></div>";

		// check for special message
		if (message) {
			display += '<br /><center><font color="red"><b>' + message + "</b></font></center>";
		}
		// send to user in a popup as expected :P
		user.popup("|wide||html|" + display);
	},
	add: function (room, taskName, taskSetterId, taskDetails) {
		let taskId = uuid.v1();
		let now = new Date().toLocaleString() + " (GMT)";
		if (typeof taskDetails === "string") taskDetails = [taskDetails];
		let task = {
			id: taskId,
			name: taskName,
			by: taskSetterId,
			details: taskDetails || [],
			status: now,
		};
		// set
		Db('tasks').set([room.id, task.id], task);
		return taskId;
	},
	remove: function (room, taskId) {
		if (Db('tasks').has([room.id, taskId])) {
			Db('tasks').delete([room.id, taskId]);
			return true;
		}
		return false;
	},
	selfAssign: function (room, user, taskId) {
		let task = Db('tasks').get([room.id, taskId], null);
		if (task) {
			task.assignee = user.name;
			Db('tasks').set([room.id, taskId], task);
			return true;
		}
		return false;
	},
	complete: function (room, taskId) {
		let task = Db('tasks').get([room.id, taskId], null);
		if (task) {
			task.status = "Closed";
			Db('tasks').set([room.id, taskId], task);
			return true;
		}
		return false;
	},
	reopen: function (room, taskId) {
		let task = Db('tasks').get([room.id, taskId], null);
		if (task) {
			task.status = new Date().toLocaleString() + " (GMT)";
			Db('tasks').set([room.id, taskId], task);
			return true;
		}
		return false;
	},
	addDetail: function (room, taskId, addition) {
		let task = Db('tasks').get([room.id, taskId], null);
		if (task) {
			task.details.push(addition);
			Db('tasks').set([room.id, taskId], task);
			return true;
		}
		return false;
	},
	removeDetail: function (room, taskId, detailLine) {
		detailLine = parseInt(detailLine);
		let task = Db('tasks').get([room.id, taskId], null);
		if (task && !isNaN(detailLine)) {
			if (task.details.length >= detailLine) {
				task.details.splice(detailLine - 1, 1);
				Db('tasks').set([room.id, taskId], task);
				return true;
			}
		}
		return false;
	},
};

// it needs to be global so other things, such as league shop can automatically add items to here.
Rooms.global.addTask = TaskMethods.add;

exports.commands = {
	logs: 'task',
	tasks: 'task',
	task: {
		add: function (target, room, user) {
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			if (!this.can('announce', null, room)) return false;
			if (!target) return this.errorReply("/task add taskName [, details]");
			let parts = target.split(",");
			let taskId = TaskMethods.add(room, parts[0], user.name, parts[1] ? (parts.slice(1).join(",").trim()) : []);
			TaskMethods.view(room, user, "Your task has been added.", taskId);
			this.privateModCommand("(" + user.name + " has added a task - " + parts[0] + ")");
		},
		'': 'view',
		view: function (target, room, user) {
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			if (!this.can('announce', null, room)) return false;
			TaskMethods.view(room, user);
		},
		selfassign: function (target, room, user) {
			if (!target) return false;
			let parts = target.split(",");
			room = parts.shift();
			target = parts.join(",").trim();
			room = Rooms.get(room);
			if (!room || !this.can('announce', null, room) || !target) return false;
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			let success = TaskMethods.selfAssign(room, user, target);
			if (success) TaskMethods.view(room, user, "You have self-assigned yourself to task " + target + ".", target);
		},
		reopen: function (target, room, user) {
			if (!target) return false;
			let parts = target.split(",");
			room = parts.shift();
			target = parts.join(",").trim();
			room = Rooms.get(room);
			if (!room || !this.can('announce', null, room) || !target) return false;
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			let success = TaskMethods.reopen(room, target);
			if (success) TaskMethods.view(room, user, "You have reopened task " + target + ".", target);
		},
		complete: function (target, room, user) {
			if (!target) return false;
			let parts = target.split(",");
			room = parts.shift();
			target = parts.join(",").trim();
			room = Rooms.get(room);
			if (!room || !this.can('announce', null, room) || !target) return false;
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			let success = TaskMethods.complete(room, target);
			if (success) TaskMethods.view(room, user, "You have closed task " + target + ".", target);
		},
		delete: function (target, room, user) {
			if (!target) return false;
			let parts = target.split(",");
			room = parts.shift();
			target = parts.join(",").trim();
			room = Rooms.get(room);
			if (!room || !this.can('announce', null, room) || !target) return false;
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			let success = TaskMethods.remove(room, target);
			if (success) TaskMethods.view(room, user, "You have deleted task " + target + ".", target);
		},
		detail: function (target, room, user) {
			if (room.battle || room.isPersonal) return this.errorReply("You cannot manage tasks in battles or groupchats.");
			if (!this.can('announce', null, room)) return false;
			if (!target) return this.errorReply("/task detail [add / delete], [Task ID], [new detail / detail id]");
			let parts = target.split(",");
			if (parts.length < 3) return this.errorReply("/task detail [add / delete], [Task ID], [new detail / detail id]");
			let action = toId(parts[0]);
			let taskId = parts[1].trim();
			let detail = parts.slice(2).join(",").trim();
			let success;
			switch (action) {
			case 'add':
				success = TaskMethods.addDetail(room, taskId, detail);
				break;
			case 'remove':
			case 'delete':
				success = TaskMethods.removeDetail(room, taskId, detail);
				break;
			default:
				this.errorReply("/task detail [add / delete], [Task ID], [new detail / detail id]");
				break;
			}
			if (success) {
				TaskMethods.view(room, user, "You have " + (action + "ed").replace("ee", "e") + " a detail to task " + taskId + ".");
			} else {
				this.errorReply("/task detail [add / delete], [Task ID], [new detail / detail id]");
			}
		},
	},
	taskhelp: ["/task add taskName [, details] - adds a new task to the room's list of tasks.",
		"/tasks - views the room's current list of tasks.",
		"/task detail [add / delete], [TaskID], [new detail / detail id] - modifies the details for each tasks",
		"The other commands are used when you press the buttons in the control panel in /tasks",
		"Shop purchases are automatically set as tasks."],
};
