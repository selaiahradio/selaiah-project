// ========================================
// SELAIAH RADIO - MESSAGES ROUTES
// iHostCast Ltd © 2025
// ========================================

const express = require('express');
const router = express.Router();
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
const { protect } = require('../middleware/auth');

// Conversaciones
router.get('/conversations', protect, getConversations);
router.post('/conversations', protect, getOrCreateConversation);
router.get('/conversations/:conversationId', protect, getMessages);

// Enviar mensajes
router.post('/send', protect, sendMessage);
router.post('/send-media', protect, sendMediaMessage);
router.post('/send-voice', protect, sendVoiceNote);

// Videollamadas
router.post('/video-call/start', protect, startVideoCall);
router.put('/video-call/:messageId/end', protect, endVideoCall);

// Reacciones
router.post('/:messageId/react', protect, addReaction);

// Eliminar mensaje
router.delete('/:messageId', protect, deleteMessage);

// Indicador de escritura
router.post('/typing', protect, sendTypingIndicator);

module.exports = router;
