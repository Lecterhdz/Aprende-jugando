// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - SIDEBAR COMPONENT (CORREGIDO)
// ═══════════════════════════════════════════════════════════════

console.log('📱 sidebar.js cargado');

window.sidebar = {
  abierto: false,
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR SIDEBAR
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('📱 Sidebar inicializado');
    
    // Ajustar estado inicial según tamaño de pantalla
    this.ajustarResponsive();
    
    // Configurar eventos
    this.configurarEventos();
    
    // Cargar información de usuario
    this.cargarInfoUsuario();
    
    // Escuchar cambios de tamaño de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.ajustarResponsive(), 150);
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CONFIGURAR EVENTOS (SIN DUPLICADOS CON ROUTER)
  // ─────────────────────────────────────────────────────────────
  configurarEventos: function() {
    // Toggle sidebar con hamburguesa
    const btnHamburger = document.querySelector('.hamburger-btn, .btn-hamburger');
    if (btnHamburger) {
      btnHamburger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggle();
      });
    }
    
    // Cerrar con overlay click
    const overlay = document.getElementById('sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.cerrar());
    }
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.abierto) {
        this.cerrar();
      }
    });
    
    // ✅ Navegación: NO agregar listeners aquí para evitar duplicados con router
    // El router ya maneja los clicks en [data-screen]
    // Solo aseguramos que el sidebar se cierre después de navegar (en móvil)
    window.addEventListener('screen-change', (e) => {
      if (window.innerWidth <= 768 && this.abierto) {
        this.cerrar();
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SIDEBAR (MÓVIL ONLY)
  // ─────────────────────────────────────────────────────────────
  toggle: function() {
    // En desktop, no hacer toggle (sidebar siempre visible)
    if (window.innerWidth >= 1025) {
      return;
    }
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar) return;
    
    this.abierto = !this.abierto;
    
    if (this.abierto) {
      sidebar.classList.add('visible');
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      console.log('📱 Sidebar abierto (móvil)');
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
  // AJUSTAR RESPONSIVE (DESKTOP/MÓVIL)
  // ─────────────────────────────────────────────────────────────
  ajustarResponsive: function() {
    const esDesktop = window.innerWidth >= 1025;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const hamburger = document.querySelector('.hamburger-btn, .btn-hamburger');
    
    if (!sidebar) return;
    
    if (esDesktop) {
      // Desktop: sidebar siempre visible, sin overlay, sin hamburger
      sidebar.classList.add('visible');
      sidebar.classList.remove('open'); // Remover clase de móvil si existe
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
      this.abierto = false;
      
      // Ocultar hamburger en desktop (por si acaso)
      if (hamburger) hamburger.style.display = 'none';
      
      console.log('🖥️ Sidebar en modo desktop');
    } else {
      // Móvil: sidebar oculto por defecto, mostrar hamburger
      if (!this.abierto) {
        sidebar.classList.remove('visible');
      }
      
      // Mostrar hamburger en móvil
      if (hamburger) hamburger.style.display = 'flex';
      
      console.log('📱 Sidebar en modo móvil');
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR INFO DE USUARIO
  // ─────────────────────────────────────────────────────────────
  cargarInfoUsuario: function() {
    const userNameEl = document.getElementById('user-name');
    const userAvatarEl = document.querySelector('.user-avatar');
    
    // Intentar obtener datos de app o auth
    let nombre = 'Pequeño Explorador';
    
    if (window.app?.usuarioActual?.displayName) {
      nombre = window.app.usuarioActual.displayName.split(' ')[0];
    } else if (window.pwaAuth?.usuarioActual?.displayName) {
      nombre = window.pwaAuth.usuarioActual.displayName.split(' ')[0];
    }
    
    if (userNameEl) {
      userNameEl.textContent = nombre;
    }
    if (userAvatarEl) {
      userAvatarEl.textContent = this.generarAvatar(nombre);
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
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR ESTADO DEL MENÚ ACTIVO
  // ─────────────────────────────────────────────────────────────
  actualizarMenuActivo: function(screenId) {
    // Remover active de todos
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Agregar active al correspondiente
    const itemActivo = document.querySelector(`.sidebar .nav-item[data-screen="${screenId.replace('-screen', '')}"]`);
    if (itemActivo) {
      itemActivo.classList.add('active');
    }
  }
};

// ─────────────────────────────────────────────────────────────
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.sidebar) {
    window.sidebar.init();
  }
});

// ─────────────────────────────────────────────────────────────
// EXPORTAR PARA USO GLOBAL (compatibilidad con index.html)
// ─────────────────────────────────────────────────────────────
window.components = window.components || {};
window.components.sidebar = {
  toggle: () => window.sidebar?.toggle(),
  cerrar: () => window.sidebar?.cerrar(),
  abrir: () => {
    if (window.sidebar && !window.sidebar.abierto) {
      window.sidebar.abierto = true;
      window.sidebar.toggle();
    }
  }
};

console.log('✅ sidebar.js listo');
