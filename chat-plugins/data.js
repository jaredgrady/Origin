'use strict';

const request = require('request');
const getUrl = require('../logger').getUrl;

function get(data) {
	return new Promise(function (resolve, reject) {
		request(getUrl() + data, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				resolve(JSON.parse(body));
			} else {
				reject();
			}
		});
	});
}

function rankLadder(title, type, array, prop) {
	const ladderTitle = '<center><h4><u>' + title + '</u></h4></center>';
	const thStyle = 'class="rankladder-headers default-td" style="background: -moz-linear-gradient(#576468, #323A3C); background: -webkit-linear-gradient(#576468, #323A3C); background: -o-linear-gradient(#576468, #323A3C); background: linear-gradient(#576468, #323A3C); box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const tableTop = '<div style="max-height: 310px; overflow-y: scroll;">' +
		'<table style="width: 100%; border-collapse: collapse;">' +
		'<tr>' +
			'<th ' + thStyle + '>Rank</th>' +
			'<th ' + thStyle + '>' + prop + '</th>' +
			'<th ' + thStyle + '>' + type + '</th>' +
		'</tr>';
	const tableBottom = '</table></div>';
	const tdStyle = 'class="rankladder-tds default-td" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const first = 'class="first default-td important" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const second = 'class="second default-td important" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	const third = 'class="third default-td important" style="box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.3) inset, 1px 1px 1px rgba(255, 255, 255, 0.7) inset;"';
	let midColumn;
	const length = array.length;

	let tableRows = '';

	for (let i = 0; i < length; i++) {
		if (i === 0) {
			midColumn = '</td><td ' + first + '>';
			tableRows += '<tr><td ' + first + '>' + (i + 1) + midColumn + array[i][prop] + midColumn + array[i].count + '</td></tr>';
		} else if (i === 1) {
			midColumn = '</td><td ' + second + '>';
			tableRows += '<tr><td ' + second + '>' + (i + 1) + midColumn + array[i][prop] + midColumn + array[i].count + '</td></tr>';
		} else if (i === 2) {
			midColumn = '</td><td ' + third + '>';
			tableRows += '<tr><td ' + third + '>' + (i + 1) + midColumn + array[i][prop] + midColumn + array[i].count + '</td></tr>';
		} else {
			midColumn = '</td><td ' + tdStyle + '>';
			tableRows += '<tr><td ' + tdStyle + '>' + (i + 1) + midColumn + array[i][prop] + midColumn + array[i].count + '</td></tr>';
		}
	}
	return ladderTitle + tableTop + tableRows + tableBottom;
}

exports.commands = {
	mostusedword: function (target, room, user) {
		if (!this.canBroadcast()) return;
		get('word').then(data => {
			this.sendReplyBox(rankLadder('Most Used Word', 'Count', data, 'word'));
			room.update();
		}).catch(() => {
			console.error('All data servers are down.');
		});
	},

	mostusedphrase: function (target, room, user) {
		if (!this.canBroadcast()) return;
		get('phrase').then(data => {
			this.sendReplyBox(rankLadder('Most Used Phrase', 'Count', data, 'phrase'));
			room.update();
		}).catch(() => {
			console.error('All data servers are down.');
		});
	},

	mostactiveuser: function (target, room, user) {
		if (!this.canBroadcast()) return;
		get('user').then(data => {
			this.sendReplyBox(rankLadder('Most Active User', 'Activity', data, 'user'));
			room.update();
		}).catch(() => {
			console.error('All data servers are down.');
		});
	},

	mostactiveroom: function (target, room, user) {
		if (!this.canBroadcast()) return;
		get('room').then(data => {
			this.sendReplyBox(rankLadder('Most Active Room', 'Activity', data, 'room'));
			room.update();
		}).catch(() => {
			console.error('All data servers are down.');
		});
	},
};