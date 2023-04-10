import React from "react";
import styled from "styled-components";
import { useState } from "react";

const CompanyFilterContainer = styled.div`
  border: 1px solid black;
  font-size: 0.8rem;
  color: #0a1239;
`;

const CompanyFilter = ({ filter, reset }) => {
  const filteredNumbers = [50, 500, 1000];
  const [selectedFilter, setSelectedFilter] = useState(null);
  /*   const [selectedRemoteFilter, setSelectedRemoteFilter] = useState(false); */

  return (
    <CompanyFilterContainer>
      <label>
        100% Remote
        <input
          /* checked={selectedRemoteFilter === filteredNumber} */
          name="remote"
          type="checkbox"
          onChange={async (e) => {
            if (e.target.checked) {
              await reset();
              filter({ remote: true });
            }
            if (!e.target.checked) {
              filter({ remote: false });
              await reset();
            }
          }}
        />
      </label>

      {filteredNumbers.map((filteredNumber) => (
        <label key={filteredNumber}>
          Bis {filteredNumber} Mitarbeiter
          <input
            checked={selectedFilter === filteredNumber}
            name="numberOfEmployees"
            type="checkbox"
            onClick={async (e) => {
              if (selectedFilter !== filteredNumber) {
                setSelectedFilter(filteredNumber);
                await reset();
                filter({ numberOfEmployees: filteredNumber });
              }
              if (selectedFilter === filteredNumber) {
                setSelectedFilter(null);
                await reset();
              }
            }}
          />
        </label>
      ))}
    </CompanyFilterContainer>
  );
};

export default CompanyFilter;
