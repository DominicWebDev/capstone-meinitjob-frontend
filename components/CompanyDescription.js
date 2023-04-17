import React from "react";
import styled from "styled-components";

const DescriptionContainer = styled.div`
  height: 200px;
  overflow-y: auto;
`;

const CompanyDescription = ({ company }) => {
  return (
    <DescriptionContainer>
      <p>{company.description}</p>
    </DescriptionContainer>
  );
};

export default CompanyDescription;
