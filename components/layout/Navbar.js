import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Image from "next/image";

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
              <FontAwesomeIcon icon={faHome} className="fa-icon navhover" />
            </Link>{" "}
          </li>
          <li>
            <Link href="/user/profil">
              <FontAwesomeIcon icon={faUser} className="fa-icon navhover " />
            </Link>
          </li>
          <li style={{ color: "white" }}>
            <Link href="/user/matches">
              <svg
                id="bold"
                enable-background="new 0 0 24 24"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                className="navicon"
              >
                <path d="m15 6.5c-.552 0-1-.448-1-1v-1.5h-4v1.5c0 .552-.448 1-1 1s-1-.448-1-1v-1.5c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v1.5c0 .552-.448 1-1 1z" />
                <path d="m12.71 15.38c-.18.07-.44.12-.71.12s-.53-.05-.77-.14l-11.23-3.74v7.63c0 1.52 1.23 2.75 2.75 2.75h18.5c1.52 0 2.75-1.23 2.75-2.75v-7.63z" />
                <path d="m24 7.75v2.29l-11.76 3.92c-.08.03-.16.04-.24.04s-.16-.01-.24-.04l-11.76-3.92v-2.29c0-1.52 1.23-2.75 2.75-2.75h18.5c1.52 0 2.75 1.23 2.75 2.75z" />
              </svg>
            </Link>
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
