const router = require('express').Router()
const User = require('../models/user.model')

// Post Routes*****************************************

// creating a new user
router.route('/create-user').post((req, res) => {
  const username = req.body.username
  const email = req.body.email

  const newUser = new User({
    username,
    email,
  })

  newUser
    .save()
    .then((user) => res.json({ message: 'User created', response: user }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: 'Error: could not create user', response: err })
    )
})

// Get Routes*****************************************

// getting all users (for testing)
router.route('/').get((req, res) => {
  User.find()
    .then((users) =>
      res.json({ message: 'Got all users in db', response: users })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: 'Error: could not get all users', response: err })
    )
})

// getting a specific user using their user id
router.route('/get/:id').get((req, res) => {
  User.findById(req.params.id)
    .then((user) =>
      res.json({
        message: 'Got user with id that was passed in',
        response: user,
      })
    )
    .catch((err) =>
      res.status(400).json({
        message: 'Error: could not get user with the id passed in',
        response: err,
      })
    )
})

// getting a specific user using their email
router.route('/get-by-email/:email').get((req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) =>
      res.json({ message: 'Got user with email passed in', response: user })
    )
    .catch((err) =>
      res.status(400).json({
        message: 'Error: could not get user with email that was passed in',
        response: err,
      })
    )
})

// getting a users documents
router.route('/get/documents/:id').get((req, res) => {
  User.findById(req.params.id)
    .populate('documents')
    .exec()
    .then((user) =>
      res.json({
        message: 'Got all documents for user with id that was given',
        response: user.documents,
      })
    )
    .catch((err) =>
      res.status(400).json({
        message:
          'Error: could not get documents for user with id that was given',
        response: err,
      })
    )
})

// getting a users documents with email
router.route('/get/documents-with-email/:email').get((req, res) => {
  User.findOne({ email: req.params.email })
    .populate('documents')
    .exec()
    .then((user) =>
      res.json({
        message: 'Got user with email that was given',
        response: user.documents,
      })
    )
    .catch((err) => {
      res.status(400).json({
        message: 'Error: could not get user with given email',
        response: err,
      })
    })
})

// getting users recent doc array with id
router.route('/get/recent-docs/:id').get((req, res) => {
  const userID = req.params.id
  User.findById(userID)
    .populate('recent_docs')
    .exec()
    .then((user) => {
      res.json({
        message: 'Got the users recent docs with the id that was given',
        response: user.recent_docs,
      })
    })
    .catch((err) =>
      res.json({
        message: 'Error: could not get users recent docs with id given',
        response: err,
      })
    )
})

// getting users recent doc array with email
router.route('/get/recent-docs-with-email/:email').get((req, res) => {
  const email = req.params.email
  User.findOne({ email: email })
    .populate('recent_docs')
    .exec()
    .then((user) => {
      res.json({
        message: 'Got the users recent docs with the email that was given',
        response: user.recent_docs,
      })
    })
    .catch((err) =>
      res.json({
        message: 'Error: could not get users recent docs with email given',
        response: err,
      })
    )
})

// Update Routes*****************************************

// updating a specific user
router.route('/update/:id').put((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      ;(user.username = req.body.username),
        (user.email = req.body.email),
        (user.documents = user.body.documents)

      user
        .save()
        .then((user) => res.json({ message: 'User updated', response: user }))
        .catch((err) =>
          res.status(400).json({
            message: 'Error: could not create new updated user',
            response: err,
          })
        )
    })
    .catch((err) =>
      res.status(400).json({
        message: 'Error: could not find user with the id that was given',
        response: err,
      })
    )
})

// updating the users recent docs field
router.route('/update/recent-docs/:id').patch((req, res) => {
  const userID = req.params.id
  const documentID = req.body.id

  User.findById(userID)
    .then((user) => {
      // making a new array set to users recent docs array
      let newArray = user.recent_docs
      // checking if the users recent doc array is full
      if (user.recent_docs.length >= 3) {
        console.log('bigger than three')
        // removing old element and adding if not already in array
        if (!newArray.includes(documentID)) {
          newArray.pop()
          newArray.unshift(documentID)
        }
      }
      // if the recent doc array is not full add to it
      else {
        // adding new element to the start if id not already in array
        if (!newArray.includes(documentID)) {
          newArray.unshift(documentID)
        }
      }
      User.findByIdAndUpdate(
        { _id: userID },
        { $set: { recent_docs: newArray } }
      )
        .then((user) =>
          res.json({
            message: 'User recent docs array updated.',
            response: user,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: 'Error: user recent docs array could not be updated',
            response: err,
          })
        )
    })
    .catch((err) =>
      res.status(400).json({
        message: 'Error: user could not be found with id',
        response: err,
      })
    )
})

// Delete Routes*****************************************

// deleting a specific user
router.route('/delete/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json({ message: 'User deleted ', response: user }))
    .catch((err) =>
      res.status(400).json({
        message: 'Error: could not delete user with id that was given',
        response: err,
      })
    )
})

// delete all users (for testing)
router.route('/deleteAll').delete((req, res) => {
  User.deleteMany({})
    .then(() => res.json({ message: 'All users deleted', response: null }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: 'Error: could not delete all users', response: err })
    )
})

module.exports = router
