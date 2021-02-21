var dog,dogImg,happyDogImg,database,foodS,foodStock;
var feed,addFood;
var lastFed,fedTime;
var foodObj;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
	createCanvas(1000,500);
  database = firebase.database();
 
  foodObj = new Food();

  foodStock = database.ref('Food');
foodStock.on("value",readStock);
 
  dog = createSprite(800,200,150,150);
  dog.addImage("dog",dogImg);
  dog.scale = 0.15;

feed = createButton("FEED THE DOG");
feed.position(700,95);
feed.mousePressed(dogImg);

addFood = createButton("ADD FOOD");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});

fill(255);
textSize(20);
if (lastFed >= 12){
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}

else if(lastFed === 0) {
text("Last Feed : 12 AM",350,30);
}

else{
  text("Last Feed : "+ lastFed + "AM",250,30);
}


foodObj.display();
  drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDogImg);

   if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);

   }
   else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);

   }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}
