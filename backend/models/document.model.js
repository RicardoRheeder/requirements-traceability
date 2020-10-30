const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const document = require("../models/document.model");

const documentSchema = new Schema(
  {
    title: {type: String, required: true}, 
    admin: {type: Schema.Types.ObjectId, ref: "User"},
    collaborators: [{type: Schema.Types.ObjectId, ref: "User"}],
<<<<<<< HEAD
    tree: { type: String},
=======
    tree: {type: String},
>>>>>>> rir954-shh738-faq588/test/testing-async-calls-from-frontend
    version: [{ type: Schema.Types.ObjectId, ref: "Document"}],
  },
  {
        timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;