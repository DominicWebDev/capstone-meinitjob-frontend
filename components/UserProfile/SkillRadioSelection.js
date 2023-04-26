import styled from "styled-components";

const LevelRadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LevelRadio = styled.label`
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

const LevelRadioInput = styled.input`
  margin-right: 4px;
  display: none;
`;
const SelectedLevel = styled.div`
  background-color: #0070f3;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0061d1;
    cursor: pointer;
  }
`;

export const SkillRadioSelection = ({ skillLevel, onSkillLevelChange }) => {
  return (
    <>
      <LevelRadioContainer>
        {[1, 2, 3].map((level) => (
          <LevelRadio
            htmlFor={level}
            key={level}
            selected={skillLevel === level}
            onClick={() => onSkillLevelChange(level)}
          >
            Level {level}
            <LevelRadioInput
              type="radio"
              name={Math.random()}
              value={level}
              checked={skillLevel === level}
              onChange={() => onSkillLevelChange(level)}
            />
          </LevelRadio>
        ))}
      </LevelRadioContainer>
    </>
  );
};
