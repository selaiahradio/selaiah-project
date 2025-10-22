// ========================================
// SELAIAH RADIO - SOCIAL ROUTES
// iHostCast Ltd © 2025
// ========================================

const express = require('express');
const router = express.Router();
const {
  toggleFollow,
  getFollowers,
  getFollowing,
  getUserProfile,
  getUserPosts,
  searchUsers
} = require('../controllers/socialController');
const { protect } = require('../middleware/auth');

// Seguir/Dejar de seguir
router.post('/follow/:userId', protect, toggleFollow);

// Seguidores y siguiendo
router.get('/followers/:userId', getFollowers);
router.get('/following/:userId', getFollowing);

// Perfil de usuario
router.get('/profile/:userId', getUserProfile);
router.get('/profile/:userId/posts', getUserPosts);

// Búsqueda
router.get('/search', searchUsers);

module.exports = router;
