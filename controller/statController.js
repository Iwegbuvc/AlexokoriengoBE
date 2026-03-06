const Stat = require('../model/statModel');

exports.getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createStat = async (req, res) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json(stat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateStat = async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (!stat) return res.status(404).json({ error: 'Stat not found' });
    res.json(stat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStat = async (req, res) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (!stat) return res.status(404).json({ error: 'Stat not found' });
    res.json({ message: 'Stat deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};