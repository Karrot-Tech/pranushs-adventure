// Input handler for keyboard controls

class InputHandler {
    constructor() {
        this.keys = {};

        // Key mappings
        this.keyMap = {
            // Arrow keys
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            // WASD
            'KeyA': 'left',
            'KeyD': 'right',
            'KeyW': 'up',
            'KeyS': 'down',
            // Space for jump
            'Space': 'jump',
            // P for pause
            'KeyP': 'pause',
            // Enter for menu selection
            'Enter': 'enter'
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            const action = this.keyMap[e.code];
            if (action) {
                e.preventDefault();
                this.keys[action] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            const action = this.keyMap[e.code];
            if (action) {
                e.preventDefault();
                this.keys[action] = false;
            }
        });
    }

    isPressed(action) {
        return this.keys[action] === true;
    }

    // Reset all keys (useful when changing game states)
    reset() {
        this.keys = {};
    }
}
