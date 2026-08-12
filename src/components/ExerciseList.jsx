import React, { useState } from 'react';
import { EXERCISES } from '../data/workoutsData';
import { Dumbbell, Play, Info, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const ExerciseList = ({ onSelectSingleExercise }) => {
  const [selectedExDetail, setSelectedExDetail] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ 
          fontFamily: 'var(--font-hud)', 
          fontSize: '1.2rem', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 8 
        }}>
          <Dumbbell style={{ color: 'var(--accent-primary)' }} />
          CATÁLOGO DE EJERCICIOS
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Explicaciones ilustradas con IA para cada movimiento táctico.
        </p>
      </div>

      {EXERCISES.map((ex) => (
        <div key={ex.id} className="tactical-card" style={{ padding: 12 }}>
          <div className="corner-tl tactical-card-corner"></div>
          <div className="corner-tr tactical-card-corner"></div>
          <div className="corner-bl tactical-card-corner"></div>
          <div className="corner-br tactical-card-corner"></div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ 
              width: 80, 
              height: 80, 
              borderRadius: 6, 
              overflow: 'hidden', 
              border: '1px solid var(--border-tactical)',
              flexShrink: 0
            }}>
              <img src={ex.image} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '0.9rem', color: '#fff' }}>
                  {ex.name}
                </h3>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.65rem', 
                  background: ex.type === 'timed' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                  color: ex.type === 'timed' ? 'var(--hud-amber)' : '#38bdf8',
                  padding: '2px 6px',
                  borderRadius: 3,
                  border: '1px solid var(--border-tactical)'
                }}>
                  {ex.type === 'timed' ? '⏱️ POR TIEMPO' : '🔢 REPETICIONES'}
                </span>
              </div>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0' }}>
                {ex.muscleGroup}
              </p>

              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedExDetail(selectedExDetail?.id === ex.id ? null : ex);
                  }}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-tactical)',
                    color: 'var(--text-muted)',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    padding: '4px 8px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <Info style={{ width: 12, height: 12 }} />
                  {selectedExDetail?.id === ex.id ? 'OCULTAR' : 'TÁCTICA'}
                </button>

                <button
                  onClick={() => onSelectSingleExercise(ex)}
                  style={{
                    background: 'var(--accent-primary)',
                    color: '#000',
                    border: 'none',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-hud)',
                    fontWeight: 'bold',
                    padding: '4px 10px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <Play style={{ width: 12, height: 12, fill: '#000' }} />
                  INICIAR
                </button>
              </div>
            </div>
          </div>

          {/* Exercise Instructions Detail Drawer */}
          {selectedExDetail?.id === ex.id && (
            <div style={{ 
              marginTop: 12, 
              paddingTop: 12, 
              borderTop: '1px dashed var(--border-tactical)',
              fontSize: '0.8rem',
              color: 'var(--text-main)'
            }}>
              <h4 style={{ fontFamily: 'var(--font-hud)', color: 'var(--accent-primary)', fontSize: '0.75rem', marginBottom: 4 }}>
                📋 TÁCTICA DE EJECUCIÓN:
              </h4>
              <ol style={{ paddingLeft: 16, margin: '4px 0 8px 0', fontFamily: 'var(--font-body)' }}>
                {ex.instructions.map((step, idx) => (
                  <li key={idx} style={{ marginBottom: 3 }}>{step}</li>
                ))}
              </ol>

              <div style={{ 
                background: 'rgba(0,0,0,0.4)', 
                borderLeft: '3px solid var(--hud-amber)', 
                padding: '6px 8px', 
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6
              }}>
                <ShieldAlert style={{ width: 14, height: 14, color: 'var(--hud-amber)', flexShrink: 0, marginTop: 2 }} />
                <span><strong>CONSEJO DEL INSTRUCTOR:</strong> {ex.tacticalTip}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
