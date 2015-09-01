(function(){
    'use strict';
    angular.module('ping-pong', ['ngResource']);

})();

(function(){
    'use strict';

    angular.module('ping-pong').controller('AddGamesController', AGCtrl);

    AGCtrl.$inject = ['playersSvc', 'gamesSvc', '$rootScope'];

    function AGCtrl(playersSvc, gamesSvc, $rootScope) {
        var vm = this;
        vm.game = {
            playerOne: {},
            playerTwo: {},
            sets: []
        };
        vm.save = save;
        vm.addSet = addSet;

        init();

        ////////////////

        function init() {
            playersSvc.players.$promise.then(onSuccess);
            function onSuccess(res) {
                vm.players = res;
            }
        }

        function save(form) {
            // If no game sets have been added then abort
            if(!vm.game.sets.length) return;

            // If the players are the same then abort
            if(vm.game.playerOne === vm.game.playerTwo) return;

            if(form.$valid) {
                addGame();
            }
        }

        function addGame() {
            var newGame = new gamesSvc.resource(vm.game);
            newGame.$save();
            gamesSvc.games.push(newGame);

            // Reset
            vm.game = {
                playerOne: {},
                playerTwo: {},
                sets: []
            };
            vm.set = {};
        }

        function addSet(gameSet) {
            // Validate input
            if(!gameSet || !gameSet.playerOneScore || !gameSet.playerTwoScore) return;
            vm.game.sets.push(gameSet);
            calculatePlayerScores();
            vm.set = {};
        }

        function calculatePlayerScores() {
            // Calculates the players total score from the individual set scores
            var playerOneScore = 0;
            var playerTwoScore = 0;
            var sets = vm.game.sets;

            for(var i = 0, j = sets.length; i<j; ++i) {
                var p1 = sets[i].playerOneScore;
                var p2 = sets[i].playerTwoScore;
                if(p1>p2) {
                    playerOneScore += 1;
                } else if(p2>p1) {
                    playerTwoScore += 1;
                }
            }

            vm.game.playerOne.score = playerOneScore;
            vm.game.playerTwo.score = playerTwoScore;
        }
    }
})();

(function(){
    'use strict';

    angular.module('ping-pong').controller('AddPlayerController', APCtrl);

    APCtrl.$inject = ['playersSvc'];

    function APCtrl(playersSvc) {
        var vm = this;
        vm.player = {};
        vm.submit = submit;

        ////////////////

        function submit(form) {
            if(form.$valid) {
                save();
            }
        }

        function save() {
            playersSvc.resource.save(vm.player);
            playersSvc.players.push(vm.player);
            vm.player = {};
        }
    }
})();

(function(){
    'use strict';

    angular.module('ping-pong').controller('LeaderBoardController', LBCtrl);

    LBCtrl.$inject = ['playersSvc'];

    function LBCtrl(playersSvc) {
        var vm = this;
        vm.players = [];

        init();

        ////////////////

        function init() {
            playersSvc.players.$promise.then(onSuccess);
            function onSuccess(res) {
                vm.players = res;
                if(vm.players.length) {
                    calculateWinLoseRatio(vm.players);
                }
            }
        }

        function calculateWinLoseRatio(players) {
            for (var i= 0,j = players.length; i<j; ++i) {
                var player = players[i];
                player.ratio = Math.abs(1-(player.losses/player.wins));
            }
        }
    }
})();

(function(){
    'use strict';

    angular.module('ping-pong').controller('ListGamesController', LGCtrl);

    LGCtrl.$inject = ['gamesSvc'];

    function LGCtrl(gamesSvc) {
        var vm = this;
        vm.games = [];
        vm.players = [];
        vm.remove = remove;

        init();

        ////////////////

        function init() {
            gamesSvc.games.$promise.then(onSuccess);
            function onSuccess(res) {
                vm.games = res;
            }
        }

        function remove(game, id) {
            game.$remove({_id: game._id}, function(){
                vm.games.splice(id, 1);
            });
        }
    }
})();

(function(){
    'use strict';

    // Copied from https://gist.github.com/jeffjohnson9046/9470800
    angular.module('ping-pong').filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }]);

})();
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
