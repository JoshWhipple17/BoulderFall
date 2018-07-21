// The Health Bar Library
var healthBar = {
    // this is the id of the health bar
    id: "",
    
    // this is the percentage value for the width value
    percentageLeft: 100,
    
    // this is the amount you want to take away from the health bar
    drainAmt: 0,
    
    // this is the amount you want to add to the health bar
    healAmt: 0,
    
    // isEmpty(): returns true if the percentageLeft is equal to 0 
    // and it sets percentageLeft back to 0 if it goes under 0
    isEmpty: function(){
        if(this.percentageLeft <= 0){
            // if the percentage left is less than 0 then is sets the percentageLeft back to 0
            if(this.percentageLeft < 0){
                this.percentageLeft = 0;
                this.updateHealth();
            }
            // alert("The health bar is empty");
            return true;
        }
    },
    
    // isFull(): returns true if the percentageLeft is equal to 100 
    // and it resets the percentageLeft back to 100 if it goes over 100
    isFull: function(){
        if(this.percentageLeft >= 100){
            // if the percentage left is greater than 100 then is sets the percentageLeft back to 100
            if(this.percentageLeft > 100){
                this.percentageLeft = 100;
                this.updateHealth();
            }
            // alert("This health bar is full");
            return true;
        }
    },
    
    // manualDrain(): this takes away from the health bar everytime this is called
    manualDrain: function(){
        // it only works if the isEmpty() returns false because !false equals true
        if(!this.isEmpty()){
            this.percentageLeft -= this.drainAmt;
            this.updateHealth();
            this.isEmpty(); // this is a second check to see if the number taken 
                            //away caused the percentageLeft to be less than 0 
                            // and if so it sets percentageLeft back to 0
        }
    },
    
    // manualHeal(): this adds to the health bar everytime this is called
    manualHeal: function(){
        // it only works if the isFull() returns false because !false equals true
        if(!this.isFull()){
            this.percentageLeft += this.healAmt;
            this.updateHealth();
            this.isFull(); // this is a second check to see if the number added 
                           // caused the percentageLeft to be more than 100 and 
                           // if so it sets percentageLeft back to 100
        }
    },
    
    // this is the time speed of the auto funtions
    autoTimeLength: 1000,
    
    // autoDrain(): this drains takes away from the health bar automatically by the drainAmt
    autoDrain: function(){
        var drain = setInterval(function(){
            if(!healthBar.isEmpty()){
                healthBar.manualDrain();
            } else {
                clearInterval(drain);
            }
        }, this.autoTimeLength);
    },
    
    // autoHeal(): this adds to the health bar automatically by the healAmt
    autoHeal: function(){
        var heal = setInterval(function(){
            if(!healthBar.isFull()){
                healthBar.manualHeal();
            } else {
                clearInterval(heal);
            }
        }, this.autoTimeLength)
    },
    
    // this changes the color of the health bar as it changes
    changeColor: function(){
        if(this.percentageLeft > 70){
            document.getElementById(this.id).style.background = "green"
        } else if(this.percentageLeft <= 70 && this.percentageLeft > 30) {
            document.getElementById(this.id).style.background = "yellow";
        } else {
            document.getElementById(this.id).style.background = "red";
        }
    },
    
    // updates the health bar on the screen
    updateHealth: function(){
        this.changeColor();
        document.getElementById(this.id).style.width = this.percentageLeft + "%";
        console.log(this.percentageLeft);
    }
    
}

// can the health and the drain timer run at the same time? Can they run different speeds at the same time?
// can you check if a timer is running?