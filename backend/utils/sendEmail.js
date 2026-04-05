import nodemailer from "nodemailer";
console.log("📨 sendEmail function called");
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey", // required by SendGrid
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const mailOptions = {
      from: `"Fauget Hospital" <garimakashyap2600@gmail.com>`, // verified sender
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);

    return true;
  } catch (error) {
    console.log("❌ SendGrid Error:", error.message);
    return false; // don't throw → prevents crash
  }
};