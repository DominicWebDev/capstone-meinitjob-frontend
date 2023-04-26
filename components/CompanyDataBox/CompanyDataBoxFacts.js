import React from "react";
import styled from "styled-components";

const FactsContainer = styled.div`
  font-size: 0.9rem;
  color: #0a1239;
  line-height: 1.2;
  letter-spacing: 0.05em;
`;

const CompanyDataBoxFacts = ({ company }) => {
  return (
    <FactsContainer>
      <p>Remote: {company.remote ? "Ja" : "Nein"}</p>
      <p>Anzahl der Mitarbeiter: {company.number_of_employees}</p>
      <p>
        Umsatz:{" "}
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(company.revenue)}
      </p>
      <p>Branche: {company.sector}</p>
      <p>Gegründet: {company.established}</p>
    </FactsContainer>
  );
};

export default CompanyDataBoxFacts;
