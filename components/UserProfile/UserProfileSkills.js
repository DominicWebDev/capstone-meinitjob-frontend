import React from "react";
import styled from "styled-components";

const SkillContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SkillName = styled.span`
  margin-right: 8px;
`;

const SkillLevel = styled.select``;

const SkillOption = styled.option``;

const UserProfileSkills = ({ skills, onSkillLevelChange }) => {
  const handleSkillLevelChange = (event, skill) => {
    if (onSkillLevelChange) {
      // check if onSkillLevelChange is defined
      const level = event.target.value;
      const updatedSkills = skills.map((s) =>
        s.skill === skill ? { ...s, level } : s
      );
      onSkillLevelChange(updatedSkills);
    }
  };

  return (
    <div>
      <h3>Skills</h3>
      {skills.map((skill) => (
        <SkillContainer key={skill.skill}>
          <SkillName>{skill.skill}</SkillName>
          <SkillLevel
            value={skill.level}
            onChange={(event) => handleSkillLevelChange(event, skill.skill)}
          >
            <SkillOption value="1">Anfänger</SkillOption>
            <SkillOption value="2">Fortgeschritten</SkillOption>
            <SkillOption value="3">Experte</SkillOption>
          </SkillLevel>
        </SkillContainer>
      ))}
    </div>
  );
};

export default UserProfileSkills;
