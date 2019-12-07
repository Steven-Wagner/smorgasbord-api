const notesService = {
  getUsersNotes(db, userId) {
    return db("notes")
      .select("*")
      .where("notes.agent_id", userId);
  },
  deleteNote(db, noteId, userId) {
    return db("notes")
      .where("id", noteId)
      .where("agent_id", userId)
      .update({
        active: false
      });
  },
  checkNotesExists(db, name) {
    return db("notes_description")
      .select("id")
      .where("name", name)
      .first();
  },
  insertNewNote(db, description, userId) {
    return db("notes")
      .insert({
        agent_id: userId,
        description: description,
        active: true
      })
      .returning("id");
  }
};

module.exports = notesService;
