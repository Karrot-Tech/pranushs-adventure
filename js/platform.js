// Platform class for the game

class Platform {
    constructor(x, y, width, height, type = 'solid') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type; // 'solid', 'moving'

        // For moving platforms
        this.startX = x;
        this.startY = y;
        this.endX = x;
        this.endY = y;
        this.speed = 2;
        this.direction = 1;

        // Visual properties
        this.color = '#8B4513';
        this.borderColor = '#654321';
    }

    // Set movement range for moving platforms
    setMovement(endX, endY, speed = 2) {
        this.type = 'moving';
        this.endX = endX;
        this.endY = endY;
        this.speed = speed;
    }

    update() {
        if (this.type === 'moving') {
            // Move horizontally
            if (this.endX !== this.startX) {
                this.x += this.speed * this.direction;

                if (this.direction === 1 && this.x >= this.endX) {
                    this.direction = -1;
                } else if (this.direction === -1 && this.x <= this.startX) {
                    this.direction = 1;
                }
            }

            // Move vertically
            if (this.endY !== this.startY) {
                this.y += this.speed * this.direction;

                if (this.direction === 1 && this.y >= this.endY) {
                    this.direction = -1;
                } else if (this.direction === -1 && this.y <= this.startY) {
                    this.direction = 1;
                }
            }
        }
    }

    render(ctx) {
        // Draw platform with 3D effect
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Border
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Add pattern for texture
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let i = 0; i < this.width; i += 20) {
            ctx.fillRect(this.x + i, this.y, 2, this.height);
        }

        // Highlight top edge
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();
    }
}
