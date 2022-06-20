import Triangle from "../public/triangle.svg";
import Clipboard from "../public/clipboard.svg";
import { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import Link from "next/link";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const value = useContext(GlobalContext);
  const { loggedUser, setChangeColor } = value;
  const [isCreateHover, setIsCreateHover] = useState(false);
  const [isReportsHover, setIsReportsHover] = useState(false);

  const variants = {
    start: { scale: 0.9 },
    end: { scale: 1 },
  };

  if (loggedUser) {
    return (
      <div className="text-2xl h-screen font-bold grid grid-cols-1 lg:grid-cols-2 items-center text-center">
        <Link href="/create-report/selectLocation">
          <motion.div
            initial={{ backgroundColor: "#fff", color: "black" }}
            whileHover={{
              backgroundColor: "rgb(0 0 0 / 0.8)",
              color: "white",
            }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => setIsCreateHover(true)}
            onMouseLeave={() => setIsCreateHover(false)}
            className="flex w-full h-full justify-center cursor-pointer items-center border-b-[1px] lg:border-b-0 lg:border-r-[1px] border-black"
          >
            <motion.figure
              initial={variants.start}
              animate={isCreateHover ? "end" : "start"}
              transition={{ duration: 0.4 }}
              variants={variants}
              className="w-[300px] lg:w-[550px]"
            >
              <Triangle />
              <figcaption>CREAR REPORTE</figcaption>
            </motion.figure>
          </motion.div>
        </Link>

        <Link href="/misReportes">
          <motion.div
            initial={{ backgroundColor: "#fff", color: "black" }}
            whileHover={{
              backgroundColor: "rgb(0 0 0 / 0.8)",
              color: "white",
            }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => {
              setChangeColor(true);
              setIsReportsHover(true);
            }}
            onMouseLeave={() => {
              setChangeColor(false);
              setIsReportsHover(false);
            }}
            onClick={() => setChangeColor(false)}
            className="flex w-full h-full cursor-pointer justify-center items-center border-t-[1px] lg:border-t-0 lg:border-l-[1px] border-black"
          >
            <motion.figure
              initial={variants.start}
              animate={isReportsHover ? "end" : "start"}
              transition={{ duration: 0.4 }}
              variants={variants}
              className="w-[15rem] lg:w-[23rem]"
            >
              <Clipboard className="mt-[-25px]" />
              <figcaption className="mt-[30px]">MIS REPORTES</figcaption>
            </motion.figure>
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
