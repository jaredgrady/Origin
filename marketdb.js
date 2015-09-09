var low = require('lowdb');
var path = require('path');

var lowFile = path.join(__dirname, 'config/market.json');

var databases = {};

databases.lowdb = function () {
	var db = low(lowFile);
	var methods = {};

	/**
	 * Reads a key in the database.
	 *
	 * @param {String} key
	 * @param {String} user
	 * @param {Function} callback(err, value)
	 */
	methods.read = function (key, username, callback) {
		var user = db('users').find({username: username});
		if (!user) return callback('User does not exist.');
		if (!user.hasOwnProperty(key)) return callback('Key does not exist.');
		callback(null, user[key]);
	};

	/**
	 * Writes a key to value in the database.
	 *
	 * @param {String} key
	 * @param {*} value
	 * @param {String} user
	 * @param {Function} callback(err, value)
	 */
	methods.write = function (key, value, username, callback) {
		var user = db('users').find({username: username});
		if (!user) db('users').push({username: username});
		var obj = {};
		obj[key] = value;
		var val = db('users')
					.chain()
					.find({username: username})
					.assign(obj)
					.value();

		callback(null, val[key]);
	};
	
	 /**
	 * Adds a key to an object in the database.
	 *
	 * @param {String} key
	 * @param {*} value
	 * @param {String} user
	 * @param {Function} callback(err, value)
	 */
	methods.add = function (key, value, username, callback) {
		var user = db('users').find({username: username});
		if (!user) db('users').push({username: username});
		var user = db('users').find({username: username});
		var obj = {};
		if (!user.hasOwnProperty(key)) {
			obj[key] = [value];
		} else {
			objA = user[key];
			objA.push(value);
			obj[key] = objA;
		}
		var val = db('users')
					.chain()
					.find({username: username})
					.assign(obj)
					.value();

		callback(null, val[key]);
	};
	
	 /**
	 * Removes a key to an object in the database.
	 *
	 * @param {String} key
	 * @param {*} value
	 * @param {String} user
	 * @param {Function} callback(err, value)
	 */
	methods.remove = function (key, value, username, callback) {
		var user = db('users').find({username: username});
		if (!user) return calback("You don't have this card");
		var obj = {};
		if (!user.hasOwnProperty(key)) {
			return calback("You don't have this card");
		} else {
			objA = user[key];
			for(var a = 0; a < objA.length; a++) {
				if (objA[a].hasOwnProperty('id') && objA[a].id === value) {
					objA.splice(a, 1);
					break;
				}
			}	
			obj[key] = objA;
		}
		var val = db('users')
					.chain()
					.find({username: username})
					.assign(obj)
					.value();

		callback(null, val[key]);
	};

	/**
	 * Combined value from all rows.
	 *
	 * @param {String} key
	 * @param {Function} callback(err, total)
	 */
	methods.total = function (key, callback) {
		var total = db('users').reduce(function (total, obj) {
			return total + obj[key];
		});
		callback(null, total);
	};

	/**
	 * Gets how many users there are.
	 *
	 * @param {Function} callback(err, size)
	 */
	methods.countUsers = function (callback) {
		return callback(null, db('users').size());
	};

	return methods;
};

function MarketPlace (database) {
	return databases[database]();
}

module.exports = MarketPlace;
