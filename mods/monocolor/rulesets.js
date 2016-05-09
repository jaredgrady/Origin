'use strict';

exports.BattleFormats = {
    // Same Color Clause For The Tier Monocolor.
	samecolorclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Same Color Clause: Pok&eacute;mon in a team must share a color.');
		},
		onValidateTeam: function (team) {
			if (!team[0]) return;
			let template = this.getTemplate(team[0].species);
			let teamColor = template.color;
			if (!teamColor) return ["Your team must share a color."];
			for (let i = 0; i < team.length; i++) {
				let otherPokemonsTemplate = this.getTemplate(team[i].species);
				if (otherPokemonsTemplate.color !== teamColor) return ["Your team must share a color."];
				if (!otherPokemonsTemplate.color) return ["Your team must share a color."];
			}
		},
	},
};