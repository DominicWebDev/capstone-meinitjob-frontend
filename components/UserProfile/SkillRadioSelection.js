import styled from "styled-components";

const StyledLevelRadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLevelRadio = styled.label`
  margin-right: 8px;
  color: ${(props) => (props.selected ? "white" : "#333")};
  background-color: ${(props) => (props.selected ? "#0070f3" : "transparent")};
  padding: ${(props) => (props.selected ? "4px 8px" : "0")};
  border-radius: ${(props) => (props.selected ? "4px" : "0")};
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.selected ? "#0061d1" : "transparent"};
    color: ${(props) => (props.selected ? "white" : "#333")};
    cursor: pointer;
  }
`;

const StyledLevelRadioInput = styled.input`
  margin-right: 4px;
  display: none;
`;

export const SkillRadioSelection = ({ skillLevel, onSkillLevelChange }) => {
  const getLeveText = (level) => {
    switch (level) {
      case 1:
        return "Anfänger";
      case 2:
        return "Erfahren";
      case 3:
        return "Experte";
    }
  };

  return (
    <StyledLevelRadioContainer>
      {[1, 2, 3].map((level) => (
        <StyledLevelRadio
          htmlFor={level}
          key={level}
          selected={skillLevel === level}
          onClick={() => onSkillLevelChange(level)}
        >
          {getLeveText(level)}
          <StyledLevelRadioInput
            type="radio"
            name={Math.random()}
            value={level}
            checked={skillLevel === level}
            onChange={() => onSkillLevelChange(level)}
          />
        </StyledLevelRadio>
      ))}
    </StyledLevelRadioContainer>
  );
};
