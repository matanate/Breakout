document.addEventListener("DOMContentLoaded", function () {
  // Get the paddle ball and canvas elements
  const paddle = document.getElementById("breakout-paddle");
  const ball = document.getElementById("breakout-ball");

  // Store the blocks in an array
  const blocks = document.querySelectorAll(".block");
  const scoreDisplay = document
    .getElementById("score")
    .getElementsByTagName("span")[0];
  const livesDisplay = document
    .getElementById("lives")
    .getElementsByTagName("span")[0];

  paddle.parentElement.style.position = "relative"; // Set the container position to relative
  paddle.style.position = "absolute"; // Set the paddle position to absolute
  ball.style.position = "absolute"; // Set the ball position to absolute

  // Set initial paddle and ball positions arguments
  let paddleX;
  let ballX;
  let ballY;
  let ballSpeedX;
  let ballSpeedY;

  // Set game state variables
  let isTopHit = false;
  let paddleHitCount = 0;
  let isOrangeHit = false;
  let isRedHit = false;
  let isBlockCleared = false;
  let isSecondBlocks = false;
  let gameIsOn = true;

  // Set the initial score
  let score = 0;

  resetPosition();
  // Event listener for mouse movement within the paddle's container
  paddle.parentElement.addEventListener("mousemove", updatePaddlePosition);

  // Start the game loop
  gameLoop();

  // Initial setup
  function resetPosition() {
    const canvasRect = paddle.parentElement.getBoundingClientRect();
    // Set initial paddle and ball positions
    paddleX = canvasRect.right / 2; // Adjust the initial paddle position as needed
    ballX = (canvasRect.right - canvasRect.left + ball.clientWidth) / 3; // Adjust the initial ball position as needed
    ballY = (canvasRect.bottom - canvasRect.top + ball.clientHeight) / 1.9; // Adjust the initial ball position as needed
    ballSpeedX = 0; // Adjust the initial horizontal speed as needed
    ballSpeedY = 0; // Adjust the initial vertical speed as needed
    updatePaddlePosition({ clientX: paddleX }); // Initialize the paddle position

    isTopHit = false;
    paddleHitCount = 0;
    isOrangeHit = false;
    isRedHit = false;
    paddle.style.width = "30%";

    // Update the ball's position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    setTimeout(() => {
      ballSpeedX = 2; // Adjust the initial horizontal speed as needed
      ballSpeedY = 2; // Adjust the initial vertical speed as needed
    }, 2000);
  }

  // Update paddle position based on mouse movement
  function updatePaddlePosition(event) {
    const canvasRect = paddle.parentElement.getBoundingClientRect();
    const mouseX = event.clientX - canvasRect.left;

    // Calculate the left position so that the center of the paddle aligns with the mouse
    paddleX = mouseX - paddle.clientWidth / 2;

    // Ensure the paddle stays within the canvas bounds
    paddleX = Math.max(
      0,
      Math.min(canvasRect.width - paddle.clientWidth, paddleX)
    );

    // Update the paddle's left position
    paddle.style.left = `${paddleX}px`;
  }

  // Update ball position and handle collisions
  function updateBallPosition() {
    const canvasRect = ball.parentElement.getBoundingClientRect();
    isBlockCleared = true;
    // Check for collisions with blocks
    blocks.forEach((block) => {
      if (block.style.visibility !== "hidden") {
        const blockRect = block.getBoundingClientRect();
        isBlockCleared = false;
        // Check for collision with block and bounce to the correct direction
        if (
          ballX + canvasRect.left + ball.clientWidth >= blockRect.left &&
          ballX + canvasRect.left <= blockRect.right &&
          ballY + canvasRect.top + ball.clientHeight >= blockRect.top &&
          ballY + canvasRect.top <= blockRect.bottom
        ) {
          if (
            ballY + canvasRect.top + ball.clientHeight / 2 >= blockRect.top &&
            ballY + canvasRect.top + ball.clientHeight / 2 <= blockRect.bottom
          ) {
            ballSpeedX = -ballSpeedX; // Bounce horizontally
          } else {
            ballSpeedY = -ballSpeedY; // Bounce vertically
          }
          block.style.visibility = "hidden";
          if (
            !isOrangeHit &&
            getComputedStyle(block).backgroundColor == "rgb(255, 165, 0)"
          ) {
            isOrangeHit = true;
            ballSpeedX += Math.sign(ballSpeedX);
            ballSpeedY += Math.sign(ballSpeedY);
          }
          if (
            !isRedHit &&
            getComputedStyle(block).backgroundColor == "rgb(255, 0, 0)"
          ) {
            isRedHit = true;
            ballSpeedX += Math.sign(ballSpeedX);
            ballSpeedY += Math.sign(ballSpeedY);
          }

          if (getComputedStyle(block).backgroundColor == "rgb(255, 0, 0)") {
            score += 7;
          } else if (
            getComputedStyle(block).backgroundColor == "rgb(255, 165, 0)"
          ) {
            score += 5;
          } else if (
            getComputedStyle(block).backgroundColor == "rgb(0, 128, 0)"
          ) {
            score += 3;
          } else if (
            getComputedStyle(block).backgroundColor == "rgb(255, 255, 0)"
          ) {
            score += 1;
          }
          scoreDisplay.innerHTML = score;
        }
      }
    });
    if (isBlockCleared && isSecondBlocks == false) {
      blocks.forEach((block) => {
        block.style.visibility = "visible";
      });
      isSecondBlocks = true;
      resetPosition();
    } else if (isBlockCleared && isSecondBlocks == true) {
      endGame();
    }

    // Check for collision with the canvas boundaries
    if (ballX <= 0 || ballX >= canvasRect.width - ball.clientWidth) {
      ballSpeedX = -ballSpeedX; // Bounce horizontally
    }

    if (ballY <= 0) {
      ballSpeedY = -ballSpeedY; // Bounce vertically
      if (!isTopHit) {
        isTopHit = true;
        paddle.style.width = `${parseFloat(paddle.style.width) / 2}%`;
      }
    }
    if (ballY >= canvasRect.height - ball.clientHeight) {
      ballSpeedX = 0;
      ballSpeedY = 0;
      resetPosition();
      livesDisplay.innerHTML = livesDisplay.innerHTML.slice(0, -1);
      if (livesDisplay.innerHTML == "") {
        endGame();
      }
    }
    // Check for collision with the paddle
    if (
      ballX + ball.clientWidth >= paddleX &&
      ballX <= paddleX + paddle.clientWidth &&
      ballY + ball.clientHeight >= canvasRect.height * 0.9 &&
      ballY <= canvasRect.height * 0.9
    ) {
      // Calculate the relative position of the ball on the paddle
      const relativeBallX = ballX - paddleX + ball.clientWidth / 2;

      // Calculate the normalized value between -1 and 1 based on the relative position
      const normalizedRelativeBallX =
        relativeBallX / (paddle.clientWidth / 2) - 1;

      // Adjust the ball's vertical speed based on the normalized relative position
      ballSpeedY = -Math.abs(ballSpeedY); // Bounce vertically
      ballSpeedX = normalizedRelativeBallX * 5; // Adjust the horizontal speed based on the relative position

      paddleHitCount += 1;
      if (paddleHitCount == 4 || paddleHitCount == 12) {
        ballSpeedX += Math.sign(ballSpeedX);
        ballSpeedY += Math.sign(ballSpeedY);
      }
    }

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Update the ball's position
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
  }

  // Game loop
  function gameLoop() {
    updateBallPosition();
    if (gameIsOn) {
      requestAnimationFrame(gameLoop);
    }
  }
});

// End Game
function endGame() {
  gameIsOn = false;
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it: POST-request for the /result route
  xhr.open("POST", "/result", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Callback function when the state changes
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Update the window with the result.html content
      document.body.innerHTML = xhr.responseText;
    }
  };
  // Send the request with the 'score' data
  xhr.send("score=" + score);
}
