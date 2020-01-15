
import { Paddle } from "./paddle.js";
import { Game } from "./game.js";
export function detectCollision(ball, gameObject) {
    let bottomOfBall = ball.position.y + ball.size;
  
    let topOfBall = ball.position.y;
  
    let topOfObject = gameObject.position.y;
  
    let leftSideOfObject = gameObject.position.x;
  
    let rightSideOfObject = gameObject.position.x + gameObject.width;
  
    let bottomOfObject = gameObject.position.y + gameObject.height;
  
    if (
      bottomOfBall >= topOfObject &&
      topOfBall <= bottomOfObject &&
      ball.position.x >= leftSideOfObject &&
      ball.position.x + ball.size <= rightSideOfObject
    )
      return true;
    else return false;
  }


class Ball {
  constructor(game) {
    
    this.paddle1 = game.paddle1;
    this.paddle2 = game.paddle2;
    this.img = document.getElementById("img_ball");
    console.log(this.paddle2);
    this.size = 16;
    this.game = game;
    this.reset();
  }
  reset() {
    this.speed = { x: 3, y: 3 };

    this.position = { x: 200, y: 200 };
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.position.x, this.position.y, 16, 16);
  }

  update(deltaTime) {
    this.position.y += this.speed.y;
    this.position.x += this.speed.x;

    if (this.position.x + this.size > 800 || this.position.x + this.size < 0)
      this.speed.x = -this.speed.x;

    if (this.position.y + this.size > 600) {
      if(this.game.nr_players > 1)
      {
        if(this.game.paddle1.turn == 1)
        { 
          if(this.game.paddle2.turn ==0)
            this.game.lose1();
          else
            this.game.loseboth();
        }
        else  
          if(this.game.paddle2.turn == 1)
          { 
            if(this.game.paddle1.turn ==0)
              this.game.lose2();
            else
              this.game.loseboth();
          }
        this.reset();
      }
      else{
        this.game.lose1();
      }
    }
    if (this.position.y + this.size < 0) this.speed.y = -this.speed.y;

    if(detectCollision(this,this.game.paddle1) && this.game.paddle1.turn==1)
    {
      this.speed.x +=1;
      this.speed.y +=1;
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle1.position.y - this.size;
      
      if(this.game.nr_players > 1){
        this.game.paddle1.turn=0;
        this.game.paddle2.turn=1;
      }
    }
    console.log(this.paddle2);
    if(this.game.nr_player > 1){
      console.log(this.game.paddle2.turn);
        if(detectCollision(this,this.game.paddle2) && this.game.paddle2.turn==1)
            {
                this.speed.x +=1;
                this.speed.y +=1;
                this.speed.y = -this.speed.y;
                this.position.y = this.game.paddle2.position.y - this.size;
                this.game.paddle2.turn=0;
                this.game.paddle1.turn=1;
            }
        }
      }
  }

export { Ball };


////

