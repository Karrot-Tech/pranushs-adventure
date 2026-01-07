// Collectible class for coins and power-ups

class Collectible {
    constructor(x, y, type = 'coin') {
        this.x = x;
        this.y = y;
        this.type = type; // 'coin', 'powerup'

        this.width = type === 'coin' ? 20 : 30;
        this.height = type === 'coin' ? 20 : 30;

        this.active = true;
        this.value = type === 'coin' ? 10 : 0;

        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.rotation = 0;
        this.bobOffset = 0;
        this.bobTimer = 0;

        // Collection animation
        this.collecting = false;
        this.collectTimer = 0;
        this.collectY = y;
    }

    update() {
        if (!this.active) return;

        if (this.collecting) {
            // Collection animation - float up and fade
            this.collectTimer++;
            this.collectY -= 2;
            if (this.collectTimer > 20) {
                this.active = false;
            }
            return;
        }

        // Bobbing animation
        this.bobTimer += 0.1;
        this.bobOffset = Math.sin(this.bobTimer) * 5;

        // Rotation animation
        this.rotation += 0.05;
        if (this.rotation > Math.PI * 2) {
            this.rotation = 0;
        }

        // Frame animation
        this.animationTimer++;
        if (this.animationTimer > 10) {
            this.animationFrame = (this.animationFrame + 1) % 4;
            this.animationTimer = 0;
        }
    }

    render(ctx) {
        if (!this.active) return;

        ctx.save();

        const renderY = this.collecting ? this.collectY : this.y + this.bobOffset;
        const alpha = this.collecting ? 1 - (this.collectTimer / 20) : 1;

        ctx.globalAlpha = alpha;
        ctx.translate(this.x + this.width / 2, renderY + this.height / 2);

        if (this.type === 'coin') {
            this.renderCoin(ctx);
        } else if (this.type === 'powerup') {
            this.renderPowerUp(ctx);
        }

        ctx.restore();
    }

    renderCoin(ctx) {
        // Rotate for 3D effect
        ctx.rotate(this.rotation);

        // Coin body
        const scale = Math.abs(Math.cos(this.rotation));
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width / 2 * scale, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Coin border
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center symbol
        if (scale > 0.5) {
            ctx.fillStyle = '#FFA500';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$', 0, 0);
        }
    }

    renderPowerUp(ctx) {
        // Star shape for power-up
        ctx.fillStyle = '#FF1493';

        ctx.rotate(this.rotation);

        // Draw star
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * this.width / 2;
            const y = Math.sin(angle) * this.height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Inner point
            const innerAngle = angle + Math.PI / 5;
            const innerX = Math.cos(innerAngle) * this.width / 4;
            const innerY = Math.sin(innerAngle) * this.height / 4;
            ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = '#FFB6C1';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Center highlight
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    collect() {
        this.collecting = true;
        this.collectTimer = 0;
    }
}
