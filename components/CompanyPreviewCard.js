import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const PreviewCard = styled.div`
  border: 1.5px solid black;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  max-width: 250px;
  background-color: #ff8509;
  a {
    text-decoration: none;
  }
`;

const PreviewCardLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewCardName = styled.h2`
  text-align: center;
  word-break: break-all;
  font-size: 0.8rem;
  text-decoration: none;
  color: #208e16;
  font-weight: bolder;
`;

function CompanyPreviewCard({ id, name, logo }) {
  return (
    <PreviewCard>
      <Link href={`/company/${id}`}>
        <PreviewCardLogo>
          {logo && name && (
            <Image
              src={`/logos/${logo}`}
              alt={`${name} logo`}
              width={100}
              height={100}
              priority
            />
          )}
          <PreviewCardName>{name}</PreviewCardName>
        </PreviewCardLogo>
      </Link>
    </PreviewCard>
  );
}

export default CompanyPreviewCard;
