const mongoose = require("mongoose");

const sliderImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const SliderImage =
  mongoose.models.SliderImage ||
  mongoose.model("SliderImage", sliderImageSchema);

module.exports = SliderImage;
