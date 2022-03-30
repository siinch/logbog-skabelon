async function getTasks() {
    let url = "/tasks";
    let request = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.token
        },
    }

    return response = await fetch(url, request);
}

async function postTask(task) {

    let url = "/task";
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify(task)
    }
    return response = await fetch(url, request);
}

async function updateTask(task) {

    let url = "/task";
    let request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify(task)
    }
    return response = await fetch(url, request);
}

async function deleteTask(task) {

    let url = "/task";
    let request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify(task)
    }
    return response = await fetch(url, request);
}

//let taskBoard = document.getElementsByTagName("task-board")[0];
async function reloadTasks() {
    console.log("reloading tasks...");
    let response = await getTasks();
    if(response.ok) {
        let data = await response.json();
        taskBoard.tasks = data.tasks;
    }
}
