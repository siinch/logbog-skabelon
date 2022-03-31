async function signUpUser(user) {

    let url = "/user/signup";
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    }
    return response = await fetch(url, request);
}

async function logInUser(user) {

    let url = "/user/login";
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    }
    return response = await fetch(url, request);
}

async function deleteUser(user) {

    let url = "/user";
    let request = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify(user)
    }
    return response = await fetch(url, request);
}
