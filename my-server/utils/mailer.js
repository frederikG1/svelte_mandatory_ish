import nodemailer from "nodemailer";

let transport = null;

async function getTransporter() {
  console.log("Creating test account...");
  const testAccount = await nodemailer.createTestAccount();
  console.log("Test account created:", testAccount);

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log("User:".testAccount.user);
  return transporter;
}

export async function sendMail({ to, subject, text }) {
  const t = await getTransporter();

  const info = await t.sendMail({
    from: '"Frederik" <your.email@example.com>',
    to,
    subject,
    text,
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info;
}
