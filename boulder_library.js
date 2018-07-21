// This is the Boulder Library

var boulder = {
    // Getters for collision detection; this is a modified version of the structure from Game 
    // Design with HTML5 and JavaScript chp.8 pg.451-458 by van der spuy - Circle Collisions section
      centerX: function(element)
      {
         // turn the string value of the left property into a number value
         var x = element.style.left;
         var xArray = x.split("");
         xArray.pop();
         xArray.pop();
         x = xArray.join("");
         x = parseInt(x);
         
         // turn the string value of the width property into a number value
         var width = element.style.width;
         var wArray = width.split("");
         wArray.pop();
         wArray.pop();
         width = wArray.join("");
         width = parseInt(width);
          
        return x + (width / 2);
      },

      centerY: function(element)
      {
        // turn the string value of the top property into a number value
         var y = element.style.top;
         var yArray = y.split("");
         yArray.pop();
         yArray.pop();
         y = yArray.join("");
         y = parseInt(y);
         
         // turn the string value of the height property into a number value
         var height = element.style.height;
         var hArray = height.split("");
         hArray.pop();
         hArray.pop();
         height = hArray.join("");
         height = parseInt(height);
          
        return y + (height / 2);
      },

      halfWidth: function(element)
      {
        // turn the string value of the width property into a number value
         var width = element.style.width;
         var wArray = width.split("");
         wArray.pop();
         wArray.pop();
         width = wArray.join("");
         width = parseInt(width);
          
        return width / 2;
      },

      halfHeight: function(element)
      {
        // turn the string value of the height property into a number value
         var height = element.style.height;
         var hArray = height.split("");
         hArray.pop();
         hArray.pop();
         height = hArray.join("");
         height = parseInt(height);
          
        return height / 2;
      },

      left: function(element)
      {
        // turn the string value of the left property into a number value
         var x = element.style.left;
         var xArray = x.split("");
         xArray.pop();
         xArray.pop();
         x = xArray.join("");
         x = parseInt(x);
          
        return x;
      },

      right: function(element)
      {
        // turn the string value of the left property into a number value
         var x = element.style.left;
         var xArray = x.split("");
         xArray.pop();
         xArray.pop();
         x = xArray.join("");
         x = parseInt(x);
         
         // turn the string value of the width property into a number value
         var width = element.style.width;
         var wArray = width.split("");
         wArray.pop();
         wArray.pop();
         width = wArray.join("");
         width = parseInt(width);
          
        return x + width;
      },

      top: function(element)
      {
        // turn the string value of the top property into a number value
         var y = element.style.top;
         var yArray = y.split("");
         yArray.pop();
         yArray.pop();
         y = yArray.join("");
         y = parseInt(y);
          
        return y;
      },

      bottom: function(element)
      {
        // turn the string value of the top property into a number value
         var y = element.style.top;
         var yArray = y.split("");
         yArray.pop();
         yArray.pop();
         y = yArray.join("");
         y = parseInt(y);
         
         // turn the string value of the height property into a number value
         var height = element.style.height;
         var hArray = height.split("");
         hArray.pop();
         hArray.pop();
         height = hArray.join("");
         height = parseInt(height);
          
        return y + height;
      },
    
    create: function(){
        // create the boulder element and attach the boulder class to it
        var makeBoulder = document.createElement("div");
        makeBoulder.setAttribute("class","boulder");
        
        // set the x-axis postion, the width, and the height of the boulder
        makeBoulder.style.left = Math.floor(Math.random()*1133) + "px";
        makeBoulder.style.top = 0 + "px";
        makeBoulder.style.width = Math.floor(Math.random()*80) + 20 + "px";
        makeBoulder.style.height = makeBoulder.style.width;
        
        
        
        // attach the boulder to the screen
        document.getElementById('container').appendChild(makeBoulder);
        
        // moving the boulder down the page
        var movePosition = 0; // the starting y-axis position
        var timer2 = setInterval(function(){
            makeBoulder.style.top = movePosition + "px"
            movePosition += 2;
            if(movePosition > 450){
                // stops timers
                clearInterval(timer2);
                clearInterval(collisionTimer);
                
                // removes it from the screen
                document.getElementById('container').removeChild(makeBoulder);
                
                // counts the number of dodged boulders and displays it
                boulder.numDodged += 1;
                var dodged = document.getElementById("dodged");
                dodged.firstChild.nodeValue = boulder.numDodged;
            }
        }, Math.ceil(Math.random()*10))
        
        // hitTestCircle(); this is a modified version of the structure from Game 
        // Design with HTML5 and JavaScript chp.8 pg.451-458 by van der spuy - Circle Collisions section
        function hitTestCircle(c1,c2)
        {
          //Calculate the vector between the circles’ center points
          var vx = boulder.centerX(c1) - boulder.centerX(c2);
          var vy = boulder.centerY(c1) - boulder.centerY(c2);

          //Find the distance between the circles by calculating
          //the vector's magnitude (how long the vector is)  
          var magnitude = Math.sqrt(vx * vx + vy * vy);

          //Add together the circles' total radii
          var totalRadii = boulder.halfWidth(c1) + boulder.halfWidth(c2);

          //Set hit to true if the distance between the circles is
          //less than their totalRadii
          var hit = magnitude < totalRadii;

          return hit;
        }
        // hit sound
        var hitSound = document.getElementById("boulderHit");
        
        // run collision test on a timer
        var collisionTimer = setInterval(function(){
            var playerElement = document.getElementById("player"); // this is the player element
            
            // if(hitTestCircle()); this is a modified version of the structure from 
            // Game Design with HTML5 and JavaScript chp.8 pg.451-458 by van der spuy - Circle Collisions section
            if(hitTestCircle(makeBoulder,playerElement)){
                // make a smash sound
                hitSound.currentTime = 0;
                hitSound.play();
                
                // shows that player was hit
                if(playerElement.hasAttribute("class")){
                    // takes of class and attaches the hitPlayer class so he will make a "i got hit" face
                    playerElement.removeAttribute("class");
                    playerElement.setAttribute("class","hitPlayer");
                    
                    // drain life bar
                    healthBar.manualDrain();
                    
                    // this sets the player class back to player so his face will change back to default
                    setTimeout(function(){
                        playerElement.removeAttribute("class");
                        playerElement.setAttribute("class","player");
                    },400);
                    
                    // counts the number of boulders that hit the player and displays it
                    boulder.numHits += 1;
                    var timesHit = document.getElementById("hit");
                    timesHit.firstChild.nodeValue = boulder.numHits;
                }
    
                
                // stops timers
                clearInterval(timer2);
                clearInterval(collisionTimer);
                
                // removes it from the screen
                document.getElementById('container').removeChild(makeBoulder);
            } 
            
            console.log(playerElement);
        },1)  
    },
    
    numDodged: 0, // current number of dodged boulders
    
    numHits: 0, // current number of times hit by boulders
    
    level1: {
        numBoulders: 40, // number of boulder you need to dodge to get to the next level
        maxCreateSpeed: 0, // how the boulder will be created
        maxFallSpeed: 0, // how fast the boulders will fall
    },
    
    level2: {
        numBoulders: 40, // number of boulder you need to dodge to get to the next level
        maxCreateSpeed: 0, // how the boulder will be created
        maxFallSpeed: 0, // how fast the boulders will fall
    },

    level3: {
        numBoulders: 40, // number of boulder you need to dodge to get to the next level
        maxCreateSpeed: 0, // how the boulder will be created
        maxFallSpeed: 0, // how fast the boulders will fall
    },
}

// How can I add more modulization to the code?
// why cant I create a speed method and call the speed with boulder.speed? It keeps returning a function with no value
// why does the screen pile up with boulder when you switch windows and then when you switch back they all fall


