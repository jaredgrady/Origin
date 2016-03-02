'use strict';

exports.BattleScripts = {
	randomLCTeam: function (side) {
		let keys = [];
		let pokemonLeft = 0;
		let pokemon = [];
		for (let i in this.data.FormatsData) {
			let template = this.getTemplate(i);
			//!this.data.FormatsData[i].isNonstandard && !template.evos.length
			if (this.data.FormatsData[i].randomBattleMoves && (template.forme.substr(0, 4) !== 'Mega')) {
				keys.push(i);
			}
		}
		keys = keys.randomize();

		// PotD stuff
		let potd = {};
		if ('Rule:potd' in this.getBanlistTable(this.getFormat())) {
			potd = this.getTemplate(Config.potd);
		}

		let typeCount = {};
		let typeComboCount = {};
		let baseFormes = {};
		let uberCount = 0;
		let nuCount = 0;
		let megaCount = 0;

		for (let i = 0; i < keys.length && pokemonLeft < 6; i++) {
			let template = this.getTemplate(keys[i]);
			if (!template || !template.name || !template.types) continue;
			let tier = template.tier;
			// This tries to limit the amount of Ubers and NUs on one team to promote "fun":
			// LC Pokemon have a hard limit in place at 2; NFEs/NUs/Ubers are also limited to 2 but have a 20% chance of being added anyway.
			// LC/NFE/NU Pokemon all share a counter (so having one of each would make the counter 3), while Ubers have a counter of their own.
			if (tier !== 'LC') continue;
			// Arceus formes have 1/18 the normal rate each (so Arceus as a whole has a normal rate)
			if (keys[i].substr(0, 6) === 'arceus' && Math.random() * 18 > 1) continue;
			// Basculin formes have 1/2 the normal rate each (so Basculin as a whole has a normal rate)
			if (keys[i].substr(0, 8) === 'basculin' && Math.random() * 2 > 1) continue;
			// Genesect formes have 1/5 the normal rate each (so Genesect as a whole has a normal rate)
			if (keys[i].substr(0, 8) === 'genesect' && Math.random() * 5 > 1) continue;
			// Gourgeist formes have 1/4 the normal rate each (so Gourgeist as a whole has a normal rate)
			if (keys[i].substr(0, 9) === 'gourgeist' && Math.random() * 4 > 1) continue;
			// Not available on XY
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Limit 2 of any type
			let types = template.types;
			let skip = false;
			for (let t = 0; t < types.length; t++) {
				if (typeCount[types[t]] > 1 && Math.random() * 5 > 1) {
					skip = true;
					break;
				}
			}
			if (skip) continue;

			if (potd && potd.name && potd.types) {
				// The Pokemon of the Day belongs in slot 2
				if (i === 1) {
					template = potd;
					if (template.species === 'Magikarp') {
						template.randomBattleMoves = ['magikarpsrevenge', 'splash', 'bounce'];
					} else if (template.species === 'Delibird') {
						template.randomBattleMoves = ['present', 'bestow'];
					}
				} else if (template.species === potd.species) {
					continue; // No, thanks, I've already got one
				}
			}

			let set = this.randomSet(template, i, megaCount);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit 1 of any type combination
			let typeCombo = types.join();
			if (set.ability === 'Drought' || set.ability === 'Drizzle') {
				// Drought and Drizzle don't count towards the type combo limit
				typeCombo = set.ability;
			}
			if (typeCombo in typeComboCount) continue;

			// Limit the number of Megas to one, just like in-game
			if (this.getItem(set.item).megaStone && megaCount > 0) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;
			baseFormes[template.baseSpecies] = 1;

			// Okay, the set passes, add it to our team
			set.level = 5; //Lc level 5
			pokemon.push(set);

			pokemonLeft++;
			// Now that our Pokemon has passed all checks, we can increment the type counter
			for (let t = 0; t < types.length; t++) {
				if (types[t] in typeCount) {
					typeCount[types[t]]++;
				} else {
					typeCount[types[t]] = 1;
				}
			}
			typeComboCount[typeCombo] = 1;

			// Increment Uber/NU and mega counter
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'NU' || tier === 'NFE' || tier === 'LC') {
				nuCount++;
			}
			if (this.getItem(set.item).megaStone) megaCount++;
		}
		return pokemon;
	},
};
