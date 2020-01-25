const auths = require('../middlewares/auths');
const sendConfirmationMail = require('../utils/mailSender').sendConfirmationMail;

const users = mongoose.model('User');
const invitations = mongoose.model('Invitations');
const projects = mongoose.model('Project');

const confirmationUsers = mongoose.model('confirmationUsers');

exports.post = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { tel } = req.body;
  const { profession } = req.body;
  const checkedIn = new Date();
  const { image } = req.body;
  if (email == null || password == null || firstName == null || lastName == null || tel == null || profession == null) {
    res.status(400).send({
      message: "email, password, tel,profession,image, last name and first name are required to create project",
      error: 610
    })
  } else {

    users.findOne({
      email,
    }, (err, user) => {
      if (err) {
        res.status(500).send({
          message: 'There was a problem to create user to the database.',
          error: 603
        });

      } else if (user) {
        res.status(401).send({
          message: `${email} already exists`,
          error: 602
        });
      } else {
        signup_user(email, password, firstName, lastName, tel, profession, image, checkedIn, image, res);
      }
    });

  }
};

signup_user = function (email, password, firstName, lastName, tel, profession, image, checkedIn, image, res) {
  confirmationUsers.create({
    email,
    password,
    firstName,
    lastName,
    tel,
    profession,
    image,
    checkedIn,
  }, (err, user) => {
    if (err) {
      res.status(500).send({
        message: 'There was a problem to create user to the database.',
        error: 603
      });
    } else {
      sendConfirmationMail(user._id, email, firstName, lastName);
      res.status(200).send({ message: `confirmation mail has been sent to ${email}` });
    }
  });



}