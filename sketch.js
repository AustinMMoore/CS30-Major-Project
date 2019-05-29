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
  targetCursor = loadImage("assets/cursors/target.png");

  manaStar = loadImage("assets/symbols/manaStar.png");
  healthHeart = loadImage("assets/symbols/healthHeart.png");
  armorShield = loadImage("assets/symbols/armorShield.png");
}

//sets up the canvas, center modes (rect, text, image), playmodes for sounds, and runs the setup for the cards
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  noCursor();

  backgroundMusic.playMode("sustain");
  buttonClick.playMode("restart");
  cardPickUp.playMode("restart");
  cardDraw.playMode("restart");
  deckShuffle.playMode("restart");
  if (!soundMute) {
    backgroundMusic.loop();
  }

  cardStatSetup();
  cardSetup();
  monsterSetup();

  cardDeckList = [lightAttack, lightAttack, block, block, armorUp, armorUp, heavyAttack, heavyAttack, flay];

  cardList = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix, cardSeven];

  cursorSpriteList = [standardCursor, targetCursor];

  manaStarPosition = [width * 1/15, height * 13/15];
  armorShieldPosition = [width * 2/15, height * 13/15];
}

//setup all the variables
let cardWidth = 150;
let cardHeight = 240;
let cardScalar = 1;
let cardInHand = false;
let draggingCardID;
let newCardType;

let gameState = "menu";
let buttonTextSize;

let soundMute = true;
let soundVolume = 0.5;
let playingSound = false;
let ButtonReady = true;

let backgroundMusic, buttonClick, cardPickUp, cardDraw, deckShuffle;

let menuBackground, dungeonBackgroundOne, dungeonBackgroundTwo, forestBackgroundOne, optionsBackground;

let whiteCard, blueCard, greenCard, redCard, yellowCard;
let cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix, cardSeven;
let cardInfoOne, cardInfoTwo, cardInfoThree, cardInfoFour, cardInfoFive, cardInfoSix, cardInfoSeven;
let cardLocationOne, cardLocationTwo, cardLocationThree, cardLocationFour, cardLocationFive, cardLocationSix, cardLocationSeven;
let cardDisplayMap = new Map();

let playButton, optionsButton, quitButton, darkOptionButton, lightOptionButton, soundOptionButton, backOptionButton, backPlayButton, endTurnButton;
let blueButton, blueButtonClicked, greenButton, greenButtonClicked, yellowButton, yellowButtonClicked, yellowSmallButton, yellowSmallButtonClicked;

let standardCursor, targetCursor;
let cursorSpriteList;
let cursorMode = "standard";

let manaStar, healthHeart, armorShield;
let manaStarPosition, armorShieldPosition;
let manaStarSize = 75;
let healthHeartSize = 75;
let armorShieldSize = 75;

let mana = 0;
let maxMana = 3;
let armor = 0;

let chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster;
let chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage, dizzyMonsterImage, fireDemonMonsterImage;
let monsterSpriteList = [chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage, dizzyMonsterImage, fireDemonMonsterImage];
let monsterOne, monsterTwo, monsterThree;
let monsterList = [monsterOne, monsterTwo, monsterThree];
let monsterTypeList = [chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster];

let monsterLocationOne, monsterLocationTwo, monsterLocationThree;
let monsterLocationList = [monsterLocationOne, monsterLocationTwo, monsterLocationThree];
let monstersSpawned = false;
let monsterType;
let monsterImageX = 200;
let monsterImageY = 215;

let heavyAttack, lightAttack, flay;
let block, armorUp;
let cardDeckList = [];
let newDeckList = cardDeckList;
let cardDiscardDeckList = [];
let cardHandList = [];
let cardList;

let lightAttack2, heavyAttack2, flayAttack2;

let turnCounter = 0;
let turnPhase = "upkeep";


//main draw loop of the code
function draw() {
  checkMute();
  buttonSetup();
  displayMenu();
  displayGame();
  displayOptions();
  cursorUpdate();
}

//shows the main menu screen where you can go to the Game, Options, or Quit (Check Console XD)
function displayMenu() {
  if (gameState === "menu") {
    image(menuBackground, width/2, height/2, width, height);
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
    image(forestBackgroundOne, width/2, height/2, width, height);
    spawnMonsters(3);
    if (turnPhase !== "enemyTurn") {
      playerTurn();
    }
    else if (turnPhase === "enemyTurn") {
      enemyTurn();
    }
    monsterBehavior();
    cardBehavior();
    backPlayButton.show();
    endTurnButton.show();
    image(manaStar, manaStarPosition[0], manaStarPosition[1], manaStarSize, manaStarSize);
    text(mana, manaStarPosition[0], manaStarPosition[1] + 12);
    fill(0);
    image(armorShield, armorShieldPosition[0], armorShieldPosition[1], armorShieldSize - 10, armorShieldSize);
    text(armor, armorShieldPosition[0], armorShieldPosition[1] + 5);
    if (backPlayButton.isClicked() && ButtonReady) {
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

    if (soundOptionButton.isClicked() && ButtonReady) {
      soundMute = !soundMute;
      ButtonReady = false;
    }
    if (backOptionButton.isClicked() && ButtonReady) {
      gameState = "menu";
    }
  }
}

//the main function to call each card's behavior
function cardBehavior() {
  cardOne.behavior();
  cardTwo.behavior();
  cardThree.behavior();
  cardFour.behavior();
  cardFive.behavior();
  cardSix.behavior();
  cardSeven.behavior();
}

function monsterBehavior() {
  monsterOne.behavior();
  monsterTwo.behavior();
  monsterThree.behavior();
}

//checks if the user ever resizes the window and changes the scaling
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//sets up the buttons used throughout the code in their according classes
function buttonSetup() {
  playButton        = new Button(width/2, height/4, 300, 200, "Play", 40, "white", blueButtonClicked, blueButton);
  optionsButton     = new Button(width/2, height/2, 250, 150, "Options", 30, "white", blueButtonClicked, blueButton);
  quitButton        = new Button(width/2, height * (14/20), 200, 100, "Quit", 30, "white", blueButtonClicked, blueButton);
  darkOptionButton  = new Button(width/2, height * (1/5), 250, 150, "Dark Theme", 30, "white",blueButtonClicked, blueButton);
  lightOptionButton = new Button(width/2, height * (2/5), 250, 150, "Light Theme", 30, "white", blueButtonClicked, blueButton);
  soundOptionButton = new Button(width/2, height * (3/5), 250, 150, "Toggle Sound", 30, "white", blueButtonClicked, blueButton);
  backOptionButton  = new Button(width - 75, 75, 150, 150, "Back", 30, "black", yellowSmallButtonClicked, yellowSmallButton);
  backPlayButton    = new Button(75, 75, 150, 150, "Back", 30, "black", yellowSmallButtonClicked, yellowSmallButton);
  endTurnButton     = new Button(width - 100, width * (1/4), 200, 100, "End Turn", 25, "white", yellowButtonClicked, yellowButton);
}

//sets up the cards used in the game as separate entities
function cardSetup() {
  cardLocationOne   = [width * (5/15), height * (3/4)];
  cardLocationTwo   = [width * (6/15), height * (3/4)];
  cardLocationThree = [width * (7/15), height * (3/4)];
  cardLocationFour  = [width * (8/15), height * (3/4)];
  cardLocationFive  = [width * (9/15), height * (3/4)];
  cardLocationSix   = [width * (10/15), height * (3/4)];
  cardLocationSeven = [width * (11/15), height * (3/4)];

  cardOne   = new Card(  cardLocationOne[0],   cardLocationOne[1], 1);
  cardTwo   = new Card(  cardLocationTwo[0],   cardLocationTwo[1], 2);
  cardThree = new Card(cardLocationThree[0], cardLocationThree[1], 3);
  cardFour  = new Card( cardLocationFour[0],  cardLocationFour[1], 4);
  cardFive  = new Card( cardLocationFive[0],  cardLocationFive[1], 5);
  cardSix   = new Card(  cardLocationSix[0],   cardLocationSix[1], 6);
  cardSeven = new Card(cardLocationSeven[0], cardLocationSeven[1], 7);

  cardOne.setupCardInfo();
  cardTwo.setupCardInfo();
  cardThree.setupCardInfo();
  cardFour.setupCardInfo();
  cardFive.setupCardInfo();
  cardSix.setupCardInfo();
  cardSeven.setupCardInfo();
}

function cardStatSetup() {
  lightAttack = ["white", 1, "Light Attack", "Deal 5 damage.", "base", "damage", 5];
  heavyAttack = ["white", 2, "Heavy Attack", "Deal 10 damage.", "base", "damage", 10];
  flay        = ["red", 3, "Flay", "Deal 8 damage to a random enemy.", "common", "damage", 15];
  block       = ["blue", 1, "Block", "Gain 5 armor.", "base", "armor", 5];
  armorUp     = ["blue", 2, "Armor Up", "Gain 10 armor", "common", "armor", 10];
}

function monsterSetup() {
  monsterLocationOne   = [width * (1/3) - 50, height * (1/3)];
  monsterLocationTwo   = [width * (1/2), height * (1/6)];
  monsterLocationThree = [width * (2/3) + 50, height * (1/3)];

  chomperMonster    = new Monster("Chomper", 0, 25, 55, "Bite", "Consume", "Defend");
  blueBeanMonster   = new Monster("Blue Bean", 1, 20, 50, "Slap", "Smack", "Defend");
  spikySlimeMonster = new Monster("Spiky Slime", 2, 30, 60, "Slap", "SpikeUp", "Defend");
  dizzyMonster      = new Monster("Dizzy", 3, 20, 45, "Hypnosis", "Smack", "Defend");
  fireDemonMonster  = new Monster("Fire Demon", 4, 25, 55, "Burn", "Smack", "Defend");

  chomperMonster.monsterImage    = chomperMonsterImage;
  blueBeanMonster.monsterImage   = blueBeanMonsterImage;
  spikySlimeMonster.monsterImage = spikySlimeMonsterImage;
  dizzyMonster.monsterImage      = dizzyMonsterImage;
  fireDemonMonster.monsterImage  = fireDemonMonsterImage;
}

//checks when the mouse is released
function mouseReleased() {
  console.log(cardInHand);
  if (turnPhase === "play" && monsterIsSelected() && cardInHand && cardList[draggingCardID-1].cardCost <= mana) {
    console.log("Played:", "Card:" + draggingCardID, "Cost:" + cardList[draggingCardID-1].cardCost);
    cardList[draggingCardID-1].playCard();
  }
  draggingCardID = 0;
  cardInHand = false;
  ButtonReady = true;
}

//checks if the game is or is not sound muted
function checkMute() {
  if (soundMute && ButtonReady) {
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

function keyPressed() {
  if (key === " ") {
    monstersSpawned = false;
    //nextTurn();
  }
  if (key === "s" || key === "S") {
    monstersSpawned = false;
  }
}

function cursorUpdate() {
  imageMode(CORNER);
  if (cardInHand) {
    cursorMode = "cardInHand";
  }
  if (cardInHand && (monsterOneSelected() || monsterTwoSelected() || monsterThreeSelected())) {
    cursorMode = "target";
  }
  else {
    cursorMode = "standard";
  }

  if (cursorMode === "standard") {
    image(standardCursor, mouseX, mouseY, 30, 50);
  }
  else if (cursorMode === "target") {
    imageMode(CENTER);
    image(targetCursor, mouseX, mouseY, 50, 50);
  }
  imageMode(CENTER);
}

function spawnMonsters(spawnNumber) {
  for (let i = 0; i < 3; i++) {
    monsterList.spawnMonster(monsterTypeList[floor(random(1, monsterTypeList.length + 1))], monsterLocationList[i][0], monsterLocationList[i][1]);
  }

  monsterOne.xPosition = monsterLocationOne[0]; 
  monsterOne.yPosition = monsterLocationOne[1];
  image(monsterOne.monsterImage, monsterOne.xPosition, monsterOne.yPosition, monsterImageX, monsterImageY);

  monsterTwo.xPosition = monsterLocationTwo[0]; 
  monsterTwo.yPosition = monsterLocationTwo[1];
  image(monsterTwo.monsterImage, monsterTwo.xPosition, monsterTwo.yPosition, monsterImageX, monsterImageY);

  monsterThree.xPosition = monsterLocationThree[0]; 
  monsterThree.yPosition = monsterLocationThree[1];
  image(monsterThree.monsterImage, monsterThree.xPosition, monsterThree.yPosition, monsterImageX, monsterImageY);
}

function monsterOneSelected() {
  if (mouseX >= monsterLocationOne[0] - monsterImageX/2 && mouseX <= monsterLocationOne[0] + monsterImageX/2 && mouseY >= monsterLocationOne[1] - monsterImageY/2 && mouseY <= monsterLocationOne[1] + monsterImageY/2) {
    return true;
  }
}

function monsterTwoSelected() {
  if (mouseX >= monsterLocationTwo[0] - monsterImageX/2 && mouseX <= monsterLocationTwo[0] + monsterImageX/2 && mouseY >= monsterLocationTwo[1] - monsterImageY/2 && mouseY <= monsterLocationTwo[1] + monsterImageY/2) {
    return true;
  }
}

function monsterThreeSelected() {
  if (mouseX >= monsterLocationThree[0] - monsterImageX/2 && mouseX <= monsterLocationThree[0] + monsterImageX/2 && mouseY >= monsterLocationThree[1] - monsterImageY/2 && mouseY <= monsterLocationThree[1] + monsterImageY/2) {
    return true;
  }
}

function monsterIsSelected() {
  if (monsterOneSelected() || monsterTwoSelected() || monsterThreeSelected()) {
    return true;
  }
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

  //Displays the cardHand's contents
  let handListDisplay = [];
  for (let i = 0; i < cardHandList.length; i++) {
    handListDisplay.push(cardHandList[i][2]);
  }
  console.log("Hand List: " + handListDisplay);

  //Displays the cardDeck's contents
  let deckListDisplay = [];
  for (let i = 0; i < cardDeckList.length; i++) {
    deckListDisplay.push(cardDeckList[i][2]);
  }
  console.log("Deck List: " + deckListDisplay);

  
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardInfo = cardHandList[i];
  }

  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardInfo = cardHandList[i];
    // console.log(cardLocationList[i].cardInfo);
    // console.log(cardHandList[i][0]);
  }

  assignHandValues();
}


function assignHandValues() {
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardType           = cardList[i].cardInfo[0];
    cardList[i].cardCost           = cardList[i].cardInfo[1];
    cardList[i].cardName           = cardList[i].cardInfo[2];
    cardList[i].cardText           = cardList[i].cardInfo[3];
    cardList[i].cardRarity         = cardList[i].cardInfo[4];
    cardList[i].cardEffectOneType  = cardList[i].cardInfo[5];
    cardList[i].cardEffectOneValue = cardList[i].cardInfo[6];
  }
}

/* 
- upkeepStep
- drawStep
- playStep
- endStep
*/

function playerTurn() {
  if (turnPhase === "upkeep") {
    upkeepStep();
    turnPhase = "draw";
  }
  else if (turnPhase === "draw") {
    drawStep();
    turnPhase = "play";
  }
  else if (turnPhase === "play") {
    playStep();
    // rectMode(CORNER);
    // fill("red");
    // rect(monsterLocationOne[0] - monsterImageX/2 + 20, monsterLocationOne[1] + monsterImageY/2 + 20, monsterImageX/monsterOne.monsterMaxHealth * monsterOne.monsterHealth - 40, 20);
  }
  else if (turnPhase === "end") {
    endStep();
    turnPhase = "enemyTurn";
  }
  //console.log(turnPhase);
}

function upkeepStep() {
  mana = maxMana;
  armor = 0;
  turnCounter += 1;
}

function drawStep() {
  if (turnCounter === 1) {
    shuffleDeck();
    drawCard(4);
  }
  else {
    drawCard(1);
  }
}

function playStep() {
  if (endTurnButton.isClicked() && ButtonReady) {
    ButtonReady = false;
    //monstersSpawned = false;
    turnPhase = "end";
  }
}

function endStep() {
  
}

function enemyTurn() {
  turnPhase = "upkeep";
}
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
    this.scalar = cardScalar;
    this.cardID = cardID;
    // this.newCardType = this.cardType;
    // this.isAssigned = false;
  }

  //zooms in on the card when the mouse is hovering over it but not clicked
  zoomIn() {
    if (this.isSelected() && !mouseIsPressed) {
      this.scalar = 1.5;
    }
    else {
      this.scalar = 1;
    }
  }

  //displays the card in the correct suit, position, and size
  showCard() {
    //console.log(this.cardType);
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
      // fill(100);
      // rect(this.x, this.y, this.width * this.scalar, this.height * this.scalar);
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
    if (cardInHand) {
      ButtonReady = false;
    }
  }

  playCard() {
    mana -= cardList[draggingCardID-1].cardCost;
    if (cardList[draggingCardID-1].cardEffectOneType === "damage") {
      if (monsterOneSelected) {
        monsterOne.monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
        console.log(monsterOne.monsterHealth);
      }
      else if (monsterTwoSelected) {
        monsterTwo.monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
        console.log(monsterTwo.monsterHealth);
      }
      else if (monsterThreeSelected) {
        monsterThree.monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
        console.log(monsterThree.monsterHealth);
      }
    }
    if (cardList[draggingCardID-1].cardEffectOneType === "armor") {
      armor += cardList[draggingCardID-1].cardEffectOneValue;
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
    this.cardInfo = ["empty"];
  }

  showCardInfo() {
    rectMode(CENTER);
    fill(0);
    textSize(30 * this.scalar);
    text(this.cardCost, this.x - 3/10 * this.width * this.scalar, this.y - 53/150 * this.height * this.scalar);
    textSize(18 * this.scalar);
    text(this.cardName, this.x, this.y - 1/5 * this.height * this.scalar);
    textAlign(LEFT);
    text(this.cardText, this.x, this.y + 1/5 * this.height * this.scalar, this.width/2 * this.scalar + 50 * this.scalar, this.height/2 * this.scalar - 35 * this.scalar);
    textAlign(CENTER);
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

  constructor(name, imageNumber, health, gold, attackOne, attackTwo, attackThree, monsterID) {
    this.monsterName = name;
    this.monsterImage = monsterSpriteList[imageNumber];
    this.monsterHealth = health;
    this.monsterMaxHealth = health;
    this.monsterGold = gold;
    this.monsterAttackOne = attackOne;
    this.monsterAttackTwo = attackTwo;
    this.monsterAttackThree = attackThree;
    this.monsterID = monsterID;
    this.xPosition = 0;
    this.yPosition = 0;
    this.isSpawned = false;
  }

  displayHealth() {
    if (this.isSpawned) {
      rectMode(CORNER);
      fill("black");
      rect(this.xPosition - monsterImageX/2 + 20, this.yPosition + monsterImageY/2 + 20, monsterImageX - 40, 40);
      fill("red");
      rect(this.xPosition - monsterImageX/2 + 20, this.yPosition + monsterImageY/2 + 20, (monsterImageX - 40)/this.monsterMaxHealth * this.monsterHealth, 40);
      //image(healthHeart, this.xPosition, this.yPosition + 150, 75, 75);
    }
  }

  spawnMonster(monsterType, x, y) {
    if (!monstersSpawned) {
      monstersSpawned = true;
      
      this.xPosition = x;
      this.yPosition = y;
    }
  }

  behavior() {
    this.displayHealth();
  }
}