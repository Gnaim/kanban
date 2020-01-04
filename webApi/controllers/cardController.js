const projects = mongoose.model('Project');
const cards = mongoose.model('Card');
const users = mongoose.model('User');

exports.getCardsByProject = (req, res, next) => {
  cards.find({ _project: req.params.id })
    .select('members title description status type checklist createdAt createdBy')
    .populate({path:'members',select: 'firstName lastName profession email'})
    .populate({path:'createdBy',select: 'firstName lastName profession email'})
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
  const title = req.body.title ? req.body.title: 'title';
  const description  = req.body.description ? req.body.description :'description';
  const status = req.body.status ? req.body.status: 'Backlog';
  const type = req.body.type ? req.body.type: 'Dev';
  const checklist = req.body.checklist ? req.body.checklist: [];
  const statuses= ['Backlog','Doing','Done'];
  const types = ['Dev','Bug']
  if (!types.includes(type))
  {
    res.status(400).send({message:"type must be Dev or Bug",
                          error: 610});
  }else{
    if(!statuses.includes(status)){
      res.status(400).send({message:"status must be Backlog, Doing or Done",
                          error: 610});
    }else{
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
    }
  }
};

exports.getById = (req, res, next) => {
  cards.findById(req.params.cardId)
    .populate('checklists')
    .populate('createdBy', 'firstName lastName profession email')
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
  const title  = req.body.title ? req.body.title : 'title' ;
  const status  = req.body.status ? req.body.status : 'Backlog' ;
  const members  = req.body.members ? req.body.members : [] ;
  const description  = req.body.description ? req.body.description : 'description';
  const type  = req.body.type ? req.body.type: 'Dev';
  const checklist = req.body.checklist ? req.body.checklist : [];
  const statuses= ['Backlog','Doing','Done'];
  const types = ['Dev','Bug'];
  if (!types.includes(type))
  {
    res.status(400).send({message:"type must be Dev or Bug",
                          error: 610});
  }else{
    if(!statuses.includes(status)){
      res.status(400).send({message:"status must be Backlog, Doing or Done",
                          error: 610});
    }else{
      users.find({'email': {$in : members}}).select("_id").exec((err,usersIds)=>{
        if(err){
          res.status(500).send({
            message: `GET Error: There was a problem retrieving: ${err}`,
            error: 603
          });
        }else{
          if(usersIds){
            console.log(usersIds)
            cards.update({_id: req.params.cardId}, {
              title: title,
              status: status,
              description: description,
              type: type,
              members: usersIds,
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
          }else{
            res.status(400).send({
              message: `this email is not a user ${item}`,
              error: 603
            });
          }
        }
      });
    }
  }
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
