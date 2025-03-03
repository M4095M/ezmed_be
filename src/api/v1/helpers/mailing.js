const nodemailer = require('nodemailer');

async function sendEmail(to, subject, body) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:'smtp',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // your email
            pass: process.env.EMAIL_PASS // your email password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: body // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
            console.log('Message sent: %s', info.messageId);
        }
    });
}

module.exports = sendEmail;
