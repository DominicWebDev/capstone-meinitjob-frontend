import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
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
    image: "",
    skills: [],
    availability: "",
    preference: "",
    description: "",
  });

  const [isDataFetched, setIsDataFetched] = useState(false);
  console.log(user, "WasistdasfüreinOutput");

  const [descriptionHeight, setDescriptionHeight] = useState(0);

  // Check if user data exists in localStorage
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/user.json");
      const json = await response.json();
      setUser(json);
    };

    if (localStorage.getItem("user") !== null) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsDataFetched(true);
    } else {
      fetchData();
      setIsDataFetched(true);
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (isDataFetched) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isDataFetched]);

  // Handle change in description height
  const handleDescriptionResize = (event) => {
    setDescriptionHeight(event.target.scrollHeight);
  };

  const handleFormSubmit = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <Container>
      <UserProfile user={user} onSubmit={handleFormSubmit} />
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
    </Container>
  );
};

export default UserProfilePage;
