const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

const app = express();

const updateprofile = require("./user-routes/updateprofile");
const userprofileinfo = require("./user-routes/userprofileinfo");
const signup = require("./authentication-routes/signup");
const googleSignin = require("./authentication-routes/google-signin");
const checkUsername = require("./authentication-routes/check-username");
const checkEmail = require("./authentication-routes/check-email");
const addbook = require("./book-routes/addbook");

const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", signup);
app.post("/google-signin", googleSignin);
app.get("/check-username/:username", checkUsername);
app.get("/check-email", checkEmail);

app.use("/userprofileinfo", userprofileinfo);
app.use("/updateprofile", updateprofile);
app.use("/bookroutes/addbook", addbook);


exports.api = onRequest(app);
