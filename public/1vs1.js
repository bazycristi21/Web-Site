import { Game } from "./game.js";


window.open("howtoplay");
let imgBall = document.getElementById("img_ball");
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const Game_width = 800;
const Game_height = 600;

let game = new Game(2);

let lastTime = 0;

// images

function gameloop(timestamp) {
  let deltaTime = timestamp - lastTime;

  lastTime = timestamp;

  ctx.clearRect(0, 0, 800, 600);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameloop);
}

requestAnimationFrame(gameloop);

	
	

