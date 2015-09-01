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
