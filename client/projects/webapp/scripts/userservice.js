async function signUpUser(user) {

    let url = "/user/signup";
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    }
    return response = await fetch(url, request);
}
