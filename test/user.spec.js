const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("user Endpoints", function() {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[2];

  const testSkillDescriptions = helpers.makeSkillsDescriptions();

  const testSkills = helpers.makeSkillsArray();

  const testItems = helpers.makeItemsArray();

  const testItemsDescriptions = helpers.makeItemsDescriptions();

  const testNotes = helpers.makeNotesArray();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
    return db;
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", async function() {
    await helpers.cleanTables(db);
  });

  afterEach("cleanup", async function() {
    return await helpers.cleanTables(db);
  });

  describe("GET /api/user/{id}", () => {
    context("Happy path", () => {
      beforeEach("insert users", async function() {
        return await helpers.seedUsers(db, testUsers);
      });
      it(`Responds 200 and returns user info`, () => {
        const userId = testUser.id;

        return request(app)
          .get(`/api/user/${userId}`)
          .expect(200)
          .then(res => {
            delete res.body.date_created;
            expect(res.body).to.eql(testUser);
          });
      });
    });
  });
  describe("GET /api/auth/login", () => {
    context("Happy path", () => {
      beforeEach("insert users", async function() {
        return await helpers.seedUsers(db, testUsers);
      });
      it(`Responds 200 and returns user id`, () => {
        const userUsername = testUser.username;
        const userPassword = testUser.password;

        return request(app)
          .post(
            `/api/auth/login/?username=${userUsername}&password=${userPassword}`
          )
          .expect(200)
          .then(res => {
            expect(res.body.userId).to.eql(3);
          });
      });
    });
  });
  describe("GET /api/user/edit", () => {
    context("Happy path", () => {
      beforeEach("insert users", async function() {
        return await helpers.seedUsers(db, testUsers);
      });

      const fieldsToTest = [
        "money",
        "health",
        "insanity",
        "intelligence",
        "athleticism",
        "lore",
        "investigation"
      ];

      fieldsToTest.forEach(field => {
        it(`Responds 200 and user's ${field} is updated`, () => {
          testUser[field] = "10";

          return request(app)
            .post(`/api/user/edit/`)
            .send({ userInfo: testUser })
            .expect(200)
            .then(res => {
              return request(app)
                .get(`/api/user/${testUser.id}`)
                .then(res => {
                  delete res.body.date_created;
                  res.body.money = parseInt(res.body.money).toString();
                  expect(res.body).to.eql(testUser);
                });
            });
        });
      });
    });
  });
  describe("GET /api/skills/", () => {
    context("Happy path", () => {
      beforeEach("insert users", async function() {
        return await helpers.seedUsers(db, testUsers);
      });
      beforeEach("insert skills descriptions", async function() {
        return await helpers.seedSkillsDescriptions(db, testSkillDescriptions);
      });
      beforeEach("insert users skills", async function() {
        return await helpers.seedUsersSkills(db, testSkills);
      });
      it(`Responds 200 and returns all skills`, () => {
        return request(app)
          .get(`/api/skills/`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
          });
      });
      it(`responds 200 and returns user's skills`, () => {
        const userId = testUser.id;
        return request(app)
          .get(`/api/skills/1`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body).to.have.length(2);
          });
      });
      it(`responds 200 and skill is updated`, () => {
        return request(app)
          .post(`/api/skills/1/10`)
          .expect(200)
          .then(res => {
            return request(app)
              .get(`/api/skills/1`)
              .then(res => {
                const changedSkill = res.body.find(skill => {
                  if (skill.id === 1) {
                    return true;
                  } else {
                    return false;
                  }
                });
                expect(changedSkill.level).to.eql(10);
              });
          });
      });
    });
  });
  describe("GET /api/inventory/", () => {
    context("Happy path", () => {
      beforeEach("insert users", async function() {
        return await helpers.seedUsers(db, testUsers);
      });
      beforeEach("insert items descriptions", async function() {
        return await helpers.seedItemsDescriptions(db, testItemsDescriptions);
      });
      beforeEach("insert users items", async function() {
        return await helpers.seedUsersItems(db, testItems);
      });
      it(`Responds 200 and returns all users inventory`, () => {
        const userId = testUser.id;
        return request(app)
          .get(`/api/inventory/${userId}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body).to.have.length("2");
          });
      });
      it(`Responds 200 and quantity is changed`, () => {
        const userId = testUser.id;
        return request(app)
          .patch(`/api/inventory/1/10`)
          .expect(200)
          .then(res => {
            return request(app)
              .get(`/api/inventory/${userId}`)
              .then(res => {
                const changedItem = res.body.find(item => {
                  if (item.id === 1) {
                    return true;
                  } else {
                    return false;
                  }
                });
                expect(changedItem.quantity).to.eql(10);
              });
          });
      });
      it(`Responds 201 and brand new item is created`, () => {
        const userId = testUser.id;
        return request(app)
          .post(`/api/inventory/${userId}`)
          .send({
            name: "Steve",
            description: "A person",
            quantity: "10"
          })
          .expect(201)
          .then(newId => {
            return request(app)
              .get(`/api/inventory/${userId}`)
              .then(res => {
                const newItem = res.body.find(item => {
                  if (item.id === newId.body[0]) {
                    return true;
                  } else {
                    return false;
                  }
                });
                expect(newItem.name).to.eql("Steve");
              });
          });
      });
    });
  });
  describe("GET /api/notes/", () => {
    context("Happy path", () => {
      beforeEach("insert users", async function() {
        return await helpers.seedUsers(db, testUsers);
      });
      beforeEach("insert notes", async function() {
        return await helpers.seedNotes(db, testNotes);
      });

      it(`Responds 200 and returns all users notes`, () => {
        const userId = testUser.id;
        return request(app)
          .get(`/api/notes/${userId}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.a("array");
            expect(res.body).to.have.length("3");
          });
      });
      it(`Responds 200 and note is deleted`, () => {
        const userId = testUser.id;
        return request(app)
          .delete(`/api/notes/1/3`)
          .expect(200)
          .then(res => {
            return request(app)
              .get(`/api/notes/${userId}`)
              .then(res => {
                const changedNote = res.body.find(note => {
                  if (note.id === 1) {
                    return true;
                  } else {
                    return false;
                  }
                });
                expect(changedNote.active).to.eql(false);
              });
          });
      });
      it(`Responds 201 and brand new note is created`, () => {
        const userId = testUser.id;
        return request(app)
          .post(`/api/notes/${userId}`)
          .send({
            description: "A test description"
          })
          .expect(201)
          .then(newId => {
            return request(app)
              .get(`/api/notes/${userId}`)
              .then(res => {
                const newNote = res.body.find(note => {
                  if (note.id === newId.body[0]) {
                    return true;
                  } else {
                    return false;
                  }
                });
                expect(newNote.description).to.eql("A test description");
              });
          });
      });
    });
  });
});
