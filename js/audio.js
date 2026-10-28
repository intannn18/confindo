/**
 * CONFindo - Web Audio API Sound Chime Utilities
 * Generates pleasant tones for timer milestones and button clicks without external sound files
 */

class ConfAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(frequency, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play prevented', e);
    }
  }

  playStart() {
    this.playTone(523.25, 'sine', 0.15, 0.15); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.25, 0.2), 120); // E5
  }

  playTick() {
    this.playTone(800, 'triangle', 0.04, 0.04);
  }

  playWarning() {
    // 10s warning
    this.playTone(440, 'sine', 0.1, 0.12);
    setTimeout(() => this.playTone(440, 'sine', 0.15, 0.15), 180);
  }

  playSuccess() {
    // Completion chime
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.35, 0.22);
      }, idx * 110);
    });
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0.05);
  }
}

const confAudio = new ConfAudio();
