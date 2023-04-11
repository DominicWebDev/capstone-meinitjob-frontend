import React from "react";

const CompanyDescription = ({ company }) => {
  return (
    <div>
      <p>{company.description}</p>
    </div>
  );
};

export default CompanyDescription;
