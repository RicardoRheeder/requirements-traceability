const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

// requiring dotenv for env
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// getting github client id and secret
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Node.js & Express are working. ");
});

// github auth
app.get("/login/github", (req, res) => {
  const redirect_uri = "http://localhost:5000/login/github/callback";
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`
  );
});

async function getAccessToken(code) {
  const request = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });
  const text = await request.text();
  console.log(text);
  const params = new URLSearchParams(text);
  return params.get("access_token");
}

async function getGithubUser(access_token) {
  const request = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `bearer ${access_token}`,
    },
  });
  const data = await request.json();
  return data;
}

app.get("/login/github/callback", async (req, res) => {
  const code = req.query.code;
  const token = await getAccessToken(code);
  const githubData = await getGithubUser(token);
  res.send(`Hello ${githubData.login}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
