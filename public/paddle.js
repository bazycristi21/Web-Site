

class Paddle {
	constructor(gameWidth, gameHeight) {
	  this.width = 150;
  
	  this.height = 25;
	
	  this.maxSpeed = 8;
	  this.turn =1;
	  this.speed = 0;
	  this.lives=3;
      this.color="blue";
	  this.position = {
		x: 800 / 2 - this.width / 2,
  
		y: 600 - this.height - 10
	  };
	}
	setcolor(color)
	{
		this.color=color;

	}
	draw(ctx) {	
		if(this.turn==1)
			ctx.fillStyle = 'rgb(220,20,60,0.5)';
		else
			ctx.fillStyle = this.color;
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		
	}
	moveLeft() {
	  this.speed = -this.maxSpeed;
	}
	moveRight() {
	  this.speed = this.maxSpeed;
	}
	stop() {
	  this.speed = 0;
	}
	update(deltaTime) {
	  this.position.x += this.speed;
  
	  if (this.position.x < 0) this.position.x = 0;
  
	  if (this.position.x + this.width > 800) 
	  	this.position.x = 800 - this.width;
	}
  }
  export { Paddle };