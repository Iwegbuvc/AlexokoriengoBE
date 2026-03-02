const SliderImage = require("../model/sliderImageModel");
const cloudinary = require("../utilities/cloudinary");

// Get all slider images
exports.getSliderImages = async (req, res) => {
  try {
    const images = await SliderImage.find().sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Upload a new slider image
exports.uploadSliderImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "ngo_slider" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Cloudinary upload error", error });
        }
        const image = new SliderImage({ url: result.secure_url });
        await image.save();
        res.status(201).json(image);
      },
    );
    // Pipe buffer to Cloudinary
    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err);
  }
};

// Delete a slider image
exports.deleteSliderImage = async (req, res) => {
  try {
    const image = await SliderImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    // Extract public_id from URL for Cloudinary deletion
    const urlParts = image.url.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const publicId = `ngo_slider/${fileName.split(".")[0]}`;
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (e) {
      // Ignore if not found in Cloudinary
    }
    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err);
  }
};
