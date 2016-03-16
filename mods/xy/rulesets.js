'use strict';

exports.BattleFormats = {
	sametypeclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Same Type Clause: Pokémon in a team must share a type');
		},
		onValidateTeam: function (team, format, teamHas) {
			if (!team[0]) return;
			let template = this.getTemplate(team[0].species);
			let typeTable = template.types;
			if (!typeTable) return ["Your team must share a type."];
			for (let i = 1; i < team.length; i++) {
				template = this.getTemplate(team[i].species);
				if (!template.types) return ["Your team must share a type."];

				typeTable = typeTable.intersect(template.types);
				if (!typeTable.length) return ["Your team must share a type."];
			}
			if (format.id === 'monotypexy') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Steel':
					if (teamHas['aegislash']) return ["Aegislash is banned from Steel monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypexy') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Steel':
					if (teamHas['mawilite']) return ["Mega mawile is banned from Steel monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypexy') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Steel':
					if (teamHas['genesect']) return ["Genesect is banned from Steel monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypexy') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Flying':
					if (teamHas['shayminsky']) return ["Shaymin is banned from Flying monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypexy') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Dragon':
					if (teamHas['kyuremwhite']) return ["KyuremWhite is banned from Dragon monotype teams."];
					break;
				}
			}
		},
	},
};
