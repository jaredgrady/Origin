'use strict';

const request = require('request');
const token = 'superSecretToken349859489DONOTSHAREPLZ294';
const SIX_HOURS = 21600000;

let tempData = [];
let lastSentLog = Date.now();

function logMessage(data) {
	request.post('http://origin-data.herokuapp.com/add', {
		form: {
			token: token,
			message: data.message,
			name: data.name,
			type: data.type,
			typeData: data.typeData,
			date: data.date,
		},
	}, (err, response, body) => {
		if (err) console.error(err);
		// save data to temporary array when error or data server is down
		if (body !== '"success"') {
			tempData.push(data);
			if ((Date.now() - lastSentLog) > SIX_HOURS) {
				let tmp = tempData;
				lastSentLog = Date.now();
				tempData = [];
				for (let i = 0; i < tmp.length; i++) {
					logMessage(tmp[i]);
				}
			}
		} else {
			lastSentLog = Date.now();
			tempData = [];
		}
	});
}

module.exports = logMessage;
