// ========================================
// SELAIAH RADIO - INICIALIZAR BASE DE DATOS
// Selaiah Radio Online LLC
// ========================================

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Vercel-Admin-selaiah_admin:MKLmG6WWesIZUKIy@selaiah-admin.9ji561i.mongodb.net/?retryWrites=true&w=majority';

// Definir esquemas básicos
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['user', 'dj', 'admin'], default: 'user' },
  profilePicture: String,
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now }
});

const followSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  updatedAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const donationSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  message: String,
  isAnonymous: { type: Boolean, default: false },
  donor: {
    name: String,
    email: String,
    phone: String,
    username: String,
    displayName: String
  },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const showSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  schedule: {
    day: String,
    startTime: String,
    endTime: String
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  image: String,
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['local', 'general', 'event'], default: 'general' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  image: String,
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Crear modelos
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Follow = mongoose.model('Follow', followSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);
const Message = mongoose.model('Message', messageSchema);
const Donation = mongoose.model('Donation', donationSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);
const Show = mongoose.model('Show', showSchema);
const Event = mongoose.model('Event', eventSchema);
const News = mongoose.model('News', newsSchema);

async function initializeDatabase() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    console.log('\n📊 Creando colecciones...');

    // Crear colecciones vacías
    await User.createCollection();
    console.log('✅ Colección "users" creada');

    await Post.createCollection();
    console.log('✅ Colección "posts" creada');

    await Comment.createCollection();
    console.log('✅ Colección "comments" creada');

    await Follow.createCollection();
    console.log('✅ Colección "follows" creada');

    await Conversation.createCollection();
    console.log('✅ Colección "conversations" creada');

    await Message.createCollection();
    console.log('✅ Colección "messages" creada');

    await Donation.createCollection();
    console.log('✅ Colección "donations" creada');

    await Subscription.createCollection();
    console.log('✅ Colección "subscriptions" creada');

    await Show.createCollection();
    console.log('✅ Colección "shows" creada');

    await Event.createCollection();
    console.log('✅ Colección "events" creada');

    await News.createCollection();
    console.log('✅ Colección "news" creada');

    console.log('\n🎉 ¡Base de datos inicializada correctamente!');
    console.log('\n📋 Colecciones creadas:');
    console.log('   - users (Usuarios)');
    console.log('   - posts (Publicaciones)');
    console.log('   - comments (Comentarios)');
    console.log('   - follows (Seguidores)');
    console.log('   - conversations (Conversaciones)');
    console.log('   - messages (Mensajes)');
    console.log('   - donations (Donaciones)');
    console.log('   - subscriptions (Suscripciones)');
    console.log('   - shows (Programas)');
    console.log('   - events (Eventos)');
    console.log('   - news (Noticias)');

    await mongoose.connection.close();
    console.log('\n✅ Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Ejecutar
initializeDatabase();
