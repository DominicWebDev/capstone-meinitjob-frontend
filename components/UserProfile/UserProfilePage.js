import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import useUserStore from "../../slices/CreateUserSlice";

const Container = styled.div`
  position: relative;
`;

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  const storeSelectedUser = useUserStore((state) => state.selectedUser);
  const storeFetchUserById = useUserStore((state) => state.fetchUserById);

  /*   const [isDataFetched, setIsDataFetched] = useState(false); */

  useEffect(() => {
    storeFetchUserById(1);
  }, []);

  useEffect(() => {
    if (!user && storeSelectedUser) {
      console.log(user, "user auf der UserProfilePage");
      setUser(storeSelectedUser);
    }
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
          ></div>
        </>
      )}
    </Container>
  );
};

export default UserProfilePage;
