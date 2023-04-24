import { SkillRadioSelection } from "./SkillRadioSelection";
import styled from "styled-components";

const ListItem = styled.div`
  background-color: greenyellow;
  border-radius: 4px;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
`;
const RemoveButton = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  margin-right: 8px;
`;

const SkillItem = ({
  skill,
  skillLevel,
  onSkillLevelChange,
  onSkillRemove,
}) => {
  const handleSkillLevelChange = (level) => {
    onSkillLevelChange(skill, level);
  };
  console.log("skillWODATEN", skill);
  return (
    <ListItem>
      <div> {skill}</div>
      <div>
        <SkillRadioSelection
          skill={skill}
          skillLevel={skillLevel}
          onSkillLevelChange={handleSkillLevelChange}
        />
      </div>
      <div>
        <RemoveButton onClick={() => onSkillRemove(skill, skillLevel)}>
          -
        </RemoveButton>
      </div>
    </ListItem>
  );
};

export default SkillItem;
