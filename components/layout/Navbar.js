import Link from "next/link";

import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: burlywood;

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      text-align: center;

      a {
        text-decoration: none;
      }
    }
  }
`;

function Navbar() {
  return (
    <Nav>
      <ul>
        <li>
          <Link href="/">Startseite</Link>
        </li>
        <li>
          <Link href="/profil">Mein Profil</Link>
        </li>
        <li>
          <Link href="/matches">Matches</Link>
        </li>

        <li>
          <button>Login</button>
        </li>
      </ul>
    </Nav>
  );
}

export default Navbar;
