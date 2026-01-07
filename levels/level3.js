// Level 3 - Advanced Level (Hard)
// More complex platforming and enemy patterns
// Longest and most challenging level

const level3Data = {
    playerStart: { x: 50, y: 400 },
    goal: { x: 3200, y: 200 },
    backgroundColors: ['#FF6B6B', '#FFB6C1'],

    platforms: [
        // Starting area with gaps
        { x: 0, y: 550, width: 150, height: 50 },
        { x: 250, y: 550, width: 100, height: 50 },
        { x: 450, y: 550, width: 120, height: 50 },
        { x: 650, y: 550, width: 150, height: 50 },

        // First challenge section - precision jumps
        { x: 850, y: 520, width: 80, height: 20 },
        { x: 980, y: 480, width: 70, height: 20 },
        { x: 1100, y: 440, width: 80, height: 20 },
        { x: 1230, y: 400, width: 70, height: 20 },

        // Mid section - platforms at various heights
        { x: 1350, y: 550, width: 120, height: 50 },
        { x: 1520, y: 500, width: 90, height: 20 },
        { x: 1660, y: 450, width: 80, height: 20 },
        { x: 1790, y: 400, width: 90, height: 20 },
        { x: 1930, y: 350, width: 80, height: 20 },

        // High platform section
        { x: 2070, y: 300, width: 150, height: 20 },
        { x: 2270, y: 270, width: 100, height: 20 },
        { x: 2420, y: 240, width: 120, height: 20 },

        // Challenging gap section
        { x: 2600, y: 300, width: 80, height: 20 },
        { x: 2730, y: 350, width: 70, height: 20 },
        { x: 2850, y: 320, width: 80, height: 20 },

        // Final ascent to goal
        { x: 2980, y: 280, width: 90, height: 20 },
        { x: 3120, y: 250, width: 100, height: 20 },
        { x: 3180, y: 550, width: 150, height: 50 },

        // Additional challenging mid-air platforms
        { x: 150, y: 480, width: 70, height: 20 },
        { x: 500, y: 480, width: 80, height: 20 },
        { x: 900, y: 450, width: 60, height: 20 },
        { x: 1420, y: 430, width: 70, height: 20 },
        { x: 1700, y: 380, width: 60, height: 20 },
        { x: 2000, y: 270, width: 60, height: 20 },
        { x: 2330, y: 210, width: 70, height: 20 },
        { x: 2700, y: 280, width: 60, height: 20 }
    ],

    enemies: [
        // Ground enemies
        { x: 300, y: 500, type: 'walker' },
        { x: 550, y: 500, type: 'walker' },
        { x: 700, y: 500, type: 'walker' },
        { x: 1380, y: 500, type: 'walker' },

        // Platform enemies
        { x: 1000, y: 430, type: 'walker' },
        { x: 1250, y: 350, type: 'walker' },
        { x: 1800, y: 350, type: 'walker' },
        { x: 1950, y: 300, type: 'walker' },
        { x: 2450, y: 190, type: 'walker' },

        // Flying enemies - create challenging patterns
        { x: 800, y: 450, type: 'flyer', patrolDistance: 100 },
        { x: 1150, y: 400, type: 'flyer', patrolDistance: 120 },
        { x: 1600, y: 380, type: 'flyer', patrolDistance: 100 },
        { x: 2100, y: 300, type: 'flyer', patrolDistance: 130 },
        { x: 2500, y: 280, type: 'flyer', patrolDistance: 100 },
        { x: 2800, y: 320, type: 'flyer', patrolDistance: 90 },
        { x: 3000, y: 250, type: 'flyer', patrolDistance: 80 }
    ],

    collectibles: [
        // Starting area
        { x: 100, y: 500, type: 'coin' },
        { x: 180, y: 450, type: 'coin' },
        { x: 300, y: 500, type: 'coin' },
        { x: 520, y: 450, type: 'coin' },

        // First section
        { x: 700, y: 500, type: 'coin' },
        { x: 880, y: 490, type: 'coin' },
        { x: 1010, y: 450, type: 'coin' },
        { x: 1130, y: 410, type: 'coin' },
        { x: 1260, y: 370, type: 'coin' },

        // Mid section
        { x: 1450, y: 400, type: 'coin' },
        { x: 1550, y: 470, type: 'coin' },
        { x: 1690, y: 420, type: 'coin' },
        { x: 1820, y: 370, type: 'coin' },
        { x: 1960, y: 320, type: 'coin' },

        // High platforms
        { x: 2100, y: 270, type: 'coin' },
        { x: 2150, y: 270, type: 'coin' },
        { x: 2300, y: 240, type: 'coin' },
        { x: 2330, y: 180, type: 'coin' },
        { x: 2450, y: 210, type: 'coin' },
        { x: 2500, y: 210, type: 'coin' },

        // Final section
        { x: 2630, y: 270, type: 'coin' },
        { x: 2760, y: 320, type: 'coin' },
        { x: 2880, y: 290, type: 'coin' },
        { x: 3010, y: 250, type: 'coin' },
        { x: 3150, y: 220, type: 'coin' },

        // Power-ups strategically placed
        { x: 520, y: 440, type: 'powerup' },
        { x: 1130, y: 390, type: 'powerup' },
        { x: 1960, y: 240, type: 'powerup' },
        { x: 2470, y: 200, type: 'powerup' }
    ]
};
