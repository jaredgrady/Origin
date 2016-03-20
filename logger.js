'use strict';

const request = require('request');
const token = 'superSecretToken349859489DONOTSHAREPLZ294';

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
	});
}

module.exports = logMessage;
