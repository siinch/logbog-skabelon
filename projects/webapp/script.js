let tasks = [];

// add functionality to the addTaskButton
let addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", function() {
    if(!confirm("Add new task?")) 
        return;
    
    tasks.push({
        title: prompt("Title of new task:"),
        status: "backlog" 
    });

    updateTasks();
});

function updateTasks() {

    // Remove all taskComponents
    let taskComponents = document.getElementsByClassName("task");

    for (let taskComponent of taskComponents) {
        taskComponent.parentElement.removeChild(taskComponent);
    }

    // Insert new task components
    for (let task of tasks) {

        // find the appropriate task list
        let parent = document.getElementById(task.status);

        // create task component
        let taskComponent = createTaskComponent(task);

        // append task component
        parent.appendChild(taskComponent);
    }
}

function createTaskComponent (task) {
    let taskComponent = document.createElement("div");
    taskComponent.classList.add("task");
    taskComponent.task = task;

    // add title
    let title = document.createElement("h3");
    title.innerHTML = task.title;
    taskComponent.appendChild(title);

    // add remove button
    let remove = document.createElement("button");
    remove.innerHTML = "-";
    remove.addEventListener("click", function () {
        if(!confirm("Are you sure you wish to remove this task?"))
            return;
        tasks = tasks.remove(task);
        updateTasks();
    });
    taskComponent.appendChild(remove);

    // add shiftLeft button
    let shiftLeft = document.createElement("button");
    shiftLeft.innerHTML = "&lt";
    taskComponent.appendChild(shiftLeft);

    // add shiftLeft button
    let shiftRight = document.createElement("button");
    shiftRight.innerHTML = "&gt";
    taskComponent.appendChild(shiftRight);

    return taskComponent;
}

Array.prototype.remove = function (elementToRemove) {
    let result = [];
    
    for(let element of this) {
        if(element != elementToRemove)
            result.push(element);
    }

    return result;
}