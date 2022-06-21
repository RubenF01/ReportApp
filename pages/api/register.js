/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { firstName, lastName, email, cedula, password, creationDate } =
        req.body;
      const user = await User.findOne({ email });
      const userCedula = await User.findOne({ cedula });
      const isAdmin = false;

      if (user || userCedula) {
        res.status(422).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await new User({
        firstName,
        lastName,
        email,
        cedula,
        password: hashedPassword,
        isAdmin,
        creationDate,
      }).save();

      res.status(200).json({ message: "Registered successfully" });
    }
  } catch (error) {
    console.error(error);
  }
};
