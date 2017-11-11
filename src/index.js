$(document).ready(() => {
  const app = new App();
  app.attachEventListeners();

  fetch("http://localhost:3000/api/v1/notes")
    .then(res => res.json())
    .then(json => {
      json.forEach(note => {
        $("#notes-list").append(new Note(note).renderListItem());
      });
    });
});
