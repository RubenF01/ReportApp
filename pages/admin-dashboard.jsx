import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import dynamic from "next/dynamic";
import BarChart from "../components/chart/BarChart";
import DoughnutChart from "../components/chart/DoughnutChart";
import PieChart from "../components/chart/PieChart";
import UserBanner from "../components/user-banner/UserBanner";
import BlackOverlay from "../components/layout/BlackOverlay";

const GeneralMap = dynamic(() => import("../components/map/GeneralMap"), {
  ssr: false,
});

const AdminDashboard = () => {
  const [allReports, setAllReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterOption, setFilterOption] = useState("firstName");
  const [foundUsers, setFoundUsers] = useState([]);
  const value = useContext(GlobalContext);
  const { loggedUser } = value;

  const filterSelect = (e) => setFilterOption(e.target.value);

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
        const response = await axios.get("/api/allreports");
        const responseUsers = await axios.get("/api/allusers");
        setAllReports(response.data?.allReports);
        setAllUsers(responseUsers.data?.allUsers);
        setFoundUsers(responseUsers.data?.allUsers);
      } catch (err) {
        console.error(err);
      }
    };
    getReports();
  }, []);

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

        <main>
          <div className="flex justify-center w-full pt-20">
            <GeneralMap allReports={allReports} />
          </div>

          <div className="grid items-center grid-cols-3 mx-auto mt-20 space-x-16 max-w-7xl">
            <div>
              <BarChart allReports={allReports} />
            </div>

            <div>
              <DoughnutChart allReports={allReports} />
            </div>

            <div>
              <PieChart allUsers={allUsers} />
            </div>
          </div>
          <div className="flex items-center mx-auto mt-10 mb-3 space-x-3 max-w-7xl">
            <h1 className="text-2xl font-bold uppercase">Usuarios</h1>
            <div className="border-[1px] border-black">
              <input
                placeholder="Buscar..."
                className="px-3 py-1"
                onChange={filter}
              />
              <select
                className="border-l-[1px] border-black"
                onChange={filterSelect}
              >
                <option value="firstName">Nombre</option>
                <option value="lastName">Apellido</option>
                <option value="cedula">Cedula</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col p-3 mx-auto border-[1px] border-black h-96 max-w-7xl overflow-y-auto space-y-3">
            {foundUsers.map((user, index) => (
              <UserBanner key={index} {...user} />
            ))}
          </div>

          <div className="mx-auto mt-10 mb-3 max-w-7xl">
            <h1 className="text-2xl font-bold uppercase">REPORTES</h1>
          </div>
          <div className="flex justify-between p-3 mx-auto border-[1px] border-black h-[500px] max-w-7xl mb-10"></div>
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
