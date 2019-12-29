const projects = mongoose.model('Project');
const cards = mongoose.model('Card');
const users = mongoose.model('User');

exports.get = (req, res, next) => {
    const payload = req.decoded;
    const limit = req.body.limit ? req.body.limit : 3;
    console.log(payload);
    projects.find({
        members: { $in :[
                    {email: payload.data.email,
                    role: 'admin'},
                    {email: payload.data.email,
                    role: 'developer'},
                    {email: payload.data.email,
                    role: 'tester'}
                ]
        }
    })
    .select('name description createdAt')
    .sort([['createdAt',-1]])
    .limit(limit)
    .exec((err, projects) => {
        if (err) {
            res.status(500).send({message:`${err}`,
                                  error: 603});
        }else{
            users.findOne({email:payload.data.email})
            .exec((err,user) => {
                if(err){
                    res.status(500).send({message:`${err}`,
                                  error: 603});
                }else{
                    cards.find({
                        members: user._id
                    })
                    .select('title description status members')
                    .limit(limit)
                    .exec((err,cards) => {
                        if (err){
                            res.status(500).send({message:`${err}`,
                                                  error: 603});
                        }else{
                            res.status(200).format({
                                json: () => {
                                    res.json({projects:projects,cards:cards})
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};