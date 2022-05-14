const nodemailer = require('nodemailer');
const VerificationEmail = process.env.EMAIL;
const EmailPassword = process.env.PASSWORD;

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: VerificationEmail,
    pass: EmailPassword,
  },
};

const nodemailerSendMsg = msg => {
  const transporter = nodemailer.createTransport(config);

  transporter
    .sendMail(msg)
    .then(info => console.log(info))
    .catch(err => console.log(err));
};

module.exports = nodemailerSendMsg;
