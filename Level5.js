"use strict"
var map;
var layer;
var player;
var controls = {};
var playerSpeed = 180;
var jumpTimer = 0; // tempo entre saltos
var button;
var gameOverPanel;
var gameCompletedPanel;
var menuInicial;
var menuInicialGO;
var restartBtn;
var menuNiveis;
var gOFlag;

var drag;

var invuln = 0;

var shootTime = 0; // tempo entre "tiros"
var fireRate = 200;
var nuts;
var book;
var nut;
var vidas = 3;
var vidasboss=5;
var bookboss,bookb;
//inimigos
var enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8,enemy9,enemy10,enemy11,enemy12,enemy13;
var speedup;
var timer,total=75;
var time1=0,time2=0,time3=0,time4=0,time5=0,time6=0,time7=0,time8=0,time9=0,time10=0,time12=0,time13=0;
var allyBirdy; //aliado

var AllyBirdy=function(index,game,x,y){
    //variavel global
    this.abirdy = game.add.sprite(x,y,'allyBird');
    this.abirdy.anchor.setTo(0.5);
    this.abirdy.scale.setTo(1);
    this.abirdy.name = index.toString();//transforma o index do passaro numa string

    game.physics.enable(this.abirdy,Phaser.Physics.ARCADE);
    this.abirdy.body.immovable = true;
    this.abirdy.body.collideWorldBounds = true;
    this.abirdy.body.allowGravity = false;//retira a gravidade do passaro
    //nao percebi bem a cena dos Tweens
    this.abirdyTween = game.add.tween(this.abirdy).to({
        y: this.abirdy.y + 150//mexe-se 100frames
    },2000,'Linear',true,0,100,true);
}

var EnemyBird=function(index,game,x,y){
    //variavel global
    this.bird = game.add.sprite(x,y,'ufo');
    this.bird.anchor.setTo(0.5);
    this.bird.scale.setTo(0.055);
    this.bird.name = index.toString();//transforma o index do passaro numa string

    game.physics.enable(this.bird,Phaser.Physics.ARCADE);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity = false;//retira a gravidade do passaro
    //nao percebi bem a cena dos Tweens
    this.birdTween = game.add.tween(this.bird).to({
        y: this.bird.y + 100//mexe-se 100frames
    },2000,'Linear',true,0,100,true);
}

var EnemyMan=function(index,game,x,y){
    //variavel global
    this.eman = game.add.sprite(x,y,'spaceman');

    this.eman.anchor.setTo(0.5);
    this.eman.scale.setTo(0.8);

    game.physics.enable(this.eman,Phaser.Physics.ARCADE);
    this.eman.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.eman).to({
        x: this.eman.x + 200//mexe-se 150frames
    },1750,'Linear',true,0,100,true);
}

var EnemyBotRed=function(index,game,x,y){
    //variavel global
    this.rbot = game.add.sprite(x,y,'redBot');

    this.rbot.anchor.setTo(0.5);
    this.rbot.scale.setTo(0.8);

    game.physics.enable(this.rbot,Phaser.Physics.ARCADE);
    this.rbot.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.rbot).to({
        x: this.rbot.x + 250//mexe-se 150frames
    },1250,'Linear',true,0,100,true);
}

var EnemyBotGreen=function(index,game,x,y){
    //variavel global
    this.gbot = game.add.sprite(x,y,'greenBot');

    this.gbot.anchor.setTo(0.5);
    this.gbot.scale.setTo(0.8);

    game.physics.enable(this.gbot,Phaser.Physics.ARCADE);
    this.gbot.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.gbot).to({
        x: this.gbot.x + 130//mexe-se 150frames
    },1250,'Linear',true,0,100,true);
}

var EnemyBotYellow=function(index,game,x,y){
    //variavel global
    this.ybot = game.add.sprite(x,y,'yellowBot');

    this.ybot.anchor.setTo(0.5);
    this.ybot.scale.setTo(0.8);

    game.physics.enable(this.ybot,Phaser.Physics.ARCADE);
    this.ybot.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.ybot).to({
        x: this.ybot.x + 130//mexe-se 150frames
    },1250,'Linear',true,0,100,true);
}

var EnemyBoss=function(index,game,x,y){
    //variavel global
    this.boss = game.add.sprite(x,y,'boss');

    this.boss.anchor.setTo(0.5);
    this.boss.scale.setTo(1.2);


    game.physics.enable(this.boss,Phaser.Physics.ARCADE);
    this.boss.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.boss).to({
        x: this.boss.x + 250//mexe-se 150frames
    },2500,'Linear',true,0,100,true);
}
function shootBook(){
        bookb = bookboss.getFirstExists(false);
        if(bookb){
            bookb.reset(enemy11.boss.x,enemy11.boss.y);
            bookb.body.velocity.x = -600;
            bookb.body.velocity.y = -300;

        }
    }
Game.Level5 = function(game){};


Game.Level5.prototype = {
    create:function(game){
        gOFlag = 0;
        this.backgroundSprite = this.game.add.sprite(0, 0,'background');
        this.backgroundSprite.fixedToCamera = true;
        this.backgroundSprite.scale.setTo(0.80);

        this.physics.arcade.gravity.y = 1400; // gravidade

        timer = game.time.create(false);
        timer.loop(1000, updateCounter, this);
        timer.start();

        map = this.add.tilemap('map5',32,32);
        map.addTilesetImage('tileset');

        layer = map.createLayer(0);
        layer.resizeWorld();

        //fim do jogo
        map.setTileIndexCallback(53,this.fimJogo,this);
        map.setTileIndexCallback(59,this.fimJogo,this);
        map.setTileIndexCallback(65,this.fimJogo,this);


        map.setCollisionBetween(0,3);
        map.setCollisionBetween(6,9);
        map.setCollisionBetween(12,15);
        map.setCollisionBetween(18,21);
        map.setCollisionBetween(24,32);
        map.setCollisionBetween(48,70);
        map.setCollision(43);
        map.setCollision(76);

        //se cair nos picos volta ao inicio
        map.setTileIndexCallback(30,this.resetPlayer,this);
        map.setTileIndexCallback(31,this.resetPlayer,this);
        map.setTileIndexCallback(32,this.resetPlayer,this);
        //agua
        map.setTileIndexCallback(54,this.resetPlayer,this);
        map.setTileIndexCallback(55,this.resetPlayer,this);
        map.setTileIndexCallback(56,this.resetPlayer,this);
        map.setTileIndexCallback(57,this.resetPlayer,this);
        map.setTileIndexCallback(66,this.resetPlayer,this);
        map.setTileIndexCallback(67,this.resetPlayer,this);
        map.setTileIndexCallback(68,this.resetPlayer,this);
        map.setTileIndexCallback(69,this.resetPlayer,this);
        //lava
        map.setTileIndexCallback(48,this.resetPlayer,this);
        map.setTileIndexCallback(49,this.resetPlayer,this);
        map.setTileIndexCallback(50,this.resetPlayer,this);
        map.setTileIndexCallback(51,this.resetPlayer,this);
        // se tocar na moeda, esta é substituida por um sprite vazio
        //map2.setTileIndexCallback(3,this.getCoin,this);

        speedup = this.add.sprite(1530,211,'speedup');
        speedup.anchor.setTo(0.5);
        game.physics.enable(speedup,Phaser.Physics.ARCADE);
        speedup.body.allowGravity = false;
        speedup.scale.setTo(0.15);

        player = this.add.sprite(200,450,'player'); //real 200,450
        player.anchor.setTo(0.5);

        //spawn dos inimigos
        enemy1 = new EnemyBird(0,game,1320,player.y-100);
        enemy2 = new EnemyBird(0,game,1920,player.y-250);
        enemy3 = new EnemyMan(0,game,1030,player.y);
        enemy4 = new EnemyBotRed(0,game,4300,player.y-150);
        enemy5 = new EnemyBird(0,game,3860,player.y-150);
        enemy6 = new EnemyMan(0,game,4350,player.y-150);
        enemy7 = new EnemyBird(0,game,3460,player.y-80);
        enemy8 = new EnemyBotGreen(0,game,2450,player.y-310);
        enemy9 = new EnemyBotYellow(0,game,2590,player.y-150);
        enemy10 = new EnemyBird(0,game,4620,player.y-430);
        enemy11 = new EnemyBoss(0,game,2400,320);
        enemy12 = new EnemyMan(0,game,1420,player.y);
        enemy13 = new EnemyBird(0,game,4720,player.y-430);

        //spawn dos aliados
        allyBirdy = new AllyBirdy(0,game,4530,200);

        //animaçoes do jogador
        player.animations.add('idle',[0,1],2,true);
        player.animations.add('jump',[2],1,true);
        player.animations.add('run',[3,4,5,6,7,8],8,true);
        this.physics.arcade.enable(player); //fisica no boneco
        this.camera.follow(player);
        player.body.colideWorldBounds = true;

        //animaçoes inimigo spaceman
        enemy3.eman.animations.add('right',[3,4,5],3,true);
        enemy3.eman.animations.add('left',[9,10,11],3,true);
        enemy6.eman.animations.add('right',[3,4,5],3,true);
        enemy6.eman.animations.add('left',[9,10,11],3,true);
        enemy12.eman.animations.add('right',[3,4,5],3,true);
        enemy12.eman.animations.add('left',[9,10,11],3,true);

        //animaçoes inimigo redBot
        enemy4.rbot.animations.add('right',[3,4,5],3,true);
        enemy4.rbot.animations.add('left',[9,10,11],3,true);
        //animaçoes inimigo greenBot
        enemy8.gbot.animations.add('right',[3,4,5],3,true);
        enemy8.gbot.animations.add('left',[9,10,11],3,true);
        //animaçoes inimigo yellowBot
        enemy9.ybot.animations.add('right',[3,4,5],3,true);
        enemy9.ybot.animations.add('left',[9,10,11],3,true);
        //animaçoes inimigo Boss
        enemy11.boss.animations.add('right',[12,13,14,15],4,true);
        enemy11.boss.animations.add('left',[8,9,10,11],4,true);

        //colocar o livro no nivel

        book = this.add.sprite(3730,371,'book');
        book.anchor.setTo(0.5);
        //animaçoes do livro
        book.animations.add('normal');
        book.animations.play('normal',10,true);
        game.physics.enable(book,Phaser.Physics.ARCADE);
        book.body.allowGravity = false;
        book.scale.setTo(0.4);

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };


        nuts = game.add.group();

        nuts.enableBody = true; // enable nas fisicas das nuts
        nuts.physicsBodyType = Phaser.Physics.ARCADE;
        nuts.createMultiple(1,'nut');

        nuts.setAll('anchor.x',0.5); // anchor points
        nuts.setAll('anchor.y',0.5); // tem de ser desta forma por serem várias nuts

        nuts.setAll('scale.x',0.65); // da mesma forma, diminuimos o tamanho da bolota em metade
        nuts.setAll('scale.y',0.65);

        nuts.setAll('outOfBoundsKill',true); //mata a nut se ela sair do ecrã
        nuts.setAll('checkWorldBounds',true);

        bookboss= game.add.group();
        bookboss.enableBody= true;
        bookboss.physicsBodyType = Phaser.Physics.ARCADE;
        bookboss.createMultiple(1,'bookboss');
        bookboss.setAll('anchor.x',0.1);
        bookboss.setAll('anchor.y',0.1);
        bookboss.setAll('scale.x',0.06);
        bookboss.setAll('scale.y',0.06);
        bookboss.setAll('outOfBoundsKill',true);
        bookboss.setAll('checkWorldBounds',true);

        gameOverPanel = this.game.add.image(170,100,'gameOver');
        gameOverPanel.visible = false;
        gameOverPanel.fixedToCamera = true;

        gameCompletedPanel = this.game.add.image(170,100,'gameCompleted');
        gameCompletedPanel.visible = false;
        gameCompletedPanel.fixedToCamera = true;

        menuInicial = this.add.button(850,610,'voltarBtn',voltarBtnClick,this);
        menuInicial.scale.setTo(0.5);
        menuInicial.fixedToCamera = true;
        menuInicialGO = this.add.button(600,375,'voltarBtn',voltarBtnClick,this);
        menuInicialGO.visible = false;
        menuInicialGO.fixedToCamera = true;
        restartBtn = this.add.button(600,310,'comecarBtn',restartBtnClick,this);
        restartBtn.visible = false;
        restartBtn.fixedToCamera = true;
        restartBtn.inputEnabled = false;
        menuNiveis = this.add.button(600,310,'jogarBtn',jogarBtnClick,this);
        menuNiveis.fixedToCamera = true;
        menuNiveis.visible = false;
        menuNiveis.inputEnabled = false;


    },
    update:function(){
        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(player,book,this.tocaLivro,null,this);
        this.physics.arcade.collide(player,speedup,this.getCoin,null,this);
        this.physics.arcade.collide(layer,book);
        this.physics.arcade.collide(layer,enemy3.eman,null,null,this);
        this.physics.arcade.collide(layer,enemy6.eman,null,null,this);
        this.physics.arcade.collide(layer,enemy12.eman,null,null,this);
        this.physics.arcade.collide(layer,enemy4.rbot,null,null,this);
        this.physics.arcade.collide(layer,enemy8.gbot,null,null,this);
        this.physics.arcade.collide(layer,enemy9.ybot,null,null,this);
        this.physics.arcade.collide(layer,enemy11.boss,null,null,this);
        this.physics.arcade.collide(player,enemy11.boss,this.resetPlayer,null,this);
        this.physics.arcade.collide(layer,nuts,this.killbullet,null,this);
        this.physics.arcade.collide(player,allyBirdy.abirdy,null,null,this);
        this.physics.arcade.collide(nuts,enemy11.boss,this.killboss,null,this);
        this.physics.arcade.collide(bookboss,player,this.resetPlayer,null,this);
        this.physics.arcade.collide(layer,bookboss,this.killbook,null,this);
        if(invuln==0){
            this.physics.arcade.collide(player,enemy1.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy2.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy3.eman,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy4.rbot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy5.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy6.eman,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy7.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy8.gbot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy9.ybot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy10.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy12.eman,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy13.bird,this.resetPlayer,null, this);
        }else{
            this.physics.arcade.collide(player,enemy1.bird,this.killenemy1,null,this);
            this.physics.arcade.collide(player,enemy2.bird,this.killenemy2,null,this);
            this.physics.arcade.collide(player,enemy3.eman,this.killenemy3,null,this);
            this.physics.arcade.collide(player,enemy4.rbot,this.killenemy4,null,this);
            this.physics.arcade.collide(player,enemy5.bird,this.killenemy5,null,this);
            this.physics.arcade.collide(player,enemy6.eman,this.killenemy6,null,this);
            this.physics.arcade.collide(player,enemy7.bird,this.killenemy7,null,this);
            this.physics.arcade.collide(player,enemy8.gbot,this.killenemy8,null,this);
            this.physics.arcade.collide(player,enemy9.ybot,this.killenemy9,null,this);
            this.physics.arcade.collide(player,enemy10.bird,this.killenemy10,null,this);
            this.physics.arcade.collide(player,enemy12.eman,this.killenemy12,null,this);
            this.physics.arcade.collide(player,enemy13.bird,this.killenemy13,null,this);
        }

        player.body.velocity.x = 0;

        if(gOFlag==0){
            if(controls.left.isDown){
            player.animations.play('run');
            player.scale.setTo(-1,1); // inverte o sprite
            player.body.velocity.x -= playerSpeed;
            }
            if(controls.right.isDown){
                player.animations.play('run');
                player.scale.setTo(1,1);
                player.body.velocity.x += playerSpeed;
            }
            if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now>jumpTimer){
                player.animations.play('jump');
                player.body.velocity.y = -630;
                jumpTimer = this.time.now + 700;
            }
            if(controls.shoot.isDown){
                this.shootNut();
            }
            if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
                player.animations.play('idle');
            }

        }
        if(enemy11.boss.alive==true){
            if(enemy11.boss.x>=2500&&enemy11.boss.x<=2502){
                shootBook();
            }
        }
        if(enemy3.eman.x==1030){
            enemy3.eman.animations.play('right');
        }
        if(enemy3.eman.x==1230){
            enemy3.eman.animations.play('left');
        }
        if(enemy4.rbot.x==4300){
            enemy4.rbot.animations.play('right');
        }
        if(enemy4.rbot.x==4550){
            enemy4.rbot.animations.play('left');
        }
        if(enemy6.eman.x==4350){
            enemy6.eman.animations.play('right');
        }
        if(enemy6.eman.x==4550){
            enemy6.eman.animations.play('left');
        }
        if(enemy8.gbot.x==2450){
            enemy8.gbot.animations.play('right');
        }
        if(enemy8.gbot.x==2580){
            enemy8.gbot.animations.play('left');
        }
        if(enemy9.ybot.x==2590){
            enemy9.ybot.animations.play('right');
        }
        if(enemy9.ybot.x==2720){
            enemy9.ybot.animations.play('left');
        }
        if(enemy11.boss.x==2400){
            enemy11.boss.animations.play('right');
        }
        if(enemy11.boss.x==2650){
            enemy11.boss.animations.play('left');
        }
        if(enemy12.eman.x==1420){
            enemy12.eman.animations.play('right');
        }
        if(enemy12.eman.x==1620){
            enemy12.eman.animations.play('left');
        }
        if(player.x>=2255&&player.x<=2260){
            this.camera.follow(enemy11.boss);
        }
        if(checkOverlap(nuts,enemy1.bird)){
            enemy1.bird.kill();
            if(time1 == 0)
            	total+=5;
            time1=1;
        }
        if(checkOverlap(nuts,enemy2.bird)){
            enemy2.bird.kill();
            if(time2 == 0)
            	total+=5;
            time2=1;
        }
        if(checkOverlap(nuts,enemy3.eman)){
            enemy3.eman.kill();
            if(time3 == 0)
                total+=5;
            time3=1;
        }
        if(checkOverlap(nuts,enemy4.rbot)){
            enemy4.rbot.kill();
            if(time4 == 0)
                total+=5;
            time4=1;
        }
        if(checkOverlap(nuts,enemy5.bird)){
            enemy5.bird.kill();
            if(time5 == 0)
                total+=5;
            time5=1;
        }
        if(checkOverlap(nuts,enemy6.eman)){
            enemy6.eman.kill();
            if(time6 == 0)
                total+=5;
            time6=1;
        }
        if(checkOverlap(nuts,enemy7.bird)){
            enemy7.bird.kill();
            if(time7 == 0)
                total+=5;
            time7=1;
        }
        if(checkOverlap(nuts,enemy8.gbot)){
            enemy8.gbot.kill();
            if(time8 == 0)
                total+=5;
            time8=1;
        }
        if(checkOverlap(nuts,enemy9.ybot)){
            enemy9.ybot.kill();
            if(time9 == 0)
                total+=5;
            time9=1;
        }
        if(checkOverlap(nuts,enemy10.bird)){
            enemy10.bird.kill();
            if(time10 == 0)
                total+=5;
            time10=1;
        }
        //BOSS
        if(checkOverlap(nuts,enemy12.eman)){
            enemy12.eman.kill();
            if(time12 == 0)
                total+=5;
            time12=1;
        }
        if(checkOverlap(nuts,enemy13.bird)){
            enemy13.bird.kill();
            if(time13 == 0)
                total+=5;
            time13=1;
        }

        this.game.debug.text("Lives "+vidas,740,50);
        this.game.debug.text("Time",840,50);

        if(total > 10)
        	this.game.debug.text(total, 890, 50);
        else
        	this.game.debug.text(total, 890, 50,"#ff0000");
    },
    resetPlayer:function(spriteThatTriggeredMe,layer){

        if(spriteThatTriggeredMe==player){
            if(gOFlag == 0){
                vidas--;
            }
            if(vidas==0){
                gOFlag = 1;
                gameOverPanel.visible = true;
                restartBtn.visible = true;
                menuInicialGO.visible = true;
                menuInicial.visible = false;
                player.body.allowGravity = false;
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                player.animations.stop();
                timer.stop();
                restartBtn.inputEnabled = true;
                console.log("Game Over!");

            }
            else if(vidas>0){
                playerSpeed = 180;
                total=75;
                time1=0;
                time2=0;
                time3=0;
                time4=0;
                time5=0;
                time6=0;
                time7=0;
                time8=0;
                time9=0;
                time10=0;
                time11=0;
                time12=0;
                time13=0;
                vidasboss=5;
                console.log("Tem "+vidas+" vidas");
                console.log("Morreu, nível recomeçado!");
                this.state.start("Level5");
            }
        }
    },
    killboss:function(){
            console.log("vidas boss "+vidasboss);
            if(vidasboss>0){
                vidasboss--;
            }
            if(vidasboss<=0){
                enemy11.boss.kill();
                this.camera.follow(player);
            }
    },
    fimJogo:function(){
        gOFlag = 1;
        player.body.allowGravity = false;
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.animations.stop();
        timer.stop();
        gameCompletedPanel.visible = true;
        menuNiveis.visible = true;
        menuInicialGO.visible = true;
        menuNiveis.inputEnabled = true;
        if(total==0){
            this.state.start('perguntaRecurso');
        }
        console.log("Acabou o Nível!");
    },
    tocaLivro:function(){
        invuln = 1;
        console.log('Player tocou no livro');
        this.time.events.add(Phaser.Timer.SECOND * 3, function(){
            invuln = 0;
        });
        book.kill();
    },
    getCoin:function(){
        playerSpeed = playerSpeed*1.5;
        console.log('Speed: '+ playerSpeed);
        this.time.events.add(Phaser.Timer.SECOND * 4.5, function(){
            playerSpeed = 180;
        }); //Aumenta a velocidade em 20% quando apanha uma modeda durante 2.5 seg
        console.log('Speed: '+ playerSpeed);
        speedup.kill();
    },
    killenemy1:function(){
        enemy1.bird.kill();
    },
    killenemy2:function(){
        enemy2.bird.kill();
    },
    killenemy3:function(){
        enemy3.eman.kill();
    },
    killenemy4:function(){
        enemy4.rbot.kill();
    },
    killenemy5:function(){
        enemy5.bird.kill();
    },
    killenemy6:function(){
        enemy6.eman.kill();
    },
    killenemy7:function(){
        enemy7.bird.kill();
    },
    killenemy8:function(){
        enemy8.gbot.kill();
    },
    killenemy9:function(){
        enemy9.ybot.kill();
    },
    killenemy10:function(){
        enemy10.bird.kill();
    },
    killenemy11:function(){
        enemy11.boss.kill();
    },
    killenemy12:function(){
        enemy12.eman.kill();
    },
    killenemy13:function(){
        enemy13.bird.kill();
    },

    killbullet:function(nuts,layer){
        nuts.kill();
    },
    killbook:function(bookboss,layer){
        bookboss.kill();
    },
    shootNut:function(){
        if(this.time.now>shootTime){
            nut = nuts.getFirstExists(false);
            if(nut){
                nut.reset(player.x,player.y);
                if(controls.right.isDown){
                    nut.body.velocity.x = 600;
                    nut.body.velocity.y = -300;
                }
                else if(controls.left.isDown){
                    nut.body.velocity.x = -600;
                    nut.body.velocity.y = -300;
                }
                else{
                    nut.body.velocity.y = -600;
                }
            //  nut.body.velocity.x = 300;
                shootTime = this.time.now +fireRate;
            }
        }
    }
}



function checkOverlap(spriteA,spriteB){ // verifica se 2 sprites deram overlap(se se tocaram)
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA,boundsB);
}

function updateCounter() {
	if(total > 0)
    	total--;

}

function restartBtnClick(){
    vidas=3;
    total = 75;
    time1=0;
    time2=0;
    time3=0;
    time4=0;
    time5=0;
    time6=0;
    time7=0;
    time8=0;
    time9=0;
    time10=0;
    this.state.start('Level5');
}
