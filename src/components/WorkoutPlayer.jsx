import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Check, CheckSquare, ListChecks, ShieldAlert, Zap, Clock } from 'lucide-react';
import { EXERCISES } from '../data/workoutsData';
import { soundEngine } from '../audio/soundEngine';

export const WorkoutPlayer = ({ workoutSession, onClose, onCompleteSession }) => {
  const { title, stations } = workoutSession;

  const [currentStationIdx, setCurrentStationIdx] = useState(0);
  const [completedStations, setCompletedStations] = useState({}); // { [stationId]: true }
  const [showChecklistDrawer, setShowChecklistDrawer] = useState(false);

  // Stopwatch / Timer for active station
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const timerRef = useRef(null);

  const currentStation = stations[currentStationIdx];
  const exerciseObj = EXERCISES.find(e => e.id === currentStation.exerciseId) || EXERCISES[0];

  // Reset timer on station change
  useEffect(() => {
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  }, [currentStationIdx]);

  // Stopwatch timer interval
  useEffect(() => {
    if (!isTimerRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, currentStationIdx]);

  // Mark current station as completed and move to next
  const handleCompleteCurrentStation = () => {
    soundEngine.playClick();
    soundEngine.playGoBeep();

    const newCompleted = { ...completedStations, [currentStation.id]: true };
    setCompletedStations(newCompleted);

    if (currentStationIdx < stations.length - 1) {
      const nextSt = stations[currentStationIdx + 1];
      soundEngine.speak(`¡Estación completada! Siguiente: ${nextSt.name}`);
      setCurrentStationIdx(currentStationIdx + 1);
    } else {
      // All stations completed!
      soundEngine.playVictory();
      soundEngine.speak('¡Entrenamiento completo finalizado con éxito!');
      onCompleteSession();
    }
  };

  const toggleCheckStation = (stId) => {
    soundEngine.playClick();
    setCompletedStations((prev) => ({
      ...prev,
      [stId]: !prev[stId]
    }));
  };

  const jumpToStation = (idx) => {
    soundEngine.playClick();
    setCurrentStationIdx(idx);
    setShowChecklistDrawer(false);
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const completedCount = Object.keys(completedStations).filter(k => completedStations[k]).length;
  const progressPercent = Math.round((completedCount / stations.length) * 100);

  return (
    <div className="player-screen">
      {/* Header */}
      <div className="player-header">
        <div>
          <span style={{ 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.7rem', 
            color: 'var(--accent-primary)',
            background: 'rgba(0,0,0,0.5)',
            padding: '2px 6px',
            border: '1px solid var(--border-tactical)',
            borderRadius: 3
          }}>
            {title} ({currentStationIdx + 1}/{stations.length})
          </span>
          <h2 style={{ fontFamily: 'var(--font-hud)', fontSize: '1rem', color: '#fff', marginTop: 2 }}>
            ESTACIÓN {currentStationIdx + 1}: {currentStation.name}
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

      {/* Routine Overall Progress Bar */}
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        borderBottom: '1px solid var(--border-tactical)',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)'
      }}>
        <span>PROGRESO DEL CIRCUITO: {completedCount}/{stations.length}</span>
        <button
          onClick={() => {
            soundEngine.playClick();
            setShowChecklistDrawer(!showChecklistDrawer);
          }}
          style={{
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid var(--border-tactical)',
            color: 'var(--accent-primary)',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: '0.7rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <ListChecks style={{ width: 14, height: 14 }} />
          {showChecklistDrawer ? 'OCULTAR LISTA' : 'VER RUTINA ENTERA'}
        </button>
      </div>

      {/* Main Body */}
      <div className="player-body">
        {/* Full Checklist Overlay Drawer */}
        {showChecklistDrawer ? (
          <div style={{
            width: '100%',
            background: '#090d09',
            border: '2px solid var(--border-tactical)',
            borderRadius: 8,
            padding: 14,
            maxHeight: '420px',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: 10 }}>
              LISTA COMPLETA DE ENTRENAMIENTO ({stations.length} ESTACIONES)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {stations.map((st, idx) => {
                const isDone = !!completedStations[st.id];
                const isCurrent = idx === currentStationIdx;

                return (
                  <div
                    key={st.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 10px',
                      background: isCurrent ? 'rgba(34, 197, 94, 0.2)' : isDone ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.4)',
                      border: isCurrent ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                    onClick={() => jumpToStation(idx)}
                  >
                    <input 
                      type="checkbox" 
                      checked={isDone}
                      onChange={() => toggleCheckStation(st.id)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ width: 18, height: 18, accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: isDone ? 'var(--text-muted)' : '#fff', textDecoration: isDone ? 'line-through' : 'none', flex: 1 }}>
                      {idx + 1}. {st.name}
                    </span>
                    {isCurrent && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                        [EN CURSO]
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            {/* Active Exercise AI Image */}
            <div className="exercise-img-container">
              <img src={exerciseObj.image} alt={exerciseObj.name} className="exercise-img" />
              <div className="exercise-img-overlay">
                <span>ESTACIÓN {currentStationIdx + 1} DE {stations.length}</span>
                <span style={{ color: 'var(--accent-primary)' }}>🔥 EN COMBATE</span>
              </div>
            </div>

            {/* Reps / Distance Target Banner */}
            <div style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--border-tactical)',
              borderRadius: 10,
              padding: '16px 24px',
              textAlign: 'center',
              width: '100%',
              boxShadow: '0 0 20px rgba(0,0,0,0.6)'
            }}>
              <span style={{ 
                fontFamily: 'var(--font-hud)', 
                fontSize: '2rem', 
                fontWeight: '900', 
                color: '#fff',
                letterSpacing: 1
              }}>
                {currentStation.reps}
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-primary)', marginTop: 4 }}>
                OBJETIVO DE LA ESTACIÓN
              </div>
            </div>

            {/* Stopwatch Timer for active station */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              fontFamily: 'var(--font-hud)',
              fontSize: '1.4rem',
              color: 'var(--hud-amber)',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--border-tactical)',
              padding: '6px 16px',
              borderRadius: 6
            }}>
              <Clock style={{ width: 18, height: 18 }} />
              <span>TIEMPO: {formatTime(secondsElapsed)}</span>
            </div>

            {/* Tactical Tip */}
            <div style={{ 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid var(--border-tactical)', 
              padding: '10px 14px', 
              borderRadius: 6,
              width: '100%',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <ShieldAlert style={{ width: 16, height: 16, color: 'var(--accent-primary)', flexShrink: 0 }} />
              <span>{exerciseObj.tacticalTip}</span>
            </div>

            {/* Complete Station Button */}
            <button
              onClick={handleCompleteCurrentStation}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #15803d 100%)',
                color: '#000',
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
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 0 25px var(--accent-glow)',
                marginTop: 'auto'
              }}
            >
              <Check style={{ width: 24, height: 24, strokeWidth: 3 }} />
              ESTACIÓN COMPLETADA (SIGUIENTE)
            </button>
          </>
        )}
      </div>
    </div>
  );
};
