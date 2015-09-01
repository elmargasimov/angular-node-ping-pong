'use strict';

var games = require('../controllers/games.server.controller');
var players = require('../controllers/players.server.controller.js');


module.exports = function (app) {
    // Articles collection routes
    app.route('/api/games')
        .get(games.list)
        .post(function(req, res){
            players.updatePlayerStats(req,res);
            players.updatePlayerPoints(req,res);
            games.create(req,res);
        });

    app.route('/api/games/:gameId')
        .delete(games.delete);
};