/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  try {
    const updateType = await User.findOneAndUpdate(
      { cedula: req.body.cedula },
      {
        isAdmin: req.body.userType,
      }
    );

    res.status(200).json({ updateType });
  } catch (err) {
    console.error(err);
  }
};
