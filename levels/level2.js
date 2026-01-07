// Level 2 - Intermediate Level (Medium)
// Introduces more enemies and moving platforms

const level2Data = {
    playerStart: { x: 50, y: 450 },
    goal: { x: 720, y: 350 },
    backgroundColors: ['#9370DB', '#DDA0DD'],

    platforms: [
        // Ground with gaps
        { x: 0, y: 550, width: 200, height: 50 },
        { x: 250, y: 550, width: 150, height: 50 },
        { x: 450, y: 550, width: 200, height: 50 },
        { x: 700, y: 550, width: 100, height: 50 },

        // Mid-level platforms
        { x: 100, y: 480, width: 120, height: 20 },
        { x: 280, y: 450, width: 100, height: 20 },
        { x: 430, y: 480, width: 100, height: 20 },
        { x: 580, y: 450, width: 100, height: 20 },

        // Upper platforms
        { x: 150, y: 380, width: 80, height: 20 },
        { x: 320, y: 350, width: 100, height: 20 },
        { x: 500, y: 380, width: 80, height: 20 },
        { x: 650, y: 400, width: 120, height: 20 },

        // Moving platform
        { x: 200, y: 420, width: 80, height: 15, moving: true, endX: 350, endY: 420, speed: 2 }
    ],

    enemies: [
        // More enemies with varied placement
        { x: 300, y: 500, type: 'walker' },
        { x: 500, y: 500, type: 'walker' },
        { x: 400, y: 300, type: 'flyer', patrolDistance: 100 },
        { x: 600, y: 400, type: 'walker' }
    ],

    collectibles: [
        // Coins require more skillful navigation
        { x: 130, y: 450, type: 'coin' },
        { x: 160, y: 450, type: 'coin' },
        { x: 180, y: 350, type: 'coin' },
        { x: 310, y: 420, type: 'coin' },
        { x: 350, y: 320, type: 'coin' },
        { x: 460, y: 450, type: 'coin' },
        { x: 530, y: 350, type: 'coin' },
        { x: 610, y: 420, type: 'coin' },
        { x: 680, y: 370, type: 'coin' },

        // Power-ups
        { x: 250, y: 390, type: 'powerup' },
        { x: 680, y: 340, type: 'powerup' }
    ]
};
