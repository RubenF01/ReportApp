import GlobalContext from "../context/GlobalContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import ReportItem from "../components/report/ReportItem";

const MisReportes = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, reports, setReports } = value;
  console.log(reports);

  const cedula = loggedUser?.cedula;

  const getReports = async () => {
    try {
      const response = await axios.get("/api/reporte", {
        params: {
          cedula,
        },
      });

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
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
        <div className="w-[95%]">
          <h1 className="font-poppins font-bold">Mis reportes</h1>
        </div>
        <div className="h-[70%] w-full flex justify-center items-center">
          <div className="bg-slate-500 h-full w-[95%]">
            {reports.map((report, index) => (
              <ReportItem key={index} report={report} />
            ))}
          </div>
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
