const express = require("express");
const admin = require("firebase-admin");
const router = require("./updateprofile");


const db = admin.firestore();

router.get("/:username",async (req, res) => {
  const { username } = req.params;
  try {
    // ✅ 1. Get user profile
    let usernameDoc = await db.collection("usernames").doc(username).get();
if (!usernameDoc.exists) {
  return res.status(404).json({ error: "User not found" });
}

// ✅ Get UID from the document data
const { uid } = usernameDoc.data();
if (!uid) {
  return res.status(500).json({ error: "UID missing in username mapping" });
}

// ✅ Now fetch actual user document
const userDoc = await db.collection("users").doc(uid).get();
if (!userDoc.exists) {
  return res.status(404).json({ error: "User profile not found" });
}
const userData = userDoc.data();

    // ✅ 2. Get articles by user
    const articlesSnap = await db.collection("articles")
      .where("authorUsername", "==", username)
      .orderBy("writtenDate", "desc")
      .get();
    const articles = articlesSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ 3. Get owned books
    const ownedSnap = await db.collection("books")
      .where("ownedBy", "==", username)
      .get();
    const ownedBooks = ownedSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ 4. Get borrowed books
    const borrowedSnap = await db.collection("books")
      .where("borrowedBy", "==", username)
      .get();
    const borrowedBooks = borrowedSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ 5. Assemble and send full profile
    const fullProfile = {
      ...userData,
      articles,
      books: {
        owned: ownedBooks,
        borrowed: borrowedBooks,
        reading: userData.readingBooks || [], // fallback if stored in user
        read: userData.readBooks || [],
      },
    };

    return res.json(fullProfile);
  } catch (err) {
    console.error("🔥 Error fetching profile info:", err);
    return res.status(500).json({ error: "Failed to fetch user profile", details: err.message });
  }
});

module.exports=router;
