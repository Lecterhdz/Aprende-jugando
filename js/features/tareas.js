// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - TAREAS INTERACTIVAS
// ═══════════════════════════════════════════════════════════════

console.log('✏️ tareas.js cargado');

window.features.tareas = {
  categoriaActual: 'trazo',
  tareasCompletadas: 0,
  
  // Catálogo de tareas por categoría
  tareas: {
    trazo: [
      { id: 't1', titulo: 'Trazo de la A', descripcion: 'Sigue los puntos para formar la letra A', dificultad: '⭐', recompensa: 2 },
      { id: 't2', titulo: 'Trazo de la B', descripcion: 'Sigue los puntos para formar la letra B', dificultad: '⭐', recompensa: 2 },
      { id: 't3', titulo: 'Trazo del 1', descripcion: 'Sigue los puntos para formar el número 1', dificultad: '⭐', recompensa: 2 },
      { id: 't4', titulo: 'Trazo del 2', descripcion: 'Sigue los puntos para formar el número 2', dificultad: '⭐', recompensa: 2 },
      { id: 't5', titulo: 'Trazo del Círculo', descripcion: 'Dibuja un círculo perfecto', dificultad: '⭐⭐', recompensa: 3 }
    ],
    conteo: [
      { id: 'c1', titulo: 'Contar Manzanas', descripcion: '¿Cuántas manzanas hay?', dificultad: '⭐', recompensa: 2 },
      { id: 'c2', titulo: 'Contar Estrellas', descripcion: '¿Cuántas estrellas ves?', dificultad: '⭐', recompensa: 2 },
      { id: 'c3', titulo: 'Contar hasta 5', descripcion: 'Arrastra los números en orden', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'c4', titulo: 'Suma Simple', descripcion: '1 + 1 = ?', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'c5', titulo: 'Resta Simple', descripcion: '3 - 1 = ?', dificultad: '⭐⭐', recompensa: 3 }
    ],
    colorear: [
      { id: 'col1', titulo: 'Colorea la Casa', descripcion: 'Usa los colores correctos', dificultad: '⭐', recompensa: 2 },
      { id: 'col2', titulo: 'Colorea el Árbol', descripcion: 'Verde para las hojas', dificultad: '⭐', recompensa: 2 },
      { id: 'col3', titulo: 'Colorea el Sol', descripcion: 'Amarillo brillante', dificultad: '⭐', recompensa: 2 },
      { id: 'col4', titulo: 'Colorea por Números', descripcion: 'Sigue los números', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'col5', titulo: 'Arcoíris', descripcion: '7 colores diferentes', dificultad: '⭐⭐⭐', recompensa: 5 }
    ],
    patrones: [
      { id: 'p1', titulo: 'Completa: 🔴🔵🔴🔵___', descripcion: '¿Qué sigue?', dificultad: '⭐', recompensa: 2 },
      { id: 'p2', titulo: 'Completa: 🟡🟢🟡🟢___', descripcion: 'Sigue el patrón', dificultad: '⭐', recompensa: 2 },
      { id: 'p3', titulo: 'Secuencia Numérica', descripcion: '1, 2, 3, ___', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'p4', titulo: 'Patrones de Formas', descripcion: '○□○□___', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'p5', titulo: 'Patrones Complejos', descripcion: '🔴🔵🟡🔴🔵___', dificultad: '⭐⭐⭐', recompensa: 5 }
    ],
    memoria: [
      { id: 'm1', titulo: 'Encontrar Parejas', descripcion: 'Voltea las cartas', dificultad: '⭐', recompensa: 2 },
      { id: 'm2', titulo: 'Memoria de Animales', descripcion: 'Encuentra los animales iguales', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'm3', titulo: 'Memoria de Colores', descripcion: 'Recuerda los colores', dificultad: '⭐⭐', recompensa: 3 },
      { id: 'm4', titulo: 'Memoria de Números', descripcion: '¿Dónde está el 5?', dificultad: '⭐⭐⭐', recompensa: 5 },
      { id: 'm5', titulo: 'Super Memoria', descripcion: '12 cartas para encontrar', dificultad: '⭐⭐⭐', recompensa: 5 }
    ]
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR TAREAS
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('✏️ Tareas inicializadas');
    
    // Escuchar cuando se muestra la pantalla
    window.addEventListener('screen-change', (e) => {
      if (e.detail.pantalla === 'tareas-screen') {
        this.cargar();
      }
    });
    
    // Renderizar selector de categorías
    this.renderCategorias();
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR TAREAS
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('✏️ Cargando tareas:', this.categoriaActual);
    this.renderTareas();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR CATEGORÍAS
  // ─────────────────────────────────────────────────────────────
  renderCategorias: function() {
    const container = document.querySelector('.tareas-categorias');
    if (!container) return;
    
    const categorias = Object.keys(this.tareas);
    
    container.innerHTML = categorias.map(cat => `
      <button class="categoria-btn ${this.categoriaActual === cat ? 'active' : ''}" 
              onclick="features.tareas.filtrarPorCategoria('${cat}')">
        ${this.getIconoCategoria(cat)} ${this.getNombreCategoria(cat)}
      </button>
    `).join('');
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR CATEGORÍA
  // ─────────────────────────────────────────────────────────────
  filtrarPorCategoria: function(categoria) {
    this.categoriaActual = categoria;
    this.renderCategorias();
    this.renderTareas();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR TAREAS
  // ─────────────────────────────────────────────────────────────
  renderTareas: function() {
    const container = document.getElementById('tareas-content');
    if (!container) return;
    
    const tareas = this.tareas[this.categoriaActual];
    if (!tareas) {
      container.innerHTML = '<p style="color:var(--ink3);text-align:center;">Cargando...</p>';
      return;
    }
    
    container.innerHTML = `
      <div class="tareas-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">
        ${tareas.map(tarea => `
          <div class="card tarea-card" style="border:2px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;transition:all 0.3s;"
               onmouseover="this.style.borderColor='var(--primary)';this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow)'"
               onmouseout="this.style.borderColor='var(--border)';this.style.transform='translateY(0)';this.style.boxShadow='var(--shadow-sm)'">
            <div class="card-header" style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));padding:16px;">
              <div class="card-title" style="color:var(--primary);font-size:16px;">
                ${this.getIconoCategoria(this.categoriaActual)} ${tarea.titulo}
              </div>
              <div style="font-size:18px;">${tarea.dificultad}</div>
            </div>
            <div class="card-body" style="padding:16px;">
              <p style="color:var(--ink2);font-size:14px;margin-bottom:16px;">${tarea.descripcion}</p>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <span style="font-size:12px;color:var(--ink3);">Recompensa:</span>
                <span style="font-size:16px;font-weight:700;color:var(--accent);">⭐ ${tarea.recompensa}</span>
              </div>
              <button class="topbar-btn primary" onclick="features.tareas.iniciarTarea('${tarea.id}')"
                      style="width:100%;min-height:48px;font-size:15px;">
                🎮 Jugar Ahora
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR TAREA
  // ─────────────────────────────────────────────────────────────
  iniciarTarea: function(tareaId) {
    const categoria = this.categoriaActual;
    const tarea = this.tareas[categoria].find(t => t.id === tareaId);
    if (!tarea) return;
    
    console.log('✏️ Iniciando tarea:', tarea.titulo);
    
    // Mostrar modal de instrucciones
    this.mostrarInstrucciones(tarea);
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR INSTRUCCIONES
  // ─────────────────────────────────────────────────────────────
  mostrarInstrucciones: function(tarea) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-instrucciones-tarea';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;">
        <div class="modal-header">
          <div class="modal-title">📋 ${tarea.titulo}</div>
          <button class="modal-close" onclick="this.closest('.modal').remove()">✕</button>
        </div>
        <div class="modal-body" style="padding:32px 24px;text-align:center;">
          <div style="font-size:64px;margin-bottom:20px;">${this.getIconoCategoria(this.categoriaActual)}</div>
          <h3 style="color:var(--primary);margin-bottom:16px;">Instrucciones</h3>
          <p style="color:var(--ink2);font-size:16px;line-height:1.6;margin-bottom:24px;">${tarea.descripcion}</p>
          <div style="background:var(--bg2);padding:16px;border-radius:var(--radius-sm);margin-bottom:24px;">
            <div style="font-size:14px;color:var(--ink3);">Recompensa al completar:</div>
            <div style="font-size:24px;font-weight:700;color:var(--accent);margin-top:8px;">⭐ ${tarea.recompensa} estrellas</div>
          </div>
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;">
          <button onclick="this.closest('.modal').remove()" class="topbar-btn ghost">❌ Cancelar</button>
          <button onclick="features.tareas.comenzarJuego('${tarea.id}');this.closest('.modal').remove()" 
                  class="topbar-btn primary" style="min-width:150px;">
            🎮 ¡Comenzar!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  // ─────────────────────────────────────────────────────────────
  // COMENZAR JUEGO
  // ─────────────────────────────────────────────────────────────
  comenzarJuego: function(tareaId) {
    console.log('🎮 Juego iniciado:', tareaId);
    
    // Aquí se implementaría la lógica específica de cada tipo de juego
    // Por ahora, simulamos la completación
    setTimeout(() => {
      this.completarTarea(tareaId);
    }, 2000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // COMPLETAR TAREA
  // ─────────────────────────────────────────────────────────────
  completarTarea: function(tareaId) {
    const tarea = this.tareas[this.categoriaActual].find(t => t.id === tareaId);
    if (!tarea) return;
    
    // Incrementar contador
    this.tareasCompletadas++;
    
    // Guardar progreso
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    if (!progreso.tareas) progreso.tareas = [];
    if (!progreso.tareas.includes(tareaId)) {
      progreso.tareas.push(tareaId);
      localStorage.setItem('aprende_jugando_progreso', JSON.stringify(progreso));
    }
    
    // Dar recompensa
    if (window.features.progreso) {
      window.features.progreso.agregarEstrellas(tarea.recompensa, `Tarea: ${tarea.titulo}`);
    }
    
    // Mostrar celebración
    this.mostrarCelebracion(tarea);
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR CELEBRACIÓN
  // ─────────────────────────────────────────────────────────────
  mostrarCelebracion: function(tarea) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-celebracion';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:400px;text-align:center;">
        <div class="modal-body" style="padding:48px 24px;">
          <div style="font-size:80px;margin-bottom:16px;animation:bounce 1s infinite;">🎉</div>
          <h2 style="color:var(--primary);font-size:28px;margin-bottom:8px;">¡Excelente!</h2>
          <p style="color:var(--ink2);font-size:16px;margin-bottom:24px;">Completaste: ${tarea.titulo}</p>
          <div style="background:linear-gradient(135deg,var(--accent-light),var(--accent));padding:20px;border-radius:var(--radius-lg);margin-bottom:24px;">
            <div style="font-size:14px;color:white;opacity:0.9;">Recompensa:</div>
            <div style="font-size:48px;font-weight:800;color:white;margin-top:8px;">⭐ ${tarea.recompensa}</div>
          </div>
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="this.closest('.modal').remove()" class="topbar-btn primary" style="min-width:200px;">
            ¡Siguiente! 🚀
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Actualizar UI
    window.app?.mostrarToast(`✅ ${tarea.titulo} completada`, 'success');
  },
  
  // ─────────────────────────────────────────────────────────────
  // UTILIDADES
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
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.tareas) {
    window.features.tareas.init();
  }
});

console.log('✅ tareas.js listo');
