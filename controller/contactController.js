const sendMail = require("../utilities/sendMail");

/**
 * Handle contact form submission
 * @param {Request} req
 * @param {Response} res
 */
async function handleContactForm(req, res) {
  const { name, email, message } = req.body;
  try {
    await sendMail(
      "iwegbuvc@gmail.com", // recipient
      `Contact Form Message from ${name}`,
      `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
      name,
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
}

module.exports = { handleContactForm };
