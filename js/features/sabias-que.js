// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - SABÍAS QUE (DATOS CURIOSOS)
// ═══════════════════════════════════════════════════════════════

console.log('💡 sabias-que.js cargado');

window.features.sabiasQue = {
  
  // Datos curiosos por categoría
  datos: {
    animales: [
      { id: 'a1', dato: '🐘 Los elefantes pueden reconocer su reflejo en un espejo', ilustracion: '🐘', nivel: 'kinder2' },
      { id: 'a2', dato: '🦒 La lengua de una jirafa mide hasta 50 cm', ilustracion: '🦒', nivel: 'kinder3' },
      { id: 'a3', dato: '🐙 Los pulpos tienen 3 corazones', ilustracion: '🐙', nivel: 'kinder3' },
      { id: 'a4', dato: '🐄 Las vacas tienen mejores amigas', ilustracion: '🐄', nivel: 'kinder1' },
      { id: 'a5', dato: '🐝 Las abejas bailan para comunicarse', ilustracion: '🐝', nivel: 'kinder2' }
    ],
    cuerpo: [
      { id: 'c1', dato: '❤️ Tu corazón late como 100,000 veces al día', ilustracion: '❤️', nivel: 'kinder3' },
      { id: 'c2', dato: '👃 Tu nariz puede recordar 50,000 olores', ilustracion: '👃', nivel: 'kinder2' },
      { id: 'c3', dato: '👶 Los bebés nacen sin rótulas', ilustracion: '👶', nivel: 'kinder3' },
      { id: 'c4', dato: '🦷 Los dientes de leche se llaman así por su color blanco', ilustracion: '🦷', nivel: 'kinder1' }
    ],
    naturaleza: [
      { id: 'n1', dato: '🌈 El arcoíris tiene 7 colores', ilustracion: '🌈', nivel: 'kinder1' },
      { id: 'n2', dato: '🌻 Los girasoles siguen al sol', ilustracion: '🌻', nivel: 'kinder2' },
      { id: 'n3', dato: '🌧️ Las nubes están hechas de agua', ilustracion: '🌧️', nivel: 'kinder1' },
      { id: 'n4', dato: '🌙 La Luna no tiene luz propia', ilustracion: '🌙', nivel: 'kinder3' }
    ],
    numeros: [
      { id: 'num1', dato: '🔢 El número 0 fue inventado en India', ilustracion: '🔢', nivel: 'kinder3' },
      { id: 'num2', dato: '✌️ El 2 es el único número par primo', ilustracion: '✌️', nivel: 'kinder3' },
      { id: 'num3', dato: '🎲 Los dados tienen puntos que suman 21', ilustracion: '🎲', nivel: 'kinder2' }
    ],
    letras: [
      { id: 'l1', dato: '🅰️ La A es la letra más usada en español', ilustracion: '🅰️', nivel: 'kinder2' },
      { id: 'l2', dato: '📝 Las palabras más largas tienen más letras', ilustracion: '📝', nivel: 'kinder1' },
      { id: 'l3', dato: '🔤 El alfabeto tiene 27 letras en español', ilustracion: '🔤', nivel: 'kinder3' }
    ]
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('💡 Sabías Que inicializado');
    
    window.addEventListener('screen-change', (e) => {
      if (e.detail.pantalla === 'sabias-que-screen') {
        this.cargar();
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR DATOS
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('💡 Cargando datos curiosos');
    this.renderCategorias();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR CATEGORÍAS
  // ─────────────────────────────────────────────────────────────
  renderCategorias: function() {
    const container = document.getElementById('sabias-que-content');
    if (!container) return;
    
    const categorias = Object.keys(this.datos);
    
    container.innerHTML = `
      <div class="categorias-tabs" style="display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;overflow-x:auto;">
        <button class="categoria-btn active" onclick="features.sabiasQue.filtrarPorCategoria('todos')"
                style="padding:8px 16px;background:var(--primary);color:white;border:none;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;">
          📋 Todos
        </button>
        ${categorias.map(cat => `
          <button class="categoria-btn" onclick="features.sabiasQue.filtrarPorCategoria('${cat}')"
                  style="padding:8px 16px;background:var(--bg2);color:var(--ink2);border:none;border-radius:20px;font-size:13px;font-weight:600;cursor:pointer;">
            ${this.getIconoCategoria(cat)} ${this.getNombreCategoria(cat)}
          </button>
        `).join('')}
      </div>
      
      <div class="curiosidades-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        ${this.renderDatos('todos')}
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR DATOS
  // ─────────────────────────────────────────────────────────────
  renderDatos: function(categoria) {
    let todosLosDatos = [];
    
    if (categoria === 'todos') {
      Object.values(this.datos).forEach(arr => {
        todosLosDatos = todosLosDatos.concat(arr);
      });
    } else {
      todosLosDatos = this.datos[categoria] || [];
    }
    
    // Filtrar por grado del usuario
    const grado = localStorage.getItem('aprende_jugando_grado') || 'kinder1';
    const datosFiltrados = todosLosDatos.filter(d => {
      const nivelNum = parseInt(d.nivel.replace('kinder', ''));
      const gradoNum = parseInt(grado.replace('kinder', ''));
      return nivelNum <= gradoNum;
    });
    
    if (datosFiltrados.length === 0) {
      return `
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--ink3);">
          <div style="font-size:48px;margin-bottom:10px;">📭</div>
          <div style="font-size:14px;font-weight:600;">Próximamente más datos</div>
        </div>
      `;
    }
    
    return datosFiltrados.map(dato => `
      <div class="curiosidad-card" style="background:var(--surface);border:2px solid var(--border);border-radius:var(--radius-lg);padding:20px;cursor:pointer;transition:all 0.3s;"
           onclick="features.sabiasQue.abrirDato('${dato.id}')"
           onmouseover="this.style.borderColor='var(--primary)';this.style.transform='translateY(-4px)';this.style.boxShadow='var(--shadow)'"
           onmouseout="this.style.borderColor='var(--border)';this.style.transform='translateY(0)';this.style.boxShadow='var(--shadow-sm)'">
        <div style="font-size:48px;margin-bottom:12px;text-align:center;">${dato.ilustracion}</div>
        <p style="color:var(--ink2);font-size:14px;line-height:1.6;text-align:center;">${dato.dato}</p>
        <div style="margin-top:16px;text-align:center;">
          <span style="font-size:11px;background:var(--bg2);padding:4px 12px;border-radius:20px;color:var(--ink3);">
            ${this.getNombreCategoria(categoria)}
          </span>
        </div>
      </div>
    `).join('');
  },
  
  // ─────────────────────────────────────────────────────────────
  // FILTRAR POR CATEGORÍA
  // ─────────────────────────────────────────────────────────────
  filtrarPorCategoria: function(categoria) {
    // Actualizar botones
    document.querySelectorAll('.categorias-tabs .categoria-btn').forEach(btn => {
      btn.style.background = 'var(--bg2)';
      btn.style.color = 'var(--ink2)';
    });
    event.target.style.background = 'var(--primary)';
    event.target.style.color = 'white';
    
    // Re-renderizar
    const grid = document.querySelector('.curiosidades-grid');
    if (grid) {
      grid.innerHTML = this.renderDatos(categoria);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // ABRIR DATO (MODAL)
  // ─────────────────────────────────────────────────────────────
  abrirDato: function(datoId) {
    let dato = null;
    Object.values(this.datos).forEach(arr => {
      const encontrado = arr.find(d => d.id === datoId);
      if (encontrado) dato = encontrado;
    });
    
    if (!dato) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-sabias-que';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:500px;text-align:center;">
        <div class="modal-header">
          <div class="modal-title">💡 ¿Sabías Que?</div>
          <button class="modal-close" onclick="this.closest('.modal').remove()">✕</button>
        </div>
        <div class="modal-body" style="padding:40px 24px;">
          <div style="font-size:80px;margin-bottom:20px;animation:bounce 2s infinite;">${dato.ilustracion}</div>
          <p style="color:var(--ink);font-size:18px;line-height:1.6;">${dato.dato}</p>
          <div style="margin-top:24px;background:var(--primary-light);padding:16px;border-radius:var(--radius-sm);">
            <div style="font-size:12px;color:var(--primary);font-weight:600;">⭐ +1 estrella por aprender</div>
          </div>
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="features.sabiasQue.registrarVista('${dato.id}');this.closest('.modal').remove()" 
                  class="topbar-btn primary" style="min-width:150px;">
            ¡Qué interesante! 🎉
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  },
  
  // ─────────────────────────────────────────────────────────────
  // REGISTRAR VISTA
  // ─────────────────────────────────────────────────────────────
  registrarVista: function(datoId) {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    if (!progreso.sabiasQue) progreso.sabiasQue = [];
    
    if (!progreso.sabiasQue.includes(datoId)) {
      progreso.sabiasQue.push(datoId);
      localStorage.setItem('aprende_jugando_progreso', JSON.stringify(progreso));
      
      // Dar recompensa
      if (window.features.progreso) {
        window.features.progreso.agregarEstrellas(1, 'Dato curioso aprendido');
      }
      
      window.app?.mostrarToast('¡Aprendiste algo nuevo! ⭐', 'success');
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // UTILIDADES
  // ─────────────────────────────────────────────────────────────
  getIconoCategoria: function(cat) {
    const iconos = {
      animales: '🦁',
      cuerpo: '👶',
      naturaleza: '🌈',
      numeros: '🔢',
      letras: '🔤'
    };
    return iconos[cat] || '💡';
  },
  
  getNombreCategoria: function(cat) {
    const nombres = {
      animales: 'Animales',
      cuerpo: 'Cuerpo',
      naturaleza: 'Naturaleza',
      numeros: 'Números',
      letras: 'Letras'
    };
    return nombres[cat] || cat;
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.sabiasQue) {
    window.features.sabiasQue.init();
  }
});

console.log('✅ sabias-que.js listo');
