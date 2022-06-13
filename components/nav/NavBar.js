import Link from "next/link";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import GlobalContext from "../../context/GlobalContext";
import { useContext } from "react";

const NavBar = () => {
  const value = useContext(GlobalContext);
  const router = useRouter();
  let { loggedUser } = value;

  console.log(loggedUser);

  const logoutHandler = async () => {
    cookie.remove("token");
    cookie.remove("user");

    router.push("/");
  };

  const logoColorSelector = () => {
    if (
      router.pathname === "/" ||
      router.pathname === "/acceder" ||
      router.pathname === "/registro"
    ) {
      return "text-white";
    } else {
      return "text-black";
    }
  };

  return (
    <div className="absolute flex px-5 pt-3 z-50 font-poppins justify-between w-full">
      <div>
        <Link href="/">
          <a className={`${logoColorSelector()}`}>ReportApp</a>
        </Link>
      </div>

      {loggedUser && (
        <div className="flex space-x-5">
          <h1 className="text-black">Hola, {loggedUser.nombre}</h1>
          <button type="button" onClick={logoutHandler}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
