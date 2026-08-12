import React from 'react';
import { MILITARY_RANKS } from '../data/workoutsData';
import { Award, ShieldCheck, Flame, Trophy, Crosshair } from 'lucide-react';

export const RankProfile = ({ currentXp, userRank, stats }) => {
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
          <Award style={{ color: 'var(--accent-primary)' }} />
          EXPEDIENTE DEL OPERADOR
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Historial de servicio, rango y condecoraciones de combate.
        </p>
      </div>

      {/* Main Rank Card */}
      <div className="tactical-card" style={{ textAlign: 'center', padding: '20px 16px' }}>
        <div className="corner-tl tactical-card-corner"></div>
        <div className="corner-tr tactical-card-corner"></div>
        <div className="corner-bl tactical-card-corner"></div>
        <div className="corner-br tactical-card-corner"></div>

        <div style={{ fontSize: '3rem', marginBottom: 6 }}>{userRank.icon}</div>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.75rem', 
          color: 'var(--accent-primary)',
          background: 'rgba(34,197,94,0.1)',
          padding: '2px 8px',
          borderRadius: 3,
          border: '1px solid var(--border-tactical)'
        }}>
          {userRank.code}
        </span>
        <h3 style={{ fontFamily: 'var(--font-hud)', fontSize: '1.3rem', color: '#fff', marginTop: 6 }}>
          {userRank.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
          XP TOTAL ACUMULADO: <strong style={{ color: 'var(--hud-amber)' }}>{currentXp} XP</strong>
        </p>
      </div>

      {/* Overall Stats */}
      <div className="stat-grid" style={{ marginBottom: 16 }}>
        <div className="stat-box">
          <Crosshair style={{ width: 18, height: 18, color: 'var(--accent-primary)', marginBottom: 4 }} />
          <div className="stat-value">{stats.missionsCompleted}</div>
          <div className="stat-label">MISIONES COMPLETADAS</div>
        </div>

        <div className="stat-box">
          <Flame style={{ width: 18, height: 18, color: 'var(--hud-amber)', marginBottom: 4 }} />
          <div className="stat-value">{stats.totalKcal}</div>
          <div className="stat-label">KCAL NEUTRALIZADAS</div>
        </div>
      </div>

      {/* Rank Hierarchy */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-tactical)', padding: 14, borderRadius: 6 }}>
        <h4 style={{ fontFamily: 'var(--font-hud)', fontSize: '0.85rem', color: '#fff', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Trophy style={{ width: 16, height: 16, color: 'var(--hud-amber)' }} />
          CADENA DE MANDO (RANGOS)
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MILITARY_RANKS.map((r) => {
            const isUnlocked = currentXp >= r.xpRequired;
            const isCurrent = userRank.level === r.level;

            return (
              <div 
                key={r.level} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  background: isCurrent ? 'rgba(34, 197, 94, 0.15)' : 'rgba(0,0,0,0.3)',
                  border: isCurrent ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 4,
                  opacity: isUnlocked ? 1 : 0.5
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1.2rem' }}>{r.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-hud)', fontSize: '0.8rem', color: isCurrent ? 'var(--accent-primary)' : '#fff' }}>
                      {r.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                      Requisitos: {r.xpRequired} XP
                    </div>
                  </div>
                </div>

                {isCurrent ? (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                    [ACTUAL]
                  </span>
                ) : isUnlocked ? (
                  <ShieldCheck style={{ width: 16, height: 16, color: 'var(--accent-primary)' }} />
                ) : (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                    BLOQUEADO
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
