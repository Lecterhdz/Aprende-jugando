// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - APLICACIÓN PRINCIPAL (CORREGIDO)
// ═══════════════════════════════════════════════════════════════

console.log('🚀 app.js cargado');

// ─────────────────────────────────────────────────────────────
// NAMESPACE GLOBAL PARA FEATURES (EVITA ERRORES DE UNDEFINED)
// ─────────────────────────────────────────────────────────────
window.features = window.features || {
  dashboard: {},
  repaso: {},
  proyectos: {},
  tareas: {},
  sabiasQue: {},
  progreso: {},
  padres: {}
};

window.components = window.components || {
  modal: {},
  sidebar: {},
  cardActividad: {},
  starReward: {}
};

console.log('📦 Namespaces inicializados');

// ─────────────────────────────────────────────────────────────
// APP PRINCIPAL
// ─────────────────────────────────────────────────────────────
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
      
      // 1. Inicializar tema
      if (window.theme && typeof theme.init === 'function') {
        theme.init();
      }
      
      // 2. Esperar a que pwaAuth se inicialice (si existe)
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
      
      // 3. Verificar sesión
      this.verificarSesionAuth();
      
      // 4. Mostrar pantalla inicial
      if (this.esAdmin) {
        this.mostrarPantalla('dashboard-screen');
        // Revelar layout principal
        const layout = document.getElementById('main-layout');
        const authScreen = document.getElementById('auth-screen');
        if (layout) layout.style.display = 'grid';
        if (authScreen) authScreen.style.display = 'none';
      } else {
        this.mostrarPantalla('auth-screen');
      }
      
      // 5. Inicializar router si existe
      if (window.router && typeof router.init === 'function') {
        router.init();
      }
      
      // 6. Revelar app (eliminar flash de carga)
      document.body.classList.remove('app-loading');
      
      console.log('✅ Aprende-jugando listo');
      console.log('🔐 Modo:', this.esAdmin ? 'ADMIN' : 'INVITADO');
      
    } catch (error) {
      console.error('❌ Error en inicialización:', error);
      document.body.classList.remove('app-loading');
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
  // MOSTRAR PANTALLA (INTEGRADO CON ROUTER)
  // ─────────────────────────────────────────────────────────────
  mostrarPantalla: function(screenId) {
    // Validar que la pantalla existe
    const pantalla = document.getElementById(screenId);
    if (!pantalla) {
      console.error('❌ Pantalla no encontrada:', screenId);
      return false;
    }
    
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
    
    // Mostrar pantalla seleccionada
    pantalla.classList.add('active');
    this.pantallaActual = screenId;
    
    // Guardar preferencia
    localStorage.setItem('aprende_jugando_pantalla', screenId);
    
    // Actualizar UI
    this.actualizarTopbar(screenId);
    this.actualizarMenuActivo(screenId);
    
    // En móvil: cerrar sidebar después de navegar
    if (window.innerWidth <= 768) {
      if (window.sidebar && typeof sidebar.cerrar === 'function') {
        sidebar.cerrar();
      }
    }
    
    // Scroll al inicio del contenido
    const content = document.querySelector('.content');
    if (content) {
      content.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Disparar evento de cambio de pantalla
    window.dispatchEvent(new CustomEvent('screen-change', { 
      detail: { pantalla: screenId } 
    }));
    
    console.log('📍 Pantalla:', screenId);
    return true;
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
      setTimeout(() => { elTitulo.style.opacity = '1'; }, 100);
    }
    if (elSubtitulo) elSubtitulo.textContent = subtitulo;
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
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE SIDEBAR (DELEGADO A sidebar.js)
  // ─────────────────────────────────────────────────────────────
  toggleSidebar: function() {
    if (window.sidebar && typeof sidebar.toggle === 'function') {
      sidebar.toggle();
    } else {
      // Fallback simple si sidebar.js no está cargado
      const sidebarEl = document.querySelector('.sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      if (sidebarEl) {
        sidebarEl.classList.toggle('visible');
        overlay?.classList.toggle('active');
        document.body.style.overflow = sidebarEl.classList.contains('visible') ? 'hidden' : '';
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CALLBACK: AUTH SUCCESS
  // ─────────────────────────────────────────────────────────────
  onAuthSuccess: function(user) {
    this.esAdmin = true;
    this.usuarioActual = user;
    
    // Actualizar UI de usuario
    if (window.sidebar && typeof sidebar.cargarInfoUsuario === 'function') {
      sidebar.cargarInfoUsuario();
    }
    
    // Cambiar a dashboard
    this.mostrarPantalla('dashboard-screen');
    
    // Revelar layout principal
    const layout = document.getElementById('main-layout');
    const authScreen = document.getElementById('auth-screen');
    if (layout) layout.style.display = 'grid';
    if (authScreen) authScreen.style.display = 'none';
    
    this.mostrarToast(`¡Bienvenido! 👋`, 'success');
    
    console.log('✅ Admin autenticado:', user.email);
  },
  
  // ─────────────────────────────────────────────────────────────
  // CALLBACK: AUTH LOGOUT
  // ─────────────────────────────────────────────────────────────
  onAuthLogout: function() {
    this.esAdmin = false;
    this.usuarioActual = null;
    
    // Ocultar layout principal, mostrar auth
    const layout = document.getElementById('main-layout');
    const authScreen = document.getElementById('auth-screen');
    if (layout) layout.style.display = 'none';
    if (authScreen) authScreen.style.display = 'block';
    
    this.mostrarPantalla('auth-screen');
    
    console.log('🚪 Sesión cerrada');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR SESIÓN
  // ─────────────────────────────────────────────────────────────
  cerrarSesion: async function() {
    if (confirm('¿Cerrar sesión?')) {
      if (window.pwaAuth && typeof pwaAuth.logout === 'function') {
        const resultado = await pwaAuth.logout();
        if (resultado.exito) {
          this.esAdmin = false;
          this.usuarioActual = null;
          this.onAuthLogout();
          this.mostrarToast('🚪 Sesión cerrada', 'info');
        } else {
          this.mostrarToast('❌ Error al cerrar sesión', 'error');
        }
      } else {
        // Fallback sin Firebase
        this.esAdmin = false;
        this.usuarioActual = null;
        this.onAuthLogout();
        this.mostrarToast('🚪 Sesión cerrada', 'info');
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // VERIFICAR ADMIN (LOGIN CON FIREBASE)
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
    
    if (window.pwaAuth && typeof pwaAuth.login === 'function') {
      const resultado = await pwaAuth.login(email, password);
      
      if (resultado.exito) {
        this.mostrarToast('✅ ¡Bienvenido!', 'success');
        // onAuthSuccess se llama automáticamente vía callback
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
    } else {
      // Fallback para demo sin Firebase
      if (password === 'admin123') {
        this.esAdmin = true;
        this.usuarioActual = { email: 'demo@aprende-jugando.com', displayName: 'Admin Demo' };
        this.onAuthSuccess(this.usuarioActual);
        this.mostrarToast('✅ Login de demo exitoso', 'success');
      } else {
        this.mostrarToast('❌ Contraseña incorrecta', 'error');
      }
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // INICIAR DEMO
  // ─────────────────────────────────────────────────────────────
  iniciarDemo: function() {
    this.planActual = 'demo';
    localStorage.setItem('aprende_jugando_plan', 'demo');
    localStorage.setItem('aprende_jugando_plan_expiry', '7 días');
    
    this.mostrarToast('🆓 Modo Demo activado (7 días)', 'info');
    
    // Simular login de demo
    this.esAdmin = true;
    this.usuarioActual = { email: 'demo@aprende-jugando.com', displayName: 'Pequeño Explorador' };
    
    // Revelar layout
    const layout = document.getElementById('main-layout');
    const authScreen = document.getElementById('auth-screen');
    if (layout) layout.style.display = 'grid';
    if (authScreen) authScreen.style.display = 'none';
    
    this.mostrarPantalla('dashboard-screen');
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR PLANES
  // ─────────────────────────────────────────────────────────────
  mostrarPlanes: function(plan = null) {
    if (plan) {
      this.mostrarToast(`📋 Plan ${plan.toUpperCase()} - Contacta para más info`, 'info');
    } else {
      this.mostrarPantalla('licencia-screen');
    }
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
    
    // Auto-ocultar
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  },
  
  // ─────────────────────────────────────────────────────────────
  // TOGGLE TEMA (DELEGADO A theme.js)
  // ─────────────────────────────────────────────────────────────
  toggleTema: function() {
    if (window.theme && typeof theme.toggle === 'function') {
      theme.toggle();
    }
  }
};

// ─────────────────────────────────────────────────────────────
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.app && typeof app.init === 'function') {
    // Pequeño delay para asegurar que otros módulos cargaron
    setTimeout(() => {
      app.init();
    }, 100);
  }
});

console.log('✅ app.js listo');
