const Newsletter = require('../model/newsletterModel');

// Create a new event/newsletter
exports.createNewsletter = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;
    const newsletter = new Newsletter({ title, description, eventDate });
    await newsletter.save();
    res.status(201).json({ message: 'Event created successfully', newsletter });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all events/newsletters
exports.getNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ eventDate: 1 });
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update an event/newsletter
exports.updateNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, eventDate } = req.body;
    const newsletter = await Newsletter.findByIdAndUpdate(
      id,
      { title, description, eventDate },
      { returnDocument: 'after' }
    );
    if (!newsletter) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event updated', newsletter });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete an event/newsletter
exports.deleteNewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await Newsletter.findByIdAndDelete(id);
    if (!newsletter) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
