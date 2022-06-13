/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import Report from "../../models/Report";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { cedula, referencias, imageLinks, lng, lat, defaultStatus, date } =
        req.body;

      await new Report({
        createdBy: cedula,
        lat,
        lng,
        referencias,
        imagenes: imageLinks,
        status: defaultStatus,
        creationDate: date,
      }).save();

      res.status(200).json({ message: "Reporte creado" });
    }
  } catch (error) {
    console.error(error);
  }
};
