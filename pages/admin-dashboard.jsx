/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import dynamic from "next/dynamic";
import BarChart from "../components/chart/BarChart";
import DoughnutChart from "../components/chart/DoughnutChart";
import PieChart from "../components/chart/PieChart";
import UserBanner from "../components/banners/UserBanner";
import ReportBanner from "../components/banners/ReportBanner";
import BlackOverlay from "../components/layout/BlackOverlay";
import ReportModal from "../components/report/ReportModal";
import { motion, AnimatePresence } from "framer-motion";

const GeneralMap = dynamic(() => import("../components/map/GeneralMap"), {
  ssr: false,
});

const AdminDashboard = () => {
  const [allReports, setAllReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterOption, setFilterOption] = useState("firstName");
  const [filterOptionReport, setFilterOptionReport] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [foundReports, setFoundReports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");
  const [info, setInfo] = useState({});
  const [infoPanel, setInfoPanel] = useState(false);
  const value = useContext(GlobalContext);
  const { loggedUser } = value;

  const filterSelect = (e) => setFilterOption(e.target.value);
  const filterSelectReports = (e) => setFilterOptionReport(e.target.value);

  const filterAdvanced = (e) => {
    const keyword = e.target.value;

    if (keyword === "true") keyword = true;
    if (keyword === "false") keyword = false;

    if (filterOptionReport === "status" && keyword !== "") {
      const results = allReports.filter((report) => report.status === keyword);
      setFoundReports(results);
    }

    if (filterOptionReport === "type" && keyword !== "") {
      const results = allReports.filter((report) => report.type === keyword);
      setFoundReports(results);
    }

    if (filterOptionReport === "sector" && keyword !== "") {
      const results = allReports.filter((report) => report.sector === keyword);
      setFoundReports(results);
    }

    if (filterOptionReport === "province" && keyword !== "") {
      const results = allReports.filter(
        (report) => report.province === keyword
      );
      setFoundReports(results);
    }

    if (filterOptionReport === "cedula" && keyword !== "") {
      const results = allReports.filter(
        (report) => report.createdBy === keyword
      );
      setFoundReports(results);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete("/api/deleteUser", {
        params: {
          id: userToDelete,
        },
      });
      setIsOpen(false);
      setUserToDelete("");
    } catch (error) {
      console.error(error);
    }
  };

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "" && filterOption === "firstName") {
      const results = foundUsers.filter((user) => {
        return user.firstName.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else if (keyword !== "" && filterOption === "cedula") {
      const results = foundUsers.filter((user) => {
        return user.cedula.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else if (keyword !== "" && filterOption === "lastName") {
      const results = foundUsers.filter((user) => {
        return user.lastName.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(allUsers);
    }
  };

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axios.get("/api/allReports");
        const responseUsers = await axios.get("/api/allUsers");
        setAllReports(response.data?.allReports);
        setAllUsers(responseUsers.data?.allUsers);
        setFoundUsers(responseUsers.data?.allUsers);
        setFoundReports(response.data?.allReports);
      } catch (err) {
        console.error(err);
      }
    };
    getReports();
  }, [userToDelete, infoPanel, info]);

  if (loggedUser?.isAdmin) {
    return (
      <div>
        <Head>
          <title>Admin Dashboard</title>
          <meta
            name="description"
            content="Created by Ruben Frias & Melvin Guerra"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="relative pb-10 font-poppins">
          <div className="flex justify-center w-full pt-20">
            <GeneralMap allReports={allReports} />
          </div>

          <div className="grid items-center justify-center grid-cols-3 mx-auto mt-20 space-x-16 max-w-7xl">
            <div className="relative flex flex-col items-center">
              <BarChart allReports={allReports} />
              <h1 className="absolute font-bold uppercase mt-[320px] cursor-default">
                reportes por mes
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <DoughnutChart allReports={allReports} />
              <h1 className="pt-2 font-bold uppercase cursor-default">
                reportes por tipo
              </h1>
            </div>

            <div className="flex flex-col items-center">
              <PieChart allUsers={allUsers} />
              <h1 className="pt-2 font-bold uppercase cursor-default">
                usuarios por mes
              </h1>
            </div>
          </div>

          <div className="flex items-center mx-auto mb-3 space-x-3 mt-36 max-w-7xl">
            <h1 className="text-2xl font-bold uppercase cursor-default">
              Usuarios
            </h1>
            <div className="border-[1px] border-black rounded-lg">
              <input
                placeholder="Buscar..."
                className="px-3 py-1 rounded-lg outline-none"
                onChange={filter}
              />
              <select
                className="border-l-[1px] border-black rounded-r-lg outline-none"
                onChange={filterSelect}
              >
                <option value="firstName">Nombre</option>
                <option value="lastName">Apellido</option>
                <option value="cedula">Cedula</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between pb-2 pl-8 pr-40 mx-auto font-bold max-w-7xl">
            <h1>Nombre</h1>
            <div className="flex space-x-14">
              <h1>Cedula</h1>
              <h1>Fecha</h1>
              <h1>Tipo</h1>
            </div>
          </div>
          <div className="flex flex-col p-3 mx-auto border-[1px] border-black h-96 max-w-7xl overflow-y-auto space-y-3 rounded">
            {foundUsers.map((user, index) => (
              <UserBanner
                key={index}
                {...user}
                setIsOpen={setIsOpen}
                setUserToDelete={setUserToDelete}
              />
            ))}
          </div>

          <div className="flex items-center mx-auto mb-3 space-x-3 mt-28 max-w-7xl">
            <h1 className="text-2xl font-bold uppercase cursor-default">
              REPORTES
            </h1>
            <select
              className="border-[1px] border-black"
              onChange={filterSelectReports}
            >
              <option>Seleccionar filtro</option>
              <option value="status">Estatus</option>
              <option value="type">Tipo</option>
              <option value="sector">Sector</option>
              <option value="province">Provincia</option>
              <option value="cedula">Usuario</option>
            </select>

            {filterOptionReport === "status" ? (
              <select
                className="border-[1px] border-black "
                onChange={filterAdvanced}
              >
                <option></option>
                <option value="true">Reparado</option>
                <option value="false">Sin Reparar</option>
              </select>
            ) : null}

            {filterOptionReport === "type" ? (
              <select
                className="border-[1px] border-black"
                onChange={filterAdvanced}
              >
                <option></option>
                <option value="Bache">Bache</option>
                <option value="Cableado en el suelo">
                  Cableado en el suelo
                </option>
                <option value="Espacio ilegalmente ocupado">
                  Espacio ilegalmente ocupado
                </option>
              </select>
            ) : null}

            {filterOptionReport === "sector" ? (
              <select
                className="border-[1px] border-black"
                onChange={filterAdvanced}
              >
                <option></option>
                {[...new Set(allReports.map((report) => report.sector))].map(
                  (sector, index) => (
                    <option value={sector} key={index}>
                      {sector}
                    </option>
                  )
                )}
                +
              </select>
            ) : null}

            {filterOptionReport === "province" ? (
              <select
                className="border-[1px] border-black"
                onChange={filterAdvanced}
              >
                <option></option>
                {[...new Set(allReports.map((report) => report.province))].map(
                  (province, index) => (
                    <option value={province} key={index}>
                      {province}
                    </option>
                  )
                )}
              </select>
            ) : null}

            {filterOptionReport === "cedula" ? (
              <input
                placeholder="Buscar..."
                className="border-[1px] border-black px-3"
                onChange={filterAdvanced}
              />
            ) : null}

            <div>
              <h1 className="font-bold">
                Resultados:{" "}
                <span className="font-normal">{foundReports.length}</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col mx-auto border-[1px] border-black h-[800px] max-w-7xl rounded overflow-y-auto space-y-3 p-3">
            {foundReports.map((report, index) => (
              <ReportBanner
                key={index}
                {...report}
                user={allUsers.filter(
                  (user) => user.cedula === report.createdBy
                )}
                setInfo={setInfo}
                setInfoPanel={setInfoPanel}
              />
            ))}
          </div>

          {/* MODAL DELETE USER */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed inset-0 flex justify-center items-center z-[2500] ${
                isOpen ? "" : "hidden"
              }`}
            >
              <div className="bg-white border-[1px] border-black py-10 px-10 space-y-4 z-[2500]">
                <h1 className="text-center cursor-default">¿Estás seguro?</h1>
                <div className="flex space-x-5">
                  <button
                    onClick={deleteUser}
                    className="border-[1px] border-black px-3 py-2 hover:text-white hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="border-[1px] border-black px-3 py-2 hover:text-white hover:bg-black"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <BlackOverlay state={isOpen} />

          <ReportModal
            info={info}
            setInfo={setInfo}
            infoPanel={infoPanel}
            setInfoPanel={setInfoPanel}
          />
          <BlackOverlay state={infoPanel} />
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-4xl font-bold text-center font-poppins">
          ¡USUARIO NO AUTORIZADO!
        </h1>
      </div>
    );
  }
};

export default AdminDashboard;
