// ========================================
// SELAIAH RADIO - MESSAGE MODEL (COMPLETO)
// iHostCast Ltd © 2025
// ========================================

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'image', 'audio', 'video', 'file', 'voice_note', 'video_call'],
    default: 'text'
  },
  content: {
    type: String,
    maxlength: [5000, 'El mensaje no puede tener más de 5000 caracteres']
  },
  // Para archivos multimedia
  media: {
    url: String,
    filename: String,
    size: Number, // en bytes
    duration: Number, // para audio/video en segundos
    thumbnail: String // para videos
  },
  // Para responder mensajes
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null
  },
  // Reacciones al mensaje
  reactions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    emoji: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Estado de lectura por usuario
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Para videollamadas
  callData: {
    duration: Number, // segundos
    status: {
      type: String,
      enum: ['missed', 'declined', 'completed'],
      default: 'completed'
    },
    startedAt: Date,
    endedAt: Date
  },
  // Mensaje eliminado
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices
MessageSchema.index({ conversation: 1, createdAt: -1 });
MessageSchema.index({ sender: 1, createdAt: -1 });
MessageSchema.index({ 'readBy.user': 1 });

// Método para marcar como leído
MessageSchema.methods.markAsRead = function(userId) {
  const alreadyRead = this.readBy.some(r => r.user.toString() === userId.toString());
  
  if (!alreadyRead) {
    this.readBy.push({
      user: userId,
      readAt: new Date()
    });
    return this.save();
  }
  
  return Promise.resolve(this);
};

// Método para añadir reacción
MessageSchema.methods.addReaction = function(userId, emoji) {
  // Eliminar reacción anterior del mismo usuario
  this.reactions = this.reactions.filter(r => r.user.toString() !== userId.toString());
  
  // Añadir nueva reacción
  this.reactions.push({
    user: userId,
    emoji,
    createdAt: new Date()
  });
  
  return this.save();
};

module.exports = mongoose.model('Message', MessageSchema);
