// ========================================
// SELAIAH RADIO - POSTS ROUTES
// iHostCast Ltd © 2025
// ========================================

const express = require('express');
const router = express.Router();
const {
  createPost,
  getFeed,
  getPost,
  updatePost,
  deletePost,
  toggleLike,
  getComments,
  createComment,
  deleteComment
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// Rutas de publicaciones
router.post('/', protect, createPost);
router.get('/feed', protect, getFeed);
router.get('/:id', getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

// Likes
router.post('/:id/like', protect, toggleLike);

// Comentarios
router.get('/:id/comments', getComments);
router.post('/:id/comments', protect, createComment);
router.delete('/:postId/comments/:commentId', protect, deleteComment);

module.exports = router;
