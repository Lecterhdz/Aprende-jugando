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
  // ABRIR MODAL
  // ─────────────────────────────────────────────────────────────
  abrir: function(modalId, datos = null) {
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error('❌ Modal no encontrado:', modalId);
      return false;
    }
    
    // Disparar evento antes de abrir
    window.dispatchEvent(new CustomEvent('modal-before-open', { 
      detail: { modalId, datos } 
    }));
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Guardar en stack
    this.modalesAbiertos.push(modalId);
    
    // Cargar datos si se proporcionan
    if (datos) {
      this.cargarDatos(modalId, datos);
    }
    
    console.log('🪟 Modal abierto:', modalId);
    return true;
  },
  
  // ─────────────────────────────────────────────────────────────
  // CERRAR MODAL
  // ─────────────────────────────────────────────────────────────
  cerrar: function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return false;
    
    // Disparar evento antes de cerrar
    window.dispatchEvent(new CustomEvent('modal-before-close', { 
      detail: { modalId } 
    }));
    
    // Ocultar modal
    modal.classList.remove('active');
    
    // Restaurar scroll si no hay más modales
    if (this.modalesAbiertos.length <= 1) {
      document.body.style.overflow = '';
    }
    
    // Remover del stack
    const index = this.modalesAbiertos.indexOf(modalId);
    if (index > -1) {
      this.modalesAbiertos.splice(index, 1);
    }
    
    console.log('🪟 Modal cerrado:', modalId);
    return true;
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
