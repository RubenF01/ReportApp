/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import Report from "../../models/Report";

dbConnect();

export default async (req, res) => {
  try {
    const { id } = req.query;
    await Report.findByIdAndDelete(id);

    res.status(200).json({ message: "Deleted report" });
  } catch (err) {
    console.error(err);
  }
};
