import CompanyDetails from "../../components/CompanyDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/* export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "1" } }, { params: { cid: "2" } }],
    fallback: false, // can also be true or 'blocking'
  };
} */

function CompanyDetailsPage() {
  const router = useRouter();
  const { cid } = router.query;

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/companies.json");
      const json = await response.json();
      setCompanies(json);
    }
    fetchData();
  }, []);

  // wenn die companies Daten noch nicht geladen sind
  if (companies.length === 0) {
    return <div>Loading...</div>;
  }

  const oneCompany = companies.find((companyEntry) => companyEntry.id === +cid);

  return <CompanyDetails company={oneCompany} />;
}

export default CompanyDetailsPage;
