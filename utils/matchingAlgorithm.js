/** This function calculated the matching of a user to all companies.
 * It returns an array of matching companies with a matchingScore
 *  indicating wether the company is a good match or isn't.  */
const matchingAlgorithm = (
  selectedUser,
  userSkills,
  allSkills,
  companies,
  allCompanySkills
) => {
  console.log(selectedUser, "selectedUser HERE");
  console.log(userSkills, "userSkills HERE");
  console.log(allSkills, "allSkills HERE");
  console.log(companies, "companies HERE");
  console.log(allCompanySkills, "allCompanySkills HERE");

  const unacceptedMatchedCompanies = [];

  companies.forEach((company) => {
    console.log(company, `JETZT GEHT ES UM DIESE COMPANY ${company.id}`);

    let isCompanyMatching = false;
    let matchingScore = 0;

    /* FILTER  FOR CURRENT COMPANY */
    /*  [{id: x, fk_skill_id: x, fk_company_id: x},...] */
    const currentCompanySkills = allCompanySkills.filter(
      (companySkill) => +companySkill.fk_company_id === +company.id
    );

    console.log(
      currentCompanySkills,
      "currentCompanySkills VON COMPANY",
      company
    );

    /* MATCHING FÜR SKILLS */
    let matchedSkillCounter = 0;

    /* storeUserSkills  [{id: x, fK_user_id: x, fk_skill_id: x}] */
    userSkills.map((userSkill) => {
      if (isCompanyMatching) return;

      console.log("!!!userSkill INTERN MATCHING SKILLS", userSkill);
      console.log(
        "!!!currentCompanySkills INTERN MATCHING SKILLS",
        currentCompanySkills
      );

      /* TODO: MATCHINGSCORE JEDER GEMATCHES SKILL ERHÖHT DIE SCORE */

      /* TODO: WIR MÜSSEN MEHR ÜBER DIE SKILLS WISSEN ALS NUR DIE ID. WIR BRAUCHEN FÜR EINEN REALEN SKILL (NAME) ALLE LEVEL MIT ID. DANN GUCKEN WIR OB 
      DEIN USERSKILL MINDESTENS SO HOCH IST ODER HÖHER IST ALS DER GESUCHTE COMPANYSKILL*/

      /* FÜR DIESEN USERSKILL SEIN NAME ALLE SKILLS ALS ARRAY MIT OBJECT */

      console.log("----  CURRENT userSkill", userSkill);
      console.log("----  CURRENT allSkills", allSkills);

      const currentUserSkillBelongingSkills = allSkills.filter(
        (skill) => userSkill.skill_name === skill.name
      );

      console.log(
        "!!!currentUserSkillBelongingSkills INTERN",
        currentUserSkillBelongingSkills
      );

      isCompanyMatching = currentCompanySkills.some((companySkill) => {
        console.log("???? ICH CHECKE OB DIE COMPANY SKILLS MATCHEN");
        /* NUR DIE COMPANYSKILLS DIE ZU MEINEM SKILL GEHÖREN */

        console.log(">>>>>> HIER IST DIE STELLE companySkill", companySkill);
        const isCompanySkillInUserSkillBelongingSkills =
          currentUserSkillBelongingSkills.some(
            (currentUserSkillBelongingSkill) =>
              currentUserSkillBelongingSkill.id === companySkill.fk_skill_id
          );

        if (isCompanySkillInUserSkillBelongingSkills) {
          /* TODO: FÜR JEDEN SKILL MATCHSCORE ERHÖHEN */
          const matchedSkillCountArray = currentUserSkillBelongingSkills.filter(
            (currentUserSkillBelongingSkill) =>
              currentUserSkillBelongingSkill.id === companySkill.fk_skill_id
          );

          console.log("???? matchedSkillCountArray", matchedSkillCountArray);

          matchedSkillCountArray.forEach(() => {
            matchedSkillCounter += 1;
          });
        }

        console.log(
          "???? isCompanySkillInUserSkillBelongingSkills",
          isCompanySkillInUserSkillBelongingSkills
        );

        let isSkillLevelMatching = false;

        if (isCompanySkillInUserSkillBelongingSkills) {
          /* LEVEL MUSS HÖHER ODER GLEICH SEIN */

          console.log("???? ICH CHECKE OB MEIN SKILL LEVEL HÖHER IST");

          const myUserSkillLevel = userSkill.skill_level;
          console.log("myUserSkillLevel", myUserSkillLevel);

          const foundCompanySkillArray = allSkills.filter(
            (skill) => companySkill.fk_skill_id === skill.id
          );

          const companySkillLevel = foundCompanySkillArray[0].level;
          console.log("companySkillLevel", companySkillLevel);

          isSkillLevelMatching = myUserSkillLevel >= companySkillLevel;
        }

        return isSkillLevelMatching;
      });
      /* console.log("isCompanyMatching", isCompanyMatching) */
    });

    console.log(
      "ICH BIN JETZT NACH DEN SKILLS UND ES MATCH?",
      isCompanyMatching
    );

    matchingScore = matchingScore + matchedSkillCounter;

    /* MATCHING FÜR REMOTE - NUR WENN VORHER DIE SKILLS GEMATCHED HABEN */
    if (isCompanyMatching) {
      console.log(company.remote, "!!!!!company.remote");
      console.log(selectedUser.pref_remote, "!!!!!selectedUser.pref_remote");
      isCompanyMatching = company.remote === selectedUser.pref_remote;

      if (isCompanyMatching) matchingScore += 1;
    }

    /* TODO: MATCHING FÜR SECTOR !!!NUR FÜR MATCHING SCORE */
    if (isCompanyMatching) {
      /* console.log(company.remote, "!!!!!company.remote");
      console.log(selectedUser.pref_remote, "!!!!!selectedUser.pref_remote"); */

      if (company.sector === selectedUser.pref_sector) matchingScore += 1;
    }

    /* TODO: MATCHING FÜR COMPANY SIZE !!!NUR FÜR MATCHING SCORE */
    /* TODO: ALLE MITARBEITERANZAHLE KLASSIFIZIEREN ALS ARRAY  constEmployeeCountTypesArray = [10, 100, 250, 500, 1000, 999999] */
    /* TODO: FÜR DEN USER EINORDNEN WELCHE KLASSIFIZIERUNG FÜR IHN GILT IM ARRAY. FÜR DIE COMPANY AUCH DAS MACHEN */
    /* WENN BEIDE KLASSIFIZIERTEN WERTE GLEICH SIND ERHÖHE MATCHINGSCORE UM 1 */

    console.log("JETZT BIN ICH AM ENDE UND ES MATCH?", isCompanyMatching);
    console.log("MEIN MATCHINGSCORE IST: ", matchingScore);

    if (isCompanyMatching) {
      company.matchingScore = matchingScore;
      unacceptedMatchedCompanies.push(company);
    }
  });

  return unacceptedMatchedCompanies;
};

export default matchingAlgorithm;