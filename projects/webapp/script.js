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
    let taskComponent = document.createElement("div");
    taskComponent.classList.add("task");

    // add title
    let title = document.createElement("h3");
    title.innerHTML = task.title;
    taskComponent.appendChild(title);

    // add remove button
    let remove = document.createElement("button");
    remove.innerHTML = "-";
    remove.onclick = function () {removeTaskComponent(parent, taskComponent)};
    taskComponent.appendChild(remove);

    // add shiftLeft button
    let shiftLeft = document.createElement("button");
    shiftLeft.innerHTML = "&lt";
    taskComponent.appendChild(shiftLeft);

    // add shiftLeft button
    let shiftRight = document.createElement("button");
    shiftRight.innerHTML = "&gt";
    taskComponent.appendChild(shiftRight);

    // append task component
    parent.appendChild(taskComponent);
}


function removeTaskComponent(parent, taskComponent) {
    if(confirm("Are you sure you wish to remove this task?"))
        parent.removeChild(taskComponent);

}