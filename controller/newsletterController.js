const Newsletter = require("../model/newsletterModel");
const cloudinary = require("../utilities/cloudinary");

// Create a new event/newsletter
exports.createNewsletter = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;
    let imageUrl = undefined;
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "newsletter" },
        (error, result) => {
          if (error) throw error;
          imageUrl = result.secure_url;
        },
      );
      // Use promise to handle stream
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "newsletter" },
          (error, result) => {
            if (error) return reject(error);
            imageUrl = result.secure_url;
            resolve();
          },
        );
        stream.end(req.file.buffer);
      });
    }
    const newsletter = new Newsletter({
      title,
      description,
      eventDate,
      image: imageUrl,
    });
    await newsletter.save();
    res.status(201).json({ message: "Event created successfully", newsletter });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all events/newsletters
exports.getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ eventDate: 1 });
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an event/newsletter
exports.updateNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;
    let imageUrl = undefined;
    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "newsletter" },
          (error, result) => {
            if (error) return reject(error);
            imageUrl = result.secure_url;
            resolve();
          },
        );
        stream.end(req.file.buffer);
      });
    }
    const updateFields = { title, description, eventDate };
    if (imageUrl) updateFields.image = imageUrl;
    const newsletter = await Newsletter.findByIdAndUpdate(id, updateFields, {
      returnDocument: "after",
    });
    if (!newsletter)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event updated", newsletter });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete an event/newsletter
exports.deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findByIdAndDelete(id);
    if (!newsletter)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
