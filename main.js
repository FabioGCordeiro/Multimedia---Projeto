"use strict"

window.onload = function(){
	var game = new Phaser.Game(960, 640, Phaser.AUTO,'game_area');
    game.state.add('Boot',Game.Boot);
    game.state.add('startMenu',Game.startMenu);
    game.state.add('initialMenu',Game.initialMenu);
    game.state.add('niveisMenu',Game.niveisMenu);
    game.state.add('opcoesMenu',Game.opcoesMenu);
    game.state.add('ajudaMenu',Game.ajudaMenu);
    game.state.add('ajudaMenu2',Game.ajudaMenu2);
    game.state.add('Preloader',Game.Preloader);
    game.state.add('Level1',Game.Level1);
    game.state.add('Level1hard',Game.Level1hard);
    game.state.add('Level2',Game.Level2);
    game.state.add('Level2hard',Game.Level2hard);
    game.state.add('Level3',Game.Level3);
    game.state.add('Level3hard',Game.Level3hard);
    game.state.add('Level4',Game.Level4);
    game.state.add('Level4hard',Game.Level4hard);
    game.state.add('Level5',Game.Level5);
    game.state.add('credMenu',Game.credMenu);
    game.state.add('perguntaRecurso',Game.perguntaRecurso);
    game.state.start('Boot');
}