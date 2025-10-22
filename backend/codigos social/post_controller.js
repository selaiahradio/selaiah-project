// backend/controllers/postController.js
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// @desc    Crear nueva publicación
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { content, type, image, sharedSong, visibility } = req.body;

    // Validar contenido
    if (!content && !image && !sharedSong) {
      return res.status(400).json({
        success: false,
        message: 'La publicación debe tener contenido, imagen o canción compartida'
      });
    }

    const post = await Post.create({
      user: req.user.id,
      content,
      type: type || 'text',
      image,
      sharedSong,
      visibility: visibility || 'public'
    });

    // Poblar información del usuario
    await post.populate('user', 'name avatar gender');

    // Emitir evento Socket.IO
    if (req.io) {
      req.io.emit('newPost', post);
    }

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear publicación',
      error: error.message
    });
  }
};

// @desc    Obtener feed de publicaciones
// @route   GET /api/posts/feed
// @access  Private
exports.getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Obtener publicaciones públicas y de usuarios seguidos
    const posts = await Post.find({
      $or: [
        { visibility: 'public' },
        { user: req.user.id }
      ]
    })
      .populate('user', 'name avatar gender')
      .populate('sharedSong.songId', 'title artist artwork')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Marcar posts que el usuario ha dado like
    const postsWithLikeStatus = posts.map(post => ({
      ...post,
      isLikedByUser: post.likes.some(like => like.toString() === req.user.id)
    }));

    const total = await Post.countDocuments({
      $or: [
        { visibility: 'public' },
        { user: req.user.id }
      ]
    });

    res.status(200).json({
      success: true,
      data: postsWithLikeStatus,
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
      message: 'Error al obtener feed',
      error: error.message
    });
  }
};

// @desc    Obtener publicación por ID
// @route   GET /api/posts/:id
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name avatar gender')
      .populate('sharedSong.songId', 'title artist artwork');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener publicación',
      error: error.message
    });
  }
};

// @desc    Actualizar publicación
// @route   PUT /api/posts/:id
// @access  Private
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada'
      });
    }

    // Verificar que sea el dueño
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para editar esta publicación'
      });
    }

    const { content } = req.body;

    post.content = content || post.content;
    post.isEdited = true;
    post.updatedAt = Date.now();

    await post.save();

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar publicación',
      error: error.message
    });
  }
};

// @desc    Eliminar publicación
// @route   DELETE /api/posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada'
      });
    }

    // Verificar que sea el dueño o admin
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No autorizado para eliminar esta publicación'
      });
    }

    // Eliminar comentarios asociados
    await Comment.deleteMany({ post: post._id });

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Publicación eliminada'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar publicación',
      error: error.message
    });
  }
};

// @desc    Dar/Quitar like a publicación
// @route   POST /api/posts/:id/like
// @access  Private
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada'
      });
    }

    const liked = await post.toggleLike(req.user.id);

    // Emitir evento Socket.IO
    if (req.io) {
      req.io.emit('postLikeUpdate', {
        postId: post._id,
        likesCount: post.likesCount
      });
    }

    res.status(200).json({
      success: true,
      liked,
      likesCount: post.likesCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al dar like',
      error: error.message
    });
  }
};

// @desc    Obtener comentarios de una publicación
// @route   GET /api/posts/:id/comments
// @access  Public
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.id,
      parentComment: null
    })
      .populate('user', 'name avatar gender')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener comentarios',
      error: error.message
    });
  }
};

// @desc    Crear comentario
// @route   POST /api/posts/:id/comments
// @access  Private
exports.createComment = async (req, res) => {
  try {
    const { content, parentComment } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada'
      });
    }

    const comment = await Comment.create({
      post: req.params.id,
      user: req.user.id,
      content,
      parentComment: parentComment || null
    });

    await comment.populate('user', 'name avatar gender');

    // Actualizar contador de comentarios
    post.commentsCount += 1;
    await post.save();

    // Si es respuesta, actualizar contador del comentario padre
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $inc: { repliesCount: 1 }
      });
    }

    // Emitir evento Socket.IO
    if (req.io) {
      req.io.emit('newComment', {
        postId: post._id,
        comment
      });
    }

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear comentario',
      error: error.message
    });
  }
};

// @desc    Eliminar comentario
// @route   DELETE /api/posts/:postId/comments/:commentId
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comentario no encontrado'
      });
    }

    // Verificar que sea el dueño o admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Actualizar contador
    await Post.findByIdAndUpdate(req.params.postId, {
      $inc: { commentsCount: -1 }
    });

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Comentario eliminado'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar comentario',
      error: error.message
    });
  }
};
