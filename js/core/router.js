// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - ROUTER (NAVEGACIÓN)
// ═══════════════════════════════════════════════════════════════

console.log('🧭 router.js cargado');

window.router = {
  pantallaActual: 'auth-screen',
  historial: [],
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR ROUTER
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('🧭 Router inicializado');
    
    // Escuchar cambios de pantalla
    document.querySelectorAll('[data-screen]').forEach(element => {
      element.addEventListener('click', (e) => {
        const screenId = element.getAttribute('data-screen');
        if (screenId) {
          this.navegar(screenId + '-screen');
        }
      });
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // NAVEGAR A PANTALLA
  // ─────────────────────────────────────────────────────────────
  navegar: function(screenId) {
    try {
      // Validar que la pantalla existe
      const pantalla = document.getElementById(screenId);
      if (!pantalla) {
        console.error('❌ Pantalla no encontrada:', screenId);
        return false;
      }
      
      // Guardar en historial
      if (this.pantallaActual !== screenId) {
        this.historial.push(this.pantallaActual);
      }
      
      // Ocultar todas las pantallas
      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
      });
      
      // Mostrar pantalla seleccionada
      pantalla.classList.add('active');
      this.pantallaActual = screenId;
      
      // Actualizar UI
      this.actualizarMenuActivo(screenId);
      this.actualizarTopbar(screenId);
      this.actualizarBottomNav(screenId);
      
      // En móvil: cerrar sidebar
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar?.classList.remove('visible');
        overlay?.classList.remove('active');
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
      this.navegar(pantallaAnterior);
    } else {
      this.navegar('dashboard-screen');
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR MENÚ ACTIVO
  // ─────────────────────────────────────────────────────────────
  actualizarMenuActivo: function(screenId) {
    // Sidebar
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.classList.remove('active');
      const onclick = item.getAttribute('onclick') || '';
      if (onclick.includes(screenId)) {
        item.classList.add('active');
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR TOPBAR
  // ─────────────────────────────────────────────────────────────
  actualizarTopbar: function(screenId) {
    const titulos = {
      'auth-screen': ['Aprende-jugando', 'Actividades para preescolar'],
      'dashboard-screen': ['Inicio', '¡Hola, explorador!'],
      'repaso-screen': ['Repaso', 'Practica lo aprendido'],
      'proyectos-screen': ['Proyectos', 'Crea y aprende'],
      'tareas-screen': ['Tareas', 'Actividades divertidas'],
      'sabias-que-screen': ['Sabías Que', 'Datos curiosos'],
      'progreso-screen': ['Mi Progreso', 'Tus logros y estrellas'],
      'padres-screen': ['Para Papás', 'Configuración y reportes']
    };
    
    const [titulo, subtitulo] = titulos[screenId] || ['Aprende-jugando', ''];
    
    const elTitulo = document.getElementById('page-title');
    const elSubtitulo = document.getElementById('page-subtitle');
    
    if (elTitulo) elTitulo.textContent = titulo;
    if (elSubtitulo) elSubtitulo.textContent = subtitulo;
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR BOTTOM NAV (MÓVIL)
  // ─────────────────────────────────────────────────────────────
  actualizarBottomNav: function(screenId) {
    const mapaNav = {
      'dashboard-screen': 'dashboard',
      'repaso-screen': 'repaso',
      'tareas-screen': 'tareas',
      'progreso-screen': 'progreso',
      'padres-screen': 'padres'
    };
    
    const navKey = mapaNav[screenId];
    
    document.querySelectorAll('.bottom-nav .bn-item').forEach(item => {
      item.classList.remove('active');
      const dataScreen = item.getAttribute('data-screen');
      if (dataScreen === navKey) {
        item.classList.add('active');
      }
    });
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.router) {
    window.router.init();
  }
});

console.log('✅ router.js listo');
