class App {
  constructor() {
    this.adapter = new Adapter();

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.createNotes = this.createNotes.bind(this);
    this.addNotes = this.addNotes.bind(this);
  }

  attachEventListeners() {
    $("#notes-list").on("click", "button", this.handleEditClick);
    $("#update").on("submit", "form", this.handleFormSubmit);
  }

  // notice the previous functionality is broken up
  // into two different methods for future re-use...
  createNotes(notes) {
    notes.forEach(note => {
      new Note(note);
    });
    this.addNotes();
  }

  addNotes() {
    $("#notes-list").empty(); /* clear out whatever is there */
    Note.all.forEach(note => $("#notes-list").append(note.renderListItem()));
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const id = parseInt(e.target.dataset.id);
    const note = Note.findById(id);
    const title = $(e.target)
      .find("input")
      .val();
    const content = $(e.target)
      .find("textarea")
      .val();

    const bodyJSON = { title, content };
    this.adapter.updateNote(note.id, bodyJSON).then(updatedNote => {
      const note = Note.findById(updatedNote.id);
      note.update(updatedNote);
      this.addNotes();
    });
  }

  handleEditClick(e) {
    const id = parseInt(e.target.dataset.id);
    const note = Note.findById(id);
    $("#update").html(note.renderUpdateForm());
  }
}
