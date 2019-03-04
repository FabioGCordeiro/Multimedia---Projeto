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
var lastCall = 0;
var gOFlag = 0;


var invuln = 0;

var book;

var vidashard;
//inimigos
var enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8,enemy9,enemy10,enemy11,enemy12;

var speedup;
var timer,total;

var spriteThatTriggeredMe;

var allyBirdy;

AllyBirdy=function(index,game,x,y){
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
/*AllyBirdx=function(index,game,x,y){
    //variavel global
    this.abirdx = game.add.sprite(x,y,'allyBird');
    this.abirdx.anchor.setTo(0.5);
    this.abirdx.scale.setTo(1);
    this.abirdx.name = index.toString();//transforma o index do passaro numa string

    game.physics.enable(this.abirdx,Phaser.Physics.ARCADE);
    this.abirdx.body.immovable = true;
    this.abirdx.body.collideWorldBounds = true;
    this.abirdx.body.allowGravity = false;//retira a gravidade do passaro
    //nao percebi bem a cena dos Tweens
    this.abirdxTween = game.add.tween(this.abirdx).to({
        y: this.abirdx.x + 250//mexe-se 100frames
    },2500,'Linear',true,0,100,true);
}*/

var EnemyBirdHard=function(index,game,x,y){
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
        y: this.bird.y + 125//mexe-se 100frames
    },1200,'Linear',true,0,100,true);
}

var EnemyManHard=function(index,game,x,y){
    //variavel global
    this.eman = game.add.sprite(x,y,'spaceman');

    this.eman.anchor.setTo(0.5);
    this.eman.scale.setTo(0.8);

    game.physics.enable(this.eman,Phaser.Physics.ARCADE);
    this.eman.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.eman).to({
        x: this.eman.x + 200//mexe-se 150frames
    },1300,'Linear',true,0,100,true);
}

var EnemyBotRedHard=function(index,game,x,y){
    //variavel global
    this.rbot = game.add.sprite(x,y,'redBot');

    this.rbot.anchor.setTo(0.5);
    this.rbot.scale.setTo(0.8);

    game.physics.enable(this.rbot,Phaser.Physics.ARCADE);
    this.rbot.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.rbot).to({
        x: this.rbot.x + 250//mexe-se 150frames
    },1000,'Linear',true,0,100,true);
}
var EnemyBotGreenHard=function(index,game,x,y){
    //variavel global
    this.gbot = game.add.sprite(x,y,'greenBot');

    this.gbot.anchor.setTo(0.5);
    this.gbot.scale.setTo(0.8);

    game.physics.enable(this.gbot,Phaser.Physics.ARCADE);
    this.gbot.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.gbot).to({
        x: this.gbot.x + 130//mexe-se 150frames
    },1100,'Linear',true,0,100,true);
}

var EnemyBotYellowHard=function(index,game,x,y){
    //variavel global
    this.ybot = game.add.sprite(x,y,'yellowBot');

    this.ybot.anchor.setTo(0.5);
    this.ybot.scale.setTo(0.8);

    game.physics.enable(this.ybot,Phaser.Physics.ARCADE);
    this.ybot.body.collideWorldBounds = true;

    this.birdTween = game.add.tween(this.ybot).to({
        x: this.ybot.x + 130//mexe-se 150frames
    },1100,'Linear',true,0,100,true);
}

Game.Level4hard = function(game){};

Game.Level4hard.prototype = {
    create:function(game){
        this.backgroundSprite = this.game.add.sprite(0, 0,'background');
        this.backgroundSprite.fixedToCamera = true;
        this.backgroundSprite.scale.setTo(0.80);

        this.physics.arcade.gravity.y = 1350; // gravidade

        timer = game.time.create(false);
        timer.loop(1000, updateCounter, this);
        timer.start();

        map = this.add.tilemap('map4',32,32);
        map.addTilesetImage('tileset');

        layer = map.createLayer(0);
        layer.resizeWorld();


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
        console.log(map.index);
        if((layer.index >= 30 && layer.index <33) || (layer.index>=54 && layer.index<58) || (layer.index>=60 && layer.index<64) ||(layer.index>=66 && layer.index<70)){
            console.log("hello there");
        }
        else{
            console.log(layer.index);
        }

        //agua
        map.setTileIndexCallback(54,this.resetPlayer,this);
        map.setTileIndexCallback(55,this.resetPlayer,this);
        map.setTileIndexCallback(56,this.resetPlayer,this);
        map.setTileIndexCallback(57,this.resetPlayer,this);
        map.setTileIndexCallback(66,this.resetPlayer,this);
        map.setTileIndexCallback(67,this.resetPlayer,this);
        map.setTileIndexCallback(68,this.resetPlayer,this);
        map.setTileIndexCallback(69,this.resetPlayer,this);
        //areia
        map.setTileIndexCallback(60,this.resetPlayer,this);
        map.setTileIndexCallback(61,this.resetPlayer,this);
        map.setTileIndexCallback(62,this.resetPlayer,this);
        map.setTileIndexCallback(63,this.resetPlayer,this);

        // se tocar na moeda, esta é substituida por um sprite vazio
        //map2.setTileIndexCallback(3,this.getCoin,this);

        //fim do jogo
        map.setTileIndexCallback(24,this.fimJogo,this);
        map.setTileIndexCallback(25,this.fimJogo,this);
        map.setTileIndexCallback(26,this.fimJogo,this);

        speedup = this.add.sprite(1430,380,'speedup');
        speedup.anchor.setTo(0.5);
        game.physics.enable(speedup,Phaser.Physics.ARCADE);
        speedup.body.allowGravity = false;
        speedup.scale.setTo(0.15);

        player = this.add.sprite(100,560,'player');
        player.anchor.setTo(0.5);


        //spawn dos inimigos
        enemy1 = new EnemyBirdHard(0,game,672,340);
        enemy2 = new EnemyBirdHard(0,game,920,340);
        enemy3 = new EnemyBirdHard(0,game,1184,340);
        enemy4 = new EnemyBotRedHard(0,game,1312,448);
        enemy5 = new EnemyBirdHard(0,game,1680,372);
        enemy6 = new EnemyManHard(0,game,1760,448);
        enemy7 = new EnemyBirdHard(0,game,2176,404);
        enemy8 = new EnemyBirdHard(0,game,2368,404);
        enemy9 = new EnemyBotGreenHard(0,game,2656,player.y);
        enemy10 = new EnemyBotYellowHard(0,game,3264,player.y);
        enemy11 = new EnemyBotRedHard(0,game,4480,player.y);
        enemy12 = new EnemyManHard(0,game,5632,player.y);

        //spawn dos aliados
        allyBirdy = new AllyBirdy(0,game,2912,352);
        //allyBirdx = new AllyBirdx(0,game,3800,200);

        //animaçoes do jogador
        player.animations.add('idle',[0,1],2,true);
        player.animations.add('jump',[2],1,true);
        player.animations.add('run',[3,4,5,6,7,8],8,true);
        this.physics.arcade.enable(player); //fisica no boneco
        this.camera.follow(player);
        player.body.colideWorldBounds = true;

        //animaçoes inimigo spaceman
        enemy6.eman.animations.add('right',[3,4,5],3,true);
        enemy6.eman.animations.add('left',[9,10,11],3,true);
        enemy12.eman.animations.add('right',[3,4,5],3,true);
        enemy12.eman.animations.add('left',[9,10,11],3,true);

        //animaçoes inimigo redBot
        enemy4.rbot.animations.add('right',[3,4,5],3,true);
        enemy4.rbot.animations.add('left',[9,10,11],3,true);
        enemy11.rbot.animations.add('right',[3,4,5],3,true);
        enemy11.rbot.animations.add('left',[9,10,11],3,true);

        //animaçoes inimigo greenBot
        enemy9.gbot.animations.add('right',[3,4,5],3,true);
        enemy9.gbot.animations.add('left',[9,10,11],3,true);

        //animaçoes inimigo yellowBot
        enemy10.ybot.animations.add('right',[3,4,5],3,true);
        enemy10.ybot.animations.add('left',[9,10,11],3,true);

        //animaçoes allyBird
        //allyBirdy.abirdy.animations.add('voar',[5,9],5,true);
        //allyBirdy.abirdy.animations.play('voar',7,true);

        //colocar o livro no nivel
        book = this.add.sprite(2080,480,'book');
        book.anchor.setTo(0.5);
        game.physics.enable(book,Phaser.Physics.ARCADE);
        book.body.allowGravity = true;
        book.scale.setTo(0.4);

        //animaçoes do livro
        book.animations.add('normal');
        book.animations.play('normal',10,true);

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.W),

            //esc: this.input.keyboard.addKey(Phaser.keyboard.ESC)
        };

        gameOverPanel = this.game.add.image(170,100,'gameOver');
        gameOverPanel.visible = false;
        gameOverPanel.fixedToCamera = true;

        gameCompletedPanel = this.game.add.image(170,100,'gameCompleted');
        gameCompletedPanel.visible = false;
        gameCompletedPanel.fixedToCamera = true;

        menuInicial = this.add.button(850,610,'voltarBtn',startMenuBtnClick,this);
        menuInicial.scale.setTo(0.5);
        menuInicial.fixedToCamera = true;
        menuInicialGO = this.add.button(600,375,'voltarBtn',startMenuBtnClick,this);
        menuInicialGO.visible = false;
        menuInicialGO.fixedToCamera = true;
        restartBtn = this.add.button(600,310,'restartBtn',restart4hBtnClick,this);
        restartBtn.visible = false;
        restartBtn.fixedToCamera = true;
        restartBtn.inputEnabled = false;
        menuNiveis = this.add.button(600,310,'menuNiveisBtn',jogarBtnClick,this);
        menuNiveis.fixedToCamera = true;
        menuNiveis.visible = false;
        menuNiveis.inputEnabled = false;


    },
    update:function(){
        this.physics.arcade.collide(player,layer);
        this.physics.arcade.collide(player,book,this.tocaLivro,null,this);
        this.physics.arcade.collide(player,speedup,this.getCoin,null,this);
        this.physics.arcade.collide(layer,book);

        this.physics.arcade.collide(layer,enemy4.rbot,null,null,this);
        this.physics.arcade.collide(layer,enemy6.eman,null,null,this);
        this.physics.arcade.collide(layer,enemy9.gbot,null,null,this);
        this.physics.arcade.collide(layer,enemy10.ybot,null,null,this);
        this.physics.arcade.collide(layer,enemy11.rbot,null,null,this);
        this.physics.arcade.collide(layer,enemy12.eman,null,null,this);

        //aliados
        this.physics.arcade.collide(player,allyBirdy.abirdy,null,null,this);
    //    this.physics.arcade.collide(player,allyBirdx.abirdx,null,null,this);

        if(invuln==0){
            this.physics.arcade.collide(player,enemy1.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy2.bird,this.resetPlayer,null, this);
            this.physics.arcade.collide(player,enemy3.bird,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy4.rbot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy5.bird,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy6.eman,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy7.bird,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy8.bird,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy9.gbot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy10.ybot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy11.rbot,this.resetPlayer,null,this);
            this.physics.arcade.collide(player,enemy12.eman,this.resetPlayer,null,this);
        }else{
            this.physics.arcade.collide(player,enemy1.bird,this.killenemy1,null,this);
            this.physics.arcade.collide(player,enemy2.bird,this.killenemy2,null,this);
            this.physics.arcade.collide(player,enemy3.bird,this.killenemy3,null,this);
            this.physics.arcade.collide(player,enemy4.rbot,this.killenemy4,null,this);
            this.physics.arcade.collide(player,enemy5.bird,this.killenemy5,null,this);
            this.physics.arcade.collide(player,enemy6.eman,this.killenemy6,null,this);
            this.physics.arcade.collide(player,enemy7.bird,this.killenemy7,null,this);
            this.physics.arcade.collide(player,enemy8.bird,this.killenemy8,null,this);
            this.physics.arcade.collide(player,enemy9.gbot,this.killenemy9,null,this);
            this.physics.arcade.collide(player,enemy10.ybot,this.killenemy10,null,this);
            this.physics.arcade.collide(player,enemy11.rbot,this.killenemy11,null,this);
            this.physics.arcade.collide(player,enemy12.eman,this.killenemy12,null,this);
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

            if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
                player.animations.play('idle');
            }
        }

        if(enemy4.rbot.x==1312){
            enemy4.rbot.animations.play('right');
        }
        if(enemy4.rbot.x==1562){
            enemy4.rbot.animations.play('left');
        }
        if(enemy6.eman.x==1760){
            enemy6.eman.animations.play('right');
        }
        if(enemy6.eman.x==1960){
            enemy6.eman.animations.play('left');
        }
        if(enemy9.gbot.x==2656){
            enemy9.gbot.animations.play('right');
        }
        if(enemy9.gbot.x==2786){
            enemy9.gbot.animations.play('left');
        }
        if(enemy10.ybot.x==3264){
            enemy10.ybot.animations.play('right');
        }
        if(enemy10.ybot.x==3394){
            enemy10.ybot.animations.play('left');
        }
        if(enemy11.rbot.x==4480){
            enemy11.rbot.animations.play('right');
        }
        if(enemy11.rbot.x==4730){
            enemy11.rbot.animations.play('left');
        }
        if(enemy12.eman.x==5632){
            enemy12.eman.animations.play('right');
        }
        if(enemy12.eman.x==5832){
            enemy12.eman.animations.play('left');
        }



        this.game.debug.text("Lives "+vidashard,740,50);
        this.game.debug.text("Time",840,50);

        if(total > 10)
        	this.game.debug.text(total, 890, 50);
        else
        	this.game.debug.text(total, 890, 50,"#ff0000");
    },
    resetPlayer:function(spriteThatTriggeredMe,layer){

        if(spriteThatTriggeredMe==player){
            if(gOFlag == 0){
                vidashard--;
            }
            if(vidashard<=0){
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
            else if(vidashard>0){
                playerSpeed = 180;
                total=75;
                console.log("Tem "+vidashard+" vidas");
                console.log("Morreu, nível recomeçado!");
                this.state.start("Level4hard");
            }
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
        level5Unlocked = true;
        if(total==0){
            this.state.start('perguntaRecurso');
        }
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
        enemy3.bird.kill();
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
        enemy8.bird.kill();
    },
    killenemy9:function(){
        enemy9.gbot.kill();
    },
    killenemy10:function(){
        enemy10.ybot.kill();
    },
    killenemy11:function(){
        enemy11.rbot.kill();
    },
    killenemy12:function(){
        enemy12.eman.kill();
    },

}



function checkOverlap(spriteA,spriteB){ // verifica se 2 sprites deram overlap(se se tocaram)
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA,boundsB);
}

function updateCounter() {
	if(total > 0)
    	total--;
    console.log('Speed: '+ playerSpeed);
}

function restart4hBtnClick(){
    vidas=1;
    total = 75;
    gOFlag = 0;

    this.state.start('Level4hard');
}
