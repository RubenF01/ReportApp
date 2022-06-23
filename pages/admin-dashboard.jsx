import { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

const AdminDashboard = () => {
  const value = useContext(GlobalContext);
  const { loggedUser } = value;

  const getReports = async () => {
    try {
      const response = await axios.get("/api/allreports");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReports();
  });

  if (loggedUser?.isAdmin) {
    return (
      <div>
        <div>HOLA A TODOS</div>
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
