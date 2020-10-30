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
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Routes*****************************************

// getting all users (for testing)
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// getting a specific user using their user id
router.route("/get/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// getting a specific user using their email
router.route("/get-by-email/:email").get((req, res) => {
  console.log(req.params.email);
  User.findOne({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// getting a user and populating its documents
router.route("/get/populate/:id").get((req, res) => {
  User.findById(req.params.id)
    .populate("documents")
    .exec()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update Routes*****************************************

// updating a specific user
router.route("/update/:id").put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      (user.username = req.body.username),
        (user.email = req.body.email),
        (user.documents = user.body.documents);

      user
        .save()
        .then((user) => res.json("User updated: " + user))
        .catch((err) => res.status(400).json("Error: " + err));
    })
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
