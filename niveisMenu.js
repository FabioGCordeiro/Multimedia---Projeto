"use strict"

var nivel1Button;
var nivel2Button;
var nivel3Button;
var nivel4Button;
var nivel5Button;
var voltarButton;
Game.niveisMenu = function(game){};

Game.niveisMenu.prototype = {
	create: function(game){

		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'menuNiveisBackground');
		this.add.sprite(666,15,'logo');
		nivel1Button = this.add.button(390,200,'nivel1Btn',nivel1BtnClick,this);
        nivel1Button.inputEnabled = true;
        nivel1Button.events.onInputOver.add(function(){nivel1Button.loadTexture('nivel1BtnHovered')},this);
        nivel1Button.events.onInputOut.add(function(){nivel1Button.loadTexture('nivel1Btn')},this);
        if(level2Unlocked == false){
            nivel2Button = this.add.button(390,260,'nivel2Disabled',nivel2BtnClick,this);
            nivel2Button.inputEnabled = false;
        }
        else{
            nivel2Button = this.add.button(390,260,'nivel2Btn',nivel2BtnClick,this);
            nivel2Button.inputEnabled = true;
            nivel2Button.events.onInputOver.add(function(){nivel2Button.loadTexture('nivel2BtnHovered')},this);
            nivel2Button.events.onInputOut.add(function(){nivel2Button.loadTexture('nivel2Btn')},this);
        }
        if(level3Unlocked == false){
            nivel3Button = this.add.button(390,320,'nivel3Disabled',nivel3BtnClick,this);
            nivel3Button.inputEnabled = false;
        }
        else{
            nivel3Button = this.add.button(390,320,'nivel3Btn',nivel3BtnClick,this);
            nivel3Button.inputEnabled = true;
            nivel3Button.events.onInputOver.add(function(){nivel3Button.loadTexture('nivel3BtnHovered')},this);
            nivel3Button.events.onInputOut.add(function(){nivel3Button.loadTexture('nivel3Btn')},this);
        }
        if(level4Unlocked == false){
            nivel4Button = this.add.button(390,380,'nivel4Disabled',nivel4BtnClick,this);
            nivel4Button.inputEnabled = false;
        }
        else{
            nivel4Button = this.add.button(390,380,'nivel4Btn',nivel4BtnClick,this);
            nivel4Button.inputEnabled = true;
            nivel4Button.events.onInputOver.add(function(){nivel4Button.loadTexture('nivel4BtnHovered')},this);
            nivel4Button.events.onInputOut.add(function(){nivel4Button.loadTexture('nivel4Btn')},this);
        }
        if(level5Unlocked == false){
            nivel5Button = this.add.button(390,440,'nivel5Disabled',nivel5BtnClick,this);
            nivel5Button.inputEnabled = false;
        }
        else{
            nivel5Button = this.add.button(390,440,'nivel5Btn',nivel5BtnClick,this);
            nivel4Button.inputEnabled = true;
            nivel5Button.events.onInputOver.add(function(){nivel5Button.loadTexture('nivel5BtnHovered')},this);
            nivel5Button.events.onInputOut.add(function(){nivel5Button.loadTexture('nivel5Btn')},this);
        }
		voltarButton = this.add.button(25,580,'voltarBtn',voltarBtnClick,this);
        voltarButton.inputEnabled = true;
        voltarButton.events.onInputOver.add(function(){voltarButton.loadTexture('voltarBtnHovered')},this);
        voltarButton.events.onInputOut.add(function(){voltarButton.loadTexture('voltarBtn')},this);
	}
}

function nivel1BtnClick(){
	musicaGame.play();
    musicaMenu.stop();
    vidas = 3;
    vidashard = 1;
    total = 75;
    if(facilGlobal){
    	time1=0;
        time2=0;
        time3=0;
        time4=0;
        time5=0;
        time6=0;
        time7=0;
        time8=0;
		this.state.start('Level1');
    }
    else{
    	this.state.start('Level1hard');
    }
}

function nivel2BtnClick(){
	musicaGame.play();
    musicaMenu.stop();
    vidas = 3;
    vidashard = 1;
    total = 75;
	if(facilGlobal){
		time1=0;
        time2=0;
        time3=0;
        time4=0;
        time5=0;
        time6=0;
        time7=0;
        time8=0;
        time9=0;
		this.state.start('Level2');
	}
	else{
		this.state.start('Level2hard');
	}
}

function nivel3BtnClick(){
	musicaGame.play();
    musicaMenu.stop();
    vidas = 3;
    vidashard = 1;
    total = 75;
    if(facilGlobal){
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
    	this.state.start('Level3');
    }
    else{
    	this.state.start('Level3hard');
    }
}

function nivel4BtnClick(){
    musicaGame.play();
    musicaMenu.stop();
    vidas = 3;
    vidashard = 1;
    total = 75;
	if(facilGlobal){
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
		this.state.start('Level4');
	}
	else{
		this.state.start('Level4hard');
	}
}

function nivel5BtnClick(){
    musicaGame.play();
    musicaMenu.stop();
    vidas = 3;
    vidashard = 1;
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
    time11=0;
    time12=0;
    this.state.start('Level5');
}