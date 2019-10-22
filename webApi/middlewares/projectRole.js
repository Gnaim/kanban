// libs directory stands for libraries. All the logic goes there.
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

var projects = mongoose.model('Project');


exports.isProjectMember = (req, res, next) => {
  let projectId = req.params.id;
  const payload = req.decoded;
  if (payload) {
    EmailMember = payload.data.email
  }
  projects.findById(projectId, (err, project) => {
    if (err) {
      res.status(500).send('GET Error: There was a problem retrieving: ' + err);
    } else if (getRole(EmailMember, project.members)) {
      next();
    } else {
      res.status(401).send('not authorized , you are not a project member');
    }
  });
};

exports.isAdmin = (req, res, next) => {
  let projectId = req.params.id;
  const payload = req.decoded;
  if (payload) {
    EmailMember = payload.data.email
  }
  projects.findById(projectId, (err, project) => {
    if (err) {
      res.status(500).send('GET Error: There was a problem retrieving: ' + err);
    } else if (getRole(EmailMember, project.members) == 'admin') {
      next();
    } else {
      res.status(401).send('not authorized , you are not a project member');
    }
  });
};

getRole = (element, list ) => {
  for (var i=0 ; i < list.length ; i++) {
    if (list[i]['email'] == element) {
        return list[i]['role'];
    }
  }
}

