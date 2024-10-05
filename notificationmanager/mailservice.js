// Import the nodemailer module
const nodemailer = require("nodemailer");

//const mailOptions = {
//from: "roommanager11@hotmail.com",
//to: usermail,
//subject: "Test Email",
//text: "Hello, this is a test email from Nodemailer!",
//};
function createmailbody(user, token , operation){
  const mail = process.env.MAIL;

  console.log(token);
  return {
    from: mail,
    to: user.email,
    subject: "[TESTING] Confirm ur reservation  ",
    html:
      "<h1>hey " +
      user.username +"would u like to   "+operation+
      
      ", hit this link to comfirm ur reservation , PEACE X)</h1><h2>link : http://localhost:3000/operation/confirm/" +
      token +
      "</h2>",
  };
}
function comfiramtion_mail(user, token) {
  const mail = process.env.MAIL;

  console.log(token);
  return {
    from: mail,
    to: user.email,
    subject: "[TESTING] Confirm ur reservation  ",
    html:
      "<h1>hey " +
      user.username +
      ", hit this link to comfirm ur reservation , PEACE X)</h1><h2>link : http://localhost:3000/reservation/confirm/" +
      token +
      "</h2>",
  };
}
async function sendMail(mailOptions) {
  // Create a transporter with your email service provider's SMTP settings
  //credentials
  const mail = process.env.MAIL;
  const password = process.env.PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: mail,
      pass: password,
    },
  });

  // Send the email

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
module.exports = { sendMail, comfiramtion_mail,createmailbody };
