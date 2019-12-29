const projects = mongoose.model('Project');
const cards = mongoose.model('Card');

exports.getCardsByProject = (req, res, next) => {
  cards.find({ _project: req.params.id })
    .select('members title description status')
    .exec((err, cards) => {
      if (err) {
        res.status(500).send({message:'There was a problem adding the information to the database.'});
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
    description,
  };
  if(title == null || description == null){
    res.status(400).send({message:"both title and description are required to create a card",
                          error: 610})
  }
  else{
    cards.create(newCard, (err, card) => {
      projects.findById(req.params.id)
        .exec((err, project) => {
          project.updateOne({ $push: { cards: card._id } }, (err) => {
            if (err) {
              res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`});
            } else {
              projects.findById(req.params.id)
              .exec((err, project) =>{
                if (err) {
                  res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`});
                } else {
                  res.status(200).format({
                    json: () => {
                      res.json(project);
                    }
                  });
                }
              });
            }
          });
        });
    });
  }
};

exports.getById = (req, res, next) => {
  cards.findById(req.params.cardId)
    .populate('checklists')
    .exec((err, cards) => {
      if (err) {
        res.status(500).send({message:'There was a problem adding the information to the database.'});
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
  const title  = req.body.title ? req.body.title : '' ;
  const status  = req.body.status ? req.body.status : 'backlog' ;
  const members  = req.body.members ? req.body.members : [] ;
  const description  = req.body.description ? req.body.description : '';
  const checklist = req.body.checklist ? req.body.checklist : [];

  cards.update({_id: req.params.cardId}, {
    title: title,
    status: status,
    description: description,
    members: members,
    // checklist: checklist,
  }).exec((err,card)=>{
    if (err) {
      console.log(err);
      res.status(500).send({message:`${err}`,
                            error: 603});
    } else {
      res.status(200).send({message:'card updated successfully'});
    }
  });
};

exports.deleteCardById = (req, res, next) => {
  cards.deleteOne({ _id: req.params.cardId })
  .exec((err, card)=>{
    if (err) {
      res.status(500).send({message:`${err}`,
                            error: 603});
    }
    else {
      res.status(200).send({mesage:'card has been deleted'});
    }
  })
}
