var express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    app = express(),
    fetch = require('node-fetch'),
    calendar = require('./utils/calendar');

// location for templates
app.set('views', './app/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// location for static files
app.use(express.static(__dirname + "/app"));

// Routes
app.get('/scroll', function(req, res) {
  res.render('scroll');
});
app.get('/', function(req, res) {
  res.render('home');
});
app.get('/snake', function(req, res) {
  res.render('snake');
})
app.get('/typewriter', function(req, res) {
  res.render('typewriter');
});
app.get('/calendar', function(req, res) {
  res.render('imageCalendar');
});
app.get('/masonry', function(req, res) {
  res.render('masonry');
});

app.get('/react', (req, res) => {
  res.sendFile(__dirname + '/app/react-chad/build/index.html');
})


app.get('/express-backend', (req, res) => {
  res.send({success: true});
})

// Helpers
// app.get('/getGooglePhotos/:albumId', calendar.getPhotos);

// Start server
app.set('port', (process.env.PORT || 5000));
var server = app.listen(app.get('port'), function () {
    console.log("App now running on port", app.get('port'));
  });
