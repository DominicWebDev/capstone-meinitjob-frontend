import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const PreviewCard = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  max-width: 250px;
  background-color: #f5f5f5;
  text-decoration: none;
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
`;

export function CompanyPreviewCard({ logo, name, id }) {
  return (
    <PreviewCard>
      <Link href={`/company/${id}`}>
        <PreviewCardLogo>
          <Image
            src={`/logos/${logo}`}
            alt={`${name} logo`}
            width={125}
            height={125}
          />
          <PreviewCardName>{name}</PreviewCardName>
        </PreviewCardLogo>
      </Link>
    </PreviewCard>
  );
}
