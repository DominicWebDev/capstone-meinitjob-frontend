import { useState } from "react";
import styled from "styled-components";

import { SkillRadioSelection } from "./SkillRadioSelection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 0.8rem;
`;

const SkillSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  padding-bottom: 1.2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  font-size: 0.9rem;
  background-color: #ffffff;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
`;

const SkillSelect = styled.select`
  margin-bottom: 16px;
  font-size: 1rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  transition: border-color 0.3s;

  -webkit-appearance: none; /* Verhindert das standardmäßige Styling des Select-Elements */
  -moz-appearance: none;
  appearance: none;

  background-image: url("https://cdn-icons-png.flaticon.com/512/2985/2985150.png");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 20px;
  padding-right: 30px;
  background-position: right 5px center;

  &:focus {
    border-color: #0070f3;
    outline: none;
  }
`;

const SkillName = styled.span`
  width: 90px;
  display: inline-block;
  text-align: left;
`;

const Button = styled.button`
  padding: 8px 12px;
  border-radius: 12px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  align-self: center;
  margin-top: 14px;
  margin-right: 10px;

  &:hover {
    background-color: #56b0f5;
  }
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
      setSelectedSkill("");
      setSelectedLevel(1);
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
          <option value="">-- Wähle deinen Skill aus --</option>
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
        {selectedSkill && selectedLevel && (
          <Button onClick={handleSkillAdd}>Hinzufügen</Button>
        )}
      </SkillSelectContainer>
    </Container>
  );
};

export default SkillSelection;
