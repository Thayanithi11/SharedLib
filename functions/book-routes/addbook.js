const express = require("express");
const { v4: uuidv4 } = require("uuid");
const admin = require("firebase-admin");
const router = express.Router();


const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

router.post("/", async (req, res) => {
  console.log("Incoming request body:", req.body);
  try {
    const {
      bookname,
      authorname,
      ownerUsername,
      BookimageURL,
    } = req.body;

    if (!bookname || !authorname || !ownerUsername) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const bookId = uuidv4();

    const bookData = {
      id: bookId,
      bookname,
      authorname,
      BookimageURL: BookimageURL || "",
      ownerUsername,
      isAvailable: true,
    };

    await db.collection("books").doc(bookId).set(bookData);

    res.status(200).json({ message: "Book added successfully", bookId });
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

module.exports = router;
