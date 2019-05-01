// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - Full use of class system in buttons and cards
// - Used array to choose card colour randomly
// - Sound implemented (background music and button click)


//Preloads the sound (mp3) and image (png) files used
function preload() {
  soundFormats("mp3");
  backgroundMusic = loadSound("assets/sounds/backgroundMusic.mp3");
  buttonClick = loadSound("assets/sounds/buttonClick.mp3");
  cardPickUp = loadSound("assets/sounds/cardPickUp.mp3");
  cardDraw = loadSound("assets/sounds/cardDraw.mp3");
  deckShuffle = loadSound("assets/sounds/deckShuffle.mp3");

  blueButton = loadImage("assets/buttons/blueNotClicked.png");
  blueButtonClicked = loadImage("assets/buttons/blueClicked.png");
  greenButton = loadImage("assets/buttons/greenNotClicked.png");
  greenButtonClicked = loadImage("assets/buttons/greenClicked.png");
  yellowButton = loadImage("assets/buttons/yellowNotClicked.png");
  yellowButtonClicked = loadImage("assets/buttons/yellowClicked.png");
  yellowSmallButton = loadImage("assets/buttons/yellowSmallNotClicked.png");
  yellowSmallButtonClicked = loadImage("assets/buttons/yellowSmallClicked.png");

  whiteCard = loadImage("assets/cards/whitecard.png");
  blueCard = loadImage("assets/cards/bluecard.png");
  greenCard = loadImage("assets/cards/greencard.png");
  redCard = loadImage("assets/cards/redcard.png");
  yellowCard = loadImage("assets/cards/yellowcard.png");

  menuBackground = loadImage("assets/backgrounds/menuBackground.jpg");
  dungeonBackgroundTwo = loadImage("assets/backgrounds/dungeonOne.jpg");
  dungeonBackgroundOne = loadImage("assets/backgrounds/dungeonTwo.png");
  forestBackgroundOne = loadImage("assets/backgrounds/forestOne.jpg");
  optionsBackground = loadImage("assets/backgrounds/optionsBackground.jpg");

  chomperMonsterImage = loadImage("assets/monsters/chomper.png");
  blueBeanMonsterImage = loadImage("assets/monsters/blueBean.png");
  spikySlimeMonsterImage = loadImage("assets/monsters/spikySlime.png");
  dizzyMonsterImage = loadImage("assets/monsters/dizzy.png");
  fireDemonMonsterImage = loadImage("assets/monsters/fireDemon.png");

  standardCursor = loadImage("assets/cursors/standard.png");
}

//sets up the canvas, center modes (rect, text, image), playmodes for sounds, and runs the setup for the cards
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);

  backgroundMusic.playMode("sustain");
  buttonClick.playMode("restart");
  cardPickUp.playMode("restart");
  cardDraw.playMode("restart");
  deckShuffle.playMode("restart");
  backgroundMusic.loop();

  cardStatSetup();
  cardSetup();
  monsterSetup();

  cardDeckList = [lightAttack, lightAttack, lightAttack, lightAttack, lightAttack, heavyAttack, heavyAttack,flayAttack, flayAttack, flayAttack];

  cardLocationList = [cardLocationOne, cardLocationTwo, cardLocationThree, cardLocationFour, cardLocationFive, cardLocationSix, cardLocationSeven];

  cursorSpriteList = [standardCursor];
}

//setup all the variables
let cardWidth = 100;
let cardHeight = 160;
let cardScalar = 1;
let cardInHand = false;
let draggingCardID;
let newCardType;

let gameState = "menu";
let buttonTextSize;

let soundMute = false;
let soundVolume = 0.5;
let playingSound = false;
let muteButtonReady = true;

let colourChange = false;
let backgroundColour = "grey";
let buttonColour = "white";
let textColour = "black";
let cardColourList = ["white", "blue", "green", "red", "yellow"];

let backgroundMusic, buttonClick, cardPickUp, cardDraw, deckShuffle;

let menuBackground, dungeonBackgroundOne, dungeonBackgroundTwo, forestBackgroundOne, optionsBackground;
let whiteCard, blueCard, greenCard, redCard, yellowCard;
let cardLocationOne, cardLocationTwo, cardLocationThree, cardLocationFour, cardLocationFive, cardLocationSix, cardLocationSeven;
let playButton, optionsButton, quitButton, darkOptionButton, lightOptionButton, soundOptionButton, backOptionButton, backPlayButton;
let blueButton, blueButtonClicked, greenButton, greenButtonClicked, yellowButton, yellowButtonClicked, yellowSmallButton, yellowSmallButtonClicked;

let standardCursor;
let cursorSpriteList;
let cursorMode = "standard";

let chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster;
let chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage, dizzyMonsterImage, fireDemonMonsterImage;
let monsterSpriteList = [chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage, dizzyMonsterImage, fireDemonMonsterImage];
let monsterOne, monsterTwo, monsterThree;
let monsterList = [chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster];

let monsterLocationOne = [1/3, 1/2];
let monsterLocationTwo = [1/2, 1/4];
let monsterLocationThree = [2/3, 1/2];
let monsterLocationList = [monsterLocationOne, monsterLocationTwo, monsterLocationThree];
let monstersSpawned = false;
let monsterType;

let heavyAttack, lightAttack, flayAttack;
let cardDeckList = [lightAttack, lightAttack, lightAttack, lightAttack, lightAttack, heavyAttack, heavyAttack, flayAttack];
let newDeckList = cardDeckList;
let cardDiscardDeckList = [];
let cardHandList = [];
let cardLocationList;

let lightAttack2, heavyAttack2, flayAttack2;

let moo;

let turnCounter = 0;


//main draw loop of the code
function draw() {
  checkMute();
  cursorSprite();
  background(backgroundColour);
  buttonSetup();
  displayMenu();
  displayGame();
  displayOptions();
}

//shows the main menu screen where you can go to the Game, Options, or Quit (Check Console XD)
function displayMenu() {
  if (gameState === "menu") {
    image(menuBackground, width/2, width/4);
    playButton.show();
    optionsButton.show();
    quitButton.show();
    if (playButton.isClicked()) {
      gameState = "game";
    }
    if (optionsButton.isClicked()) {
      gameState = "options";
    }
    if (quitButton.isClicked()) {
      console.log("You'll never escape me!");
      // window.close();
    }
  }
}

//shows the card game (where for now cards can be dragged around individually)
function displayGame() {
  if (gameState === "game") {
    image( forestBackgroundOne, width/2, height/2, width, height);
    spawnMonsters(3);
    cardBehavior();
    backPlayButton.show();
    if (backPlayButton.isClicked()) {
      gameState = "menu";
    }
  }
}

//shows the extra settings including the two themes and mute sound
function displayOptions() {
  if (gameState === "options") {
    image(optionsBackground, width/2, height/2, width, height);
    lightOptionButton.show();
    darkOptionButton.show();
    soundOptionButton.show();
    backOptionButton.show();

    if (darkOptionButton.isClicked()) {
      backgroundColour = "grey";
    }
    if (lightOptionButton.isClicked()) {
      backgroundColour = "white";
    }
    if (soundOptionButton.isClicked() && muteButtonReady) {
      soundMute = !soundMute;
      muteButtonReady = false;
    }
    if (backOptionButton.isClicked()) {
      gameState = "menu";
    }
  }
}

//the main function to call each card's behavior
function cardBehavior() {
  cardLocationOne.behavior();
  cardLocationTwo.behavior();
  cardLocationThree.behavior();
  cardLocationFour.behavior();
  cardLocationFive.behavior();
  cardLocationSix.behavior();
  cardLocationSeven.behavior();
}

//checks if the user ever resizes the window and changes the scaling
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//sets up the buttons used throughout the code in their according classes
function buttonSetup() {
  playButton = new Button(width/2, height/4, 300, 200, "Play", 40, "white", blueButtonClicked, blueButton);
  optionsButton = new Button(width/2, height/2, 250, 150, "Options", 30, "white", blueButtonClicked, blueButton);
  quitButton = new Button(width/2, height * (14/20), 200, 100, "Quit", 30, "white", blueButtonClicked, blueButton);
  darkOptionButton = new Button(width/2, height * (1/5), 250, 150, "Dark Theme", 30, "white",blueButtonClicked, blueButton);
  lightOptionButton = new Button(width/2, height * (2/5), 250, 150, "Light Theme", 30, "white", blueButtonClicked, blueButton);
  soundOptionButton = new Button(width/2, height * (3/5), 250, 150, "Toggle Sound", 30, "white", blueButtonClicked, blueButton);
  backOptionButton = new Button(width/2, height * (4/5), 250, 150, "Back", 30, "black", yellowSmallButtonClicked, yellowSmallButton);
  backPlayButton = new Button(width - 75, 75, 150, 150, "Back", 30, "black", yellowSmallButtonClicked, yellowSmallButton);
}

//sets up the cards used in the game as separate entities
function cardSetup() {
  cardLocationOne = new Card(width * (1/15), height * (5/6), 1);
  cardLocationTwo = new Card(width * (2/15), height * (5/6), 2);
  cardLocationThree = new Card(width * (3/15), height * (5/6), 3);
  cardLocationFour = new Card(width * (4/15), height * (5/6), 4);
  cardLocationFive = new Card(width * (5/15), height * (5/6), 5);
  cardLocationSix = new Card(width * (6/15), height * (5/6), 6);
  cardLocationSeven = new Card(width * (7/15), height * (5/6), 7);

  cardLocationOne.setupCardInfo();
  cardLocationTwo.setupCardInfo();
  cardLocationThree.setupCardInfo();
  cardLocationFour.setupCardInfo();
  cardLocationFive.setupCardInfo();
  cardLocationSix.setupCardInfo();
  cardLocationSeven.setupCardInfo();
}

function cardStatSetup() {
  heavyAttack = ["white", 2, "Heavy Attack", "Deal 10 damage.", "base", 10];
  lightAttack = ["white", 1, "Light Attack", "Deal 5 damage.", "base", 5];
  flayAttack = ["red", 3, "Flay", "Deal 8 damage to a random enemy.", "common", ceil(random(4, 8))];
}

function monsterSetup() {
  chomperMonster = new Monster("Chomper", 0, 25, 55, "Bite", "Consume", "Defend");
  blueBeanMonster = new Monster("Blue Bean", 1, 20, 50, "Slap", "Smack", "Defend");
  spikySlimeMonster = new Monster("Spiky Slime", 2, 30, 60, "Slap", "SpikeUp", "Defend");
  dizzyMonster = new Monster("Dizzy", 3, 20, 45, "Hypnosis", "Smack", "Defend");
  fireDemonMonster = new Monster("Fire Demon", 4, 25, 55, "Burn", "Smack", "Defend");

  chomperMonster.monsterImage = chomperMonsterImage;
  blueBeanMonster.monsterImage = blueBeanMonsterImage;
  spikySlimeMonster.monsterImage = spikySlimeMonsterImage;
  dizzyMonster.monsterImage = dizzyMonsterImage;
  fireDemonMonster.monsterImage = fireDemonMonsterImage;
}

//checks when the mouse is released
function mouseReleased() {
  cardInHand = false;
  draggingCardID = 0;
  muteButtonReady = true;
  //monstersSpawned = false;
  //console.log(mouseX + ", " + mouseY);
}

//checks if the game is or is not sound muted
function checkMute() {
  if (soundMute && muteButtonReady) {
    soundVolume = 0;
    backgroundMusic.pause();
  }
  else {
    soundVolume = 0.5;
    if (!backgroundMusic.isLooping()) {
      backgroundMusic.loop();
    }
  }
  backgroundMusic.setVolume(soundVolume);
  buttonClick.setVolume(soundVolume);
  cardPickUp.setVolume(soundVolume);
  cardDraw.setVolume(soundVolume);
  deckShuffle.setVolume(soundVolume);
}

//changes the suit of the card by using "1, 2, 3, 4, 5" while dragging the card
function keyPressed() {
  if (key === " ") {
    monstersSpawned = false;
    nextTurn();
  }
}

function cursorSprite() {
  if (cursorMode === "standard") {
    cursor(blueButton, 31, 31);
  }
}

function spawnMonsters(spawnNumber) {
  if (!monstersSpawned && spawnNumber >= 1 && spawnNumber <= 3) {
    monstersSpawned = true;

    //Monster One
    monsterType = round(random(1, 5));
    if (monsterType === 1) {
      monsterOne = chomperMonster;
    }
    else if (monsterType === 2) {
      monsterOne = blueBeanMonster;
    }
    else if (monsterType === 3) {
      monsterOne = spikySlimeMonster;
    }
    else if (monsterType === 4) {
      monsterOne = dizzyMonster;
    }
    else if (monsterType === 5) {
      monsterOne = fireDemonMonster;
    }

    //Monster Two
    monsterType = round(random(1, 3));
    if (monsterType === 1) {
      monsterTwo = chomperMonster;
    }
    else if (monsterType === 2) {
      monsterTwo = blueBeanMonster;
    }
    else if (monsterType === 3) {
      monsterTwo = spikySlimeMonster;
    }
    else if (monsterType === 4) {
      monsterTwo = dizzyMonster;
    }
    else if (monsterType === 5) {
      monsterTwo = fireDemonMonster;
    }

    //Monster Three
    monsterType = round(random(1, 3));
    if (monsterType === 1) {
      monsterThree = chomperMonster;
    }
    else if (monsterType === 2) {
      monsterThree = blueBeanMonster;
    }
    else if (monsterType === 3) {
      monsterThree = spikySlimeMonster;
    }
    else if (monsterType === 4) {
      monsterThree = dizzyMonster;
    }
    else if (monsterType === 5) {
      monsterThree = fireDemonMonster;
    }

    //console.log(monsterOne, monsterTwo, monsterThree);
  }

  monsterOne.xPosition = width * monsterLocationOne[0]; 
  monsterOne.yPosition = height * monsterLocationOne[1];
  image(monsterOne.monsterImage, monsterOne.xPosition, monsterOne.yPosition);

  monsterTwo.xPosition = width * monsterLocationTwo[0]; 
  monsterTwo.yPosition = height * monsterLocationTwo[1];
  image(monsterTwo.monsterImage, monsterTwo.xPosition, monsterTwo.yPosition);

  monsterThree.xPosition = width * monsterLocationThree[0]; 
  monsterThree.yPosition = height * monsterLocationThree[1];
  image(monsterThree.monsterImage, monsterThree.xPosition, monsterThree.yPosition);
}

function shuffleDeck() {
  cardDeckList = shuffle(cardDeckList);
  // console.log(cardDeckList);
}

function reshuffleDeck() {
  cardDeckList.push(cardDiscardDeckList);
  shuffle(cardDeckList, true);
  //console.log(cardDeckList);
}

//function that adds card from the deck into the player's hand
//Currently logs all of the array info into the console as evidence that each card attains and maintains its card values
function drawCard(drawNumber) {
  for (let i = 0; i < drawNumber; i++) {
    if (cardHandList.length === 7) {
      console.log("Your hand is full!");
    }
    else {
      cardHandList.push(cardDeckList[0]);
      cardDeckList.shift();
    }
  }
  let handListDisplay = [];
  for (let i = 0; i < cardHandList.length; i++) {
    handListDisplay.push(cardHandList[i][2]);
  }
  console.log("Hand List: " + handListDisplay);
  let deckListDisplay = [];
  for (let i = 0; i < cardDeckList.length; i++) {
    deckListDisplay.push(cardDeckList[i][2]);
  }
  console.log("Deck List: " + deckListDisplay);

  for (let i = 0; i < cardHandList.length; i++) {
    cardLocationList[i] = cardHandList[i];
  }

  for (let i = 0; i < cardHandList.length; i++) {
    cardLocationList[i].cardInfo = cardHandList[i];
    console.log(cardLocationList[i].cardInfo);
    console.log(cardHandList[i][0]);
  }

  assignHandValues();
}


function assignHandValues() {
  for (let i = 0; i < cardHandList.length; i++) {
    cardLocationList[i].cardType = cardLocationList[i].cardInfo[0];
    cardLocationList[i].cardCost = cardLocationList[i].cardInfo[1];
    cardLocationList[i].cardName = cardLocationList[i].cardInfo[2];
    cardLocationList[i].cardText = cardLocationList[i].cardInfo[3];
    cardLocationList[i].cardRarity = cardLocationList[i].cardInfo[4];
    cardLocationList[i].cardEffectOne = cardLocationList[i].cardInfo[5];
  }
  // console.log(cardLocationList[0].cardInfo[0]);
}
/* 
- upkeepStep
- drawStep
- playStep
- endStep
*/

function nextTurn() {
  turnCounter += 1;
  upkeepStep();
  drawStep();
  playStep();
  endStep();
}

function upkeepStep() {}

function drawStep() {
  if (turnCounter === 1) {
    shuffleDeck();
    drawCard(4);
  }
  else {
    drawCard(1);
  }
}

function playStep() {}

function endStep() {}

//defines the class used for the card's behavior
class Card {

  //sets up the initial values of the card's variables
  constructor(x, y, cardID) {
    this.height = cardHeight;
    this.width = cardWidth;
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.cardType; //cardColourList[floor(random(5))];
    this.scalar = cardScalar;
    this.cardID = cardID;
    // this.newCardType = this.cardType;
    // this.isAssigned = false;
  }

  //zooms in on the card when the mouse is hovering over it but not clicked
  zoomIn() {
    if (this.isSelected() && !mouseIsPressed) {
      this.scalar = 2;
    }
    else {
      this.scalar = 1;
    }
  }

  //displays the card in the correct suit, position, and size
  showCard() {
    if (this.cardType === "white"){
      image(whiteCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardType === "blue") {
      image(blueCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardType === "green") {
      image(greenCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardType === "red") {
      image(redCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardType === "yellow") {
      image(yellowCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else {
      fill(100);
      rect(this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
  }

  //moves the card when it is dragged with the cursor (avoids creating stacks of cards)
  moveCard() {
    if (this.isClicked() && !cardInHand) {
      cardInHand = true;
      draggingCardID = this.cardID;
    }
    if (cardInHand && draggingCardID === this.cardID) {
      this.x = mouseX;
      this.y = mouseY;
    }
    if (!cardInHand) {
      this.x = this.originalX;
      this.y = this.originalY;
    }
  }

  //funcion that returns if the object is moused over and not clicked
  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 && mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  //function that returns if the object is clicked
  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }

  setupCardInfo() {
    this.cardInfo = [];
  }

  showCardInfo() {
    text(this.cardCost, this.x - 2/3 * this.cardWidth, this.y - 4/5 * this.cardHeight);
    text(this.cardName);
    text(this.cardText);
  }

  //function that calls all of the card's behaviors
  behavior() {
    this.moveCard();
    this.zoomIn();
    this.showCard();
    this.showCardInfo();
  }
}

//defines the class used for the button's behavior
class Button {

  //sets up the initial values of the button's variables
  constructor(x, y, width, height, text, textSize, textColour, buttonTypeSelected, buttonTypeNotSelected) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.buttonText = text;
    this.buttonTextSize = textSize;
    this.selectedButton = buttonTypeSelected;
    this.notSelectedButton = buttonTypeNotSelected;
    this.textColour = textColour;
  }

  //displays the button with the correct colour, text, and size
  show() {

    if (this.isSelected()) {
      image(this.selectedButton, this.x, this.y, this.width, this.height);
    }
    else {
      image(this.notSelectedButton, this.x, this.y, this.width, this.height);
    }
    if (this.isClicked() && !playingSound) {
      playingSound = true;
      buttonClick.play();
      playingSound = false;
    }
    //console.log(this.width, this.height, this.x, this.y);
    fill(this.textColour);
    textSize(this.buttonTextSize);
    text(this.buttonText, this.x, this.y + this.buttonTextSize/3);
  }

  //funcion that returns if it is moused over and not clicked
  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 &&mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  //function that returns if it is clicked
  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }
}

class Monster {

  constructor(name, imageNumber, health, gold, attackOne, attackTwo, attackThree) {
    this.monsterName = name;
    this.monsterImage = monsterSpriteList[imageNumber];
    this.monsterHealth = health;
    this.monsterGold = gold;
    this.monsterAttackOne = attackOne;
    this.monsterAttackTwo = attackTwo;
    this.monsterAttackThree = attackThree;
    this.xPosition = 0;
    this.yPosition = 0;
  }
}