// Import the canvas context and config object from main.js
import { ctx, config } from "../js/main.js";

// Export the class with all the player controls and game functions
export default class Player {
  // Direction indicates the left and right side players
  constructor(direction) {
    this.direction = direction;
    direction === 1
      ? (this.x = 50)
      : (this.x = config.canvasWidth - config.playerWidth - 50);
    this.y = config.canvasHeight / 2 - config.playerHeight / 2;
    this.score = 0;
  }

  // Functino to render the players on the canvas
  renderPlayer() {
    ctx.fillStyle = "#fdfdfd";
    ctx.fillRect(this.x, this.y, config.playerWidth, config.playerHeight);
    ctx.font = "50px Poppins";
    ctx.fillText(this.score, config.canvasWidth / 2 + 200 * this.direction, 50);
  }

  moveUp() {
    this.y -= config.playerSpeed;
    this.y < 0 && (this.y = 0);
  }

  moveDown() {
    this.y += config.playerSpeed;
    this.y + config.playerHeight > config.canvasHeight &&
      (this.y = config.canvasHeight - config.playerHeight);
  }
}
