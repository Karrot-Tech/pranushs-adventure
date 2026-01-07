// Enemy class with AI

class Enemy {
    constructor(x, y, type = 'walker') {
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;

        this.type = type; // 'walker', 'flyer'
        this.velocityX = 2;
        this.velocityY = 0;

        this.active = true;
        this.health = 1;

        // Patrol boundaries
        this.startX = x;
        this.patrolDistance = 150;

        // Visual properties
        this.color = '#8B008B';
        this.animationFrame = 0;
        this.animationTimer = 0;

        // Defeat animation
        this.defeated = false;
        this.defeatTimer = 0;
    }

    update(platforms, canvasWidth) {
        if (!this.active) return;

        if (this.defeated) {
            // Death animation
            this.defeatTimer++;
            this.y += 2;
            this.animationFrame = (this.animationFrame + 1) % 8;

            if (this.defeatTimer > 30) {
                this.active = false;
            }
            return;
        }

        // Apply gravity for walkers
        if (this.type === 'walker') {
            Physics.applyGravity(this);
        }

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Platform collision and edge detection for enemies
        if (this.type === 'walker') {
            this.onGround = false;
            let currentPlatform = null;

            for (let platform of platforms) {
                if (Physics.checkAABB(this, platform)) {
                    if (this.velocityY > 0) {
                        this.y = platform.y - this.height;
                        this.velocityY = 0;
                        this.onGround = true;
                        currentPlatform = platform;
                    }
                }
            }

            // Check for platform edges - turn around if about to fall off
            if (this.onGround && currentPlatform) {
                const checkDistance = 5; // How far ahead to check
                const nextX = this.velocityX > 0 ? this.x + this.width + checkDistance : this.x - checkDistance;
                const feetY = this.y + this.height + 5; // Check slightly below feet

                // Check if there's ground ahead
                let groundAhead = false;
                for (let platform of platforms) {
                    // Check if there's a platform where the enemy is about to step
                    if (nextX >= platform.x &&
                        nextX <= platform.x + platform.width &&
                        feetY >= platform.y &&
                        feetY <= platform.y + platform.height) {
                        groundAhead = true;
                        break;
                    }
                }

                // Turn around if no ground ahead (edge detected)
                if (!groundAhead) {
                    this.velocityX = -this.velocityX;
                }
            }
        }

        // AI behavior based on type (for patrol distance limits)
        if (this.type === 'walker') {
            this.walkingAI();
        } else if (this.type === 'flyer') {
            this.flyingAI();
        }

        // Animation
        this.animationTimer++;
        if (this.animationTimer > 15) {
            this.animationFrame = (this.animationFrame + 1) % 2;
            this.animationTimer = 0;
        }
    }

    walkingAI() {
        // Patrol back and forth
        if (this.x <= this.startX - this.patrolDistance) {
            this.velocityX = 2;
        } else if (this.x >= this.startX + this.patrolDistance) {
            this.velocityX = -2;
        }
    }

    flyingAI() {
        // Simple sine wave movement
        this.velocityY = Math.sin(this.x * 0.05) * 2;

        // Reverse direction at patrol boundaries
        if (this.x <= this.startX - this.patrolDistance) {
            this.velocityX = 2;
        } else if (this.x >= this.startX + this.patrolDistance) {
            this.velocityX = -2;
        }
    }

    render(ctx) {
        if (!this.active) return;

        ctx.save();

        if (this.defeated) {
            // Death animation - rotate and fade
            ctx.globalAlpha = 1 - (this.defeatTimer / 30);
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate((this.defeatTimer * Math.PI) / 15);
            ctx.translate(-this.width / 2, -this.height / 2);
        } else {
            ctx.translate(this.x, this.y);
        }

        // Draw enemy based on type
        if (this.type === 'walker') {
            this.renderWalker(ctx);
        } else if (this.type === 'flyer') {
            this.renderFlyer(ctx);
        }

        ctx.restore();
    }

    renderWalker(ctx) {
        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'white';
        const eyeOffset = this.animationFrame * 2;
        ctx.beginPath();
        ctx.arc(this.width * 0.3, this.height * 0.4 - eyeOffset, 5, 0, Math.PI * 2);
        ctx.arc(this.width * 0.7, this.height * 0.4 - eyeOffset, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pupils
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.width * 0.3, this.height * 0.4 - eyeOffset, 2, 0, Math.PI * 2);
        ctx.arc(this.width * 0.7, this.height * 0.4 - eyeOffset, 2, 0, Math.PI * 2);
        ctx.fill();

        // Feet
        ctx.fillStyle = this.color;
        const footY = this.animationFrame === 0 ? this.height : this.height - 3;
        ctx.fillRect(5, footY, 10, 5);
        ctx.fillRect(this.width - 15, this.height - (this.height - footY), 10, 5);
    }

    renderFlyer(ctx) {
        // Body
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.ellipse(this.width / 2, this.height / 2, this.width / 2, this.height / 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wings
        const wingFlap = this.animationFrame === 0 ? 5 : 0;
        ctx.fillStyle = 'rgba(255, 107, 107, 0.5)';

        // Left wing
        ctx.beginPath();
        ctx.ellipse(5, this.height / 2, 10, 15 - wingFlap, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // Right wing
        ctx.beginPath();
        ctx.ellipse(this.width - 5, this.height / 2, 10, 15 - wingFlap, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.width * 0.35, this.height * 0.4, 4, 0, Math.PI * 2);
        ctx.arc(this.width * 0.65, this.height * 0.4, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    defeat() {
        this.defeated = true;
        this.defeatTimer = 0;
    }
}
