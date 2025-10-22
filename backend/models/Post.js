// ========================================
// SELAIAH RADIO - POST MODEL
// iHostCast Ltd © 2025
// ========================================

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: [true, 'El contenido es requerido'],
    maxlength: [2000, 'El contenido no puede tener más de 2000 caracteres']
  },
  image: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['text', 'image', 'audio', 'video', 'song_share'],
    default: 'text'
  },
  // Para compartir canciones
  sharedSong: {
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    },
    title: String,
    artist: String,
    artwork: String
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  likesCount: {
    type: Number,
    default: 0
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  sharesCount: {
    type: Number,
    default: 0
  },
  visibility: {
    type: String,
    enum: ['public', 'followers', 'private'],
    default: 'public'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isEdited: {
    type: Boolean,
    default: false
  },
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

// Índices para búsqueda rápida
PostSchema.index({ user: 1, createdAt: -1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ likesCount: -1 });

// Método para dar like
PostSchema.methods.toggleLike = async function(userId) {
  const likeIndex = this.likes.indexOf(userId);
  
  if (likeIndex > -1) {
    // Quitar like
    this.likes.splice(likeIndex, 1);
    this.likesCount = Math.max(0, this.likesCount - 1);
  } else {
    // Dar like
    this.likes.push(userId);
    this.likesCount += 1;
  }
  
  await this.save();
  return likeIndex === -1; // true si se dio like, false si se quitó
};

// Virtual para verificar si un usuario específico dio like
PostSchema.virtual('isLikedByUser').get(function() {
  return this._isLikedByUser;
});

PostSchema.set('toJSON', { virtuals: true });
PostSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', PostSchema);
