import React from "react";

const CompanyDataBoxFacts = ({ company }) => {
  return (
    <div>
      <p>Remote: {company.remote ? "Ja" : "Nein"}</p>
      <p>Number of Employees: {company.numberOfEmployees}</p>
      <p>Revenue: {company.revenue}</p>
      <p>Sector: {company.sector}</p>
      <p>Established: {company.established}</p>
    </div>
  );
};
export default CompanyDataBoxFacts;
