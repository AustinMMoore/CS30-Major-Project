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
  buttonClick     = loadSound("assets/sounds/buttonClick.mp3");
  cardPickUp      = loadSound("assets/sounds/cardPickUp.mp3");
  cardDraw        = loadSound("assets/sounds/cardDraw.mp3");
  deckShuffle     = loadSound("assets/sounds/deckShuffle.mp3");

  blueButton               = loadImage("assets/buttons/blueNotClicked.png");
  blueButtonClicked        = loadImage("assets/buttons/blueClicked.png");
  greenButton              = loadImage("assets/buttons/greenNotClicked.png");
  greenButtonClicked       = loadImage("assets/buttons/greenClicked.png");
  yellowButton             = loadImage("assets/buttons/yellowNotClicked.png");
  yellowButtonClicked      = loadImage("assets/buttons/yellowClicked.png");
  yellowSmallButton        = loadImage("assets/buttons/yellowSmallNotClicked.png");
  yellowSmallButtonClicked = loadImage("assets/buttons/yellowSmallClicked.png");

  whiteCard  = loadImage("assets/cards/whitecard.png");
  blueCard   = loadImage("assets/cards/bluecard.png");
  greenCard  = loadImage("assets/cards/greencard.png");
  redCard    = loadImage("assets/cards/redcard.png");
  yellowCard = loadImage("assets/cards/yellowcard.png");
  purpleCard = loadImage("assets/cards/purpleCard.png");
  cardBack   = loadImage("assets/cards/cardBack.png");

  menuBackground       = loadImage("assets/backgrounds/menuBackground.jpg");
  dungeonBackgroundTwo = loadImage("assets/backgrounds/dungeonOne.jpg");
  dungeonBackgroundOne = loadImage("assets/backgrounds/dungeonTwo.png");
  forestBackgroundOne  = loadImage("assets/backgrounds/forestOne.jpg");
  optionsBackground    = loadImage("assets/backgrounds/optionsBackground.png");

  chomperMonsterImage    = loadImage("assets/monsters/chomper.png");
  blueBeanMonsterImage   = loadImage("assets/monsters/blueBean.png");
  spikySlimeMonsterImage = loadImage("assets/monsters/spikySlime.png");
  dizzyMonsterImage      = loadImage("assets/monsters/dizzy.png");
  fireDemonMonsterImage  = loadImage("assets/monsters/fireDemon.png");

  standardCursor = loadImage("assets/cursors/standard.png");
  targetCursor   = loadImage("assets/cursors/target.png");

  manaStar    = loadImage("assets/symbols/manaStar.png");
  healthHeart = loadImage("assets/symbols/healthHeart.png");
  armorShield = loadImage("assets/symbols/armorShield.png");
  goldBag     = loadImage("assets/symbols/goldBag.png");
  playerBurn  = loadImage("assets/symbols/playerBurn.png");

  enemyArmor   = loadImage("assets/symbols/enemyArmor.png");
  enemyAttack  = loadImage("assets/symbols/enemyAttack.png");
  enemyBuff    = loadImage("assets/symbols/enemyBuff.png");
  enemyDebuff  = loadImage("assets/symbols/enemyDebuff.png");
  enemyHeal    = loadImage("assets/symbols/enemyHeal.png");

  instructionsText = loadStrings("assets/text/instructions.txt");

  instructionsSheet = loadImage("assets/symbols/instructionsSheet.png");
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
  backgroundMusic.loop();

  cardStatSetup();
  cardSetup();
  monsterSetup();

  cardDeckList = [lightAttack, lightAttack, block, block, armorUp, armorUp, heavyAttack, heavyAttack, flay, shieldToss, shieldToss, phalanxStance, spiritStance, berserkerStance, manaBurst, fanOfBlades];

  cursorSpriteList = [standardCursor, targetCursor];

  manaStarPosition    = {x: width * 1/15 - 30, y: height * 13/15};
  goldBagPosition     = {x: width * 2/15 - 30, y: height * 13/15};
  armorShieldPosition = {x: width * 3/15 - 30, y: height * 13/15};
  healthHeartPosition = {x: width * 4/15 - 30, y: height * 13/15};
}

//setup all the variables
let cardWidth = 150;
let cardHeight = 240;
let cardScalar = 1;
let cardIsInHand = false;
let cardInHand;
let draggingCardID;

let gameState = "menu";
let buttonTextSize;

let soundMute = false;
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

let playButton, optionsButton, quitButton, instructionsButton, soundOptionButton, backOptionButton, backPlayButton, endTurnButton, continueButtonNo, continueButtonYes;
let blueButton, blueButtonClicked, greenButton, greenButtonClicked, yellowButton, yellowButtonClicked, yellowSmallButton, yellowSmallButtonClicked;

let standardCursor, targetCursor;
let cursorSpriteList;
let cursorMode = "standard";

let manaStar, goldBag, armorShield, healthHeart, playerBurn;
let enemyArmor, enemyAttack, enemyBuff, enemyDebuff, enemyHeal;
let enemyIntentIconSize = 100;
let manaStarPosition, goldBagPosition, armorShieldPosition, healthHeartPosition;
let manaStarSize    = 100;
let goldBagSize     = 100;
let armorShieldSize = 100;
let healthHeartSize = 100;
let playerBurnSize  = 100;

let mana = 0;
let maxMana = 3;
let manaDebuff = 0;
let gold = 0;
let armor = 0;
let health = 100;
let burn = 0;

let intentArmor, intentHeal, intentDamage;

let chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster;
let chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage, dizzyMonsterImage, fireDemonMonsterImage;
let monsterSpriteList = [chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage, dizzyMonsterImage, fireDemonMonsterImage];
let monsterLocationOne, monsterLocationTwo, monsterLocationThree;
let monsterOne, monsterTwo, monsterThree;

let monsterLocationList = [monsterLocationOne, monsterLocationTwo, monsterLocationThree];
let monsterTypeList = [chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster];
let monsterList = [monsterOne, monsterTwo, monsterThree];

let monstersSpawned = false;
let monsterType;
let monsterImageX;
let monsterImageY;

let heavyAttack, lightAttack, flay, fanOfBlades;
let block, armorUp, shieldToss;
let manaBurst;
let phalanxStance, spiritStance, berserkerStance;
let currentStanceTarget, currentStanceEffect, currentStanceValue;
let cardDeckList = [];
let cardDiscardDeckList = [];
let cardHandList = [];

let turnCounter = 0;
let turnPhase = "upkeep";

let instructionsText;
let instructionsSheet;

//main draw loop of the code
function draw() {
  checkMute();
  buttonSetup();
  displayMenu();
  displayGame();
  displayOptions();
  displayInstructions();
  displayGameOver();
  cursorUpdate();
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
    if (playButton.isClicked() && ButtonReady) {
      gameState = "game";
    }
    if (optionsButton.isClicked() && ButtonReady) {
      gameState = "options";
    }
    if (quitButton.isClicked() && ButtonReady) {
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
    displayPlayerStats();
    backPlayButton.show();
    endTurnButton.show();
    if (backPlayButton.isClicked() && ButtonReady) {
      gameState = "menu";
    }
  }
}

//shows the extra settings including the two themes and mute sound
function displayOptions() {
  if (gameState === "options") {
    image(optionsBackground, width/2, height/2, width, height);
    instructionsButton.show();
    soundOptionButton.show();
    backOptionButton.show();
    if (instructionsButton.isClicked() && ButtonReady) {
      gameState = "instructions";
    }
    if (soundOptionButton.isClicked() && ButtonReady) {
      soundMute = !soundMute;
      ButtonReady = false;
    }
    if (backOptionButton.isClicked() && ButtonReady) {
      gameState = "menu";
    }
  }
}

function displayInstructions() {
  if (gameState === "instructions") {
    textAlign(LEFT);
    image(optionsBackground, width/2, height/2, width, height);
    backPlayButton.show();
    // set colour transparent gray
    fill(128,128,128,120);
    // make rectangle at 100,300 of size 100,100
    rect(100, 300, 100, 100);
    fill("turquoise");
    text(instructionsText[0], width/2, height/2 - 200, width - 100, 200);
    text(instructionsText[1], width/2, height/2 - 100, width - 100, 200);
    text(instructionsText[2], width/5, height/2, width/2 - 110, 200);
    image(instructionsSheet, width/2 + 275, height/2 + 200, 800, 640);
    if (backPlayButton.isClicked() && ButtonReady) {
      gameState = "options";
    }
  }
  //textAlign(CENTER);
}

function displayGameOver() {
  if (gameState === "gameOver") {
    image(dungeonBackgroundOne, width/2, height/2, width, height);
    fill("white");
    text("You were defeated, but there are always more monsters to defeat. Continue fighting?", width/2, height/2);
    continueButtonYes.show();
    continueButtonNo.show();
    if (continueButtonYes.isClicked() && ButtonReady) {
      gameState = "game";
      resetGame();
    }
    if (continueButtonNo.isClicked() && ButtonReady) {
      gameState = "menu";
    }
  }
}

function resetGame() {
  monstersSpawned = false;
  health = 100;
  burn = 0;
  gold = 0;
  mana = 3;
  discardHand();
  shuffleDeck();
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
  playButton         = new Button(width/2, height/4, 300, 200, "Play", 40, "white", blueButtonClicked, blueButton);
  optionsButton      = new Button(width/2, height/2, 250, 150, "Options", 30, "white", blueButtonClicked, blueButton);
  quitButton         = new Button(width/2, height * (14/20), 200, 100, "Quit", 30, "white", blueButtonClicked, blueButton);
  instructionsButton = new Button(width/2, height * (2/5) - 50, 250, 150, "Instructions", 30, "white", blueButtonClicked, blueButton);
  soundOptionButton  = new Button(width/2, height * (3/5) + 50, 250, 150, "Toggle Sound", 30, "white", blueButtonClicked, blueButton);
  backOptionButton   = new Button(width - 75, 75, 150, 150, "Back", 30, "black", yellowSmallButtonClicked, yellowSmallButton);
  backPlayButton     = new Button(75, 75, 150, 150, "Back", 30, "black", yellowSmallButtonClicked, yellowSmallButton);
  endTurnButton      = new Button(width - 100, width * (1/4), 200, 100, "End Turn", 25, "white", yellowButtonClicked, yellowButton);
  continueButtonYes  = new Button(width/2 - 150, height/2 + 100, 200, 100, "Yes", 25, "white", greenButtonClicked, greenButton);
  continueButtonNo   = new Button(width/2 + 150, height/2 + 100, 200, 100, "No", 25, "white", greenButtonClicked, greenButton);
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
  // {color: "", cost: , name: "", text: "", rarity: "", type: "", targetType: "", effectType: "", effectValue: , effectSubtype: "", effectSubtypeValue: };
  lightAttack     = {color: "red",    cost: 1,   name: "Light Attack",     text: "Deal 5 damage.",                                        rarity: "base",   type: "attack", targetType: "single", effectType: "damage",  effectValue: 5,  effectSubtype: "",      effectSubtypeValue: 0};
  heavyAttack     = {color: "red",    cost: 2,   name: "Heavy Attack",     text: "Deal 10 damage.",                                       rarity: "base",   type: "attack", targetType: "single", effectType: "damage",  effectValue: 10, effectSubtype: "",      effectSubtypeValue: 0};
  flay            = {color: "red",    cost: 1,   name: "Flay",             text: "Deal 10 damage to a random enemy.",                     rarity: "common", type: "attack", targetType: "random", effectType: "damage",  effectValue: 10, effectSubtype: "",      effectSubtypeValue: 0};
  berserkerStance = {color: "red",    cost: 3,   name: "Berserker Stance", text: "Every turn, deal 5 damage to a random enemy.",          rarity: "rare",   type: "stance", targetType: "random", effectType: "damage",  effectValue: 5,  effectSubtype: "",      effectSubtypeValue: 0};
  block           = {color: "white",  cost: 1,   name: "Block",            text: "Gain 5 armor.",                                         rarity: "base",   type: "defend", targetType: "none",   effectType: "armor",   effectValue: 5,  effectSubtype: "",      effectSubtypeValue: 0};
  armorUp         = {color: "white",  cost: 2,   name: "Armor Up",         text: "Gain 10 armor",                                         rarity: "common", type: "defend", targetType: "none",   effectType: "armor",   effectValue: 10, effectSubtype: "",      effectSubtypeValue: 0};
  shieldToss      = {color: "white",  cost: 2,   name: "Shield Toss",      text: "Deal 5 damage, gain 5 armor",                           rarity: "common", type: "defend", targetType: "single", effectType: "damage",  effectValue: 10, effectSubtype: "armor", effectSubtypeValue: 5};
  phalanxStance   = {color: "white",  cost: 3,   name: "Phalanx Stance",   text: "Every turn, you gain 5 armor.",                         rarity: "rare",   type: "stance", targetType: "none",   effectType: "armor",   effectValue: 5,  effectSubtype: "",      effectSubtypeValue: 0};
  spiritStance    = {color: "purple", cost: 3,   name: "Spirit Stance",    text: "Every Turn, you gain 1 mana.",                          rarity: "rare",   type: "stance", targetType: "none",   effectType: "mana",    effectValue: 1,  effectSubtype: "",      effectSubtypeValue: 0};
  manaBurst       = {color: "purple", cost: "X", name: "Mana Burst",       text: "Spend all your mana, deal 2x that much to each enemy.", rarity: "common", type: "spell",  targetType: "AOE",    effectType: "damage",  effectValue: 3,  effectSubType: "",      effectSubtypeValue: 0};
  fanOfBlades     = {color: "red",    cost: 2,   name: "Fan of Blades",    text: "Deal 3 damage to each enemy.",                          rarity: "common", type: "attack", targetType: "AOE",    effectType: "damage",  effectValue: 3,  effectSubtype: "",      effectSubtypeValue: 0};
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

  //name, imageNumber, health, gold, monsterAttacks

  chomperMonster    = {name: "Chomper",     image: chomperMonsterImage,    health: 25, gold: 55, monsterAttacks: ["Bite", "Consume",  "Defend"]};
  blueBeanMonster   = {name: "Blue Bean",   image: blueBeanMonsterImage,   health: 20, gold: 50, monsterAttacks: ["Bite", "Heal",     "Defend"]};
  spikySlimeMonster = {name: "Spiky Slime", image: spikySlimeMonsterImage, health: 30, gold: 60, monsterAttacks: ["Slap", "SpikeUp",  "Defend"]};
  dizzyMonster      = {name: "Dizzy",       image: dizzyMonsterImage,      health: 20, gold: 45, monsterAttacks: ["Slap", "Hypnosis", "Defend"]};
  fireDemonMonster  = {name: "Fire Demon",  image: fireDemonMonsterImage,  health: 25, gold: 55, monsterAttacks: ["Slap", "Burn",     "Defend"]};

  chomperMonster.monsterImage    = chomperMonsterImage;
  blueBeanMonster.monsterImage   = blueBeanMonsterImage;
  spikySlimeMonster.monsterImage = spikySlimeMonsterImage;
  dizzyMonster.monsterImage      = dizzyMonsterImage;
  fireDemonMonster.monsterImage  = fireDemonMonsterImage;

  monsterTypeList = [chomperMonster, blueBeanMonster, spikySlimeMonster, dizzyMonster, fireDemonMonster];
}

//checks when the mouse is released
function mouseReleased() {
  if (turnPhase === "play" && cardIsInHand && (cardInHand.cardCost <= mana || cardInHand.cardCost === "X")) {
    if (cardInHand.cardTargetType === "single" && monsterIsSelected()) {
      playCard();
      discardCard();
    }
    else if (cardIsInHand && (cardInHand.cardTargetType === "random" || cardInHand.cardTargetType === "none" || cardInHand.cardTargetType === "AOE") && cardInHand.y < cardInHand.originalY - cardInHand.height/2) {
      playCard();
      discardCard();
    }
  }
  beep(draggingCardID);
  draggingCardID = 0;
  cardIsInHand = false;
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
  if (key === "s" || key === "S") {
    monstersSpawned = false;
  }
}

function cursorUpdate() {
  imageMode(CORNER);
  if (cardIsInHand && monsterIsSelected() && cardInHand.cardTargetType === "single") {
    cursorMode = "target";
  }
  else if (cardIsInHand && (cardInHand.cardTargetType === "random" || cardInHand.cardTargetType === "none" || cardInHand.cardTargetType === "AOE") && cardInHand.y < cardInHand.originalY - cardInHand.height/2) {
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
    for (let i = 0; i < monsterList.length; i++) {
      monsterList[i].monsterSpikes = 0;
      monsterList[i].monsterArmor = 0;
      monsterList[i].monsterMaxArmor = 0;
      monsterList[i].monsterHealth = monsterList[i].monsterMaxHealth;
    }

    for (let i = 0; i < 3; i++) {
      let randomTypeNumber = floor(random(1, monsterTypeList.length));
      monsterList[i].xPosition = monsterLocationList[i].x;
      monsterList[i].yPosition = monsterLocationList[i].y;

      monsterList[i].isAlive = true;

      monsterList[i].monsterName        = monsterTypeList[randomTypeNumber].name;
      monsterList[i].monsterImage       = monsterTypeList[randomTypeNumber].image;
      monsterList[i].monsterHealth      = monsterTypeList[randomTypeNumber].health;
      monsterList[i].monsterMaxHealth   = monsterTypeList[randomTypeNumber].health;
      monsterList[i].monsterGold        = monsterTypeList[randomTypeNumber].gold;
      monsterList[i].monsterAttacks     = monsterTypeList[randomTypeNumber].monsterAttacks;
    }
    for (let i = 0; i < monsterList.length; i++) {
      monsterList[i].selectedAttack = monsterList[i].monsterAttacks[floor(random(0, monsterList[i].monsterAttacks.length))];
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
  else {
    return false;
  }
}

function selectedMonster() {
  if (monsterOneSelected()) {
    return monsterList[0];
  }
  else if (monsterTwoSelected()) {
    return monsterList[1];
  }
  else if (monsterThreeSelected()) {
    return monsterList[2];
  }
}

function shuffleDeck() {
  cardDeckList = shuffle(cardDeckList);
  deckShuffle.play();
}

function reshuffleDeck() {
  cardDeckList.push(cardDiscardDeckList);
  shuffle(cardDeckList, true);
  cardDiscardDeckList = [];
  deckShuffle.play();
}

function stanceAction() {
  if (currentStanceTarget === "random") {
    if (currentStanceEffect === "damage") {
      monsterList[floor(random(0, monsterList.length))].monsterHealth -= currentStanceValue;
    }
  }
  else if (currentStanceTarget === "AOE") {
    if (currentStanceEffect === "damage") {
      for (let i =0; i < monsterList.length; i++) {
        monsterList[i].monsterHealth -= currentStanceValue;
      }
    }
  }
  else if (currentStanceTarget === "none") {
    if (currentStanceEffect === "armor") {
      armor += currentStanceValue;
    }
    else if (currentStanceEffect === "mana") {
      mana += currentStanceValue;
    }
  }
}

function displayPlayerStats() {
  textSize(25);
  image(manaStar, manaStarPosition.x, manaStarPosition.y, manaStarSize, manaStarSize);
  text(mana, manaStarPosition.x, manaStarPosition.y + 12);
  fill(0);
  image(armorShield, armorShieldPosition.x, armorShieldPosition.y, armorShieldSize - 10, armorShieldSize);
  text(armor, armorShieldPosition.x, armorShieldPosition.y + 5);
  fill(0);
  image(goldBag, goldBagPosition.x, goldBagPosition.y, goldBagSize, goldBagSize);
  text(gold, goldBagPosition.x - 5, goldBagPosition.y + 10);
  if (burn > 0) {
    image(playerBurn, healthHeartPosition.x, healthHeartPosition.y - 100, playerBurnSize, playerBurnSize);
    text(burn, healthHeartPosition.x, healthHeartPosition.y - 85);
  }
  fill(255);
  image(healthHeart, healthHeartPosition.x, healthHeartPosition.y, healthHeartSize, healthHeartSize);
  text(health, healthHeartPosition.x, healthHeartPosition.y);
}

//function that adds card from the deck into the player's hand
//Currently logs all of the array info into the console as evidence that each card attains and maintains its card values
function drawCard(drawNumber) {
  cardDraw.play();
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
  let xCost = mana;
  let damageToMonsterOne = 0;
  let damageToMonsterTwo = 0;
  let damageToMonsterThree = 0;
  cardPickUp.play();
  if (cardInHand.cardCost >= 0) {
    mana -= cardInHand.cardCost;
  }
  else if (cardInHand.cardCost === "X") {
    mana = 0;
  }
  else {
    beep("Invalid cost");
  }
  beep("cardCost: " + cardInHand.cardCost);

  if (cardInHand.cardType === "stance") {
    currentStanceTarget = cardInHand.cardTargetType;
    currentStanceEffect = cardInHand.cardEffectType;
    currentStanceValue  = cardInHand.cardEffectValue;
  }
  else if (cardInHand.cardTargetType === "single") {
    if (cardInHand.cardEffectType === "damage") {
      if (monsterOneSelected()) {
        damageToMonsterOne += cardInHand.cardEffectValue;
      }
      else if (monsterTwoSelected()) {
        damageToMonsterTwo += cardInHand.cardEffectValue;
      }
      else if (monsterThreeSelected()) {
        damageToMonsterThree += cardInHand.cardEffectValue;
      }
    }
  }
  else if (cardInHand.cardTargetType === "random") {
    if (cardInHand.cardEffectType === "damage") {
      let chosenMonster = floor(random(0, monsterList.length));
      while (!monsterList[chosenMonster].isAlive) {
        chosenMonster = floor(random(0, monsterList.length));
      }
      if (chosenMonster === 1) {
        damageToMonsterOne += cardInHand.cardEffectValue;
      }
      else if (chosenMonster === 2) {
        damageToMonsterTwo += cardInHand.cardEffectValue;
      }
      else if (chosenMonster === 3) {
        damageToMonsterThree += cardInHand.cardEffectValue;
      }
    }
  }
  else if (cardInHand.cardTargetType === "AOE") {
    if (cardInHand.cardEffectType === "damage") {
      damageToMonsterOne += cardInHand.cardEffectValue;
      damageToMonsterTwo += cardInHand.cardEffectValue;
      damageToMonsterThree += cardInHand.cardEffectValue;
    }
  }
  else if (cardInHand.cardTargetType === "none") {
    if (cardInHand.cardEffectType === "armor") {
      armor += cardInHand.cardEffectValue;
    }
  }
  let damageToMonsterList = [damageToMonsterOne, damageToMonsterTwo, damageToMonsterThree];
  for (let i = 0; i < monsterList.length; i++) {
    let damageRemainder = damageToMonsterList[i] - monsterList[i].monsterArmor;
    monsterList[i].monsterArmor -= damageToMonsterList[i];
    if (damageRemainder > 0) {
      monsterList[i].monsterHealth -= damageRemainder;
    }
  }
}

function discardCard() {
  cardDiscardDeckList.push(cardHandList[draggingCardID-1]);
  cardList[cardHandList.length-1].cardInfo = {}; 
  cardHandList.splice(draggingCardID-1, 1);
  assignHandValues();

  cardList[cardHandList.length].cardColor       = "";
  cardList[cardHandList.length].cardCost        = "";
  cardList[cardHandList.length].cardName        = "";
  cardList[cardHandList.length].cardText        = "";
  cardList[cardHandList.length].cardRarity      = "";
  cardList[cardHandList.length].cardEffectType  = "";
  cardList[cardHandList.length].cardSubtype     = "";
  cardList[cardHandList.length].cardEffectValue = "";
}

function discardHand() {
  for (let i = 0; i < cardHandList.length; i++) {
    cardDiscardDeckList.push(cardHandList[i]);
    cardList[i].cardInfo = {}; 
    cardList[i].cardColor       = "";
    cardList[i].cardCost        = "";
    cardList[i].cardName        = "";
    cardList[i].cardText        = "";
    cardList[i].cardRarity      = "";
    cardList[i].cardEffectType  = "";
    cardList[i].cardSubtype     = "";
    cardList[i].cardEffectValue = "";
  }
  cardHandList = [];
  assignHandValues();
}

function assignHandValues() {
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardInfo = cardHandList[i];
  }
  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardInfo = cardHandList[i];
  }

  for (let i = 0; i < cardHandList.length; i++) {
    cardList[i].cardType         = cardList[i].cardInfo.type;
    cardList[i].cardColor        = cardList[i].cardInfo.color;
    cardList[i].cardCost         = cardList[i].cardInfo.cost;
    cardList[i].cardName         = cardList[i].cardInfo.name;
    cardList[i].cardText         = cardList[i].cardInfo.text;
    cardList[i].cardRarity       = cardList[i].cardInfo.rarity;
    cardList[i].cardTargetType   = cardList[i].cardInfo.targetType;
    cardList[i].cardEffectType   = cardList[i].cardInfo.effectType;
    cardList[i].cardEffectValue  = cardList[i].cardInfo.effectValue;
    cardList[i].cardSubtype      = cardList[i].cardInfo.effectSubtype;
    cardList[i].cardSubtypeValue = cardList[i].cardInfo.effectSubtypeValue;
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
  if (!monsterOne.isAlive && !monsterTwo.isAlive && !monsterThree.isAlive) {
    monstersSpawned = false;
  }
  mana = maxMana - manaDebuff;
  manaDebuff = 0;
  armor = 0;
  turnCounter += 1;
  stanceAction();
  if (health <= 0) {
    gameState = "gameOver";
  }
}

function drawStep() {
  if (turnCounter === 1) {
    shuffleDeck();
    drawCard(4);
  }
  else {
    drawCard(4);
  }
  if (health <= 0) {
    gameState = "gameOver";
  }
}

function playStep() {
  if (endTurnButton.isClicked() && ButtonReady) {
    ButtonReady = false;
    turnPhase = "end";
  }
  if (health <= 0) {
    gameState = "gameOver";
  }
}

function endStep() {
  for (let i = 0; i < cardHandList.length; i++) {
    cardDiscardDeckList.push(cardHandList[i]);
  }
  cardHandList = [];
  if (health <= 0) {
    gameState = "gameOver";
  }
  health -= burn;
  if (burn > 0) {
    burn -= 1;
  }
}

function enemyTurn() {
  for (let i = 0; i < monsterList.length; i++) {
    monsterList[i].monsterSpikes = 0;
    monsterList[i].monsterArmor = 0;
    monsterList[i].monsterMaxArmor = 0;
  }
  for (let i = 0; i < monsterList.length; i++) {
    if (monsterList[i].isAlive) {
      monsterList[i].monsterAttack();
      monsterList[i].selectedAttack = monsterList[i].monsterAttacks[floor(random(0, monsterList[i].monsterAttacks.length))];
    }
  }
  turnPhase = "upkeep";
  if (health <= 0) {
    gameState = "gameOver";
  }
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
    if (this.isClicked() && !cardIsInHand) {
      cardIsInHand = true;
      draggingCardID = this.cardID;
      cardInHand = cardList[draggingCardID-1];
    }
    if (cardIsInHand && draggingCardID === this.cardID) {
      this.x = mouseX;
      this.y = mouseY;
    }
    if (!cardIsInHand) {
      this.x = this.originalX;
      this.y = this.originalY;
    }
    if (cardIsInHand) {
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
    if (this.isClicked() && !playingSound && ButtonReady) {
      buttonClick.play();
    }
    textAlign(CENTER);
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
    this.isAlive = true;
  }

  displayStats() {
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
    else if (this.monsterHealth <= 0) {
      this.isAlive = false;
      gold += this.monsterGold;
    }

    if (this.monsterArmor > 0) {
      fill("black");
      rect(this.xPosition - monsterImageX/2 + 20, this.yPosition + monsterImageY/2 + 75, monsterImageX - 40, 40);
      fill("dodgerblue");
      rect(this.xPosition - monsterImageX/2 + 20, this.yPosition + monsterImageY/2 + 75, (monsterImageX - 40)/this.monsterMaxArmor * this.monsterArmor, 40);
      fill("white");
      textSize(40);
      text(this.monsterArmor + "/" + this.monsterMaxArmor, this.xPosition, this.yPosition + 218);
    }
  }

  displayMonster() {
    if (this.isAlive) { 
      image(this.monsterImage, this.xPosition, this.yPosition, monsterImageX, monsterImageY);
      
    }
  }

  monsterAttack() {
    let damageToPlayer = 0;
    let monsterHeal = 0;
    let monsterArmorGain = 0;
    let monsterSpikesGain = 0;
  
    if (this.selectedAttack === "Slap") {
      damageToPlayer = 5;
    }
    else if (this.selectedAttack === "Bite") {
      damageToPlayer = 5;
    }
    else if (this.selectedAttack === "Consume") {
      damageToPlayer = 3;
      monsterHeal = 3;
    }
    else if (this.selectedAttack === "Defend") {
      monsterArmorGain = 5;
    }
    else if (this.selectedAttack === "Heal") {
      monsterHeal = 10;
    }
    else if (this.selectedAttack === "Hypnosis") {
      manaDebuff += 1;
    }
    else if (this.selectedAttack === "Burn") {
      burn += 3;
    }
    else if (this.selectedAttack === "SpikeUp") {
      monsterSpikesGain = 3;
    }
  
    if (this.monsterHealth <= this.monsterMaxHealth - monsterHeal) {
      this.monsterHealth += monsterHeal;
    }
    else {
      this.monsterHealth = this.monsterMaxHealth;
    }
    let damageRemainder = damageToPlayer - armor;
    armor -= damageToPlayer;
    if (damageRemainder > 0) {
      health -= damageRemainder;
    }
    this.monsterArmor += monsterArmorGain;
    this.monsterMaxArmor = monsterArmorGain;
    this.monsterSpikes = monsterSpikesGain;
  }

  displayIntent() {
    intentDamage = 0;
    intentHeal = 0;
    intentArmor = 0;
    if (this.selectedAttack === "Slap") {
      intentDamage = 5;
    }
    else if (this.selectedAttack === "Bite") {
      intentDamage = 5;
    }
    else if (this.selectedAttack === "Consume") {
      intentDamage = 3;
      intentHeal = 3;
    }
    else if (this.selectedAttack === "Defend") {
      intentArmor = 5;
    }
    else if (this.selectedAttack === "Heal") {
      intentHeal = 10;
    }

    if (this.selectedAttack === "Slap" || this.selectedAttack === "Bite" || this.selectedAttack === "Consume") {
      image(enemyAttack, this.xPosition - 30, this.yPosition - 150, enemyIntentIconSize, enemyIntentIconSize);
      fill("red");
      textSize(60);
      text(intentDamage, this.xPosition + 30, this.yPosition - 120);
    }
    else if (this.selectedAttack === "Defend") {
      image(enemyArmor, this.xPosition, this.yPosition - 160, enemyIntentIconSize, enemyIntentIconSize);
      fill(0);
      textSize(60);
      text(intentArmor, this.xPosition, this.yPosition - 140);
    }
    else if (this.selectedAttack === "Heal") {
      image(enemyHeal, this.xPosition - 35, this.yPosition - 150, enemyIntentIconSize, enemyIntentIconSize);
      fill("red");
      textSize(60);
      text(intentHeal, this.xPosition + 35, this.yPosition - 130);
    }
    else if (this.selectedAttack === "Burn" || this.selectedAttack === "Hypnosis") {
      image(enemyDebuff, this.xPosition, this.yPosition - 150, enemyIntentIconSize, enemyIntentIconSize);
    }
    else if (this.selectedAttack === "SpikeUp") {
      image(enemyBuff, this.xPosition, this.yPosition - 160, enemyIntentIconSize, enemyIntentIconSize);
    }
  }

  behavior() {
    if (this.isAlive) {
      this.displayStats();
      this.displayMonster();
      this.displayIntent();
    }
  }
}