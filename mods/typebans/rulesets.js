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
			if (format.id === 'monotypetypebans') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Steel':
					if (teamHas['aegislash']) return ["Aegislash is banned from Steel monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypetypebans') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Flying':
					if (teamHas['charizarditex']) return ["Mega Charizard X is banned from Flying monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypetypebans') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Psychic':
					if (teamHas['hoopaunbound']) return ["Hoopa-Unbound is banned from Psychic monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypetypebans') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Dark':
					if (teamHas['sablenite']) return ["Mega Sableye is banned from Dark monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypetypebans') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Water':
					if (teamHas['damprock']) return ["Damp Rock is banned from Water monotype teams."];
					break;
				}
			}
			if (format.id === 'monotypetypebans') {
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Ground':
					if (teamHas['smoothrock']) return ["Smooth Rock is banned from Ground monotype teams."];
					break;
				}
			}
		},
	},
};
