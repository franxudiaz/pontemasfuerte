import React, { useState, useRef } from 'react';
import { WORKOUT_GROUPS } from '../data/workoutsData';
import { Play, Clock, Zap, Target, ChevronDown, ChevronUp, CheckSquare, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
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

    // Scroll carousel to slide
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
    const currentIdx = Math.round(container.scrollLeft / slideWidth);
    if (selectedLevels[groupId] !== currentIdx && currentIdx >= 0 && currentIdx <= 2) {
      setSelectedLevels(prev => ({ ...prev, [groupId]: currentIdx }));
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ 
          fontFamily: 'var(--font-hud)', 
          fontSize: '1.1rem', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8 
        }}>
          <Target style={{ color: 'var(--accent-primary)' }} />
          CIRCUITOS Y NIVELES DE DIFICULTAD
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Desliza lateralmente 👈 👉 para seleccionar Principiante, Intermedio o Master.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ 
        display: 'flex', 
        gap: 6, 
        overflowX: 'auto', 
        paddingBottom: 10, 
        marginBottom: 16,
        scrollbarWidth: 'none'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              soundEngine.playClick();
              setFilterCategory(cat.id);
            }}
            style={{
              background: filterCategory === cat.id ? 'var(--accent-primary)' : 'rgba(0,0,0,0.6)',
              color: filterCategory === cat.id ? '#000' : 'var(--text-muted)',
              border: '1px solid var(--border-tactical)',
              padding: '6px 12px',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: filterCategory === cat.id ? 'bold' : 'normal',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Workout Groups with Horizontal Carousel per Group */}
      {filteredGroups.map((group) => {
        const activeLevelIdx = selectedLevels[group.id] || 0;
        const currentLevelObj = group.levels[activeLevelIdx];

        return (
          <div key={group.id} style={{ marginBottom: 24 }}>
            {/* Group Header */}
            <div style={{ 
              display: 'flex', 
              justify: 'space-between', 
              alignItems: 'center',
              marginBottom: 8,
              borderBottom: '1px solid var(--border-tactical)',
              paddingBottom: 4
            }}>
              <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{group.badge}</span>
                <span>{group.title}</span>
              </h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
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
                      color: isActive ? '#000' : 'var(--text-main)',
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

              <span>👈 DESLIZA PARA CAMBIAR DIFICULTAD ({activeLevelIdx + 1}/3) 👉</span>

              <button 
                onClick={() => activeLevelIdx < 2 && handleSelectLevel(group.id, activeLevelIdx + 1)}
                style={{ background: 'none', border: 'none', color: activeLevelIdx < 2 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)', cursor: 'pointer' }}
                disabled={activeLevelIdx === 2}
              >
                <ChevronRight style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* Horizontal Snap Scroll Track */}
            <div 
              className="carousel-track-container"
              ref={el => containerRefs.current[group.id] = el}
              onScroll={(e) => handleScroll(group.id, e)}
            >
              {group.levels.map((routine) => {
                const isExpanded = expandedRoutineId === routine.id;

                return (
                  <div key={routine.id} className="carousel-slide-card">
                    <div className="tactical-card mission-card" style={{ borderColor: routine.badgeColor }}>
                      <div className="corner-tl tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>
                      <div className="corner-tr tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>
                      <div className="corner-bl tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>
                      <div className="corner-br tactical-card-corner" style={{ borderColor: routine.badgeColor }}></div>

                      <div className="mission-header">
                        <div>
                          <span className="mission-code" style={{ borderColor: routine.badgeColor, color: routine.badgeColor }}>
                            {routine.code}
                          </span>
                          <h4 className="mission-title" style={{ marginTop: 4 }}>
                            {routine.badgeIcon} {group.title} {routine.levelTitle}
                          </h4>
                        </div>
                        <span style={{ 
                          fontFamily: 'var(--font-hud)',
                          fontSize: '0.65rem',
                          background: 'rgba(0,0,0,0.6)',
                          color: routine.badgeColor,
                          border: `1px solid ${routine.badgeColor}`,
                          padding: '3px 8px',
                          borderRadius: 4
                        }}>
                          {routine.difficultyTag}
                        </span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0' }}>
                        {routine.description}
                      </p>

                      <div className="mission-tags">
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock style={{ width: 12, height: 12 }} /> ~{routine.durationMinutes} MIN
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Zap style={{ width: 12, height: 12, color: 'var(--hud-amber)' }} /> +{routine.xpReward} XP
                        </span>
                        <span style={{ color: routine.badgeColor, fontWeight: 'bold' }}>
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
                          background: 'rgba(0,0,0,0.5)',
                          border: `1px solid ${routine.badgeColor}`,
                          color: 'var(--text-main)',
                          padding: '8px 12px',
                          borderRadius: 4,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center',
                          marginTop: 6
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <CheckSquare style={{ width: 14, height: 14, color: routine.badgeColor }} />
                          {isExpanded ? 'OCULTAR LISTA DE EJERCICIOS' : `VER LISTA DE EJERCICIOS (${routine.stations.length})`}
                        </span>
                        {isExpanded ? <ChevronUp style={{ width: 16, height: 16 }} /> : <ChevronDown style={{ width: 16, height: 16 }} />}
                      </button>

                      {/* Checklist Drawer */}
                      {isExpanded && (
                        <div style={{
                          background: '#090d09',
                          border: `1px solid ${routine.badgeColor}`,
                          borderRadius: 6,
                          padding: '12px',
                          marginTop: 8,
                          maxHeight: '300px',
                          overflowY: 'auto'
                        }}>
                          <div style={{
                            fontFamily: 'var(--font-hud)',
                            fontSize: '0.8rem',
                            color: routine.badgeColor,
                            marginBottom: 10,
                            borderBottom: '1px dashed rgba(255,255,255,0.1)',
                            paddingBottom: 6,
                            display: 'flex',
                            justify: 'space-between'
                          }}>
                            <span>CIRCUITO {routine.levelTitle}</span>
                            <span>{routine.stations.length} PASOS</span>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {routine.stations.map((st, idx) => (
                              <div 
                                key={st.id} 
                                style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 10,
                                  padding: '6px 8px',
                                  background: 'rgba(255,255,255,0.03)',
                                  borderRadius: 4,
                                  borderLeft: `2px solid ${routine.badgeColor}`
                                }}
                              >
                                <span style={{ 
                                  fontFamily: 'var(--font-mono)', 
                                  fontSize: '0.75rem', 
                                  color: routine.badgeColor, 
                                  width: 20 
                                }}>
                                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                                <span style={{ 
                                  fontFamily: 'var(--font-hud)', 
                                  fontSize: '0.8rem', 
                                  color: '#fff',
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
                        <Play style={{ width: 18, height: 18, fill: '#000' }} />
                        INICIAR NIVEL {routine.levelTitle}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="carousel-dots">
              {group.levels.map((lvl, idx) => (
                <div
                  key={lvl.id}
                  className={`carousel-dot ${idx === activeLevelIdx ? 'active' : ''}`}
                  style={{
                    background: idx === activeLevelIdx ? lvl.badgeColor : 'rgba(255,255,255,0.2)'
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
