// Tactical Workouts, Exercises, and Military Rank Data System

export const MILITARY_RANKS = [
  { level: 1, title: 'RECLUTA', code: 'RCT-01', xpRequired: 0, icon: '🪖', badgeColor: '#4ade80' },
  { level: 2, title: 'CABO TÁCTICO', code: 'CBO-02', xpRequired: 200, icon: '🎖️', badgeColor: '#38bdf8' },
  { level: 3, title: 'SARGENTO DE HIERRO', code: 'SGT-03', xpRequired: 500, icon: '🎗️', badgeColor: '#facc15' },
  { level: 4, title: 'CAPITÁN COMANDO', code: 'CPT-04', xpRequired: 1000, icon: '⭐', badgeColor: '#f97316' },
  { level: 5, title: 'COMANDANTE SPECOPS', code: 'CMD-05', xpRequired: 2000, icon: '👑', badgeColor: '#ef4444' }
];

export const EXERCISES = [
  {
    id: 'burpees',
    name: 'Burpees de Asalto',
    category: 'full_body',
    type: 'reps',
    defaultReps: 20,
    image: '/images/burpees.png',
    muscleGroup: 'Cuerpo Completo, Cardio de Combate',
    difficulty: 'Avanzado',
    instructions: [
      'Cae a cuclillas explosivamente y apoya las manos.',
      'Lanza pies atrás, realiza una flexión rozando el suelo.',
      'Salta hacia arriba extendiendo los brazos con potencia.'
    ],
    tacticalTip: 'Máxima cadencia sin detener el movimiento.'
  },
  {
    id: 'sprint_100m',
    name: 'Carrera Táctica (100 Metros)',
    category: 'cardio',
    type: 'distance',
    defaultDistance: '100 METROS',
    image: '/images/sprint.png',
    muscleGroup: 'Cardio, Potencia de Piernas, Capacidad Pulmonar',
    difficulty: 'Básico',
    instructions: [
      'Sprint a máxima aceleración táctica en línea recta o circuito.',
      'Mantén la zancada amplia y los brazos braceando a 90°.',
      'Controla la respiración constante.'
    ],
    tacticalTip: 'Visualiza una evacuación bajo fuego hostil. ¡Velocidad pura!'
  },
  {
    id: 'pushups',
    name: 'Flexiones Tácticas',
    category: 'tren_superior',
    type: 'reps',
    defaultReps: 30,
    image: '/images/pushups.png',
    muscleGroup: 'Pecho, Tríceps, Hombros',
    difficulty: 'Intermedio',
    instructions: [
      'Manos al ancho de hombros con el cuerpo en línea recta.',
      'Baja el pecho rozando el suelo manteniendo el core firme.',
      'Empuja explosivamente hasta bloquear codos.'
    ],
    tacticalTip: 'Core apretado como blindaje abdominal en todo momento.'
  },
  {
    id: 'squats',
    name: 'Sentadillas de Combate',
    category: 'tren_inferior',
    type: 'reps',
    defaultReps: 50,
    image: '/images/squats.png',
    muscleGroup: 'Cuádriceps, Glúteos, Isquios',
    difficulty: 'Intermedio',
    instructions: [
      'Pies a la anchura de hombros, puntas ligeramente hacia afuera.',
      'Baja rompiendo el paralelo manteniendo los talones en el suelo.',
      'Sube empujando desde los talones con la mirada al frente.'
    ],
    tacticalTip: 'Mantén la espalda erguida para soportar la carga táctica.'
  },
  {
    id: 'farmers_walk',
    name: 'Paso Granjero Táctico',
    category: 'full_body',
    type: 'reps',
    defaultReps: 50,
    image: '/images/farmers_walk.png',
    muscleGroup: 'Antebrazos, Agarre, Trapecios, Core',
    difficulty: 'Avanzado',
    instructions: [
      'Sujeta dos pesos (mancuernas, garrafas o cajas de munición) en cada mano.',
      'Camina erguido con los hombros hacia atrás y el abdomen apretado.',
      'Realiza pasos firmes y constantes sin tambalearte.'
    ],
    tacticalTip: 'Fuerza de agarre de combate. No dejes caer la carga.'
  },
  {
    id: 'situps',
    name: 'Abdominales Tácticos',
    category: 'core',
    type: 'reps',
    defaultReps: 50,
    image: '/images/situps.png',
    muscleGroup: 'Abdomen, Core Central, Hip Flexors',
    difficulty: 'Intermedio',
    instructions: [
      'Tumbado boca arriba con rodillas flexionadas y plantas del pie en el suelo.',
      'Lleva el torso hacia arriba hasta tocar las rodillas con los codos.',
      'Desciende de forma controlada sin dejarte caer.'
    ],
    tacticalTip: 'Impúlsate desde el core, sin tirar del cuello.'
  },
  {
    id: 'plank',
    name: 'Plancha Operativa',
    category: 'core',
    type: 'timed',
    defaultDuration: 60,
    image: '/images/plank.png',
    muscleGroup: 'Core Total, Lumbar',
    difficulty: 'Intermedio',
    instructions: [
      'Antebrazos en el suelo alineados con los hombros.',
      'Cuerpo completamente recto como una tabla metálica.',
      'Mantén la tensión continua en abdomen y glúteos.'
    ],
    tacticalTip: 'Blindaje inquebrantable.'
  }
];

// Helper to generate full body stations array based on rep multipliers
const createFullBodyStations = (burpees, flexiones, sentadillas, granjero, abdominales) => [
  { id: 1, name: `${burpees} BURPEES`, exerciseId: 'burpees', reps: `${burpees} REPETICIONES` },
  { id: 2, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 3, name: `${flexiones} FLEXIONES`, exerciseId: 'pushups', reps: `${flexiones} REPETICIONES` },
  { id: 4, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 5, name: `${sentadillas} SENTADILLAS`, exerciseId: 'squats', reps: `${sentadillas} REPETICIONES` },
  { id: 6, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 7, name: `${granjero} PASO GRANJERO`, exerciseId: 'farmers_walk', reps: `${granjero} PASOS / METROS` },
  { id: 8, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 9, name: `${abdominales} ABDOMINALES`, exerciseId: 'situps', reps: `${abdominales} REPETICIONES` },
  { id: 10, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 11, name: `${abdominales} ABDOMINALES`, exerciseId: 'situps', reps: `${abdominales} REPETICIONES` },
  { id: 12, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 13, name: `${granjero} PASO GRANJERO`, exerciseId: 'farmers_walk', reps: `${granjero} PASOS / METROS` },
  { id: 14, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 15, name: `${sentadillas} SENTADILLAS`, exerciseId: 'squats', reps: `${sentadillas} REPETICIONES` },
  { id: 16, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 17, name: `${flexiones} FLEXIONES`, exerciseId: 'pushups', reps: `${flexiones} REPETICIONES` },
  { id: 18, name: '100 METROS', exerciseId: 'sprint_100m', reps: '100 METROS SPRINT' },
  { id: 19, name: `${burpees} BURPEES`, exerciseId: 'burpees', reps: `${burpees} REPETICIONES` }
];

export const WORKOUT_GROUPS = [
  {
    id: 'full_body',
    title: 'FULL BODY',
    badge: '🔥',
    category: 'full_body',
    targetMuscles: 'Cuerpo Completo, Pecho, Piernas, Core, Espalda, Cardio',
    muscleImage: '/images/muscle_full_body.png',
    description: 'Circuito militar completo de 19 estaciones. Adaptado en 3 niveles de resistencia de combate.',
    levels: [
      {
        id: 'full_body_principiante',
        levelKey: 'principiante',
        levelTitle: 'PRINCIPIANTE',
        code: 'FB-PRINCIPIANTE-19',
        badgeColor: '#22c55e',
        badgeIcon: '🟢',
        durationMinutes: 30,
        xpReward: 350,
        difficultyTag: 'INICIACIÓN',
        description: 'Volumen moderado ideal para aclimatación táctica y técnica de combate.',
        muscleImage: '/images/muscle_full_body.png',
        targetMuscles: 'Cuerpo Completo: Pecho, Piernas, Core, Brazos',
        stations: createFullBodyStations(10, 20, 25, 25, 25)
      },
      {
        id: 'full_body_intermedio',
        levelKey: 'intermedio',
        levelTitle: 'INTERMEDIO',
        code: 'FB-INTERMEDIO-19',
        badgeColor: '#f59e0b',
        badgeIcon: '🟡',
        durationMinutes: 40,
        xpReward: 500,
        difficultyTag: 'COMBATE',
        description: 'Exigencia militar media. Incremento de volumen para operadores experimentados.',
        muscleImage: '/images/muscle_full_body.png',
        targetMuscles: 'Cuerpo Completo: Pecho, Piernas, Core, Brazos',
        stations: createFullBodyStations(20, 40, 50, 50, 50)
      },
      {
        id: 'full_body_master',
        levelKey: 'master',
        levelTitle: 'MASTER',
        code: 'FB-MASTER-19',
        badgeColor: '#ef4444',
        badgeIcon: '🔴',
        durationMinutes: 50,
        xpReward: 750,
        difficultyTag: 'SPECOPS ÉLITE',
        description: 'Volumen máximo de supervivencia. Solo para operadores de fuerzas especiales.',
        muscleImage: '/images/muscle_full_body.png',
        targetMuscles: 'Cuerpo Completo: Pecho, Piernas, Core, Brazos',
        stations: createFullBodyStations(30, 60, 75, 75, 75)
      }
    ]
  },
  {
    id: 'tren_superior',
    title: 'TREN SUPERIOR',
    badge: '🛡️',
    category: 'tren_superior',
    targetMuscles: 'Pecho, Hombros, Tríceps, Espalda, Antebrazos',
    muscleImage: '/images/muscle_upper_body.png',
    description: 'Protocolo de empuje y fuerza de brazos en 3 niveles de exigencia militar.',
    levels: [
      {
        id: 'upper_principiante',
        levelKey: 'principiante',
        levelTitle: 'PRINCIPIANTE',
        code: 'UP-PRINCIPIANTE-10',
        badgeColor: '#22c55e',
        badgeIcon: '🟢',
        durationMinutes: 20,
        xpReward: 300,
        difficultyTag: 'INICIACIÓN',
        muscleImage: '/images/muscle_upper_body.png',
        targetMuscles: 'Pecho, Hombros, Tríceps, Espalda',
        stations: [
          { id: 1, name: '20 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '20 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '25 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '25 PASOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '15 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '15 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '25 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '25 PASOS' },
          { id: 8, name: '10 BURPEES', exerciseId: 'burpees', reps: '10 REPETICIONES' },
          { id: 9, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 10, name: '20 FLEXIONES FINAL', exerciseId: 'pushups', reps: '20 REPETICIONES' }
        ]
      },
      {
        id: 'upper_intermedio',
        levelKey: 'intermedio',
        levelTitle: 'INTERMEDIO',
        code: 'UP-INTERMEDIO-10',
        badgeColor: '#f59e0b',
        badgeIcon: '🟡',
        durationMinutes: 30,
        xpReward: 450,
        difficultyTag: 'COMBATE',
        muscleImage: '/images/muscle_upper_body.png',
        targetMuscles: 'Pecho, Hombros, Tríceps, Espalda',
        stations: [
          { id: 1, name: '35 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '35 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '25 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '25 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
          { id: 8, name: '18 BURPEES', exerciseId: 'burpees', reps: '18 REPETICIONES' },
          { id: 9, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 10, name: '35 FLEXIONES FINAL', exerciseId: 'pushups', reps: '35 REPETICIONES' }
        ]
      },
      {
        id: 'upper_master',
        levelKey: 'master',
        levelTitle: 'MASTER',
        code: 'UP-MASTER-10',
        badgeColor: '#ef4444',
        badgeIcon: '🔴',
        durationMinutes: 40,
        xpReward: 650,
        difficultyTag: 'SPECOPS ÉLITE',
        muscleImage: '/images/muscle_upper_body.png',
        targetMuscles: 'Pecho, Hombros, Tríceps, Espalda',
        stations: [
          { id: 1, name: '50 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '50 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '75 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '75 PASOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '40 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '40 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '75 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '75 PASOS' },
          { id: 8, name: '25 BURPEES', exerciseId: 'burpees', reps: '25 REPETICIONES' },
          { id: 9, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 10, name: '50 FLEXIONES FINAL', exerciseId: 'pushups', reps: '50 REPETICIONES' }
        ]
      }
    ]
  },
  {
    id: 'tren_inferior',
    title: 'TREN INFERIOR',
    badge: '🥾',
    category: 'tren_inferior',
    targetMuscles: 'Cuádriceps, Glúteos, Isquios, Gemelos, Potencia de Zancada',
    muscleImage: '/images/muscle_lower_body.png',
    description: 'Potencia de piernas y resistencia de zancada en 3 niveles tácticos.',
    levels: [
      {
        id: 'lower_principiante',
        levelKey: 'principiante',
        levelTitle: 'PRINCIPIANTE',
        code: 'LOW-PRINCIPIANTE-09',
        badgeColor: '#22c55e',
        badgeIcon: '🟢',
        durationMinutes: 20,
        xpReward: 300,
        difficultyTag: 'INICIACIÓN',
        muscleImage: '/images/muscle_lower_body.png',
        targetMuscles: 'Cuádriceps, Glúteos, Isquios, Gemelos',
        stations: [
          { id: 1, name: '30 SENTADILLAS', exerciseId: 'squats', reps: '30 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '25 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '25 PASOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '30 SENTADILLAS', exerciseId: 'squats', reps: '30 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '25 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '25 PASOS' },
          { id: 8, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 9, name: '30 SENTADILLAS FINAL', exerciseId: 'squats', reps: '30 REPETICIONES' }
        ]
      },
      {
        id: 'lower_intermedio',
        levelKey: 'intermedio',
        levelTitle: 'INTERMEDIO',
        code: 'LOW-INTERMEDIO-09',
        badgeColor: '#f59e0b',
        badgeIcon: '🟡',
        durationMinutes: 30,
        xpReward: 480,
        difficultyTag: 'COMBATE',
        muscleImage: '/images/muscle_lower_body.png',
        targetMuscles: 'Cuádriceps, Glúteos, Isquios, Gemelos',
        stations: [
          { id: 1, name: '50 SENTADILLAS', exerciseId: 'squats', reps: '50 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '50 SENTADILLAS', exerciseId: 'squats', reps: '50 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
          { id: 8, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 9, name: '50 SENTADILLAS FINAL', exerciseId: 'squats', reps: '50 REPETICIONES' }
        ]
      },
      {
        id: 'lower_master',
        levelKey: 'master',
        levelTitle: 'MASTER',
        code: 'LOW-MASTER-09',
        badgeColor: '#ef4444',
        badgeIcon: '🔴',
        durationMinutes: 40,
        xpReward: 650,
        difficultyTag: 'SPECOPS ÉLITE',
        muscleImage: '/images/muscle_lower_body.png',
        targetMuscles: 'Cuádriceps, Glúteos, Isquios, Gemelos',
        stations: [
          { id: 1, name: '75 SENTADILLAS', exerciseId: 'squats', reps: '75 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '75 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '75 PASOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '75 SENTADILLAS', exerciseId: 'squats', reps: '75 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '75 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '75 PASOS' },
          { id: 8, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 9, name: '75 SENTADILLAS FINAL', exerciseId: 'squats', reps: '75 REPETICIONES' }
        ]
      }
    ]
  },
  {
    id: 'core',
    title: 'CORE BLINDADO',
    badge: '🔰',
    category: 'core',
    targetMuscles: 'Abdomen, Oblicuos, Zona Lumbar, Core Central',
    muscleImage: '/images/muscle_core.png',
    description: 'Blindaje abdominal y potencia lumbar en 3 niveles de exigencia.',
    levels: [
      {
        id: 'core_principiante',
        levelKey: 'principiante',
        levelTitle: 'PRINCIPIANTE',
        code: 'CORE-PRINCIPIANTE-08',
        badgeColor: '#22c55e',
        badgeIcon: '🟢',
        durationMinutes: 18,
        xpReward: 280,
        difficultyTag: 'INICIACIÓN',
        muscleImage: '/images/muscle_core.png',
        targetMuscles: 'Abdomen, Oblicuos, Zona Lumbar',
        stations: [
          { id: 1, name: '30 ABDOMINALES', exerciseId: 'situps', reps: '30 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '30s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '30 SEGUNDOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '30 ABDOMINALES', exerciseId: 'situps', reps: '30 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '30s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '30 SEGUNDOS' },
          { id: 8, name: '10 BURPEES FINALES', exerciseId: 'burpees', reps: '10 REPETICIONES' }
        ]
      },
      {
        id: 'core_intermedio',
        levelKey: 'intermedio',
        levelTitle: 'INTERMEDIO',
        code: 'CORE-INTERMEDIO-08',
        badgeColor: '#f59e0b',
        badgeIcon: '🟡',
        durationMinutes: 25,
        xpReward: 400,
        difficultyTag: 'COMBATE',
        muscleImage: '/images/muscle_core.png',
        targetMuscles: 'Abdomen, Oblicuos, Zona Lumbar',
        stations: [
          { id: 1, name: '50 ABDOMINALES', exerciseId: 'situps', reps: '50 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '45s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '45 SEGUNDOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '50 ABDOMINALES', exerciseId: 'situps', reps: '50 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '45s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '45 SEGUNDOS' },
          { id: 8, name: '18 BURPEES FINALES', exerciseId: 'burpees', reps: '18 REPETICIONES' }
        ]
      },
      {
        id: 'core_master',
        levelKey: 'master',
        levelTitle: 'MASTER',
        code: 'CORE-MASTER-08',
        badgeColor: '#ef4444',
        badgeIcon: '🔴',
        durationMinutes: 35,
        xpReward: 600,
        difficultyTag: 'SPECOPS ÉLITE',
        muscleImage: '/images/muscle_core.png',
        targetMuscles: 'Abdomen, Oblicuos, Zona Lumbar',
        stations: [
          { id: 1, name: '75 ABDOMINALES', exerciseId: 'situps', reps: '75 REPETICIONES' },
          { id: 2, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 3, name: '60s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '60 SEGUNDOS' },
          { id: 4, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 5, name: '75 ABDOMINALES', exerciseId: 'situps', reps: '75 REPETICIONES' },
          { id: 6, name: '100 METROS SPRINT', exerciseId: 'sprint_100m', reps: '100 METROS' },
          { id: 7, name: '60s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '60 SEGUNDOS' },
          { id: 8, name: '25 BURPEES FINALES', exerciseId: 'burpees', reps: '25 REPETICIONES' }
        ]
      }
    ]
  }
];
