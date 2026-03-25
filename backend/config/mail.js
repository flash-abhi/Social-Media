import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({quiet:true});
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to,otp) => {
    try {
        transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: "Reset Your Password",
            html: `<p>Your OTP for password Reset is <b>${otp}</b>.</p>`
        })
    } catch (error) {
        
    }
}
export default sendMail;