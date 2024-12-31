class Platform{
    constructor(x,y,height,width,color,speed){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;

        this.color=color;
        
        this.speed=speed;
      }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    } 
    
    delete(){
        ctx.clearRect(this.x, this.y, this.width, this.height);
        this.height = 0;
        this.width = 0;
    }

    move(direction){
        ctx.clearRect(this.x, this.y, this.width, this.height);
        if (direction == 'left') {
            this.x -= this.speed;
        }else if (direction == 'right') {
            this.x += this.speed;
        }

        // Ograniczenia, aby platforma nie wyjeżdżała poza granice planszy
        if(this.x < 7) {
            this.x = 7;
        }else if(this.x > map.width - this.width - 7) {
            this.x = map.width - this.width - 7;
        }
    }
}