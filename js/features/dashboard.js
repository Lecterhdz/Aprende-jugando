// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - DASHBOARD FEATURE
// ═══════════════════════════════════════════════════════════════

console.log('📊 dashboard.js cargado');

window.features.dashboard = {
  datosUsuario: null,
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR DASHBOARD
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('📊 Dashboard inicializado');
    
    // Escuchar cuando se muestra la pantalla
    window.addEventListener('screen-change', (e) => {
      if (e.detail.pantalla === 'dashboard-screen') {
        this.cargar();
      }
    });
    
    // Cargar datos iniciales
    this.cargarDatosUsuario();
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR DATOS DEL DASHBOARD
  // ─────────────────────────────────────────────────────────────
  cargar: async function() {
    try {
      console.log('📊 Cargando dashboard...');
      
      // Actualizar saludo
      this.actualizarSaludo();
      
      // Cargar estadísticas
      await this.cargarEstadisticas();
      
      // Cargar actividades recientes
      await this.cargarActividadesRecientes();
      
      // Cargar progreso semanal
      await this.cargarProgresoSemanal();
      
      console.log('📊 Dashboard cargado');
      
    } catch (error) {
      console.error('❌ Error cargando dashboard:', error);
      window.app?.mostrarToast('Error cargando dashboard', 'error');
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // ACTUALIZAR SALUDO
  // ─────────────────────────────────────────────────────────────
  actualizarSaludo: function() {
    const welcomeName = document.getElementById('welcome-name');
    const userName = document.getElementById('user-name');
    
    let nombre = 'Explorador';
    
    if (window.app?.usuarioActual?.displayName) {
      nombre = window.app.usuarioActual.displayName.split(' ')[0];
    } else if (userName?.textContent) {
      nombre = userName.textContent;
    }
    
    if (welcomeName) welcomeName.textContent = nombre;
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR ESTADÍSTICAS
  // ─────────────────────────────────────────────────────────────
  cargarEstadisticas: async function() {
    try {
      // Simulación de datos (reemplazar con IndexedDB/Firebase)
      const stats = {
        tareasCompletadas: 12,
        proyectosTerminados: 3,
        estrellasGanadas: 45,
        diasRacha: 5
      };
      
      // Actualizar UI (se implementará en progreso.js)
      if (window.features.progreso) {
        window.features.progreso.actualizarEstadisticas(stats);
      }
      
      console.log('📊 Estadísticas:', stats);
      
    } catch (error) {
      console.error('❌ Error cargando estadísticas:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR ACTIVIDADES RECIENTES
  // ─────────────────────────────────────────────────────────────
  cargarActividadesRecientes: async function() {
    try {
      const container = document.getElementById('recent-activity');
      if (!container) return;
      
      // Simulación de actividades (reemplazar con datos reales)
      const actividades = [
        {
          icono: '✏️',
          nombre: 'Trazo de letras completado',
          meta: 'Hace 2 horas',
          tipo: 'tarea'
        },
        {
          icono: '🎨',
          icono: 'Colorear completado',
          meta: 'Hace 1 día',
          tipo: 'tarea'
        },
        {
          icono: '🛠️',
          nombre: 'Proyecto: Animales de la granja',
          meta: 'Hace 3 días',
          tipo: 'proyecto'
        }
      ];
      
      if (actividades.length === 0) {
        container.innerHTML = `
          <div style="padding:40px 20px;text-align:center;color:var(--ink3);">
            <div style="font-size:48px;margin-bottom:10px;">📭</div>
            <div style="font-size:14px;font-weight:600;">Sin actividad reciente</div>
            <div style="font-size:12px;margin-top:8px;">¡Comienza con una tarea!</div>
          </div>
        `;
        return;
      }
      
      container.innerHTML = actividades.map(act => `
        <div class="activity-item" style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border);">
          <div class="activity-dot" style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;background:var(--bg2);">
            ${act.icono}
          </div>
          <div class="activity-info" style="flex:1;min-width:0;">
            <div class="activity-name" style="font-size:13px;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${act.nombre}
            </div>
            <div class="activity-meta" style="font-size:11px;color:var(--ink3);margin-top:2px;font-family:var(--mono);">
              ${act.meta}
            </div>
          </div>
        </div>
      `).join('');
      
    } catch (error) {
      console.error('❌ Error cargando actividades:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR PROGRESO SEMANAL
  // ─────────────────────────────────────────────────────────────
  cargarProgresoSemanal: async function() {
    try {
      const container = document.getElementById('weekly-progress');
      if (!container) return;
      
      // Simulación de datos de progreso
      const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
      const progreso = [60, 80, 45, 90, 70, 30, 0];
      
      container.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;align-items:end;height:150px;padding:20px 0;">
          ${dias.map((dia, i) => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
              <div style="width:100%;background:linear-gradient(180deg,var(--primary-light),var(--primary));border-radius:8px 8px 0 0;transition:height 0.3s;" 
                   style="height:${progreso[i]}%;min-height:4px;"></div>
              <span style="font-size:10px;color:var(--ink3);font-family:var(--mono);">${dia}</span>
            </div>
          `).join('')}
        </div>
      `;
      
    } catch (error) {
      console.error('❌ Error cargando progreso:', error);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR DATOS DE USUARIO
  // ─────────────────────────────────────────────────────────────
  cargarDatosUsuario: function() {
    // Obtener datos de localStorage o Firebase
    const datosGuardados = localStorage.getItem('aprende_jugando_usuario');
    if (datosGuardados) {
      this.datosUsuario = JSON.parse(datosGuardados);
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // GUARDAR DATOS DE USUARIO
  // ─────────────────────────────────────────────────────────────
  guardarDatosUsuario: function(datos) {
    this.datosUsuario = { ...this.datosUsuario, ...datos };
    localStorage.setItem('aprende_jugando_usuario', JSON.stringify(this.datosUsuario));
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.dashboard) {
    window.features.dashboard.init();
  }
});

console.log('✅ dashboard.js listo');
