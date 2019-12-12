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
      name: "stealth",
      description: "How sneaky you can be"
    },
    {
      name: "driving",
      description: "You can drive anything"
    },
    {
      name: "medical",
      description: "You have medical training"
    },
    {
      name: "intimidation",
      description: "You look scary"
    },
    {
      name: "survival",
      description: "You know the outdoors"
    },
    {
      name: "tracking",
      description: "You can track animals"
    },
    {
      name: "mechanics",
      description: "You can repair and build mechanical equipment"
    },
    {
      name: "chemistry",
      description:
        "You know how to use base ingredients to build special compounds"
    },
    {
      name: "charm",
      description: "People like you. No one knows why"
    },
    {
      name: "gadgets",
      description: "You can work well with all electronic equipment"
    },
    {
      name: "slight of hand",
      description: "You have sticky fingers and quick reflexes"
    },
    {
      name: "biology",
      description: "You know a lot about animals"
    },
    {
      name: "performance",
      description: "You have a knack for showbiz"
    },
    {
      name: "fishing",
      description:
        "You can catch fish, throw line, and gut them with the best of them"
    },
    {
      name: "hunting",
      description:
        "You have skill with a rifle and traps to catch and/or kill animals"
    },
    {
      name: "divining",
      description:
        "You can use two sticks divine the whereabouts of water and other elements"
    },
    {
      name: "religion",
      description:
        "You have knowledge of many different religious beliefs and practices. Including ancient and cult beliefs."
    },
    {
      name: "homeopathy",
      description:
        "All natural medicine that helps the mind more than the physical"
    },
    {
      name: "phycology",
      description: "You understand the inner workings of the mind"
    },
    {
      name: "hand to hand combat",
      description: "You have great hand to hand combat and fighting skills"
    }
  ];
}

function makeItemsDescriptions() {
  return [
    {
      name: "Knife",
      description: "+1 to hand to hand combat",
      cost: 5,
      purchasable: true
    },
    {
      name: "Turkey Bone",
      description: "A bone of a dead fowl. Smells like it too.",
      cost: 1,
      purchasable: true
    },
    {
      name: "Gasoline",
      description: "Petrol, fuel, gas. It makes some things go.",
      purchasable: true,
      cost: 10
    },
    {
      name: "Spot Light",
      description:
        "Shines a lite 100 yards but only in a 10 foot cone. So large that it must be hld with both hands.",
      purchasable: true,
      cost: 100
    },
    {
      name: "Gizzards",
      description: `a muscular, thick-walled part of a bird's stomach for grinding food.`,
      purchasable: true,
      cost: 1
    },
    {
      name: "Tent",
      description: `A small 2 person tent. Possibly rain resistant`,
      purchasable: true,
      cost: 50
    },
    {
      name: "Rope",
      description: `50 feet of rope`,
      purchasable: true,
      cost: 5
    },
    {
      name: "Cheap Backpack",
      description: `Allows you to carry double your weight capacity`,
      purchasable: true,
      cost: 50
    },
    {
      name: "Expensive Backpack",
      description: `Allows you to carry double your weight capacity and have two extra items at the ready.`,
      purchasable: true,
      cost: 150
    },
    {
      name: "Rusted Revolver",
      description: `Rusted shut. It may have zero to 6 bullets in it.`,
      purchasable: true,
      cost: 50
    },
    {
      name: "Native American Totem",
      description: `Six foot tall totem. Origins unknown.`,
      purchasable: true,
      cost: 200
    },
    {
      name: "Bigfoot Postcard",
      description: `Famous local photo of Bigfoot. Photographer Unknown.`,
      purchasable: true,
      cost: 1
    },
    {
      name: "Waterproof Sack",
      description: `Can fit about 10 pounds of items. Things inside the pouch will not get wet.`,
      purchasable: true,
      cost: 35
    },
    {
      name: "Snare Trap",
      description: `The loop of wire is suspended from a branch or small tree and the snare catches an animal by the neck as it is walking along the trail.`,
      purchasable: true,
      cost: 200
    },
    {
      name: "Padded Steel Jaw Traps",
      description: `Snaps onto an animals limbs with some minimal padding`,
      purchasable: true,
      cost: 200
    },
    {
      name: "Steel Jaw Traps",
      description: `Crush animals' limbs and are so painful that animals sometimes mutilate their own bodies in an attempt to free themselves.`,
      purchasable: true,
      cost: 200
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
  preparedUsers = users.map(user => {
    const newUser = Object.assign({}, user);
    delete newUser.id;
    return newUser;
  });
  return db.into("users").insert(preparedUsers);
}

function seedSkillsDescriptions(db, skills) {
  return db.into("skills_description").insert(skills);
}

function seedUsersSkills(db, skills) {
  preparedSkills = skills.map(skill => {
    const newSkill = Object.assign({}, skill);
    delete newSkill.id;
    return newSkill;
  });
  return db.into("skills").insert(preparedSkills);
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
