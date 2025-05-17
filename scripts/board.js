import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🎯 Supabase Setup
const supabase = createClient(
  'https://orstofmyjmznjtiuilvf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yc3RvZm15am16bmp0aXVpbHZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzU3OTksImV4cCI6MjA2Mjk1MTc5OX0.0csRR2N4IB4j7vuTtPct6qKmi5ktGm8--cjJAgKMMbk'
);

const board = document.getElementById("board");
let isDragging = false;
let startX, startY;
let lasso = null;

// 🧾 Load saved messages from Supabase
async function loadTexts() {
  board.innerHTML = ""; // Clear board
  const { data, error } = await supabase.from("board").select("*");
  if (error) return console.error("Load error:", error);

  data.forEach(note => {
    const el = document.createElement("div");
    el.className = "saved-text";
    el.textContent = note.text;
    el.style.left = `${note.x}px`;
    el.style.top = `${note.y}px`;
    el.style.width = `${note.width}px`;
    el.style.height = `${note.height}px`;
    el.style.color = note.color;
    board.appendChild(el);
  });
}

// 🖱️ Drag start
board.addEventListener("mousedown", (e) => {
  if (document.querySelector(".textbox")) return; // prevent multiple boxes
  isDragging = true;
  startX = e.offsetX;
  startY = e.offsetY;

  lasso = document.createElement("div");
  lasso.className = "lasso";
  lasso.style.left = `${startX}px`;
  lasso.style.top = `${startY}px`;
  board.appendChild(lasso);
});

// 🧲 Dragging
board.addEventListener("mousemove", (e) => {
  if (!isDragging || !lasso) return;
  const currX = e.offsetX;
  const currY = e.offsetY;

  const width = Math.abs(currX - startX);
  const height = Math.abs(currY - startY);
  const left = Math.min(currX, startX);
  const top = Math.min(currY, startY);

  lasso.style.left = `${left}px`;
  lasso.style.top = `${top}px`;
  lasso.style.width = `${width}px`;
  lasso.style.height = `${height}px`;
});

// 🧾 Drop = create textarea
board.addEventListener("mouseup", () => {
  if (!isDragging || !lasso) return;
  isDragging = false;

  const { left, top, width, height } = lasso.getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();
  const relX = left - boardRect.left;
  const relY = top - boardRect.top;

  lasso.remove();
  lasso = null;

  showTextbox(relX, relY, width, height);
});

// ✍️ Create editable textbox with toolbar
function showTextbox(x, y, width, height) {
  const textarea = document.createElement("textarea");
  textarea.className = "textbox";
  textarea.placeholder = "Type here...";
  textarea.style.left = `${x}px`;
  textarea.style.top = `${y}px`;
  textarea.style.width = `${width}px`;
  textarea.style.height = `${height}px`;
  textarea.style.color = "#000000";
  board.appendChild(textarea);
  textarea.focus();

  // 🛠 Toolbar
  const toolbar = document.createElement("div");
  toolbar.className = "textbox-toolbar";
  toolbar.innerHTML = `
    <input type="color" value="#000000" />
    <button class="save-btn">save</button>
    <button class="cancel-btn">✕</button>
  `;
  board.appendChild(toolbar);

  const colorPicker = toolbar.querySelector("input");
  const saveBtn = toolbar.querySelector(".save-btn");
  const cancelBtn = toolbar.querySelector(".cancel-btn");

  toolbar.style.left = `${x}px`;
  toolbar.style.top = `${y - 40}px`;

  colorPicker.addEventListener("input", () => {
    textarea.style.color = colorPicker.value;
  });

  // 💾 Save
  saveBtn.addEventListener("click", async () => {
    const text = textarea.value.trim();
    if (!text) return;

    const { x: boxX, y: boxY, width: boxW, height: boxH } = textarea.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();

    const relX = boxX - boardRect.left;
    const relY = boxY - boardRect.top;

    const { error } = await supabase.from("board").insert({
      text,
      color: colorPicker.value,
      x: relX,
      y: relY,
      width: boxW,
      height: boxH,
      timestamp: new Date().toISOString()
    });

    if (!error) {
      textarea.remove();
      toolbar.remove();
      loadTexts();
    } else {
      console.error("Save error:", error);
    }
  });

  // ❌ Cancel
  cancelBtn.addEventListener("click", () => {
    textarea.remove();
    toolbar.remove();
  });
}

window.onload = loadTexts;
