const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    userImage: { type: String, required: true },
    text: { type: String, required: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
