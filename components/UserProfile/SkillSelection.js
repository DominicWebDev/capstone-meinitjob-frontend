import React, { useState } from "react";
import styled from "styled-components";
import { SkillRadioSelection } from "./SkillRadioSelection";

const SkillName = styled.span`
  width: 90px;
  display: inline-block;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SkillSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border: 3px solid red;
  font-size: 0.9rem;
  height: 100%;
`;

const SkillSelect = styled.select`
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

  margin-top: auto;
`;

const SkillSelection = ({ skills, onSkillAdd }) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);

  const findSkillInSkillStore = (skillName, level) => {
    return skills.find((skill) => {
      return skill.name === skillName && skill.level === level;
    });
  };

  const handleSkillAdd = (event) => {
    event.preventDefault();
    if (selectedSkill) {
      const foundSkill = findSkillInSkillStore(selectedSkill, selectedLevel);
      console.log("foundSkillTESTHIER", foundSkill);
      onSkillAdd({
        skill_id: foundSkill.id,
        user_id: "1",
      }); /* TODO: HARDCODED FOR USER 1 NEEDS TO BE DYNAMIC FOR CURRENT USER */
      /*       handleResetSkillSelection(); */
    }
  };

  /* const handleResetSkillSelection = () => {
    setSelectedSkill("");
    setSelectedLevel(1);
  }; */

  return (
    <Container>
      <SkillSelectContainer>
        <SkillSelect
          value={selectedSkill}
          onChange={(event) => setSelectedSkill(event.target.value)}
        >
          <option value="">-- Wähle eine Fähigkeit aus --</option>
          {[...new Set(skills.map((skill) => skill.name))].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </SkillSelect>
        <SkillRadioSelection
          onSkillLevelChange={setSelectedLevel}
          skillLevel={selectedLevel}
        />
        <Button onClick={handleSkillAdd}>Hinzufügen</Button>
      </SkillSelectContainer>
    </Container>
  );
};

export default SkillSelection;
