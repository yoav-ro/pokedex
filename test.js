app.use('/', express.static(path.resolve('./front'))); // serve main path as static dir
app.get('/', function(req, res) { // serve main path as static file
  res.sendFile(path.resolve('./front/pokedex.html'))
});