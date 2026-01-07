// Player class

class Player {
    constructor(x, y, sound = null) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;

        this.velocityX = 0;
        this.velocityY = 0;

        this.onGround = false;
        this.facingRight = true;

        // Player stats
        this.lives = 3;
        this.isPoweredUp = false;
        this.powerUpTimer = 0;
        this.invincible = false;
        this.invincibleTimer = 0;

        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;

        // Custom sprite support
        this.sprite = null;
        this.spriteLoaded = false;
        this.defaultColor = '#FF0000';

        // Sound effects
        this.sound = sound;

        // Try to load custom sprite if it exists
        this.loadSprite();
    }

    loadSprite() {
        const img = new Image();
        img.onload = () => {
            this.sprite = img;
            this.spriteLoaded = true;
        };
        img.onerror = () => {
            // If sprite doesn't load, we'll use default rectangle
            this.spriteLoaded = false;
        };
        img.src = 'assets/images/player.png';
    }

    update(input, canvasWidth, canvasHeight) {
        // Handle horizontal movement
        if (input.isPressed('left')) {
            this.velocityX = -Physics.MOVE_SPEED;
            this.facingRight = false;
        } else if (input.isPressed('right')) {
            this.velocityX = Physics.MOVE_SPEED;
            this.facingRight = true;
        } else {
            Physics.applyFriction(this);
        }

        // Handle jumping
        if (input.isPressed('jump') && this.onGround) {
            this.velocityY = Physics.JUMP_VELOCITY;
            this.onGround = false;
            if (this.sound) this.sound.jump();
        }

        // Apply physics
        Physics.applyGravity(this);

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Update power-up timer
        if (this.isPoweredUp) {
            this.powerUpTimer--;
            if (this.powerUpTimer <= 0) {
                this.isPoweredUp = false;
                this.shrink();
            }
        }

        // Update invincibility timer
        if (this.invincible) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }

        // Animation
        this.animationTimer++;
        if (this.animationTimer > 10) {
            this.animationFrame = (this.animationFrame + 1) % 4;
            this.animationTimer = 0;
        }
    }

    render(ctx) {
        ctx.save();

        // Flip sprite if facing left
        if (!this.facingRight) {
            ctx.translate(this.x + this.width, this.y);
            ctx.scale(-1, 1);
        } else {
            ctx.translate(this.x, this.y);
        }

        // Blink effect when invincible
        if (this.invincible && Math.floor(this.invincibleTimer / 5) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        // Draw sprite or default shape
        if (this.spriteLoaded && this.sprite) {
            // Draw custom sprite
            ctx.drawImage(this.sprite, 0, 0, this.width, this.height);
        } else {
            // Draw default character (simple rectangle/circle)
            this.renderDefault(ctx);
        }

        ctx.restore();

        // Power-up indicator
        if (this.isPoweredUp) {
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
        }
    }

    renderDefault(ctx) {
        // Draw a simple character shape when no sprite is loaded
        // Body (rounded rectangle)
        ctx.fillStyle = this.defaultColor;
        ctx.beginPath();
        ctx.roundRect(0, 0, this.width, this.height, 5);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.width * 0.3, this.height * 0.3, 5, 0, Math.PI * 2);
        ctx.arc(this.width * 0.7, this.height * 0.3, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = 'black';
        ctx.beginPath();
        const pupilOffset = this.facingRight ? 2 : -2;
        ctx.arc(this.width * 0.3 + pupilOffset, this.height * 0.3, 2, 0, Math.PI * 2);
        ctx.arc(this.width * 0.7 + pupilOffset, this.height * 0.3, 2, 0, Math.PI * 2);
        ctx.fill();

        // Simple smile
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.width / 2, this.height * 0.6, this.width * 0.3, 0, Math.PI);
        ctx.stroke();

        // Border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(0, 0, this.width, this.height, 5);
        ctx.stroke();
    }

    jump() {
        if (this.onGround) {
            this.velocityY = Physics.JUMP_VELOCITY;
            this.onGround = false;
        }
    }

    takeDamage() {
        if (this.invincible) return false;

        if (this.isPoweredUp) {
            // Lose power-up instead of life
            this.isPoweredUp = false;
            this.shrink();
            this.invincible = true;
            this.invincibleTimer = 120; // 2 seconds of invincibility
            if (this.sound) this.sound.damage();
            return false;
        } else {
            this.lives--;
            this.invincible = true;
            this.invincibleTimer = 120;
            if (this.sound) this.sound.damage();
            return this.lives <= 0;
        }
    }

    powerUp() {
        this.isPoweredUp = true;
        this.powerUpTimer = 600; // 10 seconds
        this.grow();
        if (this.sound) this.sound.powerUp();
    }

    grow() {
        this.width = 50;
        this.height = 50;
        this.y -= 10; // Adjust position so we don't fall through floor
    }

    shrink() {
        this.width = 40;
        this.height = 40;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = false;
        this.invincible = true;
        this.invincibleTimer = 60; // 1 second of invincibility when respawning
    }
}
