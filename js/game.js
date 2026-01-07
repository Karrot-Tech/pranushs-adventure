// Main game class

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        // Game states
        this.STATES = {
            MENU: 'menu',
            PLAYING: 'playing',
            PAUSED: 'paused',
            GAME_OVER: 'gameOver',
            LEVEL_COMPLETE: 'levelComplete'
        };
        this.state = this.STATES.MENU;

        // Game objects
        this.input = new InputHandler();
        this.sound = new SoundEffects();
        this.player = null;
        this.currentLevel = null;
        this.currentLevelIndex = 0;

        // Level data
        this.levels = [level1Data, level2Data, level3Data];

        // Game stats
        this.score = 0;
        this.lives = 3;

        // Camera for smooth scrolling
        this.camera = {
            x: 0,
            y: 0
        };

        // UI elements
        this.menuScreen = document.getElementById('menuScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.levelCompleteScreen = document.getElementById('levelCompleteScreen');

        // Setup event listeners
        this.setupUI();

        // Start game loop
        this.lastTime = 0;
        this.gameLoop(0);
    }

    setupUI() {
        // Start button
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });

        // Restart button
        document.getElementById('restartButton').addEventListener('click', () => {
            this.restartGame();
        });

        // Next level button
        document.getElementById('nextLevelButton').addEventListener('click', () => {
            this.nextLevel();
        });

        // Sound toggle button
        const soundToggle = document.getElementById('soundToggle');
        soundToggle.addEventListener('click', () => {
            const enabled = this.sound.toggle();
            soundToggle.textContent = enabled ? '🔊' : '🔇';
        });
    }

    startGame() {
        this.score = 0;
        this.lives = 3;
        this.currentLevelIndex = 0;
        this.loadLevel(this.currentLevelIndex);
        this.setState(this.STATES.PLAYING);
        this.updateHUD();
    }

    restartGame() {
        this.startGame();
    }

    nextLevel() {
        this.currentLevelIndex++;
        if (this.currentLevelIndex >= this.levels.length) {
            // Game completed!
            this.setState(this.STATES.MENU);
            alert('Congratulations! You completed all levels!');
            this.currentLevelIndex = 0;
        } else {
            this.loadLevel(this.currentLevelIndex);
            this.setState(this.STATES.PLAYING);
        }
    }

    loadLevel(index) {
        const levelData = this.levels[index];
        this.currentLevel = new Level(levelData, this.width, this.height);

        // Create or reset player
        if (!this.player) {
            this.player = new Player(this.currentLevel.playerStartX, this.currentLevel.playerStartY, this.sound);
            this.player.lives = this.lives;
        } else {
            this.player.reset(this.currentLevel.playerStartX, this.currentLevel.playerStartY);
            this.player.lives = this.lives;
            this.player.sound = this.sound;
        }

        // Reset camera to start of level
        this.camera.x = 0;
        this.camera.y = 0;

        this.updateHUD();
    }

    setState(newState) {
        this.state = newState;

        // Hide all screens
        this.menuScreen.classList.add('hidden');
        this.gameOverScreen.classList.add('hidden');
        this.levelCompleteScreen.classList.add('hidden');

        // Show appropriate screen
        switch (newState) {
            case this.STATES.MENU:
                this.menuScreen.classList.remove('hidden');
                break;
            case this.STATES.GAME_OVER:
                this.gameOverScreen.classList.remove('hidden');
                document.getElementById('finalScore').textContent = this.score;
                break;
            case this.STATES.LEVEL_COMPLETE:
                this.levelCompleteScreen.classList.remove('hidden');
                document.getElementById('levelScore').textContent = this.score;
                break;
        }
    }

    updateHUD() {
        document.getElementById('scoreValue').textContent = this.score;
        document.getElementById('livesValue').textContent = this.player ? this.player.lives : this.lives;
        document.getElementById('levelValue').textContent = this.currentLevelIndex + 1;
    }

    update(deltaTime) {
        if (this.state !== this.STATES.PLAYING) return;

        // Check for pause
        if (this.input.isPressed('pause')) {
            this.state = this.STATES.PAUSED;
            return;
        }

        // Update player
        this.player.update(this.input, this.width, this.height);

        // Update level
        this.currentLevel.update();

        // Check platform collisions
        Physics.checkPlatformCollision(this.player, this.currentLevel.platforms);

        // Check if player fell off the map
        if (!Physics.checkBounds(this.player, this.height)) {
            this.playerDied();
            return;
        }

        // Check enemy collisions
        const enemyCollision = Physics.checkEnemyCollision(this.player, this.currentLevel.enemies);
        if (enemyCollision) {
            if (enemyCollision.type === 'damage') {
                const isDead = this.player.takeDamage();
                if (isDead) {
                    this.playerDied();
                }
            } else if (enemyCollision.type === 'stomp') {
                this.score += 50;
                this.sound.stomp();
            }
        }

        // Check collectible collisions
        const collected = Physics.checkCollectibleCollision(this.player, this.currentLevel.collectibles);
        collected.forEach(item => {
            if (item.type === 'coin') {
                this.score += item.value;
                this.sound.coin();
            } else if (item.type === 'powerup') {
                this.player.powerUp();
                this.score += 100;
            }
        });

        // Check if level goal reached
        if (this.currentLevel.checkGoalReached(this.player)) {
            this.levelComplete();
        }

        // Update camera to follow player
        this.updateCamera();

        // Update HUD
        this.updateHUD();
    }

    updateCamera() {
        // Center camera on player
        // Keep player in the center of the screen
        this.camera.x = this.player.x - this.width / 2 + this.player.width / 2;
        this.camera.y = 0; // Keep vertical camera fixed (optional: could follow player vertically too)

        // Clamp camera to level boundaries
        // Don't scroll past the left edge
        if (this.camera.x < 0) {
            this.camera.x = 0;
        }

        // Don't scroll past the right edge (if level has a defined width)
        // For now, allow unlimited scrolling to the right
        // You can set a max based on level width if needed
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.state === this.STATES.PLAYING || this.state === this.STATES.PAUSED) {
            // Save context and apply camera translation
            this.ctx.save();
            this.ctx.translate(-this.camera.x, -this.camera.y);

            // Render level
            this.currentLevel.render(this.ctx);

            // Render player
            this.player.render(this.ctx);

            // Restore context (remove camera translation)
            this.ctx.restore();

            // Show pause message (drawn without camera offset)
            if (this.state === this.STATES.PAUSED) {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                this.ctx.fillRect(0, 0, this.width, this.height);

                this.ctx.fillStyle = 'white';
                this.ctx.font = 'bold 48px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('PAUSED', this.width / 2, this.height / 2);
                this.ctx.font = '24px Arial';
                this.ctx.fillText('Press P to resume', this.width / 2, this.height / 2 + 50);
            }
        } else if (this.state === this.STATES.MENU) {
            // Draw a preview of the game
            if (this.currentLevel) {
                this.currentLevel.render(this.ctx);
            }
        }
    }

    playerDied() {
        this.player.lives--;
        this.lives = this.player.lives;

        if (this.player.lives <= 0) {
            // Game over
            this.setState(this.STATES.GAME_OVER);
            this.sound.gameOver();
        } else {
            // Respawn
            this.player.reset(this.currentLevel.playerStartX, this.currentLevel.playerStartY);
        }

        this.updateHUD();
    }

    levelComplete() {
        this.setState(this.STATES.LEVEL_COMPLETE);
        this.sound.levelComplete();
    }

    gameLoop(currentTime) {
        // Calculate delta time
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Check for unpause
        if (this.state === this.STATES.PAUSED && this.input.isPressed('pause')) {
            this.state = this.STATES.PLAYING;
            this.input.keys['pause'] = false; // Prevent immediate re-pause
        }

        // Update and render
        this.update(deltaTime);
        this.render();

        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    const game = new Game();
});
