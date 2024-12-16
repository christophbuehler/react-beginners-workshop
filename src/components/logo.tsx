import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <div className="cursor-pointer inline-flex">
      <div className="font-bold">Robo</div>
      <span>Chores</span>
    </div>
  </Link>
);

export default Logo;
