import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GlobalContext from "../context/GlobalContext";
import dynamic from "next/dynamic";
import BarChart from "../components/chart/BarChart";
import DoughnutChart from "../components/chart/DoughnutChart";
import PieChart from "../components/chart/PieChart";

const GeneralMap = dynamic(() => import("../components/map/GeneralMap"), {
  ssr: false,
});

const AdminDashboard = () => {
  const [allReports, setAllReports] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const value = useContext(GlobalContext);
  const { loggedUser } = value;

  useEffect(() => {
    const getReports = async () => {
      try {
        const response = await axios.get("/api/allreports");
        const responseUsers = await axios.get("/api/allusers");
        setAllReports(response.data?.allReports);
        setAllUsers(responseUsers.data?.allUsers);
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
          <div className="w-full flex justify-center pt-20">
            <GeneralMap allReports={allReports} />
          </div>

          <div className="grid grid-cols-3 items-center max-w-7xl mx-auto space-x-16 mt-20">
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
        </main>
      </div>
    );
  } else {
    return (
      <div className="flex w-full justify-center items-center h-screen">
        <h1 className="text-4xl font-bold font-poppins text-center">
          ¡USUARIO NO AUTORIZADO!
        </h1>
      </div>
    );
  }
};

export default AdminDashboard;
