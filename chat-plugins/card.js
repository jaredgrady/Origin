//PSCG
/*Cards are organized alphabetically and use a point system
Common 1 Point
Uncommon 3 Points
Rare 6 points
Epic 10 points
Legendary 15 points
Mythic 20 points
Make a discretionary call on what rarity they should be (Mythics are exclusively very unique legendary cards)

If a card name repeats, attach a number to the end of it to make sure that it actually can be pulled with packs.

publicids are dex numbers and any unique identifiers (if they're not a Pokemon, do a shorthand version of the card name)
EX - EX
Primal - Pr
Mega - M
Ancient Trait (Delta) - D
If multiple unique identifiers are there, stack them.

Deltas are bumped up 1 level of rarity from their normal form.
Full images are bumped up 1 level of rarity from their normal form
EX cards are Epic
EX Megas are Legendary
Etc

Collections are different identifiers of the CARD, please include the card's typing, anything included in it, the pack it came from, and anything special about it in the game
Possible identifiers include
Gen#
Card Type [Fighting, Colorless, etc]
Tier
Pack Name [XY-Roaring Skies]
Legendary
Event
Pseudo [For pseudo legendaries]
Starter [For starter Pokemon]
Full [For Pokemon with full background]

All cards should be retrieved here http://www.pokemon.com/us/pokemon-tcg/pokemon-cards/
*/

var uuid = require('uuid');

var colors = {
    Mythic: '#E3E2AF',
    Legendary: '#FF851B',
    Epic: 'purple',
    Rare: '#0074D9',
    Uncommon: 'gray',
    Common: 'black'
};

var shop = [ //Actual shop display
    ['XY-Base', 'Get three cards from the first pack released in the Pokemon XY set.', 10],
    ['XY-Flashfire', 'Get three cards from the Flashfire pack released in the Pokemon XY set.', 10],
    ['XY-Furious Fists', 'Get three cards from the Furious Fists pack released in the Pokemon XY set.', 10],
    ['XY-Phantom Forces', 'Get three cards from the Phantom Forces pack released in the Pokemon XY set.', 10],
    ['XY-Primal Clash', 'Get three cards from the Primal Clash pack released in the Pokemon XY set.', 10],
    ['XY-Roaring Skies', 'Get three cards from the Roaring Skies pack released in the Pokemon XY set.', 10],
   //['UU-Pack', 'Get three cards from the UU tier.', 10]
];
//Shop used in cardCache to reduce RAM usage of card caching
var packShop = ['XY-Base', 'XY-Flashfire', 'XY-Furious Fists', 'XY-Phantom Forces', 'XY-Primal Clash', 'XY-Roaring Skies', 'Double Crisis', 'Water', 'Fire', 'Fighting', 'Fairy', 'Dragon', 'Colorless', 'Psychic', 'Lightning', 'Darkness', 'Grass', 'OU-Pack', 'UU-Pack', 'Uber-Pack', 'PU-Pack', 'NU-Pack', 'RU-Pack', 'LC-Pack', 'BL-Pack', 'BL2-Pack', 'BL3-Pack', 'Gen1', 'Gen2', 'Gen3', 'Gen4', 'Gen5', 'Gen6', 'Metal', 'Trainer', 'Supporter', 'Item', 'Stadium', 'EX-Pack', 'Legendary', 'Full', 'Event'];
var tourCardRarity = ['No Card', 'Common', 'Uncommon', 'Rare', 'Epic', 'Epic', 'Legendary', 'Legendary', 'Mythic'];
var cardRarity = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythic'];
//System Command: you should prolly never put anything in here
var cleanShop = [];
var cleanCard = [];

var rareCache = []; //Used to cache cards for tours
var cardCache = []; //Used to cache cards in packs
var userPacks = {}; //Used to store users unopened packs

var cards = {
        'absol': {title: 'absol', name: 'Absol', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_40.png', publicid: '359', rarity: 'Uncommon', collection: ['Darkness', 'UU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'accelgor': {title: 'accelgor', name: 'Accelgor', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_9.png', publicid: '617', rarity: 'Uncommon', collection: ['Grass', 'RU-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'acetrainer': {title: 'acetrainer', name: 'Ace Trainer', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY7/XY7_EN_69.png', publicid: 'actrn', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'XY-Ancient Origins'], points: 3},
        'acrobike': {title: 'acrobike', name: 'Acrobike', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_122.png', publicid: 'acro', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 3},
        'aegislash': {title: 'aegislash', name: 'Aegislash', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_100.png', publicid: '681', rarity: 'Rare', collection: ['Metal', 'Uber-Pack', 'XY-Primal Clash', 'Gen6'], points: 6},
        'aegislash2': {title: 'aegislash2', name: 'Aegislash', card:  'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_85.png', publicid: '681a', rarity: 'Rare', collection: ['Metal', 'Uber-Pack', 'XY-Base', 'Gen6'], points: 6},
        'aegislash3': {title: 'aegislash3', name: 'Aegislash', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_86.png', publicid: '681b', rarity: 'Rare', collection: ['Metal', 'Uber-Pack', 'XY-Base', 'Gen6'], points: 6},
        'aegislashex': {title: 'aegislashex', name: 'Aegislash EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_65.png', publicid: '681EX', rarity: 'Epic', collection: ['Metal', 'Uber-Pack', 'XY-Phantom Forces', 'Gen6', 'EX-Pack'], points: 10},
        'aggronex': {title: 'aggronex', name: 'Aggron EX', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_93.png', publicid: '306EX', rarity: 'Epic', collection: ['Metal', 'UU-Pack', 'XY-Primal Clash', 'EX-Pack', 'Gen3'], points: 10},
        'aggronexfull': {title: 'aggronexfull', name: 'Aggron EX', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_153.png', publicid: '306EXa', rarity: 'Legendary', collection: ['Metal', 'UU-Pack', 'XY-Primal Clash', 'EX-Pack', 'Gen3', 'Full'], points: 15},
        'aggronmagma': {title: 'aggronmagma', name: 'Aggron', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_14.png', publicid: '306mag', rarity: 'Rare', collection: ['Fighting', 'UU-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 6},
        'aggronspiritlink': {title: 'aggronspiritlink', name: 'Aggron Spirit Link', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_123.png', publicid: 'aggsp', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 1},
        'alakazambaseset': {title: 'alakazambaseset', name: 'Alakazam (Base Set)', card: 'http://i.imgur.com/2iPSURu.jpg?1', publicid: '65BS', rarity: 'Mythic', collection: ['Psychic', 'Gen1', 'OU-Pack'], points: 20},
        'alomomola': {title: 'alomomola', name: 'Alomomola', card:    'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_22.png', publicid: '594', rarity: 'Common', collection: ['Water', 'RU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'altaria': {title: 'altaria', name: 'Altaria', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_53.png', publicid: '334', rarity: 'Uncommon', collection: ['Dragon', 'OU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'altariadelta': {title: 'altariadelta', name: 'Altaria (Delta)', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_74.png', publicid: '334D', rarity: 'Rare', collection: ['Colorless', 'OU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 6},
        'altariafull': {title: 'altariafull', name: 'Altaria (Full)', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY46.png', publicid: '334Full', rarity: 'Rare', collection: ['Colorless', 'OU-Pack', 'XY-Promo', 'Gen3', 'Full'], points: 6},
        'amaura': {title: 'amaura', name: 'Amaura', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_25.png', publicid: '698', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'aquadiffuser': {title: 'aquadiffuser', name: 'Aqua Diffuser', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_23.png', publicid: 'aqdif', rarity: 'Common', collection: ['Trainer', 'Item', 'Double Crisis'], points: 1},
        'arbok': {title: 'arbok', name: 'Arbok', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_48.png', publicid: '24', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'archiesaceinthehole': {title: 'archiesaceinthehole', name: 'Archie\'s Ace In The Hole', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_124.png', publicid: 'archace', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Primal Clash'], points: 10},
        'archiesaceintheholefull': {title: 'archiesaceintheholefull', name: 'Archie\'s Ace In The Hole (Full)', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_157.png', publicid: 'archacea', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Primal Clash', 'Full'], points: 15},
        'aromatisse': {title: 'aromatisse', name: 'Aromatisse', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_93.png', publicid: '683', rarity: 'Uncommon', collection: ['Fairy', 'RU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'aronmagma': {title: 'aronmagma', name: 'Aron', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_12.png', publicid: '304mag', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 1},
        'articuno': {title: 'articuno', name: 'Articuno', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_16.png', publicid: '144', rarity: 'Rare', collection: ['Water', 'Legendary', 'PU-Pack', 'XY-Roaring Skies', 'Gen1'], points: 6},
        'articunodelta': {title: 'articunodelta', name: 'Articuno (Delta)', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_17.png', publicid: '144D', rarity: 'Legendary', collection: ['Water', 'Legendary', 'PU-Pack', 'XY-Roaring Skies', 'Delta', 'Gen1'], points: 15},
        'aurorus': {title: 'aurorus', name: 'Aurorus', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_26.png', publicid: '699', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'avalugg': {title: 'avalugg', name: 'Avalugg', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_31.png', publicid: '713', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'az': {title: 'az', name: 'AZ', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_91.png', publicid: 'az', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Phantom Forces'], points: 10},
        'azfull': {title: 'azfull', name: 'AZ (Full)', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_117.png', publicid: 'aza', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Phantom Forces', 'Full'], points: 15},
        'azumarill': {title: 'azumarill', name: 'Azumarill', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_103.png', publicid: '184', rarity: 'Rare', collection: ['Fairy', 'OU-Pack', 'XY-Primal Clash', 'Gen2'], points: 6},
        'azumarilldelta': {title: 'azumarilldelta', name: 'Azumarill (Delta)', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_104.png', publicid: '184D', rarity: 'Epic', collection: ['Fairy', 'OU-Pack', 'XY-Primal Clash', 'Delta', 'Gen2'], points: 10},
        'bagon': {title: 'bagon', name: 'Bagon', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_54.png', publicid: '371', rarity: 'Common', collection: ['Dragon', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'bagon2': {title: 'bagon2', name: 'Bagon', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_55.png', publicid: '371', rarity: 'Common', collection: ['Dragon', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'baltoymagma': {title: 'baltoymagma', name: 'Baltoy', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_10.png', publicid: '343', rarity: 'Common', colllection: ['Psychic', 'LC-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 1},
        'banette': {title: 'banette', name: 'Banette', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_31.png', publicid: '354', rarity: 'Uncommon', collection: ['Psychic', 'RU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'banettedelta': {title: 'banettedelta', name: 'Banette (Delta)', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_32.png', publicid: '354D', rarity: 'Rare', collection: ['Psychic', 'RU-Pack', 'XY-Roaring Skies', 'Delta', 'Gen3'], points: 6},
        'barbarcle': {title: 'barbaracle', name: 'Barbacle', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_49.png', publicid: '689', rarity: 'Uncommon', collection: ['Fighting', 'PU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'barboach': {title: 'barboach', name: 'Barboach', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_39.png', publicid: '339', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'battlecompressor': {title: 'battlecompressor', name: 'Battle Compressor', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_92.png', publicid: 'batcom', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Phantom Forces'], points: 1},
        'battlereporter': {title: 'battlereporter', name: 'Battle Reporter', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_88.png', publicid: 'batrep', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Furious Fists'], points: 10},
        'battlereporterfull': {title: 'battlereporterfull', name: 'Battle Reporter (Full)', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_109.png', publicid: 'batrepa', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Furious Fists', 'Full'], points: 15},
        'beartic': {title: 'beartic', name: 'Beartic', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_22.png', publicid: '614', rarity: 'Uncommon', collection: ['Water', 'UU-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'beautifly': {title: 'beautifly', name: 'Beautifly', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_5.png', publicid: '267', rarity: 'Rare', collection: ['Grass', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 6},
        'beedrill': {title: 'beedrill', name: 'Beedrill', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_3.png', publicid: '15', rarity: 'Rare', collection: ['UU-Pack', 'Grass', 'XY-Primal Clash', 'Gen1'], points: 6},
        'beedrill2': {title: 'beedrill2', name: 'Beedrill', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_5.png', publicid: '15a', rarity: 'Rare', collection: ['Grass', 'UU-Pack', 'XY-Base', 'Gen1'], points: 6},
        'bellsprout': {title: 'bellsprout', name: 'Bellsprout', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_1.png', publicid: '69', rarity: 'Uncommon', collection: ['Grass', 'LC-Pack', 'XY-Furious Fists', 'Gen1'], points: 1},
        'bergmite': {title: 'bergmite', name: 'Bergmite', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_30.png', publicid: '712', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'bibarel': {title: 'bibarel', name: 'Bibarel', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_118.png', publicid: '400', rarity: 'Uncommon', collection: ['PU-Pack', 'Colorless', 'XY-Primal Clash', 'Gen4'], points: 3},
        'bibarel2': {title: 'bibarel2', name: 'Bibarel', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_107.png', publicid: '400a', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Base', 'Gen4'], points: 3},
        'bidoof': {title: 'bidoof', name: 'Bidoof', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_116.png', publicid: '399', rarity: 'Common', collection: ['LC-Pack', 'Colorless', 'XY-Primal Clash', 'Gen4'], points: 1},
        'bidoof2': {title: 'bidoof2', name: 'Bidoof', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_106.png', publicid: '399a', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Base', 'Gen4'], points: 1},
        'bidoof3': {title: 'bidoof3', name: 'Bidoof', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_29.png', publicid: '399b', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen4'], points: 1},
        'bidoofdelta': {title: 'bidoofdelta', name: 'Bidoof (Delta)', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_117.png', publicid: '399D', rarity: 'Uncommon', collection: ['LC-Pack', 'Colorless', 'XY-Primal Clash', 'Gen4', 'Delta'], points: 3},
        'binacle': {title: 'binacle', name: 'Binacle', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_38.png', publicid: '688', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Roaring Skies', 'Gen6'], points: 1},
        'binacle2': {title: 'binacle2', name: 'Binacle', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_48.png', publicid: '688a', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'bisharp': {title: 'bisharp', name: 'Bisharp', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_82.png', publicid: '625', rarity: 'Uncommon', collection: ['Metal', 'OU-Pack', 'XY-Base', 'Gen5'], points: 3},
        'bisharp2': {title: 'bisharp2', name: 'Bisharp', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_20.png', publicid: '625a', rarity: 'Uncommon', collection: ['Metal', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen5'], points: 3},
        'blacksmith': {title: 'blacksmith', name: 'Blacksmith', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_88.png', publicid: '661', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'XY-Flashfire'], points: 3},
        'blastoisebaseset': {title: 'blastoisebaseset', name: 'Blastoise (Base Set)', card: 'http://i.imgur.com/A4dbSoO.jpg?1', publicid: '9BS', rarity: 'Mythic', collection: ['Water', 'UU-Pack', 'Base Set', 'Gen1'], points: 20},
        'blastoiseex': {title: 'blastoiseex', name: 'Blastoise EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_29.png', publicid: '9EX', rarity: 'Epic', collection: ['Water', 'UU-Pack', 'XY-Base', 'Gen1', 'EX-Pack'], points: 10},
        'blastoiseex2': {title: 'blastoiseex2', name: 'Blastoise EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY30.png', publicid: '9EXa', rarity: 'Epic', collection: ['Water', 'UU-Pack', 'XY-Promo', 'Gen1', 'EX-Pack'], points: 10},
        'blastoiseexfull': {title: 'blastoiseexfull', name: 'Blastoise EX (Full)', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_142.png', publicid: '9a', rarity: 'Legendary', collection: ['Water', 'UU-Pack', 'XY-Base', 'Gen1', 'EX-Pack', 'Full'], points: 15},
        'blaziken': {title: 'blaziken', name: 'Blaziken', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_28.png', publicid: '257', rarity: 'Rare', collection: ['Fire', 'Uber-Pack', 'XY-Primal Clash', 'Gen3'], points: 6},
        'blaziken2': {title: 'blaziken2', name: 'Blaziken', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_14.png', publicid: '257a', rarity: 'Rare', collection: ['Fire', 'Uber-Pack', 'XY-Furious Fists', 'Gen3'], points: 3},
        'blazikenex': {title: 'blazikenex', name: 'Blaziken EX', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY54.png', publicid: '257EX', rarity: 'Epic', collection: ['Fire', 'Uber-Pack', 'XY-Promo', 'Gen3', 'EX-Pack'], points: 10},
        'blissey': {title: 'blissey', name: 'Blissey', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_81.png', publicid: '242', rarity: 'Rare', collection: ['Colorless', 'UU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 6},
        'boldore': {title: 'boldore', name: 'Boldore', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_49.png', publicid: '525', rarity: 'Uncommon', collection: ['Fighting', 'NFE', 'XY-Phantom Forces', 'Gen5'], points: 3},
        'bouffalant': {title: 'bouffalant', name: 'Bouffalant', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_119.png', publicid: '626', rarity: 'Uncommon', collection: ['Colorless', 'NU-Pack', 'XY-Primal Clash', 'Gen5'], points: 3},
        'braixen': {title: 'braixen', name: 'Braixen', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_25.png', publicid: '654', rarity: 'Uncommon', collection: ['Fire', 'NFE', 'XY-Base', 'Gen6'], points: 3},
        'braixen2': {title: 'braixen2', name: 'Braixen', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_9.png', publicid: '654a', rarity: 'Uncommon', collection: ['Fire', 'NFE', 'XY-Kalos Starter Set', 'Gen6'], points: 3},
        'breloom': {title: 'breloom', name: 'Breloom', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_16.png', publicid: '286', rarity: 'Uncommon', collection: ['Grass', 'OU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'breloom2': {title: 'breloom2', name: 'Breloom', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_50.png', publicid: '286a', rarity: 'Uncommon', collection: ['Fighting', 'OU-Pack', 'XY-Furious Fists', 'Gen3'], points: 3},
        'bronzong': {title: 'bronzong', name: 'Bronzong', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY21.png', publicid: '437', rarity: 'Uncommon', collection: ['Metal', 'RU-Pack', 'XY-Promo', 'Gen4'], points: 3},
        'bronzong2': {title: 'bronzong2', name: 'Bronzong', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_61.png', publicid: '437a', rarity: 'Uncommon', collection: ['Metal', 'RU-Pack', 'XY-Phantom Forces', 'Gen4'], points: 3},
        'bronzor': {title: 'bronzor', name: 'Bronzor', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_60.png', publicid: '436', rarity: 'Common', collection: ['Metal', 'LC-Pack', 'XY-Phantom Forces', 'Gen4'], points: 1},
        'buizel': {title: 'buizel', name: 'Buizel', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_28.png', publicid: '418', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Flashfire', 'Gen4'], points: 1},
        'buneary': {title: 'buneary', name: 'Buneary', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_84.png', publicid: '427', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Flashfire', 'Gen4'], points: 1},
        'bunnelby': {title: 'bunnelby', name: 'Bunnelby', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_120.png', publicid: '659', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Primal Clash', 'Gen6'], points: 1},
        'bunnelby2': {title: 'bunnelby2', name: 'Bunnelby', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_111.png', publicid: '659a', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'bunnelby3': {title: 'bunnelby3', name: 'Bunnelby', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_87.png', publicid: '659b', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'bunnelby4': {title: 'bunnelby4', name: 'Bunnelby', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_30.png', publicid: '659c', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'bunnelbydelta': {title: 'bunnelbydelta', name: 'Bunnelby (Delta)', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_121.png', publicid: '659D', rarity: 'Uncommon', collection: ['Colorless', 'LC-Pack', 'XY-Primal Clash', 'Gen6', 'Delta'], points: 3},
        'butterfree': {title: 'butterfree', name: 'Butterfree', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_3.png', publicid: '12', rarity: 'Rare', collection: ['Grass', 'PU-Pack', 'XY-Flashfire', 'Gen1'], points: 6},
        'cameruptex': {title: 'cameruptex', name: 'Camerupt EX', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_29.png', publicid: '323EX', rarity: 'Epic', collection: ['Fire', 'EX-Pack', 'RU-Pack', 'XY-Primal Clash', 'Gen3'], points: 10},
        'cameruptexfull': {title: 'cameruptexfull', name: 'Camerupt EX (Full)', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_146.png', publicid: '323EXa', rarity: 'Legendary', collection: ['Fire', 'EX-Pack', 'Full', 'RU-Pack', 'XY-Primal Clash', 'Gen3'], points: 15},
        'cameruptmagma': {title: 'cameruptmagma', name: 'Camerupt', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_2.png', publicid: '323mag', rarity: 'Uncommon', collection: ['Fire', 'RU-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 3},
        'carbink': {title: 'carbink', name: 'Carbink', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_47.png', publicid: '703', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Roaring Skies', 'Gen6'], points: 3},
        'carbink2': {title: 'carbink2', name: 'Carbink', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_68.png', publicid: '703a', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'carvahnaaqua': {title: 'carvahnaaqua', name: 'Carvanha', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_20.png', publicid: '318aq', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 1},
        'cascoon': {title: 'cascoon', name: 'Cascoon', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_6.png', publicid: '268', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'cassius': {title: 'cassius', name: 'Cassius', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_115.png', publicid: 'cass', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'XY-Base'], points: 3},
        'caterpie': {title: 'caterpie', name: 'Caterpie', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_1.png', publicid: '10', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Flashfire', 'Gen1'], points: 1},
        'championsfestival': {title: 'championsfestival', name: 'Champion\'s Festival', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY27.png', publicid: 'chf', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Promo'], points: 6},
        'chandelure': {title: 'chandelure', name: 'Chandelure', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_43.png', publicid: '609', rarity: 'Rare', collection: ['Psychic', 'UU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 6},
        'chansey': {title: 'chansey', name: 'Chansey', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_80.png', publicid: '113', rarity: 'Uncommon', collection: ['Colorless', 'OU-Pack', 'XY-Phantom Forces', 'Gen1'], points: 3},
        'chanseybaseset': {title: 'chanseybaseset', name: 'Chansey (Base Set)', card: 'http://i.imgur.com/6gqfvJa.jpg?1', publicid: '113BS', rarity: 'Mythic', collection: ['Colorless', 'OU-Pack', 'Gen1'], points: 20},
        'charizardbaseset': {title: 'charizardbaseset', name: 'Charizard (Base Set)', card: 'http://i.imgur.com/2KBhEEV.png', publicid: '6BS', rarity: 'Mythic', collection: ['Base Set', 'Fire', 'OU-Pack', 'Gen1'], points: 20},
        'charizardex': {title: 'charizardex', name: 'Charizard EX', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_11.png', publicid: '6EX', rarity: 'Epic', collection: ['Fire', 'OU-Pack', 'XY-Flashfire', 'EX-Pack', 'Gen1'], points: 10},
        'charizardex2': {title: 'charizardex2', name: 'Charizard EX', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_12.png', publicid: '6EXa', rarity: 'Epic', collection: ['Fire','OU-Pack' ,'XY-Flashfire', 'EX-Pack', 'Gen1'], points: 10},
        'charizardex3': {title: 'charizardex3', name: 'Charizard EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY17.png', publicid: '6EXb', rarity: 'Epic', collection: ['Fire', 'OU-Pack', 'XY-Promo', 'EX-Pack', 'Gen1'], points: 10},
        'charizardex4': {title: 'charizardex4', name: 'Charizard EX', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY29.png', publicid: '6EXc', rarity: 'Epic', collection: ['Fire', 'OU-Pack', 'XY-Promo', 'EX-Pack', 'Gen1'], points: 10},
        'charizardexfull': {title: 'charizardexfull', name: 'Charizard EX (Full)', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_100.png', publicid: '6fullex', rarity: 'Legendary', collection: ['Fire', 'OU-Pack', 'XY-Flashfire', 'Gen1', 'EX-Pack', 'Full'], points: 15},
        'chesnaught': {title: 'chesnaught', name: 'Chesnaught', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_14.png', publicid: '652', rarity: 'Rare', collection: ['Grass', 'UU-Pack', 'XY-Base', 'Gen6'], points: 6},
        'chesnaught2': {title: 'chesnaught2', name: 'Chesnaught', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_5.png', publicid: '652a', rarity: 'Rare', collection: ['Grass', 'UU-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 6},
        'chesnaughtex': {title: 'chesnaughtex', name: 'Chesnaught EX', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY18.png', publicid: '652EX', rarity: 'Epic', collection: ['Grass', 'UU-Pack', 'XY-Promo', 'EX-Pack', 'Gen6'], points: 10},
        'chespin': {title: 'chespin', name: 'Chespin', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY01.png', publicid:'650', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Promo', 'Gen6'], points: 1},
        'chespin2': {title: 'chespin2', name: 'Chespin', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_12.png', publicid: '650a', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'chespin3': {title: 'chespin3', name: 'Chespin', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_3.png', publicid: '650b', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen1'], points: 1},
        'chinchou': {title: 'chinchou', name: 'Chinchou', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_57.png', publicid: '170', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Primal Clash', 'Gen2'], points: 1},
        'clamperl': {title: 'clamperl', name: 'Clamperl', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_49.png', publicid: '366', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'clauncher': {title: 'clauncher', name: 'Clauncher', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_15.png', publicid: '692', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'clauncher2': {title: 'clauncher2', name: 'Clauncher', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_23.png', publicid: '692a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'clawitzer': {title: 'clawitzer', name: 'Clawitzer', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_24.png', publicid: '693', rarity: 'Uncommon', collection: ['Water', 'RU-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'claydolmagma': {title: 'claydolmagma', name: 'Claydol', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_11.png', publicid: '344mag', rarity: 'Uncommon', collection: ['Psychic', 'NU-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 3},
        'clefable': {title: 'clefable', name: 'Clefable', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_71.png', publicid: '36', rarity: 'Rare', collection: ['Fairy', 'OU-Pack', 'XY-Furious Fists', 'Gen1'], points: 6},
        'clefairy': {title: 'clefairy', name: 'Clefairy', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_69.png', publicid: '35', rarity: 'Uncommon', collection: ['Fairy', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'clefairy2': {title: 'clefairy2', name: 'Clefairy', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_70.png', publicid: '35a', rarity: 'Uncommon', collection: ['Fairy', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'clefairybaseset': {title: 'clefairybaseset', name: 'Clefairy (Base Set)', card: 'http://i.imgur.com/dAR5JS3.jpg?1', publicid: '35BS', rarity: 'Mythic', collection: ['Colorless', 'NFE', 'Gen1'], points: 20},
        'cloyster': {title: 'cloyster', name: 'Cloyster', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_32.png', publicid: '91', rarity: 'Uncommon', collection: ['Water', 'UU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'combusken': {title: 'combusken', name: 'Combusken', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_27.png', publicid: '256', rarity: 'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'combusken2': {title: 'combusken2', name: 'Combusken', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_13.png', publicid: '256a', rarity: 'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Furious Fists', 'Gen3'], points: 3},
        'conkeldurr': {title: 'conkeldurr', name: 'Conkeldurr', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_67.png', publicid: '534', rarity: 'Rare', collection: ['Fighting', 'OU-Pack', 'XY-Base', 'Gen5'], points: 6},
        'corphish': {title: 'corphish', name: 'Corphish', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_42.png', publicid: '341', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'corsola': {title: 'corsola', name: 'Corsola', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_36.png', publicid: '222', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'crawdaunt': {title: 'crawdaunt', name: 'Crawdaunt', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_92.png', publicid: '342', rarity: 'Uncommon', collection: ['Darkness', 'BL-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'crobat': {title: 'crobat', name: 'Crobat', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_33.png', publicid: '169', rarity: 'Rare', collection: ['Psychic', 'UU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 6},
        'croconaw': {title: 'croconaw', name: 'Croconaw', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_16.png', publicid: '159', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Phantom Forces', 'Gen2'], points: 3},
        'crushinghammer': {title: 'crushinghammer', name: 'Crushing Hammer', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_34.png', publicid: 'cshhamr', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Kalos Starter Set'], points: 1},
        'cubchoo': {title: 'cubchoo', name: 'Cubchoo', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_21.png', publicid: '613', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'darknessenergy': {title: 'darknessenergy', name: 'Darkness Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_138.png', publicid: 'darke', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Darkness'], points: 1},
        'darkrai': {title: 'darkrai', name: 'Darkrai', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY22.png', publicid: '491', rarity: 'Rare', collection: ['Darkness', 'Ubers', 'XY-Promo', 'Gen4', 'Legendary', 'Event'], points: 6},
        'dedenne': {title: 'dedenne', name: 'Dedenne', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_70.png', publicid: '702', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'dedenne2': {title: 'dedenne2', name: 'Dedenne', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_34.png', publicid: '702a', rarity: 'Common', collection: ['Lightning', 'PU-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'deino': {title: 'deino', name: 'Deino', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_72.png', publicid: '633', rarity: 'Common', collection: ['Dragon', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'delcatty': {title: 'delcatty', name: 'Delcatty', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_114.png', publicid: '301', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'delcatty2': {title: 'delcatty2', name: 'Delcatty', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_105.png', publicid: '301a', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Base', 'Gen3'], points: 3},
        'delphox': {title: 'delphox', name: 'Delphox', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_26.png', publicid: '655', rarity: 'Rare', collection: ['Fire', 'RU-Pack', 'XY-Base', 'Gen6'], points: 6},
        'delphox2': {title: 'delphox2', name: 'Delphox', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_10.png', publicid: '655a', rarity: 'Rare', collection: ['Fire', 'RU-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 6},
        'delphoxex': {title: 'delphoxex', name: 'Delphox EX', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY19.png', publicid: '655EX', rarity: 'Epic', collection: ['Fire', 'RU-Pack', 'XY-Promo', 'EX-Pack', 'Gen6'], points: 10},
        'deoxys': {title: 'deoxys', name: 'Deoxys', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_33.png', publicid: '386', rarity: 'Rare', collection: ['Psychic', 'Legendary', 'Event', 'Uber-Pack', 'XY-Roaring Skies', 'Gen3'], points: 6},
        'dialgaex': {title: 'dialgaex', name: 'Dialga EX', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_62.png', publicid: '483EX', rarity: 'Epic', collection: ['Metal', 'Legendary', 'Uber-Pack', 'XY-Phantom Forces', 'Gen4'],  points: 10},
        'diancie': {title: 'diancie', name: 'Diancie', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_71.png', publicid: '719', rarity: 'Rare', collection: ['Fairy', 'Legendary', 'Event', 'OU-Pack', 'XY-Primal Clash', 'Gen6', 'EX-Pack'], points: 6},
        'diancieex': {title: 'diancieex', name: 'Diancie EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY43.png', publicid: '719a', rarity: 'Epic', collection: ['Fairy', 'Legendary', 'EX-Pack', 'OU-Pack', 'XY-Promo', 'Gen6', 'Event'], points: 10},
        'diggersby': {title: 'diggersby', name: 'Diggersby', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_90.png', publicid: '660', rarity: 'Uncommon', collection: ['Fighting', 'BL-Pack', 'XY-Primal Clash', 'Gen6'], points: 3},
        'diggersby2': {title: 'diggersby2', name: 'Diggersby', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_112.png', publicid: '660a', rarity: 'Uncommon', collection: ['Colorless', 'BL-Pack', 'XY-Base', 'Gen6'], points: 3},
        'diggersby3': {title: 'diggersby3', name: 'Diggersby', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_88.png', publicid: '660b', rarity: 'Uncommon', collection: ['Colorless', 'BL-Pack', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'diglett': {title: 'diglett', name: 'Diglett', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_58.png', publicid: '50', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'dimensionvalley': {title: 'dimensionvalley', name: 'Dimension Valley', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_93.png', publicid: 'dimva', rarity: 'Rare', collection: ['Stadium', 'Trainer', 'XY-Phantom Forces'], points: 6},
        'ditto': {title: 'ditto', name: 'Ditto', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY40.png', publicid: '132', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Promo', 'Gen1'], points: 3},
        'diveball': {title: 'diveball', name: 'Dive Ball', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_125.png', publicid: 'divb', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 1},
        'dodrio': {title: 'dodrio', name: 'Dodrio', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_99.png', publicid: '85', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'doduo': {title: 'duduo', name: 'Doduo', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_98.png', publicid: '84', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'doublade': {title: 'doublade', name: 'Doublade', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_99.png', publicid: '680', rarity: 'Uncommon', collection: ['Metal', 'UU-Pack', 'XY-Primal Clash', 'Gen6'], points: 3},
        'doublade2': {title: 'doublade2', name: 'Doublade', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_84.png', publicid: '680a', rarity: 'Uncommon', collection: ['Metal', 'UU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'doubleaquaenergy': {title: 'doubleaquaenergy', name: 'Double Aqua Energy', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_33.png', publicid: 'daen', rarity: 'Epic', collection: ['Energy','Special Energy', 'Double Crisis', 'Aqua', 'Water'], points: 10},
        'doublecolorlessenergy': {title: 'doublecolorlessenergy', name: 'Double Colorless Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_130.png', publicid: 'dcen', rarity: 'Epic', collection: ['Energy','Special Energy', 'XY', 'Colorless'], points: 10},
        'doubledragonenergy': {title: 'doubledragonenergy', name: 'Double Dragon Energy', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_97.png', publicid: 'dden', rarity: 'Epic', collection: ['Energy','Special Energy', 'XY-Roaring Skies', 'Dragon'], points: 10},
        'doublemagmaenergy': {title: 'doublemagmaenergy', name: 'Double Magma Energy', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_34.png', publicid: 'dmen', rarity: 'Epic', collection: ['Energy','Special Energy', 'Double Crisis', 'Magma', 'Fire'], points: 10},
        'dragalge': {title: 'dragalge', name: 'Dragalge', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY10.png', publicid: '691', rarity: 'Uncommon', collection: ['Dragon', 'UU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'dragalge2': {title: 'dragalge2', name: 'Dragalge', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_71.png', publicid: '691a', rarity: 'Rare', collection: ['Dragon', 'UU-Pack', 'XY-Flashfire', 'Gen6'], points: 10},
        'dragonair': {title: 'dragonair', name: 'Dragonair', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_50.png', publicid: '148', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Roaring Skies', 'Gen1'], points: 3},
        'dragonite': {title: 'dragonite', name: 'Dragonite', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_51.png', publicid: '149', rarity: 'Rare', collection: ['Dragon', 'OU-Pack', 'XY-Roaring Skies', 'Gen1', 'Pseudo'], points: 6},
        'dragonitedelta': {title: 'dragonitedelta', name: 'Dragonite (Delta)', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_52.png', publicid: '149D', rarity: 'Epic', collection: ['Dragon', 'OU-Pack', 'XY-Roaring Skies', 'Gen1', 'Pseudo', 'Delta'], points: 10},
        'dragoniteex': {title: 'dragoniteex', name: 'Dragonite EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_74.png', publicid: '149EX', rarity: 'Epic', collection: ['Dragon', 'OU-Pack', 'XY-Furious Fists', 'Gen1', 'EX-Pack'], points: 10},
        'dragoniteexfull': {title: 'dragoniteexfull', name: 'Dragonite EX (Full)', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_108.png', publicid: '149EXa', rarity: 'Legendary', collection: ['Dragon', 'OU-Pack', 'XY-Furious Fists', 'Full', 'EX-Pack'], points: 15},
        'drapion': {title: 'drapion', name: 'Drapion', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_65.png', publicid: '452', rarity: 'Uncommon', collection: ['Darkness', 'RU-Pack', 'XY-Furious Fists', 'Gen4'], points: 3},
        'dratini': {title: 'dratini', name: 'Dratini', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_49.png', publicid: '147', rarity: 'Common', collection: ['Dragon', 'LC-Pack', 'XY-Roaring Skies', 'Gen1'], points: 1},
        'drillbur': {title: 'drillbur', name: 'Drillbur', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_89.png', publicid: '529', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Primal Clash', 'Gen6'], points: 1},
        'drowzee': {title: 'drowzee', name: 'Drowzee', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_35.png', publicid: '96', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Furious Fists', 'Gen1'], points: 1},
        'druddigon': {title: 'druddigon', name: 'Druddigon', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_70.png', publicid: '621', rarity: 'Uncommon', collection: ['Dragon', 'RU-Pack', 'XY-Flashfire', 'Gen5'], points: 10},
        'dugtrio': {title: 'dugtrio', name: 'Dugtrio', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_59.png', publicid: '51', rarity: 'Uncommon', collection: ['Fighting', 'RU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'dunsparce': {title: 'dunsparce', name: 'Dunsparce', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_68.png', publicid: '206', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Roaring Skies', 'Gen2'], points: 3},
        'dunsparce2': {title: 'dunsparce2', name: 'Dunsparce', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_101.png', publicid: '206a', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Base', 'Gen2'], points: 3},
        'durant': {title: 'durant', name: 'Durant', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_61.png', publicid: '632', rarity: 'Uncommon', collection: ['Darkness','RU-Pack' ,'XY-Flashfire' ,'Gen5',], points: 3},
        'dusclops': {title: 'dusclops', name: 'Dusclops', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_39.png', publicid: '355', rarity: 'Uncommon', collection: ['Psychic', 'NFE', 'XY-Flashfire', 'Gen3'], points: 3},
        'dusknoir': {title: 'dusknoir', name: 'Dusknoir', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_40.png', publicid: '477', rarity: 'Rare', collection: ['Psychic', 'PU-Pack', 'XY-Flashfire', 'Gen4'], points: 6},
        'duskull': {title: 'duskull', name: 'Duskull', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_38.png', publicid: '355', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Flashfire', 'Gen3'], points: 1},
        'dustox': {title: 'dustox', name: 'Dustox', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_7.png', publicid: '269', rarity: 'Rare', collection: ['Grass', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 6},
        'dustoxdelta': {title: 'dustoxdelta', name: 'Dustox', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_8.png', publicid: '269', rarity: 'Rare', collection: ['Grass', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 6},
        'eelektrik': {title: 'eelektrik', name: 'Eelektrik', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_63.png', publicid: '603', rarity: 'Uncommon', collection: ['Lightning', 'NFE', 'XY-Primal Clash', 'Gen5'], points: 3},
        'eelektrikdelta': {title: 'eelektrikedelta', name: 'Eelektrik (Delta)', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_64.png', publicid: '603D', rarity: 'Rare', collection: ['Lightning', 'NFE', 'XY-Primal Clash', 'Gen5', 'Delta'], points: 6},
        'eelektross': {title: 'eelektross', name: 'Eelektross', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_65.png', publicid: '604', rarity: 'Rare', collection: ['Lightning', 'RU-Pack', 'XY-Primal Clash', 'Gen5'], points: 6},
        'eevee': {title: 'eevee', name: 'Eevee', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_80.png', publicid: '133', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'ekans': {title: 'ekans', name: 'Ekans', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_47.png', publicid: '23', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'electabuzz': {title: 'electabuzz', name: 'Electabuzz', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_29.png', publicid: '125', rarity: 'Uncommon', collection: ['Lightning', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'electivire': {title: 'electivire', name: 'Electivire', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_30.png', publicid: '466', rarity: 'Rare', collection: ['Lightning', 'NU-Pack', 'XY-Furious Fists', 'Gen4'], points: 6},
        'electrike': {title: 'electrike', name: 'Electrike', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_24.png', publicid: '309', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'electrike2': {title: 'electrike2', name: 'Electrike', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_59.png', publicid: '309a', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'electrikedelta': {title: 'elektrikedelta', name: 'Electrike (Delta)', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_60.png', publicid: '309D', rarity: 'Uncommon', collection: ['Lightning', 'LC-Pack', 'XY-Primal Clash', 'Gen3', 'Delta'], points: 3},
        'electrode': {title: 'electrode', name: 'Electrode', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_22.png', publicid: '101', rarity: 'Uncommon', collection: ['Lightning', 'PU-Pack', 'XY-Roaring Skies', 'Gen1'], points: 3},
        'electrode2': {title: 'electrode2', name: 'Electrode', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_45.png', publicid: '101a', rarity: 'Uncommon', collection: ['Lightning', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'emolgaex': {title: 'emolgaex', name: 'Emolga EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_46.png', publicid: '587', rarity: 'Epic', collection: ['Lightning', 'PU-Pack', 'XY-Base', 'Gen5', 'EX-Pack'], points: 10},
        'emolgaexfull': {title: 'emolgaexfull', name: 'Emolga EX (Full)', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_143.png', publicid: '587a', rarity: 'Legendary', collection: ['Lightning', 'PU-Pack', 'XY-Base', 'Gen5', 'EX-Pack', 'Full'], points: 15},
        'enchancedhammer': {title: 'enchancedhammer', name: 'Enhanced Hammer', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_94.png', publicid: 'enham', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Phantom Forces'], points: 3},
        'energyretrieval': {title: 'energyretrieval', name: 'Energy Retrieval', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_126.png', publicid: 'enret', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 1},
        'energyswitch': {title: 'energyswitch', name: 'Energy Switch', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_89.png', publicid: 'enswi', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Furious Fists'], points: 1},
        'escaperope': {title: 'escaperope', name: 'Escape Rope', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_127.png', publicid: 'escrp', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 1},
        'escavalier': {title: 'escavalier', name: 'Escavalier', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_64.png', publicid: '589', rarity: 'Uncommon', collection: ['Metal', 'RU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 3},
        'espurr': {title: 'espurr', name: 'Espurr', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_42.png', publicid: '677', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'evosoda': {title: 'evosoda', name: 'Evo Soda', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_116.png', publicid: 'evos', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'excadrill': {title: 'excadrill', name: 'Excadrill', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_96.png', publicid: '530', rarity: 'Uncommon', collection: ['Metal', 'OU-Pack', 'XY-Primal Clash', 'Gen5'], points: 3},
        'excadrilldelta': {title: 'excadrilldelta', name: 'Excadrill (Delta)', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_97.png', publicid: '530D', rarity: 'Rare', collection: ['Metal', 'OU-Pack', 'XY-Primal Clash', 'Gen5', 'Delta'], points: 6},
        'exeggcute': {title: 'exeggcute', name: 'Exeggcute', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_1.png', publicid:'102', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Roaring Skies', 'Gen1'], points: 1},
        'exeggutor': {title: 'exeggutor', name: 'Exeggutor', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_2.png', publicid:'103', rarity:'Uncommon', collection: ['Grass', 'NU-Pack', 'XY-Roaring Skies', 'Gen1'], points: 3},
        'exploud': {title: 'exploud', name: 'Exploud', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_85.png', publicid: '295', rarity: 'Rare', collection: ['Colorless', 'RU-Pack', 'XY-Phantom Forces', 'Gen3'], points: 6},
        'expshare': {title: 'expshare', name: 'EXP Share', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_128.png', publicid: 'expsh', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 3},
        'fairyenergy': {title: 'fairyenergy', name: 'Fairy Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_140.png', publicid: 'faire', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Fairy'], points: 1},
        'fairygarden': {title: 'fairygarden', name: 'Fairy Garden', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_117.png', publicid: 'fairg', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Base'], points: 6},
        'farfetchd': {title: 'farfetchd', name: 'Farfetch\'d', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_25.png', publicid: '83', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Kalos Starter Set', 'Gen1'], points: 3},
        'fearow': {title: 'fearow', name: 'Fearow', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_79.png', publicid: '22', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Phantom Forces', 'Gen1'], points: 3},
        'fearow': {title: 'fearow', name: 'Fearow', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_66.png', publicid: '23', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Roaring Skies', 'Gen1'], points: 3},
        'feebas': {title: 'feebas', name: 'Feebas', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_43.png', publicid: '349', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'feebas2': {title: 'feebas2', name: 'Feebas', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_22.png', publicid: '349a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Flashfire', 'Gen3'], points: 1},
        'fennekin': {title: 'fennekin', name: 'Fennekin', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY02.png', publicid: '653', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Promo', 'Gen6'], points: 1},
        'fennekin2': {title: 'fennekin2', name: 'Fennekin', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_8.png', publicid: '653b', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'fennekin3': {title: 'fennekin3', name: 'Fennekin', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_24.png', publicid: '653a', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'feraligatr': {title: 'feraligatr', name: 'Feraligatr', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_17.png', publicid: '159', rarity: 'Rare', collection: ['Water', 'UU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 6},
        'fierytorch': {title: 'fierytorch', name: 'Fiery Torch', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_89.png', publicid: 'fiet', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Flashfire', 'Gen6'], points: 3},
        'fightingenergy': {title: 'fightingenergy', name: 'Fighting Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_137.png', publicid: 'fighe', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Fighting'], points: 1},
        'fightingstadium': {title: 'fightingstadium', name: 'Fighting Stadium', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_90.png', publicid: 'figsta', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Furious Fists'], points: 6}, 
        'finneon': {title: 'finneon', name: 'Finneon', card:    'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_18.png', publicid: '456', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Phantom Forces', 'Gen4'], points: 1},
        'fireenergy': {title: 'fireenergy', name: 'Fire Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_101.png', publicid: 'firee', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Fire'], points: 1},
        'flabebe': {title: 'flabebe', name: 'Flabebe', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_62.png', publicid: '669', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'flabebe2': {title: 'flabebe2', name: 'Flabebe', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_63.png', publicid: '669a', rarity: 'Common', collection: ['Fairy','LC-Pack' ,'XY-Flashfire' ,'Gen6',], points: 1},
        'fletchinder': {title: 'fletchinder', name: 'Fletchinder', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_14.png', publicid: '662', rarity:'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Roaring Skies', 'Gen6'], points: 3},
        'fletchinder2': {title: 'fletchinder2', name: 'Fletchinder', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_9.png', publicid: '662a', rarity:'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'fletchinder3': {title: 'fletchinder3', name: 'Fletchinder', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_17.png', publicid: '662b', rarity: 'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'fletchinder4': {title: 'fletchinder4', name: 'Fletchinder', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_27.png', publicid: '662c', rarity: 'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'fletchling': {title: 'fletchling', name: 'Fletchling', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_82.png', publicid: '661', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Roaring Skies', 'Gen6'], points: 1},
        'fletchling2': {title: 'fletchling2', name: 'Fletchling', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_113.png', publicid: '661a', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'fletchling3': {title: 'fletchling3', name: 'Fletchling', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_89.png', publicid: '661b', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'fletchling4': {title: 'fletchling4', name: 'Fletchling', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_86.png', publicid: '661c', rarity: 'Common', collection: ['Colorless','LC-Pack' ,'XY-Flashfire' ,'Gen6',], points: 1},
        'fletchling5': {title: 'fletchling5', name: 'Fletchling', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_31.png', publicid: '661e', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'floatzel': {title: 'floatzel', name: 'Floatzel', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_29.png', publicid: '419', rarity: 'Uncommon', collection: ['water','PU-Pack' ,'XY-Flashfire' ,'Gen4',], points: 6},
        'floette': {title: 'floette', name: 'Floette', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_64.png', publicid: '670', rarity: 'Uncommon', collection: ['Fairy','NFE' ,'XY-Flashfire' ,'Gen6',], points: 1},
        'floette2': {title: 'floette2', name: 'Floette', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_65.png', publicid: '670a', rarity: 'Uncommon', collection: ['Fairy','NFE' ,'XY-Flashfire' ,'Gen6',], points: 1},
        'florges': {title: 'florges', name: 'Florges', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_66.png', publicid: '671', rarity: 'Rare', collection: ['Fairy','UU-Pack' ,'XY-Flashfire' ,'Gen6',], points: 3},
        'florgesex': {title: 'florgesex', name: 'Florges EX', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_67.png', publicid: '671EX', rarity: 'Epic', collection: ['Fairy', 'UU-Pack', 'XY-Phantom Forces', 'Gen6', 'EX-Pack'], points: 10},
        'florgesexfull': {title: 'florgesexfull', name: 'Florges EX (Full)', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_116.png', publicid: '671EXa', rarity: 'Legendary', collection: ['Fairy', 'UU-Pack', 'XY-Phantom Forces', 'Gen6', 'EX-Pack', 'Full'], points: 15},
        'flygon': {title: 'flygon', name: 'Flygon', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_110.png', publicid: '330', rarity: 'Rare', collection: ['RU-Pack', 'Dragon', 'XY-Primal Clash', 'Gen3'], points: 6},
        'flygon2': {title: 'flygon2', name: 'Flygon', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_76.png', publicid: '330a', rarity: 'Rare', collection: ['Dragon', 'RU-Pack', 'XY-Furious Fists', 'Gen3'], points: 6},
        'focussash': {title: 'focussash', name: 'Focus Sash', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_91.png', publicid: 'focuss', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Furious Fists'], points: 3}, 
        'forretress': {title: 'forretress', name: 'Forretress', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_60.png', publicid: '205', rarity: 'Uncommon', collection: ['Metal','UU-Pack' ,'XY-Flashfire' ,'Gen2',], points: 3},
        'fossilresearcher': {title: 'fossilresearcher', name: 'Fossil Researcher', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_92.png', publicid: 'fossilres', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Furious Fists'], points: 10},
        'fossilresearcherfull': {title: 'fossilresearcherfull', name: 'Fossil Researcher (Full)', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_110.png', publicid: 'fossilresa', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Furious Fists', 'Full'], points: 15},
        'freshwaterset': {title: 'freshwaterset', name: 'Fresh Water Set', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_129.png', publicid: 'frshwat', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Primal Clash'], points: 1},
        'frillish': {title: 'frillish', name: 'Frillish', card:    'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_20.png', publicid: '592', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'froakie': {title: 'froakie', name: 'Froakie', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY03.png', publicid: '656', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Promo', 'Gen6'], points: 1},
        'froakie2': {title: 'froakie2', name: 'Froakie', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_12.png', publicid: '656b', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'froakie3': {title: 'froakie3', name: 'Froakie', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_39.png', publicid: '656a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'frogadier': {title: 'frogadier', name: 'Frogadier', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_40.png', publicid: '657', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Base', 'Gen6'], points: 3},
        'frogadier2': {title: 'frogadier2', name: 'Frogadier', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_13.png', publicid: '657a', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Kalos Starter Set', 'Gen6'], points: 3},
        'fullheal': {title: 'fullheal', name: 'Full Heal', card:'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_93.png', publicid: 'fullheal', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Furious Fists'], points: 1}, 
        'furfrou': {title: 'furfrou', name: 'Furfrou', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_90.png', publicid: '676', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'furfrou2': {title: 'furfrou2', name: 'Furfrou', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_114.png', publicid: '676a', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'furfrou3': {title: 'furfrou3', name: 'Furfrou', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_87.png', publicid: '676b', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'furfrou4': {title: 'furfrou4', name: 'Furfrou', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_32.png', publicid: '657c', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 3},
        'furfrou5': {title: 'furfrou5', name: 'Furfrou', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_33.png', publicid: '657e', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 3},
        'furret': {title: 'furret', name: 'Furret', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_82.png', publicid: '162', rarity: 'Uncommon', collection: ['Colorless','PU-Pack' ,'XY-Flashfire' ,'Gen2',], points: 3},
        'galladeex': {title: 'galladeex', name: 'Gallade EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_34.png', publicid: '475EX', rarity: 'Epic', collection: ['Psychic', 'BL3-Pack', 'XY-Roaring Skies', 'Gen4', 'EX-Pack'], points: 10},
        'galladeexfull': {title: 'galladeex', name: 'Gallade EX (Full)', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_99.png', publicid: '475EXa', rarity: 'Legendary', collection: ['Psychic', 'BL3-Pack', 'XY-Roaring Skies', 'Gen4', 'EX-Pack', 'Full'], points: 15},
        'galladespiritlink': {title: 'galladespiritlink', name: 'Gallade Spirit Link', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_83.png', publicid: 'gldsp', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Roaring Skies'], points: 1},
        'galvantula': {title: 'galvantula', name: 'Galvantula', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_27.png', publicid: '596', rarity: 'Rare', collection: ['Lightning', 'UU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 6},
        'garchompex': {title: 'garchompex', name: 'Garchomp EX', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY09.png', publicid: '445EX', rarity: 'Epic', collection: ['Dragon', 'OU-Pack', 'XY-Promo', 'EX-Pack', 'Gen4'], points: 10},
        'gardevoirex': {title: 'gardevoirex', name: 'Gardevoir EX', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_105.png', publicid: '282EX', rarity: 'Epic', collection: ['Fairy', 'OU-Pack', 'XY-Primal Clash', 'EX-Pack', 'Gen3'], points: 10},
        'gardevoirexfull': {title: 'gardevoirexfull', name: 'Gardevoir EX (Full)', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_155.png', publicid: '282EXa', rarity: 'Legendary', collection: ['Fairy', 'OU-Pack', 'XY-Primal Clash', 'EX-Pack', 'Gen3', 'Full'], points: 15},
        'gardevoirspiritlink': {title: 'gardevoirspiritlink', name: 'Gardevoir Spirit Link', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_130.png', publicid: 'gardsp', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Roaring Skies'], points: 1},
        'gengarex': {title: 'gengarex', name: 'Gengar EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_34.png', publicid: '94EX', rarity: 'Epic', collection: ['Psychic', 'OU-Pack', 'XY-Phantom Forces', 'EX-Pack', 'Gen1'], points: 10},
        'gengarexfull': {title: 'gengarexfull', name: 'Gengar EX (Full)', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_114.png', publicid: '94EXa', rarity: 'Legendary', collection: ['Psychic', 'OU-Pack', 'XY-Phantom Forces', 'EX-Pack', 'Gen1', 'Full'], points: 15},
        'gengarspiritlink': {title: 'gengarspiritlink', name: 'Gengar Spirit Link', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_95.png', publicid: 'gensp', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Phantom Forces'], points: 1},
        'geodude': {title: 'geodude', name: 'Geodude', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_45.png', publicid: '74', rarity: 'Common', collection: ['Fighting','LC-Pack' ,'XY-Flashfire' ,'Gen1',], points: 1},
        'gigalith': {title: 'gigalith', name: 'Gigalith', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_50.png', publicid: '526', rarity: 'Rare', collection: ['Fighting', 'PU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 6},
        'girafarig': {title: 'girafarig', name: 'Girafarig', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_82.png', publicid: '203', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 3},
        'glaceon': {title: 'glaceon', name: 'Glaceon', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_18.png', publicid: '471', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Furious Fists', 'Gen4'], points: 3},
        'gligar': {title: 'gligar', name: 'Gligar', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_36.png', publicid: '207', rarity: 'Common', collection: ['Fighting', 'UU-Pack', 'XY-Roaring Skies', 'Gen2'], points: 1},
        'gligar2': {title: 'gligar2', name: 'Gligar', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_46.png', publicid: '207', rarity: 'Common', collection: ['Fighting', 'UU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 1},
        'gliscor': {title: 'gliscor', name: 'Gliscor', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_37.png', publicid: '472', rarity: 'Uncommon', collection: ['Fighting', 'OU-Pack', 'XY-Roaring Skies', 'Gen4'], points: 3},
        'gliscor2': {title: 'gliscor2', name: 'Gliscor', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_47.png', publicid: '472', rarity: 'Rare', collection: ['Fighting', 'OU-Pack', 'XY-Phantom Forces', 'Gen4'], points: 6},
        'gogoat': {title: 'gogoat', name: 'Gogoat', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY16.png', publicid: '673', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'gogoat2': {title: 'gogoat2', name: 'Gogoat', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_19.png', publicid: '673a', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'golbat': {title: 'golbat', name: 'Golbat', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_32.png', publicid: '42', rarity: 'Uncommon', collection: ['Psychic', 'RU-Pack', 'XY-Phantom Forces', 'Gen1'], points: 3},
        'golem': {title: 'golem', name: 'Golem', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_46.png', publicid: '76', rarity: 'Rare', collection: ['Fighting','PU-Pack' ,'XY-Flashfire' ,'Gen1',], points: 6},
        'golett': {title: 'golett', name: 'Golett', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_42.png', publicid: '622', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'golurk': {title: 'golurk', name: 'Golurk', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_43.png', publicid: '623', rarity: 'Uncommon', collection: ['Psychic', 'NU-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'goodra': {title: 'goodra', name: 'Goodra', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_77.png', publicid: '706', rarity: 'Rare', collection: ['Dragon', 'UU-Pack', 'XY-Phantom Forces', 'Gen6', 'Pseudo'], points: 6},
        'goodra2': {title: 'goodra2', name: 'Goodra', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_74.png', publicid: '706a', rarity: 'Rare', collection: ['Dragon', 'UU-Pack' ,'XY-Flashfire' ,'Gen6'], points: 6},
        'goomy': {title: 'goomy', name: 'Goomy', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_75.png', publicid: '704', rarity: 'Common', collection: ['Dragon', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'goomy2': {title: 'goomy2', name: 'Goomy', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_72.png', publicid: '704a', rarity: 'Common', collection: ['Dragon','LC-Pack' ,'XY-Flashfire' ,'Gen6',], points: 1},
        'gorebyss': {title: 'gorebyss', name: 'Gorebyss', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_51.png', publicid: '368', rarity: 'Uncommon', collection: ['Water', 'NU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'gorebyssdelta': {title: 'gorebyssdelta', name: 'Gorebyss (Delta)', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_52.png', publicid: '368D', rarity: 'Rare', collection: ['Water', 'NU-Pack', 'XY-Primal Clash', 'Gen3', 'Delta'], points: 6},
        'gothita': {title: 'gothita', name: 'Gothita', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_39.png', publicid: '574', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'gothitelle': {title: 'gothitelle', name: 'Gothitelle', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_41.png', publicid: '576', rarity: 'Rare', collection: ['Psychic', 'OU-Pack', 'XY-Furious Fists', 'Gen5'], points: 6},
        'gothorita': {title: 'gothorita', name: 'Gothorita', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_40.png', publicid: '575', rarity: 'Uncommon', collection: ['Psychic', 'NFE', 'XY-Furious Fists', 'Gen5'], points: 3},
        'gourgeist': {title: 'gourgeist', name: 'Gourgeist', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_45.png', publicid: '711', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'gourgeist2': {title: 'gourgeist2', name: 'Gourgeist', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_57.png', publicid: '711a', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'granbull': {title: 'granbull', name: 'Granbull', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_23.png', publicid: '210', rarity: 'Uncommon', collection: ['Fairy', 'NU-Pack', 'XY-Kalos Starter Set', 'Gen2'], points: 3},
        'grassenergy': {title: 'grassenergy', name: 'Grass Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_132.png', publicid: 'grase', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Grass'], points: 1},
        'graveler': {title: 'graveler', name: 'Graveler', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_46.png', publicid: '75', rarity: 'Uncommon', collection: ['Fighting','NFE' ,'XY-Flashfire' ,'Gen1',], points: 3},
        'greatball': {title: 'greatball', name: 'Great Ball', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_113.png', publicid: 'greb', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'greninja': {title: 'greninja', name: 'Greninja', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY24.png', publicid: '658', rarity: 'Rare', collection: ['Darkness', 'Ubers', 'XY-Promo', 'Gen6'], points: 6},
        'greninja2': {title: 'greninja2', name: 'Greninja', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_41.png', publicid: '658a', rarity: 'Rare', collection: ['Water', 'Uber-Pack', 'XY-Base', 'Gen6'], points: 6},
        'greninja3': {title: 'greninja3', name: 'Greninja', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_14.png', publicid: '658', rarity: 'Rare', collection: ['Water', 'Ubers', 'XY-Kalos Starter Set', 'Gen6'], points: 6},
        'greninjaex': {title: 'greninjaex', name: 'Greninja EX', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY20.png', publicid: '658EX', rarity: 'Epic', collection: ['Water', 'Ubers', 'XY-Promo', 'EX-Pack', 'Gen6'], points: 10},
        'grimeraqua': {title: 'grimeraqua', name: 'Grimer', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_7.png', publicid: '88aq', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 1},
        'groudon': {title: 'groudon', name: 'Groudon', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_84.png', publicid: '383', rarity: 'Rare', collection: ['Fighting', 'Uber-Pack', 'XY-Primal Clash', 'Gen3', 'Legendary'], points: 6},
        'groudonex': {title: 'groudonex', name: 'Groudon EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_85.png', publicid: '383EX', rarity: 'Epic', collection: ['Fighting', 'Uber-Pack', 'XY-Primal Clash', 'Gen3', 'Legendary', 'EX-Pack'], points: 10},
        'groudonex2': {title: 'groudonex2', name: 'Groudon EX', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY42.png', publicid: '383EXa', rarity: 'Epic', collection: ['Fighting', 'Uber-Pack', 'XY-Promo', 'Gen3', 'Legendary', 'EX-Pack'], points: 10},
        'groudonexfull': {title: 'groudonexfull', name: 'Groudon EX (Full)', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_150.png', publicid: '383EXa', rarity: 'Legendary', collection: ['Fighting', 'Uber-Pack', 'XY-Primal Clash', 'Gen3', 'Legendary', 'EX-Pack', 'Full'], points: 15},
        'groudonexmagma': {title: 'groudonexmagma', name: 'Groudon EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_15.png', publicid: '383EXmag', rarity: 'Legendary', collection: ['Fighting', 'Uber-Pack', 'Magma', 'Double Crisis', 'Legendary', 'Gen3', 'EX-Pack'], points: 15},
        'groudonspiritlink': {title: 'groudonspiritlink', name: 'Groudon Spirit Link', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_131.png', publicid: 'grdsp', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 1},
        'grovyle': {title: 'grovyle', name: 'Grovyle', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_7.png', publicid: '253', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Primal Clash', 'Gen3'], points: 3},
        'grumpig': {title: 'grumpig', name: 'Grumpig', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_50.png', publicid: '326', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'gulpin': {title: 'gulpin', name: 'Gulpin', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_37.png', publicid: '316', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Phantom Forces', 'Gen3'], points: 1},
        'gurdurr': {title: 'gurdurr', name: 'Gurdurr', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_66.png', publicid: '533', rarity: 'Uncommon', collection: ['Fighting', 'NU-Pack', 'XY-Base', 'Gen5'], points: 3},
        'gyaradosbaseset': {title: 'gyaradosbaseset', name: 'Gyarados (Base Set)', card: 'http://i.imgur.com/XVMJyeN.jpg?1', publicid: '130BS', rarity: 'Mythic', collection: ['Water', 'OU-Pack', 'Gen1'], points: 20},
        'handscope': {title: 'handscope', name: 'Hand Scope', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_96.png', publicid: 'hndsc', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Phantom Forces'], points: 1},
        'hardcharm': {title: 'hardcharm', name: 'Hard Charm', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_119.png', publicid: 'hrdch', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'hariyama': {title: 'hariyama', name: 'Hariyama', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_52.png', publicid: '297', rarity: 'Uncommon', collection: ['Fighting', 'NU-Pack', 'XY-Furious Fists', 'Gen3'], points: 3},
        'hawlucha': {title: 'hawlucha', name: 'Hawlucha', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_39.png', publicid: '701', rarity: 'Uncommon', collection: ['Fighting', 'BL-Pack', 'XY-Roaring Skies', 'Gen6'], points: 3},
        'hawlucha2': {title: 'hawlucha2', name: 'Hawlucha', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_63.png', publicid: '701a', rarity: 'Uncommon', collection: ['Fighting', 'BL-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'hawluchaex': {title: 'hawluchaex', name: 'Hawlucha EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_64.png', publicid: '701EX', rarity: 'Epic', collection: ['Fighting', 'BL-Pack', 'XY-Furious Fists', 'Gen6', 'EX-Pack'], points: 10},
        'headringer': {title: 'headringer', name: 'Head Ringer', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_97.png', publicid: 'hdrin', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Phantom Forces', 'Flare'], points: 3},
        'healingscarf': {title: 'healingscarf', name: 'Healing Scarf', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_84.png', publicid: 'hlgsc', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Roaring Skies'], points: 3},
        'heatran': {title: 'heatran', name: 'Heatran', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_63.png', publicid: '485', rarity: 'Rare', collection: ['Metal', 'XY-Phantom Forces', 'OU-Pack', 'Gen4', 'Legendary'], points: 6},
        'heliolisk': {title: 'heliolisk', name: 'Heliolisk', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_30.png', publicid: '695', rarity: 'Uncommon', collection: ['Lightning', 'UU-Pack', 'XY-Phantom Forces', 'Gen6'], points: 6},
        'heliolisk2': {title: 'heliolisk2', name: 'Heliolisk', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY47.png', publicid: '695b', rarity: 'Uncommon', collection: ['Lightning', 'UU-Pack', 'XY-Promo', 'Gen6'], points: 6},
        'heliolisk3': {title: 'heliolisk3', name: 'Heliolisk', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_37.png', publicid: '695a', rarity: 'Uncommon', collection: ['Lightning', 'UU-Pack', 'XY-Flashfire', 'Gen6'], points: 6},
        'helioptile': {title: 'helioptile', name: 'Helioptile', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_28.png', publicid: '694', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'helioptile2': {title: 'helioptile2', name: 'Helioptile', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_29.png', publicid: '694a', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'helioptile3': {title: 'helioptile3', name: 'Helioptile', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_36.png', publicid: '694b', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'heracrossex': {title: 'heracrossex', name: 'Heracross EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_4.png', publicid: '214EX', rarity: 'Epic', collection: ['Grass', 'UU-Pack', 'XY-Furious Fists', 'Gen2', 'EX-Pack'], points: 10},
        'heracrossexfull': {title: 'heracrossexfull', name: 'Heracross EX (Full)', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_105.png', publicid: '214EXa', rarity: 'Legendary', collection: ['Grass', 'UU-Pack', 'XY-Furious Fists', 'EX-Pack', 'Gen2', 'Full'], points: 15},
        'herbalenergy': {title: 'herbalenergy', name: 'Herbal Energy', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_103.png', publicid: 'hera', rarity: 'Rare', collection: ['Special Energy', 'Energy', 'XY-Furious Fists', 'Grass'], points: 6},
        'herdier': {title: 'herdier', name: 'Herdier', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_109.png', publicid: '507', rarity: 'Uncommon', collection: ['Colorless', 'NFE', 'XY-Base', 'Gen5'], points: 3},
        'hippopotas': {title: 'hippopotas', name: 'Hippopotas', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_87.png', publicid: '449', rarity: 'Common', collection: ['Fighting', 'Gen4', 'LC-Pack', 'XY-Primal Clash'], points: 1},
        'hippowdon': {title: 'hippowdon', name: 'Hippowdon', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_88.png', publicid: '450', rarity: 'Uncommon', collection: ['Fighting', 'Gen4', 'OU-Pack', 'XY-Primal Clash'], points: 3},
        'hitmonchan': {title: 'hitmonchan', name: 'Hitmonchan', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_48.png', publicid: '107', rarity: 'Uncommon', collection: ['Fighting', 'RU-Pack', 'XY-Furious Fists', 'Gen1'], points: 3},
        'hitmonchanbaseset': {title: 'hitmonchanbaseset', name: 'Hitmonchan (Base Set)', card: 'http://i.imgur.com/S0XAE84.jpg?1', rarity: 'Mythic', collection: ['Fighting', 'Gen1', 'RU-Pack'], points: 20},
        'hitmonlee': {title: 'hitmonlee', name: 'Hitmonlee', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_47.png', publicid: '106', rarity: 'Uncommon', collection: ['Fighting', 'RU-Pack', 'XY-Furious Fists', 'Gen1'], points: 3},
        'hitmontop': {title: 'hitmontop', name: 'Hitmontop', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_49.png', publicid: '237', rarity: 'Common', collection: ['Fighting', 'RU-Pack', 'XY-Furious Fists', 'Gen2'], points: 3},
        'honchkrow': {title: 'honchkrow', name: 'Honchkrow', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_52.png', publicid: '430', rarity: 'Rare', collection: ['Darkness', 'UU-Pack', 'XY-Phantom Forces', 'Gen4'], points: 6},
        'honedge': {title: 'honedge', name: 'Honedge', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_98.png', publicid: '679', rarity: 'Common', collection: ['Metal', 'Gen6', 'LC-Pack', 'XY-Primal Clash'], points: 1},
        'honedge2': {title: 'honedge2', name: 'Honedge', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY12.png', publicid: '679a', rarity: 'Common', collection: ['Metal', 'LC-Pack', 'XY-Promo', 'Gen6'], points: 1},
        'honedge3': {title: 'honedge3', name: 'Honedge', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_83.png', publicid: '679b', rarity: 'Common', collection: ['Metal', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'honedge4': {title: 'honedge4', name: 'Honedge', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_21.png', publicid: '679c', rarity: 'Common', collection: ['Metal', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'hoopaex': {title: 'hoopaex', name: 'Hoopa EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY7/XY7_EN_36.png', publicid: '720EX', rarity: 'Epic', collection: ['Psychic', 'Legendary', 'XY-Ancient Origins', 'Event', 'EX-Pack', 'OU-Pack', 'Gen6'], points: 10},
        'horsea': {title: 'horsea', name: 'Horsea', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_30.png', publicid: '116', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'huntail': {title: 'huntail', name: 'Huntail', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_50.png', publicid: '367', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'hydreigon': {title: 'hydreigon', name: 'Hydreigon', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_74.png', publicid: '635', rarity: 'Rare', collection: ['Dragon', 'Pseudo', 'XY-Phantom Forces', 'Gen5', 'UU-Pack'], points: 6},
        'hydreigonex': {title: 'hydreigonex', name: 'Hydreigon EX', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_62.png', publicid: '635EX', rarity: 'Epic', collection: ['Dragon', 'Pseudo', 'XY-Roaring Skies', 'Gen5', 'UU-Pack', 'EX-Pack'], points: 10},
        'hydreigonexfull': {title: 'hydreigonexfull', name: 'Hydreigon EX (Full)', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_103.png', publicid: '635EXa', rarity: 'Legendary', collection: ['Dragon', 'Pseudo', 'XY-Roaring Skies', 'Gen5', 'UU-Pack', 'Full', 'EX-Pack'], points: 15},
        'hypno': {title: 'hypno', name: 'Hypno', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_36.png', publicid: '97', rarity: 'Uncommon', collection: ['Darkness', 'PU-Pack', 'XY-Furious Fists', 'Gen1'], points: 3},
        'illumise': {title: 'illumise', name: 'Illumise', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_18.png', publicid: '314', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'illumise2': {title: 'illumise2', name: 'Illumise', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_9.png', publicid: '314a', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Base', 'Gen3'], points: 3},
        'inkay': {title: 'inkay', name: 'Inkay', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_41.png', publicid: '686', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Roaring Skies', 'Gen6'], points: 1},
        'inkay2': {title: 'inkay2', name: 'Inkay', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_74.png', publicid: '686a', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'inkay3': {title: 'inkay3', name: 'Inkay', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_75.png', publicid: '686b', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'inkay4': {title: 'inkay4', name: 'Inkay', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_18.png', publicid: '686c', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'jammingnet': {title: 'jammingnet', name: 'Jamming Net', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_98.png', publicid: 'jamnt', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Phantom Forces', 'Flare'], points: 3},
        'jawfossil': {title: 'jawfossil', name: 'Jaw Fossil', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_94.png', publicid: 'jawfos', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY- Furious Fists'], points: 3},
        'jellicent': {title: 'jellicent', name: 'Jellicent', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_21.png', publicid: '593', rarity: 'Rare', collection: ['Water', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 6},
        'jigglypuff': {title: 'jigglypuff', name: 'Jigglypuff', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_87.png', publicid: '39', rarity: 'Uncommon', collection: ['Fairy', 'NFE', 'XY-Base', 'Gen1'], points: 3},
        'jigglypuff2': {title: 'jigglypuff2', name: 'Jigglypuff', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_88.png', publicid: '39a', rarity: 'Uncommon', collection: ['Fairy', 'NFE', 'XY-Base', 'Gen1'], points: 3},
        'jirachi': {title: 'jirachi', name: 'Jirachi', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_26.png', publicid: '385', rarity: 'Rare', collection: ['Metal', 'OU-Pack', 'XY-Roaring Skies', 'Legendary', 'Event', 'Gen3'], points: 6},
        'joltik': {title: 'joltik', name: 'Joltik', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_26.png', publicid: '595', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'jynx': {title: 'jynx', name: 'Jynx', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_37.png', publicid: '124', rarity: 'Uncommon', collection: ['Psychic', 'NU-Pack', 'XY-Furious Fists', 'Gen1'], points: 3},
        'kakuna': {title: 'kakuna', name: 'Kakuna', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_2.png', publicid: '14', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Primal Clash', 'Gen1',], points: 3},
        'kakuna2': {title: 'kakuna2', name: 'Kakuna', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_4.png', publicid: '14a', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Base', 'Gen1'], points: 3},
        'kangaskhanex': {title: 'kangaskhanex', name: 'Kangaskhan EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_78.png', publicid: '115EX', rarity: 'Rare', collection: ['Colorless', 'NU-Pack', 'XY-Flashfire', 'Gen1', 'EX-Pack'], points: 6},
        'kangaskhanexfull': {title: 'kangaskhanexfull', name: 'Kangaskhan EX (Full)', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_103.png', publicid: '115fullex', rarity: 'Legendary', collection: ['Colorless', 'NU-Pack', 'XY-Flashfire', 'Gen1', 'EX-Pack', 'Full'], points: 15},
        'karrablast': {title: 'karrablast', name: 'Karrablast', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_8.png', publicid: '588', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'kingdra': {title: 'kingdra', name: 'Kingdra', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_107.png', publicid: '230', rarity: 'Rare', collection: ['Dragon', 'BL2-Pack', 'XY-Primal Clash', 'Gen2'], points: 6},
        'kingdradelta': {title: 'kingdradelta', name: 'Kingra (Delta)', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_108.png', publicid: '230D', rarity: 'Epic', collection: ['Dragon', 'BL2-Pack', 'XY-Primal Clash', 'Gen2', 'Delta'], points: 10},
        'kingdrafull': {title: 'kingdrafull', name: 'Kingdra (Full)', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY39.png', publicid: '230full', rarity: 'Epic', collection: ['Dragon', 'BL2-Pack', 'XY-Promo', 'Gen2', 'Full'], points: 10},
        'kingler': {title: 'kingler', name: 'Kingler', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_14.png', publicid: '99', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Phantom Forces', 'Gen1'], points: 3},
        'klefki': {title: 'klefki', name: 'Klefki', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_48.png', publicid: '707', rarity: 'Uncommon', collection: ['Fairy', 'BL-Pack', 'XY-Roaring Skies', 'Gen6'], points: 3},
        'klefki2': {title: 'klefki2', name: 'Klefki', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_66.png', publicid: '707a', rarity: 'Uncommon', collection: ['Metal', 'BL-Pack', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'klefki3': {title: 'klefki3', name: 'Klefki', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_73.png', publicid: '707b', rarity: 'Common', collection: ['Fairy', 'BL-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'korrina': {title: 'korrina', name: 'Korrina', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_95.png', publicid: 'korrra', rarity: 'Epic', collection: ['Trainer','Supporter', 'XT-Furious Fists'], points: 10},
        'korrinafull': {title: 'korrinafull', name: 'Korrina (Full)', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_111.png', publicid: 'kora', rarity: 'Legendary', collection: ['Trainer','Supporter', 'Full', 'XY-Furious Fists'], points: 15},
        'krabby': {title: 'krabby', name: 'Krabby', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_13.png', publicid: '98', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Phantom Forces', 'Gen1'], points: 1},
        'krokorok': {title: 'krokorok', name: 'Krokorok', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_57.png', publicid: '552', rarity: 'Uncommon', collection: ['Darkness', 'NFE', 'XY-Flashfire', 'Gen5'], points: 3},
        'krokorok2': {title: 'krokorok2', name: 'Krokorok', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_70.png', publicid: '552a', rarity: 'Uncommon', collection: ['Darkness', 'NFE', 'XY-Base', 'Gen5'], points: 3},
        'krookodile': {title: 'krookodile', name: 'Krookodile', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_71.png', publicid: '553', rarity: 'Rare', collection: ['Darkness', 'UU-Pack', 'XY-Base', 'Gen5'], points: 6},
        'krookodileex': {title:  'krookodileex', name: 'Krookodile EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY25.png', publicid: '553EX', rarity: 'Epic', collection: ['Darkness', 'UU-Pack', 'XY-Promo', 'Gen5', 'EX-Pack'], points: 10},
        'kyogre': {title: 'kyogre', name: 'Kyogre', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_53.png', publicid: '382', rarity: 'Rare', collection: ['Water', 'Uber-Pack', 'XY-Primal Clash', 'Legendary', 'Gen3'], points: 6},
        'kyogreex': {title: 'kyogreex', name: 'Kyogre EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_54.png', publicid: '382EX', rarity: 'Epic', collection: ['Water', 'Uber-Pack', 'XY-Primal Clash', 'Legendary', 'Gen3', 'EX-Pack'], points: 10},
        'kyogreex2': {title: 'kyogreex2', name: 'Kyogre EX', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY41.png', publicid: '382EXa', rarity: 'Epic', collection: ['Water', 'Uber-Pack', 'XY-Promo', 'EX-Pack', 'Legendary', 'Gen3'], points: 10},
        'kyogreexaquafull': {title:  'kyogreexaquafull', name: 'Kyogre EX (Full)', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_6.png', publicid: '382aqEX', rarity: 'Legendary', collection: ['Water', 'Uber-Pack', 'Double Crisis', 'Legendary', 'Gen3', 'Full', 'EX-Pack'], points: 15},
        'kyogreexfull': {title: 'kyogreexfull', name: 'Kyogre EX (Full)', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_148.png', publicid: '382EXa', rarity: 'Legendary', collection: ['Water', 'Uber-Pack', 'XY-Primal Clash', 'Legendary', 'Gen3', 'EX-Pack', 'Full'], points: 15},
        'laironmag': {title: 'laironmag', name: 'Lairon', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_13.png', publicid: '305mag', rarity: 'Uncommon', collection: ['Fighting', 'NFE', 'Double Crisis', 'Magma', 'Gen3'], points: 3},
        'lampent': {title: 'lampent', name: 'Lampent', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_42.png', publicid: '608', rarity: 'Uncommon', collection: ['Psychic', 'NFE', 'XY-Phantom Forces', 'Gen5'], points: 3},
        'landorus': {title: 'landorus', name: 'Landorus', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_58.png', publicid: '645', rarity: 'Rare', collection: ['Fighting', 'Uber-Pack', 'Legendary', 'XY-Furious Fists', 'Gen5'], points: 6},
        'lanturn': {title: 'lanturn', name: 'Lanturn', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_58.png', publicid: '171', rarity: 'Uncommon', collection: ['Water', 'NU-Pack', 'XY-Primal Clash', 'Gen2'], points: 3},
        'lapras': {title: 'lapras', name: 'Lapras', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_35.png', publicid: '131', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'latiosex': {title: 'latiosex', name: 'Latios EX', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_58.png', publicid: '381EX', rarity: 'Epic', collection: ['Dragon', 'OU-Pack', 'XY-Roaring Skies', 'Legendary', 'Gen3', 'EX-Pack'], points: 10},
        'latiosexfull': {title: 'latiosexfull', name: 'Latios EX (Full)', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_101.png', publicid: '381EXa', rarity: 'Legendary', collection: ['Dragon', 'OU-Pack', 'XY-Roaring Skies', 'Legendary', 'Gen3', 'Full', 'EX-Pack'], points: 15},
        'latiosspiritlink': {title: 'latiosspiritlink', name: 'Latios Spirit Link', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_85.png', publicid: 'latsp', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Roaring Skies'], points: 1},
        'leafeon': {title: 'leafeon', name: 'Leafeon', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_7.png', publicid: '470', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Furious Fists', 'Gen4'], points: 3}, 
        'leavanny': {title: 'leavanny', name: 'Leavanny', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_7.png', publicid: '542', rarity: 'Rare', collection: ['Grass', 'PU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 6},
        'ledian': {title: 'ledian', name: 'Ledian', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_7.png', publicid: '166', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Base', 'Gen2'], points: 3},
        'ledyba': {title: 'ledyba', name: 'Ledyba', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_6.png', publicid: '165', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Base', 'Gen2'], points: 1},
        'lickilicky': {title: 'lickilicky', name: 'Lickilicky', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_79.png', publicid: '463', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Furious Fists', 'Gen4'], points: 3},
        'lickitung': {title: 'lickitung', name: 'Lickitung', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_78.png', publicid: '108', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Furious Fists', 'Gen1'], points: 1},
        'liepard': {title: 'liepard', name: 'Liepard', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_57.png', publicid: '510', rarity: 'Uncommon', collection: ['NU-Pack', 'XY-Phantom Forces', 'Darkness', 'Gen5'], points: 3},
        'lightningenergy': {title: 'lightningenergy', name: 'Lightning Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_135.png', publicid: 'lighe', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Lightning'], points: 1},
        'lillipup': {title: 'lillipup', name: 'Lillipup', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_108.png', publicid: '506', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'linoone': {title: 'linoone', name: 'Linoone', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_112.png', publicid: '264', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'litleo': {title: 'litleo', name: 'Litleo', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_11.png', publicid: '667', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'litleo2': {title: 'litleo2', name: 'Litleo', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_18.png', publicid: '667a', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'litleo3': {title: 'litleo3', name: 'Litleo', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_19.png', publicid: '667b', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'litwick': {title: 'litwick', name: 'Litwick', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_41.png', publicid: '607', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'lombre': {title: 'lombre', name: 'Lombre', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_11.png', publicid: '271', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Primal Clash', 'Gen3'], points: 3},
        'lopunny': {title: 'lopunny', name: 'Lopunny',  card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_85.png', publicid: '428', rarity: 'Rare', collection: ['Colorless', 'OU-Pack', 'XY-Flashfire', 'Gen4'], points: 6},
        'lotad': {title: 'lotad', name: 'Lotad', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_10.png', publicid: '270', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'loudred': {title: 'loudred', name: 'Loudred',  card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_84.png', publicid: '294', rarity: 'Uncommon', collection: ['Colorless', 'NFE', 'XY-Phantom Forces', 'Gen3'], points: 3},
        'lucarioex': {title: 'lucarioex', name: 'Lucario EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_54.png', publicid: '448EX', rarity: 'Epic', collection: ['Fighting', 'UU-Pack', 'XY-Furious Fists', 'Gen4', 'EX-Pack'], points: 10},
        'lucarioexfull': {title: 'lucarioexfull', name: 'Lucario EX (Full)', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_107.png', publicid: '448EXa', rarity: 'Legendary', collection: ['Fighting', 'UU-Pack', 'XY-Furious Fists', 'Gen4', 'Full', 'EX-Pack'], points: 15},
        'ludicolo': {title: 'ludicolo', name: 'Ludicolo', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_12.png', publicid: '272', rarity: 'Rare', collection: ['Grass', 'NU-Pack', 'XY-Primal Clash', 'Gen3'], points: 6},
        'ludicolodelta': {title: 'ludicolodelta2', name: 'Ludicolo (Delta)', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_37.png', publicid: '272D', rarity: 'Epic', collection: ['Water', 'NU-Pack', 'XY-Primal Clash', 'Gen3', 'Delta'], points: 10},
        'lumineon': {title: 'lumineon', name: 'Lumineon', card:    'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_19.png', publicid: '457', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Phantom Forces', 'Gen4'], points: 3},
        'lunatone': {title: 'lunatone', name: 'Lunatone', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_63.png', publicid: '337', rarity: 'Uncommon', collection: ['Fighting', 'PU-Pack', 'XY-Base', 'Gen3'], points: 3},
        'luvdisc': {title: 'luvdisc', name: 'Luvdisc',  card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_27.png', publicid: '370', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-FlashFire', 'Gen3'], points: 3},
        'luxio': {title: 'luxio', name: 'Luxio', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_33.png', publicid: '404', rarity: 'Uncommon', collection: ['Lightning','NFE' ,'XY-Flashfire' ,'Gen4',], points: 3},
        'luxray': {title: 'luxray', name: 'Luxray', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_34.png', publicid: '405', rarity: 'Rare', collection: ['Lightning', 'PU-Pack', 'XY-Flashfire', 'Gen4'], points: 6},
        'lysandre': {title: 'lysandre', name: 'Lysandre', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_90.png', publicid: 'lys', rarity: 'Uncommon', collection: ['Supporter', ,'XY-Flashfire' ,'Gen6',], points: 3},
        'lysandrestrumpcard': {title:  'lysandrestrumpcard', name: 'Lysandre\'s Trump Card', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_118.png', publicid: 'lystrmpa', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Phantom Forces', 'Full'], points: 15},
        'lysandrestrumpcardfull': {title: 'lysandrestrumpcardfull', name: 'Lysandre\'s Trump Card (Full)', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_99.png', publicid: 'lystrmp', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Phantom Forces'], points: 10},
        'machamp': {title: 'machamp', name: 'Machamp', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY13.png', publicid: '68', rarity: 'Epic', collection: ['Fighting', 'UU-Pack', 'XY-Promo', 'Gen1'], points: 10},
        'machamp2': {title: 'machamp2', name: 'Machamp', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_46.png', publicid: '73a', rarity: 'Rare', collection: ['Fighting', 'UU-Pack', 'XY-Furious Fists', 'Gen2'], points: 6},
        'machampbaseset': {title: 'machampbaseset', name: 'Machamp (Base Set)', card: 'http://i.imgur.com/ctAL2zJ.jpg?1', rarity: 'Mythic', collection: ['Fighting', 'UU-Pack', 'Gen1'], points: 20},
        'machoke': {title: 'machoke', name: 'Machoke', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_45.png', publicid: '72', rarity: 'Uncommon', collection: ['Fighting', 'PU-Pack', 'XY-Furious Fists', 'Gen1'], points: 3},
        'machop': {title: 'machop', name: 'Machop', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_44.png', publicid: '71', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen1'], points: 1},
        'magcargo': {title: 'magcargo', name: 'Magcargo', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_23.png', publicid: '219', rarity: 'Uncommon', collection: ['Fire', 'PU-Pack', 'XY-Primal Clash', 'Gen2'], points: 3},
        'magcargo2': {title: 'magcargo2', name: 'Magcargo', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_21.png', publicid: '219a', rarity: 'Uncommon', collection: ['Fire', 'PU-Pack', 'XY-Base', 'Gen2'], points: 3},
        'magcargodelta': {title: 'magcargodelta', name: 'Magcargo (Delta)', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_24.png', publicid: '219D', rarity: 'Rare', collection: ['Fire', 'PU-Pack', 'XY-Primal Clash', 'Gen2', 'Delta'], points: 6},
        'magmapointer': {title: 'magmapointer', name: 'Magma Pointer', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_24.png', publicid: 'magpt', rarity: 'Common', collection: ['Item', 'Trainer', 'Double Crisis'], points: 1},
        'magmar': {title: 'magmar', name: 'Magmar', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_10.png', publicid: '126', rarity: 'Uncommon', collection: ['Fire', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'magmortar': {title: 'magmortar', name: 'Magmortar', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_11.png', publicid: '467', rarity: 'Rare', collection: ['Fire', 'NU-Pack', 'XY-Furious Fists', 'Gen3'], points: 6},
        'magnetonbaseset': {title: 'magnetonbaseset', name: 'Magneton (Base Set)', card: 'http://i.imgur.com/GD7vGYB.jpg?1', publicid: '82BS', rarity: 'Mythic', collection: ['Lightning', 'BL3-Pack', 'Gen1'], points: 20},
        'magnezone': {title: 'magnezone', name: 'Magnezone', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_35.png', publicid: '462', rarity: 'Rare', collection: ['Lightning', 'OU-Pack', 'XY-Flashfire', 'Gen4'], points: 6},
        'magnezoneexfull': {title: 'magnezoneexfull', name: 'Magnezone EX (Full)', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_101.png', publicid: '462fullex', rarity: 'Legendary', collection: ['Metal','OU-Pack', 'XY-Flashfire' ,'Gen4', 'EX-Pack'], points: 15},
        'maintenance': {title: 'maintenance', name: 'Maintenance', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_96.png', publicid: 'mainte', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Furious Fists'], points: 1},
        'makuhita': {title: 'makuhita', name: 'Makuhita', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_51.png', publicid: '296', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'malamar': {title: 'malamar', name: 'Malamar', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_76.png', publicid: '687', rarity: 'Uncommon', collection: ['Darkness', 'NU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'malamar2': {title: 'malamar2', name: 'Malamar', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_77.png', publicid: '687a', rarity: 'Uncommon', collection: ['Darkness', 'NU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'malamarex': {title: 'malamarex', name: 'Malamar EX', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_58.png', publicid: '687EX', rarity: 'Epic', collection: ['Darkness', 'NU-Pack', 'XY-Phantom Forces', 'EX-Pack', 'Gen6'], points: 10},
        'malamarexfull': {title: 'malamarexfull', name: 'Malamar EX (Full)',card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_115.png', publicid: '687EXa', rarity: 'Legendary', collection: ['Darkness', 'NU-Pack', 'XY-Phantom Forces', 'EX-Pack', 'Gen6', 'Full'], points: 15},
        'manaphy': {title: 'manaphy', name: 'Manaphy', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_56.png', publicid: '490', rarity: 'Rare', collection: ['Water', 'Legendary', 'Event', 'Gen4', 'OU-Pack', 'XY-Primal Clash'], points: 6},
        'manectric': {title: 'manectric', name: 'Manectric', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_25.png', publicid: '310', rarity: 'Uncommon', collection: ['Lightning', 'OU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'manectric2': {title: 'manectric2', name: 'Manectric', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_61.png', publicid: '310a', rarity: 'Uncommon', collection: ['Lightning', 'OU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'manectricex': {title: 'manectricex', name: 'Manectric EX', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_23.png', publicid: '310EX', rarity: 'Epic', collection: ['Lightning', 'Mega', 'OU-Pack', 'XY-Phantom Forces', 'Gen3', 'EX-Pack'], points: 10},
        'manectricexfull': {title: 'manectricexfull', name: 'Manectric EX (Full)', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_113.png', publicid: '310EXa', rarity: 'Legendary', collection: ['Lightning', 'Mega', 'OU-Pack', 'XY-Phantom Forces', 'Gen3', 'EX-Pack', 'Full'], points: 15},
        'manectricspiritlink': {title:  'manectricspiritlink', name: 'Manectric Spirit Link', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_100.png', publicid: 'mansp', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Phantom Forces'], points: 1},
        'maractus': {title: 'maractus', name: 'Maractus', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_10.png', publicid: '556', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Flashfire', 'Gen5'], points: 3},
        'marill': {title: 'marill', name: 'Marill', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_102.png', publicid: '183', rarity: 'Uncommon', collection: ['Fairy', 'NFE', 'XY-Primal Clash', 'Gen2'], points: 3},
        'marshtomp': {title: 'marshtomp', name: 'Marshtomp', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_34.png', publicid: '259', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Primal Clash', 'Gen3'], points: 3},
        'masquerain': {title: 'masquerain', name: 'Masquerain', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_14.png', publicid: '284', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'maxieshiddenballtrick': {title:  'maxieshiddenballtrick', name: 'Maxie\'s Hidden Ball Trick', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_133.png', publicid: 'maxhbt', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Primal Clash'], points: 10},
        'maxieshiddenballtrickfull': {title:  'maxieshiddenballtrickfull', name: 'Maxie\'s Hidden Ball Trick (Full)', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_158.png', publicid: 'maxhbta', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Primal Clash', 'Full'], points: 15},
        'maxrevive': {title: 'maxrevive', name: 'Max Revive', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_120.png', publicid: 'mxre', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'medicham': {title: 'medicham', name: 'Medicham', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_80.png', publicid: '308', rarity: 'Uncommon', collection: ['Fighting', 'RU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'medichamdelta': {title: 'medichamdelta', name: 'Medicham (Delta)', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_81.png', publicid: '308D', rarity: 'Rare', collection: ['Fighting', 'RU-Pack', 'XY-Primal Clash', 'Gen3', 'Delta'], points: 6},
        'meditite': {title: 'meditite', name: 'Meditite', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_79.png', publicid: '307', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'megaaggronex': {title: 'megaaggonex', name: 'Mega Aggron EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_94.png', publicid: '306MEX', rarity: 'Legendary', collection: ['Metal', 'Mega', 'UU-Pack', 'EX-Pack', 'XY-Primal Clash', 'Gen3'], points: 15},
        'megaaggronexfull': {title: 'megaaggronexfull', name: 'Mega Aggron EX (Full)', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_154.png', publicid: '306MEXa', rarity: 'Mythic', collection: ['Metal', 'Mega', 'UU-Pack', 'EX-Pack', 'XY-Primal Clash', 'Gen3', 'Full'], points: 20},
        'megablastoiseex': {title: 'megablastoiseex', name: 'Mega Blastoise EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_30.png', publicid: '9MEX', rarity: 'Legendary', collection: ['Water', 'UU-Pack', 'XY-Base', 'Gen1', 'Mega', 'EX-Pack'], points: 15},
        'megacharizardex': {title: 'megacharizardex', name: 'Mega Charizard EX', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_13.png', publicid: '6EXM', rarity: 'Legendary', collection: ['Fire', 'OU-Pack', 'XY-Flashfire', 'Gen1', 'Mega', 'EX-Pack', 'Mega'], points: 15},
        'megacharizardx': {title: 'megacharizardx', name: 'Mega Charizard X',  card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_108.png', publicid: '6afullexmega', rarity: 'Legendary', collection: ['Fire', 'OU-Pack', 'XY-Flashfire', 'Gen1', 'Mega', 'EX-Pack'], points: 15},
        'megacharizardy': {title: 'megacharizardy', name: 'Mega Charizard Y', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_107.png', publicid: '6fullexmega', rarity: 'Legendary', collection: ['Fire','OU-Pack', 'XY-Flashfire' ,'Gen1', 'Mega', 'EX-Pack'], points: 15},
        'megadiancieex': {title: 'megadiancieex', name: 'Mega Diancie EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY44.png', publicid: 'M719EX', rarity: 'Legendary', collection: ['Fairy', 'OU-Pack', 'XY-Promo', 'Gen6', 'Mega', 'EX-Pack', 'Legendary', 'Mega', 'Event'], points: 15},
        'megagalladeex': {title: 'megagalladeex', name: 'Mega Gallade EX', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_35.png', publicid: '475MEX', rarity: 'Legendary', collection: ['Psychic', 'Mega', 'XY-Roaring Skies', 'BL3-Pack', 'EX-Pack', 'Gen4'], points: 15},
        'megagalladeexfull': {title: 'megagalladeexfull', name: 'Mega Gallade EX (Full)', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_100.png', publicid: '475MEXa', rarity: 'Mythic', collection: ['Psychic', 'Mega', 'XY-Roaring Skies', 'BL3-Pack', 'EX-Pack', 'Gen4', 'Full'], points: 20},
        'megagardevoirex': {title: 'megagardevoirex', name: 'Mega Gardevoir EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_106.png', publicid: '282MEX', rarity: 'Legendary', collection: ['Fairy', 'Mega', 'EX-Pack', 'OU-Pack', 'XY-Primal Clash', 'Gen3'], points: 15},
        'megagardevoirexfull': {title: 'megagardevoirexfull', name: 'Mega Gardevoir EX (Full)', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_156.png', publicid: '282MEXa', rarity: 'Mythic', collection: ['Fairy', 'Mega', 'EX-Pack', 'OU-Pack', 'XY-Primal Clash', 'Gen3', 'Full'], points: 20},
        'megagengarex': {title: 'megagengarex', name: 'Mega Gengar EX', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_35.png', publicid: '94MEX', rarity: 'Legendary', collection: ['Psychic', 'OU-Pack', 'XY-Phantom Forces', 'EX-Pack', 'Gen6', 'Mega'], points: 15},
        'megaheracrossex': {title: 'megaheracrossex', name: 'Heracross Mega EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_5.png', publicid: '214MEX', rarity: 'Legendary', collection: ['Grass', 'UU-Pack', 'XY-Furious Fists', 'Gen2', 'Mega', 'EX-Pack'], points: 15},
        'megaheracrossex2': {title: 'megaheracrossex2', name: 'Heracross Mega EX', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_112.png', publicid: '214MEXa', rarity: 'Legendary', collection: ['Grass', 'UU-Pack', 'XY-Furious Fists', 'Gen2', 'Mega', 'EX-Pack'], points: 15},
        'megakangaskhanex': {title: 'megakangaskhanex', name: 'Mega Kangaskhan EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_78.png', publicid: '115EX', rarity: 'Legendary', collection: ['Colorless', 'NU-Pack', 'XY-Flashfire', 'Gen1', 'EX-Pack', 'Mega'], points: 15},         
        'megakangaskhanex2': {title: 'megakagaskhanex2', name: 'Mega Kangaskhan EX', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_109.png', publicid: '115aEX', rarity: 'Legendary', collection: ['Colorless','NU-Pack' ,'XY-Flashfire' ,'Gen1', 'EX-Pack', 'Mega'], points: 15},
        'megalatiosex': {title: 'megalatiosex', name: 'Mega Latios EX', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_59.png', publicid: '381MEX', rarity: 'Legendary', collection: ['Dragon', 'Mega', 'XY-Roaring Skies', 'Gen3', 'EX-Pack', 'Legendary', 'OU-Pack'], points: 15},
        'megalatiosexfull': {title: 'megalatiosexfull', name: 'Mega Latios EX (Full)', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_102.png', publicid: '381MEXa', rarity: 'Mythic', collection: ['Dragon', 'Mega', 'XY-Roaring Skies', 'Gen3', 'EX-Pack', 'Legendary', 'Full', 'OU-Pack'], points: 20},
        'megalucarioex': {title: 'megalucarioex', name: 'Lucario Mega EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_55.png', publicid: '448MEX', rarity: 'Legendary', collection: ['Fighting', 'UU-Pack', 'XY-Furious Fists', 'Gen6', 'Mega', 'EX-Pack'], points: 15},
        'megalucarioex2': {title: 'megalucarioex2', name: 'Lucario Mega EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_113.png', publicid: '448MEXa', rarity: 'Legendary', collection: ['Fighting', 'UU-Pack', 'XY-Furious Fists', 'Gen6', 'Mega', 'EX-Pack'], points: 15},
        'megamanectricex': {title: 'megamanectricex', name: 'Mega Manectric EX', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_24.png', publicid: '310MEX', rarity: 'Legendary', collection: ['Lightning', 'OU-Pack', 'XY-Phantom Forces', 'Gen6', 'EX-Pack', 'Mega'], points: 15},
        'megametagrossex': {title: 'megametagrossex', name: 'Mega Metagross EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY35.png', publicid: 'M376EX', rarity: 'Legendary', collection: ['Metal', 'OU-Pack', 'XY-Promo', 'EX-Pack', 'Mega', 'Gen3'], points: 15},
        'megarayquazaex': {title: 'megarayquazaex', name: 'Mega Rayquaza EX', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY7/XY7_EN_98.png', publicid: '384MEX', rarity: 'Mythic', collection: ['Dragon', 'Legendary', 'Mega', 'XY-Ancient Origins', 'EX-Pack', 'Uber-Pack', 'Gen3'], points: 20},
        'megarayquazaex3': {title: 'megarayquazaex3', name: 'Mega Rayquaza EX', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_76.png', publicid: '384MEXb', rarity: 'Mythic', collection: ['Colorless', 'Legendary', 'Mega', 'XY-Roaring Skies', 'EX-Pack', 'Uber-Pack', 'Gen3'], points: 20},
        'megarayquazaexfull': {title: 'megarayquazaexfull', name: 'Mega Rayquaza EX (Full)', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_105.png', publicid: '384MEXc', rarity: 'Mythic', collection: ['Colorless', 'Legendary', 'Mega', 'XY-Roaring Skies', 'EX-Pack', 'Uber-Pack', 'Gen3'], points: 20},
        'megarayquazaex2': {title: 'megarayquazaex2', name: 'Mega Rayquaza EX', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_61.png', publicid: '384MEXa', rarity: 'Mythic', collection: ['Dragon', 'Legendary', 'Mega', 'XY-Roaring Skies', 'EX-Pack', 'Uber-Pack', 'Gen3'], points: 20},
        'megaturbo': {title: 'megaturbo', name: 'Mega Turbo', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_86.png', publicid: 'mtrb', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Roaring Skies'], points: 1},
        'megavenusaurex': {title: 'megavenusaurex', name: 'Mega Venusaur EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_2.png', publicid: '3MEX', rarity: 'Legendary', collection: ['Grass', 'OU-Pack', 'XY-Base', 'Gen1', 'Mega', 'EX-Pack'], points: 15},
        'meowstic': {title: 'meowstic', name: 'Meowstic', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_43.png', publicid: '678', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'meowstic2': {title: 'meowstic2', name: 'Meowstic', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY48.png', publicid: '678a', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'meowth': {title: 'meowth', name: 'Meowth', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_67.png', publicid: '52', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Roaring Skies', 'Gen1'], points: 1},
        'metagrossex': {title: 'metagrossex', name: 'Metagross EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY34.png', publicid: '376EX', rarity: 'Epic', collection: ['Metal', 'OU-Pack', 'XY-Promo', 'EX-Pack', 'Gen3'], points: 10},
        'metalenergy': {title: 'metalenergy', name: 'Metal Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_139.png', publicid: 'metae', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Metal'], points: 1},
        'metapod': {title: 'metapod', name: 'Metapod', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_2.png', publicid: '11', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Flashfire', 'Gen1'], points: 3},
        'mewancient': {title: 'mewancient', name: 'Mew (Promo)', card: 'http://i.imgur.com/CJQQ8SR.jpg?1', publicid: '151pro', rarity: 'Mythic', collection: ['OU-Pack', 'Psychic', 'Legendary', 'Event'], points: 20},
        'mewtwobaseset': {title: 'mewtwobaseset', name: 'Mewtwo (Base Set)', card: 'http://i.imgur.com/97oGc9l.jpg?1', publicid: '150BS', rarity: 'Mythic', collection: ['Psychic', 'Gen1', 'Uber-Pack', 'Legendary'], points: 20},
        'mienfoo': {title: 'mienfoo', name: 'Mienfoo', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_56.png', publicid: '619', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'mienshao': {title: 'mienshao', name: 'Mienshao', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_57.png', publicid: '620', rarity: 'Uncommon', collection: ['Fighting', 'UU-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'mightyena': {title: 'mightyena', name: 'Mightyena', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_54.png', publicid: '262', rarity: 'Uncommon', collection: ['Darkness', 'PU-Pack', 'XY-Phantom Forces', 'Gen3'], points: 3},
        'mightyena2': {title: 'mightyena2', name: 'Mightyena', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_17.png', publicid: '262a', rarity: 'Uncommon', collection: ['Darkness', 'PU-Pack', 'XY-Phantom Forces', 'Gen3'], points: 3},
        'mightyenaaqua': {title: 'mightyenaaqua', name: 'Mightyena', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_18.png', publicid: '262aq', rarity: 'Uncommon', collection: ['Darkness', 'PU-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 3},
        'mightyenamagma': {title: 'mightyenamagma', name: 'Mightyena', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_19.png', publicid: '262mag', rarity: 'Uncommon', collection: ['Darkness', 'PU-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 3},
        'milotic': {title: 'milotic', name: 'Milotic', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_44.png', publicid: '350', rarity: 'Uncommon', collection: ['Water', 'UU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'milotic2': {title: 'milotic2', name: 'Milotic', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_23.png', publicid: '350a', rarity: 'Uncommon', collection: ['Water', 'UU-Pack', 'XY-Flashfire', 'Gen3'], points: 3},
        'miltank': {title: 'miltank', name: 'Miltank', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_83.png', publicid: '241', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Flashfire', 'Gen2'], points: 3},
        'miltank2': {title: 'miltank2', name: 'Miltank', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_27.png', publicid: '241a', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Kalos Starter Set', 'Gen2'], points: 3},
        'minun': {title: 'minun', name: 'Minun', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_32.png', publicid: '312', rarity: 'Common', collection: ['Lightning', 'PU-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'mountainring': {title: 'mountainring', name: 'Mountain Ring', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_97.png', publicid: 'mountrin', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Furious Fists'], points: 6}, 
        'mrmime': {title: 'mrmime', name: 'Mr. Mime', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_101.png', publicid: '122', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Primal Clash', 'Gen1'], points: 3},
        'mrmime2': {title: 'mrmime2', name: 'Mr. Mime', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_91.png', publicid: '122a', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'mudkip': {title: 'mudkip', name: 'Mudkip', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_33.png', publicid: '258', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'mudkip2': {title: 'mudkip2', name: 'Mudkip', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY38.png', publicid: '258a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Promo', 'Gen3'], points: 1},
        'mukaqua': {title: 'mukaqua', name: 'Muk', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_8.png', publicid: '89aq', rarity: 'Uncommon', collection: ['Psychic', 'NU-Pack', 'Double Crisis', 'Gen1', 'Aqua'], points: 3},
        'munna': {title: 'munna', name: 'Munna', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_39.png', publicid: '517', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'murkrow': {title: 'murkrow', name: 'Murkrow', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_51.png', publicid: '198', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Phantom Forces', 'Gen2'], points: 1},
        'muscleband': {title: 'muscleband', name: 'Muscle Band', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_121.png', publicid: 'msclb', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'musharna': {title: 'musharna', name: 'Musharna', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_40.png', publicid: '518', rarity: 'Rare', collection: ['Psychic', 'NU-Pack', 'XY-Phantom Forces', 'Gen5'], points: 6},
        'mysteryenergy': {title: 'mystenergy', name: 'Mystery Energy', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_112.png', publicid: 'myse', rarity: 'Rare', collection: ['Energy', 'Special Energy', 'XY-Phantom Forces', 'Psychic'], points: 6},
        'natu': {title: 'natu', name: 'Natu', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_27.png', publicid: '177', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Roaring Skies', 'Gen2'], points: 1},
        'natudelta': {title: 'natudelta', name: 'Natu', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_28.png', publicid: '177D', rarity: 'Uncommon', collection: ['Psychic', 'LC-Pack', 'XY-Roaring Skies', 'Delta', 'Gen2'], points: 3},
        'nidokingbaseset': {title: 'nidokingbaseset', name: 'Nidoking (Base Set)', card: 'http://i.imgur.com/Yiex0cB.jpg?1', publicid: '34BS', rarity: 'Mythic', collection: ['Grass', 'UU-Pack', 'Gen1'], points: 20},
        'nidoqueen': {title: 'nidoqueen', name: 'Nidoqueen', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_68.png', publicid: '31', rarity: 'Rare', collection: ['Psychic', 'UU-Pack', 'XY-Primal Clash', 'Gen1'], points: 6},
        'nidoqueendelta': {title: 'nidoqueendelta', name: 'Nidoqueen (Delta)', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_69.png', publicid: '31', rarity: 'Epic', collection: ['Psychic', 'UU-Pack', 'XY-Primal Clash', 'Gen1', 'Delta'], points: 10},
        'nidoranf': {title: 'nidoranf', name: 'Nidoran-F',card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_66.png', publicid: '29', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'nidorina': {title: 'nidorina', name: 'Nidorina', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_67.png', publicid: '30', rarity: 'Uncommon', collection: ['Psychic', 'NFE', 'XY-Primal Clash', 'Gen1'], points: 3},
        'nincanda': {title: 'nincada', name: 'Nincada', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_9.png', publicid: '290', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'ninetales': {title: 'ninetales', name: 'Ninetales', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_21.png', publicid: '38', rarity: 'Uncommon', collection: ['Fire', 'PU-Pack', 'XY-Primal Clash', 'Gen1'], points: 3},
        'ninetalesbaseset': {title: 'ninetalesbaseset', name: 'Ninetales (Base Set)', card: 'http://i.imgur.com/btLsHwr.jpg?1', publicid: '38BS', rarity: 'Mythic', collection: ['Fire', 'Gen1', 'PU-Pack'], points: 20},
        'ninjask': {title: 'ninjask', name: 'Ninjask', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_10.png', publicid: '291', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'noibat': {title: 'noibat', name: 'Noibat', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_87.png', publicid: '714', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'noivern': {title: 'noivern', name: 'Noivern', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_77.png', publicid: '715', rarity: 'Uncommon', collection: ['Dragon', 'BL2-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'nosepass': {title: 'nosepass', name: 'Nosepass', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_78.png', publicid: '299', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'numelmagma': {title: 'numelmagma', name: 'Numel', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_1.png', publicid: '322mag', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 1},
        'nuzleaf': {title: 'nuzleaf', name: 'Nuzleaf', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_6.png', publicid: '274', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Flashfire', 'Gen3'], points: 3},
        'pachirisu': {title: 'pachirisu', name: 'Pachirisu', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_25.png', publicid: '417', rarity: 'Uncommon', collection: ['Lightning', 'PU-Pack', 'XY-Phantom Forces', 'Gen4'], points: 3},
        'palpad': {title: 'palpad', name: 'Pal Pad', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_92.png', publicid: 'pal', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Flashfire'], points: 3},
        'pancham': {title: 'pancham', name: 'Pancham', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_59.png', publicid: '674', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'pancham2': {title: 'pancham2', name: 'Pancham', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_60.png', publicid: '674a', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'pangoro': {title: 'pangoro', name: 'Pangoro', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY50.png', publicid: '675', rarity: 'Uncommon', collection: ['Fighting', 'BL2-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'pangoro2': {title: 'pangoro2', name: 'Pangoro', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_68.png', publicid: '675a', rarity: 'Uncommon', collection: ['Darkness', 'BL2-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'panpour': {title: 'panpour', name: 'Panpour', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_37.png', publicid: '515', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'panpour2': {title: 'panpour2', name: 'Panpour', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_11.png', publicid: '515a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen5'], points: 1},
        'pansage': {title: 'pansage', name: 'Pansage', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_10.png', publicid: '511', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'pansage2': {title: 'pansage2', name: 'Pansage', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_2.png', publicid: '511a', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen5'], points: 1},
        'pansear': {title: 'pansear', name: 'Pansear', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_22.png', publicid: '513', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'pansear2': {title: 'pansear2', name: 'Pansear',  card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_7.png', publicid: '513a', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen5'], points: 1},
        'patrat': {title: 'patrat', name: 'Patrat', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_84.png', publicid: '504', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'pawniard': {title: 'pawniard', name: 'Pawniard', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_81.png', publicid: '624', rarity: 'Common', collection: ['Metal', 'PU-Pack', 'XY-Base', 'Gen5'], points: 1},
        'pawniard2': {title: 'pawniard2', name: 'Pawniard',  card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_19.png', publicid: '624a', rarity: 'Common', collection: ['Metal', 'PU-Pack', 'XY-Kalos Starter Set', 'Gen5'], points: 1},
        'pelipper': {title: 'pelipper', name: 'Pelipper', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_19.png', publicid: '279', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'phantump': {title: 'phantump', name: 'Phantump', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_54.png', publicid: '708', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'pidgeot': {title: 'pidgeot', name: 'Pidgeot',  card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_77.png', publicid: '18', rarity: 'Rare', collection: ['Colorless', 'UU-Pack', 'XY-FlashFire', 'Gen1'], points: 6},
        'pidgeotto': {title: 'pidgeotto', name: 'Pidgeotto', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_76.png', publicid: '17', rarity: 'Uncommon', collection: ['Colorless', 'NFE', 'XY-Flashfire', 'Gen1'], points: 3},
        'pidgey': {title: 'pidgey', name: 'Pidgey',  card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_75.png', publicid: '16', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Flashfire', 'Gen1'], points: 1},
        'pidove': {title: 'pidove', name: 'Pidove', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_78.png', publicid: '519', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Roaring Skies', 'Gen5'], points: 1},
        'pikachu': {title: 'pikachu', name: 'Pikachu', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_20.png', publicid: '25', rarity: 'Common', collection: ['Lightning', 'NFE', 'XY-Roaring Skies', 'Gen1','Starter'], points: 3},
        'pikachu2': {title: 'pikachu2', name: 'Pikachu',  card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_42.png', publicid: '25a', rarity: 'Uncommon', collection: ['Lightning', 'NFE', 'XY-Base', 'Gen1'], points: 3},
        'pikachu3': {title: 'pikachu3', name: 'Pikachu', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_27.png', publicid: '25b', rarity: 'Uncommon', collection: ['Lightning', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'pineco': {title: 'pineco', name: 'Pineco', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_4.png', publicid: '204', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Flashfire', 'Gen2'], points: 1},
        'plusle': {title: 'plusle', name: 'Plusle', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_31.png', publicid: '311', rarity: 'Common', collection: ['Lightning', 'PU-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'pokeball': {title: 'pokeball', name: 'Pokeball', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_35.png', publicid: 'pokb', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo'], points: 1},
        'pokemoncatcher': {title: 'pokemoncatcher', name: 'Pokemon Catcher', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_36.png', publicid: 'pokcat', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Kalos Starter Set'], points: 1},
        'pokemoncenterlady': {title: 'pokemoncenterlady', name: 'Pokemon Center Lady', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_93.png', publicid: 'PCL', rarity: 'Uncommon', collection: ['Supporter', 'Trainer','XY-Flashfire'], points: 3},
        'pokemonfanclub': {title: 'pokemonfanclub', name: 'Pokemon Fan Club', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_94.png', publicid: 'PFC', rarity: 'Uncommon', collection: ['Supporter', 'XY-Flashfire' ,'Gen6',], points: 3},
        'politoed': {title: 'politoed', name: 'Politoed', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_18.png', publicid: '186', rarity: 'Rare', collection: ['Water', 'PU-Pack', 'XY-Furious Fists', 'Gen2'], points: 3},
        'poliwag': {title: 'poliwag', name: 'Poliwag', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_15.png', publicid: '60', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Furious Fists', 'Gen1'], points: 1},
        'poliwhirl': {title: 'poliwhirl', name: 'Poliwhirl', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_16.png', publicid: '61', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'poliwrath': {title: 'poliwrath', name: 'Poliwrath', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_17.png', publicid: '62', rarity: 'Rare', collection: ['Water', 'PU-Pack', 'XY-Furious Fists', 'Gen1'], points: 6},
        'poliwrathbaseset': {title: 'poliwrathbaseset', name: 'Poliwrath (Base Set)', card: 'http://i.imgur.com/ZHdbnmJ.jpg?1', publicid: '62BS', rarity: 'Mythic', collection: ['Water', 'PU-Pack', 'Gen1'], points: 20},
        'ponyta': {title: 'ponyta', name: 'Ponyta', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_14.png', publicid: '77', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Flashfire', 'Gen1'], points: 1},
        'poochyena': {title: 'poochyena', name: 'Poochyena', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_53.png', publicid: '261', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Phantom Forces', 'Gen3'], points: 1},
        'poochyena2': {title: 'poochyena2', name: 'Poochyena', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_16.png', publicid: '261a', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen3'], points: 1},
        'poochyenaaqua': {title: 'poochyenaaqua', name: 'Poochyena', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_16.png', publicid: '261aq', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 1},
        'poochyenamagma': {title: 'poochyenamagma', name: 'Poochyena', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_17.png', publicid: '261mag', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 1},
        'potion': {title: 'potion', name: 'Potion', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_37.png', publicid: 'pot', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo'], points: 1},
        'primalgroudonex': {title: 'primalgroudonex', name: 'Primal Groudon EX', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY7/XY7_EN_97.png', publicid: '383PrEX', rarity: 'Mythic', collection: ['Fighting', 'Legendary', 'XY-Ancient Origins', 'Primal', 'EX-Pack', 'Uber-Pack'], points: 20},
        'primalgroudonex2': {title: 'primalgroudonex2', name: 'Primal Groudon EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_86.png', publicid: '383PrEXa', rarity: 'Mythic', collection: ['Fighting', 'Legendary', 'XY-Primal Clash', 'Primal', 'EX-Pack', 'Uber-Pack'], points: 20},
        'primalgroudonex3': {title: 'primalgroudonex3', name: 'Primal Groudon EX', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_151.png', publicid: '383PrEXb', rarity: 'Mythic', collection: ['Fighting', 'Legendary', 'XY-Primal Clash', 'Primal', 'EX-Pack', 'Uber-Pack'], points: 20},
        'primalkyogreex': {title: 'primalkyogreex', name: 'Primal Kyogre EX', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY7/XY7_EN_96.png', publicid: '382PrEX', rarity: 'Mythic', collection: ['Primal', 'Legendary', 'XY-Ancient Origins', 'Water', 'Gen3', 'EX-Pack', 'Uber-Pack'], points: 20},
        'primalkyogreex2': {title: 'primalkyogreex2', name: 'Primal Kyogre EX', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_55.png', publicid: '382PrEXa', rarity: 'Mythic', collection: ['Primal', 'Legendary', 'XY-Primal Clash', 'Water', 'Gen3', 'EX-Pack', 'Uber-Pack'], points: 20},
        'primalkyogreex3': {title: 'primalkyogreex3', name: 'Primal Kyogre EX', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_149.png', publicid: '382PrEXb', rarity: 'Mythic', collection: ['Primal', 'Legendary', 'XY-Primal Clash', 'Water', 'Gen3', 'EX-Pack', 'Uber-Pack'], points: 20},
        'probopass': {title: 'probopass', name: 'Probopass', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_95.png', publicid: '476', rarity: 'Uncommon', collection: ['PU-Pack', 'Metal', 'XY-Primal Clash', 'Gen4'], points: 3},
        'professorbirchsobservations': {title: 'professorbirchsobservations', name: 'Professors Birchs Observations', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_134.png', publicid: 'birobs', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Primal Clash'], points: 10},
        'professorbirchsobservationsfull': {title: 'professorbirchsobservationsfull', name: 'Professors Birchs Observations (Full)', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_159.png', publicid: 'birobsa', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Primal Clash', 'Full'], points: 15},
        'professorsletter': {title: 'professorsletter', name: 'Professor\'s Letter', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_123.png', publicid: 'prole', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'professorsycamore': {title: 'professorsycamore', name: 'Professor Sycamore',card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_101.png', publicid: 'profsyc', rarity: 'Rare', collection: ['Trainer','Supporter', 'XY-Phantom Forces', 'XY-Base'], points: 6},
        'protectioncube': {title: 'protectioncube', name: 'Protection Cube', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_95.png', publicid: 'PROCUB', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Flashfire'], points: 3},
        'psychicenergy': {title: 'psychicenergy', name: 'Psychic Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_136.png', publicid: 'psyce', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Psychic'], points: 1},
        'pumpkaboo': {title: 'pumpkaboo', name: 'Pumpkaboo', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_44.png', publicid: '710', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'pumpkaboo2': {title: 'pumpkaboo2', name: 'Pumpkaboo',  card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_56.png', publicid: '710a', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'purrloin': {title: 'purrloin', name: 'Purrloin',  card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_56.png', publicid: '509', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'pyroar': {title: 'pyroar', name: 'Pyroar', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY26.png', publicid: '668', rarity: 'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'pyroar2': {title: 'pyroar2', name: 'Pyroar', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_20.png', publicid: '668a', rarity: 'Uncommon', collection: ['Fire', 'NU-Pack', 'XY-Flashfire', 'Gen6'], points: 3},
        'quilladin': {title: 'quilladin', name: 'Quilladin', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_13.png', publicid: '651', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Base', 'Gen6'], points: 3},
        'quilladin2': {title: 'quilladin2', name: 'Quilladin', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_4.png', publicid: '651a', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Kalos Starter Set', 'Gen6'], points: 3},
        'qwilfish': {title: 'qwilfish', name: 'Qwilfish', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_21.png', publicid: '211', rarity: 'Uncommon', collection: ['Water', 'RU-Pack', 'XY-Flashfire', 'Gen2'], points: 3},
        'raichu': {title: 'raichu', name: 'Raichu', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_43.png', publicid: '26', rarity: 'Rare', collection: ['Lightning', 'PU-Pack', 'XY-Base', 'Gen1'], points: 6},
        'raichu2': {title: 'raichu2', name: 'Raichu', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_28.png', publicid: '26a', rarity: 'Rare', collection: ['Lightning', 'PU-Pack', 'XY-Furious Fists', 'Gen1'], points: 6},
        'raichubaseset': {title: 'raichubaseset', name: 'Raichu (Base Set)', card: 'http://i.imgur.com/J1LoZGp.jpg?1', publicid: '26BS', rarity: 'Mythic', collection: ['Lightning', 'PU-Pack', 'Gen1'], points: 20},
        'rainbowenergy': {title: 'rainbowenergy', name: 'Rainbow Energy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_131.png', publicid: 'rnbwe', rarity: 'Rare', collection: ['Energy','Special Energy', 'XY-Base'], points: 6},
        'rapidash': {title: 'rapidash', name: 'Rapidash', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_15.png', publicid: '78', rarity: 'Uncommon', collection: ['Fire', 'PU-Pack', 'XY-Flashfire', 'Gen1'], points: 3},
        'rarecandy': {title: 'rarecandy', name: 'Rare Candy', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_135.png', publicid: 'rcan', rarity: 'Rare', collection: ['Item', 'Trainer', 'XY-Primal Clash'], points: 6},
        'rayquazaex': {title: 'rayquazaex', name: 'Rayquaza EX', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_60.png', publicid: '383EX', rarity: 'Epic', collection: ['Legendary', 'Dragon', 'Uber-Pack', 'XY-Roaring Skies', 'Gen3', 'EX-Pack'], points: 10},
        'rayquazaex2': {title: 'rayquazaex2', name: 'Rayquaza EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_75.png', publicid: '383EXa', rarity: 'Epic', collection: ['Legendary', 'Dragon', 'Uber-Pack', 'XY-Roaring Skies', 'Gen3', 'EX-Pack'], points: 10},
        'rayquazaex3': {title: 'rayquazaex3', name: 'Rayquaza EX', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY66.png', publicid: '383EXb', rarity: 'Epic', collection: ['Legendary', 'Uber-Pack', 'Colorless', 'XY-Promo', 'Gen3', 'EX-Pack'], points: 10},
        'rayquazaexfull': {title: 'rayquazaexfull', name: 'Rayquaza EX (Full)', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_104.png', publicid: '383EXb', rarity: 'Legendary', collection: ['Legendary', 'Dragon', 'Uber-Pack', 'XY-Roaring Skies', 'Gen3', 'EX-Pack', 'Full'], points: 15},
        'rayquazaspiritlink': {title: 'rayquazaspiritlink', name: 'Rayquaza Spirit Link', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_87.png', publicid: 'raysp', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Roaring Skies'], points: 1},
        'redcard': {title: 'redcard', name: 'Red Card', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_124.png', publicid: 'redca', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'regigigas': {title: 'regigigas', name: 'Regigigas', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_86.png', publicid: '486', rarity: 'Rare', collection: ['Colorless', 'Legendary', 'PU-Pack', 'XY-Phantom Forces', 'Gen4'], points: 6},
        'regirockdelta': {title: 'regirockdelta', name: 'Regirock (Delta)', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY49.png', publicid: '377D', rarity: 'Epic', collection: ['Fighting', 'Legendary', 'NU-Pack', 'XY-Promo', 'Gen3', 'Delta'], points: 10},
        'repeatball': {title: 'repeatball', name: 'Repeat Ball', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_136.png', publicid: 'repb', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Primal Clash'], points: 3},
        'reshiram': {title: 'reshiram', name: 'Reshiram', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_63.png', publicid: '643', rarity: 'Rare', collection: ['Legendary', 'Dragon', 'Uber-Pack', 'XY-Roaring Skies', 'Gen 5'], points: 6},
        'revive': {title: 'revive', name: 'Revive', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_88.png', publicid: 'rev', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Roaring Skies'], points: 3},
        'rhydon': {title: 'rhydon', name: 'Rhydon', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_75.png', publicid: '112', rarity: 'Uncommon', collection: ['Fighting', 'NU-Pack', 'XY-Primal Clash', 'Gen1'], points: 3},
        'rhydon2': {title: 'rhydon2', name: 'Rhydon', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_61.png', publicid: '112a', rarity: 'Uncommon', collection: ['Fighting', 'NU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'rhyhorn': {title: 'rhyhorn', name: 'Rhyhorn', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_74.png', publicid: '111', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'rhyhorn2': {title: 'rhyhorn2', name: 'Rhyhorn', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_60.png', publicid: '111a', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'rhyperior': {title: 'rhyperior', name: 'Rhyperior', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_76.png', publicid: '464', rarity: 'Rare', collection: ['Fighting', 'RU-Pack', 'XY-Primal Clash', 'Gen4'], points: 6},
        'rhyperior2': {title: 'rhyperior2', name: 'Rhyperior', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_62.png', publicid: '464a', rarity: 'Rare', collection: ['Fighting', 'RU-Pack', 'XY-Base', 'Gen4'], points: 6},
        'rhyperiordelta': {title: 'rhyperiordelta', name: 'Rhyperior (Delta)', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_77.png', publicid: '464D', rarity: 'Epic', collection: ['Fighting', 'RU-Pack', 'XY-Primal Clash', 'Gen4', 'Delta'], points: 10},
        'robosubstitute': {title: 'robosubstitute', name: 'Robo Substitute', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_102.png', publicid: 'robsub', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Phantom Forces'], points: 3},
        'roggenrola': {title: 'roggenrola', name: 'Roggenrola', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_48.png', publicid: '524', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'rollerskates': {title: 'rollerskates', name: 'Roller Skates', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_103.png', publicid: 'rlrskt', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Phantom Forces', 'XY-Base'], points: 1},
        'roselia': {title: 'roselia', name: 'Roselia', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_8.png', publicid: '315', rarity: 'Common', collection: ['Grass', 'PU-Pack', 'XY-Flashfire', 'Gen3'], points: 1},
        'roserade': {title: 'roserade', name: 'Roserade', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_9.png', publicid: '407', rarity: 'Uncommon', collection: ['grass','UU-Pack' ,'XY-Flashfire', 'Gen4'], points: 3},
        'roughseas': {title: 'roughseas', name: 'Rough Seas', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_137.png', publicid: 'rghsea', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Primal Clash'], points: 6},
        'sableye': {title: 'sableye', name:'Sableye', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_68.png', publicid: '302', rarity: 'Uncommon', collection: ['Darkness', 'OU-Pack', 'XY-Base', 'Gen3'], points: 3},
        'sacredash': {title: 'sacredash', name:'Sacred Ash', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_96.png', publicid:'Sacash', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Flashfire'], points: 3},
        'salamence': {title: 'salamence', name:'Salamence', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_57.png', publicid: '373', rarity: 'Rare', collection: ['Dragon', 'UU-Pack', 'XY-Roaring Skies', 'Gen3', 'Pseudo'], points: 6},
        'sandfossil': {title: 'sandfossil', name:'Sand Fossil', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_97.png', publicid:'Sandfos', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Furious Fists'], points: 3},
        'sandile': {title: 'sandile', name:'Sandile', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_56.png', publicid: '551', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Flashfire', 'Gen5'], points: 1},
        'sandile2': {title: 'sandile2', name:'Sandile', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_69.png', publicid: '551a', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'scatterbug': {title: 'scatterbug', name:'Scatterbug', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_15.png', publicid: '664', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'sceptile': {title: 'sceptile', name:'Sceptile', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_8.png', publicid: '254', rarity: 'Rare', collection: ['Grass', 'UU-Pack', 'XY-Primal Clash', 'Gen3'], points: 6},
        'sceptiledelta': {title: 'sceptiledelta', name:'Sceptile (Delta)', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_9.png', publicid: '254D', rarity: 'Epic', collection: ['Grass', 'UU-Pack', 'XY-Primal Clash', 'Gen3', 'Delta'], points: 10},
        'sceptileex': {title: 'sceptilede', name:'Sceptile EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY53.png', publicid: '254EX', rarity: 'Epic', collection: ['Grass', 'UU-Pack', 'XY-Promo', 'Gen3', 'EX-Pack'], points: 10},
        'scolipede': {title: 'scolipede', name:'Scolipede', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_53.png', publicid: '545', rarity: 'Rare', collection: ['Psychic', 'BL-Pack', 'XY-Base', 'Gen5'], points: 6},
        'scorchedearth': {title: 'scorchedearth', name:'Scorched Earth', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_138.png', publicid:'Scrch', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Primal Clash'], points: 6},
        'scrafty': {title: 'scrafty', name:'Scrafty', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_59.png', publicid: '560', rarity: 'Uncommon', collection: ['Darkness', 'RU-Pack', 'XY-Flashfire', 'Gen5'], points: 3},
        'scrafty2': {title: 'scrafty2', name:'Scrafty', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_67.png', publicid: '560a', rarity: 'Uncommon', collection: ['Darkness', 'RU-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'scraggy': {title: 'scraggy', name:'Scraggy', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_58.png', publicid: '559', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Flashfire', 'Gen5'], points: 1},
        'scraggy2': {title: 'scraggy2', name:'Scraggy', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_66.png', publicid: '559a', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 1},
        'seadra': {title: 'seadra', name:'Seadra', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_31.png', publicid: '117', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Primal Clash', 'Gen1'], points: 3},
        'sealeo': {title: 'sealeo', name:'Sealeo', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_47.png', publicid: '364', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Primal Clash', 'Gen3'], points: 3},
        'sealeo2': {title: 'sealeo2', name:'Sealeo', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_25.png', publicid: '364a', rarity: 'Uncommon', collection: ['Water', 'NFE', 'XY-Flashfire', 'Gen3'], points: 3},
        'sealeoaqua': {title: 'sealeoaqua', name:'Sealeo', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_4.png', publicid: '364aq', rarity: 'Uncommon', collection: ['Water', 'NFE', 'Double Crisis', 'Gen3', 'Aqua'], points: 3},
        'seedot': {title: 'seedot', name:'Seedot', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_5.png', publicid: '273', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Flashfire', 'Gen3'], points: 1},
        'seismitoadex': {title: 'seismitoadex', name:'Seismitoad EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_20.png', publicid: '537EX', rarity: 'Epic', collection: ['Water', 'RU-Pack', 'XY-Furious Fists', 'Gen5', 'EX-Pack'], points: 10},
        'seismitoadexfull': {title: 'seismitoadexfull', name:'Seismitoad EX (Full)', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_106.png', publicid: '537EXa', rarity: 'Legendary', collection: ['Water', 'RU-Pack', 'XY-Furious Fists', 'Gen5', 'EX-Pack', 'Full'], points: 15},
        'sentret': {title: 'sentret', name:'Sentret', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_81.png', publicid: '161', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Flashfire', 'Gen2'], points: 1},
        'seviperaqua': {title: 'seviper', name:'Seviper', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_9.png', publicid: '336aq', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 3},
        'sewaddle': {title: 'sewaddle', name:'Sewaddle', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_5.png', publicid: '540', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Phantom Forces', 'Gen5'], points: 1},
        'shadowcircle': {title: 'shadowcircle', name:'Shadow Circle', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_126.png', publicid:'Shdwcrc', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Base'], points: 6},
        'sharpedoaqua': {title: 'sharpedoaqua', name:'Sharpedo', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_21.png', publicid: '319aq', rarity: 'Uncommon', collection: ['Darkness', 'UU-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 3},
        'sharpedoex': {title: 'sharpedoex', name:'Sharpedo EX', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_91.png', publicid: '319EX', rarity: 'Epic', collection: ['Darkness', 'UU-Pack', 'XY-Primal Clash', 'Gen3', 'EX-Pack'], points: 10},
        'sharpedoexfull': {title: 'sharpedoexfull', name:'Sharpedo EX (Full)', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_152.png', publicid: '319EXa', rarity: 'Legendary', collection: ['Darkness', 'UU-Pack', 'XY-Primal Clash', 'Gen3', 'EX-Pack', 'Full'], points: 15},
        'shauna': {title: 'shauna', name:'Shauna', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_104.png', publicid:'Sha', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'XY-Phantom Forces', 'XY-Base'], points: 3},
        'shayminskyex': {title: 'shayminskyex', name:'Shaymin-Sky', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_77.png', publicid: '492EX', rarity: 'Legendary', collection: ['Colorless', 'Uber-Pack', 'XY-Roaring Skies', 'Gen4', 'Legendary', 'Event', 'EX-Pack'], points: 15},
        'shayminskyexfull': {title: 'shayminskyexfull', name:'Shaymin-Sky EX (Full)', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_106.png', publicid: '492EXa', rarity: 'Mythic', collection: ['Colorless', 'Uber-Pack', 'XY-Roaring Skies', 'Gen4', 'Legendary', 'Event', 'Full', 'EX-Pack'], points: 20},
        'shedinja': {title: 'shedinja', name:'Shedinja', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_11.png', publicid: '292', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'shelgon': {title: 'shelgon', name:'Shelgon', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_56.png', publicid: '372', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'shellder': {title: 'shellder', name:'Shellder', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_31.png', publicid: '90', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'shelmet': {title: 'shelmet', name:'Shelmet', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_8.png', publicid: '616', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'shieldenergy': {title: 'shieldenergy', name:'Shield Energy', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_143.png', publicid:'Shlde', rarity: 'Rare', collection: ['Energy','Special Energy', 'XY-Primal Clash', 'Metal'], points: 6},
        'shiftry': {title: 'shiftry', name:'Shiftry', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_7.png', publicid: '276', rarity: 'Rare', collection: ['Grass', 'RU-Pack', 'XY-Flashfire', 'Gen3'], points: 6},
        'shiftry2': {title: 'shiftry2', name:'Shiftry', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY23.png', publicid: '275', rarity: 'Uncommon', collection: ['Grass', 'RU-Pack', 'XY-Promo', 'Gen3'], points: 3}, 
        'shinx': {title: 'shinx', name:'Shinx', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_32.png', publicid: '403', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Flashfire', 'Gen4'], points: 1},
        'shrineofmemories': {title: 'shrineofmemories', name:'Shrine of Memories', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_139.png', publicid:'Shrmem', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Primal Clash'], points: 6},
        'shroomish': {title: 'shroomish', name:'Shroomish', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_15.png', publicid: '285', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'shroomish2': {title: 'shroomish2', name:'Shroomish', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_6.png', publicid: '285a', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'shuppet': {title: 'shuppet', name:'Shuppet', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_30.png', publicid: '353', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'silcoon': {title: 'silcoon', name:'Silcoon', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_4.png', publicid: '266', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'silentlab': {title: 'silentlab', name:'Silent Lab', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_140.png', publicid:'Sillab', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Primal Clash'], points: 6},
        'simipour': {title: 'simipour', name:'Simipour', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_38.png', publicid: '516', rarity: 'Uncommon', collection: ['Water', 'PU-Pack', 'XY-Base', 'Gen5'], points: 3},
        'simisage': {title: 'simisage', name:'Simisage', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_11.png', publicid: '512', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Base', 'Gen5'], points: 3},
        'simisear': {title: 'simisear', name:'Simisear', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_23.png', publicid: '514', rarity: 'Uncommon', collection: ['Fire', 'PU-Pack', 'XY-Base', 'Gen5'], points: 3},
        'skarmory': {title: 'skarmory', name:'Skarmory', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_69.png', publicid: '227', rarity: 'Uncommon', collection: ['Colorless', 'OU-Pack', 'XY-Roaring Skies', 'Gen2'], points: 3},
        'skarmory2': {title: 'skarmory2', name:'Skarmory', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_59.png', publicid: '227a', rarity: 'Uncommon', collection: ['Metal', 'OU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 3},
        'skarmoryexfull': {title: 'skarmoryexfull', name:'Skarmory EX (Full)', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_145.png', publicid: '227', rarity: 'Legendary', collection: ['Metal', 'OU-Pack', 'XY-Base', 'Gen2', 'Full'], points: 15},
        'skarmoryex2': {title: 'skarmoryex2', name:'Skarmory EX', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_80.png', publicid: '227a', rarity: 'Epic', collection: ['Metal', 'OU-Pack', 'XY-Base', 'Gen2'], points: 10},
        'skiddo': {title: 'skiddo', name:'Skiddo', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY11.png', publicid: '672', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Promo', 'Gen6'], points: 1},
        'skiddo2': {title: 'skiddo2', name:'Skiddo', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_18.png', publicid: '672a', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'skitty': {title: 'skitty', name:'Skitty', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_104.png', publicid: '300', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Primal Clash', 'XY-Base', 'Gen3'], points: 1},
        'skitty3': {title: 'skitty3', name:'Skitty', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_28.png', publicid: '300b', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen3'], points: 1},
        'skorupi': {title: 'skorupi', name:'Skorupi', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_38.png', publicid: '451', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Furious Fists', 'Gen4'], points: 1},
        'skrelp': {title: 'skrelp', name:'Skrelp', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_44.png', publicid: '690', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Flashfire', 'Gen6'], points: 1},
        'skuntank': {title: 'skuntank', name:'Skuntank', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_55.png', publicid: '435', rarity: 'Uncommon', collection: ['Darkness', 'RU-Pack', 'XY-Flashfire', 'Gen4'], points: 3},
        'skyfield': {title: 'skyfield', name:'Sky Field', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_89.png', publicid:'Skyf', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Roaring Skies'], points: 6},
        'slaking': {title:'slaking', name:'Slaking', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_83.png', publicid: '289', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Furious Fists', 'Gen3'], points: 6},
        'slakoth': {title: 'slakoth', name:'Slakoth', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_81.png', publicid: '287', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'sliggoo': {title: 'sliggoo', name:'Sliggoo', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_76.png', publicid: '705', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Phantom Forces', 'Gen6'], points: 3},
        'sliggoo2': {title: 'sliggoo2', name:'Sliggoo', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_73.png', publicid: '705a', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Flashfire', 'Gen6'], points: 3},
        'slugma': {title: 'slugma', name:'Slugma', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_22.png', publicid: '218', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Primal Clash', 'Gen2'], points: 1},
        'slugma2': {title: 'slugma2', name:'Slugma', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_20.png', publicid: '218a', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Base', 'Gen2'], points: 1},
        'slugma3': {title: 'slugma3', name:'Slugma', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_6.png', publicid: '218b', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen2'], points: 1},
        'slurpuff': {title: 'slurpuff', name:'Slurpuff', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY15.png', publicid: '685', rarity: 'Uncommon', collection: ['Fairy', 'UU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'slurpuff2': {title: 'slurpuff2', name:'Slurpuff', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_69.png', publicid: '685a', rarity: 'Uncommon', collection: ['Fairy', 'UU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'slurpuff3': {title: 'slurpuff3', name:'Slurpuff', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_95.png', publicid: '685b', rarity: 'Uncommon', collection: ['Fairy', 'UU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'sneasel': {title: 'sneasel', name:'Sneasel', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_50.png', publicid: '215', rarity: 'Common', collection: ['Darkness', 'BL3-Pack', 'XY-Flashfire', 'Gen2'], points: 1},
        'sneasel2': {title: 'sneasel2', name:'Sneasel', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_51.png', publicid: '215a', rarity: 'Common', collection: ['Darkness','BL3-Pack' ,'XY-Flashfire' ,'Gen2',], points: 1},
        'snorlax': {title: 'snorlax', name:'Snorlax', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_80.png', publicid: '143', rarity: 'Uncommon', collection: ['Colorless', 'UU-Pack', 'XY-Flashfire', 'Gen1'], points: 3},
        'snorlax2': {title:'snorlax2' ,name:'Snorlax', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_26.png', publicid: '143a', rarity: 'Uncommon', collection: ['Colorless', 'UU-Pack', 'XY-Kalos Starter Set', 'Gen1'], points: 3},
        'snubbull': {title:'snubbull', name:'Snubbull', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_22.png', publicid: '209', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen2'], points: 1},
        'solrock': {title:'solrock',name:'Solrock', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_64.png', publicid: '338', rarity: 'Uncommon', collection: ['Fighting', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'sparklingrobe': {title:'sparklingrobe', name:'Sparkling Robe', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_99.png', publicid:'Sparkrobe', rarity: 'Common', collection:['Trainer', 'Item', 'XY-Furious Fist'], points: 1},
        'spearow': {title: 'spearow', name:'Spearow', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_78.png', publicid: '21', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Phantom Forces', 'Gen1'], points: 1},
        'spearow': {title:'spearow', name:'Spearow', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_65.png', publicid: '21', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Roaring Skies', 'Gen1'], points: 1},
        'spewpa': {title:'spewpa', name:'Spewpa', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_16.png', publicid: '665', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Base', 'Gen6'], points: 3},
        'spheal': {title:'spheal', name:'Spheal', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_45.png', publicid: '363', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'spheal2': {title:'spheal2', name:'Spheal', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_46.png', publicid: '363a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'spheal3': {title:'spheal3', name:'Spheal', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_24.png', publicid: '363b', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Flashfire', 'Gen3'], points: 1},
        'sphealaqua': {title:'sphealaqua', name:'Spheal', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_3.png', publicid: '363aq', rarity: 'Common', collection: ['Water', 'LC-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 1},
        'spinda': {title:'spinda', name:'Spinda', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_115.png', publicid: '327', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 3},
        'spiritomb': {title:'spiritomb', name:'Spiritomb', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_55.png', publicid: '442', rarity: 'Uncommon', collection: ['RU-Pack', 'Darkness', 'XY-Phantom Forces', 'Gen4'], points: 3},
        'spoink': {title:'spoink', name:'Spoink', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_49.png', publicid: '325', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Base', 'Gen3'], points: 1},
        'spritzee': {title:'spritzee', name:'Spritzee', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_67.png', publicid: '682', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Flashfire' ,'Gen6',], points: 1},
        'spritzee2': {title:'spritzee2', name:'Spritzee', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_92.png', publicid: '682a', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'starmie': {title:'starmie', name:'Starmie', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_73.png', publicid: '121', rarity: 'Uncommon', collection: ['Water', 'OU-Pack', 'XY-Primal Clash', 'Gen1'], points: 3},
        'starmie2': {title: 'starmie2', title:'starmie2', name:'Starmie', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_34.png', publicid: '121a', rarity: 'Uncommon', collection: ['Water', 'OU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'startlingmegaphone': {title: 'startlingmegaphone', name:'Startling Megaphone', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_97.png', publicid:'Stameg', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Flashfire'], points: 3},
        'staryu': {title: 'staryu', name:'Staryu', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_32.png', publicid: '120', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'staryu2': {title: 'staryu2', name:'Staryu', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_33.png', publicid: '120a', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'steelshelter': {title: 'steelshelter', name:'Steel Shelter', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_105.png', publicid:'Stlshl', rarity: 'Rare', collection: ['Stadium', 'Trainer', 'XY-Phantom Forces'], points: 6},
        'steven': {title: 'steven', name:'Steven', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_90.png', publicid:'Stev', rarity: 'Rare', collection: ['Trainer','Supporter', 'XY-Roaring Skies'], points: 6},
        'stoutland': {title: 'stoutland', name:'Stoutland', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_110.png', publicid: '508', rarity: 'Rare', collection: ['Colorless', 'PU-Pack', 'XY-Base', 'Gen5'], points: 6},
        'strongenergy': {title: 'strongenergy', name:'Strong Energy', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_104.png', publicid:'Stre', rarity: 'Rare', collection: ['Energy','Special Energy', 'XY-Furious Fists', 'Fighting'], points: 6},
        'stunky': {title: 'stunky', name:'Stunky', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_53.png', publicid: '434', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Flashfire', 'Gen4'], points: 1},
        'stunky2': {title: 'stunky2', name:'Stunky', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_54.png', publicid: '434a', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Flashfire', 'Gen4'], points: 1},
        'superpotion': {title: 'superpotion', name:'Super Potion', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_128.png', publicid:'Suprpot', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base'], points: 1},
        'superscoopup': {title: 'superscoopup', name:'Super Scoop Up', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_100.png', publicid:'Supscpp', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo'], points: 1},
        'surskit': {title: 'surskit', name: 'Surskit',  card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_13.png', publicid: '283', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'swablu': {title: 'swablu', name:'Swablu', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_73.png', publicid: '333', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'swadloon': {title: 'swadloon', name:'Swadloon', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_6.png', publicid: '541', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Phantom Forces', 'Gen5'], points: 3},
        'swalot': {title: 'swalot', name:'Swalot', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_37.png', publicid: '317', rarity: 'Rare', collection: ['Psychic', 'PU-Pack', 'XY-Phantom Forces', 'Gen3'], points: 6},
        'swampert': {title: 'swampert', name:'Swampert', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_35.png', publicid: '260', rarity: 'Rare', collection: ['Water', 'UU-Pack', 'XY-Primal Clash', 'Gen3'], points: 6},
        'swampertdelta': {title: 'swampertdelta', name: 'Swampert (Delta)', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_36.png', publicid: '260D', rarity: 'Epic', collection: ['Water', 'UU-Pack', 'XY-Primal Clash', 'Gen3'], points: 10},
        'swampertex': {title: 'swampertex', name:'Swampert EX', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY55.png', publicid: '260EX', rarity: 'Epic', collection: ['Water', 'UU-Pack', 'XY-Promo', 'EX-Pack', 'Gen3'], points: 10},
        'swellow': {title: 'swellow', name:'Swellow', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_103.png', publicid: '277', rarity: 'Uncommon', collection: ['Colorless', 'NU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'swellow2': {title: 'swellow2', name:'Swellow', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_103.png', publicid: '277a', rarity: 'Uncommon', collection: ['Colorless', 'NU-Pack', 'XY-Base', 'Gen3'], points: 3},
        'swellowdelta': {title: 'swellowdelta', name:'Swellow (Delta)', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_72.png', publicid: '277D', rarity: 'Rare', collection: ['Colorless', 'NU-Pack', 'XY-Roaring Skies', 'Gen3', 'Delta'], points: 6},
        'swirlix': {title: 'swirlix', name:'Swirlix', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_68.png', publicid: '684', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Phantom Forces', 'Gen6'], points: 1},
        'swirlix2': {title: 'swirlix2', name:'Swirlix', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_94.png', publicid: '684a', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Base', 'Gen6'], points: 1},
        'swirlix3': {title: 'swirlix3', name:'Swirlix', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_24.png', publicid: '684b', rarity: 'Common', collection: ['Fairy', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen6'], points: 1},
        'switch': {title: 'switch', name:'Switch', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_91.png', publicid:'Swi', rarity: 'Common', collection: ['Trainer', 'Item', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo'], points: 1},
        'sylveon': {title:'sylveon', name:'Sylveon', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY04.png', publicid: '700', rarity: 'Uncommon', collection: ['Fairy', 'OU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'sylveon2': {title:'sylveon2', name:'Sylveon', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_72.png', publicid: '700a', rarity: 'Uncommon', collection: ['Fairy', 'OU-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'taillow': {title:'taillow', name: 'Taillow', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_70.png', publicid: '276', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'taillow2': {title:'taillow2', name: 'Taillow', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_102.png', publicid: '276a', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Base', 'Gen3'], points: 1},
        'talonflame': {title:'talonflame', name: 'Talonflame', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_15.png', publicid: '663', rarity: 'Rare', collection: ['Fire', 'OU-Pack', 'XY-Roaring Skies', 'Gen6'], points: 6},
        'talonflame2': {title:'talonflame2', name: 'Talonflame', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_10.png', publicid: '663a', rarity: 'Rare', collection: ['Fire', 'OU-Pack', 'XY-Phantom Forces', 'Gen6'], points: 6},
        'talonflame3': {title:'talonflame3', name: 'Talonflame', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_28.png', publicid: '663b', rarity: 'Rare', collection: ['Fire', 'OU-Pack', 'XY-Base', 'Gen6'], points: 6},
        'tangela': {title:'tangela', name: 'Tangela', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_4.png', publicid: '114', rarity: 'Common', collection: ['Grass', 'PU-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'tangrowth': {title:'tangrowth', name: 'Tangrowth', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_5.png', publicid: '465', rarity: 'Uncommon', collection: ['Grass', 'RU-Pack', 'XY-Primal Clash', 'Gen4'], points: 3},
        'targetwhistle': {title:'targetwhistle', name: 'Target Whistle', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_106.png', publicid: 'tarwh', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Phantom Forces'], points: 3},
        'tauros': {title:'tauros', name: 'Tauros', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_100.png', publicid: '128', rarity: 'Uncommon', collection: ['Colorless', 'NU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'teamaquaadmin': {title:'teamaquaadmin', name: 'Team Aqua Admin', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_25.png', publicid: 'aqadm', rarity: 'Rare', collection: ['Trainer','Supporter', 'Double Crisis'], points: 6},
        'teamaquagrunt': {title:'teamaquagrunt', name: 'Team Aqua Grunt', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_26.png', publicid: 'aqgrn', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'Double Crisis'], points: 3},
        'teamaquasgreatball': {title:'teamaquasgreatball', name: 'Team Aqua\'s Great Ball', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_27.png', publicid: 'aqgrtb', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'Double Crisis'], points: 3},
        'teamaquassecretbase': {title: 'teamaquassecretbase', name: 'Team Aqua\'s Secret Base', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_28.png', publicid: 'aqscrt', rarity: 'Rare', collection: ['Trainer','Stadium', 'Double Crisis'], points: 6},
        'teamflaregrunt': {title:'teamflaregrunt', name: 'Team Flare Grunt', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_129.png', publicid: 'flagrt', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'XY-Base'], points: 3},
        'teammagmaadmin': {title:'teammagmaadmin', name: 'Team Magma Admin', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_29.png', publicid: 'magadm', rarity: 'Rare', collection: ['Trainer','Supporter', 'Double Crisis'], points: 6},
        'teammagmagrunt': {title:'teammagmagrunt', name: 'Team Magma Grunt', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_30.png', publicid: 'maggrn', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'Double Crisis'], points: 3},
        'teammagmasgreatball': {title:'teammagmasgreatball', name: 'Team Magma\'s Great Ball', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_31.png', publicid: 'maggrtb', rarity: 'Uncommon', collection: ['Trainer','Supporter', 'Double Crisis'], points: 3},
        'teammagmassecretbase': {title: 'teammagmassecretbase', name: 'Team Magma\'s Secret Base', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_32.png', publicid: 'magscrt', rarity: 'Rare', collection: ['Trainer','Stadium', 'Double Crisis'], points: 6},
        'teammates': {title:'teammates', name: 'Teammates', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_141.png', publicid: 'teammt', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Primal Clash'], points: 10},
        'teammatesfull': {title:'teammatesfull', name: 'Teammates (Full)', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_160.png', publicid: 'teammta', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Primal Clash', 'Full'], points: 15},
        'tentacool': {title:'tentacool', name: 'Tentacool', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_70.png', publicid: '72', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'tentacooldelta': {title:'tentacooldelta', name: 'Tentacool (Delta)', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_71.png', publicid: '72D', rarity: 'Uncommon', collection: ['Psychic', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 3},
        'tentacruel': {title:'tentacruel', name: 'Tentacruel', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_72.png', publicid: '73', rarity: 'Uncommon', collection: ['Psychic', 'UU-Pack', 'XY-Primal Clash', 'Gen1'], points: 3},
        'thundurus': {title:'thundurus', name: 'Thundurus', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_33.png', publicid: '642', rarity: 'Rare', collection: ['Lightning', 'Legendary', 'OU-Pack', 'XY-Furious Fists', 'Gen5'], points: 6},
        'thundurusex': {title:'thundurusex', name: 'Thundurus EX', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_26.png', publicid: '642EX', rarity: 'Legendary', collection: ['Legendary', 'XY-Roaring Skies', 'OU-Pack', 'EX-Pack', 'Lightning', 'Gen5'], points: 15},
        'thundurusexfull': {title:'thundurusexfull', name: 'Thundurus EX (Full)', card: 'http://assets5.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_98.png', publicid: '642EXa', rarity: 'Mythic', collection: ['Legendary', 'XY-Roaring Skies', 'OU-Pack', 'EX-Pack', 'Lightning', 'Gen5', 'Full'], points: 20},
        'tierno': {title:'tierno', name: 'Tierno', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_107.png', publicid: 'tie', rarity: 'Rare', collection: ['Trainer','Supporter', 'XY-Phantom Forces', 'XY-Kalos Starter Set'], points: 6},
        'timburr': {title:'timburr', name: 'Timburr', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_65.png', publicid: '532', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'togekiss': {title:'togekiss', name: 'Togekiss', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_45.png', publicid: '468', rarity: 'Rare', collection: ['Fairy', 'BL-Pack', 'XY-Roaring Skies', 'Gen4'], points: 6},
        'togekissdelta': {title:'togekissdelta', name: 'Togekiss (Delta)', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_46.png', publicid: '468D', rarity: 'Epic', collection: ['Fairy', 'BL-Pack', 'XY-Roaring Skies', 'Gen4', 'Delta'], points: 10},
        'togepi': {title:'togepi', name: 'Togepi', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_43.png', publicid: '175', rarity: 'Common', collection: ['Egg', 'LC-Pack', 'Fairy', 'XY-Roaring Skies', 'Gen2'], points: 1},
        'togetic': {title:'togetic', name: 'Togetic', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_44.png', publicid: '176', rarity: 'Uncommon', collection: ['Fairy', 'RU-Pack', 'XY-Roaring Skies', 'Gen2'], points: 3},
        'toolretriever': {title:'toolretriever', name: 'Tool Retriever', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_101.png', publicid: 'tlret', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Furious Fists'], points: 1},
        'torchic': {title:'torchic', name: 'Torchic', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_25.png', publicid: '255', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'torchic2': {title:'torchic2', name: 'Torchic', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY37.png', publicid: '255a', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Promo', 'Gen3'], points: 1},
        'torchic3': {title:'torchic3', name: 'Torchic', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_12.png', publicid: '255b', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'torchicdelta': {title:'torchicdelta', name: 'Torchic (Delta)', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_26.png', publicid: '255D', rarity: 'Uncommon', collection: ['Fire', 'LC-Pack', 'XY-Primal Clash', 'Gen3', 'Delta'], points: 3},
        'torkoal': {title:'torkoal', name: 'Torkoal', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_16.png', publicid: '324', rarity: 'Uncommon', collection: ['Fire', 'PU-Pack', 'XY-Flashfire', 'Gen3'], points: 3},
        'tornadus': {title:'tornadus', name: 'Tornadus', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_86.png', publicid: '641', rarity: 'Rare', collection: ['Colorless', 'BL2-Pack', 'Legendary', 'XY-Furious Fists', 'Gen5'], points: 6},
        'totodile': {title:'totodile', name: 'Totodile', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_15.png', publicid: '158', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Phantom Forces', 'Gen2'], points: 1},
        'toxicroakex': {title:'toxicroakex', name: 'Toxicroak EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_41.png', publicid: '454EX', rarity: 'Legendary', collection: ['Psychic', 'UU-Pack', 'EX-Pack', 'XY-Flashfire', 'Gen4'], points: 15},
        'toxicroakexfull': {title:'toxicroakexfull', name: 'Toxicroak EX (Full)', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_102.png', publicid: '454fullex', rarity: 'Legendary', collection: ['Pyschic', 'UU-Pack', 'XY-Flashfire', 'Gen4', 'Full', 'EX-Pack'], points: 15},
        'trainersmail': {title:'trainersmail', name: 'Trainer\'s Mail', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_92.png', publicid: 'trml', rarity: 'Common', collection: ['Item', 'Trainer', 'XY-Roaring Skies'], points: 1},
        'trainingcenter': {title:'trainingcenter', name: 'Training Center', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_102.png', publicid: 'trainc', rarity: 'Rare', collection: ['Trainer','Stadium', 'XY-Furious Fists'], points: 6},
        'tranquill': {title:'tranquill', name: 'Tranquill', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_79.png', publicid: '520', rarity: 'Uncommon', collection: ['Colorless', 'NFE', 'XY-Roaring Skies', 'Gen5'], points: 3},
        'trapinch': {title:'trapinch', name: 'Trapinch', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_82.png', publicid: '328', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'trapinch2': {title:'trapinch2', name: 'Trapinch', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_53.png', publicid: '328a', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen3'], points: 1},
        'treecko': {title:'treecko', name: 'Treecko', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_6.png', publicid: '252', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'treecko2': {title:'treecko2', name: 'Treecko', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY36.png', publicid: '252a', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Promo', 'Gen3'], points: 1},
        'trevenant': {title:'trevenant', name: 'Trevenant', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY14.png', publicid: '709', rarity: 'Uncommon', collection: ['Psychic', 'RU-Pack', 'XY-Promo', 'Gen6'], points: 3},
        'trevenant2': {title:'trevenant2', name: 'Trevenant', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_55.png', publicid: '709a', rarity: 'Uncommon', collection: ['Psychic', 'RU-Pack', 'XY-Base', 'Gen6'], points: 3},
        'trevenantex': {title:'trevenantex', name: 'Trevenant', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_19.png', publicid: '709EX', rarity: 'Epic', collection: ['Grass', 'EX-Pack', 'XY-Primal Clash', 'Gen6', 'RU-Pack'], points: 10},
        'trevenantexfull': {title:'trevenantexfull', name: 'Trevanant EX (Full)', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_145.png', publicid: '709EXa', rarity: 'Legendary', collection: ['Grass', 'EX-Pack', 'Full', 'XY-Primal Clash', 'Gen6', 'RU-Pack'], points: 15},
        'trevor': {title:'trevor', name: 'Trevor', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY33.png', publicid: 'trev', rarity: 'Rare', collection: ['Trainer','Supporter', 'XY-Promo'], points: 6},
        'trickcoin': {title:'trickcoin', name: 'Trick Coin', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_108.png', publicid: 'trkcn', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Phantom Forces'], points: 3},
        'trickshovel': {title:'trickshovel', name: 'Trick Shovel', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_98.png', publicid: 'trisho', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Flashfire'], points: 3},
        'tropius': {title:'tropius', name: 'Tropius', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_12.png', publicid: '357', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Roaring Skies', 'Gen3'], points: 3},
        'tynamo': {title:'tynamo', name: 'Tynamo', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_62.png', publicid: '602', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Primal Clash', 'Gen5'], points: 1},
        'tyrantrum': {title:'tyrantrum', name: 'Tyrantrum', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_62.png', publicid: '697', rarity: 'Uncommon', collection: ['Fighting', 'RU-Pack', 'XY-Furious Fists', 'Gen6'], points: 3},
        'tyrunt': {title:'tyrunt', name: 'Tyrunt', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_61.png', publicid: '696', rarity: 'Common', collection: ['Fighting', 'LC-Pack', 'XY-Furious Fists', 'Gen6'], points: 1},
        'ultraball': {title:'ultraball', name: 'Ultra Ball', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_93.png', publicid: 'ultb', rarity: 'Uncommon', collection: ['Item', 'Trainer', 'XY-Roaring Skies', 'XY-Flashfire'], points: 3},
        'unfezant': {title:'unfezant', name: 'Unfezant', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_80.png', publicid: '521', rarity: 'Rare', collection: ['Colorless', 'PU-Pack', 'XY-Roaring Skies', 'Gen5'], points: 6},
        'unfezantdelta': {title:'unfezantdelta', name: 'Unefezant (Delta)', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_81.png', publicid: '521D', rarity: 'Epic', collection: ['Colorless', 'PU-Pack', 'XY-Roaring Skies', 'Gen5', 'Delta'], points: 10},
        'venipede': {title: 'venipede', name: 'Venipede', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_51.png', publicid: '543', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'venomoth': {title: 'venomoth', name: 'Venomoth', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_2.png', publicid: '49', rarity: 'Rare', collection: ['Grass', 'BL-Pack', 'XY-Phantom Forces', 'Gen1'], points: 6},
        'venonat': {title: 'venonat', name: 'Venonat', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_1.png', publicid: '48', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Phantom Forces', 'Gen1'], points: 1},
        'venusaurbaseset': {title: 'venusaurbaseset', name: 'Venusaur (Base Set)', card: 'http://i.imgur.com/4Zm2bmh.jpg?1', publicid: '3BS', rarity: 'Mythic', collection: ['Grass', 'OU-Pack', 'Base Set', 'Gen1'], points: 20},
        'venusaurex': {title: 'venusaurex', name: 'Venusaur EX', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY28.png', publicid: '3EX', rarity: 'Epic', collection: ['Grass', 'OU-Pack', 'XY-Promo', 'EX-Pack', 'Gen1'], points: 10},
        'venusaurex2full': {title: 'venusaurex2full', name: 'Venusaur EX', card: 'http://assets7.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_141.png', publicid: '3EXa', rarity: 'Legendary', collection: ['Grass', 'OU-Pack', 'XY-Base', 'Gen1', 'EX-Pack', 'Full'], points: 15},
        'venusaurex3': {title: 'venusaurex3', name: 'Venusaur EX', card: 'http://assets6.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_1.png', publicid: '3EXb', rarity: 'Epic', collection: ['Grass', 'OU-Pack', 'XY-Base', 'Gen1', 'EX-Pack'], points: 10},
        'vibrava': {title: 'vibrava', name: 'Vibrava', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_109.png', publicid:  '329', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Primal Clash', 'Gen3'], points: 3},
        'vibrava2': {title: 'vibrava2', name: 'Vibrava', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_75.png', publicid: '329a', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Furious Fists', 'Gen3'], points: 3},
        'victini': {title: 'victini', name: 'Victini', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_13.png', publicid: '494', rarity: 'Rare', collection: ['Fire', 'BL-Pack', 'XY-Roaring Skies', 'Gen5', 'Legendary', 'Event'], points: 6},
        'victreebel': {title: 'victreebel', name: 'Victreebel', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_3.png', publicid: '71', rarity: 'Rare', collection: ['Grass', 'BL4', 'XY-Furious Fists', 'Gen1'], points: 6},
        'vigoroth': {title: 'vigoroth', name: 'Vigoroth', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_82.png', publicid: '288', rarity: 'Uncommon', collection: ['Colorless', 'NFE', 'XY-Furious Fists', 'Gen3'], points: 3},
        'vivillon': {title: 'vivillon', name: 'Vivillon', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_17.png', publicid: '666', rarity: 'Rare', collection: ['Grass', 'NU-Pack', 'XY-Base', 'Gen6'], points: 6},
        'volbeat': {title: 'volbeat', name: 'Volbeat', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_17.png', publicid: '313', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Primal Crash', 'Gen3'], points: 3},
        'volbeat2': {title: 'volbeat2', name: 'Volbeat', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_72.png', publicid: '313a', rarity: 'Uncommon', collection: ['Grass', 'PU-Pack', 'XY-Base', 'Gen3'], points: 3},
        'voltorb': {title: 'voltorb', name: 'Voltorb', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_8.png', publicid: '100', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Roaring Skies', 'Gen1'], points: 1},
        'voltorb2': {title: 'voltorb2', name: 'Voltorb', card: 'http://assets11.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_44.png', publicid: '100a', rarity: 'Common', collection: ['Lightning', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'vsseeker': {title: 'vsseeker', name: 'VS Seeker', card: 'http://assets17.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_109.png', publicid: 'Common', collection: ['Trainer', 'Item', 'XY-Phantom Forces'], points: 1},
        'vulpix': {title: 'vulpix', name: 'Vulpix', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_20.png', publicid: '37', rarity: 'Common', collection: ['Fire', 'LC-Pack', 'XY-Primal Clash', 'Gen1'], points: 1},
        'wailordex': {title: 'wailordex', name: 'Wailord EX', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_38.png', publicid: '321EX', rarity: 'Epic', collection: ['Water', 'PU-Pack', 'EX-Pack', 'XY-Primal Clash', 'Gen3'], points: 10},
        'wailordexfull': {title: 'wailordexfull', name: 'Wailord EX (Full)', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_147.png', publicid: '321EXa', rarity: 'Legendary', collection: ['Water', 'PU-Pack', 'EX-Pack', 'XY-Primal Clash', 'Gen3', 'Full'], points: 15},
        'wally': {title: 'wally', name: 'Wally', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_94.png', publicid: 'wal', rarity: 'Epic', collection: ['Trainer', 'Supporter', 'XY-Roaring Skies'], points: 10},
        'wallyfull': {title: 'wallyfull', name: 'Wally (Full)', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_107.png', publicid: 'wala', rarity: 'Legendary', collection: ['Trainer', 'Supporter', 'XY-Roaring Skies', 'Full'], points: 15},
        'walrein': {title: 'walrein', name: 'Walrein', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_26.png', publicid: '365', rarity: 'Rare', collection: ['Water', 'PU-Pack', 'XY-Flashfire', 'Gen3'], points: 6},
        'walrein2': {title: 'walrein2', name: 'Walrein', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_48.png', publicid: '365a', rarity: 'Rare', collection: ['Water', 'PU-Pack', 'XY-Primal Clash', 'Gen3'], points: 6},
        'walreinaqua': {title: 'walreinaqua', name: 'Walrein', card: 'http://assets1.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_5.png', publicid: '365aq', rarity: 'Rare', collection: ['Water', 'PU-Pack', 'Double Crisis', 'Gen3', 'Aqua'], points: 6},
        'watchog': {title: 'watchog', name: 'Watchog', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_85.png', publicid: '505', rarity: 'Uncommon', collection: ['Colorless', 'PU-Pack', 'XY-Furious Fists', 'Gen5'], points: 3},
        'waterenergy': {title: 'waterenergy', name: 'Water Energy', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_134.png', publicid: 'watere', rarity: 'Common', collection: ['Energy', 'Basic Energy', 'XY-Base', 'XY-Primal Clash', 'XY-Flashfire', 'Double Crisis', 'XY-Kalos Starter Set', 'XY-Furious Fists', 'XY-Ancient Origins', 'XY-Roaring Skies', 'XY-Phantom Forces', 'XY-Promo', 'Water'], points: 1},
        'weaknesspolicy': {title: 'weaknesspolicy', name: 'Weakness Policy', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_142.png', publicid: 'wknplcy', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Primal Clash'], points: 3},
        'weavile': {title: 'weavile', name: 'Weavile', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY2/XY2_EN_52.png', publicid: '461', rarity: 'Uncommon', collection: ['Darkness', 'OU-Pack', 'XY-Flashfire', 'Gen4'], points: 3},
        'weedle': {title: 'weedle', name: 'Weedle', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_1.png', publicid: '13', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Primal Clash', 'Gen5'], points: 1},
        'weedle2': {title: 'weedle2', name: 'Weedle', card: 'http://assets8.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_3.png', publicid: '13a', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Base', 'Gen1'], points: 1},
        'weedle3': {title: 'weedle3', name: 'Weedle', card: 'http://assets4.pokemon.com/assets/cms2/img/cards/web/XY0/XY0_EN_1.png', publicid: '13b', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Kalos Starter Set', 'Gen1'], points: 1},
        'weepinbell': {title: 'weepinbell', name: 'Weepinbell', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY3/XY3_EN_2.png', publicid: '70', rarity: 'Uncommon', collection: ['Grass', 'NFE', 'XY-Furious Fists', 'Gen1'], points: 3},
        'whirlipede': {title: 'whirlipede', name: 'Whirlipede', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_52.png', publicid: '544', rarity: 'Uncommon', collection: ['Psychic', 'NFE', 'XY-Base', 'Gen5'], points: 3},
        'whiscash': {title: 'whiscash', name: 'Whiscash', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_40.png', publicid: '340', rarity: 'Uncommon', collection: ['PU-Pack', 'Water', 'XY-Primal Clash', 'Gen3'], points: 3},
        'whiscashdelta': {title: 'whiscashdelta', name: 'Whiscash (Delta)', card: 'http://assets16.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_41.png', publicid: '340D', rarity: 'Rare', collection: ['PU-Pack', 'Water', 'Delta', 'XY-Primal Clash', 'Gen3'], points: 6},
        'whismur': {title: 'whismur', name: 'Whismur', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_83.png', publicid: '293', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Phantom Forces', 'Gen3'], points: 1},
        'widelens': {title: 'widelens', name: 'Wide Lens', card: 'http://assets2.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_95.png', publicid: 'wid', rarity: 'Uncommon', collection: ['Trainer', 'Item', 'XY-Roaring Skies'], points: 3},
        'wigglytuff': {title: 'wigglytuff', name: 'Wigglytuff', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_90.png', publicid: '40', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'wigglytuff2': {title: 'wigglytuff2', name: 'Wigglytuff', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_89.png', publicid: '40a', rarity: 'Uncommon', collection: ['Fairy', 'PU-Pack', 'XY-Base', 'Gen1'], points: 3},
        'wingull': {title: 'wingull', name: 'Wingull', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_18.png', publicid: '278', rarity: 'Common', collection: ['Water', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'winona': {title: 'winona', name: 'Winona', card: 'http://assets3.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_96.png', publicid: 'win', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Roaring Skies'], points: 10},
        'winonafull': {title: 'winonafull', name: 'Winona (Full)', card: 'http://assets20.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_108.png', publicid: 'wina', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Roaring Skies', 'Full'], points: 15},
        'wobbuffet': {title: 'wobbuffet', name: 'Wobbuffet', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_36.png', publicid: '202', rarity: 'Uncommon', collection: ['Psychic', 'PU-Pack', 'XY-Phantom Forces', 'Gen2'], points: 3},
        'wonderenergy': {title: 'wonderenergy', name: 'Wonder Energy', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_144.png', publicid: 'wonde', rarity: 'Rare', collection: ['Energy','Special Energy', 'XY-Primal Clash', 'Fairy'], points: 6},
        'wurmple': {title: 'wurmple', name: 'Wurmple', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_3.png', publicid: '265', rarity: 'Common', collection: ['Grass', 'LC-Pack', 'XY-Roaring Skies', 'Gen3'], points: 1},
        'xatu': {title: 'xatu', name: 'Xatu', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_29.png', publicid: '178', rarity: 'Uncommon', collection: ['Psychic', 'NU-Pack', 'XY-Roaring Skies', 'Gen2'], points: 3},
        'xerneas': {title: 'xerneas', name: 'Xerneas', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY05.png', publicid: '716', rarity: 'Rare', collection: ['Fairy', 'Ubers', 'XY-Promo', 'Legendary', 'Gen6'], points: 6},
        'xerneas2': {title: 'xerneas2', name: 'Xerneas', card: 'http://assets21.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY31.png', publicid: '716a', rarity: 'Rare', collection: ['Fairy', 'Ubers', 'XY-Promo', 'Legendary', 'Gen6'], points: 6},
        'xerneas3': {title: 'xerneas3', name: 'Xerneas EX', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_96.png', publicid: '716b', rarity: 'Rare', collection: ['Fairy', 'Ubers', 'XY-Promo', 'Legendary', 'Gen6'], points: 6},
        'xerneasex': {title: 'xerneasex', name: 'Xerneas EX', card: 'http://assets24.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY07.png', publicid: '716EX', rarity: 'Epic', collection: ['Fairy', 'Ubers', 'XY-Promo', 'EX-Pack', 'Legendary', 'Gen6'], points: 10},
        'xerneasex2': {title: 'xerneasex2', name: 'Xerneas EX', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_146.png', publicid: '716EXa', rarity: 'Lgendary', collection: ['Fairy', 'Ubers', 'XY-Base', 'EX-Pack', 'Legendary', 'Gen6', 'Full'], points: 15},
        'xerneasex3': {title: 'xerneasex3', name: 'Xerneas EX', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_97.png', publicid: '716EXb', rarity: 'Epic', collection: ['Fairy', 'Ubers', 'XY-Base', 'EX-Pack', 'Legendary', 'Gen6'], points: 10},
        'xerosic': {title: 'xerosic', name: 'Xerosic', card: 'http://assets9.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_110.png', publicid: 'xer', rarity: 'Epic', collection: ['Trainer','Supporter', 'XY-Phantom Forces'], points: 10},
        'xerosicfull': {title: 'xerosicfull', name: 'Xerosic (Full)', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_119.png', publicid: 'xera', rarity: 'Legendary', collection: ['Trainer','Supporter', 'XY-Phantom Forces', 'Full'], points: 15},
        'yanma': {title: 'yanma', name: 'Yanma', card: 'http://assets14.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_3.png', publicid: '193', rarity: 'Common', collection: ['Grass', 'LC ', 'XY-Phantom Forces', 'Gen2'], points: 1},
        'yanmega': {title: 'yanmega', name: 'Yanmega', card: 'http://assets15.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_4.png', publicid: '469', rarity: 'Rare', collection: ['Grass', 'BL2 ', 'XY-Phantom Forces', 'Gen4'], points: 6},
        'yveltal': {title: 'yveltal', name: 'Yveltal', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY06.png', publicid: '717', rarity: 'Rare', collection: ['Darkness', 'Ubers', 'XY-Promo', 'Legendary', 'Gen6'], points: 6},
        'yveltal2': {title: 'yveltal2', name: 'Yveltal', card: 'http://assets22.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY32.png', publicid: '717a', rarity: 'Rare', collection: ['Darkness', 'Ubers', 'XY-Promo', 'Legendary', 'Gen6'], points: 6},
        'yveltal3': {title: 'yveltal3', name: 'Yveltal', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_78.png', publicid: '717b', rarity: 'Rare', collection: ['Darkness', 'Ubers', 'XY-Base', 'Gen6'], points: 6},
        'yveltalex': {title: 'yveltalex', name: 'Yveltal EX', card: 'http://assets25.pokemon.com/assets/cms2/img/cards/web/XYP/XYP_EN_XY08.png', publicid: '717EX', rarity: 'Epic', collection: ['Darkness', 'Ubers', 'XY-Promo', 'Legendary', 'EX-Pack', 'Gen6'], points: 10},
        'yveltalex2': {title: 'yveltalex2', name: 'Yveltal EX', card: 'http://assets10.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_144.png', publicid: '717EXa', rarity: 'Legendary', collection: ['Darkness', 'Ubers', 'XY-Base', 'Gen6', 'Full', 'EX-Pack', 'Legendary'], points: 15},
        'yveltalex3': {title: 'yveltalex3', name: 'Yveltal EX', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_79.png', publicid: '717EXb', rarity: 'Epic', collection: ['Darkness', 'Ubers', 'XY-Base', 'Gen6', 'EX-Pack', 'Legendary'], points: 10},
        'zangoosemagma': {title: 'zangoosemagma', name: 'Zangoose', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/DC1/DC1_EN_22.png', publicid: '335mag', rarity: 'Uncommon', collection: ['Colorless', 'NU-Pack', 'Double Crisis', 'Gen3', 'Magma'], points: 3},
        'zapdos': {title: 'zapdos', name: 'Zapdos', card: 'http://assets18.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_23.png', publicid: '145', rarity: 'Rare', collection: ['Lightning', 'Legendary', 'XY-Roaring Skies', 'Gen1', 'OU-Pack'], points: 6},
        'zapdosbaseset': {title: 'zapdosbaseset', name: 'Zapdos (Base Set)', card: 'http://i.imgur.com/X2PMnDl.jpg?1', publicid: '145BS', rarity: 'Mythic', collection: ['Lightning', 'Legendary', 'Gen1', 'OU-Pack'], points: 20},
        'zekrom': {title: 'zekrom', name: 'Zekrom', card: 'http://assets23.pokemon.com/assets/cms2/img/cards/web/XY6/XY6_EN_64.png', publicid: '644', rarity: 'Rare', collection: ['Dragon', 'Legendary', 'XY-Roaring-Skies', 'Gen5', 'Uber-Pack'], points: 6},
        'zigzagoon': {title: 'zigzagoon', name: 'Zigzagoon', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY5/XY5_EN_111.png', publicid: '263', rarity: 'Common', collection: ['Colorless', 'LC-Pack', 'XY-Primal Clash', 'Gen3'], points: 1},
        'zoroark': {title: 'zoroark', name: 'Zoroark', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_73.png', publicid: '571', rarity: 'Uncommon', collection: ['Darkness', 'BL2-Pack', 'XY-Base', 'Gen5'], points: 3},
        'zorua': {title: 'zorua', name: 'Zorua', card: 'http://assets12.pokemon.com/assets/cms2/img/cards/web/XY1/XY1_EN_72.png', publicid: '570', rarity: 'Common', collection: ['Darkness', 'LC-Pack', 'XY-Base', 'Gen5'], points: 1},
        'zubat': {title: 'zubat', name: 'Zubat', card: 'http://assets13.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_31.png', publicid: '41', rarity: 'Common', collection: ['Psychic', 'LC-Pack', 'XY-Phantom Forces', 'Gen1'], points: 1},
        'zweilous': {title: 'zweilous', name: 'Zweilous', card: 'http://assets19.pokemon.com/assets/cms2/img/cards/web/XY4/XY4_EN_73.png', publicid: '634', rarity: 'Uncommon', collection: ['Dragon', 'NFE', 'XY-Phantom Forces', 'Gen5'], points: 3}
}


function cachePacks() {
    for (var i = 0; i < packShop.length; i++) {
        cardCache.push(new Array());
        for (var key in cards) {
            if (cards.hasOwnProperty(key)) {
                var obj = cards[key];
                if (obj.hasOwnProperty('collection') && obj.collection.indexOf(packShop[i]) > -1) cardCache[i].push(key);
            }
        }
    }
    for (i = 0; i < packShop.length; i++) {
        cleanShop.push(toId(packShop[i]));
    }
}

global.cachePacks = cachePacks;

function cacheRarity() {
    for (var i = 0; i < cardRarity.length; i++) {
        rareCache.push(new Array());
        for (var key in cards) {
            if (cards.hasOwnProperty(key)) {
                var obj = cards[key];
                if (obj.hasOwnProperty('rarity') && obj.rarity.indexOf(cardRarity[i]) > -1) rareCache[i].push(key);
            }
        }
    }
    for (i = 0; i < cardRarity.length; i++) {
        cleanCard.push(toId(cardRarity[i]));
    }
}

global.cacheRarity = cacheRarity;

global.tourCard = function(tourSize, userid) {
    if (tourSize > 32) tourSize = 32;
    var tourRarity = tourCardRarity[Math.floor(tourSize / 4)];
    var cacheValue = rareCache[cleanCard.indexOf(toId(tourRarity))];
    var card = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
    if (tourRarity === 'No Card') return;
    addCard(userid, card);
    return [cards[card].rarity, cards[card].title, cards[card].name];
}

function addCard(name, card) {
    var newCard = {};
    newCard.id = uuid.v1();
    newCard.title = cards[card].title;
    newCard.card = cards[card].card;
    newCard.name = cards[card].name;
    newCard.rarity = cards[card].rarity;
    newCard.points = cards[card].points;
    if (!Array.isArray(Db('cards')[toId(name)])) Db('cards')[toId(name)] = [];
    Db('cards')[toId(name)].push(newCard);
    Db.save();
    var total = (Db('points')[toId(name)] || 0) + newCard.points;
    Db('points')[toId(name)] = total;
    Db.save();
}

function getShopDisplay (shop) {
    var display = "<table border='1' cellspacing='0' cellpadding='5' width='100%'>" +
                    "<tbody><tr><th>Command</th><th>Description</th><th>Cost</th></tr>";
    var start = 0;
    while (start < shop.length) {
        display += "<tr>" +
                        "<td align='center'><button name='send' value='/buypack " + shop[start][0] + "'><b>" + shop[start][0] + "</b></button>" + "</td>" +
                        "<td align='center'>" + shop[start][1] + "</td>" +
                        "<td align='center'>" + shop[start][2] + "</td>" +
                    "</tr>";
        start++;
    }
    display += "</tbody></table><center>To buy a pack from the shop, use /buypack <em>pack</em>.</center>";
    return display;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

exports.commands = {
/*
    packs: 'pack',
    pack: function(target, room, user) {
        if (!this.canBroadcast()) return;
        if (!target) target = user.name;
        target = toId(target);
        if (!userPacks[target] || userPacks[target].length === 0) {
            return this.sendReply((target === user.userid ? 'You have' : target + ' has') + ' no packs.');
        }
        this.sendReply('|raw|<u><b>List of packs:</b></u>');
        for (i = 0; i < userPacks[target].length; i++) {
            this.sendReply(toTitleCase(userPacks[i]));
        }
    },*/
    buypacks: 'buypack',
    buypack: function(target, room, user) {
        if (!target) return this.sendReply('/buypack - Buys a pack from the pack shop. Alias: /buypacks');
        var self = this;
        var packId = toId(target);
        if (cleanShop.indexOf(packId) < 0) return self.sendReply('This is not a valid pack. Use /packshop to see all packs.');
        var shopIndex = cleanShop.indexOf(toId(target));
        if (packId !== 'xybase' && packId !== 'xyfuriousfists' && packId !== 'xyflashfire' && packId !== 'xyphantomforces' && packId !== 'xyroaringskies' && packId !== 'xyprimalclash') return self.sendReply('This pack is not currently in circulation.  Please use /packshop to see the current packs.');
        if (!Db('money')[user.userid]) Db('money')[user.userid] = 0;
        var cost = shop[shopIndex][2];
        if (cost > Db('money')[user.userid]) return self.sendReply('You need ' + (cost - Db('money')[user.userid]) + ' more bucks to buy this card.');
        var total = Db('money')[user.userid] - cost;
	Db('money')[user.userid] = total;
	Db.save();
	var pack = toId(target);
	self.sendReply('|raw|You have bought ' + target + ' pack for ' + cost + 
                       ' bucks. Use <button name="send" value="/openpack ' +
                    	pack + '"><b>/openpack ' + pack + '</b></button> to open your pack.');
        self.sendReply('You have until the server restarts to open your pack.');
        if (!userPacks[user.userid]) userPacks[user.userid] = [];
        userPacks[user.userid].push(pack);
        if (room.id !== 'lobby') room.addRaw(user.name + ' has bought <b>' + target + ' pack </b> from the shop.');
        room.update();
    },
    
    packshop: function(target, room, user) {
       if (!this.canBroadcast()) return;
       return this.sendReply('|raw|' + getShopDisplay(shop));
    },
    
    open: 'openpack',
    openpacks: 'openpack',
    openpack: function(target, room, user) {
        if (!this.canBroadcast()) return;
        if (!target) {
            this.sendReply('/openpack [pack] - Open a Pokemon Card Pack. Alias: /open, /openpacks');
            return this.parse('/packs');
        }
        if (cleanShop.indexOf(toId(target)) < 0) return this.sendReply('This pack does not exist.');
        if (!userPacks[user.userid] || userPacks[user.userid].length === 0) return this.sendReply('You have no packs.');
        if (userPacks[user.userid].indexOf(toId(target)) < 0) return this.sendReply('You do not have this pack.');
        for (i=0; i<3; i++) {
            var pack = toId(target);
            var cacheValue = cardCache[cleanShop.indexOf(toId(target))];
            var card = cacheValue[Math.round(Math.random() * (cacheValue.length - 1))];
            addCard(user.userid, card);
            var cardName = cards[card].name;
            var packName = packShop[cleanShop.indexOf(toId(target))];
            this.sendReplyBox(user.name + ' got <font color="' + colors[cards[card].rarity] + '">' + cards[card].rarity + '</font>\
            <button name="send" value="/card ' + card  + '"><b>' + cardName + '</b></button> from a \
            <button name="send" value="/buypack ' + packName + '">' + packName + ' Pack</button>.');
        }
        var usrIndex = userPacks[user.userid].indexOf(pack);
        userPacks[user.userid].splice(usrIndex, 1);
},
    givepacks: 'givepack',
    givepack: function(target, room, user) {
        if (!user.can('declare')) return this.sendReply('/givepack - Access denied.');
        if (!target) return this.sendReply('/givepack [user], [pack] - Give a user a pack. Alias: /givepacks');
        var parts = target.split(',');
        this.splitTarget(parts[0]);
        if (!parts[1]) return this.sendReply('/givepack [user], [pack] - Give a user a pack. Alias: /givepacks');
        var pack = toId(parts[1]);
        var userid = toId(this.targetUsername);
        if (cleanShop.indexOf(pack) < 0) return this.sendReply('This pack does not exist.');
        if (!this.targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
        if (!userPacks[userid]) userPacks[userid] = [];
        userPacks[userid].push(pack);
        this.sendReply(this.targetUsername + ' was given ' + pack + ' pack. This user now has ' + userPacks[userid].length + ' pack(s).');
        Users.get(this.targetUsername).connections[0].sendTo(room.id,
            '|raw|' + user.name + ' has given you ' + pack + ' pack. You have until the server restarts to open your pack. \
            Use <button name="send" value="/openpack ' + pack + '"><b>/openpack ' + pack + '</b></button> to open your pack.');
    },
    takepacks: 'takepack',
    takepack: function(target, room, user) {
        if (!user.can('takepack')) return this.sendReply('/takepack - Access denied.');
        if (!target) return this.sendReply('/takepack [user], [pack] - Take a pack from a user. Alias: /takepacks');
        var parts = target.split(',');
        this.splitTarget(parts[0]);
        if (!parts[1]) return this.sendReply('/takepack [user], [pack] - Take a pack from a user. Alias: /takepacks');
        var pack = toId(parts[1]);
        var packIndex = userPacks[userid].indexOf(pack);
        var userid = toId(this.targetUsername);
        if (packsKeys.indexOf(pack) < 0) return this.sendReply('This pack does not exist.');
        if (!this.targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');
        if (!userPacks[userid]) userPacks[userid] = [];
        if (packIndex < 0) return this.sendReply('This user does not have this pack.');
        userPacks[userid].splice(packIndex, 1);
        this.sendReply(this.targetUsername + ' lost ' + pack + ' pack. This user now has ' + users[userid].length + ' pack(s).');
        Users.get(this.targetUsername).send('|raw|' + user.name + ' has taken ' + pack + ' pack from you. You now have ' +  users[userid].length + ' pack(s).');
    },

    showcards: 'showcase',
    showcard: 'showcase',
    showcase: function(target, room, user) {    
    if(!this.canBroadcast()) return;
    if (!target) {
        targetU = user;
        page = 1;
    } else if (!isNaN(target)) {
            targetU = user;
            page = target;
        } else if (target.indexOf(',') < 0) {
        targetU = target;
        page = 1;
    } else {
        parts = target.split(',');
        targetU = parts[0];
        page = parts[1];
    }
    var self = this;
    if (!Users.get(targetU)) return self.sendReply('User ' + targetU + ' not found.');
    var cards = Db('cards')[targetU];
    var points = Db('points')[targetU];
		var display = '';
		if (cards) {
			for (i = (page - 1) * 10; i < page * 10; i++) {
				if (cards[i] && cards[i].hasOwnProperty('card')) {
				display +=  '<button name="send" value="/card ' + cards[i].title + '"><img src="' + cards[i].card + '" width="50" title="' + cards[i].name +'"></button>';
				} else {
					break;
				}
			}
			display += '<br><br>' + targetU + ' has ' + points + ' points.<br><br><b>Showing cards: ' + ((page - 1) * 10) + ' through ' + (page * 10) + ' of ' + cards.length + '</b>';
		} else {
			display = targetU + ' has no cards.'
		}
		self.sendReplyBox(display);
    },
    
        card: function(target, room, user) {
        if (!target) return this.sendReply('/card [name] - Shows information about a card.');
        if (!this.canBroadcast()) return;
        var cardName = toId(target);
        if (!cards.hasOwnProperty(cardName)) return this.sendReply(target + ': card not found.');
        var card = cards[cardName];
        var html = '<img src="' + card.card + '" title="' + card.name + '" align="left">\
                <br><center><h1><u><b>' + card.name + '</b></u></h1>\
                <br><br>\
                <h2><font color="' + colors[card.rarity] + '">' + card.rarity + '</font></h2>\
                <br><br>\
                <font color="#AAA"><i>Points:</i></font><br>' + 
                card.points + '<br><br>\
        <font color="#AAA"><i>Found in Packs:</i></font><br>' + 
                card.collection.join(', ') + '</center><br clear="all">';
        this.sendReplyBox(html);
    },

	cardrank: 'cardladder',
	cardladder: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var display = '<center><u><b>Card Ladder</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Rank</th><th>Username</th><th>Points</th></tr>';
		var keys = Object.keys(Db('points')).map(function(name) {
			return {name: name, points: Db('points')[name]};
		});
		if (!keys.length) return this.sendReplyBox("Cardladder is empty.");
		keys.sort(function (a, b) {
			return b.points - a.points;
		});
		keys.slice(0, 10).forEach(function (user, index) {
			display += "<tr><td>" + (index + 1) + "</td><td>" + user.name + "</td><td>" + user.points + "</td></tr>";
		});
		display += "</tbody></table>";
		this.sendReply("|raw|" + display);
	},
/*     transfercard: function (target, room, user) {
    var parts = target.split(',');
    if (!parts[0] || !parts[1]) return this.sendReply('/transfercard [user], [cardID] - Transfers a card to a user.');
    if (!Users.get(toId(parts[0]))) return this.sendReply('User ' + parts[0] + ' was not found.');
    if (parts[1].indexOf('-') === -1) return this.sendReply('This is not a valid card ID.');
    var self = this;
    Database.findOne('cards', parts[1], user.userid, function (err, cardObj) {
        if (err || !cardObj) return self.sendReply('You don\'t have this card.'); 
        Database.remove('cards', parts[1], user.userid, function (err) {
            if (err || !cardObj) return self.sendReply(err);
            Database.read('points', user.userid, function (err, oldPoints) {
                if (err) oldPoints = 0;
                Database.write('points', oldPoints - cardObj.points, user.userid, function (err) {
                    if (err) throw err;
                    cardObj.points = 0;
                    Database.add('cards', cardObj, toId(parts[0]), function (err) {
                        if (err) throw err;
                        return self.sendReply('You have successfully transferred the card to ' + parts[0] + '.');
                        Users.get(toId(parts[0])).popup(user.name + ' has sent you a card!');
                    });
                });
            });
        });
    });
      },
  */    psgo: 'cardshelp',
      eoscg: 'cardshelp',
      cardshelp: function (target, room, user) {
        if (!this.canBroadcast()) return;
            return this.sendReplyBox('\
            <center><b><u>EOS Trading Card Game:</u></b></center><br>\
            <b>/buypack</b> - Buys a pack from the pack shop.<br>\
            <b>/packshop</b> - Shows the shop for buying packs.<br>\
            <b>/openpack</b> - Opens a pack that has been purchased from the shop.<br>\
            <b>/openpack</b> - Opens a pack that has been purchased from the shop.<br>\
            <b>/showcase</b> - Shows a display of all cards that you have. Specify a page number to see more cards.<br>\
            <b>/card</b> - Shows data and information on any specifc card.<br>\
            <b>/cardladder</b> - Shows the leaderboard of the users with the most card points.<br>\
            ');
    }
};
