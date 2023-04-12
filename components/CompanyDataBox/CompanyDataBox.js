import styled from "styled-components";

const StyledCompanyDataBox = styled.div`
  text-align: center;
`;

export default function CompanyDataBox({ heading, content }) {
  return (
    <StyledCompanyDataBox>
      <h3>{heading}</h3>
      {content}
    </StyledCompanyDataBox>
  );
}
