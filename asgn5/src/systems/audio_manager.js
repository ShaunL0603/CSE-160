export class AudioManager {
    constructor() {
        this.context = null;
        this.masterGain = null;
    }

    init() {
        // Instantiate Audio Context upon first physical interaction
        if (!this.context) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContextClass();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.setValueAtTime(0.5, this.context.currentTime); // Master Vol (50%)
            this.masterGain.connect(this.context.destination);
        }
        
        // Resume context if suspended (browser standard security policy)
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
    }
    
    playSound(buffer, volume = 1.0) {
        if (!this.context) return;
        this.init(); // Auto-check lifecycle

        const source = this.context.createBufferSource();
        source.buffer = buffer;

        const gainNode = this.context.createGain();
        gainNode.gain.setValueAtTime(volume, this.context.currentTime);

        source.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        source.start(0);
    }

    // Fallback synthesizer to generate gun sounds dynamically if files are missing
    synthesizeBeep(freq, duration, type = 'sine') {
        if (!this.context) return;
        this.init();

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.context.currentTime);
        
        gain.gain.setValueAtTime(0.3, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.context.currentTime + duration);
    }
}