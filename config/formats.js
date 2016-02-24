'use strict';

// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.js

exports.Formats = [

	// XY Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Battle",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with sets that are generated to be competitively viable."],
		section: "ORAS Singles",

		team: 'random',
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Unrated Random Battle",
		section: "ORAS Singles",

		team: 'random',
		challengeShow: false,
		rated: false,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3521201/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3553516/\">OU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
	},
	{
		name: "OU (Turbo)",
		desc: ["Similar to OU but with a forced timer set to 20 seconds",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3521201/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3553516/\">OU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
		forceTimer: true,
	},
	{
		name: "Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3522911/\">Ubers Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535106/\">Ubers Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Team Preview', 'Mega Rayquaza Clause'],
		banlist: [],
	},
	{
		name: "UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3557948/\">np: UU Stage 6</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/uu/\">UU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541343/\">UU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['OU'],
		banlist: ['OU', 'BL', 'Drizzle', 'Drought'],
	},
	{
		name: "RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3564252/\">np: RU Stage 14</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ru/\">RU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3538036/\">RU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "RU (suspect test)",
		section: "ORAS Singles",

		challengeShow: false,
		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3563816/\">np: NU Stage 11</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545276/\">NU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		searchShow: false,
		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
	},
	{
		name: "NU (suspect test)",
		section: "ORAS Singles",

		ruleset: ['NU'],
		banlist: ['Sawk'],
	},
	{
		name: "PU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560703/\">np: PU Stage 6</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528743/\">PU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['NU'],
		banlist: ['NU', 'BL4', 'Chatter'],
	},
	{
		name: "ZU",
		section: "ORAS Singles",

		ruleset: ['PU'],
		banlist: ['Altaria', 'Arbok', 'Armaldo', 'Armaldo', 'Articuno', 'Avalugg', 'Basculin', 'Basculin-Blue-Striped', 'Beheeyem', 'Bouffalant', 'Chatot', 'Clefairy',
		'Dodrio', 'Drifblim', 'Dusknoir', 'Electrode', 'Exeggutor', 'Flareon', 'Floatzel', 'Fraxure', 'Gabite',
		'Golem', 'Gorebyss', 'Gourgeist-Super', 'Grumpig', 'Heat Rock', 'Jumpluff', 'Kadabra', 'Kingler', 'Lapras',
		'Leafeon', 'Leavanny', 'Lickilicky', 'Machoke', 'Marowak', 'Metang', 'Mightyena', 'Misdreavus',
		'Monferno', 'Mr. Mime', 'Ninetales', 'Ninjask', 'Pawniard', 'Pelipper', 'Politoed', 'Probopass', 'Purugly',
		'Raichu', 'Rampardos', 'Rapidash', 'Regice', 'Relicanth', 'Roselia', 'Rotom-Frost', 'Stoutland', 'Stunfisk', 'Swanna', 'Tangela', 'Torkoal', 'Ursaring', 'Vigoroth', 'Vullaby', 'Zebstrika', 'Sticky Web',
		],
	},
	{
		name: "LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3490462/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],
		section: "ORAS Singles",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger'],
	},
	{
		name: "Anything Goes",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3523229/\">Anything Goes</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3548945/\">Anything Goes Resources</a>",
		],
		section: "ORAS Singles",

		ruleset: ['Pokemon', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal'],
	},
	{
		name: "Battle Spot Singles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527960/\">Battle Spot Singles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554616/\">Battle Spot Singles Viability Ranking</a>",
		],
		section: "ORAS Singles",

		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Kanto Classic",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3563162/\">Kanto Classic</a>"],
		section: "ORAS Singles",

		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			if (template.num > 149) {
				return [set.species + " is banned by Kanto Classic."];
			}
			set.item = '';
		},
	},
	{
		name: "Custom Game",
		section: "ORAS Singles",

		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// XY Doubles
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Doubles Battle",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545903/\">np: Doubles OU Stage 3</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3498688/\">Doubles OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3535930/\">Doubles OU Viability Ranking</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore',
		],
	},
	{
		name: "Doubles Ubers",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542746/\">Doubles Ubers</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Species Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Evasion Abilities Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Dark Void'],
	},
	{
		name: "Doubles UU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3542755/\">Doubles UU</a>"],
		section: "ORAS Doubles",

		gameType: 'doubles',
		ruleset: ['Doubles OU'],
		banlist: ['Aegislash', 'Amoonguss', 'Azumarill', 'Bisharp', 'Breloom', 'Camerupt-Mega', 'Cameruptite', 'Chandelure',
			'Charizard-Mega-Y', 'Charizardite Y', 'Conkeldurr', 'Cresselia', 'Diancie-Mega', 'Diancite', 'Dragonite', 'Ferrothorn', 'Garchomp',
			'Gardevoir-Mega', 'Gardevoirite', 'Gengar', 'Greninja', 'Gyarados', 'Heatran', 'Hoopa-Unbound', 'Hydreigon', 'Jirachi',
			'Kangaskhan-Mega', 'Kangaskhanite', 'Keldeo', 'Kyurem-Black', 'Landorus-Therian', 'Latios', 'Ludicolo', 'Mawile-Mega', 'Mawilite',
			'Mew', 'Milotic', 'Ninetales', 'Politoed', 'Rotom-Wash', 'Scrafty', 'Shaymin-Sky', 'Suicune', 'Sylveon', 'Talonflame',
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Victini', 'Weavile', 'Whimsicott', 'Zapdos',
		],
	},
	{
		name: "Doubles NU",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Doubles UU'],
		banlist: ['Abomasnow-Mega', 'Abomasite', 'Aerodactyl-Mega', 'Aerodactylite', 'Altaria-Mega', 'Altarianite',
			'Ambipom', 'Arcanine', 'Aromatisse', 'Aurorus', 'Blastoise-Mega', 'Blastoisinite', 'Bronzong', 'Clawitzer',
			'Cofagrigus', 'Cradily', 'Crawdaunt', 'Crobat', 'Deoxys-Attack', 'Doublade', 'Dusclops', 'Eelektross',
			'Entei', 'Escavalier', 'Espeon', 'Excadrill', 'Gastrodon', 'Genesect', 'Hariyama', 'Hitmontop', 'Infernape',
			'Jellicent', 'Jolteon', 'Klefki', 'Krookodile', 'Kyurem', 'Landorus', 'Liepard', 'Lopunny-Mega', 'Lopunnite',
			'Lucario-Mega', 'Lucarionite', 'Machamp', 'Mamoswine', 'Manaphy', 'Meowstic', 'Metagross-Mega', 'Metagrossite',
			'Murkrow', 'Nidoking', 'Porygon2', 'Reuniclus', 'Rhyperior', 'Rotom-Heat', 'Sableye', 'Salamence',
			'Sceptile-Mega', 'Sceptilite', 'Scizor', 'Slowking', 'Snorlax', 'Togetic', 'Tornadus', 'Vaporeon', 'Volcarona',
		],
	},
	{
		name: "VGC 2016",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558332/\">VGC 2016 Rules</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558929/\">VGC 2016 Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3500650/\">VGC Learning Resources</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Species Clause', 'Nickname Clause', 'Item Clause', 'Team Preview', 'Cancel Mod'],
		banlist: ['Illegal', 'Unreleased', 'Mew', 'Celebi', 'Jirachi', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Phione', 'Manaphy',
			'Darkrai', 'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Soul Dew',
		],
		requirePentagon: true,
		onValidateTeam: function (team) {
			const legends = {'Mewtwo':1, 'Lugia':1, 'Ho-Oh':1, 'Kyogre':1, 'Groudon':1, 'Rayquaza':1, 'Dialga':1, 'Palkia':1, 'Giratina':1, 'Reshiram':1, 'Zekrom':1, 'Kyurem':1, 'Xerneas':1, 'Yveltal':1, 'Zygarde':1};
			let n = 0;
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species).baseSpecies;
				if (template in legends) n++;
				if (n > 2) return ["You can only use up to two legendary Pok\u00E9mon."];
			}
		},
	},
	{
		name: "Battle Spot Doubles",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560820/\">Battle Spot Doubles Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3560824/\">Battle Spot Doubles Viability Ranking</a>",
		],
		section: "ORAS Doubles",

		gameType: 'doubles',
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Doubles Hackmons Cup",
		section: "ORAS Doubles",

		gameType: 'doubles',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Doubles Custom Game",
		section: "ORAS Doubles",

		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// XY Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "Random Triples Battle",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomDoubles',
		ruleset: ['PotD', 'Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Smogon Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3511522/\">Smogon Triples</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3540390/\">Smogon Triples Viability Ranking</a>",
		],
		section: "ORAS Triples",

		gameType: 'triples',
		ruleset: ['Pokemon', 'Species Clause', 'OHKO Clause', 'Moody Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White',
			'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Perish Song',
		],
	},
	{
		name: "Battle Spot Triples",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3533914/\">Battle Spot Triples Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3549201/\">Battle Spot Triples Viability Ranking</a>",
		],
		section: "ORAS Triples",

		gameType: 'triples',
		maxForcedLevel: 50,
		teamLength: {
			validate: [6, 6],
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		requirePentagon: true,
	},
	{
		name: "Triples Hackmons Cup",
		section: "ORAS Triples",

		gameType: 'triples',
		team: 'randomHC',
		searchShow: false,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Triples Custom Game",
		section: "ORAS Triples",

		gameType: 'triples',
		searchShow: false,
		canUseRandomTeam: true,
		maxLevel: 9999,
		defaultLevel: 100,
		debug: true,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// Other Metagames
	///////////////////////////////////////////////////////////////////
	{
		name: "Physical/Special Split OU",
		section: "Other Metagames",

		searchShow: false,
		banlist: ['Uber', 'Shadow Tag', 'Soul Dew'],
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Swagger Clause', 'Baton Pass Clause'],
		onModifyMove: function (move, pokemon) {
			if (!move) return;
			if (move.category === "Status") return;
			let categoryConversion = {
				"Fire": "Special",
				"Ice": "Special",
				"Electric": "Special",
				"Grass": "Special",
				"Water": "Special",
				"Psychic": "Special",
				"Fairy": "Special",
				"Rock": "Physical",
				"Steel": "Physical",
				"Ground": "Physical",
				"Flying": "Physical",
				"Dark": "Special",
				"Ghost": "Physical",
				"Normal": "Physical",
				"Fighting": "Physical",
				"Poison": "Physical",
				"Bug": "Physical",
				"Dragon": "Special",
			};
			move.category = categoryConversion[move.type];
			if (pokemon.ability === "aerilate" && move.type === "Normal") move.category = "Physical";
			if (pokemon.ability === "refrigerate" && move.type === "Normal") move.category = "Special";
			if (pokemon.ability === "pixilate" && move.type === "Normal") move.category = "Special";
		},
	},
	{
		name: "Mix and Mega",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3540979/\">Mix and Mega</a>"],
		section: "OM of the Month",
		column: 2,

		mod: 'mixandmega',
		ruleset: ['Ubers', 'Baton Pass Clause'],
		banlist: ['Gengarite', 'Shadow Tag', 'Dynamic Punch', 'Electrify', 'Zap Cannon'],
		onValidateTeam: function (team, format) {
			let itemTable = {};
			for (let i = 0; i < team.length; i++) {
				let item = this.getItem(team[i].item);
				if (!item) continue;
				if (itemTable[item] && item.megaStone) return ["You are limited to one of each Mega Stone.", "(You have more than one " + this.getItem(item).name + ")"];
				if (itemTable[item] && (item.id === 'redorb' || item.id === 'blueorb')) return ["You are limited to one of each Primal Orb.", "(You have more than one " + this.getItem(item).name + ")"];
				itemTable[item] = true;
			}
		},
		onValidateSet: function (set) {
			let template = this.getTemplate(set.species || set.name);
			let item = this.getItem(set.item);
			if (!item.megaEvolves && item.id !== 'blueorb' && item.id !== 'redorb') return;
			if (template.baseSpecies === item.megaEvolves || (item.id === 'redorb' && template.baseSpecies === 'Groudon') || (item.id === 'blueorb' && template.baseSpecies === 'Kyogre')) return;
			if (template.evos.length) return ["" + template.species + " is not allowed to hold " + item.name + " because it's not fully evolved."];
			if (template.tier === 'Uber' || template.species in {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Slaking':1, 'Smeargle':1, 'Regigigas':1}) {
				return ["" + template.species + " is not allowed to hold " + item.name + "."];
			}
			if (template.species === 'Shuckle' && ['aggronite', 'audinite', 'charizarditex', 'charizarditey', 'galladite', 'gyaradosite', 'houndoominite', 'latiasite', 'salamencite', 'scizorite', 'sharpedonite', 'steelixite', 'tyranitarite', 'venusaurite'].indexOf(item.id) >= 0) {
				return ["" + template.species + " is not allowed to hold " + item.name + "."];
			}
			let powerAbilities = {'Huge Power':1, 'Pure Power':1};
			let allowedPower = false;
			switch (item.id) {
			case 'beedrillite': case 'kangaskhanite':
				return ["" + item.name + " can only allowed be held by " + item.megaEvolves + "."];
			case 'blazikenite':
				if (set.ability !== 'Speed Boost') return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mawilite': case 'medichamite':
				if (powerAbilities.hasOwnProperty(set.ability)) break;
				if (!template.otherFormes) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				for (let i = 0; i < template.otherFormes.length; i++) {
					let altTemplate = this.getTemplate(template.otherFormes[i]);
					if ((altTemplate.isMega || altTemplate.isPrimal) && powerAbilities.hasOwnProperty(altTemplate.abilities['0'])) {
						allowedPower = true;
						break;
					}
				}
				if (!allowedPower) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'mewtwonitey':
				if (template.baseStats.def <= 20) return ["" + template.species + " does not have enough Defense to hold " + item.name + "."];
				break;
			case 'diancite':
				if (template.baseStats.def <= 40 || template.baseStats.spd <= 40) return ["" + template.species + " does not have enough Def. or Sp. Def. to hold " + item.name + "."];
				break;
			case 'slowbronite':
				if (template.baseStats.def > 185) return ["" + template.species + " is not allowed to hold " + item.name + "."];
				break;
			case 'ampharosite': case 'garchompite': case 'heracronite':
				if (template.baseStats.spe <= 10) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'cameruptite':
				if (template.baseStats.spe <= 20) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			case 'abomasite': case 'sablenite':
				if (template.baseStats.spe <= 30) return ["" + template.species + " does not have enough Speed to hold " + item.name + "."];
				break;
			}
		},
		onBegin: function () {
			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);
			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				pokemon.originalSpecies = pokemon.baseTemplate.species;
			}
		},
		onSwitchInPriority: -6,
		onSwitchIn: function (pokemon) {
			let item = pokemon.getItem();
			if (pokemon.isActive && !pokemon.template.isMega && !pokemon.template.isPrimal && (item.id === 'redorb' || item.id === 'blueorb') && pokemon.baseTemplate.tier !== 'Uber' && !pokemon.template.evos.length) {
				// Primal Reversion
				let bannedMons = {'Cresselia':1, 'Dragonite':1, 'Kyurem-Black':1, 'Lucario':1, 'Regigigas':1, 'Slaking':1, 'Smeargle':1};
				if (!(pokemon.baseTemplate.baseSpecies in bannedMons)) {
					let template = this.getMixedTemplate(pokemon.originalSpecies, item.id === 'redorb' ? 'Groudon-Primal' : 'Kyogre-Primal');
					pokemon.formeChange(template);
					pokemon.baseTemplate = template;

					// Do we have a proper sprite for it?
					if (pokemon.originalSpecies === (item.id === 'redorb' ? 'Groudon' : 'Kyogre')) {
						pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
						this.add('detailschange', pokemon, pokemon.details);
					} else {
						let oTemplate = this.getTemplate(pokemon.originalSpecies);
						this.add('-formechange', pokemon, oTemplate.species, template.requiredItem);
						this.add('-start', pokemon, this.getTemplate(template.originalMega).requiredItem, '[silent]');
						if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
							this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
						}
					}
					this.add('message', pokemon.name + "'s " + pokemon.getItem().name + " activated!");
					this.add('message', pokemon.name + "'s Primal Reversion! It reverted to its primal form!");
					pokemon.setAbility(template.abilities['0']);
					pokemon.baseAbility = pokemon.ability;
					pokemon.canMegaEvo = false;
				}
			} else {
				let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
				if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
					// Place volatiles on the Pokémon to show its mega-evolved condition and details
					this.add('-start', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
					let oTemplate = this.getTemplate(pokemon.originalSpecies);
					if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
						this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
					}
				}
			}
		},
		onSwitchOut: function (pokemon) {
			let oMegaTemplate = this.getTemplate(pokemon.template.originalMega);
			if (oMegaTemplate.exists && pokemon.originalSpecies !== oMegaTemplate.baseSpecies) {
				this.add('-end', pokemon, oMegaTemplate.requiredItem || oMegaTemplate.requiredMove, '[silent]');
			}
		},
	},
	{
		name: "VoltTurn Mayhem",
		desc: [
			"All Pok&eacute;mon automatically switch out upon using a move that affects the opponent.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3527847/\">VoltTurn Mayhem</a>",
		],
		section: "OM of the Month",

		ruleset: ['OU'],
		banlist: [],
		onValidateTeam: function (team, format) {
			let fakeCount = 0;
			let move = {};
			for (let i = 0; i < team.length; i++) {
				if (team[i].moves) {
					for (let j = 0; j < team[i].moves.length; j++) {
						move = this.getMove(team[i].moves[j]);
						if (move.id === "fakeout" && fakeCount > 0) return ["You are limited to one user of Fake Out per team.", "(" + (team[i].name || team[i].species) + " has Fake Out)"];
						if (move.id === "fakeout") fakeCount += 1;
					}
				}
			}
		},
		onModifyMove: function (move) {
			let validTargets = {"normal":1, "any":1, "randomNormal":1, "allAdjacent":1, "allAdjacentFoes":1, "scripted":1};
			if (move.target && !move.nonGhostTarget && (move.target in validTargets)) move.selfSwitch = true;
		},
	},
	{
		name: "[Seasonal] Polar Opposites",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "OM of the Month",
		team: 'randomSeasonalPolar',
		ruleset: ['HP Percentage Mod', 'Sleep Clause Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('-message', "NOTE: This is an Inverse Battle! Type effectivenesses are reversed!");
		},
		onNegateImmunity: false,
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "CAP",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3537407/\">CAP Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/formats/cap/\">CAP Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3545628/\">CAP Viability Ranking</a>",
		],
		section: "Other Metagames",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Allow CAP'],
	},
	{
		name: "Battle Factory",
		section: "Other Metagames",

		team: 'randomFactory',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod', 'Mega Rayquaza Clause'],
	},
	{
		name: "Challenge Cup 1v1",
		section: "Other Metagames",

		team: 'randomCC',
		teamLength: {
			battle: 1,
		},
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
	},
	{
		name: "LC Random Battle",
		section: "Other Metagames",

		mod: 'randomlc',
		team: 'randomLC',
		maxForcedLevel: 5,
		ruleset: ['PotD', 'Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Origin Super Staff Bros.",
		section: "Other Metagames",
		mod: 'originstaffbros',
		team: 'randomOriginStaffBros',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "3");
			this.add('message', "2");
			this.add('message', "1");
			this.add('message', "GET READY...");
			this.add('message', "GOOOO!!!");
			this.add('raw|<div class="infobox"><center><b>Origin Super Staff Bros Credits:</b></center><b>%EmgProfessor Volco</b> - Concepts, Programming, Organization, Testing, Hosting a test server.<br /><b>@AuraStormLucario</b> - Concepts, Programming, Organization, Testing.<br /><b>~sparkychild</b> - Programming, Organization, Testing, Pokemon Descriptions.<br /><b>+hayleysworld</b> - Pokemon Descriptions, Testing.<br /><b>&PaulCentury, %Selena, %Starfox:3, +Piscean</b> - Testing.<br /><b>Other Origin Staff</b> - Participation and support in helping to achieve this project.</div>');
			this.add('raw|<br />');
			this.add('raw|<font size="5" style="font-weight:bold">/ssb [staff member name] - displays data for a staffmon\'s movepool, custom move, and custom ability.</font>');
			this.add('raw|<br />');
			// This variable saves the status of a spammy conversation to be played, so it's only played once.
			this.convoPlayed = false;

			// This code here is used for the renaming of moves showing properly on client.
			let globalRenamedMoves = {
				'defog': "Defrog",
			};
			let customRenamedMoves = {
				"cathy": {
					'kingsshield': "Heavy Dosage of Fun",
				},
			};

			let allPokemon = this.p1.pokemon.concat(this.p2.pokemon);

			for (let i = 0, len = allPokemon.length; i < len; i++) {
				let pokemon = allPokemon[i];
				let last = pokemon.moves.length - 1;
				if (pokemon.moves[last]) {
					pokemon.moves[last] = toId(pokemon.set.signatureMove);
					pokemon.moveset[last].move = pokemon.set.signatureMove;
					pokemon.baseMoveset[last].move = pokemon.set.signatureMove;
				}
				for (let j = 0; j < pokemon.moveset.length; j++) {
					let moveData = pokemon.moveset[j];
					if (globalRenamedMoves[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = globalRenamedMoves[moveData.id];
						pokemon.baseMoveset[j].move = globalRenamedMoves[moveData.id];
					}

					let customRenamedSet = customRenamedMoves[toId(pokemon.name)];
					if (customRenamedSet && customRenamedSet[moveData.id]) {
						pokemon.moves[j] = toId(pokemon.set.signatureMove);
						moveData.move = customRenamedSet[moveData.id];
						pokemon.baseMoveset[j].move = customRenamedSet[moveData.id];
					}
				}
			}
		},

		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'arkenciel' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('abnegate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'saneski' && pokemon.getAbility().id === 'moldbreaker') {
					pokemon.setAbility('cursedaura');
				}
				if (name === 'vinsteel' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('dragonsfire');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'aurastormlucario' && pokemon.getAbility().id === 'adaptability') {
					pokemon.setAbility('auraguard');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'safetyshark' && pokemon.getAbility().id === 'sandforce') {
					pokemon.setAbility('magicguard');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'alphaninja' && pokemon.getAbility().id === 'shellarmor') {
					pokemon.setAbility('megapoison');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'impfallenblood' && pokemon.getAbility().id === 'lightningrod') {
					pokemon.setAbility('pirate');
					this.add('-ability', pokemon, pokemon.ability);
					pokemon.typesData = [
						{type: 'Grass', suppressed: false,  isAdded: false},
						{type: 'Flying', suppressed: false,  isAdded: false},
					];
					this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				}
				if (name === 'princesshigh' && pokemon.getAbility().id === 'pixilate') {
					pokemon.setAbility('pixieshield');
					this.add('-ability', pokemon, pokemon.ability);
				}
			}
		},

		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// No OP pls. Balance stuff, changing them upon switch in. Wonder Guard gets curse to minimise their turns out.
			if (pokemon.getAbility().id === 'wonderguard') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (name === 'selena' && !pokemon.illusion) {
				this.boost({def:2, spd:2}, pokemon, pokemon, 'beauty');
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			if (pokemon.template.isMega) {
				if (name === 'arkenciel' && pokemon.getAbility().id !== 'abnegate') {
					pokemon.setAbility('abnegate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'saneski' && pokemon.getAbility().id !== 'cursedaura') {
					// pokemon.setAbility('cursedaura');
				}
				if (name === 'vinsteel' && pokemon.getAbility().id !== 'dragonsfire') {
					pokemon.setAbility('dragonsfire');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'aurastormlucario' && pokemon.getAbility().id !== 'auraguard') {
					pokemon.setAbility('auraguard');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'safetyshark' && pokemon.getAbility().id !== 'magicguard') {
					pokemon.setAbility('magicguard');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'alphaninja' && pokemon.getAbility().id !== 'megapoison') {
					pokemon.setAbility('megapoison');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'impfallenblood' && pokemon.getAbility().id !== 'pirate') {
					pokemon.setAbility('pirate');
					this.add('-ability', pokemon, pokemon.ability);
					pokemon.typesData = [
						{type: 'Grass', suppressed: false,  isAdded: false},
						{type: 'Flying', suppressed: false,  isAdded: false},
					];
					this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				}
				if (name === 'princesshigh' && pokemon.getAbility().id !== 'pixieshield') {
					// pokemon.setAbility('pixieshield');
					// this.add('-ability', pokemon, pokemon.ability);
				}
			} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'paulcentury' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fire');
				pokemon.typesData = [
					{type: 'Water', suppressed: false,  isAdded: false},
					{type: 'Fire', suppressed: false,  isAdded: false},
				];
			}
			if (name === 'selena' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Fairy');
				pokemon.typesData = [
					{type: 'Bug', suppressed: false,  isAdded: false},
					{type: 'Fairy', suppressed: false,  isAdded: false},
				];
			}
			if (name === 'starfox3' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Psychic');
				pokemon.typesData = [
					{type: 'Bug', suppressed: false,  isAdded: false},
					{type: 'Psychic', suppressed: false,  isAdded: false},
				];
			}
			if (name === 'chronologically' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fighting');
				pokemon.typesData = [
					{type: 'Fire', suppressed: false,  isAdded: false},
					{type: 'Fighting', suppressed: false,  isAdded: false},
				];
			}
			if (name === 'hayleysworld' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fairy');
				pokemon.typesData = [
					{type: 'Water', suppressed: false,  isAdded: false},
					{type: 'Fairy', suppressed: false,  isAdded: false},
				];
			}
			if (name === 'piscean' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.typesData = [
					{type: 'Normal', suppressed: false,  isAdded: false},
					{type: 'Ghost', suppressed: false,  isAdded: false},
				];
			}

			// Edgy switch-in sentences go here.
			// Admins
			if (name === 'arkenciel') {
				this.add('c|~ArkenCiel|You\'re alive. We can\'t have that.');
			}
			if (name === 'fender') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user fender" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#CA4D2A">fender:</font></b> !nicememe</button><em class="mine"><img src="http://i.imgur.com/qzcTh6U.gif" title="nicememe" height="300" width="420" /></em></div>');
			}
			if (name === 'lttesla') {
				this.add('c|~Lt. Tesla|Hax Gods I summon Thee');
			}
			if (name === 'masterfloat') {
				this.add('c|~Master Float|Don\'t mind me I\'m just floating around minding my own business...');
			}
			if (name === 'neosoul') {
				this.add('c|~Neo Soul|Ayy lmao');
			}
			if (name === 'sparkychild') {
				this.add('c|~sparkychild|We’re all afraid, you know... to get up on stage. Maybe you’ll mess up. Maybe they’ll totally reject you. Even so, you grit your teeth and get up on stage anyway. Something compels us… moves us to play music.');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Mm, hello.');
			}
			if (name === 'paulcentury') {
				this.add('c|&Paul Century|The King of the Slowbros is here');
			}
			if (name === 'piersniνаns') {
				this.add('c|&Piers Niνаns|Rabinov, reporting for duty!');
			}
			/* no quote
			if (name === 'saneski') {
				this.add('c|&SaNeski|');
			} */
			if (name === 'vinsteel') {
				this.add('c|&Vin Steel|Time for moderation to take its course and slay all the misbehaving Dragons!');
			}

			// Mods
			if (name === '01ntg') {
				this.add('c|@01 NTG|Welcome to the Hax Side');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|I\'ll slap you with a piano!');
			}
			if (name === 'irraquated') {
				this.add('c|@Irraquated|Oh so you\'re the guy...');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Stars, hide your fires; Let not light see my black and deep desires.');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|C\'mon spammers, I\'m watching.');
			}

			// Drivers
			if (name === 'alphaninja') {
				this.add('c|%Alpha Ninja|sup nigga');
			}
			if (name === 'chiefsokka') {
				this.add('c|%Chief Sokka|Sokka Reporting for duty Kappa!');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emgprofessorvolco') {
				this.add('c|%EmgProfessor Volco|I\'m gonna break you... Like a Kit-Kat Bar - TFS Goku');
			}
			if (name === 'gnarlycommie') {
				this.add('c|%Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|%Imp Fallen Blood|I won\’t forgive anyone who dare to take our flag!');
			}
			if (name === 'isandman') {
				this.add('c|%isandman|ENTER SANDMAN');
			}
			if (name === 'lcehvy12') {
				this.add('c|%L Cheyvy 12|I have swooped in to fuck up your day today feelsok');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|hi im birb <:');
			}
			if (name === 'selena') {
				this.add('c|%selena|o3o hi');
			}
			if (name === 'starfox3') {
				this.add('c|%StarFox :3|The Booty Master has Arrived');
			}

			// Voices
			if (name === 'castformz') {
				this.add('c|+Castformz|I know you were hoping for anything but me.');
			}
			if (name === 'chronologically') {
				this.add("raw|<div class='chat'><small>+</small><button name='parseCommand' value='/user Chronologically' style='background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer'><b><font color='#B64E5A'>Chronologically:</font></b></button><em class='mine'><img src=\"http://i.imgur.com/zRSUw2n.gif\" title=\"feelscx\" height=\"50\" width=\"50\" /></em></div>");
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|Ayyyyyyy lmao');
			}
			if (name === 'hayleysworld') {
				this.add('c|+hayleysworld|The Queen of the Sea has arrived.');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|I am a bad omen ヽ(´・ω・`)ﾉ');
			}
			if (name === 'princesshigh') {
				this.add('c|+Princess High|You bitch');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|Ey Guys, Try and Fite the Sweg');
			}

			// Others
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|Welcome to Origin Super Smash Bros, may I show you the door?');
			}
			/* no quote
			if (name === 'nineage') {
				this.add('c|nineage|');
			}
			if (name === 'originserver') {
				this.add('c|originserver|');
			} */
			/* permalocked
			if (name === 'deathlyplays') {
				this.add('c|Deathly Plays|');
			} */
		},

		// Add here salty tears, that is, custom faint phrases.
		onFaint: function (pokemon) {
			let name = toId(pokemon.name);

			// Admins
			if (name === 'arkenciel') {
				this.add('c|~ArkenCiel|alright, you got me.');
			}
			if (name === 'fender') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user fender" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#CA4D2A">fender:</font></b> !nicememe</button><em class="mine"><img src="http://i.imgur.com/qzcTh6U.gif" title="nicememe" height="300" width="420" /></em></div>');
			}
			if (name === 'lttesla') {
				this.add('c|~Lt. Tesla|A real Tesla never dies. Even when he\'s killed');
			}
			if (name === 'masterfloat') {
				this.add('c|~Master Float|shitzel, fkin hax #blameZarel');
			}
			if (name === 'neosoul') {
				this.add('c|~Neo Soul|Me ded mon!');
				this.add('c|~Neo Soul|/me shakes dreadlocks');
			}
			if (name === 'sparkychild') {
				this.add('c|~sparkychild|So ephemeral and weak. But it\'s shining with all its might. Thump, Thump, like a heartbeat. This is the light of life.');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Erica*07 wishes you all a good night.');
			}
			if (name === 'paulcentury') {
				this.add('c|&Paul Century|this is defiantly not dope');
			}
			if (name === 'piersniνаns') {
				this.add('c|&Piers Niνаns|I\'m sorry, but I can\'t carry on...');
			}
			/* no quote
			if (name === 'saneski') {
				this.add('c|&SaNeski|');
			} */
			if (name === 'vinsteel') {
				this.add('c|&Vin Steel|I failed my part as a Dragon Slayer...');
			}

			// Mods
			if (name === '01ntg') {
				this.add('c|@01 NTG|I went too easy :c');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|U know, this is all ' + pokemon.side.foe.name + '\'s fault');
			}
			if (name === 'irraquated') {
				this.add('c|@Irraquated|it was meant to be.');
				this.add('c|@Irraquated|Six god is watching, I hope you\'re prepared to face him.');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Normal people have no idea how beautiful the darkness is...');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|For the last time, I don\'t have security issues, ok?  First you kill off sparkyboTTT, then me... IM APPEALING TO ZAREL!');
			}

			// Drivers
			if (name === 'alphaninja') {
				this.add('c|%Alpha Ninja|fuck this shit nigga');
			}
			if (name === 'chiefsokka') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user chiefsokka" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A052D2">Chief Sokka:</font></b></button> Time to dump the responsibility on someone else <em class="mine"><img src="http://i.imgur.com/DsRQCsI.png" title="feelsrg" height="50" width="50" /></em></div>');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emgprofessorvolco') {
				this.add('c|%EmgProfessor Volco|Dang it my hax... they werent enough');
			}
			if (name === 'gnarlycommie') {
				this.add('c|%Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|%Imp Fallen Blood|Whether you wanna die or not, I don\’t care about whatever you say! Say that kind of thing while you\’re by our sides!');
			}
			if (name === 'isandman') {
				this.add('c|%isandman|EXIT LIGHT ENTER NIGHT TAKE MY HAND, OFF TO NEVER NEVER LAND');
			}
			if (name === 'lcehvy12') {
				this.add('c|%L Cheyvy 12|Screw this, you aren\'t worth it.');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|fuck this game idk why i even play pokemon');
			}
			if (name === 'selena') {
				this.add('c|%selena|;~; fuck that shit');
			}
			if (name === 'starfox3') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user Starfox:3" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A72A36">Starfox:3:</font></b></button><em class="mine"><img src="http://i.imgur.com/FPolh5d.jpg" title="feelsemo" height="50" width="50" /></em></div>');
			}

			// Voices
			if (name === 'castformz') {
				this.add('c|+Castformz|thanks for getting me knocked out, now I can go eat pizza pops and ice cream.');
				this.clearWeather();
			}
			if (name === 'chronologically') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user Chronologically" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#B64E5A">Chronologically:</font></b></button><em class="mine"><img src="http://i.imgur.com/lv3GmpM.png" title="FacePalm" height="50" width="50" /></em></div>');
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|I got cleaned');
			}
			if (name === 'hayleysworld') {
				this.add('c|+hayleysworld|I will stop being afk to get revenge later.');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|Your memes were stronger than mine... ( ◕ ʖ̯ ◕ )');
			}
			if (name === 'princesshigh') {
				this.add('c|+Princess High|Dammit...');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|I shall be avenged. Don\'t forget me.');
			}

			// Others
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|__My ankle!__');
			}
			/* no quote
			if (name === 'nineage') {
				this.add('c|nineage|');
			}
			if (name === 'originserver') {
				this.add('c|originserver|');
			} */
			/* permalocked
			if (name === 'deathlyplays') {
				this.add('c|Deathly Plays|');
			} */
		},

		// Special switch-out events for some mons.
		onSwitchOut: function (pokemon) {
			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
			// Switch Out Messages
			let name = toId(pokemon.name);

			// Admins
			if (name === 'arkenciel') {
				this.add('c|~ArkenCiel|You can consider yourself a little lucky.');
			}
			if (name === 'fender') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user fender" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#CA4D2A">fender:</font></b> !nicememe</button><em class="mine"><img src="http://i.imgur.com/qzcTh6U.gif" title="nicememe" height="300" width="420" /></em></div>');
			}
			if (name === 'lttesla') {
				this.add('c|~Lt. Tesla|see you space cowboy');
			}
			if (name === 'masterfloat') {
				this.add('c|~Master Float|/me floats away quietly');
			}
			if (name === 'neosoul') {
				this.add('c|~Neo Soul|/me moonwalks outta here');
			}
			if (name === 'sparkychild') {
				this.add('c|~sparkychild|By exchanging notes, you get to know one another, to understand one another. As if your souls were connected and your hearts were overlapping. It\'s a conversation through instruments. A miracle that creates harmony. In that moment, music transcends words.');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Erica*07 tells you all to take care while she\'s gone.');
			}
			if (name === 'paulcentury') {
				this.add('c|&Paul Century|Fuck this shit im out');
			}
			if (name === 'piersniνаns') {
				this.add('c|&Piers Niνаns|Tactical retreat!');
			}
			if (name === 'saneski') {
				this.add('c|&SaNeski|Do not go gentle into that good night');
			}
			if (name === 'vinsteel') {
				this.add('c|&Vin Steel|Well... I will be back and face you again');
			}

			// Mods
			if (name === '01ntg') {
				this.add('c|@01 NTG|Gotta Go, Bathroom');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|I\'ll be back, skrub');
			}
			if (name === 'irraquated') {
				this.add('c|@Irraquated|I have to go make some vegemite toast brb lol');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Without darkness one cannot know light.');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|Restarting...');
			}

			// Drivers
			if (name === 'alphaninja') {
				this.add('c|%Alpha Ninja|brb nigga');
			}
			if (name === 'chiefsokka') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user chiefsokka" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A052D2">Chief Sokka:</font></b></button> Time to dump the responsibility on someone else <em class="mine"><img src="http://i.imgur.com/M0f2zgJ.jpg?1" title="feelstea" height="50" width="50" /></em></div>');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emgprofessorvolco') {
				this.add('c|%EmgProfessor Volco|Welp look like its time to run away like Sanic');
			}
			if (name === 'gnarlycommie') {
				this.add('c|%Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|%Imp Fallen Blood|If strong guys like this are going to appear on our road later, if I don’t get stronger, I won’t be able to protect my nakama.');
			}
			if (name === 'isandman') {
				this.add('c|%isandman|JOY BANGLA , JOY BANGOBANDHU');
			}
			if (name === 'lcehvy12') {
				this.add('c|%L Cheyvy 12|I live to Fuck You Up another day!');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|pls no kill ty)');
			}
			if (name === 'selena') {
				this.add('c|%selena|\\o/ gtg');
			}
			if (name === 'starfox3') {
				this.add('c|%StarFox :3|I\'ll git that booty later');
			}

			// Voices
			if (name === 'castformz') {
				this.add('c|+Castformz|I\'d like to go on record and say this was a bad idea');
				this.clearWeather();
			}
			if (name === 'chronologically') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user Chronologically" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#B64E5A">Chronologically:</font></b></button><em class="mine"><img src="http://i.imgur.com/QAuUW7u.jpg?1" title="feelscri" height="50" width="50" /></em></div>');
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|you can get wet later ;)');
			}
			if (name === 'hayleysworld') {
				this.add('c|+hayleysworld|My bad memes will be back!');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|I\'ll be back, bitch ੧(❛〜❛✿)੭');
			}
			if (name === 'princesshigh') {
				this.add('c|+Princess High|I\'m out this bitch');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|Ey teammates, Swegtini needs a lil help');
			}

			// Others
			/* no quote
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|');
			}
			if (name === 'nineage') {
				this.add('c|nineage|');
			}
			if (name === 'originserver') {
				this.add('c|originserver|');
			} */
			/* permalocked
			if (name === 'deathlyplays') {
				this.add('c|Deathly Plays|');
			} */
		},

		onModifyPokemon: function (pokemon) {
			let name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			let moves = pokemon.moveset;
			if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
				for (let i = 0; i < 3; i++) {
					if (!moves[i].disabled) {
						pokemon.disableMove(moves[i].id, false);
						moves[i].disabled = true;
					}
				}
			}
			// Enforce taunt disabling custom moves.
			if (pokemon.volatiles['taunt']) {
				let moves = pokemon.moveset;
				for (let i = 0; i < moves.length; i++) {
					if (this.getMove(moves[i].id).category === 'Status' && !moves[i].disabled) {
						pokemon.disableMove(moves[i].id, false);
						moves[i].disabled = true;
					}
				}
			}
		},

		onModifyMove: function (move, pokemon) {
			// This is to make signature moves work when transformed.
			if (move.id === 'transform') {
				move.onHit = function (target, pokemon) {
					if (!pokemon.transformInto(target, pokemon)) return false;
					pokemon.originalName = pokemon.name;
					pokemon.name = target.name;
				};
			}
			// let name = toId(pokemon.illusion && move.sourceEffect === 'allyswitch' ? pokemon.illusion.name : pokemon.name);
			// if (move.id === '' && name === '') {}
		},
	},
	{
		name: "Balanced Hackmons",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3489849/\">Balanced Hackmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3515725/\">Balanced Hackmons Suspect Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547823/\">Balanced Hackmons Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Ability Clause', '-ate Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Endless Battle Clause', 'Team Preview', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Groudon-Primal', 'Kyogre-Primal', 'Arena Trap', 'Huge Power', 'Parental Bond', 'Pure Power', 'Shadow Tag', 'Wonder Guard', 'Assist', 'Chatter'],
	},
	{
		name: "1v1",
		desc: [
			"Bring three Pok&eacute;mon to Team Preview and choose one to battle.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3496773/\">1v1</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536109/\">1v1 Viability Ranking</a>",
		],
		section: 'Other Metagames',

		teamLength: {
			validate: [1, 3],
			battle: 1,
		},
		ruleset: ['Pokemon', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Illegal', 'Unreleased', 'Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga',
			'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Focus Sash', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Perish Song',
		],
		onBegin: function () {
			this.add('-message', "Salutations good Sir or Madam");
		},
	},
	{
		name: "Monotype",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Charizardite X', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
	},
	{
		name: "Monotype Doubles",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>",
		],
		section: "Other Metagames",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			 'Damp Rock', 'Gengarite', 'Mawilite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
	},
	{
		name: "Monotype (Turbo)",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"Similar to regular monotype but with a forced timer set to 20 seconds",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Charizardite X', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
		forceTimer: true,
	},
	{
		name: "Tier Shift",
		desc: [
			"Pok&eacute;mon below OU/BL get all their stats boosted. UU/BL2 get +5, RU/BL3 get +10, NU/BL4 get +15, and PU or lower get +20.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3554765/\">Tier Shift</a>",
		],
		section: "Other Metagames",

		mod: 'tiershift',
		ruleset: ['OU'],
		banlist: ['Swift Swim'],
	},
	{
		name: "OU (no Mega)",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3536150/\">OU (no Mega) Viability Ranking</a>"],
		section: "Other Metagames",

		ruleset: ['OU'],
		onBegin: function () {
			for (let i = 0; i < this.p1.pokemon.length; i++) {
				this.p1.pokemon[i].canMegaEvo = false;
			}
			for (let i = 0; i < this.p2.pokemon.length; i++) {
				this.p2.pokemon[i].canMegaEvo = false;
			}
		},
	},
	{
		name: "Inverse Battle",
		desc: [
			"Battle with an inverted type chart.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3518146/\">Inverse Battle</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526371/\">Inverse Battle Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Deoxys-Defense', 'Deoxys-Speed', 'Diggersby', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Serperior',
			'Shaymin-Sky', 'Snorlax', 'Xerneas', 'Yveltal', 'Zekrom', 'Gengarite', 'Kangaskhanite', 'Salamencite', 'Soul Dew', 'Shadow Tag',
		],
		onNegateImmunity: false,
		onEffectiveness: function (typeMod, target, type, move) {
			// The effectiveness of Freeze Dry on Water isn't reverted
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
	},
	{
		name: "LC Ban Happy",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505710/\">LC Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3490462/\">LC Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547566/\">LC Viability Ranking</a>",
		],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['LC Uber', 'Gligar', 'Misdreavus', 'Scyther', 'Sneasel', 'Tangela', 'Dragon Rage', 'Sonic Boom', 'Swagger', 'Skrelp', 'Mienfoo', 'Drifloon', 'Pawniard', 'Diglett',
		'Fletchling', 'Ponyta', 'Amaura', 'Porygon', 'Gothita', 'Abra', 'Magnemite', 'Timburr', 'Larvesta', 'Gastly', 'Snivy', 'Vulpix', 'Croagunk', 'Aipom', 'Honedge', 'Foongus', 'Inkay', 'Pancham',
		'Ferroseed', 'Rufflet', 'Karrablast', 'Squirtle', 'Spritzee', 'Archen', 'Pumpkaboo-Super', 'Volt absorb', 'Speed Boost', 'Regenerator', 'Sturdy', 'Levitate', 'Water Absorb',
		'Thunder Wave', 'Belly Drum', 'Knock Off', 'Stealth Rock', 'Rapid Spin', 'Defog', 'Taunt', 'Baton Pass', 'Sticky Web', 'U-turn', 'Shell Smash', 'Scald', 'Sucker Punch', 'Toxic Spikes',
		'Spike Cannon', 'Volt Switch', 'Will-o-Wisp', 'Spikes', 'Stun Spore', 'Substitute', 'Recover', 'Wish', 'Acrobatics', 'Protect', 'Swords Dance',
		],
	},
	{
		name: "Almost Any Ability",
		desc: [
			"Pok&eacute;mon can use any ability, barring the few that are banned.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3528058/\">Almost Any Ability</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551063/\">Almost Any Ability Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia',
			'Rayquaza', 'Regigigas', 'Reshiram', 'Shedinja', 'Slaking', 'Smeargle', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal',
			'Zekrom',
			'Blazikenite', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Salamencite', 'Soul Dew', 'Illusion', 'Shadow Tag', 'Chatter',
		],
		onValidateSet: function (set) {
			let bannedAbilities = {'Aerilate': 1, 'Arena Trap': 1, 'Contrary': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Protean': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1, 'Wonder Guard': 1};
			if (set.ability in bannedAbilities) {
				let template = this.getTemplate(set.species || set.name);
				let legalAbility = false;
				for (let i in template.abilities) {
					if (set.ability === template.abilities[i]) legalAbility = true;
				}
				if (!legalAbility) return ['The ability ' + set.ability + ' is banned on Pok\u00e9mon that do not naturally have it.'];
			}
		},
	},
	{
		name: "STABmons",
		desc: [
			"Pok&eacute;mon can use any move of their typing, in addition to the moves they can normally learn.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547279/\">STABmons</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558034/\">STABmons Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['OU'],
		banlist: ['Ignore STAB Moves', 'Diggersby', 'Aerodactylite', 'Altarianite', "King's Rock", 'Metagrossite', 'Razor Fang'],
	},
	{
		name: "LC UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3562639/\">LC UU</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3562640/\">LC UU Viability Ranking</a>",
		],
		section: "Other Metagames",

		maxLevel: 5,
		ruleset: ['LC'],
		banlist: ['Abra', 'Aipom', 'Archen', 'Bunnelby', 'Carvanha', 'Chinchou', 'Corphish', 'Cottonee', 'Cranidos',
			'Croagunk', 'Diglett', 'Drifloon', 'Drilbur', 'Dwebble', 'Elekid', 'Ferroseed', 'Fletchling', 'Foongus',
			'Gastly', 'Honedge', 'Houndour', 'Larvesta', 'Magnemite', 'Mienfoo', 'Munchlax', 'Omanyte', 'Onix',
			'Pancham', 'Pawniard', 'Ponyta', 'Porygon', 'Scraggy', 'Shellder', 'Skrelp', 'Snivy', 'Snubbull',
			'Spritzee', 'Staryu', 'Stunky', 'Surskit', 'Timburr', 'Tirtouga', 'Vullaby', 'Vulpix', 'Zigzagoon',
			'Shell Smash', 'Sticky Web',
		],
	},
	{
		name: "Hackmons Cup",
		desc: ["Randomized teams of level-balanced Pok&eacute;mon with absolutely any ability, moves, and item."],
		section: "Other Metagames",

		team: 'randomHC',
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "2v2 Doubles",
		desc: [
			"Double battle where you bring four Pok&eacute;mon to Team Preview and choose only two.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547040/\">2v2 Doubles</a>",
		],
		section: "Other Metagames",

		gameType: 'doubles',
		searchShow: false,
		teamLength: {
			validate: [2, 4],
			battle: 2,
		},
		ruleset: ['Doubles OU'],
		banlist: ['Perish Song'],
	},
	{
		name: "Averagemons",
		desc: [
			"Every Pok&eacute;mon has a stat spread of 100/100/100/100/100/100.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3526481/\">Averagemons</a>",
		],
		section: "Other Metagames",

		searchShow: false,
		mod: 'averagemons',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Sableye + Prankster', 'Shedinja', 'Smeargle',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Gengarite', 'Kangaskhanite', 'Light Ball', 'Mawilite', 'Medichamite', 'Soul Dew', 'Thick Club',
			'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter',
		],
	},
	{
		name: "Hidden Type",
		desc: [
			"Pok&eacute;mon have an added type determined by their IVs. Same as the Hidden Power type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3516349/\">Hidden Type</a>",
		],
		section: "Other Metagames",

		searchShow: false,
		mod: 'hiddentype',
		ruleset: ['OU'],
	},
	{
		name: "OU Theorymon",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3559611/\">OU Theorymon</a>"],
		section: "Other Metagames",

		mod: 'theorymon',
		searchShow: false,
		ruleset: ['OU'],
	},
	{
		name: "Gen-NEXT OU",
		section: "Other Metagames",

		mod: 'gennext',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard NEXT', 'Team Preview'],
		banlist: ['Uber'],
	},
	{
		name: "Monotype Random Battle",
		section: "Other Metagames",

		team: 'randomMonotype',
		searchShow: false,
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// BW2 Singles
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551993/\">BW2 OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",
		column: 3,

		mod: 'gen5',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Team Preview'],
		banlist: ['Uber', 'Drizzle ++ Swift Swim', 'Drought ++ Chlorophyll', 'Sand Stream ++ Sand Rush', 'Soul Dew'],
	},
	{
		name: "[Gen 5] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550881/\">BW2 Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446463/\">BW2 Ubers Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['Pokemon', 'Team Preview', 'Standard Ubers'],
		banlist: [],
	},
	{
		name: "[Gen 5] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3474024/\">BW2 UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] OU'],
		banlist: ['OU', 'BL', 'Drought', 'Sand Stream', 'Snow Warning'],
	},
	{
		name: "[Gen 5] RU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3473124/\">BW2 RU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] UU'],
		banlist: ['UU', 'BL2', 'Shell Smash + Baton Pass', 'Snow Warning'],
	},
	{
		name: "[Gen 5] NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3484121/\">BW2 NU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		ruleset: ['[Gen 5] RU'],
		banlist: ['RU', 'BL3', 'Prankster + Assist'],
	},
	{
		name: "[Gen 5] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3485860/\">BW2 LC Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431094/\">BW2 Sample Teams</a>",
		],
		section: "BW2 Singles",

		mod: 'gen5',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Team Preview', 'Little Cup'],
		banlist: ['Berry Juice', 'Soul Dew', 'Dragon Rage', 'Sonic Boom', 'LC Uber', 'Gligar', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela'],
	},
	{
		name: "[Gen 5] GBU Singles",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [3, 6],
			battle: 3,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Random Battle",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Custom Game",
		section: "BW2 Singles",

		mod: 'gen5',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},

	// BW2 Doubles and Triples
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 5] Doubles OU",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3485044/\">BW2 Doubles Viability Ranking</a>"],
		section: 'BW2 Doubles',
		column: 3,

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Team Preview'],
		banlist: ['Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo',
			'Palkia', 'Rayquaza', 'Reshiram', 'Zekrom', 'Soul Dew', 'Dark Void', 'Sky Drop',
		],
	},
	{
		name: "[Gen 5] GBU Doubles",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		maxForcedLevel: 50,
		teamLength: {
			validate: [4, 6],
			battle: 4,
		},
		ruleset: ['Pokemon', 'Standard GBU', 'Team Preview'],
		banlist: ['Dark Void', 'Sky Drop'],
	},
	{
		name: "[Gen 5] Doubles Custom Game",
		section: 'BW2 Doubles',

		mod: 'gen5',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions, for serious (other than team preview)
		ruleset: ['Team Preview', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Random Doubles Battle",
		section: 'BW2 Doubles',
		mod: 'gen5',
		searchShow: false,
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 5] Random Triples Battle",
		section: 'BW2 Doubles',
		mod: 'gen5',
		searchShow: false,
		gameType: 'triples',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},

	// Past Generations
	///////////////////////////////////////////////////////////////////

	{
		name: "[Gen 4] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551992/\">DPP OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],
		section: "Past Generations",
		column: 3,

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 4] Random Battle",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Random Doubles Battle",
		section: 'Past Generations',
		mod: 'gen4',
		searchShow: false,
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Random Triples Battle",
		section: 'Past Generations',
		mod: 'gen4',
		searchShow: false,
		gameType: 'triples',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 4] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3505128/\">DPP Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446464/\">DPP Ubers Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Arceus'],
	},
	{
		name: "[Gen 4] UU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503638/\">DPP UU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen4',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'OU', 'BL'],
	},
	{
		name: "[Gen 4] LC",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/dp/articles/little_cup_guide\">DPP LC Guide</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431088/\">DPP Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen4',
		maxLevel: 5,
		ruleset: ['Pokemon', 'Standard', 'Little Cup'],
		banlist: ['Berry Juice', 'DeepSeaTooth', 'Dragon Rage', 'Sonic Boom', 'Meditite', 'Misdreavus', 'Murkrow', 'Scyther', 'Sneasel', 'Tangela', 'Yanma'],
	},
	{
		name: "[Gen 4] Custom Game",
		section: "Past Generations",

		mod: 'gen4',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},
	{
		name: "[Gen 4] Doubles Custom Game",
		section: 'Past Generations',

		mod: 'gen4',
		gameType: 'doubles',
		searchShow: false,
		canUseRandomTeam: true,
		debug: true,
		maxLevel: 9999,
		defaultLevel: 100,
		// no restrictions
		ruleset: ['Cancel Mod'],
	},
	{
		name: "[Gen 3] OU",
		section: "Past Generations",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503019/\">ADV OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431087/\">ADV Sample Teams</a>",
		],

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber', 'Smeargle + Ingrain'],
	},
	{
		name: "[Gen 3] Random Battle",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Random Doubles Battle",
		section: 'Past Generations',
		mod: 'gen3',
		searchShow: false,
		gameType: 'doubles',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Random Triples Battle",
		section: 'Past Generations',
		mod: 'gen3',
		searchShow: false,
		gameType: 'triples',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 3] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3536426/\">ADV Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6446466/\">ADV Ubers Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen3',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Wobbuffet + Leftovers'],
	},
	{
		name: "[Gen 3] Custom Game",
		section: "Past Generations",

		mod: 'gen3',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 2] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3503082/\">GSC OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen2',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 2] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3507552/\">GSC Ubers Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431086/\">GSC Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Random Battle",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		team: 'random',
		ruleset: ['Pokemon', 'Standard'],
	},
	{
		name: "[Gen 2] Custom Game",
		section: "Past Generations",

		mod: 'gen2',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] OU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3486845/\">RBY OU Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen1',
		ruleset: ['Pokemon', 'Standard'],
		banlist: ['Uber'],
	},
	{
		name: "[Gen 1] Ubers",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3541329/\">RBY Ubers Viability Ranking</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/posts/6431045/\">RBY Sample Teams</a>",
		],
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard'],
		banlist: [],
	},
	{
		name: "[Gen 1] OU (tradeback)",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'Species Clause', 'OHKO Clause', 'Evasion Moves Clause', 'HP Percentage Mod', 'Cancel Mod'],
		banlist: ['Uber', 'Unreleased', 'Illegal',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Random Battle",
		section: "Past Generations",

		mod: 'gen1',
		team: 'random',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Challenge Cup",
		section: "Past Generations",

		mod: 'gen1',
		team: 'randomCC',
		searchShow: false,
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "[Gen 1] Stadium",
		section: "Past Generations",

		mod: 'stadium',
		searchShow: false,
		ruleset: ['Pokemon', 'Standard', 'Team Preview'],
		banlist: ['Uber',
			'Nidoking + Fury Attack + Thrash', 'Exeggutor + Poison Powder + Stomp', 'Exeggutor + Sleep Powder + Stomp',
			'Exeggutor + Stun Spore + Stomp', 'Jolteon + Focus Energy + Thunder Shock', 'Flareon + Focus Energy + Ember',
		],
	},
	{
		name: "[Gen 1] Custom Game",
		section: "Past Generations",

		mod: 'gen1',
		searchShow: false,
		debug: true,
		ruleset: ['Pokemon', 'HP Percentage Mod', 'Cancel Mod'],
	},
];
