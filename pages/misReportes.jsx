import GlobalContext from "../context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReportItem from "../components/report/ReportItem";
import Link from "next/link";
import Arrowleft from "../public/arrowleft.svg";
import ReportPanel from "../components/report/ReportPanel";
import BlackOverlay from "../components/layout/BlackOverlay";
import { motion, AnimatePresence } from "framer-motion";

const MisReportes = () => {
  const value = useContext(GlobalContext);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [infoPanel, setInfoPanel] = useState(false);
  const [info, setInfo] = useState({});
  const { loggedUser, reports, setReports } = value;

  const cedula = loggedUser?.cedula;

  const getReports = async () => {
    try {
      const response = await axios.get("/api/reporte", {
        params: {
          cedula,
        },
      });

      setReports(response.data?.reports);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReport = async () => {
    try {
      await axios.delete("/api/reporte", {
        params: {
          id: deleteId,
        },
      });
      getReports();
      setDeleteMessage(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReports();
  }, [cedula]);

  if (loggedUser) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center gap-y-4 relative font-poppins pt-6 overflow-x-hidden">
        <div className="w-[95%]">
          <div className="flex py-3">
            <Link href="/userDashboard">
              <a className="block">
                <div className="flex items-center border-[1px] border-black px-5 py-2 hover:bg-black hover:fill-white hover:text-white">
                  <Arrowleft className="w-4" />
                  <p className="pl-2 font-bold">Volver</p>
                </div>
              </a>
            </Link>
          </div>
          <h1 className="font-poppins font-bold text-2xl">MIS REPORTES</h1>
        </div>
        <div className="h-[80%] w-full flex justify-center items-center">
          <div className="h-full w-[95%] grid md:grid-cols-1 lg:grid-cols-3 overflow-y-auto gap-y-10 py-3">
            {reports.map((report, index) => (
              <ReportItem
                key={index}
                report={report}
                getReports={getReports}
                setDeleteMessage={setDeleteMessage}
                setDeleteId={setDeleteId}
                setInfo={setInfo}
                setInfoPanel={setInfoPanel}
              />
            ))}
          </div>
        </div>

        {/* Delete message overlay and message */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 flex justify-center items-center ${
              deleteMessage ? "" : "hidden"
            }`}
          >
            <div className="bg-white border-[1px] border-black py-10 px-10 space-y-4 z-[2500]">
              <h1 className="text-center cursor-default">¿Estás seguro?</h1>
              <div className="flex space-x-5">
                <button
                  onClick={deleteReport}
                  className="border-[1px] border-black px-3 py-2 hover:text-white hover:bg-red-700"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => setDeleteMessage(false)}
                  className="border-[1px] border-black px-3 py-2 hover:text-white hover:bg-black"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <BlackOverlay state={deleteMessage} stateChange={setDeleteMessage} />

        {/* Info panel */}
        <ReportPanel
          info={info}
          infoPanel={infoPanel}
          setInfoPanel={setInfoPanel}
        />
        <BlackOverlay state={infoPanel} stateChange={setInfoPanel} />
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
