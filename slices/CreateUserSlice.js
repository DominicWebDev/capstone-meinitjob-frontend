import { create } from "zustand";

import { devtools } from "zustand/middleware";

export const createUserSlice = (set) => ({
  users: [],
  selectedUser: null,
  userSkills: [],

  fetchUsers: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/`
    );
    set({ users: await response.json() });
  },
  fetchUserById: async (id) => {
    console.log(id, "WoistderFehler");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/${id}`
    );
    const responseJson = await response.json();
    set({ selectedUser: responseJson?.user ?? null });
  },
  addUser: async (first_name, last_name, email) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/`, {
      body: JSON.stringify({
        first_name,
        last_name,
        email,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  updateUser: async (
    id,
    first_name,
    last_name,
    email,
    image,
    pref_remote,
    pref_company_size,
    pref_sector,
    description
  ) => {
    console.log("sssssss", id);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/`, {
      body: JSON.stringify({
        id,
        first_name,
        last_name,
        email,
        image,
        pref_remote,
        pref_company_size,
        pref_sector,
        description,
      }),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  },
  fetchUserSkillsByUserId: async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/skills/${id}`
    );
    const responseJson = await response.json();
    set({ userSkills: responseJson?.skills ?? [] });
  },
  deleteUserSkillById: async (user_id, skill_id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/${user_id}/skills/${skill_id}`,
      {
        method: "DELETE",
      }
    );
  },
  addUserSkill: async (fk_skill_id, fk_user_id) => {
    console.log("addUserSkill", fk_skill_id, fk_user_id);
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/skills`, {
      body: JSON.stringify({
        fk_skill_id,
        fk_user_id,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
});

const useUserStore = create(
  devtools((set) => ({
    ...createUserSlice(set),
  }))
);

export default useUserStore;
