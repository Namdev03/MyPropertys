import transporter from "../Config/nodemailer.js";

export const sendEmail = async ({ to, subject, html }) => {
  const info = await transporter.sendMail({
    from: `"MyProperty" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
  return info;
};