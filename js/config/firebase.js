// ═══════════════════════════════════════════════════════════════
// APRENDE-JUGANDO - CONFIGURACIÓN FIREBASE
// ═══════════════════════════════════════════════════════════════

console.log('🔥 firebase.js cargado');

// ⚠️ REEMPLAZA CON TUS CREDENCIALES REALES DE FIREBASE CONSOLE
window.firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX"
};

// Inicializar Firebase
if (typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(window.firebaseConfig);
    console.log('✅ Firebase SDK inicializado');
    console.log('📦 Project ID:', window.firebaseConfig.projectId);
  } catch (error) {
    console.error('❌ Error inicializando Firebase:', error);
  }
} else {
  console.warn('⚠️ Firebase SDK no cargado - verifica los scripts en index.html');
}

console.log('✅ firebase.js listo');
