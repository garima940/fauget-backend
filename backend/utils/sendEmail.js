import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "garimakashyap2600@gmail.com",
        pass: "eusyqjosasusixou", // ⚠️ paste app password here
      },
    });

    const mailOptions = {
      from: "garimakashyap2600@gmail.com",
      to,
      subject,
      html, // ✅ FIXED
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
};