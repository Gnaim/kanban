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
<<<<<<< HEAD
<<<<<<< HEAD

  if (email == null || password == null || firstName == null || lastName == null ){
    res.status(400).send({message:"email, password, last name and and first name are required to create project",
                        error: 610})
  } else {
    isEmailDuplicated(email).then((available) => {
      // to do update methode with exec()
      // to do add member to unconfirmed member
      if (available) {
=======
=======
>>>>>>> bb8d0239bdfa49030683896e9266c2212ed6e871
  if (email == null || password == null || firstName == null || lastName == null ){
    res.status(400).send({message:"email, password, last name and and first name are required to create project",
                        error: 610})
  }else{
    isEmailDuplicated(email).then((exist) => {
      // to do update methode with exec()
      // to do add member to unconfirmed member
      if (!exist) {
<<<<<<< HEAD
>>>>>>> correct signup and login response messages
=======
>>>>>>> bb8d0239bdfa49030683896e9266c2212ed6e871
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
            res.status(500).send({message:'There was a problem to create user to the database.',
<<<<<<< HEAD
            error: 603});
          } else {
            sendemail(email, firstName, lastName);
            res.status(200).send({message:`confirmation mail has been sent to ${email}`});
            }
=======
                                  error: 603});
            console.error(err);
          } else {
            sendemail(email, firstName, lastName);
            res.status(200).send({message:`confirmation mail has been sent to ${email}`});
          }
>>>>>>> bb8d0239bdfa49030683896e9266c2212ed6e871
        });
      } else {
        res.status(401).send({message:`${email} already exists`,
                              error: 602});
      }
    });
<<<<<<< HEAD
  };
  }

var isEmailDuplicated = function(email) {
  return new Promise(function(resolve, reject) {
    available = false;
    /*stuff using username, password*/
    users.find({
      email,
    }, (err, user) => {
      if (err) {
        resolve(false);
      } else {
        if (user.length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    });
=======
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
>>>>>>> bb8d0239bdfa49030683896e9266c2212ed6e871
  });
}
