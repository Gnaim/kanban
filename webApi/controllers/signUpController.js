const auths = require('../middlewares/auths');
const sendemail = require('../utils/mailSender').sendMail;

const users = mongoose.model('User');

exports.post = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { tel } = req.body;
  const { imageUrl } = req.body;
  const checkedIn = new Date();

  isEmailDuplicated(email).then((exist) => {
    if (!exist) {
      users.create({
        email,
        password,
        firstName,
        lastName,
        tel,
        imageUrl,
        checkedIn,
      }, (err, user) => {
        if (err) {
          res.send('There was a problem to create user to the database.');
          console.error(err);
        } else {
          sendemail(email, firstName, lastName);
          res.send(`confirmation mail has been sent to ${email}`);
        }
      });
    } else {
      res.send(`${email} already exists`);
    }
  });
};

isEmailDuplicated = async (email) => {
  found = false;
  await users.find({
    email,
  }, (err, user) => {
    if (err) {
      found = true;
    } else {
      found = !!user.length;
    }
  });
  return found;
};
