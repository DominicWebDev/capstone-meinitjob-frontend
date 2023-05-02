import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useCompanyStore from "../../slices/CreateCompanySlice";
import useUserStore from "../../slices/CreateUserSlice";
import useSkillStore from "../../slices/CreateSkillSlice";
import { useSession } from "next-auth/react";
import UnswipedMatchList from "../../components/CompanyMatches/MatchLists/UnswipedMatchList";
import matchingAlgorithm from "../../utils/matchingAlgorithm";
import NoMatches from "../../components/CompanyMatches/NoMatches";
import SwipedMatchList from "../../components/CompanyMatches/MatchLists/SwipedMatchList";
import { PulseLoader } from "react-spinners";

const Matches = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [userMatches, setUserMatches] = useState([]);
  const [isFetchingMatches, setIsFetchingMatches] = useState(false);
  const [isAddingMatches, setIsAddingMatches] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isFetchingAfterSwipe, setIsFetchingAfterSwipe] = useState(false);

  /* TODO: DYNAMIC USER ID FROM LOGIN */
  const user_id = session?.frontendUser.id.toString();

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

  let unmatchedCompanies = storeCompanies
    .filter((company) =>
      unmatchedMatches.some(
        (unmatchedMatch) => unmatchedMatch.fk_company_id === company.id
      )
    )
    .map((company) => ({
      ...company,
      match_id: unmatchedMatches.find(
        (unmatchedMatch) => unmatchedMatch.fk_company_id === company.id
      ).id,
    }));

  const getUnmatchedCompanies = () => {
    const unmatchedMatches = userMatches.filter(
      (match) => match.match_status === "unmatched"
    );

    return (unmatchedCompanies = storeCompanies
      .filter((company) =>
        unmatchedMatches.some(
          (unmatchedMatch) => unmatchedMatch.fk_company_id === company.id
        )
      )
      .map((company) => ({
        ...company,
        match_id: unmatchedMatches.find(
          (unmatchedMatch) => unmatchedMatch.fk_company_id === company.id
        ).id,
      })));
  };

  const resetAndFetchData = () => {
    setUserMatches([]);
    setRefreshCounter((prev) => prev + 1);
  };

  /* ACCEPT */
  const handleSwipedRight = (matchId) => {
    /*  setIsFetchingAfterSwipe(true); */
    storeUpdateMatch(matchId, "accepted").then(() => {
      /* setUserMatches([]); */
      resetAndFetchData();
      /*   setTimeout(() => {
        setIsFetchingAfterSwipe(false);
      }, 800); */
    });

    toast.success("Unternehmen akzeptiert!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    });
    toast.clearWaitingQueue();
  };

  /* IGNORE */
  const handleSwipedLeft = (matchId) => {
    /* setIsFetchingAfterSwipe(true); */
    storeUpdateMatch(matchId, "ignored").then(() => {
      /* setUserMatches([]); */
      resetAndFetchData();
      /*  setTimeout(() => {
        setIsFetchingAfterSwipe(false);
      }, 800); */
    });

    toast.success("Unternehmen ignoriert!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    });
    toast.clearWaitingQueue();
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
  }, [refreshCounter]);

  useEffect(() => {
    /* IF MATCHES HAVE RECENTLY BEEN FETCHED AND USESTATE IS EMPTY AND NEW MATCHES ARE IN STORE FROM DB */
    /* TODO: WHAT ABOUT THE CASE WHERE USER MATCHES NEEDED TO UPDATE BUT USERMATCHES ALREADY HAVE A LENGTH? */
    if (isFetchingMatches && !userMatches.length && storeMatches.length) {
      const myStoreMatches = storeMatches.filter(
        (match) => +match.fk_user_id === +user_id
      );

      /*  setUserMatches(myStoreMatches); */
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
      storeMatches &&
      !isFetchingMatches
    ) {
      let foundAlgoMatches = matchingAlgorithm(
        storeSelectedUser,
        storeUserSkills,
        storeSkills,
        storeCompanies,
        storeAllCompanySkills
      );

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
      } else {
        if (!isAddingMatches) {
          foundAlgoMatches.forEach((matchedCompany) => {
            setIsAddingMatches(true);
            storeAddMatch(user_id, matchedCompany.id).then(() => {
              handleFetchMatches();
            });
          });
        }

        if (!isAddingMatches) {
          setIsAddingMatches(false);
        }

        /* TODO: SEND A REQUEST TO THE BACKEND TO ADD THE NEW RECOGNIZED MATCHES TO THE DATABASE */
        /* TODO: THEN REFETCH THE MATCHES FROM THE DATABASE */
      }

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
    refreshCounter,
  ]);

  useEffect(() => {
    if (!session) {
      router.replace(
        `/api/auth/signin?callbackUrl=${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`
      );
    }
  }, [session, router]);

  return (
    <div style={{ marginBottom: "40px", overflowX: "hidden" }}>
      <div>
        {!isFetchingAfterSwipe ? (
          storeCompanies
            .filter((company) =>
              storeMatches
                .filter(
                  (match) =>
                    match.match_status === "unmatched" &&
                    +match.fk_user_id === +user_id
                )
                .some(
                  (unmatchedMatch) =>
                    unmatchedMatch.fk_company_id === company.id
                )
            )
            .map((company) => ({
              ...company,
              match_id: storeMatches
                .filter(
                  (match) =>
                    match.match_status === "unmatched" &&
                    +match.fk_user_id === +user_id
                )
                .find(
                  (unmatchedMatch) =>
                    unmatchedMatch.fk_company_id === company.id
                ).id,
            })).length > 0 ? (
            <div
              style={{
                background: "white",
                paddingBottom: "22px",
                paddingTop: "16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "900",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                Du hast ein Match!
              </div>
              <UnswipedMatchList
                bestUnswipedMatchCompany={
                  storeCompanies
                    .filter((company) =>
                      storeMatches
                        .filter(
                          (match) =>
                            match.match_status === "unmatched" &&
                            +match.fk_user_id === +user_id
                        )
                        .some(
                          (unmatchedMatch) =>
                            unmatchedMatch.fk_company_id === company.id
                        )
                    )
                    .map((company) => ({
                      ...company,
                      match_id: storeMatches
                        .filter(
                          (match) =>
                            match.match_status === "unmatched" &&
                            +match.fk_user_id === +user_id
                        )
                        .find(
                          (unmatchedMatch) =>
                            unmatchedMatch.fk_company_id === company.id
                        ).id,
                    }))
                    .sort((a, b) => b.matchingScore - a.matchingScore)[0]
                }
                onSwipedLeft={handleSwipedLeft}
                onSwipedRight={handleSwipedRight}
              />
            </div>
          ) : (
            <NoMatches />
          )
        ) : (
          <div
            style={{
              height: "445.5px",
              width: "100vw",
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PulseLoader color="#f85440" speedMultiplier={0.5} />
          </div>
        )}
      </div>
      <div>
        {storeCompanies.filter((company) =>
          storeMatches
            .filter(
              (match) =>
                match.match_status === "accepted" &&
                +match.fk_user_id === +user_id
            )
            .some(
              (ignoredUserMatch) =>
                ignoredUserMatch.fk_company_id === company.id
            )
        ).length > 0 && (
          <div
            style={{
              background: "white",
              paddingBottom: "16px",
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <SwipedMatchList
              matchedCompanies={storeCompanies.filter((company) =>
                storeMatches
                  .filter(
                    (match) =>
                      match.match_status === "accepted" &&
                      +match.fk_user_id === +user_id
                  )
                  .some(
                    (acceptedUserMatch) =>
                      +acceptedUserMatch.fk_company_id === +company.id
                  )
              )}
              headlineText="Mit Unternehmen im Kontakt"
              onRemove={handleRemoveMatch}
            />
          </div>
        )}
      </div>
      <div>
        {storeCompanies.filter((company) =>
          storeMatches
            .filter(
              (match) =>
                match.match_status === "ignored" &&
                +match.fk_user_id === +user_id
            )
            .some(
              (ignoredUserMatch) =>
                ignoredUserMatch.fk_company_id === company.id
            )
        ).length > 0 && (
          <div
            style={{
              background: "white",
              paddingBottom: "16px",
              paddingTop: "16px",
              marginBottom: "20px",
            }}
          >
            <SwipedMatchList
              matchedCompanies={storeCompanies.filter((company) =>
                storeMatches
                  .filter(
                    (match) =>
                      match.match_status === "ignored" &&
                      +match.fk_user_id === +user_id
                  )
                  .some(
                    (ignoredUserMatch) =>
                      ignoredUserMatch.fk_company_id === company.id
                  )
              )}
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
