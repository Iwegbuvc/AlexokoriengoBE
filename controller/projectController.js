const Project = require("../model/projectModel");
const cloudinary = require("../utilities/cloudinary");

// Helper to upload multiple images to Cloudinary
const uploadImagesToCloudinary = (files) => {
  return Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "ngo_projects" }, (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            })
            .end(file.buffer);
        }),
    ),
  );
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    // Pagination
      const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
      const limit =
        parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 5;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(),
    ]);

    res.json({
      projects,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a project (multiple images)
exports.addProject = async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res
        .status(400)
        .json({ message: "At least two images are required" });
    }
    const imageUrls = await uploadImagesToCloudinary(req.files);
    const { description, location, text } = req.body;
    const project = new Project({
      images: imageUrls,
      description,
      location,
      text,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Edit a project (optionally update images)
exports.editProject = async (req, res) => {
  try {
    const { description, location, text } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (typeof description !== "undefined") project.description = description;
    if (typeof location !== "undefined") project.location = location;
    if (typeof text !== "undefined") project.text = text;
    if (req.files && req.files.length > 0) {
      const imageUrls = await uploadImagesToCloudinary(req.files);
      project.images = imageUrls;
    }
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
