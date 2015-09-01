(function(){
    'use strict';

    // Copied from https://gist.github.com/jeffjohnson9046/9470800
    angular.module('ping-pong').filter('percentage', ['$filter', function ($filter) {
        return function (input, decimals) {
            return $filter('number')(input * 100, decimals) + '%';
        };
    }]);

})();