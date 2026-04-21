// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - MATERIAL DE REPASO (v3.0 - EVOLUCIONADO)
// ═══════════════════════════════════════════════════════════════
// Features: Flashcards interactivas • Web Speech API • Progreso •
//           Accesibilidad • Responsive • Offline • Animaciones
// ═══════════════════════════════════════════════════════════════
console.log('📚 repaso.js v3.0 cargado');

window.features = window.features || {};
window.features.repaso = {
  
  // Estado interno
  estado: {
    gradoActual: 'kinder1',
    categoriaActual: 'todos',
    sonidosActivos: true,
    progreso: {}
  },
  
  // Catálogo de materiales de repaso por grado
  materiales: {
    kinder1: {
      letras: [
        { id: 'l1-k1', letra: 'A', imagen: '🍎', palabra: 'Manzana', audio: 'a.mp3' },
        { id: 'l2-k1', letra: 'B', imagen: '🐻', palabra: 'Oso', audio: 'b.mp3' },
        { id: 'l3-k1', letra: 'C', imagen: '🐱', palabra: 'Gato', audio: 'c.mp3' },
        { id: 'l4-k1', letra: 'D', imagen: '🐶', palabra: 'Perro', audio: 'd.mp3' },
        { id: 'l5-k1', letra: 'E', imagen: '🐘', palabra: 'Elefante', audio: 'e.mp3' }
      ],
      numeros: [
        { id: 'n1-k1', numero: 1, imagen: '☝️', palabra: 'Uno' },
        { id: 'n2-k1', numero: 2, imagen: '✌️', palabra: 'Dos' },
        { id: 'n3-k1', numero: 3, imagen: '🤟', palabra: 'Tres' },
        { id: 'n4-k1', numero: 4, imagen: '🖐️', palabra: 'Cuatro' },
        { id: 'n5-k1', numero: 5, imagen: '🖐️', palabra: 'Cinco' }
      ],
      colores: [
        { id: 'c1-k1', color: 'Rojo', hex: '#FF6B9D', ejemplo: '🍎' },
        { id: 'c2-k1', color: 'Azul', hex: '#4ECDC4', ejemplo: '🦋' },
        { id: 'c3-k1', color: 'Amarillo', hex: '#FFE66D', ejemplo: '🌻' },
        { id: 'c4-k1', color: 'Verde', hex: '#95E1D3', ejemplo: '🐸' },
        { id: 'c5-k1', color: 'Naranja', hex: '#F38181', ejemplo: '🍊' }
      ],
      animales: [
        { id: 'a1-k1', nombre: 'Vaca', imagen: '🐄', sonido: 'Muuu' },
        { id: 'a2-k1', nombre: 'Perro', imagen: '🐶', sonido: 'Guau' },
        { id: 'a3-k1', nombre: 'Gato', imagen: '🐱', sonido: 'Miau' },
        { id: 'a4-k1', nombre: 'Pato', imagen: '🦆', sonido: 'Cuac' },
        { id: 'a5-k1', nombre: 'Oveja', imagen: '🐑', sonido: 'Beee' }
      ]
    },
    kinder2: {
      letras: [
        { id: 'l6-k2', letra: 'F', imagen: '🦊', palabra: 'Zorro' },
        { id: 'l7-k2', letra: 'G', imagen: '🦒', palabra: 'Jirafa' },
        { id: 'l8-k2', letra: 'H', imagen: '🐴', palabra: 'Caballo' },
        { id: 'l9-k2', letra: 'I', imagen: '🦔', palabra: 'Erizo' },
        { id: 'l10-k2', letra: 'J', imagen: '🐯', palabra: 'Tigre' }
      ],
      numeros: [
        { id: 'n6-k2', numero: 6, imagen: '👌', palabra: 'Seis' },
        { id: 'n7-k2', numero: 7, imagen: '🖐️+✌️', palabra: 'Siete' },
        { id: 'n8-k2', numero: 8, imagen: '🖐️+🤟', palabra: 'Ocho' },
        { id: 'n9-k2', numero: 9, imagen: '🖐️+🖐️-☝️', palabra: 'Nueve' },
        { id: 'n10-k2', numero: 10, imagen: '👐', palabra: 'Diez' }
      ],
      figuras: [
        { id: 'f1-k2', figura: 'Círculo', imagen: '🔵' },
        { id: 'f2-k2', figura: 'Cuadrado', imagen: '🟦' },
        { id: 'f3-k2', figura: 'Triángulo', imagen: '🔺' },
        { id: 'f4-k2', figura: 'Rectángulo', imagen: '🟩' },
        { id: 'f5-k2', figura: 'Estrella', imagen: '⭐' }
      ],
      silabas: [
        { id: 's1-k2', silaba: 'MA', ejemplo: 'Mano' },
        { id: 's2-k2', silaba: 'PA', ejemplo: 'Pato' },
        { id: 's3-k2', silaba: 'TA', ejemplo: 'Taza' },
        { id: 's4-k2', silaba: 'SA', ejemplo: 'Sapo' },
        { id: 's5-k2', silaba: 'LA', ejemplo: 'Luna' }
      ]
    },
    kinder3: {
      letras: [
        { id: 'l11-k3', letra: 'K', imagen: '🐨', palabra: 'Koala' },
        { id: 'l12-k3', letra: 'L', imagen: '🦁', palabra: 'León' },
        { id: 'l13-k3', letra: 'M', imagen: '🐵', palabra: 'Mono' },
        { id: 'l14-k3', letra: 'N', imagen: '🐼', palabra: 'Panda' },
        { id: 'l15-k3', letra: 'Ñ', imagen: '🐑', palabra: 'Ñu' }
      ],
      sumas: [
        { id: 's1-k3', operacion: '1 + 1', resultado: 2 },
        { id: 's2-k3', operacion: '2 + 2', resultado: 4 },
        { id: 's3-k3', operacion: '3 + 1', resultado: 4 },
        { id: 's4-k3', operacion: '5 + 0', resultado: 5 },
        { id: 's5-k3', operacion: '3 + 3', resultado: 6 }
      ],
      vocales: [
        { id: 'v1-k3', vocal: 'A', ejemplo: 'Avión' },
        { id: 'v2-k3', vocal: 'E', ejemplo: 'Escuela' },
        { id: 'v3-k3', vocal: 'I', ejemplo: 'Iglesia' },
        { id: 'v4-k3', vocal: 'O', ejemplo: 'Oso' },
        { id: 'v5-k3', vocal: 'U', ejemplo: 'Uva' }
      ],
      palabras: [
        { id: 'p1-k3', palabra: 'CASA', imagen: '🏠' },
        { id: 'p2-k3', palabra: 'MAMÁ', imagen: '👩' },
        { id: 'p3-k3', palabra: 'PAPÁ', imagen: '👨' },
        { id: 'p4-k3', palabra: 'SOL', imagen: '☀️' },
        { id: 'p5-k3', palabra: 'LUNA', imagen: '🌙' }
      ]
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR REPASO
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('📚 Repaso v3.0 inicializado');
    
    // Cargar configuración guardada
    this.cargarConfiguracion();
    
    // Configurar event listeners con delegación
    this.configurarEventos();
    
    // Escuchar cambios de pantalla
    window.addEventListener('screen-change', (e) => {
      if (e.detail?.pantalla === 'repaso-screen') {
        this.cargar();
      }
    });
    
    // Renderizar selector de grado inicial
    this.renderSelectorGrado();
    
    console.log('✅ Repaso listo - Grado:', this.estado.gradoActual);
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR CONFIGURACIÓN GUARDADA
  // ─────────────────────────────────────────────────────────────
  cargarConfiguracion: function() {
    try {
      // Grado guardado
      const gradoGuardado = localStorage.getItem('aprende_jugando_grado');
      if (gradoGuardado && this.materiales[gradoGuardado]) {
        this.estado.gradoActual = gradoGuardado;
      }
      
      // Progreso guardado
      const progresoGuardado = localStorage.getItem('aprende_jugando_repaso_progreso');
      if (progresoGuardado) {
        this.estado.progreso = JSON.parse(progresoGuardado);
      }
      
      // Sonidos
      const sonidosGuardados = localStorage.getItem('aprende_jugando_sonidos');
      if (sonidosGuardados !== null) {
        this.estado.sonidosActivos = JSON.parse(sonidosGuardados);
      }
    } catch (error) {
      console.warn('⚠️ Error cargando configuración de repaso:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CONFIGURAR EVENTOS (DELEGACIÓN - MEJOR RENDIMIENTO)
  // ─────────────────────────────────────────────────────────────
  configurarEventos: function() {
    // Delegación para selector de grado
    const selectorGrado = document.querySelector('.grado-selector');
    if (selectorGrado) {
      selectorGrado.addEventListener('click', (e) => {
        const btn = e.target.closest('.grado-btn');
        if (btn) {
          e.preventDefault();
          const grado = btn.dataset.grado;
          if (grado) this.filtrarPorGrado(grado);
        }
      });
    }
    
    // Delegación para categorías
    const container = document.getElementById('repaso-content');
    if (container) {
      container.addEventListener('click', (e) => {
        const btnCategoria = e.target.closest('.categoria-btn');
        if (btnCategoria) {
          e.preventDefault();
          const categoria = btnCategoria.dataset.categoria;
          if (categoria) this.filtrarPorCategoria(categoria);
        }
        
        const btnItem = e.target.closest('.item-btn');
        if (btnItem) {
          e.preventDefault();
          const categoria = btnItem.dataset.categoria;
          const itemId = btnItem.dataset.itemId;
          if (categoria && itemId) this.abrirActividad(categoria, itemId);
        }
        
        const btnVerTodas = e.target.closest('.btn-ver-todas');
        if (btnVerTodas) {
          e.preventDefault();
          const categoria = btnVerTodas.dataset.categoria;
          if (categoria) this.abrirCategoria(categoria);
        }
      });
    }
    
    // Teclado: Enter para activar elemento enfocado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && document.activeElement?.dataset?.itemId) {
        e.preventDefault();
        const categoria = document.activeElement.dataset.categoria;
        const itemId = document.activeElement.dataset.itemId;
        if (categoria && itemId) this.abrirActividad(categoria, itemId);
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR MATERIAL DE REPASO
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('📚 Cargando material de repaso:', this.estado.gradoActual);
    this.renderSelectorGrado();
    this.renderContenido();
    this.anunciarCambioGrado();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR SELECTOR DE GRADO (CON ACCESIBILIDAD)
  // ─────────────────────────────────────────────────────────────
  renderSelectorGrado: function() {
    const container = document.querySelector('.grado-selector');
    if (!container) return;
    
    const grados = [
      { id: 'kinder1', nombre: 'Kinder 1', edad: '3-4 años', icono: '🧒' },
      { id: 'kinder2', nombre: 'Kinder 2', edad: '4-5 años', icono: '🧒' },
      { id: 'kinder3', nombre: 'Kinder 3', edad: '5-6 años', icono: '🧒' }
    ];
    
    container.innerHTML = grados.map(grado => {
      const activa = this.estado.gradoActual === grado.id;
      return `
        <button class="grado-btn ${activa ? 'active' : ''}" 
                data-grado="${grado.id}"
                role="tab"
                aria-selected="${activa}"
                aria-controls="repaso-content"
                style="min-height:48px;min-width:100px;">
          ${grado.icono} ${grado.nombre}
        </button>
      `;
    }).join('');
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR GRADO (CON ANIMACIÓN Y FEEDBACK)
  // ─────────────────────────────────────────────────────────────
  filtrarPorGrado: function(grado) {
    if (!this.materiales[grado]) return;
    
    // Actualizar estado
    this.estado.gradoActual = grado;
    localStorage.setItem('aprende_jugando_grado', grado);
    
    // Animación de cambio
    const container = document.getElementById('repaso-content');
    if (container) {
      container.style.opacity = '0.5';
      container.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        this.renderSelectorGrado();
        this.renderContenido();
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      }, 200);
    }
    
    // Feedback
    const nombreGrado = grado.replace('kinder', 'Kinder ');
    window.app?.mostrarToast(`📚 Material de ${nombreGrado}`, 'info');
    
    // Analytics
    this.registrarEvento('grado_cambiado', { grado });
    
    console.log('📚 Grado cambiado a:', grado);
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR CONTENIDO (CON CATEGORÍAS Y TARJETAS)
  // ─────────────────────────────────────────────────────────────
  renderContenido: function() {
    const container = document.getElementById('repaso-content');
    if (!container) return;
    
    const materiales = this.materiales[this.estado.gradoActual];
    if (!materiales) {
      container.innerHTML = this.renderEstadoVacio();
      return;
    }
    
    // Categorías disponibles
    const categorias = Object.keys(materiales);
    
    // Renderizar tabs de categorías (CON ACCESIBILIDAD)
    let html = `
      <div class="categorias-tabs" 
           style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;overflow-x:auto;"
           role="tablist"
           aria-label="Categorías de repaso">
        <button class="categoria-btn ${this.estado.categoriaActual === 'todos' ? 'active' : ''}" 
                data-categoria="todos"
                role="tab"
                aria-selected="${this.estado.categoriaActual === 'todos'}"
                style="min-height:44px;">
          📋 Todos
        </button>
        ${categorias.map(cat => `
          <button class="categoria-btn ${this.estado.categoriaActual === cat ? 'active' : ''}" 
                  data-categoria="${cat}"
                  role="tab"
                  aria-selected="${this.estado.categoriaActual === cat}"
                  style="min-height:44px;">
            ${this.getIconoCategoria(cat)} ${this.getNombreCategoria(cat)}
          </button>
        `).join('')}
      </div>
      
      <div class="actividades-grid" 
           style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;"
           role="region"
           aria-label="Actividades de repaso">
    `;
    
    // Renderizar tarjetas por categoría
    categorias.forEach(categoria => {
      const items = materiales[categoria];
      const completadas = this.contarCompletadas(categoria, items);
      
      // Filtrar por categoría actual
      if (this.estado.categoriaActual !== 'todos' && this.estado.categoriaActual !== categoria) {
        return;
      }
      
      html += `
        <article class="card actividad-card" 
                 data-categoria="${categoria}"
                 style="border:2px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;transition:all 0.3s;"
                 role="listitem">
          <div class="card-header" 
               style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));padding:16px;display:flex;justify-content:space-between;align-items:center;">
            <div class="card-title" style="color:var(--primary);font-size:16px;font-weight:700;">
              ${this.getIconoCategoria(categoria)} ${this.getNombreCategoria(categoria)}
            </div>
            ${completadas > 0 ? `
              <span style="font-size:12px;background:var(--success);color:white;padding:4px 10px;border-radius:20px;" 
                    aria-label="${completadas} de ${items.length} completadas">
                ✓ ${completadas}/${items.length}
              </span>
            ` : ''}
          </div>
          <div class="card-body" style="padding:16px;">
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;">
              ${items.slice(0, 5).map(item => {
                const completada = this.estaCompletada(categoria, item.id);
                return `
                  <button class="item-btn" 
                          data-categoria="${categoria}" 
                          data-item-id="${item.id}"
                          style="aspect-ratio:1;background:${completada ? 'var(--success-light)' : 'var(--bg2)'};
                                 border:2px solid ${completada ? 'var(--success)' : 'var(--border)'};
                                 border-radius:12px;font-size:24px;cursor:pointer;
                                 transition:all 0.2s;position:relative;"
                          aria-label="${this.getItemLabel(item, categoria)}${completada ? ' (completado)' : ''}"
                          title="${this.getItemLabel(item, categoria)}">
                    ${this.getItemIcono(item, categoria)}
                    ${completada ? `<span style="position:absolute;top:2px;right:2px;font-size:12px;">✓</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>
            <button class="topbar-btn primary btn-ver-todas" 
                    data-categoria="${categoria}"
                    style="width:100%;margin-top:16px;min-height:44px;"
                    aria-label="Ver todas las actividades de ${this.getNombreCategoria(categoria)}">
              🎮 Ver todas (${items.length})
            </button>
          </div>
        </article>
      `;
    });
    
    html += '</div>';
    container.innerHTML = html;
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR CATEGORÍA (CON ACTUALIZACIÓN VISUAL)
  // ─────────────────────────────────────────────────────────────
  filtrarPorCategoria: function(categoria) {
    this.estado.categoriaActual = categoria;
    
    // Actualizar botones activos (CON ACCESIBILIDAD)
    document.querySelectorAll('.categoria-btn').forEach(btn => {
      const esActiva = btn.dataset.categoria === categoria;
      btn.classList.toggle('active', esActiva);
      btn.setAttribute('aria-selected', esActiva);
    });
    
    // Filtrar tarjetas con animación
    document.querySelectorAll('.actividad-card').forEach(card => {
      const cat = card.dataset.categoria;
      if (categoria === 'todos' || cat === categoria) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Analytics
    this.registrarEvento('categoria_filtrada', { categoria });
    
    console.log('📚 Categoría filtrada:', categoria);
  },
  
  // ─────────────────────────────────────────────────────────────
  // ABRIR ACTIVIDAD (MODAL CON WEB SPEECH API)
  // ─────────────────────────────────────────────────────────────
  abrirActividad: function(categoria, itemId) {
    const materiales = this.materiales[this.estado.gradoActual];
    const item = materiales?.[categoria]?.find(i => i.id === itemId);
    
    if (!item) {
      console.error('❌ Item no encontrado:', itemId);
      window.app?.mostrarToast('⚠️ Actividad no disponible', 'error');
      return;
    }
    
    // Crear modal con estructura accesible
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-actividad-repaso';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-repaso-title');
    
    // ✅ Click en overlay para cerrar
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.cerrarModalActividad(modal);
      }
    });
    
    // ✅ Cerrar con Escape
    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.cerrarModalActividad(modal);
        document.removeEventListener('keydown', onKeydown);
      }
    };
    document.addEventListener('keydown', onKeydown);
    
    // Contenido del modal
    const titulo = item.letra || item.numero || item.color || item.nombre || item.figura || item.operacion || item.vocal || item.palabra || item.silaba;
    const subtitulo = item.palabra || item.ejemplo || item.sonido || '';
    const icono = this.getItemIcono(item, categoria);
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;text-align:center;" role="document">
        <div class="modal-header">
          <h2 id="modal-repaso-title" class="modal-title" style="font-size:18px;">
            ${this.getIconoCategoria(categoria)} ${this.getNombreCategoria(categoria)}
          </h2>
          <button class="modal-close" aria-label="Cerrar actividad" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        <div class="modal-body" style="padding:40px 24px;">
          <div style="font-size:80px;margin-bottom:20px;" aria-hidden="true">${icono}</div>
          <h2 style="color:var(--primary);font-size:32px;margin-bottom:8px;">${titulo}</h2>
          ${subtitulo ? `<p style="color:var(--ink2);font-size:18px;">${subtitulo}</p>` : ''}
          
          <!-- Botón de voz (Web Speech API) -->
          <button id="btn-leer-repaso" 
                  class="topbar-btn ghost" 
                  style="margin:20px 0;min-height:44px;"
                  aria-label="Escuchar en voz alta">
            🔊 Escuchar
          </button>
          
          <!-- Audio HTML5 si existe -->
          ${item.audio ? `
            <audio id="audio-repaso" src="assets/sounds/${item.audio}" style="display:none;"></audio>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;flex-wrap:wrap;">
          <button class="btn-cerrar-repaso topbar-btn ghost" style="min-width:120px;min-height:48px;">
            ❌ Cerrar
          </button>
          <button class="btn-terminar-repaso topbar-btn primary" style="min-width:150px;min-height:48px;" autofocus>
            ¡Entendido! ✅
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // ✅ Configurar listeners para botones
    const btnCerrarHeader = modal.querySelector('.modal-close');
    const btnCerrarFooter = modal.querySelector('.btn-cerrar-repaso');
    const btnTerminar = modal.querySelector('.btn-terminar-repaso');
    const btnLeer = modal.querySelector('#btn-leer-repaso');
    
    const cerrarYRegistrar = () => {
      this.cerrarModalActividad(modal, onKeydown);
      this.registrarProgreso(categoria, itemId);
    };
    
    if (btnCerrarHeader) btnCerrarHeader.addEventListener('click', cerrarYRegistrar);
    if (btnCerrarFooter) btnCerrarFooter.addEventListener('click', cerrarYRegistrar);
    if (btnTerminar) btnTerminar.addEventListener('click', cerrarYRegistrar);
    
    // ✅ Web Speech API: leer contenido
    if (btnLeer) {
      btnLeer.addEventListener('click', () => {
        const texto = `${titulo}. ${subtitulo || ''}`;
        this.leerTextoEnVozAlta(texto);
      });
    }
    
    // ✅ Enfocar botón principal para accesibilidad
    setTimeout(() => btnTerminar?.focus(), 100);
    
    // ✅ Leer automáticamente si los sonidos están activados
    if (this.estado.sonidosActivos) {
      setTimeout(() => {
        const texto = `Repaso de ${this.getNombreCategoria(categoria)}: ${titulo}. ${subtitulo || ''}`;
        this.leerTextoEnVozAlta(texto);
      }, 500);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // HELPER: CERRAR MODAL DE ACTIVIDAD
  // ─────────────────────────────────────────────────────────────
  cerrarModalActividad: function(modal, onKeydownCallback) {
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
    console.log('📚 Modal de actividad cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // ABRIR CATEGORÍA COMPLETA (VISTA EXPANDIDA)
  // ─────────────────────────────────────────────────────────────
  abrirCategoria: function(categoria) {
    const materiales = this.materiales[this.estado.gradoActual];
    const items = materiales?.[categoria];
    
    if (!items) {
      window.app?.mostrarToast('⚠️ Categoría no disponible', 'error');
      return;
    }
    
    // Feedback inicial
    window.app?.mostrarToast(`🎮 Abriendo ${this.getNombreCategoria(categoria)}...`, 'info');
    
    // Crear modal de vista completa
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-categoria-completa';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
    
    modal.innerHTML = `
      <div class="modal-content" style="max-width:700px;max-height:90vh;overflow-y:auto;" role="document">
        <div class="modal-header">
          <h2 class="modal-title">${this.getIconoCategoria(categoria)} ${this.getNombreCategoria(categoria)} - ${this.estado.gradoActual.replace('kinder', 'Kinder ')}</h2>
          <button class="modal-close" onclick="this.closest('.modal')?.remove()" style="min-width:44px;min-height:44px;">✕</button>
        </div>
        <div class="modal-body" style="padding:24px;">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:12px;">
            ${items.map(item => `
              <button class="item-btn-large" 
                      onclick="features.repaso.abrirActividad('${categoria}', '${item.id}');this.closest('.modal')?.remove()"
                      style="aspect-ratio:1;background:var(--bg2);border:2px solid var(--border);
                             border-radius:16px;font-size:32px;cursor:pointer;transition:all 0.2s;
                             display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;"
                      aria-label="${this.getItemLabel(item, categoria)}">
                <span style="font-size:40px;">${this.getItemIcono(item, categoria)}</span>
                <span style="font-size:12px;color:var(--ink2);">${item.palabra || item.ejemplo || item.numero || ''}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="this.closest('.modal')?.remove()" class="topbar-btn primary" style="min-width:150px;min-height:48px;">
            ✅ ¡Terminé!
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Registrar que se vio la categoría
    this.registrarEvento('categoria_abierta', { categoria, itemsCount: items.length });
  },
  
  // ─────────────────────────────────────────────────────────────
  // REGISTRAR PROGRESO DE ACTIVIDAD
  // ─────────────────────────────────────────────────────────────
  registrarProgreso: function(categoria, itemId) {
    const clave = `${this.estado.gradoActual}.${categoria}.${itemId}`;
    
    // Si ya está completada, no registrar de nuevo
    if (this.estado.progreso[clave]) {
      return;
    }
    
    // Registrar como completada
    this.estado.progreso[clave] = {
      completada: true,
      fecha: new Date().toISOString(),
      grado: this.estado.gradoActual,
      categoria: categoria
    };
    
    // Guardar en localStorage
    try {
      localStorage.setItem('aprende_jugando_repaso_progreso', JSON.stringify(this.estado.progreso));
    } catch (error) {
      console.warn('⚠️ Error guardando progreso:', error);
    }
    
    // Dar recompensa si el módulo de progreso existe
    if (window.features?.progreso?.agregarEstrellas) {
      window.features.progreso.agregarEstrellas(1, `Repaso: ${this.getNombreCategoria(categoria)}`);
    }
    
    // Feedback visual
    this.renderContenido();
    
    // Analytics
    this.registrarEvento('actividad_completada', { categoria, itemId, grado: this.estado.gradoActual });
    
    console.log('✅ Progreso registrado:', clave);
  },
  
  // ─────────────────────────────────────────────────────────────
  // CONTAR ACTIVIDADES COMPLETADAS EN UNA CATEGORÍA
  // ─────────────────────────────────────────────────────────────
  contarCompletadas: function(categoria, items) {
    return items.filter(item => {
      const clave = `${this.estado.gradoActual}.${categoria}.${item.id}`;
      return this.estado.progreso[clave]?.completada;
    }).length;
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR SI UN ITEM ESTÁ COMPLETADO
  // ─────────────────────────────────────────────────────────────
  estaCompletada: function(categoria, itemId) {
    const clave = `${this.estado.gradoActual}.${categoria}.${itemId}`;
    return !!this.estado.progreso[clave]?.completada;
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR ESTADO VACÍO
  // ─────────────────────────────────────────────────────────────
  renderEstadoVacio: function() {
    return `
      <div style="text-align:center;padding:60px 20px;color:var(--ink3);" role="status">
        <div style="font-size:64px;margin-bottom:16px;" aria-hidden="true">📭</div>
        <h3 style="color:var(--ink);font-size:18px;margin-bottom:8px;">Próximamente</h3>
        <p style="font-size:14px;">Estamos creando más materiales de repaso para este grado</p>
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // ANUNCIAR CAMBIO DE GRADO (ACCESIBILIDAD)
  // ─────────────────────────────────────────────────────────────
  anunciarCambioGrado: function() {
    const anuncio = document.createElement('div');
    anuncio.setAttribute('role', 'status');
    anuncio.setAttribute('aria-live', 'polite');
    anuncio.setAttribute('style', 'position:absolute;left:-9999px;');
    const nombreGrado = this.estado.gradoActual.replace('kinder', 'Kinder ');
    anuncio.textContent = `Mostrando material de repaso de ${nombreGrado}`;
    document.body.appendChild(anuncio);
    setTimeout(() => anuncio.remove(), 1000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // WEB SPEECH API - LEER TEXTO EN VOZ ALTA
  // ─────────────────────────────────────────────────────────────
  leerTextoEnVozAlta: function(texto, idioma = 'es-MX') {
    if (!this.estado.sonidosActivos) return false;
    if (!('speechSynthesis' in window)) return false;
    
    // Cancelar cualquier audio previo
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = idioma;
    utterance.rate = 0.9; // Ligeramente más lento para niños
    utterance.pitch = 1.1; // Un poco más agudo, más amigable
    utterance.volume = 1;
    
    // Seleccionar voz en español de México si está disponible
    const voces = window.speechSynthesis.getVoices();
    const vozMexico = voces.find(v => 
      v.lang.includes('es-MX') || 
      v.lang.includes('es-US') ||
      v.name.toLowerCase().includes('spanish') ||
      v.name.toLowerCase().includes('español')
    );
    
    if (vozMexico) {
      utterance.voice = vozMexico;
      console.log('🎤 Usando voz:', vozMexico.name);
    }
    
    // Eventos
    utterance.onstart = () => console.log('🗣️ Leyendo:', texto.substring(0, 30) + '...');
    utterance.onend = () => console.log('✅ Lectura completada');
    
    window.speechSynthesis.speak(utterance);
    return true;
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SONIDOS
  // ─────────────────────────────────────────────────────────────
  toggleSonidos: function() {
    this.estado.sonidosActivos = !this.estado.sonidosActivos;
    localStorage.setItem('aprende_jugando_sonidos', JSON.stringify(this.estado.sonidosActivos));
    
    const mensaje = this.estado.sonidosActivos 
      ? '🔊 Sonidos y voz activados' 
      : '🔇 Sonidos y voz desactivados';
    
    window.app?.mostrarToast(mensaje, 'info');
    
    // Si se activan, probar con un sonido de test
    if (this.estado.sonidosActivos) {
      setTimeout(() => {
        this.leerTextoEnVozAlta('Sonidos de repaso activados');
      }, 300);
    }
    
    this.registrarEvento('sonidos_toggle', { activado: this.estado.sonidosActivos });
  },
  
  // ─────────────────────────────────────────────────────────────
  // REGISTRAR EVENTO PARA ANALYTICS
  // ─────────────────────────────────────────────────────────────
  registrarEvento: function(nombreEvento, datos) {
    console.log(`📊 Analytics Repaso: ${nombreEvento}`, datos);
    // Placeholder para integración con Google Analytics, Firebase, etc.
  },
  
  // ─────────────────────────────────────────────────────────────
  // UTILIDADES DE ICONOS Y NOMBRES
  // ─────────────────────────────────────────────────────────────
  getIconoCategoria: function(cat) {
    const iconos = {
      letras: '🔤',
      numeros: '🔢',
      colores: '🎨',
      animales: '🦁',
      figuras: '🔷',
      sumas: '➕',
      vocales: '🅰️',
      silabas: '🔠',
      palabras: '📖'
    };
    return iconos[cat] || '📚';
  },
  
  getNombreCategoria: function(cat) {
    const nombres = {
      letras: 'Letras',
      numeros: 'Números',
      colores: 'Colores',
      animales: 'Animales',
      figuras: 'Figuras',
      sumas: 'Sumas',
      vocales: 'Vocales',
      silabas: 'Sílabas',
      palabras: 'Palabras'
    };
    return nombres[cat] || cat;
  },
  
  getItemIcono: function(item, categoria) {
    if (item.imagen) return item.imagen;
    if (item.letra) return item.letra;
    if (item.numero) return item.numero;
    if (item.color) return '🎨';
    if (item.nombre) return '🐾';
    if (item.figura) return item.figura;
    if (item.operacion) return '🧮';
    if (item.vocal) return item.vocal;
    if (item.palabra) return item.palabra;
    if (item.silaba) return item.silaba;
    return '⭐';
  },
  
  getItemLabel: function(item, categoria) {
    const nombreCat = this.getNombreCategoria(categoria);
    const valor = item.letra || item.numero || item.color || item.nombre || item.figura || item.operacion || item.vocal || item.palabra || item.silaba;
    const extra = item.palabra || item.ejemplo || item.sonido || '';
    return `${nombreCat}: ${valor}${extra ? ` - ${extra}` : ''}`;
  },
  
  // ─────────────────────────────────────────────────────────────
  // EXPORTAR PROGRESO (PARA RESPALDO)
  // ─────────────────────────────────────────────────────────────
  exportarProgreso: function() {
    return {
      version: '3.0',
      grado: this.estado.gradoActual,
      progreso: this.estado.progreso,
      exportado: new Date().toISOString()
    };
  },
  
  // ─────────────────────────────────────────────────────────────
  // IMPORTAR PROGRESO (PARA RESTAURAR)
  // ─────────────────────────────────────────────────────────────
  importarProgreso: function(datos) {
    try {
      if (!datos?.progreso) {
        throw new Error('Formato de progreso inválido');
      }
      this.estado.progreso = datos.progreso;
      if (datos.grado && this.materiales[datos.grado]) {
        this.estado.gradoActual = datos.grado;
      }
      localStorage.setItem('aprende_jugando_repaso_progreso', JSON.stringify(this.estado.progreso));
      this.renderContenido();
      console.log('✅ Progreso de repaso importado');
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
  if (window.features?.repaso?.init) {
    // Pequeño delay para asegurar dependencias cargadas
    setTimeout(() => {
      window.features.repaso.init();
    }, 100);
  }
});

console.log('✅ repaso.js v3.0 listo');
