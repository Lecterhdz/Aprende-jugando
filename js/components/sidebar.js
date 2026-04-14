// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - SIDEBAR COMPONENT
// ═══════════════════════════════════════════════════════════════

console.log('📱 sidebar.js cargado');

window.sidebar = {
  abierto: false,
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR SIDEBAR
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('📱 Sidebar inicializado');
    
    // Configurar eventos
    this.configurarEventos();
    
    // Cargar información de usuario
    this.cargarInfoUsuario();
  },
  
  // ─────────────────────────────────────────────────────────────
  // CONFIGURAR EVENTOS
  // ─────────────────────────────────────────────────────────────
  configurarEventos: function() {
    // Toggle sidebar (hamburguesa)
    const btnHamburger = document.querySelector('.btn-hamburger');
    if (btnHamburger) {
      btnHamburger.addEventListener('click', () => this.toggle());
    }
    
    // Cerrar con overlay
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.cerrar());
    }
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.abierto) {
        this.cerrar();
      }
    });
    
    // Navegación del sidebar
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const screenId = item.getAttribute('data-screen');
        if (screenId) {
          window.router?.navegar(screenId + '-screen');
        }
      });
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SIDEBAR
  // ─────────────────────────────────────────────────────────────
  toggle: function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar) return;
    
    this.abierto = !this.abierto;
    
    if (this.abierto) {
      sidebar.classList.add('visible');
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('📱 Sidebar abierto');
    } else {
      this.cerrar();
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR SIDEBAR
  // ─────────────────────────────────────────────────────────────
  cerrar: function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.remove('visible');
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
    
    this.abierto = false;
    document.body.style.overflow = '';
    console.log('📱 Sidebar cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR INFO DE USUARIO
  // ─────────────────────────────────────────────────────────────
  cargarInfoUsuario: function() {
    const userNameEl = document.getElementById('user-name');
    const userAvatarEl = document.querySelector('.user-avatar');
    
    if (window.app?.usuarioActual) {
      const user = window.app.usuarioActual;
      if (userNameEl) {
        userNameEl.textContent = user.displayName?.split(' ')[0] || 'Explorador';
      }
      if (userAvatarEl) {
        userAvatarEl.textContent = this.generarAvatar(user.displayName);
      }
    } else {
      if (userNameEl) userNameEl.textContent = 'Pequeño Explorador';
      if (userAvatarEl) userAvatarEl.textContent = '🧒';
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // GENERAR AVATAR CON INICIAL
  // ─────────────────────────────────────────────────────────────
  generarAvatar: function(nombre) {
    if (!nombre) return '🧒';
    const inicial = nombre.charAt(0).toUpperCase();
    const avatares = {
      'A': '🦁', 'B': '🐻', 'C': '🐱', 'D': '🐶', 'E': '🐘',
      'F': '🦊', 'G': '🦒', 'H': '🐴', 'I': '🦔', 'J': '🐯',
      'K': '🐨', 'L': '🦁', 'M': '🐵', 'N': '🐼', 'O': '🐙',
      'P': '🐧', 'Q': '🦅', 'R': '🦎', 'S': '🐍', 'T': '🐯',
      'U': '🦄', 'V': '🦅', 'W': '🐋', 'X': '🦊', 'Y': '🐄',
      'Z': '🦓'
    };
    return avatares[inicial] || '🧒';
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR BADGE DE NOTIFICACIONES
  // ─────────────────────────────────────────────────────────────
  actualizarBadge: function(elementId, count) {
    const badge = document.getElementById(elementId);
    if (badge) {
      badge.textContent = count > 0 ? count : '';
      badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.sidebar) {
    window.sidebar.init();
  }
});

console.log('✅ sidebar.js listo');
