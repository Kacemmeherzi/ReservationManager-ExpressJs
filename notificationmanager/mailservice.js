// Import the nodemailer module
const nodemailer = require("nodemailer");

async function sendMail(usermail) {
  // Create a transporter with your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "roommanager11@hotmail.com",
      pass: "kacem@50522920",
    },
  });

  // Set up the email content
  const mailOptions = {
    from: "roommanager11@hotmail.com",
    to: usermail,
    subject: "Test Email",
    text: "Hello, this is a test email from Nodemailer!",
  };

  // Send the email

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = { sendMail };
