class Game {
  constructor() {
    
  }
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // TA
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;
     powerCoins = new Group()
     fuels = new Group()
    this.addSprites(powerCoins,18,powerCoinImage,0.09)
    this.addSprites(fuels,4,fuelImage,0.02)
    cars = [car1, car2];
  }

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }
  addSprites(spriteGroup,number,spriteImage,scale){
    for(var i = 0;i<number;i++){
     var  x = random(width/2-150,width/2+150)
     var y = random(-height*4.5,height-400)
     var sprite = createSprite(x,y)
     sprite.addImage(spriteImage)
     sprite.scale = scale
     spriteGroup.add(sprite)
    }
  }
handleFuel(index){
  cars[index-1].overlap(fuels,function(collector,collected){
    fuel = 185
    collected.remove()
  }
  )
}

handleCoins(index){
  cars[index-1].overlap(powerCoins,function(collector,collected){
    score += 20
    player.score = score
    player.update()
    collected.remove()
    var playerScoreRef = database.ref("players/player1/score")
    var playerScore2Ref = database.ref("players/player2/score")
    var  playerNameRef = database.ref("players/player1/name")
    var playerNameRef2 = database.ref("players/player2/name")
    playerNameRef.on("value",data => {
      playerName = data.val();
    })
    playerNameRef2.on("value",data => {
      playerName2 = data.val();
    })
    
    playerScoreRef.on("value", data => {
      playerScore = data.val();
    });
    playerScore2Ref.on("value", data => {
      playerScore2 = data.val();
    });
    console.log(playerName+":"+playerScore)
    console.log(playerName2+":"+playerScore2)
  })
}
  //SA
  play() {
    this.handleElements();
    
    Player.getPlayersInfo(); //added
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;

        //add 1 to the index for every loop
        index = index + 1;
         
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handleCoins(index)
         this.handleFuel(index)
         camera.position.x = width/2
         camera.position.y = cars[index-1].position.y
        }
      }

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }
}
