const router = require("express").Router();
const User = require("../models/user.model");
const Document = require("../models/document.model");

// Post Routes*****************************************

// Create a new document
router.route("/create-document").post((req, res) => {
  const title = req.body.title;
  const admin = req.body.admin;
  const collaborators = [admin];

  const tree = [
    { title: 'Title of your requirement. (1)', text: 'Type contents of requirement here...', id: 1 },
    {
      title: 'Title of your requirement. (2)',
      id: 2,
      text: 'Type contents of requirement here...',
      children: [{ title: 'Title of your requirement. (3)', text: 'Type contents of requirement here...', id: 3 }],
    },
  ]

  const newDocument = new Document({
    title,
    admin,
    collaborators,
    tree: JSON.stringify(tree),
  });

  newDocument
    .save()
    .then((newDocument) => {
      // adding the document to the admins documents array
      User.findByIdAndUpdate(
        { _id: admin },
        { $addToSet: { documents: newDocument._id } }
      )
        .then((user) =>
          res.json({message: "Document saved to the database", response: newDocument})
        )
        .catch((err) =>
          res
            .status(400)
            .json(
              "Error: could not not add document to admins document array, Error: " +
                err
            )
        );
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

// Delete Routes*****************************************

// delete a single doc
router.route("/delete/:id").delete((req, res) => {
  const user = req.body.user;
  const docID = req.params.id;
  // Find the document selecting the admin and collaborators fields
  Document.findById(docID, "admin collaborators")
    .then((doc) => {
      const admin = doc.admin;
      const collabs = doc.collaborators;
      // Check if user = admin of the document
      if (user != admin) {
        res
          .status(400)
          .json(
            "Error: Only the admin of the document can delete the document"
          );
      } else {
        //Delete the document
        Document.findByIdAndDelete(req.params.id).catch((err) =>
          res.status(400).json("Error: " + err)
        );
        collabs.push(admin);
        let x;
        // Delete the documentID from all collaborators
        for (x of collabs) {
          User.findByIdAndUpdate(x, { $pull: { documents: docID } }).catch(
            (err) => {
              res
                .status(400)
                .json("Error: could not update users documents " + err);
            }
          );
        }
        // Get admins list of documents and send it
        User.findById(admin, "documents")
          .then((docs) => {
            const adminDocs = docs.documents;
            res.json(
              "Document deleted successfully-Updated admin's documents: " +
                adminDocs
            );
          })
          .catch((err) => {
            res
              .json(400)
              .json("Error: could not find admin's list of documents: " + err);
          });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json("Error: Could not find Document with id: " + docID + " " + err);
    });
});

// delete all docs (for testing)
router.route("/deleteAll").delete((req, res) => {
  Document.deleteMany({})
    .then(() => res.json("All docs deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
