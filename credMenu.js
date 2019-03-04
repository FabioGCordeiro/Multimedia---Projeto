"use strict"


Game.credMenu = function(game){};

Game.credMenu.prototype = {
	create: function(game){
		var voltarBtn;
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'creditosBackground');
		this.add.sprite(666,15,'logo');
		voltarButton = this.add.button(25,580,'voltarBtn',voltarBtnClick,this);
        voltarButton.inputEnabled = true;
        voltarButton.events.onInputOver.add(function(){voltarButton.loadTexture('voltarBtnHovered')},this);
        voltarButton.events.onInputOut.add(function(){voltarButton.loadTexture('voltarBtn')},this);
	}

}

function voltarBtnClick(){
	this.state.start('initialMenu');
}