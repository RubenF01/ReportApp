/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { nombre, apellido, correo, cedula, password, creationDate } =
        req.body;
      const user = await User.findOne({ correo });
      const userCedula = await User.findOne({ cedula });
      const isAdmin = false;

      if (user || userCedula) {
        res.status(422).json({ message: "Usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await new User({
        nombre,
        apellido,
        correo,
        cedula,
        password: hashedPassword,
        isAdmin,
        creationDate,
      }).save();

      res.status(200).json({ message: "Registro exitoso" });
    }
  } catch (error) {
    console.error(error);
  }
};
