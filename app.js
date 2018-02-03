// Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners call
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
  // Load DOM event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear task event
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks form LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    // Create li elements
    const li = document.createElement("li");

    // Add class
    li.className = "collection-item";

    // Create text node and append to a list
    li.appendChild(document.createTextNode(task));

    // Create a new link element
    const link = document.createElement("a");

    // Add class
    link.className = "delete-item secondary-content";

    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task function

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Create li elements
  const li = document.createElement("li");

  // Add class
  li.className = "collection-item";

  // Create text node and append to a list
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a new link element
  const link = document.createElement("a");

  // Add class
  link.className = "delete-item secondary-content";

  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task function
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Clear tasks function
function clearTasks() {
  if (taskList.childElementCount > 0) {
    if (confirm("Are you sure to delete all your tasks?")) {
      //taskList.innerHTML = '';
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
    }
  } else {
    alert("Please add tasks!");
  }
}

// Filter tasks function
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
