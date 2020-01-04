const projects = mongoose.model('Project');
const cards = mongoose.model('Card');
const users = mongoose.model('User');
const resetPwd = mongoose.model('resetPwd');
const mailSender = require('../utils/mailSender');
exports.postEmail = (req, res, next) => {
    const email = req.body.email;
    console.log(email);

    users.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem in the server contact the admin please.',
                error: 603
            });

        } else if (user) {
            resetPwd.create({ email }, (err, user_uuid) => {
                if (err) {
                    res.status(500).send({
                        message: 'There was a problem in the server contact the admin please.',
                        error: 603
                    });
                } else {
                    mailSender.sendResetPasswordMail(user_uuid.email, user_uuid._id);
                }
            });

        }
        res.status(200).send({
            message: 'if an the email exist a mail will sent'
        });
    });

};
exports.resetPasswordRequest = (req, res, next) => {

    const uuid = req.params.token;
    const newPassword = req.body.password;
    console.log(uuid);
    console.log(newPassword);


    resetPwd.findOne({ _id: uuid }, (err, user_uuid) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem in the server contact the admin please.',
                error: 603
            });
        } else if (!user_uuid) {
            res.status(401).send({
                message: 'invalid reset password token.',
                error: 612
            });
        } else {
            users.updateOne({ email: user_uuid.email }, { password: newPassword }, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: 'There was a problem in the server contact the admin please.',
                        error: 603
                    });
                } else {
                    res.status(200).send({
                        message: 'update password succeed'
                    });
                }


            });


        }


    });


};