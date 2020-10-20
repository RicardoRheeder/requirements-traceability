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
    }).catch((err)=>res.status(400).json("Error occured: Could not save "+ err))
});


// TO DO: Update a Requirement


// TO DO: Get all Requirements


// TO DO: Get a specific Requirement
router.route("/get:id").get((req,res)=>{

    const id = req.params.id;

    Requirement.findById(id).then((doc)=> res.json(doc)).catch((err)=>{
        res.status(400).json("Error occured: could not find Requirement with "+ id);
    })
});


// TO DO: Get all versions of a Requirement (and populate)


// TO DO: Delete a Requirement


// TO DO: Delete all Requirements