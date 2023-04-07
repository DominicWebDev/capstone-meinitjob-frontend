import React from "react";

const CompanyDescription = ({ company }) => {
  return (
    <div>
      <p>Beschreibung{company?.description}</p>
    </div>
  );
};

export default CompanyDescription;
