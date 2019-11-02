exports.isProjectMember = (req, res) => {
  const projectId = req.params.id;
  const payload = req.decoded;
  if (payload) {
    EmailMember = payload.data.email;
  }
  projects.findById(projectId, (err, project) => {
    if (err) {
      res.status(500).send(`GET Error: There was a problem retrieving: ${err}`);
    } else if (getRole(EmailMember, project.members)) {

    } else {
      res.status(401).send('not authorized , you are not a project member');
    }
  });
};
