/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import Report from "../../models/Report";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const allReports = await Report.find();

      res.status(200).json({ allReports });
    }
  } catch (err) {
    console.error(err);
  }
};
