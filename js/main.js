console.log("Hello Word!");

// Import Player class from player.js
import Player from "../js/player.js";

// Grabs canvas element and define context for it
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
const player1 = new Player(1); // Left side player
const player2 = new Player(-1); // Right side player

// Render Game
function renderGame() {
  player1.renderPlayer();
  player2.renderPlayer();
  // Render Ball
}

// Function to call the other funcions (creating a loop for animation and updating the canvas)
function animate() {
  renderGame();
}
animate();
