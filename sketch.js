// to define the gamestates
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

// to define the variable for girl
var girl, girlimage;

// to define the variable for ground
var ground;

// to define the variable for the sun
var sun, sunimage;

// to define the variables for loading the images
var stoneimage, puddleimage, bushimage;

// to make the groups 
var cloudGroup, stoneGroup, puddleGroup, bushGroup;

// to make the gameover and retry image
var score = 0;

// to make the restart and gameoverimage 
var retry, retryimage;
var gameoverimage, gameover;

var cheerleaderimage, cheerleader;



function preload( ){ 
// to load all our images in it 
  girlimage = loadImage ("girl.gif");
  sunimage = loadImage ("sun1.png");
  stoneimage = loadImage("stone4.png");
  bushimage = loadImage("bush3.png");
  puddleimage = loadImage("puddle1.png");
  cloudimage = loadImage ("cloud.png");
  gameoverimage = loadImage("gameover.jpg");
  retryimage = loadImage ("retry.png");
  cheerleaderimage = loadImage("cheerleader.gif");
}

function setup() {
    // to make the screen/canvas.
    createCanvas(400, 400);
  
   // to define the properties of the girl 
   girl = createSprite(50, 325, 20, 30);
   girl.addImage(girlimage);
   girl.scale = 0.2;
   //girl.debug = true;

  
   // to define the properties of the ground 
   ground = createSprite(200, 380, 600, 10 );
   ground.x = ground.width /2;

   // to define the properties of the sun
   sun = createSprite(340, 50, 20, 30);
   sun.addImage(sunimage);
   sun.scale = 0.05;

  
   // to define the properties of restart image;
   gameover = createSprite(200, 200, 40, 50);
   gameover.addImage(gameoverimage);
   gameover.scale = 0.2;
   gameover.visible = false;
  
   // to define the properties of gameover image;
   retry = createSprite(200, 300, 40, 50);
   retry.addImage(retryimage);
   retry.scale = 0.3; 
   retry.visible = false;  
  
  // to make a cheerleader 
  cheerleader = createSprite(200, 200, 40, 40);
  cheerleader.addImage(cheerleaderimage);
  cheerleader.visible = false;
  
  
  
   // to make new groups 
   stoneGroup = createGroup();
   cloudGroup = createGroup();
   puddleGroup = createGroup();
   bushGroup = createGroup();
}

function draw() {

  
  // to define the colour of the background
  background("pink");
  
  // to save the girl from falling
  girl.collide(ground);
  
  //displaying score
  text("Score: "+ score, 200,50);
  
  if (gamestate === PLAY) {
    
    ground.velocityX = -(4 + 3* score/100)
    
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    // to give velocity to the ground
    ground.velocityX = -2;
    
    // to recover the ground 
    if (ground.x < 100){
      ground.x = ground.width/2;
    }
  
    // to make the girl jump while pressing space 
    if (keyDown("space")&& girl.y>250) {
      girl.velocityY = -10;
    }
  
    // to add gravity 
    girl.velocityY = girl.velocityY  + 0.4;
  
    spawnStone();
    spawnPuddle();
    spawnBush();
    spawnCloud();
 
    if(bushGroup.isTouching(girl)){  
      gamestate = END;
    }
    if(stoneGroup.isTouching(girl)){
      gamestate = END;
    }
    if(puddleGroup.isTouching(girl)){
      gamestate = END;
    }
    
}
else if (gamestate===END) {
    //set lifetime of the game objects so that they are never destroyed
      
    gameover.visible = true;
    retry.visible = true;
    
      
    bushGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    stoneGroup.setLifetimeEach(-1);
    puddleGroup.setLifetimeEach(-1);
      
    bushGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    puddleGroup.setVelocityXEach(0);
    
    if(mousePressedOver(retry)) {
      reset();
    }  
    text("Press C to see the cheerleader that can cheer you up", 75, 100);  
  text (" and to start the game again press restart button", 75, 115);
  
   if (keyDown("c")) {
     cheerleadercome();  
   }
  
  
    ground.velocityX = 0;
    girl.velocityX = 0
}
 
  
  drawSprites();
}

function spawnStone () {
  if (frameCount % 1045 === 0 ) {
    var stone = createSprite(400, 370, 20, 30);
    stone.addImage(stoneimage);
    stone.velocityX = -2;
    stone.scale = 0.1;
    
    stone.lifetime = 220;
    stoneGroup.add(stone);
  }
  
}

function spawnPuddle () {
  if (frameCount % 568 === 0 ) {
    var puddle = createSprite(400, 375, 20, 30);
    puddle.addImage(puddleimage);
    puddle.velocityX = -2;
    puddle.scale = 0.05 ;
    
    puddle.lifetime = 220;
    puddleGroup.add(puddle);
  }
  
}

function spawnBush () {
  if (frameCount % 120  === 0 ) {
    var bush = createSprite(400, 365, 20, 30);
    bush.addImage(bushimage);
    bush.velocityX = -2;
    bush.scale = 0.07 ;
    
    bush.lifetime = 220;
    bushGroup.add(bush);
  }

}

function spawnCloud () {
  if (frameCount % 60 === 0 ) {
    var cloud = createSprite(400, 370, 20, 30);
     cloud.y = Math.round(random(0,170));
    cloud.addImage(cloudimage);
    cloud.velocityX = -2;
    cloud.scale = 0.07 ;
    
    cloud.lifetime = 220;
    
    cloudGroup.add(cloud);
  }
}

function reset(){
  gameover.visible = false;
  retry.visible = false;
  score = 0;
  bushGroup.destroyEach();
  cloudGroup.destroyEach();
  stoneGroup.destroyEach();
  puddleGroup.destroyEach();
  
  cheerleader.visible=false;
  girl.visible = true;
  sun.visible = true;
  gamestate = PLAY;
  
}

function cheerleadercome() {
  cheerleader.visible = true;
  gameover.visible = false;
  retry.visible = false;
  girl.visible = false;
  cloudGroup.destroyEach();
  bushGroup.destroyEach();
  puddleGroup.destroyEach();
  stoneGroup.destroyEach();
  sun.visible = false;
}