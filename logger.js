'use strict';

const request = require('request');
const token = 'superSecretToken349859489DONOTSHAREPLZ294';

let urls = [
	'http://origin-data.herokuapp.com/add',
	'http://data-origin.herokuapp.com/add'
];
let index = 0;

function logMessage(data) {
	request.post(urls[index], {
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
		if (body !== 'success') {
			index = index ? 0 : 1;
			logMessage(data);
		}
		console.log(body, index);
	});
}

module.exports = logMessage;
