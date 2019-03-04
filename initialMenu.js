"use strict"

Game.initialMenu = function(game){};

Game.initialMenu.prototype = {
	create: function(game){
		var jogarButton;
		var opcoesButton;
		var ajudaButton;
		var sairButton;
		var creditosButton;
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'menuBackground');
		this.add.sprite(340,125,'logo');
		jogarButton = this.add.button(390,300,'jogarBtn',jogarBtnClick,this);
		jogarButton.inputEnabled = true;
		jogarButton.events.onInputOver.add(function(){jogarButton.loadTexture('jogarBtnHovered')},this);
		jogarButton.events.onInputOut.add(function(){jogarButton.loadTexture('jogarBtn')},this);
		opcoesButton = this.add.button(390,375,'opcoesBtn',opcoesBtnClick,this);
		opcoesButton.inputEnabled = true;
		opcoesButton.events.onInputOver.add(function(){opcoesButton.loadTexture('opcoesBtnHovered')},this);
		opcoesButton.events.onInputOut.add(function(){opcoesButton.loadTexture('opcoesBtn')},this);
		ajudaButton = this.add.button(390,450,'ajudaBtn',ajudaBtnClick,this);
		ajudaButton.inputEnabled = true;
		ajudaButton.events.onInputOver.add(function(){ajudaButton.loadTexture('ajudaBtnHovered')},this);
		ajudaButton.events.onInputOut.add(function(){ajudaButton.loadTexture('ajudaBtn')},this);
		creditosButton = this.add.button(25,580,'credBtn',credBtnClick,this);
		creditosButton.inputEnabled = true;
		creditosButton.events.onInputOver.add(function(){creditosButton.loadTexture('credBtnHovered')},this);
		creditosButton.events.onInputOut.add(function(){creditosButton.loadTexture('credBtn')},this)
	}

}

function jogarBtnClick(){
	musicaGame.stop();
	this.state.start('niveisMenu');
}

function opcoesBtnClick(){
	this.state.start('opcoesMenu');
}

function ajudaBtnClick(){
	this.state.start('ajudaMenu');
}

function credBtnClick(){
	this.state.start('credMenu');
}