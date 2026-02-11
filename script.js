const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const focusInputBtn = document.getElementById("focusInputBtn");
const taskList = document.getElementById("taskList");

focusInputBtn.addEventListener("click", () => {
  taskInput.focus();
});

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
    <span class="badge medium">Medium</span>
  `;

  const checkbox = taskCard.querySelector(".task-check");

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      taskCard.classList.add("completed");
    } else {
      taskCard.classList.remove("completed");
    }
  });

  taskList.prepend(taskCard);
  taskInput.value = "";
}
