const mongoose = require('mongoose')
const Schema = mongoose.Schema

const document = require('../models/document.model')

const documentSchema = new Schema(
  {
    title: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tree: { type: String },
    versions: [{ type: Schema.Types.ObjectId, ref: 'Version' }],
  },
  {
    timestamps: true,
  }
)

const Document = mongoose.model('Document', documentSchema)

module.exports = Document
