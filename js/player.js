import { ctx, config } from "../js/main.js";

// Export the class which has all the player controls
export default class Player {
  // Direction indicates the left and right side players
  constructor(direction, config) {
    this.direction = direction;
    direction === 1
      ? (this.x = 0 + 50)
      : (this.x = config.canvasWidth - config.playerWidth - 50);
    this.y = config.canvasHeight / 2 - config.playerHeight / 2;
    this.score = 0;
  }

  render() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x, this.y, config.playerWidth, config.playerHeight);
  }
}
