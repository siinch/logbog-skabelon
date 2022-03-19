const jsonwebtoken = require("jsonwebtoken");

function token (request, response, next) {
    try {
        // get the token from the authorization header
        let authHeader = request.headers["authorization"]
        let token = authHeader.split(" ")[1];

        // verify that the token is valid
        console.log("Verifying token...");
        let decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        
        // attach the username of the authorized user
        request.username = decoded.username;
        
        // go to the next function in the request route
        next();
    }
    catch (error) {
        // if the token is invalid respond with 401 unauthorized
        console.log(error)
        response.sendStatus(401);
        return;
    }
}

module.exports = {
    token
}