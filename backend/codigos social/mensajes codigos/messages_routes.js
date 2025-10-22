// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage,
  sendMediaMessage,
  sendVoiceNote,
  startVideoCall,
  endVideoCall,
  addReaction,
  deleteMessage,
  sendTypingIndicator
} = require('../controllers/messageController');

// Conversaciones
router.get('/conversations', protect, getConversations);
router.post('/conversations', protect, getOrCreateConversation);
router.get('/conversations/:conversationId', protect, getMessages);

// Mensajes
router.post('/send', protect, sendMessage);
router.post('/send-media', protect, sendMediaMessage);
router.post('/send-voice', protect, sendVoiceNote);
router.post('/typing', protect, sendTypingIndicator);

// Videollamadas
router.post('/video-call/start', protect, startVideoCall);
router.put('/video-call/:messageId/end', protect, endVideoCall);

// Reacciones
router.post('/:messageId/react', protect, addReaction);

// Eliminar
router.delete('/:messageId', protect, deleteMessage);

module.exports = router;
