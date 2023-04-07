import React from "react";
import Image from "next/image";
import CompanyDataBox from "./CompanyDataBox/CompanyDataBox";
import CompanyDataBoxFacts from "./CompanyDataBox/CompanyDataBoxFacts";
import CompanyDescription from "./CompanyDescription";
import CompanyDataBoxContact from "./CompanyDataBox/CompanyDataBoxContact";

export default function CompanyDetails({ company }) {
  console.log("CompanyDetails", company);
  console.log("TYPEOFOUTPUT", typeof company);
  return (
    <div>
      <CompanyDataBox
        heading="Kontaktdaten"
        content={<CompanyDataBoxContact company={company} />}
      />

      <CompanyDataBox
        heading="Daten & Fakten"
        content={<CompanyDataBoxFacts company={company} />}
      />
      <CompanyDataBox
        heading="Beschreibung"
        content={<CompanyDescription company={company} />}
      />

      {logo && (
        <Image
          src={`/logos/${company.logo}`}
          alt={`${company.name} logo`}
          width={200}
          height={200}
        />
      )}
    </div>
  );
}
