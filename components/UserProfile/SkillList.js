import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.div`
  background-color: #fff;
  color: #333;
  border-radius: 4px;
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const SkillItem = ({ skill }) => {
  return (
    <ListItem>
      {skill.name} ({skill.level})
    </ListItem>
  );
};

const SkillList = ({ skills }) => {
  return (
    <ListContainer>
      {skills.map((skill) => (
        <SkillItem key={skill.name} skill={skill} />
      ))}
    </ListContainer>
  );
};

export default SkillList;
