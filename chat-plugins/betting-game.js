'use strict'

let diceOne = function(dice) {
	dice = Math.floor(Math.random() * 6) + 1;
	return dice;
} 

let diceTwo = function(dice) {
	dice = Math.floor(Math.random() * 6) + 1;
	return dice;
}

let rng = function(n) {
	n = Math.floor(Math.random() * 100);
	return n
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}


exports.commands = {
	bet: function (target, room, user) {
		let firstDice = diceOne();
		let secondDice = diceTwo();
		let totalDice = firstDice + secondDice;

		let chances = rng();

		let choice = target.toUpperCase();

		let amount = Db('money').get(user.userid, 0);

		if (amount < 1) return this.errorReply("You don't have enough bucks for the bet.");

		if(!target) return this.parse('/help bet');

		switch(choice) {
			case 'ODD':
				Db('money').set(user.userid, amount - 1).get(user.userid);
				if (isOdd(totalDice)) {
					this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><center><h2 style="color: #444">' + user.name + '\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">'+ totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
					Db('money').set(user.userid, amount + 2).get(user.userid);
				}else{
					this.sendReply(":s...better luck next time...");
				}
			break;
			case 'EVEN':
				Db('money').set(user.userid, amount - 1).get(user.userid);
				if (isEven(totalDice)) {
					this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><center><h2 style="color: #444">' + user.name + '\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">'+ totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
					Db('money').set(user.userid, amount + 2).get(user.userid);
				}else{
					this.sendReply(":s...better luck next time...");
				}
			break;
			case '7': case 'SEVEN':
				Db('money').set(user.userid, amount - 1).get(user.userid);
				if (totalDice === 7 && chances > 70) {
					this.sendReply('|raw|<div class="infobox" style="background: rgba(190 , 190 , 190 , 0.4) ; border-radius: 2px"><div style="background: url(&quot;http://i.imgur.com/otpca0K.png?1&quot;) left center no-repeat"><div style="background: url(&quot;http://i.imgur.com/rrq3gEp.png&quot;) right center no-repeat"><center><h2 style="color: #444">' + user.name + '\'s both dices rolled a<br />total of <font style="color: #f00 ; text-decoration: underline">'+ totalDice + '</font>.</h2></center><br /><center><h2 style="color: #444">You Win!!</h2></center></div></div></div>');
					Db('money').set(user.userid, amount + 6).get(user.userid);
				}else{
					this.sendReply(":s...better luck next time...");
				}
			break;
			default:
				this.errorReply("Not a valid choice.");
		}
	},
	bethelp: ["/bet [case],[bet] - bet is a dice game where if the total of the dices match the case you'll win. Valid cases are odd(example: 3,5,7,9),even(example: 2,4,6,8),seven(example: 7)."],
	
};
