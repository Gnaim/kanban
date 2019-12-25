const bcrypt = require('bcrypt');
const auths = require('../middlewares/auths');

const users = mongoose.model('User');

exports.login = (req, res, next) => {

  // to do update methode with exec() and clean method
  // to do clear response and add expiresAt
  const { email } = req.body;
  const { password } = req.body;

  if (email == null || password == null) {
    // status : 403 {message : "",error : 610}
    res.status(403).send({message:'Bad request',
                          error: 610})
  } else {
    users.findOne({
      email,
    }, (err, userFound) => {
      if (err) {
        res.status(500).send({message:'There was a problem to create user to the database.',
                              error: 603});
        console.error(err);
      } else if (userFound) {
        users.findById({
          _id: userFound.id,
        }, (err, user) => {
          if (err) {
            console.error(err);
            res.status(500).send({messege:'There was a server probleme.',
                                  error: 603});
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
                res.status(401).send({message:'please check your email + password.',
                                      error: 600});
              }
            });
          }
        });
      } else {
        // need to check status code
        res.status(401).send({message:'please check your email',
                              error: 600});
      }
    });
  }
};
