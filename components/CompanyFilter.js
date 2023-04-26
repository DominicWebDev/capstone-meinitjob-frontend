import React from "react";
import styled from "styled-components";

const CompanyFilterContainer = styled.div`
  background-color: #f6f8fc;
  border-radius: 10px;
  padding: 1rem;
  font-size: 0.9rem;
  color: #0a1239;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  margin-left: 24px;
  margin-right: 24px;
`;

const RemoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;
`;
const EmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;
`;

const StyledAside = styled.aside`
  display: flex;
  padding-left: 20px;
  font-weight: 900;
`;

const StyledLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  cursor: pointer;
`;

const FilterCheckbox = styled.input`
  display: none;

  &:checked + span {
    background-color: #f85440;
    border-color: #f82978;
  }

  &:checked + span:after {
    display: block;
  }
`;

const CustomCheckbox = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #f6f8fc;
  border: 2px solid #f85440;
  border-radius: 3px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 2px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    display: none;
  }
`;

const ResetButton = styled.button`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  margin-right: 8px;
  background-color: #ff6868;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ff3d3d;
  }
`;

const CompanyFilter = ({ filterOptions, setFilterOptions }) => {
  const filteredNumbers = [50, 500, 1000];
  const filteredRemotes = ["remote", "büro"];

  const handleRemoteFilter = (e) => {
    const remoteFlag = e.target.value;
    if (e.target.checked) {
      setFilterOptions({
        ...filterOptions,
        remote: remoteFlag === "remote",
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        remote: null,
      });
    }
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

  const handleResetFilters = () => {
    setFilterOptions({
      numberOfEmployees: null,
      remote: null,
    });
  };

  const handleRemoteCheckValidation = (
    filterRemoteValue,
    filterOptionValue
  ) => {
    if (filterOptionValue === null) return false;

    if (filterRemoteValue === "remote") {
      if (filterOptionValue) {
        return true;
      }
    }

    if (filterRemoteValue === "büro") {
      if (!filterOptionValue) {
        return true;
      }
    }

    return false;
  };

  return (
    <CompanyFilterContainer>
      <RemoteContainer>
        <StyledAside>Remote</StyledAside>
        {filteredRemotes.map((filteredRemote, index) => (
          <FilterLabel key={filteredRemote}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "120px",
                  paddingRight: "25px",
                }}
              >
                <div style={{ paddingRight: "8px" }}>
                  {filteredRemote === "remote" ? "Remote" : "Büro"}
                </div>

                <FilterCheckbox
                  checked={handleRemoteCheckValidation(
                    filteredRemote,
                    filterOptions.remote
                  )}
                  name="numberOfEmployees"
                  type="checkbox"
                  value={filteredRemote}
                  onChange={handleRemoteFilter}
                />
                <CustomCheckbox />
              </div>
            </div>
          </FilterLabel>
        ))}
      </RemoteContainer>
      <EmployeeContainer>
        <StyledAside>Mitarbeiter</StyledAside>

        {filteredNumbers.map((filteredNumber) => (
          <FilterLabel key={filteredNumber}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100px",
                  paddingRight: "8px",
                }}
              >
                <div style={{ paddingRight: "8px" }}>
                  {"<="} {filteredNumber}
                </div>

                <FilterCheckbox
                  checked={filterOptions.numberOfEmployees === filteredNumber}
                  name="numberOfEmployees"
                  type="checkbox"
                  value={filteredNumber}
                  onChange={handleNumberOfEmployeesFilter}
                />
                <CustomCheckbox />
              </div>
            </div>
          </FilterLabel>
        ))}
      </EmployeeContainer>
      {(filterOptions.numberOfEmployees !== null ||
        filterOptions.remote !== null) && (
        <ResetButton onClick={handleResetFilters}>
          Filter zurücksetzen{" "}
          {/* TODO: IS THIS NEEDED OR SHOULD THE USER DESELECT? */}
        </ResetButton>
      )}
    </CompanyFilterContainer>
  );
};

export default CompanyFilter;
