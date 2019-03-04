"use strict"

var soundsVolume = 0.5;
var menuVolume = 0.5;
var gameVolume = 0.5;
var facilGlobal = true;
var dificilGlobal = false;
var culturaGeralGlobal = true;
var leiGlobal = false;
var level1Unlocked = true;
var level2Unlocked = false;
var level3Unlocked = false;
var level4Unlocked = false;
var level5Unlocked = false
var questionsCG,questionsLEI;
questionsCG = [["Que expressão alemã significa 'Guerra-Relâmpago'?","Sauerkraut","Glasnost","Reichstag","Blitzkrieg","Blitzkrieg"],["Quem escreveu 'A Arte da Guerra'?","Confúcio","Gandhi","Sun Tzu","Mao Tsé Tung","Sun Tzu"],["Qual é a capital da Turquia?","Istambul","Ancara","Adana","Esmirna","Ancara"],["Que corpo militar de elite foi criado em França por Luís XIII como guarda pessoal no século XVII e existiu até 1815?","Guarda Suiça","Rangers","Escuteiros","Mosqueteiros","Mosqueteiros"],["Em que período ocorreu a 1ª Guerra Mundial?","1939-1945","1919-1926","1914-1918","1920-1924","1914-1918"],["Quantos ossos tem o corpo de um humano adulto?","304","206","152","248","206"],["Em que ano começou a revolução francesa?","1756","1810","1856","1789","1789"],["Qual o país mais pequeno do mundo?","Mónaco","Cidade do Vaticano","Nauru","São Marino","Cidade do Vaticano"],["Em que ano foi fundada a Universidade de Coimbra?","1290","1150","1340","1869","1290"],["Qual o livro mais vendido no mundo a seguir à Bíblia?","O Senhor dos Anéis","Dom Quixote","O Pequeno Príncipe","Um conto de Duas Cidades","Dom Quixote"]];
questionsLEI = [["Quanto é '8' em código binário?","111","1000","1001","1010","1000"],["A transformada de Fourier Discreta do Zero Padding de um sinal x[n]...","melhora a resolução espectral do sinal.","mantém a resolução espectral do sinal.","piora a resolução espectral do sinal.","depende do sinal x[n]","melhora a resolução espectral do sinal."],["3 GBytes são quantos KBytes?","3000000 KB","3145728 KB","2861023 KB","3221225 KB","3145728 KB"],["O que é um sistema operativo simétrico?","É um SO que divide os processos entre os CPUs restantes","É um SO que divide os processos na cache","É um SO que distribui os processos para os CPUs livres","Todas acima mencionadas","É um SO que distribui os processos para os CPUs livres"],["GUI significa: ","Graphical Use Interpreter","Graphical User Interface","Graphical User Intended","Nenhuma das anteriores","Graphical User Interface"],["O que é codificação de Huffman?","É um método de compressão que usa as probabilidades de ocorrência dos símbolos","É um método de criptografia que utiliza probabilidades","É um algoritmo de ordenação","Nenhuma das anteriores","É um método de compressão que usa as probabilidades de ocorrência dos síbolos"],["Quantas torres tem o DEI?","7","6","3","5","5"],["Em que ano foi criada a Licenciatura em Engenharia Informática na UC?","1984","1991","1978","1989","1984"]];
Game.Preloader = function(game){
    this.preloadBar = null;
};

Game.Preloader.prototype = {
    preload:function(){
        this.preloadBar= this.add.sprite(this.world.centerX,this.world.centerY,'preloaderBar');// mete a barra de loading no centro
        this.preloadBar.anchor.setTo(0.5); // usa o centro da imagem da barra
        this.preloadBar.scale.setTo(1);

        this.time.advancedTimimg = true; // trata dos tempos

        this.load.setPreloadSprite(this.preloadBar);

        //LOAD ALL ASSETS
        this.load.tilemap('map1','assets/Level1final.csv');
        this.load.tilemap('map2','assets/Level2final.csv');
        this.load.tilemap('map3','assets/Level3final.csv');
        this.load.tilemap('map4','assets/Level4final.csv');
        this.load.tilemap('map5','assets/LEvel5final.csv');


        this.load.audio('musicaMenu','assets/Visager_-_02_-_Royal_Entrance.mp3');
        this.load.audio('musicaGame','assets/game.mp3');

                //LOAD BUTTONS
        this.load.image('ajudaBtn','assets/ajuda_button.png');
        this.load.image('ajudaBtnHovered','assets/ajuda_button_hovered.png');
        this.load.image('comecarBtn','assets/comecar_button.png');
        this.load.image('comecarBtnHovered','assets/comecar_button_hovered.png');
        this.load.image('credBtn','assets/cred_button.png');
        this.load.image('credBtnHovered','assets/cred_button_hovered.png');
        this.load.image('jogarBtn','assets/jogar_button.png');
        this.load.image('jogarBtnHovered','assets/jogar_button_hovered.png');
        this.load.image('nivel1Btn','assets/nivel1_button.png');
        this.load.image('nivel1BtnHovered','assets/nivel1_button_hovered.png');
        this.load.image('nivel2Btn','assets/nivel2_button.png');
        this.load.image('nivel2BtnHovered','assets/nivel2_button_hovered.png');
        this.load.image('nivel2Disabled','assets/nivel2_disabled.png');
        this.load.image('nivel3Btn','assets/nivel3_button.png');
        this.load.image('nivel3BtnHovered','assets/nivel3_button_hovered.png');
        this.load.image('nivel3Disabled','assets/nivel3_disabled.png');
        this.load.image('nivel4Btn','assets/nivel4_button.png');
        this.load.image('nivel4BtnHovered','assets/nivel4_button_hovered.png');
        this.load.image('nivel4Disabled','assets/nivel4_disabled.png');
        this.load.image('nivel5Btn','assets/nivel5_button.png');
        this.load.image('nivel5BtnHovered','assets/nivel5_button_hovered.png');
        this.load.image('nivel5Disabled','assets/nivel5_disabled.png');
        this.load.image('opcoesBtn','assets/opcoes_button.png');
        this.load.image('opcoesBtnHovered','assets/opcoes_button_hovered.png');
        this.load.image('sairBtn','assets/sair_button.png');
        this.load.image('sairBtnHovered','assets/sair_button_hovered.png');
        this.load.image('voltarBtn','assets/voltar_button.png');
        this.load.image('voltarBtnHovered','assets/voltar_button_hovered.png');
        this.load.image('plus','assets/plus.png');
        this.load.image('minus','assets/minus.png');
        this.load.image('mute','assets/mute.png');
        this.load.image('sound','assets/sound.png');
        this.load.image('answerABtn','assets/answerA_notSelected.png');
        this.load.image('answerASelectedBtn','assets/answerA_Selected.png');
        this.load.image('answerBBtn','assets/answerB_notSelected.png');
        this.load.image('answerBSelectedBtn','assets/answerB_Selected.png');
        this.load.image('answerCBtn','assets/answerC_notSelected.png');
        this.load.image('answerCSelectedBtn','assets/answerC_Selected.png');
        this.load.image('answerDBtn','assets/answerD_notSelected.png');
        this.load.image('answerDSelectedBtn','assets/answerD_Selected.png');
        this.load.image('culturaGeralBtn','assets/cGeral_notSelected.png');
        this.load.image('culturaGeral_selectedBtn','assets/cGeral_Selected.png');
        this.load.image('leiBtn','assets/lei_notSelected.png');
        this.load.image('lei_selectedBtn','assets/lei_Selected.png');
        this.load.image('dificilBtn','assets/DificilButton_notSelected.png');
        this.load.image('dificil_selectedBtn','assets/DificilButton_Selected.png');
        this.load.image('facilBtn','assets/FacilButton_notSelected.png');
        this.load.image('facil_selectedBtn','assets/FacilButton_Selected.png');
        this.load.image('menuInicialBtn','assets/menuInicial_button.png');
        this.load.image('menuInicialBtnHovered','assets/menuInicial_button_hovered.png');
        this.load.image('menuNiveisBtn','assets/menuNiveis_button.png');
        this.load.image('menuNiveisBtnHovered','assets/menuNiveis_button_hovered.png');
        this.load.image('responderBtn','assets/responder_button.png');
        this.load.image('responderBtnButtonHovered','assets/responder_button_hovered.png');
        this.load.image('restartBtn','assets/restart_button.png');
        this.load.image('restartBtnHovered','assets/restart_button_hovered.png');


        this.load.image('tileset','assets/tilesetfinal.png');

        this.load.spritesheet('player','assets/player.png',24,26);

        this.load.spritesheet('book','assets/book_sheet.png',64,64);


        this.load.image('speedup','assets/speedup.png');
        this.load.image('ufo','assets/ufo.png');
        this.load.spritesheet('boss','assets/boss.png',32,32);
        this.load.image('bookboss','assets/bookboss.png');
        //bots
        this.load.spritesheet('redBot','assets/spacebot-red.png',48,64);
        this.load.spritesheet('greenBot','assets/spacebot-green.png',48,64);
        this.load.spritesheet('blueBot','assets/spacebot-teal.png',48,64);
        this.load.spritesheet('violetBot','assets/spacebot-violet.png',48,64);
        this.load.spritesheet('orangeBot','assets/spacebot-orange.png',48,64);
        this.load.spritesheet('yellowBot','assets/spacebot-yellow.png',48,64);
        //passaro aliado
        this.load.spritesheet('allyBird','assets/bird.png',32,32);

        this.load.spritesheet('spaceman','assets/spaceman.png',48,64);

        this.load.image('logo','assets/logo.png');
        this.load.image('gameOver','assets/gameOver.png');
        this.load.image('gameCompleted','assets/gameCompleted.png');
        this.load.image('arrowBtn','assets/arrow.png');

        //LOAD BACKGROUNDS
        this.load.image('ajudaBackground','assets/ajudaBackground.png');
        this.load.image('ajudaBackground2','assets/ajudaBackground2.png');
        this.load.image('creditosBackground','assets/creditosBackground.png');
        this.load.image('menuBackground','assets/layout.jpg');
        this.load.image('menuNiveisBackground','assets/menuNiveisBackground.png');
        this.load.image('opcoesBackground','assets/opcoesBackground.png');
        this.load.image('background','assets/background0.png');




        this.load.image('nut','assets/ram.png');
    },
    create:function(){
        this.state.start("startMenu");
    }


};
