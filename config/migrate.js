var fs = require('fs');
var db = require('lowdb')(__dirname + '/db.json');

var users = db('users').filter(function (user) {
  return user.money > 0;
}).map(function (user) {
    return {username: user.username, money: user.money};
});
var obj = {};
obj['users'] = users;
fs.writeFile('db2.json', JSON.stringify(obj, null, 2), function (err) {
  if (err) throw err;
});
