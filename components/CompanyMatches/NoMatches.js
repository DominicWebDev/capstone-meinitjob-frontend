import Link from "next/link";

const NoMatches = () => (
  <div>
    Derzeit haben wir keine spannenden Unternehmen für dich. Vervollständige
    dein
    <Link href={`/user/profil`}>Profil</Link>, um mehr Matches zu erhalten.
  </div>
);

export default NoMatches;
