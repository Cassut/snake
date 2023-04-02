const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

// c.width = rows * block;
// c.height = columns * block;
// drawBoard();
/* variables */
let block = 25;
let rows = 20;
let columns = 20;
let snakeX;
let snakeY;
let appleX;
let appleY;
let gameOver = false;
let gameStatus;
let direction;
let snakeBody = [];

/* sets random location for start and apple */
function randomLoc() {
  let xcord = Math.floor(Math.random() * rows) * block;
  let ycord = Math.floor(Math.random() * columns) * block;
  return [xcord, ycord];
}

function initGame() {
  [appleX, appleY] = randomLoc();
  [snakeX, snakeY] = randomLoc();
  // update();
  gameStatus = setInterval(drawBoard, 100);
  // drawBoard();
}

function drawBoard() {
  if (gameOver) {
    alert("game over");
    return;
  }

  canvas.width = rows * block;
  canvas.height = columns * block;
  c.clearRect(0, 0, canvas.width, canvas.height);
  /* playing field */
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  /* apple */
  c.fillStyle = "red";
  c.fillRect(appleX, appleY, block, block);

  /* fires when apple is eaten */
  if (snakeX === appleX && snakeY === appleY) {
    snakeBody.push([appleX, appleY]);
    [appleX, appleY] = randomLoc();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  /* snake head */
  c.fillStyle = "green";

  if (direction === "up") {
    snakeY -= block;
  } else if (direction === "down") {
    snakeY += block;
  } else if (direction === "right") {
    snakeX += block;
  } else if (direction === "left") {
    snakeX -= block;
  }

  if (
    snakeX < 0 ||
    snakeX > block * columns ||
    snakeY < 0 ||
    snakeY > rows * block
  ) {
    gameOver = true;
    clearInterval(gameStatus);
    console.log("game over");
  }

  c.fillRect(snakeX, snakeY, block, block);

  snakeBody.forEach((body) => {
    c.fillRect(body[0], body[1], block, block);
    if (snakeX === body[0] && snakeY === body[1]) {
      gameOver = true;
      console.log("Game Over");
    }
  });
}

// function update() {
//   /* game board printing */
//   drawBoard();
//   gameStatus = setTimeout(update, 100);
// }

document.addEventListener("keyup", function (event) {
  if (event.code === "ArrowUp" && direction != "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction != "up") {
    direction = "down";
  } else if (event.code === "ArrowRight" && direction != "left") {
    direction = "right";
  } else if (event.code === "ArrowLeft" && direction != "right") {
    direction = "left";
  }

  if (event.code === "Escape") {
    // clearTimeout(gameStatus);
  }
});

initGame();
