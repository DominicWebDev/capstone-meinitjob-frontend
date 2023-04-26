import CompanyDetails from "../../components/CompanyDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useCompanyStore from "../../slices/CreateCompanySlice";

function CompanyDetailsPage() {
  const router = useRouter();
  const [companyId, setCompanyId] = useState(null);

  const { cid } = router.query;

  const storeFetchCompanyById = useCompanyStore(
    (state) => state.fetchCompanyById
  );
  const storeSelectedCompany = useCompanyStore(
    (state) => state.selectedCompany
  );

  useEffect(() => {
    if (router.query.cid) {
      setCompanyId(+router.query.cid); /* + converts a string to an integer */
    }
  }, [router.query]);

  useEffect(() => {
    if (companyId) {
      storeFetchCompanyById(companyId);
    }
  }, [companyId]);

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
