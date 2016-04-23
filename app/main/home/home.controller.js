(function() {
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state'];

    function HomeController($state) {
        var vm = this;

        vm.NavigateTo = navigateTo;

        activate();
        function activate() {
            //TODO: initalize code here
        }

        function navigateTo() {
            $state.go('root.appLayout.createJob.postAJob');
        }

    }


})();