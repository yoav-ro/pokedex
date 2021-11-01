const express = require("express");
const pokemonRouter = require("./back/src/routers/pokemonRouter.js")
const userRouter = require("./back/src/routers/userRouter.js")
const path = require("path")
const cors = require("cors")

const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use("/pokemon", pokemonRouter);
app.use(userRouter);

app.use('/', express.static(path.resolve('./front'))); // serve main path as static dir
app.get('/', function (req, res) { // serve main path as static file
  res.sendFile(path.resolve('./front/pokedex.html'))
});

// start the server
app.listen(port, () => {
  console.log('app started');
});

// route our app
app.get('/', (req, res) => {
  res.send('hello world!');
});
