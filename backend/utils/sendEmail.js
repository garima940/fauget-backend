import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to,
      subject,
      html : message, // ✅ FIXED HERE
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");

  } catch (error) {
    console.log("❌ Email error:", error);
  }
};