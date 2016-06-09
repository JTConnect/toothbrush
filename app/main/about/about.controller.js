(function() {
    angular
        .module('app')
        .controller('AboutController', AboutController);

    AboutController.$inject = ['$state'];

    function AboutController($state) {
        var vm = this;

        vm.Go = Go;

        activate();
        function activate() {}

        function Go(state) {
            $state.go(state);
        }
    }

})();
