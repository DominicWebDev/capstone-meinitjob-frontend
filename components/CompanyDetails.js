import React from "react";
import Image from "next/image";
import CompanyDataBox from "./CompanyDataBox/CompanyDataBox";
import CompanyDataBoxFacts from "./CompanyDataBox/CompanyDataBoxFacts";
import CompanyDescription from "./CompanyDescription";
import CompanyDataBoxContact from "./CompanyDataBox/CompanyDataBoxContact";
import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function CompanyDetails({ company }) {
  return (
    <div>
      {company && (
        <>
          <CompanyDataBox
            heading="Kontaktdaten"
            content={<CompanyDataBoxContact company={company} />}
          />
          <ImageContainer>
            <Image
              src={`/logos/${company.logo}`}
              alt={`${company.name} logo`}
              width={130}
              height={130}
            />
          </ImageContainer>
          <CompanyDataBox
            heading="Daten & Fakten"
            content={<CompanyDataBoxFacts company={company} />}
          />
          <CompanyDataBox
            heading="Beschreibung"
            content={<CompanyDescription company={company} />}
          />
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      company,
    },
  };
}

export default CompanyDetails;
