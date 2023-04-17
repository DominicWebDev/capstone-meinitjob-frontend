import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
/* Farbpalette: #ff8509  (Orange Buttons etc?) #208e16 (Grün, h1 etc? )  #fffde9 (Background etc)   */
  body {
    margin: 0;
    font-family: system-ui;
    background-color:#fffde9;
    color: #f14f4a;
  }
`;
