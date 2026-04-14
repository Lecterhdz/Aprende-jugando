// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - STORAGE (STUB)
// ═══════════════════════════════════════════════════════════════
console.log('💾 storage.js cargado (stub)');

window.storage = {
  get: (key) => JSON.parse(localStorage.getItem('aprende_jugando_' + key) || 'null'),
  set: (key, value) => localStorage.setItem('aprende_jugando_' + key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem('aprende_jugando_' + key)
};

console.log('✅ storage.js listo');
