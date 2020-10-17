var score = 0;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var ground, groundImage, invisibleGround;
var jumpSound, soundJump;
var collideSound, soundCollide;
var monutain, mountainImage;
var holder


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  groundImage = loadImage("01-start (1).webp")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkeyCollide = loadImage("sprite_1.png");
  soundJump = loadSound("17967120_yummy_by_yulia-meller_preview.mp3")

  soundCollide = loadSound("incorrect-answer--1-sound-effect-27493287.mp3");

  mountainImage = loadImage("download.png");
}

function setup() {
  createCanvas(600, 400)
  background("white");
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  score = 0;

  ground = createSprite(300, 160, 600, 10);
  ground.addImage("floor", groundImage);
  ground.scale = 1.5;

  invisibleGround = createSprite(300, 370, 600, 10);
  invisibleGround.visible = false;

  monkey = createSprite(80, 350, 10, 10);
  monkey.scale = 0.15;
  monkey.addAnimation("monk", monkey_running);
  monkey.addImage("collide", monkeyCollide);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  mountainGroup = createGroup();

  holder = createSprite(300, 37, 600, 10);



}


function draw() {
  drawSprites();
  fill("black");
  text("SURVIVAL DISTANCE: " + score, 420, 20);
  text("BANANAS COLLECTED: " + bananaScore, 250, 20);

  if (gameState === PLAY) {
    obstacles();
    bananas();
    mountains();
    score = score + Math.round(getFrameRate() / 60);

    ground.velocityX = -(6 + score / 100);

    if (keyDown("space") && monkey.y >= 230) {
      monkey.velocityY = -13;

    }

    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(bananaGroup)) {
      bananaScore = bananaScore + 1;
      bananaGroup.destroyEach();
      soundJump.play();

    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
      soundCollide.play();
    }
    if (monkey.isTouching(mountainGroup)) {
      monkey.y = 145;
      gameState = END;
      soundCollide.play();

    }

  }

  monkey.collide(invisibleGround);
  if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    monkey.changeAnimation("collide", monkeyCollide);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    mountainGroup.setVelocityXEach(0);
    mountainGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("!!!GAMEOVER!!!", 180, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 210, 200);

    if (keyDown("r")) {
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      mountainGroup.destroyEach();
      monkey.changeAnimation("monk", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY;
    }
  }

}

function obstacles() {
  if (frameCount % 100 === 0) {
    obstacle = createSprite(580, 350, 10, 10)
    obstacle.addImage("rock", obstacleImage);
    obstacle.velocityX = -(6 + score / 100);
    obstacle.scale = 0.15;
    obstacle.debug = false;
    obstacle.lifeTime = 30;
    obstacle.setCollider("circle", 0, 0, 200);
    obstacle.collide(invisibleGround);
    obstacleGroup.add(obstacle);
  }
}

function bananas() {
  if (frameCount % 90 === 0) {
    banana = createSprite(580, 100, 10, 10);
    banana.y = Math.round(random(130, 200));
    banana.velocityX = -(6 + score / 100);
    banana.lifeTime = 40;
    banana.addImage("fruit", bananaImage);
    banana.scale = 0.1
    bananaGroup.add(banana);

  }
}

function mountains() {
  if (frameCount % 230 === 0) {

    mountain = createSprite(580, 100, 10, 10);
    mountain.addImage("sky", mountainImage);
    mountain.velocityX = -(6 + score / 100);
    mountain.lifeTime = 40;
    mountain.scale = 0.5;
    mountainGroup.add(mountain);
    mountain.debug = false;
    mountain.setCollider("rectangle", 0, 0, 35, 160)
  }
}