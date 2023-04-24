import { useSwipeable } from "react-swipeable";
import CompanyPreviewCard from "../CompanyPreviewCard";
import styled from "styled-components";

const StyledPreviewContainer = styled.div`
  align-items: center;
  display: flex;

  flex-direction: column;
`;

const UnmatchedCompanies = ({
  unmatchedCompanies,
  onSwipedRight,
  onSwipedLeft,
}) => {
  const handlers = useSwipeable({
    onSwipedRight: () => onSwipedRight(),
    onSwipedLeft: () => onSwipedLeft(),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  {
    unmatchedCompanies.length ? (
      unmatchedCompanies.map(({ id, name, logo }) => {
        return (
          <StyledPreviewContainer key={id}>
            <div {...handlers}>
              <CompanyPreviewCard id={id} name={name} logo={logo} />
            </div>
          </StyledPreviewContainer>
        );
      })
    ) : (
      <div>No matching Companies</div>
    );
  }

  /*  return (
   
      <h1> Open Matches</h1>
      {unMatchedCompanies.length ? (
        unMatchedCompanies.map(({ id, name, logo }) => {
          <StyledPreviewContainer key={id}>
            <div {...handlers}>
              <CompanyPreviewCard id={id} name={name} logo={logo}  TEST />
            </div>
          </StyledPreviewContainer>;
        })
      ) : (
        <div>No matching Companies</div>
      )} */
};

export default UnmatchedCompanies;
