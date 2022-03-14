async function getTasks() {
    let url = "/tasks";
    return response = await fetch(url);
}

async function postTask(task) {

    let url = "/task";
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    }
    return response = await fetch(url, request);
}

async function deleteTask(task) {

    let url = "/task";
    let request = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    }
    return response = await fetch(url, request);
}