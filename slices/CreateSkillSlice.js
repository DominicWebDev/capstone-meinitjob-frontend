import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const createSkillSlice = (set) => ({
  skills: [],

  fetchSkills: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/skills/`
    );
    const responseJson = await response.json();
    set({ skills: responseJson?.skills ?? [] });
  },
});

const useSkillStore = create(
  devtools((set) => ({
    ...createSkillSlice(set),
  }))
);

export default useSkillStore;
