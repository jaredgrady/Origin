'use strict';

const R = require('ramda');
const Task = require('data.task');
const Maybe = require('data.maybe');
const request = require('request');

const Just = Maybe.Just;
const Nothing = Maybe.Nothing;
const compose = R.compose;
const curry = R.curry;
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

const urbanDictionaryUrl = 'http://www.urbandictionary.com/iphone/search/define?term={TARGET}';
const dictUrl = 'http://api.wordnik.com:80/v4/word.json/{TARGET}/definitions?limit=3&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

// makeUrl :: String -> String -> String
const makeUrl = curry(function (baseUrl, t) {
	return replace('{TARGET}', t, baseUrl);
});

// extractUrbanDefinition :: JSON -> Maybe String
const extractUrbanDefinition = compose(map(prop('definition')), safeHead, prop('list'));

// urbandefine :: String -> Task Error (Maybe String)
const urbandefine = compose(map(extractUrbanDefinition), Http.get, makeUrl(urbanDictionaryUrl));

// extractDefition :: JSON -> Maybe String
const extractDefinition = compose(map(prop('text')), safeHead);

// define :: String -> Task Error (Maybe String)
const define = compose(map(extractDefinition), Http.get, makeUrl(dictUrl));

module.exports = {define: define, urbandefine: urbandefine};