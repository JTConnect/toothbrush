(function() {
    angular
        .module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['$state'];

    function ContactController($state) {
        var vm = this;

        vm.Go = Go;

        activate();
        function activate() {}

        function Go(state) {
            $state.go(state);
        }
    }

})();