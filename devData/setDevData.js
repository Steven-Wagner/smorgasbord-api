const knex = require("knex");
const app = require("../src/app");
const helpers = require("../test/test-helpers");

db = knex({
  client: "pg",
  connection: process.env.TEST_DATABASE_URL
});
// app.set("db", db);

setDevData().then(() => {
  console.log("running this code");
  db.destroy();
  return;
});

async function setDevData() {
  const testUsers = helpers.makeUsersArray();

  const testSkillDescriptions = helpers.makeSkillsDescriptions();

  const testSkills = helpers.makeSkillsArray();

  const testItems = helpers.makeItemsArray();

  const testItemsDescriptions = helpers.makeItemsDescriptions();

  const testNotes = helpers.makeNotesArray();

  await helpers.cleanTables(db);
  await helpers.seedUsers(db, testUsers);
  await helpers.seedSkillsDescriptions(db, testSkillDescriptions);
  await helpers.seedUsersSkills(db, testSkills);
  await helpers.seedItemsDescriptions(db, testItemsDescriptions);
  await helpers.seedUsersItems(db, testItems);
  await helpers.seedNotes(db, testNotes);
}
