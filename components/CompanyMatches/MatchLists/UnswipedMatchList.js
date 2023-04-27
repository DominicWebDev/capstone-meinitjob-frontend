import { useRouter } from "next/router";

import { useEffect, useState, useRef } from "react";

import styled from "styled-components";

import UnswipedMatchCard from "../MatchCards/UnswipedMatchCard";
import Image from "next/image";

const StyledUnswipedMatchListContainer = styled.div`
  height: 220px;
`;

const StyledPreviewContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const StyledMatchCardContainer = styled.div`
  border: 1.5px solid black;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  width: 190px;
  height: 190px;
  background-color: #ff8509;
  a {
    text-decoration: none;
  }
`;

const StyledMatchCardLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMatchCardName = styled.h2`
  text-align: center;
  word-break: break-all;
  font-size: 0.8rem;
  text-decoration: none;
  color: #208e16;
  font-weight: bolder;
`;

const UnswipedMatchList = ({
  bestUnswipedMatchCompany,
  onSwipedRight,
  onSwipedLeft,
}) => {
  const router = useRouter();
  const tinderCardRef = useRef(null);

  const [TinderCard, setTinderCard] = useState(null);
  const isBrowserReady = typeof window !== "undefined";

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);

    if (direction === "right") {
      onSwipedRight(bestUnswipedMatchCompany.match_id);
    }

    if (direction === "left") {
      onSwipedLeft(bestUnswipedMatchCompany.match_id);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  console.log(
    "~~~~~ PFERD UnswipedMatchList THESE UNMATCHED MATCHES ARRIVED IN PROPS",
    bestUnswipedMatchCompany
  );

  useEffect(() => {
    if (isBrowserReady) {
      import("react-tinder-card").then((module) => {
        setTinderCard(module.default);
      });
    }
  }, [isBrowserReady]);

  return (
    <>
      {TinderCard && isBrowserReady && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="cardContainer"
            /*  onTouchStart={() =>
              router.push(`/company/${bestUnswipedMatchCompany.id}`)
            } */
          >
            <TinderCard
              ref={tinderCardRef}
              onCardLeftScreen={() => {
                if (tinderCardRef.current) {
                  console.log("I LEFT THE SCREEN", tinderCardRef);

                  setTimeout(() => {
                    tinderCardRef.current.restoreCard();
                  }, 300);
                }
              }}
              className="swipe"
              onSwipe={onSwipe}

              /* preventSwipe={["right", "left"]} */
            >
              {/* <StyledPreviewContainer>
                <UnswipedMatchCard company={bestUnswipedMatchCompany} />
              </StyledPreviewContainer> */}
              {/*  <StyledMatchCardContainer
                className="pressable"
                onClick={() => console.log("FUCK THIS SHIEAT")}
              >
                {bestUnswipedMatchCompany.logo &&
                  bestUnswipedMatchCompany.name && (
                    <Image
                      src={`/assets/logos/${bestUnswipedMatchCompany.logo}`}
                      alt={`${bestUnswipedMatchCompany.name} logo`}
                      width={100}
                      height={100}
                      priority
                      className="pressable"
                      onClick={() => console.log("FUCK THIS SHIEAT TEST")}
                    />
                  )}
                <StyledMatchCardName>
                  {bestUnswipedMatchCompany.name}
                </StyledMatchCardName>
              </StyledMatchCardContainer> */}
              <div
                /*  style={{
                  backgroundImage:
                    "url(" + `/assets/logos/${bestUnswipedMatchCompany.logo}` + ")",
                }} */
                className="card"
              >
                <div>
                  <Image
                    src={`/assets/logos/${bestUnswipedMatchCompany.logo}`}
                    alt={`${bestUnswipedMatchCompany.name} logo`}
                    width={100}
                    height={100}
                    priority
                    className="cardimage"
                    onClick={() => console.log("FUCK THIS SHIEAT TEST")}
                  />
                </div>
                <div>
                  <h3 className="one-line-text" style={{ textAlign: "center" }}>
                    {bestUnswipedMatchCompany.name}
                  </h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    color: "white",
                    width: "100%",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      paddingLeft: "20px",
                      marginTop: "8px",
                      padding: "4px",
                    }}
                  >
                    <svg
                      height="20"
                      viewBox="0 0 64 64"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ margin: "auto" }}
                    >
                      <g id="Pin">
                        <path
                          d="m32 0a24.0319 24.0319 0 0 0 -24 24c0 17.23 22.36 38.81 23.31 39.72a.99.99 0 0 0 1.38 0c.95-.91 23.31-22.49 23.31-39.72a24.0319 24.0319 0 0 0 -24-24zm0 35a11 11 0 1 1 11-11 11.0066 11.0066 0 0 1 -11 11z"
                          fill="white"
                        />
                      </g>
                    </svg>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        minWidth: "70%",
                        textTransform: "capitalize",
                      }}
                    >
                      {bestUnswipedMatchCompany.location}
                    </div>
                  </div>
                  <div
                    style={{
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      paddingLeft: "20px",
                      marginTop: "8px",
                      padding: "4px",
                    }}
                  >
                    <svg
                      id="bold"
                      enableBackground="new 0 0 24 24"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ margin: "auto" }}
                    >
                      <path
                        d="m13.03 1.87-10.99-1.67c-.51-.08-1.03.06-1.42.39-.39.34-.62.83-.62 1.34v21.07c0 .55.45 1 1 1h3.25v-5.25c0-.97.78-1.75 1.75-1.75h2.5c.97 0 1.75.78 1.75 1.75v5.25h4.25v-20.4c0-.86-.62-1.59-1.47-1.73zm-7.53 12.88h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm5 9h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                        fill="white"
                      />
                      <path
                        d="m22.62 10.842-7.12-1.491v14.649h6.75c.965 0 1.75-.785 1.75-1.75v-9.698c0-.826-.563-1.529-1.38-1.71zm-2.37 10.158h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                        fill="white"
                      />
                    </svg>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        minWidth: "70%",
                      }}
                    >
                      {bestUnswipedMatchCompany.remote ? "Remote" : "Büro"}
                    </div>
                  </div>
                  <div
                    style={{
                      borderRadius: "20px",
                      textTransform: "capitalize",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      paddingLeft: "20px",
                      marginTop: "8px",
                      padding: "4px",
                    }}
                  >
                    <svg
                      height="20"
                      viewBox="0 0 32 32"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ margin: "auto" }}
                    >
                      <g id="team">
                        <path
                          d="m6 17c-2.2055664 0-4-1.7939453-4-4s1.7944336-4 4-4 4 1.7939453 4 4-1.7944336 4-4 4zm1.7700195.6699219c-1.1401367.4404297-2.3999023.4404297-3.5400391 0-.2900391-.1103516-.6201172-.0703125-.8798828.0898438-1.4702148.930664-2.3500976 2.5097656-2.3500976 4.2402343v4c0 .5498047.4501953 1 1 1h5v-5c0-1.5498047.4101563-3.0595703 1.1499023-4.3798828-.1298828-.0205078-.2597656 0-.3798828.0498047zm18.2299805-.6699219c2.2055664 0 4-1.7939453 4-4s-1.7944336-4-4-4-4 1.7939453-4 4 1.7944336 4 4 4zm2.6499023.7597656c-.2597656-.1601563-.5898438-.2001953-.8798828-.0898438-1.1401367.4404297-2.3999023.4404297-3.5400391 0-.1201172-.0498047-.25-.0703125-.3798828-.0498047.7397462 1.3203126 1.1499024 2.8300782 1.1499024 4.3798829v5h5c.5498047 0 1-.4501953 1-1v-4c0-1.7304687-.8798828-3.3095703-2.3500977-4.2402344zm-12.6499023-2.7597656c-2.7568359 0-5-2.2431641-5-5s2.2431641-5 5-5 5 2.2431641 5 5-2.2431641 5-5 5zm7 7c0-2.2304688-1.0698242-4.3300781-2.8701172-5.6396484-.2998047-.2207031-.699707-.25-1.0297852-.0908203-.6699218.3408203-1.3798828.5507812-2.1000976.6503906v5.0800781c0 .5498047-.4501953 1-1 1s-1-.4501953-1-1v-5.0800781c-.7202148-.0996094-1.4301758-.3095703-2.1000977-.6503906-.3300781-.1591797-.7299805-.1298828-1.0297852.0908203-1.8002929 1.3095703-2.8701171 3.4091797-2.8701171 5.6396484v5h14z"
                          fill="white"
                        />
                      </g>
                    </svg>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      MA {bestUnswipedMatchCompany.number_of_employees}
                    </div>
                  </div>
                </div>
              </div>
            </TinderCard>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "11rem",
              marginTop: "10px",
            }}
          >
            <div
              className="ignore"
              onClick={() => onSwipedLeft(bestUnswipedMatchCompany.match_id)}
            >
              <svg
                height="40"
                viewBox="0 0 512 512"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="close">
                    <circle
                      id="background"
                      cx="256"
                      cy="256"
                      fill="#f44336"
                      r="256"
                    />
                    <path
                      d="m348.6 391a42.13 42.13 0 0 1 -30-12.42l-62.6-62.58-62.6 62.61a42.41 42.41 0 1 1 -60-60l62.6-62.61-62.61-62.6a42.41 42.41 0 0 1 60-60l62.61 62.6 62.6-62.61a42.41 42.41 0 1 1 60 60l-62.6 62.61 62.61 62.6a42.41 42.41 0 0 1 -30 72.4z"
                      fill="#fff"
                      style={{
                        transform:
                          "scale(0.8) translateY(65px) translateX(65px)",
                      }}
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div
              className="accept"
              onClick={() => onSwipedRight(bestUnswipedMatchCompany.match_id)}
            >
              <svg
                id="Icons"
                height="40"
                viewBox="0 0 60 60"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" fill="#5edd60" r="29" />
                <path
                  d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154l-13.443 20.444a3.3 3.3 0 0 1 -5.032.529z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* return (
    <StyledUnswipedMatchListContainer {...handlers}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledPreviewContainer>
          <UnswipedMatchCard company={bestUnswipedMatchCompany} />
        </StyledPreviewContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "7rem",
          }}
        >
          <div
            className="ignore"
            onClick={() => onSwipedLeft(bestUnswipedMatchCompany.match_id)}
          >
            <svg
              height="40"
              viewBox="0 0 512 512"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="close">
                  <circle
                    id="background"
                    cx="256"
                    cy="256"
                    fill="#f44336"
                    r="256"
                  />
                  <path
                    d="m348.6 391a42.13 42.13 0 0 1 -30-12.42l-62.6-62.58-62.6 62.61a42.41 42.41 0 1 1 -60-60l62.6-62.61-62.61-62.6a42.41 42.41 0 0 1 60-60l62.61 62.6 62.6-62.61a42.41 42.41 0 1 1 60 60l-62.6 62.61 62.61 62.6a42.41 42.41 0 0 1 -30 72.4z"
                    fill="#fff"
                    style={{
                      transform: "scale(0.8) translateY(65px) translateX(65px)",
                    }}
                  />
                </g>
              </g>
            </svg>
          </div>
          <div
            className="accept"
            onClick={() => onSwipedRight(bestUnswipedMatchCompany.match_id)}
          >
            <svg
              id="Icons"
              height="40"
              viewBox="0 0 60 60"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" fill="#5edd60" r="29" />
              <path
                d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154l-13.443 20.444a3.3 3.3 0 0 1 -5.032.529z"
                fill="#fff"
              />
            </svg>
          </div>
        </div>
      </div>
    </StyledUnswipedMatchListContainer>
  );
}; */

export default UnswipedMatchList;

/*  <StyledUnswipedMatchListContainer {...handlers}>
{unmatchedCompanies
  .sort((a, b) => b.matchingScore - a.matchingScore)
  .map(({ id, name, logo }, index) => {
    return (
      <div key={id} style={{ display: "flex", flexDirection: "column" }}>
        <StyledPreviewContainer>
          <UnswipedMatchCard
            id={id}
            name={name}
            logo={logo}
            hidden={index < currentCardIndex}
            style={{
              position: "absolute",
              zIndex: unmatchedCompanies.length - index,
               COMMENT HERE transform: `translateY(${index * 10}px)`, 
            }}
          />
        </StyledPreviewContainer> */
