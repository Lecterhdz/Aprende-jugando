// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - MATERIAL DE REPASO
// ═══════════════════════════════════════════════════════════════

console.log('📚 repaso.js cargado');

window.features.repaso = {
  gradoActual: 'kinder1',
  categoriaActual: 'todos',
  
  // Datos de repaso por grado y categoría
  materiales: {
    kinder1: {
      letras: [
        { id: 'l1', letra: 'A', imagen: '🍎', palabra: 'Manzana', audio: 'a.mp3' },
        { id: 'l2', letra: 'B', imagen: '🐻', palabra: 'Oso', audio: 'b.mp3' },
        { id: 'l3', letra: 'C', imagen: '🐱', palabra: 'Gato', audio: 'c.mp3' },
        { id: 'l4', letra: 'D', imagen: '🐶', palabra: 'Perro', audio: 'd.mp3' },
        { id: 'l5', letra: 'E', imagen: '🐘', palabra: 'Elefante', audio: 'e.mp3' }
      ],
      numeros: [
        { id: 'n1', numero: 1, imagen: '☝️', palabra: 'Uno' },
        { id: 'n2', numero: 2, imagen: '✌️', palabra: 'Dos' },
        { id: 'n3', numero: 3, imagen: '🤟', palabra: 'Tres' },
        { id: 'n4', numero: 4, imagen: '🖐️', palabra: 'Cuatro' },
        { id: 'n5', numero: 5, imagen: '🖐️', palabra: 'Cinco' }
      ],
      colores: [
        { id: 'c1', color: 'Rojo', hex: '#FF6B9D', ejemplo: '🍎' },
        { id: 'c2', color: 'Azul', hex: '#4ECDC4', ejemplo: '🦋' },
        { id: 'c3', color: 'Amarillo', hex: '#FFE66D', ejemplo: '🌻' },
        { id: 'c4', color: 'Verde', hex: '#95E1D3', ejemplo: '🐸' },
        { id: 'c5', color: 'Naranja', hex: '#F38181', ejemplo: '🍊' }
      ],
      animales: [
        { id: 'a1', nombre: 'Vaca', imagen: '🐄', sonido: 'Muuu' },
        { id: 'a2', nombre: 'Perro', imagen: '🐶', sonido: 'Guau' },
        { id: 'a3', nombre: 'Gato', imagen: '🐱', sonido: 'Miau' },
        { id: 'a4', nombre: 'Pato', imagen: '🦆', sonido: 'Cuac' },
        { id: 'a5', nombre: 'Oveja', imagen: '🐑', sonido: 'Beee' }
      ]
    },
    kinder2: {
      letras: [
        { id: 'l6', letra: 'F', imagen: '🦊', palabra: 'Zorro' },
        { id: 'l7', letra: 'G', imagen: '🦒', palabra: 'Jirafa' },
        { id: 'l8', letra: 'H', imagen: '🐴', palabra: 'Caballo' },
        { id: 'l9', letra: 'I', imagen: '🦔', palabra: 'Erizo' },
        { id: 'l10', letra: 'J', imagen: '🐯', palabra: 'Tigre' }
      ],
      numeros: [
        { id: 'n6', numero: 6, imagen: '👌', palabra: 'Seis' },
        { id: 'n7', numero: 7, imagen: '🖐️+✌️', palabra: 'Siete' },
        { id: 'n8', numero: 8, imagen: '🖐️+🤟', palabra: 'Ocho' },
        { id: 'n9', numero: 9, imagen: '🖐️+🖐️-☝️', palabra: 'Nueve' },
        { id: 'n10', numero: 10, imagen: '👐', palabra: 'Diez' }
      ],
      figuras: [
        { id: 'f1', figura: 'Círculo', imagen: '🔵' },
        { id: 'f2', figura: 'Cuadrado', imagen: '🟦' },
        { id: 'f3', figura: 'Triángulo', imagen: '🔺' },
        { id: 'f4', figura: 'Rectángulo', imagen: '🟩' },
        { id: 'f5', figura: 'Estrella', imagen: '⭐' }
      ]
    },
    kinder3: {
      letras: [
        { id: 'l11', letra: 'K', imagen: '🐨', palabra: 'Koala' },
        { id: 'l12', letra: 'L', imagen: '🦁', palabra: 'León' },
        { id: 'l13', letra: 'M', imagen: '🐵', palabra: 'Mono' },
        { id: 'l14', letra: 'N', imagen: '🐼', palabra: 'Panda' },
        { id: 'l15', letra: 'Ñ', imagen: '🐑', palabra: 'Ñu' }
      ],
      sumas: [
        { id: 's1', operacion: '1 + 1', resultado: 2 },
        { id: 's2', operacion: '2 + 2', resultado: 4 },
        { id: 's3', operacion: '3 + 1', resultado: 4 },
        { id: 's4', operacion: '5 + 0', resultado: 5 },
        { id: 's5', operacion: '3 + 3', resultado: 6 }
      ],
      vocales: [
        { id: 'v1', vocal: 'A', ejemplo: 'Avión' },
        { id: 'v2', vocal: 'E', ejemplo: 'Escuela' },
        { id: 'v3', vocal: 'I', ejemplo: 'Iglesia' },
        { id: 'v4', vocal: 'O', ejemplo: 'Oso' },
        { id: 'v5', vocal: 'U', ejemplo: 'Uva' }
      ]
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR REPASO
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('📚 Repaso inicializado');
    
    // Escuchar cuando se muestra la pantalla
    window.addEventListener('screen-change', (e) => {
      if (e.detail.pantalla === 'repaso-screen') {
        this.cargar();
      }
    });
    
    // Renderizar selector de grado
    this.renderSelectorGrado();
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR MATERIAL DE REPASO
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('📚 Cargando material de repaso:', this.gradoActual);
    this.renderContenido();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR SELECTOR DE GRADO
  // ─────────────────────────────────────────────────────────────
  renderSelectorGrado: function() {
    const container = document.querySelector('.grado-selector');
    if (!container) return;
    
    container.innerHTML = `
      <button class="grado-btn ${this.gradoActual === 'kinder1' ? 'active' : ''}" 
              onclick="features.repaso.filtrarPorGrado('kinder1')">
        🧒 Kinder 1
      </button>
      <button class="grado-btn ${this.gradoActual === 'kinder2' ? 'active' : ''}" 
              onclick="features.repaso.filtrarPorGrado('kinder2')">
        🧒 Kinder 2
      </button>
      <button class="grado-btn ${this.gradoActual === 'kinder3' ? 'active' : ''}" 
              onclick="features.repaso.filtrarPorGrado('kinder3')">
        🧒 Kinder 3
      </button>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR GRADO
  // ─────────────────────────────────────────────────────────────
  filtrarPorGrado: function(grado) {
    this.gradoActual = grado;
    this.renderSelectorGrado();
    this.renderContenido();
    
    // Guardar preferencia
    localStorage.setItem('aprende_jugando_grado', grado);
    
    window.app?.mostrarToast(`📚 Material de ${grado.replace('kinder', 'Kinder ')}`, 'info');
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR CONTENIDO
  // ─────────────────────────────────────────────────────────────
  renderContenido: function() {
    const container = document.getElementById('repaso-content');
    if (!container) return;
    
    const materiales = this.materiales[this.gradoActual];
    if (!materiales) {
      container.innerHTML = '<p style="color:var(--ink3);text-align:center;">Cargando...</p>';
      return;
    }
    
    // Categorías disponibles
    const categorias = Object.keys(materiales);
    
    // Renderizar tabs de categorías
    let html = `
      <div class="categorias-tabs" style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;overflow-x:auto;">
        <button class="categoria-btn active" onclick="features.repaso.filtrarPorCategoria('todos')">
          📋 Todos
        </button>
        ${categorias.map(cat => `
          <button class="categoria-btn" onclick="features.repaso.filtrarPorCategoria('${cat}')">
            ${this.getIconoCategoria(cat)} ${this.getNombreCategoria(cat)}
          </button>
        `).join('')}
      </div>
      
      <div class="actividades-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
    `;
    
    // Renderizar tarjetas por categoría
    categorias.forEach(categoria => {
      const items = materiales[categoria];
      html += `
        <div class="card actividad-card" data-categoria="${categoria}" style="border:2px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;">
          <div class="card-header" style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));padding:16px;">
            <div class="card-title" style="color:var(--primary);font-size:16px;">
              ${this.getIconoCategoria(categoria)} ${this.getNombreCategoria(categoria)}
            </div>
          </div>
          <div class="card-body" style="padding:16px;">
            <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;">
              ${items.slice(0, 5).map(item => `
                <button class="item-btn" onclick="features.repaso.abrirActividad('${categoria}', '${item.id}')"
                        style="aspect-ratio:1;background:var(--bg2);border:2px solid var(--border);border-radius:12px;font-size:24px;cursor:pointer;transition:all 0.2s;"
                        onmouseover="this.style.borderColor='var(--primary)';this.style.transform='scale(1.05)'"
                        onmouseout="this.style.borderColor='var(--border)';this.style.transform='scale(1)'">
                  ${this.getItemIcono(item, categoria)}
                </button>
              `).join('')}
            </div>
            <button class="topbar-btn primary" onclick="features.repaso.abrirCategoria('${categoria}')"
                    style="width:100%;margin-top:16px;min-height:44px;">
              🎮 Ver todas las actividades
            </button>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    container.innerHTML = html;
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR CATEGORÍA
  // ─────────────────────────────────────────────────────────────
  filtrarPorCategoria: function(categoria) {
    this.categoriaActual = categoria;
    
    // Actualizar botones activos
    document.querySelectorAll('.categoria-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = '';
      btn.style.color = '';
    });
    event.target.classList.add('active');
    event.target.style.background = 'var(--primary)';
    event.target.style.color = 'white';
    
    // Filtrar tarjetas
    document.querySelectorAll('.actividad-card').forEach(card => {
      if (categoria === 'todos' || card.dataset.categoria === categoria) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // ABRIR ACTIVIDAD
  // ─────────────────────────────────────────────────────────────
  abrirActividad: function(categoria, itemId) {
    const item = this.materiales[this.gradoActual][categoria].find(i => i.id === itemId);
    if (!item) return;
    
    // Crear modal dinámico
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-actividad-repaso';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;text-align:center;">
        <div class="modal-header">
          <div class="modal-title">${this.getIconoCategoria(categoria)} ${this.getNombreCategoria(categoria)}</div>
          <button class="modal-close" onclick="this.closest('.modal').remove()">✕</button>
        </div>
        <div class="modal-body" style="padding:40px 24px;">
          <div style="font-size:80px;margin-bottom:20px;">${this.getItemIcono(item, categoria)}</div>
          <h2 style="color:var(--primary);font-size:32px;margin-bottom:8px;">${item.letra || item.numero || item.color || item.nombre || item.figura || item.operacion || item.vocal}</h2>
          <p style="color:var(--ink2);font-size:18px;">${item.palabra || item.ejemplo || item.sonido || ''}</p>
          ${item.audio ? `
            <button class="topbar-btn primary" onclick="this.parentElement.querySelector('audio')?.play()"
                    style="margin-top:20px;min-height:48px;">
              🔊 Escuchar
            </button>
            <audio src="assets/sounds/${item.audio}"></audio>
          ` : ''}
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="this.closest('.modal').remove()" class="topbar-btn primary" style="min-width:150px;">
            ¡Entendido! ✅
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Registrar progreso
    this.registrarProgreso(categoria, itemId);
  },
  
  // ─────────────────────────────────────────────────────────────
  // ABRIR CATEGORÍA COMPLETA
  // ─────────────────────────────────────────────────────────────
  abrirCategoria: function(categoria) {
    const items = this.materiales[this.gradoActual][categoria];
    if (!items) return;
    
    // Navegar a pantalla de actividad completa
    window.app?.mostrarToast(`🎮 Abriendo ${this.getNombreCategoria(categoria)}...`, 'info');
    
    // Aquí se implementaría la actividad interactiva completa
    setTimeout(() => {
      window.app?.mostrarToast('🚧 Actividad en desarrollo', 'info');
    }, 1000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // REGISTRAR PROGRESO
  // ─────────────────────────────────────────────────────────────
  registrarProgreso: function(categoria, itemId) {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    
    if (!progreso.repaso) progreso.repaso = {};
    if (!progreso.repaso[this.gradoActual]) progreso.repaso[this.gradoActual] = {};
    if (!progreso.repaso[this.gradoActual][categoria]) {
      progreso.repaso[this.gradoActual][categoria] = [];
    }
    
    if (!progreso.repaso[this.gradoActual][categoria].includes(itemId)) {
      progreso.repaso[this.gradoActual][categoria].push(itemId);
      localStorage.setItem('aprende_jugando_progreso', JSON.stringify(progreso));
      
      // Dar recompensa
      if (window.features.progreso) {
        window.features.progreso.agregarEstrellas(1, 'Repaso completado');
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // UTILIDADES
  // ─────────────────────────────────────────────────────────────
  getIconoCategoria: function(cat) {
    const iconos = {
      letras: '🔤',
      numeros: '🔢',
      colores: '🎨',
      animales: '🦁',
      figuras: '🔷',
      sumas: '➕',
      vocales: '🅰️'
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
      vocales: 'Vocales'
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
    return '⭐';
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.repaso) {
    window.features.repaso.init();
    
    // Cargar grado guardado
    const gradoGuardado = localStorage.getItem('aprende_jugando_grado');
    if (gradoGuardado) {
      window.features.repaso.gradoActual = gradoGuardado;
    }
  }
});

console.log('✅ repaso.js listo');
