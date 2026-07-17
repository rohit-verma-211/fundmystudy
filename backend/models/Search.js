const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const searchSchema = new mongoose.Schema({
  id:        { type: String, default: uuidv4 },
  userId:    { type: String, required: true },
  kind:      { type: String, enum: ['india', 'abroad'], required: true },
  form:      { type: mongoose.Schema.Types.Mixed },
  result:    { type: mongoose.Schema.Types.Mixed },
  count:     { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

searchSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret._id; delete ret.__v;
    ret.user_id    = ret.userId;
    ret.created_at = ret.createdAt;
    delete ret.userId; delete ret.createdAt;
    return ret;
  },
});

module.exports = mongoose.model('Search', searchSchema);
