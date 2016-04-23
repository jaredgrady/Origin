// run filters
'use strict';
let filterRegex = null;

function buildFilterRegex() {
	let filter = Object.keys(Db('filter').object());
	if (!filter.length) return filterRegex = null;
	// regex pattern taken from client
	filterRegex = new RegExp('(?:\\b|(?!\\w))(?:' + filter.join("|") + ')(?:\\b|\\B(?!\\w))', 'i');
}

buildFilterRegex();

exports.filterMessage = function (message) {
	if (filterRegex && filterRegex.test(message)) return true;
	return false;
};

exports.commands = {
	filter: "chatfilter",
	chatfilter: function (target, room, user, connection, cmd) {
		if (!user.can("declare")) return this.errorReply("The command '/" + cmd + "' was unrecognized. To send a message starting with '/" + cmd + "', type '//" + cmd + "'.");
		if (!target) return this.errorReply("/chatfilter [add | remove | regex | list](, [phrase / regex])");
		let parts = target.split(",");
		let action = toId(parts[0]);
		let selection = parts.slice(1).join(",").trim();
		switch (action) {
		case "add":
			if (!selection) return this.errorReply("/chatfilter [add | remove | regex | list](, [phrase / regex])");
			// de-regexify this.
			selection = selection.replace(/([^a-z0-9\s])/g, m => "\\" + m);
			if (Db('filter').get(selection, null)) return this.errorReply("This is already being filtered.");
			Db('filter').set([selection], 1);
			buildFilterRegex();
			this.parse('/chatfilter list');
			break;
		case "remove":
			if (!selection) return this.errorReply("/chatfilter [add | remove | regex | list](, [phrase / regex])");
			if (!Db('filter').get(selection, null)) {
				// check if there is a regexified version
				selection = selection.replace(/([^a-z0-9\s])/g, m => "\\" + m);
				if (!Db('filter').get(selection, null)) return this.errorReply("The selection is not found!");
			}
			Db('filter').delete(selection);
			buildFilterRegex();
			this.parse('/chatfilter list');
			break;
		case "regex":
			if (!this.can("bypassall")) return false;
			if (!selection) return this.errorReply("/chatfilter [add | remove | regex | list](, [phrase / regex])");
			if (/(?!\\)\(.*?(?:[^\\])[\*\+\?][^\)]*?(?!\\)\)([\*\+]|\{[0-9]+(\,|\,?[0-9]*?)\})/i.test(selection)) return this.errorReply("Your regular expression may contain some evil regex.  If you still wish to add this, use /chatfilter forceregex, " + selection);
			try {
				let test = new RegExp(selection);
			} catch (e) {
				return this.errorReply(e.message.substr(0, 28) === 'Invalid regular expression: ' ? e.message : 'Invalid regular expression: /' + selection + '/: ' + e.message);
			}
			Db('filter').set([selection], 1);
			buildFilterRegex();
			this.parse('/chatfilter list');
			break;
		// forceregex is for bypassing patterns that is otherwise limited by the ReDoS checker.
		case "forceregex":
			if (!this.can("bypassall")) return false;
			if (!selection) return this.errorReply("/chatfilter [add | remove | regex | list](, [phrase / regex])");
			if (action === "forceregex" && ["sparkychild", "fender"].indexOf(user.userid) === -1) return this.errorReply("You do not have premission to enter a potentially dangerous regular expression. Use /chatfilter regex, " + selection + " instead.");
			try {
				let test = new RegExp(selection);
			} catch (e) {
				return this.errorReply(e.message.substr(0, 28) === 'Invalid regular expression: ' ? e.message : 'Invalid regular expression: /' + selection + '/: ' + e.message);
			}
			Db('filter').set([selection], 1);
			buildFilterRegex();
			this.parse('/chatfilter list');
			break;
		default:
			this.sendReply("List of filtered phrases: " + Object.keys(Db('filter').object()).join(", "));
			break;
		}
	},
};
