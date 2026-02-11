const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const modal = document.getElementById("scheduleModal");
const noScheduleBtn = document.getElementById("noScheduleBtn");
const confirmScheduleBtn = document.getElementById("confirmScheduleBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const taskDateTime = document.getElementById("taskDateTime");

let pendingTaskText = "";

addTaskBtn.addEventListener("click", openModal);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") openModal();
});

function openModal() {
  const text = taskInput.value.trim();
  if (text === "") return;

  pendingTaskText = text;
  modal.classList.add("active");
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

noScheduleBtn.addEventListener("click", () => {
  createTask(pendingTaskText, null);
  modal.classList.remove("active");
});

confirmScheduleBtn.addEventListener("click", () => {
  const selectedTime = taskDateTime.value;
  if (!selectedTime) return;

  createTask(pendingTaskText, selectedTime);
  modal.classList.remove("active");
});

function generateColor() {
  const colors = [
    "#6366f1", "#10b981", "#f59e0b",
    "#ef4444", "#3b82f6", "#8b5cf6",
    "#ec4899", "#14b8a6"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createTask(text, dateTime) {

  const color = generateColor();
  const taskCard = document.createElement("div");
  taskCard.className = "task-card";

  const timeLabel = dateTime
    ? `<p class="task-time">Reminder: ${new Date(dateTime).toLocaleString()}</p>`
    : `<p>New task added just now</p>`;

  taskCard.innerHTML = `
    <div class="task-info">
      <input type="checkbox" class="task-check" />
      <div>
        <h3>${text}</h3>
        ${timeLabel}
      </div>
    </div>

    <div class="task-actions">
      <div class="task-color" style="background:${color}"></div>
      <button class="move-up">↑</button>
      <button class="move-down">↓</button>
      <button class="remove-task">✕</button>
    </div>
  `;

  taskCard.querySelector(".task-check")
    .addEventListener("change", function () {
      taskCard.classList.toggle("completed", this.checked);
    });

  taskCard.querySelector(".move-up")
    .addEventListener("click", function () {
      const prev = taskCard.previousElementSibling;
      if (prev) taskList.insertBefore(taskCard, prev);
    });

  taskCard.querySelector(".move-down")
    .addEventListener("click", function () {
      const next = taskCard.nextElementSibling;
      if (next) taskList.insertBefore(next, taskCard);
    });

  taskCard.querySelector(".remove-task")
    .addEventListener("click", function () {
      taskCard.style.opacity = "0";
      taskCard.style.transform = "translateX(20px)";
      setTimeout(() => taskCard.remove(), 200);
    });

  taskList.prepend(taskCard);

  taskInput.value = "";
  taskDateTime.value = "";
}
