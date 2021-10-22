const express = require('express');
const userRouter = express.Router();

//When API gets /info path send username
userRouter.post('/info', (req, res) => {
    res.send({ username: req.headers.username });
});

module.exports = userRouter;