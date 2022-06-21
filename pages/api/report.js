/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import Report from "../../models/Report";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const {
        cedula,
        references,
        imageLinks,
        lng,
        lat,
        defaultStatus,
        date,
        type,
        fullAddress,
        sector,
        province,
      } = req.body;

      await new Report({
        createdBy: cedula,
        lat,
        lng,
        references,
        images: imageLinks,
        status: defaultStatus,
        creationDate: date,
        type,
        fullAddress,
        sector,
        province,
      }).save();

      res.status(200).json({ message: "Report created" });
    }

    if (req.method === "GET") {
      const { cedula } = req.query;
      const reports = await Report.find({ createdBy: cedula });

      res.status(200).json({ reports });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await Report.findByIdAndDelete(id);

      res.status(200).json({ message: "Deleted report" });
    }
  } catch (error) {
    console.error(error);
  }
};
