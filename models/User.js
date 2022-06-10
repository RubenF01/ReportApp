const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reports: {
    type: Array,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
