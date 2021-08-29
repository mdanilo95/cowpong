//############### VARIÁVEIS ###################
// variáveis são criadas para deixar o código mais legível para outras pessaos e para o próprio usuário modifica-lo ou entende-lo no futuro.

// variaveis colisão.
var colision = false

//variáveis da bolinha.
let xBolinha = 300;
let yBolinha = 200;
let diameter = 15;
let raio = diameter /2

//variáveis do movimento da bolinha.
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variáveis da raquete do player.
let xRacket = 5
let yRacket = 150
let racketLength = 10
let racketHeight = 100

//variáveis da raquete do computador.
let xCPURacket = 585
let yCPURacket = 150
let yVelocityRacket
let errorChance = 0

//variáveis pontos
let personPoints = 0
let cpuPoints = 0

//variáveis som.

//#######################################################

//################### CÓDIGO ##########################

function preload(){
  pointSound = loadSound("ponto.mp3")
  pongSound = loadSound("raquetada.mp3")
}

// cria o plano de fundo no formato especificado x/y
function setup() {
  createCanvas(600, 400);
}

//funcionamento do jogo em si, cria o fundo, mostra a bolinha etc.
function draw(){
  stroke(255)
  background(0);
  showBall();
  moveBall();
  movePersonRacket();
  moveCPURacket()
  personRacket(xCPURacket, yCPURacket)
  verifyRacketColision(xRacket, yRacket)
  verifyRacketColision(xCPURacket, yCPURacket)
  showPoints()
  calcPoints()
}

//Desenho da bolinha, posição x, y e seu tamanho.
function showBall(){
  circle(xBolinha, yBolinha, diameter);
}

//Raquete da pessoa.
function personRacket(x, y){
  rect(x, y, racketLength, racketHeight)
}

//Movimento da raquete da pessoa.
function movePersonRacket(){
  if (keyIsDown(UP_ARROW)){
    yRacket -= 5
  }
  if (keyIsDown(DOWN_ARROW))
    yRacket += 5
}

//MOVIMENTO RAQUETE DO CPU.
function moveCPURacket(){
  yVelocityRacket = yBolinha - yCPURacket - racketLength / 2 - 30 
  yCPURacket += yVelocityRacket + errorChance
  calcErrorChance()
}


//Movimentação da bolinha. É a sua posição + ela mesmo + a velocidade da bolinha nos eixos x/y.
function moveBall(){
  xBolinha += + velocidadeXBolinha;
  yBolinha += + velocidadeYBolinha;
}

//Para fazer a bolinha colidir com as bordas e retornar. Para que não entre metade da bolinha para dentro das bordas, não usaremos o diâmetro, mas sim o raio. Diametro/2

function verifyBoardColision(){
   if (xBolinha + raio > width || 
    xBolinha - raio < 0){
  velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0){
  velocidadeYBolinha *= -1;
  }
}

function verifyRacketColision(x, y){
  colision =
  collideRectCircle(x, y, 10, 100, xBolinha, yBolinha, raio)
  if (colision){
    velocidadeXBolinha *= -1
    pongSound.play()
  }  
}

function showPoints(){
  textAlign(CENTER)
  textSize(20)
  fill(color(255, 140, 0))
  rect(200, 10, 40, 20)
  fill(255)
  text(personPoints, 220, 28)
  fill(color(255, 140, 0))
  rect(400, 10, 40, 20)
  fill(255)
  text(cpuPoints, 420, 28)
}

function calcPoints(){
  if (xBolinha > 590){
   personPoints += 1
    pointSound.play()
  }
  if (xBolinha < 10){
    cpuPoints += 1
    pointSound.play()
  }
}

function calcErrorChance(){
  if (cpuPoints >= personPoints){
  errorChance += 1
     if (errorChance >= 35){
      errorChance = 40
    }
}  else 
    errorChance -= 1
  if (errorChance < 35){
    errorChance = 35
  }
}
