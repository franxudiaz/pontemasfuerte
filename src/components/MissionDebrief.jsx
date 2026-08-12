import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Zap, CheckCircle2, Shield } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const MissionDebrief = ({ session, xpEarned, onFinishDebrief }) => {

  useEffect(() => {
    // Fire military victory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#f59e0b', '#ffffff']
    });
  }, []);

  return (
    <div className="debrief-screen">
      <div style={{ 
        width: 80, 
        height: 80, 
        borderRadius: '50%', 
        background: 'rgba(34, 197, 94, 0.2)', 
        border: '2px solid var(--accent-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 30px var(--accent-glow)'
      }}>
        <Award style={{ width: 44, height: 44, color: 'var(--accent-primary)' }} />
      </div>

      <div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
          REPORTE DE ACCIÓN POST-COMBATE
        </span>
        <h2 className="debrief-title">MISIÓN CUMPLIDA</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {session.title} completada con éxito operativo.
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--hud-amber)' }}>+{xpEarned}</div>
          <div className="stat-label">XP RECOMPENSA</div>
        </div>

        <div className="stat-box">
          <div className="stat-value">{session.exercises.length}</div>
          <div className="stat-label">EJERCICIOS</div>
        </div>

        <div className="stat-box">
          <div className="stat-value" style={{ color: 'var(--accent-primary)' }}>100%</div>
          <div className="stat-label">EFECTIVIDAD</div>
        </div>

        <div className="stat-box">
          <div className="stat-value">~180</div>
          <div className="stat-label">KCAL QUEMADAS</div>
        </div>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-tactical)',
        padding: 16,
        borderRadius: 6,
        width: '100%',
        textAlign: 'left'
      }}>
        <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.8rem', color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Shield style={{ width: 16, height: 16, color: 'var(--accent-primary)' }} />
          DEBRIEFING DEL COMANDO:
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Has demostrado la disciplina y fuerza de un operador táctico de élite. Las calorías han sido neutralizadas. Continúa acumulando XP para ascender en la cadena de mando.
        </p>
      </div>

      <button 
        className="mission-btn" 
        onClick={() => {
          soundEngine.playClick();
          onFinishDebrief();
        }}
        style={{ marginTop: 10 }}
      >
        <CheckCircle2 style={{ width: 18, height: 18, fill: '#000' }} />
        RETORNAR A LA BASE DE OPERACIONES
      </button>
    </div>
  );
};
