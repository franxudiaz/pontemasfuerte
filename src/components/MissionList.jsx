import React, { useState } from 'react';
import { WORKOUT_ROUTINES, EXERCISES } from '../data/workoutsData';
import { Play, Clock, Zap, Target, ChevronDown, ChevronUp, CheckSquare, Dumbbell } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const MissionList = ({ onStartRoutine }) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [expandedRoutineId, setExpandedRoutineId] = useState('full_body_official'); // Default expand Full Body

  const filteredRoutines = filterCategory === 'all' 
    ? WORKOUT_ROUTINES 
    : WORKOUT_ROUTINES.filter(r => r.category === filterCategory);

  const categories = [
    { id: 'all', label: 'TODOS' },
    { id: 'full_body', label: 'FULL BODY' },
    { id: 'tren_superior', label: 'SUPERIOR' },
    { id: 'tren_inferior', label: 'INFERIOR' },
    { id: 'core', label: 'CORE' }
  ];

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
          RUTINAS DE ENTRENAMIENTO MULTI-ESTACIÓN
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Circuitos completos secuenciales de combate con seguimiento paso a paso.
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

      {/* Routine Cards */}
      {filteredRoutines.map((routine) => {
        const isExpanded = expandedRoutineId === routine.id;

        return (
          <div key={routine.id} className="tactical-card mission-card">
            <div className="corner-tl tactical-card-corner"></div>
            <div className="corner-tr tactical-card-corner"></div>
            <div className="corner-bl tactical-card-corner"></div>
            <div className="corner-br tactical-card-corner"></div>

            <div className="mission-header">
              <div>
                <span className="mission-code">{routine.code}</span>
                <h3 className="mission-title">{routine.badge} {routine.title}</h3>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0' }}>
              {routine.description}
            </p>

            <div className="mission-tags">
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock style={{ width: 12, height: 12 }} /> {routine.durationMinutes} MIN
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Zap style={{ width: 12, height: 12, color: 'var(--hud-amber)' }} /> +{routine.xpReward} XP
              </span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
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
                border: '1px solid var(--border-tactical)',
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
                <CheckSquare style={{ width: 14, height: 14, color: 'var(--accent-primary)' }} />
                {isExpanded ? 'OCULTAR LISTA DE EJERCICIOS' : `VER LISTA DE EJERCICIOS (${routine.stations.length})`}
              </span>
              {isExpanded ? <ChevronUp style={{ width: 16, height: 16 }} /> : <ChevronDown style={{ width: 16, height: 16 }} />}
            </button>

            {/* Checklist Preview matching user image design */}
            {isExpanded && (
              <div style={{
                background: '#090d09',
                border: '1px solid var(--border-tactical)',
                borderRadius: 6,
                padding: '12px',
                marginTop: 8,
                maxHeight: '320px',
                overflowY: 'auto'
              }}>
                <div style={{
                  fontFamily: 'var(--font-hud)',
                  fontSize: '0.85rem',
                  color: 'var(--accent-primary)',
                  marginBottom: 10,
                  borderBottom: '1px dashed var(--border-tactical)',
                  paddingBottom: 6,
                  display: 'flex',
                  justify: 'space-between'
                }}>
                  <span>ESTRUCTURA DEL CIRCUITO</span>
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
                        borderLeft: '2px solid var(--border-tactical)'
                      }}
                    >
                      <span style={{ 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '0.75rem', 
                        color: 'var(--accent-primary)', 
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
              style={{ marginTop: 10 }}
            >
              <Play style={{ width: 18, height: 18, fill: '#000' }} />
              INICIAR RUTINA COMPLETA
            </button>
          </div>
        );
      })}
    </div>
  );
};
