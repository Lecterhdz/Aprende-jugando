// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - GESTIÓN DE TEMAS
// ═══════════════════════════════════════════════════════════════

console.log('🎨 theme.js cargado');

window.theme = {
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR TEMA
  // ─────────────────────────────────────────────────────────────
  init: function() {
    const temaGuardado = localStorage.getItem('aprende_jugando_tema');
    const temaPreferido = temaGuardado || 'claro';
    
    this.aplicarTema(temaPreferido);
    
    console.log('🎨 Tema inicial:', temaPreferido);
  },
  
  // ─────────────────────────────────────────────────────────────
  // APLICAR TEMA
  // ─────────────────────────────────────────────────────────────
  aplicarTema: function(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    localStorage.setItem('aprende_jugando_tema', tema);
    
    // Actualizar botón de tema si existe
    const btn = document.querySelector('.btn-theme');
    if (btn) {
      btn.textContent = tema === 'claro' ? '🌙' : '☀️';
    }
    
    console.log('🎨 Tema aplicado:', tema);
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE TEMA
  // ─────────────────────────────────────────────────────────────
  toggle: function() {
    const temaActual = document.documentElement.getAttribute('data-theme');
    const nuevoTema = temaActual === 'claro' ? 'oscuro' : 'claro';
    
    this.aplicarTema(nuevoTema);
    
    console.log('🎨 Tema cambiado a:', nuevoTema);
  },
  
  // ─────────────────────────────────────────────────────────────
  // OBTENER TEMA ACTUAL
  // ─────────────────────────────────────────────────────────────
  getTemaActual: function() {
    return document.documentElement.getAttribute('data-theme') || 'claro';
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.theme.init();
});

console.log('✅ theme.js listo');
