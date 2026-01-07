// Sound effects using Web Audio API

class SoundEffects {
    constructor() {
        // Create audio context
        this.audioContext = null;
        this.enabled = true;

        // Initialize on first user interaction (browsers require this)
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    // Helper to create oscillator
    createOscillator(frequency, type = 'sine') {
        if (!this.enabled || !this.initialized) return null;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = type;
        oscillator.frequency.value = frequency;

        return { oscillator, gainNode };
    }

    // Jump sound
    jump() {
        this.init();
        if (!this.enabled) return;

        const { oscillator, gainNode } = this.createOscillator(400, 'square');
        if (!oscillator) return;

        const now = this.audioContext.currentTime;

        // Frequency sweep up
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.1);

        // Volume envelope
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Coin collect sound
    coin() {
        this.init();
        if (!this.enabled) return;

        const { oscillator, gainNode } = this.createOscillator(800, 'sine');
        if (!oscillator) return;

        const now = this.audioContext.currentTime;

        // Quick blip upward
        oscillator.frequency.setValueAtTime(800, now);
        oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        oscillator.start(now);
        oscillator.stop(now + 0.05);
    }

    // Power-up sound
    powerUp() {
        this.init();
        if (!this.enabled) return;

        const { oscillator, gainNode } = this.createOscillator(400, 'sawtooth');
        if (!oscillator) return;

        const now = this.audioContext.currentTime;

        // Ascending arpeggio
        oscillator.frequency.setValueAtTime(400, now);
        oscillator.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        oscillator.frequency.exponentialRampToValueAtTime(1000, now + 0.3);

        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Enemy stomp sound
    stomp() {
        this.init();
        if (!this.enabled) return;

        const { oscillator, gainNode } = this.createOscillator(150, 'square');
        if (!oscillator) return;

        const now = this.audioContext.currentTime;

        // Low thump
        oscillator.frequency.setValueAtTime(150, now);
        oscillator.frequency.exponentialRampToValueAtTime(50, now + 0.1);

        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        oscillator.start(now);
        oscillator.stop(now + 0.1);
    }

    // Damage/hit sound
    damage() {
        this.init();
        if (!this.enabled) return;

        const { oscillator, gainNode } = this.createOscillator(200, 'sawtooth');
        if (!oscillator) return;

        const now = this.audioContext.currentTime;

        // Harsh descending sound
        oscillator.frequency.setValueAtTime(300, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.2);

        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    // Level complete sound
    levelComplete() {
        this.init();
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;

        // Play a victory fanfare (three notes)
        const notes = [
            { freq: 523, time: 0 },      // C
            { freq: 659, time: 0.15 },   // E
            { freq: 784, time: 0.3 }     // G
        ];

        notes.forEach(note => {
            const { oscillator, gainNode } = this.createOscillator(note.freq, 'sine');
            if (!oscillator) return;

            const startTime = now + note.time;

            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.3);
        });
    }

    // Game over sound
    gameOver() {
        this.init();
        if (!this.enabled) return;

        const now = this.audioContext.currentTime;

        // Descending sad notes
        const notes = [
            { freq: 392, time: 0 },      // G
            { freq: 349, time: 0.2 },    // F
            { freq: 330, time: 0.4 },    // E
            { freq: 262, time: 0.6 }     // C
        ];

        notes.forEach(note => {
            const { oscillator, gainNode } = this.createOscillator(note.freq, 'sine');
            if (!oscillator) return;

            const startTime = now + note.time;

            gainNode.gain.setValueAtTime(0.25, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.25);
        });
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Mute/unmute
    mute() {
        this.enabled = false;
    }

    unmute() {
        this.enabled = true;
    }
}
