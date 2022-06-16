import GlobalContext from "../context/GlobalContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import ReportItem from "../components/report/ReportItem";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import Link from "next/link";
import Arrowleft from "../public/arrowleft.svg";

const MisReportes = () => {
  const cookies = parseCookies();
  const value = useContext(GlobalContext);
  const { loggedUser, reports, setReports } = value;

  const cedula = loggedUser?.cedula;

  const getReports = async () => {
    try {
      const response = await axios.get("/api/reporte", {
        params: {
          cedula,
        },
      });

      cookie.set("reports", JSON.stringify(response.data?.reports));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReports();
    cookies?.reports ? setReports(JSON.parse(cookies.reports)) : setReports([]);
  }, [cedula, cookies.reports]);

  if (loggedUser) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
        <div className="w-[95%]">
          <div className="flex">
            <Link href="/userDashboard">
              <a className="block">
                <div className="flex items-center">
                  <Arrowleft className="w-4" />
                  <p>Back</p>
                </div>
              </a>
            </Link>
          </div>
          <h1 className="font-poppins font-bold">MIS REPORTES</h1>
        </div>
        <div className="h-[70%] w-full flex justify-center items-center">
          <div className="bg-slate-500 h-full w-[95%] grid grid-cols-2 overflow-y-auto gap-y-5">
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
