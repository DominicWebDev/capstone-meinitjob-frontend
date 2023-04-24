import Link from "next/link";
import { useState, useEffect } from "react";

import styled from "styled-components";
import CompanyPreviewCard from "../components/CompanyPreviewCard";
import useCompanyStore from "../slices/CreateCompanySlice";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  align-items: center;
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
      <h1>Unternehmen</h1>
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
        <button>Alle Unternehmen</button>
      </Link>
    </LandingPageContainer>
  );
}
