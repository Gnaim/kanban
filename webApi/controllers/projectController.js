exports.getAll = (req, res, next) => {
    mongoose.model('Project').find({},(err, blobs) => {
        if (err) {
            return console.error(err);
        } else {
            res.format({
              json: () => {
                  res.json(blobs);
              }
          });
        }     
    });
};

exports.post = (req, res, next) => {
    var name = req.body.name;
    // must be replace by the email of the creater , we can get it with the token
    let members = {
      email: 'naimGuerroui@Gmail.com',
      role: 'admin'
    }
    let createdAt = new Date();
    var logoUrl = req.body.logoUrl;
    var description = req.body.description;
  
    mongoose.model('Project').create({
      name : name,
      members: members,
      createdAt: createdAt,
      logoUrl : logoUrl,
      description : description
    },(err, project)=> {
      if (err) {
        res.send("There was a problem adding the information to the database.");
        console.error(err);
      } else {
          //Board has been created
          console.log('POST creating new board: ' + project);
          res.format({
            //JSON response will show the newly created blob 
            json: () =>{
                res.json(project);
            }
        });
      }
    })
};

exports.getById = (req, res, next) => {
    console.log('req.id');
    console.log(req.params.id);
    mongoose.model('Project').findById(req.params.id, (err, project) => {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        res.format({
          json: () => {
              res.json(project);
          }
        });
      }
    });
};