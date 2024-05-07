## Pong Game 🏓

The classic Pong Game.

<div>
  <img src="#"/>
</div>

### Technologies Used

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" width="30" height="30"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" width="30" height="30" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" width="30" height="30" />
</div>

## Notes

- **Handling multiple key pressed at once**

  The solution involves tracking keyup events as well as keydown events!. So this pattern works in three steps:

  - Create a controller object to track each key that’s pressed down, as well as the function to be executed for each key while that key is pressed down.

    ```javascript
    /* 
    Controller Object (key-value) 
    key => key pressed on the keybord
    value => object with 2 key-value pairs
      key 1 => pressed (indicates if the key is pressed)
      key 2 => func (indicates which function to execute if the 'pressed' key = true )
    
    moveUp and moveDown are been used as callback functions here so the bind() method is necessary
    
    By binding the 'this' context of the method to the instance of the class, when the moveUp() function is called as a callback, this will 
    correctly refer to the instance of the class, 
    and you should be able to access this.y without encountering undefined.
    */
    const controller = {
      w: { pressed: false, func: player1.moveUp.bind(player1) }, // Binding the method to player1 using the .bind(obj) method
      s: { pressed: false, func: player1.moveDown.bind(player1) }, // Binding the method to player1 using the .bind(obj) method
      ArrowUp: { pressed: false, func: player2.moveUp.bind(player2) }, // Binding the method to player2 using the .bind(obj) method
      ArrowDown: { pressed: false, func: player2.moveDown.bind(player2) }, // Binding the method to player2 using the .bind(obj) method
    };
    ```

  - Build two event listeners, one for keydown and one for keyup, that updates the controller object whenever a key is initially pressed down, and when that key becomes unpressed.

    ```javascript
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
    ```

  - Define a function that calls every function whose key is currently tracked as pressed in that controller, and call that function in your animation function.
    ```javascript
    function handleMoves() {
      // element is equal to the controller key
      Object.keys(controller).forEach((element) => {
        // if true && execute action;
        controller[element].pressed && controller[element].func(); // Syntax commonly used in game development
      });
    }
    ```

<br/><br/>

- **Details about drawing in a canvas**

  ```javascript
  // First Code (Right)
  renderPlayer() {
    ctx.fillStyle = "#fdfdfd";
    ctx.fillRect(this.x, this.y, config.playerWidth, config.playerHeight);
    ctx.font = "50px Poppins";
    ctx.fillText(this.score, config.canvasWidth / 2 + 200 * this.direction, 50);
  }

  // Second Code (Wrong)
  renderPlayer() {
    ctx.font = "50px Poppins";
    ctx.fillText(this.score, config.canvasWidth / 2 + 200 * this.direction, 50);
    ctx.fillStyle = "#fdfdfd";
    ctx.fillRect(this.x, this.y, config.playerWidth, config.playerHeight);
  }

  /*
  The difference in the order of operations results in a different visual outcome because
  drawing operations in the canvas are not transparent. Each drawing operation covers whatever was drawn before it.

  So, depending on which operation comes first in the code, it will be rendered at the bottom layer,
  and subsequent drawing operations will be rendered on top of it. Therefore, the order of operations in the code
  determines the visual stacking order of the rendered elements on the canvas.
  */
  ```

<br/><br/>

- **moveUp and moveDown**

  ```javascript
  moveUp() {
    this.y -= config.playerSpeed;
    this.y < 0 && (this.y = 0);
  }
  /*
  1. this.y -= config.playerSpeed;: This line decrements the y coordinate of the player upwards by config.playerSpeed units. This implies that the player is moving up on the canvas.

  2. this.y < 0: This condition checks if the top edge of the player (given by this.y) has reached or exceeded the top edge of the canvas (0).

  3. &&: This is a logical AND operator. It ensures that both the previous condition and the following action are executed only if the condition evaluates to true.

  4. (this.y = 0);: This expression sets the y coordinate of the player to ensure that it stays within the bounds of the canvas. If the player has moved up to a position where its top edge is above the canvas, this line of code adjusts its y coordinate so that it is positioned at the top edge of the canvas, ensuring that the entire player is visible on the canvas without any part extending beyond its top edge.

  In summary, the moveUp() method moves the player upwards by a specified speed (config.playerSpeed) and ensures that the player stays within the bounds of the canvas, preventing it from moving beyond the top edge of the canvas.
  */
  ```

  ```javascript
  moveDown() {
    this.y += config.playerSpeed;
    this.y + config.playerHeight > config.canvasHeight &&
      (this.y = config.canvasHeight - config.playerHeight);
  }
  /*
  1. this.y += config.playerSpeed;: This line increments the y coordinate of the player downwards by config.playerSpeed units. This implies that the player is moving down on the canvas.

  2. this.y + config.playerHeight > config.canvasHeight: This condition checks if the bottom edge of the player (given by this.y + config.playerHeight) has reached or exceeded the bottom edge of the canvas (given by config.canvasHeight).

  3. &&: This is a logical AND operator. It ensures that both the previous condition and the following action are executed only if the condition evaluates to true.

  4. (this.y = config.canvasHeight - config.playerHeight);: This expression sets the y coordinate of the player to ensure that it stays within the bounds of the canvas. If the player has moved down to a position where its bottom edge exceeds the canvas height, this line of code adjusts its y coordinate so that it is positioned at the bottom edge of the canvas, ensuring that the entire player is visible on the canvas without any part extending beyond its bottom edge.

  In summary, the moveDown() method moves the player downwards by a specified speed (config.playerSpeed) and ensures that the player stays within the bounds of the canvas, preventing it from moving beyond the bottom edge of the canvas.
  */
  ```

<br/><br/>

```javascript

```

<br/><br/>

```javascript

```

<br/><br/>

```javascript

```
