// Level class to manage level data and objects

class Level {
    constructor(levelData, canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.platforms = [];
        this.enemies = [];
        this.collectibles = [];

        this.playerStartX = levelData.playerStart.x;
        this.playerStartY = levelData.playerStart.y;

        this.goalX = levelData.goal.x;
        this.goalY = levelData.goal.y;
        this.goalWidth = 50;
        this.goalHeight = 60;

        this.backgroundColors = levelData.backgroundColors || ['#5C94FC', '#87CEEB'];

        // Build level from data
        this.buildLevel(levelData);
    }

    buildLevel(data) {
        // Create platforms
        data.platforms.forEach(p => {
            const platform = new Platform(p.x, p.y, p.width, p.height);
            if (p.moving) {
                platform.setMovement(p.endX, p.endY, p.speed || 2);
            }
            this.platforms.push(platform);
        });

        // Create enemies
        data.enemies.forEach(e => {
            const enemy = new Enemy(e.x, e.y, e.type || 'walker');
            if (e.patrolDistance) {
                enemy.patrolDistance = e.patrolDistance;
            }
            this.enemies.push(enemy);
        });

        // Create collectibles
        data.collectibles.forEach(c => {
            this.collectibles.push(new Collectible(c.x, c.y, c.type || 'coin'));
        });
    }

    update() {
        // Update all platforms
        this.platforms.forEach(platform => platform.update());

        // Update all enemies
        this.enemies.forEach(enemy => enemy.update(this.platforms, this.canvasWidth));

        // Update all collectibles
        this.collectibles.forEach(collectible => collectible.update());

        // Remove inactive objects
        this.enemies = this.enemies.filter(e => e.active || e.defeated);
        this.collectibles = this.collectibles.filter(c => c.active);
    }

    render(ctx) {
        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, this.backgroundColors[0]);
        gradient.addColorStop(1, this.backgroundColors[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // Draw clouds (decorative)
        this.drawClouds(ctx);

        // Draw goal flag
        this.drawGoal(ctx);

        // Render all platforms
        this.platforms.forEach(platform => platform.render(ctx));

        // Render all collectibles
        this.collectibles.forEach(collectible => collectible.render(ctx));

        // Render all enemies
        this.enemies.forEach(enemy => enemy.render(ctx));
    }

    drawClouds(ctx) {
        // Simple decorative clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';

        const clouds = [
            { x: 100, y: 80, size: 40 },
            { x: 350, y: 120, size: 50 },
            { x: 600, y: 90, size: 45 }
        ];

        clouds.forEach(cloud => {
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
            ctx.arc(cloud.x + cloud.size * 0.5, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
            ctx.arc(cloud.x + cloud.size, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    drawGoal(ctx) {
        // Draw flag pole
        ctx.fillStyle = '#654321';
        ctx.fillRect(this.goalX + 20, this.goalY, 5, this.goalHeight);

        // Draw flag
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.moveTo(this.goalX + 25, this.goalY);
        ctx.lineTo(this.goalX + 50, this.goalY + 10);
        ctx.lineTo(this.goalX + 25, this.goalY + 20);
        ctx.closePath();
        ctx.fill();

        // Flag border
        ctx.strokeStyle = '#2E7D32';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Checkered pattern on flag
        ctx.fillStyle = 'white';
        ctx.fillRect(this.goalX + 30, this.goalY + 5, 5, 5);
        ctx.fillRect(this.goalX + 40, this.goalY + 10, 5, 5);
    }

    checkGoalReached(player) {
        return player.x + player.width > this.goalX &&
               player.x < this.goalX + this.goalWidth &&
               player.y + player.height > this.goalY &&
               player.y < this.goalY + this.goalHeight;
    }

    reset() {
        // Reset all enemies
        this.enemies.forEach(enemy => {
            enemy.active = true;
            enemy.defeated = false;
            enemy.x = enemy.startX;
        });
    }
}
