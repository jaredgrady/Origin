//Made by Niisama
 
'use strict';
 
let color = require('../config/color');
let moment = require('moment'); 
let BR = '<br>';
let SPACE = '&nbsp;';
let BIGSPACE = '&nbsp;&nbsp;&nbsp;&nbsp;';
let profileColor = '#24678d';
let onlineFriendListOutput = '';
let offlineFriendListOutput = '';
let numOnline = 0;
let numOffline = 0;
 
 
/**
 * Friends constructor.
 *
 * @param {Boolean} isOnline
 * @param {Object|String} user - if isOnline then Object else String
 */
function Friends(isOnline, user) {
    this.isOnline = isOnline || false;
    this.user = user || null;
 
    this.username = Tools.escapeHTML(this.isOnline ? this.user.name : this.user);
}
 
/**
 * Create an bold html tag element.
 *
 * Example:
 * createFont('Hello World!');
 * => '<b>Hello World!</b>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function bold(text) {
    return '<b>' + text + '</b>';
}
 
/**
 * Create an font html tag element.
 *
 * Example:
 * createFont('Hello World!', 'blue');
 * => '<font color="blue">Hello World!</font>'
 *
 * @param {String} color
 * @param {String} text
 * @return {String}
 */
function font(color, text) {
    return '<font color="' + color + '">' + text + '</font>';
}
 
/**
 * Create a font html element wrap around by a bold html element.
 * Uses to `profileColor` as a color.
 * Adds a colon at the end of the text and a SPACE at the end of the element.
 *
 * Example:
 * label('Name');
 * => '<b><font color="#24678d">Name:</font></b> '
 *
 * @param {String} text
 * @return {String}
 */
function label(text) {
    return bold(font(profileColor, text + ':')) + SPACE;
}
 
 
Friends.prototype.name = function () {
        let css = 'border:none;background:none;padding:0;float:left;';
        let userName = bold(font(color(toId(this.username)), this.username))
    return '<button style="' + css + '" name="parseCommand" value="/user ' + this.username + '">' + userName + "</button>";
};
 
Friends.prototype.seen = function (timeAgo) {
    if (this.isOnline)
        return  font('#2ECC40', 'Online');
    else
        return  font('##ff0000', 'Offline');
};
 
 
Friends.prototype.addFriendToOutput = function (callback) {
    let userid = toId(this.username);
   
    if (this.isOnline) {
    onlineFriendListOutput += '<tr>' + '<td>' + this.name() + '</td>' + '<td>'  + this.seen(Db('seen').get(userid)) + '</td>' + '</tr>';
    ++numOnline;
    } else {
        offlineFriendListOutput += '<tr>' + '<td>' + this.name() + '</td>' + '<td>' + this.seen(Db('seen').get(userid)) + '</td>' + '</tr>';
        ++numOffline;
    }
       
};
 
function clearFriendList() {
    onlineFriendListOutput = '';
    offlineFriendListOutput = '';
    numOnline = 0;
    numOffline = 0;
}
 
function getFriendsOutput() {
        return label('Online Friends (' + numOnline +') ') + BR +
             '<table>' + onlineFriendListOutput + '</table>' +
                label('Offline Friends (' + numOffline +') ') + BR +
            '<table>' + offlineFriendListOutput + '</table>' + '<br clear="all">';
}
 
 
exports.commands = {
        friends: function (target, room, user) {
        if (!this.canBroadcast()) return;
        let data = Db('FriendsDB').get(toId(user));
        if (typeof data !== 'undefined' && data !== null) {
        let rows = data.split(",");
        let friends = [];
        for(var i = 0; i < rows.length; i++) {
            if (rows[i] != '') {
            friends.push(rows[i]);
            }
        }
        for (var i = 0; i < friends.length; i++) {
            let friend;
            let userid = toId(friends[i]);
            let targetUser = Users.getExact(userid);
            if (!targetUser) {
                friend = new Friends(false, userid);
            } else {
                friend = new Friends(true, targetUser);
            }
            friend.addFriendToOutput();
        }
        this.sendReplyBox(getFriendsOutput());
        clearFriendList();
        } else {
            this.sendReplyBox('You have no friends ;(' + BR + '/addfriend to add a friend');
        }
       
    },
        addfriend: function (target, room, user) {
        if (target.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
         if (target.length < 3) return this.sendReply("Usernames are required to be greater than 2 characters long.");
        let insertStatement = '';
       
        Db('FriendsDB').set(toId(user),  Db('FriendsDB').get(toId(user)) + ',undefined,');
        let data = Db('FriendsDB').get(toId(user));
        let rows = data.split(",");
        let friends = [];
        for(var j = 0; j < rows.length; j++) {
            if(rows[j] != 'undefined') {
                friends.push(rows[j]);
            }
        }
        friends.push(toId(target));
       
        var uniqueFriends = [];
        uniqueFriends = friends.filter(function(elem, pos) {
        return friends.indexOf(elem) == pos;
        })
       
       
        for(var i = 0; i < uniqueFriends.length; i++) {
            insertStatement += uniqueFriends[i] + ',';
        }      
         Db('FriendsDB').set(toId(user),  insertStatement);
         this.sendReply(target + ' has been added to your friend list.');
    },
        unfriend: 'removefriend',
        removefriend: function (target, room, user) {
        if (target.length >= 19) return this.sendReply("Usernames are required to be less than 19 characters long.");
        if (target.length < 3) return this.sendReply("Usernames are required to be greater than 2 characters long.");
        let insertStatement = '';
       
         Db('FriendsDB').set(toId(user),  Db('FriendsDB').get(toId(user)) + ',undefined,');
        let data = Db('FriendsDB').get(toId(user));
        let rows = data.split(",");
        let friends = [];
        for(var j = 0; j < rows.length; j++) {
            if(rows[j] != 'undefined') {
                if (rows[j] != toId(target)) {
                friends.push(rows[j]);
                }
            }
        }
       
        var uniqueFriends = [];
        uniqueFriends =
        friends.filter(function(elem, pos) {
        return friends.indexOf(elem) == pos;
        })
       
       
        for(var i = 0; i < uniqueFriends.length; i++) {
            insertStatement += uniqueFriends[i] + ',';
        }      
         Db('FriendsDB').set(toId(user),  insertStatement);
         this.sendReply(target + ' has been removed from your friend list.');
    },
   
    friendlist: function (room, user) {
        this.sendReplyBox('/friends list of friends' + BR + '/addfriend to add a friend' + BR+ '/removefriend to remove a friend'  + BR + BR + 'Friendlist made by Niisama');
    },
        friendshelp: ["/addfriend to add a new friend"],
};
