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
