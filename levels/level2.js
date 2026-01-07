// Level 2 - Intermediate Level (Medium)
// Introduces more enemies and moving platforms
// Wide level with challenging platforming

const level2Data = {
    playerStart: { x: 50, y: 450 },
    goal: { x: 2800, y: 300 },
    backgroundColors: ['#9370DB', '#DDA0DD'],

    platforms: [
        // Starting ground with gaps
        { x: 0, y: 550, width: 200, height: 50 },
        { x: 250, y: 550, width: 150, height: 50 },
        { x: 450, y: 550, width: 200, height: 50 },

        // First gap section
        { x: 700, y: 550, width: 100, height: 50 },
        { x: 850, y: 500, width: 120, height: 20 },
        { x: 1020, y: 550, width: 150, height: 50 },

        // Ascending platforms
        { x: 1220, y: 500, width: 120, height: 20 },
        { x: 1390, y: 450, width: 120, height: 20 },
        { x: 1560, y: 400, width: 120, height: 20 },
        { x: 1730, y: 350, width: 120, height: 20 },

        // High platform area
        { x: 1900, y: 300, width: 200, height: 20 },
        { x: 2150, y: 350, width: 150, height: 20 },
        { x: 2350, y: 320, width: 120, height: 20 },

        // Descending section with gaps
        { x: 2520, y: 400, width: 100, height: 20 },
        { x: 2670, y: 480, width: 100, height: 20 },
        { x: 2800, y: 550, width: 200, height: 50 },

        // Extra mid-air platforms
        { x: 280, y: 450, width: 100, height: 20 },
        { x: 500, y: 480, width: 100, height: 20 },
        { x: 1100, y: 480, width: 80, height: 20 },
        { x: 2000, y: 250, width: 80, height: 20 },
        { x: 2250, y: 280, width: 80, height: 20 },

        // Final platform for goal
        { x: 2750, y: 350, width: 150, height: 20 }
    ],

    enemies: [
        // Ground enemies
        { x: 300, y: 500, type: 'walker' },
        { x: 550, y: 500, type: 'walker' },
        { x: 750, y: 500, type: 'walker' },
        { x: 1050, y: 500, type: 'walker' },

        // Platform enemies
        { x: 1400, y: 400, type: 'walker' },
        { x: 1750, y: 300, type: 'walker' },
        { x: 2400, y: 270, type: 'walker' },

        // Flying enemies
        { x: 900, y: 400, type: 'flyer', patrolDistance: 100 },
        { x: 1650, y: 350, type: 'flyer', patrolDistance: 120 },
        { x: 2200, y: 300, type: 'flyer', patrolDistance: 100 },
        { x: 2600, y: 450, type: 'flyer', patrolDistance: 80 }
    ],

    collectibles: [
        // Starting area
        { x: 100, y: 500, type: 'coin' },
        { x: 300, y: 500, type: 'coin' },
        { x: 310, y: 420, type: 'coin' },

        // Gap section
        { x: 520, y: 450, type: 'coin' },
        { x: 750, y: 500, type: 'coin' },
        { x: 880, y: 470, type: 'coin' },
        { x: 1120, y: 450, type: 'coin' },

        // Ascending section
        { x: 1250, y: 470, type: 'coin' },
        { x: 1420, y: 420, type: 'coin' },
        { x: 1590, y: 370, type: 'coin' },
        { x: 1760, y: 320, type: 'coin' },

        // High platform rewards
        { x: 1950, y: 270, type: 'coin' },
        { x: 2000, y: 270, type: 'coin' },
        { x: 2050, y: 270, type: 'coin' },
        { x: 2030, y: 220, type: 'powerup' },

        { x: 2200, y: 320, type: 'coin' },
        { x: 2250, y: 250, type: 'coin' },
        { x: 2380, y: 290, type: 'coin' },

        // Descent section
        { x: 2550, y: 370, type: 'coin' },
        { x: 2700, y: 450, type: 'coin' },
        { x: 2850, y: 500, type: 'coin' },

        // Additional power-up
        { x: 1420, y: 400, type: 'powerup' }
    ]
};
