import React from "react";
import CompanyPreviewCard from "../CompanyPreviewCard";

const MatchedCompanies = ({ matchedCompanies }) => (
  <>
    <h2>Matched Companies </h2>
    {matchedCompanies.map(({ id, name, logo }) => {
      return <CompanyPreviewCard key={id} id={id} name={name} logo={logo} />;
    })}
  </>
);
export default MatchedCompanies;
