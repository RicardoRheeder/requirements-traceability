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
      res.json("Document saved to db - " + newDocument._id);
    })
    .catch((err) =>
      res.status(400).json("Error occurred: Could not save the document ")
    );
});

// Get Routes********************************************

// Get all documents
router.route("/").get((req, res) => {
  Document.find()
    .then((docs) => res.json(docs))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a specific document
router.route("/get/:id").get((req, res) => {
  const id = req.params.id;

  Document.findById(id)
    .then((doc) => res.json(doc))
    .catch((err) => {
      res.status(400).json("Error: could not find Document with " + id);
    });
});

// Get all requirements in a document given the doc id
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

// removing user from document and removing document from user
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

// Delete Routes*****************************************

// delete a single doc
router.route("/delete/:id").delete((req, res) => {
  const user = req.body.user;
  const docID = req.params.id;
  Document.findById(docID, "admin collaborators")
  .then((doc)=>{
    const admin = doc.admin
    const collabs = doc.collaborators;
    if(user != admin){
      res.status(400).json("Error: Only the admin of the document can delete the document");
    }else{
      Document.findByIdAndDelete(req.params.id)
      .catch((err) => res.status(400).json("Error: " + err));
      collabs.push(admin);
      var x;
      for(x of collabs){
        User.findByIdAndUpdate(x, {$pull:{documents: docID}})
        .catch((err)=>{res.status(400).json("Error: could not update users documents "+ err)})
      }
      res.json("Document deleted successfully - "+ doc);
    }
  }).catch((err)=>{
    res.status(400).json("Error: Could not find Document with id: "+docID);
  })
});

// delete all docs (for testing)
router.route("/deleteAll").delete((req, res) => {
  Document.deleteMany({})
    .then(() => res.json("All docs deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
