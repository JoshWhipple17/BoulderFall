//1 set the properties to the player element
var playerElement = document.getElementById("player");
playerElement.style.top = 400 + "px";
playerElement.style.left = 450 + "px";
playerElement.style.width = 100 + "px";
playerElement.style.height = 100 + "px";

// starts the game when you press "s"
var gameStarted = false;
window.addEventListener("keydown",startGame);
function startGame(e){
    if(e.keyCode == 83 && gameStarted == false){
        gameStarted = true;
        var timer = setInterval(function(){
            playMusic();

            boulder.create();

            // check health bar to see it reaches 0 when it does end game
            if(healthBar.isEmpty()){
                var endGame = document.getElementById("gameOver");
                var stats = document.getElementById("stats");
                endGame.style.display = "block";
                stats.style.display = "none";
                clearInterval(timer);
                window.removeEventListener("keydown",keydownHandler);
                music.pause();
            }
        },500) // 500 is the normal speed
    }
}

//3 set player's position on the screen, movement properties, and life bar drain amt
movePlayer.containerId = "player-container";
movePlayer.playerId = "player";
movePlayer.positionX = 450;
movePlayer.positionY = 400;
movePlayer.pixels = 30;
healthBar.id = "health-bar";
healthBar.drainAmt = 10;

//4 create a keydown event listener to listen for arrow buttons
window.addEventListener("keydown",keydownHandler);
function keydownHandler(e){
    if(e.keyCode == 37){
        movePlayer.left();
    } else if (e.keyCode == 39){
        movePlayer.right();
    } 
    console.log(e.keyCode); // displays in keycode what button was pressed
}

//5 play background music
var playMusic = function(){
    var music = document.getElementById("music");
    music.play();
    music.volume = 0.8;
}