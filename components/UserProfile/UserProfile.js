import React from "react";
import styled from "styled-components";
import SkillList from "./SkillList";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PrivatProfileContainer = styled.div``;

const ProfileDescription = styled.p`
  margin-top: 8px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-bottom: 16px;
`;

const ProfileName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 4px;
`;

const ProfileSkills = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ProfileSkill = styled.li`
  margin-bottom: 2px;
  color: white;
  font-weight: bold;
  background-color: green;
  font-size: 1rem;
`;

const ProfileAvailability = styled.div`
  margin-top: 8px;
`;

const ProfilePreference = styled.div`
  margin-top: 8px;
`;
const ProfileHeadline = styled.h4`
  color: burlywood;
`;

const UserProfile = ({ user, updatedSkills }) => {
  const renderSkillsList = () => {
    return <SkillList skills={updatedSkills ? updatedSkills : user.skills} />;
  };

  return (
    <ProfileContainer>
      <ProfileImage src={user.image} alt={`${user.name}`} />
      <ProfileName>{user.name}</ProfileName>
      {renderSkillsList()}
      <ProfileAvailability>
        <ProfileHeadline>Verfügbarkeit: {user.availability}</ProfileHeadline>
      </ProfileAvailability>
      <ProfileHeadline>Präferenzen:</ProfileHeadline>
      <ProfilePreference>
        {user.prefSize}
        {user.preference}
      </ProfilePreference>
      <ProfileDescription>{user.description}</ProfileDescription>
      <PrivatProfileContainer>{user.email} </PrivatProfileContainer>
    </ProfileContainer>
  );
};

export default UserProfile;
