const mongoose = require('mongoose')
const Schema = mongoose.Schema

const versionSchema = new Schema(
  {
    name: { type: String, required: true },
    tree: { type: String },
  },
  {
    timestamps: true,
  }
)

const Version = mongoose.model('Version', versionSchema)

module.exports = Version
