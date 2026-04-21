// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - TAREAS INTERACTIVAS (v2.0 - EVOLUCIONADO)
// ═══════════════════════════════════════════════════════════════
// Features: Progreso por tarea • Accesibilidad • Sonidos • Hints • 
//           Animaciones • Offline • Parental Controls • Analytics
// ═══════════════════════════════════════════════════════════════

console.log('✏️ tareas.js v2.0 cargado');

// ─────────────────────────────────────────────────────────────
// CONFIGURACIÓN GLOBAL DEL MÓDULO
// ─────────────────────────────────────────────────────────────
const TAREAS_CONFIG = {
  STORAGE_KEY: 'aprende_jugando_tareas_progreso',
  SOUND_ENABLED_KEY: 'aprende_jugando_sonidos',
  PARENTAL_CONTROLS_KEY: 'aprende_jugando_parental',
  MAX_INTENTOS: 3,
  HINTS_DISPONIBLES: 2,
  TIEMPO_MINIMO_POR_TAREA: 30, // segundos
  CELEBRACION_CONFETTI: true,
  ANIMACIONES_ACTIVAS: true
};

// ─────────────────────────────────────────────────────────────
// MÓDULO PRINCIPAL
// ─────────────────────────────────────────────────────────────
window.features = window.features || {};
window.features.tareas = {
  
  // Estado interno
  estado: {
    categoriaActual: 'trazo',
    tareaActiva: null,
    intentos: 0,
    hintsUsados: 0,
    tiempoInicio: null,
    sonidosActivos: true,
    parentalControls: {
      tiempoMaximoDiario: 30, // minutos
      dificultadMaxima: 3, // estrellas
      categoriasBloqueadas: []
    }
  },
  
  // Catálogo EXPANDIDO de tareas con metadata completo
  tareas: {
    trazo: [
      {
        id: 't1',
        titulo: 'Trazo de la A',
        descripcion: 'Sigue los puntos para formar la letra A mayúscula',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 45,
        habilidades: ['motricidad-fina', 'reconocimiento-letras'],
        instruccionesDetalladas: '1. Toca el punto verde\n2. Arrastra siguiendo la línea punteada\n3. ¡No levantes el dedo hasta terminar!',
        hint: 'La A tiene forma de triángulo con una línea en medio',
        audioInstruccion: 'audio/letra-a-instruccion.mp3',
        audioExito: 'audio/exito-letra.mp3',
        imagenGuia: 'assets/illustrations/trazo-a-guia.svg',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 't2',
        titulo: 'Trazo de la B',
        descripcion: 'Practica las curvas de la letra B',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 50,
        habilidades: ['motricidad-fina', 'coordinacion-ojo-mano'],
        instruccionesDetalladas: 'Dibuja la línea recta primero, luego las dos curvas',
        hint: 'Imagina que la B es un número 8 pegado a una línea',
        audioInstruccion: 'audio/letra-b-instruccion.mp3',
        audioExito: 'audio/exito-letra.mp3',
        imagenGuia: 'assets/illustrations/trazo-b-guia.svg'
      },
      {
        id: 't3',
        titulo: 'Números del 1 al 5',
        descripcion: 'Traza los números en orden',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 90,
        habilidades: ['reconocimiento-numeros', 'secuenciacion'],
        instruccionesDetalladas: 'Toca cada número en orden: 1, 2, 3, 4, 5',
        hint: 'Empieza por el más pequeño: el 1',
        audioInstruccion: 'audio/numeros-instruccion.mp3',
        audioExito: 'audio/exito-numeros.mp3'
      }
    ],
    
    conteo: [
      {
        id: 'c1',
        titulo: 'Contar Manzanas 🍎',
        descripcion: '¿Cuántas manzanas ves? Toca el número correcto',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 30,
        habilidades: ['conteo', 'reconocimiento-visual'],
        elementos: ['🍎', '🍎', '🍎'],
        respuestaCorrecta: 3,
        opciones: [2, 3, 4, 5],
        hint: 'Cuenta en voz alta: uno, dos, tres...',
        audioExito: 'audio/exito-conteo.mp3'
      },
      {
        id: 'c2',
        titulo: 'Suma con Animales',
        descripcion: '🐱 + 🐱 = ¿Cuántos gatitos?',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 45,
        habilidades: ['suma-basica', 'pensamiento-logico'],
        operacion: { a: 2, b: 2, simbolo: '+' },
        respuestaCorrecta: 4,
        opciones: [3, 4, 5, 6],
        ilustracion: '🐱🐱 + 🐱🐱 = ?',
        hint: 'Junta todos los gatitos y cuéntalos',
        audioExito: 'audio/exito-matematicas.mp3'
      },
     {
      id: 'c3',
      titulo: 'Contar Estrellas ⭐',
      descripcion: 'Cuenta las estrellas brillantes en el cielo',
      dificultad: 1,
      recompensa: 2,
      tiempoEstimado: 35,
      habilidades: ['conteo', 'atencion'],
      elementos: ['⭐', '⭐', '⭐', '⭐','⭐'],
      respuestaCorrecta: 5,
      opciones: [3, 4, 5, 6],
      hint: 'Señala cada estrella mientras cuentas',
      completada: false,
      mejorPuntuacion: 0
    },
    {
      id: 'c4',
      titulo: 'Contar Animales 🐾',
      descripcion: '¿Cuántos animalitos hay en la granja?',
      dificultad: 2,
      recompensa: 3,
      tiempoEstimado: 45,
      habilidades: ['conteo', 'clasificacion'],
      elementos: ['🐶', '🐱', '🐰', '🐸', '🐼'],
      respuestaCorrecta: 5,
      opciones: [4, 5, 6, 7],
      hint: 'Cuenta de uno en uno sin saltarte ninguno',
      completada: false,
      mejorPuntuacion: 0
    }
    ],
    // ✅ NUEVA: ABECEDARIO (Letras y Sílabas)
    abecedario: [
      {
        id: 'a1',
        titulo: '¿Qué letra es? A',
        descripcion: 'Toca la letra A mayúscula',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 30,
        habilidades: ['reconocimiento-letras', 'lectura'],
        letraObjetivo: 'A',
        opciones: ['A', 'B', 'D', 'O'],
        hint: 'La A tiene forma de triángulo',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'a2',
        titulo: '¿Qué letra es? M',
        descripcion: 'Encuentra la letra M entre las opciones',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 30,
        habilidades: ['reconocimiento-letras'],
        letraObjetivo: 'M',
        opciones: ['W', 'M', 'N', 'H'],
        hint: 'La M tiene dos picos hacia abajo',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'a3',
        titulo: 'Sílabas: MA',
        descripcion: 'Toca la sílaba MA',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['silabas', 'lectura-inicial'],
        silabaObjetivo: 'MA',
        opciones: ['MA', 'ME', 'MI', 'MO'],
        hint: 'Suena como "ma-má"',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'a4',
        titulo: 'Sílabas: PA',
        descripcion: 'Encuentra la sílaba PA',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['silabas', 'lectura-inicial'],
        silabaObjetivo: 'PA',
        opciones: ['BA', 'PA', 'TA', 'SA'],
        hint: 'Suena como "pa-pá"',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'a5',
        titulo: 'Completa: _ASA',
        descripcion: '¿Qué letra falta para formar CASA?',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 45,
        habilidades: ['lectura', 'completar-palabras'],
        palabra: 'CASA',
        letraFaltante: 'C',
        opciones: ['C', 'B', 'D', 'G'],
        hint: 'Casa empieza con C',
        completada: false,
        mejorPuntuacion: 0
      }
    ],
     // ✅ NUEVA: SUMAS (Kinder 3)
    sumas: [
      {
        id: 's1',
        titulo: 'Suma: 1 + 1',
        descripcion: '¿Cuánto es 1 más 1?',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 30,
        habilidades: ['suma-basica', 'matematicas'],
        operacion: { a: 1, b: 1, simbolo: '+' },
        respuestaCorrecta: 2,
        opciones: [1, 2, 3, 4],
        ilustracion: '🍎 + 🍎 = ?',
        hint: 'Junta las manzanas y cuéntalas',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 's2',
        titulo: 'Suma: 2 + 1',
        descripcion: '¿Cuánto es 2 más 1?',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 35,
        habilidades: ['suma-basica'],
        operacion: { a: 2, b: 1, simbolo: '+' },
        respuestaCorrecta: 3,
        opciones: [2, 3, 4, 5],
        ilustracion: '⭐⭐ + ⭐ = ?',
        hint: 'Dos más uno es... cuenta con los dedos',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 's3',
        titulo: 'Suma: 2 + 2',
        descripcion: '¿Cuánto es 2 más 2?',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['suma-basica', 'doble'],
        operacion: { a: 2, b: 2, simbolo: '+' },
        respuestaCorrecta: 4,
        opciones: [3, 4, 5, 6],
        ilustracion: '🐱🐱 + 🐱🐱 = ?',
        hint: 'Dos y dos son... cuatro patas tiene un perro',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 's4',
        titulo: 'Suma: 3 + 2',
        descripcion: '¿Cuánto es 3 más 2?',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 45,
        habilidades: ['suma-basica'],
        operacion: { a: 3, b: 2, simbolo: '+' },
        respuestaCorrecta: 5,
        opciones: [4, 5, 6, 7],
        ilustracion: '🍬🍬🍬 + 🍬🍬 = ?',
        hint: 'Tres dulces más dos dulces...',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 's5',
        titulo: 'Suma: 4 + 1',
        descripcion: '¿Cuánto es 4 más 1?',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['suma-basica', 'contar-adelante'],
        operacion: { a: 4, b: 1, simbolo: '+' },
        respuestaCorrecta: 5,
        opciones: [4, 5, 6, 3],
        ilustracion: '🖐️ (4 dedos) + ☝️ = ?',
        hint: 'Al cuatro le sumamos uno más',
        completada: false,
        mejorPuntuacion: 0
      }
    ],
  
    // ✅ NUEVA: LECTURA (Palabras y Comprensión)
    lectura: [
      {
        id: 'l1',
        titulo: 'Leer: MAMÁ',
        descripcion: 'Toca la palabra MAMÁ',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['lectura', 'reconocimiento-palabras'],
        palabraObjetivo: 'MAMÁ',
        opciones: ['MAMÁ', 'PAPÁ', 'BEBÉ', 'CASA'],
        hint: 'Empieza con M-A-M-A',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'l2',
        titulo: 'Leer: PAPÁ',
        descripcion: 'Encuentra la palabra PAPÁ',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['lectura'],
        palabraObjetivo: 'PAPÁ',
        opciones: ['MAMÁ', 'PAPÁ', 'OSO', 'SOL'],
        hint: 'Empieza con P-A-P-A',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'l3',
        titulo: 'Leer: SOL',
        descripcion: 'Toca la palabra SOL',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 35,
        habilidades: ['lectura', 'palabras-cortas'],
        palabraObjetivo: 'SOL',
        opciones: ['SOL', 'SAL', 'SOM', 'SON'],
        hint: 'Brilla en el cielo de día',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'l4',
        titulo: 'Leer: LUNA',
        descripcion: 'Encuentra la palabra LUNA',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 40,
        habilidades: ['lectura'],
        palabraObjetivo: 'LUNA',
        opciones: ['LUNA', 'LANA', 'LOMA', 'LIGA'],
        hint: 'Brilla en el cielo de noche',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'l5',
        titulo: '¿Qué dice? 🍎',
        descripcion: 'Toca la palabra correcta para la imagen',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 45,
        habilidades: ['lectura', 'asociacion-imagen-palabra'],
        imagen: '🍎',
        palabraObjetivo: 'MANZANA',
        opciones: ['MANZANA', 'NARANJA', 'PERA', 'UVA'],
        hint: 'Es roja y dulce',
        completada: false,
        mejorPuntuacion: 0
      },
      {
        id: 'l6',
        titulo: 'Completa: C_SA',
        descripcion: '¿Qué letra falta para formar CASA?',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 45,
        habilidades: ['lectura', 'completar-palabras'],
        palabra: 'CASA',
        letraFaltante: 'A',
        opciones: ['A', 'E', 'I', 'O'],
        hint: 'Ca-sa, la letra del medio es A',
        completada: false,
        mejorPuntuacion: 0
      }
    ],   
    colorear: [
      {
        id: 'col1',
        titulo: 'Colorea el Sol ☀️',
        descripcion: 'El sol es amarillo brillante',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 60,
        habilidades: ['reconocimiento-colores', 'creatividad'],
        colorCorrecto: '#FFE66D',
        palette: ['#FFE66D', '#FF6B9D', '#4ECDC4', '#95E1D3'],
        imagen: 'assets/illustrations/sol-para-colorear.svg',
        hint: 'El sol brilla como el amarillo',
        audioExito: 'audio/exito-colorear.mp3'
      }
    ],
    
    patrones: [
      {
        id: 'p1',
        titulo: 'Completa el Patrón',
        descripcion: '🔴 🔵 🔴 🔵 ___ ¿Qué sigue?',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 40,
        habilidades: ['logica', 'reconocimiento-patrones'],
        secuencia: ['🔴', '🔵', '🔴', '🔵'],
        opciones: ['🔴', '🔵', '🟡', '🟢'],
        respuestaCorrecta: '🔴',
        hint: 'Mira: rojo, azul, rojo, azul... ¿qué toca?',
        audioExito: 'audio/exito-logica.mp3'
      },
      { id: 'p2', titulo: 'Completa: 🔴🔴🔵🔵___', descripcion: '¿Qué sigue?', dificultad: 1, recompensa: 2, tiempoEstimado: 40, habilidades: ['logica', 'reconocimiento-patrones'], secuencia: ['🔴', '🔵', '🔴', '🔵'], opciones: ['🔴', '🔵', '🟡', '🟢'], respuestaCorrecta: '🔴', hint: 'Mira: rojo, azul, rojo, azul... ¿qué toca?', completada: false, mejorPuntuacion: 0 },
      { id: 'p3', titulo: 'Completa: 🟢🟡🟡🟢___', descripcion: 'Sigue el patrón', dificultad: 1, recompensa: 2, tiempoEstimado: 40, habilidades: ['logica'], secuencia: ['🟡', '🟢', '🟡', '🟢'], opciones: ['🟡', '🟢', '🔴', '🔵'], respuestaCorrecta: '🟡', hint: 'Amarillo, verde, amarillo, verde...', completada: false, mejorPuntuacion: 0 },
      {
        id: 'p4',
        titulo: 'Sigue el Patrón',
        descripcion: '⭐⭐ 🌙🌙 ___ ¿Qué sigue?',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 40,
        habilidades: ['logica', 'reconocimiento-formas'],
        secuencia: ['⭐', '⭐', '🌙', '🌙'],
        opciones: ['⭐', '🌙', '☀️', '🌟'],
        respuestaCorrecta: '⭐',
        hint: 'Dos estrellas, dos lunas... se repite',
        completada: false,
        mejorPuntuacion: 0
      },
      
      // ─────────────────────────────────────────────────────────────
      // PATRÓN 5: ABCABC (Animales) - MEDIO
      // ─────────────────────────────────────────────────────────────
      {
        id: 'p5',
        titulo: '¿Qué Sigue?',
        descripcion: '🐶 🐱 🐰 🐶 🐱 ___',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 50,
        habilidades: ['logica', 'secuenciacion', 'memoria'],
        secuencia: ['🐶', '🐱', '🐰', '🐶', '🐱'],
        opciones: ['🐶', '🐱', '🐰', '🐸'],
        respuestaCorrecta: '🐰',
        hint: 'Perro, gato, conejo... se repite el grupo',
        completada: false,
        mejorPuntuacion: 0
      },
      
      // ─────────────────────────────────────────────────────────────
      // PATRÓN 6: Colores con Frutas - MEDIO
      // ─────────────────────────────────────────────────────────────
      {
        id: 'p6',
        titulo: 'Patrón de Frutas',
        descripcion: '🍎 🍌 🍇 🍎 🍌 ___',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 50,
        habilidades: ['logica', 'reconocimiento-visual'],
        secuencia: ['🍎', '🍌', '🍇', '🍎', '🍌'],
        opciones: ['🍎', '🍌', '🍇', '🍊'],
        respuestaCorrecta: '🍇',
        hint: 'Manzana, plátano, uva... ¿qué sigue?',
        completada: false,
        mejorPuntuacion: 0
      },
      
      // ─────────────────────────────────────────────────────────────
      // PATRÓN 7: Creciente (Números) - DIFÍCIL
      // ─────────────────────────────────────────────────────────────
      {
        id: 'p7',
        titulo: 'Patrón Creciente',
        descripcion: '1️⃣ 1️⃣2️⃣ 1️⃣2️⃣3️⃣ ___',
        dificultad: 3,
        recompensa: 4,
        tiempoEstimado: 60,
        habilidades: ['logica', 'matematicas', 'secuenciacion'],
        secuencia: ['1️⃣', '1️⃣2️⃣', '1️⃣2️⃣3️⃣'],
        opciones: ['1️⃣2️⃣3️⃣4️⃣', '1️⃣2️⃣3️⃣', '4️⃣', '1️⃣'],
        respuestaCorrecta: '1️⃣2️⃣3️⃣4️⃣',
        hint: 'Cada vez hay un número más',
        completada: false,
        mejorPuntuacion: 0
      },
      
      // ─────────────────────────────────────────────────────────────
      // PATRÓN 8: Emociones - FÁCIL
      // ─────────────────────────────────────────────────────────────
      {
        id: 'p8',
        titulo: 'Patrón de Emojis',
        descripcion: '😊 😢 😊 😢 ___',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 40,
        habilidades: ['logica', 'reconocimiento-emociones'],
        secuencia: ['😊', '😢', '😊', '😢'],
        opciones: ['😊', '😢', '😄', '😮'],
        respuestaCorrecta: '😊',
        hint: 'Feliz, triste, feliz, triste...',
        completada: false,
        mejorPuntuacion: 0
      },
      
      // ─────────────────────────────────────────────────────────────
      // PATRÓN 9: Transporte - MEDIO
      // ─────────────────────────────────────────────────────────────
      {
        id: 'p9',
        titulo: 'Vehículos en Patrón',
        descripcion: '🚗 🚕 🚙 🚗 🚕 ___',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 50,
        habilidades: ['logica', 'reconocimiento-visual'],
        secuencia: ['🚗', '🚕', '🚙', '🚗', '🚕'],
        opciones: ['🚗', '🚕', '🚙', '🚌'],
        respuestaCorrecta: '🚙',
        hint: 'Auto, taxi, SUV... se repite',
        completada: false,
        mejorPuntuacion: 0
      },
      
      // ─────────────────────────────────────────────────────────────
      // PATRÓN 10: Naturaleza - DIFÍCIL
      // ─────────────────────────────────────────────────────────────
      {
        id: 'p10',
        titulo: 'Patrón Natural',
        descripcion: '🌞 🌧️ ⛈️ 🌞 🌧️ ___',
        dificultad: 3,
        recompensa: 4,
        tiempoEstimado: 60,
        habilidades: ['logica', 'ciencias', 'secuenciacion'],
        secuencia: ['🌞', '🌧️', '⛈️', '🌞', '🌧️'],
        opciones: ['🌞', '🌧️', '⛈️', '🌈'],
        respuestaCorrecta: '⛈️',
        hint: 'Sol, lluvia, tormenta... ¿qué sigue?',
        completada: false,
        mejorPuntuacion: 0
      }
    ],
    
    memoria: [
      {
        id: 'm1',
        titulo: 'Memoria de Animales',
        descripcion: 'Encuentra las parejas de animales',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 120,
        habilidades: ['memoria', 'concentracion'],
        nivel: 'facil',
        cartas: ['🐶', '🐶', '🐱', '🐱', '🐰', '🐰', '🐸', '🐸'],
        hint: 'Recuerda dónde viste cada animal',
        audioExito: 'audio/exito-memoria.mp3'
      },
      
      // ✅ NUEVO JUEGO 1: Memoria de Frutas (6 parejas - Fácil)
      {
        id: 'm2',
        titulo: 'Memoria de Frutas 🍎',
        descripcion: 'Encuentra las parejas de frutas deliciosas',
        dificultad: 1,
        recompensa: 2,
        tiempoEstimado: 90,
        habilidades: ['memoria', 'reconocimiento-visual'],
        nivel: 'facil',
        cartas: ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍊', '🍊', '🍋', '🍋'],
        hint: 'Las frutas del mismo tipo son parejas',
        audioExito: 'audio/exito-memoria.mp3'
      },
      
      // ✅ NUEVO JUEGO 2: Memoria de Colores y Formas (8 parejas - Medio)
      {
        id: 'm3',
        titulo: 'Memoria de Colores 🎨',
        descripcion: 'Encuentra las parejas de colores y formas',
        dificultad: 2,
        recompensa: 3,
        tiempoEstimado: 150,
        habilidades: ['memoria', 'reconocimiento-colores', 'atencion'],
        nivel: 'medio',
        cartas: ['🔴', '🔴', '🔵', '🔵', '🟢', '🟢', '🟡', '🟡', '🟣', '🟣', '🟠', '🟠', '⭐', '⭐', '🌙', '🌙'],
        hint: 'Fíjate en el color y la forma',
        audioExito: 'audio/exito-memoria.mp3'
      },
      
      // ✅ NUEVO JUEGO 3: Memoria de Emojis Divertidos (10 parejas - Difícil)
      {
        id: 'm4',
        titulo: 'Memoria de Emojis 😊',
        descripcion: 'Encuentra las parejas de emojis divertidos',
        dificultad: 3,
        recompensa: 4,
        tiempoEstimado: 180,
        habilidades: ['memoria', 'concentracion', 'atencion'],
        nivel: 'dificil',
        cartas: ['😊', '😊', '🤩', '🤩', '🥳', '🥳', '😎', '😎', '🤔', '🤔', '😴', '😴', '🤯', '🤯', '😋', '😋', '🥺', '🥺', '🤪', '🤪'],
        hint: 'Los emojis iguales son parejas',
        audioExito: 'audio/exito-memoria.mp3'
      }
    ]
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZACIÓN
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('✏️ Tareas v2.0 inicializadas');
    
    // Cargar configuración guardada
    this.cargarConfiguracion();
    
    // Configurar event listeners (delegación de eventos)
    this.configurarEventos();
    
    // Escuchar cambios de pantalla
    window.addEventListener('screen-change', (e) => {
      if (e.detail?.pantalla === 'tareas-screen') {
        this.cargar();
      }
    });
    
    // Verificar controles parentales al iniciar
    this.verificarControlesParentales();
    
    console.log('✅ Tareas listas - Categoría:', this.estado.categoriaActual);
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR CONFIGURACIÓN GUARDADA
  // ─────────────────────────────────────────────────────────────
  cargarConfiguracion: function() {
    try {
      // Sonidos
      const sonidosGuardados = localStorage.getItem(TAREAS_CONFIG.SOUND_ENABLED_KEY);
      if (sonidosGuardados !== null) {
        this.estado.sonidosActivos = JSON.parse(sonidosGuardados);
      }
      
      // Controles parentales
      const parentalGuardados = localStorage.getItem(TAREAS_CONFIG.PARENTAL_CONTROLS_KEY);
      if (parentalGuardados) {
        this.estado.parentalControls = {
          ...this.estado.parentalControls,
          ...JSON.parse(parentalGuardados)
        };
      }
      
      // Progreso de tareas
      const progresoGuardado = localStorage.getItem(TAREAS_CONFIG.STORAGE_KEY);
      if (progresoGuardado) {
        const progreso = JSON.parse(progresoGuardado);
        // Fusionar progreso guardado con catálogo actual
        this.fusionarProgreso(progreso);
      }
    } catch (error) {
      console.warn('⚠️ Error cargando configuración:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // FUSIONAR PROGRESO GUARDADO CON CATÁLOGO
  // ─────────────────────────────────────────────────────────────
  fusionarProgreso: function(progresoGuardado) {
    Object.keys(this.tareas).forEach(categoria => {
      this.tareas[categoria].forEach(tarea => {
        const tareaGuardada = progresoGuardado[tarea.id];
        if (tareaGuardada) {
          tarea.completada = tareaGuardada.completada || false;
          tarea.mejorPuntuacion = tareaGuardada.mejorPuntuacion || 0;
          tarea.intentosTotales = tareaGuardada.intentosTotales || 0;
          tarea.ultimaCompletada = tareaGuardada.ultimaCompletada || null;
        }
      });
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CONFIGURAR EVENTOS (DELEGACIÓN - MEJOR RENDIMIENTO)
  // ─────────────────────────────────────────────────────────────
  configurarEventos: function() {
    const container = document.getElementById('tareas-content');
    if (!container) return;
    
    // Delegación de eventos para botones de tareas
    container.addEventListener('click', (e) => {
      const btnJugar = e.target.closest('[data-accion="jugar"]');
      if (btnJugar) {
        e.preventDefault();
        const tareaId = btnJugar.dataset.tareaId;
        this.iniciarTarea(tareaId);
      }
      
      const btnHint = e.target.closest('[data-accion="hint"]');
      if (btnHint) {
        e.preventDefault();
        const tareaId = btnHint.dataset.tareaId;
        this.mostrarHint(tareaId);
      }
    });
    
    // Delegación para categorías
    const categoriasContainer = document.querySelector('.tareas-categorias');
    if (categoriasContainer) {
      categoriasContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.categoria-btn');
        if (btn) {
          e.preventDefault();
          const categoria = btn.dataset.categoria;
          this.filtrarPorCategoria(categoria);
        }
      });
    }
    
    // Teclado: Enter para activar tarea enfocada
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && document.activeElement?.dataset?.tareaId) {
        e.preventDefault();
        this.iniciarTarea(document.activeElement.dataset.tareaId);
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR PANTALLA DE TAREAS
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('✏️ Cargando tareas - Categoría:', this.estado.categoriaActual);
    
    // Renderizar categorías con estado actual
    this.renderCategorias();
    
    // Renderizar tareas filtradas
    this.renderTareas();
    
    // Actualizar estadísticas del header
    this.actualizarEstadisticasHeader();
    
    // Anunciar a lectores de pantalla
    this.anunciarCambioCategoria();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR SELECTOR DE CATEGORÍAS (CON ACCESIBILIDAD)
  // ─────────────────────────────────────────────────────────────
  renderCategorias: function() {
    const container = document.querySelector('.tareas-categorias');
    if (!container) return;
    
    const categorias = Object.keys(this.tareas);
    
    container.innerHTML = categorias.map(cat => {
      const tareasCat = this.tareas[cat];
      const completadas = tareasCat.filter(t => t.completada).length;
      const total = tareasCat.length;
      const porcentaje = Math.round((completadas / total) * 100);
      const activa = this.estado.categoriaActual === cat;
      
      return `
        <button class="categoria-btn ${activa ? 'active' : ''}" 
                data-categoria="${cat}"
                role="tab"
                aria-selected="${activa}"
                aria-controls="tareas-content"
                aria-label="${this.getNombreCategoria(cat)}: ${completadas} de ${total} completadas"
                style="position:relative;overflow:hidden;">
          <span class="cat-icon" aria-hidden="true">${this.getIconoCategoria(cat)}</span>
          <span class="cat-name">${this.getNombreCategoria(cat)}</span>
          ${completadas > 0 ? `
            <span class="cat-progress" style="position:absolute;bottom:0;left:0;height:3px;background:var(--success);width:${porcentaje}%;transition:width 0.3s;" 
                  aria-hidden="true"></span>
            <span class="cat-completed" style="position:absolute;top:4px;right:6px;font-size:10px;background:var(--success);color:white;padding:2px 6px;border-radius:10px;"
                  aria-label="${completadas} completadas">✓${completadas}</span>
          ` : ''}
        </button>
      `;
    }).join('');
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR CATEGORÍA (CON ANIMACIÓN Y FEEDBACK)
  // ─────────────────────────────────────────────────────────────
  filtrarPorCategoria: function(categoria) {
    // Validar controles parentales
    if (this.estado.parentalControls.categoriasBloqueadas.includes(categoria)) {
      window.app?.mostrarToast('🔒 Esta categoría requiere plan Pro', 'warning');
      return;
    }
    
    // Validar dificultad máxima
    const tareasCat = this.tareas[categoria];
    const tieneTareasPermitidas = tareasCat?.some(t => t.dificultad <= this.estado.parentalControls.dificultadMaxima);
    
    if (!tieneTareasPermitidas) {
      window.app?.mostrarToast('⚠️ Todas las tareas superan la dificultad permitida', 'warning');
      return;
    }
    
    // Actualizar estado
    this.estado.categoriaActual = categoria;
    
    // Animación de cambio
    const container = document.getElementById('tareas-content');
    if (container) {
      container.style.opacity = '0.5';
      container.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        this.renderCategorias();
        this.renderTareas();
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 200);
    }
    
    // Feedback auditivo
    this.reproducirSonido('audio/click-categoria.mp3');
    
    // Analytics (placeholder para integración futura)
    this.registrarEvento('categoria_cambiada', { categoria });
    
    console.log(`✏️ Categoría cambiada a: ${categoria}`);
  },

  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR TAREAS (CON ESTADO Y ACCESIBILIDAD)
  // ─────────────────────────────────────────────────────────────
  renderTareas: function() {
    const container = document.getElementById('tareas-content');
    if (!container) return;
    
    const tareas = this.tareas[this.estado.categoriaActual];
    if (!tareas || tareas.length === 0) {
      container.innerHTML = this.renderEstadoVacio();
      return;
    }
    
    // Filtrar por dificultad permitida
    const tareasFiltradas = tareas.filter(t => 
      t.dificultad <= this.estado.parentalControls.dificultadMaxima
    );
    
    if (tareasFiltradas.length === 0) {
      container.innerHTML = this.renderSinTareasPermitidas();
      return;
    }
    
    container.innerHTML = `
      <div class="tareas-grid" 
           style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;"
           role="list"
           aria-label="Lista de actividades de ${this.getNombreCategoria(this.estado.categoriaActual)}">
        ${tareasFiltradas.map(tarea => this.renderTarjetaTarea(tarea)).join('')}
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR TARJETA DE TAREA INDIVIDUAL
  // ─────────────────────────────────────────────────────────────
  renderTarjetaTarea: function(tarea) {
    const completada = tarea.completada;
    const dificultadStars = '⭐'.repeat(tarea.dificultad);
    const tiempoTexto = tarea.tiempoEstimado >= 60 
      ? `${Math.round(tarea.tiempoEstimado/60)} min` 
      : `${tarea.tiempoEstimado} seg`;
    
    return `
      <article class="card tarea-card ${completada ? 'completada' : ''}" 
               style="border:2px solid ${completada ? 'var(--success)' : 'var(--border)'};
                      border-radius:var(--radius-lg);
                      overflow:hidden;
                      transition:all 0.3s ease;
                      position:relative;"
               role="listitem"
               aria-label="${tarea.titulo}: ${tarea.descripcion}. Dificultad: ${tarea.dificultad} estrellas. Recompensa: ${tarea.recompensa} estrellas">
        
        ${completada ? `
          <div style="position:absolute;top:12px;right:12px;background:var(--success);color:white;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;z-index:10;"
               aria-label="Completada">
            ✓ Completada
          </div>
        ` : ''}
        
        <div class="card-header" 
             style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));
                    padding:16px;
                    display:flex;
                    justify-content:space-between;
                    align-items:flex-start;">
          <div>
            <h3 class="card-title" style="color:var(--primary);font-size:16px;font-weight:700;margin:0;">
              ${this.getIconoCategoria(this.estado.categoriaActual)} ${tarea.titulo}
            </h3>
            <p style="color:var(--ink3);font-size:12px;margin:4px 0 0 0;">
              ⏱️ ${tiempoTexto} • 🎯 ${tarea.recompensa} ⭐
            </p>
          </div>
          <div style="font-size:18px;" aria-hidden="true">${dificultadStars}</div>
        </div>
        
        <div class="card-body" style="padding:16px;">
          <p style="color:var(--ink2);font-size:14px;line-height:1.5;margin-bottom:16px;">
            ${tarea.descripcion}
          </p>
          
          ${tarea.habilidades?.length ? `
            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;" aria-label="Habilidades desarrolladas">
              ${tarea.habilidades.map(hab => `
                <span style="font-size:10px;background:var(--bg2);color:var(--ink3);padding:4px 8px;border-radius:12px;"
                      aria-label="Habilidad: ${hab.replace('-', ' ')}">
                  ${hab.replace('-', ' ')}
                </span>
              `).join('')}
            </div>
          ` : ''}
          
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="topbar-btn primary" 
                  data-accion="jugar"
                  data-tarea-id="${tarea.id}"
                  style="flex:1;min-height:48px;font-size:15px;"
                  aria-label="${completada ? `Repetir: ${tarea.titulo}` : `Jugar: ${tarea.titulo}`}">
            ${completada ? '🔄 Repetir' : '🎮 Jugar'}
          </button>
          
          <button class="topbar-btn ghost" 
                  data-accion="hint"
                  data-tarea-id="${tarea.id}"
                  style="min-width:48px;padding:0 12px;"
                  aria-label="Obtener pista para ${tarea.titulo}"
                  title="Pista">
            💡
          </button>
        </div>
        
        ${tarea.mejorPuntuacion > 0 ? `
          <div style="background:var(--accent-light);padding:8px 16px;text-align:center;font-size:12px;color:var(--ink2);border-top:1px solid var(--border);"
               aria-label="Mejor puntuación: ${tarea.mejorPuntuacion} estrellas">
            🏆 Mejor: ${tarea.mejorPuntuacion} ⭐
          </div>
        ` : ''}
      </article>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR ESTADO VACÍO
  // ─────────────────────────────────────────────────────────────
  renderEstadoVacio: function() {
    return `
      <div style="text-align:center;padding:60px 20px;color:var(--ink3);" role="status">
        <div style="font-size:64px;margin-bottom:16px;" aria-hidden="true">📭</div>
        <h3 style="color:var(--ink);font-size:18px;margin-bottom:8px;">Próximamente</h3>
        <p style="font-size:14px;">Estamos creando más actividades para esta categoría</p>
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR SIN TAREAS PERMITIDAS (CONTROLES PARENTALES)
  // ─────────────────────────────────────────────────────────────
  renderSinTareasPermitidas: function() {
    return `
      <div style="text-align:center;padding:60px 20px;color:var(--ink3);" role="alert">
        <div style="font-size:48px;margin-bottom:16px;" aria-hidden="true">🔒</div>
        <h3 style="color:var(--ink);font-size:18px;margin-bottom:8px;">Configuración de Papás</h3>
        <p style="font-size:14px;margin-bottom:16px;">
          Las tareas de esta categoría superan la dificultad permitida
        </p>
        <button class="topbar-btn ghost" onclick="app.mostrarPantalla('padres-screen')"
                style="min-height:44px;">
          ⚙️ Ajustar configuración
        </button>
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR TAREA (CON VALIDACIONES Y PREPARACIÓN)
  // ─────────────────────────────────────────────────────────────
  iniciarTarea: function(tareaId) {
    const categoria = this.estado.categoriaActual;
    const tarea = this.tareas[categoria]?.find(t => t.id === tareaId);
    
    if (!tarea) {
      console.error('❌ Tarea no encontrada:', tareaId);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      return;
    }
    
    // ✅ PERMITIR REPETIR incluso si está completada
    if (tarea.completada) {
      console.log('🔄 Repitiendo tarea completada:', tarea.titulo);
      window.app?.mostrarToast('🔄 ¡Vamos a mejorar tu puntuación!', 'info');
    }
    
    // Resetear estado de juego
    this.estado.tareaActiva = tarea;
    this.estado.intentos = 0;
    this.estado.hintsUsados = 0;
    this.estado.tiempoInicio = Date.now();
    this.estado.juegoRespondido = false;
    
    console.log('✏️ Iniciando tarea:', tarea.titulo);
    
    // Mostrar modal de instrucciones con accesibilidad
    this.mostrarInstrucciones(tarea);
    
    // Analytics
    this.registrarEvento('tarea_iniciada', { 
      tareaId, 
      categoria, 
      dificultad: tarea.dificultad,
      esRepetido: tarea.completada
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR INSTRUCCIONES (MODAL ACCESIBLE - v3.0)
  // ─────────────────────────────────────────────────────────────
  mostrarInstrucciones: function(tarea) {
    console.log('📋 Mostrando instrucciones:', tarea.titulo);
    
    // OPCIÓN A: Usar modal estático si existe en index.html (RECOMENDADO)
    const modalEstatico = document.getElementById('modal-instrucciones-tarea');
    
    if (modalEstatico) {
      // Llenar contenido dinámico
      const elTitulo = document.getElementById('modal-instrucciones-titulo');
      const elIcono = document.getElementById('modal-instrucciones-icono');
      const elTexto = document.getElementById('modal-instrucciones-texto');
      const elRecompensa = document.getElementById('modal-instrucciones-recompensa');
      const btnHint = document.getElementById('modal-instrucciones-hint');
      const btnComenzar = document.getElementById('modal-instrucciones-comenzar');
      
      if (elTitulo) elTitulo.textContent = tarea.titulo;
      if (elIcono) elIcono.textContent = tarea.icono || this.getIconoCategoria(this.estado.categoriaActual);
      if (elTexto) elTexto.textContent = tarea.instruccionesDetalladas || tarea.descripcion;
      if (elRecompensa) elRecompensa.textContent = `${tarea.recompensa} estrellas`;
      
      // Configurar botón de hint
      if (btnHint) {
        if (tarea.hint) {
          btnHint.style.display = 'flex';
          btnHint.onclick = (e) => {
            e.preventDefault();
            this.mostrarHint(tarea.id);
          };
        } else {
          btnHint.style.display = 'none';
        }
      }
      
      // Configurar botón de comenzar
      if (btnComenzar) {
        btnComenzar.onclick = (e) => {
          e.preventDefault();
          if (window.components?.modal?.cerrar) {
            window.components.modal.cerrar('modal-instrucciones-tarea');
          } else {
            modalEstatico.classList.remove('active');
            if (modalEstatico.tagName === 'DIALOG') modalEstatico.close();
          }
          document.body.style.overflow = '';
          this.comenzarJuego(tarea.id);
        };
      }
      
      // Abrir modal
      if (window.components?.modal?.abrir) {
        window.components.modal.abrir('modal-instrucciones-tarea');
      } else {
        modalEstatico.classList.add('active');
        if (modalEstatico.tagName === 'DIALOG' && typeof modalEstatico.showModal === 'function') {
          modalEstatico.showModal();
        }
        document.body.style.overflow = 'hidden';
      }
      
      // Enfocar botón para accesibilidad
      setTimeout(() => btnComenzar?.focus(), 100);
      
      return;
    }
    
    // OPCIÓN B: Fallback - crear modal dinámico (si el estático no existe)
    console.log('⚠️ Modal estático no encontrado, creando modal dinámico');
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-instrucciones-tarea-dinamico';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-instrucciones-title');
    
    // ✅ Click en overlay para cerrar
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.cerrarModalInstrucciones(modal);
      }
    });
    
    // ✅ Cerrar con tecla Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarModalInstrucciones(modal);
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // ✅ Template literal CORREGIDO (sin espacios ni comillas rotas)
    modal.innerHTML = `
      <div class="modal-content" style="max-width:520px;" role="document">
        <div class="modal-header">
          <h2 id="modal-instrucciones-title" class="modal-title" style="font-size:18px;">
            ${this.getIconoCategoria(this.estado.categoriaActual)} ${tarea.titulo}
          </h2>
          <button class="modal-close" aria-label="Cerrar instrucciones" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;text-align:center;">
          <div style="font-size:56px;margin-bottom:16px;" aria-hidden="true">
            ${this.getIconoCategoria(this.estado.categoriaActual)}
          </div>
          <h3 style="color:var(--primary);margin-bottom:12px;font-size:16px;">Instrucciones</h3>
          <p style="color:var(--ink2);font-size:15px;line-height:1.6;white-space:pre-line;margin-bottom:20px;">
            ${tarea.instruccionesDetalladas || tarea.descripcion}
          </p>

          ${tarea.instruccionesDetalladas || tarea.descripcion ? `
            <button id="btn-leer-instrucciones" 
                    class="topbar-btn ghost" 
                    style="width:100%;min-height:44px;margin-bottom:12px;"
                    aria-label="Escuchar instrucciones en voz alta">
              🔊 Escuchar instrucciones
            </button>
          ` : ''}
          
          <div style="background:var(--bg2);padding:14px;border-radius:var(--radius-sm);margin-bottom:20px;" role="note">
            <div style="font-size:13px;color:var(--ink3);">⭐ Recompensa:</div>
            <div style="font-size:28px;font-weight:800;color:var(--accent);margin-top:4px;">
              ${tarea.recompensa} estrellas
            </div>
          </div>
          ${tarea.hint ? `
            <button id="btn-hint-dinamico" class="topbar-btn ghost" style="width:100%;min-height:44px;margin-bottom:12px;">
              💡 ¿Necesitas una pista?
            </button>
          ` : ''}
        <!-- ✅ AGREGA ESTE BOTÓN NUEVO -->
        <button class="topbar-btn ghost" 
                onclick="features.tareas.leerInstruccionesTarea(features.tareas.estado.tareaActiva)"
                style="width:100%;min-height:44px;margin-bottom:12px;">
          🔊 Escuchar instrucciones
        </button>
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;flex-wrap:wrap;">
          <button class="btn-cancelar-instrucciones topbar-btn ghost" style="min-width:120px;min-height:48px;">
            ❌ Cancelar
          </button>
          <button class="btn-comenzar-juego topbar-btn primary" style="min-width:150px;min-height:48px;" autofocus>
            🎮 ¡Comenzar!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    if (typeof this.desbloquearAudio === 'function') {
      this.desbloquearAudio();
    }
    document.body.style.overflow = 'hidden';
    
    // ✅ Configurar listeners para botones
    const btnCerrar = modal.querySelector('.modal-close');
    const btnCancelar = modal.querySelector('.btn-cancelar-instrucciones');
    const btnComenzar = modal.querySelector('.btn-comenzar-juego');
    const btnHintDinamico = modal.querySelector('#btn-hint-dinamico');
    const btnLeerInstrucciones = modal.querySelector('#btn-leer-instrucciones');
    if (btnLeerInstrucciones) {
      btnLeerInstrucciones.addEventListener('click', () => {
        this.leerInstruccionesTarea(tarea);
      });
    }   
    const cerrarYLimpiar = () => this.cerrarModalInstrucciones(modal, onKeydown);
    
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarYLimpiar);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarYLimpiar);
    
    if (btnComenzar) {
      btnComenzar.addEventListener('click', () => {
        cerrarYLimpiar();
        this.comenzarJuego(tarea.id);
      });
    }
    
    if (btnHintDinamico && tarea.hint) {
      btnHintDinamico.addEventListener('click', (e) => {
        e.preventDefault();
        this.mostrarHint(tarea.id);
      });
    }
    
    // ✅ Enfocar botón principal para accesibilidad
    setTimeout(() => btnComenzar?.focus(), 100);
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR MODAL DE INSTRUCCIONES
  // ─────────────────────────────────────────────────────────────
  cerrarModalInstrucciones: function(modal, onKeydownCallback) {
    if (modal) {
      modal.classList.remove('active');
      // Si es un <dialog>, usar close()
      if (modal.tagName === 'DIALOG' && typeof modal.close === 'function') {
        modal.close();
      }
      // Remover del DOM si es dinámico
      if (modal.id.includes('dinamico')) {
        setTimeout(() => modal.remove(), 200);
      }
    }
    if (onKeydownCallback) {
      document.removeEventListener('keydown', onKeydownCallback);
    }
    document.body.style.overflow = '';
    console.log('📋 Modal de instrucciones cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR HINT / PISTA
  // ─────────────────────────────────────────────────────────────
  mostrarHint: function(tareaId) {
    const tarea = this.obtenerTareaPorId(tareaId);
    if (!tarea?.hint) return;
    
    // Limitar hints por sesión
    if (this.estado.hintsUsados >= TAREAS_CONFIG.HINTS_DISPONIBLES) {
      window.app?.mostrarToast('💡 Ya usaste todas las pistas disponibles', 'info');
      return;
    }
    
    this.estado.hintsUsados++;
    
    // Mostrar hint en toast o modal pequeño
    window.app?.mostrarToast(`💡 Pista: ${tarea.hint}`, 'info');
    
    // Reproducir sonido de hint
    this.reproducirSonido('audio/hint.mp3');
    
    // Analytics
    this.registrarEvento('hint_usado', { tareaId, hintNumero: this.estado.hintsUsados });
  },

  // ─────────────────────────────────────────────────────────────
  // LEER TEXTO EN VOZ ALTA (CORREGIDO - SIN DUPLICAR)
  // ─────────────────────────────────────────────────────────────
  leerTextoEnVozAlta: function(texto, idioma = 'es-MX') {
    if (!this.estado.sonidosActivos) return false;
    if (!('speechSynthesis' in window)) return false;
    
    // Cancelar cualquier audio previo
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = idioma;
    utterance.rate = 0.85;  // ← MÁS LENTO para niños
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    // Buscar voz en español
    const voces = window.speechSynthesis.getVoices();
    const vozEspanol = voces.find(v => 
      v.lang.includes('es-MX') || 
      v.lang.includes('es-ES') ||
      v.name.toLowerCase().includes('spanish') ||
      v.name.toLowerCase().includes('español')
    );
    
    if (vozEspanol) {
      utterance.voice = vozEspanol;
      console.log('🎤 Usando voz:', vozEspanol.name);
    }
    
    utterance.onstart = () => console.log('🗣️ Leyendo:', texto.substring(0, 30) + '...');
    utterance.onend = () => console.log('✅ Lectura completada');
    
    window.speechSynthesis.speak(utterance);
    return true;
  },
  
  // ─────────────────────────────────────────────────────────────
  // LEER INSTRUCCIONES DE TAREA (WRAPPER)
  // ─────────────────────────────────────────────────────────────
  leerInstruccionesTarea: function(tarea) {
    const texto = `${tarea.titulo}. ${tarea.instruccionesDetalladas || tarea.descripcion}. 
                   Recompensa: ${tarea.recompensa} estrellas.`;
    
    return this.leerTextoEnVozAlta(texto);
  },
  
   // ─────────────────────────────────────────────────────────────
  // LEER FEEDBACK DE ÉXITO (CORREGIDO - usa reproducirTexto)
  // ─────────────────────────────────────────────────────────────
  leerFeedbackExito: function(tarea) {
    if (!this.estado.sonidosActivos) return;
    if (!('speechSynthesis' in window)) return;
    
    const frases = [
      `¡Excelente! Completaste ${tarea.titulo}`,
      `¡Muy bien! Terminaste ${tarea.titulo}`,
      `¡Fantástico! ${tarea.titulo} completada`,
      `¡Increíble! Lo lograste`
    ];
    
    const frase = frases[Math.floor(Math.random() * frases.length)];
    return this.reproducirTexto(frase);  // ← Ahora usa la función correcta
  },
  
  // ─────────────────────────────────────────────────────────────
  // LEER FEEDBACK DE ÁNIMO (CORREGIDO - usa reproducirTexto)
  // ─────────────────────────────────────────────────────────────
  leerFeedbackAnimo: function() {
    if (!this.estado.sonidosActivos) return;
    if (!('speechSynthesis' in window)) return;
    
    const frases = [
      'Casi lo logras, intenta de nuevo',
      'Tú puedes, sigue practicando',
      'No te rindas, inténtalo otra vez',
      'Muy cerca, vamos por más'
    ];
    
    const frase = frases[Math.floor(Math.random() * frases.length)];
    return this.reproducirTexto(frase);  // ← Ahora usa la función correcta
  },

  
  // ─────────────────────────────────────────────────────────────
  // DESBLOQUEAR AUDIO AL PRIMER CLICK (PARA AUTOPOLICY)
  // ─────────────────────────────────────────────────────────────
  desbloquearAudio: function() {
    if (!('speechSynthesis' in window)) return;
    
    // Crear utterance silencioso para "desbloquear" el motor de voz
    const silent = new SpeechSynthesisUtterance('');
    silent.volume = 0;
    window.speechSynthesis.speak(silent);
    
    console.log('🔓 Audio de voz desbloqueado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // DETENER LECTURA ACTUAL
  // ─────────────────────────────────────────────────────────────
  detenerLectura: function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      console.log('🔇 Lectura detenida');
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR SI ESTÁ HABLANDO
  // ─────────────────────────────────────────────────────────────
  estaHablando: function() {
    if ('speechSynthesis' in window) {
      return window.speechSynthesis.speaking;
    }
    return false;
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SONIDOS (ACTUALIZADO PARA INCLUIR VOZ)
  // ─────────────────────────────────────────────────────────────
  toggleSonidos: function() {
    this.estado.sonidosActivos = !this.estado.sonidosActivos;
    localStorage.setItem(TAREAS_CONFIG.SOUND_ENABLED_KEY, JSON.stringify(this.estado.sonidosActivos));
    
    const mensaje = this.estado.sonidosActivos 
      ? '🔊 Sonidos y voz activados' 
      : '🔇 Sonidos y voz desactivados';
    
    window.app?.mostrarToast(mensaje, 'info');
    
    this.registrarEvento('sonidos_toggle', { activado: this.estado.sonidosActivos });
  },
  
  // ─────────────────────────────────────────────────────────────
  // COMENZAR JUEGO (ACTUALIZADO)
  // ─────────────────────────────────────────────────────────────
  comenzarJuego: function(tareaId) {
    const tarea = this.obtenerTareaPorId(tareaId);
    if (!tarea) return;
    
    console.log('🎮 Juego iniciado:', tarea.titulo);
    
    this.estado.tareaActiva = tarea;
    this.estado.intentos = 0;
    this.estado.hintsUsados = 0;
    this.estado.juegoRespondido = false;
    this.estado.tiempoInicio = Date.now();
    
    // Ejecutar lógica específica por categoría
    switch (this.estado.categoriaActual) {
      case 'conteo':
        this.iniciarJuegoConteo(tarea);
        break;
      
      case 'abecedario':
        if (tarea.silabaObjetivo || tarea.letraFaltante) {
          this.iniciarJuegoSilabas(tarea);
        } else {
          this.iniciarJuegoLetras(tarea);
        }
        break;
      
      case 'sumas':
        this.iniciarJuegoSumas(tarea);
        break;
      case 'lectura':
        if (tarea.imagen) {
          this.iniciarJuegoLecturaImagen(tarea);
        } else if (tarea.letraFaltante) {
          this.iniciarJuegoCompletarPalabra(tarea);
        } else {
          this.iniciarJuegoLeerPalabra(tarea);
        }
        break;
      case 'trazo':
        this.iniciarJuegoTrazo(tarea);  // ← ¡Ahora llama al juego real!
        break;        
      case 'colorear':
        this.iniciarJuegoColorear(tarea);  // ← ¡Ahora llama al juego real!
        break;       
      case 'patrones':
        this.iniciarJuegoPatrones(tarea);  // ← ¡Ahora llama al juego real!
        break;
      case 'memoria':
        this.iniciarJuegoMemoria(tarea);
        break;
      default:
        this.mostrarProximamente(tarea, this.getIconoCategoria(this.estado.categoriaActual), this.estado.categoriaActual);
    }
    
    this.registrarEvento('juego_comenzado', { 
      tareaId, 
      categoria: this.estado.categoriaActual,
      timestamp: Date.now()
    });
  },

  // ─────────────────────────────────────────────────────────────
  // MOSTRAR PRÓXIMAMENTE (MODAL DE ACTIVIDAD EN DESARROLLO)
  // ─────────────────────────────────────────────────────────────
  mostrarProximamente: function(tarea, icono, categoria) {
    console.log('🚧 Actividad en desarrollo:', tarea.titulo, categoria);
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-proximamente';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:450px;text-align:center;" role="document">
        <div class="modal-body" style="padding:40px 24px;">
          <div style="font-size:72px;margin-bottom:16px;" aria-hidden="true">${icono}</div>
          <h2 style="color:var(--primary);font-size:22px;margin-bottom:12px;">
            🚧 En Construcción
          </h2>
          <p style="color:var(--ink2);font-size:15px;line-height:1.6;margin-bottom:20px;">
            <strong>${tarea.titulo}</strong><br>
            Esta actividad de <strong>${categoria}</strong> está siendo desarrollada con mucho cariño.
          </p>
          <div style="background:var(--bg2);padding:16px;border-radius:var(--radius-sm);margin-bottom:24px;">
            <p style="font-size:13px;color:var(--ink3);margin:0;">
              📅 Próximamente disponible<br>
              Mientras tanto, ¡prueba las actividades de 
              <strong>Conteo</strong>, <strong>Sumas</strong> o <strong>Lectura</strong> que ya están listas! ✨
            </p>
          </div>
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;flex-wrap:wrap;">
          <button onclick="this.closest('.modal')?.remove()" 
                  class="topbar-btn ghost"
                  style="min-width:140px;min-height:48px;">
            👍 Entendido
          </button>
          <button onclick="this.closest('.modal')?.remove();app.mostrarPantalla('tareas-screen')" 
                  class="topbar-btn primary"
                  style="min-width:160px;min-height:48px;">
            🎮 Ver actividades disponibles
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Enfocar botón para accesibilidad
    setTimeout(() => {
      modal.querySelector('.topbar-btn.primary')?.focus();
    }, 100);
    
    // Guardar referencia
    this.estado.juegoActivo = { modal, tipo: 'proximamente', tareaId: tarea.id };
    
    // Analytics
    this.registrarEvento('actividad_proximamente', { 
      tareaId: tarea.id, 
      categoria: categoria 
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // SIMULAR COMPLETADO (FALLBACK)
  // ─────────────────────────────────────────────────────────────
  simularCompletado: function(tarea) {
    // Simular tiempo de juego mínimo
    const tiempoMinimo = TAREAS_CONFIG.TIEMPO_MINIMO_POR_TAREA * 1000;
    const tiempoTranscurrido = Date.now() - this.estado.tiempoInicio;
    const tiempoRestante = Math.max(0, tiempoMinimo - tiempoTranscurrido);
    
    setTimeout(() => {
      this.completarTarea(tarea.id, { exito: true, puntuacion: tarea.recompensa });
    }, tiempoRestante);
  },
  
  // ─────────────────────────────────────────────────────────────
  // COMPLETAR TAREA (CON RECOMPENSAS Y PROGRESO)
  // ─────────────────────────────────────────────────────────────
  completarTarea: function(tareaId, resultado) {
    const tarea = this.obtenerTareaPorId(tareaId);
    if (!tarea) return;
    
    const tiempoJugado = Math.round((Date.now() - this.estado.tiempoInicio) / 1000);
    
    // Calcular puntuación final
    const puntuacion = this.calcularPuntuacion(tarea, resultado, tiempoJugado);
    
    // Actualizar progreso de la tarea
    tarea.completada = resultado.exito;
    tarea.mejorPuntuacion = Math.max(tarea.mejorPuntuacion || 0, puntuacion);
    tarea.intentosTotales = (tarea.intentosTotales || 0) + 1;
    tarea.ultimaCompletada = resultado.exito ? new Date().toISOString() : tarea.ultimaCompletada;
    
    // Guardar progreso en localStorage
    this.guardarProgresoTarea(tareaId, {
      completada: tarea.completada,
      mejorPuntuacion: tarea.mejorPuntuacion,
      intentosTotales: tarea.intentosTotales,
      ultimaCompletada: tarea.ultimaCompletada
    });
    
    // Dar recompensa si tuvo éxito
    if (resultado.exito && window.features?.progreso?.agregarEstrellas) {
      window.features.progreso.agregarEstrellas(
        puntuacion, 
        `Tarea: ${tarea.titulo}`,
        { tareaId, categoria: this.estado.categoriaActual }
      );
    }
    
    // Mostrar celebración
    this.mostrarCelebracion(tarea, { puntuacion, tiempoJugado, exito: resultado.exito });
    
    // Analytics
    this.registrarEvento('tarea_completada', {
      tareaId,
      exito: resultado.exito,
      puntuacion,
      tiempoJugado,
      intentos: this.estado.intentos,
      hintsUsados: this.estado.hintsUsados
    });
    
    // Resetear estado
    this.estado.tareaActiva = null;
    this.estado.intentos = 0;
    this.estado.hintsUsados = 0;
  },
  
  // ─────────────────────────────────────────────────────────────
  // CALCULAR PUNTUACIÓN (CON BONUS POR VELOCIDAD Y EFICIENCIA)
  // ─────────────────────────────────────────────────────────────
  calcularPuntuacion: function(tarea, resultado, tiempoJugado) {
    let puntuacion = resultado.exito ? tarea.recompensa : 0;
    
    // Bonus por tiempo (más rápido = más puntos, pero con límite)
    if (resultado.exito && tiempoJugado < tarea.tiempoEstimado * 1.5) {
      const bonusTiempo = Math.max(0, Math.round((tarea.tiempoEstimado - tiempoJugado) / 10));
      puntuacion += Math.min(bonusTiempo, Math.floor(tarea.recompensa / 2));
    }
    
    // Penalización por hints usados
    puntuacion = Math.max(1, puntuacion - (this.estado.hintsUsados * 0.5));
    
    // Penalización por intentos extra
    if (this.estado.intentos > 1) {
      puntuacion = Math.max(1, puntuacion - (this.estado.intentos - 1) * 0.3);
    }
    
    return Math.round(puntuacion);
  },
  
  // ─────────────────────────────────────────────────────────────
  // GUARDAR PROGRESO DE TAREA
  // ─────────────────────────────────────────────────────────────
  guardarProgresoTarea: function(tareaId, datos) {
    try {
      const progreso = JSON.parse(localStorage.getItem(TAREAS_CONFIG.STORAGE_KEY) || '{}');
      progreso[tareaId] = {
        ...progreso[tareaId],
        ...datos,
        actualizado: new Date().toISOString()
      };
      localStorage.setItem(TAREAS_CONFIG.STORAGE_KEY, JSON.stringify(progreso));
    } catch (error) {
      console.warn('⚠️ Error guardando progreso:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR CELEBRACIÓN (v3.0 - CON CIERRE FUNCIONAL)
  // ─────────────────────────────────────────────────────────────
  mostrarCelebracion: function(tarea, datos) {
    const { puntuacion, tiempoJugado, exito } = datos;
    console.log('🎉 Mostrando celebración:', exito ? 'éxito' : 'intento', tarea.titulo);
    
    // OPCIÓN A: Usar modal estático si existe en index.html
    const modalEstatico = document.getElementById('modal-celebracion');
    
    if (modalEstatico) {
      // Llenar contenido dinámico
      const elTitulo = document.getElementById('modal-celebracion-titulo');
      const elMensaje = document.getElementById('modal-celebracion-mensaje');
      const elIcono = document.getElementById('modal-celebracion-icono');
      const elPuntuacion = document.getElementById('modal-celebracion-puntuacion');
      const elBonus = document.getElementById('modal-celebracion-bonus');
      const btnContinuar = document.getElementById('modal-celebracion-continuar');
      const btnReintentar = document.getElementById('modal-celebracion-reintentar');
      
      if (elTitulo) elTitulo.textContent = exito ? '¡Excelente trabajo! 🎉' : '¡Casi lo logras! 💪';
      if (elMensaje) elMensaje.textContent = exito ? `Completaste: ${tarea.titulo}` : `Inténtalo de nuevo: ${tarea.titulo}`;
      if (elIcono) elIcono.textContent = exito ? '🎉' : '💪';
      if (elPuntuacion) elPuntuacion.textContent = puntuacion;
      
      // Mostrar bonus por velocidad si aplica
      if (elBonus) {
        if (exito && tiempoJugado < tarea.tiempoEstimado) {
          elBonus.style.display = 'block';
        } else {
          elBonus.style.display = 'none';
        }
      }
      
      // Configurar botón continuar
      if (btnContinuar) {
        btnContinuar.onclick = (e) => {
          e.preventDefault();
          this.cerrarModalCelebracion(modalEstatico);
          this.renderTareas();
          this.actualizarEstadisticasHeader();
        };
      }
      
      // Configurar botón reintentar (solo si falló)
      if (btnReintentar) {
        if (!exito) {
          btnReintentar.style.display = 'flex';
          btnReintentar.onclick = (e) => {
            e.preventDefault();
            this.cerrarModalCelebracion(modalEstatico);
            this.iniciarTarea(tarea.id);
          };
        } else {
          btnReintentar.style.display = 'none';
        }
      }
      
      // Abrir modal
      if (window.components?.modal?.abrir) {
        window.components.modal.abrir('modal-celebracion');
      } else {
        modalEstatico.classList.add('active');
        if (modalEstatico.tagName === 'DIALOG' && typeof modalEstatico.showModal === 'function') {
          modalEstatico.showModal();
        }
        document.body.style.overflow = 'hidden';
      }
      
      // Enfocar botón principal
      setTimeout(() => btnContinuar?.focus(), 100);
      
      // Efecto de confetti si está activo y hubo éxito
      if (TAREAS_CONFIG.CELEBRACION_CONFETTI && exito) {
        this.activarConfetti();
      }
      
      return;
    }
    
    // OPCIÓN B: Fallback - crear modal dinámico
    console.log('⚠️ Modal de celebración estático no encontrado, creando dinámico');
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-celebracion-dinamico';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    // ✅ Click en overlay para cerrar
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.cerrarModalCelebracion(modal);
        this.renderTareas();
        this.actualizarEstadisticasHeader();
      }
    });
    
    // ✅ Cerrar con Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarModalCelebracion(modal);
        this.renderTareas();
        this.actualizarEstadisticasHeader();
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // ✅ Template literal CORREGIDO
    modal.innerHTML = `
      <div class="modal-content" style="max-width:420px;text-align:center;" role="document">
        <div class="modal-body" style="padding:32px 24px;">
          <div style="font-size:72px;margin-bottom:12px;${TAREAS_CONFIG.ANIMACIONES_ACTIVAS ? 'animation:bounce 1s infinite' : ''}" aria-hidden="true">
            ${exito ? '🎉' : '💪'}
          </div>
          <h2 style="color:var(${exito ? '(--primary)' : '(--warning)'});font-size:24px;margin-bottom:8px;">
            ${exito ? '¡Excelente trabajo!' : '¡Casi lo logras!'}
          </h2>
          <p style="color:var(--ink2);font-size:16px;margin-bottom:20px;">
            ${tarea.titulo}
          </p>
          ${exito ? `
            <div style="background:linear-gradient(135deg,var(--accent-light),var(--accent));padding:20px;border-radius:var(--radius-lg);margin-bottom:20px;" role="status" aria-live="polite">
              <div style="font-size:13px;color:rgba(255,255,255,0.9);">⭐ Puntuación:</div>
              <div style="font-size:42px;font-weight:800;color:white;margin-top:4px;">${puntuacion}</div>
              ${tiempoJugado < tarea.tiempoEstimado ? `<div style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:8px;">⚡ ¡Bonus por velocidad!</div>` : ''}
            </div>
          ` : `
            <div style="background:var(--warning-light);padding:16px;border-radius:var(--radius-sm);margin-bottom:20px;">
              <p style="font-size:14px;color:var(--warning);margin:0;">💡 Consejo: Usa las pistas si necesitas ayuda</p>
            </div>
          `}
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;flex-wrap:wrap;">
          ${!exito ? `
            <button class="btn-reintentar-celebracion topbar-btn ghost" style="min-width:120px;min-height:48px;">
              🔄 Intentar de nuevo
            </button>
          ` : ''}
          <button class="btn-continuar-celebracion topbar-btn primary" style="min-width:150px;min-height:48px;" autofocus>
            ${exito ? '🚀 Siguiente' : 'Entendido'}
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // ✅ Configurar listeners
    const btnContinuar = modal.querySelector('.btn-continuar-celebracion');
    const btnReintentar = modal.querySelector('.btn-reintentar-celebracion');
    
    const cerrarYActualizar = () => {
      this.cerrarModalCelebracion(modal, onKeydown);
      this.renderTareas();
      this.actualizarEstadisticasHeader();
    };
    
    if (btnContinuar) {
      btnContinuar.addEventListener('click', cerrarYActualizar);
    }
    
    if (btnReintentar && !exito) {
      btnReintentar.style.display = 'flex';
      btnReintentar.addEventListener('click', () => {
        cerrarYActualizar();
        this.iniciarTarea(tarea.id);
      });
    }
    
    // Enfocar botón principal
    setTimeout(() => btnContinuar?.focus(), 100);
    
    // Efecto de confetti
    if (TAREAS_CONFIG.CELEBRACION_CONFETTI && exito) {
      this.activarConfetti();
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR MODAL DE CELEBRACIÓN
  // ─────────────────────────────────────────────────────────────
  cerrarModalCelebracion: function(modal, onKeydownCallback) {
    if (modal) {
      modal.classList.remove('active');
      if (modal.tagName === 'DIALOG' && typeof modal.close === 'function') {
        modal.close();
      }
      if (modal.id.includes('dinamico')) {
        setTimeout(() => modal.remove(), 200);
      }
    }
    if (onKeydownCallback) {
      document.removeEventListener('keydown', onKeydownCallback);
    }
    document.body.style.overflow = '';
    console.log('🎉 Modal de celebración cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR CELEBRACIÓN Y ACTUALIZAR UI
  // ─────────────────────────────────────────────────────────────
  cerrarCelebracion: function(tareaId) {
    // Refrescar vista para mostrar estado actualizado
    this.renderTareas();
    this.actualizarEstadisticasHeader();
    
    // Feedback auditivo
    this.reproducirSonido('audio/modal-close.mp3');
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR ESTADÍSTICAS DEL HEADER
  // ─────────────────────────────────────────────────────────────
  actualizarEstadisticasHeader: function() {
    const tareas = this.tareas[this.estado.categoriaActual] || [];
    const completadas = tareas.filter(t => t.completada).length;
    const total = tareas.length;
    
    // Actualizar contador en UI si existe
    const contadorEl = document.getElementById('tareas-completadas');
    if (contadorEl) {
      contadorEl.textContent = completadas;
    }
    
    // Anunciar cambio a lectores de pantalla
    const anuncio = document.createElement('div');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('style', 'position:absolute;left:-9999px;');
    anuncio.textContent = `${completadas} de ${total} tareas completadas en ${this.getNombreCategoria(this.estado.categoriaActual)}`;
    document.body.appendChild(anuncio);
    setTimeout(() => anuncio.remove(), 1000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // ANUNCIAR CAMBIO DE CATEGORÍA (ACCESIBILIDAD)
  // ─────────────────────────────────────────────────────────────
  anunciarCambioCategoria: function() {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('role', 'status');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('style', 'position:absolute;left:-9999px;');
    anuncio.textContent = `Mostrando tareas de ${this.getNombreCategoria(this.estado.categoriaActual)}`;
    document.body.appendChild(anuncio);
    setTimeout(() => anuncio.remove(), 1000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR CONTROLES PARENTALES
  // ─────────────────────────────────────────────────────────────
  verificarControlesParentales: function() {
    // Verificar tiempo máximo diario
    const hoy = new Date().toDateString();
    const ultimoUso = localStorage.getItem('aprende_jugando_ultimo_uso');
    const tiempoHoy = parseInt(localStorage.getItem('aprende_jugando_tiempo_hoy') || '0');
    
    if (ultimoUso === hoy && tiempoHoy >= this.estado.parentalControls.tiempoMaximoDiario * 60) {
      // Tiempo máximo alcanzado
      window.app?.mostrarToast('⏰ Tiempo de juego alcanzado por hoy', 'warning');
      // Podría deshabilitar botones de jugar aquí
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // REPRODUCIR SONIDO (CORREGIDO - CON FALLBACK WEB SPEECH)
  // ─────────────────────────────────────────────────────────────
  reproducirSonido: function(rutaAudio) {
    // Verificar preferencias del usuario
    if (!this.estado.sonidosActivos) return;
    
    // Intentar reproducir archivo de audio
    try {
      const audio = new Audio(rutaAudio);
      audio.volume = 0.4;
      
      // Reproducir solo después de interacción del usuario
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Fallback: si no hay archivo o está bloqueado, usar Web Speech
          console.log('🔊 Fallback a Web Speech para:', rutaAudio);
          this.reproducirConVoz(rutaAudio);
        });
      }
    } catch (error) {
      console.warn('⚠️ Error con archivo de audio, usando voz:', error);
      this.reproducirConVoz(rutaAudio);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // REPRODUCIR CON VOZ (WEB SPEECH API - SIN ARCHIVOS)
  // ─────────────────────────────────────────────────────────────
  reproducirConVoz: function(rutaAudio) {
    if (!this.estado.sonidosActivos) return;
    if (!('speechSynthesis' in window)) return;
    
    // Mapear rutas de audio a frases en español
    const frasesPorAudio = {
      'audio/exito.mp3': '¡Excelente trabajo!',
      'audio/exito-conteo.mp3': '¡Muy bien contado!',
      'audio/exito-letra.mp3': '¡Perfecta letra!',
      'audio/exito-numeros.mp3': '¡Números perfectos!',
      'audio/exito-matematicas.mp3': '¡Genial en matemáticas!',
      'audio/exito-colorear.mp3': '¡Qué bonito coloreaste!',
      'audio/exito-logica.mp3': '¡Muy lógico!',
      'audio/exito-memoria.mp3': '¡Excelente memoria!',
      'audio/error-suave.mp3': 'Casi lo logras, intenta de nuevo',
      'audio/error.mp3': 'No te rindas, sigue practicando',
      'audio/hint.mp3': 'Aquí tienes una pista',
      'audio/click-categoria.mp3': '', // Sin voz para clicks UI
      'audio/modal-close.mp3': '' // Sin voz para cerrar modal
    };
    
    const frase = frasesPorAudio[rutaAudio];
    if (!frase) return; // Sin voz para este audio
    
    // Cancelar cualquier audio previo
    window.speechSynthesis.cancel();
    
    // Crear utterance
    const utterance = new SpeechSynthesisUtterance(frase);
    utterance.lang = 'es-MX';
    utterance.rate = 0.9; // Ligeramente más lento para niños
    utterance.pitch = 1.1; // Un poco más agudo, más amigable
    utterance.volume = 1;
    
    // Seleccionar voz en español de México si está disponible
    const voces = window.speechSynthesis.getVoices();
    const vozMexico = voces.find(v => 
      v.lang.includes('es-MX') || 
      v.name.includes('Spanish (Mexico)') ||
      v.name.includes('Sabina') ||
      v.name.includes('Raul')
    );
    
    if (vozMexico) {
      utterance.voice = vozMexico;
    }
    
    // Reproducir
    window.speechSynthesis.speak(utterance);
  },
  
  // ─────────────────────────────────────────────────────────────
  // LEER FEEDBACK DE ÉXITO (PARA JUEGOS)
  // ─────────────────────────────────────────────────────────────
  leerFeedbackExito: function(tarea) {
    if (!this.estado.sonidosActivos) return;
    if (!('speechSynthesis' in window)) return;
    
    const frases = [
      `¡Excelente! Completaste ${tarea.titulo}`,
      `¡Muy bien! Terminaste ${tarea.titulo}`,
      `¡Fantástico! ${tarea.titulo} completada`,
      `¡Increíble! Lo lograste`
    ];
    
    const frase = frases[Math.floor(Math.random() * frases.length)];
    this.reproducirTexto(frase);
  },
  
  // ─────────────────────────────────────────────────────────────
  // LEER FEEDBACK DE ÁNIMO (CUANDO FALLA)
  // ─────────────────────────────────────────────────────────────
  leerFeedbackAnimo: function() {
    if (!this.estado.sonidosActivos) return;
    if (!('speechSynthesis' in window)) return;
    
    const frases = [
      'Casi lo logras, intenta de nuevo',
      'Tú puedes, sigue practicando',
      'No te rindas, inténtalo otra vez',
      'Muy cerca, vamos por más'
    ];
    
    const frase = frases[Math.floor(Math.random() * frases.length)];
    this.reproducirTexto(frase);
  },
  
  // ─────────────────────────────────────────────────────────────
  // REPRODUCIR TEXTO GENÉRICO (HELPER - AGREGAR ESTA FUNCIÓN)
  // ─────────────────────────────────────────────────────────────
  reproducirTexto: function(texto) {
    if (!this.estado.sonidosActivos) return false;
    if (!('speechSynthesis' in window)) return false;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-MX';
    utterance.rate = 0.85;  // ← MÁS LENTO para niños
    utterance.pitch = 1.1;
    utterance.volume = 1;
    
    // Seleccionar voz en español
    const voces = window.speechSynthesis.getVoices();
    const vozEspanol = voces.find(v => 
      v.lang.includes('es-MX') || 
      v.lang.includes('es-ES') ||
      v.name.toLowerCase().includes('spanish') ||
      v.name.toLowerCase().includes('español')
    );
    
    if (vozEspanol) utterance.voice = vozEspanol;
    
    utterance.onstart = () => console.log('🗣️ Leyendo:', texto.substring(0, 30) + '...');
    utterance.onend = () => console.log('✅ Lectura completada');
    
    window.speechSynthesis.speak(utterance);
    return true;
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SONIDOS (ACTUALIZADO)
  // ─────────────────────────────────────────────────────────────
  toggleSonidos: function() {
    this.estado.sonidosActivos = !this.estado.sonidosActivos;
    localStorage.setItem(TAREAS_CONFIG.SOUND_ENABLED_KEY, JSON.stringify(this.estado.sonidosActivos));
    
    const mensaje = this.estado.sonidosActivos 
      ? '🔊 Sonidos y voz activados' 
      : '🔇 Sonidos y voz desactivados';
    
    window.app?.mostrarToast(mensaje, 'info');
    
    // Si se activan, probar con un sonido de test
    if (this.estado.sonidosActivos) {
      setTimeout(() => {
        this.reproducirTexto('Sonidos activados');
      }, 300);
    }
    
    this.registrarEvento('sonidos_toggle', { activado: this.estado.sonidosActivos });
  },

  
  // ─────────────────────────────────────────────────────────────
  // REGISTRAR EVENTO PARA ANALYTICS (PLACEHOLDER)
  // ─────────────────────────────────────────────────────────────
  registrarEvento: function(nombreEvento, datos) {
    // Placeholder para integración con Google Analytics, Firebase Analytics, etc.
    console.log(`📊 Analytics: ${nombreEvento}`, datos);
    
    // Ejemplo de implementación real:
    // if (window.gtag) {
    //   window.gtag('event', nombreEvento, { ...datos });
    // }
  },
  
  // ─────────────────────────────────────────────────────────────
  // OBTENER TAREA POR ID (HELPER)
  // ─────────────────────────────────────────────────────────────
  obtenerTareaPorId: function(tareaId) {
    for (const categoria of Object.values(this.tareas)) {
      const tarea = categoria.find(t => t.id === tareaId);
      if (tarea) return tarea;
    }
    return null;
  },
  
  // ─────────────────────────────────────────────────────────────
  // UTILIDADES DE ICONOS Y NOMBRES
  // ─────────────────────────────────────────────────────────────
  getIconoCategoria: function(cat) {
    const iconos = {
      trazo: '✏️',
      conteo: '🔢',
      colorear: '🎨',
      patrones: '🧩',
      memoria: '🧠',
      abecedario: '🔤',
      sumas: '➕',
      lectura: '📖'
    };
    return iconos[cat] || '⭐';
  },
  
  getNombreCategoria: function(cat) {
    const nombres = {
      trazo: 'Trazo',
      conteo: 'Conteo',
      colorear: 'Colorear',
      patrones: 'Patrones',
      memoria: 'Memoria',
      abecedario: 'Abecedario',
      sumas: 'Sumas',
      lectura: 'Lectura'
    };
    return nombres[cat] || cat;
  },
  
  // ─────────────────────────────────────────────────────────────
  // GENERAR HTML DE CONFETTI (EFECTO DE CELEBRACIÓN)
  // ─────────────────────────────────────────────────────────────
  generarConfettiHTML: function() {
    if (!TAREAS_CONFIG.CELEBRACION_CONFETTI) return '';
    
    const colores = ['#FF6B9D', '#4ECDC4', '#FFE66D', '#C780E8', '#95E1D3'];
    const confettis = Array.from({ length: 20 }, (_, i) => {
      const color = colores[i % colores.length];
      const left = Math.random() * 100;
      const delay = Math.random() * 0.5;
      const duration = 2 + Math.random() * 2;
      
      return `<span style="position:absolute;width:8px;height:8px;background:${color};border-radius:50%;left:${left}%;top:-10px;animation:confetti ${duration}s ease-in ${delay}s infinite;" aria-hidden="true"></span>`;
    }).join('');
    
    return `
      <style>
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
      </style>
      <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;" aria-hidden="true">
        ${confettis}
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTIVAR CONFETTI (ANIMACIÓN DINÁMICA)
  // ─────────────────────────────────────────────────────────────
  activarConfetti: function() {
    if (!TAREAS_CONFIG.CELEBRACION_CONFETTI) return;
    
    // Crear contenedor de confetti
    const contenedor = document.createElement('div');
    contenedor.style.cssText = `
      position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;
    `;
    document.body.appendChild(contenedor);
    
    // Generar piezas de confetti
    const colores = ['#FF6B9D', '#4ECDC4', '#FFE66D', '#C780E8', '#95E1D3'];
    
    for (let i = 0; i < 50; i++) {
      const pieza = document.createElement('div');
      pieza.style.cssText = `
        position:absolute;
        width:${6 + Math.random() * 8}px;
        height:${6 + Math.random() * 8}px;
        background:${colores[Math.floor(Math.random() * colores.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '4px'};
        left:${Math.random() * 100}%;
        top:-20px;
        animation:confetti-fall ${2 + Math.random() * 3}s ease-in ${Math.random() * 0.5}s forwards;
        opacity:0.9;
      `;
      contenedor.appendChild(pieza);
    }
    
    // Agregar keyframes dinámicos
    if (!document.getElementById('confetti-keyframes')) {
      const style = document.createElement('style');
      style.id = 'confetti-keyframes';
      style.textContent = `
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(${360 + Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Limpiar después de la animación
    setTimeout(() => contenedor.remove(), 5000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE TRAZO (CORREGIDO v3.0)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoTrazo: function(tarea) {
    console.log('✏️ Iniciando juego de trazo:', tarea.titulo, tarea.id);
    
    // Validar datos mínimos
    if (!tarea.instruccionesDetalladas && !tarea.descripcion) {
      console.error('❌ Juego de trazo sin datos válidos:', tarea.id);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      this.simularCompletado(tarea);
      return;
    }
    
    // Crear contenedor de juego
    const juegoContainer = document.createElement('div');
    juegoContainer.className = 'modal active';
    juegoContainer.id = 'modal-juego-trazo-' + tarea.id;  // ← ID único por tarea
    juegoContainer.setAttribute('role', 'dialog');
    juegoContainer.setAttribute('aria-modal', 'true');
    
    // ✅ Click en overlay para cerrar
    juegoContainer.addEventListener('click', (e) => {
      if (e.target === juegoContainer) {
        this.cerrarJuegoTrazo(juegoContainer);
      }
    });
    
    // ✅ Cerrar con Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarJuegoTrazo(juegoContainer);
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // ✅ Determinar qué trazar (MEJORADO)
    const tipoTrazo = this.determinarTipoTrazo(tarea);
    
    console.log('🔤 Tipo de trazo detectado:', tipoTrazo);
    
    juegoContainer.innerHTML = `
      <style>
        #canvas-trazo-${tarea.id} {
          border: 3px dashed var(--border);
          border-radius: var(--radius-lg);
          background: var(--surface);
          cursor: crosshair;
          touch-action: none;
        }
        #canvas-trazo-${tarea.id}.dibujando {
          border-color: var(--primary);
        }
        #canvas-trazo-${tarea.id}.completado {
          border-color: var(--success);
          border-style: solid;
        }
        .trazo-guia {
          position: absolute;
          pointer-events: none;
          opacity: 0.3;
          font-size: 200px;
          font-weight: 800;
          color: var(--primary);
          font-family: 'Nunito', 'Quicksand', sans-serif;
          user-select: none;
        }
        @keyframes pulse-success {
          0%, 100% { box-shadow: 0 0 0 0 rgba(149, 225, 211, 0.7); }
          50% { box-shadow: 0 0 0 12px rgba(149, 225, 211, 0); }
        }
      </style>
      
      <div class="modal-content" style="max-width:650px;" role="document">
        <div class="modal-header">
          <h2 id="juego-trazo-title" class="modal-title" style="font-size:18px;">
            ✏️ ${tarea.titulo}
          </h2>
          <button class="modal-close" aria-label="Cerrar actividad" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:16px;">
            ${tarea.instruccionesDetalladas || tarea.descripcion}
          </p>
          
          <div style="position:relative;display:inline-block;margin-bottom:16px;">
            <canvas id="canvas-trazo-${tarea.id}" 
                    width="400" 
                    height="400"
                    aria-label="Área de trazo"
                    role="img">
            </canvas>
            <div id="trazo-guia-${tarea.id}" 
                 class="trazo-guia" 
                 style="top:50%;left:50%;transform:translate(-50%, -50%);"
                 aria-hidden="true">
              ${tipoTrazo.caracter}
            </div>
          </div>
          
          <div style="display:flex;justify-content:center;gap:12px;margin-bottom:16px;">
            <button id="btn-limpiar-trazo-${tarea.id}" class="topbar-btn ghost" style="min-height:44px;">
              🗑️ Limpiar
            </button>
            <button id="btn-ayuda-trazo-${tarea.id}" class="topbar-btn ghost" style="min-height:44px;">
              💡 Mostrar guía
            </button>
          </div>
          
          <!-- Feedback -->
          <div id="trazo-feedback-${tarea.id}" 
               style="min-height:24px;font-weight:600;" 
               aria-live="polite"
               aria-atomic="true"></div>
          
          <!-- Barra de progreso de completado -->
          <div style="margin-top:16px;">
            <div style="font-size:13px;color:var(--ink3);margin-bottom:8px;">Progreso del trazo:</div>
            <div style="background:var(--bg2);border-radius:10px;height:12px;overflow:hidden;">
              <div id="trazo-progress-bar-${tarea.id}" 
                   style="background:linear-gradient(90deg,var(--primary),var(--secondary));
                          width:0%;height:100%;transition:width 0.3s ease;"></div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer" style="justify-content:center;gap:12px;">
          <button id="btn-salir-trazo-${tarea.id}" class="topbar-btn ghost" style="min-width:120px;min-height:48px;">
            ❌ Salir
          </button>
          <button id="btn-terminar-trazo-${tarea.id}" 
                  class="topbar-btn primary" 
                  style="min-width:150px;min-height:48px;" 
                  disabled>
            ✅ ¡Terminé!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(juegoContainer);

    if (typeof this.desbloquearAudio === 'function') {
      this.desbloquearAudio();
    }
    document.body.style.overflow = 'hidden';
    
    // ✅ Configurar listeners para botones de cerrar (DESPUÉS de innerHTML)
    const btnCerrarHeader = juegoContainer.querySelector('.modal-close');
    const btnSalirFooter = document.getElementById(`btn-salir-trazo-${tarea.id}`);
    
    const cerrarYLimpiar = () => this.cerrarJuegoTrazo(juegoContainer, onKeydown);
    
    if (btnCerrarHeader) btnCerrarHeader.addEventListener('click', cerrarYLimpiar);
    if (btnSalirFooter) btnSalirFooter.addEventListener('click', cerrarYLimpiar);
    
    // ✅ Inicializar canvas (CON ID ÚNICO)
    const canvas = document.getElementById(`canvas-trazo-${tarea.id}`);
    const ctx = canvas.getContext('2d');
    const guia = document.getElementById(`trazo-guia-${tarea.id}`);
    const feedback = document.getElementById(`trazo-feedback-${tarea.id}`);
    const progressBar = document.getElementById(`trazo-progress-bar-${tarea.id}`);
    const btnTerminar = document.getElementById(`btn-terminar-trazo-${tarea.id}`);
    const btnLimpiar = document.getElementById(`btn-limpiar-trazo-${tarea.id}`);
    const btnAyuda = document.getElementById(`btn-ayuda-trazo-${tarea.id}`);
    
    // Verificar que todos los elementos existen
    if (!canvas || !ctx) {
      console.error('❌ No se pudo inicializar el canvas');
      return;
    }
    
    // Configurar contexto del canvas
    ctx.strokeStyle = tipoTrazo.color;
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // ✅ Estado del trazo (ÚNICO por instancia)
    const estadoTrazo = {
      dibujando: false,
      puntos: [],
      completado: false,
      canvas: canvas,
      ctx: ctx,
      tareaId: tarea.id
    };
    
    // ✅ Funciones de dibujo (CON CIERRE CORRECTO)
    function getPosicion(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    
    function iniciarTrazo(e) {
      estadoTrazo.dibujando = true;
      const pos = getPosicion(e);
      estadoTrazo.puntos.push(pos);
      
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      
      canvas.classList.add('dibujando');
    }
    
    function dibujarTrazo(e) {
      if (!estadoTrazo.dibujando) return;
      
      const pos = getPosicion(e);
      estadoTrazo.puntos.push(pos);
      
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      
      // Verificar progreso
      verificarProgresoTrazo();
    }
    
    function finalizarTrazo() {
      if (!estadoTrazo.dibujando) return;
      
      estadoTrazo.dibujando = false;
      ctx.closePath();
      canvas.classList.remove('dibujando');
      
      // Verificar si completó suficiente
      verificarCompletadoTrazo();
    }
    
    function verificarProgresoTrazo() {
      // Calcular porcentaje basado en puntos dibujados
      const areaDibujada = estadoTrazo.puntos.length;
      const areaTotal = 500;
      const porcentaje = Math.min(100, Math.round((areaDibujada / areaTotal) * 100));
      
      if (progressBar) {
        progressBar.style.width = `${porcentaje}%`;
      }
      
      // Habilitar botón terminar si hay suficiente trazo
      if (btnTerminar && porcentaje > 30) {
        btnTerminar.disabled = false;
      }
    }
    
    function verificarCompletadoTrazo() {
      const areaDibujada = estadoTrazo.puntos.length;
      
      if (areaDibujada > 400 && !estadoTrazo.completado) {
        estadoTrazo.completado = true;
        
        if (feedback) {
          feedback.textContent = '¡Excelente trazo! 🎉';
          feedback.style.color = 'var(--success)';
        }
        
        canvas.classList.add('completado');
        
        if (btnTerminar) {
          btnTerminar.disabled = false;
          btnTerminar.textContent = '✅ ¡Terminé!';
        }
      }
    }
    
    // ✅ Eventos para mouse
    canvas.addEventListener('mousedown', (e) => iniciarTrazo(e));
    canvas.addEventListener('mousemove', (e) => dibujarTrazo(e));
    canvas.addEventListener('mouseup', finalizarTrazo);
    canvas.addEventListener('mouseleave', finalizarTrazo);
    
    // ✅ Eventos para touch (móvil)
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      iniciarTrazo(e.touches[0]);
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      dibujarTrazo(e.touches[0]);
    }, { passive: false });
    
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      finalizarTrazo();
    });
    
    // ✅ Botón Limpiar
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        estadoTrazo.puntos = [];
        estadoTrazo.completado = false;
        canvas.classList.remove('completado');
        
        if (feedback) feedback.textContent = '';
        if (progressBar) progressBar.style.width = '0%';
        if (btnTerminar) btnTerminar.disabled = true;
      });
    }
    
    // ✅ Botón Ayuda (mostrar/ocultar guía)
    if (btnAyuda) {
      btnAyuda.addEventListener('click', () => {
        if (guia) {
          if (guia.style.opacity === '0' || guia.style.opacity === '0.1') {
            guia.style.opacity = '0.3';
            btnAyuda.textContent = '💡 Ocultar guía';
          } else {
            guia.style.opacity = '0';
            btnAyuda.textContent = '💡 Mostrar guía';
          }
        }
      });
    }
    
    // ✅ Botón Terminar
    if (btnTerminar) {
      btnTerminar.addEventListener('click', () => {
        if (estadoTrazo.puntos.length > 100) {
          this.completarTarea(tarea.id, { 
            exito: true, 
            puntuacion: tarea.recompensa 
          });
          this.cerrarJuegoTrazo(juegoContainer, onKeydown);
        } else {
          if (feedback) {
            feedback.textContent = 'Dibuja un poco más 💪';
            feedback.style.color = 'var(--warning)';
          }
        }
      });
    }
    
    // Mostrar guía inicialmente
    if (guia) {
      guia.style.opacity = '0.3';
    }
    
    // ✅ Guardar estado del juego (ÚNICO por instancia)
    this.estado.juegoTrazo = {
      modal: juegoContainer,
      tareaId: tarea.id,
      estado: estadoTrazo
    };
    
    // Analytics
    this.registrarEvento('juego_trazo_iniciado', {
      tareaId: tarea.id,
      tipo: tipoTrazo.tipo
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: DETERMINAR TIPO DE TRAZO (MEJORADO)
  // ─────────────────────────────────────────────────────────────
  determinarTipoTrazo: function(tarea) {
    const titulo = tarea.titulo.toLowerCase();
    const descripcion = tarea.descripcion ? tarea.descripcion.toLowerCase() : '';
    const textoCompleto = titulo + ' ' + descripcion;
    
    console.log('🔍 Detectando tipo de trazo para:', tarea.titulo);
    
    // ✅ Detectar por ID primero (más confiable)
    if (tarea.id) {
      if (tarea.id.includes('t1') || tarea.id === 't1') {
        return { caracter: 'A', color: '#FF6B9D', tipo: 'letra' };
      } else if (tarea.id.includes('t2') || tarea.id === 't2') {
        return { caracter: 'B', color: '#4ECDC4', tipo: 'letra' };
      } else if (tarea.id.includes('t3') || tarea.id === 't3') {
        return { caracter: '1', color: '#FFE66D', tipo: 'numero' };
      }
    }
    
    // ✅ Detectar por título/descripción
    if (textoCompleto.includes('a') && !textoCompleto.includes('b')) {
      return { caracter: 'A', color: '#FF6B9D', tipo: 'letra' };
    } else if (textoCompleto.includes('b')) {
      return { caracter: 'B', color: '#4ECDC4', tipo: 'letra' };
    } else if (textoCompleto.includes('1') || textoCompleto.includes('número') || textoCompleto.includes('numero')) {
      return { caracter: '1', color: '#FFE66D', tipo: 'numero' };
    } else if (textoCompleto.includes('círculo') || textoCompleto.includes('circulo') || textoCompleto.includes('o')) {
      return { caracter: '○', color: '#95E1D3', tipo: 'forma' };
    } else if (textoCompleto.includes('2')) {
      return { caracter: '2', color: '#C780E8', tipo: 'numero' };
    } else if (textoCompleto.includes('3')) {
      return { caracter: '3', color: '#F38181', tipo: 'numero' };
    }
    
    // ✅ Default: mostrar título de la tarea
    return { caracter: '✏️', color: '#FF6B9D', tipo: 'general' };
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR JUEGO DE TRAZO
  // ─────────────────────────────────────────────────────────────
  cerrarJuegoTrazo: function(modal, onKeydownCallback) {
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (modal.parentNode) modal.remove();
      }, 200);
    }
    if (onKeydownCallback) {
      document.removeEventListener('keydown', onKeydownCallback);
    }
    document.body.style.overflow = '';
    console.log('✏️ Juego de trazo cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE CONTEO (IMPLEMENTACIÓN REAL)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoConteo: function(tarea) {
    console.log('🔢 Iniciando juego de conteo:', tarea.titulo);
    
    // Validar que la tarea tenga los datos necesarios
    if (!tarea.elementos || !tarea.opciones || tarea.respuestaCorrecta === undefined) {
      console.error('❌ Tarea de conteo sin datos válidos:', tarea.id);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      this.simularCompletado(tarea);
      return;
    }
    
    // Crear contenedor de juego
    const juegoContainer = document.createElement('div');
    juegoContainer.className = 'modal active';
    juegoContainer.id = 'modal-juego-conteo';
    juegoContainer.setAttribute('role', 'dialog');
    juegoContainer.setAttribute('aria-modal', 'true');
    juegoContainer.setAttribute('aria-labelledby', 'juego-conteo-title');
    
    // Generar elementos visuales (emojis para demo)
    const elementosVisuales = tarea.elementos.map((emoji, i) => `
      <span style="font-size:48px;margin:4px;animation:bounce 0.5s ease ${i * 0.1}s infinite;" 
            aria-hidden="true">${emoji}</span>
    `).join('');
    
    // Generar botones de opciones
    const opcionesHTML = tarea.opciones.map(opcion => `
      <button class="opcion-btn" 
              data-respuesta="${opcion}"
              style="min-width:60px;min-height:60px;font-size:24px;font-weight:700;
                     background:var(--surface);border:2px solid var(--border);
                     border-radius:var(--radius-sm);cursor:pointer;
                     transition:all 0.2s ease;"
              onmouseover="this.style.borderColor='var(--primary)';this.style.transform='scale(1.05)'"
              onmouseout="this.style.borderColor='var(--border)';this.style.transform='scale(1)'">
        ${opcion}
      </button>
    `).join('');
    
    juegoContainer.innerHTML = `
      <style>
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-success {
          0%, 100% { box-shadow: 0 0 0 0 rgba(149, 225, 211, 0.7); }
          50% { box-shadow: 0 0 0 12px rgba(149, 225, 211, 0); }
        }
        @keyframes pulse-error {
          0%, 100% { box-shadow: 0 0 0 0 rgba(243, 129, 129, 0.7); }
          50% { box-shadow: 0 0 0 12px rgba(243, 129, 129, 0); }
        }
        .opcion-btn.correcta {
          background: var(--success) !important;
          border-color: var(--success-dark) !important;
          color: white !important;
          animation: pulse-success 1s ease;
        }
        .opcion-btn.incorrecta {
          background: var(--warning) !important;
          border-color: var(--warning-dark) !important;
          color: white !important;
          animation: pulse-error 1s ease;
        }
      </style>
      
      <div class="modal-content" style="max-width:500px;" role="document">
        <div class="modal-header">
          <h2 id="juego-conteo-title" class="modal-title" style="font-size:18px;">
            🔢 ${tarea.titulo}
          </h2>
          <button class="modal-close" onclick="features.tareas.cerrarJuegoActivo()" 
                  aria-label="Cerrar actividad" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">
            ${tarea.descripcion}
          </p>
          
          <!-- Área de elementos para contar -->
          <div id="conteo-elementos" 
               style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;
                      padding:20px;background:var(--bg2);border-radius:var(--radius-sm);
                      margin-bottom:24px;min-height:80px;"
               aria-label="Elementos para contar">
            ${elementosVisuales}
          </div>
          
          <!-- Pregunta -->
          <p style="font-size:18px;font-weight:700;color:var(--ink);margin-bottom:16px;">
            ¿Cuántos hay? 👇
          </p>
          
          <!-- Opciones de respuesta -->
          <div id="conteo-opciones" 
               style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;"
               role="radiogroup"
               aria-label="Selecciona tu respuesta">
            ${opcionesHTML}
          </div>
          
          <!-- Feedback -->
          <div id="conteo-feedback" 
               style="min-height:24px;font-weight:600;" 
               aria-live="polite"
               aria-atomic="true"></div>
          
          <!-- Pista -->
          ${tarea.hint ? `
            <button id="btn-hint-conteo" 
                    class="topbar-btn ghost" 
                    onclick="features.tareas.mostrarHintConteo()"
                    style="margin-top:12px;min-height:44px;"
                    aria-label="Obtener pista">
              💡 ¿Necesitas ayuda?
            </button>
          ` : ''}
        </div>
        
        <div class="modal-footer" style="justify-content:center;gap:12px;">
          <button onclick="features.tareas.cerrarJuegoActivo()" 
                  class="topbar-btn ghost"
                  style="min-width:120px;min-height:48px;">
            ❌ Salir
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(juegoContainer);

    setTimeout(() => {
      if (this.estado.sonidosActivos) {
        this.leerTextoEnVozAlta(tarea.descripcion);
      }
    }, 500);
    
    // Configurar eventos de las opciones
    const opciones = juegoContainer.querySelectorAll('.opcion-btn');
    opciones.forEach(btn => {
      btn.addEventListener('click', () => {
        this.verificarRespuestaConteo(btn, tarea);
      });
      
      // Accesibilidad: Enter/Space para seleccionar
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.verificarRespuestaConteo(btn, tarea);
        }
      });
      
      // Accesibilidad: role y tabindex
      btn.setAttribute('role', 'radio');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-label', `Opción ${btn.dataset.respuesta}`);
    });
    
    // Enfocar primera opción para accesibilidad
    setTimeout(() => {
      opciones[0]?.focus();
    }, 100);
    
    // Guardar referencia para cerrar desde fuera
    this.estado.juegoActivo = {
      modal: juegoContainer,
      tipo: 'conteo',
      tareaId: tarea.id,
      intentos: 0
    };
    
    // Analytics
    this.registrarEvento('juego_conteo_iniciado', { 
      tareaId: tarea.id,
      elementos: tarea.elementos.length,
      opciones: tarea.opciones.length
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE COLOREAR (IMPLEMENTACIÓN REAL COMPLETA)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoColorear: function(tarea) {
    console.log('🎨 Iniciando juego de colorear:', tarea.titulo);
    
    // Validar datos mínimos
    if (!tarea.palette || !tarea.colorCorrecto) {
      console.error('❌ Juego de colorear sin datos válidos:', tarea.id);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      this.simularCompletado(tarea);
      return;
    }
    
    // Crear contenedor de juego
    const juegoContainer = document.createElement('div');
    juegoContainer.className = 'modal active';
    juegoContainer.id = 'modal-juego-colorear';
    juegoContainer.setAttribute('role', 'dialog');
    juegoContainer.setAttribute('aria-modal', 'true');
    
    // ✅ Click en overlay para cerrar
    juegoContainer.addEventListener('click', (e) => {
      if (e.target === juegoContainer) {
        this.cerrarJuegoColorear(juegoContainer);
      }
    });
    
    // ✅ Cerrar con Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarJuegoColorear(juegoContainer);
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // Generar botones de la paleta de colores
    const paletteHTML = tarea.palette.map(color => `
      <button class="btn-color-palette" 
              data-color="${color}"
              style="width:50px;height:50px;background:${color};
                     border:3px solid transparent;border-radius:50%;
                     cursor:pointer;transition:all 0.2s;
                     box-shadow:0 2px 8px rgba(0,0,0,0.2);"
              aria-label="Seleccionar color ${color}">
      </button>
    `).join('');
    
    juegoContainer.innerHTML = `
      <style>
        #canvas-colorear {
          border: 3px solid var(--border);
          border-radius: var(--radius-lg);
          background: white;
          cursor: crosshair;
          touch-action: none;
        }
        #canvas-colorear.dibujando {
          border-color: var(--primary);
        }
        .btn-color-palette.selected {
          border-color: var(--ink) !important;
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .btn-color-palette:hover {
          transform: scale(1.1);
        }
      </style>
      
      <div class="modal-content" style="max-width:650px;" role="document">
        <div class="modal-header">
          <h2 id="juego-colorear-title" class="modal-title" style="font-size:18px;">
            🎨 ${tarea.titulo}
          </h2>
          <button class="modal-close" aria-label="Cerrar actividad" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:16px;">
            ${tarea.descripcion}
          </p>
          
          <!-- Área de dibujo -->
          <div style="position:relative;display:inline-block;margin-bottom:16px;">
            <canvas id="canvas-colorear" 
                    width="400" 
                    height="400"
                    aria-label="Área para colorear"
                    role="img">
            </canvas>
            <!-- Imagen de guía superpuesta (opcional) -->
            <div id="colorear-guia" style="position:absolute;top:0;left:0;pointer-events:none;
                   opacity:0.2;font-size:200px;display:flex;align-items:center;justify-content:center;
                   width:400px;height:400px;color:var(--ink);" aria-hidden="true">
              ☀️
            </div>
          </div>
          
          <!-- Paleta de colores -->
          <div style="margin-bottom:16px;">
            <p style="font-size:14px;color:var(--ink3);margin-bottom:8px;">Selecciona un color:</p>
            <div id="palette-container" 
                 style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
              ${paletteHTML}
            </div>
          </div>
          
          <!-- Herramientas -->
          <div style="display:flex;justify-content:center;gap:12px;margin-bottom:16px;">
            <button id="btn-limpiar-colorear" class="topbar-btn ghost" style="min-height:44px;">
              🗑️ Limpiar
            </button>
            <button id="btn-guia-colorear" class="topbar-btn ghost" style="min-height:44px;">
              👁️ Mostrar guía
            </button>
          </div>
          
          <!-- Feedback -->
          <div id="colorear-feedback" 
               style="min-height:24px;font-weight:600;" 
               aria-live="polite"
               aria-atomic="true"></div>
          
          <!-- Barra de progreso -->
          <div style="margin-top:16px;">
            <div style="font-size:13px;color:var(--ink3);margin-bottom:8px;">Progreso:</div>
            <div style="background:var(--bg2);border-radius:10px;height:12px;overflow:hidden;">
              <div id="colorear-progress-bar" 
                   style="background:linear-gradient(90deg,var(--primary),var(--secondary));
                          width:0%;height:100%;transition:width 0.3s ease;"></div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer" style="justify-content:center;gap:12px;">
          <button class="btn-salir-colorear topbar-btn ghost" style="min-width:120px;min-height:48px;">
            ❌ Salir
          </button>
          <button id="btn-terminar-colorear" 
                  class="topbar-btn primary" 
                  style="min-width:150px;min-height:48px;" 
                  disabled>
            ✅ ¡Terminé!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(juegoContainer);
    document.body.style.overflow = 'hidden';
    
    // ✅ Configurar listeners para botones de cerrar
    const btnCerrarHeader = juegoContainer.querySelector('.modal-close');
    const btnSalirFooter = juegoContainer.querySelector('.btn-salir-colorear');
    
    const cerrarYLimpiar = () => this.cerrarJuegoColorear(juegoContainer, onKeydown);
    
    if (btnCerrarHeader) btnCerrarHeader.addEventListener('click', cerrarYLimpiar);
    if (btnSalirFooter) btnSalirFooter.addEventListener('click', cerrarYLimpiar);
    
    // Inicializar canvas
    const canvas = document.getElementById('canvas-colorear');
    const ctx = canvas.getContext('2d');
    const guia = document.getElementById('colorear-guia');
    const feedback = document.getElementById('colorear-feedback');
    const progressBar = document.getElementById('colorear-progress-bar');
    const btnTerminar = document.getElementById('btn-terminar-colorear');
    const btnLimpiar = document.getElementById('btn-limpiar-colorear');
    const btnGuia = document.getElementById('btn-guia-colorear');
    
    // Estado del juego
    const estadoColorear = {
      colorActual: tarea.palette[0],
      dibujando: false,
      areasPintadas: 0,
      canvas: canvas,
      ctx: ctx
    };
    
    // Configurar contexto del canvas
    ctx.fillStyle = estadoColorear.colorActual;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 20;
    
    // ✅ Configurar paleta de colores
    const botonesColor = juegoContainer.querySelectorAll('.btn-color-palette');
    botonesColor.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover selección previa
        botonesColor.forEach(b => b.classList.remove('selected'));
        // Seleccionar nuevo color
        btn.classList.add('selected');
        estadoColorear.colorActual = btn.dataset.color;
        ctx.fillStyle = estadoColorear.colorActual;
        
        // Sonido de selección (opcional)
        // this.reproducirSonido('audio/click.mp3');
      });
    });
    
    // Seleccionar primer color por defecto
    if (botonesColor.length > 0) {
      botonesColor[0].classList.add('selected');
    }
    
    // ✅ Eventos para mouse
    canvas.addEventListener('mousedown', (e) => iniciarColorear(e));
    canvas.addEventListener('mousemove', (e) => colorear(e));
    canvas.addEventListener('mouseup', finalizarColorear);
    canvas.addEventListener('mouseleave', finalizarColorear);
    
    // ✅ Eventos para touch (móvil)
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      iniciarColorear(e.touches[0]);
    }, { passive: false });
    
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      colorear(e.touches[0]);
    }, { passive: false });
    
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      finalizarColorear();
    });
    
    // Funciones de dibujo
    function getPosicion(e) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
    
    function iniciarColorear(e) {
      estadoColorear.dibujando = true;
      const pos = getPosicion(e);
      
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      
      canvas.classList.add('dibujando');
    }
    
    function colorear(e) {
      if (!estadoColorear.dibujando) return;
      
      const pos = getPosicion(e);
      estadoColorear.areasPintadas++;
      
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      
      // Verificar progreso
      verificarProgresoColorear();
    }
    
    function finalizarColorear() {
      if (!estadoColorear.dibujando) return;
      
      estadoColorear.dibujando = false;
      ctx.closePath();
      canvas.classList.remove('dibujando');
    }
    
    function verificarProgresoColorear() {
      // Calcular porcentaje basado en áreas pintadas
      const areaPintada = estadoColorear.areasPintadas;
      const areaTotal = 800; // Aproximado para un dibujo completo
      const porcentaje = Math.min(100, Math.round((areaPintada / areaTotal) * 100));
      
      if (progressBar) {
        progressBar.style.width = `${porcentaje}%`;
      }
      
      // Habilitar botón terminar si hay suficiente color
      if (btnTerminar && porcentaje > 40) {
        btnTerminar.disabled = false;
      }
    }
    
    // ✅ Botón Limpiar
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        estadoColorear.areasPintadas = 0;
        
        if (feedback) feedback.textContent = '';
        if (progressBar) progressBar.style.width = '0%';
        if (btnTerminar) btnTerminar.disabled = true;
      });
    }
    
    // ✅ Botón Mostrar/Ocultar Guía
    if (btnGuia) {
      btnGuia.addEventListener('click', () => {
        if (guia.style.opacity === '0.2') {
          guia.style.opacity = '0.6';
          btnGuia.textContent = '🙈 Ocultar guía';
        } else {
          guia.style.opacity = '0.2';
          btnGuia.textContent = '👁️ Mostrar guía';
        }
      });
    }
    
    // ✅ Botón Terminar
    if (btnTerminar) {
      btnTerminar.addEventListener('click', () => {
        if (estadoColorear.areasPintadas > 200) {
          // Completar tarea
          this.completarTarea(tarea.id, { 
            exito: true, 
            puntuacion: tarea.recompensa 
          });
          this.cerrarJuegoColorear(juegoContainer, onKeydown);
        } else {
          if (feedback) {
            feedback.textContent = '¡Colorea un poco más! 🎨';
            feedback.style.color = 'var(--warning)';
          }
        }
      });
    }
    
    // Guardar estado del juego
    this.estado.juegoColorear = {
      modal: juegoContainer,
      tareaId: tarea.id,
      estado: estadoColorear
    };
    
    // Analytics
    this.registrarEvento('juego_colorear_iniciado', {
      tareaId: tarea.id,
      coloresDisponibles: tarea.palette.length
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR JUEGO DE COLOREAR
  // ─────────────────────────────────────────────────────────────
  cerrarJuegoColorear: function(modal, onKeydownCallback) {
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        if (modal.parentNode) modal.remove();
      }, 200);
    }
    if (onKeydownCallback) {
      document.removeEventListener('keydown', onKeydownCallback);
    }
    document.body.style.overflow = '';
    console.log('🎨 Juego de colorear cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE PATRONES (IMPLEMENTACIÓN REAL COMPLETA)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoPatrones: function(tarea) {
    console.log('🧩 Iniciando juego de patrones:', tarea.titulo);
    
    // Validar datos mínimos
    if (!tarea.secuencia || !tarea.opciones || tarea.respuestaCorrecta === undefined) {
      console.error('❌ Juego de patrones sin datos válidos:', tarea.id);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      this.simularCompletado(tarea);
      return;
    }
    
    // Crear contenedor de juego
    const juegoContainer = document.createElement('div');
    juegoContainer.className = 'modal active';
    juegoContainer.id = 'modal-juego-patrones';
    juegoContainer.setAttribute('role', 'dialog');
    juegoContainer.setAttribute('aria-modal', 'true');
    juegoContainer.setAttribute('aria-labelledby', 'juego-patrones-title');
    
    // ✅ Click en overlay para cerrar
    juegoContainer.addEventListener('click', (e) => {
      if (e.target === juegoContainer) {
        this.cerrarJuegoPatrones(juegoContainer);
      }
    });
    
    // ✅ Cerrar con Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarJuegoPatrones(juegoContainer);
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // Generar visualización de la secuencia
    const secuenciaHTML = tarea.secuencia.map((item, i) => `
      <span style="font-size:40px;margin:0 4px;animation:popIn 0.3s ease ${i * 0.1}s forwards;opacity:0;"
            aria-hidden="true">${item}</span>
    `).join('');
    
    // Generar botón para el espacio vacío
    const espacioVacio = `<span style="font-size:40px;margin:0 4px;color:var(--ink3);border:2px dashed var(--border);border-radius:8px;padding:4px 12px;min-width:48px;display:inline-flex;align-items:center;justify-content:center;">?</span>`;
    
    // Generar botones de opciones
    const opcionesHTML = tarea.opciones.map(opcion => `
      <button class="opcion-patron-btn" 
              data-respuesta="${opcion}"
              style="min-width:60px;min-height:60px;font-size:32px;font-weight:700;
                     background:var(--surface);border:2px solid var(--border);
                     border-radius:var(--radius-sm);cursor:pointer;
                     transition:all 0.2s ease;"
              aria-label="Opción ${opcion}">
        ${opcion}
      </button>
    `).join('');
    
    juegoContainer.innerHTML = `
      <style>
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse-success {
          0%, 100% { box-shadow: 0 0 0 0 rgba(149, 225, 211, 0.7); }
          50% { box-shadow: 0 0 0 12px rgba(149, 225, 211, 0); }
        }
        @keyframes pulse-error {
          0%, 100% { box-shadow: 0 0 0 0 rgba(243, 129, 129, 0.7); }
          50% { box-shadow: 0 0 0 12px rgba(243, 129, 129, 0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .opcion-patron-btn.correcta {
          background: var(--success) !important;
          border-color: var(--success-dark) !important;
          color: white !important;
          animation: pulse-success 1s ease;
        }
        .opcion-patron-btn.incorrecta {
          background: var(--warning) !important;
          border-color: var(--warning-dark) !important;
          color: white !important;
          animation: pulse-error 1s ease;
        }
        .opcion-patron-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }
      </style>
      
      <div class="modal-content" style="max-width:550px;" role="document">
        <div class="modal-header">
          <h2 id="juego-patrones-title" class="modal-title" style="font-size:18px;">
            🧩 ${tarea.titulo}
          </h2>
          <button class="modal-close" aria-label="Cerrar actividad" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">
            ${tarea.descripcion}
          </p>
          
          <!-- Secuencia visual -->
          <div style="background:var(--bg2);padding:20px;border-radius:var(--radius-lg);margin-bottom:24px;"
               aria-label="Secuencia de patrón">
            <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px;font-size:40px;">
              ${secuenciaHTML}${espacioVacio}
            </div>
          </div>
          
          <p style="font-size:16px;font-weight:600;margin-bottom:16px;color:var(--ink);">
            ¿Qué elemento sigue? 👇
          </p>
          
          <!-- Opciones de respuesta -->
          <div id="patrones-opciones" 
               style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;"
               role="radiogroup"
               aria-label="Selecciona el elemento que continúa el patrón">
            ${opcionesHTML}
          </div>
          
          <!-- Feedback -->
          <div id="patrones-feedback" 
               style="min-height:24px;font-weight:600;" 
               aria-live="polite"
               aria-atomic="true"></div>
          
          <!-- Pista -->
          ${tarea.hint ? `
            <button id="btn-hint-patrones" 
                    class="topbar-btn ghost" 
                    style="margin-top:12px;min-height:44px;"
                    aria-label="Obtener pista">
              💡 ¿Necesitas ayuda?
            </button>
          ` : ''}
        </div>
        
        <div class="modal-footer" style="justify-content:center;">
          <button class="btn-salir-patrones topbar-btn ghost" style="min-width:120px;min-height:48px;">
            ❌ Salir
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(juegoContainer);
    document.body.style.overflow = 'hidden';
    
    // ✅ Configurar listeners para botones de cerrar
    const btnCerrarHeader = juegoContainer.querySelector('.modal-close');
    const btnSalirFooter = juegoContainer.querySelector('.btn-salir-patrones');
    
    const cerrarYLimpiar = () => this.cerrarJuegoPatrones(juegoContainer, onKeydown);
    
    if (btnCerrarHeader) btnCerrarHeader.addEventListener('click', cerrarYLimpiar);
    if (btnSalirFooter) btnSalirFooter.addEventListener('click', cerrarYLimpiar);
    
    // Configurar eventos de las opciones
    const opciones = juegoContainer.querySelectorAll('.opcion-patron-btn');
    opciones.forEach(btn => {
      btn.addEventListener('click', () => {
        this.verificarRespuestaPatron(btn, tarea);
      });
      
      // Accesibilidad: Enter/Space para seleccionar
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.verificarRespuestaPatron(btn, tarea);
        }
      });
      
      // Accesibilidad: role y tabindex
      btn.setAttribute('role', 'radio');
      btn.setAttribute('tabindex', '0');
    });
    
    // Enfocar primera opción para accesibilidad
    setTimeout(() => {
      opciones[0]?.focus();
    }, 100);
    
    // Configurar botón de hint si existe
    const btnHint = juegoContainer.querySelector('#btn-hint-patrones');
    if (btnHint && tarea.hint) {
      btnHint.addEventListener('click', () => {
        this.mostrarHintPatrones(tarea);
      });
    }
    
    // Guardar estado del juego
    this.estado.juegoPatrones = {
      modal: juegoContainer,
      tareaId: tarea.id,
      intentos: 0,
      respondido: false
    };
    
    // Analytics
    this.registrarEvento('juego_patrones_iniciado', {
      tareaId: tarea.id,
      secuenciaLength: tarea.secuencia.length,
      opcionesCount: tarea.opciones.length
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA - PATRONES
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaPatron: function(btnSeleccionado, tarea) {
    // Prevenir múltiples clics
    if (this.estado.juegoPatrones?.respondido) return;
    this.estado.juegoPatrones.respondido = true;
    
    const respuestaUsuario = btnSeleccionado.dataset.respuesta;
    const esCorrecta = respuestaUsuario === tarea.respuestaCorrecta;
    
    const feedback = document.getElementById('patrones-feedback');
    
    if (esCorrecta) {
      // ✅ Respuesta correcta
      btnSeleccionado.classList.add('correcta');
      btnSeleccionado.setAttribute('aria-checked', 'true');
      
      if (feedback) {
        feedback.textContent = '¡Correcto! 🎉 ¡El patrón continúa!';
        feedback.style.color = 'var(--success)';
      }
      
      // Sonido de éxito
      this.reproducirSonido('audio/exito.mp3');
      
      // Deshabilitar otras opciones
      document.querySelectorAll('.opcion-patron-btn').forEach(btn => {
        if (btn !== btnSeleccionado) {
          btn.disabled = true;
          btn.style.opacity = '0.5';
        }
      });
      
      // Analytics
      this.registrarEvento('respuesta_correcta_patron', {
        tareaId: tarea.id,
        intentos: this.estado.juegoPatrones?.intentos || 0
      });
      
      // Completar tarea después de breve delay
      setTimeout(() => {
        this.completarTarea(tarea.id, { 
          exito: true, 
          puntuacion: tarea.recompensa 
        });
        this.cerrarJuegoPatrones(this.estado.juegoPatrones?.modal);
      }, 1500);
      
    } else {
      // ❌ Respuesta incorrecta
      btnSeleccionado.classList.add('incorrecta');
      
      if (feedback) {
        feedback.textContent = 'Casi... observa el patrón de nuevo 💪';
        feedback.style.color = 'var(--warning)';
      }
      
      // Sonido de error suave
      this.reproducirSonido('audio/error.mp3');
      
      // Incrementar intentos
      if (this.estado.juegoPatrones) {
        this.estado.juegoPatrones.intentos = (this.estado.juegoPatrones.intentos || 0) + 1;
      }
      
      // Permitir reintentar después de delay
      setTimeout(() => {
        this.estado.juegoPatrones.respondido = false;
        
        // Remover clases de feedback
        btnSeleccionado.classList.remove('incorrecta');
        if (feedback) feedback.textContent = '';
        
        // Si llegó al máximo de intentos, mostrar respuesta correcta
        if (this.estado.juegoPatrones?.intentos >= TAREAS_CONFIG.MAX_INTENTOS) {
          this.mostrarRespuestaCorrectaPatron(tarea);
        }
      }, 1200);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR RESPUESTA CORRECTA - PATRONES (DESPUÉS DE MÁX. INTENTOS)
  // ─────────────────────────────────────────────────────────────
  mostrarRespuestaCorrectaPatron: function(tarea) {
    const feedback = document.getElementById('patrones-feedback');
    if (feedback) {
      feedback.innerHTML = `
        <span style="color:var(--primary);font-size:16px;">
          La respuesta era: <strong>${tarea.respuestaCorrecta}</strong> ✨<br>
          <small style="color:var(--ink3);">El patrón se repite: ${tarea.secuencia.join(' ')}...</small>
        </span>
      `;
    }
    
    // Deshabilitar todas las opciones
    document.querySelectorAll('.opcion-patron-btn').forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.6';
      
      // Resaltar la correcta
      if (btn.dataset.respuesta === tarea.respuestaCorrecta) {
        btn.classList.add('correcta');
      }
    });
    
    // Botón para continuar
    setTimeout(() => {
      const footer = document.querySelector('#modal-juego-patrones .modal-footer');
      if (footer && !footer.querySelector('.btn-continuar')) {
        const btnContinuar = document.createElement('button');
        btnContinuar.className = 'topbar-btn primary btn-continuar';
        btnContinuar.textContent = '✅ Entendido, continuar';
        btnContinuar.style.minHeight = '48px';
        btnContinuar.style.minWidth = '180px';
        btnContinuar.onclick = () => {
          // Completar con puntuación reducida por intentos
          const puntuacion = Math.max(1, Math.round(tarea.recompensa * 0.5));
          this.completarTarea(tarea.id, { exito: true, puntuacion });
          this.cerrarJuegoPatrones(this.estado.juegoPatrones?.modal);
        };
        footer.appendChild(btnContinuar);
        btnContinuar.focus();
      }
    }, 2000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR HINT - PATRONES
  // ─────────────────────────────────────────────────────────────
  mostrarHintPatrones: function(tarea) {
    if (!tarea.hint) return;
    
    // Limitar hints
    if (this.estado.hintsUsados >= TAREAS_CONFIG.HINTS_DISPONIBLES) {
      window.app?.mostrarToast('💡 Ya usaste todas las pistas', 'info');
      return;
    }
    
    this.estado.hintsUsados++;
    
    // Mostrar hint en el feedback
    const feedback = document.getElementById('patrones-feedback');
    if (feedback) {
      feedback.innerHTML = `
        <span style="color:var(--accent);font-size:14px;">
          💡 ${tarea.hint}
        </span>
      `;
    }
    
    // Deshabilitar botón de hint
    const btnHint = document.getElementById('btn-hint-patrones');
    if (btnHint) {
      btnHint.disabled = true;
      btnHint.style.opacity = '0.5';
      btnHint.textContent = '✓ Pista usada';
    }
    
    // Sonido de hint
    this.reproducirSonido('audio/hint.mp3');
    
    // Analytics
    this.registrarEvento('hint_usado_patrones', { 
      tareaId: tarea.id,
      hintNumero: this.estado.hintsUsados 
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR JUEGO DE PATRONES
  // ─────────────────────────────────────────────────────────────
  cerrarJuegoPatrones: function(modal, onKeydownCallback) {
    if (modal) {
      modal.classList.remove('active');
      // Remover del DOM con delay para animación
      setTimeout(() => {
        if (modal.parentNode) modal.remove();
      }, 200);
    }
    if (onKeydownCallback) {
      document.removeEventListener('keydown', onKeydownCallback);
    }
    document.body.style.overflow = '';
    console.log('🧩 Juego de patrones cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE MEMORIA (CORREGIDO - CIERRE FUNCIONAL)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoMemoria: function(tarea) {
    console.log('🧠 Iniciando juego de memoria:', tarea.titulo);
    
    // Validar datos
    if (!tarea.cartas || tarea.cartas.length < 4) {
      console.error('❌ Juego de memoria sin datos válidos:', tarea.id);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      this.simularCompletado(tarea);
      return;
    }
    
    // Crear contenedor de juego
    const juegoContainer = document.createElement('div');
    juegoContainer.className = 'modal active';
    juegoContainer.id = 'modal-juego-memoria';
    juegoContainer.setAttribute('role', 'dialog');
    juegoContainer.setAttribute('aria-modal', 'true');
    juegoContainer.setAttribute('aria-labelledby', 'juego-memoria-title');
    
    // ✅ AGREGAR: Click en overlay para cerrar
    juegoContainer.addEventListener('click', (e) => {
      if (e.target === juegoContainer) {
        this.cerrarJuegoMemoria(juegoContainer);
      }
    });
    
    // ✅ AGREGAR: Cerrar con tecla Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarJuegoMemoria(juegoContainer);
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // Barajar cartas
    const cartasBarajadas = this.barajarArray([...tarea.cartas]);
    
    // Generar grid de cartas
    const cartasHTML = cartasBarajadas.map((emoji, index) => `
      <button class="carta-memoria" 
              data-indice="${index}" 
              data-emoji="${emoji}"
              aria-label="Carta ${index + 1}"
              style="width:70px;height:70px;font-size:32px;background:var(--primary);
                     border:2px solid var(--primary-dark);border-radius:12px;
                     cursor:pointer;transition:all 0.3s;
                     display:flex;align-items:center;justify-content:center;">
        <span style="opacity:0;transition:opacity 0.3s;">${emoji}</span>
      </button>
    `).join('');
    
    // Calcular columnas según número de cartas
    const numCartas = tarea.cartas.length;
    let columnas = 4;
    if (numCartas <= 8) columnas = 4;
    else if (numCartas <= 12) columnas = 4;
    else if (numCartas <= 16) columnas = 4;
    else columnas = 5;
    
    juegoContainer.innerHTML = `
      <style>
        .carta-memoria.volteada { background: var(--surface) !important; border-color: var(--border) !important; }
        .carta-memoria.volteada span { opacity: 1 !important; }
        .carta-memoria.encontrada { background: var(--success) !important; border-color: var(--success-dark) !important; animation: pulse-success 1s ease; }
        .carta-memoria.error { background: var(--warning) !important; border-color: var(--warning-dark) !important; animation: shake 0.5s ease; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
      </style>
      
      <div class="modal-content" style="max-width:600px;" role="document">
        <div class="modal-header">
          <h2 id="juego-memoria-title" class="modal-title" style="font-size:18px;">
            🧠 ${tarea.titulo}
          </h2>
          <button class="modal-close" aria-label="Cerrar actividad" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">${tarea.descripcion}</p>
          
          <div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:14px;color:var(--ink3);">
            <span>🃏 Cartas: ${tarea.cartas.length / 2} parejas</span>
            <span id="memoria-movimientos">Movimientos: 0</span>
          </div>
          
          <div id="memoria-grid" 
               style="display:grid;grid-template-columns:repeat(${columnas},1fr);gap:12px;justify-content:center;margin-bottom:20px;"
               role="grid"
               aria-label="Tablero de memoria">
            ${cartasHTML}
          </div>
          
          <div id="memoria-feedback" style="min-height:24px;font-weight:600;" aria-live="polite" aria-atomic="true"></div>
        </div>
        
        <div class="modal-footer" style="justify-content:center;">
          <button class="btn-salir-memoria topbar-btn ghost" style="min-width:120px;min-height:48px;">
            ❌ Salir
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(juegoContainer);
    document.body.style.overflow = 'hidden';
    
    // ✅ AGREGAR: Listeners para botones de cerrar
    const btnCerrarHeader = juegoContainer.querySelector('.modal-close');
    const btnSalirFooter = juegoContainer.querySelector('.btn-salir-memoria');
    
    const cerrarYLimpiar = () => this.cerrarJuegoMemoria(juegoContainer, onKeydown);
    
    if (btnCerrarHeader) btnCerrarHeader.addEventListener('click', cerrarYLimpiar);
    if (btnSalirFooter) btnSalirFooter.addEventListener('click', cerrarYLimpiar);
    
    // Configurar estado del juego
    this.estado.juegoMemoria = {
      modal: juegoContainer,
      cartas: cartasBarajadas,
      volteadas: [],
      encontradas: [],
      movimientos: 0,
      tareaId: tarea.id
    };
    
    // Configurar eventos de cartas
    const cartas = juegoContainer.querySelectorAll('.carta-memoria');
    cartas.forEach(carta => {
      carta.addEventListener('click', () => {
        this.voltearCarta(carta, tarea);
      });
    });
    
    // Analytics
    this.registrarEvento('juego_memoria_iniciado', {
      tareaId: tarea.id,
      parejas: tarea.cartas.length / 2
    });
  },

  // ─────────────────────────────────────────────────────────────
  // VOLTEAR CARTA (MEMORIA)
  // ─────────────────────────────────────────────────────────────
  voltearCarta: function(carta, tarea) {
    // Prevenir si ya está volteada o encontrada
    if (carta.classList.contains('volteada') || 
        carta.classList.contains('encontrada') ||
        this.estado.juegoMemoria.volteadas.length >= 2) {
      return;
    }
    
    // Voltear carta
    carta.classList.add('volteada');
    carta.querySelector('span').style.opacity = '1';
    
    // Agregar a volteadas
    this.estado.juegoMemoria.volteadas.push(carta);
    
    // Si hay 2 cartas volteadas, verificar match
    if (this.estado.juegoMemoria.volteadas.length === 2) {
      this.estado.juegoMemoria.movimientos++;
      document.getElementById('memoria-movimientos').textContent = 
        `Movimientos: ${this.estado.juegoMemoria.movimientos}`;
      
      // Verificar después de breve delay
      setTimeout(() => {
        this.verificarMatch(tarea);
      }, 800);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR MATCH (MEMORIA)
  // ─────────────────────────────────────────────────────────────
  verificarMatch: function(tarea) {
    const [carta1, carta2] = this.estado.juegoMemoria.volteadas;
    const emoji1 = carta1.dataset.emoji;
    const emoji2 = carta2.dataset.emoji;
    
    const feedback = document.getElementById('memoria-feedback');
    
    if (emoji1 === emoji2) {
      // Match encontrado
      carta1.classList.add('encontrada');
      carta2.classList.add('encontrada');
      this.estado.juegoMemoria.encontradas.push(carta1, carta2);
      
      if (feedback) {
        feedback.textContent = '¡Pareja encontrada! 🎉';
        feedback.style.color = 'var(--success)';
      }
      
      // Reproducir sonido
      this.reproducirSonido('audio/exito.mp3');
      
      // Verificar si completó todas las parejas
      if (this.estado.juegoMemoria.encontradas.length === tarea.cartas.length) {
        setTimeout(() => {
          this.completarTarea(tarea.id, { 
            exito: true, 
            puntuacion: tarea.recompensa 
          });
          this.cerrarJuegoActivo();
        }, 1000);
      }
    } else {
      // No hay match
      carta1.classList.add('error');
      carta2.classList.add('error');
      
      if (feedback) {
        feedback.textContent = 'Casi... intenta de nuevo 💪';
        feedback.style.color = 'var(--warning)';
      }
      
      // Reproducir sonido de error
      this.reproducirSonido('audio/error.mp3');
      
      // Voltear cartas de nuevo después de delay
      setTimeout(() => {
        carta1.classList.remove('volteada', 'error');
        carta2.classList.remove('volteada', 'error');
        carta1.querySelector('span').style.opacity = '0';
        carta2.querySelector('span').style.opacity = '0';
        if (feedback) feedback.textContent = '';
      }, 1000);
    }
    
    // Resetear volteadas
    this.estado.juegoMemoria.volteadas = [];
  },
  
  // ─────────────────────────────────────────────────────────────
  // BARAJAR ARRAY (UTILIDAD PARA MEMORIA)
  // ─────────────────────────────────────────────────────────────
  barajarArray: function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },


  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR JUEGO DE MEMORIA
  // ─────────────────────────────────────────────────────────────
  cerrarJuegoMemoria: function(modal, onKeydownCallback) {
    if (modal) {
      modal.classList.remove('active');
      // Remover del DOM con delay para animación
      setTimeout(() => {
        if (modal.parentNode) modal.remove();
      }, 200);
    }
    if (onKeydownCallback) {
      document.removeEventListener('keydown', onKeydownCallback);
    }
    document.body.style.overflow = '';
    console.log('🧠 Juego de memoria cerrado');
  },
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE LETRAS (ABECEDARIO)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoLetras: function(tarea) {
    console.log('🔤 Iniciando juego de letras:', tarea.titulo);
    
    if (!tarea.letraObjetivo || !tarea.opciones) {
      this.mostrarProximamente(tarea, '🔤', 'abecedario');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-juego-letras';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;" role="document">
        <div class="modal-header">
          <h2 class="modal-title">🔤 ${tarea.titulo}</h2>
          <button class="modal-close" onclick="features.tareas.cerrarJuegoActivo()">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">${tarea.descripcion}</p>
          
          <div style="font-size:80px;margin:20px 0;color:var(--primary);font-weight:800;" aria-hidden="true">
            ${tarea.letraObjetivo}
          </div>
          
          <p style="font-size:16px;font-weight:600;margin-bottom:16px;">¿Cuál es esta letra?</p>
          
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;">
            ${tarea.opciones.map(opcion => `
              <button class="opcion-letra-btn" data-respuesta="${opcion}"
                      style="min-width:70px;min-height:70px;font-size:32px;font-weight:700;
                             background:var(--surface);border:2px solid var(--border);
                             border-radius:var(--radius-sm);cursor:pointer;">
                ${opcion}
              </button>
            `).join('')}
          </div>
          
          <div id="letras-feedback" style="min-height:24px;font-weight:600;" aria-live="polite"></div>
          
          ${tarea.hint ? `
            <button class="topbar-btn ghost" onclick="features.tareas.mostrarHint('${tarea.id}')"
                    style="margin-top:12px;min-height:44px;">💡 ¿Necesitas ayuda?</button>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="features.tareas.cerrarJuegoActivo()" class="topbar-btn ghost" style="min-width:120px;min-height:48px;">❌ Salir</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Configurar eventos
    modal.querySelectorAll('.opcion-letra-btn').forEach(btn => {
      btn.addEventListener('click', () => this.verificarRespuestaLetras(btn, tarea));
    });
    
    this.estado.juegoActivo = { modal, tipo: 'letras', tareaId: tarea.id };
  },
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE SÍLABAS
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoSilabas: function(tarea) {
    console.log('📖 Iniciando juego de sílabas:', tarea.titulo);
    
    if (!tarea.silabaObjetivo && !tarea.letraFaltante) {
      this.mostrarProximamente(tarea, '📖', 'silabas');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-juego-silabas';
    
    const displayObjetivo = tarea.silabaObjetivo || 
      (tarea.palabra ? tarea.palabra.replace('_', '___') : '');
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;" role="document">
        <div class="modal-header">
          <h2 class="modal-title">📖 ${tarea.titulo}</h2>
          <button class="modal-close" onclick="features.tareas.cerrarJuegoActivo()">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">${tarea.descripcion}</p>
          
          <div style="font-size:60px;margin:20px 0;color:var(--primary);font-weight:700;letter-spacing:4px;" aria-hidden="true">
            ${displayObjetivo}
          </div>
          
          <p style="font-size:16px;font-weight:600;margin-bottom:16px;">Selecciona la opción correcta</p>
          
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;">
            ${tarea.opciones.map(opcion => `
              <button class="opcion-silaba-btn" data-respuesta="${opcion}"
                      style="min-width:80px;min-height:50px;font-size:24px;font-weight:700;
                             background:var(--surface);border:2px solid var(--border);
                             border-radius:var(--radius-sm);cursor:pointer;">
                ${opcion}
              </button>
            `).join('')}
          </div>
          
          <div id="silabas-feedback" style="min-height:24px;font-weight:600;" aria-live="polite"></div>
          
          ${tarea.hint ? `
            <button class="topbar-btn ghost" onclick="features.tareas.mostrarHint('${tarea.id}')"
                    style="margin-top:12px;min-height:44px;">💡 Pista</button>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="features.tareas.cerrarJuegoActivo()" class="topbar-btn ghost" style="min-width:120px;min-height:48px;">❌ Salir</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelectorAll('.opcion-silaba-btn').forEach(btn => {
      btn.addEventListener('click', () => this.verificarRespuestaSilabas(btn, tarea));
    });
    
    this.estado.juegoActivo = { modal, tipo: 'silabas', tareaId: tarea.id };
  },
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE SUMAS
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoSumas: function(tarea) {
    console.log('➕ Iniciando juego de sumas:', tarea.titulo);
    
    if (!tarea.operacion || !tarea.opciones) {
      this.mostrarProximamente(tarea, '➕', 'sumas');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-juego-sumas';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:520px;" role="document">
        <div class="modal-header">
          <h2 class="modal-title">➕ ${tarea.titulo}</h2>
          <button class="modal-close" onclick="features.tareas.cerrarJuegoActivo()">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">${tarea.descripcion}</p>
          
          <div style="font-size:50px;margin:20px 0;color:var(--primary);font-weight:700;" aria-label="${tarea.ilustracion}">
            ${tarea.ilustracion}
          </div>
          
          <div style="font-size:40px;margin:20px 0;color:var(--ink);font-weight:800;" aria-label="Operación: ${tarea.operacion.a} más ${tarea.operacion.b}">
            ${tarea.operacion.a} ${tarea.operacion.simbolo} ${tarea.operacion.b} = ?
          </div>
          
          <p style="font-size:16px;font-weight:600;margin-bottom:16px;">¿Cuál es el resultado?</p>
          
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;">
            ${tarea.opciones.map(opcion => `
              <button class="opcion-suma-btn" data-respuesta="${opcion}"
                      style="min-width:70px;min-height:70px;font-size:32px;font-weight:700;
                             background:var(--surface);border:2px solid var(--border);
                             border-radius:var(--radius-sm);cursor:pointer;">
                ${opcion}
              </button>
            `).join('')}
          </div>
          
          <div id="sumas-feedback" style="min-height:24px;font-weight:600;" aria-live="polite"></div>
          
          ${tarea.hint ? `
            <button class="topbar-btn ghost" onclick="features.tareas.mostrarHint('${tarea.id}')"
                    style="margin-top:12px;min-height:44px;">💡 ¿Necesitas ayuda?</button>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="features.tareas.cerrarJuegoActivo()" class="topbar-btn ghost" style="min-width:120px;min-height:48px;">❌ Salir</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelectorAll('.opcion-suma-btn').forEach(btn => {
      btn.addEventListener('click', () => this.verificarRespuestaSumas(btn, tarea));
    });
    
    this.estado.juegoActivo = { modal, tipo: 'sumas', tareaId: tarea.id };
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR JUEGO DE LECTURA DE PALABRAS
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoLeerPalabra: function(tarea) {
    console.log('📖 Iniciando juego de lectura:', tarea.titulo);
    
    if (!tarea.palabraObjetivo || !tarea.opciones) {
      this.mostrarProximamente(tarea, '📖', 'lectura');
      return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-juego-lectura';
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;" role="document">
        <div class="modal-header">
          <h2 class="modal-title">📖 ${tarea.titulo}</h2>
          <button class="modal-close" onclick="features.tareas.cerrarJuegoActivo()">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;text-align:center;">
          <p style="color:var(--ink2);font-size:15px;margin-bottom:20px;">${tarea.descripcion}</p>
          
          <div style="font-size:50px;margin:20px 0;color:var(--primary);font-weight:700;" aria-hidden="true">
            ${tarea.palabraObjetivo}
          </div>
          
          <p style="font-size:16px;font-weight:600;margin-bottom:16px;">Toca la palabra correcta</p>
          
          <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-bottom:20px;">
            ${tarea.opciones.map(opcion => `
              <button class="opcion-lectura-btn" data-respuesta="${opcion}"
                      style="min-width:100px;min-height:50px;font-size:20px;font-weight:700;
                             background:var(--surface);border:2px solid var(--border);
                             border-radius:var(--radius-sm);cursor:pointer;">
                ${opcion}
              </button>
            `).join('')}
          </div>
          
          <div id="lectura-feedback" style="min-height:24px;font-weight:600;" aria-live="polite"></div>
          
          ${tarea.hint ? `
            <button class="topbar-btn ghost" onclick="features.tareas.mostrarHint('${tarea.id}')"
                    style="margin-top:12px;min-height:44px;">💡 Pista</button>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="features.tareas.cerrarJuegoActivo()" class="topbar-btn ghost" style="min-width:120px;min-height:48px;">❌ Salir</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelectorAll('.opcion-lectura-btn').forEach(btn => {
      btn.addEventListener('click', () => this.verificarRespuestaLectura(btn, tarea));
    });
    
    this.estado.juegoActivo = { modal, tipo: 'lectura', tareaId: tarea.id };
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA - LETRAS
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaLetras: function(btn, tarea) {
    if (this.estado.juegoRespondido) return;
    
    const respuesta = btn.dataset.respuesta;
    const esCorrecta = respuesta === tarea.letraObjetivo;
    
    this.estado.juegoRespondido = true;
    
    if (esCorrecta) {
      btn.classList.add('correcta');
      this.reproducirSonido('audio/exito.mp3');
      document.getElementById('letras-feedback').textContent = '¡Correcto! 🎉';
      document.getElementById('letras-feedback').style.color = 'var(--success)';
      
      setTimeout(() => {
        this.completarTarea(tarea.id, { exito: true, puntuacion: tarea.recompensa });
        this.cerrarJuegoActivo();
      }, 1500);
    } else {
      btn.classList.add('incorrecta');
      this.reproducirSonido('audio/error.mp3');
      document.getElementById('letras-feedback').textContent = 'Casi... intenta de nuevo 💪';
      document.getElementById('letras-feedback').style.color = 'var(--warning)';
      
      setTimeout(() => {
        this.estado.juegoRespondido = false;
        btn.classList.remove('incorrecta');
        document.getElementById('letras-feedback').textContent = '';
      }, 1200);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA - SÍLABAS
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaSilabas: function(btn, tarea) {
    if (this.estado.juegoRespondido) return;
    
    const respuesta = btn.dataset.respuesta;
    const esCorrecta = respuesta === (tarea.silabaObjetivo || tarea.letraFaltante);
    
    this.estado.juegoRespondido = true;
    
    if (esCorrecta) {
      btn.classList.add('correcta');
      this.reproducirSonido('audio/exito.mp3');
      document.getElementById('silabas-feedback').textContent = '¡Excelente! 🎉';
      document.getElementById('silabas-feedback').style.color = 'var(--success)';
      
      setTimeout(() => {
        this.completarTarea(tarea.id, { exito: true, puntuacion: tarea.recompensa });
        this.cerrarJuegoActivo();
      }, 1500);
    } else {
      btn.classList.add('incorrecta');
      this.reproducirSonido('audio/error.mp3');
      document.getElementById('silabas-feedback').textContent = 'Casi... 💪';
      document.getElementById('silabas-feedback').style.color = 'var(--warning)';
      
      setTimeout(() => {
        this.estado.juegoRespondido = false;
        btn.classList.remove('incorrecta');
        document.getElementById('silabas-feedback').textContent = '';
      }, 1200);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA - SUMAS
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaSumas: function(btn, tarea) {
    if (this.estado.juegoRespondido) return;
    
    const respuesta = parseInt(btn.dataset.respuesta);
    const esCorrecta = respuesta === tarea.respuestaCorrecta;
    
    this.estado.juegoRespondido = true;
    
    if (esCorrecta) {
      btn.classList.add('correcta');
      this.reproducirSonido('audio/exito.mp3');
      document.getElementById('sumas-feedback').textContent = '¡Muy bien! 🎉';
      document.getElementById('sumas-feedback').style.color = 'var(--success)';
      
      setTimeout(() => {
        this.completarTarea(tarea.id, { exito: true, puntuacion: tarea.recompensa });
        this.cerrarJuegoActivo();
      }, 1500);
    } else {
      btn.classList.add('incorrecta');
      this.reproducirSonido('audio/error.mp3');
      document.getElementById('sumas-feedback').textContent = 'Casi... cuenta con los dedos 💪';
      document.getElementById('sumas-feedback').style.color = 'var(--warning)';
      
      setTimeout(() => {
        this.estado.juegoRespondido = false;
        btn.classList.remove('incorrecta');
        document.getElementById('sumas-feedback').textContent = '';
      }, 1200);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA - LECTURA
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaLectura: function(btn, tarea) {
    if (this.estado.juegoRespondido) return;
    
    const respuesta = btn.dataset.respuesta;
    const esCorrecta = respuesta === tarea.palabraObjetivo;
    
    this.estado.juegoRespondido = true;
    
    if (esCorrecta) {
      btn.classList.add('correcta');
      this.reproducirSonido('audio/exito.mp3');
      document.getElementById('lectura-feedback').textContent = '¡Excelente lector! 📚';
      document.getElementById('lectura-feedback').style.color = 'var(--success)';
      
      setTimeout(() => {
        this.completarTarea(tarea.id, { exito: true, puntuacion: tarea.recompensa });
        this.cerrarJuegoActivo();
      }, 1500);
    } else {
      btn.classList.add('incorrecta');
      this.reproducirSonido('audio/error.mp3');
      document.getElementById('lectura-feedback').textContent = 'Casi... lee despacio 💪';
      document.getElementById('lectura-feedback').style.color = 'var(--warning)';
      
      setTimeout(() => {
        this.estado.juegoRespondido = false;
        btn.classList.remove('incorrecta');
        document.getElementById('lectura-feedback').textContent = '';
      }, 1200);
    }
  },
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA EN JUEGO DE CONTEO (CORREGIDO)
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaConteo: function(btnSeleccionado, tarea) {
    // Prevenir múltiples clics
    if (this.estado.juegoRespondido) return;
    this.estado.juegoRespondido = true;
    
    const respuestaUsuario = parseInt(btnSeleccionado.dataset.respuesta);
    const esCorrecta = respuestaUsuario === tarea.respuestaCorrecta;
    
    const feedback = document.getElementById('conteo-feedback');
    
    // ✅ CASO 1: RESPUESTA CORRECTA
    if (esCorrecta) {
      btnSeleccionado.classList.add('correcta');
      btnSeleccionado.setAttribute('aria-checked', 'true');
      
      // Feedback visual
      if (feedback) {
        feedback.textContent = '¡Correcto! 🎉';
        feedback.style.color = 'var(--success)';
      }
      
      // 🔊 Sonido de éxito
      this.reproducirSonido('audio/exito-conteo.mp3');
      
      // 🔊 Web Speech API: leer feedback de éxito
      if (this.estado.sonidosActivos && typeof this.leerFeedbackExito === 'function') {
        this.leerFeedbackExito(tarea);
      }
      
      // Analytics
      this.registrarEvento('respuesta_correcta', {
        tareaId: tarea.id,
        intentos: this.estado.juegoActivo?.intentos || 0
      });
      
      // Completar tarea después de breve delay
      setTimeout(() => {
        this.completarTarea(tarea.id, { 
          exito: true, 
          puntuacion: tarea.recompensa 
        });
        this.cerrarJuegoActivo();
      }, 1500);
      
    // ✅ CASO 2: RESPUESTA INCORRECTA
    } else {
      btnSeleccionado.classList.add('incorrecta');
      
      // 🔊 Sonido de error suave
      this.reproducirSonido('audio/error-suave.mp3');
      
      // 🔊 Web Speech API: leer feedback de ánimo
      if (this.estado.sonidosActivos && typeof this.leerFeedbackAnimo === 'function') {
        this.leerFeedbackAnimo();
      }
      
      // Feedback visual
      if (feedback) {
        feedback.textContent = 'Casi... intenta de nuevo 💪';
        feedback.style.color = 'var(--warning)';
      }
      
      // Incrementar intentos
      if (this.estado.juegoActivo) {
        this.estado.juegoActivo.intentos = (this.estado.juegoActivo.intentos || 0) + 1;
      }
      
      // Permitir reintentar después de delay
      setTimeout(() => {
        this.estado.juegoRespondido = false;
        
        // Remover clases de feedback
        btnSeleccionado.classList.remove('incorrecta');
        if (feedback) {
          feedback.textContent = '';
        }
        
        // Si llegó al máximo de intentos, mostrar respuesta correcta
        if (this.estado.juegoActivo?.intentos >= TAREAS_CONFIG.MAX_INTENTOS) {
          this.mostrarRespuestaCorrecta(tarea);
        }
      }, 1200);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR RESPUESTA CORRECTA (DESPUÉS DE MÁX. INTENTOS)
  // ─────────────────────────────────────────────────────────────
  mostrarRespuestaCorrecta: function(tarea) {
    const feedback = document.getElementById('conteo-feedback');
    if (feedback) {
      feedback.innerHTML = `
        <span style="color:var(--primary);font-size:16px;">
          La respuesta era: <strong>${tarea.respuestaCorrecta}</strong> ✨
        </span>
      `;
    }
    
    // Deshabilitar opciones
    document.querySelectorAll('.opcion-btn').forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.6';
      btn.style.cursor = 'not-allowed';
      
      // Resaltar la correcta
      if (parseInt(btn.dataset.respuesta) === tarea.respuestaCorrecta) {
        btn.classList.add('correcta');
      }
    });
    
    // Botón para continuar
    setTimeout(() => {
      const footer = document.querySelector('#modal-juego-conteo .modal-footer');
      if (footer && !footer.querySelector('.btn-continuar')) {
        const btnContinuar = document.createElement('button');
        btnContinuar.className = 'topbar-btn primary btn-continuar';
        btnContinuar.textContent = '✅ Entendido, continuar';
        btnContinuar.style.minHeight = '48px';
        btnContinuar.style.minWidth = '180px';
        btnContinuar.onclick = () => {
          // Completar con puntuación reducida por intentos
          const puntuacion = Math.max(1, Math.round(tarea.recompensa * 0.5));
          this.completarTarea(tarea.id, { exito: true, puntuacion });
          this.cerrarJuegoActivo();
        };
        footer.appendChild(btnContinuar);
        btnContinuar.focus();
      }
    }, 2000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR HINT EN JUEGO DE CONTEO
  // ─────────────────────────────────────────────────────────────
  mostrarHintConteo: function() {
    const tarea = this.estado.tareaActiva;
    if (!tarea?.hint) return;
    
    // Limitar hints
    if (this.estado.hintsUsados >= TAREAS_CONFIG.HINTS_DISPONIBLES) {
      window.app?.mostrarToast('💡 Ya usaste todas las pistas', 'info');
      return;
    }
    
    this.estado.hintsUsados++;
    
    // Mostrar hint en el feedback
    const feedback = document.getElementById('conteo-feedback');
    if (feedback) {
      feedback.innerHTML = `
        <span style="color:var(--accent);font-size:14px;">
          💡 ${tarea.hint}
        </span>
      `;
    }
    
    // Deshabilitar botón de hint
    const btnHint = document.getElementById('btn-hint-conteo');
    if (btnHint) {
      btnHint.disabled = true;
      btnHint.style.opacity = '0.5';
      btnHint.textContent = '✓ Pista usada';
    }
    
    // Sonido de hint
    this.reproducirSonido('audio/hint.mp3');
    
    // Analytics
    this.registrarEvento('hint_usado_conteo', { 
      tareaId: tarea.id,
      hintNumero: this.estado.hintsUsados 
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR JUEGO ACTIVO (GENÉRICO)
  // ─────────────────────────────────────────────────────────────
  cerrarJuegoActivo: function() {
    const juego = this.estado.juegoActivo;
    if (juego?.modal) {
      juego.modal.remove();
    }
    
    // Resetear estado
    this.estado.juegoActivo = null;
    this.estado.juegoRespondido = false;
    
    // Restaurar scroll
    document.body.style.overflow = '';
    
    console.log('🎮 Juego cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // EXPORTAR PROGRESO (PARA RESPALDO O MIGRACIÓN)
  // ─────────────────────────────────────────────────────────────
  exportarProgreso: function() {
    const progreso = {};
    
    Object.keys(this.tareas).forEach(categoria => {
      this.tareas[categoria].forEach(tarea => {
        if (tarea.completada || tarea.mejorPuntuacion > 0) {
          progreso[tarea.id] = {
            completada: tarea.completada,
            mejorPuntuacion: tarea.mejorPuntuacion,
            intentosTotales: tarea.intentosTotales,
            ultimaCompletada: tarea.ultimaCompletada
          };
        }
      });
    });
    
    return {
      version: '2.0',
      exportado: new Date().toISOString(),
      progreso
    };
  },
  
  // ─────────────────────────────────────────────────────────────
  // IMPORTAR PROGRESO (PARA RESTAURAR RESPALDO)
  // ─────────────────────────────────────────────────────────────
  importarProgreso: function(datos) {
    try {
      if (!datos?.progreso) {
        throw new Error('Formato de progreso inválido');
      }
      
      // Fusionar con progreso actual
      Object.entries(datos.progreso).forEach(([tareaId, datosTarea]) => {
        const tarea = this.obtenerTareaPorId(tareaId);
        if (tarea) {
          tarea.completada = datosTarea.completada || false;
          tarea.mejorPuntuacion = datosTarea.mejorPuntuacion || 0;
          tarea.intentosTotales = datosTarea.intentosTotales || 0;
          tarea.ultimaCompletada = datosTarea.ultimaCompletada || null;
        }
      });
      
      // Guardar fusionado
      localStorage.setItem(TAREAS_CONFIG.STORAGE_KEY, JSON.stringify(this.exportarProgreso().progreso));
      
      // Refrescar UI si está visible
      if (document.getElementById('tareas-screen')?.classList.contains('active')) {
        this.renderTareas();
      }
      
      console.log('✅ Progreso importado exitosamente');
      return true;
      
    } catch (error) {
      console.error('❌ Error importando progreso:', error);
      window.app?.mostrarToast('❌ Error al importar progreso', 'error');
      return false;
    }
  }
};

// ─────────────────────────────────────────────────────────────
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.tareas?.init) {
    // Pequeño delay para asegurar dependencias cargadas
    setTimeout(() => {
      window.features.tareas.init();
    }, 100);
  }
});

console.log('✅ tareas.js v2.0 listo');
