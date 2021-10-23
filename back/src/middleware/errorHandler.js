function errorHandler(err, req, res, next) {
    switch (err) {
        case 404: { //Pokemon not found
            if (req.params.id) { //Pokemon not found using id
                res.status(404).json({ message: `Pokemon "${req.params.id}" not found` })
            }
            else{ //Pokemon not found using query
                res.status(404).json({ message: `Pokemon "${req.query.name}" not found` })
            }
            break;
        }
        case "403a": { //Trying to catch an already caught pokemon
            res.status(403).json({ message: `Pokemon "${req.params.id}" already caught by ${req.headers.username}` })
            break;
        }
        case "403b": { //Trying to release an uncaught pokemon
            res.status(403).json({ message: `${req.headers.username} havent caught pokemon "${req.params.id}"` })
            break;
        }
        case 401: { //Missing username header
            res.status(401).json({ message: `Missing user name!` })
            break;
        }
        case 500: { //Internal server error
            res.status(500).json({ message: `Internal server error` })
            break;
        }
    }
    next();
}

module.exports = errorHandler;