import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
import { InputHandler1 } from "./inputhandler1.js";
import { InputHandler2 } from "./inputhandler2.js";
import { Lifes } from "./lifes.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

class Game_single {
  constructor() {
    this.gamestate = GAMESTATE.MENU;
    this.lifes = new Lifes(this,1);
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.paddle.setcolor("rgba(270, 156, 252,0.9)");
    this.inputHandler1 = new InputHandler1(this.paddle1, this);
    this.gameObjects = [];
    this.loser = 0 ;
    this.bricks = [];
    this.score = 0 ;
  }
  reset_position()
  {
      this.paddle.position={
		x: 800 / 3*2 - this.paddle1.width / 3*2,
  
		y: 600 - this.paddle1.height - 10
      };
  }
  lose()
  {
      this.paddle.lives--;
      this.reset_position();
      if(this.paddle.lives  === 0)
      {
          this.loser=1;
      }
  }
  start() {
    if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.PAUSED) 
      return;
    
    this.gamestate = GAMESTATE.RUNNING;
    this.paddle.lives=3;
    this.gameObjects = [this.ball, this.paddle1, this.lifes];
  }
  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } 
    else 
      this.gamestate = GAMESTATE.PAUSED;
  }
  update(deltaTime) {
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;
    if (this.paddle.lives === 0 ) 
      this.gamestate = GAMESTATE.GAMEOVER;
   
    this.ball.update(deltaTime);
    this.paddle.update(deltaTime);
  }
  draw(ctx) {
    this.gameObjects.forEach(Object => Object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, 800, 600);
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", 400, 300);
      ctx.fillText("Press S to continue", 400, 400);
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      
      ctx.rect(0, 0, 800, 600);
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", 400, 200);
      

      ctx.fillText("Press SPACE to go to Menu", 400, 400);
      
    }
    if (this.gamestate === GAMESTATE.MENU) {
      
      ctx.rect(0, 0, 800, 600);
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press S to start", 400, 300);
      
    }
  }
}

export { Game_single } ;
