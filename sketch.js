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
  purpleCard = loadImage("assets/cards/purpleCard.png");
  cardBack = loadImage("assets/cards/cardBack.png");

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

  cardDeckList = [lightAttack, lightAttack, block, block, armorUp, armorUp, heavyAttack, heavyAttack, flay, shieldToss, shieldToss, phalanxStance, spiritStance];

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

let gameState = "menu";
let buttonTextSize;

let soundMute = true;
let soundVolume = 0.5;
let playingSound = false;
let ButtonReady = true;

let backgroundMusic, buttonClick, cardPickUp, cardDraw, deckShuffle;

let menuBackground, dungeonBackgroundOne, dungeonBackgroundTwo, forestBackgroundOne, optionsBackground;

let whiteCard, blueCard, greenCard, redCard, yellowCard, purpleCard, cardBack;
let cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix, cardSeven;
let cardInfoOne, cardInfoTwo, cardInfoThree, cardInfoFour, cardInfoFive, cardInfoSix, cardInfoSeven;
let cardLocationOne, cardLocationTwo, cardLocationThree, cardLocationFour, cardLocationFive, cardLocationSix, cardLocationSeven;
let cardLocationList = [cardLocationOne, cardLocationTwo, cardLocationThree, cardLocationFour, cardLocationFive, cardLocationSix, cardLocationSeven];
let cardList = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix, cardSeven];
let cardDisplayMap = new Map();
let deckLocation;

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
let monsterLocationOne, monsterLocationTwo, monsterLocationThree;
let monsterOne, monsterTwo, monsterThree;
let moop = ["yes"];
let meep = [moop];

let monsterLocationList = [monsterLocationOne, monsterLocationTwo, monsterLocationThree];
let monsterTypeList = [chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster];
let monsterList = [monsterOne, monsterTwo, monsterThree];

let monstersSpawned = false;
let monsterType;
let monsterImageX;
let monsterImageY;

let heavyAttack, lightAttack, flay;
let block, armorUp, shieldToss;
let phalanxStance, spiritStance;
let currentStance;
let cardDeckList = [];
let cardDiscardDeckList = [];
let cardHandList = [];

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

  if (monsterOneSelected) {
    //beep(1);
  }
}

function beep(output) {
  console.log(output);
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
      beep("You'll never escape me!");
      // window.close();
    }
  }
}

//shows the card game (where for now cards can be dragged around individually)
function displayGame() {
  if (gameState === "game") {
    image(forestBackgroundOne, width/2, height/2, width, height);
    spawnMonsters();
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

  displayDeck();
}

function displayDeck() {
  image(cardBack, deckLocation.x, deckLocation.y, cardWidth, cardHeight);
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
  cardLocationOne   = {x: width * (5/15), y:  height * (3/4)};
  cardLocationTwo   = {x: width * (6/15), y:  height * (3/4)};
  cardLocationThree = {x: width * (7/15), y:  height * (3/4)};
  cardLocationFour  = {x: width * (8/15), y:  height * (3/4)};
  cardLocationFive  = {x: width * (9/15), y:  height * (3/4)};
  cardLocationSix   = {x: width * (10/15), y: height * (3/4)};
  cardLocationSeven = {x: width * (11/15), y: height * (3/4)};

  cardOne   = new Card(  cardLocationOne.x,   cardLocationOne.y, 1);
  cardTwo   = new Card(  cardLocationTwo.x,   cardLocationTwo.y, 2);
  cardThree = new Card(cardLocationThree.x, cardLocationThree.y, 3);
  cardFour  = new Card( cardLocationFour.x,  cardLocationFour.y, 4);
  cardFive  = new Card( cardLocationFive.x,  cardLocationFive.y, 5);
  cardSix   = new Card(  cardLocationSix.x,   cardLocationSix.y, 6);
  cardSeven = new Card(cardLocationSeven.x, cardLocationSeven.y, 7);

  cardList = [cardOne, cardTwo, cardThree, cardFour, cardFive, cardSix, cardSeven];
  deckLocation = {x: width * (13/15), y: height * (3/4)};
}

function cardStatSetup() {
  // {color: "", cost: , name: "", text: "", rarity: "", effectOneType: "", effectOneValue: };
  lightAttack   = {color: "red", cost: 1, name: "Light Attack", text: "Deal 5 damage.", rarity: "base", effectOneType: "damage", effectOneValue: 5};
  heavyAttack   = {color: "red", cost: 2, name: "Heavy Attack", text: "Deal 10 damage.", rarity: "base", effectOneType: "damage", effectOneValue: 10};
  flay          = {color: "red", cost: 1, name: "Flay", text: "Deal 8 damage to a random enemy.", rarity: "common", effectOneType: "randomTargetDamage", effectOneValue: 8};
  block         = {color: "white", cost: 1, name: "Block", text: "Gain 5 armor.", rarity: "base", effectOneType: "armor", effectOneValue: 5};
  armorUp       = {color: "white", cost: 2, name: "Armor Up", text: "Gain 10 armor", rarity: "common", effectOneType: "armor", effectOneValue: 10};
  shieldToss    = {color: "white", cost: 2, name: "Shield Toss", text: "Deal 5 damage, gain 5 armor", rarity: "common", effectOneType: "damage", effectOneValue: 10, effectTwoType: "armor", effectTwoValue: 5};
  phalanxStance = {color: "white", cost: 3, name: "Phalanx Stance", text: "Every turn, you gain 5 armor.", rarity: "rare", effectOneType: "stance", effectOneValue: 0};
  spiritStance  = {color: "purple", cost: 3, name: "Spirit Stance", text: "Every Turn, you gain 1 mana.", rarity: "rare", effectOneType: "stance", effectOneValue: 0};

}

function monsterSetup() {
  monsterLocationOne   = {x: width * (1/3) - 50, y: height * (1/3)};
  monsterLocationTwo   = {x: width * (1/2), y: height * (9/32)};
  monsterLocationThree = {x: width * (2/3) + 50, y: height * (1/3)};

  monsterLocationList = [monsterLocationOne, monsterLocationTwo, monsterLocationThree];

  monsterOne   = new Monster();
  monsterTwo   = new Monster();
  monsterThree = new Monster();

  monsterList = [monsterOne, monsterTwo, monsterThree];

  monsterImageX = 200;
  monsterImageY = 215;

  for (let i = 0; i < 3; i++) {
    monsterList[i].xPosition = monsterLocationList[i].x;
    monsterList[i].yPosition = monsterLocationList[i].y;
  }

  //name, imageNumber, health, gold, attackOne, attackTwo, attackThree

  chomperMonster    = {name: "Chomper",     image: chomperMonsterImage,    health: 25, gold: 55, attackOne: "Bite",     attackTwo: "Consume", attackThree: "Defend"};
  blueBeanMonster   = {name: "Blue Bean",   image: blueBeanMonsterImage,   health: 20, gold: 50, attackOne: "Slap",     attackTwo: "Smack",   attackThree: "Defend"};
  spikySlimeMonster = {name: "Spiky Slime", image: spikySlimeMonsterImage, health: 30, gold: 60, attackOne: "Slap",     attackTwo: "SpikeUp", attackThree: "Defend"};
  dizzyMonster      = {name: "Dizzy",       image: dizzyMonsterImage,      health: 20, gold: 45, attackOne: "Hypnosis", attackTwo: "Smack",   attackThree: "Defend"};
  fireDemonMonster  = {name: "Fire Demon",  image: fireDemonMonsterImage,  health: 25, gold: 55, attackOne: "Burn",     attackTwo: "Smack",   attackThree: "Defend"};

  chomperMonster.monsterImage    = chomperMonsterImage;
  blueBeanMonster.monsterImage   = blueBeanMonsterImage;
  spikySlimeMonster.monsterImage = spikySlimeMonsterImage;
  dizzyMonster.monsterImage      = dizzyMonsterImage;
  fireDemonMonster.monsterImage  = fireDemonMonsterImage;

  monsterTypeList = [chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster];
}

//checks when the mouse is released
function mouseReleased() {
  if (turnPhase === "play" && monsterIsSelected() && cardInHand && cardList[draggingCardID-1].cardCost <= mana) {
    beep("Played:");
    beep("Card:" + draggingCardID);
    beep("Cost:" + cardList[draggingCardID-1].cardCost);
    playCard();
    discardCard();
  }
  beep(draggingCardID);
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

function spawnMonsters() {
  if (!monstersSpawned) {
    for (let i = 0; i < 3; i++) {
      let randomTypeNumber = floor(random(1, monsterTypeList.length));
      monsterList[i].xPosition = monsterLocationList[i].x;
      monsterList[i].yPosition = monsterLocationList[i].y;

      monsterList[i].monsterName = monsterTypeList[randomTypeNumber].name;
      monsterList[i].monsterImage = monsterTypeList[randomTypeNumber].image;
      monsterList[i].monsterHealth = monsterTypeList[randomTypeNumber].health;
      monsterList[i].monsterMaxHealth = monsterTypeList[randomTypeNumber].health;
      monsterList[i].monsterGold = monsterTypeList[randomTypeNumber].gold;
      monsterList[i].monsterAttackOne = monsterTypeList[randomTypeNumber].attackOne;
      monsterList[i].monsterAttackTwo = monsterTypeList[randomTypeNumber].attackTwo;
      monsterList[i].monsterAttackThree = monsterTypeList[randomTypeNumber].attackThree;
    }
  }

  monstersSpawned = true;
}

function monsterOneSelected() {
  if (mouseX >= monsterLocationOne.x - monsterImageX/2 && mouseX <= monsterLocationOne.x + monsterImageX/2 && mouseY >= monsterLocationOne.y - monsterImageY/2 && mouseY <= monsterLocationOne.y + monsterImageY/2) {
    return true;
  }
  else {
    return false;
  }
}

function monsterTwoSelected() {
  if (mouseX >= monsterLocationTwo.x - monsterImageX/2 && mouseX <= monsterLocationTwo.x + monsterImageX/2 && mouseY >= monsterLocationTwo.y - monsterImageY/2 && mouseY <= monsterLocationTwo.y + monsterImageY/2) {
    return true;
  }
  else {
    return false;
  }
}

function monsterThreeSelected() {
  if (mouseX >= monsterLocationThree.x - monsterImageX/2 && mouseX <= monsterLocationThree.x + monsterImageX/2 && mouseY >= monsterLocationThree.y - monsterImageY/2 && mouseY <= monsterLocationThree.y + monsterImageY/2) {
    return true;
  }
  else {
    return false;
  }
}

function monsterIsSelected() {
  if (monsterOneSelected() || monsterTwoSelected() || monsterThreeSelected()) {
    return true;
  }
}

function shuffleDeck() {
  cardDeckList = shuffle(cardDeckList);
}

function reshuffleDeck() {
  cardDeckList.push(cardDiscardDeckList);
  shuffle(cardDeckList, true);
  cardDiscardDeckList = [];
}

//function that adds card from the deck into the player's hand
//Currently logs all of the array info into the console as evidence that each card attains and maintains its card values
function drawCard(drawNumber) {
  for (let i = 0; i < drawNumber; i++) {
    if (cardHandList.length === 7) {
      beep("Your hand is full!");
    }
    else if (cardDeckList.length < 1) {
      for (let i = 0; i < cardDiscardDeckList.length; i++) {
        cardDeckList.push(cardDiscardDeckList[i]);
      }
      cardDiscardDeckList = [];
      cardHandList.push(cardDeckList[0]);
      cardDeckList.shift();
    }
    else {
      cardHandList.push(cardDeckList[0]);
      cardDeckList.shift();
    }
  }
  //Displays the cardHand's contents
  let handListDisplay = [];
  for (let i = 0; i < cardHandList.length; i++) {
    handListDisplay.push(" " + cardHandList[i].name);
  }
  beep("Hand List:" + handListDisplay);

  //Displays the cardDeck's contents
  let deckListDisplay = [];
  for (let i = 0; i < cardDeckList.length; i++) {
    deckListDisplay.push(" " + cardDeckList[i].name);
  }
  beep("Deck List: " + deckListDisplay);

  let discardDeckListDisplay = [];
  for (let i = 0; i < cardDiscardDeckList.length; i++) {
    discardDeckListDisplay.push(" " + cardDiscardDeckList[i].name);
  }
  beep("Discard List: " + discardDeckListDisplay);

  assignHandValues();
}

function playCard() {
  mana -= cardList[draggingCardID-1].cardCost;
  if (cardList[draggingCardID-1].cardEffectOneType === "damage") {
    if (monsterOneSelected()) {
      monsterOne.monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
    }
    else if (monsterTwoSelected()) {
      monsterTwo.monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
    }
    else if (monsterThreeSelected()) {
      monsterThree.monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
    }
  }
  else if (cardList[draggingCardID-1].cardEffectOneType === "armor") {
    armor += cardList[draggingCardID-1].cardEffectOneValue;
  }
  else if (cardList[draggingCardID-1].cardEffectOneType === "randomTargetDamage") {
    monsterList[floor(random(1, 4)-1)].monsterHealth -= cardList[draggingCardID-1].cardEffectOneValue;
  }
  else if (cardList[draggingCardID-1].cardEffectOneType === "stance") {
    currentStance = cardList[draggingCardID-1].cardName;
    beep(currentStance);
    beep(cardList[draggingCardID-1].name);
  }

  if (cardList[draggingCardID-1].cardEffectTwoType === "damage") {
    if (monsterOneSelected()) {
      monsterOne.monsterHealth -= cardList[draggingCardID-1].cardEffectTwoValue;
    }
    else if (monsterTwoSelected()) {
      monsterTwo.monsterHealth -= cardList[draggingCardID-1].cardEffectTwoValue;
    }
    else if (monsterThreeSelected()) {
      monsterThree.monsterHealth -= cardList[draggingCardID-1].cardEffectTwoValue;
    }
  }
  else if (cardList[draggingCardID-1].cardEffectTwoType === "armor") {
    armor += cardList[draggingCardID-1].cardEffectTwoValue;
  }
  else if (cardList[draggingCardID-1].cardEffectTwoType === "randomTargetDamage") {
    monsterList[floor(random(1, 4)-1)].monsterHealth -= cardList[draggingCardID-1].cardEffectTwoValue;
  }
  else if (cardList[draggingCardID-1].cardEffectTwoType === "stance") {
    currentStance = cardList[draggingCardID-1].name;
  }
}

function discardCard() {
  cardDiscardDeckList.push(cardHandList[draggingCardID-1]);
  cardList[cardHandList.length-1].cardInfo = {}; 
  cardHandList.splice(draggingCardID-1, 1);
  assignHandValues();

  cardList[cardHandList.length].cardColor          = "";
  cardList[cardHandList.length].cardCost           = "";
  cardList[cardHandList.length].cardName           = "";
  cardList[cardHandList.length].cardText           = "";
  cardList[cardHandList.length].cardRarity         = "";
  cardList[cardHandList.length].cardEffectOneType  = "";
  cardList[cardHandList.length].cardEffectOneValue = "";
}

function assignHandValues() {
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardInfo = cardHandList[i];
  }
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardInfo = cardHandList[i];
  }
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardColor          = cardList[i].cardInfo.color;
    cardList[i].cardCost           = cardList[i].cardInfo.cost;
    cardList[i].cardName           = cardList[i].cardInfo.name;
    cardList[i].cardText           = cardList[i].cardInfo.text;
    cardList[i].cardRarity         = cardList[i].cardInfo.rarity;
    cardList[i].cardEffectOneType  = cardList[i].cardInfo.effectOneType;
    cardList[i].cardEffectOneValue = cardList[i].cardInfo.effectOneValue;
  }
}

function stanceAction(stance) {
  if (stance === "Phalanx Stance") {
    armor += 5;
  }
  else if (stance === "Spirit Stance") {
    mana += 1;
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
  }
  else if (turnPhase === "end") {
    endStep();
    turnPhase = "enemyTurn";
  }
}

function upkeepStep() {
  mana = maxMana;
  armor = 0;
  turnCounter += 1;
  stanceAction(currentStance);
}

function drawStep() {
  if (turnCounter === 1) {
    shuffleDeck();
    drawCard(4);
  }
  else {
    drawCard(4);
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
  for (let i = 0; i < cardHandList.length; i++) {
    cardDiscardDeckList.push(cardHandList[i]);
  }
  cardHandList = [];
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
    if (this.cardColor === "white"){
      image(whiteCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardColor === "blue") {
      image(blueCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardColor === "green") {
      image(greenCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardColor === "red") {
      image(redCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardColor === "yellow") {
      image(yellowCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardColor === "purple") {
      image(purpleCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
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
    text(this.cardName, this.x, this.y - 1/5 * this.height * this.scalar, 100 * this.scalar, 40 * this.scalar);
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

  constructor() {
    this.xPosition = 0;
    this.yPosition = 0;
  }

  displayHealth() {
    if (this.monsterHealth > 0) {
      rectMode(CORNER);
      fill("black");
      rect(this.xPosition - monsterImageX/2 + 20, this.yPosition + monsterImageY/2 + 20, monsterImageX - 40, 40);
      fill("red");
      rect(this.xPosition - monsterImageX/2 + 20, this.yPosition + monsterImageY/2 + 20, (monsterImageX - 40)/this.monsterMaxHealth * this.monsterHealth, 40);
      fill("white");
      textSize(40);
      text(this.monsterHealth + "/" + this.monsterMaxHealth, this.xPosition, this.yPosition + 162);
    }
  }

  displayMonster() {
    if (this.monsterHealth > 0) { 
      image(this.monsterImage, this.xPosition, this.yPosition, monsterImageX, monsterImageY);
    }
  }

  displayIntent() {
    
  }

  behavior() {
    this.displayHealth();
    this.displayMonster();
  }
}