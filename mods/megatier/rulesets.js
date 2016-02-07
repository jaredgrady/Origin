'use strict';

exports.BattleFormats = {
	pokemon: {
		effectType: 'Banlist',
		validateTeam: function (team, format) {
			var problems = [];
			// ----------- legality line ------------------------------------------
			if (!format || !format.banlistTable || !format.banlistTable['illegal']) return problems;
			// everything after this line only happens if we're doing legality enforcement
			var kyurems = 0;
			for (var i = 0; i < team.length; i++) {
				if (team[i].species === 'Kyurem-White' || team[i].species === 'Kyurem-Black') {
					if (kyurems > 0) {
						problems.push('You cannot have more than one Kyurem-Black/Kyurem-White.');
						break;
					}
					kyurems++;
				}
			}
			return problems;
		},
		validateSet: function (set, format) {
			var item = this.getItem(set.item);
			var template = this.getTemplate(set.species);
			var problems = [];
			var totalEV = 0;
			var allowCAP = !!(format && format.banlistTable && format.banlistTable['allowcap']);

			if (set.species === set.name) delete set.name;
			if (template.gen > this.gen) {
				problems.push(set.species + ' does not exist in gen ' + this.gen + '.');
			}
			var ability = {};
			if (set.ability) {
				ability = this.getAbility(set.ability);
				if (ability.gen > this.gen) {
					problems.push(ability.name + ' does not exist in gen ' + this.gen + '.');
				}
			}
			if (set.moves) {
				for (var i = 0; i < set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					if (move.gen > this.gen) {
						problems.push(move.name + ' does not exist in gen ' + this.gen + '.');
					} else if (!allowCAP && move.isNonstandard) {
						problems.push(move.name + ' is not a real move.');
					}
				}
			}
			if (item.gen > this.gen) {
				problems.push(item.name + ' does not exist in gen ' + this.gen + '.');
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (!allowCAP || template.tier !== 'CAP') {
				if (template.isNonstandard) {
					problems.push(set.species + ' is not a real Pokemon.');
				}
				if (ability.isNonstandard) {
					problems.push(ability.name + ' is not a real ability.');
				}
				if (item.isNonstandard) {
					problems.push(item.name + ' is not a real item.');
				}
			}
			for (var k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			// In gen 6, it is impossible to battle other players with pokemon that break the EV limit
			if (totalEV > 510 && this.gen >= 6) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			// ----------- legality line ------------------------------------------
			if (!format.banlistTable || !format.banlistTable['illegal']) return problems;
			// everything after this line only happens if we're doing legality enforcement

			// only in gen 1 and 2 it was legal to max out all EVs
			if (this.gen >= 3 && totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			// "Undiscovered" egg group Pokemon caught in the wild in gen 6 must have at least 3 perfect IVs
			if (set.ivs && this.gen >= 6 && ((template.species in {Xerneas:1, Yveltal:1, Zygarde:1}) ||
				(format.requirePentagon && template.eggGroups.indexOf('Undiscovered') >= 0 && !template.evos.length))) {
				var perfectIVs = 0;
				for (var i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " has less than three perfect IVs.");
			}

			// limit one of each move
			var moves = [];
			if (set.moves) {
				var hasMove = {};
				for (var i = 0; i < set.moves.length; i++) {
					var move = this.getMove(set.moves[i]);
					var moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			/*if (template.isMega) {
				// Mega evolutions evolve in-battle
				set.species = template.baseSpecies;
				var baseAbilities = Tools.getTemplate(set.species).abilities;
				var niceAbility = false;
				for (var i in baseAbilities) {
					if (baseAbilities[i] === set.ability) {
						niceAbility = true;
						break;
					}
				}
				if (!niceAbility) set.ability = baseAbilities['0'];
			} else if (template.isPrimal) {
				// Primal Reversion happens in-battle
				set.species = template.baseSpecies;
				set.ability = Tools.getTemplate(set.species).abilities['0'];
			}*/
			if (template.requiredItem && item.name !== template.requiredItem) {
				if (/arceus/i.test(set.name) || /arceus/i.test(set.species)) {
					problems.push((set.name || set.species) + ' needs to hold ' + template.requiredItem + '.');
				}
			}
			if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
				problems.push((set.name || set.species) + ' needs to have the move ' + template.requiredMove + '.');
			}
			/*if (template.num === 351) { // Castform
				set.species = 'Castform';
			}
			if (template.num === 421) { // Cherrim
				set.species = 'Cherrim';
			}*/
			if (template.num === 493) { // Arceus
				if (set.ability === 'Multitype' && item.onPlate) {
					set.species = 'Arceus-' + item.onPlate;
				/*} else {
					set.species = 'Arceus';*/
				}
			}
			/*if (template.num === 555) { // Darmanitan
				if (set.species === 'Darmanitan-Zen' && ability.id !== 'zenmode') {
					problems.push('Darmanitan-Zen transforms in-battle with Zen Mode.');
				}
				set.species = 'Darmanitan';
			}*/
			if (template.num === 487) { // Giratina
				if (item.id === 'griseousorb') {
					set.species = 'Giratina-Origin';
					set.ability = 'Levitate';
				/*} else {
					set.species = 'Giratina';
					set.ability = 'Pressure';*/
				}
			}
			if (template.num === 647) { // Keldeo
				if (set.moves.indexOf('secretsword') < 0) {
					set.species = 'Keldeo';
				}
			}
			/*if (template.num === 648) { // Meloetta
				if (set.species === 'Meloetta-Pirouette' && set.moves.indexOf('relicsong') < 0) {
					problems.push('Meloetta-Pirouette transforms in-battle with Relic Song.');
				}
				set.species = 'Meloetta';
			}*/
			if (template.num === 649) { // Genesect
				switch (item.id) {
				case 'burndrive':
					set.species = 'Genesect-Burn';
					break;
				case 'chilldrive':
					set.species = 'Genesect-Chill';
					break;
				case 'dousedrive':
					set.species = 'Genesect-Douse';
					break;
				case 'shockdrive':
					set.species = 'Genesect-Shock';
					break;
				default:
					set.species = 'Genesect';
				}
			}
			/*if (template.num === 681) { // Aegislash
				set.species = 'Aegislash';
			}*/

			if (template.unobtainableShiny) {
				set.shiny = false;
			}
			return problems;
		},
	},
	teampreview: {
		onStartPriority: -10,
		onStart: function () {
			this.add('clearpoke');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				this.add('poke', this.sides[0].pokemon[i].side.id, this.sides[0].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				this.add('poke', this.sides[1].pokemon[i].side.id, this.sides[1].pokemon[i].details.replace(/(Arceus|Gourgeist|Genesect|Pumpkaboo)(-[a-zA-Z?]+)?/g, '$1-*'));
			}
		},
		onTeamPreview: function () {
			this.makeRequest('teampreview');
		},
	},
	speciesclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Species Clause: Limit one of each Pok�mon');
		},
		validateTeam: function (team, format) {
			var speciesTable = {};
			for (var i = 0; i < team.length; i++) {
				var template = this.getTemplate(team[i].species);
				if (speciesTable[template.num]) {
					return ["You are limited to one of each Pok�mon by Species Clause.", "(You have more than one " + template.name + ")"];
				}
				speciesTable[template.num] = true;
			}
		},
	},
	nicknameclause: {
		effectType: 'Rule',
		validateTeam: function (team, format) {
			var nameTable = {};
			for (var i = 0; i < team.length; i++) {
				var name = team[i].name;
				if (name) {
					if (name === team[i].species) continue;
					if (nameTable[name]) {
						return ["Your Pok�mon must have different nicknames.",  "(You have more than one " + name + ")"];
					}
					nameTable[name] = true;
				}
			}
			// Illegality of impersonation of other species is
			// hardcoded in team-validator.js, so we are done.
		},
	},
	itemclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Item Clause: Limit one of each item');
		},
		validateTeam: function (team, format) {
			var itemTable = {};
			for (var i = 0; i < team.length; i++) {
				var item = toId(team[i].item);
				if (!item) continue;
				if (itemTable[item]) {
					return ["You are limited to one of each item by Item Clause.", "(You have more than one " + this.getItem(item).name + ")"];
				}
				itemTable[item] = true;
			}
		},
	},
	ateclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', '-ate Clause: Limit one of Aerilate/Refrigerate/Pixilate');
		},
		validateTeam: function (team, format) {
			var ateAbility = false;
			for (var i = 0; i < team.length; i++) {
				var ability = toId(team[i].ability);
				if (ability === 'refrigerate' || ability === 'pixilate' || ability === 'aerilate') {
					if (ateAbility) return ["You have more than one of Aerilate/Refrigerate/Pixilate, which is banned by -ate Clause."];
					ateAbility = true;
				}
			}
		},
	},
	ohkoclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'OHKO Clause: OHKO moves are banned');
		},
		validateSet: function (set) {
			var problems = [];
			if (set.moves) {
				for (var i in set.moves) {
					var move = this.getMove(set.moves[i]);
					if (move.ohko) problems.push(move.name + ' is banned by OHKO Clause.');
				}
			}
			return problems;
		},
	},
	evasionabilitiesclause: {
		effectType: 'Banlist',
		name: 'Evasion Abilities Clause',
		banlist: ['Sand Veil', 'Snow Cloak'],
		onStart: function () {
			this.add('rule', 'Evasion Abilities Clause: Evasion abilities are banned');
		},
	},
	evasionmovesclause: {
		effectType: 'Banlist',
		name: 'Evasion Moves Clause',
		banlist: ['Minimize', 'Double Team'],
		onStart: function () {
			this.add('rule', 'Evasion Moves Clause: Evasion moves are banned');
		},
	},
	endlessbattleclause: {
		effectType: 'Banlist',
		name: 'Endless Battle Clause',
		banlist: ['Leppa Berry + Recycle', 'Harvest + Leppa Berry', 'Shadow Tag + Leppa Berry + Trick'],
		onStart: function () {
			this.add('rule', 'Endless Battle Clause: Forcing endless battles is banned');
		},
	},
	moodyclause: {
		effectType: 'Banlist',
		name: 'Moody Clause',
		banlist: ['Moody'],
		onStart: function () {
			this.add('rule', 'Moody Clause: Moody is banned');
		},
	},
	swaggerclause: {
		effectType: 'Banlist',
		name: 'Swagger Clause',
		banlist: ['Swagger'],
		onStart: function () {
			this.add('rule', 'Swagger Clause: Swagger is banned');
		},
	},
	batonpassclause: {
		effectType: 'Banlist',
		name: 'Baton Pass Clause',
		onStart: function () {
			this.add('rule', 'Baton Pass Clause: Limit one Pok�mon knowing Baton Pass');
		},
		validateTeam: function (team, format) {
			var problems = [];
			var BPcount = 0;
			for (var i = 0; i < team.length; i++) {
				if (team[i].moves.indexOf('Baton Pass') >= 0) BPcount++;
				if (BPcount > 1) {
					problems.push("You are limited to one Pok�mon with the move Baton Pass by the Baton Pass Clause.");
					break;
				}
			}
			return problems;
		},
	},
	hppercentagemod: {
		effectType: 'Rule',
		name: 'HP Percentage Mod',
		onStart: function () {
			this.add('rule', 'HP Percentage Mod: HP is shown in percentages');
			this.reportPercentages = true;
		},
	},
	cancelmod: {
		effectType: 'Rule',
		onStart: function () {
			this.supportCancel = true;
		},
	},
	sleepclausemod: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Sleep Clause Mod: Limit one foe put to sleep');
		},
		onSetStatus: function (status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'slp') {
				for (var i = 0; i < target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.hp && pokemon.status === 'slp') {
						if (!pokemon.statusData.source || pokemon.statusData.source.side !== pokemon.side) {
							this.add('-message', 'Sleep Clause Mod activated.');
							return false;
						}
					}
				}
			}
		},
	},
	freezeclausemod: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Freeze Clause Mod: Limit one foe frozen');
		},
		onSetStatus: function (status, target, source) {
			if (source && source.side === target.side) {
				return;
			}
			if (status.id === 'frz') {
				for (var i = 0; i < target.side.pokemon.length; i++) {
					var pokemon = target.side.pokemon[i];
					if (pokemon.status === 'frz') {
						this.add('-message', 'Freeze Clause activated.');
						return false;
					}
				}
			}
		},
	},
	sametypeclause: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Same Type Clause: Pok�mon in a team must share a type');
		},
		validateTeam: function (team, format, teamHas) {
			if (!team[0]) return;
			var template = this.getTemplate(team[0].species);
			var typeTable = template.types;
			if (!typeTable) return ["Your team must share a type."];
			for (var i = 1; i < team.length; i++) {
				template = this.getTemplate(team[i].species);
				if (!template.types) return ["Your team must share a type."];

				typeTable = typeTable.intersect(template.types);
				if (!typeTable.length) return ["Your team must share a type."];
			}
			if (format.id === 'monotype') {
				// Very complex bans
				if (typeTable.length > 1) return;
				switch (typeTable[0]) {
				case 'Flying':
					if (teamHas['zapdos']) return ["Zapdos is banned from Flying monotype teams."];
					break;
				case 'Psychic':
					if (teamHas['galladite']) return ["Galladite is banned from Psychic monotype teams."];
					break;
				case 'Steel':
					if (teamHas['aegislash']) return ["Aegislash is banned from Steel monotype teams."];
					if (teamHas['genesect'] || teamHas['genesectdouse'] || teamHas['genesectshock'] || teamHas['genesectburn'] || teamHas['genesectchill']) return ["Genesect is banned from Steel monotype teams."];
					break;
				case 'Water':
					if (teamHas['damprock']) return ["Damp Rock is banned from Water monotype teams."];
				}
			}
		},
	},
	megarayquazabanmod: {
		effectType: 'Rule',
		onStart: function () {
			this.add('rule', 'Mega Rayquaza Ban Mod: You cannot mega evolve Rayquaza');
			for (var i = 0; i < this.sides[0].pokemon.length; i++) {
				if (this.sides[0].pokemon[i].speciesid === 'rayquaza') this.sides[0].pokemon[i].canMegaEvo = false;
			}
			for (var i = 0; i < this.sides[1].pokemon.length; i++) {
				if (this.sides[1].pokemon[i].speciesid === 'rayquaza') this.sides[1].pokemon[i].canMegaEvo = false;
			}
		},
	},
};