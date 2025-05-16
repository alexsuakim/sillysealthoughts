import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase setup
const supabaseUrl = 'https://orstofmyjmznjtiuilvf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc3RvZm15am16bmp0aXVpbHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzU3OTksImV4cCI6MjA2Mjk1MTc5OX0.0csRR2N4IB4j7vuTtPct6qKmi5ktGm8--cjJAgKMMbk'; 
const supabase = createClient(supabaseUrl, supabaseKey);

const board = document.getElementById("board");
const popup = document.getElementById("popup-form");
const noteForm = document.getElementById("note-form");
const addButton = document.getElementById("add-note-btn");

addButton.addEventListener("click", () => {
  popup.style.display = "block";
});

noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const color = document.getElementById("note-color").value;
  const text = document.getElementById("note-text").value.trim();
  if (!text) return;

  const { error } = await supabase.from("notes").insert({
    text,
    color,
    x: window.innerWidth - 200,
    y: window.innerHeight - 200,
    timestamp: new Date().toISOString(),
  });

  if (error) {
    alert("Failed to save note 😿");
    console.error(error);
  } else {
    loadNotes();
    popup.style.display = "none";
    noteForm.reset();
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
      noteEl.style.background = note.color || "#ffff88";
      noteEl.style.left = `${note.x}px`;
      noteEl.style.top = `${note.y}px`;
      noteEl.style.position = "absolute";
      board.appendChild(noteEl);
      makeDraggable(noteEl, note.id);
    });
}

function makeDraggable(noteEl, id) {
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

    const { error } = await supabase.from("notes").update({
      x: parseInt(noteEl.style.left),
      y: parseInt(noteEl.style.top),
    }).eq("id", id);

    if (error) console.error("Failed to update position", error);
  });
}

window.onload = loadNotes;
