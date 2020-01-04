'use strict';
const nodemailer = require('nodemailer');
let transporter = null;

function initTrasnporter() {
    if (transporter == null) {

        transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.senderEmail, // generated ethereal user
                pass: process.env.senderPassword // generated ethereal password
            }
        });
    }

}


// async..await is not allowed in global scope, must use a wrapper
async function sendConfirmation(emailReciever, name, lastName) {

    // create reusable transporter object using the default SMTP transport
    initTrasnporter();

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kanban-application 👻" <florianlerois@gmail.com>', // sender address
        to: emailReciever, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Bienvenu dans mon application' + name + ' ' + lastName, // plain text body
        html: 'Bienvenu dans mon application <b>' + '' + name + '</b> ' + lastName // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// async..await is not allowed in global scope, must use a wrapper
async function sendInvitation(email, project) {

    // create reusable transporter object using the default SMTP transport
    initTrasnporter();

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kanban-application 👻" <florianlerois@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Invitation to ' + project.name, // Subject line
        html: `Hi ${email},<br> you're invited to ${project.name}`

    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


async function sendResetPasswordInvitation(email, uuid) {

    // create reusable transporter object using the default SMTP transport
    initTrasnporter();

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kanban-application 👻" <florianlerois@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Invitation to reset your Password', // Subject line
        html: `Hi ${email},<br> you're invited to reset your password by clicking on this link <a href="http://localhost:4200/ResetPassword/${uuid}"> Click Here <a> ${project.name}`

    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


// main().catch(console.error);
exports.sendConfirmationMail = (emailReciever, name, lastName) => {
    sendConfirmation(emailReciever, name, lastName)
};

exports.sendInvitationMail = (email, project) => {
    sendInvitation(email, project);
};

exports.sendResetPasswordMail = (email, uuid) => {
    sendResetPasswordInvitation(email, uuid);
}
