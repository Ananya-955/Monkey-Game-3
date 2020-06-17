//Global Variables
var bananaImage, obstacleImage, obstacleGroup,playerImage, backgroundImage, Score, ground, bananaGroup;
var banana, obstacle, player, scene;
function preload(){
  backgroundImage= loadImage("jungle.jpg");
  
  playerImage= loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  bananaImage= loadImage("Banana.png");
  obstacleImage=loadImage("stone.png"); 
}


function setup() {
  createCanvas(600,300);
  
  scene=createSprite(300,0,600,300);
  scene.addImage("scene", backgroundImage);
  scene.scale=1;
  scene.x=scene.width/2;
  
  
  player=createSprite(50,240,20,20);
  player.addAnimation("monkey", playerImage);
  player.scale=0.1;
  
  ground=createSprite(300,260,600,10);
  ground.visible=false;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  
  Score=0;
}
 

function draw(){
 background(255); 
    
    scene.velocityX=-5;
  
  if (scene.x<100){
    scene.x=scene.width/2;
  }

  if (keyDown("space") && player.y>224){
    player.velocityY=-20;
  }

  
  player.velocityY=player.velocityY+1.8;
  
  player.collide(ground); 
  
  food();
  rock();
  
  if (bananaGroup.isTouching(player)){
    Score=Score+2;
    bananaGroup.destroyEach();
  }
  switch(Score){
    case 10 : player.scale=0.12;
      break;
   case 20 : player.scale=0.14;
      break;
   case 30 : player.scale=0.16;
      break;
  case 40 : player.scale=0.18;
      break;
   case 50 : player.scale=0.20;
      break;
    case 60 : player.scale=0.22;
      break;   
      default: break;
  }
  
  if (obstacleGroup.isTouching(player)){
    player.scale=0.1;
  }
  
    drawSprites();
  
  textSize(20);
  stroke ("white");
  fill ("white");
  text("Score: " +Score, 500,100);
  
}

function food(){
  if (frameCount % 80===0){
    var banana=createSprite(600,80,20,20);
    banana.y=Math.round(random(80,180));
    banana.addImage("banana", bananaImage);
    banana.scale= 0.05;
    banana.velocityX= -(4+(Score/100));
    banana.lifetime= 150;
    
    bananaGroup.add(banana);
  }
}

function rock(){
   if (frameCount % 200===0){
    var obstacle=createSprite(600,250,20,20);
    obstacle.addImage("rock", obstacleImage);
    obstacle.scale= 0.2;
    obstacle.velocityX= -(6+(Score/100));
    obstacle.lifetime= 100;
    
    obstacleGroup.add(obstacle);
  }
}
