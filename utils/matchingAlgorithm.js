/** A function to find matches between a user and all companies via the user skills and user preferences.
 * It returns an array of company objects extended by a matchingScore key or returns an empty array.
 * The matchingScore is a number which is higher the better a company matches the user.
 * To match a user with a company a user needs at least one skill that is on the same or higher level than the company searches for.
 * Also if a company does not offer remote and a user wants to work remote this company will not match even if they match with their skills.
 * Every skill that fits will increase the matchingScore by 1  */
const matchingAlgorithm = (
  selectedUser,
  userSkills,
  allSkills,
  companies,
  allCompanySkills
) => {
  const unacceptedMatchedCompanies = [];
  companies.forEach((company) => {
    let isCompanyMatching = false;
    let matchingScore = 0;

    /* FILTER ALL COMPANIESSKILLS TO COMPANYSKILLS OF THE CURRENT COMPANY [{id: x, fk_skill_id: x, fk_company_id: x},...] */
    const currentCompanySkills = allCompanySkills.filter(
      (companySkill) => +companySkill.fk_company_id === +company.id
    );

    /* --START MATCH SKILLS-- (Excludes matches and increases matchingScore) */
    let matchedSkillCounter = 0;

    /* storeUserSkills  [{id: x, fK_user_id: x, fk_skill_id: x}] */
    userSkills.map((userSkill) => {
      if (isCompanyMatching) return;

      /* FILTER ALL SKILLS FOR USER SKILLS */
      const currentUserSkillBelongingSkills = allSkills.filter(
        (skill) => userSkill.skill_name === skill.name
      );

      isCompanyMatching = currentCompanySkills.some((companySkill) => {
        /* NUR DIE COMPANYSKILLS DIE ZU MEINEM SKILL GEHÖREN */

        const isCompanySkillInUserSkillBelongingSkills =
          currentUserSkillBelongingSkills.some(
            (currentUserSkillBelongingSkill) =>
              currentUserSkillBelongingSkill.id === companySkill.fk_skill_id
          );

        /* ONLY OF THE CURRENT COMPANY HAS ANY SKILL THAT IS   */
        if (isCompanySkillInUserSkillBelongingSkills) {
          const matchedSkillCountArray = currentUserSkillBelongingSkills.filter(
            (currentUserSkillBelongingSkill) =>
              currentUserSkillBelongingSkill.id === companySkill.fk_skill_id
          );

          /* INCREASES MATCHSCORE BY 1 FOR EACH FOUND MATCHING USER SKILL THAT IS EQUAL OR HIGHER THAN THE COMPANY SEARCHES FOR */
          matchedSkillCountArray.forEach(() => {
            matchedSkillCounter += 1;
          });
        }

        let isSkillLevelMatching = false;

        if (isCompanySkillInUserSkillBelongingSkills) {
          /* LEVEL MUSS HÖHER ODER GLEICH SEIN */

          const myUserSkillLevel = userSkill.skill_level;

          const foundCompanySkillArray = allSkills.filter(
            (skill) => companySkill.fk_skill_id === skill.id
          );

          const companySkillLevel = foundCompanySkillArray[0].level;

          isSkillLevelMatching = myUserSkillLevel >= companySkillLevel;
        }

        return isSkillLevelMatching;
      });
    });

    matchingScore = matchingScore + matchedSkillCounter;
    /* --END MATCH SKILLS-- */

    /* --START MATCH REMOTE-- (Excludes matches and increases matchingScore) */
    /* Only relevant if the user got any matching skills */
    if (isCompanyMatching) {
      isCompanyMatching = company.remote === selectedUser.pref_remote;
      if (isCompanyMatching) matchingScore += 1;
    }
    /* --END MATCH SKILLS-- */

    /* --START MATCH SECTOR-- (Increases matchingScore) */
    /* Only relevant if the user got any matching skills */
    if (isCompanyMatching) {
      if (company.sector === selectedUser.pref_sector) matchingScore += 1;
    }

    /* --END MATCH SECTOR-- */

    /* --START MATCH COMPANYSIZE-- */

    /* TODO: ALLE MITARBEITERANZAHLE KLASSIFIZIEREN ALS ARRAY  constEmployeeCountTypesArray = [10, 100, 250, 500, 1000, 999999] */
    /* TODO: FÜR DEN USER EINORDNEN WELCHE KLASSIFIZIERUNG FÜR IHN GILT IM ARRAY. FÜR DIE COMPANY AUCH DAS MACHEN */
    /* WENN BEIDE KLASSIFIZIERTEN WERTE GLEICH SIND ERHÖHE MATCHINGSCORE UM 1 */

    /* --END MATCH COMPANYSIZE-- */

    if (isCompanyMatching) {
      company.matchingScore = matchingScore;
      unacceptedMatchedCompanies.push(company);
    }
  });

  return unacceptedMatchedCompanies;
};

export default matchingAlgorithm;
