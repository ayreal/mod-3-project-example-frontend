class Adapter {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }
  fetchNotes() {
    return fetch(`${this.baseUrl}/api/v1/notes`).then(res => res.json());
    // this is a promise object
  }

  updateNote(id, body) {
    return fetch(`${this.baseUrl}/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(body)
    }).then(res => res.json());
  }
}
