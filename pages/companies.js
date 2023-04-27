import { useEffect, useState } from "react";
import styled from "styled-components";

import useCompanyStore from "../slices/CreateCompanySlice";
import CompanyFilter from "../components/CompanyFilter";
import CompanyPreviewCard from "../components/CompanyPreviewCard";

const StyledCompaniesPageContainer = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-bottom: 60px;
`;
const StyledCompaniesHeadline = styled.h1`
  text-align: center;
  color: black;
`;

const StyledCompaniesCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 4px;
  margin: 16px;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    remote: null,
    numberOfEmployees: null,
  });

  const storeFetchCompanies = useCompanyStore((state) => state.fetchCompanies);
  const storeCompanies = useCompanyStore((state) => state.companies);

  const applyFilters = () => {
    let filtered = companies;

    if (filterOptions.remote) {
      filtered = filtered.filter((company) => company.remote);
    }

    /* TODO: IS THE NULL CHECK HERE NECESSARY? IS A CHECK FOR FALSY ENOUGH? */
    if (filterOptions.numberOfEmployees !== null) {
      filtered = filtered.filter(
        (company) =>
          company.number_of_employees <= filterOptions.numberOfEmployees
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
    storeFetchCompanies();
  }, []);

  useEffect(() => {
    setCompanies(storeCompanies);
    setFilteredCompanies(storeCompanies);
  }, [storeCompanies]);

  useEffect(() => {
    applyFilters();
  }, [filterOptions]);

  return (
    <StyledCompaniesPageContainer>
      <StyledCompaniesHeadline>
        {filteredCompanies.length} Unternehmen
      </StyledCompaniesHeadline>
      <CompanyFilter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        handleReset={handleReset}
      />
      <StyledCompaniesCardContainer>
        {filteredCompanies.map((company) => (
          <CompanyPreviewCard
            key={company.id}
            name={company.name}
            logo={company.logo}
            id={company.id}
            imageSize={150}
          />
        ))}
      </StyledCompaniesCardContainer>
    </StyledCompaniesPageContainer>
  );
}
