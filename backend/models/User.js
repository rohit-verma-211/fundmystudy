const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id:        { type: String, default: uuidv4 },
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id; delete ret.__v; delete ret.password;
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
