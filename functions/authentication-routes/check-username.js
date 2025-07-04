const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = async (req, res) => {
  const { username } = req.params;
  if (!username) return res.status(400).json({ available: false });

  try {
    const doc = await db.collection("usernames").doc(username).get();
    return res.json({ available: !doc.exists });
  } catch (err) {
    console.error("Username check error:", err);
    return res.status(500).json({ available: false });
  }
};
