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
    background: linear-gradient(90deg, #F0F2F4 0%, #F0F2F4 100%);

// f82978
// #F85440

  color: #f14f4a;
}

  
.navhover {
  color: #7C8591;
  height: 25px;
}

.navhover:hover, .navhover:active {
  color: #ff4458;
} 

.navactive {
  color: #ff4458;
  height: 25px;
}

.navicon {
  fill: #7C8591;
  height: 25px;
}

.navicon:hover, .navicon:active {
    fill: #ff4458;
} 

.naviconactive {
  height: 25px;
  fill: #ff4458
}

.divider {
  position: relative;
}

.divider:before {
  content: "";
  position: absolute;
  top: -3px;
  left: 0;
  height: 28px;
  width: 3px;
  background-color: white;
}
`;
