'use strict';

const request = require('request');
const token = '1\xa2/+\x91\x1c\xe4O>v5\xab\x8c\xf5\xac+R*pa\x88\xc6(\xe2\x9a\xcb%/\x84\x9e\x19U';

function logMessage(data) {
	request.post('http://origin-data.herokuapp.com/add', {
		token: token,
		data: data,
	});
}

module.exports = logMessage;
