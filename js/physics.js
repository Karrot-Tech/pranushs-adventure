// Physics engine for the game

const Physics = {
    // Physics constants
    GRAVITY: 0.6,
    MAX_FALL_SPEED: 15,
    FRICTION: 0.8,
    JUMP_VELOCITY: -12,
    MOVE_SPEED: 5,

    // Apply gravity to an entity
    applyGravity(entity) {
        entity.velocityY += this.GRAVITY;
        entity.velocityY = Math.min(entity.velocityY, this.MAX_FALL_SPEED);
    },

    // Apply friction to horizontal movement
    applyFriction(entity) {
        entity.velocityX *= this.FRICTION;
        // Stop very small movements
        if (Math.abs(entity.velocityX) < 0.1) {
            entity.velocityX = 0;
        }
    },

    // Check collision between player and platforms
    checkPlatformCollision(player, platforms) {
        player.onGround = false;

        for (let platform of platforms) {
            if (this.checkAABB(player, platform)) {
                // Determine collision side
                const overlapX = Math.min(
                    player.x + player.width - platform.x,
                    platform.x + platform.width - player.x
                );
                const overlapY = Math.min(
                    player.y + player.height - platform.y,
                    platform.y + platform.height - player.y
                );

                // Resolve collision on the axis with less overlap
                if (overlapX < overlapY) {
                    // Horizontal collision
                    if (player.x < platform.x) {
                        player.x = platform.x - player.width;
                    } else {
                        player.x = platform.x + platform.width;
                    }
                    player.velocityX = 0;
                } else {
                    // Vertical collision
                    if (player.y < platform.y) {
                        // Landing on top
                        player.y = platform.y - player.height;
                        player.velocityY = 0;
                        player.onGround = true;
                    } else {
                        // Hitting from below
                        player.y = platform.y + platform.height;
                        player.velocityY = 0;
                    }
                }
            }
        }
    },

    // Check collision between player and enemies
    checkEnemyCollision(player, enemies) {
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            if (enemy.active && this.checkAABB(player, enemy)) {
                // Check if player is stomping the enemy
                if (player.velocityY > 0 && player.y + player.height - 10 < enemy.y + enemy.height / 2) {
                    // Stomp!
                    enemy.defeat();
                    player.velocityY = -8; // Bounce
                    return { type: 'stomp', enemy: enemy };
                } else {
                    // Player takes damage
                    return { type: 'damage', enemy: enemy };
                }
            }
        }
        return null;
    },

    // Check collision between player and collectibles
    checkCollectibleCollision(player, collectibles) {
        const collected = [];
        for (let i = collectibles.length - 1; i >= 0; i--) {
            const collectible = collectibles[i];
            // Only collect if active AND not already collecting
            if (collectible.active && !collectible.collecting && this.checkAABB(player, collectible)) {
                collected.push(collectible);
                collectible.collect();
            }
        }
        return collected;
    },

    // AABB (Axis-Aligned Bounding Box) collision detection
    checkAABB(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    },

    // Check if entity fell off the map
    checkBounds(entity, height) {
        // Don't restrict horizontal movement (camera will follow)
        // Only check if entity fell off the bottom
        if (entity.y > height) {
            return false;
        }
        return true;
    }
};
