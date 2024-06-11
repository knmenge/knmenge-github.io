document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('flappyBirdCanvas');
    const ctx = canvas.getContext('2d');

    const birdImage = new Image();
    birdImage.src = './img_aud_txt_files/birb.png'; // Add your bird image path here

    const bird = {
        x: 50,
        y: 150,
        width: 20, // Adjust width according to your bird image
        height: 20, // Adjust height according to your bird image
        gravity: 0.3,
        lift: -5,
        velocity: 0
    };

    let pipes = [];
    const pipeWidth = 20;
    const pipeGap = 100;
    let frame = 0;
    let animationFrameId;
    let score = 0;
    let gameStarted = false;
    let isMuted = false;

    const backgroundImage = new Image();
    backgroundImage.src = './img_aud_txt_files/IMG_background.jpg'; // Add your background image path here

    const hitSound = new Audio('./img_aud_txt_files/lostGame.wav');
    const pointSound = new Audio('./img_aud_txt_files/ping.flac');
    const jumpSound = new Audio('./img_aud_txt_files/whoosh.wav'); // Add your whoosh sound path here

    const muteIcon = new Image();
    muteIcon.src = './img_aud_txt_files/snd_off.png'; // Path to the mute icon

    const unmuteIcon = new Image();
    unmuteIcon.src = './img_aud_txt_files/snd_on.png'; // Path to the unmute icon

    function drawBackground() {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }

    function drawBird() {
        ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    }

    function drawPipes() {
        ctx.fillStyle = 'purple';
        pipes.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
            ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
        });
    }

    function drawMuteButton() {
        ctx.drawImage(muteIcon, canvas.width - 40, canvas.height - 40, 30, 30);
    }
    
    function drawUnmuteButton() {
        ctx.drawImage(unmuteIcon, canvas.width - 40, canvas.height - 40, 30, 30);
    }

    function updatePipes() {
        if (frame % 90 === 0) {
            const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
            pipes.push({
                x: canvas.width,
                top: pipeHeight,
                bottom: canvas.height - pipeHeight - pipeGap,
                passed: false // Add this property to check if bird passed the pipe
            });
        }

        pipes.forEach(pipe => {
            pipe.x -= 2;
        });

        pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    }

    function updateBird() {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        if (bird.y + bird.height > canvas.height) {
            bird.y = canvas.height - bird.height;
            bird.velocity = 0;
        }

        if (bird.y < 0) {
            bird.y = 0;
            bird.velocity = 0;
        }
    }

    function checkCollision() {
        for (const pipe of pipes) {
            if (
                bird.x < pipe.x + pipeWidth &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
            ) {
                if (!isMuted) hitSound.play();
                cancelAnimationFrame(animationFrameId);
                document.getElementById('gameOverModal').style.display = 'block';
                document.getElementById('finalScore').textContent = score; // Update this line
                return true;
            }
        }
        return false;
    }

    function updateScore() {
        pipes.forEach(pipe => {
            if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
                score++;
                pipe.passed = true; // Mark this pipe as passed
                if (!isMuted) pointSound.play();
            }
        });
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    function resetGame() {
        bird.y = 150;
        bird.velocity = 0;
        pipes = [];
        frame = 0;
        score = 0;
        document.getElementById('score').textContent = `Score: ${score}`;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        drawBackground(); // Draw the background when the game resets
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawBird();
        drawPipes();
        if (isMuted) {
            drawMuteButton();
        } else {
            drawUnmuteButton();
        }
        updateBird();
        updatePipes();
        if (!checkCollision()) {
            updateScore();
            frame++;
            animationFrameId = requestAnimationFrame(gameLoop);
        } else {
            gameStarted = false;
            document.getElementById('gameOverModal').style.display = 'block';
        }
    }

    function startGame() {
        resetGame();
        gameStarted = true;
        document.getElementById('startGameBtn').style.display = 'none';
        document.getElementById('gameOverModal').style.display = 'none';
        gameLoop();
    }

    function toggleMute() {
        isMuted = !isMuted;
        muteIcon.src = isMuted ? './img_aud_txt_files/snd_off.png' : './img_aud_txt_files/snd_on.png';
    }

    // Event listeners
    document.getElementById('startGameBtn').addEventListener('click', startGame);
    document.getElementById('restartGameOverBtn').addEventListener('click', startGame);

    canvas.addEventListener('click', () => {
        bird.velocity = bird.lift;
        if (!isMuted) jumpSound.play(); // Play the jump sound
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && gameStarted) {
            bird.velocity = bird.lift;
            if (!isMuted) jumpSound.play(); // Play the jump sound
        }
    });

    // Draw the background initially
    backgroundImage.onload = () => {
        drawBackground();
    };

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        if (x >= canvas.width - 40 && x <= canvas.width - 10 && y >= canvas.height - 40 && y <= canvas.height - 10) {
            toggleMute();
        } else {
            bird.velocity = bird.lift;
            if (!isMuted) jumpSound.play(); // Play the jump sound
        }
    });
});
