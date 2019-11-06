const bcrypt = require('bcrypt');
const auths = require('../middlewares/auths');

const users = mongoose.model('User');

exports.login = (req, res, next) => {

  // to do update methode with exec() and clean method
  // to do clear response and add expiresAt
  const { email } = req.body;
  const { password } = req.body;


  users.findOne({
    email,
  }, (err, userFound) => {
    if (err) {
      res.status(500).send('There was a problem to create user to the database.');
      console.error(err);
    } else if (userFound) {
      users.findById({
        _id: userFound.id,
      }, (err, user) => {
        if (err) {
          console.error(err);
          res.status(500).send('thre was a server probleme');
        } else {
          bcrypt.compare(password, user.password, (err, matches) => {
            if (matches) {
              const payload = {
                email,
              };
              res.json({
                token: auths.createJWToken(payload, '24h'),
              });
            } else {
              // need to check status code
              res.status(400).send('please check your email + password');
            }
          });
        }
      });
    } else {
      // need to check status code
      res.status(400).send('please check your email');
    }
  });
};
