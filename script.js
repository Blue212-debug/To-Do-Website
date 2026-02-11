const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

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
      <button class="move-up">↑</button>
      <button class="move-down">↓</button>
    </div>
  `;

  // Complete toggle
  const checkbox = taskCard.querySelector(".task-check");
  checkbox.addEventListener("change", function () {
    taskCard.classList.toggle("completed", this.checked);
  });

  // Move Up
  taskCard.querySelector(".move-up").addEventListener("click", function () {
    const prev = taskCard.previousElementSibling;
    if (prev) {
      taskList.insertBefore(taskCard, prev);
    }
  });

  // Move Down
  taskCard.querySelector(".move-down").addEventListener("click", function () {
    const next = taskCard.nextElementSibling;
    if (next) {
      taskList.insertBefore(next, taskCard);
    }
  });

  taskList.prepend(taskCard);
  taskInput.value = "";
}
