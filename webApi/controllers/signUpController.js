const auths = require('../middlewares/auths');
const sendemail = require('../utils/mailSender').sendMail;

var users = mongoose.model('User');

exports.post = (req, res, next) => {
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var tel = req.body.tel;
    var imageUrl = req.body.imageUrl;
    let checkedIn = new Date();
  
    isEmailDuplicated(email).then((exist) => {
     if (!exist) {
      users.create({
        email : email,
        password : password,
        firstName: firstName,
        lastName: lastName,
        tel: tel,
        imageUrl: imageUrl,
        checkedIn: checkedIn
      },(err, user)=> {
        if (err) {
          res.send("There was a problem to create user to the database.");
          console.error(err);
        } else {
            sendemail(email, firstName, lastName);
            res.send('confirmation mail has been sent to ' + email);
          }
        })
      }
      else {
        res.send( email + ' already exists');
      }
    });
    
};

isEmailDuplicated = async (email) => {
  found = false;
  await users.find({
    email : email
  },(err,user) => {
    if (err) {
      found = true;
    }
    else {
      found = user.length ? true : false;
    }
  });
  return found;
}