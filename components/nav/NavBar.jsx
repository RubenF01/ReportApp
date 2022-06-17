/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import GlobalContext from "../../context/GlobalContext";
import { useContext } from "react";

const NavBar = () => {
  const value = useContext(GlobalContext);
  const router = useRouter();
  let { loggedUser } = value;

  const logoutHandler = async () => {
    cookie.remove("token");
    cookie.remove("user");

    router.push("/");
  };

  // const logoColorSelector = () => {
  //   if (
  //     router.pathname === "/" ||
  //     router.pathname === "/acceder" ||
  //     router.pathname === "/registro"
  //   ) {
  //     return "text-white";
  //   } else {
  //     return "text-black";
  //   }
  // };

  return (
    <div className="absolute flex px-5 pt-3 z-50 font-poppins justify-between w-full">
      <div>
        {/* <Link href="/">
          <a className={`${logoColorSelector()}`}>ReportApp</a>
        </Link> */}
        <Link href="/">
          <a>
            <img src="/logo.png" alt="logo" className="h-10 cursor-pointer" />
          </a>
        </Link>
      </div>

      {loggedUser && (
        <div className="flex space-x-5 items-center">
          <h1>Hola, {loggedUser.nombre} |</h1>
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
};

export default NavBar;
