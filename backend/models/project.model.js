const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const project = require("../models/project.model");

const projectSchema = new Schema(
  {
      documents:[{ type: Schema.Types.ObjectId, ref: "Document"}],
      users:[{ type: Schema.Types.ObjectId, ref: "User"}],
  },
  {
        timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;