const auths = require('../middlewares/auths');
const sendemail = require('../utils/mailSender').sendMail;

const users = mongoose.model('User');
const invitations = mongoose.model('Invitations');
const projects = mongoose.model('Project');

exports.post = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  const { firstName } = req.body;
  const { lastName } = req.body;
  const { tel } = req.body;
  const { profession } = req.body;
  const { imageUrl } = req.body;
  const checkedIn = new Date();

  if (email == null || password == null || firstName == null || lastName == null || tel == null || profession == null) {
    res.status(400).send({
      message: "email, password, tel,profession, last name and first name are required to create project",
      error: 610
    })
  } else {
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
            res.status(500).send({
              message: 'There was a problem to create user to the database.',
              error: 603
            });
          } else {
            checkProjectInvitations(email, res);

            sendemail(email, firstName, lastName);
            res.status(200).send({ message: `confirmation mail has been sent to ${email}` });
          }
        });
      } else {
        res.status(401).send({
          message: `${email} already exists`,
          error: 602
        });
      }
    });
  }
};

function checkProjectInvitations(email, res) {
  isEmailInvited(email).then((invited) => {
    if (invited) {
      invitations.find({ email: email }, (err, results) => {
        if (err) {
          res.status(500).send({
            message: 'There an internal problem please contact administrators.',
            error: 603
          });
        } else if (results.length) {
          results.array.forEach(element => {
            addMemberToProject(element.email, element.projectId, res);
          });

        }

      });
      invitations.delete({ email: email }, function (err) {
        if (err) {
          res.status(500).send({
            message: 'There an internal problem please contact administrators.',
            error: 603
          });
        }
      });

      projects.updateOne



    }
  });
}

function addMemberToProject(email, projectId, res) {
  projects.findOne({ _id: projectId }, (err, project) => {
    if (err) {
      res.status(500).send({
        message: 'There was an internal problem please contact administrators.',
        error: 603
      });
    } else if (!project) {
      res.status(500).send({
        message: 'There was an internal problem please contact administrators.',
        error: 603
      });
    } else {
      users.findOne({ email: email }, (err, member) => {
        if (err) {
          res.status(500).send({
            message: 'There was an internal problem please contact administrators.',
            error: 603
          });
        } else if (!member) {
          res.status(500).send({
            message: 'There was an internal problem please contact administrators.',
            error: 603
          });

        } else {
          var updatedMembers = [];
          updatedMembers = projects.members;
          updatedMembers.push(member);
          projects.updateOne({ _id: projectId }, { members: updatedMembers });
        }
      });



    }

  });
}

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
};


isEmailInvited = async (email) => {
  found = false;
  await invitations.find({
    email,
  }, (err, user) => {
    if (err) {
      found = true;
    } else {
      found = !!user.length;
    }
  });
};
