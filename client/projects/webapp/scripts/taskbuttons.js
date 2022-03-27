let isTesting = false;
let state = {
    backlog: 0,
    to_do: 1,
    doing: 2,
    done: 3
}

let tasks = [];

if(isTesting)
for(let i = 0; i < 4; i++)
    tasks.push({title: "Task #" + i, state: Math.floor(Math.random()*3)});

reloadTasks();

// add functionality to the addTaskButton
let addTaskButton = document.getElementById("add-task-button");
addTaskButton.addEventListener("click", addTaskButtonHandler);

async function addTaskButtonHandler() {
    
    let task = {
        title: prompt("Title of new task:"),
        state: state.backlog 
    }

    if(task.title == "" || task.title == null)
        return;
    
    let response = await postTask(task);

    if(!response.ok) {
        alert (response.status + ": " + response.statusText);
        return;
    }

    let data = await response.json();
    alert(JSON.stringify(data))
    tasks.push(task);
    reloadTasks();
}

// add functionality to the reloadTasksButton
let reloadTasksButton = document.getElementById("reload-tasks-button");
reloadTasksButton.addEventListener("click", reloadTasks);

async function reloadTasks() {

    let response = await getTasks();
    if(response.ok) {
        let data = await response.json();
        tasks = data.tasks;
    }

    // Remove all old taskComponents
    let taskCards = document.getElementsByTagName("task-card");

    while (taskCards.length > 0) {
        taskCards[0].parentNode.removeChild(taskCards[0]);
    }

    let taskBoard = document.getElementsByTagName("task-board")[0];
    taskBoard.tasks = tasks;

    // Insert new task components
    for (let possibleState in state) {

        let parent = document.getElementById(possibleState);


        let tasksWithMatchingState = tasks.filter(task => task.state == state[possibleState]);
        parent.tasks = tasksWithMatchingState;
        /*for (let task of tasksWithMatchingState) {
            // create task component
            let taskCard = document.createElement("task-card");
            taskCard.task = task;
            // append task component
            parent.appendChild(taskCard);
        }*/
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
    let removeButton = document.createElement("button");
    removeButton.innerHTML = "&#128465";
    removeButton.addEventListener("click", async function () {
        if(!confirm("Are you sure you wish to remove this task?"))
            return;
        await deleteTask(task);
        reloadTasks();
    });
    taskComponent.appendChild(removeButton);

    // add shiftLeft button
    let shiftLeft = document.createElement("button");
    shiftLeft.innerHTML = "&lt";
    if(task.state == state.backlog)
        shiftLeft.classList.add("inactive");

        shiftLeft.addEventListener("click", async function() {
            task.state--;
            await updateTask(task);
            reloadTasks();
        });
    taskComponent.appendChild(shiftLeft);

    // add shiftRight button
    let shiftRight = document.createElement("button");
    shiftRight.innerHTML = "&gt";
    
    if(task.state == Object.keys(state).length-1)
        shiftRight.classList.add("inactive");


    shiftRight.addEventListener("click", async function() {
        task.state++;
        await updateTask(task);
        reloadTasks();
    });
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