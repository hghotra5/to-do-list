// DOM Elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Task
addTaskButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = createTaskElement(taskText);
  taskList.appendChild(task);
  saveTask(taskText);
  taskInput.value = ""; // Clear input field
}

// Create Task Element
function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task";

  const span = document.createElement("span");
  span.textContent = taskText;

  span.addEventListener("click", () => {
    li.classList.toggle("complete");
    updateTaskStatus(taskText);
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    deleteTask(taskText);
  });

  li.appendChild(span);
  li.appendChild(deleteButton);
  return li;
}

// Local Storage Helpers
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, complete: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskElement = createTaskElement(task.text);
    if (task.complete) {
      taskElement.classList.add("complete");
    }
    taskList.appendChild(taskElement);
  });
}

function deleteTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const filteredTasks = tasks.filter(t => t.text !== task);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

function updateTaskStatus(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map(t => {
    if (t.text === task) {
      t.complete = !t.complete;
    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
