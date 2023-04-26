import { useState } from "react";

import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

import TinderCard from "react-tinder-card";
import UnswipedMatchCard from "../MatchCards/UnswipedMatchCard";

const StyledUnswipedMatchListContainer = styled.div`
  height: 220px;
`;

const StyledPreviewContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const UnswipedMatchList = ({
  bestUnswipedMatchCompany,
  onSwipedRight,
  onSwipedLeft,
}) => {
  console.log(
    "~~~~~ PFERD UnswipedMatchList THESE UNMATCHED MATCHES ARRIVED IN PROPS",
    bestUnswipedMatchCompany
  );

  const handlers = useSwipeable({
    onSwipedRight: () => onSwipedRight(bestUnswipedMatchCompany.match_id),
    onSwipedLeft: () => onSwipedLeft(bestUnswipedMatchCompany.match_id),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <TinderCard
      className="pressable"
      onSwipe={onSwipe}
      onCardLeftScreen={() => onCardLeftScreen("fooBar")}
      preventSwipe={["right", "left"]}
    >
      Hello, World!
    </TinderCard>
  );

  return (
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
};

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
