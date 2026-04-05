import nodemailer from "nodemailer";
/**kjkjkjkj */
export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "garimakashyap2600@gmail.com",
        pass: "pcjydzkkumnkxcja",
      },
    });

    const mailOptions = {
      from: "garimakashyap2600@gmail.com",
      to,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
  } catch (error) {
    console.log("❌ Email error:", error);
  }
};