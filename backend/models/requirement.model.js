const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requirement = require("../models/requirement.model");

const requirementSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String },
    currentVersion: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
    versions: [{ type: Schema.Types.ObjectId, ref: "Requirement" }],
    dependencies: [{ type: Schema.Types.ObjectId, ref: "Requirement" }],
    isBeingEdited: { type: Boolean, required: true },
    isChanged: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = Requirement;
