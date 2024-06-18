import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = async (name: string, to: string, message: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: to,
      subject: 'Verification email',
      html: `
        <p>Name: ${name} </p>
        <p>Email: ${to} </p>
        <p>${message} </p>
      `
    })
  } catch (error) {
    console.log(error)
  }
}