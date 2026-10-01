// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks when the page opens
displayTasks();


// Add a new task
function addTask() {

    const taskInput = document.getElementById("taskInput");

    const taskText = taskInput.value.trim();


    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();

    displayTasks();


    taskInput.value = "";

    taskInput.focus();
}


// Display all tasks
function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";


    tasks.forEach(function (task) {

        const li = document.createElement("li");

        li.className = "task";


        if (task.completed) {

            li.classList.add("completed");

        }


        li.innerHTML = `

            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >

            <span class="task-text">
                ${task.text}
            </span>

            <button
                class="edit-btn"
                onclick="editTask(${task.id})"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
            >
                Delete
            </button>

        `;


        taskList.appendChild(li);

    });


    updateTaskCount();
}


// Mark task as completed
function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });


    saveTasks();

    displayTasks();
}


// Edit task
function editTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });


    const newText = prompt("Edit your task:", task.text);


    if (newText !== null && newText.trim() !== "") {

        task.text = newText.trim();

        saveTasks();

        displayTasks();

    }
}


// Delete task
function deleteTask(id) {

    const confirmation = confirm(
        "Are you sure you want to delete this task?"
    );


    if (confirmation) {

        tasks = tasks.filter(function (task) {

            return task.id !== id;

        });


        saveTasks();

        displayTasks();

    }
}


// Save tasks to localStorage
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// Update task counter
function updateTaskCount() {

    const taskCount = document.getElementById("taskCount");

    const total = tasks.length;

    const completed = tasks.filter(function (task) {

        return task.completed;

    }).length;


    taskCount.textContent =
        `${total} tasks | ${completed} completed`;

}