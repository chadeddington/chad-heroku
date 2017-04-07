var express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),   
    app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// location for templates
app.use(express.static(__dirname + "/views"));

// Routes
app.get('/', function(req, res) {
  res.render('index');
})

// Start server
var PORT = 8080;
var server = app.listen(PORT, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });