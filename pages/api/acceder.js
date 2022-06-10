/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { correo, password } = req.body;
      const user = await User.findOne({ correo });

      if (!user) {
        res.status(422).json({ message: "Usuario no existe" });
      }

      const matchPassword = await bcrypt.compare(password, user.password);

      if (!matchPassword) {
        res.status(404).json({ message: "Credenciales incorrectas" });
      } else {
        const token = await jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        res.status(201).json({ message: "Login exitoso", user, token });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
