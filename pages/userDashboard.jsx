import Triangle from "../public/triangle.svg";
import Clipboard from "../public/clipboard.svg";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Link from "next/link";

const UserDashboard = () => {
  const value = useContext(GlobalContext);
  const { loggedUser } = value;

  if (loggedUser) {
    return (
      <div className="text-2xl h-screen font-bold flex justify-center items-center space-x-48 text-center">
        <figure className="w-[550px]">
          <Link href="/create-report/selectLocation">
            <a>
              <Triangle />
              <figcaption>CREAR REPORTE</figcaption>
            </a>
          </Link>
        </figure>
        <figure className="w-96">
          <Link href="/misReportes">
            <a>
              <Clipboard />
              <figcaption>MIS REPORTES</figcaption>
            </a>
          </Link>
        </figure>
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

export default UserDashboard;
