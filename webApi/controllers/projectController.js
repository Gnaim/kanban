const projects = mongoose.model('Project');

exports.getAll = (req, res, next) => {
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
          },
        });
      }
    });
};

exports.post = (req, res, next) => {
  const payload = req.decoded;
  if (payload) {
    const { name } = req.body;
    const member = {
      email: payload.data.email,
      role: 'admin',
    };
    const members = [];
    members.push(member);

    const createdAt = new Date();
    const { logoUrl } = req.body;
    const { description } = req.body;

    projects.create({
      name,
      members,
      createdAt,
      logoUrl,
      description,
    }, (err, project) => {
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
  } else {
    res.status(401).send('not authorized error');
  }
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
  const { name } = req.body;
  const { logoUrl } = req.body;
  var { description } = req.body;
  const { members } = req.body;
  var { description } = req.body;
  projects.findOneAndUpdate(req.params.id, {
    name: 'name',
    logoUrl: 'logoUrl',
    description: 'description',
    members: [],
    cards: [],
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
