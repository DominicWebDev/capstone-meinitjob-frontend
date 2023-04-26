import styled from "styled-components";

const DescriptionContainer = styled.div`
  height: 250px;
  overflow-y: auto;
  font-family: "Roboto", sans-serif;
  font-size: 0.9rem;
  color: #0a1239;
  line-height: 1.8;
  letter-spacing: 0.05em;
  padding: 0.8rem;
  border-radius: 8px;
  background-color: #f6f8fc;
  margin-bottom: 2.5rem;
`;

const StyledParagraph = styled.p`
  margin-bottom: 0.3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CompanyDescription = ({ company }) => {
  return (
    <DescriptionContainer>
      {company.description.split("\n").map((paragraph, index) => (
        <StyledParagraph key={index}>{paragraph}</StyledParagraph>
      ))}
    </DescriptionContainer>
  );
};

export default CompanyDescription;
