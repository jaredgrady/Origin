"use strict";
let pornSites = [
	"spankwire.com",
	"pornhub.co",
	"beeg.com",
	"/anne.jpg",
	".nimp",
	"discharges.org",
	"fuck.org",
	"smoke.rotten",
	"threat.tv",
	"nobrain.dk",
	"heyya.org",
	"k-k-k.com",
	"biblecamp.info",
	"8p1.net",
	"tard.biz",
	"lulz.info",
	"insulting.com",
	"shorty.com",
	"ogrish.com",
	"rotten.com",
	"/fchan.com",
	".fchan.com",
	"psyke.org",
	"bloodshows.com",
	"dontwatch.us",
	"petardas.com",
	"motherless.com",
	"porn.com",
	"xhamster.com",
	"youporn.com",
	"[[porn]]",
	"brazzers.com",
	"redtube.com",
	"xnxx.com",
	"fakku.net",
	"hentai-foundry.com",
	"xvideos.com",
	"youjizz.com",
	"tube8.com",
	"exhentai.org",
	".paheal.",
	"meatspin.",
	"2girls1cup.",
	"cliphunter.com",
	"goku.com",
	"xxx.com",
	"xxxmanhub",
	"hugetitspic",
	"agor.io",
	"slimjimboner",
	"specialfriedrice",
	"lazysunday",
	"happypuppies",
	"manhub",
	"sourmath",
	"420yolo.com",
	"burntbutts",
	"strawpoii",
	"walkthedinosaur",
	"punishtube",
	"dickhub",
	"sukatoro",
	"octopusgirl",
	"kidsinsandbox",
	"scrollbelow",
	"painolympics",
	"1man2needles",
	"lolshock",
	"prolapseman",
	"themacuser",
	"loltrain",
	"fruitlauncher",
	"milkfountain",
	"homewares",
	"japscat",
	"dadparty",
	"hai2u",
	"bottleguy",
	"turdgasm",
	"vomitgirl",
	"1priest1nun",
	"bowlgirl",
	"eelsoup",
	"goatsegirl",
	"clownsong",
	"phonejapan",
	"wormgush",
	"funelchair",
	"lolhello",
	"mudmonster",
	"nutabuse",
	"suckdude",
	"1man1jar",
	"thehomo",
	"selfpwn",
	"bluewaffle",
	"merryholidays",
	"howtotroll",
	"2girls1finger",
	"2guys1stump",
	"3guys1hammer",
	"1guy1cock",
	"1girl1pitcher",
	"24girlsfingerpaint",
	"donotwatch",
	"smogonscouting",
	"lovethecock",
	"shockhorrormedia",
	"gardenerplants",
	"wowomg",
	"infoslash",
	"googlehammer",
	"funnymyspacecomment",
	"watchbritneyspears",
	"thewillpower",
	"stagparty",
	"funnelchair",
	"jizztini",
	"bagslap",
	"mudfall",
	"uncoverreality",
	"cakefart",
	"cupchicks",
	"cupcid",
	"sandcup",
	"free2g1c",
	"girlvinyl",
	"ilovethefishes",
	"jarsquatter",
	"2guys1horse",
	"bangedup",
	"mylazysundays",
	"ooskar",
	"canadianteaparty",
	"macory",
	"yellaface",
	"thatsphucked",
	"meatspinnetwork",
	"saladandchips",
	"1guy2needles",
	"eatingcream",
	"fingerslam",
	"goatsemarathon",
	"mangems",
	"pressurespot",
	"videos-xxx-porno",
	"teensluts",
	"youaresogay",
	"thepounder",
	"nowshowfriendsandworkmates",
	"fudgepipe",
	"whoomp.org",
	"shoopdawhoop",
	"prolapseman",
	"loltrain",
	"homewares",
	"japscat",
	"dadparty",
	"clownsong",
	"phonejapan",
	"conedstuntsinc",
	"mudmonster",
	"nutabuse",
	"suckdude",
	"funnelgirl",
	"cherrycake",
	"dancingsnake",
	"porkyhost",
	"fanbangho",
	"nutsintheass",
	"nutsinpalin",
	"porkspin",
	"skindroop",
	"cumomlette",
	"puddingfarter",
	"salsasnack",
	"girltap",
	"merryholidays",
	"specialfriendrice",
	"eatyoursoup",
	"ragingfist",
	"tubguys",
	"alaskanblacksnake",
	"jewsnip",
	"meatloadfarts",
	"bloggerpals",
	"cleangirls",
	"1guymudpie",
	"brownhost",
	"motherman",
	"4girlsfingerpaint",
	"puppybeef",
	"kittybeaf",
	"ratbeef",
	"puppyprofits",
	"stopdogfighting",
	"abortiontracker",
	"analometer",
	"childtrader",
	"gynosmart",
	"kidsconcentrationcamps",
	"neutermexicans",
	"scientologyloans",
	"teacherharmony",
	"victimsofchildren",
	"manbeef",
	"dolphinsex",
	"cheapabortions",
	"aidsmapper",
	"ogrishforum",
	"goregrish",
	"viraldeath",
	"gordgasm",
	"theync",
	"nothingtoxic",
	"cutedeadguys",
	"gurochan",
	"weticecream",
	"sexy-natalie",
	"bangyoulater",
	"freeyouporn",
	"milfhunter",
	"minecraftpromotions",
	"findminecraft",
	"clashofclanshelper",
	"happytugs",
	"jackhammerjesus",
	"hentaigasm",
	"efukt",
	"e-hentai",
	"spankwire",
	"pornhub",
	"redtube",
	"brazzers",
	"xhamster",
	"youporn",
	"xnxx",
	"fakku",
	"hentaifoundry",
	"goatse",
	"xvideos",
	"youjizz",
	"tube8",
	"lemonparty",
	"exhentai",
	"sadpanda",
	"paheal",
	"meatspin",
	"2girls1cup",
	"jenkem",
	"cliphunter",
	"nigger",
];

function regexify(string) {
	return string.split("").map(l => {
		return /[0-9A-Za-z\s]/i.test(l) ? l : "\\" + l;
	}).join("");
}

let buildPornRegex = "(" + pornSites.map(s => {
	if (s.indexOf(".") === -1) return regexify("[[" + s + "]]");
	return regexify(s);
}).join("|") + ")";

let pornRegex = new RegExp(buildPornRegex, "i");

let testForPorn = function (target, room, user) {
	if (!target || !room || !user) return;
	if (room.id === 'staff' || room.id === 'upperstaffroom') return; // prevent filter from checking in staff rooms
	// check if the message contains a treasure, and that the user is not staff.
	if (pornRegex.test(target) && !user.isStaff) {
		// skip the alerts if user is locked, but still 
		if (user.locked) {
			Users.ShadowBan.addMessage(user, "porn - " + room.id, "spoiler: " + target);
			return true;
		}
		// lock and deconfirm user
		let deconfirm = user.deconfirm();
		user.lock(false, user.userid);
		Monitor.log("[AutoLockMonitor] " + user.userid + " was locked in " + room.id + (deconfirm && deconfirm.length ? " and was demoted from " + deconfirm.join(", ") : "") + ". (Message: " + target + ")");
		return true;
	}
	return false;
};

module.exports = testForPorn;
