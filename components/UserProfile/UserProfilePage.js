import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import UserProfileForm from "./UserProfileForm";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const EditButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 137px;
  margin-top: 134px;

  padding: 9px 16px;
  border-radius: 4px;
  border: none;
  background-color: #0070f3;
  color: white;

  cursor: pointer;

  &:hover {
    background-color: #0061d1;
  }
`;

const UserProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    image:
      "https://source.boringavatars.com/beam/250/333?colors=2f70e9,e76f51,ffc638,f4a261,e97c2f",
    skills: [],
    availability: "",
    preference: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  // Check if user data exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Handle change in description height
  const handleDescriptionResize = (event) => {
    setDescriptionHeight(event.target.scrollHeight);
  };

  const handleFormSubmit = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <Container>
      {!isEditing && (
        <EditButton onClick={handleEditClick}>Bearbeiten</EditButton>
      )}
      {isEditing ? (
        <UserProfileForm user={user} onSubmit={handleFormSubmit} />
      ) : (
        <>
          <UserProfile user={user} />
          <div
            style={{ position: "relative", height: 0, overflow: "hidden" }}
            aria-hidden="true"
          >
            <textarea
              value={user.description}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                resize: "none",
                border: "none",
                outline: "none",
              }}
              onChange={handleDescriptionResize}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default UserProfilePage;
