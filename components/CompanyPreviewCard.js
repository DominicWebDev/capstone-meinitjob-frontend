import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const PreviewCard = styled.div`
  border: 1.5px solid black;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  max-width: 250px;
  background-color: burlywood;
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
  color: black;
`;

export function CompanyPreviewCard({ logo, name, id }) {
  return (
    <PreviewCard>
      <Link href={`/company/${id}`}>
        <PreviewCardLogo>
          {logo && (
            <Image
              src={`/logos/${logo}`}
              alt={`${name} logo`}
              width={100}
              height={100}
            />
          )}
          <PreviewCardName>{name}</PreviewCardName>
        </PreviewCardLogo>
      </Link>
    </PreviewCard>
  );
}
