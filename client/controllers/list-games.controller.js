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
