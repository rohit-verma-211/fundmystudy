const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'changeme';

function issueToken(res, userId) {
  const token = jwt.sign({ sub: userId }, SECRET, { expiresIn: '30d' });
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ detail: 'Name, email and password required' });
    if (password.length < 6)
      return res.status(400).json({ detail: 'Password must be at least 6 characters' });
    if (await User.findOne({ email: email.toLowerCase() }))
      return res.status(400).json({ detail: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 12);
    const user   = await User.create({ name, email, password: hashed });
    issueToken(res, user.id);
    return res.status(201).json(user.toJSON());
  } catch (err) { next(err); }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ detail: 'Email and password required' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ detail: 'Invalid email or password' });

    issueToken(res, user.id);
    return res.json(user.toJSON());
  } catch (err) { next(err); }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('access_token');
  return res.json({ ok: true });
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => res.json(req.user.toJSON()));

module.exports = router;
