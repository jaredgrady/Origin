/* Slots Details

777 = 1/4096 payout: 1000              ---0.24414
RRR = 1/512 payout: 300                ---0.58593
(pika)(pika)(pika) = 1/512 payout: 150 ---0.29297
(duck)(duck)(duck) = 1/512 payout: 100 ---0.19531
(mag)(mag)(mag) = 1/512 payout: 50     ---0.09765
(sh)(sh)(sh) = 27/4096 payout: 35      ---0.23071
(ch)(ch)(ch) = 1/64 payout: 20         ---0.31250
Overall payout: 1.95921

77x = 3/256
RRx = 3/64
Pika-Pika-x = 3/64
Duck-duck-x = 3/64
Mag-mag-x = 3/64
sh-sh-x = 27/256
Overall payout: 0

getting nothing: 681/1024
Overall payout: -1.99511

Net gain for the server: 0.0359 bucks per roll
*/

var house = {
	ante: 3,
	enabled: true,
};

var faces = {
	"sv": {
		name: "7",
		img: "http://cdn.bulbagarden.net/upload/f/f0/Celadon_Game_Corner_7_FRLG.png",
		payout: 1000,
	},
	"ro": {
		name: "R",
		img: "http://cdn.bulbagarden.net/upload/5/5e/Celadon_Game_Corner_R_FRLG.png",
		payout: 300,
	},
	"pi": {
		name: "Pikachu",
		img: "http://cdn.bulbagarden.net/upload/1/16/Celadon_Game_Corner_Pikachu_FRLG.png",
		payout: 150,
	},
	"pd": {
		name: "Psyduck",
		img: "http://cdn.bulbagarden.net/upload/5/5b/Celadon_Game_Corner_Psyduck_FRLG.png",
		payout: 100,
	},
	"mg": {
		name: "Magnemite",
		img: "http://cdn.bulbagarden.net/upload/a/a2/Celadon_Game_Corner_Magnemite_FRLG.png",
		payout: 50,
	},
	"sh": {
		name: "Shellder",
		img: "http://cdn.bulbagarden.net/upload/e/e8/Celadon_Game_Corner_Shellder_FRLG.png",
		payout: 35,
	},
	"ch": {
		name: "Cherry",
		img: "http://cdn.bulbagarden.net/upload/2/2f/Celadon_Game_Corner_Cherry_FRLG.png",
		payout: 20,
	},
}
var faceMatch = function(hexValue) {
	var id = "0123456789abcdef".indexOf(hexValue);
	return ["ch", "ch", "ch", "ch", "sh", "sh", "sh", "mg", "mg", "pd", "pd", "pi", "pi", "ro", "ro", "sv"][id];
}

function slotsRolling(user, randNum) {
	return '|uhtml|' + user + randNum + '|' + '<center><div style="display: inline-block; background: #949698; border: 1px solid #000; border-radius: 2px; padding: 5px;"><table style="background: #3C3C3C; margin-right: auto; margin-left: auto; border: 1px solid #000; border-radius: 2px;" cellspacing="8"><tr><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="http://i.imgur.com/iwkVDUN.gif" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="http://i.imgur.com/SubPUKp.gif" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="http://i.imgur.com/JiIK7RI.gif" height="24" width="32"></td></tr></table></div><img src="http://i.imgur.com/Ry0uzS7.png?3"></center>';
};

function slotMachine(user, randNum, roll1, roll2, roll3) {
	return '|uhtmlchange|' + user + randNum + '|' + '<center><div style="display: inline-block; background: #949698; border: 1px solid #000; border-radius: 2px; padding: 5px;"><table style="background: #3C3C3C; margin-right: auto; margin-left: auto; border: 1px solid #000; border-radius: 2px;" cellspacing="8"><tr><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll1 + '" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll2 + '" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll3 + '" height="24" width="32"></td></tr></table></div><img src="http://i.imgur.com/Ry0uzS7.png?3"></center>';
};

function parseRoll(array) {
	var details = {};
	for (var i = 0; i < array.length; i++) {
		var tId = array[i];
		if (!details[tId]) details[tId] = 0;
		details[tId]++
	}
	for (var id in details) {
		if (details[id] === 2) {
			return {
				match: "2",
				"id": id
			};
		}
		else if (details[id] === 3) {
			return {
				match: "3",
				"id": id
			};
		}
	}
	return {
		match: "1",
		id: null
	};
}

exports.commands = {

	slots: {
		start: 'roll',
		roll: function(target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Slots must be played in The Casino.');
			if (house.enabled === false) return this.errorReply('Slots is currently disabled.');
			if (user.isRolling) return this.errorReply('Wait till your previous roll finishes to roll again');
			if (!Db('money')[user.userid]) Db('money')[user.userid] = 0;
			if (house.ante > Db('money')[user.userid]) return this.sendReply("You do not have enough bucks to play slots.");
			var newTotal = (Db('money')[user.userid] || 0) - house.ante;
			Db('money')[user.userid] = newTotal;
			Db.save();
			user.isRolling = true;

			//lets get a randomNumber from 0 - 4095
			var randRollTotal = ~~(Math.random() * 4096);
			var rollId = randRollTotal.toString(16);
			rollId = "000".slice(rollId.length) + rollId;
			var rollFaces = [];
			var rolls = [];
			rollId.split("").forEach(function(f) {
				rollFaces.push(faceMatch(f));
				rolls.push(faces[faceMatch(f)].img);
			}); //returns a character for each;
			//now that you have your three faces;
			//get the images for each;


			var randNum = Math.floor(Math.random() * 1000);
			var display = slotMachine(user, randNum, rolls[0], rolls[1], rolls[2]);
			var rollView = slotsRolling(user, randNum);
			user.sendTo(room, rollView);

			//get details on roll
			var rollDetails = parseRoll(rollFaces);

			setTimeout(function() {
				user.sendTo(room, display);
				//odds for 2 in a row; fuck cherries they're too popular xD
				if (rollDetails.match == 2 && rollDetails.id !== "ch") {
					var win = false;
					var winnings = house.ante;
					var userTotal = (Db('money')[user.userid] || 0) + winnings;
					Db('money')[user.userid] = userTotal;
					Db.save();
					user.isRolling = false;
					return user.sendTo(room, "You hit 2 " + faces[rollDetails.id].name + "'s and got your ante back.");
				}

				if (rollDetails.match == 3) {
					var win = true;
					var winnings = faces[rollDetails.id].payout + house.ante;
					if (rollDetails.id === "sv") {
						user.sendTo(room, "You've hit the jackpot!");
						room.addRaw('<h3> ' + user + ' has hit a Jackpot on the slots!</h3>');
					}
					else {
						user.sendTo(room, "You've won " + (winnings - 3) + " Bucks!");
					}
				}
				else {
					user.isRolling = false;
					return user.sendTo(room, "Better luck next time!");
				}
				if (win) {
					user.isRolling = false;
					var userTotal = (Db('money')[user.userid] || 0) + winnings;
					Db('money')[user.userid] = userTotal;
					Db.save();
					logMoney(user + " won " + winnings + " from the slots.");
				}
			}, 3000);
		},
		rollhelp: ["Plays a game of dice after paying the ante. Must be played in casino."],

		enable: function(target, room, user, cmd) {
			if (!user.can('makechatroom')) return this.errorReply('/slots enable - Access Denied.');
			house.enabled = true;
			this.sendReply("Slots has been enabled.");
		},
		enablehelp: ["Enable the playing of slots."],

		disable: function(target, room, user, cmd) {
			if (!user.can('makechatroom')) return this.errorReply('/slots disable - Access Denied.');
			house.enabled = false;
			this.sendReply("Slots has been disabled.");
		},
		disablehelp: ["Disable the playing of slots."],

		ante: function(target, room, user) {
			if (!user.can('hotpatch')) return this.errorReply('/slots ante - Access Denied.');
			if (!target) return this.parse('/help antehelp');
			if (typeof target === 'string') return this.sendReply(target);
			house.ante = target;
			this.sendReply("The ante for playing slots has been set to " + house.ante + " .");
		},
		antehelp: ["Sets the ante for playing slots. Require ~."]
	},
	slotshelp: ["commands for /slots are:",
		"/slots enable - Enable the playing of slots.",
		"/slots disable - Disable the playing of slots.",
		"/slots ante - Sets the ante for playing slots. Require ~.",
		"/slots roll - Pay the ante and play a game of slots.",
	]
};
