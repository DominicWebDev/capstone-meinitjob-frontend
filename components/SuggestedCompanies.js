import React, { useState, useEffect } from "react";
import { Swipeable, SwipeEventData } from "react-swipeable";
import CompanyPreviewCard from "./CompanyPreviewCard";
import SwipeComponent from "./SwipeComponent";

const SuggestedCompanies = ({ userSkills, onSwipeRight }) => {
  const [companies, setCompanies] = useState([]);
  const [currentCompanyIndex, setCurrentCompanyIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/companies.json");
      const json = await response.json();
      const filteredCompanies = json.filter((company) => {
        const companySkills = company.lookingfor.map((skill) => skill.name);
        return userSkills.some((skill) => companySkills.includes(skill));
      });
      setCompanies(filteredCompanies);
    }
    fetchData();
  }, [userSkills]);

  const handleSwiped = (eventData) => {
    if (eventData.dir === "Right") {
      onSwipeRight(companies[currentCompanyIndex]);
    }
    setCurrentCompanyIndex((index) => index + 1);
  };

  return (
    <div>
      {currentCompanyIndex < companies.length ? (
        <SwipeComponent handleSwiped={handleSwiped}>
          <CompanyPreviewCard {...companies[currentCompanyIndex]} />
        </SwipeComponent>
      ) : (
        <p>Keine weiteren Unternehmen gefunden.</p>
      )}
    </div>
  );
};
