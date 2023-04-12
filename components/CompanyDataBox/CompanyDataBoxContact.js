import React from "react";
import styled from "styled-components";

const CompanyDataBoxName = styled.h1`
  color: #0a1239;
  font-size: 1.5rem;
`;

const CompanyDataBoxContact = ({ company }) => {
  return (
    <div>
      <CompanyDataBoxName>{company.name}</CompanyDataBoxName>
      <p>Standort: {company.location}</p>
      <p>
        <a
          href={company.homepage}
          target="_blank"
          rel="noopener noreferrer" // verhindert, dass das neue Fenster Zugriff auf das ursprüngliche Fenster erhält.(Kein Infos woher(referrer) und keine Infos welche davor angegeben worden z.B UserDaten, best practice um Annonym zu bleiben)
          style={{ textDecoration: "none" }}
        >
          <p>{company.homepage}</p>
        </a>
      </p>
    </div>
  );
};

export default CompanyDataBoxContact;
