var Player = require('../models/player.server.model.js');

exports.create = createPlayer;
exports.list = listPlayers;
exports.findById = findPlayerById;
exports.updatePlayerStats = updatePlayerStats;
exports.updatePlayerPoints = updatePlayerPoints;

///////////////

function createPlayer (req, res) {
    var player = new Player(req.body);
    player.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.json(player);
        }
    });
}

function listPlayers (req, res) {
    Player.find().sort('-created').exec(function (err, players) {
        if (err) {
            console.log(err);
        } else {
            res.json(players);
        }
    });
}

function findPlayerById(req, res) {
    var id = req.body._id || req.params._id;
    Player.findById(id, function(err, player) {
        if (err) {
            console.log(err);
        } else {
            res.json(player);
        }
    });
}

function updatePlayerPoints(req,res) {
    var playerOnePoints = 0;
    var playerTwoPoints = 0;
    var sets = req.body.sets;

    for(var i = 0, j = sets.length; i<j; ++i) {
        var p1 = sets[i].playerOneScore;
        var p2 = sets[i].playerTwoScore;
        playerOnePoints += p1;
        playerTwoPoints += p2;
    }

    _updateStats(req.body.playerOne._id, 'points', playerOnePoints);
    _updateStats(req.body.playerTwo._id, 'points', playerTwoPoints);
}

function updatePlayerStats(req,res) {
    var playerOne = req.body.playerOne;
    var playerTwo = req.body.playerTwo;

    if(playerOne.score > playerTwo.score) {
        _updateStats(playerOne._id, 'wins');
        _updateStats(playerTwo._id, 'losses');
    } else {
        _updateStats(playerTwo._id, 'wins');
        _updateStats(playerOne._id, 'losses');
    }
}

function _updateStats(playerId, type, newScore) {
    var field;

    switch (type) {
        case 'wins':
            field = {wins: 1};
            break;
        case 'losses':
            field = {losses: 1};
            break;
        case 'points':
            field = {points: newScore};
            break;
    }
    
    Player.findOneAndUpdate({_id: playerId}, {$inc: field})
        .exec(function(err, player) {
            if (err) {
                console.log(err);
            } else {
                console.log(player);
            }
        });
}