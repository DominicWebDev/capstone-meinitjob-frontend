import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35px;
  display: flex;
  align-items: center;
  background-color: #208e16;
  z-index: 1337; /* um sicherzustellen, dass die Navbar immer oben liegt */

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
        color: #ff8509;
        font-weight: 900;
        font-style: normal;
      }
    }
  }
`;

const PageContent = styled.div`
  padding-bottom: 35px; /* Höhe der Navbar */
`;

function Navbar() {
  return (
    <>
      <Nav>
        <ul>
          <li>
            <Link href="/">
              <FontAwesomeIcon icon={faHome} className="fa-icon" />
            </Link>{" "}
          </li>
          <li>
            <Link href="/user/profil">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
            </Link>
          </li>
          <li>
            <Link href="/user/matches">Matches</Link>
          </li>
          <li>
            <button>Login</button>
          </li>
        </ul>
      </Nav>
      <PageContent>{/* Inhalt der Seite hier */}</PageContent>
    </>
  );
}

export default Navbar;
