console.log("Hello Word!");

// Grbas and define context to canvas element
const myCanvas = document.getElementById("canvas");
const ctx = myCanvas.getContext("2d");

// Define the configs for the canvas, players and ball elements
const config = {
  canvasWidth: 1000,
  canvasHeight: 800,
  playerWidth: 10,
  playerHeight: 80,
  playerSpeed: 10,
};

// Draw the canvas
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;
