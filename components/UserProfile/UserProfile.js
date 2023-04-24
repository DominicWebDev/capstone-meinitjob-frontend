import styled from "styled-components";
import { useState, useEffect } from "react";
import UserSkillList from "./UserSkillList";
import SkillSelection from "./SkillSelection";
import useSkillStore from "../../slices/CreateSkillSlice";
import useUserStore from "../../slices/CreateUserSlice";

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

const UserProfile = ({ user, onSubmit, user_id = 1, onUpdateUser }) => {
  const [first_name, setFirst_Name] = useState(user.first_name);
  const [last_name, setLast_Name] = useState(user.Last_name);
  const [image, setImage] = useState(user.image);
  const [pref_remote, setPref_Remote] = useState(user.pref_remote);
  const [pref_sector, setPref_sector] = useState(user.pref_sector);
  const [pref_company_size, setPref_company_size] = useState(
    user.pref_company_size
  );
  const [description, setDescription] = useState(user.description);
  const [email, setEmail] = useState(user.email);
  const [userSkillList, setUserSkillList] = useState([]);

  const fetchAllSkills = useSkillStore((state) => state.fetchSkills);
  const storeSkills = useSkillStore((state) => state.skills);
  const storeFetchUserSkillsByUserId = useUserStore(
    (state) => state.fetchUserSkillsByUserId
  );
  const storeUserSkills = useUserStore((state) => state.userSkills);
  const storeAddUserSkill = useUserStore((state) => state.addUserSkill);
  const storeUpdateUser = useUserStore((state) => state.updateUser);

  useEffect(() => {
    setFirst_Name(user.first_name);
    setLast_Name(user.last_name);
    setImage(user.image);
    setDescription(user.description);
    setEmail(user.email);
    setPref_Remote(user.pref_remote);
    setPref_company_size(user.pref_company_size);
    setPref_sector(user.prefSector);

    /*     setUserSkillList(user.skills); */
  }, [user]);

  useEffect(() => {
    fetchAllSkills();
    storeFetchUserSkillsByUserId(user_id); // TODO: CHANGE TO USER_ID DYNAMICALLY
  }, []);

  useEffect(() => {
    setUserSkillList(storeUserSkills);
  }, [storeUserSkills]);

  const handleUserSkillAdd = ({ skill_id, user_id }) => {
    console.log("skillTESTHIERid", skill_id, user_id, "usertestSkilL");
    if (userSkillList.find((userSkill) => userSkill.fk_skill_id === skill_id))
      /* TODO: CHECK AGAIN WHEN USERSKILL LIST IS AVAILABLE IN STORE */
      return;
    storeAddUserSkill(skill_id, user_id).then(() =>
      storeFetchUserSkillsByUserId(user_id)
    );

    /*  setUserSkillList((prevUserSkillList) => [
      ...prevUserSkillList,
      { name: name, level: level },
    ]); */
    /* TODO: USE BACKEND REQUEST TO ADD USERSKILLLIST */
  };
  const deleteUserSkill = useUserStore((state) => state.deleteUserSkillById);
  const handleUserSkillRemove = (skill_name, skill_level) => {
    /* setUserSkillList((prevUserSkillList) =>
      prevUserSkillList.filter((userSkill) => userSkill.name !== skill)
    ); */
    const skillID = findSkillInSkillStore(skill_name, skill_level);

    deleteUserSkill(user_id, skillID).then(() =>
      storeFetchUserSkillsByUserId(user_id)
    );
  };
  const findSkillInSkillStore = (skillName, level) => {
    const foundSkill = storeUserSkills.find((skill) => {
      return (
        skill.skill_name === skillName &&
        parseInt(skill.skill_level) === parseInt(level)
      );
    });
    return foundSkill.fk_skill_id;
  };

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
    const id = user_id;
    event.preventDefault();
    onSubmit({
      first_name,
      last_name,
      email,
      image,
      pref_remote,
      pref_company_size,
      pref_sector,
      description,
    });
    storeUpdateUser(
      id,
      first_name,
      last_name,
      email,
      image,
      pref_remote,
      pref_company_size,
      pref_sector,
      description
    ).then(() => {
      onUpdateUser();
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Vorname:</Label>
          <Input
            type="text"
            value={first_name}
            onChange={(event) => setFirst_Name(event.target.value)}
            placeholder="Magdalena "
          />
        </InputContainer>
        <InputContainer>
          <Label>Nachname:</Label>
          <Input
            type="text"
            value={last_name}
            onChange={(event) => setLast_Name(event.target.value)}
            placeholder=" Müller"
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
          <Label>Präferenz:</Label>
          <Select
            value={pref_remote}
            onChange={(event) => setPref_Remote(event.target.value)}
          >
            <option value="true">Remote</option>
            <option value="false">Vor Ort</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Unternehmensgröße:</Label>
          <Select
            value={pref_company_size}
            onChange={(event) => setPref_company_size(event.target.value)}
          >
            <option value="1-10">1-10 Mitarbeiter</option>
            <option value="10-100">10-100 Mitarbeiter</option>
            <option value="100-250">100-250 Mitarbeiter</option>
            <option value="250-500">250-500 Mitarbeiter</option>
            <option value="500-1000">500-1000 Mitarbeiter</option>
            <option value="1000+">über 1000 Mitarbeiter</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Branche:</Label>
          <Select
            value={pref_sector}
            onChange={(event) => setPref_sector(event.target.value)}
          >
            <option value="Big Data Analytics">Big Data Analytics</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Software">Software</option>
            <option value="Big Data Analytics">Big Data Analytics</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Big Data Analytics">Remote</option>
            <option value="Internet of Things">Internet of Things</option>
            <option value="Virtual Reality">Virtual Reality</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Software Development">Software Development</option>
            <option value="Business Consulting">Business Consulting</option>
            <option value="Robotics">Robotics</option>
            <option value="Data Analytics">Data Analytics</option>
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
      {storeSkills.length && (
        <SkillSelection skills={storeSkills} onSkillAdd={handleUserSkillAdd} />
      )}

      <UserSkillList
        skills={userSkillList}
        onSkillLevelChange={handleUserSkillLevelChange}
        onSkillRemove={handleUserSkillRemove}
      />

      <ProfileDescription>{user.description}</ProfileDescription>
    </Container>
  );
};

export default UserProfile;
