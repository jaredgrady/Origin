'use strict';

const R = require('ramda');
const Task = require('data.task');
const Maybe = require('data.maybe');
const request = require('request');

const Just = Maybe.Just;
const Nothing = Maybe.Nothing;
const compose = R.compose;
const head = R.head;
const map = R.map;
const prop = R.prop;
const replace = R.replace;

// safeHead :: [a] -> Maybe a
const safeHead = function (xs) {
	const firstElement = head(xs);
	if (firstElement) return Just(firstElement);
	return Nothing();
};

const Http = {
	// get :: String -> Task Error JSON
	get: function (url) {
		return new Task(function (reject, resolve) {
			return request(url, function (err, res, body) {
				if (err || res.statusCode !== 200) return reject(err);
				resolve(JSON.parse(body));
			});
		});
	},
};

const baseUrl = 'http://www.urbandictionary.com/iphone/search/define?term={TARGET}';

// makeUrl :: String -> String
const makeUrl = function (t) {
	return replace('{TARGET}', t, baseUrl);
};

// extractDefinition :: JSON -> String
const extractDefinition = compose(map(prop('definition')), safeHead, prop('list'));

// urbandefine :: String -> Task Error (Maybe String)
const urbandefine = compose(map(extractDefinition), Http.get, makeUrl);

module.exports = urbandefine;