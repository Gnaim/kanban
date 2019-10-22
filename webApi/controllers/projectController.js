var projects = mongoose.model('Project');

exports.getAll = (req, res, next) => {
  const payload = req.decoded;
  if (payload) {
    projects.find({
      members : {
        email : payload.data.email,
        role : 'admin'
      }
    },(err, blobs) => {
      if (err) {
        res.status(500).send("There was a problem adding the information to the database.");
        return console.error(err);
      } else {
          res.status(200).format({
            json: () => {
                res.json(blobs);
            }
        });
      }     
    });
  } else {
    res.status(401).send('not authorized, you have to create an account');
  }
};

exports.post = (req, res, next) => {
  const payload = req.decoded;
  if (payload) {
    var name = req.body.name;
    let member = {
      email: payload.data.email,
      role: 'admin'
    }
    let members = [];
    members.push(member);

    let createdAt = new Date();
    var logoUrl = req.body.logoUrl;
    var description = req.body.description;
  
    projects.create({
      name : name,
      members: members,
      createdAt: createdAt,
      logoUrl : logoUrl,
      description : description
    },(err, project)=> {
      if (err) {
        res.status(500).send("There was a problem adding the information to the database.");
        console.error(err);
      } else {
          res.status(200).format({
            //JSON response will show the newly created blob 
            json: () =>{
                res.json(project);
            }
        });
      }
    })
  } else {
    res.status(401).send('not authorized error');
  }
};

exports.getById = (req, res, next) => {
    mongoose.model('Project').findById(req.params.id, (err, project) => {
      if (err) {
        res.status(500).send('GET Error: There was a problem retrieving: ' + err);
      } else {
        res.status(200).format({
          json: () => {
              res.json(project);
          }
        });
      }
    });
};