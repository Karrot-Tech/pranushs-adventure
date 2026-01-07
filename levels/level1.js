// Level 1 - Tutorial Level (Easy)
// Teaches basic movement and jumping
// Extended wide level for camera scrolling

const level1Data = {
    playerStart: { x: 50, y: 400 },
    goal: { x: 2350, y: 490 },
    backgroundColors: ['#87CEEB', '#E0F6FF'],

    platforms: [
        // Starting area - ground
        { x: 0, y: 550, width: 400, height: 50 },

        // First section - basic jumps
        { x: 450, y: 550, width: 150, height: 50 },
        { x: 650, y: 550, width: 200, height: 50 },
        { x: 500, y: 480, width: 100, height: 20 },

        // Second section - stairs up
        { x: 900, y: 550, width: 120, height: 50 },
        { x: 1050, y: 500, width: 120, height: 20 },
        { x: 1200, y: 450, width: 120, height: 20 },
        { x: 1350, y: 400, width: 120, height: 20 },

        // High platform section
        { x: 1500, y: 350, width: 200, height: 20 },
        { x: 1750, y: 400, width: 150, height: 20 },

        // Drop down section
        { x: 1950, y: 500, width: 150, height: 20 },
        { x: 2150, y: 550, width: 200, height: 50 },

        // Final approach
        { x: 2200, y: 480, width: 100, height: 20 },
        { x: 2300, y: 550, width: 200, height: 50 }
    ],

    enemies: [
        // Enemies spread throughout
        { x: 500, y: 500, type: 'walker' },
        { x: 750, y: 500, type: 'walker' },
        { x: 1400, y: 350, type: 'walker' },
        { x: 2000, y: 450, type: 'walker' }
    ],

    collectibles: [
        // Starting area coins
        { x: 150, y: 500, type: 'coin' },
        { x: 200, y: 500, type: 'coin' },
        { x: 250, y: 500, type: 'coin' },

        // Coins on platforms
        { x: 530, y: 450, type: 'coin' },
        { x: 700, y: 500, type: 'coin' },
        { x: 950, y: 500, type: 'coin' },

        // Coins on stairs
        { x: 1080, y: 470, type: 'coin' },
        { x: 1230, y: 420, type: 'coin' },
        { x: 1380, y: 370, type: 'coin' },

        // High platform rewards
        { x: 1550, y: 320, type: 'coin' },
        { x: 1600, y: 320, type: 'coin' },
        { x: 1650, y: 320, type: 'coin' },
        { x: 1620, y: 300, type: 'powerup' },

        // More coins
        { x: 1800, y: 370, type: 'coin' },
        { x: 2000, y: 470, type: 'coin' },
        { x: 2200, y: 500, type: 'coin' },
        { x: 2250, y: 450, type: 'coin' }
    ]
};
