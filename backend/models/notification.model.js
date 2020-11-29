const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema(
  {
    username: { type: String },
    actionMessage: { type: String },
    requirementTitle: { type: String },
    documentTitle: { type: String },
  },
  {
    timestamps: true,
  }
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
