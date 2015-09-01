var Game = require('../models/game.server.model.js');

exports.create = createGame;
exports.list = listGames;
exports.delete = deleteGame;

//////////////////

function createGame(req, res) {
    var game = new Game(req.body);
    game.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json(game);
        }
    });
}

function listGames(req, res) {
    Game.find()
        .sort('-created')
        .exec(function (err, games) {
            if (err) {
                console.log(err);
            } else {
                res.json(games);
            }
    });
}

function deleteGame(req, res) {
    var id = req.body._id;
    Game.findByIdAndRemove(id, function(err, game) {
        if (err) {
            console.log(err);
        } else {
            res.json(game);
        }
    });
}
