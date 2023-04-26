import { useState } from "react";

import { useSwipeable } from "react-swipeable";
import styled from "styled-components";

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
  currentCardIndex,
  unmatchedCompanies,
  onSwipedRight,
  onSwipedLeft,
}) => {
  console.log(
    "~~~~~ PFERD UnswipedMatchList THESE UNMATCHED MATCHES ARRIVED IN PROPS",
    unmatchedCompanies
  );

  const handlers = useSwipeable({
    onSwipedRight: () => onSwipedRight(currentCardIndex),
    onSwipedLeft: () => onSwipedLeft(currentCardIndex),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <StyledUnswipedMatchListContainer {...handlers}>
      {unmatchedCompanies
        .sort((a, b) => b.matchingScore - a.matchingScore)
        .map(({ id, name, logo }, index) => {
          return (
            <StyledPreviewContainer key={id}>
              <UnswipedMatchCard
                id={id}
                name={name}
                logo={logo}
                hidden={index < currentCardIndex}
                style={{
                  position: "absolute",
                  zIndex: unmatchedCompanies.length - index,
                  /* transform: `translateY(${index * 10}px)`, */
                }}
              />
            </StyledPreviewContainer>
          );
        })}
    </StyledUnswipedMatchListContainer>
  );
};

export default UnswipedMatchList;
