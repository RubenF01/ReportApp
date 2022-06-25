/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const allUsers = await User.find();

      res.status(200).json({ allUsers });
    }
  } catch (err) {
    console.error(err);
  }
};
