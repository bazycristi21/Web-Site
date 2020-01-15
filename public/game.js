import { Ball } from "./ball.js";
import { Paddle } from "./paddle.js";
import { InputHandler1 } from "./inputhandler1.js";
import { InputHandler2 } from "./inputhandler2.js";
import { Lifes } from "./lifes.js";
import Brick from "./bricks.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

class Game {
  constructor(nr_players) {
    this.gamestate = GAMESTATE.MENU;
    this.lifes = new Lifes(this);
    this.ball = new Ball(this);
    this.nr_players = nr_players;
    this.paddle1 = new Paddle(this);
    this.paddle1.setcolor("rgba(270, 156, 252,0.9)");
    this.loser = 0;
    this.paddle2 = new Paddle(this);
    this.paddle2.setcolor("rgba(247, 159, 31,0.9)");
    this.inputHandler2 = new InputHandler2(this.paddle2,this);
    this.score = 0;
    this.bricks = [];
    let level = [[0,1,1,1,0,0,1,1,1,0],
                   [1,1,1,1,1,1,1,1,1,1],
                   [1,1,1,1,1,1,1,1,1,1],
                   [1,1,0,0,1,1,0,0,1,1]];

      level.forEach((row, rowIndex) => {
      row.forEach((brick, brickIndex) => {
        if (brick === 1) {
          let position = {
            x: 80 * brickIndex,
            y: 80 + 24 * rowIndex
          };
          this.bricks.push(new Brick(this, position));
        }
      });
    });
    
    this.gameObjects = [];
    this.inputHandler1 = new InputHandler1(this.paddle1, this);
    this.level = this.bricks;
    console.log(this.level);
  }
  reset_position()
  {
    this.ball.reset();
    this.paddle1.position={
		x: 800 / 3*2 - this.paddle1.width / 3*2,
  
		y: 600 - this.paddle1.height - 10
      };
    this.paddle1.turn=1;
    if(this.nr_players > 1)
    {  
      this.paddle2.position={
        x: 800 / 3 - this.paddle2.width / 3,
      
        y: 600 - this.paddle2.height - 10
        };
    
    this.paddle1.turn=1;
    this.paddle2.turn=1;
    }
  }
  lose1()
  {
      this.paddle1.lives--;
      this.reset_position();
      if(this.paddle1.lives  === 0)
      {
          this.loser=1;
      }
  }
  lose2()  
  {
      this.paddle2.lives--;
      this.reset_position();
      if( this.paddle2.lives  === 0)
      {
          this.loser=2;
      }
  }
  loseboth()
  {
    this.paddle1.lives--;
    this.paddle2.lives--;
    this.reset_position();
    
    if(this.paddle1.lives === 0  &&  this.paddle2.lives === 0)
    {
        this.loser=3;
    }
    else
    {
      if( this.paddle2.lives === 0)
        {
            this.loser=2;
        }
        if(this.paddle1.lives === 0)
        {
            this.loser=1;
        }
    }
      
  }
  start() {
  
    if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.PAUSED) 
      return;
    if(this.nr_players == 1)
      this.score = 0;
    this.level = this.bricks;
    this.reset_position();
    this.gamestate = GAMESTATE.RUNNING;
    this.paddle1.lives=3;
    
    this.gameObjects = [this.ball, this.paddle1, this.lifes];
    if(this.nr_players > 1){
      this.gameObjects.push(this.paddle2);
      this.paddle2.lives=3;
    }
    
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
    if( (this.nr_players === 1 && this.paddle1.lives === 0) || (this.nrplayers > 1 && (this.paddle1.lives === 0 || this.paddle2.lives === 0))) 
      this.gamestate = GAMESTATE.GAMEOVER;
    if(this.nr_players == 1)
    {
        for(var i = 0 ; i < this.level.length; i++)
        {
          if(this.level[i] != undefined)
              this.level[i].update(deltaTime);
        }
    }
    this.ball.update(deltaTime);
    this.paddle1.update(deltaTime);
    if(this.nr_players > 1)
      this.paddle2.update(deltaTime);
  }
  draw(ctx) {
    this.gameObjects.forEach(Object => Object.draw(ctx));
    if(this.nr_players == 1)
    {
        for(var i = 0 ; i < this.level.length; i++)
        {
          if(this.level[i] != undefined)
              this.level[i].draw(ctx);
        }
    }
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
      ctx.fillText("GAME OVER", 400, 150);
      if(this.nr_players > 1)
      {
        if(this.loser == 1)
          ctx.fillText("Player 1 lose", 400,300);
        if(this.loser == 2)
          ctx.fillText("Player 2 lose", 400,300);
        if(this.loser == 3)
          ctx.fillText("Both players lose",400,300);
      }
      else{
        ctx.fillText("Score: ", 370,200);
        ctx.fillText(this.score, 470,200);
        var ok = 1;
        var name = "";
        document.addEventListener("keydown", event => {
          switch (event.keyCode) {
            default:
              {
                if(this.gamestate == GAMESTATE.GAMEOVER){
                  name = name + String.fromCharCode(event.keyCode);
                  console.log(name);
                  
                }
              }
              break;
        }});
        ctx.fillText(name, 350,300);
          
      ctx.fillText("Press SPACE to go to Menu", 400, 400);
    }
    send(this.score);
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

function send(score) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/submitScore",true);
  xhttp.setRequestHeader("Content-Type","application/json");
  xhttp.send(JSON.stringify({score:score}));
}
export { Game } ;