const router = require('express').Router();
const Document = require('../models/document.model');

// Post Routes*****************************************

// Create a new document
router.route("/create-document").post((req, res)=>{

    const title = req.body.title;
    const user = req.body.user;

    const newDocument = new Document({
        title,
        admin: user
    })

    newDocument.save().then((newDocument)=>{
        res.json("Document saved to db " + newDocument)
        
    }).catch((err)=>res.status(400).json("Error occured: Could not save "+ err))
});

// Get Routes********************************************

// Get a document
router.route("/get:id").get((req, res)=>{

    const id = req.params.id;

    Document.findById(id).then((doc)=> res.json(doc)).catch((err)=>{
        res.status(400).json("Error: could not find Document with "+id);
    })
});

// Get all requirements given an id
router.route("/get-requirements/:id").get((req, res)=>{

     const id = req.params.id;

     Document.findById(id).populate("requirements").exec().then((doc)=>{
         res.json(doc);                  
     }).catch((err)=>{
         res.status(400).json("Error: could not find requirements given "+ id);
     })
})

// Get all users





