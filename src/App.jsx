import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MissionList } from './components/MissionList';
import { ExerciseList } from './components/ExerciseList';
import { RankProfile } from './components/RankProfile';
import { RoutineDetailModal } from './components/RoutineDetailModal';
import { WorkoutPlayer } from './components/WorkoutPlayer';
import { MissionDebrief } from './components/MissionDebrief';
import { MILITARY_RANKS, WORKOUT_GROUPS, EXERCISES } from './data/workoutsData';
import { soundEngine } from './audio/soundEngine';

export function App() {
  const [activeTab, setActiveTab] = useState('missions');
  
  // Theme with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('commandofit_theme') || 'green';
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // User Rank & XP State with localStorage persistence
  const [currentXp, setCurrentXp] = useState(() => {
    const savedXp = localStorage.getItem('commandofit_xp');
    return savedXp ? parseInt(savedXp, 10) : 150;
  });

  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('commandofit_stats');
    return savedStats ? JSON.parse(savedStats) : { missionsCompleted: 2, totalKcal: 360 };
  });

  // Save to localStorage whenever XP, stats, or theme changes
  useEffect(() => {
    localStorage.setItem('commandofit_xp', currentXp.toString());
  }, [currentXp]);

  useEffect(() => {
    localStorage.setItem('commandofit_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('commandofit_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Routine selection & detail view state
  const [selectedRoutineDetail, setSelectedRoutineDetail] = useState(null);

  // Active live workout player state
  const [activeWorkoutSession, setActiveWorkoutSession] = useState(null);
  const [debriefSession, setDebriefSession] = useState(null);

  // Determine current rank object based on XP
  const getCurrentRank = () => {
    let current = MILITARY_RANKS[0];
    for (let rank of MILITARY_RANKS) {
      if (currentXp >= rank.xpRequired) {
        current = rank;
      }
    }
    return current;
  };

  const userRank = getCurrentRank();

  // Step 1: Select routine and open Detail Screen
  const handleSelectRoutine = (routine) => {
    soundEngine.playClick();
    setSelectedRoutineDetail(routine);
  };

  // Step 2: Press PLAY inside Detail Screen to start live session
  const handleStartWorkout = (routine) => {
    soundEngine.playClick();
    soundEngine.playGoBeep();
    setSelectedRoutineDetail(null); // Close detail modal

    setActiveWorkoutSession({
      title: routine.title || `${routine.code} ${routine.levelTitle}`,
      xpReward: routine.xpReward,
      stations: routine.stations
    });
  };

  // Start a single exercise directly as 1 station
  const handleSelectSingleExercise = (exercise) => {
    soundEngine.playClick();
    soundEngine.playGoBeep();

    setActiveWorkoutSession({
      title: `ENTRENAMIENTO: ${exercise.name.toUpperCase()}`,
      xpReward: 100,
      stations: [
        {
          id: 1,
          name: exercise.name.toUpperCase(),
          exerciseId: exercise.id,
          reps: exercise.defaultDistance || `${exercise.defaultReps} REPETICIONES`
        }
      ]
    });
  };

  // Handle completing a workout routine session
  const handleCompleteSession = () => {
    const xpReward = activeWorkoutSession?.xpReward || 500;
    
    setCurrentXp((prev) => {
      const nextXp = prev + xpReward;
      localStorage.setItem('commandofit_xp', nextXp.toString());
      return nextXp;
    });

    setStats((prev) => {
      const nextStats = {
        missionsCompleted: prev.missionsCompleted + 1,
        totalKcal: prev.totalKcal + 350
      };
      localStorage.setItem('commandofit_stats', JSON.stringify(nextStats));
      return nextStats;
    });

    const sessionToDebrief = activeWorkoutSession;
    setActiveWorkoutSession(null);
    setDebriefSession({
      session: sessionToDebrief,
      xpEarned: xpReward
    });
  };

  return (
    <div className="app-container">
      <Header 
        currentXp={currentXp}
        userRank={userRank}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      <main className="content-area">
        {activeTab === 'missions' && (
          <MissionList onSelectRoutine={handleSelectRoutine} />
        )}

        {activeTab === 'exercises' && (
          <ExerciseList onSelectSingleExercise={handleSelectSingleExercise} />
        )}

        {activeTab === 'profile' && (
          <RankProfile 
            currentXp={currentXp}
            userRank={userRank}
            stats={stats}
          />
        )}
      </main>

      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Routine Detail Screen Modal (Before pressing Play) */}
      {selectedRoutineDetail && (
        <RoutineDetailModal
          routine={selectedRoutineDetail}
          onClose={() => setSelectedRoutineDetail(null)}
          onStartWorkout={handleStartWorkout}
        />
      )}

      {/* Live Workout Player Active Modal */}
      {activeWorkoutSession && (
        <WorkoutPlayer
          workoutSession={activeWorkoutSession}
          onClose={() => setActiveWorkoutSession(null)}
          onCompleteSession={handleCompleteSession}
        />
      )}

      {/* Mission Debrief Modal */}
      {debriefSession && (
        <MissionDebrief
          session={debriefSession.session}
          xpEarned={debriefSession.xpEarned}
          onFinishDebrief={() => setDebriefSession(null)}
        />
      )}
    </div>
  );
}

export default App;
