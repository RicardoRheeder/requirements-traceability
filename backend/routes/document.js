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
      res.status(400).json("Error occurred: Could not save " + err)
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

// Get the tree hierarchy of a document given the doc id
router.route("/get-tree/:id").get((req, res) => {
  const id = req.params.id;

  Document.findById(id)
    .then((doc) => res.json(doc.tree))
    .catch((err) => {
      res.status(400).json("Error: could not find tree hierarchy given " + id);
    });
});


// Update Routes*****************************************

// adding a user to a document and adding a document to the user
router.route("/add-user/:id").patch((req, res) => {
  Document.findByIdAndUpdate(
    { _id: req.params.id },
    { $addToSet: { collaborators: req.body.userId } }
  )
    .then((doc) => {
      User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { documents: req.params.id } }
      )
        .then((user) => res.json("User added to doc: " + doc))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// removing user from document and removing document form user
router.route("/remove-user/:id").patch((req, res) => {
  Document.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { collaborators: req.body.userId } }
  )
    .then((doc) => {
      User.findByIdAndUpdate(
        { _id: req.body.userId },
        { $pull: { documents: req.params.id } }
      )
        .then((user) => res.json("User removed from the doc: " + doc))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// updating the tree structure
router.route("/update-tree/:id").patch((req, res) => {
  Document.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { "tree": req.body.tree } }
  )
  .then((doc) => res.json("Tree structure updated within the doc: " + doc))
  .catch((err) => res.status(400).json("Error: " + err));
});

// Delete Routes*****************************************

// delete a single doc
router.route("/delete/:id").delete((req, res) => {
  Document.findByIdAndDelete(req.params.id)
    .then((doc) => res.json("Document deleted: " + doc))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete all docs (for testing)
router.route("/deleteAll").delete((req, res) => {
  Document.deleteMany({})
    .then(() => res.json("All docs deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
