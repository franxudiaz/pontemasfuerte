import React from 'react';
import { Shield, Eye, Volume2, VolumeX, Award } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const Header = ({ currentXp, userRank, theme, setTheme, soundEnabled, setSoundEnabled }) => {

  const toggleTheme = () => {
    soundEngine.playClick();
    const themes = ['green', 'amber', 'specops'];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const toggleSound = () => {
    const nextSoundState = !soundEnabled;
    setSoundEnabled(nextSoundState);
    soundEngine.soundEnabled = nextSoundState;
    soundEngine.voiceEnabled = nextSoundState;
    if (nextSoundState) {
      soundEngine.playGoBeep();
    }
  };

  // XP calculation for next rank
  const xpInCurrentRank = currentXp - userRank.xpRequired;
  const xpNeededForNextRank = 300; // standard step
  const xpPercent = Math.min(100, Math.max(5, (xpInCurrentRank / xpNeededForNextRank) * 100));

  return (
    <header className="tactical-header">
      <div className="hud-top-bar">
        <div className="hud-title">
          <Shield style={{ width: 22, height: 22 }} />
          <span>COMMANDO FIT</span>
        </div>
        <div className="hud-controls">
          <button className="hud-btn" onClick={toggleTheme} title="Cambiar Visión Táctica">
            <Eye style={{ width: 14, height: 14 }} />
            <span>{theme.toUpperCase()}</span>
          </button>
          <button className="hud-btn" onClick={toggleSound} title="Activar/Desactivar Sonido">
            {soundEnabled ? <Volume2 style={{ width: 14, height: 14 }} /> : <VolumeX style={{ width: 14, height: 14 }} />}
          </button>
        </div>
      </div>

      <div className="rank-bar">
        <span className="rank-icon">{userRank.icon}</span>
        <div className="rank-info">
          <div className="rank-title">
            <span>RANGO: {userRank.title}</span>
            <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>
              {currentXp} XP
            </span>
          </div>
          <div className="xp-progress-bg">
            <div className="xp-progress-fill" style={{ width: `${xpPercent}%` }}></div>
          </div>
        </div>
      </div>
    </header>
  );
};
