const router = require('express').Router();
const Requirement = require('../models/requirement.model');

// Create a new Requirement
router.route("/create-requirement").post((req, res)=>{

    const title = req.body.title;
    const user = req.body.user;

    // TO DO Check syntax
    const newRequirement = new Requirement({
        name: title,
        creator: user,
        currentVersion: '1',
        isDeleted: false,
        isBeingEdited: false,   // TO DO Double check if creation automatically begins editing
        isChanged: false
    })

    newRequirement.save().then((newRequirement)=>{
        res.json("Requirement saved to db " + newRequirement)
    }).catch((err)=>res.status(400).json("Error occured: Coudl not save "+ err))
});

// Update a Requirement

// Get all Requirements

// Get a specific Requirement

// Get all versions of a Requirement (and populate)

// Delete a Requirement

// Delete all Requirements