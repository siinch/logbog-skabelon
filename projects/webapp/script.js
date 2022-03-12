let tasks = [
    {title: "Task #1", status: "backlog"},
    {title: "Task #2", status: "to-do"},
    {title: "Task #3", status: "doing"},
    {title: "Task #4", status: "done"}
];
for (let task of tasks) {

    // find the appropriate task list
    let parent = document.getElementById(task.status);

    // create task component
    let taskComponent = createTaskComponent(parent, task);

    // append task component
    parent.appendChild(taskComponent);
}

// add functionality to the addTaskButton
let addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", function() {
    if(!confirm("Add new task?")) 
        return;
    
    let parent = document.getElementById("backlog");
    let task = {title: prompt("Title of new task:")};
    let taskComponent = createTaskComponent(parent, task);
    backlog.appendChild(taskComponent);
});


function removeTaskComponent(parent, taskComponent) {
    if(!confirm("Are you sure you wish to remove this task?"))
        return;
    
    parent.removeChild(taskComponent)

}

function createTaskComponent (parent, task) {
    let taskComponent = document.createElement("div");
    taskComponent.classList.add("task");

    // add title
    let title = document.createElement("h3");
    title.innerHTML = task.title;
    taskComponent.appendChild(title);

    // add remove button
    let remove = document.createElement("button");
    remove.innerHTML = "-";
    remove.addEventListener("click", function () {
        removeTaskComponent(parent, taskComponent)
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