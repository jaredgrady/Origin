'use strict';

function rankLadder(title, type, array, prop) {
	const ladderTitle = '<center><b><u><font size="2">' + title + '</font><b></u></center><br>';
	const tableTop = '<div style="max-height: 310px; overflow-y: scroll">' + 
		'<table border="1" cellspacing="0" cellpadding="5" width="100%">' + 
		'<tbody><tr><th>Rank</th><th>Username</th><th>' + type + '</th></tr>';
	const tableBottom = '</tbody></table></div>';
	const midColumn = '&nbsp;</td><td>&nbsp;';
	const length = array.length;

	let tableRows = '';	

	for (let i = 0; i < length; i++) {
		tableRows += '<tr><td>&nbsp;' + (i + 1) + midColumn + array[i].name + midColumn + array[i][prop] + '&nbsp;</td></tr>';
	}

	return ladderTitle + tableTop + tableRows + tableBottom;
}

module.exports = rankLadder;