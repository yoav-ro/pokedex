const express = require('express');
const userRouter = express.Router();

userRouter.post('/info', (req, res) => {
    res.send({ username: req.headers.username });
});

module.exports = userRouter;