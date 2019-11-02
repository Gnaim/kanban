const mongoose = require('mongoose');

const { Schema } = mongoose;

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [
    {
      _id: false,
      email: String,
      role: String,
    },
  ],
  logoUrl: String,
  cards: [{ type: Schema.ObjectId, ref: 'Card' }],
});
projectSchema.set('timestamps', true);

mongoose.model('Project', projectSchema);
