const users = mongoose.model('User');


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
  const previousPasswordSent = req.body.previousPassword ? req.body.previousPassword : '';
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
    // }
    //  else if (previousEmail !== email ) {
    //   isEmailDuplicated(email).then((exist) => {
    //      if (exist) {
    //       res.status(401).send({message:`${email} already exists`,
    //                             error: 602});
    //     }
    //   });
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
            if (realPassword !== previousPasswordSent) {
              console.log(realPassword);
              stop = true;
              res.status(401).send({
                message: "New password must be different than the previous one",
                error: 600
              });
            }
          } else {
            newPasswordSent = realPassword;
          }
          if (!stop) {
            users.update({
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