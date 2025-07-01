const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(express.json());


const signup = require("./api/signup");
const googleSignin = require("./api/google-signin");
const checkUsername = require("./api/check-username");

// Test route
app.get("/ping", (req, res) => {
  res.send("pong from ShareLib 🚀");
});

// Mount routes
app.post("/signup", signup);
app.post("/google-signin", googleSignin);
app.get("/api/check-username/:username", checkUsername);


exports.api = onRequest(app);
