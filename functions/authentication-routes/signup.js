const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

module.exports = onRequest(async (req, res) => {
  const { email, password, username, name } = req.body;


  const trimmedEmail = email?.trim();
  const trimmedUsername = username?.trim();
  const trimmedName = name?.trim();

  if (!trimmedEmail || !password || !trimmedUsername || !trimmedName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const usernameRef = db.collection("usernames").doc(trimmedUsername);
    const usernameDoc = await usernameRef.get();
    if (usernameDoc.exists) {
      return res.status(409).json({ error: "Username already taken" });
    }

    let userRecord;
    try {
      userRecord = await admin.auth().createUser({
        email: trimmedEmail,
        password,
        displayName: trimmedName,
      });
    } catch (authError) {
      if (authError.code === "auth/email-already-exists") {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Auth error: " + authError.message });
    }

    const uid = userRecord.uid;

    
    const batch = db.batch();
    batch.set(usernameRef, { uid });
    batch.set(db.collection("users").doc(uid), {
      username: trimmedUsername,
      realname: trimmedName,
      email: trimmedEmail,
      bio: "",
      location: "",
      profileimageURL: "",
      followers: [],
      following: [],
      ownedBooks: [],
      readBooks:[],
      readingBooks: [],
      borrowedBooks: [],
      articles: [],
    });

    await batch.commit();

    return res.status(200).json({ message: "User created successfully", uid });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error: " + err.message });
  }
});
