import { useState, useEffect } from "react";

import useCompanyStore from "../../slices/CreateCompanySlice";
import useUserStore from "../../slices/CreateUserSlice";
import useSkillStore from "../../slices/CreateSkillSlice";

import UnswipedMatchList from "../../components/CompanyMatches/MatchLists/UnswipedMatchList";
import matchingAlgorithm from "../../utils/matchingAlgorithm";
import NoMatches from "../../components/CompanyMatches/NoMatches";
import SwipedMatchList from "../../components/CompanyMatches/MatchLists/SwipedMatchList";

const Matches = () => {
  const [userMatches, setUserMatches] = useState([]);
  const [isFetchingMatches, setIsFetchingMatches] = useState(false);
  const [isAddingMatches, setIsAddingMatches] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  /* TODO: DYNAMIC USER ID FROM LOGIN */
  const user_id = "1";

  /* STORE FUNCTIONS */
  const storeFetchUserById = useUserStore((state) => state.fetchUserById);
  const storeFetchCompanySkillsById = useCompanyStore(
    (state) => state.fetchCompanySkillsById
  );
  const storeFetchAllCompanySkills = useCompanyStore(
    (state) => state.fetchAllCompanySkills
  );
  const storeFetchUserSkillsByUserId = useUserStore(
    (state) => state.fetchUserSkillsByUserId
  );
  const storeFetchCompanies = useCompanyStore((state) => state.fetchCompanies);
  const storeFetchAllSkills = useSkillStore((state) => state.fetchSkills);
  const storeFetchMatchesByUserId = useUserStore(
    (state) => state.fetchMatchesByUserId
  );
  const storeUpdateMatch = useUserStore((state) => state.updateMatch);
  const storeAddMatch = useUserStore((state) => state.addMatch);

  /* STORE DATA */
  const storeSelectedUser = useUserStore((state) => state.selectedUser);
  const storeSelectedCompanySkills = useCompanyStore(
    (state) => state.selectedCompanySkills
  );
  const storeAllCompanySkills = useCompanyStore(
    (state) => state.allCompanySkills
  );
  const storeUserSkills = useUserStore((state) => state.userSkills);
  const storeCompanies = useCompanyStore((state) => state.companies);
  const storeSkills = useSkillStore((state) => state.skills);
  const storeMatches = useUserStore((state) => state.matches);

  /* MATCHING VARIABLES */
  const unmatchedMatches = userMatches.filter(
    (match) => match.match_status === "unmatched"
  );
  const acceptedMatches = userMatches.filter(
    (match) => match.match_status === "accepted"
  );
  const ignoredMatches = userMatches.filter(
    (match) => match.match_status === "ignored"
  );

  const unmatchedCompanies = storeCompanies.filter((company) =>
    unmatchedMatches.some(
      (unmatchedMatch) => unmatchedMatch.fk_user_id === company.id
    )
  );

  const acceptedCompanies = storeCompanies.filter((company) =>
    acceptedMatches.some(
      (acceptedMatch) => acceptedMatch.fk_company_id === company.id
    )
  );

  const ignoredCompanies = storeCompanies.filter((company) =>
    ignoredMatches.some(
      (ignoredMatch) => ignoredMatch.fk_company_id === company.id
    )
  );

  /* TODO: HANDLE SWIPES WITH NEW DATABASE REQUESTS */
  const handleSwipedRight = (cardIndex) => {
    console.log("swipeRIGHT");
    setCurrentCardIndex((prevCardIndex) => prevCardIndex + 1);
    /* ACCEPT */
    /* TODO: SEND TO BACKEND AND REFETCH! */
    /* setUserMatches((prevUnacceptedCompanies) =>
      prevUnacceptedCompanies.filter(
        (company) => company.id !== storeSelectedCompanySkills[0].fk_company_id
      )
    ); */
  };

  const handleSwipedLeft = (cardIndex) => {
    console.log("swipeLeft");
    setCurrentCardIndex((prevCardIndex) => prevCardIndex + 1);
    /* TODO: SEND TO BACKEND AND REFETCH! */
    /* IGNORE */
  };

  const handleRemoveMatch = (matchId) => {
    /* TODO: MAYBE THIS FUNCTION CAN FIND THE MATCH_ID OF THE USER AND THE THE COMPANY ID TO PROVIDE THIS TO THE UPDATEMATCH FUNCTION INSTEAD!!!!! */
    storeUpdateMatch(matchId, "unmatched");
  };

  const handleFetchMatches = () => {
    if (!isFetchingMatches) {
      storeFetchMatchesByUserId(user_id);
      setIsFetchingMatches(true);
    }
  };

  useEffect(() => {
    handleFetchMatches();
    storeFetchUserById(user_id);
    storeFetchUserSkillsByUserId(user_id);
    storeFetchAllSkills();
    storeFetchCompanies();
    storeFetchAllCompanySkills();
  }, []);

  useEffect(() => {
    /* IF MATCHES HAVE RECENTLY BEEN FETCHED AND USESTATE IS EMPTY AND NEW MATCHES ARE IN STORE FROM DB */
    /* TODO: WHAT ABOUT THE CASE WHERE USER MATCHES NEEDED TO UPDATE BUT USERMATCHES ALREADY HAVE A LENGTH? */
    if (isFetchingMatches && !userMatches.length && storeMatches.length) {
      const myStoreMatches = storeMatches.filter(
        (match) => +match.fk_user_id === +user_id
      );

      setUserMatches(myStoreMatches);
      setIsFetchingMatches(false);
    }
  }, [isFetchingMatches, userMatches, storeMatches]);

  useEffect(() => {
    if (
      storeSelectedUser &&
      storeUserSkills.length &&
      storeSkills &&
      storeCompanies.length &&
      storeAllCompanySkills.length &&
      storeMatches.length &&
      !isFetchingMatches
    ) {
      let foundAlgoMatches = matchingAlgorithm(
        storeSelectedUser,
        storeUserSkills,
        storeSkills,
        storeCompanies,
        storeAllCompanySkills
      );

      console.log("foundMatches PRE FILTER EXISTING MATCHES", foundAlgoMatches);
      console.log("storeMatches PRE FILTER MATCHING", storeMatches);

      const myStoreMatches = storeMatches.filter(
        (match) => +match.fk_user_id === +user_id
      );

      /* WENN DER NUTZER MATCHES IN DER DATENBANK HAT FILTERE DIE MIT GLEICHER COMPANY ID WIE IN FOUNDALGOMATCHES HERAUS */
      if (myStoreMatches.length) {
        const algoMatchesLength = foundAlgoMatches.length;

        foundAlgoMatches = foundAlgoMatches.filter(
          (matchedCompany) =>
            !storeMatches.some(
              (match) => match.fk_company_id === matchedCompany.id
            )
        );

        if (!isAddingMatches && foundAlgoMatches.length !== algoMatchesLength) {
          foundAlgoMatches.forEach((matchedCompany) => {
            console.log(
              `ADDING NEW MATCH TO DATABASE: user_id ${user_id} matchedCompany.id${matchedCompany.id}`
            );
            setIsAddingMatches(true);
            storeAddMatch(user_id, matchedCompany.id).then(() => {
              handleFetchMatches();
            });
          });
        }

        if (!isAddingMatches && foundAlgoMatches.length === algoMatchesLength) {
          setIsAddingMatches(false);
        }

        /* TODO: SEND A REQUEST TO THE BACKEND TO ADD THE NEW RECOGNIZED MATCHES TO THE DATABASE */
        /* TODO: THEN REFETCH THE MATCHES FROM THE DATABASE */
      }

      console.log(
        "foundMatches POST FILTER EXISTING MATCHES JUST LOGGING",
        foundAlgoMatches
      );
      /* setUnacceptedCompanies(foundAlgoMatches); */
    }
  }, [
    storeSelectedUser,
    storeUserSkills,
    storeSkills,
    storeCompanies,
    storeAllCompanySkills,
    storeMatches,
    isFetchingMatches,
  ]);

  return (
    <div style={{ marginBottom: "40px" }}>
      <div>
        {unmatchedCompanies.length > 0 ? (
          <div
            style={{
              background: "white",
              paddingBottom: "46px",
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "black",
                fontSize: "1.3rem",
              }}
            >
              Diese Unternehmen suchen dich!
            </h2>
            <UnswipedMatchList
              currentCardIndex={currentCardIndex}
              unmatchedCompanies={unmatchedCompanies}
              onSwipedLeft={handleSwipedLeft}
              onSwipedRight={handleSwipedRight}
            />
          </div>
        ) : (
          <NoMatches />
        )}
      </div>
      <div
        style={{
          background: "white",
          paddingBottom: "16px",
          paddingTop: "16px",
          marginBottom: "20px",
        }}
      >
        {acceptedCompanies.length > 0 && (
          <div>
            <SwipedMatchList
              matchedCompanies={acceptedCompanies}
              headlineText="Mit Unternehmen im Kontakt"
              onRemove={handleRemoveMatch}
            />
          </div>
        )}
      </div>
      <div
        style={{
          background: "white",
          paddingBottom: "16px",
          paddingTop: "16px",
          marginBottom: "20px",
        }}
      >
        {ignoredCompanies.length > 0 && (
          <div>
            <SwipedMatchList
              matchedCompanies={ignoredCompanies}
              headlineText="Unternehmen die du ignorierst"
              onRemove={handleRemoveMatch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
