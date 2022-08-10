/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import Report from "../../models/Report";

dbConnect();

export default async (req, res) => {
  try {
    const updateStatus = await Report.findOneAndUpdate(
      { _id: req.body.id },
      {
        status: req.body.status,
      }
    );

    res.status(200).json({ updateStatus });
  } catch (err) {
    console.error(err);
  }
};
