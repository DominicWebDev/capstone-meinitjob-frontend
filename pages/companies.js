import { CompanyPreviewCard } from "../components/CompanyPreviewCard";
import styled from "styled-components";
import CompanyFilter from "../components/CompanyFilter";
import { useEffect, useState } from "react";
const CompaniesPageContainer = styled.div`
  width: 100vw;
  max-width: 100vw;
`;
const CompanieHeadline = styled.h1`
  text-align: center;
`;

const CompaniesCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 16px;
  margin: 16px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

export default function CompaniesPage() {
  const [newData, setNewData] = useState([]);
  const companyLength = newData.length;

  async function fetchData() {
    const response = await fetch("/companies.json");
    const json = await response.json();
    setNewData(json);
  }

  const handleFilter = (numberOfEmployees) =>
    setNewData((prevNewData) =>
      prevNewData.filter(
        (filteredData) => filteredData.numberOfEmployees <= numberOfEmployees
      )
    );
  const handleRemoteFilter = (remote) =>
    setNewData((prevNewData) =>
      prevNewData.filter((filteredData) => filteredData.remote === remote)
    );

  const handleReset = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CompaniesPageContainer>
      <CompanieHeadline> {companyLength} Partnerunternehmen</CompanieHeadline>
      <CompanyFilter
        handle={handleFilter}
        reset={handleReset}
        handleRemote={handleRemoteFilter}
      />

      <CompaniesCardContainer>
        {newData.map((company) => (
          <CompanyPreviewCard
            key={company?.id}
            name={company?.name}
            logo={company?.logo}
            id={company?.id}
          />
        ))}
      </CompaniesCardContainer>
    </CompaniesPageContainer>
  );
}
