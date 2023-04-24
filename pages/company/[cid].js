import CompanyDetails from "../../components/CompanyDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCompanyStore from "../../slices/CreateCompanySlice";

function CompanyDetailsPage() {
  const router = useRouter();
  const { cid } = router.query;

  const storeFetchCompanyById = useCompanyStore(
    (state) => state.fetchCompanyById
  );
  const storeSelectedCompany = useCompanyStore(
    (state) => state.selectedCompany
  );

  useEffect(() => {
    storeFetchCompanyById(+cid); /* + converts a string to an integer */
  }, []);

  return (
    <>
      {storeSelectedCompany ? (
        <CompanyDetails company={storeSelectedCompany} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default CompanyDetailsPage;
