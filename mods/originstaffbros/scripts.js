'use strict';
const sugar = require('sugar');

exports.BattleScripts = {
	randomOriginStaffBrosTeam: function (side) {
		let userid = toId(side.name);
		let team = [];
		// Hardcoded sets of the available Pokemon.
		let sets = {
			// Admins.
			'~ArkenCiel': { // (mega ability) abnegate
				species: 'Metagross', ability: 'Clear Body', item: 'Metagrossite', gender: 'M',
				moves: ['icepunch', 'boltstrike', 'precipiceblades'],
				baseSignatureMove: 'faithbreaker', signatureMove: "Faithbreaker",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'fender': {
				species: 'Gible', ability: 'Eval Troll', item: 'Life Orb', gender: 'M',
				moves: ['earthquake', 'dragonclaw', 'stoneedge', 'flareblitz', 'stealthrock', 'substitute'],
				baseSignatureMove: 'evalbattle', signatureMove: "evalbattle",
				evs: {hp:8, atk:248, spe:252}, nature: 'Jolly',
			},
			'~Lt. Tesla': {
				species: 'Raichu', ability: 'Beard Coat', item: '', gender: 'M',
				moves: ['seedbomb', 'icepunch', 'recover'],
				baseSignatureMove: 'sideboffledge', signatureMove: "Side B off ledge",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},
			'~Master Float': {
				species: 'Floatzel', ability: 'Magic Immunity', item: 'Focus Sash', gender: 'M',
				moves: ['waterfall', 'earthquake', ['extremespeed', 'sacredfire', 'ice punch', 'boltstrike'][this.random(4)]],
				baseSignatureMove: 'floatssharingan', signatureMove: "Float's Sharingan",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'~Neo Soul': {
				species: 'Wobbuffet', ability: 'Shadow Prankster', item: 'Leftovers', gender: 'M',
				moves: ['torment', 'encore', 'taunt'],
				baseSignatureMove: 'sodone', signatureMove: "So Done",
				evs: {hp:252, def:252, spd:4}, nature: 'Bold',
			},
			'~sparkychild': {
				species: 'Pikachu', ability: 'Furry Tale', item: 'Light Ball',
				moves: ['Thunder', 'Steam Eruption', 'hurricane'],
				baseSignatureMove: 'furrycosplay', signatureMove: "Furry Cosplay",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},

			// Leaders.
			'&Erica*07': {
				species: 'Meloetta', ability: 'Mischievous', item: 'Leftovers', shiny: true,
				moves: ['rest', 'sleeptalk', 'shadowball'],
				baseSignatureMove: 'admonish', signatureMove: "Admonish",
				evs: {hp:240, def:252, spd:16}, ivs: {atk:0}, nature: 'Bold',
			},
			'&Mighty Sciz': { // (mega ability) dragonsfire
				species: 'Charizard', ability: 'Blaze', item: 'Charizardite X', gender: 'M',
				moves: [['dragondance', 'bellydrum'][this.random(2)], ['firepunch', 'flareblitz'][this.random(2)], ['shadowclaw', 'doubleedge', 'roost'][this.random(3)]],
				baseSignatureMove: 'dragonstrike', signatureMove: "Dragon Strike",
				evs: {hp:4, atk:252, spe: 252}, nature: 'Jolly',
			},
			'&Sky Might Fall': { // (mega ability) cursedaura
				species: 'Gyarados', ability: 'Intimidate', item: 'Gyaradosite', gender: 'M',
				moves: ['crabhammer', ['suckerpunch', 'pursuit', 'nightslash'][this.random(3)], ['focusenergy', 'dragondance'][this.random(2)]],
				baseSignatureMove: 'silentdeparture', signatureMove: "Silent Departure",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},

			// Mods.
			'@Alpha Ninja': { // (mega ability) megapoison
				species: 'Slowbro', ability: 'Regenerator', item: 'Slowbronite', gender: 'M',
				moves: ['psystrike', 'slackoff', 'blizzard'],
				baseSignatureMove: 'beybladespin', signatureMove: "Beyblade Spin",
				evs: {spa:248, def:238, spd:28}, nature: 'bold',
			},
			'@AuraStormLucario': { // (mega ability) auraguard
				species: 'Lucario', ability: 'Inner Focus', item: 'Lucarionite', gender: 'M',
				moves: [
					['bulletpunch', 'ice punch', 'swordsdance'],
					['bulletpunch', 'ice punch', ['stealthrock', 'swordsdance'][this.random(2)]],
				][this.random(2)],
				baseSignatureMove: 'aurastorm', signatureMove: "AuraStorm",
				evs: {hp: 4, atk:252, spe:252}, nature: 'Jolly',
			},
			'@hayleysworld': { // (type) electric/dark
				species: 'Luxray', ability: 'Electric Memes', item: 'Leftovers', gender: 'F', shiny: true,
				moves: ['thunderfang', 'firefang', 'icefang'],
				baseSignatureMove: 'revengeofzeus', signatureMove: "Revenge of Zeus",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'@L Chevy 12': {
				species: 'Archeops', ability: 'Fuck You Up', item: 'Life Orb', gender: 'M', shiny: true, // power herb + recycle?
				moves: ['Head Smash', 'Brave Bird', ['earthquake', 'ironhead'][this.random(2)], 'roost'],
				baseSignatureMove: 'flyingforretress', signatureMove: "Flying Forretress",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},
			'@Nii sama': {
				species: 'Darkrai', ability: 'Goodnight', item: 'Life Orb',
				moves: ['shadowball', 'dreameater', 'nastyplot'],
				baseSignatureMove: 'shadowdrain', signatureMove: "Shadow Drain",
				evs: {spa:248, def:238, spd:28}, nature: 'bold',
			},
			'@Paul Century': {
				species: 'Slowbro', ability: 'so dope', item: 'Lax Incense', gender: 'M', shiny: true,
				moves: ['steameruption', 'thunderbolt', 'bugbuzz'],
				baseSignatureMove: 'omegablast', signatureMove: "Omega Blast",
				evs: {hp:252, spa:252, def:4}, nature: 'Modest',
			},
			'@Safety Shark': { // (mega ability) magicguard
				species: 'Garchomp', ability: 'Rough Skin', item: 'Garchompite', gender: 'M',
				moves: ['earthquake', 'knockoff', 'recover'],
				baseSignatureMove: 'dragonbotz', signatureMove: "DragonBot-Z",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},

			// Drivers.
			'%01NTG': {
				species: 'Dragonite', ability: 'Magical Multicoat', item: 'Leftovers', gender: 'M',
				moves: ['roost', 'extremespeed', ['dragontail', 'ironhead', 'earthquake', 'firepunch', 'iciclecrash', 'knockoff'][this.random(6)]],
				baseSignatureMove: 'dragonsynergy', signatureMove: "Dragon Synergy",
				evs: {atk:252, def:128, spd:128}, nature: 'Adamant',
			},
			'%Chief Sokka': {
				species: 'Gliscor', ability: 'Cancerous Ability', item: 'Toxic Orb', gender: 'M',
				moves: ['earthquake', 'knockoff', 'swordsdance', 'roost'],
				baseSignatureMove: 'superbat', signatureMove: "Super Bat",
				evs: {hp:244, def:8, spd:200, spe:56}, nature: 'Impish',
			},
			'%CreaturePhil': {
				species: 'Rotom-Wash', ability: 'feelsgd', item: 'Sitrus Berry',
				moves: ['willowisp', 'painsplit', 'voltswitch'],
				baseSignatureMove: 'waterbomb', signatureMove: "WaterBomb",
				evs: {hp:248, def:252, spe:8}, nature: 'Modest',
			},
			'%Emg E4 Volco': {
				species: 'Torterra', ability: 'Let\'s Do This', item: 'Leftovers', gender: 'M',
				moves: ['spore', ['precipiceblades', 'headsmash'][this.random(2)], 'extremespeed'],
				baseSignatureMove: 'woodtreesword', signatureMove: "Wood Tree Sword",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},
			'%Irraquated': {
				species: 'Ho-oh', ability: 'What\'s the time?', item: 'Life Orb', gender: 'M',
				moves: ['recover', 'bravebird', 'woodhammer'],
				baseSignatureMove: 'time2die', signatureMove: "Time 2 Die",
				evs: {hp:248, atk:196, spd:52, spe:12}, nature: 'Adamant',
			},
			'%iSandman': {
				species: 'Landorus', ability: 'God\'s Force', item: 'Life Orb', gender: 'M',
				moves: ['rockpolish', 'sludgewave', 'psychic'],
				baseSignatureMove: 'megaearthfissure', signatureMove: "Mega Earth Fissure",
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
			},
			'%Phoenix Gryphon': {
				species: 'Staravia', ability: 'Feather Coat', item: 'Eviolite', gender: 'M',
				moves: ['roost', 'bravebird', 'toxic'],
				baseSignatureMove: 'nidificate', signatureMove: "Nidificate",
				evs: {hp:252, atk:252, def:4}, nature: 'Impish',
			},
			'%Selena': { // (type) bug/fairy
				species: 'Samurott', ability: 'Wings of Reason', item: 'Leftovers', gender: 'F',
				moves: ['nightslash', 'sacredsword', 'iciclecrash'],
				baseSignatureMove: 'mercuriusblade', signatureMove: 'Mercurius Blade',
				evs:{hp:252, atk:252, spe:4}, nature: "Adamant",
			},
			'%Starfox :3': {
				species: 'Emolga', ability: 'Light Speed', item: 'Life Orb', gender: 'M',
				moves: ['Volt Tackle', 'Flare Blitz', 'Brave Bird'],
				baseSignatureMove: 'voltturn', signatureMove: "Volt Turn",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},

			// Voices.
			'+casty': {
				species: 'Castform', ability: 'Forecast 2', item: 'Focus Sash', gender: 'M', shiny: true,
				moves: ["weatherball", "earthpower", "sketch"],
				baseSignatureMove: 'adaptation', signatureMove: "Adaptation",
				evs: {spa:252, spd:4, spe:252}, nature: 'Modest',
			},
			'+Chronologically': { // (type) fire/fighting
				species: 'Victini', ability: 'Victory Prankster', item: 'Air Balloon', gender: 'M',
				moves: ['sacredfire', 'teeterdance', 'drainpunch'],
				baseSignatureMove: 'powerupmeme', signatureMove: "Power-up Meme",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'+Crystal Gray': {
				species: 'Greninja', ability: 'Speedy Gonzales', item: 'Expert Belt', gender: 'M',
				moves: ['icebeam', 'extrasensory', 'darkpulse'],
				baseSignatureMove: 'hydrosmash', signatureMove: "Hydro Smash",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
			'+Jigglykong': {
				species: 'Porygon2', ability: '3bulky5u', item: 'Eviolite', gender: 'M',
				moves: ['toxic', 'recover', 'healbell'],
				baseSignatureMove: 'plasmablast', signatureMove: "Plasma Blast",
				evs: {hp:252, def:100, spa:60, spd:92}, nature: 'Bold',
			},
			'+Master Bui': {
				species: 'Buizel', ability: 'Ocean\'s Grace', item: 'Eviolite', gender: 'M',
				moves: ['earthpower', 'icebeam', 'chargebeam'],
				baseSignatureMove: 'danceofthesea', signatureMove: "Dance of the Sea",
				evs: {hp:216, def:132, spd:160}, nature: 'Calm',
			},
			'+Otami': { // (typing) psychic/fairy
				species: 'Espeon', ability: 'Telekinetic', item: 'Leftovers', gender: 'M',
				moves: ['moonblast', 'psychic', 'cosmicpower', 'storedpower', ['substitute', 'recover', 'hypnosis'][this.random(3)]],
				baseSignatureMove: 'telekineticchant', signatureMove: "Telekinetic Chant",
				evs: {hp:4, spa:252, spd:252}, nature: 'Modest',
			},
			'+Sota Higurashi': {
				species: 'Victini', ability: 'Contrary', item: 'Expert Belt',
				moves: ['vcreate', 'uturn', 'boltstrike'],
				baseSignatureMove: 'zencreate', signatureMove: "Zen Create",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},

			// Others
			' Gnarly Commie': {
				species: 'Munchlax', ability: 'Communism', item: 'Eviolite', gender: 'M',
				moves: ['bellydrum', 'drainpunch', 'pursuit'],
				baseSignatureMove: 'ebat', signatureMove: '/ebat',
				evs: {hp:4, atk:252, def:252}, nature: 'Adamant',
			},
			' Hat Blaze': {
				species: 'Blaziken', ability: 'Blaze Power', item: 'Life Orb', gender: 'M',
				moves: ['highjumpkick', 'flareblitz', ['bravebird', 'needlearm', 'zenheadbut', 'poisonjab', 'feint', 'mimic', 'roost'][this.random(7)]],
				baseSignatureMove: 'trublock', signatureMove: 'TruBlock',
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},
			' Imp Fallen Blood': { // (mega ability) pirate (typing) grass/flying
				species: 'Sceptile', ability: 'overgrow', item: 'Sceptilite', gender: 'M',
				moves: ['aeroblast', 'aurasphere', 'earthpower'],
				baseSignatureMove: 'jetgattling', signatureMove: "Jet Gattling",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
			' Mr. CGTNathan': {
				species: 'Cofagrigus', ability: 'Graveyard', item: 'Leftovers', gender: 'M',
				moves: ['destinybond', 'recover', 'healbell'],
				baseSignatureMove: 'graveyardstrike', signatureMove: "Graveyard Strike",
				evs: {hp:252, def:4, spd:252}, ivs: {spe:0, atk:0}, nature: 'Sassy',
			},
			' Nineage': {
				species: 'Arceus', ability: 'ERROR', item: 'Life Orb', gender: 'M',
				moves: ['extremespeed', 'metronome', 'present'],
				baseSignatureMove: 'breakcode', signatureMove: "Break Code",
				evs: {hp:252, atk:4, spe:252}, nature: 'Jolly',
			},
			' Omega Chimе': { // (type) fairy/psychic
				species: 'Chimecho', ability: 'Wave Guard', item: 'Life Orb',
				moves: ['psystrike', 'recover', 'earthpower'],
				baseSignatureMove: 'audioshock', signatureMove: "Audioshock",
				evs: {spd:4, spa:252, spe:252}, nature: 'Modest',
			},
			' Omega Nivans': {
				species: 'Octillery', ability: 'Machine Gunner', item: 'Expert Belt', gender: 'M',
				moves: [
					['watershuriken', 'ominouswind', ['frostbreath', 'aircutter', 'dragonbreath', 'echoedvoice', 'megadrain', 'drainingkiss', 'paraboliccharge', 'chargebeam'][this.random(8)]],
					['watershuriken', 'chargebeam', ['frostbreath', 'aircutter', 'dragonbreath', 'echoedvoice', 'megadrain', 'drainingkiss', 'ominouswind', 'paraboliccharge'][this.random(8)]],
					['watershuriken', 'flamecharge', ['nuzzle', 'bulldoze', 'heartstamp', 'metalclaw', 'revenge', 'poisontail', 'furycutter', 'iceshard', 'shadowsneak', 'stormthrow', 'poweruppunch'][this.random(11)]],
					['watershuriken', 'poweruppunch', ['nuzzle', 'bulldoze', 'heartstamp', 'metalclaw', 'revenge', 'poisontail', 'furycutter', 'iceshard', 'shadowsneak', 'stormthrow', 'flamecharge'][this.random(11)]],
				][this.random(4)],
				baseSignatureMove: 'antimaterialrifle', signatureMove: "Anti-Material Rifle",
				evs: {hp:4, atk:4, spa:252}, nature: 'Brave',
			},
			' Origin Server': {
				species: 'Mew', ability: 'Counter-Meta', item: 'Leftovers',
				moves: ['psystrike', 'recover', 'transform'],
				baseSignatureMove: 'trispikes', signatureMove: "Tri Spikes",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
		};
		// Generate the team randomly.
		let pool = Object.keys(sets).randomize();
		let levels = {'~':99, '&':98, '@':97, '%':96, '$':95, '+':95, ' ': 94};
		for (let i = 0; i < 6; i++) {
			if (i === 1) {
				let monIds = pool.slice(0, 6).map(function (p) {
					return toId(p);
				});
				let monName;
				for (let mon in sets) {
					if (toId(mon) === userid/* || (userid === "jigglykong" && toId(mon) === "sotahigurashi")*/) {
						monName = mon;
						break;
					}
				}
				if (monIds.indexOf(userid) === -1 && monName) {
					pool[2] = monName;
				}
			}
			let rank = pool[i].charAt(0);
			let set = sets[pool[i]];
			set.level = levels[rank];
			set.name = pool[i];
			if (!set.ivs) {
				set.ivs = {hp:31, atk:31, def:31, spa:31, spd:31, spe:31};
			} else {
				for (let iv in {hp:31, atk:31, def:31, spa:31, spd:31, spe:31}) {
					set.ivs[iv] = set.ivs[iv] ? set.ivs[iv] : 31;
				}
			}
			// Assuming the hardcoded set evs are all legal. LOLOLOLOLOL
			if (!set.evs) set.evs = {hp:84, atk:84, def:84, spa:84, spd:84, spe:84};
			set.moves = set.moves.sample(3).concat(set.baseSignatureMove);
			team.push(set);
		}
		// Check for Illusion.
		if ((team[5].name === '+Illusio' && team[4].name === '+Kit Kasai') || (team[4].name === '+Illusio' && team[5].name === '+Kit Kasai')) {
			let temp = team[3];
			team[3] = team[5];
			team[5] = temp;
		} else if (team[5].name === '+Illusio' || team[5].name === '+Kit Kasai') {
			let temp = team[4];
			team[4] = team[5];
			team[5] = temp;
		}
		return team;
	},
	canMegaEvo: function (pokemon) {
		let altForme = pokemon.baseTemplate.otherFormes && this.getTemplate(pokemon.baseTemplate.otherFormes[0]);
		if (altForme && altForme.isMega && altForme.requiredMove && pokemon.moves.indexOf(toId(altForme.requiredMove)) >= 0) return altForme.species;
		let item = pokemon.getItem('');
		if (item.megaEvolves !== pokemon.baseTemplate.baseSpecies || item.megaStone === pokemon.species) return false;
		return item.megaStone;
	},
	runMegaEvo: function (pokemon) {
		let template = this.getTemplate(pokemon.canMegaEvo);
		let side = pokemon.side;

		// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
		let foeActive = side.foe.active;
		for (let i = 0; i < foeActive.length; i++) {
			if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
				return false;
			}
		}

		pokemon.formeChange(template);
		pokemon.baseTemplate = template; // mega evolution is permanent
		pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
		this.add('detailschange', pokemon, pokemon.details);
		this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
		pokemon.setAbility(template.abilities['0']);
		pokemon.baseAbility = pokemon.ability;

		// Limit one mega evolution
		for (let i = 0; i < side.pokemon.length; i++) {
			side.pokemon[i].canMegaEvo = false;
		}
		return true;
	},
};
