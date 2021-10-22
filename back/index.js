const express = require("express");
const app = express();
const port = 8080;

const pokemonRouter= require("./routers/pokemonRouter.js")
app.use("/", pokemonRouter);

// start the server
app.listen(port, () => {
  console.log('app started');
});

// route our app
app.get('/', (req, res) => {
  console.log("Test")

  res.send('hello world!');
});


//const pokemonRouter= require("./back/routers/pokemonRouter.js"

//app.use("/pokemon", pokemonRouter);