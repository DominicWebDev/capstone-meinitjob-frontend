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
  top: -4px;
  left: 0;
  height: 30px;
  width: 3px;
  background-color: white;
}



.ignore:hover {
  cursor: pointer;
}

.accept:hover {
  cursor: pointer;
}


.card {
  position: relative;
  background: linear-gradient(90deg, #f85440 0%, #f82978 100%);
  width: 80vw;
  max-width: 260px;
  height: 300px;
  box-shadow: 0px 0px 60px 0px rgba(0,0,0,0.30);
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 0;

}

.card::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    opacity: 1;
    background: linear-gradient(45deg, rgb(255, 0, 0), rgb(255, 115, 0), rgb(255, 251, 0), rgb(72, 255, 0), rgb(0, 255, 213), rgb(0, 43, 255), rgb(122, 0, 255), rgb(255, 0, 200), rgb(255, 0, 0)) 0% 0% / 400%;
    animation: gradientAnimation 20s linear infinite;
    transition: opacity 0.3s ease-in-out 0s;
}

@keyframes gradientAnimation {
    0% {
        background-position: 0% 0%;
    }
    100% {
        background-position: 400% 0%;
    }
}


.cardContainer {
  width: 90vw;
  max-width: 260px;
  height: 300px;


}

.swipe:last-of-type { 

}

.cardimage {
  height: 12rem;
  width: 12rem;
}

.card h3 {
  margin: 0px;
  color: #fff;
}

`;
