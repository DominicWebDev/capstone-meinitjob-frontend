import SwipedMatchCard from "../MatchCards/SwipedMatchCard";
import styled from "styled-components";

const StyledRemoveButton = styled.button`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  margin-right: 8px;
  background: linear-gradient(90deg, #f85440 0%, #f82978 100%);
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 11px;
  margin-bottom: 8px;

  &:hover {
    background-color: #ff3d3d;
  }
`;

const SwipedMatchList = ({ matchedCompanies, headlineText, onRemove }) => (
  <>
    <h2
      style={{
        textAlign: "center",
        color: "black",
        fontSize: "1.3rem",
        marginTop: "0px",
      }}
    >
      {headlineText}
    </h2>
    {console.log(
      "~~~~~ PFERD MatchList  THESE UNMATCHED MATCHES ARRIVED IN PROPS",
      matchedCompanies
    )}
    {matchedCompanies.map(
      ({ id, name, logo, location, remote, number_of_employees }) => {
        return (
          <div key={id}>
            <div>
              <SwipedMatchCard
                id={id}
                name={name}
                logo={logo}
                location={location}
                remote={remote}
                numberOfEmployees={number_of_employees}
              />
            </div>
            <>
              <div onClick={() => onRemove(id)}></div>
            </>
          </div>
        );
      }
    )}
  </>
);

export default SwipedMatchList;
