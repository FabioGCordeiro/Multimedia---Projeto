"use strict"

var musicaMenu;
var musicaGame;

Game.startMenu = function(game){};

Game.startMenu.prototype = {
	create: function(game){
		var startButton;
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'menuBackground');
		this.add.sprite(340,125,'logo');
		musicaMenu = this.add.audio('musicaMenu');
		musicaMenu.volume = menuVolume;
		musicaGame = this.add.audio('musicaGame');
		musicaGame.volume = gameVolume;
		musicaGame.loop = true;
		musicaMenu.loop = true;
		musicaMenu.play();

		startButton = this.add.button(390,450,'comecarBtn',startBtnClick,this);
	},
	update: function(){
		if(menuMusicIsMuted()){
        musicaMenu.mute = true;
    }
    else{
        musicaMenu.mute = false;
    }
	}

}

function startBtnClick(){
	this.state.start('initialMenu');
}