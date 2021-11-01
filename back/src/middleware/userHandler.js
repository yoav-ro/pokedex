const fileHelper = require("../helpers/fileHelper.js")
const errorHandler = require("../middleware/errorHandler.js")

function userHandler(req, res, next) {
    const username = req.headers.username;
    if (!username) {
        errorHandler(401, req, res, next)
    }
    if (!fileHelper.doesUserFileExist(username) && username) {
        fileHelper.createUserFile(username);
    }
    next();
}

module.exports = userHandler;