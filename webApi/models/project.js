var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var projectSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  description: String,
  members: [
      { _id:false,
        email: String,
        role: String
      }
  ], 
  logoUrl: String,
  cards: [{ type: Schema.ObjectId, ref: 'Card' }],
});
projectSchema.set('timestamps', true);

mongoose.model('Project', projectSchema);
