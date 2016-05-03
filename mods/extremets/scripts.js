'use strict';

exports.BattleScripts = {
	pokemon: {
		formeChange: function (template, dontRecalculateStats) {
			template = this.battle.getTemplate(template);

			if (!template.abilities) return false;
			this.illusion = null;
			this.template = template;

			this.types = template.types;
			this.addedType = '';

			if (!dontRecalculateStats) {
				let boosts = {
					'UU': 10,
					'BL2': 10,
					'RU': 20,
					'BL3': 20,
					'NU': 30,
					'BL4': 30,
					'PU': 40,
					'NFE': 40,
					'LC Uber': 40,
					'LC': 40,
				};
				let tier = template.tier;
				if (this.set.item) {
					let item = this.battle.getItem(this.set.item);
					if (item.megaEvolves === template.species) tier = this.battle.getTemplate(item.megaStone).tier;
				}
				if (tier.charAt(0) === '(') tier = tier.slice(1, -1);
				let boost = (tier in boosts) ? boosts[tier] : 0;
				if (this.set.ability in {'Drizzle': 1, 'Drought': 1, 'Shadow Tag': 1}) {
					boost = 0;
				} else if (this.set.moves.indexOf('chatter') >= 0) {
					boost = 30;
				}

				let boostedHP = Math.floor(Math.floor(2 * (this.template.baseStats['hp'] + boost) + this.set.ivs['hp'] + Math.floor(this.set.evs['hp'] / 4) + 100) * this.level / 100 + 10);
				if (this.maxhp > 1 && this.maxhp < boostedHP) this.hp = this.maxhp = boostedHP;

				for (let statName in this.stats) {
					let stat = this.template.baseStats[statName];
					stat = this.battle.clampIntRange(stat + boost, 1, 255);
					stat = Math.floor(Math.floor(2 * stat + this.set.ivs[statName] + Math.floor(this.set.evs[statName] / 4)) * this.level / 100 + 5);

					let nature = this.battle.getNature(this.set.nature);
					if (statName === nature.plus) stat *= 1.1;
					if (statName === nature.minus) stat *= 0.9;
					this.baseStats[statName] = this.stats[statName] = Math.floor(stat);
				}
				this.speed = this.stats.spe;
			}
			return true;
		},
	},
};
