import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import useUserStore from "../../slices/CreateUserSlice";

const Container = styled.div`
  position: relative;
`;

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  console.log(user, "WasistdasFüreiNUser");
  const storeSelectedUser = useUserStore((state) => state.selectedUser);
  const storeFetchUserById = useUserStore((state) => state.fetchUserById);

  /*   const [isDataFetched, setIsDataFetched] = useState(false); */

  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    storeFetchUserById(1);
  }, []);

  useEffect(() => {
    setUser(storeSelectedUser);
  }, [storeSelectedUser]);

  /*   useEffect(() => {
    if (isDataFetched) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user, isDataFetched]); */

  // Handle change in description height
  const handleDescriptionResize = (event) => {
    setDescriptionHeight(event.target.scrollHeight);
  };

  const handleFormSubmit = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleUpdateUser = () => {
    storeFetchUserById(1);
  };

  return (
    <Container>
      {user && (
        <>
          <UserProfile
            user={user}
            onSubmit={handleFormSubmit}
            onUpdateUser={handleUpdateUser}
          />
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
