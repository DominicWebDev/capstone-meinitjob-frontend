import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faHome } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import LoginButton from "../LoginButton";
import LoginButton2 from "../Authentication/LoginButton2";

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  align-items: center;
  background-color: white;
  //background: linear-gradient(90deg, #0070f3 0%, #4dd0e1 100%);

  z-index: 1337; /* um sicherzustellen, dass die Navbar immer oben liegt */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  //border-top-left-radius: 4000px;
  //border-top-right-radius: 4000px;
  //border-bottom-left-radius: 7000px;
  //border-bottom-right-radius: 7000px;
  //border-end-end-radius: 1150px;
  //border-end-start-radius: 1150px;
  //border-start-end-radius: 7000px;
  //border-start-start-radius: 7000px;

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

const PageContent = styled.div``;

function Navbar() {
  const [currentRoute, setCurrentRoute] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  console.log("MY CURRENT ROUTE IS ", currentRoute);
  return (
    <>
      <Nav>
        <ul>
          <li>
            <Link href="/">
              <FontAwesomeIcon
                icon={faHome}
                className={`fa-icon ${
                  currentRoute === "/" ||
                  currentRoute.includes("company/") ||
                  currentRoute.includes("companies")
                    ? "navactive"
                    : "navhover"
                }`}
              />
            </Link>
          </li>
          <li>
            <Link href="/user/profil">
              <FontAwesomeIcon
                icon={faUser}
                className={`fa-icon ${
                  currentRoute === "/user/profil" ? "navactive" : "navhover"
                }`}
              />
            </Link>
          </li>
          <li style={{ color: "white" }}>
            <Link href="/user/matches">
              <svg
                id="bold"
                enableBackground="new 0 0 24 24"
                height="40"
                viewBox="0 0 24 24"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  currentRoute === "/user/matches" ? "naviconactive" : "navicon"
                }`}
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
            </Link>
          </li>
          <li>
            <LoginButton2 />
            {/*   <svg
              height="25"
              viewBox="0 0 512 512"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
              className="navicon"
            >
              <path
                d="m481.578125 9.238281c-3.988281-5.78125-10.558594-9.238281-17.578125-9.238281h-229.332031c-35.285157 0-64 28.714844-64 64v16.617188c.832031.75 1.789062 1.324218 2.578125 2.136718l85.335937 85.332032c12.09375 12.074218 18.75 28.160156 18.75 45.246093 0 17.089844-6.65625 33.175781-18.75 45.25l-85.335937 85.332031c-.789063.789063-1.746094 1.367188-2.578125 2.132813v37.953125c0 35.285156 28.714843 64 64 64h74.664062c8.855469 0 16.789063-5.460938 19.925781-13.738281l154.667969-405.332031c2.515625-6.550782 1.621094-13.910157-2.347656-19.691407zm0 0"
                
              />
              <path
                d="m119.828125 318.378906c-7.957031-3.308594-13.160156-11.09375-13.160156-19.710937v-64h-85.335938c-11.773437 0-21.332031-9.558594-21.332031-21.335938 0-11.773437 9.558594-21.332031 21.332031-21.332031h85.335938v-64c0-8.617188 5.203125-16.40625 13.160156-19.710938 7.980469-3.308593 17.152344-1.472656 23.253906 4.628907l85.332031 85.332031c8.34375 8.34375 8.34375 21.824219 0 30.164062l-85.332031 85.335938c-6.101562 6.101562-15.273437 7.933594-23.253906 4.628906zm0 0"
              
              />
              <path
                d="m455.742188 2.113281-128.167969 42.730469c-17.300781 5.972656-28.90625 22.25-28.90625 40.488281v384c0 23.53125 19.132812 42.667969 42.664062 42.667969 4.566407 0 8.898438-.660156 13.589844-2.113281l128.171875-42.730469c17.300781-5.972656 28.90625-22.25 28.90625-40.488281v-384c0-28.097657-27.328125-49.453125-56.257812-40.554688zm0 0"
              
              />
            </svg> */}
          </li>
        </ul>
      </Nav>
      <PageContent>{/* Inhalt der Seite hier */}</PageContent>
    </>
  );
}

export default Navbar;
