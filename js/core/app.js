// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - APLICACIÓN PRINCIPAL
// ═══════════════════════════════════════════════════════════════

console.log('🚀 app.js cargado');
// ═══════════════════════════════════════════════════════════════
// NAMESPACE GLOBAL PARA FEATURES (EVITA ERRORES DE UNDEFINED)
// ═══════════════════════════════════════════════════════════════
window.features = window.features || {
  dashboard: {},
  repaso: {},
  proyectos: {},
  tareas: {},
  sabiasQue: {},
  progreso: {},
  padres: {}
};

console.log('📦 window.features inicializado');
window.app = {
  pantallaActual: 'auth-screen',
  esAdmin: false,
  usuarioActual: null,
  planActual: 'demo',
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR APP
  // ─────────────────────────────────────────────────────────────
  init: async function() {
    try {
      console.log('🚀 Aprende-jugando iniciando...');
      
      // Esperar a que pwaAuth se inicialice
      if (window.pwaAuth) {
        await new Promise(resolve => {
          const checkAuth = () => {
            if (window.pwaAuth.initialized !== undefined) {
              if (window.pwaAuth.initialized) {
                window.pwaAuth.onAuthSuccess = (user) => this.onAuthSuccess(user);
                window.pwaAuth.onAuthLogout = () => this.onAuthLogout();
              }
              resolve();
            } else {
              setTimeout(checkAuth, 100);
            }
          };
          checkAuth();
        });
      }
      
      // Inicializar tema
      if (window.theme) {
        window.theme.init();
      }
      
      // Verificar sesión
      this.verificarSesionAuth();
      
      // Mostrar pantalla inicial
      if (this.esAdmin) {
        this.mostrarPantalla('dashboard-screen');
      } else {
        this.mostrarPantalla('auth-screen');
      }
      
      console.log('✅ Aprende-jugando listo');
      console.log('🔐 Modo:', this.esAdmin ? 'ADMIN' : 'INVITADO');
      
    } catch (error) {
      console.error('❌ Error en inicialización:', error);
      this.mostrarToast('Error al iniciar: ' + error.message, 'error');
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR SESIÓN CON FIREBASE AUTH
  // ─────────────────────────────────────────────────────────────
  verificarSesionAuth: function() {
    try {
      if (!window.pwaAuth) {
        console.warn('⚠️ pwaAuth no disponible');
        this.esAdmin = false;
        return false;
      }
      
      const user = window.pwaAuth.usuarioActual();
      
      if (user) {
        this.esAdmin = true;
        this.usuarioActual = user;
        console.log('✅ Sesión auth válida:', user.email);
        return true;
      }
      
      this.esAdmin = false;
      return false;
      
    } catch (error) {
      console.error('❌ Error verificando sesión:', error);
      this.esAdmin = false;
      return false;
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR PANTALLA
  // ─────────────────────────────────────────────────────────────
  mostrarPantalla: function(pantallaId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Mostrar pantalla seleccionada
    const pantalla = document.getElementById(pantallaId);
    if (pantalla) {
      pantalla.classList.add('active');
      this.pantallaActual = pantallaId;
      
      // Actualizar topbar
      this.actualizarTopbar(pantallaId);
      
      // Actualizar menú activo
      document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
      });
      const navItem = document.querySelector(`.nav-item[onclick*="${pantallaId}"]`);
      if (navItem) navItem.classList.add('active');
      
      // En móvil: cerrar sidebar
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        sidebar?.classList.remove('visible');
        overlay?.classList.remove('active');
      }
    }
    
    console.log('📍 Pantalla:', pantallaId);
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR TOPBAR
  // ─────────────────────────────────────────────────────────────
  actualizarTopbar: function(pantallaId) {
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
    
    const [titulo, subtitulo] = titulos[pantallaId] || ['Aprende-jugando', ''];
    
    const elTitulo = document.getElementById('topbar-title');
    const elSubtitulo = document.getElementById('topbar-sub');
    
    if (elTitulo) elTitulo.textContent = titulo;
    if (elSubtitulo) elSubtitulo.textContent = subtitulo;
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SIDEBAR (MÓVIL)
  // ─────────────────────────────────────────────────────────────
  toggleSidebar: function() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (!sidebar) return;
    
    sidebar.classList.toggle('visible');
    overlay?.classList.toggle('active');
    
    document.body.style.overflow = sidebar.classList.contains('visible') ? 'hidden' : '';
    
    console.log('🔍 Sidebar:', sidebar.classList.contains('visible') ? '🟢 ABIERTO' : '🔴 CERRADO');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CALLBACK: AUTH SUCCESS
  // ─────────────────────────────────────────────────────────────
  onAuthSuccess: function(user) {
    this.esAdmin = true;
    this.usuarioActual = user;
    
    this.mostrarPantalla('dashboard-screen');
    this.mostrarToast(`¡Bienvenido! 👋`, 'success');
    
    console.log('✅ Admin autenticado:', user.email);
  },
  
  // ─────────────────────────────────────────────────────────────
  // CALLBACK: AUTH LOGOUT
  // ─────────────────────────────────────────────────────────────
  onAuthLogout: function() {
    this.esAdmin = false;
    this.usuarioActual = null;
    
    this.mostrarPantalla('auth-screen');
    
    console.log('🚪 Sesión cerrada');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR SESIÓN
  // ─────────────────────────────────────────────────────────────
  cerrarSesion: async function() {
    if (confirm('¿Cerrar sesión?')) {
      const resultado = await window.pwaAuth.logout();
      
      if (resultado.exito) {
        this.esAdmin = false;
        this.usuarioActual = null;
        this.mostrarPantalla('auth-screen');
        this.mostrarToast('🚪 Sesión cerrada', 'info');
      } else {
        this.mostrarToast('❌ Error al cerrar sesión', 'error');
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR ADMIN (LOGIN)
  // ─────────────────────────────────────────────────────────────
  verificarAdmin: async function() {
    const emailInput = document.getElementById('admin-email');
    const passwordInput = document.getElementById('admin-password');
    
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';
    
    if (!email || !password) {
      this.mostrarToast('⚠️ Ingresa email y contraseña', 'error');
      return;
    }
    
    const resultado = await window.pwaAuth.login(email, password);
    
    if (resultado.exito) {
      this.mostrarToast('✅ ¡Bienvenido!', 'success');
    } else {
      this.mostrarToast('❌ ' + resultado.error, 'error');
      if (passwordInput) {
        passwordInput.classList.add('error');
        passwordInput.style.borderColor = 'var(--error)';
        setTimeout(() => {
          passwordInput.classList.remove('error');
          passwordInput.style.borderColor = '';
        }, 2000);
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR DEMO
  // ─────────────────────────────────────────────────────────────
  iniciarDemo: function() {
    this.planActual = 'demo';
    this.mostrarToast('🆓 Modo Demo activado (7 días)', 'info');
    this.mostrarPantalla('dashboard-screen');
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR PLANES
  // ─────────────────────────────────────────────────────────────
  mostrarPlanes: function() {
    this.mostrarToast('📋 Planes disponibles - Contacta para más info', 'info');
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOAST NOTIFICATION
  // ─────────────────────────────────────────────────────────────
  mostrarToast: function(mensaje, tipo = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = mensaje;
    toast.className = 'toast ' + tipo;
    toast.style.display = 'block';
    
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE TEMA
  // ─────────────────────────────────────────────────────────────
  toggleTema: function() {
    if (window.theme) {
      window.theme.toggle();
    }
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.app) {
    window.app.init();
  }
});

console.log('✅ app.js listo');
