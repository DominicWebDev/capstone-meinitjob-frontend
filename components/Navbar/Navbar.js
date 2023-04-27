import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import LoginButton from "./LoginButton/LoginButton";
import NavIcon from "./NavIcon/NavIcon";

const StyledNavbar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  background-color: white;

  z-index: 1337; /* um sicherzustellen, dass die Navbar immer oben liegt */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding-left: 0;

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
        transition: color 0.3s ease, transform 0.3s ease;

        &:hover {
          color: #ff4458;
          transform: scale(1.1);
        }
      }
    }
  }
`;

const StyledPageContent = styled.div``;

function Navbar() {
  const [currentRoute, setCurrentRoute] = useState("");
  const router = useRouter();

  const isHomeIconActive =
    currentRoute === "/" ||
    currentRoute.includes("company/") ||
    currentRoute.includes("companies");
  const isUserIconActive = currentRoute === "/user/profil";

  const isMatchIconActive = currentRoute === "/user/matches";

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  const navigationRoutes = ["/", "/user/profil", "/user/matches"];

  const getNavigationIcon = (navIndex) => {
    switch (navIndex) {
      case 0:
        return (
          <FontAwesomeIcon
            className={`fa-icon ${isHomeIconActive ? "navactive" : "navhover"}`}
            icon={faHome}
          />
        );
      case 1:
        return (
          <FontAwesomeIcon
            className={`fa-icon ${isUserIconActive ? "navactive" : "navhover"}`}
            icon={faUser}
          />
        );
      case 2:
        return (
          <svg
            id="bold"
            enableBackground="new 0 0 24 24"
            height="40"
            viewBox="0 0 24 24"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isMatchIconActive ? "naviconactive" : "navicon"}`}
            style={{
              display: "block",
              margin: "auto",
              transform: "translateY(calc(50% - 13px))",
            }}
          >
            <g transform="scale(1.1)">
              <path d="m15 6.5c-.552 0-1-.448-1-1v-1.5h-4v1.5c0 .552-.448 1-1 1s-1-.448-1-1v-1.5c0-1.103.897-2 2-2h4c1.103 0 2 .897 2 2v1.5c0 .552-.448 1-1 1z" />
              <path d="m12.71 15.38c-.18.07-.44.12-.71.12s-.53-.05-.77-.14l-11.23-3.74v7.63c0 1.52 1.23 2.75 2.75 2.75h18.5c1.52 0 2.75-1.23 2.75-2.75v-7.63z" />
              <path d="m24 7.75v2.29l-11.76 3.92c-.08.03-.16.04-.24.04s-.16-.01-.24-.04l-11.76-3.92v-2.29c0-1.52 1.23-2.75 2.75-2.75h18.5c1.52 0 2.75 1.23 2.75 2.75z" />
            </g>
          </svg>
        );
    }
  };

  return (
    <>
      <StyledNavbar>
        <ul>
          {navigationRoutes.map((navRoute, index) => (
            <NavIcon route={navRoute} key={navRoute}>
              {getNavigationIcon(index)}
            </NavIcon>
          ))}
          <li>
            <LoginButton />
          </li>
        </ul>
      </StyledNavbar>
      <StyledPageContent>{/* PAGE CONTENT HERE */}</StyledPageContent>
    </>
  );
}

export default Navbar;
