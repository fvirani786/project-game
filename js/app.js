const board = document.getElementById("game-board");
const gridSize = 20;
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let ball = { x: 5, y: 5 };
let score = 0;
let direction = "right";
let gameLoop;
let gameStarted = false;

function drawSnake() {
    board.innerHTML = "";
    snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.left = segment.x * gridSize + "px";
        snakeElement.style.top = segment.y * gridSize + "px";
        board.appendChild(snakeElement);
    });
}

function drawBall() {
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball");
    ballElement.style.left = ball.x * gridSize + "px";
    ballElement.style.top = ball.y * gridSize + "px";
    ballElement.style.backgroundColor = "red"; // Set ball color to black
    ballElement.style.border = "2px solid black"; // Add a white border to the ball

    // Append the ball element to the board after all other elements are drawn
    setTimeout(() => {
        board.appendChild(ballElement);
    }, 0);
}

function getComplementaryColor(color) {
    const rgb = color.match(/\d+/g);
    const complementaryRgb = rgb.map(value => 255 - parseInt(value));
    return `rgb(${complementaryRgb.join(',')})`;
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    // Draw the ball before updating the snake's position
    drawBall();

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    if (head.x === ball.x && head.y === ball.y) {
        score += 100;
        document.getElementById("score").innerText = `Score: ${score}`;
        generateBall();
        
        // Change the color of the snake
        changeSnakeColor();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        gameOver();
    }

    drawSnake();
}

function generateBall() {
    let x, y;
    do {
        x = Math.floor(Math.random() * boardSize);
        y = Math.floor(Math.random() * boardSize);
    } while (snake.some(segment => segment.x === x && segment.y === y));

    ball.x = x;
    ball.y = y;
}

function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your Score: ${score}`);
    resetGame();
}

function startGame() {
    gameStarted = true;
    document.getElementById("start-btn").innerText = "Restart";
    document.getElementById("start-btn").classList.add("glow"); // Add glow effect
    gameLoop = setInterval(moveSnake, 100);
    generateBall();
    textcontent = "Many more apples";
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    ball = { x: 5, y: 5 };
    score = 0;
    direction = "right";
    document.getElementById("score").innerText = `Score: ${score}`;
    gameStarted = false;
    document.getElementById("start-btn").innerText = "Start";
    document.getElementById("start-btn").classList.remove("glow"); // Remove glow effect
    drawSnake();
    generateBall();
}

document.addEventListener("keydown", event => {
    if (!gameStarted) return;

    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
    }
});

document.getElementById("start-btn").addEventListener("click", () => {
    if (!gameStarted) {
        startGame();
    } else {
        clearInterval(gameLoop);
        resetGame();
    }
});

function changeSnakeColor() {
    // Get a random color
    const randomColor = getRandomColor();
    
    // Apply the color to each segment of the snake
    const snakeSegments = document.querySelectorAll(".snake");
    snakeSegments.forEach(segment => {
        segment.style.backgroundColor = randomColor;
    });
}

function getRandomColor() {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Return the color in CSS format
    return `rgb(${r},${g},${b})`;
}






  
  
  