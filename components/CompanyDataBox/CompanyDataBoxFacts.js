import React from "react";
import styled from "styled-components";

const CompanyDataFacts = styled.div`
  text-align: center;
`;

const CompanyDataBoxFacts = ({ company }) => {
  return (
    <CompanyDataFacts>
      <p>Remote: {company.remote ? "Ja" : "Nein"}</p>
      <p>Number of Employees: {company.numberOfEmployees}</p>
      <p>Revenue: {company.revenue}</p>
      <p>Sector: {company.sector}</p>
      <p>Established: {company.established}</p>
    </CompanyDataFacts>
  );
};
export default CompanyDataBoxFacts;
