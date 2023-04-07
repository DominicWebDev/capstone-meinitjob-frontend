import CompanyDetails from "../../components/CompanyDetails";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/* export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: "1" } }, { params: { cid: "2" } }],
    fallback: false, // can also be true or 'blocking'
  };
} */

export default function CompanyDetailsPage() {
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

  const oneCompany = companies.find((companyEntry) => companyEntry.id === +cid);

  return <CompanyDetails company={oneCompany} />;
}
