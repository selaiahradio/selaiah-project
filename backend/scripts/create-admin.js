// ========================================
// SELAIAH RADIO - CREATE ADMIN USER
// Selaiah Radio Online LLC
// ========================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'dj', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: 'admin@selaiah.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Usuario admin ya existe');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Nombre:', existingAdmin.name);
      console.log('🔑 Role:', existingAdmin.role);
      
      // Actualizar contraseña si es necesario
      console.log('\n🔄 Actualizando contraseña...');
      const hashedPassword = await bcrypt.hash('@Odg4383@', 10);
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('✅ Contraseña actualizada exitosamente!');
      
      await mongoose.connection.close();
      return;
    }

    // Crear nuevo admin
    const hashedPassword = await bcrypt.hash('@Odg4383@', 10);
    
    const admin = new User({
      email: 'admin@selaiah.com',
      password: hashedPassword,
      name: 'Administrador Selaiah',
      role: 'admin'
    });

    await admin.save();
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
