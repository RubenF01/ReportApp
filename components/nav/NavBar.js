import Link from "next/link";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();
  const cookies = parseCookies();

  const user = cookies?.user ? JSON.parse(cookies.user) : "";

  console.log(user);

  const logoutHandler = async () => {
    cookie.remove("token");
    cookie.remove("user");

    router.push("/");
  };

  return (
    <div className=" absolute flex px-5 pt-3 z-50 font-poppins justify-between w-full">
      <div>
        <Link href="/">
          <a className="text-white">ReportApp</a>
        </Link>
      </div>

      {user && (
        <div className="flex space-x-5">
          <h1 className="text-black">Hola, {user.nombre}</h1>
          <button type="button" onClick={logoutHandler}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
