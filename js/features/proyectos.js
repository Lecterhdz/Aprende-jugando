// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - PROYECTOS CREATIVOS (CORREGIDO v2.0)
// ═══════════════════════════════════════════════════════════════

console.log('🛠️ proyectos.js cargado');

// Variable temporal para guardar el proyecto actual
let proyectoActualId = null;

window.features.proyectos = {
  
  // Catálogo de proyectos por grado
  proyectos: {
    kinder1: [
      {
        id: 'p1',
        titulo: 'Collage de Animales',
        descripcion: 'Crea un collage con animales de la granja',
        dificultad: '⭐',
        tiempo: '15 min',
        materiales: ['Revistas viejas', 'Tijeras de punta roma', 'Pegamento', 'Cartulina'],
        pasos: [
          'Busca imágenes de animales en las revistas',
          'Recorta con ayuda de un adulto',
          'Pégalas en la cartulina formando una escena',
          '¡Dibuja el sol y las nubes!'
        ],
        habilidades: ['Motricidad fina', 'Creatividad', 'Reconocimiento de animales'],
        recompensa: 5
      },
      {
        id: 'p2',
        titulo: 'Marco de Fotos',
        descripcion: 'Decora un marco para tu foto favorita',
        dificultad: '⭐',
        tiempo: '20 min',
        materiales: ['Cartón', 'Pinturas', 'Pincel', 'Foto'],
        pasos: [
          'Recorta el cartón en forma de marco',
          'Pinta el marco del color que quieras',
          'Decora con brillantina o stickers',
          'Pega tu foto en el centro'
        ],
        habilidades: ['Creatividad', 'Pintura', 'Decoración'],
        recompensa: 5
      }
    ],
    kinder2: [
      {
        id: 'p3',
        titulo: 'Máscara de Animal',
        descripcion: 'Crea una máscara de tu animal favorito',
        dificultad: '⭐⭐',
        tiempo: '25 min',
        materiales: ['Plato de cartón', 'Palito de helado', 'Pinturas', 'Tijeras'],
        pasos: [
          'Dibuja la cara del animal en el plato',
          'Recorta los ojos para poder ver',
          'Pinta la máscara',
          'Pega el palito para sostenerla'
        ],
        habilidades: ['Motricidad fina', 'Imaginación', 'Pintura'],
        recompensa: 7
      }
    ],
    kinder3: [
      {
        id: 'p4',
        titulo: 'Castillo de Cartón',
        descripcion: 'Construye un castillo con cajas',
        dificultad: '⭐⭐⭐',
        tiempo: '45 min',
        materiales: ['Cajas de cartón', 'Cinta adhesiva', 'Pinturas', 'Tijeras'],
        pasos: [
          'Consigue varias cajas de diferentes tamaños',
          'Únelas con cinta adhesiva',
          'Recorta ventanas y puertas',
          'Pinta tu castillo como quieras'
        ],
        habilidades: ['Construcción', 'Planificación', 'Trabajo en equipo'],
        recompensa: 10
      }
    ]
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR PROYECTOS
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('🛠️ Proyectos inicializados');
    
    window.addEventListener('screen-change', (e) => {
      if (e.detail?.pantalla === 'proyectos-screen') {
        this.cargar();
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR PROYECTOS
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('🛠️ Cargando proyectos');
    this.renderProyectos();
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR PROYECTOS
  // ─────────────────────────────────────────────────────────────
  renderProyectos: function() {
    const container = document.getElementById('proyectos-content');
    if (!container) return;
    
    // Obtener grado actual del usuario
    const grado = localStorage.getItem('aprende_jugando_grado') || 'kinder1';
    const proyectos = this.proyectos[grado] || this.proyectos.kinder1;
    
    if (!proyectos || proyectos.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px;color:var(--ink3);">
          <div style="font-size:64px;margin-bottom:16px;">🎨</div>
          <div style="font-size:18px;font-weight:600;">Próximamente más proyectos</div>
          <div style="font-size:14px;margin-top:8px;">Estamos creando actividades nuevas</div>
        </div>
      `;
      return;
    }
    
    container.innerHTML = `
      <div class="proyectos-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;">
        ${proyectos.map(proyecto => `
          <div class="card proyecto-card" style="border:2px solid var(--border);border-radius:var(--radius-lg);overflow:hidden;transition:all 0.3s;">
            <div class="card-header" style="background:linear-gradient(135deg,var(--secondary-light),var(--primary-light));padding:20px;">
              <div class="card-title" style="color:var(--secondary);font-size:18px;">
                🛠️ ${proyecto.titulo}
              </div>
              <div style="display:flex;gap:12px;margin-top:8px;">
                <span style="font-size:12px;background:var(--surface);padding:4px 10px;border-radius:20px;">${proyecto.dificultad}</span>
                <span style="font-size:12px;background:var(--surface);padding:4px 10px;border-radius:20px;">⏱️ ${proyecto.tiempo}</span>
              </div>
            </div>
            <div class="card-body" style="padding:20px;">
              <p style="color:var(--ink2);font-size:14px;margin-bottom:16px;">${proyecto.descripcion}</p>
              
              <div style="margin-bottom:16px;">
                <div style="font-size:12px;color:var(--ink3);margin-bottom:8px;">📦 Materiales:</div>
                <div style="display:flex;flex-wrap:wrap;gap:6px;">
                  ${proyecto.materiales.map(m => `
                    <span style="font-size:11px;background:var(--bg2);padding:4px 8px;border-radius:12px;">${m}</span>
                  `).join('')}
                </div>
              </div>
              
              <div style="margin-bottom:16px;">
                <div style="font-size:12px;color:var(--ink3);margin-bottom:8px;">⭐ Recompensa:</div>
                <div style="font-size:20px;font-weight:700;color:var(--accent);">⭐ ${proyecto.recompensa}</div>
              </div>
              
              <button class="topbar-btn primary" onclick="features.proyectos.verInstructivo('${proyecto.id}')"
                      style="width:100%;min-height:48px;font-size:15px;">
                📋 Ver Instructivo
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    // Agregar efectos hover con JS (más confiable que inline onmouseover)
    container.querySelectorAll('.proyecto-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.borderColor = 'var(--secondary)';
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = 'var(--shadow)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'var(--border)';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow-sm)';
      });
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // VER INSTRUCTIVO (CORREGIDO)
  // ─────────────────────────────────────────────────────────────
  verInstructivo: function(proyectoId) {
    console.log('📋 Ver instructivo:', proyectoId);
    
    const grado = localStorage.getItem('aprende_jugando_grado') || 'kinder1';
    const proyecto = this.proyectos[grado]?.find(p => p.id === proyectoId);
    
    if (!proyecto) {
      console.error('❌ Proyecto no encontrado:', proyectoId);
      window.app?.mostrarToast('⚠️ Proyecto no disponible', 'error');
      return;
    }
    
    // Guardar ID para usar en marcarCompletado
    proyectoActualId = proyectoId;
    
    // Generar HTML del instructivo
    const instruccionHTML = `
      <div style="text-align:left;">
        <p style="margin-bottom:16px;color:var(--ink2);font-size:15px;">${proyecto.descripcion}</p>
        
        <h4 style="color:var(--primary);margin:16px 0 8px 0;font-size:16px;">📦 Materiales:</h4>
        <ul style="margin-bottom:16px;padding-left:20px;color:var(--ink2);line-height:1.8;">
          ${proyecto.materiales.map(m => `<li>${m}</li>`).join('')}
        </ul>
        
        <h4 style="color:var(--primary);margin:16px 0 8px 0;font-size:16px;">📋 Pasos:</h4>
        <ol style="padding-left:20px;color:var(--ink2);line-height:1.8;">
          ${proyecto.pasos.map((p, i) => `<li style="margin-bottom:8px;"><strong style="color:var(--secondary);">Paso ${i+1}:</strong> ${p}</li>`).join('')}
        </ol>
        
        <div style="background:var(--bg2);padding:12px;border-radius:var(--radius-sm);margin-top:16px;">
          <div style="font-size:13px;color:var(--ink3);">⭐ Al completar:</div>
          <div style="font-size:24px;font-weight:700;color:var(--accent);margin-top:4px;">+${proyecto.recompensa} estrellas</div>
        </div>
      </div>
    `;
    
    // Abrir modal con datos CORRECTOS
    if (window.components?.modal?.abrir) {
      window.components.modal.abrir('modal-instructivo', {
        titulo: `🛠️ ${proyecto.titulo}`,
        instruccion: instruccionHTML
      });
    } else {
      // Fallback: abrir modal manualmente
      const modal = document.getElementById('modal-instructivo');
      if (modal) {
        document.getElementById('modal-instructivo-titulo').textContent = `🛠️ ${proyecto.titulo}`;
        document.getElementById('modal-instructivo-body').innerHTML = instruccionHTML;
        modal.classList.add('active');
        if (modal.tagName === 'DIALOG' && typeof modal.showModal === 'function') {
          modal.showModal();
        }
        document.body.style.overflow = 'hidden';
      }
    }
    
    // Registrar vista
    this.registrarVista(proyectoId);
  },
  
  // ─────────────────────────────────────────────────────────────
  // MARCAR COMPLETADO (CORREGIDO - USA VARIABLE GLOBAL)
  // ─────────────────────────────────────────────────────────────
  marcarCompletado: function() {
    // Usar la variable global proyectoActualId
    if (!proyectoActualId) {
      console.warn('⚠️ No hay proyecto activo para marcar como completado');
      return;
    }
    
    const grado = localStorage.getItem('aprende_jugando_grado') || 'kinder1';
    const proyecto = this.proyectos[grado]?.find(p => p.id === proyectoActualId);
    
    if (!proyecto) {
      console.error('❌ Proyecto no encontrado:', proyectoActualId);
      return;
    }
    
    // Guardar progreso
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    if (!progreso.proyectos) progreso.proyectos = [];
    
    if (!progreso.proyectos.includes(proyectoActualId)) {
      progreso.proyectos.push(proyectoActualId);
      localStorage.setItem('aprende_jugando_progreso', JSON.stringify(progreso));
      
      // Dar recompensa
      if (window.features?.progreso?.agregarEstrellas) {
        window.features.progreso.agregarEstrellas(
          proyecto.recompensa, 
          `Proyecto: ${proyecto.titulo}`
        );
      }
      
      window.app?.mostrarToast(`✅ ${proyecto.titulo} completado +${proyecto.recompensa}⭐`, 'success');
    }
    
    // Cerrar modal
    if (window.components?.modal?.cerrar) {
      window.components.modal.cerrar('modal-instructivo');
    } else {
      const modal = document.getElementById('modal-instructivo');
      if (modal) {
        modal.classList.remove('active');
        if (modal.tagName === 'DIALOG' && typeof modal.close === 'function') {
          modal.close();
        }
        document.body.style.overflow = '';
      }
    }
    
    // Resetear variable
    proyectoActualId = null;
    
    // Refrescar UI
    this.renderProyectos();
  },
  
  // ─────────────────────────────────────────────────────────────
  // REGISTRAR VISTA
  // ─────────────────────────────────────────────────────────────
  registrarVista: function(proyectoId) {
    const vistas = JSON.parse(localStorage.getItem('aprende_jugando_vistas_proyectos') || '[]');
    if (!vistas.includes(proyectoId)) {
      vistas.push(proyectoId);
      localStorage.setItem('aprende_jugando_vistas_proyectos', JSON.stringify(vistas));
    }
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.proyectos) {
    window.features.proyectos.init();
  }
});

console.log('✅ proyectos.js listo');
