// backend/controllers/messageController.js
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

// @desc    Obtener todas las conversaciones del usuario
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id
    })
      .populate('participants', 'name avatar gender')
      .populate('lastMessage.sender', 'name avatar')
      .sort({ updatedAt: -1 });

    // Formatear respuesta
    const formattedConversations = conversations.map(conv => {
      const otherParticipant = conv.participants.find(
        p => p._id.toString() !== req.user.id
      );

      return {
        _id: conv._id,
        type: conv.type,
        name: conv.type === 'group' ? conv.name : otherParticipant?.name,
        avatar: conv.type === 'group' ? conv.avatar : otherParticipant?.avatar,
        participant: otherParticipant,
        lastMessage: conv.lastMessage,
        unreadCount: conv.unreadCount.get(req.user.id) || 0,
        updatedAt: conv.updatedAt
      };
    });

    res.status(200).json({
      success: true,
      data: formattedConversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener conversaciones',
      error: error.message
    });
  }
};

// @desc    Obtener o crear conversación con un usuario
// @route   POST /api/messages/conversations
// @access  Private
exports.getOrCreateConversation = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'ID de usuario requerido'
      });
    }

    // Verificar que el usuario existe
    const otherUser = await User.findById(userId);
    if (!otherUser) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Buscar conversación existente
    let conversation = await Conversation.findOne({
      type: 'private',
      participants: { $all: [req.user.id, userId] }
    })
      .populate('participants', 'name avatar gender');

    // Si no existe, crear nueva
    if (!conversation) {
      conversation = await Conversation.create({
        type: 'private',
        participants: [req.user.id, userId],
        createdBy: req.user.id
      });

      await conversation.populate('participants', 'name avatar gender');
    }

    res.status(200).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener/crear conversación',
      error: error.message
    });
  }
};

// @desc    Obtener mensajes de una conversación
// @route   GET /api/messages/conversations/:conversationId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Verificar acceso a la conversación
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversación no encontrada'
      });
    }

    // Obtener mensajes
    const messages = await Message.find({
      conversation: conversationId,
      deletedFor: { $ne: req.user.id }
    })
      .populate('sender', 'name avatar gender')
      .populate('replyTo', 'content sender type')
      .populate('reactions.user', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Message.countDocuments({
      conversation: conversationId,
      deletedFor: { $ne: req.user.id }
    });

    // Marcar mensajes como leídos
    await Message.updateMany(
      {
        conversation: conversationId,
        sender: { $ne: req.user.id },
        'readBy.user': { $ne: req.user.id }
      },
      {
        $push: {
          readBy: {
            user: req.user.id,
            readAt: new Date()
          }
        }
      }
    );

    // Resetear contador de no leídos
    await conversation.resetUnread(req.user.id);

    res.status(200).json({
      success: true,
      data: messages.reverse(),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener mensajes',
      error: error.message
    });
  }
};

// @desc    Enviar mensaje de texto
// @route   POST /api/messages/send
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content, type, replyTo } = req.body;

    if (!conversationId || !content) {
      return res.status(400).json({
        success: false,
        message: 'Conversación y contenido requeridos'
      });
    }

    // Verificar acceso
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversación no encontrada'
      });
    }

    // Crear mensaje
    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      type: type || 'text',
      content,
      replyTo: replyTo || null
    });

    await message.populate('sender', 'name avatar gender');
    if (replyTo) {
      await message.populate('replyTo', 'content sender type');
    }

    // Actualizar última mensaje en conversación
    conversation.lastMessage = {
      content: type === 'text' ? content : `[${type}]`,
      sender: req.user.id,
      createdAt: message.createdAt,
      type
    };
    conversation.updatedAt = new Date();

    // Incrementar contador de no leídos para otros participantes
    conversation.participants.forEach(participantId => {
      if (participantId.toString() !== req.user.id) {
        conversation.incrementUnread(participantId);
      }
    });

    await conversation.save();

    // Emitir evento Socket.IO
    if (req.io) {
      conversation.participants.forEach(participantId => {
        if (participantId.toString() !== req.user.id) {
          req.io.to(participantId.toString()).emit('newMessage', {
            conversationId,
            message
          });
        }
      });
    }

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar mensaje',
      error: error.message
    });
  }
};

// @desc    Enviar archivo multimedia
// @route   POST /api/messages/send-media
// @access  Private
exports.sendMediaMessage = async (req, res) => {
  try {
    const { conversationId, type, mediaUrl, filename, size, duration, thumbnail } = req.body;

    if (!conversationId || !mediaUrl || !type) {
      return res.status(400).json({
        success: false,
        message: 'Datos incompletos'
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversación no encontrada'
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      type,
      content: filename || 'Archivo multimedia',
      media: {
        url: mediaUrl,
        filename,
        size,
        duration,
        thumbnail
      }
    });

    await message.populate('sender', 'name avatar gender');

    // Actualizar conversación
    conversation.lastMessage = {
      content: `[${type}]`,
      sender: req.user.id,
      createdAt: message.createdAt,
      type
    };
    conversation.updatedAt = new Date();
    await conversation.save();

    // Socket.IO
    if (req.io) {
      conversation.participants.forEach(participantId => {
        if (participantId.toString() !== req.user.id) {
          req.io.to(participantId.toString()).emit('newMessage', {
            conversationId,
            message
          });
        }
      });
    }

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar multimedia',
      error: error.message
    });
  }
};

// @desc    Enviar nota de voz
// @route   POST /api/messages/send-voice
// @access  Private
exports.sendVoiceNote = async (req, res) => {
  try {
    const { conversationId, audioUrl, duration } = req.body;

    if (!conversationId || !audioUrl) {
      return res.status(400).json({
        success: false,
        message: 'Conversación y audio requeridos'
      });
    }

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversación no encontrada'
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      type: 'voice_note',
      content: '🎤 Nota de voz',
      media: {
        url: audioUrl,
        duration: duration || 0
      }
    });

    await message.populate('sender', 'name avatar gender');

    // Actualizar conversación
    conversation.lastMessage = {
      content: '🎤 Nota de voz',
      sender: req.user.id,
      createdAt: message.createdAt,
      type: 'voice_note'
    };
    conversation.updatedAt = new Date();
    await conversation.save();

    // Socket.IO
    if (req.io) {
      conversation.participants.forEach(participantId => {
        if (participantId.toString() !== req.user.id) {
          req.io.to(participantId.toString()).emit('newMessage', {
            conversationId,
            message
          });
        }
      });
    }

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar nota de voz',
      error: error.message
    });
  }
};

// @desc    Iniciar videollamada
// @route   POST /api/messages/video-call/start
// @access  Private
exports.startVideoCall = async (req, res) => {
  try {
    const { conversationId } = req.body;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversación no encontrada'
      });
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      type: 'video_call',
      content: '📹 Videollamada',
      callData: {
        status: 'completed',
        startedAt: new Date()
      }
    });

    await message.populate('sender', 'name avatar gender');

    // Socket.IO - Notificar a otros participantes
    if (req.io) {
      conversation.participants.forEach(participantId => {
        if (participantId.toString() !== req.user.id) {
          req.io.to(participantId.toString()).emit('incomingVideoCall', {
            conversationId,
            callerId: req.user.id,
            callerName: req.user.name,
            messageId: message._id
          });
        }
      });
    }

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al iniciar videollamada',
      error: error.message
    });
  }
};

// @desc    Finalizar videollamada
// @route   PUT /api/messages/video-call/:messageId/end
// @access  Private
exports.endVideoCall = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { duration, status } = req.body;

    const message = await Message.findById(messageId);

    if (!message || message.type !== 'video_call') {
      return res.status(404).json({
        success: false,
        message: 'Llamada no encontrada'
      });
    }

    message.callData.endedAt = new Date();
    message.callData.duration = duration || 0;
    message.callData.status = status || 'completed';
    message.content = `📹 Videollamada (${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')})`;

    await message.save();

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al finalizar videollamada',
      error: error.message
    });
  }
};

// @desc    Añadir reacción a mensaje
// @route   POST /api/messages/:messageId/react
// @access  Private
exports.addReaction = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    await message.addReaction(req.user.id, emoji);

    // Socket.IO
    if (req.io) {
      req.io.to(message.conversation.toString()).emit('messageReaction', {
        messageId,
        userId: req.user.id,
        emoji
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al añadir reacción',
      error: error.message
    });
  }
};

// @desc    Eliminar mensaje
// @route   DELETE /api/messages/:messageId
// @access  Private
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { deleteForEveryone } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Mensaje no encontrado'
      });
    }

    if (message.sender.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    if (deleteForEveryone) {
      // Eliminar para todos
      message.isDeleted = true;
      message.content = 'Este mensaje fue eliminado';
      await message.save();
    } else {
      // Eliminar solo para el usuario
      message.deletedFor.push(req.user.id);
      await message.save();
    }

    // Socket.IO
    if (req.io && deleteForEveryone) {
      req.io.to(message.conversation.toString()).emit('messageDeleted', {
        messageId
      });
    }

    res.status(200).json({
      success: true,
      message: 'Mensaje eliminado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar mensaje',
      error: error.message
    });
  }
};

// @desc    Indicador de escritura
// @route   POST /api/messages/typing
// @access  Private
exports.sendTypingIndicator = async (req, res) => {
  try {
    const { conversationId, isTyping } = req.body;

    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: req.user.id
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversación no encontrada'
      });
    }

    // Socket.IO
    if (req.io) {
      conversation.participants.forEach(participantId => {
        if (participantId.toString() !== req.user.id) {
          req.io.to(participantId.toString()).emit('userTyping', {
            conversationId,
            userId: req.user.id,
            isTyping
          });
        }
      });
    }

    res.status(200).json({
      success: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al enviar indicador',
      error: error.message
    });
  }
};
