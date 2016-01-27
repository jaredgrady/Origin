var fs = require('fs');

exports.commands = {
	meme:'memes',
	memes: function(target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.sendReply("Not for you bb");
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		var matched = false;
		if (target === ''){
			var rand = ~~(15 * Math.random()) + 1;
			switch (rand) {
				case 1: image = '<center><img src="http://40.media.tumblr.com/bf09a61c80e6454c84d3e42fca4cefd7/tumblr_nm4wt0t9wk1tezt7xo1_1280.jpg" width="370" height="300">'; break;
				case 2: image = '<center><img src="http://41.media.tumblr.com/c0dc1f30a00cfeb26908d32ea9173026/tumblr_nn2fga7ByA1titub2o1_500.jpg" width="370" height="300">'; break;
				case 3: image = '<center><img src="http://36.media.tumblr.com/ff32d3420d5a204f2fad0cd5870f1138/tumblr_inline_nnmvvqUvZH1sj0hte_500.jpg" width="370" height="300">'; break;
				case 4: image = '<center><img src="http://38.media.tumblr.com/3af642e1518df5dc3f8ce22854e50089/tumblr_nmqoxiFH5V1titub2o1_500.gif" width="370" height="300">'; break;
				case 5: image = '<center><img src="http://static.tumblr.com/32b25f5ab4868d19f0da922c074d3509/z9etoq1/7cYnnrhkk/tumblr_static_filename_2048_v2.jpg" width="370" height="300">'; break;
				case 6: image = '<center><img src="http://2.bp.blogspot.com/-Qisrem650GQ/VT15XuTSFZI/AAAAAAAALq8/Ay54y5NWcVE/s1600/pepe-the-frog-meme-2.png" width="370" height="300">'; break;
				case 7: image = '<center><img src="http://i3.kym-cdn.com/photos/images/newsfeed/000/943/223/bf3.jpg" width="450" height="302">'; break;
				case 8: image = '<center><img src="https://secure.static.tumblr.com/9aae7566870b307d20392dd727e93c9f/yeg5f0x/A6knm9604/tumblr_static_tumblr_static_99la8byebf8c0og8osocc4wcc_640.png" width="390" height="300">'; break;
				case 9: image = '<center><img src="http://data.whicdn.com/images/163486788/superthumb.jpg" width="306" height="365">'; break;
				case 10: image = '<center><img src="https://41.media.tumblr.com/7756957d8dbb5681cf8ff5d2e6937225/tumblr_inline_nt3c1hgdyi1ro15s8_540.jpg" width="236" height="314">'; break;
				case 11: image = '<center><img src="http://36.media.tumblr.com/91155dbe2c370bc9dbb0f5fa2ef21a0c/tumblr_nndshtBebj1titub2o1_500.jpg" width="300" height="240">'; break;
				case 12: image = '<center><img src="http://ih1.redbubble.net/image.54866125.5894/flat,1000x1000,075,f.jpg" width="350" height="358">'; break;
				case 13: image = '<center><img src="http://33.media.tumblr.com/9ff659ca5750fb534f5bb1a3dc602ea5/tumblr_inline_nkxcuaWJkW1rp3ukq.jpg" width="350" height="300">'; break;
				case 14: image = '<center><img src="http://i2.kym-cdn.com/photos/images/facebook/000/862/065/0e9.jpg" width="400" height="400">'; break;
				case 15: image = '<center><img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS9zRB7hb0_k18aCmHCPGKBlO6ZLQ6PJzyAuMC3Dk6Si4xeAAs8WD9bk84" width="350" height="350">'; break;
			}
        	}
		this.sendReplyBox(image);
  	},
	communism: function(target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.sendReply("Not for you bb");
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		var matched = false;
		if (target === '') {
			var rand = ~~(13 * Math.random()) + 1;
			switch (rand) {
				case 1: image = '<center><img src="http://cs.stanford.edu/people/eroberts/cs181/projects/communism-computing-china/heads.jpg" width="370" height="300">'; break;
				case 2: image = '<center><img src="http://wallpapersuggest.com/download/communism_5_wallpapersuggest_com-1280x1024.jpg" width="370" height="300">'; break;
				case 3: image = '<center><img src="http://b-i.forbesimg.com/realspin/files/2013/04/300px-Communist_star.svg_.jpg" width="370" height="300">'; break;
				case 4: image = '<center><img src="http://2.bp.blogspot.com/-jwfB_NrO5eM/UJyndOQPB4I/AAAAAAAABAs/cZJasn_ubEE/s1600/communism___full_game_board_by_spiffyofcrud.jpeg" width="370" height="300">'; break;
				case 5: image = '<center><img src="http://img14.deviantart.net/278f/i/2012/273/0/7/fight_for_communism_by_party9999999-d5ge4x9.png" width="370" height="300">'; break;
				case 6: image = '<center><img src="http://uscrow.org/wp-content/uploads/2012/12/Communist-Obama.jpg" width="370" height="300">'; break;
				case 7: image = '<center><img src="http://img07.deviantart.net/6d83/i/2013/197/c/c/communism__wallpaper_by_comradeblotter-d6dq03a.png" width="450" height="302">'; break;
				case 8: image = '<center><img src="https://elementarypolitics.files.wordpress.com/2015/03/communism.jpg" width="390" height="300">'; break;
				case 9: image = '<center><img src="http://fc04.deviantart.net/fs11/i/2006/188/b/a/Communism_loves_life_by_SolomoneCaine.jpg" width="306" height="365">'; break;
				case 10: image = '<center><img src="http://images.onset.freedom.com/ocregister/blogs/letters.ocregister.com/communism-289x300.jpg" width="236" height="314">'; break;
				case 11: image = '<center><img src="http://www.jesus-is-savior.com/Evils%20in%20Government/Communism/barack_obama.jpg" width="300" height="240">'; break;
				case 12: image = '<center><img src="http://static.fjcdn.com/comments/The+worse+the+communist+leader+the+less+facial+hair+he+_6aa83e009aaed970bf6f75eb40e84a0c.png" width="350" height="300">'; break;
				case 13: image = '<center><img src="http://websocialshares.com/wp-content/uploads/2015/03/14258770826066-stalin.jpg" width="400" height="400">'; break;
			}
        	}
		this.sendReplyBox(image);
	},
	zooweemama: function(target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.sendReply("Not for you bb");
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		var matched = false;
		if (target === '') {
			var rand = ~~(7 * Math.random()) + 1;
			switch (rand) {
				case 1: image = '<center><img src="http://i.ytimg.com/vi/QxwLhFWEgi4/hqdefault.jpg" width="370" height="300">'; break;
				case 2: image = '<center><img src="http://www.mypokecard.com/en/Gallery/my/galery/gPSdEnCwh.jpg" width="370" height="300">'; break;
				case 3: image = '<center><img src="http://www.mypokecard.com/en/Gallery/my/galery/ud7UrQmYtmp.jpg" width="370" height="300">'; break;
				case 4: image = '<center><img src="http://www.mypokecard.com/en/Gallery/my/galery/1xAx3H4P7gx.jpg" width="370" height="300">'; break;
				case 5: image = '<center><img src="http://www.classtools.net/FB/fbsaved/1095/zdnHLZ/rowley_1409668273.jpg" width="370" height="300">'; break;
				case 6: image = '<center><img src="http://www.mypokecard.com/en/Gallery/my/galery/0ll31AGHkEWo.jpg" width="370" height="300">'; break;
				case 7: image = '<center><img src="http://vignette4.wikia.nocookie.net/king-harkinian/images/b/b2/Zoo_Wee-Mama_Luigi.png" width="450" height="302">'; break;
			}
        	}
		this.sendReplyBox(image);
	},
	crashlogs: function (target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("Access denied.");
		var i = -50;
		var crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(i).join('\n');
		var crashesLines = Number(target);
		if (isNaN(target) || !target || Number(target) < 10) crashesLines = 10;
		if (crashesLines > 50) crashesLines = 50;
		for (; crashes.split('\n\n').length <= crashesLines; i--) {
			crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(i).join('\n');
			if (crashes.split('\n\n').length === crashesLines && crashes.toString().substr(0, 22) === 'Additional information') {
				for (; crashes.split('\n\n').length <= crashesLines + 1; i--) {
					crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(i - 1).join('\n');
				}
			}
		}
		crashes = fs.readFileSync('logs/errors.txt', 'utf8').split('\n').splice(i + 3).join('\n');
		user.send('|popup|' + crashes);
	},
	restart: function(target, room, user) {
		if (!~developers.indexOf(user.userid)) return this.errorReply("Access denied.");
		try {
			var forever = require('forever');
		} catch (e) {
			return this.sendReply("/restart requires the \"forever\" module.");
		}
		if (!Rooms.global.lockdown) {
			return this.sendReply("For safety reasons, /restart can only be used during lockdown.");
		}
		if (CommandParser.updateServerLock) {
			return this.sendReply("Wait for /updateserver to finish before using /restart.");
		}
		this.logModCommand(user.name + ' used /restart');
		Rooms.global.send('|refresh|');
		forever.restart('app.js');
	},
};
