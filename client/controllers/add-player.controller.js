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
