import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const PreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  padding: 16px;
  margin: 8px;
  max-width: 200px;
  text-align: center;
  background: linear-gradient(90deg, #f85440 0%, #f82978 100%);

  a {
    text-decoration: none;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
  }
`;

const PreviewCardLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewCardName = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
  max-width: 180px;
  word-break: break-word;
  color: white;
  margin-top: 4px;
`;

function CompanyPreviewCard({ id, name, logo, imageSize = 180 }) {
  return (
    <PreviewCard>
      <Link href={`/company/${id}`}>
        <PreviewCardLogo>
          {logo && name && (
            <Image
              src={`/assets/logos/${logo}`}
              alt={`${name} logo`}
              width={imageSize}
              height={imageSize}
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
