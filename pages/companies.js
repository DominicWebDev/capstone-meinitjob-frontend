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
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    remote: false,
    numberOfEmployees: null,
  });

  const fetchData = async () => {
    const response = await fetch("/companies.json");
    const json = await response.json();
    setCompanies(json);
    setFilteredCompanies(json);
  };

  const applyFilters = () => {
    let filtered = companies;
    if (filterOptions.remote) {
      filtered = filtered.filter((company) => company.remote === true);
    }
    if (filterOptions.numberOfEmployees !== null) {
      filtered = filtered.filter(
        (company) =>
          company.numberOfEmployees <= filterOptions.numberOfEmployees
      );
    }
    setFilteredCompanies(filtered);
  };

  const handleReset = () => {
    setFilterOptions({
      remote: false,
      numberOfEmployees: null,
    });
    setFilteredCompanies(companies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filterOptions]);

  return (
    <CompaniesPageContainer>
      <CompanieHeadline>
        {filteredCompanies.length} Partnerunternehmen
      </CompanieHeadline>
      <CompanyFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        handleReset={handleReset}
      />

      <CompaniesCardContainer>
        {filteredCompanies.map((company) => (
          <CompanyPreviewCard
            key={company.id}
            name={company.name}
            logo={company.logo}
            id={company.id}
          />
        ))}
      </CompaniesCardContainer>
    </CompaniesPageContainer>
  );
}
