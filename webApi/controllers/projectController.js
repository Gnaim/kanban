const projects = mongoose.model('Project');
const cards = mongoose.model('Project');

exports.getAll = (req, res, next) => {
  // to do find project where the user is member and not user is admin
  const payload = req.decoded;
  projects.find({
    members: {
      email: payload.data.email,
      role: 'admin',
    },
  })
    .select('name')
    .exec((err, projects) => {
      if (err) {
        res.status(500).send('There was a problem adding the information to the database.');
      } else {
        res.status(200).format({
          json: () => {
            res.json(projects);
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

  projects.create({
    name,
    members,
    createdAt,
    logoUrl,
    description,
  })
  .exec ((err, project) => {
    if (err) {
      res.status(500).send('There was a problem adding the information to the database.');
      console.error(err);
    } else {
      res.status(200).format({
        // JSON response will show the newly created blob
        json: () => {
          res.json(project);
        },
      });
    }
  });
};

exports.getById = (req, res, next) => {
projects.findById(req.params.id)
  .populate('cards', 'title status members')
  .exec((err, project) => {
    if (err) {
      res.status(500).send(`GET Error: There was a problem retrieving: ${err}`);
    } else {
      res.status(200).format({
        json: () => {
          res.json(project);
        },
      });
    }
  });
};

exports.UpdateProjectById = (req, res, next) => {
  // to do find just admin can update members and the project must have at least one admin
  // to do update methode with exec()
  const name  = req.body.name ? req.body.name : '' ;
  const logoUrl  = req.body.logoUrl ? req.body.logoUrl : 'default url' ;
  const members  = req.body.members ? req.body.members : [] ;
  const description  = req.body.description ? req.body.description : '';
  const cards  = req.body.cards ? req.body.cards : [] ;
  console.log(req.params.id);
  projects.findOneAndUpdate(req.params.id, {
    name: name,
    logoUrl: logoUrl,
    description: description,
    members: members,
    cards: cards,
  }, (err, project) => {
    if (err) {
      console.log(err);
      res.status(500).send(`GET Error: There was a problem retrieving: ${err}`);
    } else {
      res.status(200).format({
        json: () => {
          res.json(project);
        },
      });
    }
  });
};

exports.deleteProjectById = (req, res, next) => {
  projects.deleteOne({ _id: req.params.id })
  .exec((err, project)=>{
    console.log('inside',project);
    console.log('inside',project.cards);
    if (err) {
      res.status(500).send(`GET Error: There was a problem retrieving: ${err}`);
    }
    else {
      console.log('deleted');
      console.log(project);
      // cards.delete(project.cards);
      res.status(200).send('project has been deleted');
    }
  })
}
