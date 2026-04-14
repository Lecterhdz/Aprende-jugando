// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - PROGRESO Y RECOMPENSAS
// ═══════════════════════════════════════════════════════════════

console.log('⭐ progreso.js cargado');

window.features.progreso = {
  
  // Logros disponibles
  logros: [
    { id: 'primeros-pasos', titulo: '👣 Primeros Pasos', desc: 'Completa tu primera actividad', estrellas: 5, requisito: 1 },
    { id: 'artista', titulo: '🎨 Pequeño Artista', desc: 'Termina 5 actividades de colorear', estrellas: 10, requisito: 5 },
    { id: 'curioso', titulo: '🔍 Pequeño Científico', desc: 'Lee 10 "Sabías Que"', estrellas: 10, requisito: 10 },
    { id: 'constante', titulo: '⭐ Constancia', desc: 'Usa Aprende-jugando 7 días seguidos', estrellas: 20, requisito: 7 },
    { id: 'matematico', titulo: '🧮 Matemático', desc: 'Completa 10 tareas de conteo', estrellas: 15, requisito: 10 },
    { id: 'lector', titulo: '📖 Lector', desc: 'Aprende 15 letras nuevas', estrellas: 15, requisito: 15 },
    { id: 'maestro', titulo: '🎓 Maestro', desc: 'Completa 50 actividades', estrellas: 50, requisito: 50 },
    { id: 'leyenda', titulo: '🏆 Leyenda', desc: 'Obtén 500 estrellas', estrellas: 100, requisito: 500 }
  ],
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('⭐ Progreso inicializado');
    
    window.addEventListener('screen-change', (e) => {
      if (e.detail.pantalla === 'progreso-screen') {
        this.cargar();
      }
    });
    
    // Actualizar contador de estrellas en topbar
    this.actualizarContadorEstrellas();
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR PROGRESO
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('⭐ Cargando progreso');
    this.actualizarEstadisticas();
    this.renderLogros();
  },
  
  // ─────────────────────────────────────────────────────────────
  // AGREGAR ESTRELLAS
  // ─────────────────────────────────────────────────────────────
  agregarEstrellas: function(cantidad, motivo = '') {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    progreso.estrellas = (progreso.estrellas || 0) + cantidad;
    localStorage.setItem('aprende_jugando_progreso', JSON.stringify(progreso));
    
    this.actualizarContadorEstrellas();
    this.actualizarEstadisticas();
    
    // Mostrar animación
    this.mostrarAnimacionEstrellas(cantidad);
    
    console.log(`⭐ +${cantidad} estrellas (${motivo})`);
    
    // Verificar logros
    this.verificarLogros();
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR ANIMACIÓN
  // ─────────────────────────────────────────────────────────────
  mostrarAnimacionEstrellas: function(cantidad) {
    const container = document.createElement('div');
    container.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      z-index:10000;pointer-events:none;
    `;
    container.innerHTML = `
      <div style="font-size:80px;animation:bounce 1s infinite;">⭐</div>
      <div style="font-size:32px;font-weight:800;color:var(--primary);text-align:center;margin-top:10px;">+${cantidad}</div>
    `;
    
    document.body.appendChild(container);
    
    setTimeout(() => {
      container.style.transition = 'all 0.5s';
      container.style.opacity = '0';
      container.style.transform = 'translate(-50%,-100%)';
      setTimeout(() => container.remove(), 500);
    }, 1500);
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR CONTADOR (TOPBAR)
  // ─────────────────────────────────────────────────────────────
  actualizarContadorEstrellas: function() {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    const contador = document.getElementById('stars-count');
    if (contador) {
      contador.textContent = progreso.estrellas || 0;
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR ESTADÍSTICAS
  // ─────────────────────────────────────────────────────────────
  actualizarEstadisticas: function() {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    
    // Estrellas totales
    const elEstrellas = document.getElementById('total-estrellas');
    if (elEstrellas) elEstrellas.textContent = progreso.estrellas || 0;
    
    // Tareas completadas
    const tareasCompletadas = (progreso.tareas || []).length;
    const elTareas = document.getElementById('tareas-completadas');
    if (elTareas) elTareas.textContent = tareasCompletadas;
    
    // Logros desbloqueados
    const logrosDesbloqueados = this.getLogrosDesbloqueados().length;
    const elLogros = document.getElementById('logros-desbloqueados');
    if (elLogros) elLogros.textContent = logrosDesbloqueados;
    
    // Días de racha
    const elRacha = document.getElementById('dias-racha');
    if (elRacha) elRacha.textContent = progreso.racha || 0;
  },
  
  // ─────────────────────────────────────────────────────────────
  // RENDERIZAR LOGROS
  // ─────────────────────────────────────────────────────────────
  renderLogros: function() {
    const container = document.getElementById('logros-content');
    if (!container) return;
    
    const logrosDesbloqueados = this.getLogrosDesbloqueados();
    
    if (logrosDesbloqueados.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px;color:var(--ink3);">
          <div style="font-size:48px;margin-bottom:10px;">🔒</div>
          <div style="font-size:14px;font-weight:600;">Completa actividades para desbloquear logros</div>
        </div>
      `;
      return;
    }
    
    container.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px;">
        ${logrosDesbloqueados.map(logro => `
          <div class="logro-card" style="background:linear-gradient(135deg,var(--primary-light),var(--secondary-light));border:2px solid var(--primary);border-radius:var(--radius-lg);padding:20px;text-align:center;">
            <div style="font-size:40px;margin-bottom:8px;">🏅</div>
            <div style="font-size:14px;font-weight:700;color:var(--ink);margin-bottom:4px;">${logro.titulo}</div>
            <div style="font-size:12px;color:var(--ink2);margin-bottom:12px;">${logro.desc}</div>
            <div style="font-size:11px;background:var(--primary);color:white;padding:4px 12px;border-radius:20px;display:inline-block;">
              ⭐ ${logro.estrellas}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // OBTENER LOGROS DESBLOQUEADOS
  // ─────────────────────────────────────────────────────────────
  getLogrosDesbloqueados: function() {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    const totalEstrellas = progreso.estrellas || 0;
    const totalActividades = (progreso.tareas || []).length + (progreso.sabiasQue || []).length;
    
    return this.logros.filter(logro => {
      if (logro.requisito >= 100) {
        return totalEstrellas >= logro.requisito;
      }
      return totalActividades >= logro.requisito;
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR LOGROS
  // ─────────────────────────────────────────────────────────────
  verificarLogros: function() {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    const logrosNuevos = this.getLogrosDesbloqueados().filter(
      l => !progreso.logrosDesbloqueados?.includes(l.id)
    );
    
    logrosNuevos.forEach(logro => {
      this.mostrarLogroDesbloqueado(logro);
      
      if (!progreso.logrosDesbloqueados) progreso.logrosDesbloqueados = [];
      progreso.logrosDesbloqueados.push(logro.id);
      localStorage.setItem('aprende_jugando_progreso', JSON.stringify(progreso));
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR LOGRO DESBLOQUEADO
  // ─────────────────────────────────────────────────────────────
  mostrarLogroDesbloqueado: function(logro) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'modal-logro';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:400px;text-align:center;">
        <div class="modal-body" style="padding:48px 24px;">
          <div style="font-size:80px;margin-bottom:16px;animation:bounce 1s infinite;">🏆</div>
          <h3 style="color:var(--primary);margin-bottom:8px;">¡Logro Desbloqueado!</h3>
          <p style="font-size:18px;font-weight:700;color:var(--ink);margin-bottom:8px;">${logro.titulo}</p>
          <p style="font-size:14px;color:var(--ink2);margin-bottom:24px;">${logro.desc}</p>
          <div style="font-size:32px;margin-top:16px;">⭐ +${logro.estrellas}</div>
        </div>
        <div class="modal-footer" style="justify-content:center;">
          <button onclick="this.closest('.modal').remove()" class="topbar-btn primary" style="min-width:150px;">
            ¡Genial! 🎉
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Agregar estrellas del logro
    setTimeout(() => {
      this.agregarEstrellas(logro.estrellas, `Logro: ${logro.titulo}`);
    }, 1000);
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.progreso) {
    window.features.progreso.init();
  }
});

console.log('✅ progreso.js listo');
