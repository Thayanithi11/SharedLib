const admin = require('firebase-admin');
// Initialize admin if not already done
if (!admin.apps.length) {
  admin.initializeApp();
}
module.exports = async (req, res) => {
  const email = req.query.email?.trim().toLowerCase();

  if (!email) return res.status(400).json({ available: false });

  try {
    await admin.auth().getUserByEmail(email);
    return res.json({ available: false }); // Email exists, not available
  } catch (err) {
    console.error("Email check error:", err); // <--- Add this
    if (err.code === "auth/user-not-found") {
      return res.json({ available: true }); // Email not found, available
    }
    return res.status(500).json({ available: false });
  }
};