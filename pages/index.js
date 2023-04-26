import { useState, useEffect } from "react";
import Link from "next/link";

import styled from "styled-components";

import CompanyPreviewCard from "../components/CompanyPreviewCard";
import useCompanyStore from "../slices/CreateCompanySlice";
import LoginButton from "../components/LoginButton";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  align-items: center;
  margin-bottom: 80px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
  margin-top: 8px;
  color: black;
`;
const StyledButton = styled.button`
  background-color: white;
  color: #21262e;
  padding: 8px 16px;
  box-shadow: 0 2px 6px 0px rgba(101, 110, 123, 0.12);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
  border-radius: 15px;
  margin-top: 10px;
`;

export default function LandingPage() {
  const [companies, setCompanies] = useState([]);

  const storeFetchCompanies = useCompanyStore((state) => state.fetchCompanies);
  const storeCompanies = useCompanyStore((state) => state.companies);

  const getThreeRandomCompanies = (companiesArray) => {
    const shuffled = storeCompanies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  useEffect(() => {
    storeFetchCompanies();
  }, []);

  useEffect(() => {
    if (storeCompanies.length) {
      setCompanies(getThreeRandomCompanies(storeCompanies));
    }
  }, [storeCompanies]);

  return (
    <LandingPageContainer>
      <Title>Unternehmen</Title>
      <div>
        {companies.map((company) => (
          <CompanyPreviewCard
            key={company.id}
            name={company.name}
            logo={company.logo}
            id={company.id}
          />
        ))}
      </div>

      <Link href="/companies">
        <StyledButton>Alle Unternehmen</StyledButton>
      </Link>
    </LandingPageContainer>
  );
}
