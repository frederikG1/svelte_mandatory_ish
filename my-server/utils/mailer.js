import nodemailer from "nodemailer";

// console.log("Creating test account...");
const testAccount = await nodemailer.createTestAccount();
// console.log("Test account created:", testAccount.user);

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
  connectionTimeout: 5000,
});

export async function sendMail({ to, subject, text }) {
  const info = await transporter.sendMail({
    from: '"Your Name" <your.email@example.com>',
    to,
    subject,
    text,
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return info;
};


