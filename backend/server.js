const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// requiring dotenv for env
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect to mongoDB atlas
const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.get("/", (req, res) => {
  res.send("Node.js & Express are working. ");
});

// using routes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
