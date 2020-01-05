const auths = require('../middlewares/auths');
const sendConfirmationMail = require('../utils/mailSender').sendConfirmationMail;

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
  const checkedIn = new Date();
  const imageUrl = req.file ? 'profilePicture/'+req.file.filename : null;
  if (email == null || password == null || firstName == null || lastName == null || tel == null || profession == null
      || imageUrl == null) {
    res.status(400).send({
      message: "email, password, tel,profession,image, last name and first name are required to create project",
      error: 610
    })
  } else {
    isEmailDuplicated(email).then((exist) => {
      console.log(`exist${exist}`);
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

            sendConfirmationMail(email, firstName, lastName);
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
  invitations.find({ email: email }, (err, results) => {
    if (err) {
      res.status(500).send({
        message: 'There an internal problem please contact administrators.',
        error: 603
      });
    } else if (results.length) {
      console.info(results);
      addMemberToProjects(email, results, res);
    } else {
      console.info(results);
    }

  });


}

function addMemberToProjects(email, memberInvitations, res) {

  users.findOne({ email: email }, (err, userToAdd) => {
    if (err) {
      res.status(500).send({
        message: 'There was an internal problem please contact administrators.',
        error: 603
      });
    } else if (!userToAdd) {
      res.status(500).send({
        message: 'There was an internal problem please contact administrators.',
        error: 603
      });
    } else {
      var projectIds = memberInvitations.map(invit => invit.projectId);
      updateProjects(email, projectIds);
      console.log("before delete");
      deleteInvitations(email);

    }

  });
}



function deleteInvitations(email) {
  invitations.deleteMany({ email: email }, function (err) {
    console.log("email");
    console.log(email);
    if (err) {
      res.status(500).send({
        message: 'There an internal problem please contact administrators.',
        error: 603
      });
    }
  });

}

function updateProjects(email, projectIds) {
  var member = {
    email: email,
    role: 'member'
  };
  projects.find({ _id: { $in: projectIds } }, (err, projectList) => {
    if (err) {
      res.status(500).send({
        message: 'There was an internal problem please contact administrators.',
        error: 603
      });
    } else if (!projectList.length) {
      res.status(500).send({
        message: 'There was an internal problem please contact administrators.',
        error: 603
      });
    } else {
      projectList.forEach(element => {

        updatedMembers = element.members;
        updatedMembers.push(member);
        console.info(updatedMembers);
        projects.updateOne({ _id: element._id }, { members: updatedMembers }).exec((err, project) => {
          if (err) {
            res.status(500).send({
              message: 'There was an internal problem please contact administrators.',
              error: 603
            });
          } else {
            console.info(` update result ${JSON.stringify(project)}`);
          }
        });
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
