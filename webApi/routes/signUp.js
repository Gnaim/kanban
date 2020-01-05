const express = require('express');
mongoose = require('mongoose');
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'profilePicture/')
  },
  filename: function (req, file, cb) {
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, Date.now() + ext)
  }
});
const upload = multer({
  storage: storage
}).single('image');

const router = express.Router();
const signUpController = require('./../controllers/signUpController');

router.route('/')
  .post(upload,signUpController.post);


module.exports = router;
