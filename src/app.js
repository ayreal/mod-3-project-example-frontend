class App {
  attachEventListeners() {
    $("#notes-list").on("click", "button", e => {
      const id = parseInt(e.target.dataset.id);
      const note = Note.findById(id);
      $("#update").html(note.renderUpdateForm());

      $("#update").on("submit", "form", e => {
        e.preventDefault();
        const id = parseInt(e.target.dataset.id);
        const note = Note.findById(id);
        const title = $(e.target)
          .find("input")
          .val();
        const content = $(e.target)
          .find("textarea")
          .val();
        // debugger;

        const bodyJSON = { title, content };
        fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(bodyJSON)
        })
          .then(res => res.json())
          .then(updatedNote => console.log(updatedNote));
      });
    });
  }
}
