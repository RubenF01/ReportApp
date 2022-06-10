import Triangle from "../public/triangle.svg";
import Clipboard from "../public/clipboard.svg";
import { parseCookies } from "nookies";

const UserDashboard = () => {
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : "";

  if (user) {
    return (
      <div className="text-2xl font-bold flex justify-center space-x-48 text-center">
        <figure>
          <Triangle />
          <figcaption>CREAR REPORTE</figcaption>
        </figure>
        <figure>
          <Clipboard />
          <figcaption>MIS REPORTES</figcaption>
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
