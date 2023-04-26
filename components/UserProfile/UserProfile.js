import styled from "styled-components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import UserSkillList from "./UserSkillList";
import SkillSelection from "./SkillSelection";
import useSkillStore from "../../slices/CreateSkillSlice";
import useUserStore from "../../slices/CreateUserSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f8f9fa;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 35px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;
const StyledH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
  color: black;
  margin-bottom: 0.3rem;
  margin-top: 8px;
`;
const StyledH2 = styled.h2`
  font-size: 2.3rem;
  text-align: center;
  color: black;
  margin-bottom: 0.3rem;
  margin-top: 40px;
`;
const Button = styled.button`
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: #0061d1;
  }
`;
const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-top: 0.3rem;
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  transition: border-color 0.3s;

  /* Increase the height of the textarea */
  height: 200px;

  &:focus {
    border-color: #0070f3;
    outline: transparent;
  }
`;

const Select = styled.select`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0070f3;
    outline: transparent;
  }

  -webkit-appearance: none; /* Verhindert das standardmäßige Styling des Select-Elements */
  -moz-appearance: none;
  appearance: none;

  background-image: url("https://cdn-icons-png.flaticon.com/512/2985/2985150.png");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: 20px;
  padding-right: 30px;
  background-position: right 10px center;
`;

const Input = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  transition: border-color 0.3s;

  &:focus-visible {
    outline: transparent;
  }

  &:focus {
    border-color: #0070f3;
    outline: transparent;
  }
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  display: flex;
  margin-top: 12px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #56b0f5;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

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
    storeAddUserSkill(skill_id, user_id).then(() => {
      storeFetchUserSkillsByUserId(user_id);

      toast.success("Skill hinzugefügt!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      toast.clearWaitingQueue();
    });

    /*  setUserSkillList((prevUserSkillList) => [
      ...prevUserSkillList,
      { name: name, level: level },
    ]); */
    /* TODO: USE BACKEND REQUEST TO ADD USERSKILLLIST */
  };
  const deleteUserSkill = useUserStore((state) => state.deleteUserSkillById);
  const storeUpdateUserSkill = useUserStore((state) => state.updateUserSkill);

  const handleUserSkillRemove = (skill_name, skill_level) => {
    /* setUserSkillList((prevUserSkillList) =>
      prevUserSkillList.filter((userSkill) => userSkill.name !== skill)
    ); */
    const skillID = findSkillInSkillStore(skill_name, skill_level);

    const calculateRows = (text) => {
      return text.split("\n").length;
    };
    deleteUserSkill(user_id, skillID).then(() => {
      storeFetchUserSkillsByUserId(user_id);

      toast.success("Skill gelöscht!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      toast.clearWaitingQueue();
    });
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

  const handleUserSkillLevelChange = (id, name, level) => {
    console.log("RECEIVED handleUserSkillLevelChange id", id);
    console.log("RECEIVED handleUserSkillLevelChange id", name);
    console.log("RECEIVED handleUserSkillLevelChange level", level);

    storeUpdateUserSkill(id, name, level).then(() => {
      storeFetchUserSkillsByUserId(user_id);

      toast.success("Skill Level geändert!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      toast.clearWaitingQueue();
    });

    /* TODO: SEND HERE TO BACKEND AND REFETCH NEW SKILLLIST! */

    /* setUserSkillList((prevUserSkillList) => {
      return prevUserSkillList.map((userSkill) => {
        if (userSkill.name === skill) {
          return { ...userSkill, level };
        }
        return userSkill;
      });
    }); */
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

      toast.success("Nutzerdaten aktualisiert!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeButton: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
      });
      toast.clearWaitingQueue();
    });
  };

  return (
    <Container>
      <StyledH1>Dein Profil</StyledH1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProfileImage src={user.image} alt={`${user.name}`} />
      </div>

      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>Vorname</Label>
          <Input
            type="text"
            value={first_name}
            onChange={(event) => setFirst_Name(event.target.value)}
            placeholder="Magdalena "
          />
        </InputContainer>
        <InputContainer>
          <Label>Nachname</Label>
          <Input
            type="text"
            value={last_name}
            onChange={(event) => setLast_Name(event.target.value)}
            placeholder=" Müller"
          />
        </InputContainer>

        <InputContainer>
          <Label>Kontakt Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="yourEmail@here.com"
          />
        </InputContainer>

        <InputContainer>
          <Label>Bevorzugter Arbeitsort</Label>
          <Select
            value={pref_remote}
            onChange={(event) => setPref_Remote(event.target.value)}
          >
            <option value="true">Remote</option>
            <option value="false">Büro</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Bevorzugte Unternehmensgröße</Label>
          <Select
            value={pref_company_size}
            onChange={(event) => setPref_company_size(event.target.value)}
          >
            <option value="10">1-10 Mitarbeiter</option>
            <option value="100">10-100 Mitarbeiter</option>
            <option value="250">100-250 Mitarbeiter</option>
            <option value="500">250-500 Mitarbeiter</option>
            <option value="1000">500-1000 Mitarbeiter</option>
            <option value="250000">über 1000 Mitarbeiter</option>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Bevorzugte Branche</Label>
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
          <Label>Beschreibung</Label>
          <TextArea
            placeholder="ein paar Worte über dich"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </InputContainer>
        <SaveButton type="submit">Meine Daten aktualisieren</SaveButton>
      </form>
      <StyledH2>Deine Skills</StyledH2>
      {storeSkills.length &&
        storeSkills.filter(
          (skill) =>
            !userSkillList.some(
              (userSkill) => userSkill.skill_name === skill.name
            )
        ).length > 0 && (
          <SkillSelection
            skills={storeSkills.filter(
              (skill) =>
                !userSkillList.some(
                  (userSkill) => userSkill.skill_name === skill.name
                )
            )}
            onSkillAdd={handleUserSkillAdd}
          />
        )}
      <div style={{ marginBottom: "25px", marginTop: "8px" }}>
        <UserSkillList
          userSkills={userSkillList}
          onSkillLevelChange={handleUserSkillLevelChange}
          onSkillRemove={handleUserSkillRemove}
        />
      </div>
    </Container>
  );
};

export default UserProfile;

/*     <InputContainer>
          <Label>Profilbild URL</Label>
          <Input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://example.com"
          />
        </InputContainer> */
