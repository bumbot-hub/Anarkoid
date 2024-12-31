class Ball{
    constructor(x,y,r,color,speed,gravity,direction){
        this.x=x;
        this.y=y;
        this.r=r;

        this.color=color;

        this.speed=speed;
        this.gravity=gravity;
        this.direction=direction;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
        ctx.fill();
    }

    delete(){
        ctx.clearRect(this.x - this.r-5, this.y - this.r-5, this.r * Math.PI, this.r * Math.PI);
        this.speed = 0;
        this.r =0;
    }

    move(){
        if(this.y + this.r > map.height){
            stopGame();
            gameEnded = true;
            return;
        }

        let platformCenter = player.x + player.width /2;
        let diff = Math.abs(this.x - platformCenter);     //środek platformy
        let maxDistance = player.width/2;                //max odległość (im dłuższa tym mniejszy kąt)
        let angle= (diff/maxDistance) * (Math.PI / 4);  //kąt odbicia piłki
        switch(this.checkCollision()){
            case 'g':
                    // Do odbicia używamy funkcji tangens ponieważ chcemy wyyliczyć wart. kąta używając dwóch przeciwprostokątnych
                    if (this.x < player.x + player.width / 2) {
                        this.direction = Math.tan(angle); // Odbicie w lewo
                    } else {
                        this.direction = -Math.tan(angle); // Odbicie w prawo
                    }
                    this.gravity = -this.gravity 
                break;
            case 'w':
                this.direction = -this.direction;
                break;
            case 't':
                this.gravity = -this.gravity;
                break;
        }

        this.y -= this.gravity*this.speed;
        this.x -= this.direction;

        ctx.clearRect(this.x - this.r-5, this.y - this.r-5, this.r * Math.PI, this.r * Math.PI);
        this.draw();
    }

    checkCollision(){
        //sprawdzam kolizję z graczem
        if(this.x-this.r >= player.x-2*this.r &&                  //lewy najdalszy punkt piłki >= x gracza (początek platformy) - średnica piłki 
           this.x+this.r <= player.x+player.width+2*this.r &&
           this.y-this.r < player.y+this.r &&
           this.y+this.r > player.y+player.height){
            return 'g';
        }   
        //sprawdzam kolizję ze
        else if(this.x-this.r <= 0 || this.x+this.r >= map.width){
             return 'w';
        }   
        //sprawdzam kolizję z sufitem
        else if(this.y-this.r <= 0){
            return 't';
        }
        //sprawdzam kolizję z blokami XD
        for(let row=0;row<blockGrid.length;row++){
            for(let col=0;col<blockGrid[row].length;col++){
                const block = blockGrid[row][col];
                if(this.x-this.r >= block.x - this.r - 7 &&
                   this.x+this.r <= block.x + BLOCK_WIDTH +this.r + 7 &&
                   this.y-this.r >= block.y - 7 &&
                   this.y+this.r <= block.y + BLOCK_WIDTH - this.r
                   ){
                    if(this.gravity>0){
                        this.gravity = -this.gravity;
                    }
                    block.durability --;
                    points += 100;
                    
                    switch(block.durability){
                        case 2:
                            block.color =  "hsl(332, 100%, 60%)";
                            break;
                        case 1:
                            block.color =  "hsl(332, 100%, 50%)";
                            break;
                    }
                    block.draw(ctx);
                    if(block.durability===0){
                        blockGrid[row].splice(col,1);
                        block.destroy(ctx);
                    }
                    }
                }
            }
        }
}