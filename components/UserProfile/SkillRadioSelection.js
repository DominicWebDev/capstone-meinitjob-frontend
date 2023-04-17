import styled from "styled-components";

const LevelRadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LevelRadio = styled.label`
  margin-right: 8px;
`;

const LevelRadioInput = styled.input`
  margin-right: 4px;
`;

export const SkillRadioSelection = ({ skillLevel, onSkillLevelChange }) => {
  return (
    <>
      <LevelRadioContainer>
        {[1, 2, 3].map((level) => (
          <LevelRadio for={level} key={level}>
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
