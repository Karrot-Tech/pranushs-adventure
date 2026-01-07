// Level 1 - Tutorial Level (Easy)
// Teaches basic movement and jumping

const level1Data = {
    playerStart: { x: 50, y: 400 },
    goal: { x: 720, y: 490 },
    backgroundColors: ['#87CEEB', '#E0F6FF'],

    platforms: [
        // Ground
        { x: 0, y: 550, width: 300, height: 50 },
        { x: 350, y: 550, width: 150, height: 50 },
        { x: 550, y: 550, width: 250, height: 50 },

        // Simple platforms to practice jumping
        { x: 150, y: 480, width: 100, height: 20 },
        { x: 300, y: 420, width: 100, height: 20 },
        { x: 450, y: 480, width: 100, height: 20 },
        { x: 600, y: 420, width: 80, height: 20 }
    ],

    enemies: [
        // Just one easy enemy to learn combat
        { x: 400, y: 500, type: 'walker' }
    ],

    collectibles: [
        // Coins spread throughout the level
        { x: 180, y: 450, type: 'coin' },
        { x: 330, y: 390, type: 'coin' },
        { x: 360, y: 390, type: 'coin' },
        { x: 480, y: 450, type: 'coin' },
        { x: 630, y: 390, type: 'coin' },

        // One power-up
        { x: 330, y: 360, type: 'powerup' }
    ]
};
