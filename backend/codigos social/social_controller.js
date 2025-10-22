// backend/controllers/socialController.js
const User = require('../models/User');
const Follow = require('../models/Follow');
const Post = require('../models/Post');

// @desc    Seguir/Dejar de seguir usuario
// @route   POST /api/social/follow/:userId
// @access  Private
exports.toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;

    // No puedes seguirte a ti mismo
    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'No puedes seguirte a ti mismo'
      });
    }

    // Verificar que el usuario existe
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar si ya sigue al usuario
    const existingFollow = await Follow.findOne({
      follower: req.user.id,
      following: userId
    });

    if (existingFollow) {
      // Dejar de seguir
      await existingFollow.deleteOne();

      return res.status(200).json({
        success: true,
        following: false,
        message: `Dejaste de seguir a ${userToFollow.name}`
      });
    } else {
      // Seguir
      await Follow.create({
        follower: req.user.id,
        following: userId
      });

      // Notificación (implementar después)
      // await createNotification(userId, 'follow', req.user.id);

      return res.status(200).json({
        success: true,
        following: true,
        message: `Ahora sigues a ${userToFollow.name}`
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al seguir/dejar de seguir',
      error: error.message
    });
  }
};

// @desc    Obtener seguidores de un usuario
// @route   GET /api/social/followers/:userId
// @access  Public
exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const followers = await Follow.find({ following: userId })
      .populate('follower', 'name avatar gender')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Follow.countDocuments({ following: userId });

    res.status(200).json({
      success: true,
      data: followers.map(f => f.follower),
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
      message: 'Error al obtener seguidores',
      error: error.message
    });
  }
};

// @desc    Obtener usuarios seguidos
// @route   GET /api/social/following/:userId
// @access  Public
exports.getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const following = await Follow.find({ follower: userId })
      .populate('following', 'name avatar gender')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Follow.countDocuments({ follower: userId });

    res.status(200).json({
      success: true,
      data: following.map(f => f.following),
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
      message: 'Error al obtener siguiendo',
      error: error.message
    });
  }
};

// @desc    Obtener perfil de usuario con estadísticas
// @route   GET /api/social/profile/:userId
// @access  Public
exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Contar seguidores y siguiendo
    const followersCount = await Follow.countDocuments({ following: userId });
    const followingCount = await Follow.countDocuments({ follower: userId });

    // Contar publicaciones
    const postsCount = await Post.countDocuments({ user: userId });

    // Verificar si el usuario actual sigue a este usuario
    let isFollowing = false;
    if (req.user) {
      const follow = await Follow.findOne({
        follower: req.user.id,
        following: userId
      });
      isFollowing = !!follow;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: {
          followers: followersCount,
          following: followingCount,
          posts: postsCount
        },
        isFollowing
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil',
      error: error.message
    });
  }
};

// @desc    Obtener publicaciones de un usuario
// @route   GET /api/social/profile/:userId/posts
// @access  Public
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Verificar que el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Determinar visibilidad
    let query = { user: userId };
    
    if (req.user && req.user.id === userId) {
      // Si es el propio usuario, mostrar todo
      query = { user: userId };
    } else {
      // Si es otro usuario, solo públicas
      query = { user: userId, visibility: 'public' };
    }

    const posts = await Post.find(query)
      .populate('user', 'name avatar gender')
      .populate('sharedSong.songId', 'title artist artwork')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Marcar posts con like del usuario actual
    const postsWithLikeStatus = posts.map(post => ({
      ...post,
      isLikedByUser: req.user ? post.likes.some(like => like.toString() === req.user.id) : false
    }));

    const total = await Post.countDocuments(query);

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
      message: 'Error al obtener publicaciones del usuario',
      error: error.message
    });
  }
};

// @desc    Buscar usuarios
// @route   GET /api/social/search
// @access  Public
exports.searchUsers = async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Parámetro de búsqueda requerido'
      });
    }

    const skip = (page - 1) * limit;

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ]
    })
      .select('name avatar gender email')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments({
      $or: [
        { name: { $regex: q, $options