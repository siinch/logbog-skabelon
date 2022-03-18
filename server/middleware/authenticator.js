const jsonwebtoken = require("jsonwebtoken");

function token (request, response, next) {
    try {
        let authHeader = request.headers["authorization"]
        let token = authHeader.split(" ")[1];
        console.log("Verifying token:" + token);
        let decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    }
    catch (error) {
        console.log(error)
        response.sendStatus(401);
        return;
    }
    next();
}

module.exports = {
    token
}