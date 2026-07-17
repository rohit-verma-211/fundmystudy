const jwt  = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function authMiddleware(req, res, next) {
  try {
    let token = req.cookies?.access_token;
    if (!token) {
      const h = req.headers.authorization || '';
      if (h.startsWith('Bearer ')) token = h.slice(7);
    }
    if (!token) return res.status(401).json({ detail: 'Not authenticated' });

    const payload = jwt.verify(token, process.env.JWT_SECRET || 'changeme');
    const user = await User.findOne({ id: payload.sub });
    if (!user) return res.status(401).json({ detail: 'User not found' });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ detail: 'Invalid or expired token' });
  }
};
