"use strict"

var answerABtn;
var answerBBtn;
var answerCBtn;
var answerDBtn;
var pergunta;
var answerA;
var answerB;
var answerC;
var answerD;
var responderBtn;
var resposta;
var MenuInicial;
var answeredA = false;
var answeredB = false;
var answeredC = false;
var answeredD = false;
var quest;
var aux;
var tipo; //0 -> LEI 1 -> Cultura Geral
Game.perguntaRecurso = function(game){};

Game.perguntaRecurso.prototype = {
	create: function(game){
        answeredA = false;
        answeredB = false;
        answeredC = false;
        answeredD = false;
		this.stage.backgroundColor= '#3A5963';
		this.backgroundSprite = this.game.add.tileSprite(0,0,960,640,'menuBackground');
		this.add.sprite(666,15,'logo');
		answerABtn = this.add.button(75,250,'answerABtn',answerABtnClick,this);
		answerBBtn = this.add.button(75,300,'answerBBtn',answerBBtnClick,this);
		answerCBtn = this.add.button(75,350,'answerCBtn',answerCBtnClick,this);
		answerDBtn = this.add.button(75,400,'answerDBtn',answerDtnClick,this);
		responderBtn = this.add.button(75,475,'responderBtn',responderBtnClick,this);
		menuInicial = this.add.button(25,580,'voltarBtn',voltarBtnClick,this);
        quest = generateQuestion();
        answerA = this.game.debug.text(quest[1],130,262,"#FFD700");
        answerB = this.game.debug.text(quest[2],130,312,"#FFD700");
        answerC = this.game.debug.text(quest[3],130,362,"#FFD700");
        answerD = this.game.debug.text(quest[4],130,412,"#FFD700");
        pergunta = this.game.debug.text(quest[0],50,200,"#FFD700");
        gameOverPanel = this.game.add.image(170,100,'gameOver');
        gameOverPanel.visible = false;
        gameCompletedPanel = this.game.add.image(170,100,'gameCompleted');
        gameCompletedPanel.visible = false;
        menuInicialGO = this.add.button(600,375,'voltarBtn',startMenuBtnClick,this);
        menuInicialGO.visible = false;
        restartBtn = this.add.button(600,310,'restartBtn',restart1BtnClick,this);
        restartBtn.visible = false;
        restartBtn.inputEnabled = false;
        menuNiveis = this.add.button(600,310,'menuNiveisBtn',jogarBtnClick,this);
        menuNiveis.visible = false;
        menuNiveis.inputEnabled = false;

	},
    update: function(){
        if(answeredA){
            answerABtn.loadTexture('answerASelectedBtn');
        }
        else{
            answerABtn.loadTexture('answerABtn');
        }
        if(answeredB){
            answerBBtn.loadTexture('answerBSelectedBtn');
        }
        else{
            answerBBtn.loadTexture('answerBBtn');
        }
        if(answeredC){
            answerCBtn.loadTexture('answerCSelectedBtn');
        }
        else{
            answerCBtn.loadTexture('answerCBtn');
        }
        if(answeredD){
            answerDBtn.loadTexture('answerDSelectedBtn');
        }
        else{
            answerDBtn.loadTexture('answerDBtn');
        }
    }
}

function generateQuestion(){
    if(leiGlobal == true && culturaGeralGlobal == false){
        aux = Math.floor(Math.random() * questionsLEI.length);
        tipo = 0;
        return questionsLEI[aux];
    }
    else if(leiGlobal == false && culturaGeralGlobal == true){
        aux = Math.floor(Math.random() * questionsCG.length);
        tipo = 1;
        return questionsCG[aux];
    }
    else if(leiGlobal == true && culturaGeralGlobal == true){
        if(Math.random()<0.5){
            aux = Math.floor(Math.random() * questionsLEI.length);
            tipo = 0;
            return questionsLEI[aux];
        }
        else{
            aux = Math.floor(Math.random() * questionsCG.length);
            tipo = 1;
            return questionsCG[aux];
        }
    }

}

function answerABtnClick(){
	answeredA = true;
    answeredB = false;
    answeredC = false;
    answeredD = false;
}

function answerBBtnClick(){
    answeredA = false;
    answeredB = true;
    answeredC = false;
    answeredD = false;	
}

function answerCBtnClick(){
    answeredA = false;
    answeredB = false;
    answeredC = true;
    answeredD = false;
}

function answerDtnClick(){
    answeredA = false;
    answeredB = false;
    answeredC = false;
    answeredD = true;
}

function responderBtnClick(){
    if(answeredA){
        resposta = confirmaResposta(1); 
    }
    else if(answeredB){
        resposta = confirmaResposta(2);
    }
    else if(answeredC){
        resposta = confirmaResposta(3);
    }
    else if(answeredD){
        resposta = confirmaResposta(4);
    }

    if(resposta){
            gameCompletedPanel.visible = true;
            menuNiveis.visible = true;
            menuInicialGO.visible = true;
            menuNiveis.inputEnabled = true;
        }
        else{
            gameOverPanel.visible = true;
            restartBtn.visible = true;
            menuInicialGO.visible = true;
            restartBtn.inputEnabled = true;
        }
}

function confirmaResposta(respostaDada){
    return quest[respostaDada] == quest[5];
}