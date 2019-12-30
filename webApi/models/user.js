const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tel: String,
  profession: String,
  imageUrl: String,
});

userSchema.set('timestamps', true);

userSchema.pre('save', function (next) {
  const userSchema = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.json({ success: false, msg: err.message });
    } else {
      bcrypt.hash(userSchema.password, salt, (err, hashed) => {
        if (err) {
          return next(err);
        }
        userSchema.password = hashed;
        next();
      });
    }
  });
});

mongoose.model('User', userSchema);
