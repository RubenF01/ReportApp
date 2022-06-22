import Link from "next/link";

const ButtonLink = ({ title, link, classes, clickEvent }) => (
  <Link href={link ? link : "#"}>
    <a
      onClick={clickEvent ? clickEvent : null}
      className={`w-max border-[1px] py-1 px-10 border-black text-lg text-center hover:bg-black hover:text-white ${classes}`}
    >
      {title}
    </a>
  </Link>
);

export default ButtonLink;
