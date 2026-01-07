// Level 3 - Advanced Level (Hard)
// More complex platforming and enemy patterns

const level3Data = {
    playerStart: { x: 50, y: 400 },
    goal: { x: 720, y: 250 },
    backgroundColors: ['#FF6B6B', '#FFB6C1'],

    platforms: [
        // Ground with larger gaps
        { x: 0, y: 550, width: 150, height: 50 },
        { x: 250, y: 550, width: 100, height: 50 },
        { x: 450, y: 550, width: 120, height: 50 },
        { x: 650, y: 550, width: 150, height: 50 },

        // Lower tier
        { x: 150, y: 500, width: 80, height: 20 },
        { x: 350, y: 490, width: 80, height: 20 },
        { x: 570, y: 500, width: 60, height: 20 },

        // Mid tier - requires precision
        { x: 80, y: 440, width: 70, height: 20 },
        { x: 200, y: 420, width: 60, height: 20 },
        { x: 310, y: 400, width: 80, height: 20 },
        { x: 440, y: 420, width: 70, height: 20 },
        { x: 560, y: 440, width: 60, height: 20 },
        { x: 670, y: 420, width: 80, height: 20 },

        // Upper tier
        { x: 120, y: 350, width: 80, height: 20 },
        { x: 270, y: 330, width: 90, height: 20 },
        { x: 420, y: 340, width: 70, height: 20 },
        { x: 550, y: 360, width: 80, height: 20 },

        // Top tier - goal area
        { x: 680, y: 300, width: 100, height: 20 },

        // Moving platforms (challenge)
        { x: 150, y: 380, width: 70, height: 15, moving: true, endX: 250, endY: 380, speed: 3 },
        { x: 500, y: 380, width: 70, height: 15, moving: true, endX: 600, endY: 380, speed: 2.5 }
    ],

    enemies: [
        // Multiple enemies creating challenging patterns
        { x: 300, y: 500, type: 'walker' },
        { x: 500, y: 500, type: 'walker' },
        { x: 200, y: 350, type: 'flyer', patrolDistance: 120 },
        { x: 450, y: 320, type: 'flyer', patrolDistance: 100 },
        { x: 600, y: 500, type: 'walker' },
        { x: 350, y: 370, type: 'walker' }
    ],

    collectibles: [
        // Coins in challenging positions
        { x: 110, y: 470, type: 'coin' },
        { x: 180, y: 470, type: 'coin' },
        { x: 230, y: 390, type: 'coin' },
        { x: 340, y: 370, type: 'coin' },
        { x: 370, y: 370, type: 'coin' },
        { x: 470, y: 390, type: 'coin' },
        { x: 590, y: 410, type: 'coin' },
        { x: 700, y: 390, type: 'coin' },
        { x: 150, y: 320, type: 'coin' },
        { x: 300, y: 300, type: 'coin' },
        { x: 450, y: 310, type: 'coin' },
        { x: 580, y: 330, type: 'coin' },

        // Power-ups
        { x: 300, y: 270, type: 'powerup' },
        { x: 700, y: 270, type: 'powerup' }
    ]
};
