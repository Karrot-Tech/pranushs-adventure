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

    render(ctx, cameraX = 0) {
        // Draw background gradient that extends infinitely
        // Calculate the visible area based on camera position
        const startX = Math.floor(cameraX / this.canvasWidth) * this.canvasWidth;
        const endX = startX + this.canvasWidth * 3; // Draw 3 screens worth for smooth scrolling

        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvasHeight);
        gradient.addColorStop(0, this.backgroundColors[0]);
        gradient.addColorStop(1, this.backgroundColors[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(startX, 0, endX - startX, this.canvasHeight);

        // Draw clouds (decorative) - repeating pattern
        this.drawClouds(ctx, cameraX);

        // Draw goal flag
        this.drawGoal(ctx);

        // Render all platforms
        this.platforms.forEach(platform => platform.render(ctx));

        // Render all collectibles
        this.collectibles.forEach(collectible => collectible.render(ctx));

        // Render all enemies
        this.enemies.forEach(enemy => enemy.render(ctx));
    }

    drawClouds(ctx, cameraX = 0) {
        // Simple decorative clouds with repeating pattern
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';

        // Cloud pattern repeats every 800px
        const cloudPattern = [
            { x: 100, y: 80, size: 40 },
            { x: 350, y: 120, size: 50 },
            { x: 600, y: 90, size: 45 }
        ];

        // Calculate which cloud sections to draw based on camera
        const startSection = Math.floor(cameraX / 800);
        const endSection = startSection + 3; // Draw a few sections ahead

        for (let section = startSection; section <= endSection; section++) {
            const offsetX = section * 800;
            cloudPattern.forEach(cloud => {
                const cloudX = cloud.x + offsetX;
                ctx.beginPath();
                ctx.arc(cloudX, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
                ctx.arc(cloudX + cloud.size * 0.5, cloud.y, cloud.size * 0.6, 0, Math.PI * 2);
                ctx.arc(cloudX + cloud.size, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            });
        }
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
