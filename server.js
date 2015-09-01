var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var gamesRoutes = require('server/routes/games.server.routes');
var playersRoutes = require('server/routes/players.server.routes');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Connect to our mongo database
mongoose.connect('mongodb://localhost/pingpong');

// Set swig as our templating engine
app.set('view engine', 'html');
app.set('views', __dirname + '/server/');
app.engine('html', swig.renderFile);
app.use('/', express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Set routes
app.all('/', function (req, res) {
    res.render('index');
});

playersRoutes(app);
gamesRoutes(app);

app.listen(port, function(){
    console.log('App is running on http://localhost:8080');
});
