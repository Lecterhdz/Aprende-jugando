// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - PANEL PARA PADRES
// ═══════════════════════════════════════════════════════════════

console.log('👨‍👩‍👧 padres.js cargado');

window.features.padres = {
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('👨‍👩‍👧 Panel de padres inicializado');
    
    window.addEventListener('screen-change', (e) => {
      if (e.detail.pantalla === 'padres-screen') {
        this.cargar();
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR PANEL
  // ─────────────────────────────────────────────────────────────
  cargar: function() {
    console.log('👨‍👩‍👧 Cargando panel de padres');
    this.cargarConfiguracion();
    this.cargarPlan();
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR CONFIGURACIÓN
  // ─────────────────────────────────────────────────────────────
  cargarConfiguracion: function() {
    const config = JSON.parse(localStorage.getItem('aprende_jugando_config') || '{}');
    
    const nombreInput = document.getElementById('padres-nombre-nino');
    if (nombreInput && config.nombreNino) {
      nombreInput.value = config.nombreNino;
    }
    
    const gradoSelect = document.getElementById('padres-grado');
    if (gradoSelect && config.grado) {
      gradoSelect.value = config.grado;
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // GUARDAR CONFIGURACIÓN
  // ─────────────────────────────────────────────────────────────
  guardarConfiguracion: function() {
    const nombreInput = document.getElementById('padres-nombre-nino');
    const gradoSelect = document.getElementById('padres-grado');
    
    const config = {
      nombreNino: nombreInput?.value || 'Pequeño Explorador',
      grado: gradoSelect?.value || 'kinder1'
    };
    
    localStorage.setItem('aprende_jugando_config', JSON.stringify(config));
    localStorage.setItem('aprende_jugando_grado', config.grado);
    
    window.app?.mostrarToast('✅ Configuración guardada', 'success');
  },
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR PLAN
  // ─────────────────────────────────────────────────────────────
  cargarPlan: function() {
    const planInfo = document.getElementById('plan-actual-info');
    if (!planInfo) return;
    
    const plan = localStorage.getItem('aprende_jugando_plan') || 'demo';
    const expiry = localStorage.getItem('aprende_jugando_plan_expiry') || '7 días';
    
    const planes = {
      demo: { nombre: 'Demo', icono: '🆓', color: 'var(--ink4)' },
      basico: { nombre: 'Básico', icono: '🌟', color: 'var(--blue)' },
      pro: { nombre: 'Pro', icono: '🚀', color: 'var(--primary)' },
      elite: { nombre: 'Elite', icono: '👑', color: 'var(--indigo)' }
    };
    
    const planData = planes[plan] || planes.demo;
    
    planInfo.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <span style="font-size:32px;">${planData.icono}</span>
        <div>
          <div style="font-size:16px;font-weight:700;color:${planData.color};">Plan ${planData.nombre}</div>
          <div style="font-size:12px;color:var(--ink3);">Activo por ${expiry}</div>
        </div>
      </div>
    `;
  },
  
  // ─────────────────────────────────────────────────────────────
  // GENERAR REPORTE
  // ─────────────────────────────────────────────────────────────
  generarReporte: function() {
    const progreso = JSON.parse(localStorage.getItem('aprende_jugando_progreso') || '{}');
    const config = JSON.parse(localStorage.getItem('aprende_jugando_config') || '{}');
    
    const reporte = `
╔═══════════════════════════════════════════════════════════╗
║     APRENDE-JUGANDO - REPORTE DE PROGRESO                ║
╚═══════════════════════════════════════════════════════════╝

👤 NIÑO/A: ${config.nombreNino || 'Pequeño Explorador'}
📚 GRADO: ${this.getNombreGrado(config.grado)}
📅 FECHA: ${new Date().toLocaleDateString('es-MX')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 ESTADÍSTICAS GENERALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⭐ Estrellas Totales: ${progreso.estrellas || 0}
✅ Tareas Completadas: ${(progreso.tareas || []).length}
💡 Datos Curiosos Leídos: ${(progreso.sabiasQue || []).length}
🏆 Logros Desbloqueados: ${(progreso.logrosDesbloqueados || []).length}
🔥 Días de Racha: ${progreso.racha || 0}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📚 PROGRESO POR ÁREA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔤 Letras: ${this.contarPorCategoria(progreso.repaso, 'letras')} actividades
🔢 Números: ${this.contarPorCategoria(progreso.repaso, 'numeros')} actividades
🎨 Colores: ${this.contarPorCategoria(progreso.repaso, 'colores')} actividades
🦁 Animales: ${this.contarPorCategoria(progreso.repaso, 'animales')} actividades

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 RECOMENDACIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${this.generarRecomendaciones(progreso)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

¡Sigue así! 🎉
Aprende-jugando - Aprendiendo mientras jugamos
    `;
    
    // Mostrar en modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
      <div class="modal-content" style="max-width:600px;">
        <div class="modal-header">
          <div class="modal-title">📊 Reporte de Progreso</div>
          <button class="modal-close" onclick="this.closest('.modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <pre style="background:var(--bg);padding:20px;border-radius:var(--radius-sm);overflow-x:auto;font-size:12px;line-height:1.6;font-family:var(--mono);color:var(--ink);">${reporte}</pre>
        </div>
        <div class="modal-footer" style="justify-content:center;gap:12px;">
          <button onclick="this.closest('.modal').remove()" class="topbar-btn ghost">❌ Cerrar</button>
          <button onclick="features.padres.descargarReporte()" class="topbar-btn primary">📥 Descargar</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Guardar reporte temporalmente
    this.reporteActual = reporte;
  },
  
  // ─────────────────────────────────────────────────────────────
  // DESCARGAR REPORTE
  // ─────────────────────────────────────────────────────────────
  descargarReporte: function() {
    if (!this.reporteActual) return;
    
    const blob = new Blob([this.reporteActual], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-aprende-jugando-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    window.app?.mostrarToast('📥 Reporte descargado', 'success');
  },
  
  // ─────────────────────────────────────────────────────────────
  // UTILIDADES
  // ─────────────────────────────────────────────────────────────
  getNombreGrado: function(grado) {
    const nombres = {
      kinder1: 'Kinder 1 (3-4 años)',
      kinder2: 'Kinder 2 (4-5 años)',
      kinder3: 'Kinder 3 (5-6 años)'
    };
    return nombres[grado] || 'No especificado';
  },
  
  contarPorCategoria: function(repaso, categoria) {
    if (!repaso) return 0;
    let total = 0;
    Object.values(repaso).forEach(grado => {
      if (grado[categoria]) {
        total += grado[categoria].length;
      }
    });
    return total;
  },
  
  generarRecomendaciones: function(progreso) {
    const recomendaciones = [];
    
    if ((progreso.tareas || []).length < 5) {
      recomendaciones.push('• Completa más tareas para ganar estrellas ⭐');
    }
    if ((progreso.sabiasQue || []).length < 5) {
      recomendaciones.push('• Lee más "Sabías Que" para aprender datos curiosos 💡');
    }
    if (!progreso.racha || progreso.racha < 3) {
      recomendaciones.push('• ¡Usa la app todos los días para mantener tu racha! 🔥');
    }
    if (recomendaciones.length === 0) {
      recomendaciones.push('• ¡Excelente trabajo! Sigue así 🎉');
    }
    
    return recomendaciones.join('\n');
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  if (window.features?.padres) {
    window.features.padres.init();
  }
});

console.log('✅ padres.js listo');
