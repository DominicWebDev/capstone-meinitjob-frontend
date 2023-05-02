import styled from "styled-components";

import SkillDropdown from "./SkillDropdown";
import SkillItem from "./SkillItem";

const StyledListContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  font-size: 0.9rem;
  gap: 8px;
  justify-content: space-between;
  /* border: 1px solid red; */
  padding: auto;

  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

const UserSkillList = ({ userSkills, onSkillLevelChange, onSkillRemove }) => {
  return (
    <>
      <StyledListContainer>
        {userSkills
          .sort((a, b) => b.skill_level - a.skill_level)
          .map((userSkill) => (
            <SkillItem
              key={userSkill.skill_name}
              id={userSkill.id}
              skill={userSkill.skill_name}
              skillLevel={userSkill.skill_level}
              onSkillLevelChange={onSkillLevelChange}
              onSkillRemove={onSkillRemove}
            />
          ))}
      </StyledListContainer>
    </>
  );
};

export default UserSkillList;
