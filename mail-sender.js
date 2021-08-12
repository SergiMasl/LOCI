const BOSS = process.env.BOSS;
const PASS = process.env.PASS;
const RESIVER = process.env.RESIVER;

const nodemailer = require("nodemailer");

let transporter = null;

async function main() {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: BOSS,
      pass: PASS,
    },
  });
}
console.log(BOSS, PASS, RESIVER);
main().catch(console.error);

async function sendEmail(data) {
  const options = {
    from: `"Manager" <${BOSS}>`,
    to: RESIVER,
    subject: "Client message from website",
    text: data.text,
    html: `<p>
      <b>First Name:</b> ${data.firstName}.<br>
      <b>Last Name:</b> ${data.fastName}.<br>
      <b>Phone:</b> ${data.mobile}.<br>
      <b>Email:</b> ${data.email}.<br>
      <b>Text:</b>  ${data.inputText}.</br>
    </p>`,
  };

  try {
    let info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return info.messageId;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  sendEmail,
};
