const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  referencias: {
    type: String,
    required: true,
  },
  imagenes: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports =
  mongoose.models.Report || mongoose.model("Report", ReportSchema);