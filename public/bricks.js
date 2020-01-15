import { detectCollision } from "./ball.js";

export default class Brick {
  constructor(game, position) {
    this.img = document.getElementById("img_brick");
    this.width = 80;
    this.height = 24;
    this.position = position;
    this.time = 0 ;
    this.game = game;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    if(this.markedForDeletion == false)
        if (detectCollision(this.game.ball, this)) {
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
            this.time = performance.now();
            this.game.score += 10;
        }
    if(performance.now() - this.time > 10000)
    {
        this.markedForDeletion = false;
    }
  }
  draw(ctx) {
        if(this.markedForDeletion === false)
            ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    }
}
