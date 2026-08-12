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
    defaultReps: 25,
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
    id: 'sprint_200m',
    name: 'Carrera Táctica (200 Metros)',
    category: 'cardio',
    type: 'distance',
    defaultDistance: '200 METROS',
    image: '/images/sprint.png',
    muscleGroup: 'Cardio, Potencia de Piernas, Capacidad Pulmonar',
    difficulty: 'Intermedio',
    instructions: [
      'Sprint a máxima aceleración táctica en línea recta o circuito.',
      'Mantén la zancada amplia y los brazos z braceando a 90°.',
      'Controla la respiración en los últimos 50 metros.'
    ],
    tacticalTip: 'Visualiza una evacuación bajo fuego hostil. ¡Velocidad pura!'
  },
  {
    id: 'pushups',
    name: 'Flexiones Tácticas',
    category: 'tren_superior',
    type: 'reps',
    defaultReps: 50,
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
    defaultReps: 75,
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
    defaultReps: 75, // 75 Pasos o Metros
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
    defaultReps: 75,
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

export const WORKOUT_ROUTINES = [
  {
    id: 'full_body_official',
    title: 'ENTRENAMIENTO FULL BODY',
    code: 'FB-OFFICIAL-19',
    category: 'full_body',
    difficulty: 'EXTREMO',
    durationMinutes: 45,
    xpReward: 600,
    description: 'Circuito militar oficial de 19 estaciones de alta intensidad. Resistencia, fuerza y potencia de combate.',
    badge: '🔥',
    stations: [
      { id: 1, name: '25 BURPEES', exerciseId: 'burpees', reps: '25 REPETICIONES' },
      { id: 2, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 3, name: '50 FLEXIONES', exerciseId: 'pushups', reps: '50 REPETICIONES' },
      { id: 4, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 5, name: '75 SENTADILLAS', exerciseId: 'squats', reps: '75 REPETICIONES' },
      { id: 6, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 7, name: '75 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '75 PASOS / METROS' },
      { id: 8, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 9, name: '75 ABDOMINALES', exerciseId: 'situps', reps: '75 REPETICIONES' },
      { id: 10, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 11, name: '75 ABDOMINALES', exerciseId: 'situps', reps: '75 REPETICIONES' },
      { id: 12, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 13, name: '75 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '75 PASOS / METROS' },
      { id: 14, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 15, name: '75 SENTADILLAS', exerciseId: 'squats', reps: '75 REPETICIONES' },
      { id: 16, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 17, name: '50 FLEXIONES', exerciseId: 'pushups', reps: '50 REPETICIONES' },
      { id: 18, name: '200 METROS', exerciseId: 'sprint_200m', reps: '200 METROS SPRINT' },
      { id: 19, name: '25 BURPEES', exerciseId: 'burpees', reps: '25 REPETICIONES' }
    ]
  },
  {
    id: 'tren_superior_routine',
    title: 'ENTRENAMIENTO TREN SUPERIOR',
    code: 'UPPER-BLAST-10',
    category: 'tren_superior',
    difficulty: 'ALTA INTENSIDAD',
    durationMinutes: 30,
    xpReward: 450,
    description: 'Circuito táctico enfocado en potencia de empuje, fuerza de brazos y resistencia de hombros.',
    badge: '🛡️',
    stations: [
      { id: 1, name: '40 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '40 REPETICIONES' },
      { id: 2, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 3, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
      { id: 4, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 5, name: '30 FLEXIONES TÁCTICAS', exerciseId: 'pushups', reps: '30 REPETICIONES' },
      { id: 6, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 7, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
      { id: 8, name: '20 FELEXIONES BURPEE', exerciseId: 'burpees', reps: '20 REPETICIONES' },
      { id: 9, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 10, name: '40 FLEXIONES FINAL', exerciseId: 'pushups', reps: '40 REPETICIONES' }
    ]
  },
  {
    id: 'tren_inferior_routine',
    title: 'ENTRENAMIENTO TREN INFERIOR',
    code: 'LOWER-POWER-10',
    category: 'tren_inferior',
    difficulty: 'RESISTENCIA',
    durationMinutes: 32,
    xpReward: 480,
    description: 'Circuito militar de potencia en piernas, resistencia de cuádriceps y zancadas operativas.',
    badge: '🥾',
    stations: [
      { id: 1, name: '60 SENTADILLAS', exerciseId: 'squats', reps: '60 REPETICIONES' },
      { id: 2, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 3, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
      { id: 4, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 5, name: '60 SENTADILLAS', exerciseId: 'squats', reps: '60 REPETICIONES' },
      { id: 6, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 7, name: '50 PASO GRANJERO', exerciseId: 'farmers_walk', reps: '50 PASOS' },
      { id: 8, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 9, name: '60 SENTADILLAS FINAL', exerciseId: 'squats', reps: '60 REPETICIONES' }
    ]
  },
  {
    id: 'core_routine',
    title: 'ENTRENAMIENTO CORE BLINDADO',
    code: 'CORE-SHIELD-08',
    category: 'core',
    difficulty: 'INTENSO',
    durationMinutes: 25,
    xpReward: 400,
    description: 'Blindaje abdominal y resistencia lumbar para soporte de combate.',
    badge: '🔰',
    stations: [
      { id: 1, name: '60 ABDOMINALES', exerciseId: 'situps', reps: '60 REPETICIONES' },
      { id: 2, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 3, name: '60s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '60 SEGUNDOS' },
      { id: 4, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 5, name: '60 ABDOMINALES', exerciseId: 'situps', reps: '60 REPETICIONES' },
      { id: 6, name: '200 METROS SPRINT', exerciseId: 'sprint_200m', reps: '200 METROS' },
      { id: 7, name: '60s PLANCHA OPERATIVA', exerciseId: 'plank', reps: '60 SEGUNDOS' },
      { id: 8, name: '20 BURPEES FINALES', exerciseId: 'burpees', reps: '20 REPETICIONES' }
    ]
  }
];
