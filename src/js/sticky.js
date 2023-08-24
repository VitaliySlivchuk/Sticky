const notesContainer = document.querySelector("#app");
const addNoteBtn = document.querySelector(".add-note");

addNoteBtn.addEventListener("click", addNote);

getNotes().forEach((note) => {
  const noteElemen = createNote(note.id, note.content);
  notesContainer.insertBefore(noteElemen, addNoteBtn);
});

function getNotes() {
  return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

function saveNotes(notes) {
  return localStorage.setItem("sticky-notes", JSON.stringify(notes));
}

function createNote(id, content) {
  const elemet = document.createElement("textarea");
  elemet.classList.add("note");
  elemet.value = content;
  elemet.placeholder = "Empty content";

  elemet.addEventListener("change", () => {
    updateNote(id, elemet.value);
  });

  return elemet;
}

function addNote() {
  const notes = getNotes();
  const newNote = {
    id: Math.floor(Math.random() * 1000),
    content: "",
  };

  const noteElement = createNote(newNote.id, newNote.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);

  notes.push(newNote);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const target = notes.filter((note) => note.id === id)[0];

  target.content = newContent;
  saveNotes(notes);
}
