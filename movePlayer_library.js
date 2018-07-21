// The movePlayer Library

var movePlayer = {
    containerId: "", // the id of the player-container/moving element
    playerId:"", // the id of the player/collision element
    
    positionX: 0, // the starting position of the player on the x-axis
    
    positionY: 0, // the starting postion of the player on the y-axis
    
    pixels: 1, // how many pixels the player will move; the default is 1px
    
    boundaryLeft: 30, // this is the left boundary
    
    boundaryRight: 1130, // this is the right boundary
    
    left: function(){
        // this affects the moving element
        var movingElement = document.getElementById(movePlayer.containerId);
        movingElement.style.left = (movePlayer.positionX -= movePlayer.pixels) + "px";
        
        // change positionX if less than boundaryLeft
        if(movePlayer.positionX <= movePlayer.boundaryLeft){
            movePlayer.positionX = movePlayer.boundaryLeft;
            movingElement.style.left = (movePlayer.positionX -= movePlayer.pixels) + "px";
        }
        
        // this affects the collision element
        var collisionElement = document.getElementById(movePlayer.playerId);
        collisionElement.style.left = movingElement.style.left;
    },
    
    right: function(){
        // this affects the moving element
        var movingElement = document.getElementById(movePlayer.containerId)
        movingElement.style.left = (movePlayer.positionX += movePlayer.pixels) + "px";
        
        // change positionX if greater than boundaryRight
        if(movePlayer.positionX >= movePlayer.boundaryRight){
            movePlayer.positionX = movePlayer.boundaryRight;
            movingElement.style.left = (movePlayer.positionX -= movePlayer.pixels) + "px";
        }
        
        // this affects the collision element
        var collisionElement = document.getElementById(movePlayer.playerId);
        collisionElement.style.left = movingElement.style.left;
    },
    
    up: function(){
        // this affects the moving element
        var element = document.getElementById(movePlayer.containerId)
        element.style.top = (movePlayer.positionY -= movePlayer.pixels) + "px";
        
        // this affects the collision element
        var collisionElement = document.getElementById(movePlayer.playerId);
        collisionElement.style.top = movingElement.style.top;
    },
    
    down: function(){
        // this affects the moving element
        var element = document.getElementById(movePlayer.containerId)
        element.style.top = (movePlayer.positionY += movePlayer.pixels) + "px";
        
        // this affects the collision element
        var collisionElement = document.getElementById(movePlayer.playerId);
        collisionElement.style.top = movingElement.style.top;
    },
}