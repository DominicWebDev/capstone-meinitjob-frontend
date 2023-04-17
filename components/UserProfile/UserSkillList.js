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
  return (
    <ListContainer>
      {skills.map((userSkill) => (
        <SkillItem
          key={userSkill.name}
          skill={userSkill.name}
          skillLevel={userSkill.level}
          onSkillLevelChange={onSkillLevelChange}
          onSkillRemove={onSkillRemove}
        />
      ))}
    </ListContainer>
  );
};

export default UserSkillList;
