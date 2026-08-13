import React from 'react';
import { Play, Clock, Zap, Target, X, CheckCircle2, Dumbbell, ShieldAlert, ChevronRight } from 'lucide-react';
import { EXERCISES } from '../data/workoutsData';
import { soundEngine } from '../audio/soundEngine';

export const RoutineDetailModal = ({ routine, onClose, onStartWorkout }) => {
  if (!routine) return null;

  return (
    <div className="player-screen">
      {/* Detail Modal Header */}
      <div className="player-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.72rem', 
            color: '#000',
            background: routine.badgeColor,
            fontWeight: 'bold',
            padding: '2px 8px',
            borderRadius: 4
          }}>
            {routine.code}
          </span>
          <h2 style={{ fontFamily: 'var(--font-hud)', fontSize: '1rem', color: '#fff' }}>
            FICHA DE MISIÓN
          </h2>
        </div>

        <button 
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X style={{ width: 24, height: 24 }} />
        </button>
      </div>

      {/* Body Content */}
      <div className="player-body" style={{ gap: 14 }}>
        {/* Title Banner */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--border-tactical-subtle)',
          borderTop: `4px solid ${routine.badgeColor}`,
          borderRadius: 8,
          padding: 14,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '1.2rem', color: '#ffffff' }}>
              {routine.badgeIcon} {routine.title || routine.levelTitle}
            </h3>
            <span style={{ 
              fontFamily: 'var(--font-hud)', 
              fontSize: '0.7rem', 
              background: routine.badgeColor,
              color: '#000',
              fontWeight: 'bold',
              padding: '2px 8px',
              borderRadius: 4
            }}>
              {routine.difficultyTag}
            </span>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {routine.description}
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Clock style={{ width: 14, height: 14, color: 'var(--accent-primary)' }} /> ~{routine.durationMinutes} MIN
            </span>
            <span style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
              <Zap style={{ width: 14, height: 14, color: 'var(--hud-amber)' }} /> +{routine.xpReward} XP
            </span>
            <span style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: 4, border: `1px solid ${routine.badgeColor}`, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#fff', fontWeight: 'bold' }}>
              {routine.stations.length} ESTACIONES
            </span>
          </div>
        </div>

        {/* Full Circuit Breakdown List */}
        <div style={{
          background: '#070c08',
          border: `1.5px solid ${routine.badgeColor}`,
          borderRadius: 8,
          padding: 12,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{
            fontFamily: 'var(--font-hud)',
            fontSize: '0.85rem',
            color: routine.badgeColor,
            marginBottom: 10,
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            paddingBottom: 6,
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center'
          }}>
            <span>DESGLOSE COMPLETO DEL CIRCUITO</span>
            <span style={{ background: routine.badgeColor, color: '#000', padding: '2px 6px', borderRadius: 3, fontWeight: 'bold' }}>
              {routine.stations.length} PASOS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: '280px', overflowY: 'auto' }}>
            {routine.stations.map((st, idx) => {
              const fullEx = EXERCISES.find(e => e.id === st.exerciseId);
              return (
                <div 
                  key={st.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 10,
                    padding: '8px 10px',
                    background: idx % 2 === 0 ? '#121a14' : '#0d130e',
                    borderRadius: 6,
                    borderLeft: `4px solid ${routine.badgeColor}`,
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <span style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    background: routine.badgeColor,
                    color: '#000000',
                    padding: '3px 6px',
                    borderRadius: 4,
                    minWidth: 28,
                    textAlign: 'center'
                  }}>
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>
                      {st.name}
                    </div>
                    {fullEx && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {fullEx.muscleGroup}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Action Button inside Detail Screen */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onStartWorkout(routine);
          }}
          style={{
            width: '100%',
            background: `linear-gradient(135deg, ${routine.badgeColor} 0%, #15803d 100%)`,
            color: '#000000',
            fontFamily: 'var(--font-hud)',
            fontSize: '1.1rem',
            fontWeight: '900',
            letterSpacing: 1,
            padding: '16px',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            gap: 10,
            boxShadow: `0 0 25px ${routine.badgeColor}66`,
            marginTop: 'auto'
          }}
        >
          <Play style={{ width: 24, height: 24, fill: '#000000' }} />
          DARLE AL PLAY / INICIAR
        </button>
      </div>
    </div>
  );
};
