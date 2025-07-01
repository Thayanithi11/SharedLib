const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(express.json());


const signup = require("./authentication-routes/signup");
const googleSignin = require("./authentication-routes/google-signin");
const checkUsername = require("./authentication-routes/check-username");
const checkEmail = require("./authentication-routes/check-email");



app.post("/signup", signup);
app.post("/google-signin", googleSignin);
app.get("/check-username/:username", checkUsername);
app.get("/check-email/:email", checkEmail);


exports.api = onRequest(app);
