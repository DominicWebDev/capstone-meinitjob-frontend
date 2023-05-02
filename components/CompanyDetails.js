import React from "react";
import Image from "next/image";
import CompanyDataBox from "./CompanyDataBox/CompanyDataBox";
import CompanyDataBoxFacts from "./CompanyDataBox/CompanyDataBoxFacts";
import CompanyDescription from "./CompanyDescription";
import CompanyDataBoxContact from "./CompanyDataBox/CompanyDataBoxContact";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(90deg, #f85440 0%, #f82978 100%);
`;

function CompanyDetails({ company }) {
  return (
    <div>
      <ImageContainer>
        <Image
          src={`/assets/logos/${company.logo}`}
          alt={`${company.name} logo`}
          width={180}
          height={180}
        />
      </ImageContainer>
      <Container>
        <CompanyDataBox content={<CompanyDataBoxContact company={company} />} />
        <CompanyDataBox
          heading="Daten & Fakten"
          content={<CompanyDataBoxFacts company={company} />}
        />
      </Container>
      <CompanyDataBox
        heading="Über das Unternehmen"
        content={<CompanyDescription company={company} />}
      />
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
