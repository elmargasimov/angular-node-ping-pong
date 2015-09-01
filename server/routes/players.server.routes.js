'use strict';

var players = require('../controllers/players.server.controller.js');

module.exports = function(app) {
    // Articles collection routes
    app.route('/api/players')
        .get(players.list)
        .post(players.create);

    app.route('/api/players/:playerId')
        .get(players.findById);
};
