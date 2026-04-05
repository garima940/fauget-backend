import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    console.log("📨 sendEmail function called");

    const msg = {
      to,
      from: "garimakashyap2600@gmail.com", // must be verified
      subject,
      html,
    };

    const response = await sgMail.send(msg);

    console.log("✅ SendGrid response:", response[0].statusCode);

    return true;
  } catch (error) {
    console.log("❌ SendGrid Error:", error.response?.body || error.message);
    return false;
  }
};