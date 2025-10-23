// ========================================
// SELAIAH RADIO - SERVIDOR BACKEND COMPLETO
// iHostCast Ltd © 2025
// ========================================

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ========================================
// RATE LIMITING
// ========================================
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
});

// ========================================
// MIDDLEWARES
// ========================================
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// ========================================
// SESSION
// ========================================
app.use(session({
  secret: process.env.SESSION_SECRET || 'selaiah-radio-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/selaiah'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// ========================================
// MODELOS
// ========================================
const User = require('./models/User');

const ConfigSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['streaming', 'payments', 'ai', 'social', 'maps', 'firebase', 'email']
  },
  key: { type: String, required: true },
  value: { type: String, required: true },
  encrypted: { type: Boolean, default: false },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
});

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  displayName: String,
  description: String,
  permissions: [String],
  createdAt: { type: Date, default: Date.now }
});

const ShowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  host: String,
  schedule: {
    dayOfWeek: { type: Number, min: 0, max: 6 },
    startTime: String,
    endTime: String
  },
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['local', 'general', 'events'], default: 'general' },
  author: String,
  image: String,
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Config = mongoose.model('Config', ConfigSchema);
const Role = mongoose.model('Role', RoleSchema);
const Show = mongoose.model('Show', ShowSchema);
const Event = mongoose.model('Event', EventSchema);
const News = mongoose.model('News', NewsSchema);

// ========================================
// PASSPORT STRATEGIES
// ========================================
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email, authProvider: 'local' });
      if (!user) return done(null, false, { message: 'Usuario no encontrado' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, authProvider: 'google' });
      
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          authProvider: 'google',
          providerId: profile.id,
          avatar: profile.photos[0]?.value,
          role: 'oyente'
        });
      }
      
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, authProvider: 'facebook' });
      
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          authProvider: 'facebook',
          providerId: profile.id,
          avatar: profile.photos[0]?.value,
          role: 'oyente'
        });
      }
      
      user.lastLogin = new Date();
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// ========================================
// MIDDLEWARE DE AUTENTICACIÓN
// ========================================
const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'No autenticado' });
  }
  next();
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated() || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Permisos insuficientes' });
    }
    next();
  };
};

// ========================================
// RUTAS DE AUTENTICACIÓN
// ========================================

// Login local
app.post('/auth/login', passport.authenticate('local'), (req, res) => {
  res.json({ 
    success: true, 
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      avatar: req.user.avatar,
      permissions: req.user.permissions
    }
  });
});

// Registro
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email ya registrado' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Validar rol permitido
    const allowedRoles = ['oyente', 'locutor', 'editor', 'admin'];
    const userRole = allowedRoles.includes(role) ? role : 'oyente';
    
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      authProvider: 'local',
      role: userRole
    });
    
    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }});
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.FRONTEND_URL + '?auth=success')
);

// Facebook OAuth
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.FRONTEND_URL + '?auth=success')
);

// Logout
app.post('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Get current user
app.get('/auth/me', requireAuth, (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    avatar: req.user.avatar,
    permissions: req.user.permissions
  });
});

// ========================================
// RUTAS DE ADMIN
// ========================================

// Obtener configuraciones
app.get('/api/admin/config', requireAuth, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const configs = await Config.find();
    const grouped = configs.reduce((acc, config) => {
      if (!acc[config.category]) acc[config.category] = [];
      acc[config.category].push({
        key: config.key,
        value: config.encrypted ? '***encrypted***' : config.value,
        updatedAt: config.updatedAt
      });
      return acc;
    }, {});
    res.json({ success: true, config: grouped });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar configuración
app.put('/api/admin/config/:category/:key', requireAuth, requireRole(['super_admin']), async (req, res) => {
  try {
    const { category, key } = req.params;
    const { value } = req.body;
    
    const config = await Config.findOneAndUpdate(
      { category, key },
      { value, updatedBy: req.user._id, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    
    res.json({ success: true, config });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar usuarios
app.get('/api/admin/users', requireAuth, requireRole(['super_admin', 'admin']), async (req, res) => {
  try {
    const { page = 1, limit = 50, role, search } = req.query;
    
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await User.countDocuments(query);
    
    res.json({
      success: true,
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar rol de usuario
app.put('/api/admin/users/:id/role', requireAuth, requireRole(['super_admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// RUTAS PÚBLICAS
// ========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Info del servidor
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Selaiah Radio API',
    version: '1.0.0',
    company: 'iHostCast Ltd',
    year: 2025
  });
});

// Stream info
app.get('/api/stream', (req, res) => {
  res.json({
    success: true,
    stream: {
      url: process.env.RADIOBOSS_URL || 'https://c34.radioboss.fm:8888/stream',
      format: 'mp3',
      bitrate: '128kbps',
      status: 'online'
    }
  });
});

// ========================================
// RUTAS DE USUARIOS
// ========================================
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const user = await User.create({ email, name, role });
    
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// RUTAS DE SHOWS
// ========================================
app.get('/api/shows', async (req, res) => {
  try {
    const shows = await Show.find({ isActive: true })
      .sort({ 'schedule.dayOfWeek': 1, 'schedule.startTime': 1 });
    
    res.json({
      success: true,
      count: shows.length,
      shows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/shows', requireAuth, requireRole(['super_admin', 'admin', 'locutor']), async (req, res) => {
  try {
    const show = await Show.create(req.body);
    res.json({ success: true, show });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// RUTAS DE EVENTOS
// ========================================
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .sort({ date: 1 });
    
    res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', requireAuth, requireRole(['super_admin', 'admin', 'editor']), async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json({ success: true, event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// RUTAS DE NOTICIAS
// ========================================
app.get('/api/news', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    
    const news = await News.find(filter)
      .sort({ createdAt: -1 })
      .limit(20);
    
    res.json({
      success: true,
      count: news.length,
      news
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/news', requireAuth, requireRole(['super_admin', 'admin', 'editor']), async (req, res) => {
  try {
    const newsItem = await News.create(req.body);
    res.json({ success: true, news: newsItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========================================
// RUTA DE IA (Placeholder)
// ========================================
app.post('/api/ai/chat', requireAuth, async (req, res) => {
  try {
    const { message } = req.body;
    
    // TODO: Integrar con OpenAI cuando tengas la API key
    res.json({
      success: true,
      response: `Hola ${req.user.name}, recibí tu mensaje: "${message}". La integración con IA estará disponible pronto.`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================================
// RUTAS DE RED SOCIAL
// ========================================
const postsRoutes = require('./routes/posts');
const socialRoutes = require('./routes/social');
const messagesRoutes = require('./routes/messages');

app.use('/api/posts', postsRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/messages', messagesRoutes);

// ========================================
// INICIALIZAR ROLES
// ========================================
async function initializeRoles() {
  const defaultRoles = [
    {
      name: 'super_admin',
      displayName: 'Super Administrador',
      description: 'Acceso total',
      permissions: ['manage_users', 'manage_content', 'manage_streaming', 'manage_payments', 'view_analytics', 'manage_integrations']
    },
    {
      name: 'admin',
      displayName: 'Administrador',
      description: 'Gestión general',
      permissions: ['manage_content', 'manage_streaming', 'view_analytics']
    },
    {
      name: 'locutor',
      displayName: 'Locutor',
      description: 'Gestión de contenido',
      permissions: ['manage_content', 'manage_streaming']
    },
    {
      name: 'editor',
      displayName: 'Editor',
      description: 'Edición de contenido',
      permissions: ['manage_content']
    },
    {
      name: 'oyente',
      displayName: 'Oyente',
      description: 'Usuario estándar',
      permissions: []
    }
  ];
  
  for (const roleData of defaultRoles) {
    await Role.findOneAndUpdate({ name: roleData.name }, roleData, { upsert: true });
  }
  
  console.log('✅ Roles inicializados');
}

// ========================================
// ENDPOINT TEMPORAL PARA CREAR ADMIN
// ========================================
const bcrypt = require('bcryptjs');

app.get('/api/setup-admin', async (req, res) => {
  try {
    // Verificar si ya existe
    const existingAdmin = await User.findOne({ email: 'admin@selaiah.com' });
    
    if (existingAdmin) {
      // Actualizar contraseña
      const hashedPassword = await bcrypt.hash('@Odg4383@', 10);
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      
      return res.json({
        success: true,
        message: 'Usuario admin actualizado',
        email: 'admin@selaiah.com',
        role: 'admin'
      });
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

    res.json({
      success: true,
      message: 'Usuario admin creado exitosamente',
      email: 'admin@selaiah.com',
      role: 'admin'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creando admin',
      error: error.message
    });
  }
});

// ========================================
// MANEJO DE ERRORES
// ========================================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path
  });
});

// ========================================
// CONEXIÓN DB Y START SERVER
// ========================================
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/selaiah')
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    console.log(`📊 Base de datos: ${mongoose.connection.name}`);
    initializeRoles();
    
    app.listen(PORT, () => {
      console.log('\n========================================');
      console.log('🚀 SELAIAH RADIO - SERVIDOR INICIADO');
      console.log('========================================');
      console.log(`📡 Servidor: http://localhost:${PORT}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🎵 Stream: ${process.env.RADIOBOSS_URL || 'No configurado'}`);
      console.log(`🏢 iHostCast Ltd © 2025`);
      console.log('========================================\n');
      console.log('📋 Endpoints disponibles:');
      console.log('   GET  /api/health');
      console.log('   GET  /api/info');
      console.log('   GET  /api/stream');
      console.log('   POST /auth/register');
      console.log('   POST /auth/login');
      console.log('   GET  /auth/me');
      console.log('   GET  /api/users');
      console.log('   GET  /api/shows');
      console.log('   GET  /api/events');
      console.log('   GET  /api/news');
      console.log('   POST /api/ai/chat (requiere auth)');
      console.log('\n📱 Red Social:');
      console.log('   POST /api/posts (crear publicación)');
      console.log('   GET  /api/posts/feed (feed de publicaciones)');
      console.log('   POST /api/posts/:id/like (dar like)');
      console.log('   POST /api/social/follow/:userId (seguir usuario)');
      console.log('   GET  /api/social/profile/:userId (perfil de usuario)');
      console.log('   GET  /api/messages/conversations (conversaciones)');
      console.log('   POST /api/messages/send (enviar mensaje)');
      console.log('\n✅ Listo para recibir peticiones\n');
    });
  })
  .catch(err => {
    console.error('❌ Error MongoDB:', err);
    process.exit(1);
  });

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('👋 Cerrando servidor...');
  mongoose.connection.close(() => {
    console.log('✅ Conexión a MongoDB cerrada');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n👋 Cerrando servidor...');
  mongoose.connection.close(() => {
    console.log('✅ Conexión a MongoDB cerrada');
    process.exit(0);
  });
});

module.exports = { app, User, Config, Role, Show, Event, News };
