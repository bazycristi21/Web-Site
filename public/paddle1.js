class Paddle1{
	constructor(gameWidth, gameHeight){
		this.width = 120;
		this.height = 24;
		this.gameWidth=gameWidth;
		this.gameHeight=gameHeight;
		this.maxSpeed = 7;
		this.speed = 0;
		
		this.position = {
			x:gameWidth/3 - this.width/3,
		y:gameHeight - this.height - 10};
	}
	
	draw(ctx){
		ctx.fillStyle = '#0f0';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		
	}
	update(deltaTime){
		if (!deltaTime) 
			return;
		
		this.position.x +=this.speed;
		
		if(this.position.x <0)
			this.position.x=0;
		if(this.position.x > this.gameWidth-this.width)
			this.position.x=this.gameWidth-this.width;
			
	}
	moveleft()
	{
		this.speed=-this.maxSpeed;
	}
	moveright()
	{
		this.speed=this.maxSpeed;
	}
	stop(){
		this.speed=0;
	}
}

module.export="Paddle";