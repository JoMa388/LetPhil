const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

function addTask() {
    const task = taskInput.value.trim();
    if(task=== "") return;
    const taskItem = document.createElement("li");
    taskItem.textContent = task; 
    taskItem.classList.add("task");

    taskItem.addEventListener("click", function() {taskList.removeChild(taskItem)});
    taskList.appendChild(taskItem);
}