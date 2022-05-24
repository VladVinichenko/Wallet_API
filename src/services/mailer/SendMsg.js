const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = process.env;
const VerificationEmail = process.env.EMAIL;

sgMail.setApiKey(SENDGRID_API_KEY);

const SendMsg = async data => {
  const msg = { from: VerificationEmail, ...data };
  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { SendMsg };
