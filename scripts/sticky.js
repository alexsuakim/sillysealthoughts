import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://orstofmyjmznjtiuilvf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc3RvZm15am16bmp0aXVpbHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzU3OTksImV4cCI6MjA2Mjk1MTc5OX0.0csRR2N4IB4j7vuTtPct6qKmi5ktGm8--cjJAgKMMbk'
);

const board = document.getElementById("board");
const popup = document.getElementById("popup-form");
const noteForm = document.getElementById("note-form");
const addButton = document.getElementById("add-note-btn");
const colorSelect = document.getElementById("note-color");

let draftNote = null;

addButton.addEventListener("click", () => {
  popup.style.display = "none";
  addButton.style.display = "none";

  draftNote = document.createElement("div");
  draftNote.className = "sticky-note";
  draftNote.contentEditable = true;
  draftNote.style.background = colorSelect.value;
  draftNote.style.left = `${window.innerWidth - 240}px`;
  draftNote.style.top = `${window.innerHeight - 240}px`;
  draftNote.style.position = "absolute";
  board.appendChild(draftNote);
  makeDraggable(draftNote);

  popup.style.display = "block";
});

colorSelect.addEventListener("change", () => {
  if (draftNote) {
    draftNote.style.background = colorSelect.value;
  }
});

noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const color = colorSelect.value;
  const text = document.getElementById("note-text").value.trim();
  if (!text) return;

  const x = parseInt(draftNote.style.left);
  const y = parseInt(draftNote.style.top);

  const { error } = await supabase.from("notes").insert({
    text,
    color,
    x,
    y,
    timestamp: new Date().toISOString()
  });

  if (error) {
    alert("Failed to save note 😿");
    console.error(error);
  } else {
    popup.style.display = "none";
    addButton.style.display = "block";
    noteForm.reset();
    draftNote.remove();
    loadNotes();
  }
});

async function loadNotes() {
  board.innerHTML = "";
  const { data: notes, error } = await supabase.from("notes").select("*");
  if (error) {
    console.error("Couldn't load notes!", error);
    return;
  }

  notes
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .forEach((note) => {
      const noteEl = document.createElement("div");
      noteEl.className = "sticky-note";
      noteEl.textContent = note.text;
      noteEl.style.background = note.color || "#b0e0e6";
      noteEl.style.left = `${note.x}px`;
      noteEl.style.top = `${note.y}px`;
      noteEl.style.position = "absolute";
      board.appendChild(noteEl);
      makeDraggable(noteEl, note.id);
    });
}

function makeDraggable(noteEl, id = null) {
  let isDragging = false;
  let offsetX = 0,
      offsetY = 0;

  noteEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    noteEl.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    noteEl.style.left = `${e.pageX - offsetX}px`;
    noteEl.style.top = `${e.pageY - offsetY}px`;
  });

  document.addEventListener("mouseup", async () => {
    if (!isDragging) return;
    isDragging = false;
    noteEl.style.zIndex = "";

    if (id) {
      const { error } = await supabase.from("notes").update({
        x: parseInt(noteEl.style.left),
        y: parseInt(noteEl.style.top),
      }).eq("id", id);

      if (error) console.error("Failed to update position", error);
    }
  });
}

window.onload = loadNotes;