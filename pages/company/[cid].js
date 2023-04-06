import data from "/public/companies.json";
import CompanyDetails from "../../components/CompanyDetails";
import { useRouter } from "next/router";

export default function CompanyDetailsPage() {
  const router = useRouter();
  const { cid } = router.query;
  const oneCompany = data.find((companyEntry) => companyEntry.id === +cid);

  return <CompanyDetails company={oneCompany} />;
}
