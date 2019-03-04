"use strict"

var plusMenuButton;
var minusMenuButton;
var muteMenuButton;
var plusGameButton;
var minusGameButton;
var muteGameButton;
var plusSoundsButton;
var minusSoundsButton;
var muteSoundsButton;
var soundsMuted;
var gameMusicMuted;
var menuMusicMuted;
var voltarBtn;
var volumeGame;
var volumeMenu;
var facilButton;
var dificilButton;
var cGeralButton;
var leiButton;

Game.opcoesMenu = function(game){};

Game.opcoesMenu.prototype = {
	create: function(game){
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'opcoesBackground');
		this.add.sprite(666,15,'logo');


		if(facilGlobal == false){
			facilButton = this.add.button(320,420,'facilBtn',facilBtnClick,this);
		}
		else{
			facilButton = this.add.button(320,420,'facil_selectedBtn',facilBtnClick,this);
		}

		if(dificilGlobal == false){
			dificilButton = this.add.button(450,420,'dificilBtn',dificilBtnClick,this);
		}
		else{
			dificilButton = this.add.button(450,420,'dificil_selectedBtn',dificilBtnClick,this);
		}
		if(leiGlobal == false){
			leiButton = this.add.button(320,475,'leiBtn',leiBtnClick,this);
		}
		else{
			leiButton = this.add.button(320,475,'lei_selectedBtn',leiBtnClick,this);
		}
		if(culturaGeralGlobal == false){
			cGeralButton = this.add.button(450,475,'culturaGeralBtn',cGeralBtnClick,this);
		}
		else{
			cGeralButton = this.add.button(450,475,'culturaGeral_selectedBtn',cGeralBtnClick,this);
		}
		
		
		
		

		plusSoundsButton = this.add.button(320,275,'plus',plusSoundsBtnClick,this);
		minusSoundsButton = this.add.button(370,275,'minus',minusSoundsBtnClick,this);
		if(soundsAreMuted()){
			muteSoundsButton = this.add.button(420,275,'mute',muteSoundsBtnClick,this);
		}
		else{
			muteSoundsButton = this.add.button(420,275,'sound',muteSoundsBtnClick,this);
		}
		plusGameButton = this.add.button(320,325,'plus',plusGameBtnClick,this);
		minusGameButton = this.add.button(370,325,'minus',minusGameBtnClick,this);
		if(gameMusicIsMuted()){
			muteGameButton = this.add.button(420,325,'mute',muteGameBtnClick,this);
		}
		else{
			muteGameButton = this.add.button(420,325,'sound',muteGameBtnClick,this);
		}
		plusMenuButton = this.add.button(320,375,'plus',plusMenuBtnClick,this);
		minusMenuButton = this.add.button(370,375,'minus',minusMenuBtnClick,this);
		if(menuMusicIsMuted()){
			muteMenuButton = this.add.button(420,375,'mute',muteMenuBtnClick,this);
		}
		else{
			muteMenuButton = this.add.button(420,375,'sound',muteMenuBtnClick,this);
		}
		voltarButton = this.add.button(25,580,'voltarBtn',voltarBtnClick,this);

	},
	update: function(){
		if(menuMusicIsMuted()){
			musicaMenu.mute = true;
		}
		else{
			musicaMenu.mute = false;
		}

		if(gameMusicIsMuted()){
			musicaGame.mute = true;
		}
		else{
			musicaGame.mute = false;
		}

		if(facilGlobal == false){
			facilButton.loadTexture('facilBtn');
		}
		else{
			facilButton.loadTexture('facil_selectedBtn');
		}

		if(dificilGlobal == false){
			dificilButton.loadTexture('dificilBtn');
		}
		else{
			dificilButton.loadTexture('dificil_selectedBtn');
		}
		if(leiGlobal == false){
			leiButton.loadTexture('leiBtn');
		}
		else{
			leiButton.loadTexture('lei_selectedBtn');
		}
		if(culturaGeralGlobal == false){
			cGeralButton.loadTexture('culturaGeralBtn');
		}
		else{
			cGeralButton.loadTexture('culturaGeral_selectedBtn');
		}

		if(leiGlobal==false && culturaGeralGlobal == false){
			voltarButton.inputEnabled = false;
		}
		else{
			voltarButton.inputEnabled = true;
		}
	}
}


function plusSoundsBtnClick(){
	soundsVolume += 0.2;
}

function minusSoundsBtnClick(){
	soundsVolume -= 0.2;
}

function muteSoundsBtnClick(){
	if(soundsAreMuted()){
		muteSoundsButton.loadTexture('sound');
		soundsMuted = false;

	}
	else{
		muteSoundsButton.loadTexture('mute');
		soundsMuted = true;
	}
}

function plusGameBtnClick(){
	if(gameVolume > 1.8){
		gameVolume = 2;
	}
	else{
		gameVolume += 0.2;
	}

	musicaGame.volume = gameVolume;
}

function minusGameBtnClick(){
	if(gameVolume < 0.2){
		gameVolume = 0;
	}
	else{
		gameVolume -= 0.2;
	}

	musicaGame.volume = gameVolume;
}

function muteGameBtnClick(){
	if(gameMusicIsMuted()){
		muteGameButton.loadTexture('sound');
		gameMusicMuted = false;
	}
	else{
		muteGameButton.loadTexture('mute');
		gameMusicMuted = true;
	}
}

function plusMenuBtnClick(){
	if(menuVolume > 1.8){
		menuVolume = 2;
	}
	else{
		menuVolume += 0.2;
	}

	musicaMenu.volume = menuVolume;
}

function minusMenuBtnClick(){
	if(menuVolume < 0.2){
		menuVolume = 0;
	}
	else{
		menuVolume -= 0.2;
	}

	musicaMenu.volume = menuVolume;
}

function muteMenuBtnClick(){
	
	if(menuMusicIsMuted()){
		muteMenuButton.loadTexture('sound');
		menuMusicMuted = false;
	}
	else{
		muteMenuButton.loadTexture('mute');
		menuMusicMuted = true;
	}
}

function facilBtnClick(){
	if(facilGlobal == false){
		facilGlobal = true;
		dificilGlobal = false;
	}
	else{
		facilGlobal = false;
		dificilGlobal = true;
	}
}

function dificilBtnClick(){
	if(dificilGlobal == false){
		dificilButton.loadTexture('dificil_selectedBtn');
		dificilGlobal = true;
		facilGlobal = false;
	}
	else{
		dificilButton.loadTexture('dificilBtn');
		dificilGlobal = false;
		facilGlobal = true;
	}
}

function cGeralBtnClick(){
	if(culturaGeralGlobal == false){
		cGeralButton.loadTexture('culturaGeral_selectedBtn');
		culturaGeralGlobal = true;
	}
	else{
		cGeralButton.loadTexture('culturaGeralBtn');
		culturaGeralGlobal = false;
	}
}

function leiBtnClick(){
	if(leiGlobal == false){
		leiButton.loadTexture('lei_selectedBtn');
		leiGlobal = true;
	}
	else{
		leiButton.loadTexture('leiBtn');
		leiGlobal = false;
	}
}

function voltarBtnClick(){
	musicaGame.stop();
	this.state.start('initialMenu');
}

function soundsAreMuted(){
	return soundsMuted;
}

function gameMusicIsMuted(){
	return gameMusicMuted;
}

function menuMusicIsMuted(){
	return menuMusicMuted;
}