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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3546114/\">OU Metagame Discussion</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/ou/\">OU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3553516/\">OU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		searchShow: false,
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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555277/\">UU Viability Ranking</a>",
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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3558546/\">RU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['UU'],
		banlist: ['UU', 'BL2'],
	},
	{
		name: "NU",
		desc: [
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3567055/\">np: NU Stage 12</a>",
			"&bullet; <a href=\"https://www.smogon.com/dex/xy/tags/nu/\">NU Banlist</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3555650/\">NU Viability Ranking</a>",
		],
		section: "ORAS Singles",

		ruleset: ['RU'],
		banlist: ['RU', 'BL3'],
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
		banlist: ['Altaria', 'Arbok', 'Armaldo', 'Armaldo', 'Articuno', 'Avalugg', 'Basculin', 'Basculin-Blue-Striped', 'Beheeyem', 'Bouffalant', 'Chatot', 'Clefairy', 'Crustle',
		'Dodrio', 'Drifblim', 'Dusknoir', 'Electrode', 'Exeggutor', 'Flareon', 'Floatzel', 'Fraxure', 'Gabite',
		'Golem', 'Gorebyss', 'Gourgeist-Super', 'Grumpig', 'Heat Rock', 'Jumpluff', 'Kadabra', 'Kingler', 'Lapras',
		'Leafeon', 'Leavanny', 'Lickilicky', 'Lumineon', 'Machoke', 'Marowak', 'Metang', 'Mightyena', 'Misdreavus',
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

		searchShow: true,
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
		name: "Monotype",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>",
		],
		section: "Monotype Tier",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Aegislash', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
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
		section: "Monotype Tier",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			 'Damp Rock', 'Gengarite', 'Mawilite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
	},
	{
		name: "Monotype Random Battle",
		section: "Monotype Tier",

		team: 'randomMonotype',
		ruleset: ['Pokemon', 'Same Type Clause', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
	},
	{
		name: "Monotype Turbo",
		desc: [
			"All Pok&eacute;mon on a team must share a type.",
			"Similar to regular monotype but with a forced timer set to 20 seconds",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3544507/\">Monotype</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3550310/\">Monotype Resources</a>",
		],
		section: "Monotype Tier",

		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Aegislash', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Charizardite X', 'Damp Rock', 'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Slowbronite', 'Smooth Rock', 'Soul Dew',
		],
		forceTimer: true,
	},
	{
		name: "Monotype Type-Bans",
		desc: [
			"<b><u>Monotype format with complex type-bans</u></b>",
			"&bullet; Aegislash is available on GHOST, banned on STEEL",
			"&bullet; Mega Charizard x available on FIRE, banned on FLYING",
			"&bullet; Hoopa-Unbound is available on DARK, banned on PSYCHIC",
			"&bullet; Mega sableye is available on GHOST, banned on DARK",
		],
		section: "Monotype Tier",
		mod: 'typebans',
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Blaziken', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Genesect', 'Giratina', 'Giratina-Origin', 'Greninja', 'Groudon', 'Ho-Oh',
			'Kyogre', 'Kyurem-White', 'Lugia', 'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Shaymin-Sky', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite',  'Gengarite', 'Kangaskhanite', 'Lucarionite', 'Mawilite', 'Metagrossite', 'Salamencite', 'Slowbronite', 'Soul Dew',
		],
	},
	{
		name: "Monotype X/Y",
		desc: [
			"Monotype format before the release of ORAS",
			"&bullet; <a href=\"https://docs.google.com/document/d/1xtDnwJvLqFMj35D0i5jtOFBj7kOyMQmyWnmr7Vk3CLA/edit\">Bans & Unbans</a>",
			"Message user: Sky Might Fall, if you notice any irregularities or have something to contribute",
		],
		section: "Monotype Tier",
		mod: 'xy',
		ruleset: ['Pokemon', 'Standard', 'Baton Pass Clause', 'Swagger Clause', 'Same Type Clause', 'Team Preview'],
		banlist: ['Arceus', 'Audinite', 'Beedrillite', 'Blaziken', 'Cameruptite', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Diancite', 'Galladite', 'Giratina', 'Giratina-Origin', 'Glalitite', 'Groudon', 'Heart Stamp', 'Ho-Oh', 'Hoopa', 'Hoopa-Unbound',
			'Kyogre', 'Latiasite', 'Latiosite', 'Lopunnite', 'Lugia', 'Mewtwo', 'Palkia', 'Pidgeotite', 'Rayquaza', 'Reshiram', 'Talonflame', 'Xerneas', 'Yveltal', 'Zekrom',
			'Altarianite', 'Damp Rock', 'Gengarite', 'Volcanion', 'Kangaskhanite', 'Lucarionite', 'Metagrossite', 'Salamencite', 'Sablenite', 'Sceptilite', 'Sharpedonite', 'Slowbronite', 'Steelixite', 'Soul Dew', 'Swampertite',
		],
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
			'Terrakion', 'Thundurus', 'Togekiss', 'Tyranitar', 'Venusaur', 'Victini', 'Volcanion', 'Weavile', 'Whimsicott', 'Zapdos',
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
			'Darkrai', 'Shaymin', 'Shaymin-Sky', 'Arceus', 'Victini', 'Keldeo', 'Meloetta', 'Genesect', 'Diancie', 'Hoopa', 'Hoopa-Unbound', 'Volcanion', 'Soul Dew',
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
		name: "Ability Unity",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3507278/\">Ability Unity</a>"],
		section: "OM of the Month",
		column: 2,

		ruleset: ['OU'],
		banlist: ['Ignore Illegal Abilities', 'Archeops', 'Regigigas', 'Slaking'],
		onValidateTeam: function (team) {
			let problems = [];
			let pokedex = Object.keys(Tools.data.Pokedex);
			let usedPokemon = [];
			for (let i = 0; i < team.length; i++) {
				let template = this.getTemplate(team[i].species);
				let ability = team[i].ability;
				if (!ability) {
					problems.push(template.species + " needs to have an ability.");
					continue;
				}
				let sources = pokedex.filter(pokemon => usedPokemon.indexOf(pokemon) < 0 && Tools.data.Pokedex[pokemon].num > 0 && template.types.sort().toString() === Tools.data.Pokedex[pokemon].types.sort().toString() && Object.values(Tools.data.Pokedex[pokemon].abilities).indexOf(ability) >= 0);
				if (!sources.length) {
					problems.push(template.species + " cannot obtain the ability " + ability + ".");
					continue;
				}
				if (ability in {'Aerilate': 1, 'Arena Trap': 1, 'Fur Coat': 1, 'Huge Power': 1, 'Imposter': 1, 'Parental Bond': 1, 'Pure Power': 1, 'Shadow Tag': 1, 'Simple':1, 'Speed Boost': 1}) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (ability === template.abilities[i]) legalAbility = true;
					}
					if (!legalAbility) {
						problems.push("The ability " + ability + " is banned on Pok\u00e9mon that do not naturally have it.");
						continue;
					}
				}
				usedPokemon.push(sources[0]);
			}
			return problems;
		},
	},
	{
		name: "Megamons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3566648/\">Megamons</a>"],
		section: "OM of the Month",

		ruleset: ['Species Clause', 'Nickname Clause', 'Moody Clause', 'OHKO Clause', 'Evasion Moves Clause', 'Swagger Clause', 'Mega Rayquaza Clause', 'Sleep Clause Mod', 'Endless Battle Clause', 'HP Percentage Mod', 'Cancel Mod', 'Team Preview'],
		banlist: ['Unreleased', 'Illegal', 'Gengar-Mega', 'Mewtwo-Mega-X', 'Mewtwo-Mega-Y', 'Rayquaza-Mega'],
		onValidateTeam: function (team) {
			let problems = [];
			let kyurems = 0;
			for (let i = 0; i < team.length; i++) {
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
		onChangeSet: function (set, format) {
			let item = this.getItem(set.item);
			let template = this.getTemplate(set.species);
			let problems = [];
			let totalEV = 0;

			if (set.species === set.name) delete set.name;
			if (set.moves) {
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					if (move.isNonstandard) {
						problems.push(move.name + ' does not exist.');
					}
				}
			}
			if (set.moves && set.moves.length > 4) {
				problems.push((set.name || set.species) + ' has more than four moves.');
			}
			if (set.level && set.level > 100) {
				problems.push((set.name || set.species) + ' is higher than level 100.');
			}

			if (template.isNonstandard) {
				problems.push(set.species + ' does not exist.');
			}
			if (this.getAbility(set.ability).isNonstandard) {
				problems.push(set.ability + ' does not exist.');
			}
			if (item.isNonstandard) {
				if (item.isNonstandard === 'gen2') {
					problems.push(item.name + ' does not exist outside of gen 2.');
				} else {
					problems.push(item.name + ' does not exist.');
				}
			}
			for (let k in set.evs) {
				if (typeof set.evs[k] !== 'number' || set.evs[k] < 0) {
					set.evs[k] = 0;
				}
				totalEV += set.evs[k];
			}
			if (totalEV > 510) {
				problems.push((set.name || set.species) + " has more than 510 total EVs.");
			}

			if (template.gender) {
				if (set.gender !== template.gender) {
					set.gender = template.gender;
				}
			} else {
				if (set.gender !== 'M' && set.gender !== 'F') {
					set.gender = undefined;
				}
			}

			let baseTemplate = this.getTemplate(template.baseSpecies);
			if (set.ivs && baseTemplate.gen >= 6 && (template.eggGroups[0] === 'Undiscovered' || template.species === 'Manaphy') && !template.prevo && !template.nfe && template.species !== 'Unown' && template.baseSpecies !== 'Pikachu' && (template.baseSpecies !== 'Diancie' || !set.shiny)) {
				let perfectIVs = 0;
				for (let i in set.ivs) {
					if (set.ivs[i] >= 31) perfectIVs++;
				}
				if (perfectIVs < 3) problems.push((set.name || set.species) + " must have at least three perfect IVs because it's a legendary in gen 6.");
			}

			let moves = [];
			if (set.moves) {
				let hasMove = {};
				for (let i = 0; i < set.moves.length; i++) {
					let move = this.getMove(set.moves[i]);
					let moveid = move.id;
					if (hasMove[moveid]) continue;
					hasMove[moveid] = true;
					moves.push(set.moves[i]);
				}
			}
			set.moves = moves;

			let battleForme = template.battleOnly && template.species;
			if (battleForme && !template.isMega) {
				if (template.requiredAbility && set.ability !== template.requiredAbility) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredAbility + "."); // Darmanitan-Zen
				}
				if (template.requiredItem && item.name !== template.requiredItem) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredItem + '.'); // Primal
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0) {
					problems.push("" + template.species + " transforms in-battle with " + template.requiredMove + "."); // Meloetta-Pirouette
				}
				if (!format.noChangeForme) set.species = template.baseSpecies; // Fix forme for Aegislash, Castform, etc.
			} else {
				if (template.requiredItem && item.name !== template.requiredItem && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to hold " + template.requiredItem + '.'); // Plate/Drive/Griseous Orb
				}
				if (template.requiredMove && set.moves.indexOf(toId(template.requiredMove)) < 0 && !template.isMega) {
					problems.push("" + (set.name || set.species) + " needs to have the move " + template.requiredMove + "."); // Keldeo-Resolute
				}

				if (item.forcedForme && template.species === this.getTemplate(item.forcedForme).baseSpecies && !format.noChangeForme) {
					set.species = item.forcedForme;
				}
			}

			if (set.species !== template.species) {
				template = this.getTemplate(set.species);
				if (!format.noChangeAbility) {
					let legalAbility = false;
					for (let i in template.abilities) {
						if (template.abilities[i] !== set.ability) continue;
						legalAbility = true;
						break;
					}
					if (!legalAbility) {
						set.ability = template.abilities['0'];
					}
				}
			}

			if (set.shiny && template.unobtainableShiny) {
				problems.push("It's currently not possible to get a shiny " + template.species + ".");
			}

			return problems;
		},
		onSwitchIn: function (pokemon) {
			let item = pokemon.getItem();
			if (item.megaEvolves && pokemon.template.species === item.megaEvolves) {
				pokemon.canMegaEvo = item.megaStone;
			}
		},
	},
	{
		name: "[Seasonal] Super Staff Bros. Melee",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3491902/\">Seasonal Ladder</a>"],
		section: "OM of the Month",

		mod: 'seasonal',
		team: 'randomSeasonalMelee',
		ruleset: ['Sleep Clause Mod', 'Freeze Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add("raw|Super Staff Bros. <b>MELEEEEEEEEEEEEEE</b>!!");
			this.add('message', "SURVIVAL! GET READY FOR THE NEXT BATTLE!");

			let globalRenamedMoves = {};
			let customRenamedMoves = {};

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
		// Here we add some flavour or design immunities.
		onImmunity: function (type, pokemon) {
			if (toId(pokemon.name) === 'juanma' && type === 'Fire') {
				this.add('-message', "Did you think fire would stop __him__? You **fool**!");
				return false;
			}
		},
		onNegateImmunity: function (pokemon, type) {
			if (pokemon.volatiles['flipside']) return false;
			const foes = pokemon.side.foe.active;
			if (foes.length && foes[0].volatiles['samuraijack'] && pokemon.hasType('Dark') && type === 'Psychic') return false;
		},
		onEffectiveness: function (typeMod, target, type, move) {
			if (!target.volatiles['flipside']) return;
			if (move && move.id === 'retreat') return;
			if (move && move.id === 'freezedry' && type === 'Water') return;
			if (move && !this.getImmunity(move, type)) return 1;
			return -typeMod;
		},
		// Hacks for megas changed abilities. This allow for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Adaptability');
				}
				if (name === 'awu' && pokemon.getAbility().id === 'hugepower') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Tough Claws');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
					this.add('-ability', pokemon, 'Simple');
				}
				if (name === 'dreameatergengar' && pokemon.getAbility().id === 'shadowtag') {
					pokemon.setAbility('infiltrator');
					this.add('-ability', pokemon, 'Infiltrator');
				}
				if (name === 'overneat' && pokemon.getAbility().id === 'speedboost') {
					pokemon.setAbility('noguard');
					this.add('-ability', pokemon, 'No Guard');
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, 'Shed Skin');
				}
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
			}
			if (!this.shownTip) {
				this.add('raw|<div class=\"broadcast-green\">Huh? But what do all these weird moves do??<br><b>Protip: Refer to the <a href="https://github.com/Zarel/Pokemon-Showdown/blob/master/mods/seasonal/README.md">PLAYER\'S MANUAL</a>!</b></div>');
				this.shownTip = true;
			}
		},
		// Here we treat many things, read comments inside for information.
		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			// Wonder Guard is available, but it curses you.
			if (pokemon.getAbility().id === 'wonderguard' && pokemon.baseTemplate.baseSpecies !== 'Shedinja' && pokemon.baseTemplate.baseSpecies !== 'Kakuna') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			if (pokemon.template.isMega) {
				if (name === 'andy' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Adaptability');
				}
				if (name === 'awu' && pokemon.getAbility().id === 'hugepower') {
					pokemon.setAbility('adaptability');
					this.add('-ability', pokemon, 'Tough Claws');
				}
				if (name === 'crestfall' && pokemon.getAbility().id === 'magicbounce') {
					pokemon.setAbility('simple');
					this.add('-ability', pokemon, 'Simple');
				}
				if (name === 'dreameatergengar' && pokemon.getAbility().id === 'shadowtag') {
					pokemon.setAbility('infiltrator');
					this.add('-ability', pokemon, 'Infiltrator');
				}
				if (name === 'overneat' && pokemon.getAbility().id === 'speedboost') {
					pokemon.setAbility('noguard');
					this.add('-ability', pokemon, 'No Guard');
				}
				if (name === 'skitty' && pokemon.getAbility().id === 'healer') {
					pokemon.setAbility('shedskin');
					this.add('-ability', pokemon, 'Shed Skin');
				}
				if (name === 'theimmortal' && pokemon.getAbility().id === 'megalauncher') {
					pokemon.setAbility('cloudnine');
				}
			} else {
				// Bypass one mega limit.
				pokemon.canMegaEvo = this.canMegaEvo(pokemon);
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'ascriptmaster') {
				pokemon.setType('Electric');
				pokemon.addVolatile('ascriptinnate', pokemon);
			}

			// Innate effects.
			if (name === 'atomicllamas') {
				pokemon.addVolatile('baddreamsinnate', pokemon);
			}
			if (name === 'blastchance') {
				pokemon.addVolatile('flipside', pokemon);
			}
			if (name === 'bondie') {
				pokemon.addVolatile('crabstance', pokemon);
			}
			if (name === 'clefairy') {
				pokemon.addVolatile('coldsteel', pokemon);
			}
			if (name === 'duck') {
				pokemon.addVolatile('firstblood', pokemon);
			}
			if (name === 'eeveegeneral') {
				this.add('detailschange', pokemon, pokemon.details); //run mega evo animation
				this.add('-mega', pokemon, 'Eevee', null);
				for (let i = 0; i < pokemon.stats.length; i++) {
					pokemon.stats[i] += 50;
				}
			}
			if (name === 'formerhope') {
				pokemon.addVolatile('cursedbodyinnate', pokemon);
			}
			if (name === 'galbia' || name === 'aurora') {
				this.setWeather('sandstorm');
			}
			if (name === 'rodan') {
				pokemon.addVolatile('gonnamakeyousweat', pokemon);
			}
			if (name === 'giagantic') {
				pokemon.addVolatile('deltastreaminnate', pokemon);
			}
			if (name === 'haund') {
				pokemon.addVolatile('prodigy', pokemon);
			}
			if (name === 'innovamania' && !pokemon.illusion) {
				this.boost({atk:6, def:6, spa:6, spd:6, spe:6, accuracy:6}, pokemon, pokemon, 'divine grace');
			}
			if (name === 'jackhiggins') {
				this.setWeather('sunnyday');
			}
			if (name === 'lemonade') {
				pokemon.addVolatile('adaptabilityinnate', pokemon);
			}
			if (name === 'manu11') {
				pokemon.addVolatile('arachnophobia', pokemon);
			}
			if (name === 'marshmallon') {
				this.boost({def: 1}, pokemon, pokemon, 'fur coat innate');
			}
			if (name === 'mizuhime' || name === 'kalalokki' || name === 'sweep') {
				this.setWeather('raindance');
			}
			if (name === 'nv') {
				pokemon.addVolatile('cuteness', pokemon);
			}
			if (name === 'pikachuun') {
				this.boost({spe: 1}, pokemon, pokemon, 'Reisen Cosplay');
			}
			if (name === 'qtrx') {
				pokemon.addVolatile('qtrxinnate', pokemon);
			}
			if (name === 'raseri') {
				this.useMove('hypnosis', pokemon);
			}
			if (name === 'rssp1') {
				pokemon.addVolatile('speedboostinnate', pokemon);
			}
			if (name === 'scythernoswiping') {
				pokemon.addVolatile('mountaineerinnate', pokemon);
			}
			if (name === 'sigilyph') {
				pokemon.addVolatile('samuraijack', pokemon);
			}
			if (name === 'sonired') {
				this.boost({def: -1, spd: -1, atk: 1, spe: 1}, pokemon, pokemon, 'Weak Skin');
			}
			if (name === 'snobalt') {
				pokemon.addVolatile('amityabsorb', pokemon);
			}
			if (name === 'spacebass') {
				pokemon.addVolatile('badtrip', pokemon);
			}
			if (name === 'sparktrain') {
				pokemon.addVolatile('refrigerateinnate', pokemon);
			}
			if (name === 'specsmegabeedrill') {
				pokemon.addVolatile('weed', pokemon);
			}
			if (name === 'starmei') {
				this.useMove('cosmicpower', pokemon);
			}
			if (name === 'talkingtree') {
				this.useMove('synthesis', pokemon);
				this.useMove('bulkup', pokemon);
			}
			if (name === 'teremiare') {
				pokemon.addVolatile('coinflip', pokemon);
			}
			if (name === 'trickster' || name === 'blitzamirin') {
				let target = pokemon.battle[pokemon.side.id === 'p1' ? 'p2' : 'p1'].active[0];
				let targetBoosts = {};
				let sourceBoosts = {};
				for (let i in target.boosts) {
					targetBoosts[i] = target.boosts[i];
					sourceBoosts[i] = pokemon.boosts[i];
				}
				target.setBoost(sourceBoosts);
				pokemon.setBoost(targetBoosts);
				this.add('-swapboost', pokemon, target);
			}
			if (name === 'unfixable') {
				pokemon.addVolatile('ironbarbsinnate', pokemon);
			}
			if (name === 'urkerab') {
				pokemon.addVolatile('focusenergy', pokemon);
				this.useMove('magnetrise', pokemon);
			}
			if (name === 'uselesstrainer') {
				pokemon.addVolatile('ninja', pokemon);
			}
			if (name === 'winry') {
				pokemon.addVolatile('hellacute', pokemon);
			}

			// Edgy switch-in sentences go here.
			// Sentences vary in style and how they are presented, so each Pokémon has its own way of sending them.
			let sentences = [];
			let sentence = '';

			if (name === 'acast') {
				this.add('c|%Acast|__A wild Castform appeared!__');
			}
			if (name === 'ace') {
				this.add('c|@Ace|Lmaonade');
			}
			if (name === 'aelita') {
				this.add('c|%Aelita|Transfer, Aelita. Scanner, Aelita. Virtualization!');
			}
			if (name === 'ajhockeystar') {
				this.add('c|+ajhockeystar|Here comes the greatest hockey player alive!');
			}
			if (name === 'albacore') {
				this.add('c|@Albacore|do I have to?');
			}
			if (name === 'albert') {
				this.add('c|+Albert|Art is risk.');
			}
			if (name === 'always') {
				sentence = (pokemon.side.foe.active.length && pokemon.side.foe.active[0].hp ? pokemon.side.foe.active[0].name : "... ohh nobody's there...");
				this.add('c|+Always|Oh it\'s ' + sentence);
			}
			if (name === 'am') {
				this.add('c|+AM|Lucky and Bad');
			}
			if (name === 'andy') {
				this.add('c|%AndrewGoncel|:I');
			}
			if (name === 'antemortem') {
				this.add('c|&antemortem|I Am Here To Oppress Users');
			}
			if (name === 'anttya') {
				this.add('c|+Anttya|Those crits didn\'t even matter');
			}
			if (name === 'anty') {
				this.add('c|+Anty|mhm');
			}
			if (name === 'articuno') {
				this.add('c|%Articuno|Abolish the patriarchy!');
			}
			if (name === 'ascriptmaster') {
				this.add("c|@Ascriptmaster|It's time for a hero to take the stage!");
			}
			if (name === 'astara') {
				this.add('c|%Ast☆arA|I\'d rather take a nap, I hope you won\'t be a petilil shit, Eat some rare candies and get on my level.');
			}
			if (name === 'atomicllamas') {
				this.add('c|&atomicllamas|(celebrate)(dog)(celebrate)');
			}
			if (name === 'aurora') {
				this.add('c|@Aurora|Best of luck to all competitors!');
			}
			if (name === 'awu') {
				this.add('c|%awu|Fite me irl bruh.');
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|Grovel peasant, you are in the presence of the RNGesus');
			}
			if (name === 'biggie') {
				sentences = ["Now I'm in the limelight cause I rhyme tight", "HAPPY FEET! WOMBO COMBO!", "You finna mess around and get dunked on"];
				this.add('c|@biggie|' + sentences[this.random(3)]);
			}
			if (name === 'blastchance') {
				this.add("c|+Blast Chance|MAN BALAMAR");
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|How Can Mirrors Be Real If Our Eyes Aren\'t Real? ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'bludz') {
				this.add('c|+bludz|420 blaze it');
			}
			if (name === 'bondie') {
				this.add('c|+bondie|__(\\/) snip snip (\\/)__');
			}
			if (name === 'bottt') {
				this.add('c|boTTT|Beep, boop');
			}
			if (name === 'brandon') {
				this.add("c|+Brrandon|Life's too short to take it seriously ALL the time.");
			}
			if (name === 'bumbadadabum') {
				this.add('c|@bumbadadabum|Time for card games on motorcycles!');
				if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'Scotteh') this.add('c|@bumbadadabum|Also, fuck you Scotteh');
			}
			if (name === 'bummer') {
				this.add("c|&Bummer|Oh hi.");
			}
			if (name === 'chaos') {
				this.add("c|~chaos|I always win");
			}
			if (name === 'ciran') {
				this.add("c|+Ciran|You called?");
			}
			if (name === 'clefairy') {
				this.add('c|+Clefairy|google "dj clefairyfreak" now');
			}
			if (name === 'coolstorybrobat') {
				sentence = [
					"Time to GET SLAYED", "BRUH!", "Ahem! Gentlemen...", "I spent 6 months training in the mountains for this day!",
					"Shoutout to all the pear...",
				][this.random(5)];
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'crestfall') {
				this.add('c|%Crestfall|To say that we\'re in love is dangerous');
			}
			if (name === 'deathonwings') {
				this.add('c|+Death on Wings|rof');
			}
			if (name === 'dirpz') {
				this.add('c|+Dirpz|IT\'S A WATER/FAIRY TYPE!!11!');
			}
			if (name === 'dmt') {
				this.add('c|+DMT|DMT');
			}
			if (name === 'dreameatergengar') {
				this.add('c|+Dream Eater Gengar|Goodnight sweet prince.');
			}
			if (name === 'duck') {
				this.add('c|@Duck|Don\'t duck with me!');
			}
			if (name === 'e4flint') {
				this.add('c|+E4 Flint|hf lul');
			}
			if (name === 'eeveegeneral') {
				sentences = ['yo', 'anyone seen goku?'];
				this.add('c|~Eevee General|' + sentences[this.random(2)]);
			}
			if (name === 'eyan') {
				this.add('c|@Eyan|░░░░░░░░▄▄▄▀▀▀▄▄███▄░░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░░░░▄▀▀░░░░░░░▐░▀██▌░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░░▄▀░░░░▄▄███░▌▀▀░▀█░░░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░░▄█░░▄▀▀▒▒▒▒▒▄▐░░░░█▌░░░░░░░░░░░░░░░ ');
				this.add('c|@Eyan|░▐█▀▄▀▄▄▄▄▀▀▀▀▌░░░░░▐█▄░░░░░░░░░░░░░░');
				this.add('c|@Eyan|░▌▄▄▀▀░░░░░░░░▌░░░░▄███████▄░░░░░░░░░');
				this.add('c|@Eyan|░░░░░░░░░░░░░▐░░░░▐███████████▄░░░░░░');
				this.add('c|@Eyan|░░░░░le░░░░░░░▐░░░░▐█████████████▄░░░');
				this.add('c|@Eyan|░░░░toucan░░░░░░▀▄░░░▐██████████████▄');
				this.add('c|@Eyan|░░░░░░has░░░░░░░░▀▄▄████████████████▄');
				this.add('c|@Eyan|░░░░░arrived░░░░░░░░░░░░█▀██████░░░░░');
				this.add('c|@Eyan|WELCOME TO COMPETITIVE TOUCANNING');
			}
			if (name === 'feliburn') {
				this.add('c|@Feliburn|you don\'t go hand to hand with a fighter noob');
			}
			if (name === 'fireburn') {
				this.add('c|+Fireburn|:V');
			}
			if (name === 'flyingkebab') {
				this.add("c|+Flying Kebab|Kebab > Pizza");
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|I have Hope');
			}
			if (name === 'freeroamer') {
				this.add('c|%Freeroamer|lol this is a wrap');
			}
			if (name === 'frysinger') {
				this.add("c|+Frysinger|Nice boosts kid.");
			}
			if (name === 'fx') {
				this.add("c|+f(x)|love is 4 wawawawawawawalls");
			}
			if (name === 'galbia') {
				this.add('c|@galbia|(dog)');
			}
			if (name === 'galom') {
				this.add('c|+Galom|To the end.');
			}
			if (name === 'rodan') { // don't delete
				this.add("c|+RODAN|Here I Come, Rougher Than The Rest of 'Em.");
			}
			if (name === 'geoffbruedly') {
				this.add("c|%GeoffBruedly|FOR WINRY");
			}
			if (name === 'giagantic') {
				this.add("c|%Giagantic|e.e");
			}
			if (name === 'golui') {
				this.add("c|+Golui|Golly gee");
			}
			if (name === 'goodmorningespeon') {
				this.add("c|+GoodMorningEspeon|type /part to continue participating in this battle :)");
			}
			if (name === 'grimauxiliatrix') {
				this.add("c|%grimAuxiliatrix|ᕕ( ᐛ )ᕗ");
			}
			if (name === 'halite') {
				this.add('c|@Halite|You’re gonna get haxxed kid :^)');
			}
			if (name === 'hannah') {
				this.add('c|+Hannahh|♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥');
			}
			if (name === 'hashtag') {
				this.add("c|#Hashtag|hey opponent, you get 5 hashtag points if you forfeit right now ;}");
			}
			if (name === 'haund') {
				this.add('c|%Haund|le balanced normal flying bird has arrived');
			}
			if (name === 'healndeal') {
				this.add('c|+HeaLnDeaL|screw clerics');
			}
			if (name === 'himynamesl') {
				this.add('c|@HiMyNamesL|There’s no such thing as winning or losing. There is won and there is lost, there is victory and defeat. There are absolutes. Everything in between is still left to fight for.');
				this.add('c|@HiMyNamesL|' + pokemon.side.foe.name + ' will have won only when there is no one left to stand against them. Until then, there is only the struggle, because tides do what tides do – they turn.');
			}
			if (name === 'hippopotas') {
				this.add('-message', '@Hippopotas\'s Sand Stream whipped up a sandstorm!');
			}
			if (name === 'hollywood') {
				this.add('c|+hollywood|Kappa');
			}
			if (name === 'ih8ih8sn0w') {
				this.add('c|+ih8ih8sn0w|*sips tea*');
			}
			if (name === 'imanalt') {
				this.add('c|+imanalt|muh bulk');
			}
			if (name === 'imas234') {
				this.add('c|@imas234|hlo');
			}
			if (name === 'innovamania') {
				sentences = ['Don\'t take this seriously', 'These Black Glasses sure look cool', 'Ready for some fun?( ͡° ͜ʖ ͡°)', '( ͡° ͜ʖ ͡°'];
				this.add('c|@innovamania|' + sentences[this.random(4)]);
			}
			if (name === 'iplaytennislol') {
				this.add('c|%iplaytennislol|KACAW');
			}
			if (name === 'iyarito') {
				this.add('c|+Iyarito|Welp');
			}
			if (name === 'jasmine') {
				this.add("c|+Jasmine|I'm still relevant!");
			}
			if (name === 'jdarden') {
				this.add('c|@jdarden|Did someone call for some BALK?');
			}
			if (name === 'jetpack') {
				this.add('c|+Jetpack|You\'ve met with a terrible fate, haven\'t you?');
			}
			if (name === 'joim') {
				let dice = this.random(8);
				if (dice === 1) {
					this.add('c|~Joim|░░░░░░░░░░░░▄▐');
					this.add('c|~Joim|░░░░░░▄▄▄░░▄██▄');
					this.add('c|~Joim|░░░░░▐▀█▀▌░░░░▀█▄');
					this.add('c|~Joim|░░░░░▐█▄█▌░░░░░░▀█▄');
					this.add('c|~Joim|░░░░░░▀▄▀░░░▄▄▄▄▄▀▀');
					this.add('c|~Joim|░░░░▄▄▄██▀▀▀▀');
					this.add('c|~Joim|░░░█▀▄▄▄█░▀▀');
					this.add('c|~Joim|░░░▌░▄▄▄▐▌▀▀▀');
					this.add('c|~Joim|▄░▐░░░▄▄░█░▀▀ U HAVE BEEN SPOOKED');
					this.add('c|~Joim|▀█▌░░░▄░▀█▀░▀');
					this.add('c|~Joim|░░░░░░░▄▄▐▌▄▄ BY THE');
					this.add('c|~Joim|░░░░░░░▀███▀█░▄');
					this.add('c|~Joim|░░░░░░▐▌▀▄▀▄▀▐▄ SPOOKY SKILENTON');
					this.add('c|~Joim|░░░░░░▐▀░░░░░░▐▌');
					this.add('c|~Joim|░░░░░░█░░░░░░░░█');
					this.add('c|~Joim|░░░░░▐▌░░░░░░░░░█');
					this.add('c|~Joim|░░░░░█░░░░░░░░░░▐▌ SEND THIS TO 7 PPL OR SKELINTONS WILL EAT YOU');
				} else {
					sentences = [
						"Finally a good reason to punch a teenager in the face!", "WUBBA LUBBA DUB DUB",
						"``So here we are again, it's always such a pleasure.``", "My ex-wife still misses me, BUT HER AIM IS GETTING BETTER!",
						"A man chooses, a slave obeys.", "You're gonna have a bad time.", "Would you kindly let me win?",
						"I'm sorry, but I only enjoy vintage memes from the early 00's.",
					];
					sentence = sentences[this.random(8)];
					this.add('c|~Joim|' + sentence);
				}
			}
			if (name === 'juanma') {
				this.add("c|+Juanma|Okay, well, sometimes, science is more art than science, " + pokemon.side.name + ". A lot of people don't get that.");
			}
			if (name === 'kalalokki') {
				this.add('c|+Kalalokki|(•_•)');
				this.add('c|+Kalalokki|( •_•)>⌐■-■');
				this.add('c|+Kalalokki|(⌐■_■)');
			}
			if (name === 'kidwizard') {
				this.add('c|+Kid Wizard|Eevee General room mod me.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|Enter stage left');
			}
			if (name === 'legitimateusername') {
				sentence = ["This isn't my fault.", "I'm not sorry."][this.random(2)];
				this.add('c|@LegitimateUsername|``' + sentence + '``');
			}
			if (name === 'lemonade') {
				this.add('c|+Lemonade|Pasta');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|n_n!');
			}
			if (name === 'lj') {
				this.add('c|%LJDarkrai|Powerfulll');
			}
			if (name === 'lyto') {
				sentences = ["This is divine retribution!", "I will handle this myself!", "Let battle commence!"];
				this.add('c|@Lyto|' + sentences[this.random(3)]);
			}
			if (name === 'macle') {
				this.add("c|+macle|Follow the Frog Blog");
			}
			if (name === 'manu11') {
				this.add("c|@manu 11|/me is pet by ihateyourpancreas");
			}
			if (name === 'marshmallon') {
				this.add("c|%Marshmallon|Marshtomb be like");
				this.add("c|%Marshmallon|- He sees you when you're sleeping -");
				this.add("c|%Marshmallon|- He knows when you're awake -");
				this.add("c|%Marshmallon|- He knows if you've been bad or good -");
				this.add("c|%Marshmallon|- So be good for goodness sake -");
			}
			if (name === 'mattl') {
				this.add('c|+MattL|If you strike me down, I shall become more powerful than you can possibly imagine.');
			}
			if (name === 'mcmeghan') {
				this.add("c|&McMeghan|A Game of Odds");
			}
			if (name === 'megazard') {
				this.add('c|+Megazard|New tricks');
			}
			if (name === 'mizuhime') {
				this.add('c|+Mizuhime|Thou Shalt Double Laser From The Edge');
			}
			if (name === 'nv') {
				this.add('c|+nv|Who tf is nv?');
			}
			if (name === 'omegaxis') {
				this.add('c|+Omega-Xis|lol this isn’t even my final form');
			}
			if (name === 'orday') {
				this.add('c|%Orda-Y|❄');
			}
			if (name === 'overneat') {
				this.add('c|+Overneat|tsk, tsk, is going to be funny');
			}
			if (name === 'paradise') {
				this.add('c|%Paradise~|I sexually identify as a hazard setter');
			}
			if (name === 'pikachuun') {
				sentences = ['Reisen is best waifu', 'Hey look I coded myself into the game', 'sup (\'.w.\')'];
				this.add('c|+Pikachuun|' + sentences[this.random(3)]);
			}
			if (name === 'pluviometer') {
				this.add('c|+pluviometer|p^2laceholder');
			}
			if (name === 'qtrx') {
				sentences = ["cutie are ex", "q-trix", "quarters", "cute T-rex", "Qatari", "random letters", "spammy letters", "asgdf"];
				this.add("c|@qtrx|omg DONT call me '" + sentences[this.random(8)] + "' pls respect my name its very special!!1!");
			}
			if (name === 'quitequiet') {
				this.add("c|@Quite Quiet|I'll give it a shot.");
			}
			if (name === 'raseri') {
				this.add('c|&Raseri|gg');
			}
			if (name === 'raven') {
				this.add('c|&Raven|Are you ready? Then let the challenge... Begin!');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|Get Rekeri\'d :]');
			}
			if (name === 'rosiethevenusaur') {
				sentences = ['!dt party', 'Are you Wifi whitelisted?', 'Read the roomintro!'];
				this.add('c|@RosieTheVenusaur|' + sentences[this.random(3)]);
			}
			if (name === 'rssp1') {
				this.add('c|+rssp1|Witness the power of the almighty Rufflet!');
			}
			if (name === 'sailorcosmos') {
				this.add("c|+SailorCosmos|Cosmos Prism Power Make Up!");
			}
			if (name === 'scotteh') {
				this.add('c|&Scotteh|─────▄▄████▀█▄');
				this.add('c|&Scotteh|───▄██████████████████▄');
				if (pokemon.side.foe.active.length && pokemon.side.foe.active[0].name === 'bumbadadabum') this.add('c|@bumbadadabum|Fuck you Scotteh');
				this.add('c|&Scotteh|─▄█████.▼.▼.▼.▼.▼.▼.▼');
			}
			if (name === 'scpinion') {
				this.add('c|@scpinion|/me welcomes funbro');
			}
			if (name === 'scythernoswiping') {
				this.add('c|%Scyther NO Swiping|/me prepares to swipe victory');
			}
			if (name === 'shrang') {
				this.add('raw| [15:30] @<b>Scrappie</b>: It is I, the great and powerful shrang, who is superior to you proles in every conceivable way.');
			}
			if (name === 'sigilyph') {
				this.add('c|@Sigilyph|Prepare to feel the mighty power of an exploding star!');
			}
			if (name === 'sirdonovan') {
				this.add('c|&sirDonovan|Oh, a battle? Let me finish my tea and crumpets');
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|\\_$-_-$_/');
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|By the power vested in me from the great Lord Tomohawk...');
			}
			if (name === 'snowy') {
				this.add('c|+Snowy|Why do a lot of black people call each other monica?');
			}
			if (name === 'solarisfox') {
				this.add('raw|<div class="chat chatmessage-solarisfox"><small>%</small><b><font color="#2D8F1E"><span class="username" data-name="SolarisFox">SolarisFox</span>:</font></b> <em><marquee behavior="alternate" scrollamount=3 scrolldelay="60" width="108">[Intense vibrating]</marquee></em></div>');
			}
			if (name === 'sonired') {
				this.add('c|+Sonired|~');
			}
			if (name === 'spacebass') {
				this.add('c|@SpaceBass|He aims his good ear best he can towards conversation and sometimes leans in awkward toward your seat');
				this.add('c|@SpaceBass|And if by chance one feels their space too invaded, then try your best to calmly be discreet');
				this.add('c|@SpaceBass|Because this septic breathed man that stands before you is a champion from days gone by');
			}
			if (name === 'sparktrain') {
				this.add('c|+sparktrain|hi');
			}
			if (name === 'specsmegabeedrill') {
				this.add('c|+SpecsMegaBeedrill|(◕‿◕✿)');
			}
			if (name === 'spy') {
				sentences = ['curry consumer', 'try to keep up', 'fucking try to knock me down', 'Sometimes I slather myself in vasoline and pretend I\'m a slug', 'I\'m really feeling it!'];
				this.add('c|+Spy|' + sentences[this.random(5)]);
			}
			if (name === 'starmei') {
				this.add('c|+Starmei|Starmei wins again');
			}
			if (name === 'starry') {
				this.add('c|%starry|oh');
			}
			if (name === 'steamroll') {
				this.add('c|@Steamroll|Banhammer ready!');
			}
			if (name === 'sunfished') {
				this.add('c|+Sunfished|*raptor screeches*');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|(ninjacat)(beer)');
			}
			if (name === 'talkingtree') {
				this.add('c|+talkingtree|I am Groot n_n');
			}
			if (name === 'temporaryanonymous') {
				sentences = ['Hey, hey, can I gently scramble your insides (just for laughs)? ``hahahaha``', 'check em', 'If you strike me down, I shall become more powerful than you can possibly imagine! I have a strong deathrattle effect and I cannot be silenced!'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(3)]);
			}
			if (name === 'teremiare') {
				this.add('c|%Teremiare|I like to call it skill');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Give me my robe, put on my crown!');
			}
			if (name === 'tone114') {
				this.add('c|+TONE114|Haven\'t you heard the new sensation sweeping the nation?');
			}
			if (name === 'trickster') {
				sentences = ["heh….watch out before you get cut on my edge", "AaAaAaAAaAaAAa"];
				this.add('c|@Trickster|' + sentences[this.random(2)]);
			}
			if (name === 'unfixable') {
				this.add('c|+unfixable|eevee general sucks lol');
			}
			if (name === 'urkerab') {
				this.add('j|urkerab');
			}
			if (name === 'uselesstrainer') {
				sentences = ['huehuehuehue', 'PIZA', 'SPAGUETI', 'RAVIOLI RAVIOLI GIVE ME THE FORMUOLI', 'get ready for PUN-ishment', 'PIU\' RUSPE PER TUTTI, E I MARO\'???'];
				this.add('c|@useless trainer|' + sentences[this.random(6)]);
			}
			if (name === 'vapo') {
				this.add('c|%Vapo|/me vapes');
			}
			if (name === 'vexeniv') {
				this.add('c|+Vexen IV|The Arcana is the means by which all is revealed.');
			}
			if (name === 'winry') {
				this.add('c|@Winry|fight me irl');
			}
			if (name === 'xfix') {
				if (this.random(2)) {
					// The classic one
					const hazards = {stealthrock: 1, spikes: 1, toxicspikes: 1, burnspikes: 1, stickyweb: 1};
					let hasHazards = false;
					for (const hazard in hazards) {
						if (pokemon.side.getSideCondition(hazard)) {
							hasHazards = true;
							break;
						}
					}
					if (hasHazards) {
						this.add('c|+xfix|(no haz... too late)');
					} else {
						this.add('c|+xfix|(no hazards, attacks only, final destination)');
					}
				} else {
					this.add("c|+xfix|//starthunt 1 + 1 | 2 | 2 + 2 | 4 | Opponent's status soon (answer with three letters) | FNT :)");
				}
			}
			if (name === 'xjoelituh') {
				this.add("c|+xJoelituh|I won't be haxed again, you will be the next one. UUUUUU");
			}
			if (name === 'xshiba') { // dd
				this.add("c|+xShiba|LINDA IS INDA");
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|Your mom');
			}
			if (name === 'zebraiken') {
				pokemon.phraseIndex = this.random(3);
				//  Zeb's faint and entry phrases correspond to each other.
				if (pokemon.phraseIndex === 2) {
					this.add('c|&Zebraiken|bzzt n_n');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|&Zebraiken|bzzt *_*');
				} else {
					this.add('c|&Zebraiken|bzzt o_o');
				}
			}
			if (name === 'zeroluxgiven') {
				this.add('c|%Zero Lux Given|This should be an electrifying battle!');
			}
			if (name === 'zodiax') {
				this.add('c|%Zodiax|Introducing 7 time Grand Champion to the battle!');
			}
		},
		onFaint: function (pokemon, source, effect) {
			let name = toId(pokemon.name);

			if (name === 'innovamania') {
				pokemon.side.addSideCondition('healingwish', pokemon, this);
			}
			// Add here salty tears, that is, custom faint phrases.
			let sentences = [];
			// This message is different from others, as it triggers when
			// opponent faints
			if (source && source.name === 'galbia') {
				this.add('c|@galbia|literally 2HKOged');
			}
			// Actual faint phrases
			if (name === 'acast') {
				this.add('c|%Acast|If only I had more screens...');
			}
			if (name === 'ace') {
				this.add('c|@Ace|inhale all of this');
			}
			if (name === 'aelita') {
				this.add('c|%Aelita|CODE: LYOKO. Tower deactivated...');
			}
			if (name === 'ajhockeystar') {
				this.add('c|+ajhockeystar|You may have beaten me in battle, but never in hockey.');
			}
			if (name === 'albacore') {
				this.add('c|@Albacore|Joke\'s on you, I was just testing!');
			}
			if (name === 'albert') {
				this.add("c|+Albert|You may be good looking, but you're not a piece of art.");
			}
			if (name === 'always') {
				this.add('c|+Always|i swear to fucking god how can a single person be this lucky after getting played all the fucking way. you are a mere slave you glorified heap of trash.');
			}
			if (name === 'am') {
				this.add('c|+AM|RIP');
			}
			if (name === 'andy') {
				this.add('c|%AndrewGoncel|wow r00d! :c');
			}
			if (name === 'antemortem') {
				this.add('c|&antemortem|FUCKING CAMPAIGNERS');
			}
			if (name === 'anttya') {
				this.add('c|+Anttya|Can\'t beat hax ¯\\_(ツ)_/¯');
			}
			if (name === 'anty') {
				this.add('c|+Anty|k');
			}
			if (name === 'articuno') {
				this.add('c|%Articuno|This is why you don\'t get any girls.');
			}
			if (name === 'ascriptmaster') {
				this.add('c|@Ascriptmaster|Farewell, my friends. May we meet another day...');
			}
			if (name === 'astara') {
				sentences = ['/me twerks into oblivion', 'good night ♥', 'Astara Vista Baby'];
				this.add('c|%Ast☆arA|' + sentences[this.random(3)]);
			}
			if (name === 'atomicllamas') {
				this.add('c|&atomicllamas|(puke)');
			}
			if (name === 'aurora') {
				this.add('c|@Aurora|are you serious you\'re so bad oh my god haxed ughhhhh');
			}
			if (name === 'awu') {
				this.add("c|%awu|No need for goodbye. I'll see you on the flip side.");
			}
			if (name === 'beowulf') {
				this.add('c|@Beowulf|There is no need to be mad');
			}
			if (name === 'biggie') {
				sentences = ['It was all a dream', 'It\'s gotta be the shoes', 'ヽ༼ຈل͜ຈ༽ﾉ RIOT ヽ༼ຈل͜ຈ༽ﾉ'];
				this.add('c|@biggie|' + sentences[this.random(3)]);
			}
			if (name === 'blastchance') {
				this.add("c|+Blast Chance|**oh no!**");
			}
			if (name === 'blitzamirin') {
				this.add('c|@Blitzamirin|The Mirror Can Lie It Doesn\'t Show What\'s Inside ╰( ~ ◕ ᗜ ◕ ~ )੭━☆ﾟ.*･｡ﾟ');
			}
			if (name === 'bludz') {
				this.add('c|+bludz|zzz');
			}
			if (name === 'bondie') {
				this.add('c|+bondie|Sigh...');
			}
			if (name === 'bottt') {
				this.add("c| boTTT|No longer being maintained...");
			}
			if (name === 'brandon') {
				this.add("c|+Brrandon|Always leave the crowd wanting more~");
			}
			if (name === 'bumbadadabum') {
				this.add("c|@bumbadadabum|Find another planet make the same mistakes.");
			}
			if (name === 'bummer') {
				this.add('c|&Bummer|Thanks for considering me!');
			}
			if (name === 'chaos') {
				this.add('c|~chaos|//forcewin chaos');
				if (this.random(1000) === 420) {
					// Shouldn't happen much, but if this happens it's hilarious.
					this.add('c|~chaos|actually');
					this.add('c|~chaos|//forcewin ' + pokemon.side.name);
					this.win(pokemon.side);
				}
			}
			if (name === 'ciran') {
				this.add("c|+Ciran|Fun is still banned in the Wi-Fi room!");
			}
			if (name === 'clefairy') {
				this.add('c|+Clefairy|flex&no flex zone nightcore remix dj clefairyfreak 2015');
			}
			if (name === 'coolstorybrobat') {
				let sentence = [
					"Lol I got slayed", "BRUH!", "I tried", "Going back to those mountains to train brb", "I forgot what fruit had... tasted like...",
				][this.random(5)];
				this.add('c|@CoolStoryBrobat|' + sentence);
			}
			if (name === 'crestfall') {
				this.add("c|%Crestfall|Her pistol go (bang bang, boom boom, pop pop)");
			}
			if (name === 'deathonwings') {
				this.add('c|+Death on Wings|DEG\'s a nub');
			}
			if (name === 'dirpz') {
				this.add('c|+Dirpz|sylveon is an eeeveeeeeeelutioooooon....');
			}
			if (name === 'dmt') {
				this.add('c|+DMT|DMT');
			}
			if (name === 'dreameatergengar') {
				this.add('c|+Dream Eater Gengar|In the darkness I fade. Remember ghosts don\'t die!');
			}
			if (name === 'duck') {
				this.add('c|@Duck|Duck you!');
			}
			if (name === 'e4flint') {
				this.add('c|#E4 Flint|+n1');
				this.add('c|+sparkyboTTT|nice 1');
			}
			if (name === 'eeveegeneral') {
				sentences = ["bye room, Electrolyte is in charge", "/me secretly cries", "inap!"];
				this.add("c|~Eevee General|" + sentences[this.random(3)]);
			}
			if (name === 'eyan') {
				this.add("c|@Eyan|;-;7");
			}
			if (name === 'feliburn') {
				this.add('c|@Feliburn|gg la verga de tu madre');
			}
			if (name === 'fireburn') {
				this.add('c|+Fireburn|>:Y');
			}
			if (name === 'flyingkebab') {
				this.add("c|+Flying Kebab|" + ["I\'ll see you in hell!", "/me vanishes to the depths of hell"][this.random(2)]);
			}
			if (name === 'formerhope') {
				this.add('c|@Former Hope|Now I have Former Hope.');
			}
			if (name === 'freeroamer') {
				this.add('c|%Freeroamer|how do people get these matchups...');
			}
			if (name === 'frysinger') {
				this.add("c|+Frysinger|/me teleports away from the battle and eats a senzu bean");
			}
			if (name === 'fx') {
				this.add("c|+f(x)|mirror, mirror");
			}
			if (name === 'galbia') {
				this.add('c|@galbia|(dog)');
			}
			if (name === 'galom') {
				this.add('c|+Galom|GAME OVER.');
			}
			if (name === 'rodan') {
				this.add("c|+RODAN|The Great Emeralds power allows me to feel... ");
			}
			if (name === 'geoffbruedly') {
				this.add("c|%GeoffBruedly|IM SORRY WINRY");
			}
			if (name === 'giagantic') {
				this.add("c|%Giagantic|x.x");
			}
			if (name === 'golui') {
				this.add("c|+Golui|Freeze in hell");
			}
			if (name === 'goodmorningespeon') {
				this.add("c|+GoodMorningEspeon|gg wp good hunt would scavenge again");
			}
			if (name === 'grimauxiliatrix') {
				this.add("c|%grimAuxiliatrix|∠( ᐛ 」∠)_");
			}
			if (name === 'halite') {
				this.add('c|@Halite|Today was your lucky day...');
			}
			if (name === 'hannah') {
				this.add('c|+Hannahh|Nooo! ;~;');
			}
			if (name === 'hashtag') {
				this.add("c|#Hashtag|fukn immigrants,,, slash me spits");
			}
			if (name === 'haund') {
				this.add('c|%Haund|omg noob team report');
			}
			if (name === 'healndeal') {
				this.add('c|+HeaLnDeaL|sadface I should have been a Sylveon');
			}
			if (name === 'himynamesl') {
				this.add('c|@HiMyNamesL|hey ' + pokemon.side.name + ', get good');
			}
			if (name === 'hippopotas') {
				this.add('-message', 'The sandstorm subsided.');
			}
			if (name === 'hollywood') {
				this.add('c|+hollywood|BibleThump');
			}
			if (name === 'ih8ih8sn0w') {
				this.add('c|+ih8ih8sn0w|nice hax :(');
			}
			if (name === 'imanalt') {
				this.add('c|+imanalt|bshax imo');
			}
			if (name === 'imas234') {
				this.add('c|@imas234|bg no re');
			}
			if (name === 'innovamania') {
				sentences = ['Did you rage quit?', 'How\'d you lose with this set?'];
				this.add('c|@innovamania|' + sentences[this.random(2)]);
			}
			if (name === 'iplaytennislol') {
				this.add('c|%iplaytennislol|/me des');
			}
			if (name === 'iyarito') {
				this.add('c|+Iyarito|Owwnn ;_;');
			}
			if (name === 'jasmine') {
				this.add("raw|<div class=\"broadcast-red\"><b>The server is restarting soon.</b><br />Please finish your battles quickly. No new battles can be started until the server resets in a few minutes.</div>");
			}
			if (name === 'jdarden') {
				this.add('c|@jdarden|;-;7');
			}
			if (name === 'jetpack') {
				this.add('c|+Jetpack|You shouldn\'t of done that. ;_;');
			}
			if (name === 'joim') {
				sentences = ['AVENGE ME, KIDS! AVEEEENGEEE MEEEEEE!!', 'OBEY!', '``This was a triumph, I\'m making a note here: HUGE SUCCESS.``', '``Remember when you tried to kill me twice? Oh how we laughed and laughed! Except I wasn\'t laughing.``', '``I\'m not even angry, I\'m being so sincere right now, even though you broke my heart and killed me. And tore me to pieces. And threw every piece into a fire.``'];
				this.add('c|~Joim|' + sentences[this.random(4)]);
			}
			if (name === 'juanma') {
				this.add("c|+Juanma|I guess you were right, now you must be the happiest person in the world, " + pokemon.side.name + "! You get to be major of 'I-told-you-so' town!");
			}
			if (name === 'kalalokki') {
				this.add('c|+Kalalokki|(⌐■_■)');
				this.add('c|+Kalalokki|( •_•)>⌐■-■');
				this.add('c|+Kalalokki|(x_x)');
			}
			if (name === 'kidwizard') {
				this.add('c|+Kid Wizard|Go to hell.');
			}
			if (name === 'layell') {
				this.add('c|@Layell|' + ['Alas poor me', 'Goodnight sweet prince'][this.random(2)]);
			}
			if (name === 'legitimateusername') {
				this.add('c|@LegitimateUsername|``This isn\'t brave. It\'s murder. What did I ever do to you?``');
			}
			if (name === 'lemonade') {
				this.add('c|+Lemonade|Pasta');
			}
			if (name === 'level51') {
				this.add('c|@Level 51|u_u!');
			}
			if (name === 'lj') {
				this.add('c|%LJDarkrai|.Blast');
			}
			if (name === 'lyto') {
				this.add('c|@Lyto|' + ['Unacceptable!', 'Mrgrgrgrgr...'][this.random(2)]);
			}
			if (name === 'macle') {
				this.add("c|+macle|Follow the Frog Blog - https://gonefroggin.wordpress.com/");
			}
			if (name === 'manu11') {
				this.add("c|@manu 11|so much hax, why do I even try");
			}
			if (name === 'marshmallon') {
				this.add("c|%Marshmallon|Shoutouts to sombolo and Rory Mercury ... for this trash set -_-");
			}
			if (name === 'mattl') {
				this.add('c|+MattL|Forgive me. I feel it again... the call from the light.');
			}
			if (name === 'mcmeghan') {
				this.add("c|&McMeghan|Out-odded");
			}
			if (name === 'megazard') {
				this.add('c|+Megazard|Old dog');
			}
			if (name === 'mizuhime') {
				this.add('c|+Mizuhime|I got Gimped.');
			}
			if (name === 'nv') {
				this.add('c|+nv|Too cute for this game ;~;');
			}
			if (name === 'omegaxis') {
				this.add('c|+Omega-Xis|bull shit bull sHit thats ✖️ some bullshit rightth ere right✖️there ✖️✖️if i do ƽaү so my selｆ ‼️ i say so ‼️ thats what im talking about right there right there (chorus: ʳᶦᵍʰᵗ ᵗʰᵉʳᵉ) mMMMMᎷМ‼️ HO0ОଠＯOOＯOОଠଠOoooᵒᵒᵒᵒᵒᵒᵒᵒᵒ ‼️ Bull shit');
			}
			if (name === 'orday') {
				this.add('c|%Orda-Y|❄_❄');
			}
			if (name === 'overneat') {
				this.add('c|+Overneat|Ugh! I failed you Iya-sama');
			}
			if (name === 'paradise') {
				this.add('c|%Paradise~|RIP THE DREAM');
			}
			if (name === 'pikachuun') {
				sentences = ['press f to pay respects ;_;7', 'this wouldn\'t have happened in my version', 'wait we were battling?'];
				this.add('c|+Pikachuun|' + sentences[this.random(3)]);
			}
			if (name === 'pluviometer') {
				this.add('c|+pluviometer|GP 2/2');
			}
			if (name === 'qtrx') {
				sentences = ['Keyboard not found; press **Ctrl + W** to continue...', 'hfowurfbiEU;DHBRFEr92he', 'At least my name ain\'t asgdf...'];
				this.add('c|@qtrx|' + sentences[this.random(3)]);
			}
			if (name === 'quitequiet') {
				this.add('c|@Quite Quiet|Well, I tried at least.');
			}
			if (name === 'raseri') {
				this.add('c|&Raseri|you killed a mush :(');
			}
			if (name === 'raven') {
				this.add('c|&Raven|I failed the challenge, and for that, I must lose a life. At least I had one to lose in the first place, nerd.');
			}
			if (name === 'rekeri') {
				this.add('c|@rekeri|lucky af :[');
			}
			if (name === 'rssp1') {
				this.add('c|+rssp1|Witness the power of the almighty Rufflet!');
			}
			if (name === 'rosiethevenusaur') {
				this.add('c|@RosieTheVenusaur|' + ['SD SKARM SHALL LIVE AGAIN!!!', 'Not my WiFi!'][this.random(2)]);
			}
			if (name === 'sailorcosmos') {
				this.add("c|+SailorCosmos|Cosmos Gorgeous Retreat!");
			}
			if (name === 'scotteh') {
				this.add('c|&Scotteh|▄███████▄.▲.▲.▲.▲.▲.▲');
				this.add('c|&Scotteh|█████████████████████▀▀');
			}
			if (name === 'scpinion') {
				this.add("c|@scpinion|guys, I don't even know how to pronounce scpinion");
			}
			if (name === 'scythernoswiping') {
				this.add('c|%Scyther NO Swiping|Aww man!');
			}
			if (name === 'shrang') {
				this.add('c|@shrang|FUCKING 2 YO KID');
			}
			if (name === 'sigilyph') {
				this.add('c|@Sigilyph|FROM THE BACK FROM THE BACK FROM THE BACK FROM THE BACK **ANDD**');
			}
			if (name === 'sirdonovan') {
				this.add('-message', 'RIP sirDonovan');
			}
			if (name === 'skitty') {
				this.add('c|@Skitty|!learn skitty, roleplay');
				this.add('raw|<div class="infobox">In Gen 6, Skitty <span class="message-learn-cannotlearn">can\'t</span> learn Role Play</div>');
			}
			if (name === 'solarisfox') {
				this.add('c|%SolarisFox|So long, and thanks for all the fish.');
			}
			if (name === 'sonired') {
				this.add('c|+Sonired|sigh lucky players.');
			}
			if (name === 'sparktrain') {
				this.add('c|+sparktrain|nice');
			}
			if (name === 'spy') {
				sentences = ['lolhax', 'crit mattered', 'bruh cum @ meh', '>thinking Pokemon takes any skill'];
				this.add('c|+Spy|' + sentences[this.random(4)]);
			}
			if (name === 'snobalt') {
				this.add('c|+Snobalt|Blasphemy!');
			}
			if (name === 'snowy') {
				this.add('c|+Snowy|i never understood this i always hear them be like "yo whats up monica" "u tryna blaze monica"');
			}
			if (name === 'spacebass') {
				this.add('c|@SpaceBass|And the tales of whales and woe off his liquored toungue will flow, the light will soft white twinkle off the cataracts in his eye');
				this.add("c|@SpaceBass|So if by chance you're cornered near the bathroom, or he blocks you sprawled in his aisle seat");
				this.add("c|@SpaceBass|Embrace the chance to hear some tales of greatness, 'cause he's the most interesting ball of toxins you're ever apt to meet");
			}
			if (name === 'specsmegabeedrill') {
				this.add('c|+SpecsMegaBeedrill|Tryhard.');
			}
			if (name === 'starmei') {
				this.add('c|+Starmei|//message AM, must be nice being this lucky');
			}
			if (name === 'starry') {
				this.add('c|%starry|o-oh');
			}
			if (name === 'steamroll') {
				this.add('c|@Steamroll|Not my problem anymore!');
			}
			if (name === 'sunfished') {
				this.add('c|+Sunfished|*raptor screeches*');
			}
			if (name === 'sweep') {
				this.add('c|&Sweep|You offended :C');
			}
			if (name === 'talkingtree') {
				this.add('c|+talkingtree|I am Groot u_u');
			}
			if (name === 'temporaryanonymous') {
				sentences = [';_;7', 'This kills the tempo', 'I\'m kill. rip.', 'S-senpai! Y-you\'re being too rough! >.<;;;;;;;;;;;;;;;;;', 'A-at least you checked my dubs right?', 'B-but that\'s impossible! This can\'t be! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHGH'];
				this.add('c|@Temporaryanonymous|' + sentences[this.random(6)]);
			}
			if (name === 'teremiare') {
				this.add('c|%Teremiare|sigh...');
			}
			if (name === 'theimmortal') {
				this.add('c|~The Immortal|Oh how wrong we were to think immortality meant never dying.');
			}
			if (name === 'tone114') {
				this.add('c|+TONE114|I don\'t have to take this. I\'m going for a walk.');
			}
			if (name === 'trickster') {
				this.add('c|@Trickster|UPLOADING VIRUS.EXE \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 99% COMPLETE');
			}
			if (name === 'unfixable') {
				this.add('c|+unfixable|i may be dead but my eyebrows are better than yours will ever be');
			}
			if (name === 'urkerab') {
				this.add('l|urkerab');
			}
			if (name === 'uselesstrainer') {
				sentences = ['TIME TO SET UP', 'One day I\'ll become a beautiful butterfly'];
				this.add('c|@useless trainer|' + sentences[this.random(2)]);
			}
			if (name === 'vapo') {
				this.add('c|%Vapo|( ; _> ;)');
			}
			if (name === 'vexeniv') {
				this.add('c|+Vexen IV|brb burning my dread');
			}
			if (name === 'winry') {
				this.add('c|@Winry|I AM NOT A WEEB');
			}
			if (name === 'xfix') {
				const foe = pokemon.side.foe.active[0];
				if (foe.name === 'xfix') {
					this.add("c|+xfix|(I won. I lost. I... huh... ~~can somebody tell me what actually happened?~~)");
				} else if (foe.ability === 'magicbounce') {
					this.add('c|+xfix|(How do mirrors work... oh right, when you use a mirror, your opponent has a mirror as well... or something, ~~that\'s how you "balance" this game~~)');
				} else {
					this.add('c|+xfix|~~That must have been a glitch. Hackers.~~');
				}
			}
			if (name === 'xjoelituh') {
				this.add("c|+xJoelituh|THAT FOR SURE MATTERED. Blame Nayuki. I'm going to play CSGO then.");
			}
			if (name === 'xshiba') {
				this.add("c|+xShiba|Lol that feeling when you just win but get haxed..");
			}
			if (name === 'zarel') {
				this.add('c|~Zarel|your mom');
				// Followed by the usual '~Zarel fainted'.
				this.add('-message', '~Zarel used your mom!');
			}
			if (name === 'zebraiken') {
				if (pokemon.phraseIndex === 2) {
					this.add('c|&Zebraiken|bzzt u_u');
				} else if (pokemon.phraseIndex === 1) {
					this.add('c|&Zebraiken|bzzt ._.');
				} else {
					// Default faint.
					this.add('c|&Zebraiken|bzzt x_x');
				}
			}
			if (name === 'zeroluxgiven') {
				this.add('c|%Zero Lux Given|I\'ve been beaten, what a shock!');
			}
			if (name === 'zodiax') {
				this.add('c|%Zodiax|We need to go full out again soon...');
			}
		},
		// Special switch-out events for some mons.
		onSwitchOut: function (pokemon) {
			let name = toId(pokemon.name);

			if (!pokemon.illusion) {
				if (name === 'hippopotas') {
					this.add('-message', 'The sandstorm subsided.');
				}
			}

			// Transform
			if (pokemon.originalName) pokemon.name = pokemon.originalName;
		},
		onModifyPokemon: function (pokemon) {
			let name = toId(pokemon.name);
			// Enforce choice item locking on custom moves.
			// qtrx only has one move anyway.
			if (name !== 'qtrx') {
				let moves = pokemon.moveset;
				if (pokemon.getItem().isChoice && pokemon.lastMove === moves[3].id) {
					for (let i = 0; i < 3; i++) {
						if (!moves[i].disabled) {
							pokemon.disableMove(moves[i].id, false);
							moves[i].disabled = true;
						}
					}
				}
			}
		},
		// Specific residual events for custom moves.
		// This allows the format to have kind of custom side effects and volatiles.
		onResidual: function (battle) {
			// Deal with swapping from qtrx's mega signature move.
			let swapmon1, swapmon2;
			let swapped = false;
			for (let i = 1; i < 6 && !swapped; i++) {
				swapmon1 = battle.sides[0].pokemon[i];
				if (swapmon1.swapping && swapmon1.hp > 0) {
					swapmon1.swapping = false;
					for (let j = 1; j < 6; j++) {
						swapmon2 = battle.sides[1].pokemon[j];
						if (swapmon2.swapping && swapmon2.hp > 0) {
							swapmon2.swapping = false;

							this.add('message', "Link standby... Please wait.");
							swapmon1.side = battle.sides[1];
							swapmon1.fullname = swapmon1.side.id + ': ' + swapmon1.name;
							swapmon1.id = swapmon1.fullname;
							swapmon2.side = battle.sides[0];
							swapmon2.fullname = swapmon2.side.id + ': ' + swapmon2.name;
							swapmon2.id = swapmon2.fullname;
							let oldpos = swapmon1.position;
							swapmon1.position = swapmon2.position;
							swapmon2.position = oldpos;
							battle.sides[0].pokemon[i] = swapmon2;
							battle.sides[1].pokemon[j] = swapmon1;

							this.add("c|\u2605" + swapmon1.side.name + "|Bye-bye, " + swapmon2.name + "!");
							this.add("c|\u2605" + swapmon2.side.name + "|Bye-bye, " + swapmon1.name + "!");
							if (swapmon1.side.active[0].hp && swapmon2.side.active[0].hp) {
								this.add('-anim', swapmon1.side.active, "Healing Wish", swapmon1.side.active);
								this.add('-anim', swapmon2.side.active, "Aura Sphere", swapmon2.side.active);
								this.add('message', swapmon2.side.name + " received " + swapmon2.name + "! Take good care of " + swapmon2.name + "!");
								this.add('-anim', swapmon2.side.active, "Healing Wish", swapmon2.side.active);
								this.add('-anim', swapmon1.side.active, "Aura Sphere", swapmon1.side.active);
								this.add('message', swapmon1.side.name + " received " + swapmon1.name + "! Take good care of " + swapmon1.name + "!");
							} else {
								this.add('message', swapmon2.side.name + " received " + swapmon2.name + "! Take good care of " + swapmon2.name + "!");
								this.add('message', swapmon1.side.name + " received " + swapmon1.name + "! Take good care of " + swapmon1.name + "!");
							}
							swapped = true;
							break;
						}
					}
				}
			}
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
		name: "CAP Doubles",
		section: "Other Metagames",

		gameType: 'doubles',
		ruleset: ['Pokemon', 'Standard Doubles', 'Team Preview'],
		banlist: ['Allow CAP', 'Arceus', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon', 'Ho-Oh', 'Kyogre', 'Kyurem-White', 'Lugia',
			'Mewtwo', 'Palkia', 'Rayquaza', 'Reshiram', 'Salamence-Mega', 'Salamencite', 'Shaymin-Sky', 'Xerneas', 'Yveltal', 'Zekrom',
			'Soul Dew', 'Dark Void', 'Gravity ++ Grass Whistle', 'Gravity ++ Hypnosis', 'Gravity ++ Lovely Kiss', 'Gravity ++ Sing', 'Gravity ++ Sleep Powder', 'Gravity ++ Spore',
		],
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
			this.add('raw|<div class="infobox"><center><b>Origin Super Staff Bros Credits:</b></center><b>%Emg E4 Volco</b> - Concepts, Programming, Organization, Testing, Hosting a test server.<br /><b>@AuraStormLucario</b> - Concepts, Programming, Organization, Testing.<br /><b>~sparkychild</b> - Programming, Organization, Testing, Pokemon Descriptions.<br /><b>%hayleysworld, Omega Chime</b> - Pokemon Descriptions, Testing.<br /><b>@PaulCentury, %Selena, %Starfox:3, +Piscean</b> - Testing.<br /><b>Other Origin Staff Members</b> - Participation and support in helping to complete this project.');
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

		// This allows for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'arkenciel' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('abnegate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'skynightfall' && pokemon.getAbility().id === 'moldbreaker') {
					pokemon.setAbility('cursedaura');
				}
				if (name === 'mightysciz' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('dragonsfire');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'alphaninja' && pokemon.getAbility().id === 'shellarmor') {
					pokemon.setAbility('megapoison');
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
				if (name === 'impfallenblood' && pokemon.getAbility().id === 'lightningrod') {
					pokemon.setAbility('pirate');
					this.add('-ability', pokemon, pokemon.ability);
					pokemon.types = ["Grass", "Flying"];
					this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				}
			}
		},

		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (pokemon.getAbility().id === 'wonderguard') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (name === 'masterfloat' && !pokemon.illusion) {
				this.boost({atk:3}, pokemon, pokemon, 'Magic Immunity');
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			if (pokemon.template.isMega) {
				if (name === 'arkenciel' && pokemon.getAbility().id !== 'abnegate') {
					pokemon.setAbility('abnegate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'skynightfall' && pokemon.getAbility().id !== 'cursedaura') {
					// pokemon.setAbility('cursedaura');
				}
				if (name === 'mightysciz' && pokemon.getAbility().id !== 'dragonsfire') {
					pokemon.setAbility('dragonsfire');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'alphaninja' && pokemon.getAbility().id !== 'megapoison') {
					pokemon.setAbility('megapoison');
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
				if (name === 'impfallenblood' && pokemon.getAbility().id !== 'pirate') {
					pokemon.setAbility('pirate');
					this.add('-ability', pokemon, pokemon.ability);
					pokemon.types = ["Grass", "Flying"];
					this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				}
			} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'hayleysworld' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fairy');
				pokemon.types = ["Water", "Fairy"];
			}
			if (name === 'paulcentury' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water');
				pokemon.types = ["Water"];
			}
			if (name === 'selena' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ice');
				pokemon.types = ["Water", "Ice"];
			}
			if (name === 'starfox3' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Psychic');
				pokemon.types = ["Bug", "Psychic"];
			}
			if (name === 'chronologically' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fighting');
				pokemon.types = ["Fire", "Fighting"];
			}
			if (name === 'piscean' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.types = ["Normal", "Ghost"];
			}
			if (name === 'omegachim' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Psychic');
				pokemon.types = ["Fairy", "Psychic"];
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
				this.add('c|~sparkychild|D-do you think i\'m cute? :3');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Mm, hello.');
			}
			if (name === 'mightysciz') {
				this.add('c|&Mighty Sciz|Time for moderation to take its course and slay all the misbehaving Dragons!');
			}
			/* no quote
			if (name === 'skynightfall') {
				this.add('c|&Sky Might Fall|');
			} */

			// Mods
			if (name === 'alphaninja') {
				this.add('c|@Alpha Ninja|sup nigga');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|I\'ll slap you with a piano!');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Stars, hide your fires; Let not light see my black and deep desires.');
			}
			if (name === 'hayleysworld') {
				this.add('c|@hayleysworld|The Queen of the Sea has arrived.');
			}
			if (name === 'lcehvy12') {
				this.add('c|@L Chevy 12|I have swooped in to fuck up your day today feelsok');
			}
			if (name === 'paulcentury') {
				this.add("raw|<div class='chat'><small>@</small><button name='parseCommand' value='/user Paul Century' style='background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer'><b><font color='#5F4FC1'>Paul Century:</font></b></button><em class='mine'><img src=\"http://i.imgur.com/sVgkUF1.png?1\" title=\"feelssammich\" height=\"50\" width=\"50\" /></em></div>");
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|C\'mon spammers, I\'m watching.');
			}

			// Drivers
			if (name === 'alliancentg') {
				this.add('c|%Alliance NTG|Welcome to the Hax Side');
			}
			if (name === 'chiefsokka') {
				this.add('c|%Chief Sokka|Sokka Reporting for duty Kappa!');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emge4volco') {
				this.add('c|%Emg E4 Volco|I\'m gonna break you... Like a Kit-Kat Bar - TFS Goku');
			}
			if (name === 'irraquated') {
				this.add('c|%Irraquated|Lol you look p weak from over on the winners side. xaa');
			}
			if (name === 'isandman') {
				this.add('c|%iSandman|ENTER SANDMAN');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|hi im birb <:');
			}
			if (name === 'selena') {
				this.add('c|%Selena|Lucina realized her own secret. When she told me her secret and her deepest fears, I knew we could never be apart.');
			}
			if (name === 'starfox3') {
				this.add('c|%StarFox :3|The Booty Master has Arrived');
			}

			// Voices
			if (name === 'casty') {
				this.add('c|+casty|I know you were hoping for anything but me.');
			}
			if (name === 'chronologically') {
				this.add("raw|<div class='chat'><small>+</small><button name='parseCommand' value='/user Chronologically' style='background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer'><b><font color='#B64E5A'>Chronologically:</font></b></button><em class='mine'><img src=\"http://i.imgur.com/zRSUw2n.gif\" title=\"feelscx\" height=\"50\" width=\"50\" /></em></div>");
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|Ayyyyyyy lmao');
			}
			if (name === "masterbui") {
				this.add("c|+Master Bui|Bui~");
			}
			if (name === 'otami') {
				this.add('c|+Otami|hi fam! how are you? :3c');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|I am a bad omen ヽ(´・ω・`)ﾉ');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|Ey Guys, Try and Fite the Sweg');
			}

			// Others
			if (name === 'gnarlycommie') {
				this.add('c|Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|Imp Fallen Blood|I won\’t forgive anyone who dare to take our flag!');
			}
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|Welcome to Origin Super Smash Bros, may I show you the door?');
			}
			/* no quote
			if (name === 'nineage') {
				this.add('c|nineage|');
			}*/
			if (name === 'omegachim') {
				this.add('c|Omega Chimе|Listen to the sound of the wind, it\'s calling you. Warning you.');
			}
			if (name === 'omeganivans') {
				this.add('c|Omega Nivans|Rabinov, reporting for duty!');
			}
			/* no quote
			if (name === 'originserver') {
				this.add('c|originserver|');
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
				this.add('c|~Lt. Tesla|Nothing in showdown is certain except Deth and haxes');
			}
			if (name === 'masterfloat') {
				this.add('c|~Master Float|shitzel, fkin hax #blameZarel');
			}
			if (name === 'neosoul') {
				this.add('c|~Neo Soul|Me ded mon!');
				this.add('c|~Neo Soul|/me shakes dreadlocks');
			}
			if (name === 'sparkychild' && !pokemon.selfFaint) {
				this.add('c|~sparkychild|My fur is ruined....');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Erica*07 wishes you all a good night.');
			}
			if (name === 'mightysciz') {
				this.add('c|&Mighty Sciz|I failed my part as a Dragon Slayer...');
			}
			/* no quote
			if (name === 'skynightfall') {
				this.add('c|&Sky Might Fall|');
			} */

			// Mods
			if (name === 'alphaninja') {
				this.add('c|@Alpha Ninja|fuck this shit nigga');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|U know, this is all ' + pokemon.side.foe.name + '\'s fault');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Normal people have no idea how beautiful the darkness is...');
			}
			if (name === 'hayleysworld') {
				this.add('c|@hayleysworld|I will stop being afk to get revenge later.');
			}
			if (name === 'lcehvy12') {
				this.add('c|@L Chevy 12|Screw this, you aren\'t worth it.');
			}
			if (name === 'paulcentury') {
				this.add('c|@Paul Century|I\'m out but I\'ll end this with a fuck you but have a nice day');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|For the last time, I don\'t have security issues, ok?  First you kill off sparkyboTTT, then me... IM APPEALING TO ZAREL!');
			}

			// Drivers
			if (name === 'alliancentg') {
				this.add('c|%Alliance NTG|I went too easy :c');
			}
			if (name === 'chiefsokka') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user chiefsokka" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A052D2">Chief Sokka:</font></b></button> Time to dump the responsibility on someone else <em class="mine"><img src="http://i.imgur.com/DsRQCsI.png" title="feelsrg" height="50" width="50" /></em></div>');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emge4volco') {
				this.add('c|%Emg E4 Volco|Dang it my hax... they werent enough');
			}
			if (name === 'irraquated') {
				this.add('c|%Irraquated|Just a prank bro? ...right?');
			}
			if (name === 'isandman') {
				this.add('c|%iSandman|EXIT LIGHT ENTER NIGHT TAKE MY HAND, OFF TO NEVER NEVER LAND');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|fuck this game idk why i even play pokemon');
			}
			if (name === 'selena') {
				this.add('c|%Selena|Say, where\'s our next adventure taking us? The vastness of the horizon is just marvelous...and I get the feeling I\'ve grown a little, too.');
			}
			if (name === 'starfox3') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user Starfox:3" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A72A36">Starfox:3:</font></b></button><em class="mine"><img src="http://i.imgur.com/FPolh5d.jpg" title="feelsemo" height="50" width="50" /></em></div>');
			}

			// Voices
			if (name === 'casty') {
				this.add('c|+casty|thanks for getting me knocked out, now I can go eat pizza pops and ice cream.');
				this.clearWeather();
			}
			if (name === 'chronologically') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user Chronologically" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#B64E5A">Chronologically:</font></b></button><em class="mine"><img src="http://i.imgur.com/lv3GmpM.png" title="FacePalm" height="50" width="50" /></em></div>');
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|I got cleaned');
			}
			if (name === "masterbui") {
				this.add("c|+Master Bui| Gtg now, Hayley's calling >~>");
			}
			if (name === 'otami') {
				this.add('c|+Otami|feelsotami');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|Your memes were stronger than mine... ( ◕ ʖ̯ ◕ )');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|I shall be avenged. Don\'t forget me.');
			}

			// Others
			if (name === 'gnarlycommie') {
				this.add('c|Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|Imp Fallen Blood|Whether you wanna die or not, I don\’t care about whatever you say! Say that kind of thing while you\’re by our sides!');
			}
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|__My ankle!__');
			}
			/* no quote
			if (name === 'nineage') {
				this.add('c|nineage|');
			}*/
			if (name === 'omegachim') {
				this.add('c|Omega Chimе|Oh, how I love the sound of silence.');
			}
			if (name === 'omeganivans') {
				this.add('c|Omega Nivans|HQ this is Piers! We\'re overwhelmed at Point B; Alpha Team, tactical retreat!');
			}
			/* no quote
			if (name === 'originserver') {
				this.add('c|originserver|');
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

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Erica*07 tells you all to take care while she\'s gone.');
			}
			if (name === 'mightysciz') {
				this.add('c|&Mighty Sciz|Well... I will be back and face you again');
			}
			if (name === 'skynightfall') {
				this.add('c|&Sky Might Fall|Do not go gentle into that good night');
			}

			// Mods
			if (name === 'alphaninja') {
				this.add('c|@Alpha Ninja|brb nigga');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|I\'ll be back, skrub');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Without darkness one cannot know light.');
			}
			if (name === 'hayleysworld') {
				this.add('c|@hayleysworld|My bad memes will be back!');
			}
			if (name === 'lcehvy12') {
				this.add('c|%L Chevy 12|I live to Fuck You Up another day!');
			}
			if (name === 'paulcentury') {
				this.add('c|@Paul Century|Fuck this shit im out');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|Restarting...');
			}

			// Drivers
			if (name === 'alliancentg') {
				this.add('c|%Alliance NTG|Gotta Go, Bathroom');
			}
			if (name === 'chiefsokka') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user chiefsokka" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A052D2">Chief Sokka:</font></b></button> Time to dump the responsibility on someone else <em class="mine"><img src="http://i.imgur.com/M0f2zgJ.jpg?1" title="feelstea" height="50" width="50" /></em></div>');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emge4volco') {
				this.add('c|%Emg E4 Volco|Welp look like its time to run away like Sanic');
			}
			if (name === 'irraquated') {
				this.add('c|%Irraquated|Your death awaits you mate.');
			}
			if (name === 'isandman') {
				this.add('c|%iSandman|JOY BANGLA , JOY BANGOBANDHU');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|pls no kill ty)');
			}
			if (name === 'selena') {
				this.add('c|%Selena|Ahh, I love this feeling of freedom! But I almost miss the constant bickering of home...almost.');
			}
			if (name === 'starfox3') {
				this.add('c|%StarFox :3|I\'ll git that booty later');
			}

			// Voices
			if (name === 'casty') {
				this.add('c|+casty|I\'d like to go on record and say this was a bad idea');
				this.clearWeather();
			}
			if (name === 'chronologically') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user Chronologically" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#B64E5A">Chronologically:</font></b></button><em class="mine"><img src="http://i.imgur.com/QAuUW7u.jpg?1" title="feelscri" height="50" width="50" /></em></div>');
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|you can get wet later ;)');
			}
			if (name === "masterbui") {
				this.add("c|+Master Bui|Brbui~!");
			}
			if (name === 'otami') {
				this.add('c|+Otami|brb telling Hayley you are bullying me xoxo');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|I\'ll be back, bitch ੧(❛〜❛✿)੭');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|Ey teammates, Swegtini needs a lil help');
			}

			// Others
			if (name === 'gnarlycommie') {
				this.add('c|Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|Imp Fallen Blood|If strong guys like this are going to appear on our road later, if I don’t get stronger, I won’t be able to protect my nakama.');
			}
			/* no quote
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|');
			}
			if (name === 'nineage') {
				this.add('c|nineage|');
			}*/
			if (name === 'omegachim') {
				this.add('c|Omega Chimе|The sound of the wind... it\'s fading...');
			}
			if (name === 'omeganivans') {
				this.add('c|Omega Nivans|Tactical retreat!');
			}
			/* no quote
			if (name === 'originserver') {
				this.add('c|originserver|');
			} */
		},

		onModifyPokemon: function (pokemon) {
			// let name = toId(pokemon.name);
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
		name: "Origin Super Staff Bros Doubles.",
		section: "Other Metagames",
		gameType: 'doubles',
		mod: 'originstaffbros',
		team: 'randomOriginStaffBros',
		ruleset: ['Pokemon', 'Sleep Clause Mod', 'HP Percentage Mod', 'Cancel Mod'],
		onBegin: function () {
			this.add('message', "3");
			this.add('message', "2");
			this.add('message', "1");
			this.add('message', "GET READY...");
			this.add('message', "GOOOO!!!");
			this.add('raw|<div class="infobox"><center><b>Origin Super Staff Bros Credits:</b></center><b>%Emg E4 Volco</b> - Concepts, Programming, Organization, Testing, Hosting a test server.<br /><b>@AuraStormLucario</b> - Concepts, Programming, Organization, Testing.<br /><b>~sparkychild</b> - Programming, Organization, Testing, Pokemon Descriptions.<br /><b>%hayleysworld, Omega Chime</b> - Pokemon Descriptions, Testing.<br /><b>@PaulCentury, %Selena, %Starfox:3, +Piscean</b> - Testing.<br /><b>Other Origin Staff Members</b> - Participation and support in helping to complete this project.');
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

		// This allows for their changed abilities.
		onUpdate: function (pokemon) {
			let name = toId(pokemon.name);
			if (pokemon.template.isMega) {
				if (name === 'arkenciel' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('abnegate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'skynightfall' && pokemon.getAbility().id === 'moldbreaker') {
					pokemon.setAbility('cursedaura');
				}
				if (name === 'mightysciz' && pokemon.getAbility().id === 'toughclaws') {
					pokemon.setAbility('dragonsfire');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'alphaninja' && pokemon.getAbility().id === 'shellarmor') {
					pokemon.setAbility('megapoison');
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
				if (name === 'impfallenblood' && pokemon.getAbility().id === 'lightningrod') {
					pokemon.setAbility('pirate');
					this.add('-ability', pokemon, pokemon.ability);
					pokemon.types = ["Grass", "Flying"];
					this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				}
			}
		},

		onSwitchInPriority: 1,
		onSwitchIn: function (pokemon) {
			let name = toId(pokemon.illusion ? pokemon.illusion.name : pokemon.name);
			if (pokemon.getAbility().id === 'wonderguard') {
				pokemon.addVolatile('curse', pokemon);
				this.add('-message', pokemon.name + "'s Wonder Guard has cursed it!");
			}
			if (name === 'masterfloat' && !pokemon.illusion) {
				this.boost({atk:3}, pokemon, pokemon, 'Magic Immunity');
			}

			// Add here more hacky stuff for mega abilities.
			// This happens when the mega switches in, as opposed to mega-evolving on the turn.
			if (pokemon.template.isMega) {
				if (name === 'arkenciel' && pokemon.getAbility().id !== 'abnegate') {
					pokemon.setAbility('abnegate');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'skynightfall' && pokemon.getAbility().id !== 'cursedaura') {
					// pokemon.setAbility('cursedaura');
				}
				if (name === 'mightysciz' && pokemon.getAbility().id !== 'dragonsfire') {
					pokemon.setAbility('dragonsfire');
					this.add('-ability', pokemon, pokemon.ability);
				}
				if (name === 'alphaninja' && pokemon.getAbility().id !== 'megapoison') {
					pokemon.setAbility('megapoison');
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
				if (name === 'impfallenblood' && pokemon.getAbility().id !== 'pirate') {
					pokemon.setAbility('pirate');
					this.add('-ability', pokemon, pokemon.ability);
					pokemon.types = ["Grass", "Flying"];
					this.add('-start', pokemon, 'typechange', 'Grass/Flying');
				}
			} else {
				pokemon.canMegaEvo = this.canMegaEvo(pokemon); // Bypass one mega limit.
			}

			// Add here special typings, done for flavour mainly.
			if (name === 'hayleysworld' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Fairy');
				pokemon.types = ["Water", "Fairy"];
			}
			if (name === 'paulcentury' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water');
				pokemon.types = ["Water"];
			}
			if (name === 'selena' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Water/Ice');
				pokemon.types = ["Water", "Ice"];
			}
			if (name === 'starfox3' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Bug/Psychic');
				pokemon.types = ["Bug", "Psychic"];
			}
			if (name === 'chronologically' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fire/Fighting');
				pokemon.types = ["Fire", "Fighting"];
			}
			if (name === 'piscean' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Normal/Ghost');
				pokemon.types = ["Normal", "Ghost"];
			}
			if (name === 'omegachim' && !pokemon.illusion) {
				this.add('-start', pokemon, 'typechange', 'Fairy/Psychic');
				pokemon.types = ["Fairy", "Psychic"];
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
				this.add('c|~sparkychild|D-do you think i\'m cute? :3');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Mm, hello.');
			}
			if (name === 'mightysciz') {
				this.add('c|&Mighty Sciz|Time for moderation to take its course and slay all the misbehaving Dragons!');
			}
			/* no quote
			if (name === 'skynightfall') {
				this.add('c|&Sky Might Fall|');
			} */

			// Mods
			if (name === 'alphaninja') {
				this.add('c|@Alpha Ninja|sup nigga');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|I\'ll slap you with a piano!');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Stars, hide your fires; Let not light see my black and deep desires.');
			}
			if (name === 'hayleysworld') {
				this.add('c|@hayleysworld|The Queen of the Sea has arrived.');
			}
			if (name === 'lcehvy12') {
				this.add('c|@L Chevy 12|I have swooped in to fuck up your day today feelsok');
			}
			if (name === 'paulcentury') {
				this.add("raw|<div class='chat'><small>@</small><button name='parseCommand' value='/user Paul Century' style='background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer'><b><font color='#5F4FC1'>Paul Century:</font></b></button><em class='mine'><img src=\"http://i.imgur.com/sVgkUF1.png?1\" title=\"feelssammich\" height=\"50\" width=\"50\" /></em></div>");
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|C\'mon spammers, I\'m watching.');
			}

			// Drivers
			if (name === 'alliancentg') {
				this.add('c|%Alliance NTG|Welcome to the Hax Side');
			}
			if (name === 'chiefsokka') {
				this.add('c|%Chief Sokka|Sokka Reporting for duty Kappa!');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emge4volco') {
				this.add('c|%Emg E4 Volco|I\'m gonna break you... Like a Kit-Kat Bar - TFS Goku');
			}
			if (name === 'irraquated') {
				this.add('c|%Irraquated|Lol you look p weak from over on the winners side. xaa');
			}
			if (name === 'isandman') {
				this.add('c|%iSandman|ENTER SANDMAN');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|hi im birb <:');
			}
			if (name === 'selena') {
				this.add('c|%Selena|Lucina realized her own secret. When she told me her secret and her deepest fears, I knew we could never be apart.');
			}
			if (name === 'starfox3') {
				this.add('c|%StarFox :3|The Booty Master has Arrived');
			}

			// Voices
			if (name === 'casty') {
				this.add('c|+casty|I know you were hoping for anything but me.');
			}
			if (name === 'chronologically') {
				this.add("raw|<div class='chat'><small>+</small><button name='parseCommand' value='/user Chronologically' style='background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer'><b><font color='#B64E5A'>Chronologically:</font></b></button><em class='mine'><img src=\"http://i.imgur.com/zRSUw2n.gif\" title=\"feelscx\" height=\"50\" width=\"50\" /></em></div>");
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|Ayyyyyyy lmao');
			}
			if (name === "masterbui") {
				this.add("c|+Master Bui|Bui~");
			}
			if (name === 'otami') {
				this.add('c|+Otami|hi fam! how are you? :3c');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|I am a bad omen ヽ(´・ω・`)ﾉ');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|Ey Guys, Try and Fite the Sweg');
			}

			// Others
			if (name === 'gnarlycommie') {
				this.add('c|Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|Imp Fallen Blood|I won\’t forgive anyone who dare to take our flag!');
			}
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|Welcome to Origin Super Smash Bros, may I show you the door?');
			}
			/* no quote
			if (name === 'nineage') {
				this.add('c|nineage|');
			}*/
			if (name === 'omeganivans') {
				this.add('c|Omega Nivans|Rabinov, reporting for duty!');
			}
			if (name === 'omegachim') {
				this.add('c|Omega Chimе|Listen to the sound of the wind, it\'s calling you. Warning you.');
			}
			/* no quote
			if (name === 'originserver') {
				this.add('c|originserver|');
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
				this.add('c|~Lt. Tesla|Nothing in showdown is certain except Deth and haxes');
			}
			if (name === 'masterfloat') {
				this.add('c|~Master Float|shitzel, fkin hax #blameZarel');
			}
			if (name === 'neosoul') {
				this.add('c|~Neo Soul|Me ded mon!');
				this.add('c|~Neo Soul|/me shakes dreadlocks');
			}
			if (name === 'sparkychild' && !pokemon.selfFaint) {
				this.add('c|~sparkychild|My fur is ruined....');
			}

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Erica*07 wishes you all a good night.');
			}
			if (name === 'mightysciz') {
				this.add('c|&Mighty Sciz|I failed my part as a Dragon Slayer...');
			}
			/* no quote
			if (name === 'skynightfall') {
				this.add('c|&Sky Might Fall|');
			} */

			// Mods
			if (name === 'alphaninja') {
				this.add('c|@Alpha Ninja|fuck this shit nigga');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|U know, this is all ' + pokemon.side.foe.name + '\'s fault');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Normal people have no idea how beautiful the darkness is...');
			}
			if (name === 'hayleysworld') {
				this.add('c|@hayleysworld|I will stop being afk to get revenge later.');
			}
			if (name === 'lcehvy12') {
				this.add('c|@L Chevy 12|Screw this, you aren\'t worth it.');
			}
			if (name === 'paulcentury') {
				this.add('c|@Paul Century|I\'m out but I\'ll end this with a fuck you but have a nice day');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|For the last time, I don\'t have security issues, ok?  First you kill off sparkyboTTT, then me... IM APPEALING TO ZAREL!');
			}

			// Drivers
			if (name === 'alliancentg') {
				this.add('c|%Alliance NTG|I went too easy :c');
			}
			if (name === 'chiefsokka') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user chiefsokka" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A052D2">Chief Sokka:</font></b></button> Time to dump the responsibility on someone else <em class="mine"><img src="http://i.imgur.com/DsRQCsI.png" title="feelsrg" height="50" width="50" /></em></div>');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emge4volco') {
				this.add('c|%Emg E4 Volco|Dang it my hax... they werent enough');
			}
			if (name === 'irraquated') {
				this.add('c|%Irraquated|Just a prank bro? ...right?');
			}
			if (name === 'isandman') {
				this.add('c|%iSandman|EXIT LIGHT ENTER NIGHT TAKE MY HAND, OFF TO NEVER NEVER LAND');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|fuck this game idk why i even play pokemon');
			}
			if (name === 'selena') {
				this.add('c|%Selena|Say, where\'s our next adventure taking us? The vastness of the horizon is just marvelous...and I get the feeling I\'ve grown a little, too.');
			}
			if (name === 'starfox3') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user Starfox:3" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A72A36">Starfox:3:</font></b></button><em class="mine"><img src="http://i.imgur.com/FPolh5d.jpg" title="feelsemo" height="50" width="50" /></em></div>');
			}

			// Voices
			if (name === 'casty') {
				this.add('c|+casty|thanks for getting me knocked out, now I can go eat pizza pops and ice cream.');
				this.clearWeather();
			}
			if (name === 'chronologically') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user Chronologically" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#B64E5A">Chronologically:</font></b></button><em class="mine"><img src="http://i.imgur.com/lv3GmpM.png" title="FacePalm" height="50" width="50" /></em></div>');
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|I got cleaned');
			}
			if (name === "masterbui") {
				this.add("c|+Master Bui| Gtg now, Hayley's calling >~>");
			}
			if (name === 'otami') {
				this.add('c|+Otami|feelsotami');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|Your memes were stronger than mine... ( ◕ ʖ̯ ◕ )');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|I shall be avenged. Don\'t forget me.');
			}

			// Others
			if (name === 'gnarlycommie') {
				this.add('c|Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|Imp Fallen Blood|Whether you wanna die or not, I don\’t care about whatever you say! Say that kind of thing while you\’re by our sides!');
			}
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|__My ankle!__');
			}
			/* no quote
			if (name === 'nineage') {
				this.add('c|nineage|');
			}*/
			if (name === 'omegachim') {
				this.add('c|Omega Chimе|Oh, how I love the sound of silence.');
			}
			if (name === 'omeganivans') {
				this.add('c|Omega Nivans|HQ this is Piers! We\'re overwhelmed at Point B; Alpha Team, tactical retreat!');
			}
			/* no quote
			if (name === 'originserver') {
				this.add('c|originserver|');
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

			// Leaders
			if (name === 'erica07') {
				this.add('c|&Erica*07|Erica*07 tells you all to take care while she\'s gone.');
			}
			if (name === 'mightysciz') {
				this.add('c|&Mighty Sciz|Well... I will be back and face you again');
			}
			if (name === 'skynightfall') {
				this.add('c|&Sky Might Fall|Do not go gentle into that good night');
			}

			// Mods
			if (name === 'alphaninja') {
				this.add('c|@Alpha Ninja|brb nigga');
			}
			if (name === 'aurastormlucario') {
				this.add('c|@AuraStormLucario|I\'ll be back, skrub');
			}
			if (name === 'niisama') {
				this.add('c|@Nii Sama|Without darkness one cannot know light.');
			}
			if (name === 'hayleysworld') {
				this.add('c|@hayleysworld|My bad memes will be back!');
			}
			if (name === 'lcehvy12') {
				this.add('c|%L Chevy 12|I live to Fuck You Up another day!');
			}
			if (name === 'paulcentury') {
				this.add('c|@Paul Century|Fuck this shit im out');
			}
			if (name === 'safetyshark') {
				this.add('c|@Safety Shark|Restarting...');
			}

			// Drivers
			if (name === 'alliancentg') {
				this.add('c|%Alliance NTG|Gotta Go, Bathroom');
			}
			if (name === 'chiefsokka') {
				this.add('raw|<div class="chat"><small>%</small><button name="parseCommand" value="/user chiefsokka" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#A052D2">Chief Sokka:</font></b></button> Time to dump the responsibility on someone else <em class="mine"><img src="http://i.imgur.com/M0f2zgJ.jpg?1" title="feelstea" height="50" width="50" /></em></div>');
			}
			if (name === 'creaturephil') {
				this.add('c|%CreaturePhil|Check out http://elloworld.noip.me:8001/ or else feelsgn!');
			}
			if (name === 'emge4volco') {
				this.add('c|%Emg E4 Volco|Welp look like its time to run away like Sanic');
			}
			if (name === 'irraquated') {
				this.add('c|%Irraquated|Your death awaits you mate.');
			}
			if (name === 'isandman') {
				this.add('c|%iSandman|JOY BANGLA , JOY BANGOBANDHU');
			}
			if (name === 'phoenixgryphon') {
				this.add('c|%Phoenix Gryphon|pls no kill ty)');
			}
			if (name === 'selena') {
				this.add('c|%Selena|Ahh, I love this feeling of freedom! But I almost miss the constant bickering of home...almost.');
			}
			if (name === 'starfox3') {
				this.add('c|%StarFox :3|I\'ll git that booty later');
			}

			// Voices
			if (name === 'casty') {
				this.add('c|+casty|I\'d like to go on record and say this was a bad idea');
				this.clearWeather();
			}
			if (name === 'chronologically') {
				this.add('raw|<div class="chat"><small>+</small><button name="parseCommand" value="/user Chronologically" style="background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer"><b><font color="#B64E5A">Chronologically:</font></b></button><em class="mine"><img src="http://i.imgur.com/QAuUW7u.jpg?1" title="feelscri" height="50" width="50" /></em></div>');
			}
			if (name === 'crystalgray') {
				this.add('c|+Crystal Gray|you can get wet later ;)');
			}
			if (name === "masterbui") {
				this.add("c|+Master Bui|Brbui~!");
			}
			if (name === 'otami') {
				this.add('c|+Otami|brb telling Hayley you are bullying me xoxo');
			}
			if (name === 'piscean') {
				this.add('c|+Piscean|I\'ll be back, bitch ੧(❛〜❛✿)੭');
			}
			if (name === 'sotahigurashi') {
				this.add('c|+Sota Higurashi|Ey teammates, Swegtini needs a lil help');
			}

			// Others
			if (name === 'gnarlycommie') {
				this.add('c|Gnarly Commie|ok');
			}
			if (name === 'impfallenblood') {
				this.add('c|Imp Fallen Blood|If strong guys like this are going to appear on our road later, if I don’t get stronger, I won’t be able to protect my nakama.');
			}
			/* no quote
			if (name === 'mrcgtnathan') {
				this.add('c|Mr. CGTNathan|');
			}
			if (name === 'nineage') {
				this.add('c|nineage|');
			}*/
			if (name === 'omegachim') {
				this.add('c|Omega Chimе|The sound of the wind... it\'s fading...');
			}
			if (name === 'omeganivans') {
				this.add('c|Omega Nivans|Tactical retreat!');
			}
			/* no quote
			if (name === 'originserver') {
				this.add('c|originserver|');
			} */
		},

		onModifyPokemon: function (pokemon) {
			// let name = toId(pokemon.name);
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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3566051/\">BH Suspects and Bans</a>",
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3547823/\">BH Viability Ranking</a>",
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
			"&bullet; <a href=\"https://www.smogon.com/forums/threads/3551063/\">AAA Viability Ranking</a>",
		],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Ability Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
		banlist: ['Ignore Illegal Abilities',
			'Arceus', 'Archeops', 'Bisharp', 'Darkrai', 'Deoxys', 'Deoxys-Attack', 'Dialga', 'Giratina', 'Giratina-Origin', 'Groudon',
			'Ho-Oh', 'Hoopa-Unbound', 'Keldeo', 'Kyogre', 'Kyurem-Black', 'Kyurem-White', 'Lugia', 'Mamoswine', 'Mewtwo', 'Palkia', 'Rayquaza',
			'Regigigas', 'Reshiram', 'Shaymin-Sky', 'Shedinja', 'Slaking', 'Smeargle', 'Terrakion', 'Weavile', 'Xerneas', 'Yveltal', 'Zekrom',
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
		banlist: ['Kangaskhanite', 'Perish Song'],
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
		banlist: ['Smeargle', 'Gengarite', 'Kangaskhanite', 'Mawilite', 'Medichamite', 'Sableye + Prankster',
			'DeepSeaScale', 'DeepSeaTooth', 'Eviolite', 'Light Ball', 'Soul Dew', 'Thick Club', 'Arena Trap', 'Huge Power', 'Pure Power', 'Shadow Tag', 'Chatter',
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
		ruleset: ['Pokemon', 'Standard', 'Evasion Abilities Clause', 'Baton Pass Clause', 'Swagger Clause', 'Team Preview'],
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
		banlist: ['Allow Tradeback', 'Uber', 'Unreleased', 'Illegal',
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
	{
		name: "Blindmons",
		desc: ["&bullet; <a href=\"https://www.smogon.com/forums/threads/3537013/\">Blindmons</a>"],
		section: "Other Metagames",

		ruleset: ['Pokemon', 'Standard', 'Swagger Clause', 'Baton Pass Clause'],
		banlist: ['Uber', 'Shadow Tag', 'Arena Trap', 'Flower Gift', 'Forecast', 'Zen Mode', 'Illusion', 'Imposter', 'Soul Dew', 'Transform', 'Relic Song'],

		onBegin: function () {
			for (let i = 0; i < this.p1.pokemon.length; i++) {
				this.p1.pokemon[i].canMegaEvo = false;
			}
			for (let i = 0; i < this.p2.pokemon.length; i++) {
				this.p2.pokemon[i].canMegaEvo = false;
			}
		},
		onChangeSet: function (set) {
			if (!this.nickorder) this.nickorder = 1;
			set.name = 'Battler No.' + this.nickorder;
			this.nickorder++;
		},
		onBeforeSwitchIn: function (pokemon) {
			const illusion = {
				name: "Pokemon " + (pokemon.position + 1),
				template: pokemon.template,
				details: 'Unown' + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : ''),
			};
			illusion.fullname = pokemon.side.id + ': ' + illusion.name;
			pokemon.illusion = illusion;
		},
		onSwitchIn: function (pokemon) {
			let moveprompt = this.getMove(pokemon.moves[0]).name;
			if (pokemon.moveset.length > 1) {
				moveprompt += " and " + this.getMove(pokemon.moves[1]).name;
			}
			this.add('-message', pokemon.side.name + "'s " + (pokemon.illusion.name || "Pokemon") + " knows " + moveprompt + ".");
		},
		onDamage: function (damage, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				target.illusion = null;
			}
		},
		onAfterDamage: function (damage, target) {
			if (!target.hp) {
				target.illusion = null;
				this.add('replace', target, target.getDetails);
			}
		},
	},
];
