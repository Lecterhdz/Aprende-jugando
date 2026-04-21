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
    const modal = document.getElementById(modalId);
    if (!modal) {
      console.error('❌ Modal no encontrado:', modalId);
      return;
    }
    
    // Llenar contenido según el tipo de modal
    if (datos) {
      // Para modal-instructivo (proyectos)
      if (modalId === 'modal-instructivo') {
        if (datos.titulo) modal.querySelector('.modal-title')?.textContent = datos.titulo;
        if (datos.instruccion) modal.querySelector('#modal-instructivo-body')?.innerHTML = datos.instruccion;
      }
      
      // Para modal-instrucciones-tarea (tareas)
      if (modalId === 'modal-instrucciones-tarea') {
        if (datos.titulo) document.getElementById('modal-instrucciones-title')?.textContent = datos.titulo;
        if (datos.icono) document.getElementById('modal-instrucciones-icono')?.textContent = datos.icono;
        if (datos.instruccion) document.getElementById('modal-instrucciones-texto')?.textContent = datos.instruccion;
        if (datos.recompensa) document.getElementById('modal-instrucciones-recompensa')?.textContent = `${datos.recompensa} estrellas`;
        
        // Configurar hint si existe
        const btnHint = document.getElementById('modal-instrucciones-hint');
        if (datos.hint && btnHint) {
          btnHint.style.display = 'flex';
          btnHint.onclick = datos.onHint || null;
        } else if (btnHint) {
          btnHint.style.display = 'none';
        }
        
        // Configurar botón comenzar
        const btnComenzar = document.getElementById('modal-instrucciones-comenzar');
        if (btnComenzar && datos.onConfirmar) {
          btnComenzar.onclick = (e) => {
            e.preventDefault();
            components.modal.cerrar(modalId);
            datos.onConfirmar();
          };
        }
      }
      
      // Para modal-celebracion
      if (modalId === 'modal-celebracion') {
        if (datos.titulo) document.getElementById('modal-celebracion-titulo')?.textContent = datos.titulo;
        if (datos.mensaje) document.getElementById('modal-celebracion-mensaje')?.textContent = datos.mensaje;
        if (datos.puntuacion) document.getElementById('modal-celebracion-puntuacion')?.textContent = datos.puntuacion;
      }
    }
    
    // Abrir modal
    modal.classList.add('active');
    if (modal.tagName === 'DIALOG' && typeof modal.showModal === 'function') {
      modal.showModal();
    }
    document.body.style.overflow = 'hidden';
    
    console.log('🪟 Modal abierto:', modalId);
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
