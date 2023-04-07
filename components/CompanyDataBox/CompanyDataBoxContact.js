import React from "react";
import styled from "styled-components";

const CompanyDataBoxName = styled.h1`
  color: #0a1239;
  font-size: 1.5rem;
  text-align: center;
`;

const CompanyDataBoxContact = ({ company }) => {
  return (
    <div>
      <CompanyDataBoxName>{company.name}</CompanyDataBoxName>
      <p>Location: {company.location}</p>
      <p>Homepage: {company.homepage}</p>
    </div>
  );
};

export default CompanyDataBoxContact;
