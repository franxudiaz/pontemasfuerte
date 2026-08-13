// Web Audio API, Speech Synthesizer & Music Player for Tactical Workout App

class TacticalSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
    this.musicAudio = null;
    this.isMusicPlaying = false;
    this.onMusicStateChange = null;
  }

  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a simple frequency beep
  playTone(frequency, durationMs, type = 'sine', volume = 0.3) {
    if (!this.soundEnabled) return;
    try {
      this.initAudio();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.audioCtx.currentTime + (durationMs / 1000));

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + (durationMs / 1000));
    } catch (e) {
      console.warn('Audio context error:', e);
    }
  }

  // Countdown warning beep (low tone)
  playCountdownBeep() {
    this.playTone(440, 180, 'square', 0.25);
  }

  // Start / GO beep (high tone)
  playGoBeep() {
    this.playTone(880, 400, 'triangle', 0.4);
  }

  // Rest phase beep
  playRestBeep() {
    this.playTone(330, 300, 'sawtooth', 0.3);
  }

  // Tactical click tone
  playClick() {
    this.playTone(600, 40, 'sine', 0.15);
  }

  // Mission Complete Victory Fanfare
  playVictory() {
    if (!this.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 250, 'triangle', 0.35);
      }, idx * 180);
    });
  }

  // Drill Sergeant voice announcements using Web Speech API
  speak(text) {
    if (!this.voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.1; // Slightly fast and energetic
      utterance.pitch = 0.8; // Lower, firm voice tone
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }

  // Tactical Background Music Player ("Señor, dame paciencia!.mp3")
  initMusic() {
    if (!this.musicAudio) {
      this.musicAudio = new Audio('/music.mp3');
      this.musicAudio.loop = true;
      this.musicAudio.volume = 0.7;

      this.musicAudio.addEventListener('play', () => {
        this.isMusicPlaying = true;
        if (this.onMusicStateChange) this.onMusicStateChange(true);
      });

      this.musicAudio.addEventListener('pause', () => {
        this.isMusicPlaying = false;
        if (this.onMusicStateChange) this.onMusicStateChange(false);
      });

      this.musicAudio.addEventListener('ended', () => {
        this.isMusicPlaying = false;
        if (this.onMusicStateChange) this.onMusicStateChange(false);
      });
    }
  }

  playMusic() {
    this.initMusic();
    if (this.musicAudio) {
      const promise = this.musicAudio.play();
      if (promise !== undefined) {
        promise.then(() => {
          this.isMusicPlaying = true;
          if (this.onMusicStateChange) this.onMusicStateChange(true);
        }).catch(err => {
          console.warn('Music play failed:', err);
          this.isMusicPlaying = false;
          if (this.onMusicStateChange) this.onMusicStateChange(false);
        });
      }
    }
  }

  pauseMusic() {
    if (this.musicAudio && !this.musicAudio.paused) {
      this.musicAudio.pause();
      this.isMusicPlaying = false;
      if (this.onMusicStateChange) this.onMusicStateChange(false);
    }
  }

  stopMusic() {
    if (this.musicAudio) {
      this.musicAudio.pause();
      this.musicAudio.currentTime = 0;
      this.isMusicPlaying = false;
      if (this.onMusicStateChange) this.onMusicStateChange(false);
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }
}

export const soundEngine = new TacticalSoundEngine();
