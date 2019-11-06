const projects = mongoose.model('Project');
const cards = mongoose.model('Card');
const checklists = mongoose.model('Checklist')

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
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
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
          }
        });
      }
    });
};

exports.delete = (req, res, next) =>{
  cards.findById(req.params.cardId)
    .exec((err,card)=>{
      if (err) {

      } else {
        checklists.deleteMany({_id: { $in: [10, 2, 3, 5]}})
          .exec((err) => {
            if (err) {
              res.status(500).send('There was a problem deleting from the database.');
            } else {
              res.status(200).format({
                json: () => {
                  res.json({message : 'delete successful'});
                }
              });
            }
          })
      }
    })
};

exports.UpdateCardById = (req, res, next) => {
  const members = req.body.members;
  const title = req.body.title;
  const status = req.body.status;
  const description = req.body.description;
  
  cards.findOneAndUpdate(req.params.cardId, {
    members: members,
    title: title,
    status: status,
    description: description,
  }, (err, card) => {
    if (err) {
      console.log(err);
      res.status(500).send(`GET Error: There was a problem retrieving: ${err}`);
    } else { 
      res.status(200).format({
        json: () => {
          res.json(card);
        },
      });
    }
  });
};
