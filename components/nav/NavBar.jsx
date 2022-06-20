/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import GlobalContext from "../../context/GlobalContext";
import { useContext, useState } from "react";
import { useMedia } from "react-use";
import Bars from "../../public/bars.svg";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const isWide = useMedia("(min-width: 1024px)");
  const [isOpen, setIsOpen] = useState(false);
  const value = useContext(GlobalContext);
  const router = useRouter();
  let { loggedUser, changeColor } = value;

  const logoutHandler = async () => {
    cookie.remove("token");
    cookie.remove("user");

    router.push("/");
  };

  if (isWide) {
    return (
      <div className="absolute flex px-5 pt-3 z-50 font-poppins justify-between w-full">
        <div>
          <Link href="/">
            <img src="/logo.png" alt="logo" className="h-10 cursor-pointer" />
          </Link>
        </div>

        {loggedUser && (
          <div
            className={`flex space-x-5 items-center ${
              changeColor ? "text-white" : "text-black"
            }`}
          >
            <h1 className="cursor-default">Hola, {loggedUser.nombre} |</h1>
            <Link href="/userDashboard">
              <a>Dashboard</a>
            </Link>
            <button type="button" onClick={logoutHandler}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="absolute flex px-5 pt-3 z-50 font-poppins justify-between items-center w-full bg-white py-3">
        <div
          onClick={() => {
            isOpen && setIsOpen(false);
          }}
        >
          <Link href="/">
            <img src="/logo.png" alt="logo" className="h-10 cursor-pointer" />
          </Link>
        </div>

        {loggedUser && <h1>Hola, {loggedUser.nombre}</h1>}

        {loggedUser ? (
          <div onClick={() => setIsOpen(!isOpen)}>
            <Bars className="w-7" />
          </div>
        ) : null}

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ y: 37, opacity: 0 }}
              animate={{ y: 60, opacity: 1 }}
              transition={{ duration: 0.3 }}
              exit={{ y: 37, opacity: 0 }}
              className="bg-white absolute z-[300] left-0 bottom-[-24px] w-full flex flex-col text-center py-3 gap-y-3 border-b-[1px] border-black"
            >
              <Link href="/userDashboard">
                <a onClick={() => setIsOpen(false)}>Dashboard</a>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logoutHandler();
                  setIsOpen(false);
                }}
              >
                Cerrar Sesión
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    );
  }
};

export default NavBar;
