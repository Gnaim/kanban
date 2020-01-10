const projects = mongoose.model('Project');
const cards = mongoose.model('Card');
const users = mongoose.model('User');

exports.get = (req, res, next) => {
    const email = payload.data.email;
    const payload = req.decoded;
    const limit = req.body.limit ? req.body.limit : 3;

    projects.find({ "members.email": email })
        .select('name description createdAt')
        .sort([['createdAt', -1]])
        .limit(limit)
        .exec((err, projects) => {
            if (err) {
                res.status(500).send({
                    message: `${err}`,
                    error: 603
                });
            } else if (projects.length) {
                users.findOne({ email: email })
                    .exec((err, user) => {
                        if (err) {
                            res.status(500).send({
                                message: `${err}`,
                                error: 603
                            });
                        } else {
                            cards.find({
                                members: user._id
                            })
                                .select('title description status members')
                                .limit(limit)
                                .exec((err, cards) => {
                                    if (err) {
                                        res.status(500).send({
                                            message: `${err}`,
                                            error: 603
                                        });
                                    } else {
                                        res.status(200).format({
                                            json: () => {
                                                res.json({ projects: projects, cards: cards })
                                            }
                                        });
                                    }
                                });
                        }
                    });
            } else {
                res.status(200).format({
                    json: () => {
                        res.json({ projects: [], cards: [] })
                    }
                });


            }
        });
};