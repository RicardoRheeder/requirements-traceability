const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = require('../models/user.model')

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    documents: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    recent_docs: [{ type: Schema.Types.ObjectId, ref: 'Document' }],
    notifications: [{ type: String }],
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
