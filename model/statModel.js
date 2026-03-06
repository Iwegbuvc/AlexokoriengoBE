const mongoose = require("mongoose");

const ICON_LIST = [
  "fa-user",
  "fa-star",
  "fa-heart",
  "fa-chart-bar",
  "fa-leaf",
  "fa-globe",
  "fa-hands-helping",
  "fa-graduation-cap",
  "fa-briefcase",
  "fa-comments",
  "fa-map-pin",
  "fa-thumbtack",
  "fa-money-bill",
  "fa-coins"
];

const statSchema = new mongoose.Schema({
  icon: { type: String, required: true, enum: ICON_LIST },
  number: { type: String, required: true },
  label: { type: String, required: true },
});

module.exports = mongoose.model("Stat", statSchema);
