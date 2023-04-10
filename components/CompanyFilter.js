import React from "react";
import styled from "styled-components";

const CompanyFilterContainer = styled.div`
  border: 1px solid black;
  font-size: 0.8rem;
  color: #0a1239;
`;

const CompanyFilter = ({ filterOptions, setFilterOptions, handleReset }) => {
  const filteredNumbers = [50, 500, 1000];

  const handleRemoteFilter = (e) => {
    setFilterOptions({
      ...filterOptions,
      remote: e.target.checked,
    });
  };

  const handleNumberOfEmployeesFilter = (e) => {
    const numberOfEmployees = parseInt(e.target.value);
    if (e.target.checked) {
      setFilterOptions({
        ...filterOptions,
        numberOfEmployees,
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        numberOfEmployees: null,
      });
    }
  };

  return (
    <CompanyFilterContainer>
      <label>
        100% Remote
        <input
          name="remote"
          type="checkbox"
          checked={filterOptions.remote}
          onChange={handleRemoteFilter}
        />
      </label>

      {filteredNumbers.map((filteredNumber) => (
        <label key={filteredNumber}>
          Bis {filteredNumber} Mitarbeiter
          <input
            checked={filterOptions.numberOfEmployees === filteredNumber}
            name="numberOfEmployees"
            type="checkbox"
            value={filteredNumber}
            onChange={handleNumberOfEmployeesFilter}
          />
        </label>
      ))}
      {/*  <button onClick={handleReset}>Reset</button> */}
    </CompanyFilterContainer>
  );
};

export default CompanyFilter;
