'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main(emailReciever,name, lastName) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.senderEmail, // generated ethereal user
            pass: process.env.senderPassword // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kanban-application 👻" <florianlerois@gmail.com>', // sender address
        to: emailReciever, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Bienvenu dans mon application'+name+' '+lastName, // plain text body
        html: 'Bienvenu dans mon application <b>'+ ''+name+'</b> '+lastName // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);
exports.sendMail = (emailReciever, name, lastName) => {
    main(emailReciever , name, lastName)
};
