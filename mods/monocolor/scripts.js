'use strict';

exports.BattleScripts = {
	randomMonocolorTeam: function (side) {
		let pokemonLeft = 0;
		let pokemon = [];
		let excludedTiers = {
			'LC': 1,
			'LC Uber': 1,
			'NFE': 1,
		};
		let allowedNFE = {
			'Chansey': 1,
			'Doublade': 1,
			'Pikachu': 1,
			'Porygon2': 1,
			'Scyther': 1,
		};
		let colorPool = ['Black', 'White', 'Gray', 'Green', 'Blue', 'Red', 'Yellow', 'Brown', 'Pink', 'Purple'];
		let color = colorPool[this.random(colorPool.length)];

		let pokemonPool = [];
		for (let id in this.data.FormatsData) {
			let template = this.getTemplate(id);

			if (!excludedTiers[template.tier] && template.color === color && !template.isMega && !template.isPrimal && !template.isNonstandard && template.randomBattleMoves) {
				pokemonPool.push(id);
			}
		}

		let baseFormes = {};
		let uberCount = 0;
		let puCount = 0;
		let megaCount = 0;

		while (pokemonPool.length && pokemonLeft < 6) {
			let template = this.getTemplate(this.sampleNoReplace(pokemonPool));
			if (!template.exists) continue;

			// Limit to one of each species (Species Clause)
			if (baseFormes[template.baseSpecies]) continue;

			// Not available on ORAS
			if (template.species === 'Pichu-Spiky-eared') continue;

			// Only certain NFE Pokemon are allowed
			if (template.evos.length && !allowedNFE[template.species]) continue;

			let tier = template.tier;
			switch (tier) {
			case 'PU':
				// PUs are limited to 2 but have a 20% chance of being added anyway.
				if (puCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'Uber':
				// Ubers are limited to 2 but have a 20% chance of being added anyway.
				if (uberCount > 1 && this.random(5) >= 1) continue;
				break;
			case 'CAP':
				// CAPs have 20% the normal rate
				if (this.random(5) >= 1) continue;
				break;
			case 'Unreleased':
				// Unreleased Pokémon have 20% the normal rate
				if (this.random(5) >= 1) continue;
			}

			// Adjust rate for species with multiple formes
			switch (template.baseSpecies) {
			case 'Arceus':
				if (this.random(18) >= 1) continue;
				break;
			case 'Basculin':
				if (this.random(2) >= 1) continue;
				break;
			case 'Genesect':
				if (this.random(5) >= 1) continue;
				break;
			case 'Gourgeist':
				if (this.random(4) >= 1) continue;
				break;
			case 'Meloetta':
				if (this.random(2) >= 1) continue;
				break;
			case 'Pikachu':
				// Cosplay Pikachu formes have 20% the normal rate (1/30 the normal rate each)
				if (template.species !== 'Pikachu' && this.random(30) >= 1) continue;
			}

			let set = this.randomSet(template, pokemon.length, megaCount);

			// Illusion shouldn't be on the last pokemon of the team
			if (set.ability === 'Illusion' && pokemonLeft > 4) continue;

			// Limit the number of Megas to one
			let forme = template.otherFormes && this.getTemplate(template.otherFormes[0]);
			let isMegaSet = this.getItem(set.item).megaStone || (forme && forme.isMega && forme.requiredMove && set.moves.indexOf(toId(forme.requiredMove)) >= 0);
			if (isMegaSet && megaCount > 0) continue;

			// Okay, the set passes, add it to our team
			pokemon.push(set);

			// Now that our Pokemon has passed all checks, we can increment our counters
			pokemonLeft++;

			// Increment Uber/NU counters
			if (tier === 'Uber') {
				uberCount++;
			} else if (tier === 'PU') {
				puCount++;
			}

			// Increment mega and base species counters
			if (isMegaSet) megaCount++;
			baseFormes[template.baseSpecies] = 1;
		}
		return pokemon;
	},
};
