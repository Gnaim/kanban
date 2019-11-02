const projects = mongoose.model('Project');
const cards = mongoose.model('Card');

exports.getCardsByProject = (req, res, next) => {
  cards.find({ _project: req.params.id })
    .select('members title description status')
    .exec((err, cards) => {
      if (err) {
        res.status(500).send('There was a problem adding the information to the database.');
      } else {
        res.status(200).format({
          json: () => {
            res.json(cards);
          },
        });
      }
    });
};

exports.post = (req, res, next) => {
  const projectId = req.params.id;
  const { title } = req.body;
  const { description } = req.body;
  const { status } = req.body;
  const newCard = {
    _project: projectId,
    title,
    status,
    description,
  };

  cards.create(newCard, (err, card) => {
    projects.findById(req.params.id)
      .exec((err, project) => {
        project.updateOne({ $push: { cards: card._id } }, (err) => {
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
      });
  });
};

exports.getById = (req, res, next) => {
  cards.findById(req.params.cardId)
    .populate('checklists')
    .exec((err, cards) => {
      if (err) {
        res.status(500).send('There was a problem adding the information to the database.');
      } else {
        res.status(200).format({
          json: () => {
            res.json(cards);
          },
        });
      }
    });
};


exports.UpdateCardById = (req, res, next) => {
};
