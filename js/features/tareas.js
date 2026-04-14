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
        nivel: 'facil', // facil: 4 cartas, medio: 6, dificil: 8
        cartas: ['🐶', '🐶', '🐱', '🐱', '🐰', '🐰', '🐸', '🐸'],
        hint: 'Recuerda dónde viste cada animal',
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
    
    // Validar si ya está completada (permitir repetir)
    if (tarea.completada) {
      console.log('🔄 Repitiendo tarea completada:', tarea.titulo);
    }
    
    // Resetear estado de juego
    this.estado.tareaActiva = tarea;
    this.estado.intentos = 0;
    this.estado.hintsUsados = 0;
    this.estado.tiempoInicio = Date.now();
    
    console.log('✏️ Iniciando tarea:', tarea.titulo);
    
    // Mostrar modal de instrucciones con accesibilidad
    this.mostrarInstrucciones(tarea);
    
    // Analytics
    this.registrarEvento('tarea_iniciada', { 
      tareaId, 
      categoria, 
      dificultad: tarea.dificultad 
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR INSTRUCCIONES (MODAL ACCESIBLE)
  // ─────────────────────────────────────────────────────────────
  mostrarInstrucciones: function(tarea) {
    // Usar el sistema de modales de components si está disponible
    if (window.components?.modal?.abrir) {
      window.components.modal.abrir('modal-instrucciones-tarea', {
        titulo: tarea.titulo,
        instruccion: tarea.instruccionesDetalladas || tarea.descripcion,
        icono: this.getIconoCategoria(this.estado.categoriaActual),
        recompensa: tarea.recompensa,
        onConfirmar: () => this.comenzarJuego(tarea.id)
      });
      return;
    }
    
    // Fallback: crear modal dinámico
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-instrucciones-tarea';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-instrucciones-title');
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:520px;" role="document">
        <div class="modal-header">
          <h2 id="modal-instrucciones-title" class="modal-title" style="font-size:18px;">
            ${tarea.icono || this.getIconoCategoria(this.estado.categoriaActual)} ${tarea.titulo}
          </h2>
          <button class="modal-close" onclick="this.closest('.modal')?.remove()" 
                  aria-label="Cerrar instrucciones" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;text-align:center;">
          <div style="font-size:56px;margin-bottom:16px;" aria-hidden="true">
            ${tarea.icono || this.getIconoCategoria(this.estado.categoriaActual)}
          </div>
          <h3 style="color:var(--primary);margin-bottom:12px;font-size:16px;">Instrucciones</h3>
          <p style="color:var(--ink2);font-size:15px;line-height:1.6;white-space:pre-line;margin-bottom:20px;"
             id="modal-instrucciones-text">
            ${tarea.instruccionesDetalladas || tarea.descripcion}
          </p>
          
          <div style="background:var(--bg2);padding:14px;border-radius:var(--radius-sm);margin-bottom:20px;"
               role="note"
               aria-label="Recompensa al completar">
            <div style="font-size:13px;color:var(--ink3);">⭐ Recompensa:</div>
            <div style="font-size:28px;font-weight:800;color:var(--accent);margin-top:4px;">
              ${tarea.recompensa} estrellas
            </div>
          </div>
          
          ${tarea.hint ? `
            <button class="topbar-btn ghost" 
                    onclick="features.tareas.mostrarHint('${tarea.id}')"
                    style="width:100%;min-height:44px;margin-bottom:12px;"
                    aria-label="Ver pista para esta actividad">
              💡 ¿Necesitas una pista?
            </button>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;flex-wrap:wrap;">
          <button onclick="this.closest('.modal')?.remove()" 
                  class="topbar-btn ghost"
                  style="min-width:120px;min-height:48px;">
            ❌ Cancelar
          </button>
          <button onclick="features.tareas.comenzarJuego('${tarea.id}');this.closest('.modal')?.remove()" 
                  class="topbar-btn primary"
                  style="min-width:150px;min-height:48px;"
                  autofocus>
            🎮 ¡Comenzar!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Enfocar el botón de comenzar para accesibilidad
    setTimeout(() => {
      modal.querySelector('.topbar-btn.primary')?.focus();
    }, 100);
    
    // Cerrar con Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
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
  // COMENZAR JUEGO (ACTUALIZADO)
  // ─────────────────────────────────────────────────────────────
  comenzarJuego: function(tareaId) {
    const tarea = this.obtenerTareaPorId(tareaId);
    if (!tarea) return;
    
    console.log('🎮 Juego iniciado:', tarea.titulo);
    
    // Resetear estado de juego
    this.estado.tareaActiva = tarea;
    this.estado.intentos = 0;
    this.estado.hintsUsados = 0;
    this.estado.juegoRespondido = false;
    this.estado.tiempoInicio = Date.now();
    
    // Ejecutar lógica específica por categoría
    switch (this.estado.categoriaActual) {
      case 'conteo':
        this.iniciarJuegoConteo(tarea); // ← IMPLEMENTACIÓN REAL
        break;
      
      // Para las demás categorías, mantener simulación por ahora
      case 'trazo':
      case 'colorear':
      case 'patrones':
      case 'memoria':
      default:
        console.log(`🎮 ${this.estado.categoriaActual}: simulación (próximamente)`);
        window.app?.mostrarToast('🚧 Actividad en desarrollo', 'info');
        this.simularCompletado(tarea);
    }
    
    // Analytics
    this.registrarEvento('juego_comenzado', { 
      tareaId, 
      categoria: this.estado.categoriaActual,
      timestamp: Date.now()
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
  // MOSTRAR CELEBRACIÓN (CON ANIMACIONES Y CONFETTI)
  // ─────────────────────────────────────────────────────────────
  mostrarCelebracion: function(tarea, datos) {
    const { puntuacion, tiempoJugado, exito } = datos;
    
    // Usar sistema de modales si está disponible
    if (window.components?.modal?.abrir) {
      window.components.modal.abrir('modal-celebracion', {
        exito,
        titulo: exito ? '¡Excelente trabajo! 🎉' : '¡Casi lo logras! 💪',
        mensaje: exito 
          ? `Completaste: ${tarea.titulo}`
          : `Inténtalo de nuevo: ${tarea.titulo}`,
        puntuacion,
        tiempo: tiempoJugado,
        onContinuar: () => {
          // Refrescar la vista para mostrar estado actualizado
          this.renderTareas();
          this.actualizarEstadisticasHeader();
        }
      });
      return;
    }
    
    // Fallback: modal dinámico
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-celebracion';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:420px;text-align:center;" role="document">
        <div class="modal-body" style="padding:32px 24px;">
          <div style="font-size:72px;margin-bottom:12px;${TAREAS_CONFIG.ANIMACIONES_ACTIVAS ? 'animation:bounce 1s infinite' : ''}" 
               aria-hidden="true">
            ${exito ? '🎉' : '💪'}
          </div>
          <h2 style="color:var(--${exito ? 'primary' : 'warning'});font-size:24px;margin-bottom:8px;">
            ${exito ? '¡Excelente trabajo!' : '¡Casi lo logras!'}
          </h2>
          <p style="color:var(--ink2);font-size:16px;margin-bottom:20px;">
            ${tarea.titulo}
          </p>
          
          ${exito ? `
            <div style="background:linear-gradient(135deg,var(--accent-light),var(--accent));
                       padding:20px;border-radius:var(--radius-lg);margin-bottom:20px;"
                 role="status"
                 aria-live="polite">
              <div style="font-size:13px;color:rgba(255,255,255,0.9);">⭐ Puntuación:</div>
              <div style="font-size:42px;font-weight:800;color:white;margin-top:4px;">
                ${puntuacion}
              </div>
              ${tiempoJugado < tarea.tiempoEstimado ? `
                <div style="font-size:12px;color:rgba(255,255,255,0.8);margin-top:8px;">
                  ⚡ ¡Bonus por velocidad!
                </div>
              ` : ''}
            </div>
          ` : `
            <div style="background:var(--warning-l);padding:16px;border-radius:var(--radius-sm);margin-bottom:20px;">
              <p style="font-size:14px;color:var(--warning);margin:0;">
                💡 Consejo: Usa las pistas si necesitas ayuda
              </p>
            </div>
          `}
          
          ${TAREAS_CONFIG.CELEBRACION_CONFETTI && exito ? this.generarConfettiHTML() : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;flex-wrap:wrap;">
          ${!exito ? `
            <button onclick="features.tareas.iniciarTarea('${tarea.id}');this.closest('.modal')?.remove()" 
                    class="topbar-btn ghost"
                    style="min-width:120px;min-height:48px;">
              🔄 Intentar de nuevo
            </button>
          ` : ''}
          <button onclick="features.tareas.cerrarCelebracion('${tarea.id}');this.closest('.modal')?.remove()" 
                  class="topbar-btn primary"
                  style="min-width:150px;min-height:48px;"
                  autofocus>
            ${exito ? '🚀 Siguiente' : 'Entendido'}
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Enfocar botón principal para accesibilidad
    setTimeout(() => {
      modal.querySelector('.topbar-btn.primary')?.focus();
    }, 100);
    
    // Efecto de confetti si está activo
    if (TAREAS_CONFIG.CELEBRACION_CONFETTI && exito) {
      this.activarConfetti();
    }
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
  // REPRODUCIR SONIDO (CON VERIFICACIÓN DE PREFERENCIAS)
  // ─────────────────────────────────────────────────────────────
  reproducirSonido: function(rutaAudio) {
    if (!this.estado.sonidosActivos) return;
    
    try {
      const audio = new Audio(rutaAudio);
      audio.volume = 0.3; // Volumen bajo para no molestar
      audio.play().catch(() => {
        // Silenciar si el navegador bloquea autoplay
        this.estado.sonidosActivos = false;
        localStorage.setItem(TAREAS_CONFIG.SOUND_ENABLED_KEY, 'false');
      });
    } catch (error) {
      console.warn('⚠️ Error reproduciendo sonido:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SONIDOS
  // ─────────────────────────────────────────────────────────────
  toggleSonidos: function() {
    this.estado.sonidosActivos = !this.estado.sonidosActivos;
    localStorage.setItem(TAREAS_CONFIG.SOUND_ENABLED_KEY, JSON.stringify(this.estado.sonidosActivos));
    
    window.app?.mostrarToast(
      this.estado.sonidosActivos ? '🔊 Sonidos activados' : '🔇 Sonidos desactivados', 
      'info'
    );
    
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
      memoria: '🧠'
    };
    return iconos[cat] || '⭐';
  },
  
  getNombreCategoria: function(cat) {
    const nombres = {
      trazo: 'Trazo',
      conteo: 'Conteo',
      colorear: 'Colorear',
      patrones: 'Patrones',
      memoria: 'Memoria'
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
  // MÉTODOS ESPECÍFICOS POR TIPO DE JUEGO (PLACEHOLDERS)
  // ─────────────────────────────────────────────────────────────
  iniciarJuegoTrazo: function(tarea) {
    console.log('✏️ Iniciando juego de trazo:', tarea.titulo);
    // Implementar canvas para trazo con detección de gestos
    this.simularCompletado(tarea);
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
  
  iniciarJuegoColorear: function(tarea) {
    console.log('🎨 Iniciando juego de colorear:', tarea.titulo);
    // Implementar canvas interactivo con paleta de colores
    this.simularCompletado(tarea);
  },
  
  iniciarJuegoPatrones: function(tarea) {
    console.log('🧩 Iniciando juego de patrones:', tarea.titulo);
    // Implementar interfaz de arrastrar y soltar para completar secuencia
    this.simularCompletado(tarea);
  },
  
  iniciarJuegoMemoria: function(tarea) {
    console.log('🧠 Iniciando juego de memoria:', tarea.titulo);
    // Implementar grid de cartas con volteo y matching
    this.simularCompletado(tarea);
  },

  // ─────────────────────────────────────────────────────────────
  // VERIFICAR RESPUESTA EN JUEGO DE CONTEO
  // ─────────────────────────────────────────────────────────────
  verificarRespuestaConteo: function(btnSeleccionado, tarea) {
    // Prevenir múltiples clics
    if (this.estado.juegoRespondido) return;
    this.estado.juegoRespondido = true;
    
    const respuestaUsuario = parseInt(btnSeleccionado.dataset.respuesta);
    const esCorrecta = respuestaUsuario === tarea.respuestaCorrecta;
    
    // Feedback visual inmediato
    if (esCorrecta) {
      btnSeleccionado.classList.add('correcta');
      btnSeleccionado.setAttribute('aria-checked', 'true');
      
      // Sonido de éxito
      this.reproducirSonido('audio/exito-conteo.mp3');
      
      // Feedback textual
      const feedback = document.getElementById('conteo-feedback');
      if (feedback) {
        feedback.textContent = '¡Correcto! 🎉';
        feedback.style.color = 'var(--success)';
      }
      
      // Analytics
      this.registrarEvento('respuesta_correcta', {
        tareaId: tarea.id,
        intentos: this.estado.juegoActivo?.intentos || 0
      });
      
      // Completar tarea después de breve delay para que vea el feedback
      setTimeout(() => {
        this.completarTarea(tarea.id, { 
          exito: true, 
          puntuacion: tarea.recompensa 
        });
        this.cerrarJuegoActivo();
      }, 1500);
      
    } else {
      btnSeleccionado.classList.add('incorrecta');
      
      // Sonido de error suave
      this.reproducirSonido('audio/error-suave.mp3');
      
      // Feedback textual
      const feedback = document.getElementById('conteo-feedback');
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
