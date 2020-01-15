import { Paddle } from "./paddle.js";
import { Game } from "./game.js";
const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER: 3
  };
class InputHandler1 {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
        case 27: //ESC
          game.togglePause();
          break;
        case 83: // s
          if(game.gamestate == GAMESTATE.MENU )
          {
            game.paddle1.lives = 3;
            game.start();
          }
          break;
     
        case 32: // SPACE
          if(game.gamestate == GAMESTATE.GAMEOVER)
            game.gamestate = GAMESTATE.MENU;
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}

export { InputHandler1 };