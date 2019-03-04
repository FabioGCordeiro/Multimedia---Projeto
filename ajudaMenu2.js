"use strict"


Game.ajudaMenu2 = function(game){};

Game.ajudaMenu2.prototype = {
	create: function(game){
		var voltar;
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'ajudaBackground2');
		this.add.sprite(666,15,'logo');
		voltar = this.add.button(680,570,'voltarBtn',voltarBtnClick,this);
		voltar.inputEnabled = true;
		voltar.events.onInputOver.add(function(){voltar.loadTexture('voltarBtnHovered')},this);
		voltar.events.onInputOut.add(function(){voltar.loadTexture('voltarBtn')},this);
	}

}

function voltarBtnClick(){
	this.state.start('initialMenu');
}