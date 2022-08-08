/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  try {
    const { id } = req.query;
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted user" });
  } catch (err) {
    console.error(err);
  }
};
