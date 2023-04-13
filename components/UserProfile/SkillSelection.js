import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RemoveButton = styled.button`
  padding: 4px;
  border-radius: 4px;
  border: none;
  background-color: #e02020;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #b01919;
  }
`;

const SkillInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SkillInput = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  margin-right: 16px;
`;

const LevelSelect = styled.select`
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0061d1;
  }
`;

const Skill = ({ name, level, onRemove }) => {
  return (
    <SkillInputContainer>
      <Label>{name}</Label>
      <LevelSelect value={level} disabled onChange={() => {}}>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
      </LevelSelect>
      <RemoveButton onClick={onRemove}>X</RemoveButton>
    </SkillInputContainer>
  );
};

const SkillSelection = ({ skills, onSkillAdd, onSkillRemove }) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("1");

  const handleSkillAdd = (event) => {
    event.preventDefault();
    if (selectedSkill) {
      onSkillAdd(selectedSkill, selectedLevel);
      setSelectedSkill("");
      setSelectedLevel("1");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    onSkillRemove(skillToRemove);
  };

  return (
    <Container>
      {skills.map((skill) => (
        <Skill
          key={`${skill.name}-${skill.level}`}
          name={skill.name}
          level={skill.level}
          onRemove={() => handleSkillRemove(skill)}
        />
      ))}
      <SkillInputContainer>
        <SkillInput
          type="text"
          placeholder="Neue Fähigkeit"
          value={selectedSkill}
          onChange={(event) => setSelectedSkill(event.target.value)}
        />
        <LevelSelect
          value={selectedLevel}
          onChange={(event) => setSelectedLevel(event.target.value)}
        >
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </LevelSelect>
        <Button onClick={handleSkillAdd}>Hinzufügen</Button>
      </SkillInputContainer>
    </Container>
  );
};

export default SkillSelection;
