// ========================================
// SELAIAH RADIO - CREAR USUARIO ADMIN
// iHostCast Ltd © 2025
// ========================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/selaiah')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });

// Importar modelo de Usuario
const User = require('../models/User');

async function createAdmin() {
  try {
    // Verificar si ya existe el admin
    const existingAdmin = await User.findOne({ email: 'admin@selaiah.com' });
    
    if (existingAdmin) {
      console.log('⚠️  El usuario admin ya existe');
      console.log('\n📧 Email: admin@selaiah.com');
      console.log('🔑 Password: admin123');
      console.log('👤 Rol: super_admin');
      process.exit(0);
    }

    // Hashear password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Crear usuario admin
    const admin = await User.create({
      email: 'admin@selaiah.com',
      password: hashedPassword,
      name: 'Administrador Selaiah',
      username: 'admin',
      role: 'super_admin',
      authProvider: 'local',
      isActive: true,
      isVerified: true,
      permissions: [
        'manage_users',
        'manage_content',
        'manage_streaming',
        'manage_payments',
        'view_analytics',
        'manage_integrations'
      ]
    });

    console.log('\n========================================');
    console.log('✅ USUARIO ADMINISTRADOR CREADO');
    console.log('========================================');
    console.log('\n📧 Email: admin@selaiah.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Rol: super_admin');
    console.log('🆔 ID:', admin._id);
    console.log('\n========================================');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    console.log('========================================\n');

    // Crear también un usuario normal de prueba
    const hashedUserPassword = await bcrypt.hash('user123', 10);
    
    const existingUser = await User.findOne({ email: 'user@selaiah.com' });
    
    if (!existingUser) {
      const user = await User.create({
        email: 'user@selaiah.com',
        password: hashedUserPassword,
        name: 'Usuario de Prueba',
        username: 'usuario',
        role: 'oyente',
        authProvider: 'local',
        isActive: true,
        isVerified: true
      });

      console.log('✅ USUARIO NORMAL CREADO');
      console.log('========================================');
      console.log('\n📧 Email: user@selaiah.com');
      console.log('🔑 Password: user123');
      console.log('👤 Rol: oyente');
      console.log('🆔 ID:', user._id);
      console.log('\n========================================\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando usuarios:', error);
    process.exit(1);
  }
}

// Ejecutar
createAdmin();
