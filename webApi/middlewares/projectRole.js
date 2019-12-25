// libs directory stands for libraries. All the logic goes there.
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const projects = mongoose.model('Project');


exports.isProjectMember = (req, res, next) => {
  // to do update with exec()
  const projectId = req.params.id;
  const payload = req.decoded;
  if (payload) {
    EmailMember = payload.data.email;
  }
  projects.findById(projectId, (err, project) => {
    if (err) {
      res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
                            error: 603});
    } else if (getRole(EmailMember, project.members)) {
      next();
    } else {
      res.status(403).send({message:'not authorized , you are not a project member',
                            error: 609});
    }
  });
};

exports.isAdmin = (req, res, next) => {
  // to do update with exec()

  const projectId = req.params.id;
  const payload = req.decoded;
  if (payload) {
    EmailMember = payload.data.email;
  }
  projects.findById(projectId, (err, project) => {
    if (err) {
      res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
                            error: 603});
    } else if (getRole(EmailMember, project.members) == 'admin') {
      next();
    } else {
      res.status(403).send({message:'not authorized , you are not a project member',
                            error:609});
    }
  });
};

getRole = (element, list) => {
  // to do clean method with map,filter ..
  if (list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].email == element) {
        return list[i].role;
      }
    }
  } else {
    return false;
  }
};
