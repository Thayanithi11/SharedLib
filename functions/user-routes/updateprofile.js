const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

const db = admin.firestore();

router.post("/:username", async (req, res) => {
  const { username } = req.params;
  const { name, email, bio, location, profileimageURL } = req.body;

  console.log("📨 Incoming update for:", username);
  console.log("📦 Payload:", req.body);

  try {
    // Step 1: Get UID from usernames
    const usernameDoc = await db.collection("usernames").doc(username).get();
    if (!usernameDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const uid = usernameDoc.data().uid;

    // Step 2: Dynamically construct fields to update
    const updatedData = {};
    if (name?.trim()) updatedData.name = name;
    if (email?.trim()) updatedData.email = email;
    if (bio?.trim()) updatedData.bio = bio;
    if (location?.trim()) updatedData.location = location;
    if (profileimageURL?.trim()) updatedData.profileimageURL = profileimageURL;

    // Step 3: Prevent empty update
    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: "No valid fields to update" });
    }

    // Step 4: Update Firestore
    await db.collection("users").doc(uid).update(updatedData);

    return res.status(200).json({ message: "Profile updated successfully ✅" });
  } catch (err) {
    console.error("🔥 Error updating profile:", err);
    return res.status(500).json({ error: "Failed to update profile", details: err.message });
  }
});

module.exports = router;
