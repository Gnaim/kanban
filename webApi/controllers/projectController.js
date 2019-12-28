const projects = mongoose.model('Project');
const cards = mongoose.model('Project');
const users = mongoose.model('User');
const bcrypt = require('bcrypt');
const auths = require('../middlewares/auths');

exports.getAll = (req, res, next) => {
  // to do find project where the user is member and not user is admin
  const payload = req.decoded;
  projects.find({
    members: {
      email: payload.data.email,
      role: 'admin',
    },
  })
    .populate('cards','title status members createdAt')
    .select('name createdAt description updatedAt')
    .exec((err, projects) => {
      if (err) {
        res.status(500).send({message:'There was a problem adding the information to the database.',
                              error: 603});
      } else {
        res.status(200).format({
          json: () => {
            res.json({projects:projects});
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

  if( description == null || name == null ){
    res.status(400).send({message:"both name and description are required to create project",
                          error: 610})
  } else {
    projects.create({
      name,
      members,
      createdAt,
      logoUrl,
      description,
    },(err, project)=>{
      if (err) {
        res.status(500).send({message:'There was a problem adding the information to the database.',
                              error: 603});
        //console.error(err);
      } else {
        res.status(200).format({
          // JSON response will show the newly created blob
          json: () => {
            res.json(project);
          },
        });
      }
    });
  }

};

exports.getById = (req, res, next) => {
projects.findById(req.params.id,)
  .populate('cards', 'title status members createdAt')
  .exec((err, project) => {
    if (err) {
      res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
                            error: 603});
    } else {
      res.status(200).format({
        json: () => {
          res.json({project:project});
        },
      });
    }
  });
};

exports.UpdateProjectById = (req, res, next) => {
  // to do find just admin can update members and the project must have at least one admin
  const name  = req.body.name ? req.body.name : '' ;
  const logoUrl  = req.body.logoUrl ? req.body.logoUrl : 'default url' ;
  const members  = req.body.members ? req.body.members : [] ;
  const description  = req.body.description ? req.body.description : '';
///

  projects.findOneAndUpdate(req.params.id, {
    name: name,
    logoUrl: logoUrl,
    description: description,
    members: req.body.members,
  }).exec((err,project)=>{
    if (err) {
      console.log(err);
      res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
                            error: 603});
    } else {
      res.status(200).format({
        json: () => {
          res.json({project:project});
        },
      });
    }
  });

  ///
  // atleastOneAdmin=false;
  // done=false;
  // for (var i=0; i<req.body.members.length; i++){
  //   member = req.body.members[i];
  //   console.log(member)
  //   users.findOne({
  //     'email':member.email
  //   }, function(err,user){
  //     if(err){
  //       res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
  //                               error: 603});
  //     }else{
  //       if(user){
  //         if(member.role=='admin'){
  //           atleastOneAdmin=true;
  //         }          
  //       }else{
  //         res.status(400).send({message:`This email in not a user: ${member.email}`,
  //                               error: 611});//need to find the correct code error
  //       }
  //     }
  //   });
  //   if(i==req.body.members.length-1)done=true;
  // }
  // while(!(done || atleastOneAdmin)){
    
  // }
  // if(atleastOneAdmin){
    
    
    
    
  // }
  // else{
  //   res.status(400).send({message:`There must be at least one admin in members`,
  //                               error: 611});
  // }
}

exports.deleteProjectById = (req, res, next) => {
  projects.deleteOne({ _id: req.params.id })
  .exec((err, project)=>{
    console.log('inside',project);
    console.log('inside',project.cards);
    if (err) {
      res.status(500).send({message:`GET Error: There was a problem retrieving: ${err}`,
                            error: 603});
    }
    else {
      console.log('deleted');
      console.log(project);
      // cards.delete(project.cards);
      res.status(200).send({mesage:'project has been deleted'});
    }
  })
}
