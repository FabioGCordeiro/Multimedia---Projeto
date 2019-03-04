"use strict"


Game.ajudaMenu = function(game){};

Game.ajudaMenu.prototype = {
	create: function(game){
		var arrowButton;
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'ajudaBackground');
		this.add.sprite(666,15,'logo');
		arrowButton = this.add.button(850,570,'arrowBtn',arrowBtnClick,this);
	}

}

function arrowBtnClick(){
	this.state.start('ajudaMenu2');
}