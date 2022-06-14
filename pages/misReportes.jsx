import GlobalContext from "../context/GlobalContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import ReportItem from "../components/report/ReportItem";
import cookie from "js-cookie";

const MisReportes = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, reports, setReports } = value;
  console.log(loggedUser);
  console.log(reports);

  const cedula = loggedUser?.cedula;

  const getReports = async () => {
    try {
      const response = await axios.get("/api/reporte", {
        params: {
          cedula,
        },
      });

      cookie.set("reports", JSON.stringify(response.data.reports));

      setReports(response.data.reports);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReports();
  }, [cedula]);

  if (loggedUser) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="h-56 bg-slate-500">
          {/* {reports?.map((report, index) => (
            <ReportItem key={index} />
          ))} */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <h1 className="text-4xl font-bold font-poppins">
          ¡USUARIO NO AUTORIZADO!
        </h1>
      </div>
    );
  }
};

export default MisReportes;
