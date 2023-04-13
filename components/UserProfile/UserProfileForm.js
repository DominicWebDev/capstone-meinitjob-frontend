import React, { useState } from "react";
import styled from "styled-components";
import SkillSelection from "./SkillSelection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  margin-bottom: 16px;
`;

const Select = styled.select`
  margin-bottom: 16px;
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
`;

const UserProfileForm = ({ user, onSubmit }) => {
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState(user.image);
  const [skills, setSkills] = useState(user.skills);
  const [availability, setAvailability] = useState(user.availability);
  const [preference, setPreference] = useState(user.preference);
  const [description, setDescription] = useState(user.description);
  const [email, setEmail] = useState(user.email);
  const [prefSize, setprefSize] = useState(user.prefSize);

  const SKILLS_LIST = [
    { label: "React", value: "react" },
    { label: "HTML", value: "html" },
    { label: "CSS", value: "css" },
    { label: "JavaScript", value: "javascript" },
    { label: "Node.js", value: "nodejs" },
    { label: "MongoDB", value: "mongodb" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" },
    { label: "C++", value: "cpp" },
  ];

  const handleSkillAdd = (newSkill, level) => {
    const skillExists = skills.some((skill) => skill.name === newSkill);
    if (!skillExists) {
      setSkills([...skills, { name: newSkill, level }]);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name,
      image,
      skills: skills.map((skill) => ({ name: skill.name, level: skill.level })),
      availability,
      preference,
      description,
      email,
      prefSize,
    });
  };

  return (
    <Container>
      <h1>Profil bearbeiten</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Magdalena Müller"
          />
        </label>
        <label>
          Profilbild URL:
          <Input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com"
          />
        </label>
        <label>
          Kontakt Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="yourEmail@here.com"
          />
        </label>
        <SkillSelection
          skills={skills}
          onSkillAdd={handleSkillAdd}
          onSkillRemove={handleSkillRemove}
        />
        <label>
          Verfügbarkeit:
          <Select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
          >
            <option value="Vollzeit">Vollzeit</option>
            <option value="Teilzeit">Teilzeit</option>
            <option value="Offen für alles">Offen für alles</option>
          </Select>
        </label>
        <label>
          Präferenz:
          <Select
            value={preference}
            onChange={(event) => setPreference(event.target.value)}
          >
            <option value="Remote">Remote</option>
            <option value="Büro">Büro</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Offen für alles">Offen für alles</option>
          </Select>
        </label>
        <label aria-label="Beschreibung über dich">
          ein paar Worte über dich:
          <TextArea
            placeholder="ein paar Worte über dich"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <Button type="submit">Speichern</Button>
      </form>
    </Container>
  );
};

export default UserProfileForm;
