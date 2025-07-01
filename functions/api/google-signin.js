const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports =async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).send("Missing ID token");

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name || "";
    const photo = decodedToken.picture || "";

    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      // Auto-generate a username based on name or email
      const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
      let finalUsername = baseUsername;
      let i = 0;

      while ((await db.collection("usernames").doc(finalUsername).get()).exists) {
        i++;
        finalUsername = `${baseUsername}${i}`;
      }

      const usernameRef = db.collection("usernames").doc(finalUsername);
      const batch = db.batch();
      batch.set(usernameRef, { uid });
      batch.set(userRef, {
        username: finalUsername,
        realname: name,
        email,
        bio: "",
        location: "",
        followers: [],
        following: [],
        ownedBooks: [],
        readingBooks: [],
        borrowedBooks: [],
        articles: [],
        photoURL: photo
      });

      await batch.commit();
    }

    res.status(200).send("Google sign-in successful");
  } catch (err) {
    console.error("Google sign-in error:", err);
    res.status(401).send("Invalid ID token: " + err.message);
  }
};
