import Link from "next/link";

const ButtonLink = ({ title, link }) => (
  <Link href={link}>
    <a className="w-max border-[1px] rounded-3xl py-1 px-10 border-black text-lg text-center hover:bg-black hover:text-white">
      {title}
    </a>
  </Link>
);

export default ButtonLink;
