// ========================================
// SELAIAH RADIO - USER MODEL
// iHostCast Ltd © 2025
// ========================================

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  bio: { type: String, maxlength: 500 },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say'], default: 'prefer_not_to_say' },
  role: { 
    type: String, 
    enum: ['super_admin', 'admin', 'locutor', 'editor', 'oyente'],
    default: 'oyente'
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook', 'apple'],
    default: 'local'
  },
  providerId: String,
  avatar: String,
  coverPhoto: String,
  permissions: [String],
  donations: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

// Índices
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
UserSchema.index({ name: 'text' });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
