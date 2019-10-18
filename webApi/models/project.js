var mongoose = require('mongoose');  
var projectSchema = new mongoose.Schema({  
  name: String,
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