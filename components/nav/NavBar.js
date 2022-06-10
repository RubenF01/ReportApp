import Link from "next/link";

const NavBar = () => {
  return (
    <div className=" absolute flex px-5 pt-3 z-50 font-poppins">
      <div>
        <Link href="/">
          <a className="text-white">ReportApp</a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
