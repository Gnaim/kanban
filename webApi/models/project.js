var mongoose = require('mongoose');  
var projectSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  description: String,
  members: [
      {
        email: String,
        role: String
      }
  ], 
  logoUrl: String,
  createdAt: Date
});
mongoose.model('Project', projectSchema);