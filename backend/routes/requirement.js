const router = require("express").Router();
const Requirement = require("../models/requirement.model");

// Post Routes*****************************************

// create a new requirement
router.route("/create-requirement").post((req, res) => {
  const name = req.body.name;
  const creator = req.body.creator;
  const currentVersion = 1;
  const isDeleted = false;
  const isBeingEdited = true; //TODO: ask front end guys about req. creation flow (will it be edited right away?)
  const isChanged = false;

  const newRequirement = new Requirement({
    name,
    creator,
    currentVersion,
    isDeleted,
    isBeingEdited,
    isChanged,
  });

  newRequirement
    .save()
    .then((requirement) => res.json({message: "Requirement was added ", response: requirement}))
    .catch((err) => res.status(400).json({message: "Error ", response: err}));
});

// Get Routes*****************************************

// get all req.
router.route("/").get((req, res) => {
  Requirement.find()
    .then((reqs) => res.json({message: null, response: reqs}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// get specific req.
router.route("/get-requirement/:id").get((req, res) => {
  Requirement.findById(req.params.id)
    .then((requirement) => res.json({message: null, response: requirement}))
    .catch((err) => res.status(400).json({message: "Error ", response: err}));
});

// Update Routes*****************************************

// updating isChanged status
router.route("/update-isChanged/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isChanged: req.body.value } }
  )
    .then((requirement) =>
      res.json({message: "requirement isChanged status updated: ", response: requirement})
    )
    .catch((err) => res.json({message: "Error: ", response: err}));
});

// updating isBeingEdited
router.route("/update-isBeingEdited/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isBeingEdited: req.body.value } }
  )
    .then((requirement) =>
      res.json({message: "requirement isBeingEdited status updated: ", response: requirement})
    )
    .catch((err) => res.json({message: "Error: ", response: err}));
});

// updating isDeleted
router.route("/update-isDeleted/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isDeleted: req.body.value } }
  )
    .then((requirement) =>
      res.json({message: "requirement isDeleted status updated: ", response: requirement})
    )
    .catch((err) => res.json({message: "Error: ", response: err}));
});

// updating the req body
router.route("/update-body/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { body: req.body.value } }
  )
    .then((requirement) =>
      res.json({message: "requirement text body updated: ", response: requirement})
    )
    .catch((err) => res.json({message: "Error: ", response: err}));
});

// updating the req name
router.route("/update-name/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.value } }
  )
    .then((requirement) =>
      res.json({message: "requirement text name updated: ", response: requirement})
    )
    .catch((err) => res.json({message: "Error: ", response: err}));
});

// Delete routes*****************************************

// deleting a specific requirement
router.route("/delete-requirement/:id").delete((req, res) => {
  Requirement.findByIdAndDelete(req.params.id)
    .then((requirement) => res.json({message: "Requirement deleted: ", response: requirement}))
    .catch((err) => res.status(400).json({message: "Error: ", response: err}));
});

// delete all req. (for testing)
router.route("/deleteAll").delete((req, res) => {
  Requirement.deleteMany({})
    .then(() => res.json({message: "All requirements deleted", response: null}))
    .catch((err) => res.status(400).json({message:"Error: ", response: err}));
});

module.exports = router;
