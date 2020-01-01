const auths = require('../middlewares/auths');
const sendemail = require('../utils/mailSender').sendMail;

const users = mongoose.model('User');

exports.post = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { tel } = req.body;
  const { profession } = req.body;
  const { imageUrl } = req.body;
  const checkedIn = new Date();

  if (email == null || password == null || firstName == null || lastName == null || tel == null || profession == null){
    res.status(400).send({message:"email, password, tel,profession, last name and first name are required to create project",
                        error: 610})
  }else{
    isEmailDuplicated(email).then((exist) => {
      // to do update methode with exec()
      // to do add member to unconfirmed member
      if (!exist) {
        users.create({
          email,
          password,
          firstName,
          lastName,
          tel,
          profession,
          imageUrl,
          checkedIn,
        }, (err, user) => {
          if (err) {
            res.status(500).send({message:'There was a problem to create user to the database.',
            error: 603});
          } else {
            sendemail(email, firstName, lastName);
            res.status(200).send({message:`confirmation mail has been sent to ${email}`});
            }
        });
      } else {
        res.status(401).send({message:`${email} already exists`,
                              error: 602});
      }
    });
  }
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
}
