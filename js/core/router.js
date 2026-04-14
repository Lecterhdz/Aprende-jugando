// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - ROUTER (NAVEGACIÓN CENTRALIZADA)
// ═══════════════════════════════════════════════════════════════

console.log('🧭 router.js cargado');

window.router = {
  pantallaActual: 'auth-screen',
  historial: [],
  sidebarAbierto: false,
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR ROUTER
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('🧭 Router inicializado');
    
    // Configurar eventos de navegación (sidebar)
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const screenId = item.getAttribute('data-screen');
        if (screenId) {
          this.navegar(screenId + '-screen');
        }
      });
    });
    
    // Configurar eventos de navegación (bottom-nav móvil)
    document.querySelectorAll('.bottom-nav .bn-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const screenId = item.getAttribute('data-screen');
        if (screenId) {
          this.navegar(screenId + '-screen');
        }
      });
    });
    
    // Configurar eventos de navegación (botones con onclick fallback)
    document.querySelectorAll('[onclick*="mostrarPantalla"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const onclick = btn.getAttribute('onclick') || '';
        const match = onclick.match(/mostrarPantalla\(['"]([^'"]+)['"]\)/);
        if (match && match[1]) {
          e.preventDefault();
          this.navegar(match[1]);
        }
      });
    });
    
    // Escape key para cerrar sidebar/menús
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.sidebarAbierto) {
          this.cerrarSidebar();
        }
      }
    });
    
    // Resize para ajustar sidebar responsive
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.ajustarResponsive();
      }, 150);
    });
    
    // Inicializar estado responsive
    this.ajustarResponsive();
  },
  
  // ─────────────────────────────────────────────────────────────
  // NAVEGAR A PANTALLA
  // ─────────────────────────────────────────────────────────────
  navegar: function(screenId, guardarHistorial = true) {
    try {
      // Validar que la pantalla existe
      const pantalla = document.getElementById(screenId);
      if (!pantalla) {
        console.error('❌ Pantalla no encontrada:', screenId);
        return false;
      }
      
      // Guardar en historial (si no es la misma pantalla)
      if (guardarHistorial && this.pantallaActual !== screenId) {
        this.historial.push(this.pantallaActual);
      }
      
      // Ocultar todas las pantallas
      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
      });
      
      // Mostrar pantalla seleccionada
      pantalla.classList.add('active');
      this.pantallaActual = screenId;
      
      // Guardar preferencia en localStorage
      localStorage.setItem('aprende_jugando_pantalla', screenId);
      
      // Actualizar UI
      this.actualizarMenuActivo(screenId);
      this.actualizarTopbar(screenId);
      this.actualizarBottomNav(screenId);
      
      // En móvil: cerrar sidebar después de navegar
      if (window.innerWidth <= 768) {
        this.cerrarSidebar();
      }
      
      // Scroll suave al inicio del contenido
      const content = document.querySelector('.content');
      if (content) {
        content.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Disparar evento de cambio de pantalla
      window.dispatchEvent(new CustomEvent('screen-change', { 
        detail: { pantalla: screenId } 
      }));
      
      console.log('🧭 Navegando a:', screenId);
      return true;
      
    } catch (error) {
      console.error('❌ Error navegando:', error);
      return false;
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VOLVER ATRÁS
  // ─────────────────────────────────────────────────────────────
  volver: function() {
    if (this.historial.length > 0) {
      const pantallaAnterior = this.historial.pop();
      this.navegar(pantallaAnterior, false);
    } else {
      this.navegar('dashboard-screen', false);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR MENÚ ACTIVO (SIDEBAR + BOTTOM-NAV)
  // ─────────────────────────────────────────────────────────────
  actualizarMenuActivo: function(screenId) {
    // Sidebar nav-items
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.classList.remove('active');
      const dataScreen = item.getAttribute('data-screen');
      if (dataScreen && (dataScreen + '-screen') === screenId) {
        item.classList.add('active');
      }
    });
    
    // Bottom-nav items (móvil)
    const mapaNav = {
      'dashboard-screen': 'dashboard',
      'repaso-screen': 'repaso',
      'tareas-screen': 'tareas',
      'progreso-screen': 'progreso',
      'padres-screen': 'padres',
      'licencia-screen': 'licencia'
    };
    
    const navKey = mapaNav[screenId];
    document.querySelectorAll('.bottom-nav .bn-item').forEach(item => {
      item.classList.remove('active');
      const dataScreen = item.getAttribute('data-screen');
      if (dataScreen === navKey) {
        item.classList.add('active');
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR TOPBAR (TÍTULO Y SUBTÍTULO)
  // ─────────────────────────────────────────────────────────────
  actualizarTopbar: function(screenId) {
    const titulos = {
      'auth-screen': ['Aprende-jugando', 'Actividades para preescolar ✨'],
      'dashboard-screen': ['Inicio', '¡Hola, explorador! 👋'],
      'repaso-screen': ['Repaso', 'Practica lo aprendido 🔄'],
      'proyectos-screen': ['Proyectos', 'Crea y aprende 🛠️'],
      'tareas-screen': ['Tareas', 'Actividades divertidas ✏️'],
      'sabias-que-screen': ['Sabías Que', 'Datos curiosos 💡'],
      'progreso-screen': ['Mi Progreso', 'Tus logros y estrellas ⭐'],
      'padres-screen': ['Para Papás', 'Configuración y reportes 👨‍👩‍👧'],
      'licencia-screen': ['Planes', 'Elige tu plan ideal 💳']
    };
    
    const [titulo, subtitulo] = titulos[screenId] || ['Aprende-jugando', ''];
    
    const elTitulo = document.getElementById('page-title');
    const elSubtitulo = document.getElementById('page-subtitle');
    
    if (elTitulo) {
      elTitulo.textContent = titulo;
      // Animación sutil de cambio
      elTitulo.style.opacity = '0';
      setTimeout(() => {
        elTitulo.style.opacity = '1';
      }, 100);
    }
    if (elSubtitulo) elSubtitulo.textContent = subtitulo;
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR BOTTOM-NAV (MÓVIL)
  // ─────────────────────────────────────────────────────────────
  actualizarBottomNav: function(screenId) {
    // Ya se maneja en actualizarMenuActivo()
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SIDEBAR (MÓVIL)
  // ─────────────────────────────────────────────────────────────
  toggleSidebar: function() {
    if (this.sidebarAbierto) {
      this.cerrarSidebar();
    } else {
      this.abrirSidebar();
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // ABRIR SIDEBAR
  // ─────────────────────────────────────────────────────────────
  abrirSidebar: function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar) return;
    
    sidebar.classList.add('visible');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    this.sidebarAbierto = true;
    console.log('🧭 Sidebar abierto');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR SIDEBAR
  // ─────────────────────────────────────────────────────────────
  cerrarSidebar: function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar) {
      sidebar.classList.remove('visible');
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
    
    document.body.style.overflow = '';
    this.sidebarAbierto = false;
    console.log('🧭 Sidebar cerrado');
  },
  
  // ─────────────────────────────────────────────────────────────
  // AJUSTAR RESPONSIVE (DESKTOP/MÓVIL)
  // ─────────────────────────────────────────────────────────────
  ajustarResponsive: function() {
    const esDesktop = window.innerWidth >= 1025;
    const sidebar = document.querySelector('.sidebar');
    
    if (esDesktop) {
      // En desktop: sidebar siempre visible, overlay oculto
      if (sidebar) {
        sidebar.classList.add('visible');
        sidebar.classList.remove('open');
      }
      document.getElementById('sidebar-overlay')?.classList.remove('active');
      document.body.style.overflow = '';
      this.sidebarAbierto = false;
    } else {
      // En móvil: sidebar solo con clase .visible
      if (sidebar && !this.sidebarAbierto) {
        sidebar.classList.remove('visible');
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // OBTENER PANTALLA ACTUAL
  // ─────────────────────────────────────────────────────────────
  getPantallaActual: function() {
    return this.pantallaActual;
  },
  
  // ─────────────────────────────────────────────────────────────
  // LIMPIAR HISTORIAL
  // ─────────────────────────────────────────────────────────────
  limpiarHistorial: function() {
    this.historial = [];
  }
};

// ─────────────────────────────────────────────────────────────
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.router) {
    window.router.init();
    
    // Restaurar pantalla guardada (solo si ya está autenticado)
    const pantallaGuardada = localStorage.getItem('aprende_jugando_pantalla');
    if (pantallaGuardada && pantallaGuardada !== 'auth-screen') {
      // Esperar un poco para asegurar que la app está inicializada
      setTimeout(() => {
        if (window.app?.esAdmin) {
          window.router.navegar(pantallaGuardada, false);
        }
      }, 300);
    }
  }
});

// ─────────────────────────────────────────────────────────────
// EXPORTAR PARA USO GLOBAL
// ─────────────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.router;
}

console.log('✅ router.js listo');
