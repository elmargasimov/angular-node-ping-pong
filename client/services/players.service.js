(function(){
    'use strict';

    angular.module('ping-pong').factory('playersSvc', playersSvc);

    function playersSvc($resource) {
        var svc = {
            resource: $resource('/api/players/:playerId', { playerId:'@_id' }),
            fetchData: fetchData,
            players: []
        };

        fetchData();

        return svc;

        /////////

        function fetchData() {
            svc.players = svc.resource.query();
        }
    }
})();
