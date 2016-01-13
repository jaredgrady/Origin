'use strict';
//Random animal generator by Audino Primal. Finished by fender with manual labor from Natsume, tex rex1, Sundar, and ntgs.//
exports.commands = {
	kitten: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		let matched = false;
		let image;
		if (target === '') {

			let rand = ~~(15 * Math.random()) + 1;

			switch (rand) {
				case 1:
				image = '<center><img src="http://dreamatico.com/data_images/kitten/kitten-3.jpg" width="370" height="300">';
				break;
				case 2:
				image = '<center><img src="https://missswedishkiwi.files.wordpress.com/2015/05/kitten3.jpg" width="370" height="300">';
				break;
				case 3:
				image = '<center><img src="http://img1.wikia.nocookie.net/__cb20140519075925/thehungergames/images/8/84/Kitten-16219-1280x800.jpg" width="370" height="300">';
				break;
				case 4:
				image = '<center><img src="http://www.pethealthystore.com/wp-content/uploads/2015/01/kitten-bottle-feed.jpg" width="370" height="300">';
				break;
				case 5:
				image = '<center><img src="http://picture1.gallery/wp-content/uploads/2015/01/picture1.gallery_4-76.jpg" width="370" height="300">';
				break;
				case 6:
				image = '<center><img src="http://images4.fanpop.com/image/photos/16100000/Cute-Kitten-kittens-16122946-1280-800.jpg" width="370" height="300">';
				break;
				case 7:
				image = '<center><img src="http://40.media.tumblr.com/tumblr_m2nmt6CouC1rtpv45o1_500.jpg" width="450" height="302">';
				break;
				case 8:
				image = '<center><img src="http://40.media.tumblr.com/tumblr_lcdtqk7zaU1qemjrpo1_1280.jpg" width="390" height="300">';
				break;
				case 9:
				image = '<center><img src="https://s-media-cache-ak0.pinimg.com/236x/c8/68/a2/c868a2446fc9991bba35cb24f2dd7ffd.jpg" width="306" height="365">';
				break;
				case 10:
				image = '<center><img src="https://s-media-cache-ak0.pinimg.com/236x/a8/c2/d0/a8c2d0cf197a662ec6bc9b21b3317ca4.jpg" width="236" height="314">';
				break;
				case 11:
				image = '<center><img src="http://files.dogster.com/pix/games/trivia/med_ec3a1d92a97fae0e8b5e73eaeecedeeb_1242855087.jpg" width="300" height="240">';
				break;
				case 12:
				image = '<center><img src="http://www.tehcute.com/pics/201109/bow-tie-kitten.jpg" width="350" height="358">';
				break;
				case 13:
				image = '<center><img src="http://assets.nydailynews.com/polopoly_fs/1.1501252.1383165092!/img/httpImage/image.jpg_gen/derivatives/gallery_1200/kitten-bowl.jpg" width="350" height="300">';
				break;
				case 14:
				image = '<center><img src="http://25.media.tumblr.com/tumblr_mb25o8Ih3Z1qkp9zpo1_500.jpg" width="400" height="400">';
				break;
				case 15:
				image = '<center><img src="https://metrouk2.files.wordpress.com/2013/07/gh2.jpg" width="350" height="350">';
				break;


			}
		}
		this.sendReplyBox(image);
	},

	puppy: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		let matched = false;
		let image;
		if (target === '') {

			let rand = ~~(15 * Math.random()) + 1;

			switch (rand) {
				case 1:
				image = '<center><img src="http://bebusinessed.com/wp-content/uploads/2014/03/734899052_13956580111.jpg" width="370" height="300">';
				break;
				case 2:
				image = '<center><img src="http://www.cdc.gov/animalimportation/images/dog2.jpg" width="370" height="300">';
				break;
				case 3:
				image = '<center><img src="http://bestinspired.com/wp-content/uploads/2015/03/Cute-dog-listening-to-music-1_1.jpg" width="370" height="300">';
				break;
				case 4:
				image = '<center><img src="http://bestinspired.com/wp-content/uploads/2015/03/Cute-dog-listening-to-music-1_1.jpg" width="370" height="300">';
				break;
				case 5:
				image = '<center><img src="https://www.petfinder.com/wp-content/uploads/2012/11/dog-how-to-select-your-new-best-friend-thinkstock99062463.jpg">';
				break;
				case 6:
				image = '<center><img src="http://www.explosion.com/wp-content/uploads/2014/12/813.jpg" width="370" height="300">';
				break;
				case 7:
				image = '<center><img src="https://poolhouse.s3.amazonaws.com/blog-assets-two/2014/09/147083304-dogs-home-alone-all-day-632x475.jpg" width="450" height="302">';
				break;
				case 8:
				image = '<center><img src="http://www.rankkin.com/files/media/739/72333fc9827105405a55396ff5f50a98.jpg" width="450" height="302">';
				break;
				case 9:
				image = '<center><img src="http://www.metrodogstop.com/cms/wp-content/uploads/2013/05/cute-dog.jpg" width="306" height="365">';
				break;
				case 10:
				image = '<center><img src="http://media1.santabanta.com/full1/Animals/Dogs/dogs-87a.jpg" width="236" height="314">';
				break;
				case 11:
				image = '<center><img src="https://thenypost.files.wordpress.com/2014/01/dogs1.jpg" width="300" height="240">';
				break;
				case 12:
				image = '<center><img src="http://dognotebook.first.netdna-cdn.com/wp-content/uploads/2014/02/AmericanPitBullTerrier.jpg" width="350" height="358">';
				break;
				case 13:
				image = '<center><img src="http://wallpapershdfine.com/wp-content/gallery/baby-dogs-images/cute-dog-baby-wallpaper-hd-48.jpg" width="350" height="300">';
				break;
				case 14:
				image = '<center><img src="http://images6.fanpop.com/image/photos/35200000/Puppy-dogs-35247732-1440-900.jpg">';
				break;
				case 15:
				image = '<center><img src="http://www.funchap.com/wp-content/uploads/2014/05/small-dog.jpg" width="350" height="350">';
				break;


			}
		}
		this.sendReplyBox(image);
	},

	cow: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		let matched = false;
		let image;
		if (target === '') {

			let rand = ~~(15 * Math.random()) + 1;

			switch (rand) {
				case 1:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg" width="370" height="300">';
				break;
				case 2:
				image = '<center><img src="http://www.saawinternational.org/cow2.jpg" width="370" height="300">';
				break;
				case 3:
				image = '<center><img src="http://news.bbcimg.co.uk/media/images/66107000/jpg/_66107992_139523581.jpg" width="370" height="300">';
				break;
				case 4:
				image = '<center><img src="http://gavwebclass.com/sp11/gsigler/cow-03.jpg" width="370" height="300">';
				break;
				case 5:
				image = '<center><img src="http://www.fairyist.com/wp-content/uploads/2013/01/three-cows-fairies.gif" width="370" height="300">';
				break;
				case 6:
				image = '<center><img src="http://www.offthegridnews.com/wp-content/uploads/2013/04/cow-manure-natural-gas.jpg" width="370" height="300">';
				break;
				case 7:
				image = '<center><img src="http://static.guim.co.uk/sys-images/Education/Pix/pictures/2010/4/8/1270737001324/Some-cows-had-resting-tim-001.jpg">';
				break;
				case 8:
				image = '<center><img src="https://literaryundertakings.files.wordpress.com/2014/10/tumblr_static_cow.jpg" width="390" height="300">';
				break;
				case 9:
				image = '<center><img src="http://assets.nydailynews.com/polopoly_fs/1.1424649!/img/httpImage/image.jpg_gen/derivatives/article_970/cows13n-2-web.jpg" width="306" height="365">';
				break;
				case 10:
				image = '<center><img src="http://www.wrightsdairyfarm.com/images/holstein-cow.jpg" width="236" height="314">';
				break;
				case 11:
				image = '<center><img src="http://i.telegraph.co.uk/multimedia/archive/02075/COW_2075448c.jpg" width="300" height="240">';
				break;
				case 12:
				image = '<center><img src="http://static.baubau.bg/resources/sueveriq-s-kravi.jpg" width="350" height="358">';
				break;
				case 13:
				image = '<center><img src="http://www.genomenewsnetwork.org/gnn_images/news_content/02_03/cows/cows_1.jpg" width="350" height="300">';
				break;
				case 14:
				image = '<center><img src="http://blog.marincountyparks.org/wp-content/uploads/2013/03/cows-mt-burdell-2.jpg" width="400" height="400">';
				break;
				case 15:
				image = '<center><img src="http://hypescience.com/wp-content/uploads/2015/03/unidades-de-medida-absurdas-8.jpg" width="350" height="350">';
				break;


			}
		}
		this.sendReplyBox(image);
	},

	frog: function(target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		let matched = false;
		let image;
		if (target === '') {

			let rand = ~~(15 * Math.random()) + 1;

			switch (rand) {
				case 1:
				image = '<center><img src="http://www.ryanphotographic.com/imagesAgalychris%20callidryas%20head%20on.jpg" width="370" height="300">';
				break;
				case 2:
				image = '<center><img src="http://australianmuseum.net.au/uploads/images/11950/frog%20caerulea_big.jpg" width="370" height="300">';
				break;
				case 3:
				image = '<center><img src="http://voices.nationalgeographic.com/files/2013/11/poison-dart-frog-pumilio-defenses-s2048x1372-p.jpg" width="370" height="300">';
				break;
				case 4:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Atelopus_zeteki1.jpg" width="370" height="300">';
				break;
				case 5:
				image = '<center><img src="http://www.euclidlibrary.org/images/tickle-your-brain/blue-poison-dart-frog.jpg?sfvrsn=0" width="370" height="300">';
				break;
				case 6:
				image = '<center><img src="http://www.interestingeverything.com/wp-content/uploads/2013/02/red-eyed-tree-frog.png" width="370" height="300">';
				break;
				case 7:
				image = '<center><img src="http://www.devbio.biology.gatech.edu/wp-content/uploads/2011/04/poison-dart-frog1.jpg" width="450" height="302">';
				break;
				case 8:
				image = '<center><img src="http://saurian.net/images/P/pictusDSC_0545.jpg" width="390" height="300">';
				break;
				case 9:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/4/49/Green_treefrog.jpg" width="306" height="365">';
				break;
				case 10:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Bombina_bombina_1_%28Marek_Szczepanek%29_tight_crop.jpg" width="236" height="314">';
				break;
				case 11:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Ranapipiensmoulting.jpg" width="300" height="240">';
				break;
				case 12:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Assa_darlingtoni.jpg" width="350" height="358">';
				break;
				case 13:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Bufo_periglenes2.jpg" width="350" height="300">';
				break;
				case 14:
				image = '<center><img src="http://www.earthtimes.org/newsimage/save-frogs_02742012.jpg" width="400" height="400">';
				break;
				case 15:
				image = '<center><img src="http://museum.wa.gov.au/sites/default/files/imagecache/wam_v2_article_half_nocrop/photo-galleries/574.jpeg" width="350" height="350">';
				break;


			}
		}
		this.sendReplyBox(image);
	},

	zoo: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		let matched = false;
		let image;
		if (target === '') {

			let rand = ~~(15 * Math.random()) + 1;

			switch (rand) {
				case 1:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Equus_quagga.jpg" width="370" height="300">';
				break;
				case 2:
				image = '<center><img src="http://www.metalinjection.net/wp-content/uploads/2014/08/Giraffe-Tongue-Orchestra.jpg" width="370" height="300">';
				break;
				case 3:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Hippo_at_dawn.jpg" width="370" height="300">';
				break;
				case 4:
				image = '<center><img src="http://funcrisp.com/wp-content/uploads/2015/03/12088-tiger-resting-1680x1050-animal-wallpaper.jpg" width="370" height="300">';
				break;
				case 5:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/cockatoo_thumb.jpg?itok=TZFExuCc" width="370" height="300">';
				break;
				case 6:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/cheetah_thumb.jpg?itok=6NrXsFCa" width="370" height="300">';
				break;
				case 7:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/elephant_thumb.jpg?itok=0PYzIpN5" width="450" height="302">';
				break;
				case 8:
				image = '<center><img src="http://www.themoneyillusion.com/wp-content/uploads/2013/08/Screen-Shot-2013-08-16-at-10.39.59-AM.png" width="390" height="300">';
				break;
				case 9:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/flamingo_thumb.jpg?itok=UFXcy616" width="306" height="365">';
				break;
				case 10:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/meerkat_thumb.jpg?itok=asJzq9Dg" width="236" height="314">';
				break;
				case 11:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/rhino_thumb.jpg?itok=cHmhOX6W" width="300" height="240">';
				break;
				case 12:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/warthog_thumb.jpg?itok=V5iZRXmC" width="350" height="358">';
				break;
				case 13:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/sea_lion_thumb.jpg?itok=yxoOveXk" width="350" height="300">';
				break;
				case 14:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/tarantula_thumb.jpg?itok=1ftXZYuF" width="400" height="400">';
				break;
				case 15:
				image = '<center><img src="http://animals.sandiegozoo.org/sites/default/files/styles/feeds_animal_thumbnail/public/tuatara_thumb.jpg?itok=DVPgvgfY" width="350" height="350">';
				break;


			}
		}
		this.sendReplyBox(image);
	},

	otter: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		let matched = false;
		let image;
		if (target === '') {

			let rand = ~~(15 * Math.random()) + 1;

			switch (rand) {
				case 1:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Mother_sea_otter_with_rare_twin_baby_pups_(9139425522).jpg" width="370" height="300">';
				break;
				case 2:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Otter_in_Southwold.jpg" width="370" height="300">';
				break;
				case 3:
				image = '<center><img src="http://seaotters.com/wp-content/uploads/2012/03/628x353-otter-cu-yawn.jpg" width="370" height="300">';
				break;
				case 4:
				image = '<center><img src="http://moberly.k12.mo.us/Forms/MATC/wd/sitesg/Images/Otters7.jpg" width="370" height="300">';
				break;
				case 5:
				image = '<center><img src="http://images.nationalgeographic.com/wpf/media-live/photos/000/006/cache/na-river-otter_641_600x450.jpg?01AD=3rqc9emuABg0cpYuW3M25phhw9XGiqOfQy2rNpvyOqXcDz4e1u1614A&01RI=4A6BDB8C0B1D6ED&01NA=" width="370" height="300">';
				break;
				case 6:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Otter_5_(3308782493).jpg/1175px-Otter_5_(3308782493).jpg" width="370" height="300">';
				break;
				case 7:
				image = '<center><img src="http://suptg.thisisnotatrueending.com/archive/29024065/images/1387760440189.jpg" width="450" height="302">';
				break;
				case 8:
				image = '<center><img src="http://toco.distractify.com/postimage/201409/18/7eb1ff6612718c805dbe424d7b03a4e8_650x.jpg" width="390" height="300">';
				break;
				case 9:
				image = '<center><img src="https://hedgiejim.files.wordpress.com/2012/06/european_otter_1.jpg" width="306" height="365">';
				break;
				case 10:
				image = '<center><img src="http://www.wildnatureimages.com/images%203/080505-003..jpg" width="236" height="314">';
				break;
				case 11:
				image = '<center><img src="http://www.uas.alaska.edu/arts_sciences/naturalsciences/biology/sea_otter_symposium/images/otter-banner.jpg" width="300" height="240">';
				break;
				case 12:
				image = '<center><img src="http://www.seaotters.org/information/uploads/2013/02/BA_OtterTeeth-e1360638434254.jpg" width="350" height="358">';
				break;
				case 13:
				image = '<center><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Hello,_Human..._(SINGAPORE_ZOO-OTTER-ANIMALS-GREETING)_IV_(752719117).jpg" width="350" height="300">';
				break;
				case 14:
				image = '<center><img src="http://www.defenders.org/sites/default/files/styles/large/public/magazine-spring-2012-sea-otter-michael-l-baird.jpg" width="400" height="400">';
				break;
				case 15:
				image = '<center><img src="http://www.redorbit.com/media/uploads/2013/08/sea-otters-food-web-shutterstock_128679956-617x416.jpg" width="350" height="350">';
				break;


			}
		}
		this.sendReplyBox(image);
	},

	animals: function (target, room, user) {
		if (!this.canBroadcast()) return;
		target = target.toLowerCase();
		if (target === '') {
			return this.sendReplyBox('<center><b>Random Animals</b><br> Use any of the below to generate random animal image:</br><br>puppy - Generates a random dog</br><br>kitten - Generates a random cat</br><br>cow - Generates a random cow</br><br>otter - Generates a random otter</br><br>frog - Generates a random frog</br><br>zoo - Generates a random animal</br><br>-----------------------------------</br><br>Special thanks to Audino Primal, Natsume, tex rex1, Sundar, and NTGs.</br></center>');
		}
	},
};
