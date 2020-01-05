const users = mongoose.model('User');
const bcrypt = require('bcrypt');


exports.getById = (req, res, next) => {
  const payload = req.decoded;
  users.findOne({
    email: payload.data.email
  })
    .select('email firstName lastName tel profession imageUrl')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: "There was a problem retrieving user",
          error: "603"
        });
      } else {
        res.status(200).format({
          json: () => {
            res.json(user);
          },
        });
      }
    });
};

exports.UpdateUserById = (req, res, next) => {
  const payload = req.decoded;
  const previousEmail = payload.data.email;
  let realPassword;
  // const email = req.body.email ? req.body.email : '' ;
  const previousPasswordSent = req.body.password ? req.body.password : '';
  let newPasswordSent = req.body.newPassword ? req.body.newPassword : '';
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const tel = req.body.tel;
  const profession = req.body.profession;
  const imageUrl = req.body.imageUrl ? req.body.imageUrl : '';
  let stop = false;

  if (!firstName || !lastName || !tel || !profession) {
    res.status(403).send({
      message: "Bad request",
      error: 610
    });

  } else {
    users.findOne({
      email: previousEmail
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({
            message: "There was a problem retrieving user",
            error: 603
          });
        } else {
          realPassword = user.password;
          if (newPasswordSent) {
            //todo change that verify decoded with decoded

            bcrypt.compare(previousPasswordSent, realPassword, (err, matches) => {
              if (err) {
                stop = true;
                res.status(500).send({
                  message: 'There was a problem in the server contact the admin please.',
                  error: 603
                });
              } else if (!matches) {
                console.log(`previous password ${previousPasswordSent}`);
                stop = true;
                res.status(401).send({
                  message: "New password must be different than the previous one",
                  error: 613
                });
              } else {
                updateUserWithEncryptedPassword(newPasswordSent, res, previousEmail, firstName, lastName, tel, profession, imageUrl, res);
              }
            });
          } else {
            newPasswordSent = realPassword;
            updateOneUser(previousEmail, newPasswordSent, firstName, lastName, tel, profession, imageUrl, res);

          }

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
  return found;
};


function updateOneUser(previousEmail, newPasswordSent, firstName, lastName, tel, profession, imageUrl, res) {
  users.updateOne({
    email: previousEmail
  },
    {
      // email: email,
      password: newPasswordSent,
      firstName: firstName,
      lastName: lastName,
      tel: tel,
      profession: profession,
      imageUrl: imageUrl
    }, (err, user) => {
      if (err) {
        res.status(500).send({
          message: "There was a problem retrieving user",
          error: "test"
        });
      } else {
        res.status(200).format({
          json: () => {
            res.json(user);
          },
        });
      }
    });
}

function updateUserWithEncryptedPassword(newPasswordSent, res, previousEmail, firstName, lastName, tel, profession, imageUrl, res) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(500).send({
        message: 'There was a problem in the server contact the admin please.',
        error: 603
      });
    } else {
      bcrypt.hash(newPasswordSent, salt, (err, hashed) => {
        if (err) {
          res.status(500).send({
            message: 'There was a problem in the server contact the admin please.',
            error: 603
          });
        } else {
          updateOneUser(previousEmail, hashed, firstName, lastName, tel, profession, imageUrl, res)
        }
      });
    }
  });
}



