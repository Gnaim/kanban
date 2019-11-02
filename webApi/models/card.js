var mongoose = require('mongoose'),
Schema = mongoose.Schema;  

var cardSchema = new mongoose.Schema({
  _project : { type: Schema.ObjectId, ref: 'Project' },
  title: {type: String, required: true},
  description: String,
    //   attachment: [{ type: Schema.ObjectId, ref: 'Attachment' }],
  checklists: [{ type: Schema.ObjectId, ref: 'Checklist' }],
  members: [{ type: Schema.ObjectId, ref: 'User' }],
  status: {type: String, required: true},
});
cardSchema.set('timestamps', true);


mongoose.model('Card', cardSchema);