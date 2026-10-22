const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const timerText = document.getElementById("timer");
const message = document.getElementById("message");
const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");

const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");

// Game area for the meme videos
const gameVideo = document.getElementById("gameVideo");

// Player
const player = {
    x: 280,
    y: 340,
    size: 30,
    speed: 6
};

// Game settings
let rocks = [];
let keys = {};
let timeLeft = 20;
let playing = false;
let lastTime = 0;
let spawnTimer = 0;
let animationId;

// Meme video links
const winMeme =
    "https://cdn.vlipsy.com/clips/ezCCG4Sg/360p-watermark.mp4?token=v1_f_1792758440_XWDxwIxvY";

const loseMeme =
    "https://cdn.vlipsy.com/clips/KV2lyAhd/360p-watermark.mp4?token=v1_f_1792758384__zT5XAWer";

// Keyboard controls
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" ||
        event.key === "ArrowRight") {
        event.preventDefault();
        keys[event.key] = true;
    }
});

document.addEventListener("keyup", function(event) {
    keys[event.key] = false;
});

// Start or restart the game
function startGame() {
    cancelAnimationFrame(animationId);

    // Stop and remove the previous meme
    const oldVideo = gameVideo.querySelector("video");

    if (oldVideo) {
        oldVideo.pause();
        oldVideo.removeAttribute("src");
        oldVideo.load();
    }

    gameVideo.innerHTML = "";
    gameVideo.style.display = "none";
    canvas.style.visibility = "visible";

    player.x = 280;
    rocks = [];
    keys = {};
    timeLeft = 20;
    lastTime = 0;
    spawnTimer = 0;
    playing = true;

    timerText.textContent = timeLeft;
    message.textContent = "SURVIVE, BRO! 🏃";
    result.hidden = true;

    animationId = requestAnimationFrame(gameLoop);
}

// Create a falling rock
function createRock() {
    rocks.push({
        x: Math.random() * (canvas.width - 25),
        y: -25,
        size: 25,
        speed: 150 + Math.random() * 120
    });
}

// Check collision
function isHit(a, b) {
    return (
        a.x < b.x + b.size &&
        a.x + a.size > b.x &&
        a.y < b.y + b.size &&
        a.y + a.size > b.y
    );
}

// Main game loop
function gameLoop(timestamp) {
    if (!playing) return;

    const delta = lastTime
        ? Math.min((timestamp - lastTime) / 1000, 0.05)
        : 0;

    lastTime = timestamp;

    // Move the player
    if (keys["ArrowLeft"]) {
        player.x -= player.speed * 60 * delta;
    }

    if (keys["ArrowRight"]) {
        player.x += player.speed * 60 * delta;
    }

    // Keep player inside the game area
    player.x = Math.max(
        0,
        Math.min(canvas.width - player.size, player.x)
    );

    // Spawn rocks
    spawnTimer += delta;

    if (spawnTimer >= 0.6) {
        createRock();
        spawnTimer = 0;
    }

    // Move rocks
    for (let i = rocks.length - 1; i >= 0; i--) {
        rocks[i].y += rocks[i].speed * delta;

        if (rocks[i].y > canvas.height) {
            rocks.splice(i, 1);
        }
    }

    // Check collisions
    for (const rock of rocks) {
        if (isHit(player, rock)) {
            endGame(false);
            return;
        }
    }

    // Countdown
    timeLeft -= delta;
    timerText.textContent = Math.ceil(timeLeft);

    // Draw the game
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial";
    ctx.fillText("🧍", player.x, player.y + player.size);

    for (const rock of rocks) {
        ctx.fillText("🏀", rock.x, rock.y + rock.size);
    }

    // Win after surviving 20 seconds
    if (timeLeft <= 0) {
        endGame(true);
        return;
    }

    animationId = requestAnimationFrame(gameLoop);
}

// End the game and play the correct meme
function endGame(won) {
    playing = false;
    keys = {};

    cancelAnimationFrame(animationId);

    if (won) {
        resultTitle.textContent = "🏆 BRO IS HIM! 🗿";
        message.textContent = "You survived! Legendary skills!";
    } else {
        resultTitle.textContent = "💀 BRO GOT COOKED!";
        message.textContent = "Skill issue! Better luck next time.";
    }

    // Clear the game square
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Hide the canvas and show the video in its place
    canvas.style.visibility = "hidden";
    gameVideo.innerHTML = "";
    gameVideo.style.display = "block";

    // Create the winning or losing video
    const video = document.createElement("video");

    video.src = won ? winMeme : loseMeme;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";

    // Put the video inside the game square
    gameVideo.appendChild(video);

    result.hidden = false;

    // Attempt autoplay; show controls if a click is needed
    video.play().catch(function() {
        message.textContent += " Press PLAY on the video!";
    });
}

// Connect buttons
startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);