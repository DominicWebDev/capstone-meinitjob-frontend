import styled from "styled-components";
import { useState, useEffect } from "react";

import UserSkillList from "./UserSkillList";
import SkillSelection from "./SkillSelection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 6px 8px;
  border-radius: 4px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0061d1;
  }
`;
const Label = styled.label`
  margin-right: 8px;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  margin-bottom: 16px;
`;

const Select = styled.select`
  margin-bottom: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
`;

const ProfileDescription = styled.p`
  margin-top: 8px;
  text-align: center;
  height: 200px; /* oder jede andere Höhe, die du bevorzugst */
  overflow-y: scroll;
`;

/* const PrivatProfileContainer = styled.div``;
const ProfileAvailability = styled.div`
  margin-top: 8px;
`;

const ProfilePreference = styled.div`
  margin-top: 8px;
`;
const ProfileHeadline = styled.h3`
  color: #f14f4a;
  font-size: 1rem;
`; */

const SKILLS_LIST = [
  "React",
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "Python",
  "Java",
  "C#",
  "C++",
];

const UserProfile = ({ user, onSubmit }) => {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [skills, setSkills] = useState(user.skills);
  const [availability, setAvailability] = useState(user.availability);
  const [preference, setPreference] = useState(user.preference);
  const [description, setDescription] = useState(user.description);
  const [email, setEmail] = useState(user.email);
  const [prefSize, setprefSize] = useState(user.prefSize);
  const [userSkillList, setUserSkillList] = useState([]);

  useEffect(() => {
    setName(user.name);
    setImage(user.image);
    setAvailability(user.availability);
    setPreference(user.preference);
    setDescription(user.description);
    setEmail(user.email);
    setprefSize(user.prefSize);
    setUserSkillList(user.skills);
  }, [user]);

  const handleUserSkillAdd = ({ name, level }) => {
    if (userSkillList.find((userSkill) => userSkill.name === name)) return;

    setUserSkillList((prevUserSkillList) => [
      ...prevUserSkillList,
      { name: name, level: level },
    ]);
  };

  const handleUserSkillRemove = (skill) =>
    setUserSkillList((prevUserSkillList) =>
      prevUserSkillList.filter((userSkill) => userSkill.name !== skill)
    );

  const handleUserSkillLevelChange = (skill, level) => {
    setUserSkillList((prevUserSkillList) => {
      return prevUserSkillList.map((userSkill) => {
        if (userSkill.name === skill) {
          return { ...userSkill, level };
        }
        return userSkill;
      });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name,
      image,
      skills: userSkillList,
      availability,
      preference,
      description,
      email,
      prefSize,
    });
    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        image,
        skills: userSkillList,
        availability,
        preference,
        description,
        email,
        prefSize,
      })
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Magdalena Müller"
          />
        </InputContainer>
        <InputContainer>
          <Label>Profilbild URL:</Label>
          <Input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com"
          />
        </InputContainer>
        <InputContainer>
          <Label>Kontakt Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="yourEmail@here.com"
          />
        </InputContainer>
        <InputContainer>
          <Label>Verfügbarkeit:</Label>
          <Select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
          >
            <option value="Vollzeit">Vollzeit</option>
            <option value="Teilzeit">Teilzeit</option>
            <option value="Offen für alles">Offen für alles</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Präferenz:</Label>
          <Select
            value={preference}
            onChange={(event) => setPreference(event.target.value)}
          >
            <option value="Remote">Remote</option>
            <option value="Büro">Büro</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Offen für alles">Offen für alles</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Beschreibung:</Label>
          <TextArea
            placeholder="ein paar Worte über dich"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </InputContainer>
        <Button type="submit">Speichern</Button>
      </form>
      <SkillSelection skills={SKILLS_LIST} onSkillAdd={handleUserSkillAdd} />

      <UserSkillList
        skills={userSkillList}
        onSkillLevelChange={handleUserSkillLevelChange}
        onSkillRemove={handleUserSkillRemove}
      />

      {/*       <ProfileAvailability>
        <ProfileHeadline>Verfügbarkeit: {user.availability}</ProfileHeadline>
      </ProfileAvailability>
      <ProfileHeadline>Präferenzen:</ProfileHeadline>
      <ProfilePreference>        KANN MAN WIEDER reinnehmen auf der Anzeige Page für Unternehmen was quasi bei dem Unternehmen auftaucht!!!!!!!!!!!
        {user.prefSize}
        {user.preference}
      </ProfilePreference>

      <PrivatProfileContainer>{user.email} </PrivatProfileContainer> */}

      <ProfileDescription>{user.description}</ProfileDescription>
    </Container>
  );
};

export default UserProfile;
