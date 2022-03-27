let userSession = {};

// add functionality to the sign up button
let signUpButton = document.getElementById("sign-up-button");
signUpButton.addEventListener("click", signUpButtonHandler);

async function signUpButtonHandler() {
    
    let user = {
        username: prompt("Choose username:"),
        password: prompt("Choose password:"),
        passwordControl: prompt("Repeat password:") 
    }
    
    let response = await signUpUser(user);

    if(!response.ok) {
        alert (response.status + ": " + response.statusText);
        return;
    }

    let data = await response.json();
    alert("Signed up user: " + JSON.stringify(data))
    userSession = data;
    reloadTasks();
}

// add functionality to the log in button
let logInButton = document.getElementById("log-in-button");
logInButton.addEventListener("click", logInButtonHandler);

async function logInButtonHandler() {
    
    let user = {
        username: prompt("Username:"),
        password: prompt("Password:"),
    }
    
    let response = await logInUser(user);

    if(!response.ok) {
        alert (response.status + ": " + response.statusText);
        return;
    }

    let data = await response.json();
    alert("Logged in user: " + JSON.stringify(data))
    userSession = data;
    reloadTasks();
}

// add functionality to the log out button
let logOutButton = document.getElementById("log-out-button");
logOutButton.addEventListener("click", logOutButtonHandler);

async function logOutButtonHandler() {
    
    if(!confirm("Are you sure you want to log out?"))
        return;
    
    userSession = {};

    taskBoard.tasks = [];
    reloadTasks();
}

// add functionality to the delete user button
let deleteUserButton = document.getElementById("delete-user-button");
deleteUserButton.addEventListener("click", deleteUserButtonHandler);

async function deleteUserButtonHandler() {

    if(!confirm("Are you sure you want to delete this user?"))
        return;
    
    let user = {
        username: userSession.username,
        password: prompt("Password:"),
    }
    
    let response = await deleteUser(user);

    if(!response.ok) {
        alert (response.status + ": " + response.statusText);
        return;
    }

    let data = await response.json();
    alert("Deleted user: " + JSON.stringify(data))
    userSession = {}
    taskBoard.tasks = [];
    reloadTasks();
}