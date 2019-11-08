const mongoose = require('mongoose');
const cards = mongoose.model('Card');

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

projectSchema.pre('remove',(next) => {
  // cards.deleteMany({ submission_ids: this._id }, next);
  console.log('delete cards');
  next();
});

mongoose.model('Project', projectSchema);
