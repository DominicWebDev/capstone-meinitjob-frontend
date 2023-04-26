import { SkillRadioSelection } from "./SkillRadioSelection";
import styled from "styled-components";

const ListItem = styled.div`
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;

  @media (min-width: 480px) {
    width: calc(50% - 4px);
  }
`;

const RemoveButton = styled.button`
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

const SkillName = styled.div`
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.3rem;
`;

const SkillItem = ({
  id,
  skill,
  skillLevel,
  onSkillLevelChange,
  onSkillRemove,
}) => {
  const handleSkillLevelChange = (level) => {
    onSkillLevelChange(id, skill, level);
  };
  return (
    <ListItem>
      <SkillName> {skill}</SkillName>
      <div>
        <SkillRadioSelection
          skill={skill}
          skillLevel={skillLevel}
          onSkillLevelChange={handleSkillLevelChange}
        />
      </div>
      <div>
        <RemoveButton onClick={() => onSkillRemove(skill, skillLevel)}>
          Entfernen
        </RemoveButton>
      </div>
    </ListItem>
  );
};

export default SkillItem;
