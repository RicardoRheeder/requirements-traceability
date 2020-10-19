const router = require("express").Router();
const User = require("../models/user.model");

// Post Routes*****************************************

// creating a new user
router.route("/create-user").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;

  const newUser = new User({
    username,
    email,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Routes*****************************************

// getting all users (for testing)
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// getting a specific user
router.route("/get/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete Routes*****************************************

// deleting a specific user
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json("User deleted: " + user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete all users (for testing)
router.route("/deleteAll").delete((req, res) => {
  User.deleteMany({})
    .then(() => res.json("All users deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
