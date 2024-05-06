console.log("Hello Word!");

import Player from "../js/player.js";

// Grbas and define context to canvas element
const myCanvas = document.getElementById("canvas");
export const ctx = myCanvas.getContext("2d");

// Define the configs for the canvas, players and ball elements
export const config = {
  canvasWidth: 1200,
  canvasHeight: 800,
  playerWidth: 10,
  playerHeight: 80,
  playerSpeed: 10,
};

// Draw the canvas
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;

// Define players objects
const player1 = new Player(1, config); // Left side player
const player2 = new Player(-1, config); // Right side player

// Render Game
function renderGame() {
  player1.render(ctx);
  player2.render(ctx);
}

// Function to call the other funcions (creating a loop for animation and updating the canvas)
function animate() {
  renderGame();
}
animate();
