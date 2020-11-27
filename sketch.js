
var monkey , monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstaclesGroup;
var score;
var PLAY=1;
var END=2;
var gameState=PLAY;

var stone;
var survivalTime=0;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
 createCanvas(600,600);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  
  score=0;
  survivalTime=0;
  
  
}


function draw() {
 background("light blue"); 
 
//display survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/frameRate());
  
  
  //monkey and ground
  monkey.collide(ground);
 
  
if(gameState==PLAY){
   text("Survival Time:"+survivalTime,100,50);  
//ground
  if(ground.x <0){
    ground.x=ground.width/2
  }

  //calculate survival time
  survivalTime=Math.round(getFrameRate()/60);

 //jump
    if(keyDown("space")&& monkey.y>=100){
    monkey.velocityY=-15;
    }
  
 //gravity
  monkey.velocityY= monkey.velocityY + 0.8;
  
   

 //bananas and obstacles
  createBanana();
  createObstacles();
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }

  if(obstaclesGroup.isTouching(monkey)){
  gameState=END;
 }
  
}
  
else if(gameState==END){
  ground.velocityX=0;
  monkey.velocityX=0;
  text("Press r to restart",100,250);  
  
  if(keyDown("r")){
    reset();
  }
}
  
  
  drawSprites();
}

function createBanana(){
  if(frameCount%80==0){
  banana=createSprite(600,150,20,20);
  banana.y=Math.round(random(120,200));
  banana.addImage("banana", bananaImage);
  banana.velocityX=-2;
  banana.scale=0.08;
  banana.lifetime=300;
  bananaGroup.add(banana);

    }
  
}


function createObstacles(){
  if(frameCount%300==0){
    var obstacle=createSprite(350,325,50,50);
    obstacle.addImage("osbtacle",obstacleImage)
    obstacle.velocityX=-(6+score/100);
    obstacle.scale=0.15;
    obstacle.lifetime=300;
    obstaclesGroup.add(obstacle);
    }
}

function reset(){
obstaclesGroup.destroyEach();
bananaGroup.destroyEach();
survivalTime=0;
gameState=PLAY;
}




