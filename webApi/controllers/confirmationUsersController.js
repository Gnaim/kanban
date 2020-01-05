
const confirmationUsers = mongoose.model('confirmationUsers');
const users = mongoose.model('User');
const invitations = mongoose.model('Invitations');
const projects = mongoose.model('Project');

exports.confirmMail = (req, res, next) => {
    const token = req.params.token;

    confirmationUsers.findOne({ _id: token }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem in the server contact the admin please.',
                error: 603
            });
        } else if (user) {
            const currentDate = new Date();
            var hours = Math.abs(currentDate - user.createdAt) / 36e5;

            if (hours <= 24) {
                signupUser(user.email, user.password, user.firstName, user.lastName, user.tel, user.profession, user.checkedIn, user.imageUrl, res);
            } else {
                res.status(401).send({
                    message: 'the link used to confirm is expired ',
                    error: 614
                });
            }

        } else {
            res.status(500).send({
                message: 'There was a problem in the server contact the admin please.',
                error: 603
            });
        }

    });


}



function signupUser(email, password, firstName, lastName, tel, profession, checkedIn, imageUrl, res) {

    users.create({
        email,
        password,
        firstName,
        lastName,
        tel,
        profession,
        imageUrl,
        checkedIn,
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem to create user to the database.',
                error: 603
            });
        } else {
            checkProjectInvitations(email, res);
            deleteConfirmation(email, res);
            res.status(200).send({ message: `confirmation succedded` });
        }
    });

}


function checkProjectInvitations(email, res) {
    invitations.find({ email: email }, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There an internal problem please contact administrators.',
                error: 603
            });
        } else if (results.length) {
            console.info(results);
            addMemberToProjects(email, results, res);
        } else {
            console.info(results);
        }

    });


}

function addMemberToProjects(email, memberInvitations, res) {

    users.findOne({ email: email }, (err, userToAdd) => {
        if (err) {
            res.status(500).send({
                message: 'There was an internal problem please contact administrators.',
                error: 603
            });
        } else if (!userToAdd) {
            res.status(500).send({
                message: 'There was an internal problem please contact administrators.',
                error: 603
            });
        } else {
            var projectIds = memberInvitations.map(invit => invit.projectId);
            updateProjects(email, projectIds);
            console.log("before delete");
            deleteInvitations(email);

        }

    });
}



function deleteInvitations(email) {
    invitations.deleteMany({ email: email }, function (err) {
        console.log("email");
        console.log(email);
        if (err) {
            res.status(500).send({
                message: 'There an internal problem please contact administrators.',
                error: 603
            });
        }
    });

}

function deleteConfirmation(email, res) {
    confirmationUsers.deleteMany({ email: email }, function (err) {
        console.log("email");
        console.log(email);
        if (err) {
            res.status(500).send({
                message: 'There an internal problem please contact administrators.',
                error: 603
            });
        }
    });

}

function updateProjects(email, projectIds) {
    var member = {
        email: email,
        role: 'member'
    };
    projects.find({ _id: { $in: projectIds } }, (err, projectList) => {
        if (err) {
            res.status(500).send({
                message: 'There was an internal problem please contact administrators.',
                error: 603
            });
        } else if (!projectList.length) {
            res.status(500).send({
                message: 'There was an internal problem please contact administrators.',
                error: 603
            });
        } else {
            projectList.forEach(element => {

                updatedMembers = element.members;
                updatedMembers.push(member);
                console.info(updatedMembers);
                projects.updateOne({ _id: element._id }, { members: updatedMembers }).exec((err, project) => {
                    if (err) {
                        res.status(500).send({
                            message: 'There was an internal problem please contact administrators.',
                            error: 603
                        });
                    } else {
                        console.info(` update result ${JSON.stringify(project)}`);
                    }
                });
            });




        }
    });



}



isEmailDuplicated = async (email) => {
    found = false;
    await users.find({
        email,
    }, (err, user) => {
        if (err) {
            found = true;
        } else {
            found = !!user.length;
        }
    });
};
