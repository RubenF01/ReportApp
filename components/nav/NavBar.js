import Link from "next/link";

const NavBar = () => {
  return (
    <div className="absolute flex px-5 pt-3">
      <div>
        <Link href="/">
          <a className="text-white">ReportApp</a>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
