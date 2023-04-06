import Link from "next/link";
import data from "../public/companies.json";
import { useState, useEffect } from "react";
import { CompanyPreviewCard } from "../components/CompanyPreviewCard";
import styled from "styled-components";

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  align-items: center;
`;

export default function LandingPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    setCompanies(selected);
  }, []);

  return (
    <LandingPageContainer>
      <h1>Potential Employers</h1>
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
        <button>View All Companies</button>
      </Link>
    </LandingPageContainer>
  );
}
