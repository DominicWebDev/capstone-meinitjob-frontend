import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const PreviewCard = styled.div`
  border-radius: 12px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  padding: 16px;
  margin: 8px;
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
  max-width: 150px;
  word-break: break-word;
  color: white;
  margin-top: 4px;
`;

function SwipedMatchCard({
  className,
  id,
  name,
  logo,
  location,
  remote,
  numberOfEmployees,
}) {
  return (
    <PreviewCard className={className}>
      <Link href={`/company/${id}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <PreviewCardLogo>
            {logo && name && (
              <Image
                src={`/assets/logos/${logo}`}
                alt={`${name} logo`}
                width={100}
                height={100}
                priority
              />
            )}
            <PreviewCardName>{name}</PreviewCardName>
          </PreviewCardLogo>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              justifyContent: "space-evenly",
              minHeight: "9.5rem",
              color: "white",
            }}
          >
            <div
              style={{
                border: "3px solid white",
                borderRadius: "20px",
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "20px",
                width: "100%",
                marginTop: "8px",
                padding: "4px",
                minWidth: "150px",
              }}
            >
              <svg
                height="20"
                viewBox="0 0 64 64"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px", marginLeft: "8px" }}
              >
                <g id="Pin">
                  <path
                    d="m32 0a24.0319 24.0319 0 0 0 -24 24c0 17.23 22.36 38.81 23.31 39.72a.99.99 0 0 0 1.38 0c.95-.91 23.31-22.49 23.31-39.72a24.0319 24.0319 0 0 0 -24-24zm0 35a11 11 0 1 1 11-11 11.0066 11.0066 0 0 1 -11 11z"
                    fill="white"
                  />
                </g>
              </svg>
              <div className="divider"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  minWidth: "70%",
                  textTransform: "capitalize",
                }}
              >
                {location}
              </div>
            </div>
            <div
              style={{
                border: "3px solid white",
                borderRadius: "20px",
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "20px",
                width: "100%",
                marginTop: "8px",
                padding: "4px",
                minWidth: "150px",
              }}
            >
              <svg
                id="bold"
                enableBackground="new 0 0 24 24"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "8px", marginLeft: "8px" }}
              >
                <path
                  d="m13.03 1.87-10.99-1.67c-.51-.08-1.03.06-1.42.39-.39.34-.62.83-.62 1.34v21.07c0 .55.45 1 1 1h3.25v-5.25c0-.97.78-1.75 1.75-1.75h2.5c.97 0 1.75.78 1.75 1.75v5.25h4.25v-20.4c0-.86-.62-1.59-1.47-1.73zm-7.53 12.88h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm5 9h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                  fill="white"
                />
                <path
                  d="m22.62 10.842-7.12-1.491v14.649h6.75c.965 0 1.75-.785 1.75-1.75v-9.698c0-.826-.563-1.529-1.38-1.71zm-2.37 10.158h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75zm0-3h-1.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                  fill="white"
                />
              </svg>
              <div className="divider"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  minWidth: "70%",
                }}
              >
                {remote ? "Remote" : "Büro"}
              </div>
            </div>
            <div
              style={{
                border: "3px solid white",
                borderRadius: "20px",
                textTransform: "capitalize",
                display: "flex",
                justifyContent: "flex-start",
                paddingLeft: "20px",
                width: "100%",
                marginTop: "8px",
                padding: "4px",
                minWidth: "150px",
              }}
            >
              <svg
                style={{ marginRight: "8px", marginLeft: "8px" }}
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="team">
                  <path
                    d="m6 17c-2.2055664 0-4-1.7939453-4-4s1.7944336-4 4-4 4 1.7939453 4 4-1.7944336 4-4 4zm1.7700195.6699219c-1.1401367.4404297-2.3999023.4404297-3.5400391 0-.2900391-.1103516-.6201172-.0703125-.8798828.0898438-1.4702148.930664-2.3500976 2.5097656-2.3500976 4.2402343v4c0 .5498047.4501953 1 1 1h5v-5c0-1.5498047.4101563-3.0595703 1.1499023-4.3798828-.1298828-.0205078-.2597656 0-.3798828.0498047zm18.2299805-.6699219c2.2055664 0 4-1.7939453 4-4s-1.7944336-4-4-4-4 1.7939453-4 4 1.7944336 4 4 4zm2.6499023.7597656c-.2597656-.1601563-.5898438-.2001953-.8798828-.0898438-1.1401367.4404297-2.3999023.4404297-3.5400391 0-.1201172-.0498047-.25-.0703125-.3798828-.0498047.7397462 1.3203126 1.1499024 2.8300782 1.1499024 4.3798829v5h5c.5498047 0 1-.4501953 1-1v-4c0-1.7304687-.8798828-3.3095703-2.3500977-4.2402344zm-12.6499023-2.7597656c-2.7568359 0-5-2.2431641-5-5s2.2431641-5 5-5 5 2.2431641 5 5-2.2431641 5-5 5zm7 7c0-2.2304688-1.0698242-4.3300781-2.8701172-5.6396484-.2998047-.2207031-.699707-.25-1.0297852-.0908203-.6699218.3408203-1.3798828.5507812-2.1000976.6503906v5.0800781c0 .5498047-.4501953 1-1 1s-1-.4501953-1-1v-5.0800781c-.7202148-.0996094-1.4301758-.3095703-2.1000977-.6503906-.3300781-.1591797-.7299805-.1298828-1.0297852.0908203-1.8002929 1.3095703-2.8701171 3.4091797-2.8701171 5.6396484v5h14z"
                    fill="white"
                  />
                </g>
              </svg>

              <div className="divider"></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  minWidth: "70%",
                }}
              >
                MA {numberOfEmployees}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </PreviewCard>
  );
}

export default SwipedMatchCard;
