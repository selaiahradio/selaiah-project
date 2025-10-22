// ========================================
// SELAIAH RADIO - AUTH MIDDLEWARE
// iHostCast Ltd © 2025
// ========================================

const protect = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      success: false,
      error: 'No autenticado. Por favor inicia sesión.' 
    });
  }
  next();
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ 
        success: false,
        error: 'No autenticado' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        error: 'Permisos insuficientes' 
      });
    }
    
    next();
  };
};

module.exports = { protect, requireRole };
