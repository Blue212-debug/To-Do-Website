// Elements
const input = document.querySelector(".task-input input");
const addBtn = document.querySelector(".task-input button");
const taskList = document.querySelector(".task-list");
const navBtns = document.querySelectorAll(".nav-btn");

// Add Task
addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const task = document.createElement("div");
  task.className = "task-card";

  task.innerHTML = `
    <div class="task-info">
      <input type="checkbox" />
      <div>
        <h3>${text}</h3>
        <p>New task</p>
      </div>
    </div>
    <span class="badge low">Low</span>
  `;

  taskList.appendChild(task);
  input.value = "";

  addCheckboxListener(task);
}

// Complete Task
function addCheckboxListener(task) {
  const checkbox = task.querySelector("input");

  checkbox.addEventListener("change", () => {
    task.classList.toggle("completed");
  });
}

// Existing tasks
document.querySelectorAll(".task-card").forEach(addCheckboxListener);

// Sidebar Navigation
navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {

    // Active button
    navBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.textContent;

    filterTasks(type);
  });
});

// Filter Tasks
function filterTasks(type) {
  const tasks = document.querySelectorAll(".task-card");

  tasks.forEach(task => {

    if (type === "Dashboard") {
      task.style.display = "flex";
    }

    else if (type === "Completed") {
      task.style.display = task.classList.contains("completed")
        ? "flex"
        : "none";
    }

    else {
      // Today / Upcoming (default = show all)
      task.style.display = "flex";
    }
  });
}
