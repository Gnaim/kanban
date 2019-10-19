var mongoose = require('mongoose');  
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  tel: String,
  imageUrl: String,
  checkedIn: Date
});

userSchema.pre('save', function(next) {
  const userSchema = this
  bcrypt.genSalt(10, function(err, salt) {
      if (err) {
          res.json({ success: false, msg: err.message })
      } else {
          bcrypt.hash(userSchema.password, salt, function(err, hashed) {
              if (err) {
                  return next(err)
              }
              userSchema.password = hashed
              next()
          })
      }
  });
});

mongoose.model('User', userSchema);