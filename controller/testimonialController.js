const Testimonial = require("../model/testimonialModel");
const cloudinary = require("../utilities/cloudinary");

// Get all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 5;
    const skip = (page - 1) * limit;

    const [testimonials, total] = await Promise.all([
      Testimonial.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Testimonial.countDocuments(),
    ]);

    res.json({
      testimonials,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a testimonial
exports.addTestimonial = async (req, res) => {
  try {
    const { text, name, location } = req.body;
    if (req.file) {
      cloudinary.uploader
        .upload_stream(
          { folder: "ngo_testimonials" },
          async (error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ message: "Cloudinary upload error", error });
            }
            const testimonial = new Testimonial({
              userImage: result.secure_url,
              text,
              name,
              location,
            });
            await testimonial.save();
            res.status(201).json(testimonial);
          },
        )
        .end(req.file.buffer);
    } else {
      // Use ui-avatars.com as fallback
      const initials = name
        ? encodeURIComponent(
            name
              .split(" ")
              .map((n) => n[0])
              .join("") || "U",
          )
        : "U";
      const avatarUrl = `https://ui-avatars.com/api/?name=${initials}&background=random`;
      const testimonial = new Testimonial({
        userImage: avatarUrl,
        text,
        name,
        location,
      });
      await testimonial.save();
      res.status(201).json(testimonial);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit a testimonial
exports.editTestimonial = async (req, res) => {
  try {
    const { text, name, location } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });
    // Only update fields that are provided
    if (typeof text !== "undefined") testimonial.text = text;
    if (typeof name !== "undefined") testimonial.name = name;
    if (typeof location !== "undefined") testimonial.location = location;
    if (req.file) {
      cloudinary.uploader
        .upload_stream(
          { folder: "ngo_testimonials" },
          async (error, result) => {
            if (error) {
              return res
                .status(500)
                .json({ message: "Cloudinary upload error", error });
            }
            testimonial.userImage = result.secure_url;
            await testimonial.save();
            res.json(testimonial);
          },
        )
        .end(req.file.buffer);
    } else if (!testimonial.userImage && testimonial.name) {
      // If no image and no previous image, use ui-avatars.com as fallback
      const initials = testimonial.name
        ? encodeURIComponent(
            testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("") || "U",
          )
        : "U";
      testimonial.userImage = `https://ui-avatars.com/api/?name=${initials}&background=random`;
      await testimonial.save();
      res.json(testimonial);
    } else {
      await testimonial.save();
      res.json(testimonial);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });
    // Optionally, delete image from Cloudinary (not required for just URL storage)
    await testimonial.deleteOne();
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
