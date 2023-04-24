import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const createCompanySlice = (set) => ({
  companies: [],
  allCompanySkills: [],
  selectedCompany: null,
  selectedCompanySkills: [],

  fetchCompanies: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/companies/`
    );
    const responseJson = await response.json();
    set({ companies: responseJson?.companies ?? [] });
  },
  fetchCompanyById: async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/companies/${id}`
    );
    const responseJson = await response.json();
    set({ selectedCompany: responseJson?.company ?? null });
  },
  fetchAllCompanySkills: async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/companies/allskills/`
    );
    const responseJson = await response.json();
    set({ allCompanySkills: responseJson?.companySkills ?? [] });
  },
  fetchCompanySkillsById: async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/companies/skills/${id}`
    );
    const responseJson = await response.json();
    set({ selectedCompanySkills: responseJson?.skills ?? [] });
  },
});

const useCompanyStore = create(
  devtools((set) => ({
    ...createCompanySlice(set),
  }))
);

export default useCompanyStore;
