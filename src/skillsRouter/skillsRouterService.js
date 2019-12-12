const skillsService = {
  getAllSkills(db) {
    return db("skills_description").select("id", "name", "description");
  },
  getUsersSkills(db, userId) {
    return db("skills")
      .select(
        "skills.level",
        "skills.id",
        "skills.skill_id",
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
  },
  postNewSkill(db, newSkill) {
    return db("skills")
      .insert({
        level: newSkill.level,
        agent_id: newSkill.agent_id,
        skill_id: newSkill.skill_id
      })
      .returning("id");
  }
};

module.exports = skillsService;
