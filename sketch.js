var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var survivalTime=0;
var play = 1;
var end = 0;
var gameState = play;
var jungleSprite,jungleImage;
var count=0;




function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  monkey_collided = loadAnimation("Monkey_01.png");
  jungleImage = loadImage("jungle.jpg");
 
}



function setup() 
{
  createCanvas(600,600);
  
  
  jungleSprite = createSprite(300,300,1200,10);
  jungleSprite.addImage("jungle",jungleImage);
  
  jungleSprite.velocityX = -2;
  
  
  // jungleSprite.scale = 0.3;
  
  monkey = createSprite(80,500,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  
  ground = createSprite(600,500,1200,10);
  ground.x=ground.width/2;
  ground.visible = false;
  
  console.log(ground.x);

  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  

}


function draw() 
{
  background("white");
  
  monkey.collide(ground);
  
  if(gameState === play)
  {
    
    
    if(keyDown("space"))
    {
      monkey.velocityY = -13;
      
      
    }
  
    monkey.velocityY = monkey.velocityY + 0.5;
    
    if (jungleSprite.x < 200)
    {
      jungleSprite.x = jungleSprite.width/2;
    }
    
    if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      score = score+2;
      console.log("string");
    }
    
    food();
    obstacles();
    
    
    survivalTime = survivalTime+Math.round(getFrameRate()/60)
    
    switch(score)
    {
       case 10: monkey.scale=0.21;
        break;
       case 20: monkey.scale=0.25;
        break;
       case 30: monkey.scale=0.31;
        break;
       case 40: monkey.scale=0.35;
        break;
       
    }
  
  if(monkey.isTouching(obstacleGroup))
    {
       monkey.scale=0.1;
       obstacleGroup.destroyEach(); 
       count=count+1
      
       if(count > 1) 
       { gameState = end; } 
    }
  
     
  
  
      
    
  } else if (gameState === end)
    {
      bananaGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      jungleSprite.velocityX = 0;
           monkey.changeAnimation("collided",monkey_collided);
      bananaGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      monkey.velocityY = 0;
      
    }
  
   drawSprites(); 

    
    
  stroke("white");
  textSize(15);
  fill("black");
  text ("Score:" + score, 500,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  
  text("SurvivalTime: " + survivalTime, 100,50);
  
  
    
  
    
  

  
}

function food()
{
  if (frameCount % 80 === 0)              
  {
    var banana = createSprite(600,40,10,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.velocityX = -3
    banana.lifetime = 200;
    banana.scale = 0.1;
    bananaGroup.add(banana);
  } 
}

function obstacles()
{
  if (frameCount % 300 === 0)
    {
      var obstacle = createSprite(600,500,10,40);
      obstacle.velocityX = -3;
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      obstacle.lifetime = 200;
      obstacleGroup.add(obstacle);
      
    }         
}