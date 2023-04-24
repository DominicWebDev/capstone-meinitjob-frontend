import { useSwipeable } from "react-swipeable";
import CompanyPreviewCard from "../CompanyPreviewCard";
import styled from "styled-components";
import { useState } from "react";
import CompanyMatchingCard from "./CompanyMatchingCard";

const StyledUnacceptedCompaniesContainer = styled.div`
  height: 220px;
`;

const StyledPreviewContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const UnacceptedCompanies = ({
  currentCardIndex,
  unmatchedCompanies,
  onSwipedRight,
  onSwipedLeft,
}) => {
  const handlers = useSwipeable({
    onSwipedRight: () => onSwipedRight(currentCardIndex),
    onSwipedLeft: () => onSwipedLeft(currentCardIndex),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <StyledUnacceptedCompaniesContainer {...handlers}>
      {unmatchedCompanies
        .sort((a, b) => b.matchingScore - a.matchingScore)
        .map(({ id, name, logo }, index) => {
          return (
            <StyledPreviewContainer key={id}>
              <CompanyMatchingCard
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
    </StyledUnacceptedCompaniesContainer>
  );
};

export default UnacceptedCompanies;
