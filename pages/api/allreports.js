/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../utils/dbConnect";
import Report from "../../models/Report";

dbConnect();

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const hola = "hola";
    }
  } catch (err) {
    console.error(err);
  }
};
