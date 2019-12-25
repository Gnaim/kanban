exports.isProjectMember = (req, res) => {
  // implement method
  const projectId = req.params.id;
  const payload = req.decoded;
  if (payload) {
    EmailMember = payload.data.email;
  }
  projects.findById(projectId, (err, project) => {
    if (err) {
      res.status(500).send({message :`GET Error: There was a problem retrieving: ${err}`,
                          error: 603});
    } else if (getRole(EmailMember, project.members)) {

    } else {
      res.status(403).send({message:'not authorized , you are not a project member',
                            error: 609});
    }
  });
};
