import styled from "styled-components";

const StyledCompanyDataBox = styled.div`
  text-align: center;
  background-color: #f6f8fc;
  border-radius: 10px;
  padding: 1rem;
  font-size: 0.9rem;
  color: #0a1239;
`;

const Heading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
`;

export default function CompanyDataBox({ heading, content }) {
  return (
    <StyledCompanyDataBox>
      <Heading>{heading}</Heading>
      {content}
    </StyledCompanyDataBox>
  );
}
