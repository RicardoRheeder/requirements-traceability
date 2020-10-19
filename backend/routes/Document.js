const router = require("express").Router();
const User = require("../models/user.model");
const Document = require("../models/document.model");

// Post Routes*****************************************

// Create a new document
router.route("/create-document").post((req, res) => {
  const title = req.body.title;
  const admin = req.body.admin;

  const newDocument = new Document({
    title,
    admin,
  });

  newDocument
    .save()
    .then((newDocument) => {
      res.json("Document saved to db " + newDocument);
    })
    .catch((err) =>
      res.status(400).json("Error occured: Could not save " + err)
    );
});

// Get Routes********************************************

// Get all document
router.route("/").get((req, res) => {
  Document.find()
    .then((docs) => res.json(docs))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a document
router.route("/get/:id").get((req, res) => {
  const id = req.params.id;

  Document.findById(id)
    .then((doc) => res.json(doc))
    .catch((err) => {
      res.status(400).json("Error: could not find Document with " + id);
    });
});

// Get all requirements given an id
router.route("/get-requirements/:id").get((req, res) => {
  const id = req.params.id;

  Document.findById(id)
    .populate("requirements")
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(400).json("Error: could not find requirements given " + id);
    });
});

// Update Routes*****************************************

// adding a user to a document
router.route("/add-user/:id").patch((req, res) => {
  Document.findByIdAndUpdate(
    { _id: req.params.id },
    { $addToSet: { collaborators: req.body.userId } }
  )
    .then((doc) => res.json(doc))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete Routes*****************************************

// delete all docs (for testing)
router.route("/deleteAll").delete((req, res) => {
  Document.deleteMany({})
    .then(() => res.json("All docs deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;