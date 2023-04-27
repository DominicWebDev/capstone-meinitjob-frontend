import Link from "next/link";

const NavIcon = ({ route, children }) => {
  return (
    <li>
      <Link href={route}>{children}</Link>
    </li>
  );
};

export default NavIcon;
