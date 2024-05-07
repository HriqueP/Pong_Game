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

// Draw line in the middle
function createLine() {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#fdfdfd";
  ctx.setLineDash([20, 10]);
  ctx.moveTo(config.canvasWidth / 2, 0);
  ctx.lineTo(config.canvasWidth / 2, config.canvasHeight);
  ctx.stroke();
}

// Define players objects
const player1 = new Player(1); // Left side player
const player2 = new Player(-1); // Right side player

/* 
Controller Object (key-value) 
key => key pressed on the keybord
value => object with 2 key-value pairs
  key 1 => pressed (indicates if the key is pressed)
  key 2 => func (indicates which function to execute if the 'pressed' key = true )

moveUp and moveDown are been used as callback functions here so the bind() method is necessary
*/
const controller = {
  w: { pressed: false, func: player1.moveUp.bind(player1) }, // Binding the method to player1 using the .bind(obj) method
  s: { pressed: false, func: player1.moveDown.bind(player1) }, // Binding the method to player1 using the .bind(obj) method
  ArrowUp: { pressed: false, func: player2.moveUp.bind(player2) }, // Binding the method to player2 using the .bind(obj) method
  ArrowDown: { pressed: false, func: player2.moveDown.bind(player2) }, // Binding the method to player2 using the .bind(obj) method
};

// Event listener for the keydown event (set 'pressed' to TRUE )
document.addEventListener("keydown", (e) => {
  // Same as if(e.key in controller){}
  if (controller[e.key]) {
    controller[e.key].pressed = true;
  }
});

// Event listener for the keyup event (set 'pressed' to FALSE )
document.addEventListener("keyup", (e) => {
  // Same as if(e.key in controller){}
  if (controller[e.key]) {
    controller[e.key].pressed = false;
  }
});

function handleMoves() {
  // element is equal to the controller key
  Object.keys(controller).forEach((element) => {
    // if true && execute action;
    controller[element].pressed && controller[element].func(); // Syntax commonly used in game development
  });
}

// Render players and ball in the canvas
function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createLine();
  player1.renderPlayer();
  player2.renderPlayer();
  // Render Ball
}

// Function to call the other funcions (creating a loop for animation and updating the canvas)
function animate() {
  handleMoves();
  renderGame();
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
