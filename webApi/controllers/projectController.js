const projects = mongoose.model('Project');
const cards = mongoose.model('Project');
const users = mongoose.model('User');
const invitations = mongoose.model('Invitations');
const bcrypt = require('bcrypt');
const auths = require('../middlewares/auths');
const sendemail = require('../utils/mailSender').sendMail;

exports.getAll = (req, res, next) => {
  // to do find project where the user is member and not user is admin
  const payload = req.decoded;
  projects.find({
    members: {
      email: payload.data.email,
      role: 'admin',
    },
  })
    .populate('cards', 'title status members type checklist createdAt')
    .select('name createdAt members description updatedAt')
    .exec((err, projects) => {
      if (err) {
        res.status(500).send({
          message: 'There was a problem adding the information to the database.',
          error: 603
        });
      } else {
        res.status(200).format({
          json: () => {
            res.json({ projects: projects });
          }
        });
      }
    });
};

exports.post = (req, res, next) => {
  const payload = req.decoded;
  const { name } = req.body;
  const member = {
    email: payload.data.email,
    role: 'admin',
  };
  const members = [member];
  const createdAt = new Date();
  const { logoUrl } = req.body;
  const { description } = req.body;

  if (description == null || name == null) {
    res.status(400).send({
      message: "both name and description are required to create project",
      error: 610
    })
  } else {
    projects.create({
      name,
      members,
      createdAt,
      logoUrl,
      description,
    }, (err, project) => {
      if (err) {
        res.status(500).send({
          message: 'There was a problem adding the information to the database.',
          error: 603
        });
        //console.error(err);
      } else {
        res.status(200).format({
          // JSON response will show the newly created blob
          json: () => {
            res.json(project);
          },
        });
      }
    });
  }

};

exports.getById = (req, res, next) => {
  projects.findById(req.params.id)
    .populate('cards', 'title status type checklist members createdAt createdBy')
    .exec((err, project) => {
      if (err) {
        res.status(500).send({
          message: `GET Error: There was a problem retrieving: ${err}`,
          error: 603
        });
      } else {
        res.status(200).format({
          json: () => {
            res.json({ project: project });
          },
        });
      }
    });
};

exports.UpdateProjectById = (req, res, next) => {
  // to do find just admin can update members and the project must have at least one admin
  const name = req.body.name ? req.body.name : '';
  const logoUrl = req.body.logoUrl ? req.body.logoUrl : 'default url';
  const members = req.body.members ? req.body.members : [];
  const description = req.body.description ? req.body.description : '';

  var membersToInvite = getNonExistingMember(members, res);
  var existingMembers = members.filter(function (elt) {
    return membersToInvite.indexOf(elt) == -1;
  });
  console.log("too Invite");
  console.log(membersToInvite);
  console.log("Existing");
  console.log(existingMembers);

  projects.updateOne({ _id: req.params._id }, {
    // _id : req.params.id,
    name: name,
    logoUrl: logoUrl,
    description: description,
    members: existingMembers,
  }).exec((err, project) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: `${err}`,
        error: 603
      });
    } else {
      console.log("UPDATE PROJECT :" + req.params.id);
      inviteNonExistingMembers(req.params._id, membersToInvite, res);
      updateDeletedInvitation(req.params._id, membersToInvite, res);

      res.status(200).send({ message: 'project updated successfully' });
    }
  });

  ///
  // atleastOneAdmin=false;
  // done=false;
  // for (var i=0; i<req.body.members.length; i++){
  //   member = req.body.members[i];
  //   console.log(member)
  //   users.findOne({
  //     'email':member.email
  //   }, function(err,user){
  //     if(err){
  //       res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
  //                               error: 603});
  //     }else{
  //       if(user){
  //         if(member.role=='admin'){
  //           atleastOneAdmin=true;
  //         }          
  //       }else{
  //         res.status(400).send({message:`This email in not a user: ${member.email}`,
  //                               error: 611});//need to find the correct code error
  //       }
  //     }
  //   });
  //   if(i==req.body.members.length-1)done=true;
  // }
  // while(!(done || atleastOneAdmin)){

  // }
  // if(atleastOneAdmin){




  // }
  // else{
  //   res.status(400).send({message:`There must be at least one admin in members`,
  //                               error: 611});
  // }
}
function getNonExistingMember(members, res) {
  var nonExistingMember = [];
  members.forEach(member => {
    console.log(member);
    users.findOne({ email: member.email }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: " invitation problem please contact an admin",
          error: 603
        });
      } else if (!user) {
        nonExistingMember.push(member);
      }
    })
  });
  return nonExistingMember;

}
function updateDeletedInvitation(projectId, members, res) {
  // todo if we have time 
}
function inviteNonExistingMembers(projectId, members, res) {
  members.forEach(member => {
    createInvitation(member.email, projectId);

    console.log(member.email);
  });
}

function createInvitation(email, projectId) {
  const invitation = {
    email: email,
    projectId: projectId
  };
  invitations.findOne(invitation, (err, result) => {
    if (err) {
      res.status(500).send({
        message: " invitation problem please contact an admin",
        error: 603
      });
    }
    else if (!result) {
      invitations.create(invitation, (err, result) => {
        if (err) {
          res.status(500).send({
            message: " invitation problem please contact an admin",
            error: 603
          });
        } else {
          sendemail(email, "temporary firstName", "temporary Last name");
        }
      });
    }
  })


}


exports.deleteProjectById = (req, res, next) => {
  projects.deleteOne({ _id: req.params.id })
    .exec((err, project) => {
      console.log('inside', project);
      console.log('inside', project.cards);
      if (err) {
        res.status(500).send({
          message: `GET Error: There was a problem retrieving: ${err}`,
          error: 603
        });
      }
      else {
        console.log('deleted');
        console.log(project);
        // cards.delete(project.cards);
        res.status(200).send({ mesage: 'project has been deleted' });
      }
    })
}
