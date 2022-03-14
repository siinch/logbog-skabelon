async function postTask(task) {

    let url = "/task";
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task)
    }
    let response = await fetch(url, request);
    let data = await response.json();
    alert(response.status, JSON.stringify(data));
}