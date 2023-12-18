const nodemailer = require('nodemailer');
const logger = require('../logger/WinstonLogger');

module.exports = {
  sendEmail: (to, subject, text) => {
    
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      throw new Error('E-posta kimlik bilgileri eksik.');
    }
    const transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: to,
      subject: subject,
      text: text,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
        } else {
          logger.info(info);
        }
      });
    });
  },
};
