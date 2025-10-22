// backend/models/Follow.js
const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice compuesto único para evitar seguir dos veces
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

// Índices para consultas rápidas
FollowSchema.index({ follower: 1 });
FollowSchema.index({ following: 1 });

module.exports = mongoose.model('Follow', FollowSchema);
