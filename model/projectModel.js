const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    images: [{ type: String, required: true }], // Array of image URLs
    description: { type: String, required: true },
    location: { type: String, required: true },
    text: { type: String }, // Additional text/details
  },
  { timestamps: true },
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
