(function(){
    'use strict';

    angular.module('ping-pong').factory('gamesSvc', gamesSvc);

    function gamesSvc($resource) {
        var svc = {
            resource: $resource('/api/games/:gameId', { gameId:'@_id' }),
            fetchData: fetchData,
            games: []
        };

        fetchData();

        return svc;

        //////////

        function fetchData() {
            svc.games = svc.resource.query();
        }
    }
})();
