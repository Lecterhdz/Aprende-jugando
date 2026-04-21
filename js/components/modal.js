// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - MODAL COMPONENT (CORREGIDO)
// ═══════════════════════════════════════════════════════════════

console.log('🪟 modal.js cargado');

window.modal = {
  modalesAbiertos: [],
  
  // ─────────────────────────────────────────────────────────────
  // INICIALIZAR MODALES
  // ─────────────────────────────────────────────────────────────
  init: function() {
    console.log('🪟 Modales inicializados');
    
    // Configurar cierre con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalesAbiertos.length > 0) {
        this.cerrar(this.modalesAbiertos[this.modalesAbiertos.length - 1]);
      }
    });
    
    // Configurar cierre con overlay click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.cerrar(modal.id);
        }
      });
    });
  },
  
// ─────────────────────────────────────────────────────────────
// ABRIR MODAL (FLEXIBLE PARA MÚLTIPLES MODALES)
// ─────────────────────────────────────────────────────────────
abrir: function(modalId, datos) {
  // Esperar un tick para asegurar que el DOM está listo
  setTimeout(() => {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error('❌ Modal no encontrado:', modalId);
      return;
    }
    
    // Llenar contenido según el tipo de modal
    if (datos) {
      // 🔧 Para modal-instructivo (PROYECTOS)
      if (modalId === 'modal-instructivo') {
        if (datos.titulo) {
          const tituloEl = modal.querySelector('.modal-title');
          if (tituloEl) tituloEl.textContent = datos.titulo;
        }
        if (datos.instruccion) {
          const bodyEl = document.getElementById('modal-instructivo-body');
          if (bodyEl) bodyEl.innerHTML = datos.instruccion;
        }
      }
      
      // 🔧 Para modal-instrucciones-tarea (TAREAS)
      if (modalId === 'modal-instrucciones-tarea') {
        if (datos.titulo) {
          const el = document.getElementById('modal-instrucciones-titulo');
          if (el) el.textContent = datos.titulo;
        }
        if (datos.icono) {
          const el = document.getElementById('modal-instrucciones-icono');
          if (el) el.textContent = datos.icono;
        }
        if (datos.instruccion) {
          const el = document.getElementById('modal-instrucciones-texto');
          if (el) el.textContent = datos.instruccion;
        }
        if (datos.recompensa) {
          const el = document.getElementById('modal-instrucciones-recompensa');
          if (el) el.textContent = `${datos.recompensa} estrellas`;
        }
      }
      
      // 🔧 Para modal-celebracion
      if (modalId === 'modal-celebracion') {
        if (datos.titulo) {
          const el = document.getElementById('modal-celebracion-titulo');
          if (el) el.textContent = datos.titulo;
        }
        if (datos.mensaje) {
          const el = document.getElementById('modal-celebracion-mensaje');
          if (el) el.textContent = datos.mensaje;
        }
        if (datos.puntuacion !== undefined) {
          const el = document.getElementById('modal-celebracion-puntuacion');
          if (el) el.textContent = datos.puntuacion;
        }
      }
    }
    
    // Abrir modal
    modal.classList.add('active');
    if (modal.tagName === 'DIALOG' && typeof modal.showModal === 'function') {
      modal.showModal();
    }
    document.body.style.overflow = 'hidden';
    
    console.log('🪟 Modal abierto:', modalId);
  }, 50); // Pequeño delay para asegurar DOM ready
},

// ─────────────────────────────────────────────────────────────
// CERRAR MODAL
// ─────────────────────────────────────────────────────────────
cerrar: function(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.remove('active');
  if (modal.tagName === 'DIALOG' && typeof modal.close === 'function') {
    modal.close();
  }
  document.body.style.overflow = '';
  
  console.log('🪟 Modal cerrado:', modalId);
},
  
  // ─────────────────────────────────────────────────────────────
  // CARGAR DATOS EN MODAL (CORREGIDO - scope de modal)
  // ─────────────────────────────────────────────────────────────
  cargarDatos: function(modalId, datos) {
    // ✅ CORRECCIÓN: Obtener el modal dentro de la función
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    Object.keys(datos).forEach(key => {
      const element = modal.querySelector(`[data-field="${key}"]`);
      if (element) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.value = datos[key];
        } else {
          element.textContent = datos[key];
        }
      }
    });
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR MENSAJE DE ÉXITO
  // ─────────────────────────────────────────────────────────────
  mostrarExito: function(mensaje, callback = null) {
    this.abrir('modal-exito', { mensaje });
    
    const btnAceptar = document.querySelector('#modal-exito .btn-aceptar');
    if (btnAceptar) {
      btnAceptar.onclick = () => {
        this.cerrar('modal-exito');
        if (callback) callback();
      };
    }
  },
  
  // ─────────────────────────────────────────────────────────────
  // MOSTRAR CONFIRMACIÓN
  // ─────────────────────────────────────────────────────────────
  confirmar: function(titulo, mensaje, onConfirmar, onCancelar = null) {
    this.abrir('modal-confirmacion', { titulo, mensaje });
    
    const btnConfirmar = document.querySelector('#modal-confirmacion .btn-confirmar');
    const btnCancelar = document.querySelector('#modal-confirmacion .btn-cancelar');
    
    if (btnConfirmar) {
      btnConfirmar.onclick = () => {
        this.cerrar('modal-confirmacion');
        if (onConfirmar) onConfirmar();
      };
    }
    
    if (btnCancelar) {
      btnCancelar.onclick = () => {
        this.cerrar('modal-confirmacion');
        if (onCancelar) onCancelar();
      };
    }
  }
};

// ─────────────────────────────────────────────────────────────
// EXPORTAR PARA COMPATIBILIDAD CON index.html
// ─────────────────────────────────────────────────────────────
// Tu index.html usa: components.modal.cerrar('modal-id')
// Esto asegura que funcione aunque window.modal no esté listo
window.components = window.components || {};
window.components.modal = {
  cerrar: function(modalId) {
    if (window.modal && typeof window.modal.cerrar === 'function') {
      return window.modal.cerrar(modalId);
    }
    // Fallback directo si window.modal no está disponible
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      return true;
    }
    return false;
  },
  abrir: function(modalId, datos) {
    if (window.modal && typeof window.modal.abrir === 'function') {
      return window.modal.abrir(modalId, datos);
    }
    return false;
  }
};

// ─────────────────────────────────────────────────────────────
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (window.modal) {
    window.modal.init();
  }
});

console.log('✅ modal.js listo');
