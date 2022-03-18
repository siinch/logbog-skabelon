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

// add functionality to the sign up button
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