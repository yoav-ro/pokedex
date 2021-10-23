const express = require("express");
const pokemonRouter = require("./src/routers/pokemonRouter.js")
const userRouter= require("./src/routers/userRouter.js")
const cors= require("cors")

const app = express();
const port = 8080;
app.use(cors())
app.use("/pokemon", pokemonRouter);
app.use(userRouter);


// start the server
app.listen(port, () => {
  console.log('app started');
});

// route our app
app.get('/', (req, res) => {
  res.send('hello world!');
});
