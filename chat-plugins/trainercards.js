// jscs:disable
/* jshint ignore:start */
exports.commands = {
    /*********************************************************
     * TC'S HERE!
     *********************************************************/

    ac: 'armcannons',
    armcannons: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src = "http://107.161.19.92:8000/TCs/AC2.gif"> <center><br> <font size="3"><b><i><font color="blue">Josh</i><br></font><b> <blink> Ace: Darmanitan </blink></b> <br><b>Stealing yo girl shofu style</b></center>')
    },
  
    mandy: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox(' <center> <img src="http://107.161.19.92:8000/TCs/mandy.gif"> <br> <font size="3"><b><i><font color="99FFFF">Mandy</i><br></font><b> <blink> Ace: I\'m kawaii bitch ^.~ </blink></b> <br><b>Cant handle my Cutness</b></center>');
    },
    ac2: 'armcannons2',
    armcannons2: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/ac3.jpg"><br />' +
            '<font size=4><i><font color=blue><b>Josh</b></font></i></font><br />' +
            '<blink><b><font color=gray>Ace: Shocking good looks</font></b></blink><br />' +
            '<b>First I eat my nutella then I eel yo girl</b>')
    },

    VeNo: 'venom',
    veno: 'venom',
    css: 'venom',
    xVeNoMiiZz: 'venom',
    venom: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center> <a href="https://www.youtube.com/watch?v=pc0mxOXbWIU"> <img src = "http://i.imgur.com/WJU2sG2.gif"> </img> </a> <br> <font size="4"><b><i><font color="#6A0888">xVeNoMiiZz</i></b><br><font size="2"><b><blink> Ace: </b><blink><u><b>Quil\'s Booty</u>.</blink></b></font> <br> <font size="2"><i> "Roses are red, Violets are blue, If you don\'t like the CSS, <b>Fuck You</b>." </i></font> </center>')
    },
    dyla: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="https://s-media-cache-ak0.pinimg.com/474x/a3/2b/8a/a32b8aa0f96c07ae32cc0a74bb493d9e.jpg"><br />' +
            '<font size=3><i><font color=Blue><b>Temperarious</b></font></i></font><br />' +
            '<b><blink><font color=Black>Ace: Sucker Punch </blink></b><br />' +
            '<b><font color=Green>#Perseverance is success. :)</b>')
    },

    scrub: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/scrub.jpg" height="247" width="173"><br />' +
            '<font size=3><i><font color=cyan><b>Scream Scrub</b></font></i></font><br />' +
            '<b><blink>Ace: Diabeetus</blink></b><br />' +
            '<b>#tryhard</b>')
    },

    max: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/max.jpg"><br />' +
            '<font size=3><i><font color=green><b>Absolute Maximum</b></font></i></font><br />' +
            '<b><blink>Ace: First Derivative</blink></b><br />' +
            '<b>#scrublord9000+</b>')
    },

    cleer: function(target, room, user) {
        if (!user.can('ban')) return false;
        this.add('|html|<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>')
    },

    enzo: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = " http://107.161.19.92:8000/TCs/enzo.gif"> <br> <font color=blue>  <font size="3"> <b><i>FranchescoEnzo</i><br></font> <font color=black> Quote: M8 I swer on me mam i\'ll rek u <br> <blink> <b> Ace: Reflexes </b>');
    },

    fatherj: 'davidj',
    davidj: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/davidj.gif"> <br> <font size="3"><b><i><font color="00FF00">DavidJ</i><br></font><b> <blink>Ace: OP Spanish Boy</blink></b><br><b>420 Blaze It (Hur Hur)</b></center>');
    },

    silver: 'sexiness',
    sexiness: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/silver.gif"> <br> <font size="3"><b><i><font color="00FF00">SilverKill</i><br></font><b>Show them all you\'re not the ordinary type.</b> <br><b><font color=FFBF00>Deal with it. (⌐■_■)</b></center>');
    },

    kevkev: 'kevn',
    kevn: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><b><a href="http://107.161.19.92:8000/TCs/kev.gif"><img src="http://107.161.19.92:8000/TCs/kev.gif"></a><br> <font size= 3> <i><font color = "red"> nonstopkevn</i></font><br><blink> <b> Unstoppable</blink> </b> <br>“It does not matter how slow you go so long as you do not stop.”<br>-Wisdom of Confucius.</center></b>')
    },
    pu: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('PU is a tier created by <a href="https://www.youtube.com/user/dundealshowdown">Dun Deal</a>.<br>It is a tier below NU, using only Pokemon from LC, NFE, and Pokemon who are barely ever used in NU.<br>A list of the tier\'s Pokemon can be found on the PU website <a href="http://www.partiallyused.weebly.com">here</a>. Please read it!<br>You can interact with the PU community in Dun Deal\'s Place. Happy battling!')
    },
    PUban: 'pufix',
    PUFix: 'pufix',
    pufix: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('The PU tier was coded in a way that basically every Pokemon that was not part of the PU tier had to manually be banned out.</a><br>By coding the tier this way, some Pokemon that are not PU are able to be used in PU battles.<br>You can submit the names of the Pokemon that we missed <a href="https://docs.google.com/forms/d/1IUFrec8w3bfcvymDGIe7XBBqN6giso_1wdruyymaYOo/viewform?usp=send_form">Here!')
    },
    abcabilities: 'abcab',
    abcab: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('ABC Abilities is a tier created by <a href="https://www.youtube.com/user/dundealshowdown">Dun Deal</a>.<br>It is a tier in which every Pokemon can have any move or ability that starts with the same letter its name starts with.<br>A list of the tier\'s Pokemon can be found <a href="http://www.abcabilities.weebly.com">here</a>. Please read it!<br>You can interact with the ABC Abilities community in Dun Deal\'s Place. Happy Battling!')
    },
    infinitebot: 'death',
    bot: 'death',
    death: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center> <img src="http://107.161.19.92:8000/TCs/bot.gif"><br><b><blink><FONT COLOR="red">Infinite Bot</FONT COLOR></blink><br>"For all you would-be spammers out there, I will find you, and I kill ban you."</b></center>')
    },
 
    thirsty: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/thirsty.jpg"><br />' +
            '<b>#TheThirstIsReal</b>')
    },
    yallthirsty: 'quantavious',
    quantavious: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/yall.png" height="180" width="180"><br />' +
            '<img src="http://107.161.19.92:8000/TCs/yall2.png" height="250" width="180"> <font size=3><b><i><font color=gold>YallThirsty</font></i></b></font> <img src="http://107.161.19.92:8000/TCs/yall3.png" height="180" width="195"><br />' +
            '<b><blink>Ace: Charizard</blink></b><br />' +
            '<b>You All Are Thirsty!</b>')
    },
    macrarazy: 'mac',
    e4mac: 'mac',
    e6mac: 'mac',
    mac: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/mac.png" height="180" width="150"><br />' +
            '<img src="http://107.161.19.92:8000/TCs/mac2.png" height="130" width="150"> <img src="http://107.161.19.92:8000/TCs/mac3.gif"> <img src="http://107.161.19.92:8000/TCs/mac4.png" height="130" width="160"><br />' +
            '<b><blink>Ace: Mega Aggron</blink><br />' +
            '<font color=gray>Sometimes... Steel is too much for you!</font></b>')
    },
    kammi: 'poto2',
    Kammi: 'poto2',
    elsa: 'poto2',
    poto2: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/kammi.gif"> <br> <font size="4"><b><i><font color="#0033CC">Kammi, Frost Queen.</br>')
    },
    Queen: 'isawa',
    queen: 'isawa',
    isawa: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/isawa.gif"> <br> <font size="3"><b><i><font color="#0033CC">Bish please, I\'m the real frost queen.</br>')
    },
    poto: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/poto.jpg" height="188" width="300"><br />' +
            '<font color=blue><b>#kammi</b></font>')
    },
    atmn: 'autumn',
    autumn: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/autumn.png"><br />' +
            '<font color=pink><b>"DBB plis"<b></font>')
    },
    rekt: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://i.imgur.com/C26ZRE6.gif" width="480" height="270" /></center>')
    },
    infusion: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/infnusion.gif"><br />')
    },
    litalie: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/litalie.jpg"><br />')
    },
    mind: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/mind.gif"><br />')
    },
    monop: 'monopoly',
    monopoly: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/monoop.jpg"><br />')
    },
    liz: 'lizbith',
    lizbith: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/lizbith.jpg"><br /><br />' +
            '<img src="http://107.161.19.92:8000/TCs/lizbith2.jpg"><br /><br />' +
            '<img src="http://107.161.19.92:8000/TCs/lizbith3.jpg"><br /><br />' +
            '<img src="http://107.161.19.92:8000/TCs/lizbith4.jpg"><br /><br />' +
            '<img src="http://107.161.19.92:8000/TCs/lizbith5.jpg"><br /><br />')
    },
    tacosaur: 'ellen',
    ellen: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/ellen.jpg"><br /><br />' +
            '<img src="http://107.161.19.92:8000/TCs/ellen2.jpg"><br /><br />' +
            ' People who have purchsed her: nonstopkevn, Alliance Dyla, Akkeshi MadAsTheHatter, Tacosaur, sai, jd, kafkablack, chakra, hashtag armcannons, black rabbit, and xVeNoMiiZz, koikazma, Pikabeats o3o, korps, chakra, jolteon64, and lizbith')
    },


    korps: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><b><img src="http://107.161.19.92:8000/TCs/korps.gif"></a><br> <font size= 3> <i><font color = "blue"> Korps</i></font><br><blink> <b> I will find you.</blink> </b><br>“No matter where you go, I\'ll follow you. Because I love you."')
    },
    jj: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/jj.gif"><br />' +
            '<font size=3><i><font color=red><b>Not Da Bic Boi</b></font></i></font><br />' +
            '<b><blink>Ace: Credit Card</blink></b><br />')
    },
    tdfw: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><a href="http://audio.radiorecord.ru/superchart/DJ%20SNAKE%20&%20LIL%20JOHN%20-%20Turn%20Down%20For%20What.mp3"> <img src="http://107.161.19.92:8000/TCs/tdf2.png" /> </a><br><font size="3"><b><i><font color="FF0000">#TD4W</i><br></font><b><blink>Turn Up MothaFuckas</font></blink></b><br><font color="585858"><i>Swag</i></center>')
    },


    hue: 'BR',
    br: 'BR',
    BR: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox(' <center><a href="https://a.tumblr.com/tumblr_mujxyk4g1U1shttnco1.mp3"target="_blank"><img src=http://107.161.19.92:8000/TCs/br.gif> </a><br> <font size="3"><b><i><font color="642EFE">BlackRabbit</i><br></font><b> <blink> Ace: Swimpuku </blink></b> <br><b>I am sorry, is my swag distracting you?<b><center>');
    },

    mad: 'math',
    math: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/math.gif"> <br> <font size="4"><b><i><font color="#0033CC">MadAsTheHatter</i><br></font><b> <blink> Ace: Ralphonso </blink></b><br><b>Stay Frosty</b></center>')
    },
    shed: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><a href="http://a.tumblr.com/tumblr_maghncXqXg1qdm6eno1.mp3"> <img src="http://107.161.19.92:8000/TCs/shed.gif" /> </a><br><font size="3"><b><i><font color="FF0000">#733t gg</i><br></font><b><blink> **Gimmicks Ahoy!**</font></blink></b><br><font color="585858"><i>1v1 Me Scrub (Fuggin Click Da Photo)</i></center>')
    },
    pantsu: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/pantsu.gif"><br />' +
            '<font color=blue><b>#AbsolutePervyium \(Credit:shinigami, Pantsu Man\)</b></font>')
    },
    rotom: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/rotom.gif" height="250" width="250"><br />')
    },
    taco: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/taco.jpg" height="225" width="300"><br />' +
            '<font size=3><i><font color=purple><b>#TeamTacoBell</b></font></i></font><br />' +
            '<b><blink>Ace: Doritos Locos Tacos</blink></b><br />' +
            '<b>Happy Hour is best Hour!</b>')
    },
    jen: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/jen.png" height="188" width="300"><br />' +
            '<font color=blue><b>#2kawaii4u</b></font>')
    },
    air: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/air.gif"><br />' +
            '<font color=black><b>"I get my own trainer card!?"</b></font>')
    },


    troll: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/troll.jpg"><br />' +
            '<b>I will shit fury all over you and you will drown in it.</b><br />' +
            '<b>#swagmaster69</b>')
    },

    kfc: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/kfc.jpg" height="201" width="300"><br />' +
            '<font size=3><i><font color=purple><b>Omega Supreme</b></font></i></font><br />'
        )
    },
    newt68: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/newt.jpg"><br />'

        )
    },
    bd: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/bd.jpg"><br />' +
            '<font size=3><i><font color=purple><b>Backdoor Access: Félicette (Credit: JD x Félicette)</b></font></i></font><br />' +
            ' People who have purchased her: buttofTheTitanTank, Chakra, sbet777, MadAsTheHatter, AssaultVestTangela, koikazma, Black Rabbit, hashtag armcannons, nonstopkevn, DavidJ, Félicette, Da Bic Boi, retrofeather, Absolute Maximum, Feeboss, Giantsdms, xVeNoMiiZz, KafkaBlack, Quilavaa, Chakra, Connor the Goodra, jolteon64 and of course: jd. </center>'
        )
    },
    jd: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/jd.jpg"><br />' +
            '<font size=3><i><font color=blue><b>JD</b></font></i></font><br />' +
            '<b><blink>Ace: Sexual Tension</blink></b><br />'
        )
    },
    hawt: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src = https://31.media.tumblr.com/tumblr_ly08hdshWf1r534vfo1_500.gif><br><font size = 2><b>HAWT HAWT HAWT HAWT HAWT</b></font></center>')
    },
    toxic: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/toxic.gif"> <br> ' +
            '<font size="3"><b><i><font color="Purple">Toxic</i><br></font></b>' +
            '<blink> Ace:Outernet</blink></b> <br>' +
            '<b>Stay indoors ;3</b></center>'
        )
    },
    waffle: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/chakrawaffle.jpg"><br />' +
            '<font size=1><i><font color=gray><b>#LikeAWaffle (Credit: Chakra)</b></font></i></font><br />' +
            '<b><blink>Ace: Elite Hand-To-Waffle Combat</blink></b><br />'
        )
    },
    paperangel: 'paper',
    angel: 'paper',
    paper: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center><img src ="http://107.161.19.92:8000/TCs/paperangle.gif"/><br><font size="3"><b><i><font color="B40404">Paper Angel</i><br></font><b> <blink>Ace: What?</blink></b><br><b><i>Yall mothafuckas weird af tbh</i></b></center>');
    },
    peppa: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/peppa.gif/" height="251" width="375"><br />' +
            '<font size=3><i><font color=pink><b>Peppa </b></font></i></font><i><font color=pink><b>Mint </b></font></i></font><br />' +
            '<font size=3><i><font color=pink><b>List of things Peppamint has said IRL: </b></font></i><br />' +
            '</font><i><font color=purple><b>"I spread my asscheeks for Shrek" 8/16/2014 </b></font></i></font><br />' +
            '</font><i><font color=purple><b>"Where\'s Picopie? What!? He\'s jacking off!?" 8/16/2014 </b></font></i></font><br />' +
            '</font><i><font color=purple><b>"Why is it so long!?" 9/10/2014 </b></font></i></font><br />' +
            '<img src="http://107.161.19.92:8000/TCs/peppa2.jpg/"> </font><i><font color=purple><b>11/3/2014</b></font></i></font><br />' +
            '<img src="http://107.161.19.92:8000/TCs/peppa3.jpg/"> </font><i><font color=purple><b>11/3/2014</b></font></i></font><br />' +
            '<img src="http://107.161.19.92:8000/TCs/peppa4.jpg/"> </font><i><font color=purple><b>11/3/2014</b></font></i></font><br />' +
            '<img src="http://107.161.19.92:8000/TCs/peppa5.png/"> </font><i><font color=purple><b>11/3/2014</b></font></i></font><br />' +
            '</font><i><font color=purple><b>"It\'s too long! I don\'t like it!" 3/6/2015 </b></font></i></font><br />' +
            '<img src="http://107.161.19.92:8000/TCs/peppa6.png/"> </font><i><font color=purple><b>3/8/2015</b></font></i></font><br /> ' +
            '<i><font color=purple><b>"Nice Head" <img src="http://107.161.19.92:8000/Twitch/Kreygasm.png" </img> 4/3/2015 </b></font></i></font><br />' +
            '<img src="http://107.161.19.92:8000/TCs/peppa7.jpg/"> </font><i><font color=purple><b>4/9/2015</b></font></i></font><br /> '
        )

    },
    giant: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/giant.gif"><br />' +
            '<font size=4><i><font color=33FF33><b>Giantsdms</b></font></i></font><br />' +
            '<b><blink>Ace: Iron Giant</blink></b><br />' +
            '<b>I sweep girls off their feet like i do with your team m8; easily</b>')
    },

    kafka: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/kafka.gif"><br />' +
            '<font size=3><i><font color=33FF33><b>Kafka</b></font></i></font><br />' +
            '<b><blink>Ace: Shimmy</blink></b><br />' +
            '<b>Now stop, OH, then wiggle with it, YEAH!</b>')
    },
    fel: 'felicette',
    felicette: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/fel.jpg"> <br> <font size="3"><b><i><font color="94CAE9">Félicette</i><br></font><b> <font color=pink> <blink> Ace: Cherry Blossoms </blink></b> <br><i>Eternal happiness will only bloom after the suffering of the past has been endured.</i></center>');
    },
    chakra: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/chakra.gif"><br />' +
            '<font size=3><i><font color=B40404><b>Chakra</b></font></i></font><br />' +
            '<b><blink>Ace: Kawaii</blink></b><br />' +
            '<br><marquee behavior=scroll direction="left" scrollamount="50">f(x)=e^o3o</marquee>')
    },
    sacrisis: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src="http://107.161.19.92:8000/TCs/sacrisis.gif"><br />' +
            '<font size=3><i><font color=7A770C><b>Sacrisis</b></font></i></font><br />' +
            '<b><blink>Ace: When you get those hax</blink></b>' +
            '<br><b>Make dat booty werk</b>')
    },
    quil: 'quilaava',
    quilaava: function(target, room, user) {
        if (!this.canBroadcast()) return;
        this.sendReplyBox('<center><img src= "http://107.161.19.92:8000/TCs/quil.jpg"> <br> <font size="3"><b><i><font color="FF0000">Quil</i><br></font><b><font color="blue"> Quote: In the heat of the moment never quit, press on!</b><br><b><blink><font color="orange"> Ace: Mystery</blink></b></center>')
    },

    reigns: 'darkness',
    darkness: function(target, room, user) {
        if (!this.canBroadcast( /*Never Forget Infinite.*/ )) return false;
        return this.sendReplyBox('<center><img src ="http://107.161.19.92:8000/TCs/darkness.gif"/><br><font size="3"><b><i><font color="8A0808">DarknessReigns</i><br></font><b> <blink><font color="0B0B61">Ace: Sasuke</font></blink></b><br><b><i>It gets darkest right before dawn.</i></b></center>');
    },

    prof: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/prof.png"> <br> <font size="3"><b><i><font color="FA58F4">Profpoodle</i><br></font><b> <blink><font color=00FFFF> Ace: Furfrou obv </blink></font></b> <br><b><font color=40FF00> EY BABY U WANT MEH EH? </font></b></center>');
    },

    ralph: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/ralph.gif"> <br> <font size="3"><b><i><font color="B2C248">Ralphonso</i><br></font><b> <blink> Ace: I GOT DAT <i> Canadian </i> HARD BODY </blink></b> <br> #getripped </center>');
    },

    connor: 'goodra',
    goodra: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center> <img src = "http://107.161.19.92:8000/TCs/connor.gif"> <br> <font size="3"><b><i><font color="0404B4">Connor the Goodra</i><br></font><b> <font color="8A0886">  Ace: The comfort of the bonfire </b> <br><b> <font color="190707"> <blink> Lol you\'re a scrub </b></center>');
    },


    ninkay: 'inky',
    inky: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center><img src ="http://107.161.19.92:8000/TCs/inky.gif"/><br><font size="3"><b><i><font color="FF0000">Inkyfeather</i><br></font><b><blink>st0icm4st3r280000</font></blink></b><br><font color="585858"><i>Ninkay out! .3.</i></center>');
    },

    ashy: 'ashaury',
    ashaury: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center><img src="http://i.imgur.com/2XBIXOF.png"><br /><img src="http://i.imgur.com/spUCRBX.gif"><br /><b>Ace:</b> Haruhi Suzumiya<br /><br><b><a href="https://www.youtube.com/watch?v=lVYV-5TeYfg"><button>I Believe</button></a><a href="https://www.youtube.com/watch?v=WWB01IuMvzA"><button>God Knows</button></a><a href="https://www.youtube.com/watch?v=c5G5bD2Do-k"><button>The Dance</button></a><br /><br><b>Dreams start by believing.');
    },
    
    tylacto: 'ty',
    ty: function(target, room, user) {
        if (!this.canBroadcast()) return false;
        return this.sendReplyBox('<center><b><strong> <img src="http://i1053.photobucket.com/albums/s473/Supah_Red/black_kyurem_gif__by_britishstarr-d509ygz.gif" width="100" height="110"> <img src="http://33.media.tumblr.com/01c13cb909e1936c4497d56d8de05d78/tumblr_mxpx81FEMV1s6hco9o2_500.gif" width="100" height="110"> <img src="http://25.media.tumblr.com/tumblr_me6fdcvTTF1r1n5pqo1_500.gif" width="100" height="110"> <br><font size="2" color="black">Outrage Spam Fgt </font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font size="2"  color="brown">Mold Breaker Fgt</font><br><font size="2" color="blue">Biggest Fgt Of Them All</font><br><img src="http://31.media.tumblr.com/9c77fb5630504da806464f80097aeb7f/tumblr_mie1te7yfk1r5fhkdo1_500.gif" width="100" height="110"> <img src="https://lh6.googleusercontent.com/-5Kcic4SmwYo/VI2_uEiAMuI/AAAAAAAADBQ/UhQ9CbzTbVs/w271-h204/Luxrayispowerfulgif.gif" width="100" height="110"> <img src="https://38.media.tumblr.com/faca98247be1bc1ea1c4c323ce2f0538/tumblr_nokq7dXi4P1rxmesfo5_500.gif" width="100" height="110">  <br> <font size="2" color="orange">Lum Berry Fgt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <font size="2" color="FFCC00">BAE <3 <3 <3</font><font size="2" color="ligblue">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Volt Absorb Fgt</font> <br> <hr width="53%" color="black"><font size="2" color="black">Tylacto :D (Not Bias)<hr width="53%" color="black">')
    },

    /*********************************************************
     * TC'S STOP HERE!
     *********************************************************/
};
/* jshint ignore:end */
