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
  references: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  creationDate: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Report || mongoose.model("Report", ReportSchema);
