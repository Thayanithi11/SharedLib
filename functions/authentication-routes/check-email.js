const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

module.exports = async (req, res) => {

  const email = req.query.email?.trim().toLowerCase();

  if (!email) return res.status(400).json({ available: false });

  try {
    await admin.auth().getUserByEmail(email);
    
    return res.json({ available: false });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      
      return res.json({ available: true });
    }
    console.error("Email check error:", err);
    return res.status(500).json({ available: false });
  }
};
