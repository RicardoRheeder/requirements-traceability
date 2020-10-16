const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// requiring dotenv for env
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// config express-session
const sess = {
  secret: "CMPT 371",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};
if (app.get("env") === "production") {
  sess.cookie.secure = true;
}

// middleware
app.use(cors());
app.use(express.json());

// connect to mongoDB atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.get("/", (req, res) => {
  res.send("Node.js & Express are working. ");
});

// using routes

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
