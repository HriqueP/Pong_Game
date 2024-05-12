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
  playerHeight: 100,
  playerSpeed: 10,
  ballXSpeed: 8,
  ballYSpeed: 8,
  ballSlice: 4,
};

// Draw the canvas
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;

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

const ball = {
  r: 8,
};

function placeBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 0;
  ball.dy = 0;
  setTimeout(() => {
    ball.dx = config.ballXSpeed * Math.sign(Math.random() - 0.5);
    ball.dy = config.ballYSpeed * Math.sign(Math.random() - 0.5);
  }, 1000);
}
placeBall();

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

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function wallsCollisions() {
  if (ball.y - ball.r <= 0 || ball.y + ball.r >= canvas.height) {
    ball.dy = ball.dy * -1;
  }
}

function bouceBall(player) {
  ball.dx = -1 * ball.dx;
  ball.x += Math.sign(ball.dx) * 8;
  ball.dy = (ball.y - (player.y + config.playerHeight / 2)) / config.ballSlice;
}

function playerCollision() {
  if (ball.x - ball.r <= config.playerWidth) {
    if (player1.checkCollision(ball)) {
      bouceBall(player1);
    }
  }
  if (ball.x + ball.r >= canvas.width - config.playerWidth) {
    if (player2.checkCollision(ball)) {
      bouceBall(player2);
    }
  }
}

function checkWin() {
  if (ball.x + ball.r <= 0) {
    scorePoint(player1);
  }

  if (ball.x - ball.r >= canvas.width) {
    scorePoint(player2);
  }
}

function scorePoint(player) {
  placeBall();
  player.win();
}

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#fdfdfd";
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.stroke();
}

// Render players and ball in the canvas
function renderGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player1.renderPlayer();
  player2.renderPlayer();
  drawBall();
}

// Function to call the other funcions (creating a loop for animation and updating the canvas)
function animate() {
  renderGame();
  handleMoves();
  wallsCollisions();
  playerCollision();
  checkWin();
  moveBall();
  window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);
