const fileHelper = require("../helpers/fileHelper.js")

function userHandler(req, res, next) {
    const username = req.headers.username;
    if (!username) throw "User name doesnt exist!"
    if (!fileHelper.doesUserFileExist(username)) {
        fileHelper.createUserFile(username);
    }
    next();
}

module.exports = userHandler;