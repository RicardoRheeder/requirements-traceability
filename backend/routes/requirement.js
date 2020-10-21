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
    .then((requirement) => res.json("Requirement was added " + requirement))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get Routes*****************************************

// get all req.
router.route("/").get((req, res) => {
  Requirement.find()
    .then((reqs) => res.json(reqs))
    .catch((err) => res.status(400).json("Error: " + err));
});

// get specific req.
router.route("/get-requirement/:id").get((req, res) => {
  Requirement.findById(req.params.id)
    .then((requirement) => res.json(requirement))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Update Routes*****************************************

// updating isChanged status
router.route("/update-isChanged/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isChanged: req.body.value } }
  )
    .then((requirement) =>
      res.json("requirement isChanged status updated: " + requirement)
    )
    .catch((err) => res.json("Error: " + err));
});

// updating isBeingEdited
router.route("/update-isBeingEdited/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isBeingEdited: req.body.value } }
  )
    .then((requirement) =>
      res.json("requirement isBeingEdited status updated: " + requirement)
    )
    .catch((err) => res.json("Error: " + err));
});

// updating isDeleted
router.route("/update-isDeleted/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { isDeleted: req.body.value } }
  )
    .then((requirement) =>
      res.json("requirement isDeleted status updated: " + requirement)
    )
    .catch((err) => res.json("Error: " + err));
});

// updating the req body
router.route("/update-body/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { body: req.body.value } }
  )
    .then((requirement) =>
      res.json("requirement text body updated: " + requirement)
    )
    .catch((err) => res.json("Error: " + err));
});

// updating the req name
router.route("/update-name/:id").patch((req, res) => {
  Requirement.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.value } }
  )
    .then((requirement) =>
      res.json("requirement text name updated: " + requirement)
    )
    .catch((err) => res.json("Error: " + err));
});

// Delete routes*****************************************

// deleting a specific requirement
router.route("/delete-requirement/:id").delete((req, res) => {
  Requirement.findByIdAndDelete(req.params.id)
    .then((requirement) => res.json("Requirement deleted: " + requirement))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete all req. (for testing)
router.route("/deleteAll").delete((req, res) => {
  Requirement.deleteMany({})
    .then(() => res.json("All requirements deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
