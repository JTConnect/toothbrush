(function() {
    angular
        .module('app')
        .run(run);


    function run($rootScope, $anchorScroll)  {
        $rootScope.$on("$locationChangeSuccess", function() {
            $anchorScroll();
        });
    }

})();



