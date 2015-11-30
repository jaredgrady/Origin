var house = {
	ante: 3,
	enabled: true, 
};

var faces = [["http://cdn.bulbagarden.net/upload/f/f0/Celadon_Game_Corner_7_FRLG.png", "http://cdn.bulbagarden.net/upload/5/5e/Celadon_Game_Corner_R_FRLG.png"], 
		["http://cdn.bulbagarden.net/upload/1/16/Celadon_Game_Corner_Pikachu_FRLG.png", "http://cdn.bulbagarden.net/upload/5/5b/Celadon_Game_Corner_Psyduck_FRLG.png" ], 
		 ["http://cdn.bulbagarden.net/upload/a/a2/Celadon_Game_Corner_Magnemite_FRLG.png", "http://cdn.bulbagarden.net/upload/e/e8/Celadon_Game_Corner_Shellder_FRLG.png"], 
		]; 

function slotMachine(roll1, roll2, roll3) {
	return '<center><div style="display: inline-block; background: #949698; border: 1px solid #000; border-radius: 2px; padding: 5px;"><table style="background: #3C3C3C; margin-right: auto; margin-left: auto; border: 1px solid #000; border-radius: 2px;" cellspacing="8"><tr><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll1 + '" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll2 + '" height="24" width="32"></td><td style="padding-top: 4px; padding-bottom: 4px; border: 1px solid #AF8749; border-radius: 2px; background: -webkit-linear-gradient(#FDFDFD, #D7D7D7); background: -o-linear-gradient(#FDFDFD, #D7D7D7); background: -moz-linear-gradient(#FDFDFD, #D7D7D7); background: linear-gradient(#FDFDFD, #D7D7D7);"><img src="' + roll3 + '" height="24" width="32"></td></tr></table></div><img src="http://i.imgur.com/Ry0uzS7.png?3"></center>'
};

function rollReels() { 
	var rarity = Math.floor((Math.random() * 4))
	if (rarity === 3) {
		return faces[0][Math.floor(Math.random() * 2)];
		}
	else if (rarity === 2) {
		return faces[1][Math.floor(Math.random() * 2)];
		}
	else if (rarity === 1) {
		return faces[2][Math.floor(Math.random() * 2)];
		}
	};
		
exports.commands = {
	
	slots: {
		start: 'roll',
		roll: function (target, room, user) {
			if (room.id !== 'casino') return this.errorReply('Slots must be played in The Casino.');
			if (house.enabled === false) return this.errorReply('Slots is currently disabled.');
			if(!Db('money')[user.userid]) Db('money')[user.userid] = 0;
			if (house.ante > Db('money')[user.userid]) return this.sendReply("You do not have enough bucks to play slots.");
			var newTotal = (Db('money')[user.userid] || 0) - house.ante;
			Db('money')[user.userid] = newTotal;
			Db.save();
			var roll1 = rollReels();
			var roll2 = rollReels();
			var roll3 = rollReels();
			var display = slotMachine(roll1, roll2, roll3);
			this.sendReplyBox(display);
			
			if (roll1 === roll2 && roll2 === roll3) {
				if (roll1 === faces[0][0] || roll1 === faces[0][1]) {
					var win = true;
					var winnings = 3- + ante;
					this.sendReply("You've hit the jackpot!");
					room.addRaw('<h3> ' + user + 'has hit a Jackpot on the slots!</h3>');
				}
			else if (roll1 === faces[1][0] || roll1 === faces[1][1]) {
					var win = true;
					var winnnings = 15 + ante;
					this.sendReply("You've won the 15 Bucks!");
				}
			else if (roll1 === faces[2][0] || roll1 === faces[2][1]) {
					var win = true;
					var winnnings = 10 + ante;
					this.sendReply("You've won 5 Bucks!");
				}
			}
			else {
				console.log("lose");
				return this.sendReply("Better luck next time!");
			}
			if (win) {
				var userTotal = (Db('money')[user.userid] || 0) + winnings;
				Db('money')[user.userid] = userTotal;
				Db.save();
			}
		},
		rollhelp: ["Plays a game of dice after paying the ante. Must be played in casino."],
			
		enable: function (target, room, user, cmd) {
			if (!user.can('makechatroom')) return this.errorReply('/slots enable - Access Denied.');
			house.enabled = true;
			this.sendReply("Slots has been enabled.");
		},
		enablehelp: ["Enable the playing of slots."],
		
		disable: function (target, room, user, cmd) {
			if (!user.can('makechatroom')) return this.errorReply('/slots disable - Access Denied.');
			house.enabled = false;
			this.sendReply("Slots has been disabled.");
		},
		disablehelp: ["Disable the playing of slots."],
				
		ante: function (target, room, user) {
			if (!user.can('hotpatch')) return this.errorReply('/slots ante - Access Denied.');
			if (!target) return this.parse('/help antehelp');
			if (typeof target === 'string') return this.sendReply(target);
			house.ante = target;
			this.sendReply("The ante for playing slots has been set to " + ante + " .");
		},
		antehelp: ["Sets the ante for playing slots. Require ~."]
	},
	slotshelp: ["commands for /slots are:",
		"/slots enable - Enable the playing of slots.",
		"/slots disable - Disable the playing of slots.",
		"/slots ante - Sets the ante for playing slots. Require ~.",
		"/slots roll - Pay the ante and play a game of slots.",]
};
