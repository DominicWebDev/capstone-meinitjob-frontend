import Link from "next/link";
import Image from "next/image";

import styled from "styled-components";

const StyledMatchCardContainer = styled.div`
  border: 1.5px solid black;
  border-radius: 8px;
  padding: 8px;
  margin: 8px;
  width: 190px;
  height: 190px;
  background-color: #ff8509;
  a {
    text-decoration: none;
  }
`;

const StyledMatchCardLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMatchCardName = styled.h2`
  text-align: center;
  word-break: break-all;
  font-size: 0.8rem;
  text-decoration: none;
  color: #208e16;
  font-weight: bolder;
`;

function UnswipedMatchCard({ id, style, name, logo, hidden }) {
  return (
    <div style={style}>
      {!hidden && (
        <StyledMatchCardContainer>
          <Link href={`/company/${id}`}>
            <StyledMatchCardLogo>
              {logo && name && (
                <Image
                  src={`/logos/${logo}`}
                  alt={`${name} logo`}
                  width={100}
                  height={100}
                  priority
                />
              )}
              <StyledMatchCardName>{name}</StyledMatchCardName>
            </StyledMatchCardLogo>
          </Link>
        </StyledMatchCardContainer>
      )}
    </div>
  );
}

export default UnswipedMatchCard;
