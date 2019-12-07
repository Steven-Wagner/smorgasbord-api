const skillsService = {
  getAllSkills(db) {
    return db("skills_description").select("id", "name");
  },
  getUsersSkills(db, userId) {
    return db("skills")
      .select(
        "skills.level",
        "skills.id",
        "skills_description.name",
        "skills_description.description"
      )
      .join("skills_description", "skills.skill_id", "skills_description.id")
      .where("skills.agent_id", userId);
  },
  postUpdateSkill(db, skillId, level) {
    return db("skills")
      .where("id", skillId)
      .update({
        level: level
      });
  }
};

module.exports = skillsService;
