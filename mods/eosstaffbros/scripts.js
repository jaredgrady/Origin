'use strict';

exports.BattleScripts = {
	randomOMAuthTeam: function (side) {
		let team = [];
		// Hardcoded sets of the available Pokémon.
		let sets = {
			// RO/Admins.
			'~Naten': {
				species: 'Uxie', ability: 'Dreamer', item: 'Leppa Berry', gender: 'M',
				moves: ['recycle', 'scald', 'mistball'],
				baseSignatureMove: 'vividdreams', signatureMove: "Vivid Dreams",
				evs: {hp:248, def:8, spa:76, spd:176}, nature: 'Calm',
			},
			'~Neo Soul': {
				species: 'Genesect', ability: 'Real Nigga', item: 'Leftovers', gender: 'M',
				moves: ['bugbuzz', 'icebeam', 'steameruption'],
				baseSignatureMove: 'hagottem', signatureMove: "Ha! GOTTEM!",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
			'~AM Tesla': {
				species: 'Zapdos', ability: 'Beard Coat', item: 'Leftovers', gender: 'M',
				moves: ['roost', 'defog', ['flamethrower', 'geomancy'][this.random(2)]],
				baseSignatureMove: 'sideboffledge', signatureMove: "side b off ledge",
				evs: {hp:248, spa:252, spe:8}, nature: 'Modest',
			},
			'~fender': {
				species: 'Gible', ability: 'Eval Troll', item: 'Life Orb', gender: 'M',
				moves: ['earthquake', 'dragonclaw', 'stoneedge', 'flareblitz', 'stealthrock', 'substitute'],
				baseSignatureMove: 'evalbattle', signatureMove: "evalbattle",
				evs: {hp:8, atk:248, spe:252}, nature: 'Jolly',
			},
			'~Nineage': {
				species: 'Arceus', ability: 'error', item: 'Dome Fossil', gender: 'M',
				moves: ['healbell', 'metronome', 'present'],
				baseSignatureMove: 'breakcode', signatureMove: "Break Code",
				evs: {hp:252, atk:4, spe:252}, nature: 'Jolly',
			},
			'~AllenDBB': {
				species: 'Scizor-Mega', ability: 'Hard Body Intimidation', item: 'Leftovers', gender: 'M',
				moves: ['cosmicpower', 'swordsdance', 'recover'],
				baseSignatureMove: 'datquickness', signatureMove: "Dat Quickness",
				evs: {hp:248, atk:4, def:128, spd:128}, nature: 'Adamant',
			},
			'~ArkenCiel': {
				species: 'Gallade-Mega', ability: 'Indifference', item: 'Weakness Policy', gender: 'M',
				moves: ['boltstrike', 'suckerpunch', 'drainpunch', 'flareblitz', 'iciclecrash'],
				baseSignatureMove: 'trinitysaura', signatureMove: "Trinity's Aura",
				evs: {hp:248, atk:160, def:100}, nature: 'Adamant',
			},

			// Leaders.
			'&Dream Eater Gengar': {
				species: 'Gengar-Mega', ability: 'Bad Dreams', item: 'Big Root', gender: 'M', shiny: true,
				moves: ['shadowball', 'nastyplot', 'sludgewave'],
				baseSignatureMove: 'sweetdreams', signatureMove: "Sweet Dreams",
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
			},
			'&sparkychild': {
				species: 'Pikachu', ability: 'Regenerator', item: 'Light Ball', gender: 'F',
				moves: ['thunderbolt', 'batonpass', 'psystrike'],
				baseSignatureMove: 'makeabot', signatureMove: "Make-a-Bot",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest',
			},
			'&Eosbot': {
				species: 'Xerneas', ability: 'Magic Guard', item: 'Shell Bell', gender: 'M',
				moves: ['earthpower', 'spore', 'lightofruin'],
				baseSignatureMove: 'banhammer', signatureMove: "Ban Hammer",
				evs: {hp:148, def:28, spa:252, spe:44}, nature: 'Modest',
			},
			'&Master Float': {
				species: 'Floatzel', ability: 'Master Guard', item: 'Focus Sash', gender: 'M',
				moves: ['extremespeed', 'icepunch', 'earthquake', 'waterfall', 'destinybond', 'sacredfire'],
				baseSignatureMove: 'floatssharingan', signatureMove: "Float's Sharingan",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			'&Piers Nivans': {
				species: 'Metagross-Mega', ability: 'Spray \'n\' Pray', item: 'Razor Claw', gender: 'M', shiny: true,
				moves: ['heartstamp', ['stormthrow', 'machpunch', 'frostbreath', 'bulletpunch', 'iciclecrash', 'magnetbomb'][this.random(6)], ['flamecharge', 'paraboliccharge', 'chargebeam', 'flamewheel', 'rollingkick'][this.random(5)]],
				baseSignatureMove: 'sexmachineguns', signatureMove: "SEXMACHINEGUNS!!!",
				evs: {atk:100, spa:156, spe:252}, nature: 'Naive',
			},

			// Mods.
			'@Piscean': {
				species: 'Slowbro-Mega', ability: 'No, Fuck You', item: 'Rocky Helmet', gender: 'M', shiny: true,
				moves: ['slackoff', ['irondefense', 'amnesia', 'calmmind', 'toxic'][this.random(4)], ['flamethrower', 'hydropump', 'scald'][this.random(3)]],
				baseSignatureMove: 'fuckouttheway', signatureMove: "Fuck Out The Way",
				evs: {hp:248, def:180, spa:80}, nature: 'Bold',
			},
			'@PrincessHigh': {
				species: 'Gardevoir-Mega', ability: 'Pixie Shield', item: 'Life Orb', gender: 'F', shiny: true,
				moves: ['earthpower', 'flamethrower', 'thunderbolt', 'energyball', 'psystrike', 'calmmind'],
				baseSignatureMove: 'pixiecannon', signatureMove: "Pixie Cannon",
				evs: {hp:248, spa:252, spe:8}, nature: 'Modest',
			},
			'@Chief Sokka': {
				species: 'Blissey', ability: 'War Medic', item: 'Leftovers', gender: 'F',
				moves: ['softboiled', ['seismictoss', 'nightshade'][this.random(2)], [['toxic', 'thunderwave'][this.random(2)], ['healbell', 'topsyturvy'][this.random(2)]][this.random(2)]],
				baseSignatureMove: 'prescribemedications', signatureMove: "Prescribe Medications",
				evs: {hp:248, def:252, spd:8}, nature: 'Bold',
			},
			'@Dank Rabbit': {
				species: 'Lopunny-Mega', ability: 'Trap', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['knockoff', 'drainpunch', 'return', 'icepunch'],
				baseSignatureMove: 'pantsutoss', signatureMove: "Pantsu Toss",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'@FranchescoEnzo': {
				species: 'Regigigas', ability: 'Meme Aura', item: 'Leftovers', gender: 'M',
				moves: ['extremespeed', ['swordsdance', 'toxic', 'swagger'][this.random(3)], ['drainpunch', 'icepunch', 'stoneedge'][this.random(3)]],
				baseSignatureMove: 'filth', signatureMove: "Filth",
				evs: {hp:4, atk:252, def:252}, nature: 'Adamant',
			},
			'@Bostonian': {
				species: 'Chandelure', ability: 'Contradictory', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['overheat', ['shadowball', 'dracometeor'][this.random(2)], ['psychoboost', 'leafstorm'][this.random(2)]],
				baseSignatureMove: 'doubletieraddition', signatureMove: "Double-Tier Addition",
				evs: {def:4, spa:252, spe:252}, ivs: {atk:0}, nature: 'Timid',
			},

			// Drivers.
			'%Mr. CGTNathan': {
				species: 'Cofagrigus', ability: 'Graveyard', item: 'Leftovers', gender: 'M',
				moves: ['destinybond', 'recover', 'healbell'],
				baseSignatureMove: 'graveyardstrike', signatureMove: "Graveyard Strike",
				evs: {hp:252, def:4, spd:252}, ivs: {spe:0, atk:0}, nature: 'Sassy',
			},
			'%SWL Neski': {
				species: 'Dragonite', ability: 'Aerial Rage', item: 'Scope Lens', gender: 'F',
				moves: ['extremespeed', 'facade', 'fakeout'],
				baseSignatureMove: 'bootyslam', signatureMove: "Booty Slam",
				evs: {hp:248, atk:252, spe:8}, nature: 'Adamant',
			},
			'%Alliance - Erica': {
				species: 'Meloetta', ability: 'Insistent', item: 'Leftovers', gender: 'F', shiny: true,
				moves: ['rest', 'sleeptalk', 'shadowball'],
				baseSignatureMove: 'admonish', signatureMove: "admonish",
				evs: {hp:240, def:252, spd:16}, ivs: {atk:0}, nature: 'Bold',
			},
			'%Koikazma': {
				species: 'Hawlucha', ability: 'Shitposter Maximus', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['highjumpkick', 'aerialace', 'suckerpunch', 'swordsdance'],
				baseSignatureMove: 'shitpostcombo', signatureMove: "SHITPOST COMBO",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},
			'%xVeNoMiiZz': {
				species: 'Lucario-Mega', ability: 'Adaptafilter-boost', item: 'Leftovers', gender: 'M',
				moves: ['nastyplot', 'flashcannon', 'earthpower'],
				baseSignatureMove: 'fastball', signatureMove: "Fastball",
				evs: {hp:4, spa:252, spe:252}, ivs: {atk:0}, nature: 'Timid',
			},
			'%Trickster': {
				species: 'Diancie', ability: 'Wizard', item: 'Choice Scarf', gender: 'M',
				moves: ['powergem', 'earthpower', 'darkvoid', 'substitute', 'icebeam', 'blueflare'],
				baseSignatureMove: 'mikurubeam', signatureMove: "MIKURU BEAM",
				evs: {hp:248, def:8, spa:252}, ivs: {spe:0}, nature: 'Quiet',
			},

			//Operators.
			'$Dusk Cryptis': {
				species: 'Latios-Mega', ability: 'Leaguehopper', item: 'Soul Dew', gender: 'M', shiny: true,
				moves: ['dracometeor', ['energyball', 'icebeam'][this.random(2)], 'psyshock', ['reflect', 'lightscreen'][this.random(2)]],
				baseSignatureMove: 'roomowner', signatureMove: "Room Owner",
				evs: {hp:4, spa:252, spe:252}, nature: 'Timid',
			},
			'$Crystal Vanitas': {
				species: 'Aerodactyl-Mega', ability: 'Double Edged', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['dragonascent', 'diamondstorm', 'hyperspacefury'],
				baseSignatureMove: 'dragoonspride', signatureMove: "Dragoon's Pride",
				evs: {hp:4, atk:248, def:40, spe:216}, nature: 'Jolly',
			},
			'$Sundar18': {
				species: 'Charizard-Mega-X', ability: 'Huge Power', item: 'Helix Fossil', gender: 'M', shiny: true,
				moves: [['dragondance', 'bellydrum', 'roost'][this.random(3)], ['flareblitz', 'firepunch'][this.random(2)], ['dragonclaw', 'outrage', 'doubleedge', 'shadowforce', 'shadowsneak', 'shadowclaw', 'drillpeck'][this.random(7)]],
				baseSignatureMove: 'dragonsfire', signatureMove: "Dragon's Fire",
				evs: {hp:4, atk:252, spe:252}, nature: 'Adamant',
			},
			'$SeoKing': {
				species: 'Scrafty', ability: 'Moody', item: 'Leftovers', gender: 'M', shiny: true,
				moves: ['substitute', 'drainpunch', 'fakeout'],
				baseSignatureMove: 'niggapunch', signatureMove: "Nigga Punch",
				evs: {hp:252, atk:100, spe:156}, nature: 'Adamant',
			},
			'$Vi': {
				species: 'Victini', ability: 'Clutch', item: 'Choice Scarf', gender: 'M',
				moves: ['vcreate', 'boltstrike', 'trick', 'uturn', 'willowisp', 'taunt'],
				baseSignatureMove: 'sniped', signatureMove: "#sniped",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			/*'$Vileman': {
				species: 'Ampharos', ability: 'Adaptability', item: 'Cell Battery', gender: 'M',
				moves: ['thunderbolt', 'focusblast', 'geomancy'],
				baseSignatureMove: 'zenheadbutt', signatureMove: "#sniped",
				evs: {def:4, spa:252, spe:252}, nature: 'Timid'
			},*/
			'$AudinoPrimal': {
				species: 'Audino-Mega', ability: 'Literal Cancer', item: 'Life Orb', gender: 'M', shiny: true,
				moves: ['calmmind', 'dazzlinggleam', 'wish', 'protect', 'fireblast', 'psychic', 'surf', 'suckerpunch', 'taunt', 'foulplay', 'dynamicpunch', 'glare'],
				baseSignatureMove: 'lecancerstorm', signatureMove: "Le Cancer Storm",
				evs: {hp:172, spa:252, spe:84}, nature: 'Bold',
			},
			'$Alpha Ninja': {
				species: 'Slowbro-Mega', ability: 'Poison Heal', item: 'Toxic Orb', gender: 'M',
				moves: ['steameruption', 'psystrike', 'slackoff'],
				baseSignatureMove: 'beybladespin', signatureMove: "Beyblade Spin",
				evs: {hp:248, def: 252, spa:8}, nature: 'Bold',
			},

			// Voices.
			'+Dusk Testing': {
				species: 'Darkrai', ability: 'Meme Testing', item: 'Focus Sash', gender: 'M', shiny: true,
				moves: [['darkvoid', 'calmmind', 'swordsdance'][this.random(3)], 'darkpulse', ['moonblast', 'drainpunch', 'earthquake', 'icebeam', 'flamethrower', 'gigadrain'][this.random(6)]],
				baseSignatureMove: 'finaltest', signatureMove: "Final Test",
				evs: {hp:252, spa:252, spd:4}, nature: 'Timid',
			},
			/*'+Hallie': {
				species: 'Oddish', ability: 'Turboblaze', item: 'Weed', gender: 'M',
				moves: ['blazekick', 'seedbomb', 'aromatherapy'],
				baseSignatureMove: 'razorleaf', signatureMove: "420 BLAZE IT",
				evs: {atk:252, spd:4, spe:252}, nature: 'Jolly',
			},*/
			'+SWL Gryphon': {
				species: 'Staravia', ability: 'Serene Grace', item: 'Sharp Beak', gender: 'M',
				moves: ['airslash', 'chatter', 'boomburst'],
				baseSignatureMove: 'nidificate ', signatureMove: "Nidificate ",
				evs: {hp:4, spa:252, spe:252}, nature: 'Modest',
			},
			/*'+Pk-Kaiser': {
				species: 'Chandelure', ability: 'Illusion', item: 'Spooky Plate', gender: 'F',
				moves: ['calmmind', 'secretsword', 'technoblast', 'infestation'],
				baseSignatureMove: 'judgment', signatureMove: "Kagome Kagome",
				evs: {hp:248, spa:252, spe:8}, ivs: {atk:0}, nature: 'Modest',
			},
			'+NJNP': {
				species: 'Minccino', ability: 'Cute Charm', item: 'Life Orb', gender: 'F',
				moves: ['return', 'knockoff', ['gunkshot','encore'][this.random(2)]],
				baseSignatureMove: 'playrough', signatureMove: "Anime Girl",
				evs: {atk:252, def:4, spe:252}, nature: 'Jolly',
			},*/
			'+Solorbeam?': {
				species: 'Vileplume', ability: 'Dat Ass Doe', item: 'Black Sludge', gender: 'F',
				moves: ['gigadrain', 'sludgebomb', 'hex', 'leechseed', 'synthesis', 'solarbeam', 'infestation'],
				baseSignatureMove: 'twerkteam', signatureMove: "Twerk Team",
				evs: {hp:252, def:240, spa:16}, nature: 'Bold',
			},
			/*'+jd': {
				species: 'Porygon-Z', ability: 'Serverhopper', item: 'Burn Heal', gender: 'M',
				moves: ['recover', 'scald', 'fireblast', 'icebeam', 'psyshock',],
				baseSignatureMove: 'jddos', signatureMove: "jddos",
				evs: {spa:252, spd:4, spe:252}, nature: 'Timid',
			},*/
			'+Kammi': {
				species: 'Chandelure', ability: 'Mom', item: 'Life Orb', gender: 'F',
				moves: ['shadowball', 'flamethrower', 'energyball'],
				baseSignatureMove: 'blamekammi', signatureMove: "#blamekammi",
				evs: {def:4, spa:252, spe:252}, ivs: {atk:0}, nature: 'Modest',
			},
			'+panpawn': {
				species: 'Pidgeot-Mega', ability: 'Atmospheric Devastation', item: 'Leftovers', gender: 'M',
				moves: ['hurricane', 'thunder', 'fireblast', 'blizzard', 'stoneedge', 'hydropump', 'roost'],
				baseSignatureMove: 'climatestrike', signatureMove: "Climate Strike",
				evs: {def:4, spa:252, spe:252}, nature: 'Timid',
			},
			'+Safety Shark': {
				species: 'Garchomp', ability: 'Safety First', item: 'Assault Vest', gender: 'M',
				moves: ['earthquake', 'dragon claw', 'flamethrower'],
				baseSignatureMove: 'quote', signatureMove: "+quote",
				evs: {hp:4, atk:252, spe:252}, nature: 'Jolly',
			},
			// Regulars who are active enough to warrant this, since there aren't enough staff
		};
		// Generate the team randomly.
		let pool = Object.keys(sets).randomize();
		// let ranks = {'~':'admins', '&':'leaders', '@':'mods', '%':'drivers', '$':'operators', '+':'voices'};
		let levels = {'~':99, '&':98, '@':97, '%':96, '$':95, '+':94};
		for (let i = 0; i < 6; i++) {
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

	runMegaEvo: function (pokemon) {
		let template = this.getTemplate('Garchomp-Mega');
		let side = pokemon.side;
		if (pokemon.baseTemplate !== template) {
			// Pokémon affected by Sky Drop cannot mega evolve. Enforce it here for now.
			/*var foeActive = side.foe.active;
			for (var i = 0; i < foeActive.length; i++) {
				if (foeActive[i].volatiles['skydrop'] && foeActive[i].volatiles['skydrop'].source === pokemon) {
					return false;
				}
			}*/
			pokemon.formeChange(template);
			pokemon.baseTemplate = template; // mega evolution is permanent
			pokemon.details = template.species + (pokemon.level === 100 ? '' : ', L' + pokemon.level) + (pokemon.gender === '' ? '' : ', ' + pokemon.gender) + (pokemon.set.shiny ? ', shiny' : '');
			this.add('detailschange', pokemon, pokemon.details);
			this.add('-mega', pokemon, template.baseSpecies, template.requiredItem);
			pokemon.baseAbility = 'safetyfirst';

			// Limit one mega evolution
			for (let i = 0; i < side.pokemon.length; i++) {
				side.pokemon[i].canMegaEvo = false;
			}
			return true;
		} else {
			return;
		}
	},
};