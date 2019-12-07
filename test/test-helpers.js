function makeUsersArray() {
  return [
    {
      id: 1,
      username: "Tester",
      description: "A test description",
      password: "password",
      money: "150.00",
      health: "4",
      insanity: "0",
      intelligence: "1",
      athleticism: "0",
      lore: "1",
      investigation: "2"
    },
    {
      id: 2,
      username: "Tester2",
      description: "A test description2",
      password: "password2",
      money: "150.00",
      health: "2",
      insanity: "2",
      intelligence: "2",
      athleticism: "2",
      lore: "2",
      investigation: "2"
    },
    {
      id: 3,
      username: "Tester3",
      description: "A test description3",
      password: "password3",
      money: "153.00",
      health: "4",
      insanity: "0",
      intelligence: "1",
      athleticism: "0",
      lore: "1",
      investigation: "2"
    }
  ];
}

function makeSkillsArray() {
  return [
    {
      id: "1",
      agent_id: "1",
      skill_id: "1",
      level: "1"
    },
    {
      id: "2",
      agent_id: "1",
      skill_id: "2",
      level: "2"
    },
    {
      id: "3",
      agent_id: "2",
      skill_id: "2",
      level: "1"
    }
  ];
}

function makeSkillsDescriptions() {
  return [
    {
      id: 1,
      name: "Driving",
      description: "You can drive good"
    },
    {
      id: 2,
      name: "Fighting",
      description: "You can fight good"
    },
    {
      id: 3,
      name: "Smiling",
      description: "You can smile good"
    }
  ];
}

function makeItemsDescriptions() {
  return [
    {
      id: 1,
      name: "stick",
      description: "Its a stick",
      cost: "1",
      purchasable: true
    },
    {
      id: 2,
      name: "rock",
      description: "Its a rock",
      cost: "2",
      purchasable: true
    }
  ];
}

function makeItemsArray() {
  return [
    {
      id: 1,
      agent_id: "3",
      item_id: "1",
      quantity: "1"
    },
    {
      id: 2,
      agent_id: "3",
      item_id: "2",
      quantity: "2"
    },
    {
      id: 3,
      agent_id: "2",
      item_id: "1",
      quantity: "1"
    }
  ];
}

function makeNotesArray() {
  return [
    {
      id: 1,
      agent_id: 3,
      description: "this is the first note",
      active: true
    },
    {
      id: 2,
      agent_id: 3,
      description: "this is the second note",
      active: false
    },
    {
      id: 3,
      agent_id: 3,
      description: "this is the third note",
      active: true
    },
    {
      id: 4,
      agent_id: 2,
      description: "this is the fourth note",
      active: true
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      skills,
      items,
      items_description,
      notes,
      users,
      skills_description
      RESTART IDENTITY CASCADE`
  );
}

function seedNotes(db, notes) {
  preparedNotes = notes.map(note => {
    const newNote = Object.assign({}, note);
    delete newNote.id;
    return newNote;
  });
  return db.into("notes").insert(preparedNotes);
}

function seedUsers(db, users) {
  return db.into("users").insert(users);
}

function seedSkillsDescriptions(db, skills) {
  return db.into("skills_description").insert(skills);
}

function seedUsersSkills(db, skills) {
  return db.into("skills").insert(skills);
}

function seedUsersItems(db, items) {
  preparedItems = items.map(item => {
    const newItem = Object.assign({}, item);
    delete newItem.id;
    return newItem;
  });
  return db.into("items").insert(preparedItems);
}

function seedItemsDescriptions(db, items) {
  preparedItemsDescription = items.map(item => {
    const newItem = Object.assign({}, item);
    delete newItem.id;
    return newItem;
  });
  return db.into("items_description").insert(preparedItemsDescription);
}

module.exports = {
  makeUsersArray,
  cleanTables,
  seedUsers,
  seedSkillsDescriptions,
  seedUsersSkills,
  makeSkillsArray,
  makeSkillsDescriptions,
  makeItemsArray,
  makeItemsDescriptions,
  seedItemsDescriptions,
  seedUsersItems,
  seedNotes,
  makeNotesArray
};
