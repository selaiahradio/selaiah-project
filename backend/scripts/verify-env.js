// ========================================
// SCRIPT DE VERIFICACIÓN DE ENTORNO
// Selaiah Radio - iHostCast Ltd © 2025
// ========================================

require('dotenv').config();

console.log('\n========================================');
console.log('🔍 VERIFICACIÓN DE CONFIGURACIÓN');
console.log('========================================\n');

let errors = 0;
let warnings = 0;

// ========================================
// VERIFICAR VARIABLES REQUERIDAS
// ========================================
console.log('📋 Variables Requeridas:\n');

const required = [
  { name: 'MONGODB_URI', value: process.env.MONGODB_URI },
  { name: 'SESSION_SECRET', value: process.env.SESSION_SECRET },
  { name: 'PORT', value: process.env.PORT },
  { name: 'FRONTEND_URL', value: process.env.FRONTEND_URL }
];

required.forEach(({ name, value }) => {
  if (value) {
    console.log(`   ✅ ${name}: Configurado`);
  } else {
    console.log(`   ❌ ${name}: FALTA - REQUERIDO`);
    errors++;
  }
});

// ========================================
// VERIFICAR VARIABLES OPCIONALES
// ========================================
console.log('\n📦 Servicios Opcionales:\n');

const optional = [
  { name: 'OPENAI_API_KEY', service: 'OpenAI (Chat IA)' },
  { name: 'STRIPE_SECRET_KEY', service: 'Stripe (Pagos)' },
  { name: 'FIREBASE_PROJECT_ID', service: 'Firebase (Notificaciones)' },
  { name: 'SENDGRID_API_KEY', service: 'SendGrid (Emails)' },
  { name: 'GOOGLE_CLIENT_ID', service: 'Google OAuth' },
  { name: 'ELEVENLABS_API_KEY', service: 'ElevenLabs (Voz)' }
];

optional.forEach(({ name, service }) => {
  if (process.env[name]) {
    console.log(`   ✅ ${service}: Configurado`);
  } else {
    console.log(`   ⚠️  ${service}: No configurado (opcional)`);
    warnings++;
  }
});

// ========================================
// VERIFICAR FORMATO DE VARIABLES
// ========================================
console.log('\n🔧 Validación de Formato:\n');

// Verificar MongoDB URI
if (process.env.MONGODB_URI) {
  if (process.env.MONGODB_URI.includes('<password>')) {
    console.log('   ❌ MONGODB_URI: Contiene <password> - reemplazar con contraseña real');
    errors++;
  } else if (process.env.MONGODB_URI.startsWith('mongodb://') || 
             process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
    console.log('   ✅ MONGODB_URI: Formato válido');
  } else {
    console.log('   ❌ MONGODB_URI: Formato inválido');
    errors++;
  }
}

// Verificar SESSION_SECRET
if (process.env.SESSION_SECRET) {
  if (process.env.SESSION_SECRET.length < 32) {
    console.log('   ⚠️  SESSION_SECRET: Muy corto (recomendado: 32+ caracteres)');
    warnings++;
  } else {
    console.log('   ✅ SESSION_SECRET: Longitud adecuada');
  }
}

// Verificar PORT
if (process.env.PORT) {
  const port = parseInt(process.env.PORT);
  if (isNaN(port) || port < 1024 || port > 65535) {
    console.log('   ❌ PORT: Valor inválido (usar 3001)');
    errors++;
  } else {
    console.log('   ✅ PORT: Válido');
  }
}

// ========================================
// VERIFICAR NODE_ENV
// ========================================
console.log('\n🌍 Entorno:\n');

const env = process.env.NODE_ENV || 'development';
console.log(`   📍 NODE_ENV: ${env}`);

if (env === 'production') {
  console.log('   ⚠️  Modo PRODUCCIÓN - verificar todas las configuraciones');
  
  if (process.env.SESSION_SECRET === 'selaiah-radio-secret-key-change-in-production') {
    console.log('   ❌ SESSION_SECRET: Usando valor por defecto en producción - CAMBIAR');
    errors++;
  }
}

// ========================================
// RESUMEN
// ========================================
console.log('\n========================================');
console.log('📊 RESUMEN');
console.log('========================================\n');

console.log(`   Errores: ${errors}`);
console.log(`   Advertencias: ${warnings}`);

if (errors === 0 && warnings === 0) {
  console.log('\n   ✅ ¡TODO PERFECTO! Listo para iniciar.\n');
  process.exit(0);
} else if (errors === 0) {
  console.log('\n   ⚠️  Configuración básica OK. Algunas funcionalidades opcionales no disponibles.\n');
  process.exit(0);
} else {
  console.log('\n   ❌ Hay errores que deben corregirse antes de iniciar.\n');
  console.log('   💡 Revisa el archivo .env y corrige los errores marcados.\n');
  process.exit(1);
}
