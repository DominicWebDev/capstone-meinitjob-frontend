import styled from "styled-components";
import SkillItem from "./SkillItem";

const ListContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid blue;
  font-size: 0.9rem;
`;

const UserSkillList = ({ skills, onSkillLevelChange, onSkillRemove }) => {
  console.log("skillsUSERSKILLLISTWO", skills);
  return (
    <ListContainer>
      {skills.map((userSkill) => (
        <SkillItem
          key={userSkill.skill_name}
          skill={userSkill.skill_name}
          skillLevel={userSkill.skill_level}
          onSkillLevelChange={onSkillLevelChange}
          onSkillRemove={onSkillRemove}
        />
      ))}
    </ListContainer>
  );
};

export default UserSkillList;
