$(document).ready(() => {
  const app = new App();
  app.attachEventListeners();

  app.adapter.fetchNotes().then(json => {
    json.forEach(note => {
      $("#notes-list").append(new Note(note).renderListItem());
    });
  });
});
