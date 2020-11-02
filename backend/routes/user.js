const router = require("express").Router();
const User = require("../models/user.model");

// Post Routes*****************************************

// creating a new user
router.route("/create-user").post((req, res) => {
  console.log("At create user");
  console.log(req.body.username);
  console.log(req.body.email);
  const username = req.body.username;
  const email = req.body.email;

  const newUser = new User({
    username,
    email,
  });

  newUser
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// Get Routes*****************************************

// getting all users (for testing)
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json({message: null, response: users}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// getting a specific user using their user id
router.route("/get/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json({message: null, response: user}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// getting a specific user using their email
router.route("/get-by-email/:email").get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => res.json({message: null, response: user}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// getting a users documents
router.route("/get/documents/:id").get((req, res) => {
  User.findById(req.params.id)
    .populate("documents")
    .exec()
    .then((user) => res.json({message: null, response: user.documents}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// getting a users documents with email
router.route("/get/documents-with-email/:email").get((req, res) => {
  console.log("reached - "+ req.params.email);
  User.findOne({ email: req.params.email })
    .populate("documents")
    .exec()
    .then((user) => {console.log(user);res.json({message: null, response: user.documents})})
    .catch((err) => {console.log("error at getting docs "+ err);res.status(400).json({message: "Error: ", response: err})});
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
        .then((user) => res.json({message: "User updated: ", response: user}))
        .catch((err) => res.status(400).json({message: "Error: ", response: err}));
    })
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// Delete Routes*****************************************

// deleting a specific user
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json({message: "User deleted: ", response: user}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// delete all users (for testing)
router.route("/deleteAll").delete((req, res) => {
  User.deleteMany({})
    .then(() => res.json({message: "All users deleted", response: null}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

module.exports = router;
