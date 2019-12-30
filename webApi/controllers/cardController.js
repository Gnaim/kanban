const projects = mongoose.model('Project');
const cards = mongoose.model('Card');
const users = mongoose.model('User');

exports.getCardsByProject = (req, res, next) => {
  cards.find({ _project: req.params.id })
    .select('members title description status type checklist createdAt createdBy')
    .populate('createBy', 'firstName lastName profession')
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
  const payload = req.decoded;
  const projectId = req.params.id;
  const title = req.body.title ? req.body.title: '';
  const description  = req.body.description ? req.body.description :'';
  const status = req.body.status ? req.body.status: 'backlog';
  const type = req.body.type ? req.body.type: 'dev';
  const checklist = req.body.checklist ? req.body.checklist: [];
  users.findOne({email:payload.data.email})
  .exec((err,user) => {
    if(err){
      res.status(500).send({message: "server Error",
                            error: 603});
    }else{
      const createdBy = user._id;
      const newCard = {
        _project: projectId,
        title,
        description,
        status,
        type,
        checklist,
        createdBy, 
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
    }
  });
};

exports.getById = (req, res, next) => {
  cards.findById(req.params.cardId)
    .populate('checklists')
    .populate('createdBy', 'firstName lastName profession')
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
  const type  = req.body.type ? req.body.type: 'dev';
  const checklist = req.body.checklist ? req.body.checklist : [];

  cards.update({_id: req.params.cardId}, {
    title: title,
    status: status,
    description: description,
    type: type,
    members: members,
    checklist: checklist,
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
