const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function generateColor() {
  const colors = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const color = generateColor();

  const taskCard = document.createElement("div");
  taskCard.className = "task-card";

  taskCard.innerHTML = `
    <div class="task-info">
      <input type="checkbox" class="task-check" />
      <div>
        <h3>${taskText}</h3>
        <p>New task added just now</p>
      </div>
    </div>

    <div class="task-actions">
      <div class="task-color" style="background:${color}"></div>
      <button class="move-up">↑</button>
      <button class="move-down">↓</button>
      <button class="remove-task">✕</button>
    </div>
  `;

  // Toggle complete
  const checkbox = taskCard.querySelector(".task-check");
  checkbox.addEventListener("change", function () {
    taskCard.classList.toggle("completed", this.checked);
  });

  // Move up
  taskCard.querySelector(".move-up").addEventListener("click", function () {
    const prev = taskCard.previousElementSibling;
    if (prev) {
      taskList.insertBefore(taskCard, prev);
    }
  });

  // Move down
  taskCard.querySelector(".move-down").addEventListener("click", function () {
    const next = taskCard.nextElementSibling;
    if (next) {
      taskList.insertBefore(next, taskCard);
    }
  });

  // Remove task
  taskCard.querySelector(".remove-task").addEventListener("click", function () {
    taskCard.style.opacity = "0";
    taskCard.style.transform = "translateX(20px)";
    setTimeout(() => {
      taskCard.remove();
    }, 200);
  });

  taskList.prepend(taskCard);
  taskInput.value = "";
}
