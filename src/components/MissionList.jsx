import React, { useState, useRef } from 'react';
import { WORKOUT_GROUPS } from '../data/workoutsData';
import { Play, Clock, Zap, Target, ChevronDown, ChevronUp, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const MissionList = ({ onStartRoutine }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Track selected level index per workout group { [groupId]: levelIndex } (0: principiante, 1: intermedio, 2: master)
  const [selectedLevels, setSelectedLevels] = useState({
    full_body: 0,
    tren_superior: 0,
    tren_inferior: 0,
    core: 0
  });

  // Track expanded checklist per routine ID
  const [expandedRoutineId, setExpandedRoutineId] = useState(null);

  const containerRefs = useRef({});

  const filteredGroups = filterCategory === 'all' 
    ? WORKOUT_GROUPS 
    : WORKOUT_GROUPS.filter(g => g.category === filterCategory);

  const categories = [
    { id: 'all', label: 'TODOS' },
    { id: 'full_body', label: 'FULL BODY' },
    { id: 'tren_superior', label: 'SUPERIOR' },
    { id: 'tren_inferior', label: 'INFERIOR' },
    { id: 'core', label: 'CORE' }
  ];

  const handleSelectLevel = (groupId, levelIdx) => {
    soundEngine.playClick();
    setSelectedLevels(prev => ({ ...prev, [groupId]: levelIdx }));

    // Scroll carousel smoothly to target slide
    const container = containerRefs.current[groupId];
    if (container) {
      const slideWidth = container.clientWidth;
      container.scrollTo({
        left: slideWidth * levelIdx,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (groupId, e) => {
    const container = e.target;
    const slideWidth = container.clientWidth;
    if (!slideWidth) return;
    const currentIdx = Math.round(container.scrollLeft / slideWidth);
    if (selectedLevels[groupId] !== currentIdx && currentIdx >= 0 && currentIdx <= 2) {
      setSelectedLevels(prev => ({ ...prev, [groupId]: currentIdx }));
    }
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Page Section Title */}
      <div style={{ 
        background: '#0d140e',
        border: '1px solid var(--border-tactical-subtle)',
        borderLeft: '4px solid var(--accent-primary)',
        padding: '10px 12px',
        borderRadius: 6,
        marginBottom: 14
      }}>
        <h2 style={{ 
          fontFamily: 'var(--font-hud)', 
          fontSize: '1rem', 
          color: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8 
        }}>
          <Target style={{ color: 'var(--accent-primary)', width: 20, height: 20 }} />
          CIRCUITOS Y NIVELES DE ENTRENAMIENTO
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
          Selecciona tu grupo de entrenamiento y desliza horizontalmente 👈 👉 para cambiar de nivel.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div style={{ 
        display: 'flex', 
        gap: 6, 
        overflowX: 'auto', 
        paddingBottom: 8, 
        marginBottom: 14,
        scrollbarWidth: 'none',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              soundEngine.playClick();
              setFilterCategory(cat.id);
            }}
            style={{
              background: filterCategory === cat.id ? 'var(--accent-primary)' : '#0d140d',
              color: filterCategory === cat.id ? '#000000' : 'var(--text-main)',
              border: '1px solid var(--border-tactical)',
              padding: '6px 12px',
              borderRadius: 4,
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: filterCategory === cat.id ? '800' : '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Workout Groups */}
      {filteredGroups.map((group) => {
        const activeLevelIdx = selectedLevels[group.id] || 0;

        return (
          <div key={group.id} style={{ marginBottom: 22, width: '100%', boxSizing: 'border-box' }}>
            {/* Group Title Header */}
            <div style={{ 
              display: 'flex', 
              justify: 'space-between', 
              alignItems: 'center',
              marginBottom: 8,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid var(--border-tactical-subtle)',
              padding: '6px 10px',
              borderRadius: 6
            }}>
              <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '0.95rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{group.badge}</span>
                <span>{group.title}</span>
              </h3>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.7rem', 
                color: 'var(--accent-primary)',
                background: 'rgba(34,197,94,0.15)',
                padding: '2px 6px',
                borderRadius: 4,
                border: '1px solid var(--border-tactical-subtle)'
              }}>
                3 NIVELES
              </span>
            </div>

            {/* Segmented Level Selector Tabs */}
            <div className="level-switcher-bar">
              {group.levels.map((lvl, idx) => {
                const isActive = idx === activeLevelIdx;
                return (
                  <button
                    key={lvl.id}
                    className={`level-switcher-btn ${isActive ? 'active' : ''}`}
                    style={{
                      background: isActive ? lvl.badgeColor : 'transparent',
                      color: isActive ? '#000000' : 'var(--text-main)',
                      border: isActive ? `1px solid ${lvl.badgeColor}` : 'none'
                    }}
                    onClick={() => handleSelectLevel(group.id, idx)}
                  >
                    <span>{lvl.badgeIcon}</span>
                    <span>{lvl.levelTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Swipe Cue Banner */}
            <div className="swipe-hint-banner">
              <button 
                onClick={() => activeLevelIdx > 0 && handleSelectLevel(group.id, activeLevelIdx - 1)}
                style={{ background: 'none', border: 'none', color: activeLevelIdx > 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
                disabled={activeLevelIdx === 0}
              >
                <ChevronLeft style={{ width: 16, height: 16 }} />
              </button>

              <span>👈 DESLIZA PARA CAMBIAR NIVEL ({activeLevelIdx + 1}/3) 👉</span>

              <button 
                onClick={() => activeLevelIdx < 2 && handleSelectLevel(group.id, activeLevelIdx + 1)}
                style={{ background: 'none', border: 'none', color: activeLevelIdx < 2 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
                disabled={activeLevelIdx === 2}
              >
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* Horizontal Snap Scroll Track */}
            <div className="carousel-snap-wrapper">
              <div 
                className="carousel-track-container"
                ref={el => containerRefs.current[group.id] = el}
                onScroll={(e) => handleScroll(group.id, e)}
              >
                {group.levels.map((routine) => {
                  const isExpanded = expandedRoutineId === routine.id;

                  return (
                    <div key={routine.id} className="carousel-slide-card">
                      <div className="tactical-card mission-card" style={{ borderTopColor: routine.badgeColor }}>
                        <div className="corner-tl tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>
                        <div className="corner-tr tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>
                        <div className="corner-bl tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>
                        <div className="corner-br tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>

                        {/* Card Header Tag & Title */}
                        <div className="mission-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            <span className="mission-code" style={{ borderColor: routine.badgeColor }}>
                              {routine.code}
                            </span>
                            <span style={{ 
                              fontFamily: 'var(--font-hud)',
                              fontSize: '0.65rem',
                              fontWeight: 'bold',
                              background: routine.badgeColor,
                              color: '#000000',
                              padding: '2px 8px',
                              borderRadius: 4
                            }}>
                              {routine.difficultyTag}
                            </span>
                          </div>

                          <h4 className="mission-title" style={{ marginTop: 4 }}>
                            {routine.badgeIcon} {group.title} {routine.levelTitle}
                          </h4>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0', lineHeight: 1.4 }}>
                          {routine.description}
                        </p>

                        <div className="mission-tags">
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Clock style={{ width: 13, height: 13, color: 'var(--accent-primary)' }} /> ~{routine.durationMinutes} MIN
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                            <Zap style={{ width: 13, height: 13, color: 'var(--hud-amber)' }} /> +{routine.xpReward} XP
                          </span>
                          <span style={{ background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: 4, border: `1px solid ${routine.badgeColor}`, color: '#ffffff', fontWeight: 'bold' }}>
                            {routine.stations.length} ESTACIONES
                          </span>
                        </div>

                        {/* Expand / Collapse Checklist Drawer Button */}
                        <button
                          onClick={() => {
                            soundEngine.playClick();
                            setExpandedRoutineId(isExpanded ? null : routine.id);
                          }}
                          style={{
                            background: 'rgba(0,0,0,0.7)',
                            border: `1px solid ${routine.badgeColor}`,
                            color: '#ffffff',
                            padding: '9px 12px',
                            borderRadius: 6,
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.82rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            justify: 'space-between',
                            alignItems: 'center',
                            marginTop: 6,
                            width: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <CheckSquare style={{ width: 16, height: 16, color: routine.badgeColor }} />
                            {isExpanded ? 'OCULTAR DESGLOSE DE EJERCICIOS' : `VER DESGLOSE DE EJERCICIOS (${routine.stations.length})`}
                          </span>
                          {isExpanded ? <ChevronUp style={{ width: 16, height: 16 }} /> : <ChevronDown style={{ width: 16, height: 16 }} />}
                        </button>

                        {/* High-Contrast Checklist Drawer */}
                        {isExpanded && (
                          <div style={{
                            background: '#070c08',
                            border: `1.5px solid ${routine.badgeColor}`,
                            borderRadius: 6,
                            padding: '10px',
                            marginTop: 8,
                            maxHeight: '280px',
                            overflowY: 'auto',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}>
                            <div style={{
                              fontFamily: 'var(--font-hud)',
                              fontSize: '0.78rem',
                              color: routine.badgeColor,
                              marginBottom: 8,
                              borderBottom: '1px solid rgba(255,255,255,0.15)',
                              paddingBottom: 6,
                              display: 'flex',
                              justify: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span>LISTA DEL CIRCUITO {routine.levelTitle}</span>
                              <span style={{ background: routine.badgeColor, color: '#000', padding: '2px 6px', borderRadius: 3, fontWeight: 'bold' }}>
                                {routine.stations.length} PASOS
                              </span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                              {routine.stations.map((st, idx) => (
                                <div 
                                  key={st.id} 
                                  style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 10,
                                    padding: '7px 10px',
                                    background: idx % 2 === 0 ? '#121a14' : '#0d130e',
                                    borderRadius: 4,
                                    borderLeft: `3px solid ${routine.badgeColor}`,
                                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                                  }}
                                >
                                  <span style={{ 
                                    fontFamily: 'var(--font-mono)', 
                                    fontSize: '0.72rem', 
                                    fontWeight: 'bold',
                                    background: routine.badgeColor,
                                    color: '#000000',
                                    padding: '2px 6px',
                                    borderRadius: 3,
                                    minWidth: 26,
                                    textAlign: 'center'
                                  }}>
                                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                  </span>
                                  <span style={{ 
                                    fontFamily: 'var(--font-body)', 
                                    fontSize: '0.88rem', 
                                    fontWeight: '700',
                                    color: '#ffffff',
                                    flex: 1
                                  }}>
                                    {st.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <button 
                          className="mission-btn"
                          onClick={() => onStartRoutine(routine)}
                          style={{
                            background: `linear-gradient(135deg, ${routine.badgeColor} 0%, #15803d 100%)`,
                            marginTop: 10
                          }}
                        >
                          <Play style={{ width: 18, height: 18, fill: '#000000' }} />
                          INICIAR NIVEL {routine.levelTitle}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="carousel-dots">
              {group.levels.map((lvl, idx) => (
                <div
                  key={lvl.id}
                  className={`carousel-dot ${idx === activeLevelIdx ? 'active' : ''}`}
                  style={{
                    background: idx === activeLevelIdx ? lvl.badgeColor : 'rgba(255,255,255,0.25)'
                  }}
                  onClick={() => handleSelectLevel(group.id, idx)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
