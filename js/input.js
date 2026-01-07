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
        // Keyboard events
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

        // Touch controls for mobile
        this.setupTouchControls();
    }

    setupTouchControls() {
        // Get mobile control buttons
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');
        const jumpBtn = document.getElementById('jumpBtn');

        if (leftBtn) {
            leftBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys['left'] = true;
            });
            leftBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys['left'] = false;
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys['right'] = true;
            });
            rightBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys['right'] = false;
            });
        }

        if (jumpBtn) {
            jumpBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.keys['jump'] = true;
            });
            jumpBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keys['jump'] = false;
            });
        }
    }

    isPressed(action) {
        return this.keys[action] === true;
    }

    // Reset all keys (useful when changing game states)
    reset() {
        this.keys = {};
    }
}
