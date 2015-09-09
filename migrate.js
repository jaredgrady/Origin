var db = require('lowdb')(__dirname + '/config/db.json');

db.object.users.forEach(function (user) {
	if (!user.money && !user.seen) {
		db('users').remove({username: user.username});
	}
});

var users = db('users').filter(function (user) {
	return user.username.indexOf('guest') >= 0;
});
users.forEach(function () {
	var n = db('users').findIndex(function (user) {
		return user.username.indexOf('guest') >= 0;
	});
	db.object.users.splice(n, 1);
	db.save();
});

console.log(db('users').filter(function (user) {
	return user.username.indexOf('guest') >= 0;
}));
