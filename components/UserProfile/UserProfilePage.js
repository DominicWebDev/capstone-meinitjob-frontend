import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import useUserStore from "../../slices/CreateUserSlice";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

const Container = styled.div`
  position: relative;
`;

const UserProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const storeSelectedUser = useUserStore((state) => state.selectedUser);
  const storeFetchUserById = useUserStore((state) => state.fetchUserById);

  /*   const [isDataFetched, setIsDataFetched] = useState(false); */

  useEffect(() => {
    console.log(
      "sessionDatenschon da wenn ausgeführt wird?? _______",
      session?.frontendUser.id
    );
    if (session?.frontendUser.id) storeFetchUserById(session.frontendUser.id);
  }, []);
  useEffect(() => {
    if (session?.frontendUser.id) storeFetchUserById(session.frontendUser.id);
  }, [session]);

  useEffect(() => {
    if (!user && storeSelectedUser) {
      setUser(storeSelectedUser);
    }
  }, [storeSelectedUser]);

  useEffect(() => {
    if (!session) {
      router.replace(
        `/api/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`
      );
    }
  }, [session, router]);
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
    storeFetchUserById(session.frontendUser.id);
  };

  return (
    <Container>
      {user && (
        <>
          <UserProfile
            user_id={session.frontendUser.id}
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
