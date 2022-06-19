import Triangle from "../public/triangle.svg";
import Clipboard from "../public/clipboard.svg";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Link from "next/link";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, setChangeColor } = value;

  if (loggedUser) {
    return (
      <div className="text-2xl h-screen font-bold grid grid-cols-2 items-center text-center">
        <Link href="/create-report/selectLocation">
          <motion.div
            initial={{ "background-color": "#fff", color: "black" }}
            whileHover={{
              "background-color": "rgb(0 0 0 / 0.8)",
              color: "white",
            }}
            transition={{ duration: 0.4 }}
            className="flex w-full h-full justify-center cursor-pointer items-center border-r-[1px] border-black"
          >
            <figure className="w-[550px]">
              <a>
                <Triangle />
                <figcaption>CREAR REPORTE</figcaption>
              </a>
            </figure>
          </motion.div>
        </Link>

        <Link href="/misReportes">
          <motion.div
            initial={{ "background-color": "#fff", color: "black" }}
            whileHover={{
              "background-color": "rgb(0 0 0 / 0.8)",
              color: "white",
            }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => setChangeColor(true)}
            onMouseLeave={() => setChangeColor(false)}
            onClick={() => setChangeColor(false)}
            className="flex w-full h-full cursor-pointer justify-center items-center border-l-[1px] border-black"
          >
            <figure className="w-[23rem]">
              <a>
                <Clipboard className="mt-[-25px]" />
                <figcaption className="mt-[30px]">MIS REPORTES</figcaption>
              </a>
            </figure>
          </motion.div>
        </Link>
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
