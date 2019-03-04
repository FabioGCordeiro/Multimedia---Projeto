var Game = {};

Game.Boot = function(game){

};

Game.Boot.prototype = {
    init:function(){
        //cursor?ish
        this.input.maxPointers =1;

        this.stage.disableVisibilityChange = true; //faz com que o jogo não entre em pausa se fizer alt+tab
    },
    preload:function(){
        this.load.image('preloaderBar','assets/preloader.png');
    },
    create:function(){
        this.state.start('Preloader');
    }

}
