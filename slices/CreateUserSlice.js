import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const createUserSlice = (set) => ({
  users: [],
  selectedUser: null,
  userSkills: [],
  matches: [],

  fetchUsers: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/`
    );
    set({ users: await response.json() });
  },
  fetchUserById: async (id) => {
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/${user_id}/skill/${skill_id}`,
      {
        method: "DELETE",
      }
    );
  },
  updateUserSkill: async (id, name, level) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/skill`, {
      body: JSON.stringify({
        id,
        name,
        level,
      }),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  },
  addUserSkill: async (fk_skill_id, fk_user_id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/skill`, {
      body: JSON.stringify({
        fk_skill_id,
        fk_user_id,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  fetchMatchesByUserId: async (user_id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/matches/${user_id}`
    );
    const responseJson = await response.json();
    set({ matches: responseJson?.matches ?? [] });
  },
  addMatch: async (fk_user_id, fk_company_id) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/matches`, {
      body: JSON.stringify({
        fk_user_id,
        fk_company_id,
      }),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  updateMatch: async (id, match_status) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/matches`, {
      body: JSON.stringify({
        id,
        match_status,
      }),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  },
  deleteMatch: async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/users/matches/${id}`,
      {
        method: "DELETE",
      }
    );
  },
});

const useUserStore = create(
  devtools((set) => ({
    ...createUserSlice(set),
  }))
);

export default useUserStore;
