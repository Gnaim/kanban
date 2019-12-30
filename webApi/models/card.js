const mongoose = require('mongoose');

const { Schema } = mongoose;

const cardSchema = new mongoose.Schema({
  _project: { type: Schema.ObjectId, ref: 'Project' },
  title: { type: String, required: true },
  description: String,
  //   attachment: [{ type: Schema.ObjectId, ref: 'Attachment' }],
  checklist: [
    { 
      _id: false,
      title: String,
      done: Number,  
    }
  ],
  members: [{ type: Schema.ObjectId, ref: 'User' }],
  status: { type: String, required: true, default: 'backlog' },
  type: { type: String, required: true, default: 'dev'},
  createdBy : {type: Schema.ObjectId, ref: 'User'},
});
cardSchema.set('timestamps', true);


mongoose.model('Card', cardSchema);
