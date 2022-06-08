const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, "Please add your name"] },
  apellido: {
    type: String,
    required: [true, "Please add your last name"],
  },
  correo: {
    type: String,
    required: [true, "Please add your email"],
  },
  cedula: {
    type: String,
    required: [true, "Please add your cedula"],
  },
  password: {
    type: String,
    required: [true, "Please add your password"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
