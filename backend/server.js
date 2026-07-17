require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const scholarshipRoutes = require('./routes/scholarships');

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://fundmystudy.vercel.app/',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/api/', (req, res) => res.json({ message: 'FundMyStudy API is running!' }));
app.use('/api/auth', authRoutes);
app.use('/api/scholarships', scholarshipRoutes);

app.use((req, res) => res.status(404).json({ detail: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ detail: err.message || 'Internal server error' });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
