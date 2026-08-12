import React from 'react';
import { Crosshair, Dumbbell, Award } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const Navigation = ({ activeTab, setActiveTab }) => {

  const handleTabChange = (tabId) => {
    soundEngine.playClick();
    setActiveTab(tabId);
  };

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'missions' ? 'active' : ''}`}
        onClick={() => handleTabChange('missions')}
      >
        <Crosshair className="nav-icon" />
        <span>MISIONES</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'exercises' ? 'active' : ''}`}
        onClick={() => handleTabChange('exercises')}
      >
        <Dumbbell className="nav-icon" />
        <span>EJERCICIOS</span>
      </button>

      <button 
        className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleTabChange('profile')}
      >
        <Award className="nav-icon" />
        <span>RANGO</span>
      </button>
    </nav>
  );
};
