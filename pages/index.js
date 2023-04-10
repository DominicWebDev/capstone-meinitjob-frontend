import Link from "next/link";
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
    async function fetchData() {
      const response = await fetch("/companies.json");
      const json = await response.json();

      const shuffled = json.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setCompanies(selected);
    }
    fetchData();
  }, []);

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
